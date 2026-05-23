const steps = [
  {
    step: "01",
    title: "Export from QuickBooks or your bank",
    body: "In QuickBooks, use File → Utilities → Import → Web Connect, or download the QBO/OFX file your bank offers. Save it somewhere you can find.",
  },
  {
    step: "02",
    title: "Drop the file in the converter",
    body: "We read the OFX structure locally: STMTTRN blocks, amounts, FITIDs, memos. You will see a preview and summary stats right away.",
  },
  {
    step: "03",
    title: "Download or copy CSV",
    body: "Adjust columns and formatting, then download. Open in Excel, Google Sheets, or hand off to your accountant. Done in minutes.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="border-b border-line py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-copper">How it works</p>
        <h2 className="mt-2 font-display text-3xl tracking-tight text-ink sm:text-4xl">
          Three steps, no account
        </h2>
        <ol className="mt-12 grid gap-8 md:grid-cols-3">
          {steps.map((item) => (
            <li key={item.step} className="relative">
              <span className="font-mono text-4xl font-light text-line-strong">{item.step}</span>
              <h3 className="mt-4 font-display text-xl text-ink">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">{item.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
