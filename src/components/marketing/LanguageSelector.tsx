'use client';

import { useEffect, useState } from 'react';

const STORAGE_KEY = 'ai-receptionist-language';
const LANGUAGES = [
  { code: 'it', label: 'Italiano', flag: '🇮🇹', htmlLang: 'it-IT' },
  { code: 'en', label: 'English', flag: '🇬🇧', htmlLang: 'en-US' },
] as const;

function normalizeLanguage(value: string | null) {
  return LANGUAGES.find((item) => item.code === value)?.code ?? 'en';
}

export function LanguageSelector() {
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    const saved = normalizeLanguage(window.localStorage.getItem(STORAGE_KEY));
    setLanguage(saved);
    const selected = LANGUAGES.find((item) => item.code === saved)!;
    document.documentElement.lang = selected.htmlLang;
  }, []);

  function changeLanguage(code: string) {
    const selected = LANGUAGES.find((item) => item.code === code) ?? LANGUAGES[1];
    setLanguage(selected.code);
    window.localStorage.setItem(STORAGE_KEY, selected.code);
    document.documentElement.lang = selected.htmlLang;
    window.dispatchEvent(new CustomEvent('languagechange', { detail: selected.code }));
  }

  return (
    <label className="language-selector" aria-label="Language">
      <span aria-hidden="true">🌐</span>
      <select value={language} onChange={(event) => changeLanguage(event.target.value)}>
        {LANGUAGES.map((item) => (
          <option key={item.code} value={item.code}>
            {item.flag} {item.label}
          </option>
        ))}
      </select>
    </label>
  );
}
