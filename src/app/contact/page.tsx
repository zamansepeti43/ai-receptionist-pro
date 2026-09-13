import type { Metadata } from 'next';

import { buildBreadcrumbSchema, JsonLd, organizationSchema } from '@/components/marketing/JsonLd';
import { SiteFooter } from '@/components/marketing/SiteFooter';
import { SiteHeader } from '@/components/marketing/SiteHeader';
import { ContactForm } from '@/components/forms/ContactForm';

export const metadata: Metadata = {
  title: 'Contact · Talk to the AI Receptionist Pro team',
  description:
    'Contact the AI Receptionist Pro team for sales, support, partnerships or product questions.',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact · AI Receptionist Pro',
    description: 'Talk to the team about sales, support, partnerships or product questions.',
    url: '/contact',
    type: 'website',
    locale: 'en_US',
  },
};

export default function ContactPage() {
  return (
    <>
      <JsonLd data={organizationSchema} />
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: 'Contact', url: '/contact' },
        ])}
      />
      <SiteHeader />
      <main id="main">
        <section className="section">
          <div className="container">
            <div
              style={{
                display: 'grid',
                gap: 'var(--space-12)',
                gridTemplateColumns: '1fr',
                maxWidth: '960px',
                margin: '0 auto',
              }}
            >
              <div className="stack stack-4 text-center">
                <span className="badge">Contact</span>
                <h1 className="display text-balance">Let&apos;s talk.</h1>
                <p className="lead text-pretty" style={{ margin: '0 auto' }}>
                  Fill out the form below and our team will get back to you. For urgent requests,
                  use{' '}
                  <a href="mailto:hello@yourdomain.com" className="btn-link">
                    hello@yourdomain.com
                  </a>
                  .
                </p>
              </div>

              <ContactForm />

              <address
                className="card stack stack-3"
                style={{
                  fontStyle: 'normal',
                  background: 'var(--color-surface-sunken)',
                  fontSize: 'var(--text-sm)',
                  color: 'var(--color-text-secondary)',
                }}
              >
                <strong style={{ color: 'var(--color-text)' }}>AI Receptionist Pro</strong>
                <p>
                  <strong>Sales &amp; partnerships:</strong>{' '}
                  <a href="mailto:hello@yourdomain.com" className="btn-link">
                    hello@yourdomain.com
                  </a>
                </p>
                <p>
                  <strong>Technical support:</strong>{' '}
                  <a href="mailto:support@yourdomain.com" className="btn-link">
                    support@yourdomain.com
                  </a>
                </p>
                <p>
                  <strong>Data protection:</strong>{' '}
                  <a href="mailto:dpo@yourdomain.com" className="btn-link">
                    dpo@yourdomain.com
                  </a>
                </p>
              </address>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
