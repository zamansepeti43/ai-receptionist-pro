'use client';

import { FormFeedback } from '@/components/forms/FormFeedback';
import { useApiForm } from '@/components/forms/useApiForm';
import { useMarketingLocale } from '@/components/marketing/MarketingLocaleProvider';

export function LoginForm() {
  const { language } = useMarketingLocale();
  const isTurkish = language === 'tr';
  const { state, onSubmit } = useApiForm({
    endpoint: '/api/auth/magic-link',
    successMessage: isTurkish
      ? 'Adres bir hesaba bağlıysa kısa süre içinde giriş bağlantısı alacaksınız. İstenmeyen e-posta klasörünüzü de kontrol edin.'
      : 'If the address is linked to an account, you will receive a sign-in link shortly. Check your spam folder too.',
    redirectTo: '/login/check-email',
  });

  return (
    <form onSubmit={onSubmit} className="stack stack-4" noValidate>
      <FormFeedback state={state} id="login-form-errors" />
      <div className="field">
        <label htmlFor="email" className="label">
          {isTurkish ? 'E-posta' : 'Email'}
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          required
          placeholder={isTurkish ? 'siz@isletme.com' : 'you@business.com'}
          className="input"
          aria-describedby="login-email-helper"
          disabled={state.status === 'submitting'}
        />
        <p className="helper" id="login-email-helper">
          {isTurkish
            ? '10 dakika içinde süresi dolan güvenli bir giriş bağlantısını e-postanıza göndereceğiz.'
            : 'We will send you a secure sign-in link that expires after 10 minutes.'}
        </p>
      </div>
      <button
        type="submit"
        className="btn btn-primary btn-lg"
        disabled={state.status === 'submitting'}
      >
        {state.status === 'submitting'
          ? isTurkish
            ? 'Gönderiliyor…'
            : 'Sending…'
          : isTurkish
            ? 'Giriş bağlantısı gönder'
            : 'Send sign-in link'}
      </button>
    </form>
  );
}
