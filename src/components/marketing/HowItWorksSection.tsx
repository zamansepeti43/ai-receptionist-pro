'use client';

import type { CSSProperties } from 'react';
import { useMarketingLocale } from './LanguageSelector';

export function HowItWorksSection() {
  const { t } = useMarketingLocale();

  const steps = [
    { n: '01', title: t.step1, body: t.step1Body },
    { n: '02', title: t.step2, body: t.step2Body },
    { n: '03', title: t.step3, body: t.step3Body },
  ];

  return (
    <section className="section section-divider" id="how-it-works" aria-labelledby="how-heading" style={{ background: 'var(--color-surface-sunken)' }}>
      <div className="container stack stack-12">
        <div className="stack stack-4" style={{ maxWidth: '52ch' }}>
          <span className="eyebrow">{t.howIntro.startsWith('The product') ? 'How it works' : 'Nasıl çalışır'}</span>
          <h2 id="how-heading" className="text-balance">{t.howHeading}</h2>
          <p className="lead">{t.howIntro}</p>
        </div>
        <ol className="grid stagger-children" style={{ listStyle: 'none', padding: 0, gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
          {steps.map((step, index) => (
            <li key={step.n} className="card card-padded stack stack-4 step-card" style={{ background: 'var(--color-surface)', '--i': index } as CSSProperties}>
              <span className="step-number" aria-hidden="true">{step.n}</span>
              <h3 style={{ fontSize: 'var(--text-xl)' }}>{step.title}</h3>
              <p style={{ color: 'var(--color-text-secondary)' }}>{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
