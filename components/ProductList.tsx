import type { Product } from "@/types";
import ProductCard from "@/components/ProductCard";

type ProductListProps = {
  products: Product[];
};

export default function ProductList({ products }: ProductListProps) {
  return (
    <section className="section-shell product-shell">
      <div className="product-headline">
        <h2>Template noi bat</h2>
        <p>Chon bo template phu hop de toi uu cong viec hang ngay.</p>
      </div>
      <div className="product-list">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
