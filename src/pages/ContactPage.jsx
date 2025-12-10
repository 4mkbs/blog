export default function ContactPage() {
  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-12">
      <header className="space-y-3 text-center">
        <p className="text-sm font-semibold text-indigo-600">Get in touch</p>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
          We'd love to hear from you
        </h1>
        <p className="text-gray-700 leading-relaxed max-w-2xl mx-auto">
          Have feedback, questions, or just want to say hello? Drop us a line
          and we'll get back to you as soon as we can.
        </p>
      </header>

      <div className="grid gap-8 md:grid-cols-[2fr,1fr]">
        <form className="space-y-5 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-semibold text-gray-900 mb-2"
            >
              Full name
            </label>
            <input
              id="name"
              type="text"
              required
              placeholder="Your name"
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-900 mb-2"
            >
              Email address
            </label>
            <input
              id="email"
              type="email"
              required
              placeholder="you@example.com"
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
            />
          </div>

          <div>
            <label
              htmlFor="subject"
              className="block text-sm font-semibold text-gray-900 mb-2"
            >
              Subject
            </label>
            <input
              id="subject"
              type="text"
              required
              placeholder="What is this about?"
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-sm font-semibold text-gray-900 mb-2"
            >
              Message
            </label>
            <textarea
              id="message"
              required
              rows={5}
              placeholder="Your message here..."
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-indigo-500 text-white font-semibold py-2 hover:bg-indigo-400 transition"
          >
            Send message
          </button>
          <p className="text-xs text-gray-500 text-center">
            We'll respond within 24 hours.
          </p>
        </form>

        <div className="space-y-5">
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm space-y-3">
            <h3 className="text-sm font-semibold text-gray-900">Email</h3>
            <a
              href="mailto:hello@mkbs.media"
              className="text-indigo-600 font-semibold hover:text-indigo-500"
            >
              hello@mkbs.media
            </a>
            <p className="text-xs text-gray-600">
              Best for longer queries and feedback.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm space-y-3">
            <h3 className="text-sm font-semibold text-gray-900">Follow us</h3>
            <div className="flex gap-3">
              {[
                {
                  label: "X",
                  href: "https://twitter.com/mkbs_media",
                  badge: "X",
                },
                { label: "Facebook", href: "https://facebook.com", badge: "f" },
                { label: "GitHub", href: "https://github.com", badge: "gh" },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={item.label}
                  title={item.label}
                  className="w-10 h-10 rounded-full bg-gray-100 text-gray-700 text-xs font-semibold flex items-center justify-center hover:bg-indigo-50 hover:text-indigo-600 transition"
                >
                  {item.badge}
                </a>
              ))}
            </div>
            <p className="text-xs text-gray-600">
              Quick updates and community chat.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
