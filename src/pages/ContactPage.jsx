export default function ContactPage() {
  const channels = [
    {
      title: "Email",
      value: "hello@mkbs.media",
      hint: "Best for product feedback, editorial ideas, and collaboration.",
      href: "mailto:hello@mkbs.media",
    },
    {
      title: "Response time",
      value: "Usually within 24 hours",
      hint: "We prioritize urgent technical issues and publishing-related queries.",
    },
  ];

  return (
    <main className="content-page">
      <section className="content-shell">
        <header className="content-hero centered">
          <p className="content-kicker">Get in touch</p>
          <h1 className="content-title">
            Let us know what you are building or struggling with
          </h1>
          <p className="content-subtitle">
            Send feedback, report issues, or propose collaborations. We read
            every message.
          </p>
        </header>

        <section className="content-two-col contact-layout">
          <form className="form-panel" onSubmit={(e) => e.preventDefault()}>
            <h2>Send a message</h2>
            <p className="panel-subtitle">
              We typically reply in one business day.
            </p>

            <div>
              <label htmlFor="name" className="field-label">
                Full name
              </label>
              <input
                id="name"
                type="text"
                required
                placeholder="Your name"
                className="field-input"
              />
            </div>

            <div>
              <label htmlFor="email" className="field-label">
                Email address
              </label>
              <input
                id="email"
                type="email"
                required
                placeholder="you@example.com"
                className="field-input"
              />
            </div>

            <div>
              <label htmlFor="subject" className="field-label">
                Subject
              </label>
              <input
                id="subject"
                type="text"
                required
                placeholder="What is this about?"
                className="field-input"
              />
            </div>

            <div>
              <label htmlFor="message" className="field-label">
                Message
              </label>
              <textarea
                id="message"
                required
                rows={5}
                placeholder="Your message here..."
                className="field-input field-textarea"
              />
            </div>

            <button type="submit" className="btn-primary full">
              Send message
            </button>
            <p className="panel-footnote">
              By submitting, you agree to polite and constructive communication.
            </p>
          </form>

          <aside className="side-stack">
            {channels.map((channel) => (
              <article key={channel.title} className="info-card compact">
                <h3>{channel.title}</h3>
                {channel.href ? (
                  <a href={channel.href} className="info-link">
                    {channel.value}
                  </a>
                ) : (
                  <p className="info-strong">{channel.value}</p>
                )}
                <p>{channel.hint}</p>
              </article>
            ))}

            <article className="info-card compact">
              <h3>Social</h3>
              <div className="social-row">
                {[
                  { label: "X", href: "https://twitter.com/mkbs_media" },
                  { label: "Facebook", href: "https://facebook.com" },
                  { label: "GitHub", href: "https://github.com" },
                ].map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="social-chip"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
              <p>Follow for updates, releases, and writing tips.</p>
            </article>
          </aside>
        </section>
      </section>
    </main>
  );
}
