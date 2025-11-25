import { Link } from "react-router-dom";

export default function PostCard({ post, variant = "small" }) {
  const { _id, slug, title, excerpt, coverImage, category, author, createdAt } =
    post;
  const postUrl = slug ? `/post/${slug}` : `/post/${_id}`;

  const formattedDate = new Date(createdAt).toLocaleDateString("bn-BD", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const placeholderImage =
    "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&auto=format&fit=crop";

  return (
    <article className="cursor-pointer bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-shadow duration-200 overflow-hidden h-full flex flex-col">
      <Link to={postUrl} className="block flex-1 flex flex-col">
        {/* Image / Top card */}
        <div className="relative w-full h-56 overflow-hidden bg-gray-100 rounded-t-2xl flex-shrink-0">
          <img
            src={coverImage || placeholderImage}
            alt={title}
            className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-105"
            loading="lazy"
          />

          {/* category chip bottom-left */}
          <div className="absolute bottom-3 left-3 bg-black/60 text-xs text-white px-3 py-1 rounded-full">
            {category || "Article"}
          </div>
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col justify-between gap-3 flex-1">
          <div>
            <div className="flex items-center justify-between mb-2">
              <time className="text-xs text-gray-400" dateTime={createdAt}>
                {formattedDate}
              </time>
            </div>

            <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2 leading-snug line-clamp-2">
              {title}
            </h3>

            <p className="text-sm text-gray-600 mb-2 line-clamp-3">{excerpt}</p>
          </div>

          <div className="flex items-center gap-3 pt-2 mt-auto">
            <img
              src={author?.avatar || placeholderImage}
              alt={author?.name || "Author"}
              className="w-9 h-9 rounded-full object-cover flex-shrink-0"
              loading="lazy"
            />
            <div className="text-sm">
              <div className="font-medium text-gray-800">
                {author?.name || "মূল"}
              </div>
              <div className="text-xs text-gray-500">Read more →</div>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}
