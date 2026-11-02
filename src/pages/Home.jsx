import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import FeaturedProducts from "../components/FeaturedProducts";
import CategoryList from "../components/CategoryList";
import ProductGrid from "../components/ProductGrid";
import { useProducts } from "../context/ProductContext";

export default function Home() {
  const { isLoggedIn, username } = useAuth();
  const { products } = useProducts();

  return (
    <div className="space-y-14">
      <section className="rounded-3xl bg-gradient-to-br from-indigo-600 to-purple-600 px-8 py-16 text-white">
        <h1 className="max-w-xl text-4xl font-extrabold leading-tight md:text-5xl">
          {isLoggedIn ? `Welcome back, ${username}!` : "Everything you need, in one place."}
        </h1>
        <p className="mt-4 max-w-lg text-indigo-100">
          Browse electronics, fashion, home and sports essentials. Sign in to save products to your own cart.
        </p>
        <div className="mt-8 flex gap-3">
          <Link to="/shop" className="rounded-lg bg-white px-5 py-2.5 font-semibold text-indigo-700 hover:bg-indigo-50">
            Shop now
          </Link>
          {!isLoggedIn && (
            <Link to="/signup" className="rounded-lg border border-white/50 px-5 py-2.5 font-semibold hover:bg-white/10">
              Create account
            </Link>
          )}
        </div>
      </section>

      <CategoryList />
      <FeaturedProducts />

      <section>
        <h2 className="mb-6 text-2xl font-bold">New arrivals</h2>
        <ProductGrid products={products.slice(-4)} />
      </section>
    </div>
  );
}
