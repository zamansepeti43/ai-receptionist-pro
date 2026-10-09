'use client';

import Link from 'next/link';
import { useMarketingLocale } from '@/components/marketing/MarketingLocaleProvider';

interface SettingsLink { readonly href: string; readonly label: string; readonly available: boolean }
interface SettingsGroup { readonly title: string; readonly description: string; readonly links: readonly SettingsLink[] }

const GROUPS = {
 en: [
  { title:'Business', description:'Business identity, language, timezone and operating rules.', links:[
   {href:'/settings/profile',label:'Business profile',available:false},
   {href:'/settings/business-hours',label:'Business hours',available:true},
   {href:'/settings/services',label:'Services and pricing',available:true},
   {href:'/settings/team',label:'Team and operators',available:false},
  ]},
  {title:'Integrations',description:'Connect the communication and scheduling providers used by the business.',links:[
   {href:'/settings/whatsapp',label:'WhatsApp Business',available:true},
   {href:'/settings/calendar',label:'Google Calendar',available:false},
   {href:'/settings/voice',label:'Voice',available:false},
   {href:'/settings/webhooks',label:'Custom webhooks',available:false},
  ]},
  {title:'AI',description:'Assistant behavior, knowledge and escalation boundaries.',links:[
   {href:'/settings/personality',label:'Tone and personality',available:false},
   {href:'/settings/knowledge',label:'Knowledge base',available:false},
   {href:'/settings/escalation',label:'Escalation rules',available:false},
  ]},
  {title:'Account and security',description:'Plan, billing, privacy and account controls.',links:[
   {href:'/billing',label:'Plan and billing',available:true},
   {href:'/settings/security',label:'Security',available:false},
   {href:'/settings/data-export',label:'Export your data',available:false},
   {href:'/settings/danger-zone',label:'Delete account',available:false},
  ]},
 ] as const,
 tr: [
  { title:'İşletme', description:'İşletme kimliği, dil, saat dilimi ve çalışma kuralları.', links:[
   {href:'/settings/profile',label:'İşletme profili',available:false},
   {href:'/settings/business-hours',label:'Çalışma saatleri',available:true},
   {href:'/settings/services',label:'Hizmetler ve fiyatlar',available:true},
   {href:'/settings/team',label:'Ekip ve operatörler',available:false},
  ]},
  {title:'Entegrasyonlar',description:'İşletmede kullanılan iletişim ve takvim sağlayıcılarını bağlayın.',links:[
   {href:'/settings/whatsapp',label:'WhatsApp Business',available:true},
   {href:'/settings/calendar',label:'Google Takvim',available:false},
   {href:'/settings/voice',label:'Sesli iletişim',available:false},
   {href:'/settings/webhooks',label:'Özel web kancaları',available:false},
  ]},
  {title:'Yapay zekâ',description:'Asistan davranışı, bilgi tabanı ve aktarım sınırları.',links:[
   {href:'/settings/personality',label:'Üslup ve kişilik',available:false},
   {href:'/settings/knowledge',label:'Bilgi tabanı',available:false},
   {href:'/settings/escalation',label:'Aktarım kuralları',available:false},
  ]},
  {title:'Hesap ve güvenlik',description:'Plan, faturalandırma, gizlilik ve hesap kontrolleri.',links:[
   {href:'/billing',label:'Plan ve faturalandırma',available:true},
   {href:'/settings/security',label:'Güvenlik',available:false},
   {href:'/settings/data-export',label:'Verilerinizi dışa aktarın',available:false},
   {href:'/settings/danger-zone',label:'Hesabı sil',available:false},
  ]},
 ] as const,
} satisfies Record<'en'|'tr', readonly SettingsGroup[]>;

const ROW_STYLE = { padding:'var(--space-3) var(--space-4)', borderRadius:'var(--radius-md)', background:'var(--color-surface-sunken)', fontSize:'var(--text-sm)', fontWeight:500 } as const;

export default function SettingsPage(){
 const {language}=useMarketingLocale(); const tr=language==='tr'; const groups=tr?GROUPS.tr:GROUPS.en;
 return <>
  <div className="dashboard-header"><div className="stack stack-2"><span className="eyebrow">{tr?'Ayarlar':'Settings'}</span><h1>{tr?'İşletmenizi yapılandırın':'Configure the business'}</h1><p className="muted">{tr?'Resepsiyon asistanını, entegrasyonları ve işletme kurallarını yapılandırın. Yakında sunulacak özellikler yer tutucu sayfalara yönlendirmek yerine devre dışı bırakılmıştır.':'Configure the receptionist, integrations and business rules. Items marked as coming soon are disabled rather than linking to placeholders.'}</p></div></div>
  <div className="grid" style={{gridTemplateColumns:'repeat(auto-fit,minmax(320px,1fr))'}}>{groups.map(group=><section key={group.title} className="card stack stack-4"><div className="stack stack-2"><h2 style={{fontSize:'var(--text-xl)'}}>{group.title}</h2><p className="muted" style={{fontSize:'var(--text-sm)'}}>{group.description}</p></div><ul className="stack stack-2" style={{listStyle:'none',padding:0}}>{group.links.map(link=><li key={link.href}>{link.available?<Link href={link.href} className="row-between" style={{...ROW_STYLE,transition:'background var(--duration-normal) var(--ease-out)'}}><span>{link.label}</span><span aria-hidden="true">→</span></Link>:<div className="row-between" style={{...ROW_STYLE,opacity:.65}}><span className="muted">{link.label}</span><span className="badge badge-neutral">{tr?'Yakında':'Coming soon'}</span></div>}</li>)}</ul></section>)}</div>
 </>;
}
