'use client';

import { useMarketingLocale } from '@/components/marketing/MarketingLocaleProvider';
import { LegalPageLayout } from '@/components/marketing/LegalPageLayout';

export default function TermsPage() {
  const { language } = useMarketingLocale();
  const tr = language === 'tr';
  if (!tr) {
    return (
      <LegalPageLayout title="Terms of Service" lastUpdated="8 May 2026">
        <p>These terms govern the use of AI Receptionist Pro. By creating an account, you agree to these terms.</p>
        <h2>1. Definitions</h2>
        <ul>
          <li><strong>Service:</strong> AI Receptionist Pro SaaS platform for managing reception workflows over WhatsApp and voice.</li>
          <li><strong>Tenant:</strong> the business customer using the Service.</li>
          <li><strong>End user:</strong> a Tenant’s customer interacting through supported channels.</li>
        </ul>
        <h2>2. Scope</h2>
        <p>AI Receptionist Pro grants the Tenant a non-exclusive, non-transferable, revocable license to access the features included in the selected plan.</p>
        <h2>3. Tenant responsibilities</h2>
        <ul><li>Provide accurate onboarding information.</li><li>Obtain the consents required from end users.</li><li>Do not use the Service for unlawful purposes, spam or abuse.</li><li>Follow Meta WhatsApp Business policies.</li></ul>
        <h2>4. Limitation of liability</h2>
        <p>The Service is provided as is. To the extent permitted by applicable law, aggregate liability is limited to the amount paid by the Tenant during the 12 months preceding the event.</p>
        <h2>5. Service level</h2>
        <p>Any availability target or service credit is governed by the published service-level terms, where applicable.</p>
        <h2>6. Payments and invoicing</h2>
        <ul><li>Monthly or annual payment through the configured billing provider.</li><li>Electronic invoicing is provided where configured and legally applicable.</li><li>Non-payment may result in suspension after notice.</li></ul>
        <h2>7. Cancellation</h2>
        <p>You can request cancellation from the dashboard. Refunds, if any, are subject to the selected plan and applicable law.</p>
        <h2>8. Governing law</h2>
        <p>Governing law and venue are determined by the applicable customer agreement and mandatory law.</p>
      </LegalPageLayout>
    );
  }
  return (
    <LegalPageLayout title="Hizmet Koşulları" lastUpdated="8 Mayıs 2026">
      <p>Bu koşullar AI Receptionist Pro hizmetinin kullanımını düzenler. Hesap oluşturarak bu koşulları kabul etmiş olursunuz.</p>
      <h2>1. Tanımlar</h2>
      <ul>
        <li><strong>Hizmet:</strong> WhatsApp ve sesli iletişim üzerinden resepsiyon iş akışlarını yönetmek için sunulan AI Receptionist Pro yazılım hizmeti.</li>
        <li><strong>İşletme hesabı:</strong> hizmeti kullanan müşteri işletme.</li>
        <li><strong>Son kullanıcı:</strong> desteklenen iletişim kanalları üzerinden işletmeyle görüşen müşteri.</li>
      </ul>
      <h2>2. Kapsam</h2>
      <p>AI Receptionist Pro, seçilen planda bulunan özelliklere erişim için işletmeye münhasır olmayan, devredilemeyen ve geri alınabilir bir kullanım lisansı verir.</p>
      <h2>3. İşletmenin sorumlulukları</h2>
      <ul><li>Kurulum sırasında doğru bilgiler sağlamak.</li><li>Son kullanıcılardan gerekli izin ve onayları almak.</li><li>Hizmeti hukuka aykırı amaçlarla, spam veya kötüye kullanım için kullanmamak.</li><li>Meta WhatsApp Business politikalarına uymak.</li></ul>
      <h2>4. Sorumluluğun sınırlandırılması</h2>
      <p>Hizmet mevcut hâliyle sunulur. Uygulanabilir hukukun izin verdiği ölçüde toplam sorumluluk, olaydan önceki 12 ayda işletmenin ödediği tutarla sınırlıdır.</p>
      <h2>5. Hizmet seviyesi</h2>
      <p>Varsa hizmet sürekliliği hedefleri ve hizmet kredileri, yayımlanan hizmet seviyesi koşullarına tabidir.</p>
      <h2>6. Ödeme ve faturalandırma</h2>
      <ul><li>Yapılandırılmış faturalandırma sağlayıcısı üzerinden aylık veya yıllık ödeme.</li><li>Elektronik faturalandırma, yapılandırıldığı ve mevzuatça uygulanabildiği ölçüde sağlanır.</li><li>Ödeme yapılmaması, bildirimden sonra hizmetin askıya alınmasına yol açabilir.</li></ul>
      <h2>7. İptal</h2>
      <p>Hesap panelinden iptal talebi oluşturabilirsiniz. Varsa iadeler, seçilen plan ve yürürlükteki mevzuata tabidir.</p>
      <h2>8. Uygulanacak hukuk</h2>
      <p>Uygulanacak hukuk ve yetkili merci, müşteri sözleşmesine ve emredici hukuk kurallarına göre belirlenir.</p>
    </LegalPageLayout>
  );
}
