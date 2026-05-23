# qbo-to-csv-converter

Convert QBO to CSV online, free & private — free project, open source.

## Stack

- [Next.js](https://nextjs.org/) (App Router)
- [Tailwind CSS](https://tailwindcss.com/) v4
- TypeScript
- HTML via React/JSX (`src/app/layout.tsx` provides the document shell)

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command        | Description              |
| -------------- | ------------------------ |
| `npm run dev`  | Start development server |
| `npm run build`| Production build         |
| `npm run start`| Run production server    |
| `npm run lint` | Run ESLint               |

## Project structure

- `src/app/` — pages and layouts (HTML shell in `layout.tsx`)
- `src/app/globals.css` — Tailwind imports and global styles
- `public/` — static assets
