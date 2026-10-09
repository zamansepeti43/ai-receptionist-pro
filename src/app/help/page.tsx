import type { Metadata } from 'next';

import { HelpPageClient } from '@/components/marketing/HelpPageClient';

export const metadata: Metadata = {
  title: 'Help Center — AI Receptionist Pro',
  description: 'Step-by-step guides, FAQs and direct support for WhatsApp setup, Google Calendar, billing and privacy.',
  alternates: { canonical: '/help' },
  openGraph: { title: 'Help Center — AI Receptionist Pro', description: 'Practical guides, FAQs and direct support.', url: '/help', type: 'website', locale: 'en_US' },
};

export default function HelpPage() {
  return <HelpPageClient />;
}
