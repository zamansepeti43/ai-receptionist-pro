import Link from 'next/link';

const VERTICALS = [
  { slug: 'salon', title: 'Salon & Barber', body: 'Appointments by service and duration, with business hours and optional staff-aware configuration.', icon: '✂️' },
  { slug: 'beauty', title: 'Beauty & Wellness', body: 'Handle treatment questions, service durations and appointment requests from one workflow.', icon: '✨' },
  { slug: 'dental', title: 'Dental & Clinic', body: 'Administrative scheduling and customer communication only — no diagnosis or treatment advice.', icon: '🦷' },
  { slug: 'veterinary', title: 'Veterinary', body: 'Appointment intake, service information and human escalation for cases that need staff attention.', icon: '🐾' },
  { slug: 'fitness', title: 'Gym & Fitness', body: 'Coordinate consultations, personal training and other bookable services around real availability.', icon: '🏋️' },
  { slug: 'auto-service', title: 'Auto Service', body: 'Turn service requests into structured appointment requests with duration and resource-aware booking.', icon: '🚗' },
  { slug: 'consulting', title: 'Consulting', body: 'Qualify meeting requests, answer approved FAQs and schedule consultations without double-booking.', icon: '💼' },
] as const;

export function VerticalsSection() {
  return (
    <section className="section section-divider" aria-labelledby="verticals-heading">
      <div className="container stack stack-12">
        <div className="stack stack-4" style={{ maxWidth: '52ch' }}>
          <span className="eyebrow">Sector presets</span>
          <h2 id="verticals-heading" className="text-balance">One core product. Seven starting points.</h2>
          <p className="lead">Each preset gives the business a useful starting configuration. Services, hours, assistant behavior and branding remain editable.</p>
        </div>
        <div className="feature-grid stagger-children">
          {VERTICALS.map((v, index) => (
            <Link key={v.slug} href={`/verticali/${v.slug}`} className="card card-interactive stack stack-4 vertical-card" style={{ textDecoration: 'none', color: 'inherit', '--i': index } as React.CSSProperties}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                <div className="vertical-icon-tile feature-icon-tile" aria-hidden="true" style={{ fontSize: '1.35rem' }}>{v.icon}</div>
                <h3 style={{ fontSize: 'var(--text-lg)', margin: 0 }}>{v.title}</h3>
              </div>
              <p style={{ color: 'var(--color-text-secondary)' }}>{v.body}</p>
              <span className="row plan-card-actions" style={{ gap: 'var(--space-2)', color: 'var(--color-accent-fg)', fontSize: 'var(--text-sm)', fontWeight: 600 }}>Explore preset <span aria-hidden="true">→</span></span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
