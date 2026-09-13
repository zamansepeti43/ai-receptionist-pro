'use client';

import { FormFeedback } from '@/components/forms/FormFeedback';
import { useApiForm } from '@/components/forms/useApiForm';

const TOPICS = [
  { value: 'sales', label: 'I want to try AI Receptionist Pro' },
  { value: 'support', label: 'I need support' },
  { value: 'agency', label: "I'm an agency / partner" },
  { value: 'press', label: 'Press / media' },
  { value: 'other', label: 'Other' },
] as const;

export function ContactForm() {
  const { state, onSubmit } = useApiForm({
    endpoint: '/api/contact',
    successMessage: 'Message sent. We will get back to you within one business day.',
    buildBody: (formData) => ({
      name: String(formData.get('name') ?? ''),
      email: String(formData.get('email') ?? ''),
      company: formData.get('company') ? String(formData.get('company')) : null,
      topic: String(formData.get('topic') ?? ''),
      message: String(formData.get('message') ?? ''),
      consent: formData.get('consent') === 'on',
    }),
  });

  const isSubmitting = state.status === 'submitting';

  return (
    <form onSubmit={onSubmit} className="card card-padded stack stack-5" noValidate>
      <FormFeedback state={state} id="contact-form-errors" />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'var(--space-4)',
        }}
      >
        <div className="field">
          <label htmlFor="name" className="label">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            maxLength={120}
            autoComplete="name"
            className="input"
            placeholder="Mario Rossi"
            disabled={isSubmitting}
          />
        </div>
        <div className="field">
          <label htmlFor="email" className="label">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            maxLength={254}
            autoComplete="email"
            className="input"
            placeholder="mario@company.com"
            disabled={isSubmitting}
          />
        </div>
      </div>

      <div className="field">
        <label htmlFor="company" className="label">
          Company or practice
        </label>
        <input
          id="company"
          name="company"
          type="text"
          maxLength={160}
          autoComplete="organization"
          className="input"
          disabled={isSubmitting}
        />
      </div>

      <div className="field">
        <label htmlFor="topic" className="label">
          What can we help with?
        </label>
        <select
          id="topic"
          name="topic"
          required
          className="select"
          defaultValue=""
          disabled={isSubmitting}
        >
          <option value="" disabled>
            Select a topic
          </option>
          {TOPICS.map((topic) => (
            <option key={topic.value} value={topic.value}>
              {topic.label}
            </option>
          ))}
        </select>
      </div>

      <div className="field">
        <label htmlFor="message" className="label">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          maxLength={5000}
          rows={6}
          className="textarea"
          placeholder="Tell us how we can help."
          disabled={isSubmitting}
        />
      </div>

      <div className="row" style={{ gap: 'var(--space-2)', alignItems: 'flex-start' }}>
        <input id="consent" name="consent" type="checkbox" required disabled={isSubmitting} />
        <label
          htmlFor="consent"
          className="muted"
          style={{ fontSize: 'var(--text-sm)', lineHeight: 1.5 }}
        >
          I consent to the processing of my data for contact purposes as described in the{' '}
          <a href="/legal/privacy" className="btn-link">
            privacy policy
          </a>
          .
        </label>
      </div>

      <button type="submit" className="btn btn-primary btn-lg" disabled={isSubmitting}>
        {isSubmitting ? 'Sending…' : 'Send message'}
      </button>
    </form>
  );
}
