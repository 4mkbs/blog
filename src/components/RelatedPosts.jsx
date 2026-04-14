import { Link } from "react-router-dom";

export default function RelatedPosts({ posts, loading }) {
  if (loading) {
    return (
      <section className="related-section">
        <div className="related-inner">
          <h2 className="related-title">More Stories</h2>
          <div className="related-grid">
            {[1, 2, 3].map((i) => (
              <div key={i} className="post-card-skeleton">
                <div className="skeleton-rect" />
                <div className="skeleton-line w80" />
                <div className="skeleton-line w60" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!posts?.length) return null;

  return (
    <section className="related-section">
      <div className="related-inner">
        <h2 className="related-title">More Stories</h2>
        <div className="related-grid">
          {posts.map((post) => (
            <Link
              key={post._id}
              to={`/post/${post.slug || post._id}`}
              className="related-card"
            >
              {post.coverImage && (
                <img src={post.coverImage} alt="" className="related-card-img" loading="lazy" />
              )}
              <div className="related-card-body">
                <h3>{post.title}</h3>
                <div className="related-card-meta">
                  <span>{post.author?.name || "Anonymous"}</span>
                  <span className="meta-dot">·</span>
                  <span>{post.readingTime || 1} min</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
