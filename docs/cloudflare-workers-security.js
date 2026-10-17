# Cloudflare Workers Security Headers Example

/**
 * Example Cloudflare Worker script that adds security headers to all responses.
 *
 * This script can be used as a standalone Worker or Workers Functions file
 * if additional header control is needed beyond the Astro middleware.
 *
 * For Cloudflare Pages deployments with Functions:
 * - Create `functions/_middleware.ts` with this content
 * - Deploy via `wrangler pages deploy`
 *
 * For standalone Workers deployments:
 * - Use this as `src/index.ts` in a Worker project
 * - Deploy via `wrangler deploy`
 */

export async function onRequest(context) {
  const response = await context.next();

  // Clone response to make headers mutable
  const newResponse = new Response(response.body, response);

  // Security headers
  newResponse.headers.set('X-Content-Type-Options', 'nosniff');
  newResponse.headers.set('X-Frame-Options', 'SAMEORIGIN');
  newResponse.headers.set('X-XSS-Protection', '1; mode=block');
  newResponse.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  newResponse.headers.set(
    'Permissions-Policy',
    'geolocation=(), microphone=(), camera=(), payment=(), usb=(), magnetometer=(), gyroscope=()'
  );

  // Content Security Policy
  newResponse.headers.set(
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

  // HTTP Strict Transport Security (uncomment after verifying HTTPS)
  // newResponse.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');

  return newResponse;
}
