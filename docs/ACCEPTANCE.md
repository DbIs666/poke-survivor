# Acceptance report (QA, 2026-10-16)

Backup taken before edits: `D:\tmp\ps-backup-preqa\` (src/, docs/). Nothing committed.

## Per-page results (`npx astro build && node scripts/seo-audit.mjs`: 0 failing)

| Page | Title (len) | Units | Main kw density | Secondary kw | Image |
|---|---|---|---|---|---|
| / | Poke Survivor: Play PokeSurvivor Online Free (Fan Guide) (56) | 1278 words | 2.82% | all present | pokesurvivor-menu.webp |
| /how-to-play/ | (58) | 1468 words | 2.45% | all present | menu + mobile-controls |
| /tier-list/ | PokeSurvivor Tier List: Best Partners by Stage (Fan Ranking) (60) | 1857 words | 2.42% | all present | tier-list.webp |
| /best-pokemon/ | (57) | 1340 words | 2.46% | all present | starters-29.webp |
| /co-op/ | (58) | 1586 words | 2.40% | all present | coop.webp |
| /rifts/ | (49) | 2496 words | 2.32% | all present | rift-arenas.webp |
| /zh/ | PokeSurvivor 攻略｜寶可夢倖存者繁體中文新手指南與中英對照表 (36) | 2264 units | 2.12% | all present | zh-guide.webp |
| /zh/mobile/ | (35) | 1499 units | 2.40% | all present | mobile-controls.webp |

Independent recount (separate script, own tag-stripping): /tier-list/ 1857 words, 15 matches, 0.0242; /zh/ 2264 units (2083 CJK + 181 Latin), 16 matches, 0.0212. Both match the audit exactly, so the audit formula is implemented correctly.

## Fact-check fixes

Checked against docs/FACTS.md and the official repo (GDD.md, js/data, js/systems, js/world, js/entities; read as text only).

- /rifts/: removed the three "we assume" hedges and the "our reading" note. Weather affects everyone (GDD 4.1, "Afecta a todos (tú y los enemigos)"). combat.js `typeK = Types.mult(type) * Weather.mult(type)`, and player.js hurt() does the same, so 1.6 × 1.2 = 1.92 is stated as fact.
- /rifts/ Dragon Sanctuary: the GDD lists no flame immunity. However, the code (tiles.js) uses `liquid: 'lava'` for the arena, so Fire partners are immune. This is now labelled as "our reading of the code".
- /rifts/ Grass arena: the page said "nothing is immune to the swamp". That was wrong: in world.js LIQ, Water types ignore water and swamp (also in the 2026-10-10 log). Fixed, and added to the terrain-rules list.
- ×10 tickets were stated as guaranteed on /, /how-to-play/, /co-op/, /rifts/ and /zh/. They are not. The official guide says "sometimes"; the code drops one for a boss 1 time in 3 and for a rift legendary 1 time in 2. All five pages were softened.
- Boss HP: confirmed `BOSS_SLOTS` hp × 1.35 and dmg × 1.2 in enemies.js and the 10-10 GDD log. The game then also applies `bossScale(t) = 1 + t/600` and party scaling. Removed "about 1,890 HP" from /best-pokemon/. /tier-list/ now gives both multipliers and mentions the extra scaling.
- PC orientation "Any window": removed from the / table. On /how-to-play/ it now reads "Browser (no orientation rule stated)".
- XP: "gems" and generic "experience" became experience orbs that stay put until you enter the Magnet radius, then fly to you (pickup.js). Fixed on /, /how-to-play/ and /co-op/.
- /tier-list/ Jolteon: "Fastest default move" was false, because Gust is 0.26 s. Now reads "Very quick default move (0.40 s)".
- Verified every /tier-list/ mid- and late-game partner against pokedex.js and moves.js. All 12 have the correct types, HP, speed and attack, and the correct START move for their first type. "Blissey most HP of any non-legendary (185)" is correct.
- /best-pokemon/ has no tier table, only move groups and a top-5 list. The homepage has no tier list. No "app store", "official" or "best ever" promises were found. The App Store mentions on /zh/mobile/ are warnings that no app exists.
- Grep for leftover invented claims: the remaining hits are correct statements, namely "Pikachu/Eevee/Mewtwo are not starters", Mewtwo listed as a Psychic legendary, "we won't invent lobby codes", and the no-app warning.
- Appended the sourced facts to docs/FACTS.md under "Added 2026-10-16 (QA pass)".

## Visual fixes

- I opened all 7 images in public/images and og-default.jpg.
- /zh/ image is a run-timeline diagram. Its alt text, figcaption and ogImageAlt previously described a "cover with starters"; all three now describe the timeline.
- The tier image no longer says SAMPLE DATA. Its header reads "Fan opinion · updated 2026-10-16".
- Added or normalised "Sprites: SpriteCollab (CC BY-NC 4.0)" on every caption with sprites: menu (×2), mobile-controls (×2), coop, rifts, tier, starters. The zh-guide timeline has no sprites, so it has no credit.
- Took headless Chrome screenshots at 1280 and 390 wide of /, /tier-list/ and /zh/mobile/ (D:\tmp\ps-shots\qa-*.png). Every table already sits in an `overflow-x:auto` `.table-wrap`. I saw no layout breaks, overflow or contrast problems, so no CSS changes were needed. The preview server is stopped.

## Technical checks

| Check | Result |
|---|---|
| Build + audit | PASS, 8/8 pages |
| sitemap-index → sitemap-0 | exactly the 8 URLs, trailing slashes, no 404 |
| robots.txt | `Sitemap: https://poke-survivors.org/sitemap-index.xml` |
| Canonicals | absolute, match each URL |
| Titles / descriptions | all unique |
| html lang | en / zh-Hant |
| Article JSON-LD | datePublished/dateModified 2026-10-16; image URLs absolute and present in dist |
| Internal links (nav, footer, body) | 0 broken |
| 404.html | `noindex, follow` |
| wrangler.toml | `[assets] directory="./dist"`, `not_found_handling="404-page"`: valid for static assets. Wrangler is not installed locally, so the dry run was skipped. |

## Stale root report files (not deleted)

All of these describe an earlier version of the site and contain outdated or false information:

- **FINAL_STATUS_REPORT.md**: lists Pikachu and Mewtwo as S-tier starters, has old densities, and uses "No download" copy.
- **PROJECT_STRUCTURE.md**: lists Pikachu and Eevee as starter picks.
- **P2_STATUS.md**: mentions lobby settings, "wave 30+" and a co-op-lobby SVG.
- **ACCEPTANCE_REPORT.md** and **README_PROJECT.md**: old word counts, 0% density, and SVG placeholders.
- **SEO_OPTIMIZATION_REPORT.md** and **SEO_OPTIMIZATION_SUMMARY.md**: old descriptions ("ultimate"), alt text about "waves", and a claimed `/zh` hreflang with no trailing slash.
- **SEO_IMPLEMENTATION_REPORT.md**, **docs/SEO.md** and **SEO_VALIDATION.md**: claim hreflang tags. The built pages have none.
- **SITE_MAP.md**: roughly accurate structure but outdated.
- **DEPLOYMENT.md**: describes a Cloudflare Pages action and an SVG→WebP step, which do not match the current Workers static-assets setup.

## Needs owner verification

- Dragon Sanctuary Fire immunity. This is a code reading only; the GDD says nothing.
- "87 vs 85 legendaries" on the official page.
- Real search volumes.
- Ownership of poke-survivors.org.
- Whether hreflang en↔zh is wanted. The /zh/ pages are separate content, not translations.
- Wrangler deploy dry run. Wrangler is not installed.
