# Twice-monthly San Diego SEO and market audit playbook

Standing brief for the automated run on the 1st and 15th of each month. It runs unattended and
publishes to the live site, so the guardrails matter as much as the tasks.

Site: https://rickyheidt.com (static HTML, Netlify, deploys from `main`).
Owner: Ricky Heidt, REALTOR, PorchLight Realty (eXp Realty), North County native.
Everything this site does should make it the most useful, most local answer for someone buying,
selling or moving within San Diego County. If a change is not specifically about San Diego, it
is probably not worth making.

## Who we are targeting (judge every change against this)

Primary, North County coastal and inland, the heart of the business:
Carmel Valley, Del Mar, Solana Beach, Rancho Santa Fe, Poway, Encinitas.
Secondary, rest of North County: Carlsbad, Oceanside, Vista, San Marcos, Escondido, Fallbrook, Bonsall,
Rancho Bernardo, Rancho Penasquitos, Scripps Ranch, Mira Mesa.
Tertiary, city of San Diego neighborhoods already on the site: La Jolla, University City, Clairemont,
Pacific Beach, Mission Beach, Ocean Beach, Point Loma, Downtown, Little Italy, Hillcrest, North Park,
South Park, University Heights, Normal Heights, Kensington, City Heights, Mission Valley.

Buyer and seller segments to serve with specific, local content:
- Move-up and luxury buyers and sellers in the 92130, 92014, 92075, 92067, 92064 corridor.
- Relocators into San Diego (the site has a relocation guide lead magnet): tech and biotech
  (Torrey Pines, Sorrento Valley, Carmel Valley employers), UCSD and Scripps, defense contractors,
  remote workers leaving LA, the Bay Area, Seattle, Austin, New York and out-of-state.
- Military and veterans: Camp Pendleton, MCAS Miramar, Naval Base San Diego and Point Loma, VA loans,
  PCS timing, BAH.
- First-time buyers and down payment help (California and San Diego programs).
- Sellers weighing prices, prep, timing and net proceeds, including Prop 13 and Prop 19 effects.
- Investors: ADUs, rental rules, short-term rental rules by city, duplex and fourplex plays.
- Families choosing by school district and commute.

## Guardrails (never break these)

1. Only publish facts you can source. Every market number or local fact you add or change must come
   from a source fetched during this run (see Sources). If you cannot verify it, leave the old text
   alone and list it in the report under "Needs a human". Never invent or estimate stats.
2. Never touch: license number, phone, email, brokerage names, legal or fair housing text, form fields,
   `netlify/functions/`, `netlify.toml`, the Follow Up Boss source, or the Google verification files.
   Do not rename or delete pages or change any URL.
3. Do not edit price, status or details on the active listing page (`16046-summer-sage-rd.html`). Only
   check that it loads and its schema parses. Flag it if it looks stale.
4. Keep Ricky's voice: plain, warm, local, knowledgeable. No hype or filler, and never use em dashes or
   en dashes in site copy, reports or commit messages. Use commas or new sentences.
5. Small, reversible edits. About 15 pages changed per run at most. No redesigns, no new dependencies,
   no changes to `styles.css` or `js/` unless a check fails because of them.
6. Stay compliant (Fair Housing, DRE, NAR, eXp rules): no guarantees, no steering language, no
   neighborhood "safe" or "good schools" claims without a cited public source and neutral wording, no
   "best agent" superlatives, keep the "REALTOR®" mark styling, no unverifiable testimonials or reviews.
   Describe schools with district names and public ratings sources, never as a promise.
7. Never copy text from other sites. Facts are fine, wording must be original and attributed in plain
   words ("according to the San Diego Association of REALTORS®").
8. If the checker reports any ERROR after your edits, fix it or revert the edit. Never push a failing build.

## Sources (use in this order, cite in the report)

Market data
1. San Diego Association of REALTORS® (SDAR) monthly market reports and press releases, the San Diego
   MLS monthly statistics, and the California Association of REALTORS® (C.A.R.) monthly sales and price
   report, which has San Diego County and city-level numbers.
2. County and city level cross-checks: Redfin, Zillow Research, Realtor.com and Cotality (CoreLogic)
   public market pages. Use as cross-checks only, and note when they disagree with SDAR.
