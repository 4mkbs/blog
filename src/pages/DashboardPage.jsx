import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { postsAPI } from "../services/api";

export default function DashboardPage() {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("published"); // "published" | "draft"
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      const res = await postsAPI.getAll({
        author: user._id,
        status: tab,
        limit: 50,
      });
      setPosts(res.data.posts || []);
    } catch (err) {
      setError(err.message || "Failed to fetch posts");
    } finally {
      setLoading(false);
    }
  }, [user._id, tab]);

  useEffect(() => {
    document.title = "Dashboard — My Stories";
    fetchPosts();
  }, [fetchPosts]);

  const remove = async (id) => {
    if (!confirm("Delete this story permanently?")) return;
    try {
      await postsAPI.delete(id);
      setMessage("Story deleted");
      await fetchPosts();
      setTimeout(() => setMessage(null), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete");
    }
  };

  return (
    <main className="content-page">
      <section className="content-shell narrow dashboard-shell">

        <div className="dashboard-header dashboard-header-card">
          <div>
            <h2>Your Stories</h2>
            <p>Switch between published stories and drafts.</p>
          </div>
          <Link to="/write" className="btn-primary">
            Write a Story
          </Link>
        </div>

        {/* Tabs */}
        <div className="dashboard-tabs dashboard-tabs-card">
          <button
            className={`dashboard-tab ${tab === "published" ? "active" : ""}`}
            onClick={() => setTab("published")}
          >
            Published
          </button>
          <button
            className={`dashboard-tab ${tab === "draft" ? "active" : ""}`}
            onClick={() => setTab("draft")}
          >
            Drafts
          </button>
        </div>

        {/* Messages */}
        {message && <div className="dashboard-message success">{message}</div>}
        {error && <div className="dashboard-message error">{error}</div>}

        {/* Loading */}
        {loading && (
          <div className="dashboard-loading dashboard-card">
            <div className="spinner" />
          </div>
        )}

        {/* Posts list */}
        {!loading && posts.length === 0 && (
          <div className="dashboard-empty dashboard-card">
            <p>
              {tab === "draft"
                ? "No drafts yet."
                : "You haven't published any stories yet."}
            </p>
            <Link to="/write" className="btn-secondary">
              Start Writing
            </Link>
          </div>
        )}

        {!loading && posts.length > 0 && (
          <div className="dashboard-posts dashboard-post-list">
            {posts.map((post) => (
              <div key={post._id} className="dashboard-post-card">
                <div className="dashboard-post-info">
                  <Link
                    to={`/post/${post.slug}`}
                    className="dashboard-post-title"
                  >
                    {post.title}
                  </Link>
                  <p className="dashboard-post-excerpt">
                    {post.excerpt || "No excerpt"}
                  </p>
                  <div className="dashboard-post-meta">
                    <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                    {post.category && (
                      <>
                        <span className="meta-dot">·</span>
                        <span>{post.category.name || post.category}</span>
                      </>
                    )}
                    <span className="meta-dot">·</span>
                    <span>{post.readingTime || 1} min read</span>
                  </div>
                  <div className="dashboard-post-stats">
                    <span>♥ {post.likesCount || 0}</span>
                    <span>💬 {post.commentsCount || 0}</span>
                    <span>👁 {post.viewCount || 0}</span>
                  </div>
                </div>
                <div className="dashboard-post-actions">
                  <Link
                    to={`/write/${post._id}`}
                    className="btn-secondary small"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => remove(post._id)}
                    className="btn-danger small"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
