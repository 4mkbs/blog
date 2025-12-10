import { Link } from "react-router-dom";

const navigationLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
  { label: "Privacy", to: "/privacy" },
  { label: "Help", to: "/help" },
];

const resourceLinks = [
  { label: "Latest Posts", to: "/" },
  { label: "Popular", to: "/" },
  { label: "Topics", to: "/" },
  { label: "Newsletter", to: "/" },
];

const socials = [
  { label: "X (Twitter)", href: "https://twitter.com", badge: "X" },
  { label: "Facebook", href: "https://facebook.com", badge: "f" },
  { label: "GitHub", href: "https://github.com", badge: "gh" },
];

const handleNavClick = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 bg-linear-to-br from-gray-900 via-slate-900 to-black text-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 grid gap-10 md:grid-cols-[1.2fr,1fr,1.2fr] items-start">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/10 rounded-full">
            <span className="text-xl font-extrabold text-white">mkbs</span>
            <span className="text-xs uppercase tracking-[0.2em] text-gray-400">
              media
            </span>
          </div>
          <p className="text-sm leading-relaxed text-gray-400 max-w-md">
            Curated knowledge, stories, and tools for curious minds. Built with
            React + Tailwind, crafted for fast reading.
          </p>
          <div className="flex gap-3">
            {socials.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                aria-label={item.label}
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-xs font-semibold uppercase tracking-wide text-gray-100 hover:bg-white/10 transition"
              >
                {item.badge}
              </a>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 text-sm">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400 mb-3">
              Navigate
            </h3>
            <ul className="space-y-2">
              {navigationLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    onClick={handleNavClick}
                    className="hover:text-white transition"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400 mb-3">
              Explore
            </h3>
            <ul className="space-y-2">
              {resourceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    onClick={handleNavClick}
                    className="hover:text-white transition"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-5 space-y-4 shadow-lg shadow-black/20">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-sm font-semibold text-white">
                Stay in the loop
              </h3>
              <p className="text-xs text-gray-400 mt-1">
                Get a short digest of new stories, once a week. No spam.
              </p>
            </div>
            <span className="px-2 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-semibold">
              Free
            </span>
          </div>
          <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
            <label className="sr-only" htmlFor="newsletter-email">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              placeholder="you@example.com"
              className="w-full rounded-lg bg-white/10 border border-white/10 px-3 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
            />
            <button
              type="submit"
              className="w-full inline-flex items-center justify-center rounded-lg bg-indigo-500 text-white text-sm font-semibold px-3 py-2 hover:bg-indigo-400 transition"
            >
              Subscribe
            </button>
          </form>
          <p className="text-[11px] text-gray-500">
            We respect your inbox. Unsubscribe anytime.
          </p>
        </div>
      </div>
      <div className="border-t border-white/10 text-xs py-4 text-center text-gray-400">
        © {year} mkbs.media — crafted for learning and inspiration.
      </div>
    </footer>
  );
}
