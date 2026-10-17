# PokeSurvivor Design System

Game-themed dark design system inspired by pokesurvivor.org, built for the PokeSurvivor fan guide site.

## Quick Start

All design tokens and components live in **`src/styles/global.css`** — the single source of truth. BaseLayout.astro imports it; nothing else should define tokens.

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import TypeBadge from '../components/TypeBadge.astro';
import Sprite from '../components/Sprite.astro';
---

<BaseLayout title="My Page" description="..." locale="en">
  <article class="container">
    <h1>Starters Guide</h1>
    <div class="grid grid-3">
      <div class="card card-pokemon">
        <Sprite dex={25} name="Pikachu" />
        <div>
          <h3>Pikachu</h3>
          <TypeBadge type="electric" />
        </div>
      </div>
    </div>
  </article>
</BaseLayout>
```

## Design Tokens

### Color System

**Surface layers** (5-step navy/graphite ladder):
- `--surface-deep` #05070C — body background
- `--surface-base` #0A0D12 — header/footer
- `--surface-elevated` #0F131C — cards, panels
- `--surface-card` #161D2B — interactive cards
- `--surface-hover` #1E2636 — hover states

**Text hierarchy**:
- `--text-primary` #F8FAFC — headings, emphasis (98% lightness)
- `--text-secondary` #CBD5E1 — body copy (85%)
- `--text-tertiary` #94A3B8 — supporting text (65%)
- `--text-muted` #7C8BA1 — least emphasis (5.6:1 on deep, AA)

**Accents**:
- `--accent-primary` #38BDF8 — links, CTAs
- `--action-primary` #F97316 — action buttons

**Tier colors** (game rankings):
- `--tier-s` red, `--tier-a` orange, `--tier-b` yellow, `--tier-c` green
- Each has a matching `-glow` (15% alpha fill)

**Type colors**: All 18 Pokemon types as `--type-fire`, `--type-water`, etc.

### Spacing

Fluid clamp() scales across viewports:
- `--space-xs` 8–12px
- `--space-sm` 12–16px
- `--space-md` 16–24px
- `--space-lg` 24–32px
- `--space-xl` 32–48px
- `--space-2xl` 48–64px

Fixed micro spacing: `--space-1` through `--space-16` (4px – 64px)

### Typography

**Font families** (system stacks, no web fonts):
- `--font-sans` — body copy
- `--font-display` — headings, stat numbers (Trebuchet MS stack)
- `--font-mono` — code

**Sizes** (fluid clamp): `--font-size-xs` through `--font-size-4xl`

**Weights**: `--font-normal/medium/semibold/bold` (400/500/600/700)

### Radii

- `--radius-sm/md/lg/xl` — 0.5rem → 1.5rem
- `--radius-pill` 999px — buttons, badges
- `--radius-circle` 50% — avatars, sprites

## Component Classes

### Cards

```html
<div class="card">Base card</div>
<div class="card card-interactive">Hover lift + cursor</div>
<div class="card card-stat">
  <span class="stat-tile-value">29</span>
  <span class="stat-tile-label">Starters</span>
</div>
<div class="card card-pokemon">
  <img class="sprite" src="/sprites/25.png" alt="Pikachu" />
  <div>...</div>
</div>
```

### Buttons

```html
<button class="btn btn-primary">Action</button>
<button class="btn btn-secondary">Cancel</button>
<button class="btn btn-ghost">Outline</button>
<button class="btn btn-accent btn-lg">Large CTA</button>
```

- `.btn-primary` — orange solid, dark text (7.2:1 contrast)
- `.btn-secondary` — dark surface + border
- `.btn-ghost` — accent border, transparent
- `.btn-sm` / `.btn-lg` — size variants

### Badges

```html
<span class="badge badge-tier-s">S</span>
<span class="badge badge-tier-a">A</span>
```

Type badges (tinted by default, passes AA):
```html
<span class="badge badge-type type-fire">Fire</span>
<span class="badge badge-type" data-type="water">Water</span>
<span class="badge badge-type badge-type-solid type-electric">Electric</span>
```

Or use the component:
```astro
<TypeBadge type="fire" />
<TypeBadge type="water" solid />
```

### Stat Displays

**Big-number tiles**:
```html
<div class="stat-tiles">
  <div class="stat-tile">
    <span class="stat-tile-value">72</span>
    <span class="stat-tile-label">Win Rate</span>
  </div>
