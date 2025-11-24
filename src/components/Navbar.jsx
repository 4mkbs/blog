import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl font-extrabold text-gray-900">Roar</span>
          <span className="text-xs text-gray-400">media</span>
        </Link>

        {/* Center: Search (hidden on small screens) */}
        <form
          className="hidden sm:flex items-center gap-2 bg-gray-100 rounded px-2 py-1 transition-all duration-150"
          role="search"
          onSubmit={(e) => e.preventDefault()}
        >
          <button
            type="submit"
            className="p-1 text-gray-600"
            aria-label="Search"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>

          <label htmlFor="nav-search" className="sr-only">
            Search
          </label>
          <input
            id="nav-search"
            type="search"
            name="q"
            aria-label="Search"
            placeholder="Search stories, topics..."
            className="w-56 bg-transparent text-sm outline-none placeholder-gray-500"
          />
        </form>

        {/* Right side - language + menu */}
        <div className="relative flex items-center gap-3">
          {/* Mobile search icon (visible on small screens) */}
          <button
            className="sm:hidden p-2 rounded hover:bg-gray-100"
            aria-label="Open search"
          >
            <svg
              className="w-5 h-5 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>

          <div className="flex items-center gap-2 px-3 py-1 rounded text-sm bg-gray-100">
            <span className="font-medium text-sm">Bangla</span>
            <select
              name="language"
              id="language-select"
              aria-label="Language selector"
              defaultValue="bn"
              className="bg-transparent text-sm outline-none"
            >
              <option value="bn">BN</option>
              <option value="en">EN</option>
            </select>
          </div>

          {/* Menu toggle (checkbox + peer) */}
          <input
            id="nav-menu-toggle"
            type="checkbox"
            className="sr-only peer"
          />
          <label
            htmlFor="nav-menu-toggle"
            className="p-2 hover:bg-gray-100 rounded cursor-pointer"
            aria-haspopup="true"
            aria-controls="nav-menu"
          >
            <span className="sr-only">Toggle menu</span>
            <svg
              className="w-5 h-5 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </label>

          {/* Dropdown menu positioned under the toggle */}
          <div
            id="nav-menu"
            role="menu"
            aria-label="Primary"
            className="hidden peer-checked:block absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded shadow-md z-50"
          >
            <nav className="flex flex-col p-2">
              <Link
                to="/about"
                role="menuitem"
                className="px-3 py-2 rounded text-sm hover:bg-gray-100"
                onClick={() =>
                  (document.getElementById("nav-menu-toggle").checked = false)
                }
              >
                About
              </Link>
              <Link
                to="/contact"
                role="menuitem"
                className="px-3 py-2 rounded text-sm hover:bg-gray-100"
                onClick={() =>
                  (document.getElementById("nav-menu-toggle").checked = false)
                }
              >
                Contact
              </Link>
              <Link
                to="/privacy"
                role="menuitem"
                className="px-3 py-2 rounded text-sm hover:bg-gray-100"
                onClick={() =>
                  (document.getElementById("nav-menu-toggle").checked = false)
                }
              >
                Privacy
              </Link>
              <Link
                to="/help"
                role="menuitem"
                className="px-3 py-2 rounded text-sm hover:bg-gray-100"
                onClick={() =>
                  (document.getElementById("nav-menu-toggle").checked = false)
                }
              >
                Help
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
