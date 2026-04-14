import { Link } from "react-router-dom";

export default function PostCard({ post }) {
  const {
    title,
    slug,
    excerpt,
    coverImage,
    category,
    author,
    createdAt,
    readingTime,
    likesCount,
    commentsCount,
  } = post;

  const formattedDate = new Date(createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  const postUrl = `/post/${slug || post._id}`;

  return (
    <article className="post-card">
      {/* Cover image */}
      {coverImage && (
        <Link to={postUrl} className="post-card-image">
          <img src={coverImage} alt={title} loading="lazy" />
        </Link>
      )}

      <div className="post-card-body">
        {/* Author line */}
        <div className="post-card-author">
          <Link to={`/@${author?.username || "anonymous"}`} className="post-card-author-link">
            <div className="post-card-avatar">
              {author?.avatar ? (
                <img src={author.avatar} alt="" />
              ) : (
                <span>{author?.name?.[0]?.toUpperCase() || "?"}</span>
              )}
            </div>
            <span className="post-card-author-name">{author?.name || "Anonymous"}</span>
          </Link>
        </div>

        {/* Title & excerpt */}
        <Link to={postUrl} className="post-card-title-link">
          <h3 className="post-card-title">{title}</h3>
          {excerpt && <p className="post-card-excerpt">{excerpt}</p>}
        </Link>

        {/* Bottom meta */}
        <div className="post-card-footer">
          <div className="post-card-meta">
            <time dateTime={createdAt}>{formattedDate}</time>
            <span className="meta-dot">·</span>
            <span>{readingTime || 1} min read</span>
          </div>
          <div className="post-card-stats">
            {likesCount > 0 && <span className="stat">♥ {likesCount}</span>}
            {commentsCount > 0 && <span className="stat">💬 {commentsCount}</span>}
          </div>
        </div>

        {/* Category badge */}
        {category && (
          <Link to={`/?category=${category.slug || category}`} className="post-card-category">
            {category.name || category}
          </Link>
        )}
      </div>
    </article>
  );
}
