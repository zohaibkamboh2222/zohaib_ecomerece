import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

const CartContext = createContext(null);

const cartKey = (username) => `shopzone_cart_${username.toLowerCase()}`;

const loadCart = (username) => {
  if (!username) return [];
  try {
    return JSON.parse(localStorage.getItem(cartKey(username))) || [];
  } catch {
    return [];
  }
};

// Each cart is saved under the logged-in user's name, so every user
// sees only the products they added.
export function CartProvider({ children }) {
  const { username } = useAuth();
  const [owner, setOwner] = useState(username);
  const [items, setItems] = useState(() => loadCart(username));

  // Switch carts when the user logs in or out (adjust state during render).
  if (owner !== username) {
    setOwner(username);
    setItems(loadCart(username));
  }

  useEffect(() => {
    if (username && owner === username) {
      localStorage.setItem(cartKey(username), JSON.stringify(items));
    }
  }, [items, username, owner]);

  const addToCart = (product, qty = 1) => {
    setItems((prev) => {
      const found = prev.find((i) => i.id === product.id);
      if (found)
        return prev.map((i) => (i.id === product.id ? { ...i, qty: i.qty + qty } : i));
      return [...prev, { id: product.id, qty }];
    });
  };

  const updateQty = (id, qty) => {
    if (qty < 1) return removeFromCart(id);
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, qty } : i)));
  };

  const removeFromCart = (id) => setItems((prev) => prev.filter((i) => i.id !== id));
  const clearCart = () => setItems([]);

  const count = items.reduce((n, i) => n + i.qty, 0);

  return (
    <CartContext.Provider value={{ items, count, addToCart, updateQty, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
