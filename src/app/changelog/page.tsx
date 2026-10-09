'use client';

import { useMarketingLocale } from '@/components/marketing/MarketingLocaleProvider';
import { SiteFooter } from '@/components/marketing/SiteFooter';
import { SiteHeader } from '@/components/marketing/SiteHeader';

const ENTRIES = [
  { date: '8 May 2026', version: 'v0.1.0', category: 'feature', enTitle: 'Private beta launch · v0.1.0', enBody: 'AI Receptionist Pro enters private beta with WhatsApp, voice, Google Calendar, Stripe billing and electronic invoicing.', trTitle: 'Özel beta sürümü · v0.1.0', trBody: 'AI Receptionist Pro; WhatsApp, sesli iletişim, Google Takvim, Stripe faturalandırma ve elektronik fatura desteğiyle özel beta aşamasına geçti.' },
  { date: '5 May 2026', version: '—', category: 'security', enTitle: 'CSP nonce and GDPR data rights', enBody: 'Security hardening, request-specific CSP nonces, GDPR data export and deletion endpoints, and rate limiting for sensitive endpoints.', trTitle: 'CSP nonce ve GDPR veri hakları', trBody: 'Güvenlik iyileştirmeleri, isteğe özel CSP nonce değerleri, GDPR veri dışa aktarma ve silme uç noktaları, hassas uç noktalar için istek sınırlandırma.' },
  { date: '2 May 2026', version: '—', category: 'improvement', enTitle: 'Strict TypeScript tooling', enBody: 'ESLint, Prettier, pre-commit checks and safer Stripe webhook typing.', trTitle: 'Katı TypeScript araçları', trBody: 'ESLint, Prettier, commit öncesi kontroller ve daha güvenli Stripe webhook tür tanımları.' },
  { date: '27 April 2026', version: '—', category: 'feature', enTitle: 'AI booking extractor v1', enBody: 'Structured extraction of intent, service, date, time and urgency from WhatsApp conversations.', trTitle: 'Yapay zekâ randevu ayrıştırıcısı v1', trBody: 'WhatsApp görüşmelerinden niyet, hizmet, tarih, saat ve aciliyet bilgilerinin yapılandırılmış biçimde çıkarılması.' },
  { date: '24 April 2026', version: '—', category: 'feature', enTitle: 'Backend MVP foundation', enBody: 'Initial Next.js and Supabase setup with row-level security, multi-tenant authentication and verified webhooks.', trTitle: 'Arka uç MVP altyapısı', trBody: 'Satır düzeyinde güvenlik, çok kiracılı kimlik doğrulama ve doğrulanan webhook işlemleriyle ilk Next.js ve Supabase kurulumu.' },
] as const;

const BADGES = {
 en: { feature: 'New', improvement: 'Improvement', fix: 'Fix', security: 'Security' },
 tr: { feature: 'Yeni', improvement: 'İyileştirme', fix: 'Düzeltme', security: 'Güvenlik' },
} as const;
const BADGE_CLASSES: Record<string, string> = { feature: 'badge', improvement: 'badge-warm', fix: 'badge-success', security: 'badge-danger' };
const DATES_TR: Record<string, string> = { '8 May 2026': '8 Mayıs 2026', '5 May 2026': '5 Mayıs 2026', '2 May 2026': '2 Mayıs 2026', '27 April 2026': '27 Nisan 2026', '24 April 2026': '24 Nisan 2026' };

export default function ChangelogPage() {
 const { language } = useMarketingLocale();
 const tr = language === 'tr';
 const badgeCopy = tr ? BADGES.tr : BADGES.en;
 return (
  <>
   <SiteHeader />
   <main id="main">
    <section className="section">
     <div className="container-narrow">
      <div className="stack stack-4" style={{ marginBottom: 'var(--space-12)' }}>
       <span className="eyebrow">Changelog</span>
       <h1 className="display text-balance">{tr ? 'Neler değişti?' : 'What changed?'}</h1>
       <p className="lead text-pretty">{tr ? 'Yeni özellikler, iyileştirmeler ve düzeltmeler.' : 'New features, improvements and fixes.'}</p>
      </div>
      <ol className="stack stack-8" style={{ listStyle: 'none', padding: 0 }}>
       {ENTRIES.map((entry) => (
        <li key={entry.date + entry.version} style={{ borderLeft: '2px solid var(--color-border)', paddingLeft: 'var(--space-6)', position: 'relative' }}>
         <span aria-hidden="true" style={{ position: 'absolute', left: '-8px', top: '6px', width: '14px', height: '14px', borderRadius: '50%', background: 'var(--color-accent)', border: '3px solid var(--color-bg)' }} />
         <div className="row" style={{ gap: 'var(--space-3)', marginBottom: 'var(--space-2)' }}>
          <span className="muted mono" style={{ fontSize: 'var(--text-xs)' }}>{tr ? DATES_TR[entry.date] : entry.date}</span>
          {entry.version !== '—' ? <span className="badge badge-neutral">{entry.version}</span> : null}
          <span className={`badge ${BADGE_CLASSES[entry.category] ?? 'badge'}`}>{badgeCopy[entry.category as keyof typeof badgeCopy] ?? (tr ? 'Güncelleme' : 'Update')}</span>
         </div>
         <h2 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-2)' }}>{tr ? entry.trTitle : entry.enTitle}</h2>
         <p style={{ color: 'var(--color-text-secondary)' }}>{tr ? entry.trBody : entry.enBody}</p>
        </li>
       ))}
      </ol>
      <div className="card text-center" style={{ marginTop: 'var(--space-12)', background: 'var(--color-accent-soft)', borderColor: 'oklch(85% 0.05 175)' }}>
       <p style={{ fontSize: 'var(--text-sm)' }}><strong>{tr ? 'RSS akışına abone olun' : 'Subscribe to the RSS feed'}</strong> {tr ? 'otomatik güncellemeler için' : 'for automatic updates'}: <a href="/changelog/feed.xml" className="btn-link">/changelog/feed.xml</a></p>
      </div>
     </div>
    </section>
   </main>
   <SiteFooter />
  </>
 );
}
