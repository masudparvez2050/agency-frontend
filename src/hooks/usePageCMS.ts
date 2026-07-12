"use client";

import { useEffect, useState } from "react";

export interface PageCopyConfig {
  home: {
    hero: {
      badge: string;
      title: string;
      subtitle: string;
    };
    cta: {
      title: string;
      subtitle: string;
    };
  };
  about: {
    hero: {
      title: string;
      subtitle: string;
    };
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
  about: {
    hero: {
      title: "Ecosystem Builders",
      subtitle: "We are a distributed team of engineers, designers, and systems architects dedicated to raising the software standard in Bangladesh."
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
        setConfig(JSON.parse(stored));
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
