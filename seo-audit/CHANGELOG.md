# SEO audit changelog

Newest first. Each automated run adds an entry: date, run type (A on the 1st, B on the 15th), focus
area, pages changed, checker counts before and after, and the next focus area.

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
