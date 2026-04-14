export default function AboutPage() {
  const highlights = [
    {
      title: "Reader-first experience",
      body: "We prioritize readability with clear hierarchy, generous spacing, and distraction-free layouts.",
    },
    {
      title: "Bengali-first publishing",
      body: "The platform is built to support Bengali storytelling while staying friendly for mixed-language content.",
    },
    {
      title: "Fast modern stack",
      body: "React, Vite, and a lightweight API keep navigation smooth and interactions responsive.",
    },
  ];

  return (
    <main className="content-page">
      <section className="content-shell">
        <header className="content-hero">
          <p className="content-kicker">About mkbs.media</p>
          <h1 className="content-title">
            A focused Bengali-first platform for thoughtful stories and
            practical guides.
          </h1>
          <p className="content-subtitle">
            We are building a calm reading space where writing quality matters
            more than noise. The goal is simple: help people publish and
            discover useful ideas quickly.
          </p>
        </header>

        <section className="info-grid">
          {highlights.map((item) => (
            <article key={item.title} className="info-card">
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </section>

        <section className="content-two-col">
          <div className="content-block">
            <h2>Editorial direction</h2>
            <p>
              Stories are curated around technology, productivity, and digital
              culture. We prefer concise writing with real examples so readers
              can apply ideas immediately.
            </p>
            <div className="chip-row">
              {[
                "Bengali-first",
                "Clean reading",
                "Practical guides",
                "Creator friendly",
              ].map((tag) => (
                <span key={tag} className="chip">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <aside className="cta-card">
            <h3>Build with us</h3>
            <p>
              Writers, developers, and curious readers are welcome. If you want
              to collaborate, share your ideas through the contact page.
            </p>
            <a href="/contact" className="btn-primary">
              Contact team
            </a>
          </aside>
        </section>
      </section>
    </main>
  );
}
