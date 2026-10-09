'use client';

import { useMarketingLocale } from '@/components/marketing/MarketingLocaleProvider';

export function DashboardTranslations({ tr, en }: { tr: string; en: string }) {
  const { language } = useMarketingLocale();
  return language === 'tr' ? tr : en;
}

export function DashboardDate({ value, timeZone = 'Europe/Istanbul' }: { value: string; timeZone?: string }) {
  const { language } = useMarketingLocale();
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '—';
  return new Intl.DateTimeFormat(language === 'tr' ? 'tr-TR' : 'en-US', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone,
  }).format(date);
}
