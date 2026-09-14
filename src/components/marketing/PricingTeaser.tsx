import Link from 'next/link';

const PLANS = [
  {
    name: 'Starter',
    price: '0',
    period: '',
    badge: 'Example plan',
    description: 'Example starter configuration for one business and one calendar.',
    features: [
      '1 WhatsApp Business number',
      '1 Google Calendar',
      'AI conversations',
      'Voice transcription',
      'Core dashboard',
    ],
    cta: 'Configure this model',
    href: '/register?plan=starter',
    highlight: false,
  },
  {
    name: 'Professional',
    price: '0',
    period: '',
    badge: 'Example plan',
    description: 'Example higher-capacity configuration for growing businesses.',
    features: [
      'Multiple WhatsApp numbers',
      'Operator workflows',
      'Higher AI usage',
      'Reminders',
      'Custom knowledge base',
      'Priority support',
    ],
    cta: 'Configure this model',
    href: '/register?plan=professional',
    highlight: true,
  },
  {
    name: 'Agency',
    price: '0',
    period: '',
    badge: 'Example plan',
    description: 'Example white-label configuration for agencies and service providers.',
    features: [
      'Multi-client setup',
      'White-label dashboard',
      'API and webhooks',
      'Usage controls',
      'Client onboarding tools',
      'Custom support',
    ],
    cta: 'Discuss configuration',
    href: '/contact?plan=agency',
    highlight: false,
  },
] as const;

export function PricingTeaser() {
  return (
    <section className="section" aria-labelledby="pricing-heading">
      <div className="container stack stack-12">
        <div className="stack stack-4" style={{ maxWidth: '52ch' }}>
          <span
            className="eyebrow"
            style={{ fontSize: 'var(--text-sm)', fontWeight: 800, letterSpacing: '0.12em' }}
          >
            EXAMPLE SAAS PLANS
          </span>
          <h2 id="pricing-heading" className="text-balance">
            Example models — configure your own commercial offer.
          </h2>
          <p className="lead">
            The prices shown here are <strong>0</strong> because these are example configurations,
            not live commercial offers. Before launch, the buyer defines the actual plans, limits,
            prices and billing rules.
          </p>
        </div>
        <div
          className="grid stagger-children"
          style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}
        >
          {PLANS.map((plan, index) => (
            <article
              key={plan.name}
              className={`card card-padded stack stack-6 plan-card ${plan.highlight ? 'plan-card-featured' : ''}`}
              style={{ '--i': index } as React.CSSProperties}
            >
              <span className="badge badge-neutral">{plan.badge}</span>
              <div className="stack stack-2">
                <h3 style={{ fontSize: 'var(--text-2xl)' }}>{plan.name}</h3>
                <div className="row" style={{ alignItems: 'baseline', gap: 'var(--space-1)' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'var(--text-4xl)',
                      fontWeight: 700,
                      letterSpacing: 'var(--tracking-tight)',
                    }}
                  >
                    {plan.price}
                  </span>
                  {plan.period ? <span className="muted">{plan.period}</span> : null}
                </div>
                <p className="muted" style={{ fontSize: 'var(--text-sm)' }}>
                  {plan.description}
                </p>
              </div>
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--space-2)',
                }}
              >
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    style={{
                      display: 'flex',
                      gap: 'var(--space-2)',
                      fontSize: 'var(--text-sm)',
                      color: 'var(--color-text-secondary)',
                    }}
                  >
                    <span aria-hidden="true">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                href={plan.href}
                className={`btn ${plan.highlight ? 'btn-primary' : 'btn-secondary'} btn-lg plan-card-actions`}
              >
                {plan.cta}
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
