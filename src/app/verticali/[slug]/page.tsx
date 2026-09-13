import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { CtaSection } from '@/components/marketing/CtaSection';
import {
  buildBreadcrumbSchema,
  buildHowToSchema,
  buildServiceSchema,
  JsonLd,
} from '@/components/marketing/JsonLd';
import { SiteFooter } from '@/components/marketing/SiteFooter';
import { SiteHeader } from '@/components/marketing/SiteHeader';
import { VERTICALS_DATA } from './verticals-data';

export function generateStaticParams() {
  return Object.keys(VERTICALS_DATA).map((slug) => ({ slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = VERTICALS_DATA[slug];
  if (!data) return { title: 'Sector not found', robots: { index: false, follow: false } };
  return {
    title: data.metaTitle,
    description: data.metaDescription,
    openGraph: {
      title: data.metaTitle,
      description: data.metaDescription,
      url: `/verticali/${data.slug}`,
      type: 'website',
      locale: 'en_US',
    },
    alternates: { canonical: `/verticali/${data.slug}` },
  };
}

export default async function VerticalPage({ params }: PageProps) {
  const { slug } = await params;
  const data = VERTICALS_DATA[slug];
  if (!data) notFound();
  const otherVerticals = Object.values(VERTICALS_DATA).filter((v) => v.slug !== data.slug);

  return (
    <>
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: 'Sectors', url: '/verticali' },
          { name: data.title, url: `/verticali/${data.slug}` },
        ])}
      />
      <JsonLd
        data={buildServiceSchema({
          name: `AI Receptionist Pro for ${data.title}`,
          serviceType: data.serviceType,
          description: data.metaDescription,
          url: `/verticali/${data.slug}`,
        })}
      />
      <JsonLd
        data={buildHowToSchema({
          name: `How AI Receptionist Pro works for ${data.title}`,
          description: `Typical customer workflows for ${data.title}.`,
          steps: data.scenarios.map((scenario) => ({ name: scenario.title, text: scenario.body })),
        })}
      />
      <SiteHeader />
      <main id="main">
        <section className="hero" aria-labelledby="vertical-h1">
          <div className="container hero-grid">
            <div className="stack stack-6">
              <span className="hero-eyebrow">
                {data.icon} {data.hero.eyebrow}
              </span>
              <h1 id="vertical-h1" className="display text-balance">
                {data.hero.h1}
              </h1>
              <p className="lead text-pretty">{data.hero.body}</p>
              <div className="row" style={{ gap: 'var(--space-3)' }}>
                <Link href={`/register?vertical=${data.slug}`} className="btn btn-primary btn-lg">
                  Start setup
                </Link>
                <Link
                  href={`/pricing?ref=vertical-${data.slug}`}
                  className="btn btn-secondary btn-lg"
                >
                  View plans
                </Link>
              </div>
              <div
                className="card stack stack-2"
                style={{
                  padding: 'var(--space-5)',
                  background: 'var(--color-accent-soft)',
                  maxWidth: '360px',
                }}
              >
                <span className="eyebrow">Workflow focus</span>
                <p
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'var(--text-2xl)',
                    fontWeight: 700,
                  }}
                >
                  {data.metric.value}
                </p>
                <p className="muted" style={{ fontSize: 'var(--text-sm)' }}>
                  {data.metric.label}
                </p>
              </div>
            </div>
            <div className="card card-padded stack stack-4" aria-label="Sector workflow preview">
              <span className="eyebrow">Example workflow</span>
              {data.scenarios.map((scenario, index) => (
                <div key={scenario.title} className="stack stack-2">
                  <div className="row-between">
                    <strong>
                      {String(index + 1).padStart(2, '0')} · {scenario.title}
                    </strong>
                    <span className="badge badge-success">Supported</span>
                  </div>
                  <p className="muted">{scenario.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-divider" aria-labelledby="pains-heading">
          <div className="container stack stack-12">
            <div className="stack stack-3" style={{ maxWidth: '52ch' }}>
              <span className="eyebrow">Problems it addresses</span>
              <h2 id="pains-heading">Practical automation, with clear boundaries.</h2>
            </div>
            <div className="feature-grid">
              {data.pains.map((pain) => (
                <article key={pain.title} className="card stack stack-3">
                  <h3 style={{ fontSize: 'var(--text-xl)' }}>{pain.title}</h3>
                  <p style={{ color: 'var(--color-text-secondary)' }}>{pain.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          className="section section-divider"
          style={{ background: 'var(--color-surface-sunken)' }}
          aria-labelledby="scenarios-heading"
        >
          <div className="container stack stack-12">
            <div className="stack stack-3" style={{ maxWidth: '52ch' }}>
              <span className="eyebrow">Customer scenarios</span>
              <h2 id="scenarios-heading">A predictable path from request to action.</h2>
            </div>
            <div
              className="grid"
              style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}
            >
              {data.scenarios.map((scenario, index) => (
                <article
                  key={scenario.title}
                  className="card stack stack-3"
                  style={{ background: 'var(--color-surface)' }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'var(--text-2xl)',
                      fontWeight: 700,
                      color: 'var(--color-accent)',
                    }}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 style={{ fontSize: 'var(--text-lg)' }}>{scenario.title}</h3>
                  <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-sm)' }}>
                    {scenario.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-divider" aria-labelledby="other-verticals-heading">
          <div className="container stack stack-6">
            <h2 id="other-verticals-heading" style={{ fontSize: 'var(--text-2xl)' }}>
              Other sector presets
            </h2>
            <div className="row" style={{ gap: 'var(--space-3)', flexWrap: 'wrap' }}>
              {otherVerticals.map((v) => (
                <Link key={v.slug} href={`/verticali/${v.slug}`} className="btn btn-secondary">
                  {v.icon} {v.title}
                </Link>
              ))}
            </div>
          </div>
        </section>
        <CtaSection />
      </main>
      <SiteFooter />
    </>
  );
}
