'use client';

import type { Metadata } from 'next';
import Link from 'next/link';

import {
  buildBreadcrumbSchema,
  buildCollectionPageSchema,
  JsonLd,
} from '@/components/marketing/JsonLd';
import { SiteFooter } from '@/components/marketing/SiteFooter';
import { SiteHeader } from '@/components/marketing/SiteHeader';
import { useMarketingLocale } from '@/components/marketing/MarketingLocaleProvider';

export const metadata: Metadata = {
  title: 'Help Center — AI Receptionist Pro',
  description:
    'Step-by-step guides, FAQs and direct support for WhatsApp setup, Google Calendar, billing and privacy.',
  alternates: { canonical: '/help' },
  openGraph: {
    title: 'Help Center — AI Receptionist Pro',
    description: 'Practical guides, FAQs and direct support.',
    url: '/help',
    type: 'website',
    locale: 'en_US',
  },
};

interface HelpItem { label: string; slug: string; }
interface HelpTopic { title: string; items: ReadonlyArray<HelpItem>; }

const TOPICS_EN: ReadonlyArray<HelpTopic> = [
  { title: 'Setup and onboarding', items: [
    { label: 'Connect a WhatsApp Business number', slug: 'come-collegare-il-numero-whatsapp-business' },
    { label: 'Authorize Google Calendar', slug: 'come-autorizzare-google-calendar' },
    { label: 'Upload your service list', slug: 'caricare-il-listino-servizi' },
    { label: 'Configure opening hours', slug: 'configurare-gli-orari-di-apertura' },
  ]},
  { title: 'Conversations', items: [
    { label: 'How the AI filter works', slug: 'come-funziona-il-filtro-ai' },
    { label: 'When a human takes over', slug: 'quando-interviene-un-umano' },
    { label: 'Manage voice messages and media', slug: 'gestire-vocali-e-media' },
    { label: 'Manage quick replies', slug: 'risposte-rapide-preconfezionate' },
  ]},
  { title: 'Calendar and bookings', items: [
    { label: 'How the assistant books appointments', slug: 'come-ambrogio-prenota-appuntamenti' },
    { label: 'Manage calendar conflicts', slug: 'gestire-conflitti-calendario' },
    { label: 'Automatic reminders', slug: 'reminder-automatici' },
    { label: 'Manage cancellations', slug: 'gestire-le-disdette' },
  ]},
  { title: 'Account and billing', items: [
    { label: 'Change your plan', slug: 'cambiare-piano' },
    { label: 'Download electronic invoices', slug: 'scaricare-fatture-elettroniche-sdi' },
    { label: 'Update VAT details', slug: 'aggiornare-dati-piva' },
    { label: 'Export my data (GDPR)', slug: 'esportare-i-miei-dati-gdpr' },
    { label: 'Delete your account', slug: 'cancellare-account' },
  ]},
];

const TOPICS_TR: ReadonlyArray<HelpTopic> = [
  { title: 'Kurulum ve başlangıç', items: [
    { label: 'WhatsApp Business numarasını bağlama', slug: 'come-collegare-il-numero-whatsapp-business' },
    { label: 'Google Takvim yetkilendirmesi', slug: 'come-autorizzare-google-calendar' },
    { label: 'Hizmet listesini yükleme', slug: 'caricare-il-listino-servizi' },
    { label: 'Çalışma saatlerini yapılandırma', slug: 'configurare-gli-orari-di-apertura' },
  ]},
  { title: 'Görüşmeler', items: [
    { label: 'Yapay zekâ filtresi nasıl çalışır?', slug: 'come-funziona-il-filtro-ai' },
    { label: 'İnsan desteği ne zaman devreye girer?', slug: 'quando-interviene-un-umano' },
    { label: 'Sesli mesajları ve medyayı yönetme', slug: 'gestire-vocali-e-media' },
    { label: 'Hızlı yanıtları yönetme', slug: 'risposte-rapide-preconfezionate' },
  ]},
  { title: 'Takvim ve randevular', items: [
    { label: 'Asistan nasıl randevu oluşturur?', slug: 'come-ambrogio-prenota-appuntamenti' },
    { label: 'Takvim çakışmalarını yönetme', slug: 'gestire-conflitti-calendario' },
    { label: 'Otomatik hatırlatmalar', slug: 'reminder-automatici' },
    { label: 'İptalleri yönetme', slug: 'gestire-le-disdette' },
  ]},
  { title: 'Hesap ve faturalandırma', items: [
    { label: 'Planı değiştirme', slug: 'cambiare-piano' },
    { label: 'Elektronik faturaları indirme', slug: 'scaricare-fatture-elettroniche-sdi' },
    { label: 'Vergi bilgilerini güncelleme', slug: 'aggiornare-dati-piva' },
    { label: 'Verilerimi dışa aktarma (GDPR)', slug: 'esportare-i-miei-dati-gdpr' },
    { label: 'Hesabı silme', slug: 'cancellare-account' },
  ]},
];

