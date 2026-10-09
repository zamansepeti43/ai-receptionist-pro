'use client';

import { useMarketingLocale } from '@/components/marketing/MarketingLocaleProvider';
import { LegalPageLayout } from '@/components/marketing/LegalPageLayout';

export default function CookiePage() {
  const { language } = useMarketingLocale();
  const tr = language === 'tr';
  return (
    <LegalPageLayout title={tr ? 'Çerez Politikası' : 'Cookie Policy'} lastUpdated={tr ? '8 Mayıs 2026' : '8 May 2026'}>
      <p>{tr ? 'AI Receptionist Pro, hizmetin çalışması için kesinlikle gerekli teknik çerezleri kullanır. Üçüncü taraf reklam izleyicileri kullanılmaz.' : 'AI Receptionist Pro uses strictly necessary technical cookies to operate the Service. No third-party advertising trackers are used.'}</p>
      <h2>{tr ? 'Kullanılan çerezler' : 'Cookies in use'}</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 'var(--text-sm)' }}>
        <thead><tr style={{ borderBottom: '2px solid var(--color-border)' }}><th style={{ textAlign: 'left', padding: 'var(--space-3) 0' }}>{tr ? 'Ad' : 'Name'}</th><th style={{ textAlign: 'left', padding: 'var(--space-3) 0' }}>{tr ? 'Amaç' : 'Purpose'}</th><th style={{ textAlign: 'left', padding: 'var(--space-3) 0' }}>{tr ? 'Süre' : 'Duration'}</th></tr></thead>
        <tbody>
          <tr style={{ borderBottom: '1px solid var(--color-border)' }}><td style={{ padding: 'var(--space-3) 0' }}><code>sb-access-token</code></td><td style={{ padding: 'var(--space-3) 0' }}>{tr ? 'Supabase kimliği doğrulanmış oturum' : 'Authenticated Supabase session'}</td><td style={{ padding: 'var(--space-3) 0' }}>{tr ? '1 saat' : '1 hour'}</td></tr>
          <tr style={{ borderBottom: '1px solid var(--color-border)' }}><td style={{ padding: 'var(--space-3) 0' }}><code>sb-refresh-token</code></td><td style={{ padding: 'var(--space-3) 0' }}>{tr ? 'Oturum yenileme' : 'Session refresh'}</td><td style={{ padding: 'var(--space-3) 0' }}>{tr ? '30 gün' : '30 days'}</td></tr>
          <tr style={{ borderBottom: '1px solid var(--color-border)' }}><td style={{ padding: 'var(--space-3) 0' }}><code>__Host-csp-nonce</code></td><td style={{ padding: 'var(--space-3) 0' }}>{tr ? 'XSS koruması için CSP nonce' : 'CSP nonce for XSS protection'}</td><td style={{ padding: 'var(--space-3) 0' }}>{tr ? 'Oturum' : 'Session'}</td></tr>
        </tbody>
      </table>
      <h2>{tr ? 'Pazarlama çerezleri kullanılmaz' : 'No marketing cookies'}</h2>
      <p>{tr ? 'Google Analytics, Facebook Pixel veya davranış izleyicileri kullanmıyoruz. Kullanım ölçümleri yalnızca hizmetin operasyonel verilerinden elde edilir.' : 'We do not use Google Analytics, Facebook Pixel or behavioral trackers. Usage metrics come exclusively from operational Service data.'}</p>
      <h2>{tr ? 'Tarayıcı ayarları' : 'Browser settings'}</h2>
      <p>{tr ? 'Çerezleri tarayıcı ayarlarınızdan devre dışı bırakabilirsiniz. Teknik çerezleri kapatmanız, kimlik doğrulaması gerektiren alanların çalışmasını engelleyebilir.' : 'You can disable cookies in your browser settings. Disabling technical cookies may prevent authenticated areas from working.'}</p>
    </LegalPageLayout>
  );
}
