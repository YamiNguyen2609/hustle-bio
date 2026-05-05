"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { SiteData } from "@/types";

type DataContextValue = SiteData & {
  loading: boolean;
  error: string | null;
};

const defaultValue: DataContextValue = {
  profile: {
    name: "",
    banner_url: "",
    tagline: "",
    headline: "",
    subheadline: "",
    avatar_url: "",
    footer_text: "",
    website: "",
  },
  socials: [],
  products: [],
  product_images: [],
  paymentGuides: [],
  loading: true,
  error: null,
};

const DataContext = createContext<DataContextValue>(defaultValue);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [value, setValue] = useState<DataContextValue>(defaultValue);

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        const response = await fetch("/api/site-data", { method: "GET" });
        if (!response.ok) {
          throw new Error("Failed to load site data.");
        }

        const data = (await response.json()) as SiteData;
        if (!active) {
          return;
        }
        setValue({
          ...data,
          loading: false,
          error: null,
        });
      } catch (error) {
        if (!active) {
          return;
        }
        setValue((prev) => ({
          ...prev,
          loading: false,
          error: error instanceof Error ? error.message : "Failed to load site data.",
        }));
      }
    }

    load();
    return () => {
      active = false;
    };
  }, []);

  const contextValue = useMemo(() => value, [value]);
  return <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>;
}

export function useDataContext() {
  return useContext(DataContext);
}
