import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    const res = login(form);
    if (!res.ok) return setError(res.error);
    navigate(location.state?.from || "/", { replace: true });
  };

  return (
    <div className="mx-auto max-w-md rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-100">
      <h1 className="text-2xl font-bold">Welcome back</h1>
      <p className="mt-1 text-sm text-gray-500">Log in to see your cart.</p>

      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium">Username</label>
          <input
            name="username"
            value={form.username}
            onChange={onChange}
            required
            className="w-full rounded-lg border border-gray-200 px-3 py-2 outline-none focus:border-indigo-500"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={onChange}
            required
            className="w-full rounded-lg border border-gray-200 px-3 py-2 outline-none focus:border-indigo-500"
          />
        </div>
        {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}
        <button className="w-full rounded-lg bg-indigo-600 py-2.5 font-semibold text-white hover:bg-indigo-700">
          Log in
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-500">
        New here?{" "}
        <Link to="/signup" state={location.state} className="font-medium text-indigo-600 hover:underline">
          Create an account
        </Link>
      </p>
    </div>
  );
}
