'use client';

import Link from 'next/link';
import { PRODUCT_IDENTITY } from '@/config/product-identity';
import { LanguageSelector } from './LanguageSelector';
import { useMarketingLocale } from './MarketingLocaleProvider';

export function SiteHeader() {
  const { t } = useMarketingLocale();

  const navLinks = [
    { href: '/#features', label: t.navFeatures },
    { href: '/verticali', label: t.navSectors },
    { href: '/pricing', label: t.navPricing },
    { href: '/help', label: t.navHelp },
  ] as const;

  return (
    <header className="site-header" role="banner">
      <div className="container site-header-inner">
        <Link href="/" className="site-logo" aria-label="${PRODUCT_IDENTITY.name} - homepage">
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
            {t.menu}
          </Link>
          <Link href="/login" className="btn btn-ghost btn-sm">
            {t.signIn}
          </Link>
          <Link href="/register" className="btn btn-primary btn-sm">
            {t.getStarted}
          </Link>
        </div>
      </div>
    </header>
  );
}
