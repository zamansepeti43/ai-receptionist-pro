import { NextResponse, type NextRequest } from 'next/server';

import { buildContentSecurityPolicy, generateNonce, shouldBypassCsp } from '@/lib/security/csp';

/**
 * Edge middleware: per-request CSP nonce + cross-origin isolation headers.
 *
 * The nonce is forwarded on the request so server components can read it via
 * headers(). The same nonce is embedded into the Content-Security-Policy header.
 * Development-only eval permission is added by the CSP builder for Next.js
 * diagnostics and Fast Refresh; production policy remains strict.
 */

function applyBaseSecurityHeaders(headers: Headers): void {
  headers.set('X-DNS-Prefetch-Control', 'off');
  headers.set('Cross-Origin-Embedder-Policy', 'credentialless');
  headers.set('Cross-Origin-Opener-Policy', 'same-origin');
  headers.set('Cross-Origin-Resource-Policy', 'same-origin');
  headers.set('X-Permitted-Cross-Domain-Policies', 'none');
}

export function middleware(request: NextRequest): NextResponse {
  const { pathname } = request.nextUrl;

  if (shouldBypassCsp(pathname)) {
    const response = NextResponse.next();
    applyBaseSecurityHeaders(response.headers);
    return response;
  }

  const nonce = generateNonce();
  const csp = buildContentSecurityPolicy(nonce, process.env.NODE_ENV === 'development');

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-nonce', nonce);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  applyBaseSecurityHeaders(response.headers);
  response.headers.set('Content-Security-Policy', csp);
  response.headers.set('x-nonce', nonce);

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif|ico|css|js|woff|woff2|ttf|otf)$).*)',
  ],
};
