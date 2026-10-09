'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import { useMarketingLocale } from '@/components/marketing/MarketingLocaleProvider';
import { LanguageSelector } from '@/components/marketing/LanguageSelector';

export interface DashboardShellProps {
  children: ReactNode;
  currentPath?: string;
  tenantName?: string;
}

export function DashboardShell({ children, currentPath, tenantName }: Readonly<DashboardShellProps>) {
  const { language } = useMarketingLocale();
  const tr = language === 'tr';
  const items = [
    { href: '/dashboard', label: tr ? 'Genel bakış' : 'Dashboard', icon: '◐' },
    { href: '/conversations', label: tr ? 'Görüşmeler' : 'Conversations', icon: '✻' },
    { href: '/calendar', label: tr ? 'Takvim' : 'Calendar', icon: '◫' },
    { href: '/knowledge', label: tr ? 'Bilgi tabanı' : 'Knowledge base', icon: '☰' },
    { href: '/settings', label: tr ? 'Ayarlar' : 'Settings', icon: '⚙' },
    { href: '/billing', label: tr ? 'Faturalandırma' : 'Billing', icon: '€' },
  ] as const;
  return (
    <div className="dashboard-shell">
      <aside className="sidebar" aria-label={tr ? 'Kenar menüsü' : 'Sidebar'}>
        <Link href="/dashboard" className="site-logo" style={{fontSize:'var(--text-base)',display:'block'}}>
          Ambrogio<span style={{color:'var(--color-accent)'}}>.ai</span>
        </Link>
        <div className="surface-flat" style={{padding:'var(--space-3) var(--space-4)',marginTop:'var(--space-5)'}}>
          <p className="muted" style={{fontSize:'var(--text-xs)'}}>{tr?'Aktif işletme':'Active business'}</p>
          <p style={{fontSize:'var(--text-sm)',fontWeight:600,marginTop:'2px'}}>{tenantName ?? (tr?'İşletmeniz':'Your business')}</p>
        </div>
        <ul className="sidebar-nav">{items.map(item=><li key={item.href}><Link href={item.href} className="sidebar-link" aria-current={currentPath===item.href?'page':undefined}><span aria-hidden="true" style={{width:'1.25rem'}}>{item.icon}</span>{item.label}</Link></li>)}</ul>
        <div style={{position:'absolute',bottom:'var(--space-6)',left:'var(--space-6)',right:'var(--space-6)'}}><Link href="/help" className="sidebar-link" style={{fontSize:'var(--text-xs)'}}><span aria-hidden="true">?</span>{tr?'Yardım merkezi':'Help center'}</Link></div>
      </aside>
      <div style={{position:'absolute',top:'var(--space-4)',right:'var(--space-6)',zIndex:10}}><LanguageSelector /></div>
      <main className="dashboard-main" id="main">{children}</main>
    </div>
  );
}
