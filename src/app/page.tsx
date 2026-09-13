import type { Metadata } from 'next';

import { CtaSection } from '@/components/marketing/CtaSection';
import { FeaturesSection } from '@/components/marketing/FeaturesSection';
import { HowItWorksSection } from '@/components/marketing/HowItWorksSection';
import { JsonLd, organizationSchema, softwareApplicationSchema } from '@/components/marketing/JsonLd';
import { PricingTeaser } from '@/components/marketing/PricingTeaser';
import { ProductHero } from '@/components/marketing/ProductHero';
import { SiteFooter } from '@/components/marketing/SiteFooter';
import { SiteHeader } from '@/components/marketing/SiteHeader';
import { VerticalsSection } from '@/components/marketing/VerticalsSection';
import { PRODUCT_IDENTITY } from '@/config/product-identity';

export const metadata: Metadata = {
  title: `${PRODUCT_IDENTITY.name} — ${PRODUCT_IDENTITY.tagline}`,
  description: 'A white-label AI receptionist for WhatsApp customer conversations, appointment booking, calendar synchronization, and human handoff.',
  openGraph: { title: PRODUCT_IDENTITY.name, description: PRODUCT_IDENTITY.tagline, locale: 'en_US', type: 'website', url: '/' },
  alternates: { canonical: '/' },
};

export default async function HomePage() {
  return (
    <>
      <JsonLd data={organizationSchema} />
      <JsonLd data={softwareApplicationSchema} />
      <SiteHeader />
      <main id="main">
        <ProductHero />
        <FeaturesSection />
        <VerticalsSection />
        <HowItWorksSection />
        <PricingTeaser />
        <CtaSection />
      </main>
      <SiteFooter />
    </>
  );
}
