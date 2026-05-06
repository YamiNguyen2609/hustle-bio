import Image from "next/image";
import type { Product } from "@/types";

type ProductCardProps = {
  product: Product;
  onViewDetail: (product: Product) => void;
};

function formatVnd(value: number): string {
  return value > 0 ? new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(value) : "Miễn phí";
}

export default function ProductCard({ product, onViewDetail }: ProductCardProps) {
  return (
    <article className="overflow-hidden relative flex w-full gap-3.5 rounded-[24px] border-[4px] border-[#f5c51840] bg-[#fffdf5] transition-all duration-200 hover:translate-x-1 hover:border-[#f5c518] hover:border-l-[#f5c518] hover:shadow-[0_16px_28px_rgba(201,160,0,0.18)] max-[480px]:flex-col"
      style={{WebkitMaskImage: "-webkit-radial-gradient(white, black)"}}>
      <div className="overflow-hidden relative aspect-[4/3] max-h-[300px] bg-[#f5c51840] w-[clamp(96px,32%,220px)] shrink-0 overflow-hidden max-[480px]:max-h-[240px] max-[480px]:w-full">
        {product.badge ? (
          <span className="absolute right-3 top-3 z-[1] rounded-full bg-[#ffd84d] px-2 py-0.5 text-[0.65rem] font-bold text-[#0d0d0d]">
            {product.badge}
          </span>
        ) : null}
        <Image
            src={product.image_url || "/no-image-available.svg"}
            alt={product.title}
            fill
            sizes="(max-width: 480px) 32vw, 180px"
            className="object-cover object-center bg-[#f5c51840] block h-full"
            loading="lazy"
          />
      </div>
      <div className="min-w-0 flex-1 p-3 ">
        <h3 className="break-words font-[var(--font-syne)] text-[1.1rem] leading-tight line-clamp-2">{product.title}</h3>
        <p className="my-1.5 mb-2.5 break-words text-sm text-[#6b6455] line-clamp-3">{product.description}</p>
        <div className="flex items-center justify-between gap-3 max-[480px]:flex-col max-[480px]:items-start">
          <div className="flex items-baseline gap-2">
            {product.original_price > 0 ? (
              <span className="text-[0.86rem] text-[#6b6455] line-through ">
                {formatVnd(product.original_price)}
              </span>
            ) : null}
            <strong className="text-base text-[#6aa84f]">{formatVnd(product.price)}</strong>
          </div>
          <div className="flex items-center justify-center">

          </div>
          <button
            type="button"
            onClick={() => onViewDetail(product)}
            className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-full border border-transparent bg-[#f5c518] px-3.5 py-2.5 text-[0.9rem] font-bold text-[#0d0d0d] transition-all duration-200 hover:bg-[#ffd84d] hover:shadow-[0_8px_24px_rgba(245,197,24,0.35)] max-[480px]:w-full"
          >
            Xem chi tiết
          </button>
        </div>
      </div>
    </article>
  );
}
