# QBO to CSV Converter

Convert QuickBooks **QBO**, **OFX**, and **QFX** bank downloads to CSV in your browser. No upload, no account — free and open source (MIT).

![Next.js](https://img.shields.io/badge/Next.js-16-black) ![Tailwind](https://img.shields.io/badge/Tailwind-4-38bdf8) ![License](https://img.shields.io/badge/License-MIT-green)

## Use it online (no install)

If you only need to convert a file and do not want to run code locally, use the hosted version:

**[https://csvall.com/qbo-to-csv](https://csvall.com/qbo-to-csv)**

Drop your `.qbo`, `.ofx`, or `.qfx` file there — conversion runs in your browser with nothing uploaded to a server.

## Features

- Client-side conversion (files stay on your device)
- QBO, OFX, and QFX support
- Column picker, delimiter options, date formats
- Transaction preview and summary stats
- SEO-friendly landing page with FAQ

## Clone and run this site yourself

Anyone can fork or clone this repo, run it locally, or deploy their own copy. You do not need permission beyond the MIT License.

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/qbo-to-csv-converter.git
cd qbo-to-csv-converter
```

Replace `YOUR_USERNAME` with the GitHub user or org that hosts your fork.

### 2. Install dependencies

Requires [Node.js](https://nodejs.org/) 18 or newer.

```bash
npm install
```

### 3. Configure site metadata (optional but recommended for deploy)

Edit `src/content/site.ts`:

- `url` — your public site URL (used for SEO, sitemap, and Open Graph)
- `githubUrl` — link to your fork or this repository

### 4. Run in development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). You can test with the sample file at `public/sample-bank-export.ofx`.

### 5. Production build

```bash
npm run build
npm run start
```

Or deploy the output to [Vercel](https://vercel.com), [Netlify](https://www.netlify.com), Cloudflare Pages, or any host that supports Next.js.

### 6. Contribute back (optional)

Bug fixes and parser improvements are welcome via pull request. If you ship a public fork, consider linking back to this repo and to [CSVall](https://csvall.com/qbo-to-csv) for users who prefer a ready-made hosted tool.

## Project structure

| Path | Purpose |
|------|---------|
| `src/components/ConverterTool.tsx` | Main converter UI |
| `src/lib/qbo-parser.ts` | OFX/QBO parser |
| `src/lib/csv-export.ts` | CSV builder and download |
| `src/content/faqs.ts` | FAQ copy |
| `src/content/site.ts` | Site metadata & links |

## License

MIT — see [LICENSE](LICENSE).

**Disclaimer:** Not affiliated with Intuit or QuickBooks. QuickBooks and QBO are trademarks of Intuit Inc.
