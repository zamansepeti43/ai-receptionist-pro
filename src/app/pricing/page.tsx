'use client';

import type { Metadata } from 'next';
import Link from 'next/link';

import {
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildSpeakableSchema,
  JsonLd,
} from '@/components/marketing/JsonLd';
import { PricingTeaser } from '@/components/marketing/PricingTeaser';
import { SiteFooter } from '@/components/marketing/SiteFooter';
import { SiteHeader } from '@/components/marketing/SiteHeader';
import { useMarketingLocale } from '@/components/marketing/MarketingLocaleProvider';

export const metadata: Metadata = {
  title: 'Pricing — AI Receptionist Pro',
  description:
    'Example SaaS pricing models for AI Receptionist Pro. Configure plans, limits and billing rules before launch.',
  openGraph: {
    title: 'Pricing — AI Receptionist Pro',
    description: 'Example SaaS pricing models for the AI Receptionist Pro application.',
    url: '/pricing',
    locale: 'en_US',
    type: 'website',
  },
  alternates: { canonical: '/pricing' },
};

const FAQ_EN = [
  { q: 'Are the prices shown here real commercial prices?', a: 'No. The displayed 0 values are placeholders for example configurations. The actual commercial plans, limits and prices must be configured before launch.' },
  { q: 'Can I change the plan structure?', a: 'Yes. The pricing layer is part of the application and is intended to be adapted before launch.' },
  { q: 'Do customers need their own provider accounts?', a: 'Yes. The deployment is designed around buyer-owned accounts and credentials for supported providers.' },
  { q: 'Can I use a different calendar provider?', a: 'The launch workflow is centered on Google Calendar. Additional providers can be added as a product extension.' },
  { q: 'Is the application white-label?', a: 'Yes. The product layer provides configurable business identity and branding controls.' },
  { q: 'Does the AI make medical decisions?', a: 'No. Healthcare-oriented presets are for administrative scheduling and customer communication, not diagnosis or treatment advice.' },
  { q: 'What happens when automation should stop?', a: 'Configured guardrails and explicit requests for a person can trigger human handoff while preserving conversation context.' },
] as const;

const FAQ_TR = [
  { q: 'Buradaki fiyatlar gerçek ticari fiyatlar mı?', a: 'Hayır. Gösterilen 0 değerleri örnek yapılandırmalar için yer tutucudur. Yayına almadan önce gerçek ticari planlar, limitler ve fiyatlar belirlenmelidir.' },
  { q: 'Plan yapısını değiştirebilir miyim?', a: 'Evet. Fiyatlandırma katmanı uygulamanın bir parçasıdır ve yayına alınmadan önce ihtiyaca göre uyarlanmalıdır.' },
  { q: 'Müşterilerin kendi sağlayıcı hesapları gerekli mi?', a: 'Evet. Uygulama, desteklenen sağlayıcılar için müşterinin sahip olduğu hesaplar ve erişim bilgileriyle çalışacak şekilde tasarlanmıştır.' },
  { q: 'Farklı bir takvim sağlayıcısı kullanabilir miyim?', a: 'Mevcut başlangıç akışı Google Takvim üzerine kuruludur. Ürüne ek geliştirmeyle başka sağlayıcılar da eklenebilir.' },
  { q: 'Uygulama beyaz etiket kullanımını destekliyor mu?', a: 'Evet. Ürün katmanı, işletme kimliğinin ve markasının yapılandırılmasını sağlar.' },
  { q: 'Yapay zekâ tıbbi karar verir mi?', a: 'Hayır. Sağlık sektörüne yönelik şablonlar tanı veya tedavi tavsiyesi için değil, idari randevu planlama ve müşteri iletişimi içindir.' },
  { q: 'Otomasyon ne zaman durdurulur?', a: 'Tanımlı güvenlik kuralları veya kullanıcıların bir kişiyle görüşme isteği, konuşma bağlamı korunarak insan desteğine aktarımı başlatabilir.' },
] as const;

export default function PricingPage() {
  const { language } = useMarketingLocale();
  const isTurkish = language === 'tr';
  const faq = isTurkish ? FAQ_TR : FAQ_EN;

  return (
    <>
      <JsonLd data={buildFaqSchema(faq)} />
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: isTurkish ? 'Ana sayfa' : 'Home', url: '/' },
          { name: isTurkish ? 'Fiyatlandırma' : 'Pricing', url: '/pricing' },
        ])}
      />
      <JsonLd
        data={buildSpeakableSchema({
          url: '/pricing',
          cssSelector: ['#faq-heading', '[data-speakable="faq"]'],
        })}
      />
      <SiteHeader />
      <main id="main">
        <section
          className="section"
          style={{
            paddingTop: 'clamp(3rem, 4vw + 1rem, 5rem)',
            paddingBottom: 'clamp(2rem, 2vw, 3rem)',
          }}
        >
          <div
            className="container stack stack-6 text-center"
            style={{ maxWidth: '720px', margin: '0 auto' }}
          >
            <span
              className="badge"
              style={{ fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase' }}
            >
              {isTurkish ? 'ÖRNEK FİYATLANDIRMA — GERÇEK TEKLİF DEĞİLDİR' : 'EXAMPLE PRICING — NOT A LIVE OFFER'}
            </span>
            <h1 className="display text-balance">
              {isTurkish ? 'Bir başlangıç modeli seçin. Kendinize göre uyarlayın.' : 'Choose a starting model. Make it yours.'}
            </h1>
            <p className="lead text-pretty" style={{ margin: '0 auto' }}>
              {isTurkish
                ? <>Bu planlar uygulama için örnek varsayılanlardır. <strong>0</strong> değerleri yer tutucudur. Müşterilere teklif sunmadan önce gerçek fiyatları, limitleri, özellikleri ve faturalandırma kurallarını yapılandırın.</>
                : <>These plans are example defaults for the application. The <strong>0</strong> values are intentional placeholders. Configure the actual prices, limits, features and billing rules before presenting an offer to customers.</>}
            </p>
          </div>
        </section>
        <PricingTeaser />
        <section className="section section-divider" aria-labelledby="faq-heading">
          <div className="container stack stack-12">
            <div className="stack stack-3" style={{ maxWidth: '52ch' }}>
              <span className="eyebrow">FAQ</span>
              <h2 id="faq-heading">
                {isTurkish ? 'Alıcıların sık sorduğu sorular' : 'Questions buyers usually ask'}
              </h2>
            </div>
            <div
              className="grid"
              data-speakable="faq"
              style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}
            >
              {faq.map((item) => (
                <article key={item.q} className="card stack stack-3">
                  <h3 style={{ fontSize: 'var(--text-lg)' }}>{item.q}</h3>
                  <p style={{ color: 'var(--color-text-secondary)' }}>{item.a}</p>
                </article>
              ))}
            </div>
            <div
              className="card card-padded stack stack-4 text-center"
              style={{ background: 'var(--color-surface-sunken)', alignItems: 'center' }}
            >
              <h3>{isTurkish ? 'Size özel ticari yapılandırma mı gerekiyor?' : 'Need a custom commercial setup?'}</h3>
              <p className="muted" style={{ maxWidth: '50ch' }}>
                {isTurkish
                  ? 'Büyük kurulumlar, ajanslar ve özel operasyonel gereksinimler için iletişim formunu kullanın.'
                  : 'Use the contact flow for larger deployments, agencies and custom operational requirements.'}
              </p>
              <Link href="/contact?plan=custom" className="btn btn-primary">
                {isTurkish ? 'Bizimle iletişime geçin' : 'Contact us'}
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
