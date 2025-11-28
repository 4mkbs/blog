export default function HelpPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
        Help
      </h1>
      <div className="space-y-4 text-gray-700">
        <p>
          Use the menu to navigate between sections. On mobile, the search icon
          opens a compact search. Cards are arranged to mimic Roar.media&apos;s
          style.
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Home shows the latest posts layout.</li>
          <li>Click a card to view its details.</li>
          <li>Menu contains About, Contact, Privacy, and Help pages.</li>
        </ul>
      </div>
    </main>
  );
}
