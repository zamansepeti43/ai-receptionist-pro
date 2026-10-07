import Link from 'next/link';
import type { ReactNode } from 'react';

import { LanguageSelector } from '@/components/marketing/LanguageSelector';

export default function AuthLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        background: 'var(--color-bg)',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          padding: 'clamp(1.5rem, 3vw, 3rem)',
          minHeight: '100vh',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 'var(--space-4)',
          }}
        >
          <Link href="/" className="site-logo" aria-label="AI Receptionist Pro">
            AI Receptionist<span style={{ color: 'var(--color-accent)' }}> Pro</span>
          </Link>
          <LanguageSelector />
        </div>
        <main
          id="main"
          style={{
            flex: 1,
            display: 'grid',
            placeItems: 'center',
            paddingBlock: 'var(--space-12)',
          }}
        >
          <div style={{ width: '100%', maxWidth: '420px' }}>{children}</div>
        </main>
        <p className="muted" style={{ fontSize: 'var(--text-xs)' }}>
          AGTStudio ürünüdür.
        </p>
      </div>
      <aside
        aria-label="AI Receptionist Pro"
        style={{
          display: 'grid',
          placeItems: 'center',
          padding: 'var(--space-12)',
          background: 'linear-gradient(135deg, oklch(45% 0.12 175), oklch(30% 0.08 175))',
          color: 'var(--color-accent-fg)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(ellipse 80% 100% at 100% 0%, oklch(60% 0.15 175 / 0.4), transparent 60%), radial-gradient(ellipse 60% 80% at 0% 100%, oklch(70% 0.12 80 / 0.25), transparent 55%)',
          }}
        />
        <div
          className="stack stack-6"
          style={{ position: 'relative', maxWidth: '420px', textAlign: 'center' }}
        >
          <span
            className="hero-eyebrow"
            style={{
              background: 'transparent',
              borderColor: 'var(--color-accent-fg)',
              color: 'var(--color-accent-fg)',
              alignSelf: 'center',
            }}
          >
            Beta Italia · 2026
          </span>
          <h2
            style={{
              color: 'inherit',
              fontSize: 'var(--text-3xl)',
              fontWeight: 660,
              lineHeight: 'var(--leading-tight)',
            }}
            className="text-balance"
          >
            La reception che non dorme. Il fatturato che non si ferma.
          </h2>
          <p
            className="text-pretty"
            style={{
              fontSize: 'var(--text-base)',
              lineHeight: 'var(--leading-relaxed)',
              color: 'oklch(95% 0.005 150)',
            }}
          >
            AI Receptionist Pro risponde, raccoglie le richieste, gestisce le prenotazioni e passa la
            conversazione a una persona quando serve.
          </p>
        </div>
      </aside>
      <style>{`
        @media (max-width: 1023px) {
          aside { display: none !important; }
          div[style*='grid-template-columns: 1fr 1fr'] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
