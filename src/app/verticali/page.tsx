import type { Metadata } from 'next';

import { VerticalsIndexClient } from '@/components/marketing/VerticalsIndexClient';

export const metadata: Metadata = {
  title: 'Sector Presets — AI Receptionist Pro',
  description: 'Seven configurable sector starting points for the AI Receptionist Pro appointment and customer-conversation workflow.',
  alternates: { canonical: '/verticali' },
  openGraph: { title: 'Sector Presets — AI Receptionist Pro', description: 'Seven configurable sector starting points.', url: '/verticali', type: 'website', locale: 'en_US' },
};

export default function VerticalsIndexPage() {
  return <VerticalsIndexClient />;
}
