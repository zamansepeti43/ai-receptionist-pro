'use client';

import Link from 'next/link';
import { useMarketingLocale } from '@/components/marketing/MarketingLocaleProvider';
import { SiteFooter } from '@/components/marketing/SiteFooter';
import { SiteHeader } from '@/components/marketing/SiteHeader';

const POSTS = [
  {
    slug: 'whatsapp-business-vs-360dialog-quando-conviene',
    category: 'Guide',
    date: '2 May 2026',
    readTime: 8,
    en: { title: 'WhatsApp Cloud API vs 360dialog: when should you choose each?', excerpt: 'A technical and cost comparison of Meta’s official API and commonly used business solution providers.' },
    tr: { title: 'WhatsApp Cloud API ve 360dialog: hangisi ne zaman tercih edilmeli?', excerpt: 'Meta’nın resmî API’si ile yaygın kullanılan iş çözümü sağlayıcılarının teknik ve maliyet karşılaştırması.' },
  },
  {
    slug: 'gdpr-receptionist-ai-dpa-template',
    category: 'GDPR',
    date: '28 April 2026',
    readTime: 12,
    en: { title: 'GDPR and AI receptionists: what a useful DPA should include', excerpt: 'The essential elements of a data processing agreement and a practical template.' },
    tr: { title: 'GDPR ve yapay zekâ resepsiyonu: veri işleme sözleşmesinde neler olmalı?', excerpt: 'Veri işleme sözleşmesinin temel unsurları ve uygulamaya dönük bir şablon.' },
  },
] as const;

export default function BlogPage() {
  const { language } = useMarketingLocale();
  const tr = language === 'tr';
  return (
    <>
      <SiteHeader />
      <main id="main">
        <section className="section">
          <div className="container">
            <div className="stack stack-4" style={{ maxWidth: '720px', marginBottom: 'var(--space-12)' }}>
              <span className="badge">Blog</span>
              <h1 className="display text-balance">{tr ? 'Gelen çağrıları kaçırmayı bırakan işletmelerin hikâyeleri.' : 'Stories from businesses that stopped missing calls.'}</h1>
              <p className="lead text-pretty">{tr ? 'Teknik kılavuzlar, örnek olaylar ve görüşler. İşletme yönetenler için gerçekten yararlı içerikler.' : 'Technical guides, case studies and opinions. Practical content for people who run a business.'}</p>
            </div>
            <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
              {POSTS.map((post) => {
                const copy = tr ? post.tr : post.en;
                return (
                  <Link key={post.slug} href={`/blog/${post.slug}`} className="card card-padded card-interactive stack stack-4" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div className="row" style={{ gap: 'var(--space-3)' }}>
                      <span className="badge badge-neutral">{post.category === 'Guide' && tr ? 'Rehber' : post.category}</span>
                      <span className="muted" style={{ fontSize: 'var(--text-xs)' }}>{tr ? (post.slug.startsWith('gdpr') ? '28 Nisan 2026' : '2 Mayıs 2026') : post.date} · {post.readTime} {tr ? 'dk okuma' : 'min read'}</span>
                    </div>
                    <h2 style={{ fontSize: 'var(--text-xl)' }}>{copy.title}</h2>
                    <p style={{ color: 'var(--color-text-secondary)' }}>{copy.excerpt}</p>
                    <span className="row" style={{ gap: 'var(--space-2)', color: 'var(--color-accent)', fontSize: 'var(--text-sm)', fontWeight: 600, marginTop: 'auto' }}>{tr ? 'Makaleyi oku' : 'Read article'} <span aria-hidden="true">→</span></span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
