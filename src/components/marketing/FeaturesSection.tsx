'use client';

import type { CSSProperties } from 'react';

import { useMarketingCopy } from './LanguageSelector';

export function FeaturesSection() {
  const { copy } = useMarketingCopy();
  const features = [
    { title: copy.whatsapp, description: copy.whatsappBody, icon: '💬', size: 'wide', isHighlight: true },
    { title: copy.booking, description: copy.bookingBody, icon: '📅', size: 'half', isHighlight: false },
    { title: copy.handoff, description: copy.handoffBody, icon: '🤝', size: 'half', isHighlight: false },
    { title: copy.knowledge, description: copy.knowledgeBody, icon: '📚', size: 'third', isHighlight: false },
    { title: copy.whiteLabel, description: copy.whiteLabelBody, icon: '✨', size: 'third', isHighlight: false },
    { title: copy.usage, description: copy.usageBody, icon: '📊', size: 'third', isHighlight: false },
  ] as const;

  const sizeClass = { wide: 'feature-card-wide', half: 'feature-card-half', third: 'feature-card-third' } as const;

  return (
    <section className="section" id="features" aria-labelledby="features-heading" style={{ scrollMarginTop: 'var(--space-20)' }}>
      <div className="container stack stack-12">
        <div className="stack stack-4" style={{ maxWidth: '52ch' }}>
          <span className="eyebrow">{copy.coreCapabilities}</span>
          <h2 id="features-heading" className="text-balance">{copy.featureHeading}</h2>
          <p className="lead">{copy.featureIntro}</p>
        </div>
        <ul className="features-bento stagger-children" style={{ listStyle: 'none', padding: 0 }}>
          {features.map((feature, index) => (
            <li key={feature.title} className={`card card-interactive feature-card ${sizeClass[feature.size]} ${feature.isHighlight ? 'feature-card-highlight' : ''}`} style={{ '--i': index } as CSSProperties}>
              <div className="feature-icon-tile" aria-hidden="true" style={{ fontSize: '1.5rem' }}>{feature.icon}</div>
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
