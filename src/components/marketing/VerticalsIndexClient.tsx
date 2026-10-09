/* eslint-disable prettier/prettier */

/* eslint-disable prettier/prettier */

'use client';

import Link from 'next/link';
import { SiteFooter } from '@/components/marketing/SiteFooter';
import { SiteHeader } from '@/components/marketing/SiteHeader';
import { useMarketingLocale } from '@/components/marketing/MarketingLocaleProvider';
import { VERTICALS_DATA } from '@/app/verticali/[slug]/verticals-data';

const VERTICALS = Object.values(VERTICALS_DATA);
const TR_TITLES = ['Kuaför ve Berber', 'Güzellik ve Bakım', 'Diş ve Klinik', 'Veteriner', 'Spor Salonu ve Fitness', 'Oto Servis', 'Danışmanlık'];
const TR_BODIES = [
  'Hizmet ve süreye göre, çalışma saatleri ve isteğe bağlı personel ayarlarıyla randevu oluşturun.',
  'Bakım sorularını, hizmet sürelerini ve randevu taleplerini tek akışta yönetin.',
  'Yalnızca idari randevu ve müşteri iletişimi — tanı veya tedavi tavsiyesi yoktur.',
  'Randevu talepleri, hizmet bilgileri ve personel ilgisi gereken durumlarda insan desteğine aktarım.',
  'Danışmanlık, kişisel antrenman ve diğer rezervasyonlu hizmetleri gerçek uygunluğa göre koordine edin.',
  'Servis taleplerini süre ve kaynak farkındalığı olan yapılandırılmış randevulara dönüştürün.',
  'Görüşme taleplerini nitelendirin, onaylı SSS’leri yanıtlayın ve çakışma olmadan danışmanlık planlayın.',
];

export function VerticalsIndexClient() {
  const { language, t } = useMarketingLocale();
  const tr = language === 'tr';
  return (
    <>
      <SiteHeader />
      <main id="main">
        <section className="section" style={{ paddingTop: 'clamp(3rem, 4vw + 1rem, 5rem)', paddingBottom: 'var(--space-section)' }}>
          <div className="container">
            <div className="stack stack-4 text-center" style={{ maxWidth: '720px', margin: '0 auto var(--space-12)' }}>
              <span className="badge">{tr ? '7 sektör şablonu' : '7 sector presets'}</span>
              <h1 className="display text-balance">{tr ? 'Tek iş akışı. Her işletme için kullanışlı bir başlangıç.' : 'One core workflow. A useful starting point for each business.'}</h1>
              <p className="lead text-pretty" style={{ margin: '0 auto' }}>{tr ? 'Uygun mesajlaşma ve randevu kurallarıyla bir şablon seçin. Her işletme hizmetlerini, çalışma saatlerini, bilgi tabanını ve asistan davranışını düzenleyebilir.' : 'Choose a preset to start with sensible messaging and booking boundaries. Every business can edit its services, hours, knowledge and assistant behavior.'}</p>
            </div>
            <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
              {VERTICALS.map((v, i) => (
                <Link key={v.slug} href={`/verticali/${v.slug}`} className="card card-padded card-interactive stack stack-4" style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div className="feature-icon-tile" aria-hidden="true" style={{ fontSize: '1.5rem' }}>{v.icon}</div>
                  <h2 style={{ fontSize: 'var(--text-2xl)' }}>{tr ? (TR_TITLES[i] ?? v.title) : v.title}</h2>
                  <p style={{ color: 'var(--color-text-secondary)' }}>{tr ? (TR_BODIES[i] ?? v.hero.body) : v.hero.body}</p>
                  <span className="row plan-card-actions" style={{ gap: 'var(--space-2)', color: 'var(--color-accent-fg)', fontSize: 'var(--text-sm)', fontWeight: 600 }}>{t.explore} <span aria-hidden="true">→</span></span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
