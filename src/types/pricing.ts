export interface Plan {
  id: string;
  name: string;
  price: string;
  period: string; // e.g. "one-time", "monthly"
  description: string;
  features: string[];
  accent: string;
  ctaText: string;
  popular: boolean;
}

export interface FeatureRow {
  featureName: string;
  starter: boolean | string;
  growth: boolean | string;
  enterprise: boolean | string;
}

export interface FAQItem {
  question: string;
  answer: string;
}
