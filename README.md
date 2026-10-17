# 🎮 PokeSurvivor Fan Guide

**The complete strategy guide for PokéSurvivor** — master the free browser-based survival game with expert tier lists, starter picks, rift strategies, and co-op tactics. Built by fans, for players.

[![License: CC BY-NC 4.0](https://img.shields.io/badge/License-CC%20BY--NC%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc/4.0/)
[![Astro](https://img.shields.io/badge/Astro-7-FF5D01?logo=astro)](https://astro.build)
[![Cloudflare Pages](https://img.shields.io/badge/Deploy-Cloudflare%20Pages-F38020?logo=cloudflare)](https://pages.cloudflare.com/)

---

## 🚀 Why This Guide?

Stuck on wave 20? Can't decide between Bulbasaur and Squirtle? **We've got you covered.**

- 🔢 **966 Pokémon indexed** — every starter, partner, and legendary from all 9 regions
- 📊 **Data-driven tier lists** — not opinions, actual win-rate analysis
- 🌐 **Dual-language support** — English and Traditional Chinese (繁體中文)
- 📱 **Mobile-optimized** — touch controls guide included
- 🔍 **SEO-ready** — structured data, sitemaps, i18n routing baked in

---

## 📖 What's Inside

### Core Guides

| Guide | What You'll Learn |
|-------|-------------------|
| [**How to Play**](/how-to-play/) | 10-minute crash course: controls, waves, evolution mechanics |
| [**Best Pokémon**](/best-pokemon/) | Top starter picks for beginners and speedrunners |
| [**Tier List**](/tier-list/) | Partner Pokémon ranked by meta viability |
| [**Legendary Rifts**](/rifts/) | Boss strategies for Mewtwo, Rayquaza, Arceus |
| [**Co-op Guide**](/co-op/) | Multiplayer synergies and team comps |
| [**Mobile Guide**](/mobile/) | Touch controls, performance tips |

### Pokédex

Search and filter all **966 playable Pokémon** by:
- Type (Fire, Water, Grass, etc.)
- Region (Kanto through Paldea)
- Evolution stage
- Availability in current patch

---

## 🛠️ Built With

**Modern web stack for speed and SEO:**

- ⚡ [Astro 7](https://astro.build) — zero-JS by default, fast page loads
- 📘 TypeScript — type-safe content and components
- 🌐 [@astrojs/sitemap](https://docs.astro.build/en/guides/integrations-guide/sitemap/) — auto-generated XML sitemap
- 🚀 [Cloudflare Pages](https://pages.cloudflare.com/) — edge-deployed, globally distributed
- 🎨 Custom CSS — no framework bloat, fully responsive

**SEO Features:**
- JSON-LD structured data (Game, Guide, FAQPage schemas)
- Multi-language hreflang tags
- Optimized meta titles and descriptions
- Breadcrumb navigation
- robots.txt and sitemap.xml

---

## 📦 Quick Start

```bash
# Clone the repository
git clone https://github.com/alexcss/poke-survivor.git
cd poke-survivor

# Install dependencies
npm install

# Start dev server (runs at localhost:4321)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 📂 Project Structure

```
poke-survivor/
├── public/              # Static assets
│   ├── favicon.svg      # Site icon
│   ├── robots.txt       # Search engine directives
│   └── og-image.png     # Social media preview
├── src/
│   ├── components/      # Reusable UI (Nav, Footer, Cards)
│   ├── data/            # Pokémon data, guides content
│   ├── layouts/         # Page templates (BaseLayout.astro)
│   ├── pages/           # Routes
│   │   ├── index.astro           # English home
│   │   ├── pokedex/              # Pokédex pages
│   │   ├── how-to-play/          # Guides
│   │   └── zh/                   # Chinese translations
│   ├── styles/          # Global CSS and design tokens
│   └── utils/           # Helper functions
├── astro.config.mjs     # Astro config + sitemap
├── tsconfig.json        # TypeScript settings
└── wrangler.toml        # Cloudflare Pages deployment
```

---

## 🌐 Multi-Language Support

**English** (default): `/`  
**Traditional Chinese**: `/zh/`

Each guide has a translated version:
- `/how-to-play/` → `/zh/how-to-play/`
- `/tier-list/` → `/zh/tier-list/`
- `/pokedex/` → `/zh/pokedex/`

Hreflang tags automatically added via `BaseLayout.astro`.

---

## 🎯 SEO & Performance

### What's Optimized

✅ **Semantic HTML** — proper heading hierarchy, ARIA labels  
✅ **Structured data** — JSON-LD for Game, Guide, FAQPage  
✅ **Sitemap** — auto-generated for all 966+ pages  
✅ **Meta tags** — unique titles/descriptions per page  
✅ **i18n routing** — hreflang tags for English/Chinese  
✅ **Mobile-first** — responsive design, touch-friendly  
✅ **Fast loading** — zero client-side JS on most pages

### Run SEO Audit

```bash
npm run audit
```

Checks for missing meta tags, broken links, and structured data errors.

---

## 🧪 Development Commands

| Command | Action |
|---------|--------|
| `npm install` | Install dependencies |
| `npm run dev` | Start dev server at `localhost:4321` |
| `npm run build` | Build production site to `./dist/` |
| `npm run preview` | Preview production build locally |
| `npm run astro check` | TypeScript validation |
| `npm run audit` | SEO audit (requires build) |

---

## 🚀 Deployment

**Cloudflare Pages** (recommended):

1. Connect your GitHub repo to Cloudflare Pages
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Deploy — auto-updates on every push to `main`

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

---

## 🤝 Contributing

This is a **fan project** — contributions welcome!

- 🐛 Found a bug? [Open an issue](https://github.com/alexcss/poke-survivor/issues)
- 📝 Want to improve a guide? Submit a pull request
- 🌐 Translations needed? Check [open translation issues](https://github.com/alexcss/poke-survivor/labels/translation)

**Before contributing:**
- Read [CLAUDE.md](./CLAUDE.md) for development guidelines
- Ensure all guides cite official game sources
- Test builds locally before submitting PRs

---

## 📜 License & Legal

### Content License

- **Guides & text**: Original work, free to use with attribution
- **Pokémon sprites**: [SpriteCollab](https://github.com/PMDCollab/SpriteCollab) under [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/)
- **Code**: Open source (see repo license)

### Disclaimer

**This is an unofficial fan project.**  
Not affiliated with:
- PokéSurvivor (the game)
- Nintendo
- GAME FREAK
- The Pokémon Company

Pokémon and PokéSurvivor are trademarks of their respective owners.

For full legal notice, see [/disclaimer/](/disclaimer/) on the live site.

---

## 🔗 Links

- 🎮 **Official Game**: [pokesurvivor.com](https://pokesurvivor.com/en/)
- 📦 **GitHub Repository**: [alexcss/poke-survivor](https://github.com/alexcss/poke-survivor)
- 🌐 **Live Site**: [Deploy your fork via Cloudflare Pages](#deployment)
- 📖 **Astro Docs**: [docs.astro.build](https://docs.astro.build)

---

## 📊 Project Stats

- **966 Pokémon** from Kanto (Gen 1) to Paldea (Gen 9)
- **15+ guides** across 2 languages
- **SEO-optimized** for "pokesurvivor guide", "pokesurvivor tier list", "pokesurvivor best starter"
- **Zero client-side JS** on most pages (Astro islands only where needed)
- **Mobile-first** responsive design

---

**Made with ❤️ by the PokéSurvivor community**  
*Questions? Open an issue on [GitHub](https://github.com/alexcss/poke-survivor/issues)*
