"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Search, ArrowRight, ShoppingBag, Sparkles,
  Package, Star, Rocket, Wrench
} from "lucide-react";
import Link from "next/link";
import { usePageCMS } from "@/hooks/usePageCMS";

export default function Hero() {
  const [searchQuery, setSearchQuery] = useState("");
  const [pageConfig] = usePageCMS();

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-20 lg:pt-32 lg:pb-24 hero-gradient overflow-hidden">

      {/* ════════════════════════════════════════════════════════════
          FOREGROUND LAYER — Clean Hero Content with Expanded Width
      ════════════════════════════════════════════════════════════ */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">

        {/* Category Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-semibold uppercase tracking-wider mb-5 shadow-xs"
        >
          <Sparkles className="w-3.5 h-3.5 text-purple-600 animate-pulse" />
          <span>{pageConfig.home.hero.badge || "Bangladesh's Premier Digital Product Ecosystem"}</span>
        </motion.div>

        {/* H1 */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-slate-900 tracking-tight leading-tight mb-4 max-w-5xl mx-auto"
        >
          Fast. Affordable. Ecosystem-Driven{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            Development.
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-sans max-w-3xl mx-auto text-base sm:text-lg text-slate-600 font-normal leading-relaxed mb-6"
        >
          {pageConfig.home.hero.subtitle ||
            "Get premium templates, native mobile apps, SaaS tools, and customized software. We build high-performance products that empower your workflow and fuel business growth."}
        </motion.p>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="max-w-3xl mx-auto mb-6 font-sans"
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (searchQuery) window.location.href = `/products?search=${searchQuery}`;
            }}
            className="relative flex items-center bg-white rounded-2xl shadow-lg p-2 border border-slate-200 focus-within:border-blue-600 transition-all"
          >
            <Search className="w-5 h-5 text-slate-400 ml-2 shrink-0" />
            <input
              type="text"
              placeholder="Search templates, mobile apps, SaaS tools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-2.5 px-4 bg-transparent text-sm text-slate-900 placeholder-slate-400 focus:outline-none font-sans font-medium"
            />
            <button
              type="submit"
              className="px-6 py-2.5 bg-blue-600 hover:bg-purple-600 text-white text-sm font-semibold rounded-xl transition-colors shadow-xs shrink-0 cursor-pointer"
            >
              Search
            </button>
          </form>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 font-sans"
        >
          <Link
            href="/apps"
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-purple-600 transition-all shadow-md hover:shadow-lg cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4 mr-2" />
            Browse App Store
          </Link>
          <Link
            href="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-xl text-sm font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 hover:border-purple-300 transition-all shadow-xs cursor-pointer"
          >
            Start Your Project
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </motion.div>

        {/* Stat Counters — Expanded max-w-5xl for clean horizontal space */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 rounded-3xl bg-white border border-slate-100 shadow-[0_12px_45px_rgba(0,0,0,0.06)] max-w-5xl mx-auto overflow-hidden p-4 sm:p-5"
        >
          {[
            {
              value: "100+",
              label: "Entrepreneurs Empowered",
              Icon: Star,
              accent: "#f59e0b",
              bg: "#fffbeb",
            },
            {
              value: "50+",
              label: "Projects Delivered",
              Icon: Rocket,
              accent: "#2563eb",
              bg: "#edf5ff",
            },
            {
              value: "10+",
              label: "Products in Ecosystem",
              Icon: Package,
              accent: "#10b981",
              bg: "#effcf5",
            },
            {
              value: "End-to-End",
              label: "Business Solutions",
              Icon: Wrench,
              accent: "#8b5cf6",
              bg: "#f3f2ff",
            },
          ].map((stat, i) => (
            <div
              key={i}
              className="flex items-center gap-3 px-4 sm:px-5 py-3.5 sm:py-4 border-r border-b md:border-b-0 border-slate-100 last:border-r-0 [&:nth-child(2)]:border-r-0 md:[&:nth-child(2)]:border-r md:[&:nth-child(4)]:border-r-0 font-sans"
            >
              {/* Soft Circular Badge Icon */}
              <span
                className="flex items-center justify-center w-12 h-12 rounded-full flex-shrink-0"
                style={{ background: stat.bg }}
              >
                <stat.Icon style={{ width: 22, height: 22, color: stat.accent }} strokeWidth={2} />
              </span>
              {/* Value + Label */}
              <div className="text-left min-w-0">
                <div className="font-heading font-extrabold text-xl sm:text-2xl leading-none" style={{ color: stat.accent }}>
                  {stat.value}
                </div>
                <div className="text-xs font-bold text-slate-500 tracking-tight leading-tight mt-1 whitespace-nowrap">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </motion.div>

      </div>

    </section>
  );
}
