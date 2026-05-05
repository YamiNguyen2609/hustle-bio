"use client";

import Link from "next/link";
import { useDataContext } from "@/context/DataContext";

export default function TemplatePage() {
  const { loading, products } = useDataContext();

  if (loading) {
    return <main className="p-6 text-center text-lg font-semibold">Loading</main>;
  }

  return (
    <main className="mx-auto w-full max-w-[760px] px-4 py-6">
      <h1 className="mb-4 font-[var(--font-syne)] text-2xl">Template</h1>
      <div className="grid gap-3">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/template/${product.id}`}
            className="rounded-xl border border-[#f5c51840] bg-[#fffdf5] p-3 font-semibold hover:border-[#f5c518]"
          >
            {product.title}
          </Link>
        ))}
      </div>
    </main>
  );
}
