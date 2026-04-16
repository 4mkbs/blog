import { Link } from "react-router-dom";
import PostCard from "../components/PostCard";
import SkeletonCard from "../components/SkeletonCard";

export default function RelatedPosts({ posts, loading }) {
  if (loading) {
    return (
      <section className="py-12 border-t border-gray-200">
        <div className="container-wrapper">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Related Articles
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!posts || posts.length === 0) return null;

  return (
    <section className="py-12 border-t border-gray-200">
      <div className="container-wrapper">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Related Articles
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {posts.slice(0, 4).map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
        {posts.length > 4 && (
          <div className="mt-8 text-center">
            <Link
              to="/"
              className="inline-flex items-center px-6 py-3 bg-brand-600 text-white rounded-lg font-medium hover:bg-brand-500 transition"
            >
              View More Articles
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
