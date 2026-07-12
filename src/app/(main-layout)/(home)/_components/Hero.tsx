"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, ArrowRight, Play, Download, ExternalLink, Sparkles } from "lucide-react";
import Link from "next/link";
import { usePageCMS } from "@/hooks/usePageCMS";

export default function Hero() {
  const [searchQuery, setSearchQuery] = useState("");
  const [pageConfig] = usePageCMS();

  return (
    <section className="relative min-h-screen pt-32 pb-20 flex flex-col items-center justify-center overflow-hidden">
      {/* Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-purple-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/3 w-[300px] h-[300px] rounded-full bg-cyan-500/10 blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] rounded-full bg-fuchsia-500/5 blur-[130px] pointer-events-none" />

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#030014]/50 to-[#030014] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
        {/* Animated Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-xs font-semibold text-purple-300 mb-6 tracking-wide shadow-inner"
        >
          <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span>{pageConfig.home.hero.badge}</span>
        </motion.div>

        {/* Headings */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-500 to-cyan-400 mb-6 leading-tight max-w-5xl mx-auto"
        >
          {pageConfig.home.hero.title}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base sm:text-lg md:text-xl text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed"
        >
          {pageConfig.home.hero.subtitle}
        </motion.p>


        {/* Global Search Interface */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="w-full max-w-2xl mx-auto mb-12 p-1.5 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl focus-within:border-purple-500/30 transition-all shadow-2xl"
        >
          <div className="flex items-center gap-2">
            <div className="pl-3 text-slate-400">
              <Search className="w-5 h-5" />
            </div>
            <input
              type="text"
              placeholder="Search templates, mobile apps, SaaS tools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-3 bg-transparent text-white placeholder-slate-500 text-sm focus:outline-none"
            />
            <button
              onClick={() => {
                if (searchQuery) window.location.href = `/products?search=${searchQuery}`;
              }}
              className="flex items-center gap-1.5 px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-sm font-bold text-white transition-all shadow-md shadow-purple-500/20"
            >
              Search
            </button>
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-16"
        >
          <Link
            href="/apps"
            className="group flex items-center gap-2 px-7 py-3.5 text-sm font-bold text-white rounded-xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-cyan-500 hover:opacity-95 shadow-lg shadow-purple-500/20 hover:shadow-cyan-400/20 transition-all hover:-translate-y-0.5 duration-300"
          >
            <Download className="w-4 h-4" />
            Browse App Store
          </Link>
          <Link
            href="/contact"
            className="flex items-center gap-2 px-7 py-3.5 text-sm font-bold text-slate-200 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-purple-500/30 transition-all hover:-translate-y-0.5 duration-300"
          >
            Start Your Project
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        {/* Quick Stats Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto p-6 rounded-2xl bg-slate-950/40 border border-slate-900 backdrop-blur-sm"
        >
          {[
            { value: "50+", label: "Digital Products" },
            { value: "10k+", label: "Store Downloads" },
            { value: "99.9%", label: "SaaS Uptime" },
            { value: "100%", label: "Manual Approval Success" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl md:text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400">
                {stat.value}
              </div>
              <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
