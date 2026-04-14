    import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <main className="content-page">
      <section className="content-shell narrow">
        <div className="notfound-card">
          <p className="content-kicker">404</p>
          <h1>Page not found</h1>
          <p>
            The page you are looking for does not exist or may have been moved.
            Use the links below to continue browsing.
          </p>
          <div className="notfound-actions">
            <Link to="/" className="btn-primary">
              Back to home
            </Link>
            <Link to="/help" className="btn-secondary">
              Visit help center
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
