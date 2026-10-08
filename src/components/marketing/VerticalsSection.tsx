'use client';

import Link from 'next/link';
import type { CSSProperties } from 'react';
import { useMarketingCopy } from './LanguageSelector';

export function VerticalsSection() {
  const { copy } = useMarketingCopy();
  const verticals = ['Salon & Barber','Beauty & Wellness','Dental & Clinic','Veterinary','Gym & Fitness','Auto Service','Consulting'].map((title,index)=>({
    slug:['salon','beauty','dental','veterinary','fitness','auto-service','consulting'][index],
    title: copy.sectorTitles[index],
    body: copy.sectorBodies[index],
    icon:['✂️','✨','🦷','🐾','🏋️','🚗','💼'][index],
  }));
  return (
    <section className="section section-divider" aria-labelledby="verticals-heading">
      <div className="container stack stack-12">
        <div className="stack stack-4" style={{ maxWidth: '52ch' }}>
          <span className="eyebrow">{copy.sectorPresets}</span>
          <h2 id="verticals-heading" className="text-balance">{copy.sectorHeading}</h2>
          <p className="lead">{copy.sectorIntro}</p>
        </div>
        <div className="feature-grid stagger-children">
          {verticals.map((v,index)=>(
            <Link key={v.slug} href={`/verticali/${v.slug}`} className="card card-interactive stack stack-4 vertical-card" style={{textDecoration:'none',color:'inherit','--i':index} as CSSProperties}>
              <div style={{display:'flex',alignItems:'center',gap:'var(--space-3)'}}>
                <div className="vertical-icon-tile feature-icon-tile" aria-hidden="true" style={{fontSize:'1.35rem'}}>{v.icon}</div>
                <h3 style={{fontSize:'var(--text-lg)',margin:0}}>{v.title}</h3>
              </div>
              <p style={{color:'var(--color-text-secondary)'}}>{v.body}</p>
              <span className="row plan-card-actions" style={{gap:'var(--space-2)',color:'var(--color-accent-fg)',fontSize:'var(--text-sm)',fontWeight:600}}>
                {copy.explore} <span aria-hidden="true">→</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
