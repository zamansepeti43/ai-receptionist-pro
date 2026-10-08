'use client';

import Link from 'next/link';

import { PRODUCT_IDENTITY } from '@/config/product-identity';
import { useMarketingCopy } from './LanguageSelector';

export function ProductHero() {
  const { copy } = useMarketingCopy();
  const body = copy.heroBody.replace(/^AI Receptionist Pro\s*/, '');

  return (
    <section className="hero" aria-labelledby="product-hero-heading">
      <div className="container hero-grid">
        <div className="stack stack-6 animate-fade-up">
          <span className="hero-eyebrow">{copy.heroEyebrow}</span>
          <h1 id="product-hero-heading" className="display text-balance">{copy.heroTitle}</h1>
          <p className="lead text-pretty">{PRODUCT_IDENTITY.name} {body}</p>
          <div className="row" style={{ gap: 'var(--space-3)', marginTop: 'var(--space-2)' }}>
            <Link href="/register" className="btn btn-primary btn-lg">{copy.startSetup} <span aria-hidden="true">→</span></Link>
            <Link href="/#how-it-works" className="btn btn-secondary btn-lg">{copy.seeHow}</Link>
          </div>
          <div className="row" style={{ gap: 'var(--space-8)', marginTop: 'var(--space-6)', paddingTop: 'var(--space-6)', borderTop: '1px solid var(--color-border)' }}>
            <div className="stat"><span className="stat-value">24/7</span><span className="stat-label">{copy.customerCoverage}</span></div>
            <div className="stat"><span className="stat-value">7</span><span className="stat-label">{copy.sectorPresets}</span></div>
            <div className="stat"><span className="stat-value">AI</span><span className="stat-label">{copy.humanHandoff}</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}
