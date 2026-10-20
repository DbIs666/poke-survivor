/**
 * Cloudflare Workers Functions Middleware
 * Applies security headers to all responses
 *
 * This middleware runs on Cloudflare Workers edge network and adds
 * security headers to every response served by the application.
 */

export async function onRequest(context: {
  request: Request;
  next: () => Promise<Response>;
}) {
  const url = new URL(context.request.url);

  // Redirect www to non-www
  if (url.hostname === 'www.poke-survivors.org') {
    url.hostname = 'poke-survivors.org';
    return Response.redirect(url.toString(), 301);
  }

  // Redirect HTTP to HTTPS
  if (url.protocol === 'http:') {
    url.protocol = 'https:';
    return Response.redirect(url.toString(), 301);
  }

  // Process the request and get the response
  const response = await context.next();

  // Clone the response to modify headers (responses are immutable)
  const modifiedResponse = new Response(response.body, response);

  // Apply security headers
  modifiedResponse.headers.set('X-Content-Type-Options', 'nosniff');
  modifiedResponse.headers.set('X-Frame-Options', 'SAMEORIGIN');
  modifiedResponse.headers.set('X-XSS-Protection', '1; mode=block');
  modifiedResponse.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  modifiedResponse.headers.set(
    'Permissions-Policy',
    'geolocation=(), microphone=(), camera=(), payment=(), usb=(), magnetometer=(), gyroscope=()'
  );

  // Content Security Policy
  const csp = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://static.cloudflareinsights.com https://www.googletagmanager.com https://www.google-analytics.com",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https://raw.githubusercontent.com https://www.google-analytics.com https://www.googletagmanager.com",
    "frame-src https://pokesurvivor.com",
    "connect-src 'self' https://cloudflareinsights.com https://www.google-analytics.com https://analytics.google.com https://region1.google-analytics.com",
    "font-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'self'"
  ].join('; ');

  modifiedResponse.headers.set('Content-Security-Policy', csp);

  return modifiedResponse;
}
