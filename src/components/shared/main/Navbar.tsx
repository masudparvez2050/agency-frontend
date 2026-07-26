"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight, Smartphone, Database, Briefcase, FileCode2 } from "lucide-react";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products", icon: FileCode2 },
  { label: "Apps", href: "/apps", icon: Smartphone },
  { label: "Portfolio", href: "/portfolio", icon: Briefcase },
  { label: "Services", href: "/services" },
  { label: "Pricing", href: "/pricing" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-3 sm:top-4 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 pointer-events-none transition-all duration-500 ease-out">
      <div
        className={`max-w-7xl mx-auto pointer-events-auto transition-all duration-500 ease-out flex items-center justify-between ${
          scrolled
            ? "py-3 sm:py-3.5 px-6 sm:px-8 rounded-2xl sm:rounded-full"
            : "py-4 px-2 sm:px-4 rounded-2xl"
        }`}
        style={{
          background: scrolled
            ? "linear-gradient(135deg, rgba(255, 255, 255, 0.85) 0%, rgba(255, 255, 255, 0.60) 100%)"
            : "transparent",
          backdropFilter: scrolled ? "blur(32px) saturate(190%)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(32px) saturate(190%)" : "none",
          border: scrolled
            ? "1px solid rgba(255, 255, 255, 0.9)"
            : "1px solid transparent",
          boxShadow: scrolled
            ? "inset 0 1.5px 1px 0 rgba(255, 255, 255, 0.9), inset 0 -1px 1px 0 rgba(255, 255, 255, 0.4), 0 20px 40px -12px rgba(0, 0, 0, 0.1), 0 4px 16px 0 rgba(0, 0, 0, 0.04)"
            : "none",
        }}
      >
        {/* Brand Image Logo */}
        <Link href="/" className="flex items-center group">
          <img
            src="/plaxora_logo.png"
            alt="Plaxora Group Logo"
            className="h-8 sm:h-9 w-auto object-contain group-hover:scale-105 transition-transform duration-200"
          />
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center space-x-1 xl:space-x-1.5 text-sm font-medium text-slate-700 font-sans">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-3.5 py-1.5 rounded-full text-xs xl:text-sm font-bold transition-colors ${
                  isActive ? "text-white" : "text-slate-700 hover:text-blue-600"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeNavPill"
                    className="absolute inset-0 bg-blue-600 rounded-full shadow-sm shadow-blue-500/30"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right CTA Button */}
        <div className="hidden lg:flex items-center">
          <Link
            href="/products"
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-full text-xs xl:text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 transition-all duration-200 shadow-md shadow-blue-500/25 hover:shadow-lg hover:shadow-blue-500/35 group font-sans"
          >
            Explore Ecosystem
            <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 text-slate-700 hover:text-blue-600 focus:outline-none"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden pointer-events-auto max-w-7xl mx-auto mt-2 rounded-2xl overflow-hidden p-4"
            style={{
              background: "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.85) 100%)",
              backdropFilter: "blur(32px) saturate(190%)",
              WebkitBackdropFilter: "blur(32px) saturate(190%)",
              border: "1px solid rgba(255, 255, 255, 0.9)",
              boxShadow: "inset 0 1px 1px 0 rgba(255, 255, 255, 0.9), 0 20px 40px -10px rgba(0,0,0,0.12)",
            }}
          >
            <div className="flex flex-col gap-2 font-sans">
              {NAV_ITEMS.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 px-4 py-2.5 rounded-full text-sm font-bold transition-all ${
                      isActive
                        ? "bg-blue-600 text-white shadow-sm shadow-blue-500/30"
                        : "text-slate-700 hover:bg-slate-50/80 border border-transparent"
                    }`}
                  >
                    {item.icon && <item.icon className={`w-4 h-4 ${isActive ? "text-white" : "opacity-70"}`} />}
                    {item.label}
                  </Link>
                );
              })}
              <Link
                href="/products"
                onClick={() => setIsOpen(false)}
                className="mt-2 text-center flex items-center justify-center gap-1.5 w-full px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-500/25"
              >
                Explore Ecosystem
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
