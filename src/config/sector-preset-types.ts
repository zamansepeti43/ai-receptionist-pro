export type SectorPresetId =
  | 'salon'
  | 'beauty'
  | 'dental'
  | 'veterinary'
  | 'fitness'
  | 'auto-service'
  | 'consulting';

export type SectorPreset = {
  id: SectorPresetId;
  name: string;
  durationMinutes: number;
};
