'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { MARKETING_COPY, STORAGE_KEY, type Locale, type MarketingCopy } from '@/i18n/marketing';

type MarketingLocaleContextValue = { language: Locale; changeLanguage: (locale: Locale) => void; t: MarketingCopy };
const MarketingLocaleContext = createContext<MarketingLocaleContextValue | null>(null);

function readStoredLocale(): Locale {
  if (typeof window === 'undefined') return 'tr';
  return window.localStorage.getItem(STORAGE_KEY) === 'en' ? 'en' : 'tr';
}

export function MarketingLocaleProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [language, setLanguage] = useState<Locale>('tr');
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const next = readStoredLocale();
    setLanguage(next);
    document.documentElement.lang = next === 'tr' ? 'tr-TR' : 'en-US';
  }, [pathname, searchParams]);

  const changeLanguage = useCallback((next: Locale) => {
    window.localStorage.setItem(STORAGE_KEY, next);
    document.documentElement.lang = next === 'tr' ? 'tr-TR' : 'en-US';
    setLanguage(next);
    router.refresh();
  }, [router]);

  const value = useMemo<MarketingLocaleContextValue>(() => ({ language, changeLanguage, t: MARKETING_COPY[language] as MarketingCopy }), [language, changeLanguage]);

  return <MarketingLocaleContext.Provider value={value}>{children}</MarketingLocaleContext.Provider>;
}

export function useMarketingLocale() {
  const context = useContext(MarketingLocaleContext);
  if (!context) throw new Error('useMarketingLocale must be used within MarketingLocaleProvider');
  return context;
}
