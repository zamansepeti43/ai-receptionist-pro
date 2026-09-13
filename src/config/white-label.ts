export type WhiteLabelBrand = {
  businessName: string;
  logoUrl?: string;
  primaryColor?: string;
  accentColor?: string;
  assistantName?: string;
};

export const DEFAULT_WHITE_LABEL_BRAND: WhiteLabelBrand = {
  businessName: 'Your Business',
  assistantName: 'AI Receptionist',
};
