const features = [
  {
    title: "Browser-only processing",
    body: "Your statement never leaves the tab. That matters for client books, payroll accounts, and anything you would not email to a stranger.",
  },
  {
    title: "Full transaction fields",
    body: "Dates, amounts, FITID, memos, payee, check numbers, and account metadata — export only what your workflow needs.",
  },
  {
    title: "Multi-account files",
    body: "Some downloads bundle checking and savings. Merge them into one CSV or split by account id when you toggle columns.",
  },
  {
    title: "Excel-ready formatting",
    body: "Comma, semicolon, or tab delimiters. US, EU, or ISO dates. Header row optional. Built for how people actually use Sheets.",
  },
  {
    title: "Quick preview",
    body: "See the first rows, count, and in/out totals before you commit. Catch an empty export or wrong file immediately.",
  },
  {
    title: "Open source",
    body: "Read the parser on GitHub, run it yourself, or fork it for your firm. No black box, no API key, no vendor lock-in.",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="border-b border-line bg-surface py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-copper">Features</p>
          <h2 className="mt-2 font-display text-3xl tracking-tight text-ink sm:text-4xl">
            Built for bookkeepers, not buzzwords
          </h2>
          <p className="mt-4 text-ink-muted leading-relaxed">
            A straight path from bank download to spreadsheet — with the controls you expect from a
            desktop tool, running in the browser you already have.
          </p>
        </div>
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <li
              key={feature.title}
              className="rounded-2xl border border-line bg-paper/60 p-6 transition-colors hover:border-line-strong"
            >
              <h3 className="font-display text-xl text-ink">{feature.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">{feature.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
