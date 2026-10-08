'use client';

import { useEffect, useState } from 'react';

const STORAGE_KEY = 'ai-receptionist-language';
const LANGUAGES = [
  { code: 'tr', label: 'Türkçe', flag: '🇹🇷', htmlLang: 'tr-TR' },
  { code: 'en', label: 'English', flag: '🇬🇧', htmlLang: 'en-US' },
] as const;

type LanguageCode = (typeof LANGUAGES)[number]['code'];

function normalizeLanguage(value: string | null): LanguageCode {
  return value === 'en' ? 'en' : 'tr';
}

export function LanguageSelector() {
  const [language, setLanguage] = useState<LanguageCode>('tr');

  useEffect(() => {
    const saved = normalizeLanguage(window.localStorage.getItem(STORAGE_KEY));
    setLanguage(saved);
  }, []);

  function changeLanguage(code: string) {
    const next = normalizeLanguage(code);
    window.localStorage.setItem(STORAGE_KEY, next);
    setLanguage(next);

    document.documentElement.lang = next === 'tr' ? 'tr-TR' : 'en-US';
    window.dispatchEvent(new CustomEvent('languagechange', { detail: next }));
  }

  return (
    <label className="language-selector" aria-label="Dil">
      <span aria-hidden="true">🌐</span>
      <select
        value={language}
        onChange={(event) => changeLanguage(event.target.value)}
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
