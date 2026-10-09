import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { buildArticleSchema, buildBreadcrumbSchema, JsonLd } from '@/components/marketing/JsonLd';
import { SiteFooter } from '@/components/marketing/SiteFooter';
import { SiteHeader } from '@/components/marketing/SiteHeader';
import { ARTICLES, type HelpArticle } from './articles-data';

export function generateStaticParams() {
  return Object.keys(ARTICLES).map((slug) => ({ slug }));
}

interface PageProps { params: Promise<{ slug: string }> }

const ARTICLE_TR: Record<string, { title: string; description: string; category: string; body: string }> = {
 'come-collegare-il-numero-whatsapp-business': { title:'WhatsApp Business numarası nasıl bağlanır?', description:'WhatsApp Business numaranızı bağlama adımları.', category:'Kurulum', body:'Meta Business hesabınızın aktif ve numaranızın doğrulanmış olması gerekir. Kontrol panelinde Ayarlar → WhatsApp bölümünü açın. Meta hesabınıza giriş yapıp bağlayacağınız numarayı seçin ve webhook doğrulamasını tamamlayın. Kurulum genellikle 10 dakika sürer; Meta hesabının doğrulanması gerekiyorsa daha uzun sürebilir.' },
 'come-autorizzare-google-calendar': { title:'Google Takvim nasıl yetkilendirilir?', description:'Google Takvim bağlantısı ve izinleri.', category:'Kurulum', body:'Ayarlar → Takvim → Google Takvim’i bağla yolunu izleyin. Google hesabınızla giriş yapın ve istenen izinleri onaylayın. Asistan takvim uygunluğunu kontrol etmek ve kendi oluşturduğu etkinlikleri yönetmek için gerekli izinleri kullanır.' },
 'caricare-il-listino-servizi': { title:'Hizmet listesi nasıl yüklenir?', description:'Hizmet adı, süresi ve fiyatı ekleme.', category:'Kurulum', body:'Ayarlar → Hizmetler bölümünde her hizmet için ad, dakika cinsinden süre, fiyat ve isteğe bağlı personel bilgilerini girin. CSV içe aktarma özelliği sunuluyorsa şablonu indirip doldurduktan sonra yükleyin. Açıklayıcı hizmet adları, asistanın talepleri doğru anlamasına yardımcı olur.' },
 'configurare-gli-orari-di-apertura': { title:'Çalışma saatleri nasıl ayarlanır?', description:'Haftalık çalışma saatleri ve özel kapanışlar.', category:'Kurulum', body:'Ayarlar → Çalışma saatleri bölümünde her günün açılış, kapanış ve mola saatlerini tanımlayın. Özel kapanışları ve tatil günlerini de yapılandırın. Randevu saatleri işletmenizin belirlediği çalışma saatleriyle uyumlu olmalıdır.' },
 'come-funziona-il-filtro-ai': { title:'Yapay zekâ filtresi nasıl çalışır?', description:'Mesaj sınıflandırma, güvenlik kontrolü ve yönlendirme.', category:'Yapay zekâ', body:'Gelen mesajlar önce niyetlerine göre sınıflandırılır; örneğin randevu, bilgi, aciliyet veya istenmeyen mesaj. Ardından güvenlik kuralları uygulanır ve yanıtın asistan tarafından mı verileceği, yoksa bir kişiye mi aktarılacağı belirlenir.' },
 'quando-interviene-un-umano': { title:'İnsan desteği ne zaman devreye girer?', description:'İnsan desteğine aktarım koşulları.', category:'Yapay zekâ', body:'Yanıt güveni düşükse, kullanıcı bir kişiyle görüşmek istiyorsa veya acil ya da hassas bir konu ortaya çıkarsa görüşme personele aktarılmalıdır. Aktarım sırasında konuşmanın bağlamı korunur.' },
 'gestire-vocali-e-media': { title:'Sesli mesajlar ve medya nasıl yönetilir?', description:'Sesli mesajların işlenmesi ve saklanması.', category:'Yapay zekâ', body:'Desteklenen iş akışında WhatsApp sesli mesajları metne dönüştürülebilir. Ses kaydı ve transkriptlerin saklanması, ürün yapılandırmanızda belirtilen saklama politikalarına bağlıdır.' },
 'risposte-rapide-preconfezionate': { title:'Hazır yanıtlar nasıl yönetilir?', description:'Sık sorulan sorular için onaylı yanıtlar.', category:'Yapay zekâ', body:'Ayarlar → Bilgi tabanı bölümüne işletmenizle ilgili sık sorulan soruları ve onaylı yanıtlarını ekleyin. Bilgi tabanını düzenli güncel tutun. Asistanın yanıtlayamadığı veya bilgi tabanında bulunmayan sorular gerektiğinde personele aktarılmalıdır.' },
 'come-ambrogio-prenota-appuntamenti': { title:'Asistan nasıl randevu oluşturur?', description:'Randevu talebinden takvim kaydına kadar adımlar.', category:'Randevu', body:'Asistan istenen hizmeti ve gerekli bilgileri belirler, takvimde gerçek uygunluğu kontrol eder, geçerli saat seçeneklerini sunar ve müşteri onayından sonra randevuyu oluşturur. Saat, takvimde doğrulanmadan kesin randevu olarak sunulmamalıdır.' },
 'gestire-conflitti-calendario': { title:'Takvim çakışmaları nasıl yönetilir?', description:'Randevu çakışmalarını azaltma ve alternatif saatler.', category:'Randevu', body:'Randevu oluşturulmadan önce takvim uygunluğu yeniden kontrol edilmelidir. İstenen saat artık uygun değilse asistan alternatifler sunar. Takvimde manuel değişiklik yapıldığında bağlantı ve senkronizasyon durumunu kontrol edin.' },
 'reminder-automatici': { title:'Otomatik hatırlatmalar nasıl çalışır?', description:'Randevu öncesi hatırlatma ayarları.', category:'Randevu', body:'Hatırlatma zamanlarını işletmenizin hizmet türüne ve operasyonel kurallarına göre yapılandırın. Müşteriye gönderilen hatırlatma, doğru randevu tarihi ve saati içermelidir. Mesajlaşma sağlayıcısının izin ve şablon kurallarını ayrıca dikkate alın.' },
 'gestire-le-disdette': { title:'Randevu iptalleri nasıl yönetilir?', description:'İptal talebi, onay ve takvim güncellemesi.', category:'Randevu', body:'İptal talebini doğrulayın, ilgili randevunun durumunu kontrol edin ve iptal kesinleştiğinde takvimi güncelleyin. İşletmenizin iptal politikasına göre alternatif saat sunabilir ve ilgili personele bildirim gönderebilirsiniz.' },
 'cambiare-piano': { title:'Plan nasıl değiştirilir?', description:'Abonelik planını değiştirme.', category:'Hesap', body:'Kontrol panelindeki Faturalandırma bölümünde mevcut planınızı ve kullanılabilir seçenekleri kontrol edin. Plan değişikliğini onaylamadan önce ücret, limit ve geçerlilik tarihlerini inceleyin.' },
 'scaricare-fatture-elettroniche-sdi': { title:'Elektronik faturalar nasıl indirilir?', description:'Fatura belgelerine erişme.', category:'Hesap', body:'Faturalandırma → Faturalar bölümünde mevcut belgelerinizi kontrol edin. PDF ve elektronik fatura dosyalarının kullanılabilirliği, hesabınızın ve faturalandırma entegrasyonunun yapılandırmasına bağlıdır.' },
 'aggiornare-dati-piva': { title:'Vergi ve şirket bilgileri nasıl güncellenir?', description:'Faturalandırma için işletme bilgilerini düzenleme.', category:'Hesap', body:'Ayarlar → Faturalandırma bilgileri bölümünde şirket unvanı, vergi numarası, adres ve ilgili fatura bilgilerini kontrol edin. Değişiklikleri kaydetmeden önce doğruluğunu teyit edin; daha önce düzenlenmiş faturalar için muhasebe kurallarını dikkate alın.' },
 'esportare-i-miei-dati-gdpr': { title:'Verilerimi nasıl dışa aktarabilirim?', description:'GDPR kapsamında veri dışa aktarma.', category:'Hesap', body:'Ayarlar → Güvenlik veya veri yönetimi bölümündeki dışa aktarma seçeneklerini kontrol edin. Talep oluşturduğunuzda, kullanılabilir veriler belirlenen güvenli yöntemle sağlanır. Paylaşım bağlantılarını güvenli tutun.' },
 'cancellare-account': { title:'Hesap nasıl silinir?', description:'Hesap silme talebi ve veri saklama.', category:'Hesap', body:'Ayarlar → Güvenlik bölümündeki hesap silme seçeneklerini ve uyarıları dikkatle inceleyin. Silme işlemini onaylamadan önce gerekli verileri dışa aktarın. Yasal saklama yükümlülüklerine tabi kayıtlar farklı sürelerle tutulabilir.' },
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
 const { slug } = await params;
 const article = ARTICLES[slug];
 if (!article) return { title: 'Help article not found', robots: { index: false, follow: false } };
 return {
   title: article.title,
   description: article.description,
   alternates: { canonical: `/help/articles/${article.slug}` },
   openGraph: { title: article.title, description: article.description, type: 'article', url: `/help/articles/${article.slug}`, locale: 'en_US' },
 };
}

