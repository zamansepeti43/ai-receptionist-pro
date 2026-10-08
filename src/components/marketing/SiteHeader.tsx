'use client';

import Link from 'next/link';

import { PRODUCT_IDENTITY } from '@/config/product-identity';
import { LanguageSelector, useMarketingCopy } from './LanguageSelector';

export function SiteHeader() {
  const { copy } = useMarketingCopy();

  const navLinks = [
    { href: '/#features', label: copy.navFeatures },
    { href: '/verticali', label: copy.navSectors },
    { href: '/pricing', label: copy.navPricing },
    { href: '/help', label: copy.navHelp },
  ] as const;

  return (
    <header className="site-header" role="banner">
      <div className="container site-header-inner">
        <Link href="/" className="site-logo" aria-label={`${PRODUCT_IDENTITY.name} - homepage`}>
          {PRODUCT_IDENTITY.name}
        </Link>
        <nav aria-label="Main navigation">
          <ul className="site-nav">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="row site-header-actions" style={{ gap: 'var(--space-3)' }}>
          <LanguageSelector />
          <Link href="/pricing" className="btn btn-ghost btn-sm site-header-mobile-link">
            {copy.menu}
          </Link>
          <Link href="/login" className="btn btn-ghost btn-sm">
            {copy.signIn}
          </Link>
          <Link href="/register" className="btn btn-primary btn-sm">
            {copy.getStarted}
          </Link>
        </div>
      </div>
    </header>
  );
}
