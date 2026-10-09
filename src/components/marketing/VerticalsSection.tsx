'use client';

import type { CSSProperties } from 'react';
import Link from 'next/link';

import { useMarketingLocale } from './MarketingLocaleProvider';

export function VerticalsSection() {
  const { t, language } = useMarketingLocale();
  const verticals = [
    {
      slug: 'salon',
      title: 'Kuaför ve Berber',
      body: 'Hizmet ve süreye göre, çalışma saatleri ve isteğe bağlı personel ayarlarıyla randevu oluşturun.',
      icon: '✂️',
    },
    {
      slug: 'beauty',
      title: 'Güzellik ve Bakım',
      body: 'Bakım sorularını, hizmet sürelerini ve randevu taleplerini tek akışta yönetin.',
      icon: '✨',
    },
    {
      slug: 'dental',
      title: 'Diş ve Klinik',
      body: 'Yalnızca idari randevu ve müşteri iletişimi — tanı veya tedavi tavsiyesi yoktur.',
      icon: '🦷',
    },
    {
      slug: 'veterinary',
      title: 'Veteriner',
      body: 'Randevu taleplerini ve hizmet bilgilerini yönetin; gereken durumlarda insan desteğine aktarın.',
      icon: '🐾',
    },
    {
      slug: 'fitness',
      title: 'Spor Salonu ve Fitness',
      body: 'Danışmanlık, kişisel antrenman ve rezervasyonlu hizmetleri gerçek uygunluğa göre koordine edin.',
      icon: '🏋️',
    },
    {
      slug: 'auto-service',
      title: 'Oto Servis',
      body: 'Servis taleplerini süre ve kaynak farkındalığı olan randevulara dönüştürün.',
      icon: '🚗',
    },
    {
      slug: 'consulting',
      title: 'Danışmanlık',
      body: 'Görüşme taleplerini nitelendirin, onaylı soruları yanıtlayın ve danışmanlık planlayın.',
      icon: '💼',
    },
  ] as const;
  const localizedTitles =
    language === 'tr'
      ? [
          'Kuaför ve Berber',
          'Güzellik ve Bakım',
          'Diş ve Klinik',
          'Veteriner',
          'Spor Salonu ve Fitness',
          'Oto Servis',
          'Danışmanlık',
        ]
      : verticals.map((vertical) => vertical.title);
  const localizedBodies =
    language === 'tr'
      ? [
          'Hizmet ve süreye göre, çalışma saatleri ve isteğe bağlı personel ayarlarıyla randevu oluşturun.',
          'Bakım sorularını, hizmet sürelerini ve randevu taleplerini tek akışta yönetin.',
          'Yalnızca idari randevu ve müşteri iletişimi — tanı veya tedavi tavsiyesi yoktur.',
          'Randevu talepleri, hizmet bilgileri ve personel ilgisi gereken durumlarda insan desteğine aktarım.',
          'Danışmanlık, kişisel antrenman ve diğer rezervasyonlu hizmetleri gerçek uygunluğa göre koordine edin.',
          'Servis taleplerini süre ve kaynak farkındalığı olan yapılandırılmış randevulara dönüştürün.',
          'Görüşme taleplerini nitelendirin, onaylı SSS’leri yanıtlayın ve çakışma olmadan danışmanlık planlayın.',
        ]
      : verticals.map((vertical) => vertical.body);

  return (
    <section className="section section-divider" aria-labelledby="verticals-heading">
      <div className="container stack stack-12">
        <div className="stack stack-4" style={{ maxWidth: '52ch' }}>
          <span className="eyebrow">{t.sectorPresets}</span>
          <h2 id="verticals-heading" className="text-balance">
            {t.sectorHeading}
          </h2>
          <p className="lead">{t.sectorIntro}</p>
        </div>
        <div className="feature-grid stagger-children">
          {verticals.map((vertical, index) => (
            <Link
              key={vertical.slug}
              href={`/verticali/${vertical.slug}`}
              className="card card-interactive stack stack-4 vertical-card"
              style={{
                textDecoration: 'none',
                color: 'inherit',
                '--i': index,
              } as CSSProperties}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                <div
                  className="vertical-icon-tile feature-icon-tile"
                  aria-hidden="true"
                  style={{ fontSize: '1.35rem' }}
                >
                  {vertical.icon}
                </div>
                <h3 style={{ fontSize: 'var(--text-lg)', margin: 0 }}>
                  {localizedTitles[index]}
                </h3>
              </div>
              <p style={{ color: 'var(--color-text-secondary)' }}>{localizedBodies[index]}</p>
              <span
                className="row plan-card-actions"
                style={{
                  gap: 'var(--space-2)',
                  color: 'var(--color-accent-fg)',
                  fontSize: 'var(--text-sm)',
                  fontWeight: 600,
                }}
              >
                {t.explore} <span aria-hidden="true">→</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
