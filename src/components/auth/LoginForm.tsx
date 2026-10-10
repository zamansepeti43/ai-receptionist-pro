'use client';

import { useState, type FormEvent } from 'react';
import { FormFeedback } from '@/components/forms/FormFeedback';
import { useMarketingLocale } from '@/components/marketing/MarketingLocaleProvider';

type State = { status: 'idle' | 'submitting' | 'success' | 'error'; message: string | null };

export function LoginForm() {
  const { language } = useMarketingLocale();
  const tr = language === 'tr';
  const [state, setState] = useState<State>({ status: 'idle', message: null });

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setState({ status: 'submitting', message: null });
    try {
      const response = await fetch('/api/auth/sign-in', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email: data.get('email'), password: data.get('password') }),
      });
      if (!response.ok) {
        setState({
          status: 'error',
          message: tr
            ? 'E-posta veya şifre hatalı. Bilgilerinizi kontrol edin.'
            : 'Email or password is incorrect. Check your details.',
        });
        return;
      }
      window.location.assign('/dashboard');
    } catch {
      setState({
        status: 'error',
        message: tr ? 'Bağlantı kurulamadı. Tekrar deneyin.' : 'Connection failed. Please try again.',
      });
    }
  }

  async function resetPassword() {
    const form = document.querySelector<HTMLFormElement>('#login-form');
    if (!form) return;
    const email = new FormData(form).get('email');
    if (typeof email !== 'string' || !email.trim()) {
      setState({
        status: 'error',
        message: tr ? 'Önce e-posta adresinizi girin.' : 'Enter your email address first.',
      });
      return;
    }
    setState({ status: 'submitting', message: null });
    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!response.ok) throw new Error('reset_failed');
      setState({
        status: 'success',
        message: tr
          ? 'Adres bir hesaba bağlıysa şifre yenileme e-postası gönderildi.'
          : 'If the address belongs to an account, a password reset email has been sent.',
      });
    } catch {
      setState({
        status: 'error',
        message: tr
          ? 'Şifre yenileme e-postası gönderilemedi. Tekrar deneyin.'
          : 'Could not send the reset email. Please try again.',
      });
    }
  }

  return (
    <form id="login-form" onSubmit={submit} className="stack stack-4" noValidate>
      <FormFeedback state={state} id="login-form-errors" />
      <div className="field">
        <label htmlFor="email" className="label">{tr ? 'E-posta' : 'Email'}</label>
        <input id="email" name="email" type="email" autoComplete="email" inputMode="email" required maxLength={254} placeholder={tr ? 'siz@isletme.com' : 'you@business.com'} className="input" disabled={state.status === 'submitting'} />
      </div>
      <div className="field">
        <label htmlFor="password" className="label">{tr ? 'Şifre' : 'Password'}</label>
        <input id="password" name="password" type="password" autoComplete="current-password" required minLength={8} maxLength={128} className="input" disabled={state.status === 'submitting'} />
      </div>
      <button type="submit" className="btn btn-primary btn-lg" disabled={state.status === 'submitting'}>
        {state.status === 'submitting' ? (tr ? 'Kontrol ediliyor…' : 'Signing in…') : (tr ? 'Giriş yap' : 'Sign in')}
      </button>
      <button type="button" className="btn-link" onClick={resetPassword} disabled={state.status === 'submitting'}>
        {tr ? 'Şifremi unuttum' : 'Forgot password?'}
      </button>
    </form>
  );
}
