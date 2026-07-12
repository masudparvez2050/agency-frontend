export interface ChangelogEntry {
  version: string;
  date: string;
  changes: string[];
}

export interface Product {
  id: string;
  title: string;
  category: string; // e.g. "Next.js", "React", "Flutter", "Figma", "Scripts"
  description: string;
  fullDescription: string;
  price: string; // e.g. "1,500 BDT"
  priceVal: number; // raw value for sorting, e.g. 1500
  originalPrice: string; // e.g. "3,000 BDT"
  tags: string[];
  rating: number;
  downloads: string;
  imageGradient: string;
  demoLink: string;
  features: string[];
  requirements: string[];
  changelog: ChangelogEntry[];
}
