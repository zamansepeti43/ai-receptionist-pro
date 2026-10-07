import type { Metadata } from 'next';
import Link from 'next/link';

import { LoginForm } from '@/components/auth/LoginForm';

export const metadata: Metadata = {
  title: 'Giriş yap · AI Receptionist Pro',
  description: 'AI Receptionist Pro hesabınıza giriş yapın.',
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <div className="stack stack-6">
      <div className="stack stack-2">
        <h1 style={{ fontSize: 'var(--text-3xl)' }}>Tekrar hoş geldiniz</h1>
        <p className="muted">
          E-postanızı girin; size güvenli bir giriş bağlantısı gönderelim. Şifre hatırlamanız gerekmez.
        </p>
      </div>

      <LoginForm />

      <div
        className="stack stack-3"
        style={{
          paddingTop: 'var(--space-6)',
          borderTop: '1px solid var(--color-border)',
        }}
      >
        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>
          Henüz hesabınız yok mu?{' '}
          <Link href="/register" className="btn-link">
            Hesap oluştur
          </Link>
        </p>
        <p className="muted" style={{ fontSize: 'var(--text-xs)' }}>
          &quot;Giriş bağlantısı gönder&quot; seçeneğini kullanarak{' '}
          <Link href="/legal/terms" className="btn-link">
            hizmet koşullarını
          </Link>{' '}
          ve{' '}
          <Link href="/legal/privacy" className="btn-link">
            gizlilik politikasını
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
