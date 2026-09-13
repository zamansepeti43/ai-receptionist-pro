'use client';

import { FormFeedback } from '@/components/forms/FormFeedback';
import { useApiForm } from '@/components/forms/useApiForm';

const VERTICALS = [
  { value: 'dental', label: 'Dental / Clinic' },
  { value: 'beauty', label: 'Beauty / Wellness' },
  { value: 'fitness', label: 'Gym / Personal Trainer' },
  { value: 'professional', label: 'Professional Services' },
  { value: 'other', label: 'Other' },
] as const;

export function RegisterForm() {
  const { state, onSubmit } = useApiForm({
    endpoint: '/api/auth/sign-up',
    successMessage:
      'Account created. We sent you a sign-in link by email. Open it to finish setup.',
  });

  const isSubmitting = state.status === 'submitting';

  return (
    <form onSubmit={onSubmit} className="stack stack-4" noValidate>
      <FormFeedback state={state} id="register-form-errors" />
      <div className="field">
        <label htmlFor="business_name" className="label">
          Business or practice name
        </label>
        <input
          id="business_name"
          name="business_name"
          type="text"
          autoComplete="organization"
          required
          minLength={2}
          maxLength={120}
          placeholder="Rossi Dental Clinic"
          className="input"
          disabled={isSubmitting}
        />
      </div>
      <div className="field">
        <label htmlFor="email" className="label">
          Work email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          required
          maxLength={254}
          placeholder="hello@business.com"
          className="input"
          aria-describedby="register-email-helper"
          disabled={isSubmitting}
        />
        <p className="helper" id="register-email-helper">
          This email will be the primary account for your workspace.
        </p>
      </div>
      <div className="field">
        <label htmlFor="vertical" className="label">
          Industry
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
            Select your industry
          </option>
          {VERTICALS.map((vertical) => (
            <option key={vertical.value} value={vertical.value}>
              {vertical.label}
            </option>
          ))}
        </select>
      </div>
      <button type="submit" className="btn btn-primary btn-lg" disabled={isSubmitting}>
        {isSubmitting ? 'Creating account…' : 'Create account'}
      </button>
    </form>
  );
}
