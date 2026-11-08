# SEO audit changelog

Newest first. Each automated run adds an entry: date, run type (A on the 1st, B on the 15th), focus
area, pages changed, checker counts before and after, and the next focus area.

## Manual changes between runs, 2026-11-04 to 2026-11-08
- 2026-11-04: 16046 Summer Sage Rd list price changed to $2,250,000 at Ricky's request, in all seven
  places it appears (listing page title, Open Graph, schema name and offers.price, price block,
  details table, index.html card, poway.html, sales.html). Do not change it back.
- 2026-11-04: Netlify connection in Composio reconnected (it had expired: 401). main deployed and
  confirmed live, including the 2026-11-01 run. PRs #13 (rotating testimonials) and #14 (home page
  speed: self hosted fonts, no hero layout shift) were merged and are live as of 2026-11-08.
- 2026-11-08: Google Analytics is readable: `properties/559986199` through the Composio account
  aliased `rickyheidt.com`. Baseline in `keywords.md`. GA4 data starts 2026-10-21; local test pages,
  Netlify previews and bot like sessions must be filtered (playbook phase 1b).
- 2026-11-08: Lead tracking set up. Key events: thank_you, guide_download (event create rules on the
  web stream), phone_click, text_click, calendly_click, calendly_booked (GTM-TD52K2JX tags).
  The thank_you and guide_download rules first required `.html`, which real submissions (landing
  on `/thank-you` and `/guide-download`) never match; Ricky fixed both rules on 2026-11-08 to match
  `thank-you` and `guide-download`. Form leads count from then on.
- 2026-11-08: Playbook updated: new phase 1b (traffic and leads), Netlify check at preflight, deploy
  failure handling, a fixed speed test method, GSDAR and NSDCAR URL patterns and naming, a 10 sale
  small sample rule, comparison sections in the market refresh, owner requested listing changes,
  blocking analytics and never submitting forms in browser checks, new report sections and
  scorecard rows.
- 2026-11-08: Indexing check (URL Inspection). Indexed: home, carmel-valley, del-mar, solana-beach,
  rancho-santa-fe, encinitas, sell, buy, home-value, the listing, north-park and 25 other area and
  info pages. Not indexed: poway, pacific-beach, rancho-bernardo. Ricky requested indexing for those
  three plus a recrawl of the listing (old price in Google) and carmel-valley. The Pages report was
  last updated 2026-10-22 and lagged badly (it still listed 28 pages as discovered, not indexed, and
  north-park as crawled, not indexed); trust URL Inspection over that report.
- 2026-11-08: School rankings removed sitewide (Ricky left it to the audit's judgment): no Niche
  grades or ranks remain; the "How good are the schools" FAQs became "How can I compare ... schools"
  pointing to the California School Dashboard. Card blurb "top-rated public schools" changed to
  "San Dieguito schools". Ricky's background is now the same everywhere: born in Rancho Santa Fe,
  lived in Del Mar as a kid, grew up mostly in Carmel Valley, Torrey Pines High School. Do not
  reintroduce school rankings.
- Next run unchanged: 2026-11-15, run B (market refresh with October 2026 data for carmel-valley,
  del-mar and solana-beach, plus county figures), focus area 3 (Rancho Santa Fe, Fairbanks Ranch
  and Santaluz). First run with phase 1b and full Analytics.

## Run A, 2026-11-01
- Focus area: 2, Del Mar and Solana Beach.
- Pages changed: del-mar.html and solana-beach.html (September 2026 market section, where it is,
  getting around, things to know including short term rental rules, a Del Mar and Solana Beach
  comparison, seven new FAQs between them, descriptions, dateModified), coronado.html (description),
  services.html (title and description), llms.txt, sitemap.xml (two lastmod dates).
- Checker: 0 errors, 6 warnings, 9 notes before; 0 errors, 3 warnings, 9 notes after.
- Report: `reports/2026-11-01.md`.
- Next run: 2026-11-15, run B (market refresh with October 2026 data), focus area 3 (Rancho Santa
  Fe, Fairbanks Ranch and Santaluz).

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
