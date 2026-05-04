import { google } from "googleapis";
import type { Product, Profile, Social } from "@/types";

const REVALIDATE_SECONDS = 3600;
const API_BASE = "https://sheets.googleapis.com/v4/spreadsheets";

const DEFAULT_PROFILE: Profile = {
  name: "",
  tagline: "",
  headline: "",
  subheadline: "",
  banner_url: "",
  avatar_url: "",
  footer_text: "",
  website: "",
};

type SectionName = "configuration" | "payment" | "social" | "project";

function toNumber(value: string | undefined): number {
  if (!value) {
    return 0;
  }
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

async function getAccessToken(): Promise<string> {
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKeyRaw = process.env.GOOGLE_PRIVATE_KEY;

  if (!clientEmail || !privateKeyRaw) {
    throw new Error("Google service account credentials are missing.");
  }

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: clientEmail,
      private_key: privateKeyRaw.replace(/\\n/g, "\n"),
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });

  const token = await auth.getAccessToken();
  if (!token) {
    throw new Error("Could not acquire Google Sheets access token.");
  }
  return token;
}

async function fetchSheetValues(range: string): Promise<string[][]> {
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;
  const sheetName = process.env.GOOGLE_SHEET_NAME;
  if (!spreadsheetId) {
    console.error("[googleSheets] Missing GOOGLE_SHEET_ID");
    return [];
  }

  try {
    const token = await getAccessToken();
    const targetRange = range.includes("!")
      ? range
      : sheetName
        ? `${sheetName}!${range}`
        : range;
    const url = `${API_BASE}/${spreadsheetId}/values/${encodeURIComponent(targetRange)}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: { revalidate: REVALIDATE_SECONDS },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("[googleSheets] Sheets API request failed", {
        status: response.status,
        statusText: response.statusText,
        targetRange,
        errorText,
      });
      return [];
    }

    const data = (await response.json()) as { values?: string[][] };
    return data.values ?? [];
  } catch (error) {
    console.error("[googleSheets] Failed to fetch sheet values", {
      range,
      error,
    });
    return [];
  }
}

function mapRow(headers: string[], row: string[]): Record<string, string> {
  return headers.reduce<Record<string, string>>((acc, header, index) => {
    acc[header.trim().toLowerCase()] = row[index]?.trim() ?? "";
    return acc;
  }, {});
}

function normalizeRow(row: string[]): string[] {
  return row.map((cell) => cell.trim());
}

function normalizeSectionName(value: string): SectionName | null {
  const normalized = value.trim().toLowerCase();
  if (normalized === "configuration") {
    return "configuration";
  }
  if (normalized === "payment") {
    return "payment";
  }
  if (normalized === "social") {
    return "social";
  }
  if (normalized === "project") {
    return "project";
  }
  return null;
}

function parseStructuredSections(rows: string[][]): Record<SectionName, Record<string, string>[]> {
  const sections: Record<SectionName, Record<string, string>[]> = {
    configuration: [],
    payment: [],
    social: [],
    project: [],
  };

  let currentSection: SectionName | null = null;
  let currentHeaders: string[] = [];

  for (const rawRow of rows) {
    const row = normalizeRow(rawRow);
    const firstCell = row[0] ?? "";

    const startMatch = firstCell.match(/^(.*)\s+Start$/i);
    if (startMatch) {
      currentSection = normalizeSectionName(startMatch[1] ?? "");
      currentHeaders = [];
      continue;
    }

    const endMatch = firstCell.match(/^(.*)\s+End$/i);
    if (endMatch) {
      const endSection = normalizeSectionName(endMatch[1] ?? "");
      if (endSection && endSection === currentSection) {
        currentSection = null;
        currentHeaders = [];
      }
      continue;
    }

    if (!currentSection) {
      continue;
    }

    if (!row.some(Boolean)) {
      continue;
    }

    if (currentHeaders.length === 0) {
      currentHeaders = row;
      continue;
    }

    const item = mapRow(currentHeaders, row);
    if (item.id) {
      sections[currentSection].push(item);
    }
  }

  return sections;
}

async function getStructuredSections(): Promise<Record<SectionName, Record<string, string>[]>> {
  const rows = await fetchSheetValues("A:Z");
  if (!rows.length) {
    return {
      configuration: [],
      payment: [],
      social: [],
      project: [],
    };
  }
  return parseStructuredSections(rows);
}

export async function getProfile(): Promise<Profile> {
  const sections = await getStructuredSections();

  if (!sections.configuration.length) {
    const rows = await fetchSheetValues("A:B");
    if (rows.length < 2) {
      return DEFAULT_PROFILE;
    }

    const profileMap = rows.slice(1).reduce<Record<string, string>>((acc, row) => {
      const key = row[0]?.trim();
      if (!key) {
        return acc;
      }
      acc[key] = row[1] ?? "";
      return acc;
    }, {});

    return {
      name: profileMap.name ?? "",
      banner_url: profileMap.banner_url ?? "",
      tagline: profileMap.tagline ?? "",
      headline: profileMap.headline ?? "",
      subheadline: profileMap.subheadline ?? "",
      avatar_url: profileMap.avatar_url ?? "",
      footer_text: profileMap.footer_text ?? "",
      website: profileMap.website ?? "",
    };
  }

  const configByName = sections.configuration.reduce<Record<string, string>>((acc, item) => {
    const key = (item.name ?? "").trim().toLowerCase();
    if (key) {
      acc[key] = item.value ?? "";
    }
    return acc;
  }, {});

  const websiteUrl =
    sections.social.find((item) => (item.name ?? "").toLowerCase() === "website")?.url ?? "";

  return {
    name: configByName.username ?? "",
    banner_url: configByName.banner ?? "",
    tagline: configByName.slogan ?? "",
    headline: configByName.slogan ?? "",
    subheadline: configByName.description ?? "",
    avatar_url: configByName.logo ?? "",
    footer_text: configByName.mission ?? "",
    website: websiteUrl || configByName.website || "",
  };
}

export async function getSocials(): Promise<Social[]> {
  const sections = await getStructuredSections();
  if (sections.social.length) {
    return sections.social
      .filter((item) => !!item.url)
      .map((item) => ({
        platform: item.name ?? "",
        label: item["display name"] ?? item.name ?? "",
        handle: item["display name"] ?? item.name ?? "",
        url: item.url ?? "#",
        icon_color: "#000000",
        active: "TRUE",
      }));
  }

  const rows = await fetchSheetValues("A:F");
  if (rows.length < 2) {
    return [];
  }
  const headers = rows[0].map((header) => header.trim());
  return rows
    .slice(1)
    .map((row) => mapRow(headers, row))
    .filter((item) => item.active?.toUpperCase() === "TRUE")
    .map((item) => ({
      platform: item.platform ?? "",
      label: item.label ?? "",
      handle: item.handle ?? "",
      url: item.url ?? "#",
      icon_color: item.icon_color ?? "#000000",
      active: item.active ?? "FALSE",
    }));
}

export async function getProducts(): Promise<Product[]> {
  const sections = await getStructuredSections();
  if (sections.project.length) {
    return sections.project.map((item, index) => {
      const oldPrice = toNumber(item["old pricing"]);
      const newPrice = toNumber(item["new pricing"]);
      const level = item.level ?? "";
      const category = item.category ?? "";
      const categories = [level, category].filter(Boolean).join(" - ");

      return {
        id: item.id ?? `project-${index + 1}`,
        title: item.name ?? "",
        description: item.description ?? "",
        category: categories,
        price: newPrice > 0 ? newPrice : oldPrice,
        original_price: newPrice > 0 ? oldPrice : 0,
        badge: item["best seller"]?.toUpperCase() === "TRUE" ? "Best Seller" : undefined,
        image_url: item.thumb || undefined,
        cta_url: item.url ?? "#",
        active: "TRUE",
        sort_order: index + 1,
      };
    });
  }

  const rows = await fetchSheetValues("A:K");
  if (rows.length < 2) {
    return [];
  }
  const headers = rows[0].map((header) => header.trim());
  return rows
    .slice(1)
    .map((row) => mapRow(headers, row))
    .filter((item) => item.active?.toUpperCase() === "TRUE")
    .map((item) => ({
      id: item.id ?? "",
      title: item.title ?? "",
      description: item.description ?? "",
      category: item.category ?? "",
      price: toNumber(item.price),
      original_price: toNumber(item.original_price),
      badge: item.badge || undefined,
      image_url: item.image_url || undefined,
      cta_url: item.cta_url ?? "#",
      active: item.active ?? "FALSE",
      sort_order: toNumber(item.sort_order),
    }))
    .sort((a, b) => a.sort_order - b.sort_order);
}
