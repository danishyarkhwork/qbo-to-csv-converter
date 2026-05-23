import { navLinks, siteConfig } from "@/content/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-line/80 bg-paper/90 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-6 px-5 sm:px-8">
        <a href="#" className="group flex items-baseline gap-2 focus-ring rounded-sm">
          <span className="font-display text-xl tracking-tight text-ink">
            QBO<span className="text-copper">→</span>CSV
          </span>
        </a>
        <nav
          className="hidden items-center gap-6 text-sm text-ink-muted md:flex"
          aria-label="Primary"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-ink focus-ring rounded-sm"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <a
          href={siteConfig.githubUrl}
          className="hidden rounded-full border border-line-strong bg-surface px-4 py-1.5 text-sm font-medium text-ink transition-colors hover:border-copper hover:text-copper sm:inline-flex focus-ring"
          target="_blank"
          rel="noopener noreferrer"
        >
          View on GitHub
        </a>
      </div>
    </header>
  );
}
