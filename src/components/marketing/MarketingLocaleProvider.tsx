'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { MARKETING_COPY, STORAGE_KEY, type Locale, type MarketingCopy } from '@/i18n/marketing';

type MarketingLocaleContextValue = { language: Locale; changeLanguage: (locale: Locale) => void; t: MarketingCopy };
const MarketingLocaleContext = createContext<MarketingLocaleContextValue | null>(null);

export function MarketingLocaleProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [language, setLanguage] = useState<Locale>('tr');

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    const next: Locale = saved === 'en' ? 'en' : 'tr';
    setLanguage(next);
    document.documentElement.lang = next === 'tr' ? 'tr-TR' : 'en-US';
  }, []);

  const changeLanguage = useCallback((next: Locale) => {
    window.localStorage.setItem(STORAGE_KEY, next);
    document.documentElement.lang = next === 'tr' ? 'tr-TR' : 'en-US';
    setLanguage(next);
  }, []);

  const value = useMemo<MarketingLocaleContextValue>(() => ({ language, changeLanguage, t: MARKETING_COPY[language] as MarketingCopy }), [language, changeLanguage]);
  return <MarketingLocaleContext.Provider value={value}>{children}</MarketingLocaleContext.Provider>;
}

export function useMarketingLocale() {
  const context = useContext(MarketingLocaleContext);
  if (!context) throw new Error('useMarketingLocale must be used within MarketingLocaleProvider');
  return context;
}
