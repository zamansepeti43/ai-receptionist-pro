/* eslint-disable prettier/prettier */

'use client';

import Link from 'next/link';
import { PricingTeaser } from './PricingTeaser';
import { SiteHeader } from './SiteHeader';
import { SiteFooter } from './SiteFooter';
import { useMarketingLocale } from './MarketingLocaleProvider';

const faqEn = [
  ['Are these real commercial prices?', 'No. The displayed zero values are placeholders. Configure actual plans, limits and prices before launch.'],
  ['Can I change the plan structure?', 'Yes. The pricing layer is intended to be adapted before launch.'],
  ['Do customers need their own provider accounts?', 'Yes. Supported integrations use accounts owned by the business.'],
  ['Can I use a different calendar provider?', 'The current workflow centers on Google Calendar. Others can be added later.'],
  ['Is the application white-label?', 'Yes. Business identity and branding can be configured.'],
  ['Does the AI make medical decisions?', 'No. Healthcare presets cover administrative scheduling, not diagnosis or treatment.'],
  ['When should automation stop?', 'Safety rules or a request for a person can trigger human handoff.'],
] as const;
const faqTr = [
  ['Bunlar gerçek ticari fiyatlar mı?', 'Hayır. Sıfır değerleri yer tutucudur. Yayına almadan önce gerçek planları, limitleri ve fiyatları belirleyin.'],
  ['Plan yapısını değiştirebilir miyim?', 'Evet. Fiyatlandırma yapısı yayına alınmadan önce uyarlanabilir.'],
  ['Müşterilerin kendi sağlayıcı hesapları gerekli mi?', 'Evet. Entegrasyonlar işletmenin kendi hesaplarını kullanır.'],
  ['Farklı bir takvim sağlayıcısı kullanabilir miyim?', 'Mevcut akış Google Takvim merkezlidir; sonradan başka sağlayıcılar eklenebilir.'],
  ['Uygulama beyaz etiket kullanımını destekliyor mu?', 'Evet. İşletme kimliği ve marka görünümü yapılandırılabilir.'],
  ['Yapay zekâ tıbbi karar verir mi?', 'Hayır. Sağlık şablonları tanı veya tedavi değil, idari randevu planlaması içindir.'],
  ['Otomasyon ne zaman durdurulur?', 'Güvenlik kuralları veya insanla görüşme isteği, insan desteğine aktarımı başlatabilir.'],
] as const;

export function PricingPageClient() {
  const { language } = useMarketingLocale();
  const tr = language === 'tr';
  const faq = tr ? faqTr : faqEn;
  return <><SiteHeader /><main id="main"><section className="section"><div className="container stack stack-6 text-center" style={{ maxWidth: '720px', margin: '0 auto' }}><span className="badge">{tr ? 'ÖRNEK FİYATLANDIRMA — GERÇEK TEKLİF DEĞİLDİR' : 'EXAMPLE PRICING — NOT A LIVE OFFER'}</span><h1 className="display">{tr ? 'Bir başlangıç modeli seçin. Kendinize göre uyarlayın.' : 'Choose a starting model. Make it yours.'}</h1><p className="lead">{tr ? 'Bu planlar örnektir. 0 değerleri yer tutucudur. Müşterilere teklif sunmadan önce fiyatları, limitleri ve faturalandırma kurallarını yapılandırın.' : 'These plans are examples. The 0 values are placeholders. Configure prices, limits and billing rules before presenting an offer to customers.'}</p></div></section><PricingTeaser /><section className="section section-divider"><div className="container stack stack-6"><h2>{tr ? 'Sık sorulan sorular' : 'Questions buyers usually ask'}</h2><div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>{faq.map(([q,a]) => <article key={q} className="card stack stack-3"><h3>{q}</h3><p>{a}</p></article>)}</div><div className="card card-padded stack stack-4 text-center"><h3>{tr ? 'Size özel bir kurulum mu gerekiyor?' : 'Need a custom commercial setup?'}</h3><p>{tr ? 'Büyük kurulumlar ve özel gereksinimler için bizimle iletişime geçin.' : 'Contact us for larger deployments and custom requirements.'}</p><Link href="/contact?plan=custom" className="btn btn-primary">{tr ? 'İletişime geçin' : 'Contact us'}</Link></div></div></section></main><SiteFooter /></>;
}
