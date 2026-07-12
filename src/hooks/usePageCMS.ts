"use client";

import { useEffect, useState } from "react";

export interface PageCopyConfig {
  home: {
    hero: { badge: string; title: string; subtitle: string; };
    cta: { title: string; subtitle: string; };
  };
  products: {
    hero: { badge: string; title: string; subtitle: string; };
  };
  apps: {
    hero: { badge: string; title: string; subtitle: string; };
  };
  saas: {
    hero: { badge: string; title: string; subtitle: string; };
  };
  portfolio: {
    hero: { badge: string; title: string; subtitle: string; };
  };
  services: {
    hero: { badge: string; title: string; subtitle: string; };
  };
  pricing: {
    hero: { badge: string; title: string; subtitle: string; };
  };
  blog: {
    hero: { badge: string; title: string; subtitle: string; };
  };
  about: {
    hero: { badge: string; title: string; subtitle: string; };
  };
  contact: {
    hero: { badge: string; title: string; subtitle: string; };
  };
}

const DEFAULT_CONFIG: PageCopyConfig = {
  home: {
    hero: {
      badge: "Bangladesh's Premier Digital Product Ecosystem",
      title: "Fast. Affordable. Ecosystem-Driven Development.",
      subtitle: "Get premium templates, native mobile apps, SaaS tools, and customized software. We build high-performance products that empower your workflow and fuel business growth."
    },
    cta: {
      title: "Ready to Transform Your Digital Workflow?",
      subtitle: "Join thousands of developers and businesses using Plaxora assets to launch products instantly."
    }
  },
  products: {
    hero: {
      badge: "Plaxora Store",
      title: "Digital Marketplace",
      subtitle: "Deploy high-quality Next.js frontends, SaaS boilerplates, Flutter application shells, Figma files, and scripts in minutes."
    }
  },
  apps: {
    hero: {
      badge: "Plaxora Store",
      title: "Plaxora App Store",
      subtitle: "Download our native mobile apps, desktop suites, and command-line utilities. ad-free, data-secure, and optimized for performance."
    }
  },
  saas: {
    hero: {
      badge: "SaaS Directory",
      title: "Self-Hosted SaaS Tools",
      subtitle: "Deploy production-grade open source and proprietary SaaS platforms on your own servers in a single click."
    }
  },
  portfolio: {
    hero: {
      badge: "Our Works",
      title: "Selected Case Studies",
      subtitle: "Explore how Plaxora designed, developed and shipped software solutions for businesses and startups."
    }
  },
  services: {
    hero: {
      badge: "Our Expertise",
      title: "Bespoke Services",
      subtitle: "Hire our dedicated design, engineering and DevOps experts to build customized solutions for your business requirements."
    }
  },
  pricing: {
    hero: {
      badge: "Pricing Plans",
      title: "Flexible Options",
      subtitle: "Choose from our high-value subscription packages, dynamic licenses, or bespoke project contracts."
    }
  },
  blog: {
    hero: {
      badge: "Tech Insights",
      title: "Plaxora Blog",
      subtitle: "Tutorials and engineering case studies covering React Server Components, cloud VPS server setups, and tokenized mobile payment API integrations."
    }
  },
  about: {
    hero: {
      badge: "Our Mission",
      title: "Plaxora Ecosystem",
      subtitle: "Plaxora is dedicated to building state-of-the-art digital tools, desktop apps, templates and services that empower engineers and businesses globally."
    }
  },
  contact: {
    hero: {
      badge: "Contact Us",
      title: "Start Your Journey",
      subtitle: "Have a project in mind, need a customized system design, or want to inquire about Enterprise options? Get in touch with our team."
    }
  }
};

const STORAGE_KEY = "plaxora_cms_page_content";

export function usePageCMS(): [PageCopyConfig, (newConfig: PageCopyConfig) => void] {
  const [config, setConfig] = useState<PageCopyConfig>(DEFAULT_CONFIG);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        const merged = { ...DEFAULT_CONFIG };
        Object.keys(DEFAULT_CONFIG).forEach((key) => {
          const k = key as keyof PageCopyConfig;
          if (parsed[k]) {
            merged[k] = { ...DEFAULT_CONFIG[k], ...parsed[k] } as any;
          }
        });
        setConfig(merged);
      } catch (e) {
        setConfig(DEFAULT_CONFIG);
      }
    } else {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_CONFIG));
    }
  }, []);

  const updateConfig = (newConfig: PageCopyConfig) => {
    setConfig(newConfig);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newConfig));
    }
  };

  return [config, updateConfig];
}
