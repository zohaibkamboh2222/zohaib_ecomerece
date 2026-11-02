import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { isLoggedIn } = useAuth();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const handleAdd = () => {
    if (!isLoggedIn) {
      navigate("/login", { state: { from: location.pathname } });
      return;
    }
    addToCart(product);
  };

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-100 transition hover:shadow-lg">
      <Link to={`/product/${product.id}`} className="block overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-48 w-full object-cover transition duration-300 group-hover:scale-105"
        />
      </Link>
      <div className="flex flex-1 flex-col p-4">
        <span className="text-xs font-medium uppercase tracking-wide text-indigo-600">
          {product.category}
        </span>
        <Link to={`/product/${product.id}`} className="mt-1 font-semibold hover:text-indigo-600">
          {product.name}
        </Link>
        <div className="mt-1 text-sm text-amber-500">★ {product.rating}</div>
        <div className="mt-auto flex items-center justify-between pt-4">
          <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
          <button
            onClick={handleAdd}
            className="rounded-lg bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-indigo-700 active:scale-95"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}
