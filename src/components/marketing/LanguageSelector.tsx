'use client';

import { useEffect, useState } from 'react';

const STORAGE_KEY = 'ai-receptionist-language';
const LANGUAGES = [
  { code: 'it', label: 'Italiano', flag: '🇮🇹', htmlLang: 'it-IT' },
  { code: 'en', label: 'English', flag: '🇬🇧', htmlLang: 'en-US' },
] as const;

type LanguageCode = (typeof LANGUAGES)[number]['code'];

function normalizeLanguage(value: string | null): LanguageCode {
  return value === 'it' ? 'it' : 'en';
}

export function LanguageSelector() {
  const [language, setLanguage] = useState<LanguageCode>('en');

  useEffect(() => {
    const saved = normalizeLanguage(window.localStorage.getItem(STORAGE_KEY));
    setLanguage(saved);
    const selected = LANGUAGES.find((item) => item.code === saved)!;
    document.documentElement.lang = selected.htmlLang;
  }, []);

  function changeLanguage(code: string) {
    const next = normalizeLanguage(code);
    const selected = LANGUAGES.find((item) => item.code === next)!;

    // Persist first, then reload so every route gets the same locale from a
    // clean DOM. MarketingLocale reads this value during its initial effect.
    window.localStorage.setItem(STORAGE_KEY, next);
    document.documentElement.lang = selected.htmlLang;
    setLanguage(next);
    window.location.reload();
  }

  return (
    <label className="language-selector" aria-label="Language">
      <span aria-hidden="true">🌐</span>
      <select
        value={language}
        onChange={(event) => changeLanguage(event.target.value)}
        aria-label="Language"
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
