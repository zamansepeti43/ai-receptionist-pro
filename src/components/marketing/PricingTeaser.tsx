'use client';

import type { CSSProperties } from 'react';
import Link from 'next/link';
import { useMarketingLocale } from './MarketingLocaleProvider';

export function PricingTeaser() {
  const { t, language } = useMarketingLocale();

  const plans = [
    { name: t.starter, description: t.starterBody, features: ['1 WhatsApp Business number','1 Google Calendar','AI conversations','Voice transcription','Core dashboard'], cta: t.configure, href: '/register?plan=starter', highlight: false },
    { name: t.professional, description: t.professionalBody, features: ['Multiple WhatsApp numbers','Operator workflows','Higher AI usage','Reminders','Custom knowledge base','Priority support'], cta: t.configure, href: '/register?plan=professional', highlight: true },
    { name: t.agency, description: t.agencyBody, features: ['Multi-client setup','White-label dashboard','API and webhooks','Usage controls','Client onboarding tools','Custom support'], cta: t.discuss, href: '/contact?plan=agency', highlight: false },
  ] as const;

  const trFeatures = [
    ['1 WhatsApp Business number','1 WhatsApp Business numarası'],
    ['1 Google Calendar','1 Google Takvim'],
    ['AI conversations','AI görüşmeleri'],
    ['Voice transcription','Sesli mesaj yazıya çevirme'],
    ['Core dashboard','Temel panel'],
    ['Multiple WhatsApp numbers','Birden fazla WhatsApp numarası'],
    ['Operator workflows','Operatör akışları'],
    ['Higher AI usage','Daha yüksek AI kullanımı'],
    ['Reminders','Hatırlatıcılar'],
    ['Custom knowledge base','Özel bilgi tabanı'],
    ['Priority support','Öncelikli destek'],
    ['Multi-client setup','Çoklu müşteri kurulumu'],
    ['White-label dashboard','Beyaz etiket paneli'],
    ['API and webhooks','API ve web kancaları'],
    ['Usage controls','Kullanım kontrolleri'],
    ['Client onboarding tools','Müşteri onboarding araçları'],
    ['Custom support','Özel destek'],
  ] as const;
  const featureMap = new Map(trFeatures);
  const localizedPlans = plans.map((plan) => ({
    ...plan,
    features: plan.features.map((f) => language === 'tr' ? featureMap.get(f) ?? f : f),
  }));

  return (
    <section className="section" aria-labelledby="pricing-heading">
      <div className="container stack stack-12">
        <div className="stack stack-4" style={{ maxWidth: '52ch' }}>
          <span className="eyebrow" style={{ fontSize: 'var(--text-sm)', fontWeight: 800, letterSpacing: '0.12em' }}>{t.pricingEyebrow}</span>
          <h2 id="pricing-heading" className="text-balance">{t.pricingHeading}</h2>
          <p className="lead">{t.pricingIntro}</p>
        </div>
        <div className="grid stagger-children" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
          {localizedPlans.map((plan, index) => (
            <article key={plan.name} className={`card card-padded stack stack-6 plan-card ${plan.highlight ? 'plan-card-featured' : ''}`} style={{ '--i': index } as CSSProperties}>
              <span className="badge badge-neutral">{t.examplePlan}</span>
              <div className="stack stack-2">
                <h3 style={{ fontSize: 'var(--text-2xl)' }}>{plan.name}</h3>
                <div className="row" style={{ alignItems: 'baseline', gap: 'var(--space-1)' }}><span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-4xl)', fontWeight: 700, letterSpacing: 'var(--tracking-tight)' }}>0</span></div>
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
