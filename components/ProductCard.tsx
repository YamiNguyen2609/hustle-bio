import Image from "next/image";
import type { Product } from "@/types";

type ProductCardProps = {
  product: Product;
};

function formatVnd(value: number): string {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="product-card fade-up">
      <div className="product-media">
        {product.badge ? <span className="product-badge">{product.badge}</span> : null}
        {product.image_url ? (
          <Image
            src={product.image_url}
            alt={product.title}
            width={100}
            height={100}
            loading="lazy"
          />
        ) : (
          <span className="product-fallback-icon" aria-hidden="true">
            =ØÊÜ
          </span>
        )}
      </div>
      <div className="product-content">
        <span className="category-pill">{product.category}</span>
        <h3>{product.title}</h3>
        <p>{product.description}</p>
        <div className="product-footer">
          <div className="price-stack">
            <strong>{formatVnd(product.price)}</strong>
            {product.original_price > 0 ? <span>{formatVnd(product.original_price)}</span> : null}
          </div>
          <a href={product.cta_url} target="_blank" rel="noreferrer" className="gold-button">
            Mua ngay
          </a>
        </div>
      </div>
    </article>
  );
}
