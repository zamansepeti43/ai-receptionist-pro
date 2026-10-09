'use client';

import { useMarketingLocale } from './MarketingLocaleProvider';
import { SiteHeader } from './SiteHeader';
import { SiteFooter } from './SiteFooter';

export function HelpPageClient() {
  const { language } = useMarketingLocale();
  const text = language === 'tr' ? 'Yardım merkezi' : 'Help center';
  return <><SiteHeader /><main id="main"><section className="section"><div className="container"><h1 className="display">{text}</h1></div></section></main><SiteFooter /></>;
}
