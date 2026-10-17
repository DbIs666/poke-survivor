# SEO Infrastructure Documentation

## Overview
This project implements Google-standard SEO best practices with comprehensive metadata, structured data, and internationalization support.

## Components

### 1. SEOHead Component (`src/components/SEOHead.astro`)

Handles all SEO meta tags and structured data:

- **Primary Meta Tags**: title, description, keywords, canonical
- **Open Graph**: Full OG protocol support for social media sharing
- **Twitter Cards**: Large image cards with proper metadata
- **Schema.org**: WebSite and BreadcrumbList structured data
- **Internationalization**: hreflang tags for en/zh locales
- **Robots**: Configurable indexing directives

#### Usage Example:

```astro
---
import SEOHead from '../components/SEOHead.astro';
---

<SEOHead
  title="Your Page Title"
  description="Your page description"
  keywords="keyword1, keyword2, keyword3"
  canonical="/your-page/"
  locale="en"
  ogImage="/images/og-your-page.jpg"
  breadcrumbs={[
    { name: 'Home', url: '/' },
    { name: 'Your Page', url: '/your-page/' }
  ]}
/>
```

### 2. BaseLayout (`src/layouts/BaseLayout.astro`)

Complete page layout with SEO integration:

- Auto-generates hreflang alternates for bilingual pages
- Responsive navigation with language switcher
- Accessible skip-to-content link
- Semantic HTML5 structure
- SEO-friendly footer with internal links

#### Usage Example:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---

<BaseLayout
  title="Page Title"
  description="Page description"
  keywords="optional, keywords"
  locale="en"
  breadcrumbs={[...]}
>
  <h1>Your Page Content</h1>
  <p>Page body...</p>
</BaseLayout>
```

### 3. Global Styles (`src/styles/global.css`)

Design system with:

- **Deep Dark Theme**: 5-level surface hierarchy (#05070C → #1A1E26)
- **Color Tokens**: Semantic naming (--color-bg-deep, --color-text-primary)
- **Fluid Typography**: clamp() scale from xs to 4xl
- **CSS Grid Layout**: Grid-first responsive system
- **Accessibility**: Focus states, reduced-motion support, WCAG-compliant contrast

## SEO Features

### Structured Data (JSON-LD)

Automatically includes:
- WebSite schema with site name and description
- BreadcrumbList when breadcrumbs prop is provided
- Proper inLanguage attributes

### Internationalization (i18n)

Configured in `astro.config.mjs`:
- Default locale: `en`
- Supported locales: `en`, `zh`
- URL structure: `/` for English, `/zh/` for Chinese
- Automatic hreflang generation

### Performance Optimizations

- Minimal inline CSS for critical path
- Web font preloading ready
- Optimized meta tag order (most important first)
- Compressed HTML output

## Best Practices Implemented

✅ Semantic HTML5 elements (header, nav, main, footer, article, section)
✅ ARIA labels for navigation and interactive elements
✅ Skip-to-content link for keyboard users
✅ Focus-visible outlines for keyboard navigation
✅ Prefers-reduced-motion media query support
✅ Mobile-first responsive design
✅ Fast page transitions
✅ Canonical URL management
✅ robots meta tag configuration
✅ Open Graph image specifications

## Adding New Pages

1. Create page in `src/pages/`
2. Import and use BaseLayout
3. Provide SEO props (title, description required)
4. Add breadcrumbs for hierarchy
5. Build to generate sitemap automatically

Example:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---

<BaseLayout
  title="New Feature"
  description="Description of new feature"
  breadcrumbs={[
    { name: 'Home', url: '/' },
    { name: 'New Feature', url: '/new-feature/' }
  ]}
>
  <div class="container">
    <h1>New Feature</h1>
    <!-- Content -->
  </div>
</BaseLayout>
```

## Design System Usage

### Colors

```css
background-color: var(--color-bg-deep);     /* Deepest background */
background-color: var(--color-bg-base);     /* Base background */
background-color: var(--color-bg-surface);  /* Card/surface */
color: var(--color-text-primary);           /* Main text */
color: var(--color-accent-primary);         /* Links/accents */
```

### Typography

```css
font-size: var(--font-size-4xl);  /* Large headings */
font-size: var(--font-size-base); /* Body text */
font-size: var(--font-size-sm);   /* Small text */
```

### Spacing

```css
padding: var(--space-4);   /* 1rem */
gap: var(--space-6);       /* 1.5rem */
margin: var(--space-12);   /* 3rem */
```

### Layout

```html
<div class="container">      <!-- Max-width centered -->
<div class="grid grid-3">    <!-- 3-column responsive grid -->
<div class="card">           <!-- Elevated surface -->
<button class="btn btn-primary"> <!-- Action button -->
```

## Accessibility Checklist

✅ Proper heading hierarchy (h1 → h2 → h3)
✅ Alt text on images (remember to add when using images)
✅ Color contrast meets WCAG AA (4.5:1 for text)
✅ Keyboard navigation support
✅ Screen reader friendly markup
✅ Focus indicators visible
✅ Reduced motion support

## Testing

Verify SEO implementation:

```bash
npm run build
```

Check generated HTML in `dist/` folder for:
- Proper meta tags
- Structured data validation (use Google Rich Results Test)
- Canonical URLs
- hreflang tags

## Tools for Validation

- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Schema.org Validator](https://validator.schema.org/)
- [Meta Tags Checker](https://metatags.io/)
- Chrome DevTools Lighthouse (SEO audit)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
