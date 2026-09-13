export const SECTOR_CATALOG = [
  { id: 'salon', name: 'Salon & Barber', defaultDurationMinutes: 45 },
  { id: 'beauty', name: 'Beauty & Wellness', defaultDurationMinutes: 60 },
  { id: 'dental', name: 'Dental & Clinic', defaultDurationMinutes: 30 },
  { id: 'veterinary', name: 'Veterinary', defaultDurationMinutes: 30 },
  { id: 'fitness', name: 'Gym & Fitness', defaultDurationMinutes: 60 },
  { id: 'auto-service', name: 'Auto Service', defaultDurationMinutes: 60 },
  { id: 'consulting', name: 'Consultant / Professional Services', defaultDurationMinutes: 60 },
] as const;

export type SectorId = (typeof SECTOR_CATALOG)[number]['id'];
