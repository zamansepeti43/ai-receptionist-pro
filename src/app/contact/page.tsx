import type { Metadata } from 'next';

import { ContactPageClient } from '@/components/marketing/ContactPageClient';

export const metadata: Metadata = {
  title: 'Contact — AI Receptionist Pro',
  description: 'Contact AI Receptionist Pro for sales, support, partnerships or product questions.',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact — AI Receptionist Pro',
    description: 'Talk to the team about sales, support, partnerships or product questions.',
    url: '/contact',
    type: 'website',
    locale: 'en_US',
  },
};

export default function ContactPage() {
  return <ContactPageClient />;
}
