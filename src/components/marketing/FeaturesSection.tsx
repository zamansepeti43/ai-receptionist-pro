'use client';

import type { CSSProperties } from 'react';
import { useMarketingLocale } from './LanguageSelector';

interface Feature {
  title: string;
  description: string;
  icon: string;
  size: 'wide' | 'half' | 'third';
  isHighlight?: boolean;
}

const sizeClass = {
  wide: 'feature-card-wide',
  half: 'feature-card-half',
  third: 'feature-card-third',
} as const;

export function FeaturesSection() {
  const { t } = useMarketingLocale();

  const features: ReadonlyArray<Feature> = [
    { title: t.whatsapp, description: t.whatsappBody, icon: '💬', size: 'wide', isHighlight: true },
    { title: t.booking, description: t.bookingBody, icon: '📅', size: 'half' },
    { title: t.handoff, description: t.handoffBody, icon: '🤝', size: 'half' },
    { title: t.knowledge, description: t.knowledgeBody, icon: '📚', size: 'third' },
    { title: t.whiteLabel, description: t.whiteLabelBody, icon: '✨', size: 'third' },
    { title: t.usage, description: t.usageBody, icon: '📊', size: 'third' },
  ];

  return (
    <section
      className="section"
      id="features"
      aria-labelledby="features-heading"
      style={{ scrollMarginTop: 'var(--space-20)' }}
    >
      <div className="container stack stack-12">
        <div className="stack stack-4" style={{ maxWidth: '52ch' }}>
          <span className="eyebrow">{t.coreCapabilities}</span>
          <h2 id="features-heading" className="text-balance">{t.featureHeading}</h2>
          <p className="lead">{t.featureIntro}</p>
        </div>
        <ul className="features-bento stagger-children" style={{ listStyle: 'none', padding: 0 }}>
          {features.map((feature, index) => (
            <li
              key={feature.title}
              className={`card card-interactive feature-card ${sizeClass[feature.size]} ${feature.isHighlight ? 'feature-card-highlight' : ''}`}
              style={{ '--i': index } as CSSProperties}
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
