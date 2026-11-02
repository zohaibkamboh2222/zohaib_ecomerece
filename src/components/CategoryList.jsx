import { Link } from "react-router-dom";
import { useProducts } from "../context/ProductContext";

export default function CategoryList() {
  const { categories, products, setCategory } = useProducts();
  return (
    <section>
      <h2 className="mb-6 text-2xl font-bold">Shop by category</h2>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {categories.map((c) => (
          <Link
            key={c}
            to="/shop"
            onClick={() => setCategory(c)}
            className="rounded-2xl bg-white p-6 text-center shadow-sm ring-1 ring-gray-100 transition hover:-translate-y-1 hover:shadow-md"
          >
            <div className="font-semibold">{c}</div>
            <div className="text-sm text-gray-500">
              {products.filter((p) => p.category === c).length} items
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