3. Mortgage and rates: Freddie Mac PMMS (weekly), MBA, Fannie Mae and NAR forecasts, plus the Fed calendar.
4. Economy and demand: SANDAG regional data and forecasts, San Diego Regional EDC, California EDD (San
   Diego County unemployment and jobs), San Diego Business Journal, San Diego Union-Tribune, Voice of San
   Diego, Times of San Diego, The Coast News and Del Mar Times (North County), Patch for the North County cities.
Local rules and costs
5. County of San Diego Assessor/Recorder/County Clerk (Prop 13, Prop 19, parcel and transfer info),
   Treasurer-Tax Collector (property tax dates and amounts), City of San Diego Development Services
   (ADU, permits, Complete Communities), and each city's planning site for Del Mar, Solana Beach,
   Encinitas, Poway, Carlsbad, Oceanside, Vista, San Marcos and Escondido.
6. California Coastal Commission (coastal zone rules affecting Del Mar, Solana Beach, Encinitas, Carlsbad,
   La Jolla, Pacific Beach, Ocean Beach, Point Loma), California Department of Insurance and the FAIR Plan
   (wildfire and insurance), CAL FIRE hazard maps, SDG&E and water district rate news.
7. California legislature and HCD for housing law (ADUs, SB 9 lot splits, SB 79 transit housing, disclosure
   rules, tenant law, transfer taxes). Confirm effective dates before stating anything as current law.
Schools and community
8. District sites and CDE data for Poway Unified, San Dieguito Union High, Del Mar Union, Solana Beach,
   Encinitas Union, Cardiff, Rancho Santa Fe, Carlsbad Unified, San Diego Unified and Escondido districts.
   Also Mello-Roos/CFD info from the county and school districts.
Events: Del Mar Fairgrounds, San Diego County Fair, Del Mar racing season, Torrey Pines, Padres season,
   Comic-Con, major infrastructure (trolley Blue Line, North County transit, I-5 and SR-56 projects), biotech and
   employer expansions in Torrey Pines and Sorrento Valley, and the Carmel Valley and Rancho Santa Fe
   development pipeline.

## Run steps

### 1. Baseline
- `git pull` on `main`. Read the latest `seo-audit/reports/*.md` (what was flagged or deferred) and
  `seo-audit/CHANGELOG.md` (what changed, and which focus area is next).
- Run `node seo-audit/audit.mjs` for the technical baseline.

### 2. Technical SEO (fix automatically)
Fix every ERROR and WARN: titles over 60 chars, descriptions over 155, duplicates, missing alt text,
broken links, sitemap gaps. Then read the pages for:
- One H1 per page, logical H2/H3 order, and every neighborhood page linked from the hub and from nearby
  neighborhoods (for example Carmel Valley, Del Mar Heights, Torrey Hills and Solana Beach cross-link).
- Structured data valid and matching the visible page: RealEstateAgent/LocalBusiness with accurate
  `areaServed`, FAQPage, BreadcrumbList, Place, and `dateModified`. Confirm Google still supports each type.
- Core Web Vitals risks: each HTML file is 650 KB or more, so look for what inflates them (inline data,
  oversize images, missing `width`/`height`, render-blocking assets).
- `sitemap.xml` `<lastmod>` updated only for pages that really changed. Bump `styles.css?v=` only if CSS changed.

### 3. San Diego local SEO (the main lever)
For each priority neighborhood and city page, check and improve:
- Search intent coverage with real San Diego phrases, for example: "homes for sale in Carmel Valley",
  "Del Mar homes for sale", "Rancho Santa Fe real estate", "Poway real estate agent", "Encinitas
  beach homes", "selling a house in Solana Beach", "cost to sell a home in San Diego", "San Diego
  home prices 2026", "Carmel Valley schools Poway vs San Dieguito", "Mello-Roos in Carmel Valley",
  "ADU rules San Diego", "relocating to San Diego", "moving from LA to San Diego", "VA loan San
  Diego", "first time buyer programs San Diego", "92130 real estate", "92014 homes". Use WebSearch to
  see what the current results and "People also ask" boxes show for the focus area, and write to them.
