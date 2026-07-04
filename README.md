# RetailPOS.biz — Website Frontend

Production frontend for RetailPOS.biz built with Next.js (App Router), TypeScript,
Tailwind CSS, Framer Motion and Lucide icons.

## Development phases

| Phase | Scope | Status |
|-------|-------|--------|
| 1 | Foundation, design system, global layout, homepage | ✅ Complete |
| 2 | Product + module + pricing pages | Pending approval |
| 3 | Industries + solutions + integrations + conversion pages | Pending |
| 4 | Content platform + comparisons + trust + final audits | Pending |

## Getting started (on your machine)

```bash
make bootstrap   # installs dependencies
make dev         # http://localhost:3000
make verify      # lint + production build
```

Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SITE_URL`.
Analytics providers (GA4, GTM, Meta Pixel, LinkedIn, Clarity, GSC verification)
activate only when their env vars are set — see `src/config/site.ts`.

## Architecture

- `src/data/` — all site content as typed TS modules; the future Laravel CMS
  replaces these via API without restructuring components.
- `src/lib/seo/` — `buildMetadata()` factory and JSON-LD builders
  (Organization, WebSite, SoftwareApplication, BreadcrumbList, FAQPage).
- `src/components/ui|layout|sections|forms|seo` — design system and page sections.
- `src/app/sitemap.ts` / `robots.ts` — grow with each phase.

## Design system

- Palette: ink navy `#0F1B2D`, brand blue `#2050C8`, accent tangerine `#F26B1D`,
  ledger green `#0E9F6E`, paper neutrals, warm receipt `#FDFBF4`.
- Type: Bricolage Grotesque (display), Instrument Sans (body), IBM Plex Mono (data).
- Signature: POS receipt-tape stat strip + barcode dividers (`globals.css`).

## Content integrity

Placeholder metrics/testimonials are flagged `placeholder: true` in
`src/data/` and visibly labelled in the UI until verified data arrives
from the admin panel. No rankings, awards, or fake customer counts are used.
Replace `public/og-default.png` with a designed OG image before launch.
