"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Search, ArrowRight, ShoppingBag, Sparkles,
  FileCode2, Smartphone, Database, Layers, Terminal,
  Palette, Globe, Package, Cloud, Zap, Code2,
  Download, BarChart2, ShieldCheck, TrendingUp,
} from "lucide-react";
import Link from "next/link";
import { usePageCMS } from "@/hooks/usePageCMS";

// ─── LEFT ARC — Compact Vertical Spacing ────────────────────────────────────────
const LEFT_ARC = [
  { Icon: Package,   label: "Assets",        sub: "5000+ Assets",     gradient: "linear-gradient(135deg,#f97316,#f59e0b)", accent: "#f97316", l: "14%", t: "12%",  rot: 4,  delay: 0,   dur: 5.8 },
  { Icon: FileCode2, label: "Templates",     sub: "250+ Templates",   gradient: "linear-gradient(135deg,#3b82f6,#6366f1)", accent: "#3b82f6", l: "4%",  t: "25%",  rot: -3, delay: 0.3, dur: 6.4 },
  { Icon: Layers,    label: "UI Components", sub: "1200+ Components", gradient: "linear-gradient(135deg,#8b5cf6,#a855f7)", accent: "#8b5cf6", l: "10%", t: "38%",  rot: 3,  delay: 0.6, dur: 5.4 },
  { Icon: Terminal,  label: "Scripts",       sub: "120+ Scripts",     gradient: "linear-gradient(135deg,#06b6d4,#0ea5e9)", accent: "#06b6d4", l: "2%",  t: "51%",  rot: -4, delay: 0.9, dur: 6.8 },
  { Icon: Palette,   label: "UI Kits",       sub: "60+ UI Kits",      gradient: "linear-gradient(135deg,#ec4899,#f43f5e)", accent: "#ec4899", l: "12%", t: "64%",  rot: 4,  delay: 1.2, dur: 5.2 },
];

// ─── RIGHT ARC — Compact Vertical Spacing ───────────────────────────────────────
const RIGHT_ARC = [
  { Icon: Code2,      label: "Tech Stack",  sub: "Modern Tech",      gradient: "linear-gradient(135deg,#7c3aed,#6366f1)", accent: "#7c3aed", r: "14%", t: "12%",  rot: -3, delay: 0.15, dur: 6.0 },
  { Icon: Smartphone, label: "Mobile Apps", sub: "50+ Mobile Apps",  gradient: "linear-gradient(135deg,#10b981,#22c55e)", accent: "#10b981", r: "4%",  t: "25%",  rot: 3,  delay: 0.45, dur: 5.6 },
  { Icon: Database,   label: "SaaS Tools",  sub: "80+ SaaS Tools",   gradient: "linear-gradient(135deg,#3b82f6,#0ea5e9)", accent: "#3b82f6", r: "10%", t: "38%",  rot: -4, delay: 0.75, dur: 6.6 },
  { Icon: Globe,      label: "Web Apps",    sub: "100+ Web Apps",    gradient: "linear-gradient(135deg,#0ea5e9,#06b6d4)", accent: "#0ea5e9", r: "2%",  t: "51%",  rot: 3,  delay: 1.05, dur: 5.8 },
  { Icon: Cloud,      label: "Cloud APIs",  sub: "200+ APIs",        gradient: "linear-gradient(135deg,#8b5cf6,#7c3aed)", accent: "#8b5cf6", r: "12%", t: "64%",  rot: -3, delay: 1.35, dur: 6.2 },
];

// ─── 3D Glowing Spheres along the curve ──────────────────────────────────────
const SPHERES = [
  { s: 14, color: "linear-gradient(135deg,#f97316,#fb923c)", x: "33%", y: "11%", delay: 0.5 },
  { s: 12, color: "linear-gradient(135deg,#8b5cf6,#c084fc)", x: "19%", y: "35%", delay: 1.3 },
  { s: 16, color: "linear-gradient(135deg,#ec4899,#f472b6)", x: "12%", y: "54%", delay: 2.1 },
  { s: 14, color: "linear-gradient(135deg,#3b82f6,#60a5fa)", x: "78%", y: "24%", delay: 1.7 },
  { s: 12, color: "linear-gradient(135deg,#10b981,#34d399)", x: "90%", y: "42%", delay: 0.3 },
  { s: 16, color: "linear-gradient(135deg,#8b5cf6,#a78bfa)", x: "76%", y: "74%", delay: 2.5 },
];

