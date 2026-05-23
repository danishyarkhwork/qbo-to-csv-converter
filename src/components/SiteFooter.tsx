import { siteConfig } from "@/content/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-ink text-paper">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div>
          <p className="font-display text-lg">QBO→CSV</p>
          <p className="mt-1 text-sm text-paper-deep/90">
            Free open-source converter · {year}
          </p>
        </div>
        <nav className="flex flex-wrap gap-4 text-sm" aria-label="Footer">
          <a href="#converter" className="hover:text-white focus-ring rounded-sm">
            Converter
          </a>
          <a href="#faq" className="hover:text-white focus-ring rounded-sm">
            FAQ
          </a>
          <a href="#privacy" className="hover:text-white focus-ring rounded-sm">
            Privacy
          </a>
          <a
            href={siteConfig.githubUrl}
            className="hover:text-white focus-ring rounded-sm"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </nav>
      </div>
    </footer>
  );
}
