# QBO to CSV Converter

Convert QuickBooks **QBO**, **OFX**, and **QFX** bank downloads to CSV in your browser. No upload, no account — free and open source (MIT).

![Next.js](https://img.shields.io/badge/Next.js-16-black) ![Tailwind](https://img.shields.io/badge/Tailwind-4-38bdf8) ![License](https://img.shields.io/badge/License-MIT-green)

## Features

- Client-side conversion (files stay on your device)
- QBO, OFX, and QFX support
- Column picker, delimiter options, date formats
- Transaction preview and summary stats
- SEO-friendly landing page with FAQ

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy

Works on Vercel, Netlify, or any static host after `npm run build`.

Before deploying, set your production URL in `src/content/site.ts` (`url` and `githubUrl`).

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
