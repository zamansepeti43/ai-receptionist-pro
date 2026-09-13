import path from 'node:path';

import type { NextConfig } from 'next';

const staticSecurityHeaders = [
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains; preload',
  },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
];

const projectRoot = path.resolve(process.cwd());

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  output: 'standalone',
  outputFileTracingRoot: projectRoot,
  eslint: {
    ignoreDuringBuilds: false,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: '*.elevenlabs.io',
      },
    ],
  },
  experimental: {
    optimizePackageImports: ['@anthropic-ai/sdk', 'stripe', '@supabase/supabase-js'],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: staticSecurityHeaders,
      },
    ];
  },
};

export default nextConfig;
