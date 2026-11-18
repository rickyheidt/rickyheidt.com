// Adds a neighborhood-specific RealScout search link to each neighborhood page.
//
//   node seo-audit/hood-search-links.mjs
//
// To change a link later, edit LINKS below and run the script again. It is safe to
// run more than once: it replaces the links it added before instead of adding more.
//
// On each page it:
//   1. Adds a "Search <Name> Homes" button first in the hero, and turns the
//      "Get <Name> Listings" button into the light style beside it.
//   2. Replaces the "Search all San Diego County homes" link under the contact form
//      with "Search <Name> homes for sale", keeping the countywide search below it.
// A page with no entry in LINKS is left as it is.

import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

// Tracking tags added to every neighborhood link (same source and medium as the
// countywide search link, so reports group them together).
const UTM = 'utm_source=rickytherealtorsd&utm_medium=website&utm_campaign=hood-search';

const COUNTY_URL = 'https://porchlight964.realscout.com/homesearch/shared-searches/U2hhcmVhYmxlU2VhcmNoTGluay0yODg0NA==?utm_source=rickytherealtorsd&utm_medium=website&utm_campaign=search-homes';

const map = (type, id) => `https://rickyheidt.realscout.com/homesearch/map?geo_type=${type}&geo_id=${id}&for_sale=1&for_rent=0`;
const city = id => map('city', id);
const hood = id => map('neighborhood', id);

// page slug: [display name, RealScout link]
const LINKS = {
  'del-mar': ['Del Mar', city('0618506')],
  'solana-beach': ['Solana Beach', city('0672506')],
  'encinitas': ['Encinitas', city('0622678')],
  'carlsbad': ['Carlsbad', city('0611194')],
  'oceanside': ['Oceanside', city('0653322')],
  'rancho-santa-fe': ['Rancho Santa Fe', city('0659584')],
  'poway': ['Poway', city('0658520')],
  'escondido': ['Escondido', city('0622804')],
  'san-marcos': ['San Marcos', city('0668196')],
  'vista': ['Vista', city('0682996')],
  'fallbrook': ['Fallbrook', city('0623462')],
  'bonsall': ['Bonsall', city('0607498')],
  'coronado': ['Coronado', city('0616378')],
  'la-jolla': ['La Jolla', hood('813716')],
  'downtown-san-diego': ['Downtown San Diego', hood('58875')],
  'little-italy': ['Little Italy', hood('58490')],
  'hillcrest': ['Hillcrest', hood('58479')],
  'north-park': ['North Park', hood('58511')],
  'south-park': ['South Park', hood('58541')],
  'university-heights': ['University Heights', hood('58555')],
  'normal-heights': ['Normal Heights', hood('58508')],
  'kensington': ['Kensington', hood('58484')],
  'city-heights': ['City Heights', hood('194437')],
  'mission-valley': ['Mission Valley', hood('813717')],
  'pacific-beach': ['Pacific Beach', hood('58518')],
  'mission-beach': ['Mission Beach', hood('58500')],
  'ocean-beach': ['Ocean Beach', hood('58513')],
  'point-loma': ['Point Loma', hood('944558')],
  'carmel-valley': ['Carmel Valley', hood('58451')],
  'university-city': ['University City', hood('58554')],
  'clairemont': ['Clairemont', 'https://rickyheidt.realscout.com/homesearch/shared-searches/U2hhcmVhYmxlU2VhcmNoTGluay0zMjg5MA=='],
  'mira-mesa': ['Mira Mesa', hood('58496')],
  'rancho-bernardo': ['Rancho Bernardo', hood('58523')],
  'rancho-penasquitos': ['Rancho Peñasquitos', hood('58525')],
  'scripps-ranch': ['Scripps Ranch', hood('58535')],
};

const htmlName = name => name.replace('ñ', '&ntilde;');
const withUtm = (url, slug) => `${url}${url.includes('?') ? '&' : '?'}${UTM}&utm_content=${slug}`;
const esc = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

let changed = 0;
const problems = [];

for (const [slug, [name, url]] of Object.entries(LINKS)) {
  const file = join(ROOT, `${slug}.html`);
  let html = readFileSync(file, 'utf8');
  const before = html;
  const href = withUtm(url, slug);
  const label = `Search ${name} Homes`;

  // 1. Hero button. Remove one added on an earlier run, then add it fresh.
  html = html.replace(/<a class="btn btn-coral" data-hood-search [^>]*>[^<]*<\/a>/, '');
  const getBtn = new RegExp(`<a class="btn btn-(?:coral|light)" href="contact\\.html">(Get (?:${esc(name)}|${esc(htmlName(name))}) Listings)</a>`);
  if (getBtn.test(html)) {
    html = html.replace(getBtn, (_, text) =>
      `<a class="btn btn-coral" data-hood-search href="${href}" rel="noopener" target="_blank">${label}</a>` +
      `<a class="btn btn-light" href="contact.html">${text}</a>`);
  } else {
    problems.push(`${slug}: hero "Get ${name} Listings" button not found`);
  }

  // 2. Link under the contact form.
  const hoodLinks =
    `<p class="hood-search" style="margin-top:16px;text-align:center"><a href="${href}" rel="noopener" target="_blank"><strong>Search ${name} homes for sale &rarr;</strong></a><br>` +
    `<a href="${COUNTY_URL}" rel="noopener" target="_blank" style="font-size:.9em">or search all San Diego County homes</a></p>`;
  const oldCounty = /<p style="margin-top:16px;text-align:center"><a href="[^"]*realscout[^"]*" rel="noopener" target="_blank">Search all San Diego County homes &rarr;<\/a><\/p>/;
  const added = /<p class="hood-search"[^>]*>.*?<\/p>/;
  if (added.test(html)) html = html.replace(added, hoodLinks);
  else if (oldCounty.test(html)) html = html.replace(oldCounty, hoodLinks);
  else problems.push(`${slug}: search link under the contact form not found`);

  if (html !== before) {
    writeFileSync(file, html);
    changed++;
  }
}

console.log(`Updated ${changed} of ${Object.keys(LINKS).length} neighborhood pages.`);
if (problems.length) {
  console.log('Needs a look:\n  ' + problems.join('\n  '));
  process.exitCode = 1;
}
