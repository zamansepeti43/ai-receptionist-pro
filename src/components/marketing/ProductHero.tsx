'use client';

import Link from 'next/link';
import { PRODUCT_IDENTITY } from '@/config/product-identity';
import { useMarketingLocale } from './LanguageSelector';

export function ProductHero() {
  const { t } = useMarketingLocale();

  return (
    <section className="hero" aria-labelledby="product-hero-heading">
      <div className="container hero-grid">
        <div className="stack stack-6 animate-fade-up">
          <span className="hero-eyebrow">{t.heroEyebrow}</span>
          <h1 id="product-hero-heading" className="display text-balance">
            {t.heroTitle}
          </h1>
          <p className="lead text-pretty">
            {PRODUCT_IDENTITY.name} {t.heroBody.replace(/^AI Receptionist Pro\s*/, '')}
          </p>
          <div className="row" style={{ gap: 'var(--space-3)', marginTop: 'var(--space-2)' }}>
            <Link href="/register" className="btn btn-primary btn-lg">
              {t.startSetup} <span aria-hidden="true">→</span>
            </Link>
            <Link href="/#how-it-works" className="btn btn-secondary btn-lg">
              {t.seeHow}
            </Link>
          </div>
          <div
            className="row"
            style={{
              gap: 'var(--space-8)',
              marginTop: 'var(--space-6)',
              paddingTop: 'var(--space-6)',
              borderTop: '1px solid var(--color-border)',
            }}
          >
            <div className="stat">
              <span className="stat-value">24/7</span>
              <span className="stat-label">{t.customerCoverage}</span>
            </div>
            <div className="stat">
              <span className="stat-value">7</span>
              <span className="stat-label">{t.sectorPresets}</span>
            </div>
            <div className="stat">
              <span className="stat-value">AI</span>
              <span className="stat-label">{t.humanHandoff}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
