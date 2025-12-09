import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { postsAPI } from "../services/api";

export default function DashboardPage() {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "",
    coverImage: "",
  });

  useEffect(() => {
    document.title = "Dashboard — My Posts";
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const res = await postsAPI.getAll();
      const userPosts = res.data.filter((p) => p.author._id === user._id);
      setPosts(userPosts);
    } catch (err) {
      setError(err.message || "Failed to fetch posts");
    } finally {
      setLoading(false);
    }
  };

  const startCreate = () => {
    setEditing(null);
    setError(null);
    setMessage(null);
    setForm({
      title: "",
      excerpt: "",
      content: "",
      category: "",
      coverImage: "",
    });
  };

  const startEdit = (post) => {
    setEditing(post._id);
    setError(null);
    setMessage(null);
    setForm({
      title: post.title || "",
      excerpt: post.excerpt || "",
      content: post.content || "",
      category: post.category || "",
      coverImage: post.coverImage || "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const save = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    if (!form.title) return setError("Title is required");
    if (!form.content) return setError("Content is required");

    try {
      setSubmitting(true);
      if (editing) {
        await postsAPI.update(editing, form);
        setMessage("Post updated successfully!");
      } else {
        await postsAPI.create(form);
        setMessage("Post created successfully!");
      }
      setEditing(null);
      setForm({
        title: "",
        excerpt: "",
        content: "",
        category: "",
        coverImage: "",
      });
      await fetchPosts();
      setTimeout(() => setMessage(null), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save post");
    } finally {
      setSubmitting(false);
    }
  };

  const remove = async (id) => {
    if (!confirm("Are you sure you want to delete this post?")) return;
    try {
      await postsAPI.delete(id);
      setMessage("Post deleted successfully!");
      await fetchPosts();
      setTimeout(() => setMessage(null), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete post");
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading posts...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">আমার পোস্ট</h1>
          <button
            onClick={startCreate}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            নতুন পোস্ট
          </button>
        </div>

        {message && (
          <div className="mb-6 text-sm text-green-700 bg-green-50 p-4 rounded">
            {message}
          </div>
        )}
        {error && (
          <div className="mb-6 text-sm text-red-700 bg-red-50 p-4 rounded">
            {error}
          </div>
        )}

        <section className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-lg font-semibold mb-4">
            {editing ? "পোস্ট এডিট করুন" : "নতুন পোস্ট লিখুন"}
          </h2>
          <form onSubmit={save} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                placeholder="শিরোনাম *"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              <input
                placeholder="ক্যাটেগরি"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>
            <input
              placeholder="কভার ইমেজ URL"
              value={form.coverImage}
              onChange={(e) => setForm({ ...form, coverImage: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <textarea
              placeholder="এক্সার্প্ট"
              value={form.excerpt}
              onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              rows={3}
            />
            <textarea
              placeholder="সম্পূর্ণ কন্টেন্ট *"
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              rows={8}
            />

            <div className="flex items-center gap-3">
              <button
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-60"
                type="submit"
                disabled={submitting}
              >
                {submitting
                  ? "সংরক্ষণ হচ্ছে..."
                  : editing
                  ? "আপডেট করুন"
                  : "প্রকাশ করুন"}
              </button>
              {editing && (
                <button
                  type="button"
                  onClick={startCreate}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
                >
                  বাতিল করুন
                </button>
              )}
            </div>
          </form>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-4">আমার সব পোস্ট</h2>
          {posts.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <p className="text-gray-500">এখনো কোনো পোস্ট নেই</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {posts.map((post) => (
                <div
                  key={post._id}
                  className="bg-white rounded-lg shadow-md p-4"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {post.title}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
                        <span>{post.category && `📁 ${post.category}`}</span>
                        <span>
                          {new Date(post.createdAt).toLocaleDateString("bn-BD")}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <button
                        onClick={() => startEdit(post)}
                        className="px-3 py-1 bg-yellow-400 text-gray-900 rounded text-sm hover:bg-yellow-500"
                      >
                        এডিট
                      </button>
                      <button
                        onClick={() => remove(post._id)}
                        className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
                      >
                        মুছুন
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
