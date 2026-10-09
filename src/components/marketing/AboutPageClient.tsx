'use client';

import Link from 'next/link';
import { useMarketingLocale } from './MarketingLocaleProvider';
import { SiteFooter } from './SiteFooter';
import { SiteHeader } from './SiteHeader';

const COPY = {
  tr: {
    badge: 'Hakkımızda',
    heading: 'Gerçek resepsiyonları yönetmiş bir ekip tarafından geliştirildi.',
    intro: 'AI Receptionist Pro, işletmelerin telefon ve mesaj trafiğini azaltıp insanlara önemli işlere daha fazla zaman bırakmak için geliştiriliyor. İşletmelerin başka bir sohbet robotuna değil; talepleri anlayan, gerçek randevular oluşturan ve zaman kazandıran bir asistana ihtiyacı var.',
    story: 'Hikâyemiz',
    p1: 'Bir işletmeyi yöneten herkes aynı sorunu bilir: yanıt verecek kimse yokken gelen aramalar ve mesajlar. Mesai dışında, öğle arasında veya bir müşteriyle ilgilenirken gelen talepler yanıtsız kalabilir. Telesekreter mesaj kaydeder; randevuyu tamamlamaz.',
    p2: 'AI Receptionist Pro bu boşluğu kapatmak için tasarlanıyor: WhatsApp üzerinden konuşan, takvimdeki gerçek uygunluğu kontrol eden ve randevu oluşturan bir asistan. MIT lisanslı açık kaynak yaklaşımı işletmelere sistemi inceleme ve uyarlama olanağı verir.',
    values: 'Değerlerimiz', team: 'Ekip', founder: 'Kurucu ve CEO',
    bio: 'Klinikler, spor salonları ve profesyonel işletmelerde 12 yıllık deneyime sahip performans pazarlamacısı ve geliştirici.',
    talk: 'Bizimle görüşmek ister misiniz?', city: 'Roma, İtalya', contact: 'İletişim', privacy: 'Gizlilik politikası',
    sales: 'Satış ve iş ortaklıkları', support: 'Teknik destek', dpo: 'Veri koruma sorumlusu',
    valuesList: [
      ['Tasarım gereği gizlilik', 'AB barındırma, kişisel verilerin otomatik olarak gizlenmesi ve veri işleme sözleşmesi. Uyumluluk temel ilkedir.'],
      ['Faydalı yapay zekâ', 'Asistan işletme bağlamını anlar ve gerektiğinde bir kişiye aktarır.'],
      ['Şeffaf fiyatlandırma', 'Gizli ek satışlar yok. Ne ödediğinizi ve ne kazandığınızı bilin.'],
      ['Gerçek ihtiyaçlardan doğdu', 'Özellikler gerçek müşterilerin ihtiyaçlarından doğar.'],
    ],
  },
  en: {
    badge: 'About us',
    heading: 'Built by people who have managed real receptions.',
    intro: 'AI Receptionist Pro is being built to reduce the phone and message burden on businesses, giving people more time for work that matters. Businesses need more than another chatbot: they need an assistant that understands requests, books real appointments and gives time back.',
    story: 'Our story',
    p1: 'Anyone who has managed a practice knows the problem: calls and messages arrive when nobody is available to answer. After hours, during lunch or while helping another customer, requests can go unanswered. A traditional answering machine records a message but does not complete the booking.',
    p2: 'AI Receptionist Pro is designed to close that gap: an assistant that talks with customers over WhatsApp, checks real calendar availability and creates appointments. Its open-source MIT license lets businesses inspect and adapt the system.',
    values: 'Our values', team: 'The team', founder: 'Founder & CEO',
    bio: 'Performance marketer and developer with 12 years of experience across clinics, gyms and professional practices.',
    talk: 'Would you like to talk to us?', city: 'Rome, Italy', contact: 'Contact us', privacy: 'Privacy policy',
    sales: 'Sales & partnerships', support: 'Technical support', dpo: 'Data protection officer',
    valuesList: [
      ['Privacy by design', 'EU hosting, automatic personal-data redaction and a data processing agreement. Compliance is a foundation.'],
      ['Useful AI', 'The assistant understands business context and hands over to a person when needed.'],
      ['Transparent pricing', 'No hidden upsells. Know what you pay and what value you receive.'],
      ['Built from real needs', 'Features start with real customer needs.'],
    ],
  },
} as const;

export function AboutPageClient() {
  const { language } = useMarketingLocale();
  const c = COPY[language === 'tr' ? 'tr' : 'en'];
  return (
    <>
      <SiteHeader />
      <main id="main">
        <section className="section">
          <div className="container-narrow stack stack-12">
            <header className="stack stack-4">
              <span className="badge">{c.badge}</span>
              <h1 className="display text-balance">{c.heading}</h1>
              <p className="lead text-pretty">{c.intro}</p>
            </header>
            <section className="stack stack-6">
              <h2>{c.story}</h2>
              <p>{c.p1}</p>
              <p>{c.p2}</p>
            </section>
            <section className="stack stack-6">
              <h2>{c.values}</h2>
              <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
                {c.valuesList.map(([title, body]) => (
                  <article key={title} className="card stack stack-3">
                    <h3 style={{ fontSize: 'var(--text-lg)' }}>{title}</h3>
                    <p style={{ color: 'var(--color-text-secondary)' }}>{body}</p>
                  </article>
                ))}
              </div>
            </section>
            <section className="stack stack-6">
              <h2>{c.team}</h2>
              <article className="card card-padded stack stack-3">
                <span className="eyebrow">{c.founder}</span>
                <h3 style={{ fontSize: 'var(--text-2xl)' }}>Christian Calabrò</h3>
                <p style={{ color: 'var(--color-text-secondary)' }}>{c.bio}</p>
                <div className="row" style={{ gap: 'var(--space-3)' }}>
                  <a href="https://linkedin.com/in/christian-calabro" rel="noopener noreferrer me" target="_blank" className="btn-link">LinkedIn</a>
                  <a href="https://twitter.com/ambrogio_ai" rel="noopener noreferrer me" target="_blank" className="btn-link">Twitter / X</a>
                </div>
              </article>
            </section>
            <section className="stack stack-4">
              <h2>{c.talk}</h2>
              <address className="card stack stack-2" style={{ fontStyle: 'normal', background: 'var(--color-surface-sunken)' }}>
                <p><strong>AI Receptionist Pro</strong><br />{c.city}</p>
                <p><a href="mailto:hello@ambrogio.ai" className="btn-link">hello@ambrogio.ai</a> · {c.sales}</p>
                <p><a href="mailto:support@ambrogio.ai" className="btn-link">support@ambrogio.ai</a> · {c.support}</p>
                <p><a href="mailto:dpo@ambrogio.ai" className="btn-link">dpo@ambrogio.ai</a> · {c.dpo}</p>
              </address>
              <div className="row" style={{ gap: 'var(--space-3)' }}>
                <Link href="/contact" className="btn btn-primary">{c.contact}</Link>
                <Link href="/legal/privacy" className="btn btn-secondary">{c.privacy}</Link>
              </div>
            </section>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
