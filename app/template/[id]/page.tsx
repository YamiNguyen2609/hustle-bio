"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { useDataContext } from "@/context/DataContext";

function formatVnd(value: number): string {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function TemplateDetailPage() {
  const params = useParams<{ id: string }>();
  const { loading, products, socials, templateImages, paymentGuides } = useDataContext();
  const [activeSlide, setActiveSlide] = useState(0);
  const [showSocialPopup, setShowSocialPopup] = useState(false);

  const product = useMemo(
    () => products.find((item) => item.id === params.id),
    [products, params.id],
  );

  const images = useMemo(() => {
    if (!product) {
      return [];
    }

    const related = templateImages
      .filter((item) => item.project_id === product.id)
      .map((item) => item.url)
      .filter(Boolean);

    const all = [product.image_url ?? "", ...related].filter(Boolean);
    return [...new Set(all)];
  }, [product, templateImages]);

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
    setActiveSlide(0);
  }, [params.id]);

  if (loading) {
    return <main className="p-6 text-center text-lg font-semibold">Loading</main>;
  }

  if (!product) {
    return (
      <main className="mx-auto flex min-h-[40vh] w-full max-w-[760px] flex-col items-center justify-center gap-4 px-4 text-center">
        <p className="text-lg font-semibold">Khong tim thay template</p>
        <Link href="/" className="rounded-full bg-[#f5c518] px-4 py-2 font-semibold text-[#0d0d0d]">
          Quay lai trang chu
        </Link>
      </main>
    );
  }

  const buyingGuides = paymentGuides.length
    ? paymentGuides
    : [
        "B1: Bam nut lien he voi toi",
        "B2: Gui ten template ban muon mua",
        "B3: Chuyen khoan va gui bien lai",
        "B4: Nhan file template trong 5-15 phut",
      ];

  return (
    <main className="mx-auto w-full max-w-[760px] space-y-6 px-4 py-6">
      <Link href="/" className="inline-block text-sm font-semibold text-[#6b6455]">
        ← Quay lai
      </Link>

      <section className="space-y-3 rounded-2xl border border-[#f5c51840] bg-[#fffdf5] p-4">
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-[#f5c51840]">
          {images.length ? (
            <Image
              src={images[activeSlide]}
              alt={product.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 760px"
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

      <section className="space-y-2 rounded-2xl border border-[#f5c51840] bg-[#fffdf5] p-4">
        <h1 className="font-[var(--font-syne)] text-2xl">{product.title}</h1>
        <p className="text-[#6b6455]">{product.description}</p>
        <p className="text-xl font-bold text-[#0d0d0d]">{formatVnd(product.price)}</p>
      </section>

      <section className="rounded-2xl border border-[#f5c51840] bg-[#fffdf5] p-4">
        <button
          type="button"
          onClick={() => setShowSocialPopup(true)}
          className="rounded-full bg-[#f5c518] px-4 py-2 font-bold text-[#0d0d0d]"
        >
          lien he voi toi
        </button>
      </section>

      <section className="rounded-2xl border border-[#f5c51840] bg-[#fffdf5] p-4">
        <h2 className="mb-3 font-[var(--font-syne)] text-xl">Huong dan mua hang</h2>
        <ol className="space-y-2 text-[#6b6455]">
          {buyingGuides.map((guide, index) => (
            <li key={`${guide}-${index}`}>{guide}</li>
          ))}
        </ol>
      </section>

      {showSocialPopup ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-4">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="font-[var(--font-syne)] text-lg">Danh sach social</h3>
              <button type="button" onClick={() => setShowSocialPopup(false)} className="text-sm font-semibold">
                Dong
              </button>
            </div>
            <div className="space-y-2">
              {socials.map((social) => (
                <a
                  key={`${social.platform}-${social.url}`}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  className="block rounded-xl border border-[#f5c51840] p-3 hover:bg-[#fff9de]"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
}
