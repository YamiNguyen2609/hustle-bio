"use client";

import { useState } from "react";
import Banner from "@/components/Banner";
import ProductList from "@/components/ProductList";
import SocialLinks from "@/components/SocialLinks";
import ProductDetail from "@/components/ProductDetail";
import { useDataContext } from "@/context/DataContext";
import type { Product } from "@/types";

export default function Home() {
  const { loading, profile, socials, products, product_images, error } = useDataContext();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  if (loading) {
    return <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="flex flex-col items-center gap-3">
        <div className="w-12 h-12 border-4 border-gray-200 border-t-[#0097b2] rounded-full animate-spin"></div>
        <p className="text-sm text-gray-600 font-semibold">Đang tải...</p>
      </div>
    </div>;
  }

  if (error) {
    return <main className="p-6 text-center text-lg font-semibold text-red-600">{error}</main>;
  }

  return (
    <main className="w-[860px]">
      <Banner profile={profile} />
      <SocialLinks socials={socials} />
      <div className="mx-auto mt-3 w-full max-w-[860px] px-[10px]">
        <div className="h-px bg-[linear-gradient(90deg,transparent_0%,rgba(245,197,24,0.5)_25%,rgba(245,197,24,0.5)_75%,transparent_100%)]" />
      </div>
      <ProductList products={products} onViewDetail={setSelectedProduct} />
      {selectedProduct ? (
        <ProductDetail
          product={selectedProduct}
          productImages={product_images}
          socials={socials}
          onClose={() => setSelectedProduct(null)}
        />
      ) : null}
    </main>
  );
}
