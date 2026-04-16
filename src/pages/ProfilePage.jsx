import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

export default function ProfilePage() {
  const { user, updateProfile, logout } = useAuth();
  const [form, setForm] = useState({ name: "", avatar: "", bio: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    document.title = "My Profile";
    if (user) {
      setForm({
        name: user.name || "",
        avatar: user.avatar || "",
        bio: user.bio || "",
      });
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    if (!form.name) return setError("Name is required");

    try {
      setLoading(true);
      await updateProfile(form);
      setMessage("Profile updated successfully!");
      setTimeout(() => setMessage(null), 3000);
    } catch (err) {
      setError(err.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <main className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">
              আমার প্রোফাইল
            </h1>
            <button
              onClick={logout}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              লগ আউট
            </button>
          </div>

          {error && (
            <div className="mb-4 text-sm text-red-700 bg-red-50 p-4 rounded">
              {error}
            </div>
          )}

          {message && (
            <div className="mb-4 text-sm text-green-700 bg-green-50 p-4 rounded">
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email (read-only) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ইমেইল
              </label>
              <input
                type="email"
                value={user.email}
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed"
              />
              <p className="text-xs text-gray-500 mt-1">
                আপনার ইমেইল পরিবর্তন করা যাবে না
              </p>
            </div>

            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                নাম
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                placeholder="আপনার নাম"
              />
            </div>

            {/* Avatar */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                প্রোফাইল ছবি (URL)
              </label>
              <input
                type="url"
                value={form.avatar}
                onChange={(e) => setForm({ ...form, avatar: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                placeholder="https://example.com/avatar.jpg"
              />
              {form.avatar && (
                <div className="mt-3">
                  <img
                    src={form.avatar}
                    alt="Avatar preview"
                    className="h-20 w-20 rounded-full object-cover border border-gray-300"
                  />
                </div>
              )}
            </div>

            {/* Bio */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                বায়োগ্রাফি
              </label>
              <textarea
                value={form.bio}
                onChange={(e) => setForm({ ...form, bio: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                placeholder="আপনার সংক্ষিপ্ত পরিচয়"
                rows={4}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 disabled:opacity-60"
            >
              {loading ? "আপডেট হচ্ছে..." : "প্রোফাইল আপডেট করুন"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
