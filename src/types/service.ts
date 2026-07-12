export interface PricingTier {
  name: string; // e.g. "Basic Setup", "Standard Release", "Enterprise Release"
  price: string;
  timeframe: string;
  deliverables: string[];
}

export interface Service {
  id: string;
  title: string;
  iconName: string; // e.g. "laptop", "smartphone"
  description: string;
  priceRange: string;
  accent: string; // e.g. "from-blue-600 to-indigo-650"
  deliverablesSummary: string[];
  tiers: PricingTier[];
}
