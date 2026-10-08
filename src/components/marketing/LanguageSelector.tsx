'use client';

import { useMarketingLocale } from './MarketingLocaleProvider';

const LANGUAGES = [
  { code: 'tr' as const, label: 'Türkçe', flag: '🇹🇷' },
  { code: 'en' as const, label: 'English', flag: '🇬🇧' },
];

export { useMarketingLocale };

export function LanguageSelector() {
  const { language, changeLanguage } = useMarketingLocale();

  return (
    <label className="language-selector" aria-label="Dil">
      <span aria-hidden="true">🌐</span>
      <select
        value={language}
        onChange={(event) => changeLanguage(event.target.value as 'tr' | 'en')}
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