export default function Hero() {
  const [searchQuery, setSearchQuery] = useState("");
  const [pageConfig] = usePageCMS();

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-20 lg:pt-32 lg:pb-24 hero-gradient overflow-hidden">

      {/* ════════════════════════════════════════════════════════════
          BACKGROUND LAYER (z-0) — floating tilted cards + SVG paths + spheres
      ════════════════════════════════════════════════════════════ */}
      <div className="absolute inset-0 pointer-events-none z-0" aria-hidden="true">

        {/* Curved Dotted SVG Trail */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30 hidden lg:block" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M 18% 14% Q 2% 38% 16% 68%"
            fill="none"
            stroke="#64748b"
            strokeWidth="1.5"
            strokeDasharray="4 6"
          />
          <path
            d="M 82% 14% Q 98% 38% 84% 68%"
            fill="none"
            stroke="#64748b"
            strokeWidth="1.5"
            strokeDasharray="4 6"
          />
        </svg>

        {/* 3D Floating Glowing Spheres */}
        {SPHERES.map((d, i) => (
          <motion.div
            key={`sphere-${i}`}
            className="absolute rounded-full shadow-lg"
            style={{
              width: d.s,
              height: d.s,
              left: d.x,
              top: d.y,
              background: d.color,
              boxShadow: `0 4px 12px ${d.color.includes('#f97316') ? 'rgba(249,115,22,0.4)' : 'rgba(139,92,246,0.4)'}`
            }}
            animate={{ y: [0, -8, 0, 6, 0], scale: [1, 1.08, 1, 0.95, 1] }}
            transition={{ duration: 4.5, delay: d.delay, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}

        {/* Left Arc Floating Tilted Cards */}
        {LEFT_ARC.map(({ Icon, label, sub, gradient, accent, l, t, rot, delay, dur }, i) => (
          <motion.div
            key={`L${i}`}
            className="absolute hidden lg:block"
            style={{ left: l, top: t }}
            initial={{ opacity: 0, x: -30, rotate: rot }}
            animate={{ opacity: 1, x: 0, rotate: rot, y: [0, -(8 + i * 2), 0, (6 + i), 0] }}
            transition={{
              opacity: { duration: 0.7, delay: delay + 0.3 },
              x:       { duration: 0.7, delay: delay + 0.3 },
              y:       { duration: dur, delay: delay + 0.8, repeat: Infinity, repeatType: "loop", ease: "easeInOut" },
            }}
          >
            <div
              className="flex items-center gap-4 px-5 py-3.5 rounded-[22px] transition-transform duration-300 hover:scale-105"
              style={{
                background: "rgba(255, 255, 255, 0.92)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                border: "1px solid rgba(255, 255, 255, 0.95)",
                minWidth: "196px",
                boxShadow: `0 24px 48px -12px ${accent}35, 0 12px 24px -8px ${accent}20, 0 2px 6px rgba(0,0,0,0.03)`,
              }}
            >
              <span className="flex items-center justify-center w-12 h-12 rounded-[16px] flex-shrink-0 shadow-md" style={{ background: gradient }}>
                <Icon style={{ width: 22, height: 22, color: "#fff" }} strokeWidth={2} />
              </span>
              <span>
                <p className="text-sm font-bold text-slate-800 leading-snug whitespace-nowrap">{label}</p>
                <p className="text-xs text-slate-400 font-medium mt-0.5 whitespace-nowrap">{sub}</p>
              </span>
            </div>
          </motion.div>
        ))}

        {/* Right Arc Floating Tilted Cards */}
        {RIGHT_ARC.map(({ Icon, label, sub, gradient, accent, r, t, rot, delay, dur }, i) => (
          <motion.div
            key={`R${i}`}
            className="absolute hidden lg:block"
            style={{ right: r, top: t }}
            initial={{ opacity: 0, x: 30, rotate: rot }}
            animate={{ opacity: 1, x: 0, rotate: rot, y: [0, -(8 + i * 2), 0, (6 + i), 0] }}
            transition={{
              opacity: { duration: 0.7, delay: delay + 0.3 },
              x:       { duration: 0.7, delay: delay + 0.3 },
              y:       { duration: dur, delay: delay + 0.8, repeat: Infinity, repeatType: "loop", ease: "easeInOut" },
            }}
          >
            <div
              className="flex items-center gap-4 px-5 py-3.5 rounded-[22px] transition-transform duration-300 hover:scale-105"
              style={{
                background: "rgba(255, 255, 255, 0.92)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                border: "1px solid rgba(255, 255, 255, 0.95)",
                minWidth: "196px",
                boxShadow: `0 24px 48px -12px ${accent}35, 0 12px 24px -8px ${accent}20, 0 2px 6px rgba(0,0,0,0.03)`,
              }}
            >
              <span className="flex items-center justify-center w-12 h-12 rounded-[16px] flex-shrink-0 shadow-md" style={{ background: gradient }}>
                <Icon style={{ width: 22, height: 22, color: "#fff" }} strokeWidth={2} />
              </span>
              <span>
                <p className="text-sm font-bold text-slate-800 leading-snug whitespace-nowrap">{label}</p>
                <p className="text-xs text-slate-400 font-medium mt-0.5 whitespace-nowrap">{sub}</p>
              </span>
            </div>
          </motion.div>
        ))}

        {/* Bottom Pill */}
        <motion.div
          className="absolute bottom-5 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: [0, -6, 0, 5, 0] }}
          transition={{ opacity: { duration: 0.6, delay: 2 }, y: { duration: 5, delay: 2.5, repeat: Infinity, ease: "easeInOut" } }}
        >
          <div
            className="flex items-center gap-2.5 px-5 py-2.5 rounded-full"
            style={{ background: "rgba(255,255,255,0.92)", backdropFilter: "blur(16px)", boxShadow: "0 8px 28px rgba(0,0,0,0.08)", border: "1px solid rgba(255,255,255,0.95)" }}
          >
            <span className="flex items-center justify-center w-7 h-7 rounded-lg" style={{ background: "linear-gradient(135deg,#f97316,#f59e0b)" }}>
              <Zap style={{ width: 14, height: 14, color: "#fff" }} strokeWidth={2.5} />
            </span>
            <span className="text-sm font-bold text-slate-800 whitespace-nowrap">Fast Build. Better Future.</span>
          </div>
        </motion.div>

      </div>{/* end background layer */}


      {/* ════════════════════════════════════════════════════════════
          FOREGROUND LAYER (z-10) — original hero content
      ════════════════════════════════════════════════════════════ */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">

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
          className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-slate-900 tracking-tight leading-tight mb-3 max-w-4xl mx-auto"
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
          className="font-sans max-w-2xl mx-auto text-base sm:text-lg text-slate-600 font-normal leading-relaxed mb-3"
        >
          {pageConfig.home.hero.subtitle ||
            "Get premium templates, native mobile apps, SaaS tools, and customized software. We build high-performance products that empower your workflow and fuel business growth."}
        </motion.p>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="max-w-2xl mx-auto mb-5 font-sans"
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
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10 font-sans"
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

        {/* Stat Counters — Reference Image exact match: large soft circular badges, stroke icons & dividers */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 rounded-3xl bg-white border border-slate-100 shadow-[0_12px_45px_rgba(0,0,0,0.06)] max-w-4xl mx-auto overflow-hidden p-3 sm:p-4"
        >
          {[
            {
              value: "50+",
              label: "DIGITAL PRODUCTS",
              Icon: Package,
              accent: "#2563eb",
              bg: "#edf5ff",
            },
            {
              value: "10k+",
              label: "STORE DOWNLOADS",
              Icon: Download,
              accent: "#10b981",
              bg: "#effcf5",
            },
            {
              value: "99.9%",
              label: "SAAS UPTIME",
              Icon: TrendingUp,
              accent: "#6366f1",
              bg: "#f3f2ff",
            },
            {
              value: "100%",
              label: "APPROVAL SUCCESS",
              Icon: ShieldCheck,
              accent: "#f59e0b",
              bg: "#fffbeb",
            },
          ].map((stat, i) => (
            <div
              key={i}
              className="flex items-center gap-3 px-3.5 sm:px-4 py-3 sm:py-3.5 border-r border-b md:border-b-0 border-slate-100 last:border-r-0 [&:nth-child(2)]:border-r-0 md:[&:nth-child(2)]:border-r md:[&:nth-child(4)]:border-r-0 font-sans"
            >
              {/* Large Soft Circular Badge Icon */}
              <span
                className="flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full flex-shrink-0"
                style={{ background: stat.bg }}
              >
                <stat.Icon style={{ width: 22, height: 22, color: stat.accent }} strokeWidth={2} />
              </span>
              {/* Number + Label */}
              <div className="text-left min-w-0">
                <div className="font-heading font-extrabold text-xl sm:text-2xl leading-none" style={{ color: stat.accent }}>
                  {stat.value}
                </div>
                <div className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-wider leading-tight mt-1 whitespace-nowrap">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </motion.div>

      </div>{/* end foreground layer */}

    </section>
  );
}
