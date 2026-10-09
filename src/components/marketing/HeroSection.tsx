'use client';

import Link from 'next/link';
import { PRODUCT_IDENTITY } from '@/config/product-identity';
import { useMarketingLocale } from './MarketingLocaleProvider';

export function HeroSection() {
  const { language } = useMarketingLocale();
  const tr = language === 'tr';
  const c = tr ? {
    eyebrow:'7/24 yapay zekâ resepsiyonu · Öncelik WhatsApp',
    heading:'Resepsiyonunuz hep açık.',
    body:'{name}, müşteri sorularını yanıtlar, gerçek uygunluğu kontrol eder, randevu oluşturur, değişiklikleri onaylar ve otomasyonun durması gerektiğinde görüşmeyi bir kişiye aktarır.',
    start:'Kuruluma başlayın', how:'Nasıl çalıştığını görün',
    stats:['Müşteri mesajlarını karşılama','Sektör şablonu','İnsan desteğine aktarım'],
    preview:'Resepsiyon iş akışı önizlemesi', journey:'Müşteri yolculuğu', customer:'Müşteri', online:'Çevrimiçi',
    request:'Yarın saat 17.00’den sonra saç kesimi için randevu istiyorum.',
    assistant:'Yapay zekâ resepsiyonu', checking:'Kontrol ediyor',
    checks:'Çalışma saatlerini, hizmet süresini, takvim çakışmalarını ve uygun saatleri kontrol eder.',
    booking:'Randevu', confirmed:'Onaylandı', confirmation:'Randevu oluşturuldu; müşteriye onay mesajı gönderilecek.'
  } : {
    eyebrow:'24/7 AI receptionist · WhatsApp first',
    heading:'Your front desk, always on.',
    body:'{name} answers customer questions, checks real availability, books appointments, confirms changes, and hands conversations to a person when automation should stop.',
    start:'Start your setup', how:'See how it works',
    stats:['Customer coverage','Sector presets','Human handoff'],
    preview:'Reception workflow preview', journey:'Customer journey', customer:'Customer', online:'Online',
    request:'I need a haircut tomorrow after 5.',
    assistant:'AI Receptionist', checking:'Checking',
    checks:'Checks business hours, service duration, calendar conflicts and available slots.',
    booking:'Booking', confirmed:'Confirmed', confirmation:'Appointment created and confirmation queued for the customer.'
  };
  const body = c.body.replace('{name}', PRODUCT_IDENTITY.name);
  return (
    <section className="hero" aria-labelledby="hero-heading">
      <div className="container hero-grid">
        <div className="stack stack-6 animate-fade-up">
          <span className="hero-eyebrow">{c.eyebrow}</span>
          <h1 id="hero-heading" className="display text-balance">{c.heading}</h1>
          <p className="lead text-pretty">{body}</p>
          <div className="row" style={{gap:'var(--space-3)',marginTop:'var(--space-2)'}}>
            <Link href="/register" className="btn btn-primary btn-lg">{c.start} <span aria-hidden="true">→</span></Link>
            <Link href="/#how-it-works" className="btn btn-secondary btn-lg">{c.how}</Link>
          </div>
          <div className="row" style={{gap:'var(--space-8)',marginTop:'var(--space-6)',paddingTop:'var(--space-6)',borderTop:'1px solid var(--color-border)'}}>
            <div className="stat"><span className="stat-value">24/7</span><span className="stat-label">{c.stats[0]}</span></div>
            <div className="stat"><span className="stat-value">7</span><span className="stat-label">{c.stats[1]}</span></div>
            <div className="stat"><span className="stat-value">AI</span><span className="stat-label">{c.stats[2]}</span></div>
          </div>
        </div>
        <div className="card card-padded stack stack-4" aria-label={c.preview}>
          <div className="stack stack-3"><span className="eyebrow">{c.journey}</span><div className="row-between"><strong>{c.customer}</strong><span className="badge badge-success">{c.online}</span></div><p className="muted">“{c.request}”</p></div>
          <div className="stack stack-3"><div className="row-between"><strong>{c.assistant}</strong><span className="badge badge-neutral">{c.checking}</span></div><p className="muted">{c.checks}</p></div>
          <div className="stack stack-3"><div className="row-between"><strong>{c.booking}</strong><span className="badge badge-success">{c.confirmed}</span></div><p className="muted">{c.confirmation}</p></div>
        </div>
      </div>
    </section>
  );
}
