'use client';

import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import { useMarketingLocale } from '@/components/marketing/MarketingLocaleProvider';
import { SiteFooter } from '@/components/marketing/SiteFooter';
import { SiteHeader } from '@/components/marketing/SiteHeader';

const POSTS = {
  'whatsapp-business-vs-360dialog-quando-conviene': {
    date: '2026-05-02',
    minutes: 8,
    category: { tr: 'Rehber', en: 'Guide' },
    title: {
      tr: 'WhatsApp Cloud API ve 360dialog: hangisi ne zaman tercih edilmeli?',
      en: 'WhatsApp Cloud API vs 360dialog: when should you choose each?',
    },
    excerpt: {
      tr: 'Meta’nın resmî API’si ile yaygın kullanılan iş çözümü sağlayıcılarının teknik ve maliyet karşılaştırması.',
      en: 'A technical and cost comparison of Meta’s official API and common business solution providers.',
    },
    body: {
      tr: 'Türkiye’de ve diğer pazarlarda WhatsApp Business entegrasyonu yaparken iki temel seçenek bulunur: Meta WhatsApp Cloud API’yi doğrudan kullanmak veya 360dialog gibi bir iş çözümü sağlayıcısından yararlanmak.\n\nDoğrudan Cloud API, teknik ekibe daha fazla kontrol sağlayabilir; ancak kurulum, izleme ve destek sorumluluğu daha çok ekibin üzerindedir.\n\nBir sağlayıcı üzerinden çalışmak, kurulum desteği ve işletim kolaylığı sunabilir; buna karşılık sağlayıcının ücretleri ve koşulları ayrıca değerlendirilmelidir.\n\nKarar verirken mesaj hacmini, destek gereksinimini, entegrasyon esnekliğini ve toplam işletme maliyetini birlikte karşılaştırın. Tek bir mesaj eşiğinin her işletme için geçerli olduğunu varsaymayın.',
      en: 'When integrating WhatsApp Business, there are two common options: use Meta WhatsApp Cloud API directly or work through a business solution provider such as 360dialog.\n\nDirect Cloud API access can provide more control to a technical team, but setup, monitoring and support responsibilities also sit more heavily with that team.\n\nA provider may simplify onboarding and operations, while adding its own fees and contractual terms.\n\nCompare message volume, support needs, integration flexibility and total operating cost. Do not assume a single message-volume break-even point applies to every business.',
    },
  },
  'gdpr-receptionist-ai-dpa-template': {
    date: '2026-04-28',
    minutes: 12,
    category: { tr: 'GDPR', en: 'GDPR' },
    title: {
      tr: 'GDPR ve yapay zekâ resepsiyonu: veri işleme sözleşmesinde neler olmalı?',
      en: 'GDPR and AI receptionists: what a useful DPA should include',
    },
    excerpt: {
      tr: 'Veri işleme sözleşmesinin temel unsurları ve uygulamaya dönük bir kontrol listesi.',
      en: 'The essential elements of a data processing agreement and a practical checklist.',
    },
    body: {
      tr: 'Veri İşleme Sözleşmesi (DPA), bir hizmet sağlayıcının veri sorumlusu adına kişisel veri işlemesi durumunda tarafların görevlerini açıklığa kavuşturur. Yapay zekâ destekli resepsiyon iş akışlarında bu önemlidir; çünkü sistem mesajları, ses kayıtlarını veya randevu bilgilerini işleyebilir.\n\nSözleşmede işlenen veri kategorileri, amaç ve süre, alt işleyenler, teknik ve organizasyonel önlemler, veri ihlali süreci ve ilgili kişi taleplerinde sağlanacak yardım açıklanmalıdır.\n\nBir DPA’yı kullanmadan önce gerçek veri akışlarını ve sağlayıcıları doğrulayın; varsayımsal güvenlik iddialarını veya uygulanmayan özellikleri sözleşmeye eklemeyin.',
      en: 'A Data Processing Agreement (DPA) clarifies responsibilities when a provider processes personal data on behalf of a controller. This matters for AI-assisted reception workflows because the system may handle messages, audio recordings or appointment details.\n\nThe agreement should describe data categories, purpose and duration, sub-processors, technical and organisational measures, incident procedures and assistance with data-subject requests.\n\nBefore using a DPA, verify actual data flows and providers. Do not include security claims or capabilities that have not been implemented.',
    },
  },
} as const;

export default function BlogPostPage() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;
  const { language } = useMarketingLocale();
  const tr = language === 'tr';
  const post = POSTS[slug as keyof typeof POSTS];
  if (!post) notFound();
  const title = post.title[tr ? 'tr' : 'en'];
  const excerpt = post.excerpt[tr ? 'tr' : 'en'];
  const body = post.body[tr ? 'tr' : 'en'];
  const date = tr
    ? ({ '2026-05-02': '2 Mayıs 2026', '2026-04-28': '28 Nisan 2026' } as Record<string, string>)[post.date]
    : ({ '2026-05-02': '2 May 2026', '2026-04-28': '28 April 2026' } as Record<string, string>)[post.date];

  return (
    <>
      <SiteHeader />
      <main id="main">
        <article className="section">
          <div className="container-narrow stack stack-6">
            <div className="stack stack-3">
              <Link href="/blog" className="btn-link" style={{ fontSize: 'var(--text-sm)' }}>
                ← {tr ? 'Tüm yazılar' : 'All articles'}
              </Link>
              <span className="badge badge-neutral">{post.category[tr ? 'tr' : 'en']}</span>
              <h1 className="text-balance">{title}</h1>
              <p className="lead">{excerpt}</p>
              <p className="muted" style={{ fontSize: 'var(--text-sm)' }}>
                {date} · {post.minutes} {tr ? 'dk okuma' : 'min read'}
              </p>
            </div>
            <hr className="divider" />
            <div
              style={{
                fontSize: 'var(--text-base)',
                lineHeight: 'var(--leading-relaxed)',
                color: 'var(--color-text-secondary)',
                whiteSpace: 'pre-wrap',
              }}
            >
              {body}
            </div>
            <hr className="divider" />
            <section className="stack stack-3">
              <h2 style={{ fontSize: 'var(--text-xl)' }}>
                {tr ? 'Diğer yazılar' : 'Related articles'}
              </h2>
              <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
                {Object.entries(POSTS).filter(([otherSlug]) => otherSlug !== slug).map(([otherSlug, other]) => (
                  <Link
                    key={otherSlug}
                    href={`/blog/${otherSlug}`}
                    className="card card-interactive stack stack-3"
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    <span className="badge badge-neutral">{other.category[tr ? 'tr' : 'en']}</span>
                    <h3>{other.title[tr ? 'tr' : 'en']}</h3>
                    <p className="muted">{other.excerpt[tr ? 'tr' : 'en']}</p>
                    <span className="btn-link">{tr ? 'Makaleyi oku' : 'Read article'} →</span>
                  </Link>
                ))}
              </div>
            </section>
            <div className="card stack stack-3" style={{ background: 'var(--color-accent-soft)' }}>
              <h3 style={{ fontSize: 'var(--text-lg)' }}>
                {tr ? 'Ürünü denemek ister misiniz?' : 'Would you like to try the product?'}
              </h3>
              <p style={{ fontSize: 'var(--text-sm)' }}>
                {tr
                  ? 'İşletmenize uygun kurulum hakkında bilgi alın.'
                  : 'Learn about setup options for your business.'}
              </p>
              <Link href="/register" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>
                {tr ? 'Ücretsiz başlayın' : 'Get started'}
              </Link>
            </div>
          </div>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
