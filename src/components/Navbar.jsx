import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState, useRef, useEffect } from "react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const menuRef = useRef(null);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setMenuOpen(false);
      setMobileSearchOpen(false);
    }
  };

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="navbar">
      {/* Mobile search */}
      {mobileSearchOpen && (
        <div className="navbar-mobile-search">
          <form onSubmit={handleSearch} className="navbar-search-form">
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search stories..."
              autoFocus
            />
            <button type="submit" aria-label="Search">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </button>
          </form>
        </div>
      )}

      <div className="navbar-inner">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          <span className="logo-text">mkbs</span>
          <span className="logo-suffix">.media</span>
        </Link>

        {/* Desktop search */}
        <form
          className="navbar-search desktop-only"
          role="search"
          onSubmit={handleSearch}
        >
          <svg className="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search"
          />
        </form>

        {/* Right side */}
        <div className="navbar-right" ref={menuRef}>
          {/* Mobile search toggle */}
          <button
            className="navbar-icon-btn mobile-only"
            onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
            aria-label="Search"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </button>

          {/* Write button */}
          {user && (
            <Link to="/write" className="navbar-write-btn desktop-only">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
              </svg>
              <span>Write</span>
            </Link>
          )}

          {/* Avatar / Menu toggle */}
          <button
            className="navbar-avatar-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
          >
            {user ? (
              <div className="navbar-avatar">
                {user.avatar ? (
                  <img src={user.avatar} alt="" />
                ) : (
                  <span>{user.name?.[0]?.toUpperCase()}</span>
                )}
              </div>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>

          {/* Dropdown menu */}
          {menuOpen && (
            <div className="navbar-dropdown">
              {user ? (
                <>
                  <div className="navbar-dropdown-user">
                    <p className="dropdown-name">{user.name}</p>
                    <p className="dropdown-email">@{user.username || user.email}</p>
                  </div>
                  <hr />
                  <Link to="/write" className="dropdown-item" onClick={() => setMenuOpen(false)}>
                    ✍️ Write a Story
                  </Link>
                  <Link to="/dashboard" className="dropdown-item" onClick={() => setMenuOpen(false)}>
                    📊 Dashboard
                  </Link>
                  <Link to="/profile" className="dropdown-item" onClick={() => setMenuOpen(false)}>
                    👤 Profile Settings
                  </Link>
                  <hr />
                  <Link to="/about" className="dropdown-item" onClick={() => setMenuOpen(false)}>About</Link>
                  <Link to="/help" className="dropdown-item" onClick={() => setMenuOpen(false)}>Help</Link>
                  <hr />
                  <button
                    className="dropdown-item dropdown-logout"
                    onClick={() => { logout(); setMenuOpen(false); }}
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="dropdown-item font-medium" onClick={() => setMenuOpen(false)}>
                    Sign In
                  </Link>
                  <Link to="/register" className="dropdown-item text-green" onClick={() => setMenuOpen(false)}>
                    Create Account
                  </Link>
                  <hr />
                  <Link to="/about" className="dropdown-item" onClick={() => setMenuOpen(false)}>About</Link>
                  <Link to="/help" className="dropdown-item" onClick={() => setMenuOpen(false)}>Help</Link>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
