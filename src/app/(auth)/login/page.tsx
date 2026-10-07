import type { Metadata } from 'next';
import Link from 'next/link';

import { LoginForm } from '@/components/auth/LoginForm';

export const metadata: Metadata = {
  title: 'Giriş yap · AI Receptionist Pro',
  description: 'Giriş yap to your AI Receptionist Pro account.',
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <div className="stack stack-6">
      <div className="stack stack-2">
        <h1 style={{ fontSize: 'var(--text-3xl)' }}>Tekrar hoş geldiniz</h1>
        <p className="muted">
          Enter your email and we&apos;ll send you a secure sign-in link. No password to remember.
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
          Don&apos;t have an account yet?{' '}
          <Link href="/register" className="btn-link">
            Hesap oluştur
          </Link>
        </p>
        <p className="muted" style={{ fontSize: 'var(--text-xs)' }}>
          By selecting &quot;Giriş bağlantısı gönder&quot; you agree to the{' '}
          <Link href="/legal/terms" className="btn-link">
            hizmet koşullarını
          </Link>{' '}
          and{' '}
          <Link href="/legal/privacy" className="btn-link">
            gizlilik politikasını
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
