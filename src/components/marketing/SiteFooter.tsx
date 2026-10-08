'use client';

import Link from 'next/link';

import { PRODUCT_IDENTITY } from '@/config/product-identity';
import { useMarketingCopy } from './LanguageSelector';

const CURRENT_YEAR = 2026;

export function SiteFooter() {
  const { copy } = useMarketingCopy();
  const columns = [
    { title: copy.product, links: [['/#features', copy.navFeatures],['/pricing', copy.navPricing],['/verticali', copy.navSectors]] },
    { title: copy.resources, links: [['/help', copy.helpCenter],['/docs', copy.documentation],['/changelog', copy.changelog]] },
    { title: copy.company, links: [['/about', copy.about],['/contact', copy.contact],['/status', copy.status]] },
    { title: copy.legal, links: [['/legal/privacy', copy.privacy],['/legal/terms', copy.terms],['/legal/security', copy.security]] },
  ] as const;

  return (
    <footer className="site-footer" role="contentinfo">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col stack stack-3">
            <Link href="/" className="site-logo">{PRODUCT_IDENTITY.name}</Link>
            <p className="muted" style={{fontSize:'var(--text-sm)',maxWidth:'36ch'}}>{PRODUCT_IDENTITY.tagline}. Connect your own providers and configure the experience for each business.</p>
            <div className="row" style={{gap:'var(--space-2)',marginTop:'var(--space-3)',flexWrap:'wrap'}} data-testid="trust-badges">
              <span className="badge badge-success">{copy.whiteLabelBadge}</span>
              <span className="badge badge-neutral">{copy.multiSectorBadge}</span>
              <span className="badge badge-neutral">MIT upstream</span>
            </div>
          </div>
          {columns.map((column)=>(
            <div className="footer-col" key={column.title}>
              <h4>{column.title}</h4>
              {column.links.map(([href,label])=><Link key={href} href={href}>{label}</Link>)}
            </div>
          ))}
        </div>
        <hr className="divider" />
        <div className="row-between" style={{alignItems:'center',flexWrap:'wrap'}}>
          <p className="muted" style={{fontSize:'var(--text-xs)'}}>© {CURRENT_YEAR} {PRODUCT_IDENTITY.name}. Upstream MIT attribution retained.</p>
          <Link href="/status" className="muted" style={{fontSize:'var(--text-xs)'}}>{copy.status}</Link>
        </div>
      </div>
    </footer>
  );
}
