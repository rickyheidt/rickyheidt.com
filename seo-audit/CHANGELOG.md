# SEO audit changelog

Newest first. Each automated run adds an entry: date, run type (A on the 1st, B on the 15th), focus
area, pages changed, checker counts before and after, and the next focus area.

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
