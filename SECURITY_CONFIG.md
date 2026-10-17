# Security Configuration Guide

This document describes the security hardening measures implemented in the PokeSurvivor fan guide project.

---

## 1. HTTP Security Headers

Security headers are automatically applied to all responses via Astro middleware (`src/middleware/security.ts`).

### Configured Headers

| Header | Value | Purpose |
|--------|-------|---------|
| `X-Content-Type-Options` | `nosniff` | Prevents browsers from MIME-sniffing responses away from the declared content type |
| `X-Frame-Options` | `SAMEORIGIN` | Prevents clickjacking by disallowing framing from external origins |
| `X-XSS-Protection` | `1; mode=block` | Legacy XSS filter (modern browsers rely on CSP) |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Sends full URL when same-origin, origin only when cross-origin HTTPS, nothing when downgrade |
| `Permissions-Policy` | `geolocation=(), microphone=(), camera=(), payment=(), usb=(), magnetometer=(), gyroscope=()` | Disables powerful browser features not needed by this site |

---

## 2. Content Security Policy (CSP)

A strict Content Security Policy is configured to control resource loading and mitigate XSS attacks.

### Policy Directives

```
default-src 'self';
script-src 'self' 'unsafe-inline' 'unsafe-eval';
style-src 'self' 'unsafe-inline';
img-src 'self' data: https://raw.githubusercontent.com;
frame-src https://pokesurvivor.com;
connect-src 'self';
font-src 'self';
object-src 'none';
base-uri 'self';
form-action 'self';
frame-ancestors 'self';
```

### Rationale

- **`script-src 'unsafe-inline' 'unsafe-eval'`**: Required for:
  - Astro component inline scripts (e.g., `GameEmbed.astro`, `LanguageSwitcher.astro`)
  - JSON-LD structured data (`application/ld+json` with `set:html`)
  - Future consideration: migrate to nonces or hashes for tighter security

- **`style-src 'unsafe-inline'`**: Required for Astro scoped component styles

- **`img-src data: https://raw.githubusercontent.com`**: Allows:
  - Data URIs for inline images
  - Pokémon sprites from the SpriteCollab GitHub repository

- **`frame-src https://pokesurvivor.com`**: Allows embedding the official PokéSurvivor game iframe

### Tightening CSP (Future Roadmap)

To eliminate `'unsafe-inline'` and `'unsafe-eval'`:

1. **Use nonces**: Generate a random nonce per request and add it to inline scripts/styles
2. **Extract inline scripts**: Move component scripts to external `.js` files
3. **Replace `set:html` with direct JSON**: Pass structured data via `<script type="application/ld+json">{JSON.stringify(...)}</script>` without `set:html`
4. **Use hashes**: Calculate SHA256 hashes of inline scripts and add them to CSP

---

## 3. HTTPS and Transport Security

### Cloudflare Configuration (Required at Deployment)

When deploying to Cloudflare Workers/Pages, ensure the following settings are enabled in the Cloudflare dashboard:

#### SSL/TLS Tab
- **Always Use HTTPS**: ✅ Enabled
  - Automatically redirects HTTP requests to HTTPS
  - Path: `SSL/TLS` → `Edge Certificates` → `Always Use HTTPS`

- **Minimum TLS Version**: TLS 1.2 or higher
  - Path: `SSL/TLS` → `Edge Certificates` → `Minimum TLS Version`

- **Automatic HTTPS Rewrites**: ✅ Enabled
  - Rewrites HTTP URLs to HTTPS in HTML content
  - Path: `SSL/TLS` → `Edge Certificates` → `Automatic HTTPS Rewrites`

#### HTTP Strict Transport Security (HSTS)

HSTS should be enabled via Cloudflare or added to the middleware after verifying that all resources are available over HTTPS.

**Recommended HSTS Header** (add after HTTPS verification):
```
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
```

