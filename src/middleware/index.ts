/**
 * Astro middleware entry point.
 *
 * Applies security headers to all responses via the security middleware.
 */

export { onRequest } from './security';
