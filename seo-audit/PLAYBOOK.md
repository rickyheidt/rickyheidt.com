# San Diego SEO, competitor and market audit playbook

The standing brief for the automated run on the 1st and 15th of every month. Each run works alone,
with no human watching, pushes its work to `main` and deploys it to the live site. Read this whole
file before you touch anything. The guardrails matter as much as the tasks.

Site: https://rickyheidt.com (static HTML on Netlify). Automatic Git deploys are off, so a push to
`main` is not live until the run deploys it (phase 11, step 6).
Owner: Ricky Heidt, REALTOR®, PorchLight Realty, brokered by eXp Realty. CA DRE #02230045.
A North County native with an office ZIP of 92130 (Carmel Valley).

**The mission.** When someone searches for anything about buying, selling, owning or moving to a
home in San Diego County, rickyheidt.com should be the most useful, most current and most local
answer on the page, for Google, for the map pack and for AI assistants. Every run should leave the
site measurably fresher, deeper and better linked than it found it, and should leave a clear trail
of what the competition did since the last run. If a change is not specifically about San Diego
real estate, it is probably not worth making.

---

## Contents

1. How a run works, in one screen
2. Who we serve (geography, ZIPs and people)
3. Guardrails (never break these)
4. State files the runs keep
5. Sources, and how far to trust each one
6. The run, phase by phase
7. Focus rotation
7b. Google Search Central rules
8. Writing standards for site copy
9. Templates
10. When things go wrong
11. Maintenance notes

---

## 1. How a run works, in one screen

| Phase | What | Edits the site? |
|---|---|---|
| 0 | Preflight: pull `main`, read state files, see which data tools are connected | No |
| 1 | Technical baseline: `node seo-audit/audit.mjs`, crawl checks, page speed | Fixes only |
| 1b | Traffic and leads: Search Console, Bing and Analytics by page, channel and lead | No |
| 2 | Search landscape for the focus area: queries, rankings, People also ask, AI answers | No |
| 3 | Competitor intelligence: who ranks, what they published, where we are behind | No |
| 4 | Market data: latest full month for the county and each area we can match | Yes |
| 5 | Local news and rule changes that affect owners, buyers and sellers | Yes, when sourced |
| 6 | On-page upgrades to the focus area pages, driven by phases 1b to 5 | Yes |
| 7 | One or two meaningful content additions from the backlog | Yes |
| 8 | AI search readiness and entity consistency | Yes |
| 9 | Off-site and local signals, written up for Ricky to act on | No |
| 10 | Verify: checker, browser check, fact check, compliance read | Reverts if needed |
| 11 | Publish, deploy, confirm live, report, update state files | Commit, push, deploy |

**The two runs each month lean differently.**
- **The 1st (run A)** leans technical and competitive: full technical sweep, competitor deep dive,
  keyword map refresh, and the content addition. Market numbers get updated only if a newer full
  month is already published.
- **The 15th (run B)** leans market: most monthly market releases for the prior month are out by
  mid month, so this run does the full market refresh across every page that quotes a number, plus
  the news and rules sweep, a lighter competitor check (new pages and rank movement only), and
  on-page upgrades for the focus area.
- Both runs: always run the checker, always pull traffic and leads (phase 1b), always fix errors,
  always work the focus area, always deploy and confirm live, always write the report and update
  the state files.

**If time or budget runs short, stop in this order of priority** (do the top items first):
1. Anything that breaks a guardrail or the build (checker ERROR, wrong phone, a dash, a bad fact).
2. Market numbers that are now stale by more than one released month.
3. The traffic and leads pull (phase 1b), because it decides which pages come first.
4. The focus area pages, and any page phase 1b flags.
5. Competitor watch.
6. New content.
Always leave enough room to verify, write the report, push and deploy. A smaller, clean run beats a
big broken one.

---

## 2. Who we serve

### Geography, in tiers

ZIPs below are for orientation and matching data. Confirm a ZIP against USPS or the county before
you publish one on the site, because several ZIPs cross community lines.

**Tier 1, the heart of the business (deepest content, freshest numbers, every run touches at least
one of these):**
| Area | Page | ZIPs | Micro areas people search for |
|---|---|---|---|
| Carmel Valley | `carmel-valley.html` | 92130 | Pacific Highlands Ranch, Torrey Hills, Del Mar Heights, Torrey Pines, Del Mar Mesa, Sorrento Hills |
| Del Mar | `del-mar.html` | 92014 | Del Mar Village, Olde Del Mar, Del Mar Terrace, Del Mar Heights (shared with 92130) |
| Solana Beach | `solana-beach.html` | 92075 | Lomas Santa Fe, Eden Gardens, Seaside, North Solana |
| Rancho Santa Fe | `rancho-santa-fe.html` | 92067, 92091 | The Covenant, Fairbanks Ranch, Santaluz, The Crosby, Cielo, Del Rayo |
| Poway | `poway.html` | 92064 | Green Valley, Old Poway, Garden Road, Bridlewood, StoneRidge, Heritage Hills |
| Encinitas | `encinitas.html` | 92024, 92007 | Cardiff by the Sea, Leucadia, Olivenhain, Old Encinitas, New Encinitas |

**Tier 2, the rest of North County and the 56 and 15 corridors:**
| Area | Page | ZIPs |
|---|---|---|
| Carlsbad | `carlsbad.html` | 92008, 92009, 92010, 92011 (La Costa, Aviara, Bressi Ranch, Robertson Ranch, Calavera Hills) |
| Oceanside | `oceanside.html` | 92054, 92056, 92057, 92058 |
| Vista | `vista.html` | 92081, 92083, 92084 |
| San Marcos | `san-marcos.html` | 92069, 92078 (San Elijo Hills, Discovery Hills) |
| Escondido | `escondido.html` | 92025, 92026, 92027, 92029 (Harmony Grove) |
| Fallbrook | `fallbrook.html` | 92028 |
| Bonsall | `bonsall.html` | 92003 |
| Rancho Bernardo | `rancho-bernardo.html` | 92127, 92128 (4S Ranch, Black Mountain Ranch nearby) |
| Rancho Penasquitos | `rancho-penasquitos.html` | 92129 (Torrey Highlands) |
| Scripps Ranch | `scripps-ranch.html` | 92131 |
| Mira Mesa | `mira-mesa.html` | 92126 |

**Tier 3, city of San Diego neighborhoods already on the site:**
La Jolla (92037), University City and UTC (92122), Clairemont (92117, 92111), Pacific Beach (92109),
Mission Beach (92109), Ocean Beach (92107), Point Loma (92106, 92107), Downtown and Little Italy
(92101), Hillcrest (92103), North Park (92104), South Park (92102, 92104), University Heights,
Normal Heights and Kensington (92116 and neighbors), City Heights (92105), Mission Valley (92108).

**Not on the site yet and worth considering** (see `seo-audit/backlog.md`): Pacific Highlands Ranch,
Torrey Hills, Del Mar Heights, 4S Ranch, Torrey Highlands, Santaluz and Black Mountain Ranch,
Cardiff by the Sea, Leucadia, Olivenhain, La Costa, San Elijo Hills, Sorrento Valley, Coronado,
Point Loma subareas (La Playa, Sunset Cliffs). Add a new area page only when the competitor and
search work shows real demand and you can fill it with sourced, specific content. A thin page is
worse than no page.

### People, and what they search for

Judge every change against at least one of these people. Each needs specific, local answers.

