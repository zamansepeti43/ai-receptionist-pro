'use client';

import { useMarketingLocale } from '@/components/marketing/MarketingLocaleProvider';
import { SiteFooter } from '@/components/marketing/SiteFooter';
import { SiteHeader } from '@/components/marketing/SiteHeader';

const ENTRIES = [
  { date:'8 May 2026', version:'v0.1.0', category:'feature', en:['Private beta launch · v0.1.0','AI Receptionist Pro enters private beta with WhatsApp, voice, Google Calendar, Stripe billing and electronic invoicing.'], tr:['Özel beta sürümü · v0.1.0','AI Receptionist Pro; WhatsApp, sesli iletişim, Google Takvim, Stripe faturalandırma ve elektronik fatura desteğiyle özel beta aşamasına geçti.'] },
  { date:'5 May 2026', version:'—', category:'security', en:['CSP nonce and GDPR data rights','Security hardening, request-specific CSP nonces, GDPR data export and deletion endpoints, and rate limiting for sensitive endpoints.'], tr:['CSP nonce ve GDPR veri hakları','Güvenlik iyileştirmeleri, isteğe özel CSP nonce değerleri, GDPR veri dışa aktarma ve silme uç noktaları, hassas uç noktalar için istek sınırlandırma.'] },
  { date:'2 May 2026', version:'—', category:'improvement', en:['Strict TypeScript tooling','ESLint, Prettier, pre-commit checks and safer Stripe webhook typing.'], tr:['Katı TypeScript araçları','ESLint, Prettier, commit öncesi kontroller ve daha güvenli Stripe webhook tür tanımları.'] },
  { date:'27 April 2026', version:'—', category:'feature', en:['AI booking extractor v1','Structured extraction of intent, service, date, time and urgency from WhatsApp conversations.'], tr:['Yapay zekâ randevu ayrıştırıcısı v1','WhatsApp görüşmelerinden niyet, hizmet, tarih, saat ve aciliyet bilgilerinin yapılandırılmış biçimde çıkarılması.'] },
  { date:'24 April 2026', version:'—', category:'feature', en:['Backend MVP foundation','Initial Next.js and Supabase setup with row-level security, multi-tenant authentication and verified webhooks.'], tr:['Arka uç MVP altyapısı','Satır düzeyinde güvenlik, çok kiracılı kimlik doğrulama ve doğrulanan webhook işlemleriyle ilk Next.js ve Supabase kurulumu.'] },
] as const;
const BADGE:Record<string,{label:string;className:string}> = {
  feature:{label:'New',className:'badge'}, improvement:{label:'Improvement',className:'badge-warm'}, fix:{label:'Fix',className:'badge-success'}, security:{label:'Security',className:'badge-danger'}
};
const BADGE_TR:Record<string,{label:string;className:string}> = {
  feature:{label:'Yeni',className:'badge'}, improvement:{label:'İyileştirme',className:'badge-warm'}, fix:{label:'Düzeltme',className:'badge-success'}, security:{label:'Güvenlik',className:'badge-danger'}
};
export default function ChangelogPage(){
 const {language}=useMarketingLocale(); const tr=language==='tr';
 return <><SiteHeader/><main id="main"><section className="section"><div className="container-narrow">
  <div className="stack stack-4" style={{marginBottom:'var(--space-12')}}><span className="eyebrow">Changelog</span><h1 className="display text-balance">{tr?'Neler değişti?':'What changed?'}</h1><p className="lead text-pretty">{tr?'Yeni özellikler, iyileştirmeler ve düzeltmeler.':'New features, improvements and fixes.'}</p></div>
  <ol className="stack stack-8" style={{listStyle:'none',padding:0}}>{ENTRIES.map(entry=>{const badge=(tr?BADGE_TR:BADGE)[entry.category]??BADGE.feature;const copy=tr?entry.tr:entry.en;return <li key={entry.date+entry.version} style={{borderLeft:'2px solid var(--color-border)',paddingLeft:'var(--space-6)',position:'relative'}}><span aria-hidden="true" style={{position:'absolute',left:'-8px',top:'6px',width:'14px',height:'14px',borderRadius:'50%',background:'var(--color-accent)',border:'3px solid var(--color-bg)'}}/><div className="row" style={{gap:'var(--space-3)',marginBottom:'var(--space-2)'}}><span className="muted mono" style={{fontSize:'var(--text-xs)'}}>{tr?({'8 May 2026':'8 Mayıs 2026','5 May 2026':'5 Mayıs 2026','2 May 2026':'2 Mayıs 2026','27 April 2026':'27 Nisan 2026','24 April 2026':'24 Nisan 2026'} as Record<string,string>)[entry.date]:entry.date}</span>{entry.version!=='—'&&<span className="badge badge-neutral">{entry.version}</span>}<span className={`badge ${badge.className}`}>{badge.label}</span></div><h2 style={{fontSize:'var(--text-xl)',marginBottom:'var(--space-2)'}}>{copy[0]}</h2><p style={{color:'var(--color-text-secondary)'}}>{copy[1]}</p></li>})}</ol>
  <div className="card text-center" style={{marginTop:'var(--space-12)',background:'var(--color-accent-soft)',borderColor:'oklch(85% 0.05 175)'}}><p style={{fontSize:'var(--text-sm)'}}><strong>{tr?'RSS akışına abone olun':'Subscribe to the RSS feed'}</strong> {tr?'otomatik güncellemeler için':'for automatic updates'}: <a href="/changelog/feed.xml" className="btn-link">/changelog/feed.xml</a></p></div>
 </div></section></main><SiteFooter/></>;
}
