'use client';

import Link from 'next/link';
import { useMarketingLocale } from './MarketingLocaleProvider';
import { SiteHeader } from './SiteHeader';
import { SiteFooter } from './SiteFooter';
import { ContactForm } from '@/components/forms/ContactForm';

export function ContactPageClient() {
  const { language } = useMarketingLocale();
  const tr = language === 'tr';
  const c = tr ? {
    badge:'İletişim', title:'Konuşalım.', intro:'Formu doldurun; ekibimiz bir iş günü içinde size geri dönüş yapsın. Acil talepler için',
    sales:'Satış ve iş ortaklıkları', support:'Teknik destek', privacy:'Veri koruma', company:'AI Receptionist Pro'
  } : {
    badge:'Contact', title:"Let's talk.", intro:'Fill out the form and our team will get back to you within one business day. For urgent requests, contact',
    sales:'Sales & partnerships', support:'Technical support', privacy:'Data protection', company:'AI Receptionist Pro'
  };
  return <>
    <SiteHeader />
    <main id="main"><section className="section"><div className="container">
      <div style={{display:'grid',gap:'var(--space-12)',gridTemplateColumns:'1fr',maxWidth:'960px',margin:'0 auto'}}>
        <div className="stack stack-4 text-center">
          <span className="badge">{c.badge}</span>
          <h1 className="display text-balance">{c.title}</h1>
          <p className="lead text-pretty" style={{margin:'0 auto'}}>{c.intro}{' '}<a href="mailto:hello@ambrogio.ai" className="btn-link">hello@ambrogio.ai</a>.</p>
        </div>
        <ContactForm />
        <address className="card stack stack-3" style={{fontStyle:'normal',background:'var(--color-surface-sunken)',fontSize:'var(--text-sm)',color:'var(--color-text-secondary)'}}>
          <strong style={{color:'var(--color-text)'}}>{c.company}</strong>
          <p><strong>{c.sales}:</strong> <a href="mailto:hello@ambrogio.ai" className="btn-link">hello@ambrogio.ai</a></p>
          <p><strong>{c.support}:</strong> <a href="mailto:support@ambrogio.ai" className="btn-link">support@ambrogio.ai</a></p>
          <p><strong>{c.privacy}:</strong> <a href="mailto:dpo@ambrogio.ai" className="btn-link">dpo@ambrogio.ai</a></p>
          <Link href="/legal/privacy" className="btn-link">{tr?'Gizlilik politikası':'Privacy policy'}</Link>
        </address>
      </div>
    </div></section></main>
    <SiteFooter />
  </>;
}
