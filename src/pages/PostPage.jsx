import { Link } from "react-router-dom";

export default function PostPage() {
  return (
    <main className="content-page">
      <section className="content-shell narrow">
        <div className="notfound-card">
          <p className="content-kicker">Posts</p>
          <h1>Select a story to read</h1>
          <p>
            Individual stories are available via direct links from the home
            feed. Browse all posts to open a full article page.
          </p>
          <div className="notfound-actions">
            <Link to="/" className="btn-primary">
              Browse stories
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
