'use client';

import { useMarketingLocale } from '@/components/marketing/MarketingLocaleProvider';
import { LegalPageLayout } from '@/components/marketing/LegalPageLayout';

export default function DpaPage() {
  const { language } = useMarketingLocale();
  const tr = language === 'tr';
  return (
    <LegalPageLayout title={tr ? 'Veri İşleme Sözleşmesi (DPA)' : 'Data Processing Agreement (DPA)'} lastUpdated={tr ? '8 Mayıs 2026' : '8 May 2026'}>
      <p>{tr ? 'Bu sözleşme, GDPR Madde 28 kapsamında AI Receptionist Pro (veri işleyen) ile işletme hesabı sahibi (veri sorumlusu) arasındaki kişisel veri işleme koşullarını açıklar.' : 'This agreement describes personal data processing under GDPR Article 28 between AI Receptionist Pro (processor) and the business account owner (controller).'}</p>
      <h2>{tr ? '1. İşlemenin konusu' : '1. Subject of processing'}</h2>
      <p>{tr ? 'AI Receptionist Pro, son kullanıcı verilerini yalnızca hizmetin sunulması için işler.' : 'AI Receptionist Pro processes end-user data only to provide the Service.'}</p>
      <h2>{tr ? '2. Veri kategorileri' : '2. Data categories'}</h2>
      <ul><li>{tr ? 'İletişim bilgileri: ad, telefon, e-posta.' : 'Contact details: name, phone and email.'}</li><li>{tr ? 'Mesaj içeriği: metin ve sesli mesajlar.' : 'Message content: text and voice messages.'}</li><li>{tr ? 'İşlem verileri: randevular, rezervasyonlar ve ödemeler.' : 'Transaction data: appointments, bookings and payments.'}</li></ul>
      <h2>{tr ? '3. Teknik ve organizasyonel önlemler' : '3. Technical and organisational measures'}</h2>
      <ul><li>Transit sırasında TLS 1.3, depolamada AES-256.</li><li>Postgres satır düzeyinde güvenlik (RLS) ve işletmeler arası izolasyon.</li><li>{tr ? 'Değiştirilemez denetim kayıtları.' : 'Immutable audit logs.'}</li><li>{tr ? 'Şifrelenmiş AB yedekleri; saklama süresi yapılandırmaya tabidir.' : 'Encrypted EU backups; retention is subject to configuration.'}</li><li>{tr ? 'Felaket kurtarma hedefleri kullanılan dağıtıma bağlıdır.' : 'Disaster recovery targets depend on the deployed configuration.'}</li></ul>
      <h2>{tr ? '4. Alt işleyenler' : '4. Sub-processors'}</h2>
      <p>{tr ? 'Alt işleyenlerin güncel listesi ' : 'The current sub-processor list is available at '}<a href="/legal/sub-processors">/legal/sub-processors</a>. {tr ? 'Yeni alt işleyenler için uygulanabilir bildirim koşulları esas alınır.' : 'Applicable notice terms apply to new sub-processors.'}</p>
      <h2>{tr ? '5. İlgili kişilerin hakları' : '5. Data subject rights'}</h2>
      <p>{tr ? 'AI Receptionist Pro, GDPR Madde 15–22 kapsamındaki talepler konusunda, yapılandırılmış dışa aktarma ve silme işlevleri ölçüsünde veri sorumlusuna yardımcı olur.' : 'AI Receptionist Pro assists the controller with GDPR Articles 15–22 requests through configured export and deletion capabilities.'}</p>
      <h2>{tr ? '6. Veri ihlali bildirimi' : '6. Data breach notice'}</h2>
      <p>{tr ? 'İhlal bildirimi, olayın fark edilmesi ve doğrulanmasına ilişkin süreçlere ve taraflar arasındaki sözleşmeye göre yapılır. Veri sorumlusu, düzenleyici kuruma bildirim yükümlülüklerinden sorumludur.' : 'Breach notices are handled according to incident discovery and verification processes and the parties’ agreement. The controller remains responsible for regulatory reporting duties.'}</p>
      <h2>{tr ? '7. Denetim' : '7. Audit'}</h2>
      <p>{tr ? 'İşletme, makul ön bildirim ve kapsam üzerinde anlaşma ile denetim talep edebilir. Maliyet ve erişim koşulları ayrıca kararlaştırılır.' : 'The business may request an audit with reasonable notice and an agreed scope. Costs and access terms are agreed separately.'}</p>
      <h2>{tr ? '8. Sözleşmenin sona ermesi' : '8. Termination'}</h2>
      <p>{tr ? 'Hizmet sona erdiğinde kişisel veriler, uygulanabilir sözleşme, yapılandırma ve yasal saklama yükümlülüklerine göre iade edilir veya silinir.' : 'When the Service ends, personal data is returned or deleted according to the applicable agreement, configuration and legal retention duties.'}</p>
      <p style={{padding:'var(--space-4)',background:'var(--color-accent-soft)',borderRadius:'var(--radius-md)',fontSize:'var(--text-sm)'}}><strong>{tr ? 'İmzalanabilir DPA:' : 'Signable DPA:'}</strong>{' '}{tr ? 'Sözleşme gereksinimleri ve imza süreci için bizimle iletişime geçin.' : 'Contact us for agreement requirements and the signing process.'}</p>
    </LegalPageLayout>
  );
}
