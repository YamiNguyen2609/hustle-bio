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
    return <main className="p-6 text-center text-lg font-semibold">Loading</main>;
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
