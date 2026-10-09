import type { Metadata } from 'next';

import { AboutPageClient } from '@/components/marketing/AboutPageClient';

export const metadata: Metadata = {
  title: 'About — AI Receptionist Pro',
  description: 'Learn about the team, mission and principles behind AI Receptionist Pro.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About — AI Receptionist Pro',
    description: 'The team, mission and principles behind AI Receptionist Pro.',
    url: '/about',
    type: 'profile',
    locale: 'en_US',
  },
};

export default function AboutPage() {
  return <AboutPageClient />;
}
