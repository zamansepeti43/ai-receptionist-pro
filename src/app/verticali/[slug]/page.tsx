'use client';

import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { CtaSection } from '@/components/marketing/CtaSection';
import {
  buildBreadcrumbSchema,
  buildHowToSchema,
  buildServiceSchema,
  JsonLd,
} from '@/components/marketing/JsonLd';
import { SiteFooter } from '@/components/marketing/SiteFooter';
import { SiteHeader } from '@/components/marketing/SiteHeader';
import { useMarketingLocale } from '@/components/marketing/MarketingLocaleProvider';
import { VERTICALS_DATA } from './verticals-data';

export function generateStaticParams() {
  return Object.keys(VERTICALS_DATA).map((slug) => ({ slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = VERTICALS_DATA[slug];
  if (!data) return { title: 'Sector not found', robots: { index: false, follow: false } };
  return {
    title: data.metaTitle,
    description: data.metaDescription,
    openGraph: {
      title: data.metaTitle,
      description: data.metaDescription,
      url: `/verticali/${data.slug}`,
      type: 'website',
      locale: 'en_US',
    },
    alternates: { canonical: `/verticali/${data.slug}` },
  };
}

const TR_VERTICALS: Record<string, {
  title: string; eyebrow: string; h1: string; body: string;
  metric: string; metricLabel: string;
  painsTitle: string; pains: { title: string; body: string }[];
  scenariosTitle: string; scenariosHeading: string;
  scenarios: { title: string; body: string }[];
}> = {
  salon: {
    title: 'Kuaför ve Berber', eyebrow: 'Kuaför ve Berber',
    h1: 'Randevu taleplerini kesinleşmiş randevulara dönüştürün.',
    body: 'Hizmet sorularını yanıtlayın, randevu için gereken bilgileri alın, gerçek uygunluğu kontrol edin ve otomasyonun durması gerektiğinde personelinize aktarın.',
    metric: '24/7', metricLabel: 'Müşteri mesajlarını karşılama',
    painsTitle: 'Çözdüğü sorunlar',
    pains: [
      { title: 'Yoğun resepsiyon', body: 'Personelin her mesaja yanıt vermesini gerektirmeden tekrarlanan randevu sorularını yönetin.' },
      { title: 'Çakışan randevular', body: 'Saat önermeden önce hizmet süresini, çalışma saatlerini ve takvim uygunluğunu kontrol edin.' },
      { title: 'Mesai dışı talepler', body: 'Çalışma saatleri dışında da görüşmeyi sürdürün ve takip için talebi kaydedin.' },
    ],
    scenariosTitle: 'Müşteri senaryoları', scenariosHeading: 'Talepten işleme öngörülebilir bir yol.',
    scenarios: [
      { title: 'Yeni randevu', body: 'Müşteri bir hizmet ve tercih ettiği saati belirtir. Asistan uygunluğu kontrol edip geçerli seçenekleri sunar.' },
      { title: 'Randevu değiştirme', body: 'Asistan mevcut randevuyu bulur, alternatifleri kontrol eder ve randevuyu günceller.' },
      { title: 'İnsanla görüşme talebi', body: 'Müşteri bir kişiyle görüşmek isterse otomasyon durur ve bağlam korunarak personelinize aktarılır.' },
    ],
  },
  beauty: {
    title: 'Güzellik ve Bakım', eyebrow: 'Güzellik ve Bakım',
    h1: 'Her bakım talebinin randevuya dönüşmesini kolaylaştırın.',
    body: 'Hizmete özel bilgileri, süreleri ve işletme kurallarını kullanarak müşterileri sorulardan geçerli randevu seçeneklerine yönlendirin.',
    metric: 'Canlı', metricLabel: 'Gerçek uygunluğa dayalı randevu akışı',
    painsTitle: 'Çözdüğü sorunlar',
    pains: [
      { title: 'Çok sayıda hizmet', body: 'Hafızaya bağlı kalmak yerine işletmenin bilgi tabanından tutarlı yanıtlar verin.' },
      { title: 'Farklı hizmet süreleri', body: 'Randevu uygunluğunu her hizmet için tanımlanan süreyle uyumlu tutun.' },
      { title: 'Politika soruları', body: 'İptal ve hazırlık sorularını işletmenin sağladığı onaylı bilgilerle yanıtlayın.' },
    ],
    scenariosTitle: 'Müşteri senaryoları', scenariosHeading: 'Talepten işleme öngörülebilir bir yol.',
    scenarios: [
      { title: 'Bakım hakkında soru', body: 'Asistan onaylı hizmet açıklamasını aktarır ve randevu için gerekli bilgileri sorar.' },
      { title: 'Tercih edilen saat', body: 'Asistan saat önermeden önce gerçek takvimi kontrol eder.' },
      { title: 'Belirsiz talep', body: 'Bilgi tabanında yanıt yoksa açıklama ister veya talebi yetkili kişiye aktarır.' },
    ],
  },
  dental: {
    title: 'Diş ve Klinik', eyebrow: 'Diş ve Klinik',
    h1: 'Klinik uzmanı gibi davranmadan randevuları düzenleyin.',
    body: 'İdari soruları ve randevu taleplerini yönetin; tanı koymayın, tedavi tavsiyesi vermeyin ve klinik bilgi uydurmayın.',
    metric: 'Güvenli', metricLabel: 'İdari randevu sınırları',
    painsTitle: 'Çözdüğü sorunlar',
    pains: [
      { title: 'Randevu yoğunluğu', body: 'Personelin müdahalesi gerekmeden önce randevu ayrıntılarını toplayın.' },
      { title: 'Hassas sorular', body: 'Talep idari desteğin dışına çıktığında otomasyonu durduracak kuralları kullanın.' },
      { title: 'Eksik bilgiler', body: 'Tahmin yürütmek yerine gerekli randevu bilgilerini sorun.' },
    ],
    scenariosTitle: 'Müşteri senaryoları', scenariosHeading: 'Talepten işleme öngörülebilir bir yol.',
    scenarios: [
      { title: 'Rutin randevu', body: 'Asistan hizmet talebini toplar ve tanımlanan uygunluğu kontrol eder.' },
      { title: 'Klinik soru', body: 'Klinik bir talepte yanıt uydurmak yerine güvenli sınırı uygular ve insan desteğine aktarır.' },
      { title: 'Randevu değiştirme', body: 'Mevcut randevu yalnızca geçerli bir alternatif bulunduğunda değiştirilir.' },
    ],
  },
  veterinary: {
    title: 'Veteriner', eyebrow: 'Veteriner',
    h1: 'Evcil hayvan randevularını gerçek takvime göre düzenleyin.',
    body: 'Randevu için hayvan ve sahibiyle ilgili bilgileri toplayın, onaylı işletme sorularını yanıtlayın ve veteriner personeli gerektiren durumları aktarın.',
    metric: '24/7', metricLabel: 'İdari talepleri karşılama',
    painsTitle: 'Çözdüğü sorunlar',
    pains: [
      { title: 'Eksik başvuru bilgileri', body: 'Talebi personele aktarmadan önce işletmenin istediği ayrıntıları toplayın.' },
      { title: 'Acil talepler', body: 'Tanı veya tedavi tavsiyesi vermek yerine tanımlı aktarma kurallarını uygulayın.' },
      { title: 'Takvim çakışmaları', body: 'Saat önermeden önce gerçek uygunluğu kontrol edin.' },
    ],
    scenariosTitle: 'Müşteri senaryoları', scenariosHeading: 'Talepten işleme öngörülebilir bir yol.',
    scenarios: [
      { title: 'Rutin ziyaret', body: 'Randevu nedenini ve tercih edilen saati alın, ardından uygun seçenekleri sunun.' },
      { title: 'Acil endişe', body: 'Tıbbi tavsiye vermeden işletmenin belirlediği kurallara göre aktarım yapın.' },
      { title: 'Kontrol randevusu', body: 'Tanımlanan hizmet ve takvim üzerinden idari takip randevusu oluşturun.' },
    ],
  },
  fitness: {
    title: 'Spor Salonu ve Fitness', eyebrow: 'Spor Salonu ve Fitness',
    h1: 'Personeli mesaj trafiğine boğmadan randevu saatlerini değerlendirin.',
    body: 'Danışmanlık, kişisel antrenman ve tanımlanan diğer hizmetleri gerçek uygunluk ve net müşteri aktarımı kurallarıyla koordine edin.',
    metric: 'Canlı', metricLabel: 'Uygunluğa dayalı planlama',
    painsTitle: 'Çözdüğü sorunlar',
    pains: [
      { title: 'Birden çok hizmet', body: 'Hizmet sürelerini ve randevu kurallarını müşteri görüşmelerinde tutarlı tutun.' },
      { title: 'Antrenör takvimleri', body: 'Personel veya kaynakların yer aldığı iş akışlarında tanımlı uygunluğa uyun.' },
      { title: 'Geç gelen talepler', body: 'Mesai dışındaki talepleri kaydedin ve doğru iş akışına yönlendirin.' },
    ],
    scenariosTitle: 'Müşteri senaryoları', scenariosHeading: 'Talepten işleme öngörülebilir bir yol.',
    scenarios: [
      { title: 'Antrenman talebi', body: 'İstenen hizmeti tanımlı süre ve uygun saatle eşleştirin.' },
      { title: 'Program değişikliği', body: 'Mevcut randevuyu değiştirmeden önce alternatifleri kontrol edin.' },
      { title: 'Personele aktarma', body: 'Antrenör veya operatör gerektiren soruları bağlamı koruyarak aktarın.' },
    ],
  },
  'auto-service': {
    title: 'Oto Servis', eyebrow: 'Oto Servis',
    h1: 'Servis taleplerini yapılandırılmış randevulara dönüştürün.',
    body: 'Araç hizmetlerini planlamak için gereken bilgileri toplayın, tanımlı süreleri ve kaynakları kullanın, teknik soruları personele aktarın.',
    metric: 'Yapılandırılmış', metricLabel: 'Talepten randevuya iş akışı',
    painsTitle: 'Çözdüğü sorunlar',
    pains: [
      { title: 'Düzensiz talepler', body: 'Serbest müşteri mesajlarını işletmenin planlama için ihtiyaç duyduğu ayrıntılara dönüştürün.' },
      { title: 'Kaynak çakışmaları', body: 'Uygun olduğunda randevu saatlerini servis alanı, personel veya diğer kaynaklarla eşleştirin.' },
      { title: 'Teknik sorular', body: 'Tahmin yürütmek yerine onarım ve belirsiz teknik soruları personele aktarın.' },
    ],
    scenariosTitle: 'Müşteri senaryoları', scenariosHeading: 'Talepten işleme öngörülebilir bir yol.',
    scenarios: [
      { title: 'Servis randevusu', body: 'Hizmet talebini ve tanımlı araç bilgilerini toplayın, ardından uygunluğu kontrol edin.' },
      { title: 'Onarım sorusu', body: 'Doğrulanmamış bir teşhis sunmak yerine teknik soruları personele yönlendirin.' },
      { title: 'Randevu değiştirme', body: 'Randevuyu yalnızca yeni saatin uygunluğunu kontrol ettikten sonra değiştirin.' },
    ],
  },
  consulting: {
    title: 'Danışmanlık ve Profesyonel Hizmetler', eyebrow: 'Danışmanlık',
    h1: 'Görüşme taleplerini takvime ulaşmadan önce nitelendirin.',
    body: 'İşletmenin onayladığı ön bilgileri toplayın, bilinen soruları yanıtlayın, danışmanlık görüşmeleri planlayın ve karmaşık talepleri bir kişiye aktarın.',
    metric: 'Odaklı', metricLabel: 'Müşteri adayından görüşmeye iş akışı',
    painsTitle: 'Çözdüğü sorunlar',
    pains: [
      { title: 'Bağlamı eksik görüşmeler', body: 'Randevudan önce işletmenin tanımladığı temel bilgileri toplayın.' },
      { title: 'Takvim için yazışmalar', body: 'Yalnızca bağlı takvimdeki geçerli randevu saatlerini sunun.' },
      { title: 'Hassas talepler', body: 'Otomatik yönetilmemesi gereken konuları insan desteğine aktarın.' },
    ],
    scenariosTitle: 'Müşteri senaryoları', scenariosHeading: 'Talepten işleme öngörülebilir bir yol.',
    scenarios: [
      { title: 'Tanışma görüşmesi', body: 'Tanımlı ön bilgileri alın ve uygun bir danışmanlık görüşmesi planlayın.' },
      { title: 'Mevcut müşteri', body: 'Talepleri işletme kurallarına göre yönlendirin ve görüşme bağlamını koruyun.' },
      { title: 'Özel talep', body: 'Bilgi tabanı veya iş akışı yeterli değilse talebi bir kişiye aktarın.' },
    ],
  },
};

export default function VerticalPage({ params }: PageProps) {
  const { language, t } = useMarketingLocale();
  const isTurkish = language === 'tr';

  // The route param is supplied by Next.js. The server page remains responsible
  // for validation and metadata; this client component only localizes visible copy.
  const [slug, setSlug] = React.useState<string>('');
  React.useEffect(() => {
    let active = true;
    Promise.resolve(params).then(({ slug: current }) => {
      if (active) setSlug(current);
    });
    return () => { active = false; };
  }, [params]);

  const data = VERTICALS_DATA[slug];
  if (!slug) return null;
  if (!data) notFound();

  const translated = isTurkish ? TR_VERTICALS[slug] : undefined;
  const title = translated?.title ?? data.title;
  const heroEyebrow = translated?.eyebrow ?? data.hero.eyebrow;
  const heroH1 = translated?.h1 ?? data.hero.h1;
  const heroBody = translated?.body ?? data.hero.body;
  const metricLabel = translated?.metricLabel ?? data.metric.label;
  const pains = translated?.pains ?? data.pains;
  const scenarios = translated?.scenarios ?? data.scenarios;
  const otherVerticals = Object.values(VERTICALS_DATA).filter((v) => v.slug !== data.slug);

  return (
    <>
      <JsonLd data={buildBreadcrumbSchema([
        { name: isTurkish ? 'Ana sayfa' : 'Home', url: '/' },
        { name: t.navSectors, url: '/verticali' },
        { name: title, url: `/verticali/${data.slug}` },
      ])} />
      <JsonLd data={buildServiceSchema({
        name: `AI Receptionist Pro — ${title}`,
        serviceType: data.serviceType,
        description: heroBody,
        url: `/verticali/${data.slug}`,
      })} />
      <JsonLd data={buildHowToSchema({
        name: isTurkish ? `${title} için AI Receptionist Pro nasıl çalışır?` : `How AI Receptionist Pro works for ${title}`,
        description: isTurkish ? `${title} için örnek müşteri iş akışları.` : `Typical customer workflows for ${title}.`,
        steps: scenarios.map((scenario) => ({ name: scenario.title, text: scenario.body })),
      })} />
      <SiteHeader />
      <main id="main">
        <section className="hero" aria-labelledby="vertical-h1">
          <div className="container hero-grid">
            <div className="stack stack-6">
              <span className="hero-eyebrow">{data.icon} {heroEyebrow}</span>
              <h1 id="vertical-h1" className="display text-balance">{heroH1}</h1>
              <p className="lead text-pretty">{heroBody}</p>
              <div className="row" style={{ gap: 'var(--space-3)' }}>
                <Link href={`/register?vertical=${data.slug}`} className="btn btn-primary btn-lg">
                  {isTurkish ? 'Kuruluma başlayın' : 'Start setup'}
                </Link>
                <Link href={`/pricing?ref=vertical-${data.slug}`} className="btn btn-secondary btn-lg">
                  {t.viewPlans}
                </Link>
              </div>
              <div className="card stack stack-2" style={{ padding: 'var(--space-5)', background: 'var(--color-accent-soft)', maxWidth: '360px' }}>
                <span className="eyebrow">{isTurkish ? 'İş akışının odağı' : 'Workflow focus'}</span>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', fontWeight: 700 }}>{data.metric.value}</p>
                <p className="muted" style={{ fontSize: 'var(--text-sm)' }}>{metricLabel}</p>
              </div>
            </div>
            <div className="card card-padded stack stack-4" aria-label={isTurkish ? 'Sektör iş akışı önizlemesi' : 'Sector workflow preview'}>
              <span className="eyebrow">{isTurkish ? 'Örnek iş akışı' : 'Example workflow'}</span>
              {scenarios.map((scenario, index) => (
                <div key={scenario.title} className="stack stack-2">
                  <div className="row-between">
                    <strong>{String(index + 1).padStart(2, '0')} · {scenario.title}</strong>
                    <span className="badge badge-success">{isTurkish ? 'Destekleniyor' : 'Supported'}</span>
                  </div>
                  <p className="muted">{scenario.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-divider" aria-labelledby="pains-heading">
          <div className="container stack stack-12">
            <div className="stack stack-3" style={{ maxWidth: '52ch' }}>
              <span className="eyebrow">{translated?.painsTitle ?? 'Problems it addresses'}</span>
              <h2 id="pains-heading">{isTurkish ? 'Net sınırlarla pratik otomasyon.' : 'Practical automation, with clear boundaries.'}</h2>
            </div>
            <div className="feature-grid">
              {pains.map((pain) => (
                <article key={pain.title} className="card stack stack-3">
                  <h3 style={{ fontSize: 'var(--text-xl)' }}>{pain.title}</h3>
                  <p style={{ color: 'var(--color-text-secondary)' }}>{pain.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-divider" style={{ background: 'var(--color-surface-sunken)' }} aria-labelledby="scenarios-heading">
          <div className="container stack stack-12">
            <div className="stack stack-3" style={{ maxWidth: '52ch' }}>
              <span className="eyebrow">{translated?.scenariosTitle ?? 'Customer scenarios'}</span>
              <h2 id="scenarios-heading">{translated?.scenariosHeading ?? 'A predictable path from request to action.'}</h2>
            </div>
            <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
              {scenarios.map((scenario, index) => (
                <article key={scenario.title} className="card stack stack-3" style={{ background: 'var(--color-surface)' }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', fontWeight: 700, color: 'var(--color-accent)' }}>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 style={{ fontSize: 'var(--text-lg)' }}>{scenario.title}</h3>
                  <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-sm)' }}>{scenario.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-divider" aria-labelledby="other-verticals-heading">
          <div className="container stack stack-6">
            <h2 id="other-verticals-heading" style={{ fontSize: 'var(--text-2xl)' }}>
              {isTurkish ? 'Diğer sektör şablonları' : 'Other sector presets'}
            </h2>
            <div className="row" style={{ gap: 'var(--space-3)', flexWrap: 'wrap' }}>
              {otherVerticals.map((v) => (
                <Link key={v.slug} href={`/verticali/${v.slug}`} className="btn btn-secondary">
                  {v.icon} {isTurkish ? (TR_VERTICALS[v.slug]?.title ?? v.title) : v.title}
                </Link>
              ))}
            </div>
          </div>
        </section>
        <CtaSection />
      </main>
      <SiteFooter />
    </>
  );
}
