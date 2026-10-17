/**
 * Security headers middleware for Astro.
 *
 * This middleware adds security headers to all responses. It is automatically
 * applied during the build for Cloudflare Workers deployments.
 *
 * Headers configured:
 * - X-Content-Type-Options: prevents MIME sniffing
 * - X-Frame-Options: protects against clickjacking
 * - X-XSS-Protection: legacy XSS filter (modern browsers use CSP)
 * - Referrer-Policy: controls referrer information
 * - Permissions-Policy: restricts browser features
 * - Content-Security-Policy: controls resource loading (strict policy)
 */

import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware((context, next) => {
  const response = next();

  response.then((res) => {
    // Prevent MIME type sniffing
    res.headers.set('X-Content-Type-Options', 'nosniff');

    // Clickjacking protection: allow framing from same origin only
    res.headers.set('X-Frame-Options', 'SAMEORIGIN');

    // Legacy XSS protection (modern browsers rely on CSP)
    res.headers.set('X-XSS-Protection', '1; mode=block');

    // Control referrer information: send origin when cross-origin
    res.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

    // Restrict powerful browser features
    res.headers.set(
      'Permissions-Policy',
      'geolocation=(), microphone=(), camera=(), payment=(), usb=(), magnetometer=(), gyroscope=()'
    );

    // Content Security Policy: strict policy for static site
    // - default-src 'self': only allow resources from same origin
    // - script-src: allow inline scripts (Astro components), eval for JSON-LD, and same-origin
    // - style-src: allow inline styles (Astro scoped styles) and same-origin
    // - img-src: allow same origin, data URIs (for inline images), and external sprite CDN
    // - frame-src: allow pokesurvivor.com iframe embed
    // - connect-src: allow same origin for any API calls
    // - font-src 'self': only same-origin fonts
    // - object-src 'none': no plugins
    // - base-uri 'self': prevent base tag hijacking
    // - form-action 'self': forms only submit to same origin
    // - frame-ancestors 'self': only allow framing by same origin
    res.headers.set(
      'Content-Security-Policy',
      [
        "default-src 'self'",
        "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
        "style-src 'self' 'unsafe-inline'",
        "img-src 'self' data: https://raw.githubusercontent.com",
        "frame-src https://pokesurvivor.com",
        "connect-src 'self'",
        "font-src 'self'",
        "object-src 'none'",
        "base-uri 'self'",
        "form-action 'self'",
        "frame-ancestors 'self'",
      ].join('; ')
    );
  });

  return response;
});
