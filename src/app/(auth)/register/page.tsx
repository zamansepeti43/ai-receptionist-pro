import type { Metadata } from 'next';
import Link from 'next/link';

import { RegisterForm } from '@/components/auth/RegisterForm';

export const metadata: Metadata = {
  title: 'Create account · AI Receptionist Pro',
  description: 'Create your AI Receptionist Pro account and configure your receptionist.',
  robots: { index: false, follow: false },
};

const TRIAL_INCLUDES = [
  '14-day trial, no card required',
  '500 AI trial conversations',
  'Guided onboarding',
  'Cancel with one click',
] as const;

export default function RegisterPage() {
  return (
    <div className="stack stack-6">
      <div className="stack stack-2">
        <span className="badge badge-success">14-day trial · No card required</span>
        <h1 style={{ fontSize: 'var(--text-3xl)' }}>Create your account</h1>
        <p className="muted">
          It takes about 60 seconds. You can connect your WhatsApp number and calendar in the next
          step.
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
        {TRIAL_INCLUDES.map((item) => (
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
