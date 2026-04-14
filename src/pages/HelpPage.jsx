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
    <main className="content-page">
      <section className="content-shell narrow">
        <header className="content-hero centered">
          <p className="content-kicker">Help and FAQ</p>
          <h1 className="content-title">
            Answers to the questions people ask most
          </h1>
          <p className="content-subtitle">
            If you still need support after reading these, you can contact us
            directly.
          </p>
        </header>

        <section className="faq-list">
          {faqItems.map((item, idx) => (
            <details key={idx} className="faq-item">
              <summary className="faq-summary">
                <h3>{item.q}</h3>
                <svg
                  width="20"
                  height="20"
                  className="faq-chevron"
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
              <div className="faq-answer">{item.a}</div>
            </details>
          ))}
        </section>

        <section className="cta-card">
          <div className="info-inline">
            <svg
              width="24"
              height="24"
              className="info-icon"
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
            <div>
              <h3>Still need help?</h3>
              <p>
                If you didn't find your answer above, feel free to drop us a
                message. We're here to help.
              </p>
              <a href="/contact" className="btn-primary">
                Contact us
              </a>
            </div>
          </div>
        </section>

        <section className="info-grid compact-grid">
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
            <div key={item.label} className="info-card compact text-center">
              <div className="emoji-icon">{item.icon}</div>
              <h4>{item.label}</h4>
              <p>{item.desc}</p>
            </div>
          ))}
        </section>
      </section>
    </main>
  );
}
