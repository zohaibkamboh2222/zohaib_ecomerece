import { useProducts } from "../context/ProductContext";
import ProductGrid from "./ProductGrid";

export default function RelatedProducts({ product }) {
  const { related } = useProducts();
  const list = related(product);
  if (!list.length) return null;
  return (
    <section className="mt-16">
      <h2 className="mb-6 text-2xl font-bold">You may also like</h2>
      <ProductGrid products={list} />
    </section>
  );
}
