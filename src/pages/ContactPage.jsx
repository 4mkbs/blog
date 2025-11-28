export default function ContactPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
        Contact
      </h1>
      <p className="text-gray-700 mb-6">
        Have feedback or questions? Reach out using the details below.
      </p>
      <div className="space-y-3 text-gray-700">
        <p>
          Email:{" "}
          <a
            href="mailto:hello@example.com"
            className="text-blue-600 hover:underline"
          >
            hello@example.com
          </a>
        </p>
        <p>
          Twitter:{" "}
          <a
            href="https://twitter.com/example"
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 hover:underline"
          >
            @example
          </a>
        </p>
      </div>
    </main>
  );
}
