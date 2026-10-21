# Twice-monthly SEO and market audit playbook

This is the standing brief for the automated run on the 1st and 15th of each month.
It runs unattended and publishes to the live site, so the guardrails matter as much as the tasks.

Site: https://rickyheidt.com (static HTML, hosted on Netlify, deploys from `main`).
Owner: Ricky Heidt, REALTOR, PorchLight Realty (eXp Realty). Focus: Carmel Valley, Del Mar,
Solana Beach, Rancho Santa Fe, Poway, Encinitas, plus the wider San Diego County neighborhood pages.

## Guardrails (never break these)

1. Only publish facts you can source. Every market number you add or change must come from a
   source you fetched during this run (see Sources). If you cannot verify a number, leave the
   old text alone and list it in the report as "needs a human". Never invent or estimate stats.
2. Never touch: license number, phone, email, brokerage names, legal or fair housing text,
   form fields, `netlify/functions/`, `netlify.toml`, the Follow Up Boss source, or the
   Google verification files. Do not rename or delete pages or change any URL.
3. Do not edit the active listing page (`16046-summer-sage-rd.html`) price, status or details.
   Only check that it still loads and its schema parses. Flag it if it looks stale.
4. Keep Ricky's voice: plain, warm, local. No hype, no filler, and never use em dashes or en dashes
   anywhere in site copy or commit messages. Use commas or new sentences.
5. Small, reversible edits. Max about 15 pages changed per run. No redesigns, no new
   dependencies, no changes to `styles.css` or `js/` unless a check is failing because of them.
6. Stay compliant: no guarantees, no "best agent" superlatives, keep "REALTOR®" styling,
   do not add testimonials or reviews you cannot verify.
7. If the checker reports any ERROR after your edits, fix it or revert the edit. Never push a
   failing build.

## Run steps

### 1. Baseline
- `git pull` on `main`, read `seo-audit/reports/` for the last report to see what was flagged
  or deferred, and `seo-audit/CHANGELOG.md` for what changed before.
- `node seo-audit/audit.mjs` to get the technical baseline.

### 2. Technical SEO (fix automatically)
Fix every ERROR and every WARN the checker lists: titles over 60 chars, descriptions over 155,
duplicates, missing alt text, broken links, sitemap gaps. Then also check by reading the pages:
- Heading order (one H1, logical H2/H3), internal links between hub and neighborhood pages.
- Structured data: RealEstateAgent, LocalBusiness, FAQPage, BreadcrumbList, and Place data still
  valid and consistent with the visible page. Check against current schema.org and Google
  rich-result guidance (Google retires some types, so confirm each type is still supported).
- Core Web Vitals risks: very large pages (the HTML files are 650 KB or more each, so look for
  what is inflating them), unoptimized images, missing `width`/`height`, render-blocking assets.
- Update `<lastmod>` in `sitemap.xml` only for pages whose content actually changed this run.
- Cache-bust `styles.css?v=` only if the CSS changed.

### 3. Market freshness (the "current market updates" part)
Use WebSearch and WebFetch. Prefer these sources, in this order:
1. Local MLS-derived monthly reports published by SDAR (San Diego Association of REALTORS®),
   California Association of REALTORS® (C.A.R.) monthly sales and price report, and the
   county or city pages for the market areas.
2. Freddie Mac PMMS for mortgage rates (weekly), Fannie Mae and NAR for forecasts.
3. Redfin, Zillow Research and Realtor.com public market pages as cross-checks only.
4. Local news for events that change buyer or seller behavior (new transit, school boundary
   changes, major employers, zoning and ADU law, property tax and insurance changes).

For each page that quotes market conditions (home page, buy, sell, home-value, FAQ, sales,
neighborhoods, each neighborhood page):
- Update median price, days on market, inventory and rate figures only where the source is
  fresh (latest full month) and the geography matches the page. Show the "as of" month in the
  text, for example "as of September 2026", and link or name the source in plain words.
- Rewrite any sentence that has become wrong, such as stale year references, outdated rate
  ranges, expired programs, and old law (for California: ADU/SB 9 changes, Prop 19 transfers,
  Prop 13 reassessment, transfer taxes, new disclosure rules, FAIR Plan and insurance news).
- Refresh seasonal angles to match the next 60 days (holiday listing timing, spring prep,
  school-year moves, wildfire and insurance season notes).
- Update the "Last updated" or `dateModified` fields wherever the page has them.

### 4. Content and keyword growth (one meaningful addition per run)
- Check the AI search readiness of the site: clear question and answer sections, FAQPage schema,
  `llms.txt` if the site adds one, and that `robots.txt` still welcomes the search and AI bots.
- Look at what real searchers ask (WebSearch "People also ask" style queries for each priority
  area, for example "cost to sell a home in Del Mar", "Carmel Valley school zones",
  "Rancho Santa Fe property taxes"). Pick the single biggest content gap against the top
  competing local agent sites and add or expand one section, FAQ block, or neighborhood
  paragraph that answers it with sourced facts. Keep it on an existing page unless a new
  neighborhood or topic page is clearly justified, and if you add a page also add it to
  `sitemap.xml`, the nav or hub, and a canonical.
- Rotate the focus area each run so every priority market gets deep attention in turn:
  Run 1 Carmel Valley, 2 Del Mar and Solana Beach, 3 Rancho Santa Fe, 4 Poway,
  5 Encinitas, 6 North County coastal and inland, 7 San Diego city neighborhoods, then repeat.
  Record the rotation in the changelog so the next run knows where to continue.

### 5. Local and trust signals (check, report, rarely edit)
- Confirm NAP (name, address, phone) is identical across the site, the schema, and the footer.
- Note any change to Google Business Profile, Search Console or Bing Webmaster items that
  you can see from the public web. These need a human, so list them.

### 6. Verify, then publish
1. `node seo-audit/audit.mjs` must exit 0. Open a few edited pages with the browser tooling
   (Playwright and Chromium are preinstalled) at phone width and desktop width, and confirm
   nothing is visibly broken. Do not run `playwright install`.
2. Write the report to `seo-audit/reports/YYYY-MM-DD.md` using the template below.
3. Append a short entry to `seo-audit/CHANGELOG.md`.
4. Commit with a clear message such as `SEO and market refresh, 2026-11-01`. Push to `main`
   with `git push -u origin main` (retry up to 4 times on network errors, 2s, 4s, 8s, 16s).
   Netlify deploys on push.
5. If `main` rejects the push (protected branch or conflict), do not force. Pull and merge
   once. If it still fails, push to `claude/seo-refresh-YYYY-MM-DD` and open a pull request
   so the work is not lost, and say so at the top of the report.
6. If the run found nothing worth changing, still push the report and changelog, and say
   "no content changes needed".

## Report template (`seo-audit/reports/YYYY-MM-DD.md`)

```
# SEO and market audit, YYYY-MM-DD
Focus area this run: ...
Checker: X errors, Y warnings before, X errors, Y warnings after.

## Changed and published
- page: what changed and why (source name and date for any number)

## Market snapshot used
- metric, value, geography, as-of month, source

## Needs a human (not changed)
- items you could not verify or are outside your guardrails

## Opportunities queued for next run
- ...
```

## Notes for whoever maintains this
- The checker `seo-audit/audit.mjs` is dependency free and safe to run anywhere with Node.
- To pause the audits, disable the two routines in the Claude app (Routines). To change the
  schedule, edit them there. To change behavior, edit this file and merge it to `main`.
