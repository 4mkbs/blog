import { useEffect, useState } from "react";
import { usePosts } from "../hooks/usePosts";
import PostCard from "../components/PostCard";

export default function DashboardPage() {
  const { posts: initialPosts } = usePosts();
  const [posts, setPosts] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "",
    coverImage: "",
  });

  useEffect(() => {
    // copy initial posts (dummy data) into local state
    setPosts(initialPosts || []);
  }, [initialPosts]);

  useEffect(() => {
    document.title = "Dashboard — Manage Posts";
  }, []);

  const startCreate = () => {
    setEditing(null);
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
    setForm({
      title: post.title || "",
      excerpt: post.excerpt || "",
      content: post.content || "",
      category: post.category || "",
      coverImage: post.coverImage || "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const save = (e) => {
    e.preventDefault();
    if (!form.title) return alert("Title is required");

    if (editing) {
      // update
      setPosts((p) =>
        p.map((x) => (x._id === editing ? { ...x, ...form } : x))
      );
      setEditing(null);
    } else {
      // create - generate a simple id
      const id = Date.now().toString();
      setPosts((p) => [
        {
          _id: id,
          ...form,
          slug: form.title.toLowerCase().replace(/[^a-z0-9]/g, "-"),
        },
        ...p,
      ]);
    }

    setForm({
      title: "",
      excerpt: "",
      content: "",
      category: "",
      coverImage: "",
    });
  };

  const remove = (id) => {
    if (!confirm("Are you sure you want to delete this post?")) return;
    setPosts((p) => p.filter((x) => x._id !== id));
  };

  return (
    <main className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">Dashboard — Manage Posts</h1>
          <button
            onClick={startCreate}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            New Post
          </button>
        </header>

        {/* Form (create / edit) */}
        <section className="bg-white rounded-lg shadow p-6 mb-8">
          <form onSubmit={save} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                placeholder="Title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full px-3 py-2 border rounded"
              />
              <input
                placeholder="Category"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <input
              placeholder="Cover image URL"
              value={form.coverImage}
              onChange={(e) => setForm({ ...form, coverImage: e.target.value })}
              className="w-full px-3 py-2 border rounded"
            />
            <textarea
              placeholder="Excerpt"
              value={form.excerpt}
              onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
              className="w-full px-3 py-2 border rounded"
              rows={3}
            />
            <textarea
              placeholder="Content (markdown/html)"
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              className="w-full px-3 py-2 border rounded"
              rows={6}
            />

            <div className="flex items-center gap-3">
              <button
                className="px-4 py-2 bg-green-600 text-white rounded-lg"
                type="submit"
              >
                {editing ? "Update" : "Create"}
              </button>
              {editing && (
                <button
                  type="button"
                  onClick={() => {
                    setEditing(null);
                    setForm({
                      title: "",
                      excerpt: "",
                      content: "",
                      category: "",
                      coverImage: "",
                    });
                  }}
                  className="px-3 py-2 border rounded"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </section>

        {/* List */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {posts && posts.length ? (
              posts.map((p) => (
                <div
                  key={p._id}
                  className="bg-white rounded-lg shadow overflow-hidden"
                >
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-1">{p.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{p.excerpt}</p>
                    <div className="flex items-center gap-2 mt-3">
                      <button
                        onClick={() => startEdit(p)}
                        className="px-3 py-1 bg-yellow-400 rounded text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => remove(p._id)}
                        className="px-3 py-1 bg-red-500 text-white rounded text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500 col-span-full">
                No posts yet
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
