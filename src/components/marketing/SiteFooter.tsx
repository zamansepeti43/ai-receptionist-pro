import Link from 'next/link';
import { PRODUCT_IDENTITY } from '@/config/product-identity';
import { useMarketingLocale } from './MarketingLocaleProvider';

const CURRENT_YEAR = 2026;

export function SiteFooter() {
  const { t, language } = useMarketingLocale();
  const isTurkish = language === 'tr';
  const columns = [
    { title: t.product, links: [{ href: '/#features', label: t.navFeatures }, { href: '/pricing', label: t.navPricing }, { href: '/verticali', label: t.navSectors }] },
    { title: t.resources, links: [{ href: '/help', label: t.helpCenter }, { href: '/docs', label: t.documentation }, { href: '/changelog', label: t.changelog }] },
    { title: t.company, links: [{ href: '/about', label: t.about }, { href: '/contact', label: t.contact }, { href: '/status', label: t.status }] },
    { title: t.legal, links: [{ href: '/legal/privacy', label: t.privacy }, { href: '/legal/terms', label: t.terms }, { href: '/legal/security', label: t.security }] },
  ] as const;

  return (
    <footer className="site-footer" role="contentinfo">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col stack stack-3">
            <Link href="/" className="site-logo">{PRODUCT_IDENTITY.name}</Link>
            <p className="muted" style={{ fontSize: 'var(--text-sm)', maxWidth: '36ch' }}>
              {isTurkish ? `${PRODUCT_IDENTITY.tagline}. Kendi sağlayıcılarınızı bağlayın ve deneyimi her işletmeye göre yapılandırın.` : `${PRODUCT_IDENTITY.tagline}. Connect your own providers and configure the experience for each business.`}
            </p>
            <div className="row" style={{ gap: 'var(--space-2)', marginTop: 'var(--space-3)', flexWrap: 'wrap' }} data-testid="trust-badges">
              <span className="badge badge-success">{t.whiteLabelBadge}</span>
              <span className="badge badge-neutral">{t.multiSectorBadge}</span>
              <span className="badge badge-neutral">MIT {isTurkish ? 'kaynak lisansı' : 'upstream'}</span>
            </div>
          </div>
          {columns.map((column) => (
            <div className="footer-col" key={column.title}>
              <h4>{column.title}</h4>
              {column.links.map((link) => (
                <Link key={link.href} href={link.href}>{link.label}</Link>
              ))}
            </div>
          ))}
        </div>
        <hr className="divider" />
        <div className="row-between" style={{ alignItems: 'center', flexWrap: 'wrap' }}>
          <p className="muted" style={{ fontSize: 'var(--text-xs)' }}>
            © {CURRENT_YEAR} {PRODUCT_IDENTITY.name}. {isTurkish ? 'MIT lisans bildirimi korunmuştur.' : 'Upstream MIT attribution retained.'}
          </p>
          <Link href="/status" className="muted" style={{ fontSize: 'var(--text-xs)' }}>{t.status}</Link>
        </div>
      </div>
    </footer>
  );
}
