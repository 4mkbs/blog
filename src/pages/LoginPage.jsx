import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!email || !password)
      return setError("Please provide email and password.");
    try {
      setLoading(true);
      // Uncomment and change endpoint when backend ready
      // const res = await axios.post('/api/users/login', { email, password });
      // localStorage.setItem('authToken', res.data.token);
      // For now, fake success after a short delay
      await new Promise((r) => setTimeout(r, 600));
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-md p-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-1">লগইন</h1>
        <p className="text-sm text-gray-500 mb-6">
          আপনার ইমেল ও পাসওয়ার্ড দিয়ে প্রবেশ করুন
        </p>

        {error && (
          <div className="mb-4 text-sm text-red-700 bg-red-50 p-3 rounded">
            {error}
          </div>
        )}

        <form onSubmit={submit} className="space-y-4">
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

          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 disabled:opacity-60"
            disabled={loading}
          >
            {loading ? "Processing..." : "লগইন"}
          </button>
        </form>

        <div className="mt-4 text-sm text-gray-600">
          নতুন ব্যবহারকারী?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            রেজিস্টার করুন
          </Link>
        </div>
      </div>
    </main>
  );
}