- Neighborhood depth: boundaries and ZIPs, housing types and typical price bands (sourced), HOA and
  Mello-Roos norms, commute (I-5, SR-56, I-15, SR-78, SR-52, SR-163, trolley and Coaster), beach and
  trail access, parks, dining and shopping, school districts, and fire, flood and coastal considerations.
- Page freshness: sentences that say "this year", old events, closed businesses, old school facts.
- Competitor check: look at what the top local results (agents, brokerages, Redfin/Zillow neighborhood
  pages, local news) cover that this site does not, for the focus area. Capture gaps in the report.
- Local business consistency: name, address, phone and service area identical across footer, schema
  and pages. Note anything in Google Business Profile, Bing Places, Zillow, Realtor.com or Instagram that
  looks out of sync from public pages. Those are listed for Ricky, not edited.
- Internal linking: hubs to neighborhoods to guides (buy, sell, home value, relocation) with
  descriptive anchor text that names the San Diego place.
- AI search readiness: concise answer-first paragraphs and Q&A blocks on San Diego topics, so
  ChatGPT, Gemini, Perplexity and Google AI Overviews can quote them. Confirm `robots.txt` still
  welcomes Googlebot, Bingbot, OAI-SearchBot, GPTBot, ClaudeBot, PerplexityBot and Google-Extended.
  Consider an `llms.txt` summarizing the site's San Diego coverage if it does not exist.

