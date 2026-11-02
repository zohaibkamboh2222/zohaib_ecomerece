import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useProducts } from "../context/ProductContext";

export default function Cart() {
  const { username } = useAuth();
  const { items, updateQty, removeFromCart, clearCart } = useCart();
  const { getProduct } = useProducts();

  const rows = items
    .map((i) => ({ ...i, product: getProduct(i.id) }))
    .filter((r) => r.product);
  const total = rows.reduce((sum, r) => sum + r.product.price * r.qty, 0);

  return (
    <div>
      <h1 className="text-3xl font-bold">{username}'s cart</h1>

      {rows.length === 0 ? (
        <div className="py-20 text-center">
          <p className="text-gray-500">Your cart is empty.</p>
          <Link to="/shop" className="mt-3 inline-block rounded-lg bg-indigo-600 px-5 py-2 font-medium text-white hover:bg-indigo-700">
            Start shopping
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            {rows.map(({ product, qty }) => (
              <div key={product.id} className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-gray-100">
                <img src={product.image} alt={product.name} className="h-20 w-24 rounded-lg object-cover" />
                <div className="flex-1">
                  <Link to={`/product/${product.id}`} className="font-semibold hover:text-indigo-600">
                    {product.name}
                  </Link>
                  <div className="text-sm text-gray-500">${product.price.toFixed(2)} each</div>
                  <div className="mt-2 flex items-center gap-2">
                    <button onClick={() => updateQty(product.id, qty - 1)} className="h-7 w-7 rounded border border-gray-200 hover:bg-gray-100">−</button>
                    <span className="w-6 text-center text-sm">{qty}</span>
                    <button onClick={() => updateQty(product.id, qty + 1)} className="h-7 w-7 rounded border border-gray-200 hover:bg-gray-100">+</button>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold">${(product.price * qty).toFixed(2)}</div>
                  <button onClick={() => removeFromCart(product.id)} className="mt-2 text-sm text-red-500 hover:underline">
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <aside className="h-fit rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
            <h2 className="text-lg font-semibold">Order summary</h2>
            <div className="mt-4 flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="mt-2 flex justify-between text-gray-600">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="mt-4 flex justify-between border-t border-gray-100 pt-4 text-lg font-bold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button className="mt-6 w-full rounded-lg bg-indigo-600 py-2.5 font-semibold text-white hover:bg-indigo-700">
              Checkout
            </button>
            <button onClick={clearCart} className="mt-3 w-full text-sm text-gray-500 hover:text-red-500">
              Clear cart
            </button>
          </aside>
        </div>
      )}
    </div>
  );
}
