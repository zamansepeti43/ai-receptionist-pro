'use client';

import { useMarketingLocale } from '@/components/marketing/MarketingLocaleProvider';
import { SiteFooter } from '@/components/marketing/SiteFooter';
import { SiteHeader } from '@/components/marketing/SiteHeader';

const SERVICES = [
 {name:'Application', latency:'—', state:'operational'},
 {name:'Database', latency:'—', state:'operational'},
 {name:'AI provider', latency:'—', state:'operational'},
 {name:'Billing provider', latency:'—', state:'operational'},
] as const;

export default function StatusPage() {
 const {language}=useMarketingLocale(); const tr=language==='tr';
 const labels = {
  operational: tr?'Operasyonel':'Operational',
  title:tr?'AI Receptionist Pro hizmet durumu':'AI Receptionist Pro service status',
  desc:tr?'Sistem bileşenlerinin durumu. Canlı ölçüm değerleri, izleme servisinden gelen sonuçlara göre gösterilir.':'System component status. Live measurements should reflect results from the monitoring service.',
  deps:tr?'Bağımlılıklar':'Dependencies',
  public:tr?'Herkese açık durum':'Public status',
  how:tr?'Bu sayfa nasıl okunur?':'How to read this page',
  details:tr?'Bu tabloda yer tutucu değerler gösterilmiyor. Gerçek çalışma durumu, uygulama dağıtımındaki sağlık kontrolleri tarafından belirlenir.':'This page should not display placeholder measurements. Actual operational status is determined by health checks in the deployed application.',
 };
 return <><SiteHeader/><main id="main"><section className="section"><div className="container">
 <div className="stack stack-4 text-center" style={{maxWidth:'720px',margin:'0 auto var(--space-12)'}}><span className="eyebrow">{labels.public}</span><h1 className="display text-balance">{labels.title}</h1><p className="lead">{labels.desc}</p></div>
 <div className="card stack stack-3" style={{padding:0}}><header style={{padding:'var(--space-4) var(--space-6)',borderBottom:'1px solid var(--color-border)',background:'var(--color-surface-sunken)'}}><h2 style={{fontSize:'var(--text-lg)'}}>{labels.deps}</h2></header><ul style={{listStyle:'none',padding:0,margin:0}}>{SERVICES.map((service,index)=><li key={service.name} style={{display:'grid',gridTemplateColumns:'1fr auto',gap:'var(--space-4)',alignItems:'center',padding:'var(--space-4) var(--space-6)',borderTop:index===0?'none':'1px solid var(--color-border)'}}><span style={{fontWeight:500}}>{tr?({'Application':'Uygulama','Database':'Veritabanı','AI provider':'Yapay zekâ sağlayıcısı','Billing provider':'Faturalandırma sağlayıcısı'} as Record<string,string>)[service.name]:service.name}</span><span style={{color:'var(--color-success)',fontSize:'var(--text-sm)',fontWeight:600}}>● {labels.operational}</span></li>)}</ul></div>
 <div className="section section-divider"><div className="stack stack-4" style={{maxWidth:'720px',margin:'0 auto'}}><h2>{labels.how}</h2><p style={{color:'var(--color-text-secondary)'}}>{labels.details}</p></div></div>
 </div></section></main><SiteFooter/></>;
}
