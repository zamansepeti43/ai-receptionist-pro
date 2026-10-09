'use client';

import Link from 'next/link';
import { useMarketingLocale } from '@/components/marketing/MarketingLocaleProvider';
import { SiteFooter } from '@/components/marketing/SiteFooter';
import { SiteHeader } from '@/components/marketing/SiteHeader';

const DOCS = {
  en: [
    { title: 'Quick start guides', links: [
      ['Connect a WhatsApp Business number', '/help/articles/come-collegare-il-numero-whatsapp-business'],
      ['Connect Google Calendar', '/help/articles/come-autorizzare-google-calendar'],
      ['Upload your service list', '/help/articles/caricare-il-listino-servizi'],
      ['Configure business hours', '/help/articles/configurare-gli-orari-di-apertura'],
    ]},
    { title: 'AI and booking', links: [
      ['AI filtering and classification', '/help/articles/come-funziona-il-filtro-ai'],
      ['When a person takes over', '/help/articles/quando-interviene-un-umano'],
      ['Appointment booking', '/help/articles/come-ambrogio-prenota-appuntamenti'],
      ['Automatic reminders', '/help/articles/reminder-automatici'],
    ]},
    { title: 'Account and GDPR', links: [
      ['Change your plan', '/help/articles/cambiare-piano'],
      ['Electronic invoicing', '/help/articles/scaricare-fatture-elettroniche-sdi'],
      ['Export GDPR data', '/help/articles/esportare-i-miei-dati-gdpr'],
      ['Delete your account', '/help/articles/cancellare-account'],
    ]},
  ],
  tr: [
    { title: 'Hızlı başlangıç kılavuzları', links: [
      ['WhatsApp Business numarasını bağlama', '/help/articles/come-collegare-il-numero-whatsapp-business'],
      ['Google Takvim bağlantısı', '/help/articles/come-autorizzare-google-calendar'],
      ['Hizmet listesini yükleme', '/help/articles/caricare-il-listino-servizi'],
      ['Çalışma saatlerini ayarlama', '/help/articles/configurare-gli-orari-di-apertura'],
    ]},
    { title: 'Yapay zekâ ve randevu', links: [
      ['Yapay zekâ filtreleme ve sınıflandırma', '/help/articles/come-funziona-il-filtro-ai'],
      ['İnsan desteği ne zaman devreye girer?', '/help/articles/quando-interviene-un-umano'],
      ['Randevu oluşturma', '/help/articles/come-ambrogio-prenota-appuntamenti'],
      ['Otomatik hatırlatmalar', '/help/articles/reminder-automatici'],
    ]},
    { title: 'Hesap ve GDPR', links: [
      ['Planı değiştirme', '/help/articles/cambiare-piano'],
      ['Elektronik faturalandırma', '/help/articles/scaricare-fatture-elettroniche-sdi'],
      ['GDPR verilerini dışa aktarma', '/help/articles/esportare-i-miei-dati-gdpr'],
      ['Hesabı silme', '/help/articles/cancellare-account'],
    ]},
  ],
} as const;

export default function DocsPage() {
 const {language}=useMarketingLocale();
 const tr=language==='tr';
 const sections=tr?DOCS.tr:DOCS.en;
 return <><SiteHeader/><main id="main"><section className="section"><div className="container">
   <div className="stack stack-4" style={{maxWidth:'720px',marginBottom:'var(--space-12)'}}><span className="badge">{tr?'Dokümantasyon':'Documentation'}</span><h1 className="display text-balance">{tr?'AI Receptionist Pro entegrasyonu için gerekenler.':'Everything you need to integrate AI Receptionist Pro.'}</h1><p className="lead text-pretty">{tr?'Uygulamanın nasıl çalıştığını anlamak ve işletmenizi kurmak için pratik kılavuzlar.':'Practical guides to understand the application and configure your business.'}</p></div>
   <div className="grid" style={{gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))'}}>{sections.map(section=><article key={section.title} className="card card-padded stack stack-4"><h2 style={{fontSize:'var(--text-xl)'}}>{section.title}</h2><ul style={{listStyle:'none',padding:0,display:'flex',flexDirection:'column',gap:'var(--space-2)'}}>{section.links.map(([label,href])=><li key={href}><Link href={href} className="btn-link" style={{fontSize:'var(--text-sm)'}}>→ {label}</Link></li>)}</ul></article>)}</div>
   <div className="card card-padded stack stack-4 text-center" style={{marginTop:'var(--space-12)',background:'var(--color-surface-sunken)',alignItems:'center'}}><h3>{tr?'API referansı (yakında)':'API reference (coming soon)'}</h3><p className="muted" style={{maxWidth:'50ch'}}>{tr?'Webhook, SDK ve örnekleri içeren kapsamlı API dokümantasyonu hazırlanmaktadır.':'Full API documentation with webhooks, SDKs and examples is being prepared.'}</p><div className="row" style={{gap:'var(--space-3)',flexWrap:'wrap'}}><Link href="/help" className="btn btn-secondary">{tr?'Yardım merkezi':'Help center'}</Link><Link href="/contact?topic=docs" className="btn btn-primary">{tr?'Erken erişim iste':'Request early access'}</Link></div></div>
 </div></section></main><SiteFooter/></>;
}