### 3b. Competitor watch (every run)
Track the competition for the San Diego searches that matter, using WebSearch and WebFetch on public pages only.
- Keep the competitor list in `seo-audit/competitors.md` (create it on the first run, update every run). Seed it from
  what ranks for the focus area's searches: the top 5 to 10 organic and map-pack results for terms like "[area] real
  estate agent", "[area] homes for sale" and "sell my house [area]". Expect a mix of:
  - Local agents and teams in North County and San Diego (individual sites and team sites).
  - Large brokerages with San Diego pages (Compass, Coldwell Banker, Berkshire Hathaway HomeServices, Sotheby's,
    Douglas Elliman, Keller Williams, RE/MAX, Real Broker, eXp teammates and PorchLight's own peers).
  - Portals and aggregators that own neighborhood pages (Zillow, Redfin, Realtor.com, Trulia, Homes.com, Movoto,
    Niche, Neighborhood Scout), and local media (Union-Tribune, Coast News, Patch, San Diego Magazine).
- For each, note per run: which of our target searches they rank for and where, what page type wins (neighborhood
  guide, market report, home value tool, listing search, relocation guide), title and description patterns,
  content depth and freshness dates, schema types used, review volume and rating shown in the local pack,
  whether they publish a monthly San Diego market report, and any new pages, tools or campaigns since last run.
- Compare against our page for the same search and write down concrete gaps: topics they cover that we do not,
  questions answered in "People also ask" that we skip, local data they show that we lack, formats we lack
  (calculators, maps, video, downloadable guides), and keywords where we are close to page one.
- Act on gaps the same run when it is safe: strengthen our existing page with original, sourced content that is
  clearly better (more specific, fresher, more useful), fix title and description patterns, add missing FAQ and
  schema. Put anything bigger (a new page, tool or campaign) in the report under "Queued for next run" with a
  recommendation and expected value.
- Never copy competitor text, images, or claims, never disparage a named agent or brokerage on the site, and never
  imitate a competitor's branding. Compare facts, beat them on usefulness.
- Add a "Competitor watch" section to the report: who moved, what changed, our gaps closed this run, gaps still open.
- Check the Ahrefs, Similarweb or Search Console connectors only if they are available in the session. Otherwise rely on
  public search results and say in the report that rank data is approximate.

### 4. San Diego market freshness
Pull the latest FULL month of data. For the county and each priority area available, gather median
sales price, median price per square foot if available, active inventory and months of supply,
days on market, sale-to-list ratio, share of homes with price cuts, closed sales volume, and
year-over-year change. Also gather 30-year fixed rate (Freddie Mac), and any notable local news.
Then update, wherever the figure appears (home, buy, sell, home-value, FAQ, sales, neighborhoods and
each neighborhood page):
- Numbers, with the "as of" month and source in plain words. Keep geography matched: do not put a
  county number on a Del Mar page or a city-wide number on a micro-neighborhood.
- Narrative that explains what it means for buyers and for sellers in that area right now
  (negotiating leverage, pricing strategy, timing, rate-buydown and seller-credit ideas).
- Seasonal San Diego angles for the next 60 days: holiday and winter listing timing, spring market
  prep, school-year moves, fire season and insurance timing, summer coastal demand, military PCS season.
- Law and cost changes that affect San Diego owners: property tax, Prop 19 and Prop 13, transfer
  tax, ADU and lot-split law, insurance and FAIR Plan, building rules, disclosure rules, coastal
  rules, short-term rental rules by city, and any Mello-Roos or special tax changes.
- Update "Last updated" text and `dateModified` where present.

### 5. Content growth (one to two meaningful additions per run)
Based on the gaps found, add or expand sourced content on existing pages first. Good San Diego
candidates, rotating over time:
- "San Diego market update" section on the home page or a dedicated page that is refreshed every run.
- Cost-to-sell and net proceeds explainers by city, closing costs, and timeline.
- School district guides (Poway Unified vs San Dieguito Union vs San Diego Unified), commute guides,
  Mello-Roos explainers, HOA and coastal rules, fire and insurance guides, ADU and rental guides.
- Buyer guides for VA and military, first-time buyers, relocators from LA, Bay Area and out of state.
- Neighborhood pages for areas Ricky wants to win next (check the sitemap and the secondary list).
New pages must also be added to `sitemap.xml`, the neighborhoods hub or nav, and have a canonical, one
H1, title, description, schema, and internal links.

Rotate the focus area each run so every market gets deep attention in turn, and record it in the changelog:
1 Carmel Valley and 92130 corridor, 2 Del Mar and Solana Beach, 3 Rancho Santa Fe, 4 Poway,
5 Encinitas and Cardiff, 6 Carlsbad and Oceanside, 7 Rancho Bernardo, Penasquitos, Scripps Ranch
and Mira Mesa, 8 La Jolla, UTC and Pacific Beach, 9 Central San Diego neighborhoods, 10 Vista, San Marcos,
Escondido, Fallbrook and Bonsall, then repeat. In every run, still refresh the county-wide numbers.

### 6. Verify, then publish
1. `node seo-audit/audit.mjs` must exit 0. Open a few edited pages with the browser tooling
   (Playwright and Chromium are preinstalled, do not run `playwright install`) at phone and desktop width and
   confirm nothing is broken. Re-read the diff for dashes, invented numbers, and Fair Housing wording.
2. Write the report to `seo-audit/reports/YYYY-MM-DD.md` using the template below, and add a short
   entry to `seo-audit/CHANGELOG.md` naming the next focus area.
3. Commit with a clear message such as `San Diego SEO and market refresh, 2026-11-01`. Push to `main`
   with `git push -u origin main` (retry up to 4 times on network errors, 2s, 4s, 8s, 16s). Netlify deploys on push.
4. If `main` rejects the push, do not force. Pull and merge once. If it still fails, push to
   `claude/seo-refresh-YYYY-MM-DD` and open a pull request so the work is not lost, and say so at the top
   of the report.
5. If nothing needed changing, still push the report and changelog and say "no content changes needed".

## Report template (`seo-audit/reports/YYYY-MM-DD.md`)

```
# San Diego SEO and market audit, YYYY-MM-DD
Focus area this run: ...
Checker: X errors, Y warnings before; X errors, Y warnings after.

## Changed and published
- page: what changed and why (source name and date for any number)

## San Diego market snapshot used
- metric, value, geography, as-of month, source

## Local SEO findings
- keyword and intent gaps, internal linking, AI search notes

## Competitor watch
- who ranks for our target searches, what moved, gaps closed this run, gaps still open

## Needs a human (not changed)
- Google Business Profile / Search Console / Bing items, unverifiable numbers, anything outside guardrails

## Queued for next run
- ...
```

## Notes for whoever maintains this
- The checker `seo-audit/audit.mjs` is dependency free and safe to run anywhere with Node.
- To pause the audits, disable the routine in the Claude app. To change the schedule, edit it there.
  To change behavior, edit this file and merge it to `main`.
