import type { Metadata } from 'next';
import Link from 'next/link';

import { RegisterForm } from '@/components/auth/RegisterForm';

export const metadata: Metadata = {
  title: 'Create account · AI Receptionist Pro',
  description: 'Create your AI Receptionist Pro account and configure your receptionist.',
  robots: { index: false, follow: false },
};

const SETUP_INCLUDES = [
  'WhatsApp numaranızı bağlayın',
  'Takviminizi bağlayın',
  "İşletme bilgilerini ve SSS'leri yapılandırın",
  'İnsan aktarımı kurallarını belirleyin',
] as const;

export default function RegisterPage() {
  return (
    <div className="stack stack-6">
      <div className="stack stack-2">
        <span className="badge badge-success">Yönlendirmeli kurulum</span>
        <h1 style={{ fontSize: 'var(--text-3xl)' }}>Hesabınızı oluşturun</h1>
        <p className="muted">
          Yaklaşık 60 saniye sürer. Kurulum sırasında WhatsApp numaranızı ve takviminizi bağlayabilirsiniz.
        </p>
      </div>

      <RegisterForm />

      <ul
        className="card stack stack-2"
        style={{
          listStyle: 'none',
          padding: 'var(--space-5)',
          background: 'var(--color-accent-soft)',
          border: '1px solid oklch(85% 0.05 175)',
        }}
      >
        {SETUP_INCLUDES.map((item) => (
          <li
            key={item}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 'var(--space-2)',
              fontSize: 'var(--text-sm)',
            }}
          >
            <span aria-hidden="true" style={{ color: 'var(--color-accent)', fontWeight: 700 }}>
              ✓
            </span>
            {item}
          </li>
        ))}
      </ul>

      <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>
        Zaten bir hesabınız var mı?{' '}
        <Link href="/login" className="btn-link">
          Giriş yap
        </Link>
      </p>
    </div>
  );
}
