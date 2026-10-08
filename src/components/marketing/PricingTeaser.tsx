'use client';

import Link from 'next/link';
import type { CSSProperties } from 'react';
import { useMarketingCopy } from './LanguageSelector';

export function PricingTeaser() {
  const { copy } = useMarketingCopy();
  const plans=[
    {key:'starter',name:copy.starter,body:copy.starterBody,features:copy.planFeatures.starter,cta:copy.configure,href:'/register?plan=starter',highlight:false},
    {key:'professional',name:copy.professional,body:copy.professionalBody,features:copy.planFeatures.professional,cta:copy.configure,href:'/register?plan=professional',highlight:true},
    {key:'agency',name:copy.agency,body:copy.agencyBody,features:copy.planFeatures.agency,cta:copy.discuss,href:'/contact?plan=agency',highlight:false},
  ] as const;
  return (
    <section className="section" aria-labelledby="pricing-heading">
      <div className="container stack stack-12">
        <div className="stack stack-4" style={{maxWidth:'52ch'}}>
          <span className="eyebrow" style={{fontSize:'var(--text-sm)',fontWeight:800,letterSpacing:'0.12em'}}>{copy.pricingEyebrow}</span>
          <h2 id="pricing-heading" className="text-balance">{copy.pricingHeading}</h2>
          <p className="lead">{copy.pricingIntro}</p>
        </div>
        <div className="grid stagger-children" style={{gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))'}}>
          {plans.map((plan,index)=>(
            <article key={plan.key} className={`card card-padded stack stack-6 plan-card ${plan.highlight ? 'plan-card-featured':''}`} style={{'--i':index} as CSSProperties}>
              <span className="badge badge-neutral">{copy.examplePlan}</span>
              <div className="stack stack-2">
                <h3 style={{fontSize:'var(--text-2xl)'}}>{plan.name}</h3>
                <div className="row" style={{alignItems:'baseline',gap:'var(--space-1)'}}><span style={{fontFamily:'var(--font-display)',fontSize:'var(--text-4xl)',fontWeight:700,letterSpacing:'var(--tracking-tight)'}}>0</span></div>
                <p className="muted" style={{fontSize:'var(--text-sm)'}}>{plan.body}</p>
              </div>
              <ul style={{listStyle:'none',padding:0,display:'flex',flexDirection:'column',gap:'var(--space-2)'}}>
                {plan.features.map((feature)=><li key={feature} style={{display:'flex',gap:'var(--space-2)',fontSize:'var(--text-sm)',color:'var(--color-text-secondary)'}}><span aria-hidden="true">✓</span>{feature}</li>)}
              </ul>
              <Link href={plan.href} className={`btn ${plan.highlight ? 'btn-primary':'btn-secondary'} btn-lg plan-card-actions`}>{plan.cta}</Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
