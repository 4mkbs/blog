import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { usePost, useRelatedPosts } from "../hooks/usePosts";
import BlockRenderer from "../components/BlockRenderer";
import LikeButton from "../components/LikeButton";
import CommentSection from "../components/CommentSection";
import FollowButton from "../components/FollowButton";
import RelatedPosts from "../components/RelatedPosts";

export default function PostDetailPage() {
  const { slug } = useParams();
  const { post, loading, error } = usePost(slug);
  const { posts: relatedPosts, loading: relatedLoading } = useRelatedPosts(post?._id);

  useEffect(() => {
    if (post?.title) {
      document.title = `${post.title} — mkbs.media`;
    }
    window.scrollTo(0, 0);
  }, [post]);

  if (loading) {
    return (
      <main className="post-detail-page">
        <div className="post-container">
          <div className="post-skeleton">
            <div className="skeleton-line w40" />
            <div className="skeleton-line w80" />
            <div className="skeleton-rect" />
            <div className="skeleton-line w100" />
            <div className="skeleton-line w100" />
            <div className="skeleton-line w60" />
          </div>
        </div>
      </main>
    );
  }

  if (error || !post) {
    return (
      <main className="post-detail-page">
        <div className="post-container">
          <div className="post-error">
            <h2>Post Not Found</h2>
            <p>{error || "The story you are looking for does not exist."}</p>
            <Link to="/" className="btn-primary">Back to Home</Link>
          </div>
        </div>
      </main>
    );
  }

  const { title, content, coverImage, category, tags, author, createdAt, readingTime, likesCount, viewCount } = post;

  const formattedDate = new Date(createdAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <main className="post-detail-page">
      <article className="post-container">
        {/* Article Header */}
        <header className="post-header">
          {/* Author info */}
          <div className="post-author-bar">
            <Link to={`/@${author?.username}`} className="post-author-link">
              <div className="post-author-avatar">
                {author?.avatar ? (
                  <img src={author.avatar} alt={author.name} />
                ) : (
                  <span>{author?.name?.[0]?.toUpperCase() || "A"}</span>
                )}
              </div>
              <div className="post-author-info">
                <span className="post-author-name">{author?.name || "Anonymous"}</span>
                <div className="post-meta-line">
                  <time dateTime={createdAt}>{formattedDate}</time>
                  <span className="meta-dot">·</span>
                  <span>{readingTime || 1} min read</span>
                  {viewCount > 0 && (
                    <>
                      <span className="meta-dot">·</span>
                      <span>{viewCount} views</span>
                    </>
                  )}
                </div>
              </div>
            </Link>
            <FollowButton userId={author?._id} />
          </div>

          {/* Title */}
          <h1 className="post-title">{title}</h1>

          {/* Category */}
          {category && (
            <Link to={`/?category=${category.slug}`} className="post-category-badge">
              {category.name}
            </Link>
          )}
        </header>

        {/* Cover Image */}
        {coverImage && (
          <div className="post-cover">
            <img src={coverImage} alt={title} />
          </div>
        )}

        {/* Content */}
        <div className="post-content">
          <BlockRenderer blocks={content} />
        </div>

        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="post-tags">
            {tags.map((tag) => (
              <Link
                key={tag._id || tag.slug}
                to={`/?tag=${tag.slug}`}
                className="post-tag"
              >
                {tag.name}
              </Link>
            ))}
          </div>
        )}

        {/* Like & Share */}
        <div className="post-actions-bar">
          <LikeButton postId={post._id} initialCount={likesCount || 0} />
          <div className="post-share">
            {["Twitter", "Facebook", "LinkedIn"].map((platform) => (
              <button key={platform} className="share-btn" aria-label={`Share on ${platform}`}>
                {platform}
              </button>
            ))}
          </div>
        </div>

        {/* Author Card */}
        <div className="post-author-card">
          <Link to={`/@${author?.username}`} className="author-card-avatar">
            {author?.avatar ? (
              <img src={author.avatar} alt={author.name} />
            ) : (
              <span>{author?.name?.[0]?.toUpperCase() || "A"}</span>
            )}
          </Link>
          <div className="author-card-info">
            <div className="author-card-header">
              <Link to={`/@${author?.username}`} className="author-card-name">
                {author?.name}
              </Link>
              <FollowButton userId={author?._id} />
            </div>
            {author?.bio && <p className="author-card-bio">{author.bio}</p>}
            {author?.followersCount > 0 && (
              <span className="author-card-followers">{author.followersCount} Followers</span>
            )}
          </div>
        </div>

        {/* Comments */}
        <CommentSection postId={post._id} />
      </article>

      {/* Related Posts */}
      <RelatedPosts posts={relatedPosts} loading={relatedLoading} />
    </main>
  );
}
