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

    const all = [...related, product.image_url ?? ""].filter(Boolean);
    return [...new Set(all)];
  }, [product.id, product.image_url, productImages]);

  // useEffect(() => {
  //   setActiveSlide(0);
  // }, [product.id]);

  // useEffect(() => {
  //   if (images.length <= 1) {
  //     return;
  //   }

  //   const timer = window.setInterval(() => {
  //     setActiveSlide((prev) => (prev + 1) % images.length);
  //   }, 3000);

  //   return () => window.clearInterval(timer);
  // }, [images.length]);

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
    <div className="fixed overflow-hidden inset-0 z-50 flex items-center justify-center bg-black/50 sm:p-3" onClick={onClose}>
      <div
        className="h-[100dvh] w-full max-w-[860px] overflow-hidden sm:h-full sm:rounded-2xl bg-[#f9f5e8]"
        onClick={(event) => event.stopPropagation()}
      >
        <main className="mx-auto flex h-full w-full max-w-[860px] flex-col">
          <section className="mb-0 flex h-14 shrink-0 w-full items-center justify-between border-b-[5px] border-b-[#f5c518] bg-white px-4">
            <p className="text-lg font-semibold text-[#6b6455]">{product.title}</p>
            <button type="button" onClick={onClose} className="rounded-full py-1 text-sm font-semibold text-xl hover:bg-[#fff9de]">
              ✕
            </button>
          </section>
          <section className="flex-1 overflow-y-auto overscroll-none pb-6">
            <section className="w-full mb-0 bg-[#f5c51840]">
              {images.length ? (
                <Image
                  src={images[0]}
                  alt={product.title}
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="w-full h-auto"
                />
              ) : null}

              {/* {images.length > 1 ? (
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
            ) : null} */}
            </section>
            <section className="mx-3 my-4 text-white bg-[#f5c518] py-2 flex item-center justify-center rounded-full">
              <a className="text-center font-bold font-semibold text-xl" href={product.cta_url}>Bấm để xem template demo</a>
            </section>
            <div className="mx-auto mb-4 w-full max-w-[860px] px-[10px] mb-0">
              <div className="h-px bg-[linear-gradient(90deg,transparent_0%,rgba(245,197,24,0.5)_25%,rgba(245,197,24,0.5)_75%,transparent_100%)]" />
            </div>
            <SocialLinks socials={socials} className="max-[480px]:grid-cols-1 gap-4" />
          </section>
        </main>
      </div>
    </div>
  );
}
