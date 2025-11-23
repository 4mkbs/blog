export default function Footer() {
  return (
    <footer className="mt-16 bg-gray-900 text-gray-300">
      <div className="container-wrapper py-10 grid gap-8 md:grid-cols-3">
        <div>
          <h2 className="text-xl font-semibold text-white mb-3">roar.media</h2>
          <p className="text-sm leading-relaxed">
            A modern knowledge & stories platform. Built with React + Tailwind.
            All sample content is placeholder text.
          </p>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-400 mb-3">
            Navigation
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-white">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Categories
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                About
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Contact
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-400 mb-3">
            Follow
          </h3>
          <div className="flex gap-3">
            {["twitter", "facebook", "github"].map((s) => (
              <a
                key={s}
                href="#"
                aria-label={s}
                className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-brand-600 transition"
              >
                <span className="text-xs font-semibold capitalize">{s[0]}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-gray-700 text-xs py-4 text-center">
        © {new Date().getFullYear()} roar.media clone. All rights reserved.
      </div>
    </footer>
  );
}
