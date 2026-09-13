import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Settings · AI Receptionist Pro' };

interface SettingsLink { readonly href: string; readonly label: string; readonly available: boolean }
interface SettingsGroup { readonly title: string; readonly description: string; readonly links: readonly SettingsLink[] }

const SETTINGS_GROUPS: readonly SettingsGroup[] = [
  { title: 'Business', description: 'Business identity, language, timezone and operating rules.', links: [
    { href: '/settings/profile', label: 'Business profile', available: false },
    { href: '/settings/business-hours', label: 'Business hours', available: true },
    { href: '/settings/services', label: 'Services and pricing', available: true },
    { href: '/settings/team', label: 'Team and operators', available: false },
  ] },
  { title: 'Integrations', description: 'Connect the communication and scheduling providers used by the business.', links: [
    { href: '/settings/whatsapp', label: 'WhatsApp Business', available: true },
    { href: '/settings/calendar', label: 'Google Calendar', available: false },
    { href: '/settings/voice', label: 'Voice', available: false },
    { href: '/settings/webhooks', label: 'Custom webhooks', available: false },
  ] },
  { title: 'AI', description: 'Assistant behavior, knowledge and escalation boundaries.', links: [
    { href: '/settings/personality', label: 'Tone and personality', available: false },
    { href: '/settings/knowledge', label: 'Knowledge base', available: false },
    { href: '/settings/escalation', label: 'Escalation rules', available: false },
  ] },
  { title: 'Account and security', description: 'Plan, billing, privacy and account controls.', links: [
    { href: '/billing', label: 'Plan and billing', available: true },
    { href: '/settings/security', label: 'Security', available: false },
    { href: '/settings/data-export', label: 'Export your data', available: false },
    { href: '/settings/danger-zone', label: 'Delete account', available: false },
  ] },
];

const ROW_STYLE = { padding: 'var(--space-3) var(--space-4)', borderRadius: 'var(--radius-md)', background: 'var(--color-surface-sunken)', fontSize: 'var(--text-sm)', fontWeight: 500 } as const;

export default function SettingsPage() {
  return (
    <>
      <div className="dashboard-header">
        <div className="stack stack-2"><span className="eyebrow">Settings</span><h1>Configure the business</h1><p className="muted">Configure the receptionist, integrations and business rules. Items marked as coming soon are intentionally disabled rather than linking to placeholder pages.</p></div>
      </div>
      <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
        {SETTINGS_GROUPS.map((group) => <section key={group.title} className="card stack stack-4"><div className="stack stack-2"><h2 style={{ fontSize: 'var(--text-xl)' }}>{group.title}</h2><p className="muted" style={{ fontSize: 'var(--text-sm)' }}>{group.description}</p></div><ul style={{ listStyle: 'none', padding: 0 }} className="stack stack-2">{group.links.map((link) => <li key={link.href}>{link.available ? <Link href={link.href} className="row-between" style={{ ...ROW_STYLE, transition: 'background var(--duration-normal) var(--ease-out)' }}><span>{link.label}</span><span aria-hidden="true">→</span></Link> : <div className="row-between" style={{ ...ROW_STYLE, opacity: 0.65 }}><span className="muted">{link.label}</span><span className="badge badge-neutral">Coming soon</span></div>}</li>)}</ul></section>)}
      </div>
    </>
  );
}
