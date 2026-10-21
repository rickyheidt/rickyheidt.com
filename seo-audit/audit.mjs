#!/usr/bin/env node
// Technical SEO check for the static site. No dependencies. Run from anywhere:
//   node seo-audit/audit.mjs            prints a report, exits 1 if any ERROR
//   node seo-audit/audit.mjs --json     machine-readable output
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SITE = 'https://rickyheidt.com';
// NAP and license facts that must match on every page (guardrail: never edit these, only check them)
const PHONE = '+18587587336';
const DRE = '02230045';
const HIDDEN = new Set(['404.html', 'thank-you.html', 'guide-download.html']);
const findings = [];
const add = (level, page, msg) => findings.push({ level, page, msg });

const pages = readdirSync(ROOT).filter(f => f.endsWith('.html') && !/^google[0-9a-f]+\.html$/.test(f));
const sitemap = readFileSync(join(ROOT, 'sitemap.xml'), 'utf8');
const inSitemap = new Map([...sitemap.matchAll(/<loc>([^<]+)<\/loc><lastmod>([^<]+)<\/lastmod>/g)].map(m => [m[1], m[2]]));
const robots = readFileSync(join(ROOT, 'robots.txt'), 'utf8');

const thisYear = new Date().getFullYear();
const strip = s => s.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<svg[\s\S]*?<\/svg>/g, ' ');
const text = h => strip(h).replace(/<[^>]+>/g, ' ').replace(/&[a-z#0-9]+;/g, ' ').replace(/\s+/g, ' ').trim();
const titles = new Map(), descs = new Map();
const DASH = /[\u2013\u2014]/;
const big = [];

for (const f of pages) {
  const html = readFileSync(join(ROOT, f), 'utf8');
  const hidden = HIDDEN.has(f);
  const url = f === 'index.html' ? `${SITE}/` : `${SITE}/${f}`;

  const title = (html.match(/<title>([\s\S]*?)<\/title>/) || [])[1]?.trim();
  if (!title) add('ERROR', f, 'missing <title>');
  else {
    if (title.length > 65) add('WARN', f, `title is ${title.length} chars (aim for 60 or less)`);
    if (title.length < 25) add('WARN', f, `title is only ${title.length} chars`);
    titles.set(title, [...(titles.get(title) || []), f]);
  }
  const desc = (html.match(/<meta name="description" content="([^"]*)"/) || [])[1];
  if (!desc) add(hidden ? 'INFO' : 'ERROR', f, 'missing meta description');
  else {
    if (desc.length > 160) add('WARN', f, `meta description is ${desc.length} chars (aim for 155 or less)`);
    if (desc.length < 70 && !hidden) add('WARN', f, `meta description is only ${desc.length} chars`);
    descs.set(desc, [...(descs.get(desc) || []), f]);
  }
  const canon = (html.match(/<link rel="canonical" href="([^"]+)"/) || [])[1];
  if (!canon && !hidden) add('ERROR', f, 'missing canonical');
  else if (canon && canon !== url) add('ERROR', f, `canonical ${canon} does not match ${url}`);

  const noindex = /<meta name="robots" content="[^"]*noindex/i.test(html);
  if (hidden && !noindex) add('WARN', f, 'private page is missing noindex');
  if (!hidden && noindex) add('ERROR', f, 'public page is set to noindex');

  const h1s = (html.match(/<h1[\s>]/g) || []).length;
  if (h1s !== 1 && !hidden) add('ERROR', f, `${h1s} <h1> tags (need exactly 1)`);

  for (const p of ['og:title', 'og:description', 'og:url', 'og:image'])
    if (!hidden && !html.includes(`property="${p}"`)) add('WARN', f, `missing ${p}`);

  const ld = [];
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try { ld.push(JSON.parse(m[1])); } catch (e) { add('ERROR', f, `JSON-LD does not parse: ${e.message}`); }
  }
  if (!hidden && !html.includes('application/ld+json')) add('WARN', f, 'no JSON-LD structured data');
  const nodes = [];
  const walk = o => { if (Array.isArray(o)) o.forEach(walk); else if (o && typeof o === 'object') { nodes.push(o); Object.values(o).forEach(walk); } };
  walk(ld);
  const types = new Set(nodes.flatMap(n => [].concat(n['@type'] || [])));
  if (!hidden && f !== 'index.html' && !types.has('BreadcrumbList')) add('WARN', f, 'no BreadcrumbList schema');
  for (const n of nodes) if (n.telephone && n.telephone !== PHONE) add('ERROR', f, `schema telephone ${n.telephone} does not match ${PHONE}`);

  const imgs = [...html.matchAll(/<img\b[^>]*>/g)].map(m => m[0]);
  const noAlt = imgs.filter(t => !/\balt=/.test(t)).length;
  if (noAlt) add('WARN', f, `${noAlt} <img> without alt text`);

  // Internal links and local assets must exist
  const seen = new Set();
  for (const m of html.matchAll(/(?:href|src)="([^"#?]+)(?:[?#][^"]*)?"/g)) {
    let ref = m[1];
    if (/^(https?:|mailto:|tel:|data:|sms:|javascript:)/.test(ref)) {
      if (ref.startsWith(SITE)) ref = ref.slice(SITE.length);
      else continue;
    }
    ref = ref.replace(/^\//, '');
    if (!ref || seen.has(ref)) continue;
    seen.add(ref);
    if (!existsSync(join(ROOT, ref))) add('ERROR', f, `broken reference: ${m[1]}`);
  }

  for (const m of html.matchAll(/href="tel:([^"]+)"/g))
    if (m[1].replace(/[^+\d]/g, '') !== PHONE) { add('ERROR', f, `tel: link ${m[1]} does not match ${PHONE}`); break; }
  if (!hidden && !html.includes(DRE)) add('WARN', f, `DRE license ${DRE} not shown`);
  for (const t of imgs) if (!/\bwidth=/.test(t) || !/\bheight=/.test(t)) { add('WARN', f, '<img> without width and height (layout shift risk)'); break; }
  if (html.length > 500_000) big.push(f);

  // House style: no em or en dashes in titles, descriptions, schema or visible copy
  const dashIn = [['title', title || ''], ['meta description', desc || ''], ['JSON-LD', JSON.stringify(ld)], ['page copy', text(html)]];
  for (const [where, s] of dashIn) {
    const m = s.match(DASH);
    if (m) add('ERROR', f, `em or en dash in ${where}: "...${s.slice(Math.max(0, m.index - 30), m.index + 30)}..."`);
  }

  // FAQ schema must match questions people can actually see
  const bodyText = text(html).toLowerCase();
  for (const n of nodes) if ([].concat(n['@type']).includes('Question') && n.name) {
    const q = n.name.toLowerCase().replace(/&[a-z#0-9]+;/g, ' ').replace(/\s+/g, ' ').slice(0, 40);
    if (!bodyText.includes(q)) add('WARN', f, `FAQ schema question not visible on page: "${n.name.slice(0, 60)}"`);
  }

  // Stale-date smell: years in the past that read like "current" claims
  const body = text(html);
  for (const m of body.matchAll(/\b(?:as of|updated|in|for|market)\s+(?:[A-Z][a-z]+\s+)?(20[12]\d)\b/g)) {
    if (+m[1] < thisYear) add('INFO', f, `mentions "${m[0]}" (check if it still reads current)`);
  }
  const words = body.split(' ').length;
  if (!hidden && words < 250) add('WARN', f, `thin content, ${words} words`);

  if (!hidden && !inSitemap.has(url)) add('ERROR', f, 'public page missing from sitemap.xml');
  if (hidden && inSitemap.has(url)) add('ERROR', f, 'private page is listed in sitemap.xml');
}

for (const [t, fs] of titles) if (fs.length > 1) add('ERROR', fs.join(', '), `duplicate <title>: "${t}"`);
for (const [d, fs] of descs) if (fs.length > 1) add('WARN', fs.join(', '), `duplicate meta description`);
for (const [u] of inSitemap) {
  const f = u === `${SITE}/` ? 'index.html' : u.slice(SITE.length + 1);
  if (!existsSync(join(ROOT, f))) add('ERROR', 'sitemap.xml', `lists ${u} but the file does not exist`);
}
if (!robots.includes(`Sitemap: ${SITE}/sitemap.xml`)) add('ERROR', 'robots.txt', 'missing Sitemap line');
if (/User-agent: \*\s+(?:Allow: [^\n]*\s+)*Disallow: \/\s*$/m.test(robots)) add('ERROR', 'robots.txt', 'blocks the whole site');
for (const bot of ['GPTBot', 'OAI-SearchBot', 'ClaudeBot', 'PerplexityBot', 'Google-Extended'])
  if (new RegExp(`User-agent: ${bot}\\s+Disallow: /\\s`).test(robots + '\n')) add('WARN', 'robots.txt', `${bot} is blocked`);
if (!existsSync(join(ROOT, 'llms.txt'))) add('INFO', 'llms.txt', 'no llms.txt summary for AI assistants');
const today = Date.now();
for (const [u, d] of inSitemap) {
  const days = Math.round((today - Date.parse(d)) / 864e5);
  if (days > 120) add('INFO', 'sitemap.xml', `${u.slice(SITE.length + 1) || 'index.html'} not updated in ${days} days`);
}
if (big.length) add('INFO', `${big.length} pages`, 'HTML over 500 KB (mostly the inline hero scene SVGs); watch Core Web Vitals');

const order = { ERROR: 0, WARN: 1, INFO: 2 };
findings.sort((a, b) => order[a.level] - order[b.level] || a.page.localeCompare(b.page));
const count = l => findings.filter(x => x.level === l).length;

if (process.argv.includes('--json')) console.log(JSON.stringify({ pages: pages.length, findings }, null, 1));
else {
  console.log(`Checked ${pages.length} pages: ${count('ERROR')} errors, ${count('WARN')} warnings, ${count('INFO')} notes\n`);
  for (const x of findings) console.log(`${x.level.padEnd(5)} ${x.page}: ${x.msg}`);
}
process.exit(count('ERROR') ? 1 : 0);
