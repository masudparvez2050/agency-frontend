"use client";

import React, { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { Lenis } from "@/lib/lenis";

interface SmoothScrollProviderProps {
  children: React.ReactNode;
}

export default function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis smooth scroll engine
    const lenis = new Lenis();
    lenisRef.current = lenis;

    // Intercept hash anchor links for smooth Lenis scrolling
    const onAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest("a");
      if (anchor && anchor.hash && anchor.pathname === window.location.pathname) {
        const el = document.querySelector(anchor.hash) as HTMLElement | null;
        if (el) {
          e.preventDefault();
          lenis.scrollTo(el, { offset: -80 });
        }
      }
    };

    document.addEventListener("click", onAnchorClick);

    return () => {
      document.removeEventListener("click", onAnchorClick);
      lenis.destroy();
    };
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0);
    }
  }, [pathname]);

  return <>{children}</>;
}