**To enable in Cloudflare**:
- Path: `SSL/TLS` → `Edge Certificates` → `HTTP Strict Transport Security (HSTS)`
- Max Age: 12 months (31536000 seconds)
- Include subdomains: ✅ Yes
- Preload: ✅ Yes (optional, requires HTTPS to be stable for 18 weeks before submitting to hstspreload.org)

**To add via middleware** (alternative):
```typescript
res.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
```

---

## 4. Secrets and Sensitive Information

### Current Status

✅ **No hardcoded secrets detected** in the codebase.

### `.gitignore` Coverage

The following entries prevent accidental secret commits:

```
.env
.env.production
```

### Best Practices

1. **Environment Variables**: Store all secrets (API keys, tokens) in environment variables
2. **Never commit**: `.env` files, private keys, API tokens, passwords
3. **Use Cloudflare Secrets**: For Workers deployments, use `wrangler secret put SECRET_NAME`
4. **Rotate secrets**: If a secret is accidentally committed, rotate it immediately
5. **Audit git history**: Use `git log --all --full-history -- .env` to check for historical leaks

### Scanning Commands

```bash
# Check for common secret patterns in source files
grep -rn "API_KEY\|SECRET\|PASSWORD\|TOKEN\|PRIVATE_KEY" src/

# Check .gitignore coverage
cat .gitignore

# Audit git history for .env files
git log --all --full-history -- .env .env.production
```

---

## 5. Cloudflare Workers Deployment

### Workers-Specific Security

**Note**: Astro middleware does NOT work with Cloudflare Workers static asset serving. Security headers must be added via Cloudflare Workers Functions or Transform Rules.

### Option A: Cloudflare Workers Functions (Recommended)

Create `functions/_middleware.ts` with the security headers script (see `docs/cloudflare-workers-security.js` for a reference implementation).

### Option B: Cloudflare Transform Rules (Dashboard Configuration)

Configure HTTP Response Header Modification Rules in the Cloudflare dashboard:

1. Navigate to `Rules` → `Transform Rules` → `Modify Response Header`
2. Create a new rule for `poke-survivors.org/*`
3. Add the following headers:

| Header Name | Value |
|-------------|-------|
| `X-Content-Type-Options` | `nosniff` |
| `X-Frame-Options` | `SAMEORIGIN` |
| `X-XSS-Protection` | `1; mode=block` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `Permissions-Policy` | `geolocation=(), microphone=(), camera=(), payment=(), usb=(), magnetometer=(), gyroscope=()` |
| `Content-Security-Policy` | `default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://raw.githubusercontent.com; frame-src https://pokesurvivor.com; connect-src 'self'; font-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'self';` |

### Verification Steps

After deployment, verify headers using:

```bash
curl -I https://poke-survivors.org
```

Expected output should include:
```
HTTP/2 200
x-content-type-options: nosniff
x-frame-options: SAMEORIGIN
x-xss-protection: 1; mode=block
referrer-policy: strict-origin-when-cross-origin
permissions-policy: geolocation=(), microphone=(), camera=(), payment=(), usb=(), magnetometer=(), gyroscope=()
content-security-policy: default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; ...
```

### Cloudflare Page Rules (Optional)

For additional security, configure Page Rules in the Cloudflare dashboard:

- **Path**: `Security` → `Page Rules`
- **Rule**: `poke-survivors.org/*`
- **Settings**:
  - Security Level: High
  - Browser Integrity Check: On
  - Disable Apps: On (if not using Cloudflare Apps)

---

## 6. Deployment Verification

### Local Testing

Before deploying to Cloudflare, test the build locally:

```bash
# Build the project
npm run build

# Preview the built site locally
npm run preview

# Test security headers (if you have a local server running)
curl -I http://localhost:4321 | grep -E "(X-Content|X-Frame|CSP)"
```

### Deploying to Cloudflare Pages

Deploy the built site to Cloudflare Pages:

