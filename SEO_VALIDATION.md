# SEO Validation Checklist

## Automated Checks

Run these commands to verify SEO implementation:

```bash
# Build the site
npm run build

# Check for common SEO issues
npx astro check

# Analyze bundle size
npm run preview
```

## Manual Validation

### 1. Meta Tags Verification

Check each page has:
- [ ] Title tag (50-60 characters)
- [ ] Meta description (150-160 characters)
- [ ] Canonical URL
- [ ] Open Graph tags
- [ ] Twitter Card tags
- [ ] hreflang tags (for zh pages)

### 2. Keyword Density Check

For each page, verify main keyword appears:
- [ ] In H1 tag
- [ ] In first paragraph
- [ ] Throughout content naturally
- [ ] Density: 2-3% (20-30 times per 1000 words)

**Formula**: (Keyword Count / Total Words) × 100 = Density %

### 3. Content Requirements

Each page must have:
- [ ] 1000+ words
- [ ] At least 1 image with alt text
- [ ] Proper heading hierarchy (H1 → H2 → H3)
- [ ] 3+ internal links
- [ ] External source citations

### 4. Structured Data

Validate JSON-LD schema:
- [ ] WebSite schema present
- [ ] BreadcrumbList on sub-pages
- [ ] No validation errors

**Tools**:
- https://validator.schema.org/
- https://search.google.com/test/rich-results

### 5. Page-Specific Checks

#### Homepage (/)
- [ ] Keyword: "poke survivor" (density 2-3%)
- [ ] Game iframe embedded
- [ ] Links to tier-list, best-pokemon, zh
- [ ] 1000+ words

#### Tier List (/tier-list)
- [ ] Keyword: "pokesurvivor tier list" (density 2-3%)
- [ ] Table with early/mid/late tiers
- [ ] Update date visible
- [ ] 1000+ words

#### Chinese Guide (/zh/)
- [ ] Keyword: "pokesurvivor 攻略" (density 2-3%)
- [ ] Traditional Chinese content
- [ ] hreflang zh tag
- [ ] 1000+ words

#### Best Pokemon (/best-pokemon)
- [ ] Keyword: "pokesurvivor best pokemon" (density 2-3%)
- [ ] Focus on first 30 minutes
- [ ] Different from tier-list
- [ ] 1000+ words

#### How to Play (/how-to-play)
- [ ] Keyword: "how to play pokesurvivor" (density 2-3%)
- [ ] First 10 minutes walkthrough
- [ ] Controls explanation
- [ ] 1000+ words

#### Mobile Guide (/zh/mobile)
- [ ] Keyword: "poke survivor 中文 手機" (density 2-3%)
- [ ] Traditional Chinese
- [ ] Touchscreen controls
- [ ] 1000+ words

#### Co-op (/co-op)
- [ ] Keyword: "pokesurvivor co-op" (density 2-3%)
- [ ] 4 player info
- [ ] Online vs offline
- [ ] 1000+ words

#### Rifts (/rifts)
- [ ] Keyword: "pokesurvivor rifts" (density 2-3%)
- [ ] 18 type arenas
- [ ] Strategy focused (not pokedex)
- [ ] 1000+ words

### 6. Technical SEO

- [ ] Sitemap generated at /sitemap-index.xml
- [ ] robots.txt present
- [ ] Favicon.svg exists
- [ ] Mobile responsive
- [ ] HTTPS ready
- [ ] No broken links
- [ ] Fast page load (<3s)

### 7. Accessibility

- [ ] All images have alt text
- [ ] Color contrast ≥4.5:1
- [ ] Keyboard navigation works
- [ ] ARIA labels on nav
- [ ] Skip to content link

### 8. Google Standards

Test with:
- [ ] [PageSpeed Insights](https://pagespeed.web.dev/)
- [ ] [Mobile-Friendly Test](https://search.google.com/test/mobile-friendly)
- [ ] [Rich Results Test](https://search.google.com/test/rich-results)
- [ ] [Lighthouse](https://developer.chrome.com/docs/lighthouse/)

Target scores:
- Performance: 90+
- Accessibility: 100
- Best Practices: 100
- SEO: 100

## Word Count Tool

Use this script to check word count:

```bash
# Count words in a page (excluding HTML tags)
cat dist/index.html | sed 's/<[^>]*>//g' | wc -w
```

## Keyword Density Tool

```bash
# Count keyword occurrences
grep -io "poke survivor" dist/index.html | wc -l
```

## Deployment Verification

After deploying to Cloudflare:

1. Submit sitemap to Google Search Console
2. Verify all pages indexed
3. Check Core Web Vitals
4. Monitor search impressions
5. Test international targeting (en/zh)

## Sources Documentation

Each page should cite:
- [ ] Official game site (pokesurvivor.com)
- [ ] itch.io page
- [ ] Community resources (with URLs)
- [ ] No fabricated statistics
