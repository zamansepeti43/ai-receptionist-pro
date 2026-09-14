import Link from 'next/link';
import { PRODUCT_IDENTITY } from '@/config/product-identity';
import { LanguageSelector } from './LanguageSelector';

const NAV_LINKS = [
  { href: '/#features', label: 'Features' },
  { href: '/verticali', label: 'Sectors' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/help', label: 'Help' },
] as const;

export function SiteHeader() {
  return (
    <header className="site-header" role="banner">
      <div className="container site-header-inner">
        <Link href="/" className="site-logo" aria-label={`${PRODUCT_IDENTITY.name} - homepage`}>
          {PRODUCT_IDENTITY.name}
        </Link>
        <nav aria-label="Main navigation">
          <ul className="site-nav">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="row site-header-actions" style={{ gap: 'var(--space-3)' }}>
          <LanguageSelector />
          <Link href="/pricing" className="btn btn-ghost btn-sm site-header-mobile-link">
            Menu
          </Link>
          <Link href="/login" className="btn btn-ghost btn-sm">
            Sign in
          </Link>
          <Link href="/register" className="btn btn-primary btn-sm">
            Get started
          </Link>
        </div>
      </div>
    </header>
  );
}
