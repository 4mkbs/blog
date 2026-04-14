export default function PrivacyPage() {
  const sections = [
    {
      title: "Data Collection",
      content:
        "We do not actively collect personal data on this demo site. Any analytics or tracking are disabled. If you provide feedback through the Contact form, it is stored temporarily to help us improve the experience.",
    },
    {
      title: "Cookies & Tracking",
      content:
        "This site does not use cookies or third-party trackers. Authentication tokens (if you sign up) are stored securely in your browser and never shared with external services.",
    },
    {
      title: "User Content",
      content:
        "Any posts or content you submit through the dashboard remains your intellectual property. By posting, you grant us a license to display your work on the platform.",
    },
    {
      title: "Third-Party Services",
      content:
        "We do not share your data with advertisers, marketers, or third parties. Links to external sites are provided as-is and their privacy policies apply separately.",
    },
    {
      title: "Security",
      content:
        "We use industry-standard encryption (HTTPS) to protect data in transit. Passwords are hashed and never stored in plain text.",
    },
    {
      title: "Your Rights",
      content:
        "You have the right to request a copy of your data, correct inaccuracies, or request deletion. Contact us via the Contact page to exercise these rights.",
    },
    {
      title: "Changes to This Policy",
      content:
        "We may update this policy from time to time. Significant changes will be announced on the home page. Your continued use indicates acceptance of any updates.",
    },
  ];

  return (
    <main className="content-page">
      <section className="content-shell narrow">
        <header className="content-hero">
          <p className="content-kicker">Legal</p>
          <h1 className="content-title">Privacy policy</h1>
          <p className="content-subtitle">
            This page explains what data we collect, how we use it, and what
            rights you have.
          </p>
          <p className="content-meta">Last updated: March 31, 2026</p>
        </header>

        <div className="legal-list">
          {sections.map((section, idx) => (
            <article key={idx} className="info-card">
              <h2>{section.title}</h2>
              <p>{section.content}</p>
            </article>
          ))}
        </div>

        <section className="cta-card">
          <h2>Questions?</h2>
          <p>
            If you have concerns about your privacy or how we handle your data,
            please reach out via the Contact page. We'll respond within 24
            hours.
          </p>
          <a href="/contact" className="btn-primary">
            Contact us
          </a>
        </section>
      </section>
    </main>
  );
}
