import ProductCard from "./ProductCard";

export default function ProductGrid({ products, emptyText = "No products found." }) {
  if (!products.length)
    return <p className="py-16 text-center text-gray-500">{emptyText}</p>;

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
