'use client';

import { FormFeedback } from '@/components/forms/FormFeedback';
import { useApiForm } from '@/components/forms/useApiForm';
import { useMarketingLocale } from '@/components/marketing/MarketingLocaleProvider';

export function RegisterForm() {
  const { language } = useMarketingLocale();
  const isTurkish = language === 'tr';
  const verticals = [
    { value: 'dental', label: isTurkish ? 'Diş / Klinik' : 'Dental / Clinic' },
    { value: 'beauty', label: isTurkish ? 'Güzellik / Sağlıklı Yaşam' : 'Beauty / Wellness' },
    { value: 'fitness', label: isTurkish ? 'Spor Salonu / Kişisel Antrenör' : 'Gym / Personal Trainer' },
    { value: 'professional', label: isTurkish ? 'Profesyonel Hizmetler' : 'Professional Services' },
    { value: 'other', label: isTurkish ? 'Diğer' : 'Other' },
  ] as const;

  const { state, onSubmit } = useApiForm({
    endpoint: '/api/auth/sign-up',
    successMessage: isTurkish
      ? 'Hesabınız oluşturuldu. E-posta ve şifrenizle giriş yapabilirsiniz.'
      : 'Your account has been created. You can sign in with your email and password.',
  });
  const isSubmitting = state.status === 'submitting';

  return (
    <form
      onSubmit={(event) => {
        void onSubmit(event);
      }}
      className="stack stack-4"
      noValidate
    >
      <FormFeedback state={state} id="register-form-errors" />
      <div className="field">
        <label htmlFor="business_name" className="label">
          {isTurkish ? 'İşletme veya muayenehane adı' : 'Business or practice name'}
        </label>
        <input
          id="business_name"
          name="business_name"
          type="text"
          autoComplete="organization"
          required
          minLength={2}
          maxLength={120}
          placeholder={isTurkish ? 'Örnek Diş Kliniği' : 'Example Dental Clinic'}
          className="input"
          disabled={isSubmitting}
        />
      </div>
      <div className="field">
        <label htmlFor="email" className="label">
          {isTurkish ? 'İş e-postası' : 'Work email'}
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          required
          maxLength={254}
          placeholder={isTurkish ? 'iletisim@isletme.com' : 'hello@business.com'}
          className="input"
          aria-describedby="register-email-helper"
          disabled={isSubmitting}
        />
        <p className="helper" id="register-email-helper">
          {isTurkish
            ? 'Bu e-posta, çalışma alanınızın ana hesabı olacaktır.'
            : 'This email will be the primary account for your workspace.'}
        </p>
      </div>
      <div className="field">
        <label htmlFor="vertical" className="label">
          {isTurkish ? 'Sektör' : 'Industry'}
        </label>
        <select
          id="vertical"
          name="vertical"
          required
          className="select"
          defaultValue=""
          disabled={isSubmitting}
        >
          <option value="" disabled>
            {isTurkish ? 'Sektörünüzü seçin' : 'Select your industry'}
          </option>
          {verticals.map((vertical) => (
            <option key={vertical.value} value={vertical.value}>
              {vertical.label}
            </option>
          ))}
        </select>
      </div>
      <button type="submit" className="btn btn-primary btn-lg" disabled={isSubmitting}>
        {isSubmitting
          ? isTurkish
            ? 'Hesap oluşturuluyor…'
            : 'Creating account…'
          : isTurkish
            ? 'Hesap oluştur'
            : 'Create account'}
      </button>
    </form>
  );
}
