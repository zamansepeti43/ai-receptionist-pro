import Link from 'next/link';
import { PRODUCT_IDENTITY } from '@/config/product-identity';

const FOOTER_COLUMNS = [
  { title: 'Product', links: [{ href: '/#features', label: 'Features' }, { href: '/pricing', label: 'Pricing' }, { href: '/verticals', label: 'Sectors' }] },
  { title: 'Resources', links: [{ href: '/help', label: 'Help center' }, { href: '/docs', label: 'Documentation' }, { href: '/changelog', label: 'Changelog' }] },
  { title: 'Company', links: [{ href: '/about', label: 'About' }, { href: '/contact', label: 'Contact' }, { href: '/status', label: 'Service status' }] },
  { title: 'Legal', links: [{ href: '/legal/privacy', label: 'Privacy' }, { href: '/legal/terms', label: 'Terms' }, { href: '/legal/security', label: 'Security' }] },
] as const;

export function SiteFooter() {
  return (
    <footer className="site-footer" role="contentinfo">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col stack stack-3">
            <Link href="/" className="site-logo">{PRODUCT_IDENTITY.name}</Link>
            <p className="muted" style={{ fontSize: 'var(--text-sm)', maxWidth: '36ch' }}>{PRODUCT_IDENTITY.tagline}. Connect your own providers and configure the experience for each business.</p>
            <div className="row" style={{ gap: 'var(--space-2)', marginTop: 'var(--space-3)', flexWrap: 'wrap' }} data-testid="trust-badges">
              <span className="badge badge-success">White label</span>
              <span className="badge badge-neutral">Multi-sector</span>
              <span className="badge badge-neutral">MIT upstream</span>
            </div>
          </div>
          {FOOTER_COLUMNS.map((column) => (
            <div className="footer-col" key={column.title}>
              <h4>{column.title}</h4>
              {column.links.map((link) => <Link key={link.href} href={link.href}>{link.label}</Link>)}
            </div>
          ))}
        </div>
        <hr className="divider" />
        <div className="row-between" style={{ alignItems: 'center', flexWrap: 'wrap' }}>
          <p className="muted" style={{ fontSize: 'var(--text-xs)' }}>© {new Date().getFullYear()} {PRODUCT_IDENTITY.name}. Upstream MIT attribution retained.</p>
          <Link href="/status" className="muted" style={{ fontSize: 'var(--text-xs)' }}>Service status</Link>
        </div>
      </div>
    </footer>
  );
}
