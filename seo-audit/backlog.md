# Content and fix backlog

Ranked ideas not done yet. Each item has the evidence behind it and an expected value. Runs take
from the top (phase 7), add new items from the competitor and search work, and move finished items
to Done with the date. See PLAYBOOK.md section 6.

## Open

| # | Item | Type | Evidence | Value | Added |
|---|---|---|---|---|---|
| 3 | San Diego market update page or section, refreshed every run B | New content | Gives the site a reason to be fresh every two weeks; confirm competitor demand in phase 3 | High | 2026-10-21 |
| 8 | Consider area pages for Pacific Highlands Ranch, Torrey Hills, Del Mar Heights, 4S Ranch, Torrey Highlands, Santaluz, Cardiff by the Sea, Leucadia, Olivenhain, La Costa, San Elijo Hills | New pages | Not on the site yet; check search demand and competitor coverage first | Medium | 2026-10-21 |
| 9 | Cost to sell and net proceeds explainer for San Diego County | New content | Playbook phase 7 list | Medium | 2026-10-21 |
| 10 | Prop 19 and Prop 13 guide for San Diego owners | New content | Playbook phase 7 list | Medium | 2026-10-21 |
| 12 | Confirm indexing of the pages Ricky requested on 2026-11-08: poway.html, pacific-beach.html and rancho-bernardo.html (not indexed), plus recrawls of 16046-summer-sage-rd.html (Google still had the old price) and carmel-valley.html (last crawled 2026-10-18). Runs add links to any still waiting from indexed pages | Indexing | URL Inspection and Search Console Pages report, 2026-11-08 | High | 2026-10-21 |
| 13 | Commute guide from Carmel Valley and the other Tier 1 areas to Torrey Pines Mesa, Sorrento Valley, UTC, downtown and the airport, with drive times checked in a mapping tool at stated times of day | New content | No ranking page answers "Carmel Valley commute to Sorrento Valley"; AI answers found only travel tools | High | 2026-10-21 |
| 14 | "Living near Torrey Pines biotech" guide (Carmel Valley, Torrey Hills, Pacific Highlands Ranch, Del Mar Heights, University City) | New content | AI style answer for this question cited only commercial lease articles | Medium | 2026-10-21 |
| 15 | Carmel Valley vs Del Mar comparison page | New content | No head to head page surfaced for the query | Medium | 2026-10-21 |
| 16 | Pacific Highlands Ranch and Torrey Hills area pages, once there is enough sourced content (subarea price data needs a source at that geography) | New pages | Redfin owns these queries; no agent guide ranks | Medium | 2026-10-21 |
| 17 | Add "San Diego" to the title, H1 and Place schema name of any other page whose place name is shared with another California place | Technical | Monterey County Carmel Valley crowds Carmel Valley results | Low | 2026-10-21 |
| 18 | Checker: skip the empty lightbox `<img alt="">` placeholder on index.html and sales.html in the width and height check (it has no src) | Technical | False positive warning | Low | 2026-10-21 |
| 20 | Del Mar bluffs and coastal permit explainer (bluff top lots, seawalls, coastal development permits, the rail realignment) for Del Mar and Solana Beach | New content | A competitor started publishing on Del Mar bluff permits (2026-10-16); no official explainer ranks | Medium | 2026-11-01 |
| 21 | Re-check whether new Del Mar short term rental permits are limited to primary residences or capped; only news and third party sites say so | Facts | City of Del Mar news item (2026-02-23) does not say; delmar.ca.us municipal code page not fetched | Low | 2026-11-01 |
| 22 | October 2026 numbers for carmel-valley.html, del-mar.html and solana-beach.html (and their comparison sections and FAQs) once the GSDAR updates publish (run B, 2026-11-15) | Market | October URLs served the September report on 2026-11-01 | High | 2026-11-01 |
| 19 | Real photos on Tier 1 area pages (Ricky to supply), placed near the matching text with descriptive alt text | Images | Area pages have no photos; Google Starter Guide recommends images near relevant text | Medium | 2026-10-25 |

## Done

| # | Item | Done | Run |
|---|---|---|---|
| 1 | `llms.txt` added at the site root | 2026-10-21 | Run A, test run |
| 2 | `dateModified` and a visible "Updated October 2026" line on carmel-valley.html (keep adding as pages are refreshed) | 2026-10-21 | Run A, test run |
| 4 | Ledger started; inventory found no market statistics on the site before this run | 2026-10-21 | Run A, test run |
| 5 | Width and height added to the sold home photos on index.html and sales.html (listing page left alone) | 2026-10-21 | Run A, test run |
| 6 | Long titles and descriptions shortened on the seven pages | 2026-10-21 | Run A, test run |
| 7 | "in 2025" on sales.html is a client review date, accurate, no change | 2026-10-21 | Run A, test run |
| 25 | GA4 event create rules fixed: thank_you matches `thank-you`, guide_download matches `guide-download` (Ricky, verified through the Admin API) | 2026-11-08 | Manual |
| 26 | Niche school rankings and grades removed from carmel-valley, del-mar, encinitas, poway, rancho-santa-fe and solana-beach (body, FAQ and schema); schools now named with district and California School Dashboard links, per guardrail 6 and Ricky's go ahead | 2026-11-08 | Manual |
| 27 | Ricky's background made consistent: born in Rancho Santa Fe, grew up in Rancho Santa Fe, Del Mar and Carmel Valley, Torrey Pines High School, no age references (index, about, carmel-valley, del-mar, rancho-santa-fe, llms.txt) | 2026-11-08 | Manual |
| 24 | Del Mar and Solana Beach comparison sections on both pages (in place of a separate page for now) | 2026-11-01 | Run A |
| 23 | Meta description and title warnings on coronado.html and services.html fixed | 2026-11-01 | Run A |
| 11 | Baseline recorded in the 2026-10-21 report (Playwright, phone, 4x CPU throttle) | 2026-10-21 | Run A, test run |
