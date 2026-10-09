'use client';

import Link from 'next/link';
import { useMarketingLocale } from './MarketingLocaleProvider';
import { SiteFooter } from './SiteFooter';
import { SiteHeader } from './SiteHeader';

const TOPICS = {
  tr: [
    ['Kurulum ve başlangıç', ['WhatsApp Business numarasını bağlama', 'Google Takvim yetkilendirmesi', 'Hizmet listesini yükleme', 'Çalışma saatlerini yapılandırma']],
    ['Görüşmeler', ['Yapay zekâ filtresi nasıl çalışır?', 'İnsan desteği ne zaman devreye girer?', 'Sesli mesajları ve medyayı yönetme', 'Hızlı yanıtları yönetme']],
    ['Takvim ve randevular', ['Asistan nasıl randevu oluşturur?', 'Takvim çakışmalarını yönetme', 'Otomatik hatırlatmalar', 'İptalleri yönetme']],
    ['Hesap ve faturalandırma', ['Planı değiştirme', 'Elektronik faturaları indirme', 'Vergi bilgilerini güncelleme', 'Verilerimi dışa aktarma (GDPR)', 'Hesabı silme']],
  ],
  en: [
    ['Setup and onboarding', ['Connect a WhatsApp Business number', 'Authorize Google Calendar', 'Upload your service list', 'Configure opening hours']],
    ['Conversations', ['How the AI filter works', 'When a person takes over', 'Manage voice messages and media', 'Manage quick replies']],
    ['Calendar and bookings', ['How the assistant books appointments', 'Manage calendar conflicts', 'Automatic reminders', 'Manage cancellations']],
    ['Account and billing', ['Change your plan', 'Download electronic invoices', 'Update tax details', 'Export my data (GDPR)', 'Delete your account']],
  ],
} as const;
const SLUGS = [
  ['come-collegare-il-numero-whatsapp-business', 'come-autorizzare-google-calendar', 'caricare-il-listino-servizi', 'configurare-gli-orari-di-apertura'],
  ['come-funziona-il-filtro-ai', 'quando-interviene-un-umano', 'gestire-vocali-e-media', 'risposte-rapide-preconfezionate'],
  ['come-ambrogio-prenota-appuntamenti', 'gestire-conflitti-calendario', 'reminder-automatici', 'gestire-le-disdette'],
  ['cambiare-piano', 'scaricare-fatture-elettroniche-sdi', 'aggiornare-dati-piva', 'esportare-i-miei-dati-gdpr', 'cancellare-account'],
] as const;

export function HelpPageClient() {
  const { language } = useMarketingLocale();
  const tr = language === 'tr';
  const topics = tr ? TOPICS.tr : TOPICS.en;
  return (
    <>
      <SiteHeader />
      <main id="main">
        <section className="section">
          <div className="container">
            <div className="stack stack-4 text-center" style={{ maxWidth: '720px', margin: '0 auto var(--space-12)' }}>
              <span className="badge">{tr ? 'Yardım merkezi' : 'Help center'}</span>
              <h1 className="display text-balance">{tr ? 'Size nasıl yardımcı olabiliriz?' : 'How can we help?'}</h1>
              <p className="lead">{tr ? 'Kılavuzlar, sık sorulan sorular ve doğrudan destek.' : 'Guides, frequently asked questions and direct support.'}</p>
              <label htmlFor="help-search" className="sr-only">{tr ? 'Yardım merkezinde ara' : 'Search the help center'}</label>
              <input id="help-search" className="input" placeholder={tr ? 'Kılavuz veya soru ara' : 'Search for a guide or question'} />
              <button type="button" className="btn btn-primary">{tr ? 'Ara' : 'Search'}</button>
            </div>
            <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
              {topics.map((topic, groupIndex) => (
                <article key={topic[0]} className="card stack stack-4">
                  <h2>{topic[0]}</h2>
                  <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                    {topic[1].map((label, index) => (
                      <li key={label}>
                        <Link href={'/help/articles/' + (SLUGS[groupIndex]?.[index] ?? 'cancellare-account')} className="btn-link">{'→ '}{label}</Link>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
            <section className="section">
              <h2>{tr ? 'Aradığınızı bulamadınız mı?' : 'Did not find what you were looking for?'}</h2>
              <p>{tr ? 'Bizimle doğrudan iletişime geçin.' : 'Contact our team directly.'}</p>
              <Link href="/contact" className="btn btn-primary">{tr ? 'Destek talebi oluştur' : 'Open a support request'}</Link>
            </section>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
