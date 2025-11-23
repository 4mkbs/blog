import { useEffect } from "react";
import { usePosts } from "../hooks/usePosts";
import PostCard from "../components/PostCard";
import FeaturedPostCard from "../components/FeaturedPostCard";
import SkeletonCard from "../components/SkeletonCard";

export default function HomePage() {
  const { posts, loading, error } = usePosts();

  useEffect(() => {
    document.title = "roar.media - Knowledge & Stories";
  }, []);

  if (error) {
    return (
      <div className="container-wrapper py-12">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <p className="text-red-700 font-medium">Failed to load posts</p>
          <p className="text-sm text-red-600 mt-1">{error}</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50">
        <section className="container-wrapper py-6">
          <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 9 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </section>
      </main>
    );
  }

  if (posts.length === 0) {
    return (
      <main className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 py-12 text-center">
          <p className="text-gray-500 text-lg">
            No posts found. Create some posts to get started!
          </p>
        </div>
      </main>
    );
  }

  // Layout: Left column posts, Middle featured post, Right column posts
  const leftColumnPosts = [posts[0], posts[3], posts[6]];
  const featuredPost = posts[1]; // Middle large card
  const rightColumnPosts = [posts[2], posts[4], posts[5], posts[7]];

  return (
    <main className="min-h-screen bg-white">
      <section className="max-w-6xl mx-auto px-4 py-6">
        {/* 3 Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
          {/* LEFT COLUMN - Smaller cards */}
          <div className="space-y-8">
            {leftColumnPosts.map(
              (post) =>
                post && <PostCard key={post._id} post={post} variant="small" />
            )}
          </div>

          {/* MIDDLE COLUMN - Large featured card */}
          <div>
            <FeaturedPostCard post={featuredPost} />
          </div>

          {/* RIGHT COLUMN - Smaller cards */}
          <div className="space-y-8">
            {rightColumnPosts.map(
              (post) =>
                post && <PostCard key={post._id} post={post} variant="small" />
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
