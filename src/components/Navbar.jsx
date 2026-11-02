import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const linkClass = ({ isActive }) =>
  `text-sm font-medium transition ${isActive ? "text-indigo-600" : "text-gray-600 hover:text-gray-900"}`;

export default function Navbar() {
  const { isLoggedIn, username, logout } = useAuth();
  const { count } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-20 border-b border-gray-100 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link to="/" className="text-xl font-extrabold text-indigo-600">
          Shop<span className="text-gray-900">Zone</span>
        </Link>

        <nav className="flex items-center gap-5">
          <NavLink to="/" end className={linkClass}>Home</NavLink>
          <NavLink to="/shop" className={linkClass}>Shop</NavLink>
          <NavLink to="/cart" className={linkClass}>
            Cart
            {count > 0 && (
              <span className="ml-1 rounded-full bg-indigo-600 px-1.5 py-0.5 text-xs text-white">
                {count}
              </span>
            )}
          </NavLink>
        </nav>

        <div className="flex items-center gap-3">
          {isLoggedIn ? (
            <>
              <span className="hidden text-sm text-gray-600 sm:inline">
                Hi, <b>{username}</b>
              </span>
              <button
                onClick={handleLogout}
                className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm font-medium hover:bg-gray-100"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm font-medium text-gray-700 hover:text-gray-900">
                Login
              </Link>
              <Link
                to="/signup"
                className="rounded-lg bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-indigo-700"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
