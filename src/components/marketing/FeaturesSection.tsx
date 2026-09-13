interface Feature {
  title: string;
  description: string;
  icon: string;
  size: 'wide' | 'half' | 'third';
  isHighlight?: boolean;
}

const FEATURES: ReadonlyArray<Feature> = [
  {
    title: 'WhatsApp conversations',
    description:
      'Receive customer text and voice messages, understand intent, collect missing details, and respond consistently.',
    icon: '💬',
    size: 'wide',
    isHighlight: true,
  },
  {
    title: 'Real appointment booking',
    description:
      'Check actual availability and create appointments without offering times that are already occupied.',
    icon: '📅',
    size: 'half',
  },
  {
    title: 'Human handoff',
    description:
      'Stop automation when a customer asks for a person or a configured guardrail is triggered, while preserving conversation context.',
    icon: '🤝',
    size: 'half',
  },
  {
    title: 'Knowledge base',
    description:
      'Answer from business-approved information such as services, policies, FAQs and location details.',
    icon: '📚',
    size: 'third',
  },
  {
    title: 'White-label controls',
    description:
      'Configure the business name, logo, colors and assistant identity for each tenant.',
    icon: '✨',
    size: 'third',
  },
  {
    title: 'Usage and billing',
    description:
      'Track usage and connect billing so the application can be operated as a controlled SaaS product.',
    icon: '📊',
    size: 'third',
  },
] as const;

const sizeClass = {
  wide: 'feature-card-wide',
  half: 'feature-card-half',
  third: 'feature-card-third',
} as const;

export function FeaturesSection() {
  return (
    <section className="section" id="features" aria-labelledby="features-heading">
      <div className="container stack stack-12">
        <div className="stack stack-4" style={{ maxWidth: '52ch' }}>
          <span className="eyebrow">Core capabilities</span>
          <h2 id="features-heading" className="text-balance">
            Everything the receptionist needs, in one workflow.
          </h2>
          <p className="lead">
            Focused on the customer journey: understand the request, check the real business state,
            take the right action, and escalate when automation should stop.
          </p>
        </div>
        <ul className="features-bento stagger-children" style={{ listStyle: 'none', padding: 0 }}>
          {FEATURES.map((feature, index) => (
            <li
              key={feature.title}
              className={`card card-interactive feature-card ${sizeClass[feature.size]} ${feature.isHighlight ? 'feature-card-highlight' : ''}`}
              style={{ '--i': index } as React.CSSProperties}
            >
              <div className="feature-icon-tile" aria-hidden="true" style={{ fontSize: '1.5rem' }}>
                {feature.icon}
              </div>
              <div className="stack stack-3">
                <h3 className="feature-card-title">{feature.title}</h3>
                <p className="feature-card-body">{feature.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
