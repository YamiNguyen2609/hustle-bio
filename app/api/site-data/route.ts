import { NextResponse } from "next/server";
import {
  getPaymentGuides,
  getProducts,
  getProfile,
  getSocials,
  getProductImages,
} from "@/lib/googleSheets";
import type { SiteData } from "@/types";

export async function GET() {
  const [profile, socials, products, product_images, paymentGuides] = await Promise.all([
    getProfile(),
    getSocials(),
    getProducts(),
    getProductImages(),
    getPaymentGuides(),
  ]);

  const data: SiteData = {
    profile,
    socials,
    products,
    product_images,
    paymentGuides,
  };

  return NextResponse.json(data);
}
