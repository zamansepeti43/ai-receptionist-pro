'use client';

import { useMarketingLocale } from '@/components/marketing/MarketingLocaleProvider';

export function DashboardTranslations({ tr, en }: { tr: string; en: string }) {
  const { language } = useMarketingLocale();
  return language === 'tr' ? tr : en;
}
