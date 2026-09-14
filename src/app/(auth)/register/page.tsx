import type { Metadata } from 'next';
import Link from 'next/link';

import { RegisterForm } from '@/components/auth/RegisterForm';

export const metadata: Metadata = {
  title: 'Create account · AI Receptionist Pro',
  description: 'Create your AI Receptionist Pro account and configure your receptionist.',
  robots: { index: false, follow: false },
};

const SETUP_INCLUDES = [
  'Connect your WhatsApp number',
  'Connect your calendar',
  'Configure business knowledge and FAQs',
  'Set human handoff rules',
] as const;

export default function RegisterPage() {
  return (
    <div className="stack stack-6">
      <div className="stack stack-2">
        <span className="badge badge-success">Guided setup</span>
        <h1 style={{ fontSize: 'var(--text-3xl)' }}>Create your account</h1>
        <p className="muted">
          It takes about 60 seconds. You can connect your WhatsApp number and calendar during setup.
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
        Already have an account?{' '}
        <Link href="/login" className="btn-link">
          Sign in
        </Link>
      </p>
    </div>
  );
}
