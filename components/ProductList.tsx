import type { Product } from "@/types";
import ProductCard from "@/components/ProductCard";

type ProductListProps = {
  products: Product[];
  onViewDetail: (product: Product) => void;
};

export default function ProductList({ products, onViewDetail }: ProductListProps) {
  return (
    <section className="mx-auto w-full max-w-[860px] px-[10px] pb-[22px] pt-[18px]">
      <div>
        <h2 className="font-[var(--font-syne)] text-[clamp(1.5rem,3.8vw,2rem)]">Template noi bat</h2>
        <p className="my-2 mb-3.5 text-[#6b6455]">Chon bo template phu hop de toi uu cong viec hang ngay.</p>
      </div>
      <div className="grid gap-[15px]">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onViewDetail={onViewDetail} />
        ))}
      </div>
    </section>
  );
}
