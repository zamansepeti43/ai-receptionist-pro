import type { Metadata, Viewport } from 'next';
import { Fraunces, Inter } from 'next/font/google';
import { headers } from 'next/headers';
import type { ReactNode } from 'react';

import '@/styles/globals.css';
import { PRODUCT_IDENTITY } from '@/config/product-identity';

const inter = Inter({ subsets: ['latin', 'latin-ext'], display: 'swap', preload: true, variable: '--font-inter' });
const fraunces = Fraunces({ subsets: ['latin', 'latin-ext'], display: 'swap', preload: true, variable: '--font-fraunces', axes: ['opsz', 'SOFT'] });
const SITE_URL = process.env['NEXT_PUBLIC_SITE_URL'] ?? 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: PRODUCT_IDENTITY.name, template: `%s · ${PRODUCT_IDENTITY.name}` },
  description: PRODUCT_IDENTITY.tagline,
  applicationName: PRODUCT_IDENTITY.name,
  creator: PRODUCT_IDENTITY.name,
  publisher: PRODUCT_IDENTITY.name,
  generator: 'Next.js',
  keywords: ['AI receptionist', 'WhatsApp booking', 'appointment automation', 'white label SaaS', 'customer service automation'],
  formatDetection: { telephone: false, email: false, address: false },
  openGraph: { type: 'website', locale: 'en_US', url: SITE_URL, siteName: PRODUCT_IDENTITY.name },
  alternates: { canonical: '/', languages: { 'en-US': SITE_URL, 'tr-TR': `${SITE_URL}?lang=tr`, 'x-default': SITE_URL } },
  appleWebApp: { capable: true, title: PRODUCT_IDENTITY.name, statusBarStyle: 'default' },
  other: { 'msapplication-TileColor': '#0d766e' },
};

export const viewport: Viewport = { themeColor: '#0d766e', colorScheme: 'light', width: 'device-width', initialScale: 1, maximumScale: 5 };

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: PRODUCT_IDENTITY.name,
  description: PRODUCT_IDENTITY.tagline,
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  url: SITE_URL,
};

export default async function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  const headerList = await headers();
  const nonce = headerList.get('x-nonce') ?? undefined;
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
      <head>
        <link rel="preconnect" href="https://api.anthropic.com" />
        <link rel="dns-prefetch" href="https://api.stripe.com" />
        <link rel="dns-prefetch" href="https://api.elevenlabs.io" />
        <link rel="dns-prefetch" href="https://graph.facebook.com" />
        <meta name="author" content={PRODUCT_IDENTITY.name} />
        <meta name="application-name" content={PRODUCT_IDENTITY.name} />
        <meta name="apple-mobile-web-app-title" content={PRODUCT_IDENTITY.name} />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="format-detection" content="telephone=no" />
        <script type="application/ld+json" nonce={nonce} dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      </head>
      <body data-csp-nonce={nonce}>
        <a href="#main" className="skip-link">Skip to content</a>
        {children}
      </body>
    </html>
  );
}
