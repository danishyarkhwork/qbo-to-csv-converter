export function SeoArticle() {
  return (
    <section className="border-b border-line bg-surface py-16 sm:py-20">
      <article className="mx-auto max-w-3xl px-5 sm:px-8">
        <h2 className="font-display text-3xl tracking-tight text-ink">
          QBO to CSV: what you are converting and why it matters
        </h2>
        <div className="prose-spacing mt-8 space-y-5 text-ink-muted leading-relaxed">
          <p>
            When you download transactions for QuickBooks, you usually get a{" "}
            <strong className="font-medium text-ink">.qbo</strong> file. That file is not a
            spreadsheet — it is a structured feed based on the OFX format banks have used for years.
            Each line of activity sits inside a <code className="font-mono text-sm text-ink">STMTTRN</code>{" "}
            block with a posted date, amount, and a unique <code className="font-mono text-sm text-ink">FITID</code>{" "}
            so accounting software does not import the same charge twice.
          </p>
          <p>
            CSV is the opposite end of the pipeline: flat, portable, easy to filter. Accountants
            reconcile in Excel. Small businesses track cash in Sheets. Tax prep often starts with
            sorting categories in a table. Converting QBO to CSV closes that gap without asking you
            to paste XML by hand or pay for a one-off desktop license.
          </p>
          <h3 className="font-display text-xl text-ink pt-2">
            QBO vs OFX vs QFX — same data, different labels
          </h3>
          <p>
            QuickBooks Web Connect uses the <strong className="font-medium text-ink">QBO</strong>{" "}
            extension. Many banks say <strong className="font-medium text-ink">OFX</strong> or{" "}
            <strong className="font-medium text-ink">QFX</strong> on the download button. For
            conversion purposes they are siblings: sign-on headers, account ids, and transaction
            lists in the same shape. This tool accepts all three extensions and parses the shared
            transaction tags.
          </p>
          <h3 className="font-display text-xl text-ink pt-2">
            Privacy by architecture, not by policy page alone
          </h3>
          <p>
            Server-side converters require upload. That creates retention questions, breach surface,
            and trust friction. Here the parser ships to your browser as JavaScript. Select a file,
            get CSV — the network tab stays quiet. That is the right model for sensitive financial
            exports and aligns with how we think about responsible finance tooling on the open web.
          </p>
          <h3 className="font-display text-xl text-ink pt-2">
            Who this is for
          </h3>
          <p>
            Freelancers reconciling one checking account. Bookkeepers normalizing client downloads
            before import into another system. Developers who want a readable CSV fixture from a
            real bank file. Anyone who hit “download for QuickBooks” and actually needed a
            spreadsheet. If that sounds like you, bookmark this page or star the repo — both are
            free.
          </p>
        </div>
      </article>
    </section>
  );
}
