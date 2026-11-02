import { useState } from "react";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import RelatedProducts from "../components/RelatedProducts";

export default function ProductDetail() {
  const { id } = useParams();
  const { getProduct } = useProducts();
  const { isLoggedIn } = useAuth();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const product = getProduct(id);

  if (!product)
    return (
      <div className="py-20 text-center">
        <p className="text-gray-500">Product not found.</p>
        <Link to="/shop" className="text-indigo-600 hover:underline">Back to shop</Link>
      </div>
    );

  const handleAdd = () => {
    if (!isLoggedIn) {
      navigate("/login", { state: { from: location.pathname } });
      return;
    }
    addToCart(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div>
      <Link to="/shop" className="text-sm text-indigo-600 hover:underline">← Back to shop</Link>

      <div className="mt-6 grid gap-10 md:grid-cols-2">
        <img src={product.image} alt={product.name} className="w-full rounded-2xl object-cover shadow-sm" />

        <div>
          <span className="text-xs font-medium uppercase tracking-wide text-indigo-600">{product.category}</span>
          <h1 className="mt-1 text-3xl font-bold">{product.name}</h1>
          <div className="mt-2 text-amber-500">★ {product.rating}</div>
          <p className="mt-4 text-3xl font-bold">${product.price.toFixed(2)}</p>
          <p className="mt-4 text-gray-600">{product.description}</p>

          <div className="mt-8 flex items-center gap-4">
            <div className="flex items-center rounded-lg border border-gray-200 bg-white">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="px-3 py-2 hover:bg-gray-100">−</button>
              <span className="w-8 text-center">{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} className="px-3 py-2 hover:bg-gray-100">+</button>
            </div>
            <button
              onClick={handleAdd}
              className="rounded-lg bg-indigo-600 px-6 py-2.5 font-semibold text-white hover:bg-indigo-700 active:scale-95"
            >
              {added ? "Added ✓" : "Add to cart"}
            </button>
          </div>
          {!isLoggedIn && (
            <p className="mt-3 text-sm text-gray-500">You need to log in to add items to your cart.</p>
          )}
        </div>
      </div>

      <RelatedProducts product={product} />
    </div>
  );
}
