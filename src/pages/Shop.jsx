import { useProducts } from "../context/ProductContext";
import ProductGrid from "../components/ProductGrid";

export default function Shop() {
  const { filtered, categories, search, setSearch, category, setCategory, sort, setSort } =
    useProducts();

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">Shop</h1>

      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products..."
          className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2 outline-none focus:border-indigo-500 md:max-w-sm"
        />
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="rounded-lg border border-gray-200 bg-white px-3 py-2"
        >
          <option value="default">Sort: Featured</option>
          <option value="low">Price: Low to High</option>
          <option value="high">Price: High to Low</option>
          <option value="rating">Top rated</option>
        </select>
      </div>

      <div className="mb-8 flex flex-wrap gap-2">
        {["All", ...categories].map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
              category === c
                ? "bg-indigo-600 text-white"
                : "bg-white text-gray-700 ring-1 ring-gray-200 hover:bg-gray-100"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <ProductGrid products={filtered} />
    </div>
  );
}
