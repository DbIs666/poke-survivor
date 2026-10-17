// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const SITE = 'https://poke-survivors.org';

// Sitemap <lastmod> per URL path. Update the date when a page's content changes.
// TODO: Update lastmod dates when content changes
const DEFAULT_LASTMOD = '2026-10-16';
/** @type {Record<string, string>} */
const LASTMOD = {
  '/': '2026-10-16',
  '/how-to-play/': '2026-10-16',
  '/tier-list/': '2026-10-16',
  '/best-pokemon/': '2026-10-16',
  '/pokedex/': '2026-10-16',
  '/rifts/': '2026-10-16',
  '/co-op/': '2026-10-16',
  '/mobile/': '2026-10-17',
  '/privacy/': '2026-10-17',
  '/disclaimer/': '2026-10-17',
  '/zh/': '2026-10-16',
  '/zh/mobile/': '2026-10-16',
  '/zh/pokedex/': '2026-10-16',
  '/zh/how-to-play/': '2026-10-16',
  '/zh/tier-list/': '2026-10-16',
  '/zh/best-pokemon/': '2026-10-16',
  '/zh/rifts/': '2026-10-16',
  '/zh/co-op/': '2026-10-16',
  '/zh/privacy/': '2026-10-17',
  '/zh/disclaimer/': '2026-10-17',
};

// Build isolation: parallel builds can set SEO_OUT_DIR / SEO_CACHE_DIR / SEO_VITE_CACHE.
const outDir = process.env.SEO_OUT_DIR || './dist';
const cacheDir = process.env.SEO_CACHE_DIR || undefined;
const viteCacheDir = process.env.SEO_VITE_CACHE || undefined;

// https://astro.build/config
// NOTE: owner must confirm the production domain before launch.
export default defineConfig({
  site: SITE,
  trailingSlash: 'always',
  // Astro 7 defaults to 'jsx', which drops the newline+indent before/after inline
  // elements (gluing words to links). 'true' is lossless whitespace compression.
  compressHTML: true,
  outDir,
  ...(cacheDir ? { cacheDir } : {}),
  build: {
    format: 'directory',
  },
  ...(viteCacheDir ? { vite: { cacheDir: viteCacheDir } } : {}),
  // zh pages are distinct content, not translations, so no sitemap i18n alternates.
  integrations: [
    sitemap({
      serialize(item) {
        const path = new URL(item.url).pathname;
        item.lastmod = LASTMOD[path] ?? DEFAULT_LASTMOD;
        return item;
      },
    }),
  ],
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
