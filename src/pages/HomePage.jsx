import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { usePosts } from "../hooks/usePosts";
import PostCard from "../components/PostCard";
// FeaturedPostCard removed for uniform masonry
import SkeletonCard from "../components/SkeletonCard";

export default function HomePage() {
  const { posts, loading, error } = usePosts();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  // Filter posts based on search query
  const filteredPosts = useMemo(() => {
    if (!searchQuery.trim()) return posts;

    const query = searchQuery.toLowerCase();
    return posts.filter(
      (post) =>
        post.title?.toLowerCase().includes(query) ||
        post.content?.toLowerCase().includes(query) ||
        post.excerpt?.toLowerCase().includes(query) ||
        post.category?.toLowerCase().includes(query) ||
        post.tags?.some((tag) => tag.toLowerCase().includes(query))
    );
  }, [posts, searchQuery]);

  useEffect(() => {
    document.title = searchQuery
      ? `Search: ${searchQuery} - mkbs.media`
      : "mkbs.media - Knowledge & Stories";
  }, [searchQuery]);

  useEffect(() => {
    // Simple mount animation: reveal items with staggered fade-up whenever posts change
    const els = document.querySelectorAll(".post-grid-item");
    els.forEach((el, i) => {
      // ensure a smooth transition even if CSS wasn't set
      el.style.transition =
        "opacity 420ms cubic-bezier(.2,.9,.2,1), transform 420ms cubic-bezier(.2,.9,.2,1)";
      el.style.transitionDelay = `${i * 45}ms`;
      // trigger the animation (initial styles provided inline below)
      requestAnimationFrame(() => {
        el.style.opacity = "1";
        el.style.transform = "translateY(0) scale(1)";
      });
    });
  }, [filteredPosts]);

  if (error) {
    return (
      <main className="min-h-screen bg-white">
        <section className="w-full mx-auto px-2 sm:px-3 lg:px-4 py-10">
          <div className="bg-red-50 border border-red-200 rounded-lg p-5 text-center max-w-xl mx-auto">
            <p className="text-red-700 font-medium">Failed to load posts</p>
            <p className="text-sm text-red-600 mt-1">{error}</p>
          </div>
        </section>
      </main>
    );
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50">
        <section className="w-full mx-auto px-1 sm:px-2 lg:px-3 py-6">
          <div className="grid gap-3 sm:gap-4 md:gap-5 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </section>
      </main>
    );
  }

  // Show search results message
  const showSearchMessage = searchQuery.trim() !== "";

  return (
    <main className="bg-[#F5F9FE]">
      <section className="w-full mx-auto px-1 sm:px-2 lg:px-3 py-6">
        {/* Search results header */}
        {showSearchMessage && (
          <div className="mb-6 px-2">
            <h2 className="text-xl font-semibold text-gray-800">
              Search results for "{searchQuery}"
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              {filteredPosts.length}{" "}
              {filteredPosts.length === 1 ? "post" : "posts"} found
            </p>
          </div>
        )}

        {/* No results message */}
        {showSearchMessage && filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              No posts found matching your search.
            </p>
            <a
              href="/"
              className="inline-block mt-4 text-blue-600 hover:text-blue-700 underline"
            >
              Clear search
            </a>
          </div>
        )}

        {/* Responsive grid: 2/3/4/5 columns on sm/md/lg/xl.
            Second item (index 1) spans two columns on screens >= sm. */}
        {filteredPosts.length > 0 && (
          <div className="grid gap-3 sm:gap-4 md:gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xxl:grid-cols-5">
            {filteredPosts.map((post, idx) => {
              const isSecond = idx === 1;
              const desc = String(post.description || "");
              const long = desc.length > 140;

              return (
                <div
                  key={post._id}
                  className={[
                    "post-grid-item rounded-lg overflow-hidden",
                    // make second card span two columns on multi-column layouts
                    isSecond
                      ? "sm:col-span-2 md:col-span-2 lg:col-span-2 xl:col-span-2"
                      : "",
                  ].join(" ")}
                  // start invisible and slightly translated; the useEffect above will reveal them
                  style={{
                    opacity: 0,
                    transform: "translateY(8px) scale(0.995)",
                  }}
                >
                  {/* Card container controls min-height to create small/large visual weight
                      and adds a subtle shadow + hover lift for polish */}
                  <div
                    className={[
                      "bg-white shadow-sm hover:shadow-md transition-shadow duration-200 ease-out",
                      long ? "min-h-[220px]" : "min-h-[140px]",
                      // keep content flowing so cards vary naturally if PostCard grows
                      "flex flex-col",
                    ].join(" ")}
                  >
                    <PostCard post={post} />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
