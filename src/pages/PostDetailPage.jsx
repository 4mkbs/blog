import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { usePost, useRelatedPosts } from "../hooks/usePosts";
import RelatedPosts from "../components/RelatedPosts";

export default function PostDetailPage() {
  const { slug } = useParams();
  const { post, loading, error } = usePost(slug);
  const { posts: relatedPosts, loading: relatedLoading } = useRelatedPosts(
    post?._id
  );

  useEffect(() => {
    if (post?.title) {
      document.title = `${post.title} - mkbs.media`;
    }
    window.scrollTo(0, 0);
  }, [post]);

  if (loading) {
    return (
      <div className="container-wrapper py-12">
        <div className="max-w-4xl mx-auto space-y-4 animate-pulse">
          <div className="h-8 bg-gray-300 rounded w-1/4" />
          <div className="h-12 bg-gray-300 rounded w-3/4" />
          <div className="aspect-video bg-gray-300 rounded-xl" />
          <div className="space-y-2">
            <div className="h-4 bg-gray-300 rounded" />
            <div className="h-4 bg-gray-300 rounded" />
            <div className="h-4 bg-gray-300 rounded w-5/6" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="container-wrapper py-12">
        <div className="max-w-2xl mx-auto bg-red-50 border border-red-200 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-red-700 mb-2">
            Post Not Found
          </h2>
          <p className="text-red-600 mb-4">
            {error || "The post you are looking for does not exist."}
          </p>
          <Link
            to="/"
            className="inline-block px-6 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-500 transition"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const { title, content, coverImage, category, tags, author, createdAt } =
    post;
  const formattedDate = new Date(createdAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const placeholderImage =
    "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&auto=format&fit=crop";

  return (
    <main className="bg-[#F5F9FE]">
      {/* Article Header */}
      <article className="py-8 md:py-12">
        <div className="bg-white container-wrapper max-w-4xl border p-6 rounded-lg shadow-sm">
          {/* Breadcrumb */}
          <nav className="mb-4 text-sm text-gray-500">
            <Link to="/" className="hover:text-brand-600">
              Home
            </Link>
            {category && (
              <>
                <span className="mx-2">/</span>
                <span className="text-gray-700">{category}</span>
              </>
            )}
          </nav>

          {/* Category Badge */}
          {category && (
            <div className="mb-4">
              <span className="badge text-sm">{category}</span>
            </div>
          )}

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            {title}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 mb-8 pb-8 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center text-brand-700 font-semibold">
                {author?.name?.[0]?.toUpperCase() || "A"}
              </div>
              <div>
                <p className="font-medium text-gray-900">
                  {author?.name || "Anonymous"}
                </p>
                <time dateTime={createdAt} className="text-xs">
                  {formattedDate}
                </time>
              </div>
            </div>
          </div>

          {/* Cover Image */}
          {(coverImage || placeholderImage) && (
            <div className="mb-8 rounded-xl overflow-hidden">
              <img
                src={coverImage || placeholderImage}
                alt={title}
                className="w-full h-auto"
              />
            </div>
          )}

          {/* Content */}
          <div className="prose-custom">
            <div
              dangerouslySetInnerHTML={{
                __html: content.replace(/\n/g, "<br/>"),
              }}
            />
          </div>

          {/* Tags */}
          {tags && tags.length > 0 && (
            <div className="mt-8 pt-8 border-t border-gray-200">
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 cursor-pointer"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Share Section */}
          <div className="mt-8 pt-8 border-t border-gray-200 flex items-center gap-4">
            <span className="text-sm font-medium text-gray-700">Share:</span>
            <div className="flex gap-2">
              {["Twitter", "Facebook", "LinkedIn"].map((platform) => (
                <button
                  key={platform}
                  className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                  aria-label={`Share on ${platform}`}
                >
                  {platform}
                </button>
              ))}
            </div>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      <RelatedPosts posts={relatedPosts} loading={relatedLoading} />
    </main>
  );
}
