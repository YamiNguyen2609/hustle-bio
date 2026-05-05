import { NextResponse } from "next/server";
import {
  getPaymentGuides,
  getProducts,
  getProfile,
  getSocials,
  getTemplateImages,
} from "@/lib/googleSheets";
import type { SiteData } from "@/types";

export async function GET() {
  const [profile, socials, products, templateImages, paymentGuides] = await Promise.all([
    getProfile(),
    getSocials(),
    getProducts(),
    getTemplateImages(),
    getPaymentGuides(),
  ]);

  const data: SiteData = {
    profile,
    socials,
    products,
    templateImages,
    paymentGuides,
  };

  return NextResponse.json(data);
}
