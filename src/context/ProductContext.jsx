import { createContext, useContext, useMemo, useState } from "react";
import { products, CATEGORIES } from "../data/products";

const ProductContext = createContext(null);

export function ProductProvider({ children }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("default");

  const filtered = useMemo(() => {
    let list = products.filter(
      (p) =>
        (category === "All" || p.category === category) &&
        p.name.toLowerCase().includes(search.trim().toLowerCase())
    );
    if (sort === "low") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "high") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "rating") list = [...list].sort((a, b) => b.rating - a.rating);
    return list;
  }, [search, category, sort]);

  const getProduct = (id) => products.find((p) => p.id === Number(id));
  const featured = products.filter((p) => p.featured);
  const related = (product, limit = 4) =>
    products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, limit);

  return (
    <ProductContext.Provider
      value={{
        products, categories: CATEGORIES, filtered, featured,
        search, setSearch, category, setCategory, sort, setSort,
        getProduct, related,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export const useProducts = () => useContext(ProductContext);
