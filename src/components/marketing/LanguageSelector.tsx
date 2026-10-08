'use client';

import { useEffect, useState } from 'react';

import { MARKETING_COPY, STORAGE_KEY, type Locale } from '@/i18n/marketing';

const LANGUAGES = [
  { code: 'tr' as const, label: 'Türkçe', flag: '🇹🇷', htmlLang: 'tr-TR' },
  { code: 'en' as const, label: 'English', flag: '🇬🇧', htmlLang: 'en-US' },
];

export function LanguageSelector() {
  const [locale, setLocale] = useState<Locale>('tr');

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    const next: Locale = saved === 'en' ? 'en' : 'tr';
    setLocale(next);
    document.documentElement.lang = next === 'tr' ? 'tr-TR' : 'en-US';
  }, []);

  function changeLanguage(next: Locale) {
    window.localStorage.setItem(STORAGE_KEY, next);
    setLocale(next);
    document.documentElement.lang = next === 'tr' ? 'tr-TR' : 'en-US';
    window.dispatchEvent(new CustomEvent('languagechange', { detail: next }));
  }

  return (
    <label className="language-selector" aria-label="Dil">
      <span aria-hidden="true">🌐</span>
      <select
        value={locale}
        onChange={(event) => changeLanguage(event.target.value as Locale)}
        aria-label="Dil"
      >
        {LANGUAGES.map((item) => (
          <option key={item.code} value={item.code}>
            {item.flag} {item.label}
          </option>
        ))}
      </select>
    </label>
  );
}

export function useMarketingCopy() {
  const [locale, setLocale] = useState<Locale>('tr');

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    setLocale(saved === 'en' ? 'en' : 'tr');
  }, []);

  useEffect(() => {
    const onLanguageChange = (event: Event) => {
      const detail = (event as CustomEvent<Locale>).detail;
      setLocale(detail === 'en' ? 'en' : 'tr');
    };
    window.addEventListener('languagechange', onLanguageChange);
    return () => window.removeEventListener('languagechange', onLanguageChange);
  }, []);

  return { locale, copy: MARKETING_COPY[locale] } as const;
}
