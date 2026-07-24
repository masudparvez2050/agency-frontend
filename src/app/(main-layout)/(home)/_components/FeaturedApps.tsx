"use client";

import React from "react";
import { motion } from "framer-motion";
import { Smartphone, Download, Star, ArrowRight, Gamepad, Wallet, Terminal, Sparkles, CheckCircle2 } from "lucide-react";
import Link from "next/link";

const FEATURED_APPS = [
  {
    id: "galaxy-games",
    title: "Galaxy Games Hub",
    category: "Gaming & Entertainment",
    developer: "Plaxora Gaming Labs",
    version: "v1.2.0",
    description: "An interactive gaming hub presenting multiple retro, physics-based, and strategy web and mobile mini-games.",
    platforms: ["Android", "iOS"],
    downloads: "5.4k+",
    rating: 4.9,
    size: "68 MB",
    icon: Gamepad,
    gradient: "linear-gradient(135deg, #8b5cf6, #ec4899)",
    glowColor: "rgba(236,72,153,0.25)",
    slug: "/apps/galaxy-games",
  },
  {
    id: "sendpay-wallet",
    title: "SendPay Digital Wallet",
    category: "Fintech & Payments",
    developer: "Plaxora Fintech Corp",
    version: "v2.1.0",
    description: "Secure, lightning-fast digital wallet concept app supporting multi-currency conversions and offline transactions.",
    platforms: ["Android", "iOS", "macOS"],
    downloads: "12.2k+",
    rating: 4.8,
    size: "34 MB",
    icon: Wallet,
    gradient: "linear-gradient(135deg, #3b82f6, #06b6d4)",
    glowColor: "rgba(6,182,212,0.25)",
    slug: "/apps/sendpay-wallet",
  },
  {
    id: "plexora-cli",
    title: "Plexora Developer CLI",
    category: "DevTools & Terminal",
    developer: "Plaxora Open Source",
    version: "v1.3.1",
    description: "Desktop utility terminal suite that automates Tailwind component generation, Git workflows, and builds local templates.",
    platforms: ["Windows", "macOS", "Linux"],
    downloads: "3.1k+",
    rating: 4.9,
    size: "12 MB",
    icon: Terminal,
    gradient: "linear-gradient(135deg, #06b6d4, #10b981)",
    glowColor: "rgba(16,185,129,0.25)",
    slug: "/apps/plexora-cli",
  },
];

export default function FeaturedApps() {
  return (
    <section id="apps" className="py-20 bg-gradient-to-b from-white via-slate-50/50 to-white border-t border-slate-100 font-sans relative overflow-hidden">
      
      {/* Background Subtle Gradient Blobs */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-50 border border-purple-100 text-purple-600 text-xs font-bold uppercase tracking-wider mb-3 shadow-2xs">
              <Smartphone className="w-3.5 h-3.5" />
              <span>Plaxora App Store</span>
            </div>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight leading-tight">
              Explore Our Native Apps
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 font-normal max-w-2xl leading-relaxed">
              We publish and maintain custom applications for mobile, desktop, and terminal. Fast download, zero trackers, 100% utility.
            </p>
          </div>
          
          <Link
            href="/apps"
            className="mt-6 md:mt-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold text-slate-700 bg-white border border-slate-200/90 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-all duration-200 shadow-2xs group"
          >
            <span>Browse all apps</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Apps Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {FEATURED_APPS.map((app, idx) => (
            <motion.div
              key={app.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white/95 backdrop-blur-xl rounded-[28px] p-6 sm:p-7 border border-slate-200/80 hover:border-blue-400/50 shadow-[0_10px_35px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_50px_rgba(37,99,235,0.12)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
            >
              {/* Card Header & Content */}
              <div>
                {/* Top Row: Icon + Version */}
                <div className="flex items-center justify-between mb-5">
                  <div
                    className="w-13 h-13 rounded-2xl flex items-center justify-center shadow-md transition-transform duration-300 group-hover:scale-108"
                    style={{ background: app.gradient, boxShadow: `0 10px 25px -5px ${app.glowColor}` }}
                  >
                    <app.icon style={{ width: 24, height: 24, color: "#fff" }} strokeWidth={2} />
                  </div>
                  <span className="text-[11px] font-mono font-bold px-3 py-1 bg-slate-100/80 text-slate-600 rounded-full border border-slate-200/70">
                    {app.version}
                  </span>
                </div>

                {/* Title & Developer info */}
                <h3 className="font-heading font-bold text-xl text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                  {app.title}
                </h3>
                <p className="text-xs font-semibold text-slate-400 mt-1 mb-3">
                  {app.category} <span className="mx-1">•</span> {app.developer}
                </p>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5">
                  {app.description}
                </p>

                {/* Platform Pills */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {app.platforms.map((platform) => (
                    <span
                      key={platform}
                      className="px-3 py-1 bg-slate-50 text-[11px] font-semibold text-slate-600 rounded-full border border-slate-200/80 flex items-center gap-1.5"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      {platform}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer */}
              <div>
                {/* Stats row */}
                <div className="flex items-center justify-between text-xs font-semibold text-slate-500 py-3.5 border-t border-slate-100 mb-5">
                  <span className="flex items-center text-amber-500 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200/60">
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500 mr-1" /> {app.rating}
                  </span>
                  <span className="flex items-center text-slate-600">
                    <Download className="w-3.5 h-3.5 mr-1.5 text-blue-500" /> {app.downloads}
                  </span>
                  <span className="text-slate-400 font-mono text-[11px]">{app.size}</span>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-2.5">
                  <Link
                    href={app.slug}
                    className="py-2.5 px-3 rounded-xl border border-slate-200/90 bg-slate-50/80 hover:bg-slate-100 text-slate-700 text-xs font-bold transition-all text-center"
                  >
                    View Details
                  </Link>
                  <Link
                    href={app.slug}
                    className="py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-md shadow-blue-500/20 text-center flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" /> Download
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
