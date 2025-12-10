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
    <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-12">
      <header className="space-y-3">
        <p className="text-sm font-semibold text-indigo-600">Legal</p>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
          Privacy Policy
        </h1>
        <p className="text-gray-700 leading-relaxed">
          We respect your privacy. This policy explains how we collect, use, and
          protect your information.
        </p>
        <p className="text-xs text-gray-500">Last updated: December 10, 2025</p>
      </header>

      <div className="space-y-4">
        {sections.map((section, idx) => (
          <article
            key={idx}
            className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm space-y-2"
          >
            <h2 className="text-lg font-semibold text-gray-900">
              {section.title}
            </h2>
            <p className="text-gray-700 leading-relaxed text-sm">
              {section.content}
            </p>
          </article>
        ))}
      </div>

      <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">Questions?</h2>
        <p className="text-gray-700 leading-relaxed">
          If you have concerns about your privacy or how we handle your data,
          please reach out via the Contact page. We'll respond within 24 hours.
        </p>
        <a
          href="/contact"
          className="inline-block rounded-lg bg-indigo-500 text-white font-semibold px-4 py-2 hover:bg-indigo-400 transition"
        >
          Contact us
        </a>
      </section>
    </main>
  );
}
