import type { Metadata } from 'next';
import Link from 'next/link';

import { buildBreadcrumbSchema, buildCollectionPageSchema, JsonLd } from '@/components/marketing/JsonLd';
import { SiteFooter } from '@/components/marketing/SiteFooter';
import { SiteHeader } from '@/components/marketing/SiteHeader';
import { VERTICALS_DATA } from './[slug]/verticals-data';

export const metadata: Metadata = {
  title: 'Sector Presets — AI Receptionist Pro',
  description: 'Seven configurable sector starting points for the AI Receptionist Pro appointment and customer-conversation workflow.',
  alternates: { canonical: '/verticali' },
  openGraph: { title: 'Sector Presets — AI Receptionist Pro', description: 'Seven configurable sector starting points.', url: '/verticali', type: 'website', locale: 'en_US' },
};

const VERTICALS = Object.values(VERTICALS_DATA);

export default async function VerticalsIndexPage() {
  return (
    <>
      <JsonLd data={buildBreadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Sectors', url: '/verticali' }])} />
      <JsonLd data={buildCollectionPageSchema({ name: 'AI Receptionist Pro sector presets', description: 'Seven configurable sector starting points.', url: '/verticali', hasPart: VERTICALS.map((v) => ({ name: v.title, url: `/verticali/${v.slug}` })) })} />
      <SiteHeader />
      <main id="main">
        <section className="section" style={{ paddingTop: 'clamp(3rem, 4vw + 1rem, 5rem)', paddingBottom: 'var(--space-section)' }}>
          <div className="container">
            <div className="stack stack-4 text-center" style={{ maxWidth: '720px', margin: '0 auto var(--space-12)' }}>
              <span className="badge">7 sector presets</span>
              <h1 className="display text-balance">One core workflow. A useful starting point for each business.</h1>
              <p className="lead text-pretty" style={{ margin: '0 auto' }}>Choose a preset to start with sensible messaging and booking boundaries. Every business can edit its services, hours, knowledge and assistant behavior.</p>
            </div>
            <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
              {VERTICALS.map((v) => (
                <Link key={v.slug} href={`/verticali/${v.slug}`} className="card card-padded card-interactive stack stack-4" style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div className="feature-icon-tile" aria-hidden="true" style={{ fontSize: '1.5rem' }}>{v.icon}</div>
                  <h2 style={{ fontSize: 'var(--text-2xl)' }}>{v.title}</h2>
                  <p style={{ color: 'var(--color-text-secondary)' }}>{v.hero.body}</p>
                  <span className="row plan-card-actions" style={{ gap: 'var(--space-2)', color: 'var(--color-accent-fg)', fontSize: 'var(--text-sm)', fontWeight: 600 }}>Explore preset <span aria-hidden="true">→</span></span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
