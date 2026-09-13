const STEPS = [
  { n: '01', title: 'Configure the business', body: 'Set the business identity, sector, services, working hours, assistant behavior and knowledge base.' },
  { n: '02', title: 'Connect the integrations', body: 'Connect WhatsApp Business, Google Calendar and any optional providers using accounts owned by the business.' },
  { n: '03', title: 'Let the workflow run', body: 'Customers ask questions and request appointments. The assistant checks real availability, books, confirms, and hands off to a human when needed.' },
] as const;

export function HowItWorksSection() {
  return (
    <section className="section section-divider" id="how-it-works" aria-labelledby="how-heading" style={{ background: 'var(--color-surface-sunken)' }}>
      <div className="container stack stack-12">
        <div className="stack stack-4" style={{ maxWidth: '52ch' }}>
          <span className="eyebrow">How it works</span>
          <h2 id="how-heading" className="text-balance">Three steps from setup to a working digital receptionist.</h2>
          <p className="lead">The product keeps configuration separate from the business logic, so a buyer can adapt the same application to different service businesses.</p>
        </div>
        <ol className="grid stagger-children" style={{ listStyle: 'none', padding: 0, gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
          {STEPS.map((step, index) => (
            <li key={step.n} className="card card-padded stack stack-4 step-card" style={{ background: 'var(--color-surface)', '--i': index } as React.CSSProperties}>
              <span className="step-number" aria-hidden="true">{step.n}</span>
              <h3 style={{ fontSize: 'var(--text-xl)' }}>{step.title}</h3>
              <p style={{ color: 'var(--color-text-secondary)' }}>{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
