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
    <article className="group cursor-pointer">
      <Link to={postUrl} className="block">
        {/* Image Section */}
        <div className="relative overflow-hidden bg-gray-100 mb-3">
          <img
            src={coverImage || placeholderImage}
            alt={title}
            className="w-full h-auto object-cover aspect-video"
            loading="lazy"
          />
        </div>

        {/* Content Section */}
        <div>
          <p className="text-sm text-gray-700 mb-2 line-clamp-2 leading-relaxed">
            {excerpt}
          </p>

          <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
            <span className="uppercase tracking-wide">{category || "Article"}</span>
            <span>•</span>
            <span className="uppercase tracking-wide">{author?.name || "মূল"}</span>
            <span>•</span>
            <time dateTime={createdAt}>{formattedDate}</time>
          </div>

          <h3 className="text-base font-normal text-gray-900 leading-relaxed group-hover:underline">
            {title}
          </h3>
        </div>
      </Link>
    </article>
  );
}
