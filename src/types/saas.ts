export interface SaaSProduct {
  id: string;
  title: string;
  niche: string;
  description: string;
  fullDescription: string;
  accent: string;
  tags: string[];
  features: string[];
  techStack: string[];
  stats: { label: string; value: string }[];
}