export default function HelpPage() {
  const { language } = useMarketingLocale();
  const isTurkish = language === 'tr';
  const topics = isTurkish ? TOPICS_TR : TOPICS_EN;
  const allItems = topics.flatMap((topic) => topic.items);
  const heading = isTurkish ? 'Size nasıl yardımcı olabiliriz?' : 'How can we help?';
  const description = isTurkish
    ? 'Kılavuzlar, sık sorulan sorular ve doğrudan destek. Başlangıç planında 4 iş saati, Profesyonel planda 1 saat, Ajans planında anında yanıt.'
    : 'Guides, FAQs and direct support. Response within 4 business hours for Starter, 1 hour for Professional, and immediately for Agency.';

  return (
    <>
      <JsonLd data={buildBreadcrumbSchema([
        { name: isTurkish ? 'Ana sayfa' : 'Home', url: '/' },
        { name: isTurkish ? 'Yardım merkezi' : 'Help Center', url: '/help' },
      ])} />
      <JsonLd data={buildCollectionPageSchema({
        name: isTurkish ? 'AI Receptionist Pro yardım merkezi' : 'AI Receptionist Pro Help Center',
        description,
        url: '/help',
        hasPart: allItems.map((item) => ({ name: item.label, url: `/help/articles/${item.slug}` })),
      })} />
      <SiteHeader />
      <main id="main">
        <section className="section">
          <div className="container">
            <div className="stack stack-4 text-center" style={{ maxWidth: '720px', margin: '0 auto var(--space-12)' }}>
              <span className="badge">{isTurkish ? 'Yardım merkezi' : 'Help center'}</span>
              <h1 className="display text-balance">{heading}</h1>
              <p className="lead text-pretty" style={{ margin: '0 auto' }}>{description}</p>
              <div className="row" style={{ justifyContent: 'center', gap: 'var(--space-3)' }}>
                <label htmlFor="help-search" className="sr-only">
                  {isTurkish ? 'Yardım merkezinde ara' : 'Search the help center'}
                </label>
                <input
                  id="help-search"
                  type="search"
                  placeholder={isTurkish ? 'Kılavuz veya soru ara' : 'Search for a guide or question'}
                  className="input"
                  style={{ maxWidth: '420px' }}
                />
                <button type="button" className="btn btn-primary">
                  {isTurkish ? 'Ara' : 'Search'}
                </button>
              </div>
            </div>

            <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
              {topics.map((topic) => (
                <article key={topic.title} className="card stack stack-4">
                  <h2 style={{ fontSize: 'var(--text-xl)' }}>{topic.title}</h2>
                  <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                    {topic.items.map((item) => (
                      <li key={item.slug}>
                        <Link href={`/help/articles/${item.slug}`} className="btn-link" style={{ fontSize: 'var(--text-sm)' }}>
                          → {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-divider" style={{ background: 'var(--color-surface-sunken)' }}>
          <div className="container">
            <div className="stack stack-6 text-center" style={{ maxWidth: '640px', margin: '0 auto' }}>
              <h2>{isTurkish ? 'Aradığınızı bulamadınız mı?' : "Didn't find what you were looking for?"}</h2>
              <p className="muted text-pretty">
                {isTurkish ? 'Bizimle doğrudan iletişime geçin. 4 iş saati içinde yanıt veririz.' : 'Contact us directly. We respond within 4 business hours.'}
              </p>
              <div className="row" style={{ justifyContent: 'center', gap: 'var(--space-3)' }}>
                <Link href="/contact" className="btn btn-primary btn-lg">{isTurkish ? 'Destek talebi oluştur' : 'Open a ticket'}</Link>
                <Link href="/status" className="btn btn-secondary btn-lg">{isTurkish ? 'Hizmet durumu' : 'Service status'}</Link>
              </div>
              <p className="muted" style={{ fontSize: 'var(--text-sm)' }}>
                {isTurkish ? 'Doğrudan e-posta: ' : 'Direct email: '}
                <a href="mailto:support@ambrogio.ai" className="btn-link">support@ambrogio.ai</a>
              </p>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