| Segment | What they need from us | Typical searches |
|---|---|---|
| Move up and luxury buyers and sellers in 92130, 92014, 92075, 92067, 92064 | Price bands, school districts, lot sizes, HOA and Mello-Roos, view and coastal rules, pricing strategy, marketing reach | "Carmel Valley homes for sale", "Rancho Santa Fe luxury homes", "sell my house Del Mar" |
| Relocators | Area comparisons, commute, cost of living, schools, what you get for the money vs where they live now | "moving to San Diego from Bay Area", "best North County area for families", "relocating to San Diego" |
| Tech and biotech workers | Commute to Torrey Pines, Sorrento Valley, UTC, Carmel Valley campuses | "where to live near Torrey Pines biotech", "commute Sorrento Valley" |
| UCSD, Scripps and medical staff | Commute, rentals vs buying, faculty housing context | "living near UCSD", "La Jolla vs UTC" |
| Military and veterans | VA loans, BAH, PCS timing, Camp Pendleton, MCAS Miramar, Naval Base San Diego, Point Loma, North Island | "VA loan San Diego", "where to live near Camp Pendleton", "BAH San Diego 2026" |
| First time buyers | Down payment help (CalHFA, county and city programs), condos and townhomes, budget reality | "first time home buyer programs San Diego", "down payment assistance San Diego County" |
| Sellers | Pricing, prep, timing, net proceeds, closing costs, Prop 13 and Prop 19, capital gains basics (point to a tax pro) | "cost to sell a house in San Diego", "Prop 19 San Diego", "best time to sell in San Diego" |
| Investors | ADU and JADU rules, SB 9 lot splits, short term rental rules by city, rent control (AB 1482) and local tenant rules, duplex to fourplex | "ADU rules San Diego", "short term rental permit Encinitas", "San Diego STR ordinance" |
| Families | School districts by address, commute, parks, community feel | "Poway Unified vs San Dieguito", "Carmel Valley schools" |
| Downsizers and retirees | Single level homes, 55 plus communities (for example in Rancho Bernardo and Oceanside), Prop 19 base year transfer | "55 plus communities San Diego", "Prop 19 transfer tax base" |

Fair Housing note: we describe places, homes and facts. We never describe or suggest who should
live where. See guardrail 6.

---

## 3. Guardrails (never break these)

1. **Only publish facts you can source.** Every number or local fact you add or change must come
   from a source you fetched during this run (see section 5). Record it in
   `seo-audit/market-data.md` or the report with the source and date. If you cannot verify it,
   leave the old text alone and list it under "Needs a human". Never invent, estimate, round up,
   extrapolate or "fill in" a statistic. Never cite a source you did not actually open.
2. **Never touch:** the license number, phone, email, brokerage names or logos, legal or Fair
   Housing text, any form markup or field, `netlify/functions/`, `netlify.toml`, the Google tag
   (`G-PR2986LP9P`) and Google Tag Manager (`GTM-TD52K2JX`) snippets, the Follow Up Boss wiring, the
   verification files (`google*.html`, `BingSiteAuth.xml`), `downloads/`, or the relocation guide
   PDF. Do not rename, move or delete pages, and do not change any URL. Outside the repo, never change
   anything in Google Analytics, Tag Manager, Search Console, Bing Webmaster Tools or Netlify: the
   Netlify deploy in phase 11 is the only write. If something there looks wrong, report it.
3. **The active listing page** (`16046-summer-sage-rd.html`) and the sales page facts (`sales.html`
   sold prices, team ranking text): do not edit price, status, details or claims. Only check that the
   page loads and its schema parses. If the listing looks sold, stale or off market from public
   sources, flag it at the top of the report. A scheduled run never changes listing facts. When
   Ricky asks for a listing change directly in a conversation, update every place the fact appears
   so they never disagree: the listing page title, Open Graph title, schema `name` and
   `offers.price`, the price block and details table, the listing card on `index.html`, the
   mention on the area page (for example `poway.html`) and the card on `sales.html`. Search all
   HTML for the old value before you commit.
4. **Ricky's voice:** plain, warm, local, knowledgeable, never salesy. No hype, no filler, no
   "nestled", "boasts", "vibrant", "hidden gem", "dream home", "look no further". **Never use em
   dashes or en dashes** in site copy, schema, reports, the changelog or commit messages. Use commas,
   "to" for ranges ("$1.2M to $1.6M") or new sentences. The checker fails the build on a dash.
5. **Small and reversible.** About 15 pages changed per run at most (a sitewide number refresh in
   run B may touch more, but only the number and its "as of" line). No redesigns, no new
   dependencies, no build step. Do not edit `styles.css`, `main.js` or `js/` unless a check fails
   because of them, and then only the smallest fix.
6. **Compliance (Fair Housing Act, California FEHA, DRE, NAR Code of Ethics, eXp and PorchLight
   rules):**
   - No steering or exclusion language. Do not describe an area by the people in it (race, color,
     religion, sex, disability, familial status, national origin, or any California protected class
     such as age, ancestry, sexual orientation, gender identity, marital status, source of income,
     veteran or military status). Words like "family friendly", "perfect for young professionals",
     "exclusive", "safe", "good neighborhood" or "walking distance to church" are out. Describe
     features instead: "parks", "a K to 8 school inside the community", "trail access".
   - No crime or safety claims. If safety must come up, link to the official source (SDPD or
     Sheriff crime maps) without characterizing it.
   - Schools: name the district and schools, point to public sources (CDE California School
     Dashboard, the district's own boundary tool), and remind people to verify by address. Never
     rank or promise a school.
   - No guarantees about prices, appreciation, timelines or returns. Predictions only as attributed
     forecasts ("C.A.R. forecasts...").
   - No "best", "top", "#1" or "number one" claims about Ricky or the team unless it is the existing,
     sourced ranking text on `sales.html`. No testimonials or reviews that are not already on the
     site, no review stars in schema.
   - Keep "REALTOR®" capitalized with the mark. Keep the DRE number and brokerage line where they are.
   - Loans, taxes and law: give general information, cite the official source, and suggest a
     lender, tax professional or attorney for their situation.
7. **Original words only.** Never copy text, tables, photos, maps or charts from competitors or
   portals. Facts are fine, the wording must be ours, and attribution goes in plain words
   ("according to the Greater San Diego Association of REALTORS®, September 2026").
8. **Geography must match the number.** Never put a county median on a Del Mar page as if it were
   Del Mar. Never put a city figure on a micro neighborhood. Say exactly what geography the number
   covers.
9. **Never push a failing build.** If the checker reports any ERROR after your edits, fix it or
   revert the edit. If a page looks broken in the browser check, revert it.
10. **Never imitate, disparage or name competitors on the site.** Competitor names live only in
    `seo-audit/` files, which are not linked from the site. Beat them on usefulness.
11. **Public data only.** Apart from the accounts already connected in Composio (phase 0), no
    logging in to anything, no scraping behind logins, no paid data you do not have a connector for, no automated mass requests to competitor sites. A handful of polite
    fetches of public pages and sitemaps per competitor per run is the limit.
12. **No personal data.** Never put an owner's name, a buyer's name or anything from Follow Up Boss
    or form submissions into the site, the reports or commit messages.

---

## 4. State files the runs keep

All live in `seo-audit/`. They are the memory between runs, so read them first and update them last.
Every one is plain Markdown so Ricky can read it on GitHub.

| File | Purpose | Updated |
|---|---|---|
| `PLAYBOOK.md` | This brief. Do not edit during a run. Suggest changes in the report. | By people |
| `CHANGELOG.md` | One entry per run: date, run type, focus area, pages changed, checker counts, next focus area | Every run |
| `reports/YYYY-MM-DD.md` | The full run report (template in section 9) | Every run |
| `market-data.md` | Ledger of every market number used on the site: metric, geography, month, value, source, URL, pulled date | Every run that pulls data |
| `keywords.md` | Keyword map (target query, intent, the page that should win it, our position, who holds the top spots, last checked), plus the dated Search Console, Bing and Analytics tables from phase 1b | Run A fully, run B for the focus area; data tables every run |
| `competitors.md` | Competitor roster and per run snapshots, including their sitemap page counts | Run A fully, run B lightly |
| `backlog.md` | Ranked list of content ideas and fixes not yet done, each with the evidence behind it | Every run |

Rules for the state files:
- Never delete history. Add new rows or sections and mark old ones superseded.
- Every row with a number has a source and a date. No source, no row.
- Keep competitor and keyword notes factual and neutral. They are internal, but they are public on
  GitHub, so write as if the competitor will read it.

---

## 5. Sources, and how far to trust each one

Use them in this order. Cite every one you used in the report, with the URL and the date you
fetched it. When sources disagree, prefer the higher tier, say so in the report, and never average
them.

### Tier A, publish with confidence
- **San Diego Association of REALTORS® (SDAR)** monthly market statistics, published as Greater San
  Diego Association of REALTORS® (GSDAR) reports, and North San Diego County REALTORS® (NSDCAR) for
  the Carlsbad ZIPs. County and ZIP level figures for detached and attached homes. See "Where the
  MLS figures live" below.
- **California Association of REALTORS® (C.A.R.)** monthly home sales and price report (county and
  some city level), the Housing Affordability Index, and the annual forecast.
- **Freddie Mac Primary Mortgage Market Survey (PMMS)**, published weekly on Thursdays, for the 30
  year and 15 year fixed averages.
- **Government and official bodies:** County of San Diego Assessor, Recorder and County Clerk (Prop 13,
  Prop 19, transfer tax, exemptions); Treasurer and Tax Collector (installment due and delinquency
  dates); SANDAG (population, jobs, transit, regional plan); California EDD labor market data for San
  Diego County; U.S. Census and ACS; California Department of Finance; HCD and the California
  Legislature (leginfo.legislature.ca.gov) for housing law with effective dates; CalHFA for first
  time buyer programs; San Diego Housing Commission for city programs; VA for loan limits and
  guidance; Defense Travel Management Office for BAH rates; FHFA for conforming loan limits; CAL
  FIRE for Fire Hazard Severity Zones; California Department of Insurance and the FAIR Plan; FEMA
  flood maps; the California Coastal Commission; each city's planning and council pages (San Diego,
  Del Mar, Solana Beach, Encinitas, Carlsbad, Oceanside, Vista, San Marcos, Escondido, Poway, and the
  county for unincorporated areas such as Rancho Santa Fe, Fallbrook, Bonsall and 4S Ranch).
