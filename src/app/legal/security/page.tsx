'use client';

import { useMarketingLocale } from '@/components/marketing/MarketingLocaleProvider';
import { LegalPageLayout } from '@/components/marketing/LegalPageLayout';

export default function SecurityPage() {
  const { language } = useMarketingLocale();
  const tr = language === 'tr';
  return (
    <LegalPageLayout title={tr ? 'Güvenlik ve Uyumluluk' : 'Security and Compliance'} lastUpdated={tr ? '8 Mayıs 2026' : '8 May 2026'}>
      <p>{tr ? 'Güvenlik, sistem mimarisinin bir parçasıdır. Bu sayfa, ürünün yapılandırmasına ve dağıtımına bağlı olan güvenlik önlemlerinin genel görünümünü sunar.' : 'Security is part of the system architecture. This page provides an overview of security controls that depend on product configuration and deployment.'}</p>
      <h2>{tr ? 'Mimari' : 'Architecture'}</h2>
      <ul><li><strong>Next.js App Router</strong> with {tr ? 'XSS koruması için CSP nonce kullanımı.' : 'CSP nonces for XSS protection.'}</li><li><strong>Supabase Postgres</strong> with Row-Level Security.</li><li>{tr ? 'Veritabanı düzeyinde çoklu işletme izolasyonu.' : 'Multi-tenant isolation at database level.'}</li><li>{tr ? 'Webhook ve ara katman yazılımı için uç çalışma zamanı.' : 'Edge runtime for webhooks and middleware.'}</li></ul>
      <h2>{tr ? 'Şifreleme' : 'Encryption'}</h2>
      <ul><li>TLS 1.3 in transit, where supported.</li><li>{tr ? 'Yönetilen veritabanı hizmeti tarafından sağlanan depolama şifrelemesi.' : 'At-rest encryption provided by the managed database service.'}</li><li>{tr ? 'Uygun ortamlarda güvenli, httpOnly ve sameSite çerezler.' : 'Secure, httpOnly and sameSite cookies in supported environments.'}</li><li>{tr ? 'Stripe ve WhatsApp webhook imzalarının doğrulanması.' : 'Signature verification for Stripe and WhatsApp webhooks.'}</li></ul>
      <h2>{tr ? 'Güvenlik başlıkları' : 'Security headers'}</h2>
      <ul><li>Content-Security-Policy with per-request nonce</li><li>Strict-Transport-Security where HTTPS is enabled</li><li>X-Content-Type-Options: nosniff</li><li>X-Frame-Options: DENY</li><li>Referrer-Policy: strict-origin-when-cross-origin</li><li>Permissions-Policy according to app requirements</li><li>Cross-Origin-Opener-Policy and related isolation headers where configured</li></ul>
      <h2>{tr ? 'İstek sınırlandırma' : 'Rate limiting'}</h2>
      <p>{tr ? 'Kimlik doğrulama, kurulum, ayar değişiklikleri ve veri hakları uç noktalarında istek sınırlandırma kuralları uygulanabilir. Etkin kurallar dağıtım yapılandırmasına bağlıdır.' : 'Rate limiting can be applied to authentication, onboarding, settings changes and data-rights endpoints. Active policies depend on deployment configuration.'}</p>
      <h2>{tr ? 'Kayıtlar ve kişisel veriler' : 'Logs and personal data'}</h2>
      <ul><li>{tr ? 'Yapılandırılmış uygulama kayıtları.' : 'Structured application logs.'}</li><li>{tr ? 'Hassas alanlar, yapılandırılmış redaksiyon kurallarına göre gizlenir.' : 'Sensitive fields are redacted according to configured rules.'}</li><li>{tr ? 'Üretim ortamında gereksiz kişisel veri kaydından kaçınılır.' : 'Unnecessary personal-data logging is avoided in production.'}</li></ul>
      <h2>GDPR</h2>
      <ul><li>{tr ? 'Uygun olduğu ölçüde veri dışa aktarma ve silme iş akışları.' : 'Data export and deletion workflows where available.'}</li><li>{tr ? 'Hassas işlemler için denetim kayıtları.' : 'Audit logs for sensitive actions.'}</li><li>{tr ? 'Veri işleme sözleşmesi ve alt işleyen bilgileri.' : 'Data processing agreement and sub-processor information.'}</li></ul>
      <h2>{tr ? 'Olay müdahalesi' : 'Incident response'}</h2>
      <p>{tr ? 'Güvenlik olayları, olay müdahale prosedürleri ve müşteri sözleşmelerinde belirtilen koşullara göre ele alınır.' : 'Security incidents are handled according to incident-response procedures and customer agreement terms.'}</p>
      <h2>{tr ? 'Güvenlik açığı bildirimi' : 'Vulnerability disclosure'}</h2>
      <p>{tr ? 'Güvenlik açığı bildirimleri için ' : 'To report a vulnerability, contact '}<a href="mailto:security@ambrogio.ai">security@ambrogio.ai</a>.</p>
    </LegalPageLayout>
  );
}
