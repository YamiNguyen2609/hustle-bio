"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import type { Product, ProductImage, Social } from "@/types";
import SocialLinks from "./SocialLinks";

type ProductDetailProps = {
  product: Product;
  productImages: ProductImage[];
  socials: Social[];
  onClose: () => void;
};

function formatVnd(value: number): string {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function ProductDetail({ product, productImages, socials, onClose }: ProductDetailProps) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [showSocialPopup, setShowSocialPopup] = useState(false);

  const images = useMemo(() => {
    const related = productImages
      .filter((item) => item.product_id === product.id)
      .map((item) => item.url)
      .filter(Boolean);

    const all = [product.image_url ?? "", ...related].filter(Boolean);
    return [...new Set(all)];
  }, [product.id, product.image_url, productImages]);

  useEffect(() => {
    setActiveSlide(0);
  }, [product.id]);

  useEffect(() => {
    if (images.length <= 1) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => window.clearInterval(timer);
  }, [images.length]);

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (showSocialPopup) {
          setShowSocialPopup(false);
          return;
        }
        onClose();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose, showSocialPopup]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-3" onClick={onClose}>
      <div
        className="h-full w-full max-w-[860px] overflow-y-auto rounded-2xl bg-[#f9f5e8]"
        onClick={(event) => event.stopPropagation()}
      >
        <main className="mx-auto w-full max-w-[860px] space-y-6 pb-6">
          <section className="mb-0 flex h-[6vh] w-full items-center justify-between border-b-[5px] border-b-[#f5c518] bg-white px-4">
            <p className="text-lg font-semibold text-[#6b6455]">{product.title}</p>
            <button type="button" onClick={onClose} className="rounded-full py-1 text-sm font-semibold text-xl hover:bg-[#fff9de]">
            ✕
            </button>
          </section>

          <section className="relative aspect-[16/9] w-full overflow-hidden mb-0 bg-[#f5c51840]">
            <div>
              {images.length ? (
                <Image
                  src={images[activeSlide]}
                  alt={product.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 860px"
                />
              ) : null}
            </div>

            {images.length > 1 ? (
              <div className="grid grid-cols-4 gap-2 sm:grid-cols-6">
                {images.map((url, index) => (
                  <button
                    key={`${url}-${index}`}
                    type="button"
                    onClick={() => setActiveSlide(index)}
                    className={`relative aspect-video overflow-hidden rounded-lg border ${
                      index === activeSlide ? "border-[#f5c518]" : "border-[#f5c51840]"
                    }`}
                  >
                    <Image src={url} alt={`slide-${index + 1}`} fill className="object-cover" sizes="160px" />
                  </button>
                ))}
              </div>
            ) : null}
          </section>

          <section className="space-y-2 border-t-[5px] border-[#f5c518] p-4 mb-1">
            <h1 className="font-[var(--font-syne)] text-2xl">{product.title}</h1>
            <p className="text-[#6b6455]">{product.description}</p>
            <p className="text-xl font-bold text-[#6aa84f]">{formatVnd(product.price)}</p>
            
          </section>
          <section className="mx-3 text-white bg-[#f5c518] py-2 flex item-center justify-center rounded-full">
          <a className="text-center font-bold font-semibold text-xl" href={product.cta_url}>Bấm để xem template demo</a>
          </section>
          <div className="mx-auto mt-3 w-full max-w-[860px] px-[10px] mb-0">
            <div className="h-px bg-[linear-gradient(90deg,transparent_0%,rgba(245,197,24,0.5)_25%,rgba(245,197,24,0.5)_75%,transparent_100%)]" />
          </div>
          <SocialLinks socials={socials} />
        </main>
      </div>
    </div>
  );
}
