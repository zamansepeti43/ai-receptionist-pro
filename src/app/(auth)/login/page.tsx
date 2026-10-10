'use client';

import Link from 'next/link';

import { LoginForm } from '@/components/auth/LoginForm';
import { useMarketingLocale } from '@/components/marketing/MarketingLocaleProvider';

export default function LoginPage() {
  const { language } = useMarketingLocale();
  const isTurkish = language === 'tr';

  return (
    <div className="stack stack-6">
      <div className="stack stack-2">
        <h1 style={{ fontSize: 'var(--text-3xl)' }}>
          {isTurkish ? 'Tekrar hoş geldiniz' : 'Welcome back'}
        </h1>
        <p className="muted">
          {isTurkish
            ? 'E-posta adresiniz ve şifrenizle güvenli şekilde giriş yapın.'
            : 'Sign in securely with your email address and password.'}
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
          {isTurkish ? 'Henüz hesabınız yok mu?' : "Don't have an account yet?"}{' '}
          <Link href="/register" className="btn-link">
            {isTurkish ? 'Hesap oluştur' : 'Create an account'}
          </Link>
        </p>
        <p className="muted" style={{ fontSize: 'var(--text-xs)' }}>
          {isTurkish
            ? '“Giriş yap” seçeneğini kullanarak'
            : 'By selecting “Sign in” you agree to the'}{' '}
          <Link href="/legal/terms" className="btn-link">
            {isTurkish ? 'hizmet koşullarını' : 'terms of service'}
          </Link>{' '}
          {isTurkish ? 've' : 'and'}{' '}
          <Link href="/legal/privacy" className="btn-link">
            {isTurkish ? 'gizlilik politikasını' : 'privacy policy'}
          </Link>
          {isTurkish ? ' kabul etmiş olursunuz.' : '.'}
        </p>
      </div>
    </div>
  );
}