- **Schools:** CDE (DataQuest and the California School Dashboard) and each district's own site:
  Poway Unified, San Dieguito Union High, Del Mar Union, Solana Beach School District, Encinitas Union,
  Cardiff School District, Rancho Santa Fe School District, Carlsbad Unified, San Marcos Unified, Vista
  Unified, Oceanside Unified, Escondido Union and Escondido Union High, Fallbrook districts, Bonsall
  Unified, San Diego Unified. Mello-Roos and CFD information from the county and districts.

### Tier B, cross checks and context (cite as "according to")
- Redfin Data Center and market pages, Zillow Research (ZHVI, inventory, rentals), Realtor.com
  research and data, Cotality (formerly CoreLogic), Altos, MBA, Fannie Mae and NAR forecasts.
  These use different methods and geographies than the MLS. Use them for direction, for ZIP or
  neighborhood level detail SDAR does not publish, and for metrics like price cuts. Always name the
  source on the page, and never mix their number with an SDAR number in one sentence as if they were
  the same series.
- Local news, for events and rule changes, then confirm at the official source before stating it as
  fact: San Diego Union-Tribune, Voice of San Diego, inewsource, KPBS, Times of San Diego, San Diego
  Business Journal, The Coast News, Del Mar Times and Carmel Valley News, Rancho Santa Fe Review,
  Encinitas Advocate, Poway News Chieftain, Patch (North County cities), San Diego Magazine, NBC 7,
  ABC 10News, CBS 8, Fox 5.
- San Diego Regional EDC, Downtown San Diego Partnership, chambers of commerce, for employers and
  projects.

### Tier C, research only, never cited on the site
- Competitor sites, portals' neighborhood guides, Reddit (r/sandiego, r/SanDiegan, r/carlsbad and
  others), Nextdoor public posts, Quora, YouTube, and AI assistant answers. Use them to learn what
  people ask and what the market says. Never quote or cite them.

### Where the MLS figures live
- The SDAR figures are published as "Greater San Diego Association of REALTORS®" (GSDAR) reports by
  10K Research. Name them that way on the site. ZIP reports:
  `http://sdar.stats.10kresearch.com/docs/lmu/YYYY-MM/x/92130-CarmelValley` (and 92014-DelMar,
  92075-SolanaBeach, 92067-RanchoSantaFe, 92024-Encinitas, 92064-Poway). County Monthly Indicators:
  `http://sdar.stats.10kresearch.com/docs/mmi/YYYY-MM/x/report`. The `x/SanDiegoCounty` path serves
  an old 2024 report; do not use it.
- Carlsbad ZIPs (92008, 92009, 92010, 92011) are North San Diego County REALTORS® (NSDCAR) reports:
  `http://nsdcar.stats.10kresearch.com/docs/lmu/YYYY-MM/x/92008-Carlsbad`.
- When a month is not out yet, these URLs quietly serve the latest month instead. Always read the
  month printed at the top of the PDF ("Local Market Update for September 2026") before you use it.

### Release timing
Monthly market data for a month usually appears in the first three weeks of the next month,
varying by source. On each run, use the newest month that every source you quote has published. If
the newest month is not out yet, keep the current figures, and in the report say which release you
are waiting on. Never mix months in one stat block.

---

## 5b. Specialist skills (SEO-AEO-GEO Ultimate plugin)

When the `seo-aeo-geo-ultimate` plugin is available in the session, use its specialist skills as
the method for each phase, scoped to this run's focus area. They add structure and evidence
discipline; this playbook's guardrails, scope limits and publishing steps still win wherever they
differ. Skip a skill when its phase has nothing to do this run, and keep the run within budget.

| Phase | Skill | Use it for |
|---|---|---|
| 1 Technical | `seo-technical`, `seo-schema`, `seo-sitemap` | Crawl, index, canonical and directive checks; llms.txt; schema tied to visible content; sitemap accuracy |
| 1 Internal links | `seo-architecture` | Neighbor links, hub coverage, anchors, cannibalization |
| 2 Search landscape | `seo-research` | Query clusters, intent, People also ask, one canonical page per need |
| 2 and 8 AI answers | `ai-search-research` | Which sources AI answers cite for the focus area's questions |
| 3 Competitors | `seo-authority`, `seo-competitor-pages` | Who ranks and why, links and mentions they earn, fair comparison briefs |
| 4 to 6 Pages | `seo-aeo`, `seo-content`, `seo-page` | Answer first summaries, FAQ coverage, claim support, per page review of the focus pages |
| 8 AI search | `seo-geo` | Entity consistency (name, brokerage, DRE, phone, areas) and citation suitability |
| 9 Local | `seo-local` | Google Business Profile, Bing Places, NAP, service areas, reviews (report only) |
| Data | `seo-performance` | Search Console, Bing and Analytics comparisons, kept observational, never causal |
| Images | `seo-images` | Alt text and image delivery when photos are added |
| Report | `seo-action-plan` | Turning findings into the "Queued for next run" and "For Ricky" lists |

Do not use the `seo` front door orchestrator or `ai-visibility-monitor` on routine runs. They try
to run every lane at once and would use far more of the budget than a twice monthly run needs.
If the plugin is not available, follow the phases below as written and note it in the report.

## 6. The run, phase by phase

### Phase 0. Preflight

