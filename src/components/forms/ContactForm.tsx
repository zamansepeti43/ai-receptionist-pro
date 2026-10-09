'use client';

import { FormFeedback } from '@/components/forms/FormFeedback';
import { useApiForm } from '@/components/forms/useApiForm';
import { useMarketingLocale } from '@/components/marketing/MarketingLocaleProvider';

export function ContactForm() {
  const { language } = useMarketingLocale();
  const tr = language === 'tr';
  const topics = tr
    ? [
        { value: 'sales', label: 'AI Receptionist Pro’yu denemek istiyorum' },
        { value: 'support', label: 'Destek almak istiyorum' },
        { value: 'agency', label: 'Ajans / iş ortağıyım' },
        { value: 'press', label: 'Basın / medya' },
        { value: 'other', label: 'Diğer' },
      ] as const
    : [
        { value: 'sales', label: 'I want to try AI Receptionist Pro' },
        { value: 'support', label: 'I need support' },
        { value: 'agency', label: "I'm an agency / partner" },
        { value: 'press', label: 'Press / media' },
        { value: 'other', label: 'Other' },
      ] as const;

  const { state, onSubmit } = useApiForm({
    endpoint: '/api/contact',
    successMessage: tr ? 'Mesajınız gönderildi. Bir iş günü içinde size dönüş yapacağız.' : 'Message sent. We will get back to you within one business day.',
    buildBody: (formData) => ({
      name: String(formData.get('name') ?? ''),
      email: String(formData.get('email') ?? ''),
      company: formData.get('company') ? String(formData.get('company')) : null,
      topic: String(formData.get('topic') ?? ''),
      message: String(formData.get('message') ?? ''),
      consent: formData.get('consent') === 'on',
    }),
  });
  const busy = state.status === 'submitting';

  return (
    <form onSubmit={onSubmit} className="card card-padded stack stack-5" noValidate>
      <FormFeedback state={state} id="contact-form-errors" />
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'var(--space-4)'}}>
        <div className="field"><label htmlFor="name" className="label">{tr?'Ad soyad':'Name'}</label><input id="name" name="name" type="text" required maxLength={120} autoComplete="name" className="input" placeholder={tr?'Adınız soyadınız':'Your name'} disabled={busy}/></div>
        <div className="field"><label htmlFor="email" className="label">{tr?'E-posta':'Email'}</label><input id="email" name="email" type="email" required maxLength={254} autoComplete="email" className="input" placeholder={tr?'ornek@sirket.com':'name@company.com'} disabled={busy}/></div>
      </div>
      <div className="field"><label htmlFor="company" className="label">{tr?'Şirket veya işletme':'Company or practice'}</label><input id="company" name="company" type="text" maxLength={160} autoComplete="organization" className="input" disabled={busy}/></div>
      <div className="field"><label htmlFor="topic" className="label">{tr?'Hangi konuda yardımcı olabiliriz?':'What can we help with?'}</label><select id="topic" name="topic" required className="select" defaultValue="" disabled={busy}><option value="" disabled>{tr?'Bir konu seçin':'Select a topic'}</option>{topics.map((topic)=><option key={topic.value} value={topic.value}>{topic.label}</option>)}</select></div>
      <div className="field"><label htmlFor="message" className="label">{tr?'Mesaj':'Message'}</label><textarea id="message" name="message" required maxLength={5000} rows={6} className="textarea" placeholder={tr?'Size nasıl yardımcı olabileceğimizi anlatın.':'Tell us how we can help.'} disabled={busy}/></div>
      <div className="row" style={{gap:'var(--space-2)',alignItems:'flex-start'}}><input id="consent" name="consent" type="checkbox" required disabled={busy}/><label htmlFor="consent" className="muted" style={{fontSize:'var(--text-sm)',lineHeight:1.5}}>{tr?'İletişim amacıyla verilerimin işlenmesini, ':'I consent to the processing of my data for contact purposes as described in the '}<a href="/legal/privacy" className="btn-link">{tr?'gizlilik politikasında':'privacy policy'}</a>{tr?' açıklandığı şekilde kabul ediyorum.':'.'}</label></div>
      <button type="submit" className="btn btn-primary btn-lg" disabled={busy}>{busy?(tr?'Gönderiliyor…':'Sending…'):(tr?'Mesajı gönder':'Send message')}</button>
    </form>
  );
}
