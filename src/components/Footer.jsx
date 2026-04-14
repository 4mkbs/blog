import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            <span className="logo-text">mkbs</span>
            <span className="logo-suffix">.media</span>
          </Link>
          <p className="footer-tagline">Discover stories, thinking, and expertise.</p>
        </div>
        <nav className="footer-links">
          <Link to="/about">About</Link>
          <Link to="/help">Help</Link>
          <Link to="/privacy">Privacy</Link>
          <Link to="/contact">Contact</Link>
        </nav>
      </div>
    </footer>
  );
}
