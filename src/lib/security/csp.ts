/**
 * Content Security Policy (CSP) helpers.
 *
 * Edge-runtime compatible. Used by `src/middleware.ts` to attach a per-request
 * nonce to inline scripts and to whitelist external origins we actually call.
 *
 * Development-only compatibility: React/Next.js development diagnostics use
 * eval for enhanced error overlays and Fast Refresh. Keep that permission out
 * of production CSP.
 */

/** Origins we make `connect-src` (fetch/XHR/WebSocket) calls to. */
export const CSP_CONNECT_SRC: readonly string[] = [
  "'self'",
  'https://api.anthropic.com',
  'https://api.stripe.com',
  'https://*.supabase.co',
  'https://*.elevenlabs.io',
  'https://graph.facebook.com',
  'https://api.upstash.io',
  'https://www.googleapis.com',
];

/** Origins we load <img> from (Supabase storage, Google avatars, data URIs). */
export const CSP_IMG_SRC: readonly string[] = [
  "'self'",
  'data:',
  'https://*.supabase.co',
  'https://lh3.googleusercontent.com',
];

/** Origins we load fonts from (self + data: for inlined font payloads). */
export const CSP_FONT_SRC: readonly string[] = ["'self'", 'data:'];

/** Origins allowed inside <iframe> (Stripe Checkout, Stripe Elements, ApplePay). */
export const CSP_FRAME_SRC: readonly string[] = ["'self'", 'https://js.stripe.com'];

/** Origins allowed for <audio>/<video>/blob URLs (TTS playback, Supabase media). */
export const CSP_MEDIA_SRC: readonly string[] = ["'self'", 'blob:', 'https://*.supabase.co'];

/** Origins allowed for <style>. Next.js streaming styles require inline styles. */
export const CSP_STYLE_SRC: readonly string[] = ["'self'", "'unsafe-inline'"];

/**
 * Generate a cryptographically random nonce as a URL-safe base64 string.
 * Uses Web Crypto, available in both Node and the Edge Runtime.
 */
export function generateNonce(): string {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);

  let binary = '';
  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }

  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

/**
 * Build the full Content-Security-Policy header value for a given nonce.
 * The development-only eval permission is explicit and must never be enabled
 * for production responses.
 */
export function buildContentSecurityPolicy(nonce: string, isDevelopment = false): string {
  const scriptSources = ["'self'", `'nonce-${nonce}'`];
  if (isDevelopment) {
    // Next.js/React development overlays and Fast Refresh require eval.
    scriptSources.push("'unsafe-eval'");
  }

  const directives: ReadonlyArray<readonly [string, readonly string[]]> = [
    ['default-src', ["'self'"]],
    ['script-src', scriptSources],
    ['style-src', CSP_STYLE_SRC],
    ['img-src', CSP_IMG_SRC],
    ['font-src', CSP_FONT_SRC],
    ['connect-src', CSP_CONNECT_SRC],
    ['frame-src', CSP_FRAME_SRC],
    ['media-src', CSP_MEDIA_SRC],
    ['object-src', ["'none'"]],
    ['base-uri', ["'self'"]],
    ['form-action', ["'self'"]],
    ['frame-ancestors', ["'none'"]],
  ];

  const directiveStrings = directives.map(([name, sources]) => `${name} ${sources.join(' ')}`);
  directiveStrings.push('upgrade-insecure-requests');

  return directiveStrings.join('; ');
}

/**
 * Path prefixes that should NOT receive a CSP header.
 * Webhook endpoints and /api/health do not render HTML.
 */
export const CSP_BYPASS_PATH_PREFIXES: readonly string[] = [
  '/api/webhook/stripe',
  '/api/webhook/whatsapp',
  '/api/health',
];

/** Whether the given pathname should bypass CSP injection. */
export function shouldBypassCsp(pathname: string): boolean {
  return CSP_BYPASS_PATH_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}
