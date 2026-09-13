'use client';

import { FormFeedback } from '@/components/forms/FormFeedback';
import { useApiForm } from '@/components/forms/useApiForm';
import { LAUNCH_PRESETS } from '@/config/launch-presets';

interface Option {
  readonly value: string;
  readonly label: string;
}
interface OnboardingFormProps {
  readonly verticals: readonly Option[];
  readonly timezones: readonly Option[];
  readonly prefilledBusinessName: string;
  readonly prefilledVertical: string;
}

const SECTOR_LABELS: Record<string, string> = {
  salon: 'Salon & Barber',
  beauty: 'Beauty & Wellness',
  dental: 'Dental & Clinic',
  veterinary: 'Veterinary',
  fitness: 'Gym & Fitness',
  'auto-service': 'Auto Service',
  consulting: 'Consulting & Professional Services',
};

export function OnboardingForm({
  timezones,
  prefilledBusinessName,
  prefilledVertical,
}: OnboardingFormProps) {
  const { state, onSubmit } = useApiForm({
    endpoint: '/api/onboarding/tenant',
    successMessage: 'Business configured.',
    redirectTo: '/dashboard',
    buildBody: (formData) => ({
      tenantName: String(formData.get('business_name') ?? ''),
      businessType: formData.get('vertical') ? String(formData.get('vertical')) : null,
      timezone: String(formData.get('timezone') ?? 'Europe/Rome'),
    }),
  });
  const isSubmitting = state.status === 'submitting';
  const sectorOptions = LAUNCH_PRESETS.map((preset) => ({
    value: preset.id,
    label: SECTOR_LABELS[preset.id] ?? preset.name,
  }));

  return (
    <form onSubmit={onSubmit} className="stack stack-5" noValidate>
      <FormFeedback state={state} id="onboarding-form-errors" />
      <div className="field">
        <label htmlFor="business_name" className="label">
          Business name
        </label>
        <input
          id="business_name"
          name="business_name"
          type="text"
          autoComplete="organization"
          required
          minLength={2}
          maxLength={120}
          placeholder="Rossi Studio"
          className="input"
          defaultValue={prefilledBusinessName}
          disabled={isSubmitting}
        />
      </div>
      <div className="field">
        <label htmlFor="vertical" className="label">
          Business sector
        </label>
        <select
          id="vertical"
          name="vertical"
          required
          className="select"
          defaultValue={prefilledVertical}
          disabled={isSubmitting}
        >
          <option value="" disabled>
            Select a sector
          </option>
          {sectorOptions.map((sector) => (
            <option key={sector.value} value={sector.value}>
              {sector.label}
            </option>
          ))}
        </select>
      </div>
      <div className="field">
        <label htmlFor="timezone" className="label">
          Timezone
        </label>
        <select
          id="timezone"
          name="timezone"
          required
          className="select"
          defaultValue="Europe/Rome"
          disabled={isSubmitting}
        >
          {timezones.map((timezone) => (
            <option key={timezone.value} value={timezone.value}>
              {timezone.label}
            </option>
          ))}
        </select>
      </div>
      <p
        className="helper"
        style={{
          background: 'var(--color-accent-soft)',
          padding: 'var(--space-3) var(--space-4)',
          borderRadius: 'var(--radius-md)',
          color: 'var(--color-text-secondary)',
        }}
      >
        <strong>Billing details</strong> can be configured after the business profile. Start with
        the information needed to personalize the receptionist.
      </p>
      <div className="row" style={{ gap: 'var(--space-3)', marginTop: 'var(--space-2)' }}>
        <button type="submit" className="btn btn-primary btn-lg" disabled={isSubmitting}>
          {isSubmitting ? 'Saving…' : 'Continue →'}
        </button>
      </div>
    </form>
  );
}
