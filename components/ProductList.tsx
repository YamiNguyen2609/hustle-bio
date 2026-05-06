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
        <h2 className="mb-3.5 text-[0.78rem] font-bold uppercase tracking-[0.12em] text-[#6b6455]">Template nổi bật</h2>
      </div>
      <div className="grid gap-[15px]">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onViewDetail={onViewDetail} />
        ))}
      </div>
    </section>
  );
}
