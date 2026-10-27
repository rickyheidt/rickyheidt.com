# SEO audit changelog

Newest first. Each automated run adds an entry: date, run type (A on the 1st, B on the 15th), focus
area, pages changed, checker counts before and after, and the next focus area.

## Performance pass (manual), 2026-10-27
- Focus: page weight and hero LCP. The three alternate hero scenes (fair, highway, racetrack)
  were inlined on all 48 pages, 568 KB of SVG per page with one scene shown per visit. They now
  live in `scenes/*.html`, fetched on demand by the picker; the beach stays inline. HTML per page
  fell from about 740 KB to 170 KB (home) and 677 KB to 105 KB (About). `scenes/` is noindex
  in robots.txt and netlify.toml.
- Phone, slow 4G, 4x CPU (local): home LCP 7.9 s to 2.0 s, Carmel Valley 4.1 s to 0.7 s.
- Home listing photo and About portrait now load with `fetchpriority="high"` instead of lazy
  (both are the largest paint on their page).
- Hero parallax reworked in `js/effects.js` (sun bloom, depth easing, gyroscope on phones,
  scroll lean). Cache versions bumped: styles v24, effects v13.
- Not done, needs Ricky: real photos on area pages (backlog 19), freshness lines on Tier 1 pages
  (only after a content refresh), Review schema (self serving reviews are not eligible for stars).

## Run A (manual test run), 2026-10-21
- Focus area: 1, Carmel Valley and the 92130 corridor.
- Pages changed: carmel-valley.html (September 2026 market snapshot, where it is, getting around,
  things to know, four new FAQs, San Diego in the title, H1 and Place schema, dateModified),
  index.html and sales.html (image dimensions), neighborhoods.html, north-park.html,
  south-park.html, university-city.html (titles), escondido.html, mission-beach.html,
  rancho-bernardo.html (descriptions), new llms.txt, sitemap.xml (carmel-valley lastmod).
- Checker: 0 errors, 10 warnings, 3 notes before; 0 errors, 3 warnings, 2 notes after.
- Report: `reports/2026-10-21.md`.
- Next run: 2026-11-01, run A, focus area 2 (Del Mar and Solana Beach).

## Playbook rewrite, 2026-10-21
- Rewrote `PLAYBOOK.md` into a full run brief: run A and run B, phase by phase steps, competitor
  sitemap tracking, keyword map, market data ledger, local rules sweep, page anatomy, AI search,
  off site items for Ricky, verification and failure handling.
- Added state files: `market-data.md`, `keywords.md`, `competitors.md`, `backlog.md`.
- Checker now also fails on em or en dashes and phone mismatches, and warns on missing
  BreadcrumbList, FAQ schema that is not visible, missing DRE number and images without dimensions.
- Baseline: 48 pages, 0 errors, 10 warnings, 3 notes.
- First automated run: 2026-11-01, run A, focus area 1 (Carmel Valley and the 92130 corridor).

## Setup, 2026-10-21
- Added `seo-audit/audit.mjs` (technical checker), `PLAYBOOK.md` (run instructions) and this log.
- Baseline: 48 pages, 0 errors, 7 warnings (long titles or descriptions on a few neighborhood pages).
- First automated run: 2026-11-01, focus area 1 (Carmel Valley).
