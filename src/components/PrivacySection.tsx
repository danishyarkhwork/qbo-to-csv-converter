import { siteConfig } from "@/content/site";

export function PrivacySection() {
  return (
    <section id="privacy" className="border-t border-line bg-paper-deep/40 py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <h2 className="font-display text-3xl tracking-tight text-ink">Privacy &amp; disclaimer</h2>
        <div className="mt-8 space-y-5 text-sm leading-relaxed text-ink-muted">
          <p>
            <strong className="text-ink">Data handling.</strong> Files you select are processed in
            your browser using client-side JavaScript. We do not receive, store, or analyze your
            bank files on a server for this conversion feature.
          </p>
          <p>
            <strong className="text-ink">Cookies and ads.</strong> If this site displays advertising
            (for example through Google AdSense), ad partners may use cookies or similar technologies
            as described in their own policies. That is separate from the converter, which does not
            need cookies to function.
          </p>
          <p>
            <strong className="text-ink">Not financial advice.</strong> This tool formats data for
            your own records. It does not provide tax, legal, or accounting advice. Verify totals
            against your bank statements before making decisions.
          </p>
          <p>
            <strong className="text-ink">Trademarks.</strong> QuickBooks, Quicken, and QBO are
            trademarks of Intuit Inc. This project is not affiliated with or endorsed by Intuit.
          </p>
          <p>
            <strong className="text-ink">Open source.</strong> Source code is available on{" "}
            <a
              href={siteConfig.githubUrl}
              className="text-copper underline-offset-2 hover:underline focus-ring rounded-sm"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            . Report bugs or contribute improvements there.
          </p>
        </div>
      </div>
    </section>
  );
}
