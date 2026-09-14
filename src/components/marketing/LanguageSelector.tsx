'use client';

import { useEffect, useState } from 'react';

const STORAGE_KEY = 'ai-receptionist-language';
const LANGUAGES = [
  { code: 'it', label: 'Italiano', flag: '🇮🇹' },
  { code: 'en', label: 'English', flag: '🇬🇧' },
] as const;

export function LanguageSelector() {
  const [language, setLanguage] = useState('it');

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved && LANGUAGES.some((item) => item.code === saved)) {
      setLanguage(saved);
      document.documentElement.lang = saved;
    }
  }, []);

  function changeLanguage(code: string) {
    setLanguage(code);
    window.localStorage.setItem(STORAGE_KEY, code);
    document.documentElement.lang = code;
    window.dispatchEvent(new CustomEvent('languagechange', { detail: code }));
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
