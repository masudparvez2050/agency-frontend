"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight, Layers, Smartphone, Database, Briefcase, FileCode2 } from "lucide-react";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products", icon: FileCode2 },
  { label: "Apps", href: "/apps", icon: Smartphone },
  { label: "SaaS", href: "/saas", icon: Database },
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
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md border-b border-slate-200/80 py-3 shadow-sm shadow-slate-200/50"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 p-[1px] flex items-center justify-center shadow-md shadow-purple-500/10 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-white rounded-[11px] flex items-center justify-center">
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">P</span>
            </div>
          </div>
          <span className="text-2xl font-black tracking-tight text-slate-900 group-hover:opacity-90 transition-opacity">
            Plaxora<span className="text-purple-600">.</span>
          </span>
        </Link>

        {/* Desktop Nav Items */}
        <nav className="hidden lg:flex items-center gap-1">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-4 py-2 text-sm font-semibold transition-colors rounded-full ${
                  isActive ? "text-purple-700" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeNavIndicator"
                    className="absolute inset-0 bg-purple-50 rounded-full border border-purple-200/80"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* CTA Button */}
        <div className="hidden lg:flex items-center gap-4">
          <Link
            href="/contact"
            className="group flex items-center gap-1.5 px-5 py-2 text-sm font-semibold text-white rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-md shadow-purple-500/15 hover:shadow-purple-500/25 transition-all duration-300"
          >
            Explore Ecosystem
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden border-t border-slate-200 bg-white/95 backdrop-blur-lg overflow-hidden shadow-xl"
          >
            <div className="container mx-auto px-4 py-6 flex flex-col gap-3">
              {NAV_ITEMS.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-semibold transition-all ${
                      isActive
                        ? "bg-purple-50 text-purple-700 border border-purple-200"
                        : "text-slate-700 hover:bg-slate-50 border border-transparent"
                    }`}
                  >
                    {item.icon && <item.icon className="w-5 h-5 opacity-70" />}
                    {item.label}
                  </Link>
                );
              })}
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="mt-2 text-center flex items-center justify-center gap-1.5 w-full px-5 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold shadow-md"
              >
                Explore Ecosystem
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
