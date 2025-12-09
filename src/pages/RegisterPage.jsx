import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { register } = useAuth();

  const submit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!name || !email || !password)
      return setError("Please fill all fields.");
    if (password !== confirm) return setError("Passwords do not match.");
    try {
      setLoading(true);
      await register(name, email, password);
      navigate("/");
    } catch (err) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-md p-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-1">রেজিস্টার</h1>
        <p className="text-sm text-gray-500 mb-6">
          একটি নতুন অ্যাকাউন্ট তৈরি করুন
        </p>

        {error && (
          <div className="mb-4 text-sm text-red-700 bg-red-50 p-3 rounded">
            {error}
          </div>
        )}

        <form onSubmit={submit} className="space-y-4">
          <label className="block">
            <span className="text-sm text-gray-600">পূর্ণ নাম</span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-200 bg-gray-50 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="আপনার নাম"
              required
            />
          </label>

          <label className="block">
            <span className="text-sm text-gray-600">ইমেইল</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-200 bg-gray-50 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="you@example.com"
              required
            />
          </label>

          <label className="block">
            <span className="text-sm text-gray-600">পাসওয়ার্ড</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-200 bg-gray-50 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="আপনার পাসওয়ার্ড"
              required
            />
          </label>

          <label className="block">
            <span className="text-sm text-gray-600">
              পাসওয়ার্ড নিশ্চিত করুন
            </span>
            <input
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-200 bg-gray-50 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="পুনরায় পাসওয়ার্ড"
              required
            />
          </label>

          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 disabled:opacity-60"
            disabled={loading}
          >
            {loading ? "Processing..." : "রেজিস্টার"}
          </button>
        </form>

        <div className="mt-4 text-sm text-gray-600">
          আগে থেকেই অ্যাকাউন্ট আছে?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            লগইন করুন
          </Link>
        </div>
      </div>
    </main>
  );
}