</div>
```

**Compact chips** (HUD style):
```html
<span class="stat-chip"><span class="stat-chip-key">ATK</span> 120</span>
```

**Key/value list**:
```html
<dl class="stat-list">
  <div><dt>HP</dt><dd>45</dd></div>
  <div><dt>Speed</dt><dd>90</dd></div>
</dl>
```

**Progress bar**:
```html
<div class="stat-bar" style="--value: 72"><span class="sr-only">72 of 100</span></div>
```

### Forms

```html
<label class="form-label" for="search">Search</label>
<input type="text" class="input search-input" id="search" placeholder="Find a Pokemon..." />
<select class="select">...</select>
<textarea class="textarea"></textarea>
```

### Tables

```html
<div class="table-wrap">
  <table>
    <thead><tr><th>Name</th><th>Tier</th></tr></thead>
    <tbody><tr><th scope="row">Charizard</th><td>S</td></tr></tbody>
  </table>
</div>
```

### Sprites

40×40 pixelated Pokemon portraits from SpriteCollab:

```astro
<Sprite dex={25} name="Pikachu" />
<Sprite dex={133} name="Eevee" size={64} />
```

Files in `public/sprites/{dex}.png` (unpadded dex number).

## Layout Structure

BaseLayout.astro renders:
- `.site-header` — sticky nav with logo + links
- `.breadcrumbs` — when passed 2+ crumb props
- `.site-main` — main content (or legacy `.main`)
- `.site-footer` — grid footer

Wrapped by RelatedGuides component below main.

## Grid & Flexbox

```html
<div class="grid grid-3"><!-- 3-column auto-fit --></div>
<div class="grid-cols-2"><!-- fixed 2 columns --></div>
<div class="flex items-center justify-between gap-4">...</div>
```

## Accessibility

- Focus ring: `--focus-ring` yellow (#FDE047)
- Screen-reader only: `.sr-only`
- Skip link: `.skip-link` (auto-rendered by BaseLayout)
- All type badges pass AA contrast (4.5:1+)
- Button text on `--action-primary` orange: 7.2:1

## Migration Notes

**Legacy token names** still work (aliased in `:root`) but will be removed:
- `--surface-0` → `--surface-deep`
- `--accent` → `--accent-primary`
- `--spacing-sm` → `--space-sm`
- `--color-bg-*` → `--surface-*`

**Stat component name collisions**: Old page `<style>` blocks define `.stat-value` / `.stat-pill`. The new classes are `.stat-tile-value` / `.stat-chip`.

**No more tokens in page styles**: Import global.css and use existing tokens. Do not redefine `--surface-*` elsewhere.

## Files

- `src/styles/global.css` — all tokens, typography, components (1259 lines)
- `src/layouts/BaseLayout.astro` — site chrome (header, footer, breadcrumbs)
- `src/components/Sprite.astro` — Pokemon sprite with pixelated rendering
- `src/components/TypeBadge.astro` — type badge with official colors
- `src/components/RelatedGuides.astro` — pill links below main
- `src/components/GameEmbed.astro`, `FAQ.astro`, `SEOHead.astro` — unchanged

## Full Cheat Sheet

See the comment block at the top of `src/styles/global.css` for a complete reference.

---

**Sprites**: 44 starters + partners downloaded from PMDCollab/SpriteCollab (CC BY-NC 4.0).  
**Color contrast**: All text/button combinations pass WCAG AA (4.5:1 body, 7:1 large).  
**Build**: `npm run build` passes. Ready for page agents.
