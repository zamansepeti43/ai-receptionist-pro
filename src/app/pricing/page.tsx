import type { Metadata } from 'next';

import { PricingPageClient } from '@/components/marketing/PricingPageClient';

export const metadata: Metadata = {
  title: 'Pricing — AI Receptionist Pro',
  description: 'Example SaaS pricing models for AI Receptionist Pro. Configure plans, limits and billing rules before launch.',
  openGraph: { title: 'Pricing — AI Receptionist Pro', description: 'Example SaaS pricing models for the AI Receptionist Pro application.', url: '/pricing', locale: 'en_US', type: 'website' },
  alternates: { canonical: '/pricing' },
};

export default function PricingPage() {
  return <PricingPageClient />;
}
