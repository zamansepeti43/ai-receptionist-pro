'use client';

import Link from 'next/link';
import { RegisterForm } from '@/components/auth/RegisterForm';
import { useMarketingLocale } from '@/components/marketing/MarketingLocaleProvider';

export default function RegisterPage() {
  const { language } = useMarketingLocale();
  const isTurkish = language === 'tr';
  const setupIncludes = isTurkish
    ? ['WhatsApp numaranızı bağlayın', 'Takviminizi bağlayın', "İşletme bilgilerini ve SSS'leri yapılandırın", 'İnsan aktarımı kurallarını belirleyin']
    : ['Connect your WhatsApp number', 'Connect your calendar', 'Configure business knowledge and FAQs', 'Set human handoff rules'];

  return (
    <div className="stack stack-6">
      <div className="stack stack-2">
        <span className="badge badge-success">{isTurkish ? 'Yönlendirmeli kurulum' : 'Guided setup'}</span>
        <h1 style={{ fontSize: 'var(--text-3xl)' }}>{isTurkish ? 'Hesabınızı oluşturun' : 'Create your account'}</h1>
        <p className="muted">
          {isTurkish
            ? 'Yaklaşık 60 saniye sürer. Kurulum sırasında WhatsApp numaranızı ve takviminizi bağlayabilirsiniz.'
            : 'It takes about 60 seconds. You can connect your WhatsApp number and calendar during setup.'}
        </p>
      </div>
      <RegisterForm />
      <ul className="card stack stack-2" style={{ listStyle: 'none', padding: 'var(--space-5)', background: 'var(--color-accent-soft)', border: '1px solid oklch(85% 0.05 175)' }}>
        {setupIncludes.map((item) => (
          <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-2)', fontSize: 'var(--text-sm)' }}>
            <span aria-hidden="true" style={{ color: 'var(--color-accent)', fontWeight: 700 }}>✓</span>
            {item}
          </li>
        ))}
      </ul>
      <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>
        {isTurkish ? 'Zaten bir hesabınız var mı?' : 'Already have an account?'}{' '}
        <Link href="/login" className="btn-link">{isTurkish ? 'Giriş yap' : 'Sign in'}</Link>
      </p>
    </div>
  );
}