1. `git checkout main && git pull`. Note the head commit in the report.
2. Read the last two reports, `CHANGELOG.md` (it names this run's focus area), `backlog.md`,
   `keywords.md`, `competitors.md` and the newest rows of `market-data.md`. Carry forward anything
   marked "Queued for next run" or "Needs a human" that is still open. Note whether the last run
   was confirmed live; if it was not, this run's deploy publishes both.
3. Work out the run type: run A on the 1st, run B on the 15th. If the run is happening on another
   date (a retry or a manual run), pick the type whose work is most overdue.
4. Connect to the data tools through the Composio connector (find tools with COMPOSIO_SEARCH_TOOLS).
   These accounts are already connected there: Google Search Console (property
   `https://rickyheidt.com/`), Bing Webmaster Tools (site `https://rickyheidt.com/`), Google
   Analytics (GA4 property `properties/559986199`, account "Rickyheidt.com", web stream
   "Ricky Website" with measurement ID `G-PR2986LP9P`; use the Composio account aliased
   `rickyheidt.com`, not the homesbyheidtgroup.com property) and Netlify (site `rickytherealtorsd`, site ID
   `b3147ca5-83e6-4da3-8e15-a69fd1edecc1`). Use them read only, except the Netlify deploy in phase 11.
   Never change a setting, submit or remove URLs, or edit a property. Search Console is the best rank
   and click data we have, so use it in phases 1 to 3, with Bing alongside it. If a tool is not
   reachable, use the others plus public search results, label ranks as approximate, and add
   "reconnect [tool] in Composio" under "Needs a human".
   Check the Netlify connection now, not at the end: list the Composio `netlify_mcp` connection and
   confirm it is active. Connections expire (a 401 Unauthorized on the deploy call means this). If it
   is not active, carry on with the run and put "reconnect Netlify in Composio, then deploy main" at
   the top of the report and the notification.
5. Confirm the live site matches `main`: fetch https://rickyheidt.com/ and one neighborhood page and
   compare titles. If the live site is behind, a Netlify deploy may have failed. Flag it at the top
   of the report.

### Phase 1. Technical SEO

Run `node seo-audit/audit.mjs` and save the counts. Fix every ERROR and every WARN you safely can.
The checker covers titles, descriptions, canonicals, noindex, one H1, Open Graph, JSON-LD parsing,
BreadcrumbList, FAQ schema matching visible questions, phone and DRE consistency, image alt and
dimensions, broken internal references, thin pages, sitemap coverage, robots rules, dashes and
stale year mentions.

Then check by hand (the checker cannot see these):

**Crawl and index**
- `robots.txt` still allows everything public and lists the sitemap. The AI crawlers (GPTBot,
  OAI-SearchBot, ChatGPT-User, ClaudeBot, PerplexityBot, Google-Extended) stay allowed.
- `sitemap.xml`: every public page, no private pages, `<lastmod>` changed only for pages whose
  content really changed this run (set it to today's date for those).
- Fetch 3 to 5 live URLs and confirm a 200 status, the canonical, and no stray `noindex` header.
  Fetch a made up URL and confirm it serves `404.html` with a 404 status.
- `site:rickyheidt.com` in a search: roughly the right page count, no odd URLs, no old or test
  pages. Search for the exact title of two neighborhood pages to see if they are indexed.
- Netlify redirects in `netlify.toml` are read only. If a redirect looks wrong, report it.

**Structured data**
- Every page: RealEstateAgent (with consistent `name`, `telephone`, `email`, `address`, `areaServed`,
  `sameAs`, `hasCredential`), WebSite, WebPage, BreadcrumbList. FAQPage only where the questions are
  visible. Place for neighborhood pages with accurate names.
- Add `dateModified` (ISO date) to the WebPage node of any page you change in a meaningful way, and
  make sure a visible "Updated Month YYYY" line agrees with it where the page has one. Do not bump
  dates on pages you did not change.
- Check Google's current structured data documentation for any type we use. Google has narrowed
  FAQ rich results over time, so keep FAQPage because it helps AI answers and is harmless, but do
  not expect stars or rich results from it. Never add Review or AggregateRating markup.
- Validate a sample of changed pages by parsing the JSON-LD and checking required properties for
  each type. If you can reach the Schema Markup Validator or the Rich Results Test, use it.

**Speed and Core Web Vitals**
- Every page has an inline animated beach hero scene (SVG), and the other hero scenes load on demand
  from `scenes/` (noindex on purpose). That is Ricky's intentional design. Do not remove, simplify or
  move the scenes. Do measure the cost: load the
  home page and two neighborhood pages in Playwright at phone width (390 by 844) and record Largest
  Contentful Paint, Cumulative Layout Shift and total transfer size. Use the same method every run
  so the numbers trend: serve the repo locally, emulate Slow 4G through the Chrome DevTools
  Protocol (`Network.emulateNetworkConditions`, about 400 Kbps down, 400 ms latency) and a 4x CPU
  slowdown, wait for load plus 3 seconds, and say in the report if you had to use another method.
  Flag CLS above 0.1 on any page. If the PageSpeed Insights API is reachable without a key, fetch
  it for the home page and the focus area page (mobile) and record the scores. Compare with the last report. If
  numbers got worse by a lot, report it with the likely cause and a proposed fix for a human.
- Safe fixes you may make: add `width` and `height` to `<img>` tags (use the real file
  dimensions), add `loading="lazy"` to images below the fold, add `decoding="async"`. Never lazy
  load the first visible image.

**Mobile and accessibility**
- At 390 px wide: no horizontal scroll, tap targets readable, text not clipped, forms usable.
- Images have meaningful alt text in Ricky's voice that names the place when relevant.
- Headings in order (H1, then H2, then H3), link text is descriptive (no "click here").

**Internal linking**
- Every neighborhood page links to the hub (`neighborhoods.html`), to 3 to 6 geographic
  neighbors, and to the buy, sell, home value and relocation pages with anchors that name the place
  ("Carmel Valley home value estimate", not "click here").
- The hub and the home page link to every Tier 1 and Tier 2 page.
- Natural neighbor sets to keep cross linked: Carmel Valley, Del Mar, Solana Beach, Rancho Santa Fe,
  Rancho Penasquitos; Del Mar, Solana Beach, Encinitas; Encinitas, Carlsbad, Rancho Santa Fe;
  Carlsbad, Oceanside, Vista, San Marcos; Poway, Rancho Bernardo, Scripps Ranch, Rancho
  Penasquitos; Escondido, San Marcos, Rancho Bernardo; Fallbrook, Bonsall, Oceanside, Vista; La
  Jolla, University City, Pacific Beach; Pacific Beach, Mission Beach, Ocean Beach, Point Loma;
  Hillcrest, North Park, University Heights, Normal Heights, Kensington, South Park; Downtown,
  Little Italy.
- Look for keyword cannibalization: two of our pages aiming at the same query. Pick the one that
  should win, sharpen the other toward a different intent, and link between them.

### Phase 1b. Traffic and leads (every run)

The goal is to know where visits and leads come from, and to put this run's effort where it pays.
Every account stays read only. These numbers live only in `seo-audit/` files, never on the site.

**Windows.** Use the last 28 complete days ending 3 days before the run (Search Console lags 2 to 3
days), and the 28 days before that. Use the same two windows in every tool. Label every number with
its source (GSC, Bing, GA4) and window.

**Pull:**
- **Search Console:** totals; by page; by query; query plus page for the top 20 pages and the focus
  pages; by device. URL Inspection for the focus pages and any Tier 1 page not yet indexed.
- **Bing Webmaster Tools:** top queries, top pages, daily totals, crawl stats and crawl issues, and
  URL inspection for the focus pages.
- **Google Analytics (GA4 `properties/559986199`):** sessions, engaged sessions and key
  events by landing page; the same by session default channel group; sessions by session source for
  referrals; and the leads below by landing page and by channel.

**Clean the GA4 numbers first.** Report only sessions where `hostName` is exactly `rickyheidt.com`.
Local test pages (`127.0.0.1`, `localhost`) and Netlify deploy previews (`*.netlify.app`) also send
data to the property. Then list, as a separate line, sessions with no engagement from data center
cities (for example Council Bluffs, Iowa and Glenview, Illinois in the first weeks) or a `(not set)`
city. These look like crawlers and other automated visits, so leave them out of conclusions. GA4
data starts 2026-10-21, the day the stream was created.

**What counts as a lead.** Every site form posts to `thank-you.html`, and the relocation guide form
posts to `guide-download.html`. Netlify's form handling rewrites those actions, so after a real
submission the visitor lands on `/thank-you` or `/guide-download` (no `.html`). The property turns a
page view of either page into the key events `thank_you` and `guide_download`; the rules must match
`thank-you` and `guide-download` without `.html`, or real leads are missed (fixed 2026-11-08). Check the two event
create rules on the web stream each run (read only) and flag them under "Needs a human" if they
have changed. Report the two key events by the session's landing page and channel. For
dates before the rules were fixed, count page views whose path contains `thank-you` or
`guide-download`. Also list (read only) the key events the property has and note any change.
Since 2026-11-08, Google Tag Manager (GTM-TD52K2JX) also sends `phone_click` (tel: links),
`text_click` (sms: links), `calendly_click` (any calendly.com/rickyheidt link, including the pop up
buttons) and `calendly_booked` (a meeting actually scheduled in the Calendly pop up). Report all
six lead events by landing page and channel, with `calendly_booked`, `thank_you` and
`guide_download` as the strongest signals. A phone or text click only means the button was tapped.
All six were marked as key events on 2026-11-08. If any stops being one, add "mark [event] as a key
event in GA4" under "Needs a human". The template key events `close_convert_lead`, `qualify_lead`
and `purchase` are not sent by the site; ignore them. Never edit the tag snippets to add tracking, and never read form submissions
(they hold personal data).

**Turn it into decisions.** One line each in the report, with the numbers that triggered it:
- **Leads:** the landing pages and channels that produced leads are the site's best pages. Keep them
  fresh first, and note which areas the leads point to. They show where demand is and feed the
  focus area and the backlog.
- **Traffic, no leads:** a page in the top 10 by sessions with no lead in the window. Review its
  answer first summary, the call to action wording near the top and halfway down, and its links to
  the home value and contact pages. Never touch the form markup.
- **Impressions, few clicks:** a page or query with click through rate well under the site average
  and enough impressions to matter. Rewrite the title or description in phase 6, unless it changed
  in the last 28 days (section 7b).
- **Striking distance:** queries at average position 5 to 20. These lead phase 6.
- **Wrong page ranking:** a query where Search Console shows a different page from the one
  `keywords.md` maps. Fix it as cannibalization (phase 1, internal linking).
- **AI assistants:** sessions referred by chatgpt.com, perplexity.ai, copilot.microsoft.com,
  gemini.google.com or any other AI assistant, by landing page. Those pages are being cited. Keep
  their numbers current every run, keep their key answers short and self contained, and track the
  trend in the scorecard.
- **Bing and Google disagree:** a page or query that does well on one engine and not the other.
  Check indexing in the weaker one, internal links and the title match. Bing results feed Copilot
  and ChatGPT search, so a Bing gap is worth closing.
- **Not indexed:** a Tier 1 page still "Discovered, currently not indexed". Add links to it this run
  from indexed pages with descriptive anchors, and put "request indexing for [URL]" under "Needs a
  human" (the run never submits URLs).
- **Referrals:** non AI referrers (portals, directories, local news, the brokerage) go to phase 9 as
  citation and link leads.

**Small numbers.** While the site is new (roughly under 100 clicks or 300 sessions in 28 days),
describe what you see and do not draw conclusions. Never say a change caused a traffic move; say what
changed and when, and let the trend build across runs. Once a year of data exists, also compare with
the same 28 days a year earlier.

**Record** the tables in `keywords.md` under "Search Console, Bing and Analytics, YYYY-MM-DD", the
decisions in the report's "Traffic and leads" section, and the scorecard rows.

### Phase 2. Search landscape for the focus area

Build or refresh the focus area's rows in `keywords.md`. For each area, cover at least these
query families (swap in the area name and its main ZIP):

- Transactional buy: "[area] homes for sale", "[area] real estate", "[ZIP] homes for sale",
  "condos for sale in [area]", "new construction [area]", "[area] luxury homes".
- Agent: "[area] realtor", "[area] real estate agent", "best realtor in [area]" (we target the
  intent, never the superlative claim).
- Sell: "sell my house in [area]", "[area] home value", "what is my home worth [area]", "cost to
  sell a house in [area]", "best time to sell in [area]".
- Market: "[area] home prices", "[area] housing market 2026", "[area] median home price",
  "is [area] a buyer's market".
- Living: "living in [area]", "[area] vs [neighbor]", "moving to [area]", "[area] schools",
  "[area] Mello-Roos", "[area] HOA fees", "[area] commute to [employer hub]", "things to do in [area]".
- Rules and costs: "[city] ADU rules", "[city] short term rental rules", "[city] property tax rate",
  "fire insurance [area]", "coastal development permit [city]".

For each priority query, using search (and Search Console data when available), record:
- Our page that should win and our approximate position (or "not in top 20").
- The top 5 organic results and the page type that wins (portal listing page, agent neighborhood
  guide, market report, news, government).
- Map pack: who shows, review counts as shown publicly.
- "People also ask" questions and related searches. Copy the questions into `keywords.md`.
- Whether an AI Overview or AI answer appears and which sites it cites. Ask the same question the
  way a person would ask an AI assistant ("what are the best areas to buy a home in North County
  San Diego for a commute to Sorrento Valley") and note which sources get cited.
- Intent: informational, comparison, transactional, local. Make sure the page we map to matches
  the intent. A listing search query will be won by portals, so we aim our guide pages at the
  informational and comparison versions of that need instead.

Find the **striking distance** queries: where we are roughly positions 5 to 20, from Search
Console first (phase 1b) and web search second. Those are the best return for on-page work this run.
List them first in phase 6.

### Phase 3. Competitor intelligence

The goal is to know, every two weeks, who is beating us for the searches that matter, what they
just did, and exactly what we will do about it.

**The roster** lives in `competitors.md`. Build it on the first run from what actually ranks in
phase 2, then keep it current. Group competitors:
1. **Local agents and teams** with their own sites who rank in North County and the focus areas.
   Aim for the 10 to 15 that show up most often across our query set.
2. **Brokerage pages** with San Diego and North County neighborhood content (for example Compass,
   Coldwell Banker, Berkshire Hathaway HomeServices, Sotheby's International Realty, Douglas Elliman,
   Keller Williams, RE/MAX, Real Broker, Willis Allen, Pacific Sotheby's, and eXp agents in the area).
3. **Portals and aggregators** that own neighborhood and market pages (Zillow, Redfin, Realtor.com,
   Homes.com, Trulia, Movoto, Niche, NeighborhoodScout, Point2).
4. **Local media and information sites** that win "living in" and market queries (Union-Tribune,
   Coast News, Patch, San Diego Magazine, city and chamber pages).

Only list a business in groups 1 and 2 if you saw it ranking. Do not seed the roster from memory.

**Every run A, for each group 1 and group 2 competitor that ranks for the focus area:**
- Fetch their public `sitemap.xml` (or sitemap index) once. Record the URL count and list new URLs
  since the last snapshot. New URLs are the best early signal of their content strategy (new
  neighborhood guides, market reports, blog campaigns, landing pages).
- For their page that outranks ours: title and description pattern, H1, word count, sections
  covered, freshness date shown, schema types, media (video, maps, galleries, calculators), FAQ
  questions answered, internal links to and from it, calls to action, lead magnets.
- Whether they publish a monthly market report for the area, how current it is, and which data
  source they cite.
- Public Google Business Profile signals visible in search: category, review count, rating, recent
  posts. Note change since last run.
- Public mentions and links that seem to help them (local news features, school foundation
  sponsorships, chamber listings, community guides). These become outreach ideas for Ricky.

**Every run B:** a lighter pass. Recheck rank for the focus area's top 10 queries, fetch sitemaps
for the 5 competitors that matter most, note new pages and anything big.

**Turn it into action.** For each gap, write one line in the report with a decision:
- **Close now:** we can beat their page with original, sourced, more specific content on an
  existing page this run. Do it in phase 6.
- **Backlog:** needs a new page, a tool, a video, photos, or Ricky's input. Add to `backlog.md` with
  the evidence and an expected value (high, medium, low).
- **Ignore:** not our audience, a portal listing feed we cannot and should not imitate, or not
  worth it. Say why in one clause.

Things that usually beat a competitor page: fresher numbers with the month stated, data at the
right geography, honest tradeoffs (HOA vs Mello-Roos, coastal vs inland, commute times by route
and time of day), specific streets and landmarks, answers to the exact People also ask questions,
comparisons with neighbor areas, and a clear next step. Length alone does not win. Usefulness does.

### Phase 4. San Diego market data

**Pull, for the latest full month:**
- County (detached and attached separately when the source splits them): median sales price,
  year over year and month over month change, closed sales, new listings, active inventory, months
  of supply, median days on market, percent of list price received, and share of listings with a
  price cut (Tier B source, labeled).
- Each Tier 1 area and as many Tier 2 and 3 areas as a source covers at that geography (city, ZIP
  or MLS area): median price, closed sales, days on market, inventory or months of supply, and
  year over year change. Small areas swing wildly month to month. When a month has fewer than 10
  closed sales for that property type, lead with the year to date or rolling 12 month figure from
  the same report, and show the monthly median only with a small sample note.
- Rates: Freddie Mac PMMS 30 year and 15 year fixed, with the week's date. Note the next Federal
  Reserve meeting date from the Fed's calendar.
- Affordability and loans: C.A.R. affordability for San Diego County when released, the current
  FHFA conforming and high balance loan limits for San Diego County, FHA limits, and the VA position
  for the year.
- Rentals for investor content: a labeled Tier B rent index (Zillow ZORI or similar) at county or
  city level.

**Record first, then publish.** Add every number to `market-data.md` before you put it on a page.
Each row: metric, property type, geography, period, value, source, URL, date pulled. Then:
- Sanity check: compare to last month's row. If a value moved more than you would expect (for
  example a Tier 1 median up or down more than 15 percent in a month), confirm it with a second
  source or a 3 month figure before publishing, and explain it on the page if it is real.
- Update every place the figure appears: home page, buy, sell, home value, FAQ, sales, the hub and
  each neighborhood page, including comparison sections and FAQ answers on neighboring area pages
  (for example the Del Mar and Solana Beach comparison appears on both pages) and the FAQPage
  schema text, which repeats the visible answer. A comparison must use the same source and month
  for both places. Search all HTML for the old value and the old month so none are left
  behind (`grep -n "September 2026" *.html`, and search for the old number itself).
- Write the meaning, not just the number. For each area page, two to four plain sentences: what it
  means for buyers right now (leverage, rate buydowns, seller credits, inspection room) and for
  sellers (pricing to the market, prep, timing), tied to the numbers you just published.
- Always state the month and the source next to the number: "The median price of a detached home
  in Carmel Valley (92130) was $X in September 2026, according to the Greater San Diego
  Association of REALTORS®."

**Seasonal angles for the next 60 days** (pick the ones that apply to the run date): holiday and
winter listing strategy, the January and February run up to spring, spring market prep, school year
and summer moves, military PCS season (summer peak), Del Mar racing season and fair traffic, fire
season and insurance timing, property tax installment dates (from the Treasurer and Tax Collector),
year end tax planning (point to a tax pro), and coastal summer demand.

### Phase 5. Local news and rule changes

Sweep these beats for anything new since the last run that changes what an owner, buyer or seller
in our areas should know. Confirm at the official source before stating it as fact.

- **Housing law and local rules:** state bills signed or taking effect (ADU and JADU, SB 9 lot
  splits, transit oriented housing such as SB 79, disclosure and wildfire rules, tenant protections,
  transfer taxes), city ADU ordinances and bonus programs (City of San Diego, Encinitas, Carlsbad,
  Oceanside and others), short term rental ordinances and permit caps (City of San Diego's licensing
  tiers, Encinitas, Solana Beach, Del Mar, Carlsbad, Oceanside, Poway), housing element and rezoning
  actions, Complete Communities, height limit and coastal zone measures.
- **Taxes and costs:** Prop 13 and Prop 19 guidance from the Assessor, supplemental tax bills,
  Mello-Roos and CFD changes, documentary transfer tax, water and SDG&E rate changes, trash fee
  changes in the City of San Diego.
- **Insurance and hazard:** FAIR Plan changes, insurer market moves in California, CAL FIRE Fire
  Hazard Severity Zone map updates and what they mean for disclosures, FEMA flood map updates, bluff
  and coastal erosion actions (Del Mar, Solana Beach, Encinitas), and the LOSSAN rail corridor and
  Del Mar bluff track projects.
- **Transportation:** Coaster and Sprinter service, the Blue Line trolley, Mid-Coast, I-5, SR-56,
  SR-78, I-15 projects, airport changes, Palomar Airport plans.
- **Jobs and development:** employer moves in Torrey Pines, Sorrento Valley, UTC, Carmel Valley,
  Carlsbad's business parks, biotech lab space, defense and Navy contracts, large housing projects
  approved or opening in our areas, new schools or school boundary changes, parks and trails, retail
  openings that change daily life (One Paseo, Del Mar Highlands, UTC, Carlsbad Village, Cedros).
- **Community calendar:** San Diego County Fair, Del Mar racing season, Farmers Insurance Open at
  Torrey Pines, Comic-Con, Padres season, Encinitas and Carlsbad street fairs, holiday events. Use
  these only where they help a living in section, with dates confirmed for the current year.

For each item that matters: update the relevant page with one or two sourced sentences, or add it to
the backlog if it needs a fuller explainer. Remove anything on the site that this sweep shows is no
longer true (a closed business, a finished project described as upcoming, a law described with the
wrong effective date).

### Phase 6. On-page upgrades for the focus area

Work the focus area pages (and their closest neighbors) against this standard. A Tier 1 page should
have all of it. A Tier 2 or 3 page should have most of it.

**The anatomy of a winning area page:**
1. **Title** (60 characters or less): place first, intent second, brand last when it fits.
   The usual pattern is "Del Mar Real Estate and Homes | Ricky Heidt, REALTOR®". Where the place
   name is shared with somewhere else (Carmel Valley in Monterey County, Del Mar in San Jose and
   Florida), add "San Diego" or the ZIP, as `carmel-valley.html` does. Change a title only when
   phase 1b or phase 2 shows a better match for how people search, and keep it unique on the site.
2. **Meta description** (155 characters or less): what the page gives, the month of the data, a
   reason to click. Unique.
3. **H1** that names the place. One per page.
4. **Answer first summary:** two to four sentences right under the H1 that answer "what is it like
   to buy or sell here right now", with the latest sourced median and month. This is the paragraph
   AI answers quote, so make it self contained and factual.
5. **Market snapshot:** the sourced numbers, the month, the source, and what they mean.
6. **Where it is:** boundaries, ZIPs, the micro areas, and how it relates to its neighbors.
7. **Homes you will find:** housing types, era of construction, lot sizes, typical price bands
   (sourced or based on Ricky's sales history only if that is already on the site), HOA and
   Mello-Roos norms with the source for any amount.
8. **Schools:** districts and schools with links to the district and the CDE Dashboard, and the
   "verify by address" note.
9. **Getting around:** freeways, transit (Coaster, Sprinter, trolley, bus), drive times to the
   main job centers stated as typical ranges with the time of day and a cited source or a mapping
   tool check done this run.
10. **Daily life:** parks, trails, beaches, shopping and dining districts, landmarks. Specific
    names, no adjectives doing the work.
11. **Things to know:** fire zone, flood, coastal rules, short term rental rules, ADU potential,
    insurance notes, any special taxes. Each with the official source.
12. **Buying here** and **Selling here:** practical, local, current advice tied to the market.
13. **FAQ:** 5 to 8 questions taken from People also ask and real buyer and seller questions,
    each answered in two to four sentences, with FAQPage schema that matches exactly.
14. **Nearby areas** with descriptive links, and the buy, sell, home value and relocation links.
15. **A clear next step:** the existing contact or home value call to action. Do not change forms.
16. **Updated line** ("Updated October 2026") that matches `dateModified` in the schema.

**Experience signals (E-E-A-T).** Google and AI answers reward first hand knowledge. We cannot
invent Ricky's experience, so: keep any first person notes Ricky has written, and when a page would
clearly benefit from his local take (a favorite trail, which streets get the sea breeze, what
buyers ask him most), add a short prompt for him under "Needs a human" in the report, with the page
and the exact question. Never write fake first person stories.

**Striking distance first.** Start with the pages phase 1b flagged (striking distance queries,
impressions without clicks, traffic without leads, AI cited pages), then the queries in positions
5 to 20 from phase 2.
Usually the fix is: match the title and H1 more closely to the query, answer the People also ask
questions on the page, add the missing section a competitor has, refresh the numbers, and add
internal links from two or three related pages with anchors that use the query wording.

### Phase 7. Content growth (one or two meaningful additions per run)

Take the highest value item from `backlog.md` that you can do well, with sources, inside the
guardrails. Prefer expanding an existing page over creating a new one. Good candidates, roughly in
order of value:

1. **San Diego market update page or section** refreshed every run B with the county snapshot, Tier
   1 area numbers, rates, and a plain reading of the month. If a dedicated page does not exist yet,
   it is the top candidate for a new page, because it gives us a reason to be fresh every two weeks.
2. **Cost to sell and net proceeds explainer** for San Diego County (commission is negotiable and
   never stated as a standard rate, escrow and title, county and city transfer taxes, typical
   prep costs), with a worked example using clearly labeled assumptions.
3. **Prop 19 and Prop 13 guide for San Diego owners** (base year transfers for 55 plus, disaster
   victims and disabled owners, parent to child changes) from the Assessor's guidance.
4. **School district guides:** Poway Unified vs San Dieguito Union High vs San Diego Unified, and
   the elementary districts that feed San Dieguito.
5. **Commute guide** from each Tier 1 area to Torrey Pines, Sorrento Valley, UTC, downtown,
   Camp Pendleton and MCAS Miramar.
6. **Mello-Roos and HOA guide** for Carmel Valley, Pacific Highlands Ranch, 4S Ranch, San Elijo
   Hills and other CFD heavy communities, with how to look up a parcel's special taxes.
7. **Fire and insurance guide** for inland North County and Rancho Santa Fe, Poway, Escondido,
   Fallbrook and Bonsall, using CAL FIRE maps, the FAIR Plan and the Department of Insurance.
8. **ADU and short term rental guides by city.**
9. **Buyer guides:** VA and military (by base), first time buyers (CalHFA and local programs),
   relocators from LA, the Bay Area, Seattle, Austin, Phoenix and out of state.
10. **Area comparison pages** that match real searches: "Carmel Valley vs Del Mar", "Poway vs
    Rancho Bernardo", "Encinitas vs Carlsbad", "Solana Beach vs Del Mar".
11. **New area pages** from the not yet covered list in section 2, when the search work shows demand.

**Every new page must have:** a unique title and description, canonical to its own URL, one H1,
the full schema set (RealEstateAgent, WebSite, WebPage with `dateModified`, BreadcrumbList, FAQPage
if it has an FAQ, Place for areas), the same header, footer, styles and scripts as the existing
pages (copy the structure of the closest existing page), an entry in `sitemap.xml`, links to it from
the hub or the most relevant pages, links out to related pages, and enough sourced, specific content
to be the best page for its query. It must pass the checker and the browser check. If you cannot
meet all of that this run, add it to the backlog instead.

### Phase 8. AI search readiness and entity consistency

- **`llms.txt`:** if missing, create one at the site root: a short plain text summary of who Ricky
  is (name, brokerage, DRE number, phone, service area), the main pages with one line each, the area
  pages grouped by tier, and the update cadence of the market data. Keep it factual and in sync with
  the pages each run. Add nothing to it that is not on the site.
- **Entity consistency:** the same name, brokerage, phone, email, office ZIP and service areas in
  the footer, the schema, `about.html`, `contact.html` and `llms.txt`. The checker enforces the
  phone and DRE number. Check the rest by reading.
- **`sameAs`** in the RealEstateAgent schema lists the real public profiles already on the site.
  Do not add profiles you cannot confirm belong to Ricky.
- **Quotable answers:** on the focus pages, make sure the key answers are in short, self contained
  paragraphs that state the place, the fact, the month and the source. AI answers lift exactly these.
- **Test it:** ask two or three focus area questions the way a person would ask an AI assistant,
  using search, and note which sites get cited and whether we do. Record it in the report so the
  trend is visible over time, next to the AI assistant referral sessions from phase 1b, which are
  the real measure.

### Phase 9. Off-site and local signals (write up for Ricky, do not act)

Search rankings in real estate depend heavily on things outside the site. List these for Ricky in
the report, specific and ready to use:

- **Google Business Profile:** two ready to paste post drafts for this period (one market update
  with the sourced numbers, one local or seasonal item), photo ideas, Q&A ideas, and any
  inconsistency you saw in the public profile (hours, category, service areas, website link).
- **Reviews:** a reminder of how many reviews the top map pack competitors show vs ours, as a fact,
  and a suggestion of recent clients to ask (no names, Ricky knows who).
- **Citations:** public listings that look missing or out of sync (Bing Places, Apple Business
  Connect, Yelp, Zillow, Realtor.com, Homes.com, Nextdoor, the brokerage roster page, the DRE lookup).
- **Links and mentions:** local link opportunities found in the competitor work (school foundation
  sponsor pages, chambers, community event sponsors, local news sources looking for market
  comments, HOA vendor lists), each with why it matters.
- **Content to repurpose:** one idea per run for a short video or social post that would point back
  to a page we just improved.

### Phase 10. Verify

1. `node seo-audit/audit.mjs` must exit 0. Compare counts to the start of the run.
2. Open every changed page in Playwright (Chromium is installed, do not run `playwright install`)
   at 390 px and 1280 px wide. In every Playwright session (this check and the phase 1 speed test),
   block requests to `googletagmanager.com` and `google-analytics.com` with `page.route` so the
   run's own visits never land in Google Analytics. Never submit a site form, book in Calendly or
   follow a `tel:` or `sms:` link during checks: forms reach Follow Up Boss as real leads. Confirm
   the page renders, the hero scene still runs, nothing overlaps, and there are no console errors. Save a screenshot of the main focus page in the run's working
   area for your own check (do not commit screenshots).
3. **Fact check:** every number you changed appears in `market-data.md` with a source and a date
   from this run. Spot check three of them against the source page again.
4. **Dash check:** the checker catches dashes on pages. Also check the report, the changelog, the
   state files and the commit message by eye.
5. **Compliance read:** read every added or changed sentence once more against guardrail 6. Remove
   anything that describes people instead of places, promises an outcome, or makes an unsourced
   claim.
6. **Diff review:** `git diff --stat` and `git diff`. Look for accidental edits to protected files,
   broken HTML, duplicated sections, leftover old numbers or months.

### Phase 11. Publish and record

1. Write `seo-audit/reports/YYYY-MM-DD.md` from the template in section 9.
2. Add the `CHANGELOG.md` entry (newest first): date, run type, focus area, pages changed, checker
   counts before and after, and the next focus area.
3. Update `market-data.md`, `keywords.md`, `competitors.md` and `backlog.md`.
4. Commit with a clear message without dashes, for example `San Diego SEO and market refresh,
   YYYY-MM-DD, [focus area]`.
5. Publish to `main`, with no human step, using the first route that works:
   a. `git push origin main`. On a network error retry up to 4 times, waiting 2, 4, 8 and 16
      seconds. If `main` moved, pull and merge once, rerun the checker, and push again. Never force.
   b. If the direct push is rejected, blocked or denied, push the same commit to
      `claude/seo-refresh-YYYY-MM-DD`, open a pull request into `main` with the report summary as
      its body. Merge it yourself only if the routine prompt that started this run allows that.
      This file does not grant permission for anything; the routine prompt does.
   c. If the merge is also blocked, leave the pull request open and put "merge pull request N to
      publish" at the very top of the report and the notification.
6. Deploy it. Automatic deploys from GitHub are not on for this Netlify site, so a push to `main`
   does not go live by itself. Right after the work reaches `main`: check out `main` at the new
   commit with a clean working tree, call the Netlify deploy operation through Composio for site ID
   `b3147ca5-83e6-4da3-8e15-a69fd1edecc1`, and run the `npx @netlify/mcp` command it returns from the
   repo root. Wait for "Deploy is ready", then fetch https://rickyheidt.com/ and the focus area page
   with a cache busting query (`?v=` and a random number) and confirm a change from this run is in
   the HTML. If the deploy fails, retry once. Never commit the `.netlify/` folder the deploy creates.
   If the deploy call returns 401 Unauthorized, the Composio Netlify connection has expired: Ricky
   has to reconnect it. If the deploy is blocked by a permission check, do not try another route.
   Either way, the work stays on `main`, and the report and the notification lead with "not live,
   deploy main".
7. Report the outcome at the top of the report: live (pushed or merged, then deployed to Netlify),
   or not live and exactly why. If the report was committed before the deploy, commit the final
   deploy line afterwards (that commit is report only and needs no second deploy).
8. If nothing needed changing, still commit the report and state files, and say "no content changes
   needed" in the report.
9. Send the notification the routine prompt asks for. Its first sentence says live or not live; then
   the top Search Console, Bing and Analytics changes, leads, what changed on the site, the market
   numbers and sources, competitor moves, what needs Ricky and the next focus area.

---

## 7. Focus rotation

Each run takes the next area in the list, so every market gets a deep pass about every five months,
and Tier 1 areas get one about every ten weeks on top of the county refresh. The changelog names the
next one. Tier 1 areas appear twice in each cycle.

1. Carmel Valley and the 92130 corridor (Pacific Highlands Ranch, Torrey Hills, Del Mar Heights)
2. Del Mar and Solana Beach
3. Rancho Santa Fe, Fairbanks Ranch and Santaluz
4. Poway
5. Encinitas and Cardiff
6. Carlsbad and Oceanside
7. Carmel Valley and the 92130 corridor
8. Rancho Bernardo, Rancho Penasquitos, Scripps Ranch and Mira Mesa (with 4S Ranch and Torrey Highlands)
9. Del Mar, Solana Beach and Rancho Santa Fe
10. La Jolla, University City and Pacific Beach
11. Poway and Encinitas
12. Central San Diego (Hillcrest, North Park, South Park, University Heights, Normal Heights,
    Kensington, City Heights, Mission Valley, Downtown, Little Italy)
13. Coastal San Diego (Mission Beach, Ocean Beach, Point Loma, Clairemont)
14. Vista, San Marcos, Escondido, Fallbrook and Bonsall
Then start again at 1.

Every run, whatever the focus: refresh the county numbers when a newer month is out, fix checker
findings, and keep the home page and hub current. If big news hits an area out of turn (a new law, a
fire, a major project), handle it that run and note it.

---

## 7b. Google Search Central rules

From the SEO Starter Guide and Search Essentials.
- Give changes time. Google says to wait a few weeks before judging an edit. Do not rewrite the
  same page's title, description or H1 again within 28 days of the last change unless it is broken
  or wrong. Record each title or description change in the report so the next run can measure it
  in Search Console before touching it again.
- People first. Write for the reader, then check the wording matches how people actually search
  (beginners and experts use different words, for example "Mello-Roos" and "special tax"). Never
  repeat a keyword unnaturally. Keyword stuffing breaks Google's spam policies.
- No meta keywords tag, no word count targets. Length does not rank, usefulness does.
- Link to trusted sources (government, districts, SDAR, C.A.R.) with descriptive anchor text. Add
  `rel="nofollow"` to any outbound link you cannot vouch for.
- Images help people find the site. When Ricky provides real photos of an area, place them next to
  the matching section with specific alt text (the place and what is shown). Never use stock or
  scraped photos presented as the area.
- Check how Google sees a page with Search Console URL Inspection, not just the browser.

## 8. Writing standards for site copy

- Write for a smart person who is new to the area. Short sentences, concrete nouns, real names of
  streets, parks, schools and freeways.
- Lead with the answer, then the detail.
- Every number has a month and a source next to it in plain words.
- Ranges use "to": "$1.8M to $2.4M", "20 to 35 minutes".
- Use "about" for typical drive times and say when ("about 20 minutes to Sorrento Valley outside
  rush hour").
- No em dashes, no en dashes, no spaced hyphens used as dashes.
- No keyword stuffing. Name the place naturally, as a local would.
- No superlatives about Ricky, no hype adjectives, no exclamation points in body copy.
- "REALTOR®" with the mark. Spell place names the way the site already does, for example
  "Rancho Peñasquitos" with the ñ in copy (the file name stays `rancho-penasquitos.html`).
- Prefer the word "home" over "property" in consumer copy.
- Keep paragraphs under about 80 words so they read well on phones.
- Match the HTML patterns already used on the page (classes, section structure). Do not add inline
  styles.

---

## 9. Templates

### Report (`seo-audit/reports/YYYY-MM-DD.md`)

```
# San Diego SEO and market audit, YYYY-MM-DD

Run type: A (technical and competitive) or B (market)
Focus area: ...
Head commit at start: ...
Data tools available: Search Console, Bing, Google Analytics, Netlify (yes or no for each), others ...
Checker: X errors, Y warnings before. X errors, Y warnings after.
Deploy confirmed live: yes (commit, deploy ID, what was seen live) or no and exactly why

## Top of mind (anything Ricky must see first)
- Failures, the listing page status, a deploy problem, anything risky. "Nothing urgent" if none.

## Scorecard
| Measure | Last run | This run |
|---|---|---|
| Search Console clicks and impressions, 28 days (prior 28) | | |
| Search Console average position and CTR | | |
| Bing clicks and impressions, 28 days | | |
| GA4 sessions, organic Google and organic Bing | | |
| GA4 sessions referred by AI assistants | | |
| Leads: calendly_booked, thank_you, guide_download, calendly_click, phone_click, text_click (cleaned, rickyheidt.com only) | | |
| Top lead landing page and channel | | |
| Tier 1 pages indexed (URL Inspection) | | |
| Priority queries in top 10 (approximate unless Search Console) | | |
| Priority queries in striking distance (5 to 20) | | |
| Focus area pages updated with the latest month | | |
| Pages with dateModified | | |
| Mobile LCP and CLS, home page (phase 1 method) | | |
| Times we were cited in AI answer checks | | |

## Search Console, Bing and Analytics
- Totals and changes by source, top pages and queries, indexing, crawl health. Say when data is too
  thin to conclude.

## Traffic and leads
- Where leads came from (landing page, channel), and one line per decision from phase 1b

## Changed and published
- page: what changed and why (source name and month for any number)
- Title and description change log: page, old, new, date (for the 28 day rule)

## Market snapshot used
| Metric | Geography | Period | Value | Source |
|---|---|---|---|---|

## Search landscape (focus area)
- Query, our position, who holds the top spots, People also ask questions we now answer

## Competitor watch
- Who moved, new pages found in their sitemaps, what they do better, gaps closed this run,
  gaps still open with the decision (close now, backlog, ignore)

## Local news and rule changes
- Item, source, what we changed on the site or why not

## AI search check
- Question asked, sites cited, were we cited

## For Ricky (off site, ready to use)
- Google Business Profile post drafts
- Review, citation and link opportunities
- Questions only Ricky can answer for the pages (page, exact question)

## Needs a human (not changed)
- Unverifiable numbers, protected file issues, tool access, anything outside the guardrails

## Queued for next run
- ...
```

### `market-data.md` row
```
| Metric | Type | Geography | Period | Value | Source | URL | Pulled |
| Median sales price | Detached | 92130 Carmel Valley | 2026-09 | $X | GSDAR Local Market Update | http://sdar.stats.10kresearch.com/docs/lmu/2026-09/x/92130-CarmelValley | 2026-10-15 |
```

### `keywords.md` row
```
| Query | Intent | Our page | Our position | Top results (type) | PAA captured | Last checked |
```

### `competitors.md` snapshot
```
### Competitor name (group), site
- Ranks for: queries and approximate positions
- Sitemap: N URLs (was M), new: list
- Winning page vs ours: what they have that we do not
- Market report: yes or no, latest month, source cited
- Map pack: review count and rating shown
- Decision: close now, backlog or ignore, with the reason
```

---

## 10. When things go wrong

| Situation | What to do |
|---|---|
| A source will not load or blocks the fetch | Try once more later in the run. Then use the next source in the same tier or keep the old figure, and note it. Never guess. |
| Sources disagree | Use the higher tier. Mention the other in the report, not on the page, unless the difference is the story. |
| The newest month is not published yet | Keep the current figures, say which release you are waiting on. |
| The checker fails on something you did not touch | Fix it if it is a safe, small fix inside the guardrails. Otherwise report it at the top. |
| A page breaks in the browser check | Revert your edit to that page. Report it. |
| The listing page looks sold or stale | Do not edit it. Flag it at the top of the report. |
| You find a protected file problem (phone, license, form, function) | Do not edit. Flag it at the top of the report. |
| A competitor appears to copy our content | Note the URLs in the report for Ricky. Take no other action. |
| Search results look personalized or odd | Note it, use several query variants, label positions as approximate. |
| You run low on time or budget | Follow the priority order in section 1, then verify, report and push what is done. |
| The push fails | Section 6, phase 11, steps 5 and 6. Never force push. |
| The Netlify deploy returns 401 or the connection is not active | The Composio Netlify connection expired. Keep the work on `main`; lead the report and the notification with "not live: reconnect Netlify in Composio, then deploy main". |
| The deploy is blocked by a permission check | Do not try another route. Same report and notification line as above. |
| A market report URL shows an older month than requested | The new month is not out. Keep the current figures and say which release you are waiting on. |
| Google Analytics shows the homesbyheidtgroup.com property | Wrong account. Use the Composio Google Analytics account aliased `rickyheidt.com` and `properties/559986199`. |
| GA4 numbers jump with no matching Search Console change | Check hostname and city first (test pages, previews, bots) before reading anything into it. |

---

## 11. Maintenance notes

- The checker `seo-audit/audit.mjs` is dependency free and runs anywhere with Node:
  `node seo-audit/audit.mjs` for a readable report, `--json` for machine output. It exits 1 on any
  ERROR. If you add a check, keep it dependency free and test it on a scratch copy of the site.
- To pause the audits, disable the routine in the Claude app. To change the schedule, change it
  there. To change what the runs do, edit this file and merge it to `main`, since the runs read it
  from `main`.
- Runs should suggest improvements to this playbook in the report under "Queued for next run"
  rather than editing it themselves.
- Known checker gap: it warns about `<img>` tags without a `src` (the lightbox placeholder on
  `index.html`, `sales.html` and the listing page). Those warnings are false positives.
