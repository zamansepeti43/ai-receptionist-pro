import Link from 'next/link';

export function CtaSection() {
  return (
    <section className="section" aria-labelledby="cta-heading">
      <div className="container">
        <div className="card card-padded stack stack-6 text-center cta-card" style={{ padding: 'clamp(2.5rem, 4vw + 1rem, 4.5rem)', alignItems: 'center' }}>
          <span className="hero-eyebrow">Ready to configure your receptionist?</span>
          <h2 id="cta-heading" className="text-balance" style={{ fontSize: 'var(--text-4xl)', color: 'inherit', maxWidth: '24ch', margin: '0 auto' }}>
            Turn customer messages into completed appointments.
          </h2>
          <p className="lead text-pretty" style={{ maxWidth: '54ch', margin: '0 auto' }}>
            Start with a sector preset, connect the business integrations, and adapt the assistant to the way the business actually works.
          </p>
          <div className="row" style={{ gap: 'var(--space-3)', justifyContent: 'center' }}>
            <Link href="/register" className="btn btn-primary btn-lg">Start setup <span aria-hidden="true">→</span></Link>
            <Link href="/pricing" className="btn btn-secondary btn-lg">View plans</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