export default async function HelpArticlePage({ params }: PageProps) {
 const { slug } = await params;
 const article = ARTICLES[slug];
 if (!article) notFound();
 const tr = ARTICLE_TR[slug];
 const title = tr?.title ?? article.title;
 const description = tr?.description ?? article.description;
 const category = tr?.category ?? article.category;
 const body = tr?.body ?? article.body;
 const related = article.related.map((relatedSlug) => ARTICLES[relatedSlug]).filter((a): a is HelpArticle => a !== undefined);
 return (
  <>
   <JsonLd data={buildArticleSchema({ headline: title, description, datePublished: '2026-05-08', url: `/help/articles/${article.slug}`, category })} />
   <JsonLd data={buildBreadcrumbSchema([{ name:'Home',url:'/' },{ name:'Help Center',url:'/help' },{ name:title,url:`/help/articles/${article.slug}` }])} />
   <SiteHeader />
   <main id="main"><article className="section"><div className="container-narrow stack stack-6">
    <div className="stack stack-3"><Link href="/help" className="btn-link" style={{fontSize:'var(--text-sm)'}}>← Help center</Link><span className="badge badge-neutral">{category}</span><h1 className="text-balance">{title}</h1></div>
    <hr className="divider" />
    <div style={{fontSize:'var(--text-base)',lineHeight:'var(--leading-relaxed)',color:'var(--color-text-secondary)',whiteSpace:'pre-wrap'}}>{body}</div>
    <hr className="divider" />
    {related.length > 0 && <section className="stack stack-3"><h2>{'Related articles'}</h2><ul style={{listStyle:'none',padding:0,display:'flex',flexDirection:'column',gap:'var(--space-2)'}}>{related.map((rel)=><li key={rel.slug}><Link href={`/help/articles/${rel.slug}`} className="btn-link">→ {ARTICLE_TR[rel.slug]?.title ?? rel.title}</Link></li>)}</ul></section>}
    <div className="card stack stack-3" style={{background:'var(--color-surface-sunken)'}}><h3>{'Still need help?'}</h3><Link href="/contact" className="btn btn-primary" style={{alignSelf:'flex-start'}}>Contact us →</Link></div>
   </div></article></main>
   <SiteFooter />
  </>
 );
}
