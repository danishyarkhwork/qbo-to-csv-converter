import { ConverterTool } from "./ConverterTool";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div className="grain pointer-events-none absolute inset-0" aria-hidden />
      <div className="relative mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14 lg:py-20">
        <div className="flex flex-col justify-center">
          <p className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 text-xs font-medium text-ink-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-copper" aria-hidden />
            Open source · MIT License
          </p>
          <h1 className="font-display text-[2.35rem] leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-[3.25rem]">
            Turn QuickBooks QBO downloads into clean CSV files
          </h1>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-ink-muted">
            Banks hand you QBO. Spreadsheets want CSV. This converter reads your file on your
            machine, maps every STMTTRN row, and gives you a file you can open in Excel or Google
            Sheets — no signup, no cloud upload.
          </p>
          <p className="mt-6 text-sm text-ink-muted">
            Try the{" "}
            <a
              href="/sample-bank-export.ofx"
              download
              className="font-medium text-copper underline-offset-2 hover:underline focus-ring rounded-sm"
            >
              sample bank file
            </a>{" "}
            if you want to test without your own data.
          </p>
          <ul className="mt-6 space-y-3 text-sm text-ink">
            <li className="flex gap-3">
              <span className="mt-0.5 text-copper" aria-hidden>
                ✓
              </span>
              Supports QBO, OFX, and QFX from QuickBooks and most US banks
            </li>
            <li className="flex gap-3">
              <span className="mt-0.5 text-copper" aria-hidden>
                ✓
              </span>
              Pick columns, delimiters, and date format before you download
            </li>
            <li className="flex gap-3">
              <span className="mt-0.5 text-copper" aria-hidden>
                ✓
              </span>
              Preview totals and transactions before exporting
            </li>
          </ul>
        </div>
        <ConverterTool />
      </div>
    </section>
  );
}
