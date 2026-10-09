'use client';

import Link from 'next/link';
import { useMarketingLocale } from '@/components/marketing/MarketingLocaleProvider';
import { SiteFooter } from '@/components/marketing/SiteFooter';
import { SiteHeader } from '@/components/marketing/SiteHeader';

export default function CaseStudiesPage() {
  const { language } = useMarketingLocale();
  const tr = language === 'tr';
  const items = tr ? [
    ['Ölçülen metrikler, tahminler değil', 'Etkinleştirmeden önceki 90 gün ile sonraki 90 gün karşılaştırılır; müşteri işletme verileri kullanılır.'],
    ['Müşteri tarafından doğrulama', 'Üretilen sonuçlar, ölçümü yapan müşteri tarafından açık ve yazılı olarak onaylanmadan yayımlanmaz.'],
    ['Yöntem açıkça belirtilir', 'Dönem, örneklem büyüklüğü ve ürüne atfedilemeyen sonuçlar açıklanır. Yöntemi olmayan sayı kanıt değildir.'],
  ] : [
    ['Measured metrics, not estimates', 'We compare the 90 days before and after activation using customer business records rather than projections.'],
    ['Customer-validated results', 'No figures are published without explicit written approval from the customer who generated them.'],
    ['A fully disclosed method', 'We publish the period, sample size and outcomes that cannot be attributed to the product. A number without a method is not proof.'],
  ];
  return <>
    <SiteHeader />
    <main id="main"><section className="section"><div className="container">
      <div className="stack stack-4" style={{maxWidth:'720px',marginBottom:'var(--space-12)'}}>
        <span className="badge">{tr?'Örnek olaylar':'Case studies'}</span>
        <h1 className="display text-balance">{tr?'Henüz yayımlanmış bir örnek olay yok.':'No published case studies. Not yet.'}</h1>
        <p className="lead text-pretty">{tr?'Ürün pilot aşamasında. Yayımlanabilecek kadar uzun bir dönemde ölçülüp doğrulanmış sonuçlarımız henüz yok. Bu yüzden gerçek olmayan rakamlar paylaşmak yerine bunu açıkça belirtiyoruz.':'The product is in its pilot phase. We do not yet have results measured over a sufficiently long period to publish as evidence, so we prefer to be transparent rather than invent plausible numbers.'}</p>
      </div>
      <div className="grid" style={{gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))'}}>{items.map(([title,body])=><article key={title} className="card card-padded stack stack-3"><h2 style={{fontSize:'var(--text-lg)'}}>{title}</h2><p style={{color:'var(--color-text-secondary)'}}>{body}</p></article>)}</div>
      <div className="card card-padded stack stack-4 text-center" style={{marginTop:'var(--space-12)',background:'var(--color-surface-sunken)',alignItems:'center'}}>
        <h3>{tr?'Bu arada ürünü kendiniz inceleyebilirsiniz.':'In the meantime, you can verify the product yourself.'}</h3>
        <p className="muted" style={{maxWidth:'56ch'}}>{tr?'Kaynak kodu MIT lisansıyla herkese açıktır. Kodu inceleyebilir, kurabilir ve deneyebilirsiniz.':'The source code is public under the MIT license. You can read, install and try it yourself.'}</p>
        <div className="row" style={{gap:'var(--space-3)',flexWrap:'wrap'}}><a href="https://github.com/Hiberius/whatsapp-receptionist" className="btn btn-primary" rel="noreferrer">{tr?'GitHub kodunu incele':'View source on GitHub'}</a><Link href="/contact" className="btn btn-secondary">{tr?'Pilot programa katıl':'Join the pilot program'}</Link></div>
      </div>
    </div></section></main>
    <SiteFooter />
  </>;
}
