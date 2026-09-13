import type { Metadata } from 'next';
import Link from 'next/link';

import {
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildProductOffersSchema,
  buildSpeakableSchema,
  JsonLd,
} from '@/components/marketing/JsonLd';
import { PricingTeaser } from '@/components/marketing/PricingTeaser';
import { SiteFooter } from '@/components/marketing/SiteFooter';
import { SiteHeader } from '@/components/marketing/SiteHeader';

export const metadata: Metadata = {
  title: 'Pricing — AI Receptionist Pro',
  description:
    'Configurable SaaS pricing for AI Receptionist Pro. Adapt plans, limits and billing rules to your business model.',
  openGraph: {
    title: 'Pricing — AI Receptionist Pro',
    description: 'Configurable SaaS pricing for the AI Receptionist Pro application.',
    url: '/pricing',
    locale: 'en_US',
    type: 'website',
  },
  alternates: { canonical: '/pricing' },
};

const FAQ = [
  {
    q: 'Can I change the plan structure?',
    a: 'Yes. The pricing layer is part of the application and is intended to be adapted before launch.',
  },
  {
    q: 'Do customers need their own provider accounts?',
    a: 'Yes. The deployment is designed around buyer-owned accounts and credentials for supported providers.',
  },
  {
    q: 'Can I use a different calendar provider?',
    a: 'The launch workflow is centered on Google Calendar. Additional providers can be added as a product extension.',
  },
  {
    q: 'Is the application white-label?',
    a: 'Yes. The product layer provides configurable business identity and branding controls.',
  },
  {
    q: 'Does the AI make medical decisions?',
    a: 'No. Healthcare-oriented presets are for administrative scheduling and customer communication, not diagnosis or treatment advice.',
  },
  {
    q: 'What happens when automation should stop?',
    a: 'Configured guardrails and explicit requests for a person can trigger human handoff while preserving conversation context.',
  },
] as const;

const PLAN_OFFERS = [
  {
    name: 'Starter',
    price: '97',
    description: 'Single-business starter plan.',
    url: '/register?plan=starter',
  },
  {
    name: 'Professional',
    price: '297',
    description: 'Higher-capacity operational plan.',
    url: '/register?plan=professional',
  },
  {
    name: 'Agency',
    price: '897',
    description: 'Multi-client white-label plan.',
    url: '/contact?plan=agency',
  },
] as const;

export default async function PricingPage() {
  return (
    <>
      <JsonLd data={buildFaqSchema(FAQ)} />
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: 'Pricing', url: '/pricing' },
        ])}
      />
      <JsonLd data={buildProductOffersSchema(PLAN_OFFERS)} />
      <JsonLd
        data={buildSpeakableSchema({
          url: '/pricing',
          cssSelector: ['#faq-heading', '[data-speakable="faq"]'],
        })}
      />
      <SiteHeader />
      <main id="main">
        <section
          className="section"
          style={{
            paddingTop: 'clamp(3rem, 4vw + 1rem, 5rem)',
            paddingBottom: 'clamp(2rem, 2vw, 3rem)',
          }}
        >
          <div
            className="container stack stack-6 text-center"
            style={{ maxWidth: '720px', margin: '0 auto' }}
          >
            <span className="badge">Configurable pricing</span>
            <h1 className="display text-balance">Choose a starting model. Make it yours.</h1>
            <p className="lead text-pretty" style={{ margin: '0 auto' }}>
              The included plans are starter defaults for the application. Edit prices, limits,
              features and billing rules to match the business before launch.
            </p>
          </div>
        </section>
        <PricingTeaser />
        <section className="section section-divider" aria-labelledby="faq-heading">
          <div className="container stack stack-12">
            <div className="stack stack-3" style={{ maxWidth: '52ch' }}>
              <span className="eyebrow">FAQ</span>
              <h2 id="faq-heading">Questions buyers usually ask</h2>
            </div>
            <div
              className="grid"
              data-speakable="faq"
              style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}
            >
              {FAQ.map((item) => (
                <article key={item.q} className="card stack stack-3">
                  <h3 style={{ fontSize: 'var(--text-lg)' }}>{item.q}</h3>
                  <p style={{ color: 'var(--color-text-secondary)' }}>{item.a}</p>
                </article>
              ))}
            </div>
            <div
              className="card card-padded stack stack-4 text-center"
              style={{ background: 'var(--color-surface-sunken)', alignItems: 'center' }}
            >
              <h3>Need a custom commercial setup?</h3>
              <p className="muted" style={{ maxWidth: '50ch' }}>
                Use the contact flow for larger deployments, agencies and custom operational
                requirements.
              </p>
              <Link href="/contact?plan=custom" className="btn btn-primary">
                Contact us
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
