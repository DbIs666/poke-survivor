# Monitoring and Compliance Guide

This document provides a comprehensive checklist and implementation guide for monitoring, analytics, and legal compliance for the PokeSurvivor fan guide website.

---

## 1. Monitoring and Analytics Integration

### Google Search Console Setup

**What it does:** Tracks search performance, indexing status, Core Web Vitals, and search queries that bring users to your site.

**Setup steps:**

1. **Verify domain ownership:**
   - Go to [Google Search Console](https://search.google.com/search-console)
   - Add property: `poke-survivors.org`
   - Choose verification method:
     - **DNS verification (recommended for Cloudflare):** Add a TXT record to your Cloudflare DNS
     - **HTML file upload:** Upload verification file to `public/` directory
     - **HTML tag:** Add meta tag to `SEOHead.astro` (least preferred)

2. **Submit sitemap:**
   - After verification, go to "Sitemaps" in left menu
   - Submit: `https://poke-survivors.org/sitemap-index.xml`
   - Monitor indexing status over the next few days

3. **Set up URL inspection:**
   - Use "URL Inspection" tool to manually request indexing for priority pages
   - Recommended for first-time indexing: home page, tier list, best Pokémon, Pokédex

4. **Monitor Core Web Vitals:**
   - Check "Experience" → "Core Web Vitals" weekly
   - Address any "Poor" ratings (LCP > 2.5s, FID > 100ms, CLS > 0.1)

**Ongoing monitoring (weekly):**
- Check "Performance" report for top queries and click-through rates
- Review "Coverage" report for indexing errors
- Monitor "Enhancements" for mobile usability and structured data issues

---

### Cloudflare Web Analytics Integration

**What it does:** Privacy-focused, cookieless analytics showing page views, referrers, device types, and countries—without tracking individual users.

**Setup steps:**

1. **Enable Web Analytics in Cloudflare:**
   - Log into Cloudflare dashboard
   - Go to "Web Analytics" tab
   - Click "Add a site" and enter `poke-survivors.org`
   - Copy the provided analytics snippet (JavaScript beacon)

2. **Add beacon to the site:**
   - Open `src/components/SEOHead.astro`
   - Add the Cloudflare Web Analytics beacon before the closing `</head>` tag:

   ```astro
   <!-- Cloudflare Web Analytics -->
   <script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "YOUR_TOKEN_HERE"}'></script>
   ```

   - Replace `YOUR_TOKEN_HERE` with the actual token from Cloudflare dashboard

3. **Verify data collection:**
   - Deploy the change to production
   - Visit the site in an incognito window
   - Return to Cloudflare Web Analytics dashboard after a few minutes
   - Confirm that page views are being tracked

**What to monitor (weekly):**
- Top pages by views (ensure tier list, best Pokémon, and Pokédex are performing)
- Referrers (identify which external sites are linking to you)
- Device breakdown (mobile vs. desktop traffic)
- Country distribution (consider adding more language support if significant non-English traffic)

---

### Error Monitoring

**Recommended approach:** Use Cloudflare's built-in logging and optional Sentry integration.

#### Option A: Cloudflare Logs (free tier)

**What it does:** Captures 4xx/5xx errors, request metadata, and performance metrics.

**Setup steps:**

1. **Enable Logpush (requires Cloudflare Pro plan or higher):**
   - Go to "Analytics" → "Logs" in Cloudflare dashboard
   - Set up Logpush to send logs to a destination (e.g., AWS S3, Google Cloud Storage)
   - Filter for status codes >= 400

2. **Alternative: Real User Monitoring (RUM):**
   - Cloudflare's Web Analytics already tracks client-side errors
   - For more detailed error tracking, consider adding a minimal error handler in your global JavaScript

**Quick error handler snippet:**

Add to `src/layouts/BaseLayout.astro` before `</body>`:

```astro
<script>
  window.addEventListener('error', (e) => {
    // Log to console for debugging (production: send to monitoring service)
    console.error('Global error:', e.message, e.filename, e.lineno);
  });
</script>
```

#### Option B: Sentry Integration (recommended for production)

**What it does:** Captures JavaScript errors, tracks error trends, and provides stack traces.

**Setup steps:**

1. **Create Sentry account:**
   - Sign up at [sentry.io](https://sentry.io)
   - Create a new project, select "Astro" or "JavaScript"
   - Copy the DSN (Data Source Name)

2. **Install Sentry SDK:**
   ```bash
   npm install @sentry/astro
   ```

3. **Configure Sentry in `astro.config.mjs`:**
   ```javascript
   import sentry from '@sentry/astro';

   export default defineConfig({
     // ... existing config
     integrations: [
       sitemap({ /* ... */ }),
       sentry({
         dsn: process.env.SENTRY_DSN,
         environment: process.env.NODE_ENV || 'production',
         release: process.env.COMMIT_SHA || 'dev',
       }),
     ],
   });
   ```

4. **Add environment variable:**
   - Set `SENTRY_DSN` in Cloudflare Pages environment variables
   - Redeploy site

**What to monitor:**
- Check Sentry dashboard weekly for new errors
- Set up alerts for high error rates
- Address errors with user impact (e.g., broken links, missing images)

---

### 404 Monitoring

**Current status:** `src/pages/404.astro` exists and provides a user-friendly error page.

**Monitoring setup:**

1. **Log 404s via Cloudflare:**
   - Use Cloudflare Logpush or Workers Analytics to track 404 responses
   - Filter logs for `status: 404` and review common patterns

2. **Manual audit:**
   - Use Google Search Console "Coverage" report to identify crawl errors
   - Check "Not found (404)" errors and fix broken internal links or redirect legitimate old URLs

3. **Automated 404 tracking (optional):**
   - Add a client-side beacon to `404.astro` that sends a signal to Cloudflare Web Analytics or Sentry
   - Example snippet:

   ```astro
   <script>
     // Send 404 event to analytics (replace with your tracking method)
     if (window.cfBeacon) {
       window.cfBeacon.trackEvent('404', { path: window.location.pathname });
     }
   </script>
   ```

**Ongoing maintenance:**
- Review 404 logs monthly
- Redirect commonly requested missing URLs using Cloudflare Page Rules or `_redirects` file
- Update internal links if pages have moved

---

## 2. Legal Compliance Status

### Current Legal Text Assessment

**Location:** `src/layouts/BaseLayout.astro` (footer)

**Existing disclaimers:**

✅ **Copyright notice:**
> © 2026 PokeSurvivor fan guide — unofficial fan site, not affiliated with the PokéSurvivor developer, Nintendo, GAME FREAK or The Pokémon Company.

✅ **Non-official statement:**
> Unofficial guides for the free browser game PokéSurvivor. Play the official game at pokesurvivor.com.

✅ **Sprite attribution:**
> Sprites: SpriteCollab (CC BY-NC 4.0)

✅ **Pokémon trademark acknowledgment:**
> PokéSurvivor 粉絲攻略：非官方粉絲網站，與 PokéSurvivor 開發者、任天堂、GAME FREAK 及 The Pokémon Company 均無關係。

**Assessment:** The footer already contains strong legal disclaimers. The main gap was the absence of dedicated legal pages (Privacy Policy, Disclaimer).

---

### Legal Pages Created

✅ **Privacy Policy pages:**
- `src/pages/privacy.astro` (English)
- `src/pages/zh/privacy.astro` (Chinese)

**Key sections covered:**
- Data collection disclosure (analytics, server logs)
- No cookies statement
- No personal information collection
- Third-party services (Cloudflare)
- Children's privacy
- User rights
- Contact information

✅ **Disclaimer pages:**
- `src/pages/disclaimer.astro` (English)
- `src/pages/zh/disclaimer.astro` (Chinese)

**Key sections covered:**
- Unofficial fan project statement
- Pokémon copyright acknowledgment
- No affiliation with Nintendo, GAME FREAK, The Pokémon Company
- Content accuracy disclaimer
- Sprite attribution (CC BY-NC 4.0)
- External links disclaimer
- No warranty clause
- Fair use statement
- Contact for takedown requests

---

### Footer Enhancement

✅ **Updated:** `src/layouts/BaseLayout.astro`

**Changes made:**
- Added "Legal" section to footer with links to Privacy Policy and Disclaimer pages
- Links are locale-aware (English footer links to `/privacy/`, Chinese footer links to `/zh/privacy/`)
- Maintains existing copyright and trademark disclaimers

**Current footer structure:**
1. **PokeSurvivor Fan Guide** — brief description + link to official game
2. **Guides** — navigation links to all guide pages
3. **Languages** — language switcher links
4. **Legal** (NEW) — Privacy Policy + Disclaimer links
5. **Footer bottom** — copyright notice, sprite attribution

---

### Legal Compliance Checklist

| Requirement | Status | Notes |
|-------------|--------|-------|
| Copyright notice | ✅ Complete | Footer includes © 2026 statement |
| Non-official disclaimer | ✅ Complete | Clearly states "unofficial fan site" in footer and Disclaimer page |
| Pokémon trademark acknowledgment | ✅ Complete | Footer and Disclaimer acknowledge Nintendo, GAME FREAK, The Pokémon Company |
| Privacy Policy page | ✅ Complete | `/privacy/` (English) and `/zh/privacy/` (Chinese) |
| Data collection disclosure | ✅ Complete | Privacy Policy explains analytics (Cloudflare Web Analytics, no cookies) |
| Cookie notice | ✅ N/A | No cookies used; stated in Privacy Policy |
| Disclaimer page | ✅ Complete | `/disclaimer/` (English) and `/zh/disclaimer/` (Chinese) |
| Sprite attribution | ✅ Complete | Footer and Disclaimer credit SpriteCollab (CC BY-NC 4.0) |
| External links disclaimer | ✅ Complete | Disclaimer page addresses external links |
| Contact information | ✅ Complete | Privacy and Disclaimer pages include contact methods |
| Fair use statement | ✅ Complete | Disclaimer page includes fair use justification |
| Children's privacy | ✅ Complete | Privacy Policy addresses children's data |

---

## 3. Pre-Launch and Post-Launch Checklist

### Pre-Launch (Before Making Site Public)

- [ ] Verify Privacy Policy and Disclaimer pages are accessible at `/privacy/` and `/disclaimer/`
- [ ] Test footer links to legal pages in both English and Chinese versions
- [ ] Confirm Cloudflare Web Analytics beacon is installed and collecting data
- [ ] Set up Google Search Console property and verify domain ownership
- [ ] Submit sitemap to Google Search Console
- [ ] Run Lighthouse audit to confirm performance and accessibility scores
- [ ] Test 404 page by visiting a non-existent URL
- [ ] Review all pages for broken external links (official game, SpriteCollab, etc.)
- [ ] Confirm all pages have proper `<title>`, `<meta description>`, and Open Graph tags
- [ ] Validate structured data using [Google Rich Results Test](https://search.google.com/test/rich-results)

### Post-Launch (Within First Week)

- [ ] **Day 1:** Manually request indexing for top 5 pages in Google Search Console
- [ ] **Day 2-3:** Check Cloudflare Web Analytics for initial traffic and referrers
- [ ] **Day 3-7:** Monitor Google Search Console for indexing progress and coverage errors
- [ ] **Day 7:** Review Cloudflare Web Analytics for device breakdown (mobile vs. desktop)
- [ ] **Day 7:** Check for any 404 errors in Cloudflare logs or Google Search Console

### Ongoing Maintenance (Weekly/Monthly)

**Weekly:**
- Check Google Search Console for new coverage errors
- Review Cloudflare Web Analytics top pages and referrers
- Monitor Core Web Vitals (LCP, FID, CLS) in Search Console
- Review Sentry (if installed) for JavaScript errors

**Monthly:**
- Audit 404 errors and set up redirects for legitimate old URLs
- Update sitemap `lastmod` dates in `astro.config.mjs` when content changes
- Review search queries in Google Search Console and optimize underperforming pages
- Check for any DMCA or takedown notices (email, GitHub issues, etc.)

---

## 4. Post-Launch Monitoring Configuration

### Google Search Console - Recommended Settings

1. **Email notifications:**
   - Go to "Settings" → "Users and permissions"
   - Ensure email notifications are enabled for:
     - Critical site errors
     - Manual actions
     - Security issues

2. **URL parameters:**
   - If your site uses query parameters (e.g., `?ref=social`), configure them in "Settings" → "URL Parameters"
   - This prevents duplicate content issues

3. **International targeting:**
   - Your site uses subfolders (`/zh/`) for Chinese content, which is correct
   - No additional configuration needed in Search Console
   - `hreflang` tags are handled in `SEOHead.astro` (if `alternates` prop is used)

### Cloudflare Web Analytics - Dashboard Overview

**Key metrics to track:**

1. **Page views:** Total visits per day/week
2. **Unique visitors:** Estimate of distinct users (cookieless, so approximate)
3. **Top pages:** Which guides are most popular
4. **Referrers:** Where traffic is coming from (Google, Reddit, social media, etc.)
5. **Countries:** Geographic distribution of visitors
6. **Device types:** Mobile vs. desktop breakdown
7. **Browsers:** Ensure cross-browser compatibility (Chrome, Safari, Firefox)

**Setting up alerts (manual process):**

Cloudflare Web Analytics does not support automated alerts, so set up a weekly reminder to:
- Check for sudden traffic drops (potential indexing issue or site downtime)
- Monitor top referrers for unexpected sources (potential spam or bot traffic)
- Review device breakdown (if mobile traffic is high, prioritize mobile UX)

### Sentry (If Installed) - Alert Configuration

1. **Create alert rules:**
   - Go to "Alerts" in Sentry project
   - Set up rule: "When an issue is first seen, send notification to email"
   - Set threshold: Alert if > 10 occurrences of the same error in 1 hour

2. **Ignore known errors:**
   - Filter out browser extension errors (e.g., ad blockers)
   - Ignore errors from bots (check user agent)

3. **Tag releases:**
   - Set `COMMIT_SHA` environment variable in Cloudflare Pages build settings
   - This helps track which deploy introduced an error

---

## 5. Additional Recommendations

### Schema.org Structured Data

**Current status:** `SEOHead.astro` already includes:
- Organization schema
- WebSite schema
- BreadcrumbList schema (if `breadcrumbs` prop is passed)

**Recommendation:** Add `FAQPage` schema to guide pages with FAQ sections.

**Implementation example:**

In pages with FAQ sections (e.g., `how-to-play.astro`), pass `jsonLd` prop:

```astro
<BaseLayout
  title="How to Play PokeSurvivor"
  description="..."
  jsonLd={[
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How do I start playing PokeSurvivor?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Visit pokesurvivor.com and click Play. No installation required.',
          },
        },
        // Add more Q&A pairs
      ],
    },
  ]}
>
```

This can improve visibility in Google's "People also ask" feature.

---

### Social Media Sharing

**Current status:** Open Graph and Twitter Card tags are implemented in `SEOHead.astro`.

**Test your social cards:**
- Facebook: [Sharing Debugger](https://developers.facebook.com/tools/debug/)
- Twitter: [Card Validator](https://cards-dev.twitter.com/validator)
- LinkedIn: [Post Inspector](https://www.linkedin.com/post-inspector/)

**Recommendation:**
- Create custom Open Graph images for top guides (tier list, best Pokémon, etc.)
- Store images in `public/og-images/` and reference them in page frontmatter

---

### Accessibility Audit

**Current status:** Site uses semantic HTML, ARIA labels, and skip links.

**Post-launch accessibility testing:**

1. **Automated testing:**
   - Run Lighthouse accessibility audit (target: 100 score)
   - Use [WAVE browser extension](https://wave.webaim.org/extension/)

2. **Manual testing:**
   - Navigate site using keyboard only (Tab, Enter, Escape)
   - Test with screen reader (NVDA on Windows, VoiceOver on macOS)
   - Verify color contrast meets WCAG AA standards (4.5:1 for body text)

3. **Fix common issues:**
   - Ensure all images have `alt` attributes
   - Check that interactive elements (links, buttons) have visible focus indicators
   - Verify heading hierarchy (h1 → h2 → h3, no skipped levels)

---

## 6. Contact and Incident Response

### Handling DMCA or Takedown Requests

**If you receive a takedown request:**

1. **Assess legitimacy:**
   - Is the request from a verified rights holder (Nintendo, The Pokémon Company)?
   - Does it cite specific infringing content?

2. **Respond promptly:**
   - Acknowledge receipt within 24 hours
   - Remove the disputed content immediately (err on the side of caution)
   - Confirm removal in writing

3. **Update Disclaimer:**
   - If the issue was due to unclear attribution, update Disclaimer page
   - Add specific statement about removed content (e.g., "Certain images removed at request of rights holder")

4. **Legal consultation:**
   - For formal DMCA notices, consult a lawyer before responding
   - Document all communications

**Preventive measures:**
- Regularly review sprite attribution and ensure SpriteCollab license terms are followed
- Do not host official game assets (logos, screenshots from official site)
- Link to official resources instead of copying them

---

## 7. Summary

### What's Been Completed

✅ Legal pages created (Privacy Policy, Disclaimer) in English and Chinese  
✅ Footer updated with links to legal pages  
✅ Comprehensive monitoring and compliance documentation  

### What Needs to Be Done Post-Launch

🔲 Install Cloudflare Web Analytics beacon in `SEOHead.astro`  
🔲 Set up Google Search Console property and verify ownership  
🔲 Submit sitemap to Google Search Console  
🔲 (Optional) Set up Sentry for error monitoring  
🔲 Test legal pages and footer links in both languages  
🔲 Run Lighthouse audit and address any issues  
🔲 Set up weekly monitoring routine (Search Console, Web Analytics)  

### Key Takeaways

1. **Privacy compliance:** The site is now GDPR-friendly with no cookies and clear data collection disclosure.
2. **Legal protection:** Comprehensive disclaimers protect against trademark and copyright claims.
3. **Monitoring:** Once analytics tools are configured, you'll have full visibility into site performance, errors, and search rankings.
4. **Accessibility:** The site already follows best practices; post-launch testing will catch any remaining issues.

---

**Questions or issues?** Refer to this document during launch and adjust monitoring frequency based on traffic volume.
