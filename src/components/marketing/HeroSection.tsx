import Link from 'next/link';
import { PRODUCT_IDENTITY } from '@/config/product-identity';

export function HeroSection() {
  return (
    <section className="hero" aria-labelledby="hero-heading">
      <div className="container hero-grid">
        <div className="stack stack-6 animate-fade-up">
          <span className="hero-eyebrow">24/7 AI receptionist · WhatsApp first</span>
          <h1 id="hero-heading" className="display text-balance">
            Your front desk, always on.
          </h1>
          <p className="lead text-pretty">
            {PRODUCT_IDENTITY.name} answers customer questions, checks real availability, books
            appointments, confirms changes, and hands conversations to a human when automation
            should stop.
          </p>
          <div className="row" style={{ gap: 'var(--space-3)', marginTop: 'var(--space-2)' }}>
            <Link href="/register" className="btn btn-primary btn-lg">
              Start your setup <span aria-hidden="true">→</span>
            </Link>
            <Link href="/#how-it-works" className="btn btn-secondary btn-lg">
              See how it works
            </Link>
          </div>
          <div
            className="row"
            style={{
              gap: 'var(--space-8)',
              marginTop: 'var(--space-6)',
              paddingTop: 'var(--space-6)',
              borderTop: '1px solid var(--color-border)',
            }}
          >
            <div className="stat">
              <span className="stat-value">24/7</span>
              <span className="stat-label">Customer coverage</span>
            </div>
            <div className="stat">
              <span className="stat-value">7</span>
              <span className="stat-label">Sector presets</span>
            </div>
            <div className="stat">
              <span className="stat-value">AI</span>
              <span className="stat-label">Human handoff</span>
            </div>
          </div>
        </div>
        <div className="card card-padded stack stack-4" aria-label="Reception workflow preview">
          <div className="stack stack-3">
            <span className="eyebrow">Customer journey</span>
            <div className="row-between">
              <strong>Customer</strong>
              <span className="badge badge-success">Online</span>
            </div>
            <p className="muted">“I need a haircut tomorrow after 5.”</p>
          </div>
          <div className="stack stack-3">
            <div className="row-between">
              <strong>AI Receptionist</strong>
              <span className="badge badge-neutral">Checking</span>
            </div>
            <p className="muted">
              Checks business hours, service duration, calendar conflicts and available slots.
            </p>
          </div>
          <div className="stack stack-3">
            <div className="row-between">
              <strong>Booking</strong>
              <span className="badge badge-success">Confirmed</span>
            </div>
            <p className="muted">Appointment created and confirmation queued for the customer.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
