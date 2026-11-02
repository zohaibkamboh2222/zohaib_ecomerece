import { Link } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import ProductGrid from "./ProductGrid";

export default function FeaturedProducts() {
  const { featured } = useProducts();
  return (
    <section>
      <div className="mb-6 flex items-end justify-between">
        <h2 className="text-2xl font-bold">Featured products</h2>
        <Link to="/shop" className="text-sm font-medium text-indigo-600 hover:underline">
          View all →
        </Link>
      </div>
      <ProductGrid products={featured.slice(0, 4)} />
    </section>
  );
}
