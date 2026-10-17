#!/usr/bin/env node
// SEO + content audit for the built site (dist/). Node 22, built-ins only.
// Usage: node scripts/seo-audit.mjs   (run after `astro build`; `npm run audit` does both)
// Env: SEO_OUT_DIR=<dir> audits that build output (relative to repo root) and writes the report inside it.
import { readFileSync, writeFileSync, existsSync, readdirSync, statSync, mkdirSync } from 'node:fs';
import { join, relative, sep, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT_ENV = process.env.SEO_OUT_DIR;
const DIST = resolve(ROOT, OUT_ENV || 'dist');
const REPORT = OUT_ENV ? join(DIST, 'seo-audit-report.md') : join(ROOT, 'docs', 'seo-audit-report.md');

// ---- Page config ----------------------------------------------------------
const PAGES = {
  '/': { lang: 'en', main: 'poke survivor', secondary: ['pokesurvivor', 'pokesurvivor game', 'play pokesurvivor online', 'pokemon survivor'] },
  '/tier-list/': { lang: 'en', main: 'pokesurvivor tier list', secondary: ['pokesurvivor tier', 'tier list pokesurvivor', 'poké survivor tier list'] },
  '/zh/': { lang: 'zh', main: 'pokesurvivor 攻略', secondary: ['pokesurvivor 中文', 'poke survivor 中文', '寶可夢倖存者'] },
  '/best-pokemon/': { lang: 'en', main: 'pokesurvivor best pokemon', secondary: ['best starter pokesurvivor', 'best early pokemon pokesurvivor'] },
  '/how-to-play/': { lang: 'en', main: 'how to play pokesurvivor', secondary: ['pokesurvivor guide', 'pokesurvivor controls', 'pokesurvivor beginner'] },
  '/zh/mobile/': { lang: 'zh', main: 'poke survivor 中文 手機', secondary: ['pokesurvivor mobile', 'pokesurvivor 手机'] },
  '/co-op/': { lang: 'en', main: 'pokesurvivor co-op', secondary: ['pokesurvivor multiplayer', 'pokesurvivor with friends'] },
  '/rifts/': { lang: 'en', main: 'pokesurvivor rifts', secondary: ['pokesurvivor mysterious rift', 'legendary rift'] },
};
const RULES = { minTotal: 1000, minDensity: 0.02, maxDensity: 0.03, descEn: [70, 160], descZh: [40, 120] };

// ---- HTML helpers -----------------------------------------------------------
const NAMED = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', copy: '©', mdash: '—', ndash: '–', hellip: '…', rsquo: '’', lsquo: '‘', rdquo: '”', ldquo: '“', eacute: 'é', middot: '·', rarr: '→', times: '×' };
function decode(s) {
  return s.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (m, e) => {
    if (e[0] === '#') {
      const cp = e[1].toLowerCase() === 'x' ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10);
      return Number.isFinite(cp) ? String.fromCodePoint(cp) : m;
    }
    return NAMED[e.toLowerCase()] ?? m;
  });
}
const stripTags = (h) => h.replace(/<[^>]+>/g, ' ');
function attr(tag, name) {
  const m = tag.match(new RegExp(`\\s${name}\\s*=\\s*("([^"]*)"|'([^']*)'|([^\\s>]+))`, 'i'));
  return m ? decode(m[2] ?? m[3] ?? m[4] ?? '') : null;
}
function metaContent(html, key, val) {
  for (const t of html.match(/<meta\b[^>]*>/gi) || []) if ((attr(t, key) || '').toLowerCase() === val) return attr(t, 'content');
  return null;
}
function visibleText(fragment) {
  const noScript = fragment
    .replace(/<script\b[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[\s\S]*?<\/style>/gi, ' ')
    .replace(/<noscript\b[\s\S]*?<\/noscript>/gi, ' ')
    .replace(/<template\b[\s\S]*?<\/template>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ');
  return decode(stripTags(noScript)).replace(/\s+/g, ' ').trim();
}

// ---- Content metrics ------------------------------------------------------
// CJK ideographs (+ext A, compat) — punctuation is NOT counted.
const CJK = '\\u3400-\\u4dbf\\u4e00-\\u9fff\\uf900-\\ufaff';
const CJK_RE = new RegExp(`[${CJK}]`, 'gu');
const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
// "Word" char for boundaries: letters (incl. é), digits, apostrophe-free. Keeps "poké" distinct from "poke".
const W = '\\p{L}\\p{N}';

/** English: tokens = whitespace-separated; count = case-insensitive, non-overlapping, word-bounded phrase matches. */
function enMetrics(text, phrase) {
  const total = text.split(/\s+/).filter(Boolean).length;
  const parts = phrase.trim().split(/\s+/).map(escapeRe);
  const re = new RegExp(`(?<![${W}])${parts.join('\\s+')}(?![${W}])`, 'giu');
  const count = (text.match(re) || []).length;
  return { total, count, kwUnits: parts.length };
}
/** Chinese units = CJK chars + Latin/number word tokens. */
function zhUnits(s) {
  const cjk = (s.match(CJK_RE) || []).length;
  const latin = (s.replace(CJK_RE, ' ').match(new RegExp(`[\\p{Script=Latin}\\p{N}]+`, 'gu')) || []).length;
  return cjk + latin;
}
/** Chinese match: Latin words word-bounded; spaces between Latin<->CJK optional; between CJK-CJK optional; between Latin-Latin required. */
function zhMetrics(text, phrase) {
  const total = zhUnits(text);
  const toks = phrase.trim().split(/\s+/);
  let src = '';
  toks.forEach((tok, i) => {
    const isCjk = new RegExp(`^[${CJK}]`, 'u').test(tok);
    if (i > 0) {
      const prevCjk = new RegExp(`[${CJK}]$`, 'u').test(toks[i - 1]);
      src += !isCjk && !prevCjk ? '\\s+' : '\\s*';
    }
    // CJK tokens: allow optional spaces between characters? No — match as written.
    src += escapeRe(tok);
  });
  const first = toks[0], last = toks[toks.length - 1];
  const pre = new RegExp(`^[${CJK}]`, 'u').test(first) ? '' : `(?<![${W}])`;
  const post = new RegExp(`[${CJK}]$`, 'u').test(last) ? '' : `(?![${W}])`;
  // Latin-adjacent boundaries must not treat CJK as a word char, so use Latin/number classes.
  const preL = pre && `(?<![\\p{Script=Latin}\\p{N}])`;
  const postL = post && `(?![\\p{Script=Latin}\\p{N}])`;
  const re = new RegExp(`${preL}${src}${postL}`, 'giu');
  const count = (text.match(re) || []).length;
  return { total, count, kwUnits: zhUnits(phrase) };
}
function metrics(lang, text, phrase) {
  const m = lang === 'zh' ? zhMetrics(text, phrase) : enMetrics(text, phrase);
  m.density = m.total ? (m.count * m.kwUnits) / m.total : 0;
  m.countDensity = m.total ? m.count / m.total : 0;
  return m;
}
// ---- dist walking -----------------------------------------------------------
function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (name === 'index.html') out.push(p);
  }
  return out;
}
const routeOf = (file) => {
  const rel = relative(DIST, dirname(file)).split(sep).join('/');
  return rel ? `/${rel}/` : '/';
};
/** Does an internal href resolve to a file in dist? */
function resolves(href) {
  let path = href.split('#')[0].split('?')[0];
  if (!path) return true;
  try { path = decodeURI(path); } catch { /* keep raw */ }
  const p = join(DIST, ...path.split('/').filter(Boolean));
  if (path.endsWith('/')) return existsSync(join(p, 'index.html'));
  return existsSync(p) && statSync(p).isFile();
}
// ---- per-page audit -------------------------------------------------------
function auditPage(file) {
  const html = readFileSync(file, 'utf8');
  const route = routeOf(file);
  const cfg = PAGES[route];
  const fails = [];
  const notes = [];
  const title = decode((html.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [])[1] || '').trim();
  const desc = metaContent(html, 'name', 'description') || '';
  const robots = metaContent(html, 'name', 'robots') || '(none)';
  const canonTag = (html.match(/<link\b[^>]*rel=["']?canonical["']?[^>]*>/i) || [])[0];
  const canonical = canonTag ? attr(canonTag, 'href') : '';
  const h1s = (html.match(/<h1\b[\s\S]*?<\/h1>/gi) || []).map((h) => visibleText(h));
  const mainHtml = (html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i) || [])[1] || '';
  const imgsAll = html.match(/<img\b[^>]*>/gi) || [];
  const imgsMain = mainHtml.match(/<img\b[^>]*>/gi) || [];

  if (!title) fails.push('missing <title>');
  if (!canonical) fails.push('missing canonical');
  else if (!/^https?:\/\//.test(canonical)) fails.push('canonical not absolute');
  else if (!new URL(canonical).pathname.endsWith('/')) fails.push('canonical lacks trailing slash');
  if (h1s.length !== 1) fails.push(`h1 count ${h1s.length} (want 1)`);
  for (const t of imgsAll) {
    const miss = ['alt', 'width', 'height'].filter((a) => attr(t, a) === null);
    if (miss.length) fails.push(`<img ${attr(t, 'src')}> missing ${miss.join('/')}`);
  }
  // internal links
  const broken = new Set();
  for (const t of html.match(/<a\b[^>]*>/gi) || []) {
    const href = attr(t, 'href');
    if (!href || /^(https?:|mailto:|tel:|#|javascript:)/i.test(href)) continue;
    if (!href.startsWith('/')) { notes.push(`relative link ${href}`); continue; }
    if (!resolves(href)) broken.add(href);
  }
  for (const t of [...(html.match(/<img\b[^>]*>/gi) || []), ...(html.match(/<link\b[^>]*>/gi) || [])]) {
    const u = attr(t, 'src') ?? attr(t, 'href');
    if (u && u.startsWith('/') && !u.startsWith('//') && !resolves(u)) broken.add(u);
  }
  if (broken.size) fails.push(`broken internal: ${[...broken].join(', ')}`);
  // JSON-LD
  let jsonld = 0;
  for (const m of html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    jsonld++;
    try { JSON.parse(m[1]); } catch (e) { fails.push(`invalid JSON-LD #${jsonld}: ${e.message}`); }
  }

  const row = { route, title, titleLen: [...title].length, desc, descLen: [...desc].length, canonical, robots, h1: h1s.length, imgs: imgsAll.length, imgsMain: imgsMain.length, jsonld, fails, notes };
  if (!cfg) { row.skipped = true; return row; }

  // config-driven rules
  const kwRe = (p) => (cfg.lang === 'zh' ? zhMetrics : enMetrics);
  const has = (text, p) => kwRe(p)(text, p).count > 0;
  if (!has(title, cfg.main)) fails.push(`title lacks main keyword "${cfg.main}"`);
  const [dmin, dmax] = cfg.lang === 'zh' ? RULES.descZh : RULES.descEn;
  if (row.descLen < dmin || row.descLen > dmax) fails.push(`description ${row.descLen} chars (want ${dmin}-${dmax})`);
  if (h1s.length === 1 && !has(h1s[0], cfg.main)) fails.push(`h1 lacks main keyword`);
  if (imgsMain.length < 1) fails.push('no <img> in <main>');

  const text = visibleText(mainHtml);
  const m = metrics(cfg.lang, text, cfg.main);
  row.lang = cfg.lang; row.main = cfg.main; Object.assign(row, { total: m.total, count: m.count, kwUnits: m.kwUnits, density: m.density, countDensity: m.countDensity });
  if (!mainHtml) fails.push('no <main>');
  if (m.total < RULES.minTotal) fails.push(`total ${m.total} < ${RULES.minTotal}`);
  if (m.density < RULES.minDensity || m.density > RULES.maxDensity) fails.push(`density ${m.density.toFixed(4)} outside ${RULES.minDensity}-${RULES.maxDensity}`);
  row.secondary = cfg.secondary.map((k) => ({ k, n: metrics(cfg.lang, text, k).count }));
  for (const s of row.secondary) if (s.n < 1) fails.push(`secondary "${s.k}" missing`);
  return row;
}
// ---- main -----------------------------------------------------------------
if (!existsSync(DIST)) {
  console.error(`${relative(ROOT, DIST) || DIST}/ not found. Run "astro build" first (or "npm run audit").`);
  process.exit(2);
}
const rows = walk(DIST).map(auditPage).sort((a, b) => a.route.localeCompare(b.route));
for (const route of Object.keys(PAGES)) {
  if (!rows.find((r) => r.route === route)) rows.push({ route, fails: [`page missing from dist (${route}index.html)`], notes: [], skipped: false });
}
const pct = (x) => (x === undefined ? '-' : (x * 100).toFixed(2) + '%');
const lines = [];
lines.push('# SEO audit report', '', `Generated: ${new Date().toISOString()}`, '');
lines.push('Density = keyword matches × keyword units ÷ total units, measured on visible text inside <main>. EN units = whitespace tokens; ZH units = CJK characters + Latin/number word tokens. Pass: total ≥ 1000, 2.0%–3.0%.', '');
lines.push('| Route | Lang | Title (len) | Desc len | H1 | Imgs (main) | JSON-LD | Total | Main kw count | Density | Count-only | Result |');
lines.push('|---|---|---|---|---|---|---|---|---|---|---|---|');
let failed = 0;
for (const r of rows) {
  const ok = r.fails.length === 0;
  if (!ok && !r.skipped) failed++;
  if (!ok && r.skipped) failed++;
  lines.push(`| ${r.route} | ${r.lang ?? '-'} | ${(r.title ?? '').replace(/\|/g, '\\|')} (${r.titleLen ?? 0}) | ${r.descLen ?? '-'} | ${r.h1 ?? '-'} | ${r.imgs ?? '-'} (${r.imgsMain ?? '-'}) | ${r.jsonld ?? '-'} | ${r.total ?? '-'} | ${r.count ?? '-'} | ${pct(r.density)} | ${pct(r.countDensity)} | ${r.skipped ? (ok ? 'n/a' : 'FAIL') : ok ? 'PASS' : 'FAIL'} |`);
}
lines.push('');
for (const r of rows) {
  lines.push(`## ${r.route}${r.skipped ? ' (not in keyword config)' : ''}`, '');
  if (r.canonical !== undefined) lines.push(`- canonical: ${r.canonical || '(none)'}`, `- robots: ${r.robots}`);
  if (r.main) lines.push(`- main keyword: "${r.main}" (${r.kwUnits} units) × ${r.count} in ${r.total} units = ${pct(r.density)}`);
  if (r.secondary) lines.push(`- secondary: ${r.secondary.map((s) => `"${s.k}" ×${s.n}`).join(', ')}`);
  if (r.fails.length) { lines.push('- failures:'); for (const f of r.fails) lines.push(`  - ${f}`); } else lines.push('- no failures');
  for (const n of r.notes) lines.push(`- note: ${n}`);
  lines.push('');
}
mkdirSync(dirname(REPORT), { recursive: true });
writeFileSync(REPORT, lines.join('\n'), 'utf8');

// console table
console.table(rows.map((r) => ({
  route: r.route,
  titleLen: r.titleLen,
  descLen: r.descLen,
  h1: r.h1,
  imgsMain: r.imgsMain,
  total: r.total ?? '-',
  count: r.count ?? '-',
  density: pct(r.density),
  countOnly: pct(r.countDensity),
  fails: r.fails.length,
})));
for (const r of rows) if (r.fails.length) console.log(`\n${r.route}\n  - ${r.fails.join('\n  - ')}`);
console.log(`\nReport written to ${relative(ROOT, REPORT)}. ${failed} page(s) failing.`);
process.exit(failed ? 1 : 0);