```bash
# Deploy using Wrangler CLI
npx wrangler pages deploy dist

# Or if you have Wrangler installed globally
wrangler pages deploy dist
```

The deployment will:
1. Upload the `dist/` directory to Cloudflare Pages
2. Apply the Workers Functions middleware from `functions/_middleware.ts`
3. Serve static assets with security headers automatically

### Post-Deployment Verification

After deployment, verify security headers are being applied:

```bash
# Check all security headers
curl -I https://poke-survivors.org

# Verify specific security headers
curl -I https://poke-survivors.org | grep -E "(X-Content-Type-Options|X-Frame-Options|Content-Security-Policy)"

# Test HTTPS redirect (should return 301 or 308)
curl -I http://poke-survivors.org
```

Expected response headers:
```
HTTP/2 200
x-content-type-options: nosniff
x-frame-options: SAMEORIGIN
x-xss-protection: 1; mode=block
referrer-policy: strict-origin-when-cross-origin
permissions-policy: geolocation=(), microphone=(), camera=(), payment=(), usb=(), magnetometer=(), gyroscope=()
content-security-policy: default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://static.cloudflareinsights.com; ...
```

### Troubleshooting

If security headers are not appearing:

1. **Check Workers Functions deployment**:
   ```bash
   # Verify functions directory structure
   ls -la functions/
   # Should show _middleware.ts
   ```

2. **Verify Wrangler configuration**:
   ```bash
   cat wrangler.toml
   # Should have [assets] with directory = "./dist"
   ```

3. **Check deployment logs**:
   ```bash
   wrangler pages deployment list
   wrangler pages deployment tail
   ```

4. **Browser DevTools check**:
   - Open https://poke-survivors.org in browser
   - Open DevTools (F12) → Network tab
   - Refresh page
   - Click on document request
   - Check "Response Headers" section

## 7. Pre-Launch Checklist

Before launching to production, verify:

- [ ] **HTTPS enabled**: Cloudflare "Always Use HTTPS" is turned on
- [ ] **HSTS configured**: Either via Cloudflare dashboard or middleware
- [ ] **Security headers present**: Use `curl -I` to verify all headers
- [ ] **CSP working**: Test site functionality; no console errors related to blocked resources
- [ ] **Iframe embed loads**: Verify `https://pokesurvivor.com` iframe works (CSP `frame-src`)
- [ ] **External sprites load**: Verify Pokémon sprites from GitHub load (CSP `img-src`)
- [ ] **No secrets in repo**: Run `git log --all --full-history -- .env` to confirm
- [ ] **DNS configured**: Ensure `poke-survivors.org` points to Cloudflare
- [ ] **SSL certificate valid**: Check certificate in browser (should be Cloudflare Universal SSL)
- [ ] **Workers Functions active**: Verify `functions/_middleware.ts` is deployed and running

---

## 8. Ongoing Security Maintenance

### Regular Audits

- **Monthly**: Review Cloudflare analytics for suspicious traffic patterns
- **Quarterly**: Re-run secret scanning commands
- **After major updates**: Re-verify CSP compliance and security headers

### Dependency Updates

```bash
# Check for vulnerabilities
npm audit

# Update dependencies
npm update

# For critical security patches
npm audit fix
```

### Monitoring

- **Cloudflare Analytics**: Monitor for DDoS attacks and unusual traffic
- **Browser Console**: Check for CSP violations during development
- **User Reports**: Encourage users to report security issues via GitHub Issues

---

## 9. Contact

For security concerns or vulnerability reports, please:

1. **Do not open a public GitHub issue**
2. Contact the maintainer directly (see README.md for contact information)
3. Provide details: affected URLs, reproduction steps, impact assessment

---

## References

- [OWASP Secure Headers Project](https://owasp.org/www-project-secure-headers/)
- [MDN Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
- [Cloudflare SSL/TLS Documentation](https://developers.cloudflare.com/ssl/)
- [Astro Middleware Documentation](https://docs.astro.build/en/guides/middleware/)
