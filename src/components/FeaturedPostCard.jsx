import { Link } from "react-router-dom";

export default function FeaturedPostCard({ post }) {
  const { _id, slug, title, excerpt, coverImage, category, author, createdAt } =
    post;
  const postUrl = slug ? `/post/${slug}` : `/post/${_id}`;

  const formattedDate = new Date(createdAt).toLocaleDateString("bn-BD", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const placeholderImage =
    "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&auto=format&fit=crop";

  return (
    <article className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow duration-200 h-full">
      <Link to={postUrl} className="block group">
        {/* Large Image Section */}
        <div
          className="relative overflow-hidden bg-gray-100"
          style={{ height: "400px" }}
        >
          <img
            src={coverImage || placeholderImage}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            loading="eager"
          />
          {category && (
            <span className="absolute top-3 left-3 px-3 py-1 text-sm font-semibold rounded bg-gray-900/90 text-white backdrop-blur-sm">
              {category}
            </span>
          )}
        </div>

        {/* Content Section */}
        <div className="p-5">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-blue-600 transition-colors line-clamp-3">
            {title}
          </h2>

          {excerpt && (
            <p className="text-sm text-gray-600 mb-4 line-clamp-4 leading-relaxed">
              {excerpt}
            </p>
          )}

          <div className="flex items-center gap-2 text-xs text-gray-500 pt-3 border-t border-gray-100">
            <span className="flex items-center gap-1.5">
              <svg
                className="w-3.5 h-3.5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="font-medium">{author?.name || "Anonymous"}</span>
            </span>
            <span>•</span>
            <time dateTime={createdAt}>{formattedDate}</time>
          </div>
        </div>
      </Link>
    </article>
  );
}
