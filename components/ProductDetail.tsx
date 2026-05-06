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

export default function ProductDetail({
  product,
  productImages,
  socials,
  onClose,
}: ProductDetailProps) {
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
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 sm:p-3"
      onClick={onClose}
    >
      <div
        className="h-[100dvh] w-full max-w-[860px] overflow-hidden bg-[#e8f6f9] sm:h-auto sm:max-h-[95dvh] sm:rounded-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <main className="mx-auto flex h-full w-full max-w-[860px] flex-col">
          {/* Header */}
          <section className="flex h-14 shrink-0 w-full items-center justify-between border-b-[5px] border-b-[#0097b2] bg-white px-4">
            <p className="text-lg font-semibold text-[#2e5f6b]">
              {product.title}
            </p>

            <button
              type="button"
              onClick={onClose}
              className="rounded-full py-1 text-xl font-semibold hover:bg-[#e6f7fb]"
            >
              ✕
            </button>
          </section>

          {/* Body */}
          <section className="flex-1 overflow-y-auto overscroll-none pb-6 [-webkit-overflow-scrolling:touch]">
            {/* Hero image */}
            <section className="mb-0 w-full bg-[#0097b240]">
              {images.length ? (
                <Image
                  src={images[0]}
                  alt={product.title}
                  width={1200}
                  height={800}
                  sizes="100vw"
                  className="block h-auto w-full"
                  priority
                />
              ) : null}
            </section>

            {/* CTA */}
            <section className="mx-3 my-4 flex items-center justify-center rounded-full bg-[#0097b2] py-2 text-white">
              <a
                href={product.cta_url}
                className="text-center text-xl font-bold"
              >
                Bấm để xem template demo
              </a>
            </section>

            {/* Divider */}
            <div className="mx-auto mb-4 w-full max-w-[860px] px-[10px]">
              <div className="h-px bg-[linear-gradient(90deg,transparent_0%,rgba(0,151,178,0.5)_25%,rgba(0,151,178,0.5)_75%,transparent_100%)]" />
            </div>

            {/* Social links */}
            <SocialLinks
              socials={socials}
              className="gap-4 max-[480px]:grid-cols-1"
            />
          </section>
        </main>
      </div>
    </div>
  );
}
