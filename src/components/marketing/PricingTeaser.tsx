import Link from 'next/link';

const PLANS = [
  { name: 'Starter', price: '€97', period: '/month', badge: 'Single business', description: 'A practical starting point for one business and one calendar.', features: ['1 WhatsApp Business number', '1 Google Calendar', 'AI conversations', 'Voice transcription', 'Core dashboard'], cta: 'Start with Starter', href: '/register?plan=starter', highlight: false },
  { name: 'Professional', price: '€297', period: '/month', badge: 'Most popular', description: 'More capacity and operational controls for growing businesses.', features: ['Multiple WhatsApp numbers', 'Operator workflows', 'Higher AI usage', 'Reminders', 'Custom knowledge base', 'Priority support'], cta: 'Start with Professional', href: '/register?plan=professional', highlight: true },
  { name: 'Agency', price: '€897', period: '/month', badge: 'White-label', description: 'A multi-client operating model for agencies and service providers.', features: ['Multi-client setup', 'White-label dashboard', 'API and webhooks', 'Usage controls', 'Client onboarding tools', 'Custom support'], cta: 'Talk to us', href: '/contact?plan=agency', highlight: false },
] as const;

export function PricingTeaser() {
  return (
    <section className="section" aria-labelledby="pricing-heading">
      <div className="container stack stack-12">
        <div className="stack stack-4" style={{ maxWidth: '52ch' }}>
          <span className="eyebrow">Example SaaS plans</span>
          <h2 id="pricing-heading" className="text-balance">A pricing layer you can adapt to the business model.</h2>
          <p className="lead">These are starter defaults for the application. A buyer can change plans, limits, prices and billing rules before launching.</p>
        </div>
        <div className="grid stagger-children" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
          {PLANS.map((plan, index) => (
            <article key={plan.name} className={`card card-padded stack stack-6 plan-card ${plan.highlight ? 'plan-card-featured' : ''}`} style={{ '--i': index } as React.CSSProperties}>
              <span className="badge badge-neutral">{plan.badge}</span>
              <div className="stack stack-2">
                <h3 style={{ fontSize: 'var(--text-2xl)' }}>{plan.name}</h3>
                <div className="row" style={{ alignItems: 'baseline', gap: 'var(--space-1)' }}><span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-4xl)', fontWeight: 700, letterSpacing: 'var(--tracking-tight)' }}>{plan.price}</span><span className="muted">{plan.period}</span></div>
                <p className="muted" style={{ fontSize: 'var(--text-sm)' }}>{plan.description}</p>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                {plan.features.map((feature) => <li key={feature} style={{ display: 'flex', gap: 'var(--space-2)', fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}><span aria-hidden="true">✓</span>{feature}</li>)}
              </ul>
              <Link href={plan.href} className={`btn ${plan.highlight ? 'btn-primary' : 'btn-secondary'} btn-lg plan-card-actions`}>{plan.cta}</Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
