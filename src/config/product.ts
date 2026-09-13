export const PRODUCT = {
  name: 'AI Receptionist Pro',
  shortName: 'AI Receptionist',
  description:
    'White-label AI receptionist for WhatsApp bookings, customer questions, and human handoff.',
  defaultLocale: 'en-US',
  supportedLocales: ['en-US', 'tr-TR'],
  sectors: [
    'salon',
    'beauty',
    'dental',
    'veterinary',
    'fitness',
    'auto-service',
    'consulting',
  ] as const,
} as const;
