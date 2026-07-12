export interface AppChangelogEntry {
  version: string;
  date: string;
  changes: string[];
}

export interface App {
  id: string;
  title: string;
  category: string; // e.g. "Gaming", "Fintech", "DevTools", "Utility"
  description: string;
  fullDescription: string;
  downloads: string;
  rating: number;
  developer: string;
  version: string;
  lastUpdated: string;
  platforms: string[]; // e.g. ["Android", "iOS", "Windows", "macOS", "Linux"]
  size: string; // e.g. "45 MB"
  accent: string; // gradient classes e.g. "from-amber-500 to-rose-500"
  features: string[];
  requirements: string[]; // e.g. ["Android 9.0+", "iOS 15.0+"]
  changelog: AppChangelogEntry[];
}
