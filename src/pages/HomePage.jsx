import { useEffect, useState, useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { usePosts } from "../hooks/usePosts";
import { useCategories } from "../hooks/useCategories";
import { useTags } from "../hooks/useTags";
import PostCard from "../components/PostCard";

export default function HomePage() {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const categoryFilter = searchParams.get("category") || "";
  const tagFilter = searchParams.get("tag") || "";
  const [page, setPage] = useState(1);

  const { posts, loading, error, pagination } = usePosts({
    search: searchQuery,
    category: categoryFilter,
    tag: tagFilter,
    page,
    limit: 12,
  });

  const { categories } = useCategories();
  const { tags: trendingTags } = useTags();

  // Show top 12 tags
  const topTags = useMemo(() => {
    return (trendingTags || []).slice(0, 12);
  }, [trendingTags]);

  useEffect(() => {
    setPage(1);
  }, [searchQuery, categoryFilter, tagFilter]);

  useEffect(() => {
    document.title = searchQuery
      ? `Search: ${searchQuery} — mkbs.media`
      : "mkbs.media — Discover Stories";
  }, [searchQuery]);

  // Staggered animation for post cards
  useEffect(() => {
    const els = document.querySelectorAll(".post-grid-item");
    els.forEach((el, i) => {
      el.style.transition = "opacity 400ms ease, transform 400ms ease";
      el.style.transitionDelay = `${i * 50}ms`;
      requestAnimationFrame(() => {
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      });
    });
  }, [posts]);

  const activeFilters = searchQuery || categoryFilter || tagFilter;

  const stats = [
    { label: "Stories", value: pagination.total || posts.length || 0 },
    { label: "Topics", value: categories.length || 0 },
    { label: "Tags", value: topTags.length || 0 },
  ];

  return (
    <main className="content-page">
      <section className="content-shell">
        {/* Category Navigation */}
        {!activeFilters && (
          <nav className="category-nav home-category-nav">
            <div className="category-nav-inner">
              <Link
                to="/"
                className={`category-tab ${!categoryFilter ? "active" : ""}`}
              >
                For You
              </Link>
              {categories.map((cat) => (
                <Link
                  key={cat._id}
                  to={`/?category=${cat.slug}`}
                  className={`category-tab ${
                    categoryFilter === cat.slug ? "active" : ""
                  }`}
                >
                  {cat.name}  
                </Link>
              ))}
            </div>
          </nav>
        )}

        <div className="home-layout">
          {/* Main content */}
          <section className="home-main">
            {/* Active filter header */}
            {activeFilters && (
              <div className="filter-header content-filter-header">
                <div>
                  <h2 className="filter-title">
                    {searchQuery && `Results for "${searchQuery}"`}
                    {categoryFilter && `Category: ${categoryFilter}`}
                    {tagFilter && `Tag: #${tagFilter}`}
                  </h2>
                  <p className="filter-count">
                    {pagination.total} stories found
                  </p>
                </div>
                <Link to="/" className="filter-clear">
                  Clear filters
                </Link>
              </div>
            )}

            {/* Error state */}
            {error && (
              <div className="home-error">
                <p>Failed to load stories: {error}</p>
              </div>
            )}

            {/* Loading state */}
            {loading && (
              <div className="posts-grid">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="post-card-skeleton">
                    <div className="skeleton-rect" />
                    <div className="skeleton-line w80" />
                    <div className="skeleton-line w60" />
                    <div className="skeleton-line w40" />
                  </div>
                ))}
              </div>
            )}

            {/* Posts grid */}
            {!loading && posts.length > 0 && (
              <>
                <div className="posts-grid home-posts-grid">
                  {posts.map((post) => (
                    <div
                      key={post._id}
                      className="post-grid-item"
                      style={{ opacity: 0, transform: "translateY(12px)" }}
                    >
                      <PostCard post={post} />
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {pagination.pages > 1 && (
                  <div className="pagination">
                    <button
                      className="pagination-btn"
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      disabled={page <= 1}
                    >
                      ← Previous
                    </button>
                    <span className="pagination-info">
                      Page {pagination.page} of {pagination.pages}
                    </span>
                    <button
                      className="pagination-btn"
                      onClick={() =>
                        setPage((p) => Math.min(pagination.pages, p + 1))
                      }
                      disabled={page >= pagination.pages}
                    >
                      Next →
                    </button>
                  </div>
                )}
              </>
            )}

            {/* Empty state */}
            {!loading && posts.length === 0 && (
              <div className="home-empty">
                <h3>No stories found</h3>
                <p>Try a different search or browse categories above.</p>
                {activeFilters && (
                  <Link to="/" className="btn-primary">
                    Browse All Stories
                  </Link>
                )}
              </div>
            )}
          </section>

          {/* Sidebar */}
          <aside className="home-sidebar">
            {/* Trending Tags */}
            <div className="sidebar-section sidebar-panel">
              <h3 className="sidebar-title">Trending Topics</h3>
              <div className="sidebar-tags">
                {topTags.map((tag) => (
                  <Link
                    key={tag._id}
                    to={`/?tag=${tag.slug}`}
                    className="sidebar-tag"
                  >
                    #{tag.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Reading recommendation */}
            <div className="sidebar-section sidebar-panel">
              <h3 className="sidebar-title">Start Writing</h3>
              <p className="sidebar-text">
                Share your ideas with the world. Create beautiful stories with
                our Medium-style editor.
              </p>
              <Link to="/write" className="btn-primary sidebar-btn">
                Write a Story
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
