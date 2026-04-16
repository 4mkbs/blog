export default function HelpPage() {
  const faqItems = [
    {
      q: "How do I search for posts?",
      a: "Use the search bar in the navbar to find posts by title, topic, or tag. Results appear instantly on the home page.",
    },
    {
      q: "Can I save or bookmark posts?",
      a: "Currently, posts are displayed as read-only. Future versions will include user accounts and saved collections.",
    },
    {
      q: "How often are new posts published?",
      a: "This is a sample site with placeholder content. In a real setup, posting frequency depends on your editorial calendar.",
    },
    {
      q: "How do I contact you?",
      a: "Head to the Contact page (link in the menu) to send a message. We typically respond within 24 hours.",
    },
    {
      q: "Is there a mobile app?",
      a: "This site is fully responsive and works great on mobile browsers. A dedicated app may come in the future.",
    },
    {
      q: "Can I contribute or write for mkbs?",
      a: "Check the Contact page or follow us on social media for submission guidelines and collaboration opportunities.",
    },
  ];

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-12">
      <header className="space-y-3 text-center">
        <p className="text-sm font-semibold text-indigo-600">Help & FAQ</p>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
          Answers to common questions
        </h1>
        <p className="text-gray-700 leading-relaxed max-w-2xl mx-auto">
          Can't find what you're looking for? Reach out on the Contact page or
          check our social channels.
        </p>
      </header>

      <section className="space-y-4">
        {faqItems.map((item, idx) => (
          <details
            key={idx}
            className="group rounded-lg border border-gray-200 bg-white shadow-sm overflow-hidden"
          >
            <summary className="flex items-center justify-between cursor-pointer px-5 py-4 hover:bg-gray-50 transition">
              <h3 className="font-semibold text-gray-900 text-sm">{item.q}</h3>
              <svg
                className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </summary>
            <div className="px-5 py-4 border-t border-gray-100 bg-gray-50 text-gray-700 leading-relaxed text-sm">
              {item.a}
            </div>
          </details>
        ))}
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm space-y-4">
        <div className="flex items-start gap-3">
          <svg
            className="w-6 h-6 text-indigo-600 shrink-0 mt-0.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-900">
              Still need help?
            </h3>
            <p className="text-gray-700 leading-relaxed">
              If you didn't find your answer above, feel free to drop us a
              message. We're here to help.
            </p>
            <a
              href="/contact"
              className="inline-block mt-2 rounded-lg bg-indigo-500 text-white font-semibold px-4 py-2 hover:bg-indigo-400 transition"
            >
              Contact us
            </a>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {[
          {
            icon: "🔍",
            label: "Search",
            desc: "Find posts by keyword, tag, or topic instantly.",
          },
          {
            icon: "📱",
            label: "Mobile-friendly",
            desc: "Read comfortably on any device or screen size.",
          },
          {
            icon: "⌨️",
            label: "Keyboard nav",
            desc: "Navigate quickly without reaching for the mouse.",
          },
        ].map((item) => (
          <div
            key={item.label}
            className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm text-center space-y-2"
          >
            <div className="text-3xl">{item.icon}</div>
            <h4 className="font-semibold text-gray-900">{item.label}</h4>
            <p className="text-sm text-gray-600">{item.desc}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
