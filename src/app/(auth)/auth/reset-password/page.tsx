'use client';

import { useState, type FormEvent } from 'react';
import { useMarketingLocale } from '@/components/marketing/MarketingLocaleProvider';

export default function ResetPasswordPage() {
  const { language } = useMarketingLocale();
  const tr = language === 'tr';
  const [message, setMessage] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const password = String(new FormData(event.currentTarget).get('password') ?? '');
    if (password.length < 8) {
      setMessage(tr ? 'Şifre en az 8 karakter olmalıdır.' : 'Password must be at least 8 characters.');
      return;
    }
    setBusy(true); setMessage(null);
    try {
      const response = await fetch('/api/auth/update-password', {
        method: 'POST', headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      if (!response.ok) throw new Error('update_failed');
      setMessage(tr ? 'Şifreniz güncellendi. Giriş sayfasına yönlendiriliyorsunuz…' : 'Password updated. Redirecting to sign in…');
      setTimeout(() => window.location.assign('/login'), 1200);
    } catch {
      setMessage(tr ? 'Bağlantı geçersiz veya süresi dolmuş olabilir. Yeni bir şifre yenileme e-postası isteyin.' : 'The link may be invalid or expired. Request a new password reset email.');
    } finally { setBusy(false); }
  }

  return <div className="stack stack-4">
    <h1 style={{ fontSize: 'var(--text-3xl)' }}>{tr ? 'Yeni şifre belirleyin' : 'Set a new password'}</h1>
    <p className="muted">{tr ? 'Yeni şifreniz en az 8 karakter olmalıdır.' : 'Your new password must be at least 8 characters.'}</p>
    <form onSubmit={submit} className="stack stack-4">
      <div className="field">
        <label className="label" htmlFor="password">{tr ? 'Yeni şifre' : 'New password'}</label>
        <input className="input" id="password" name="password" type="password" autoComplete="new-password" minLength={8} maxLength={128} required disabled={busy} />
      </div>
      <button className="btn btn-primary btn-lg" type="submit" disabled={busy}>{busy ? (tr ? 'Kaydediliyor…' : 'Saving…') : (tr ? 'Şifreyi güncelle' : 'Update password')}</button>
    </form>
    {message && <p role="status" className="muted">{message}</p>}
  </div>;
}
