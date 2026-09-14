import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Check your email · AI Receptionist Pro',
  description: 'Check your email for a secure AI Receptionist Pro sign-in link.',
  robots: { index: false, follow: false },
};

export default function CheckEmailPage() {
  return (
    <div className="stack stack-6" style={{ textAlign: 'center' }}>
      <div className="stack stack-3">
        <span className="badge badge-success" style={{ alignSelf: 'center' }}>
          Email sent
        </span>
        <h1 style={{ fontSize: 'var(--text-3xl)' }}>Check your email</h1>
        <p className="muted">
          If this address is linked to an account, we&apos;ve sent a secure sign-in link. Open the link in your email to continue.
        </p>
      </div>

      <div
        className="card stack stack-3"
        style={{
          textAlign: 'left',
          background: 'var(--color-accent-soft)',
          border: '1px solid var(--color-border)',
        }}
      >
        <h2 style={{ fontSize: 'var(--text-xl)' }}>Nothing arrived?</h2>
        <ul style={{ paddingLeft: '1.25rem' }}>
          <li>Check your spam or junk folder.</li>
          <li>Make sure you entered the correct email address.</li>
          <li>The sign-in link expires after 10 minutes.</li>
        </ul>
      </div>

      <Link href="/login" className="btn btn-secondary">
        Back to sign in
      </Link>
    </div>
  );
}
