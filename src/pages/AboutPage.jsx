export default function AboutPage() {
  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-12">
      <header className="space-y-3">
        <p className="text-sm font-semibold text-indigo-600">
          About mkbs.media
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
          mkbs.media is a Bengali-first space for thoughtful stories and
          practical guides.
        </h1>
        <p className="text-gray-700 leading-relaxed max-w-3xl">
          The original mkbs.media publishes explainers, opinions, and how-tos
          that feel personal yet concise. This build aims to deliver that same
          calm reading experience with clean type, clear hierarchy, and
          mobile-friendly layouts.
        </p>
      </header>

      <section className="grid gap-6 md:grid-cols-3">
        {[
          {
            title: "Why it works",
            body: "Short paragraphs, roomy line-height, and simple color use make long-form reading feel light.",
          },
          {
            title: "What we kept",
            body: "A quiet palette, generous whitespace, and story-first card grids that adapt down to phones.",
          },
          {
            title: "Tech underneath",
            body: "React + Vite + Tailwind v4 power the UI, so it stays fast to load and easy to tweak.",
          },
        ].map((item) => (
          <article
            key={item.title}
            className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm space-y-2"
          >
            <h3 className="text-lg font-semibold text-gray-900">
              {item.title}
            </h3>
            <p className="text-gray-700 leading-relaxed text-sm">{item.body}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-8 md:grid-cols-[1.5fr,1fr] md:items-start">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Editorial style
          </h2>
          <p className="text-gray-700 leading-relaxed">
            mkbs.media leans on thoughtful curation over volume. Stories are
            grouped by themes—tech, productivity, web, and culture—so readers
            can dive deep without feeling lost.
          </p>
          <div className="flex flex-wrap gap-2 text-xs font-semibold text-gray-700">
            {["Bengali-first", "Concise", "Opinionated", "Mobile-friendly"].map(
              (tag) => (
                <span key={tag} className="rounded-full bg-gray-100 px-3 py-1">
                  {tag}
                </span>
              )
            )}
          </div>
        </div>

          {/* <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm space-y-3">
            <h3 className="text-sm font-semibold text-indigo-600">
              Make it yours
            </h3>
            <p className="text-gray-700 leading-relaxed text-sm">
              Replace the placeholder posts with your own stories, wire an API or
              CMS, and tune the colors or typography tokens to match your brand
              while keeping the same reading comfort.
            </p>
            <div className="font-mono text-[13px] leading-relaxed text-gray-800 bg-gray-50 rounded-lg p-3 border border-gray-200">
              <p>npm install</p>
              <p>npm run dev</p>
              <p>// connect your data source</p>
            </div>
          </div> */}
      </section>
    </main>
  );
}
