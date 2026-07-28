"use client";

import React from "react";
import { motion } from "framer-motion";
import { Smartphone, Download, Star, ArrowRight, Gamepad, Wallet, Terminal, Database, Sparkles, CheckCircle2 } from "lucide-react";
import Link from "next/link";

const FEATURED_APPS = [
  {
    id: "galaxy-games",
    title: "Galaxy Games Hub",
    category: "Gaming & Entertainment",
    developer: "Plaxora Gaming Labs",
    version: "v1.2.0",
    description: "An interactive gaming hub presenting multiple retro, physics-based, and strategy web and mobile mini-games.",
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
    icon: Terminal,
    gradient: "linear-gradient(135deg, #06b6d4, #10b981)",
    glowColor: "rgba(16,185,129,0.25)",
    slug: "/apps/plexora-cli",
  },
  {
    id: "apex-inventory",
    title: "Apex Inventory Manager",
    category: "Utility & Enterprise",
    developer: "Plaxora Enterprise",
    version: "v1.0.2",
    description: "Desktop utility tool that tracks stock quantities, logs supplier invoices, and exports monthly sales spreadsheets.",
    icon: Database,
    gradient: "linear-gradient(135deg, #10b981, #3b82f6)",
    glowColor: "rgba(16,185,129,0.25)",
    slug: "/apps/apex-inventory",
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

        {/* Apps Cards Grid: 2 columns on mobile, 4 columns on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {FEATURED_APPS.map((app, idx) => (
            <motion.div
              key={app.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white/95 backdrop-blur-xl rounded-[24px] p-5 sm:p-6 border border-slate-200/80 hover:border-blue-400/50 shadow-[0_10px_35px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_50px_rgba(37,99,235,0.12)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
            >
              {/* Card Header & Content */}
              <div>
                {/* Top Row: Icon + Version */}
                <div className="flex items-center justify-between mb-4">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-md transition-transform duration-300 group-hover:scale-108"
                    style={{ background: app.gradient, boxShadow: `0 10px 25px -5px ${app.glowColor}` }}
                  >
                    <app.icon style={{ width: 22, height: 22, color: "#fff" }} strokeWidth={2} />
                  </div>
                  <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 bg-slate-100/80 text-slate-600 rounded-full border border-slate-200/70">
                    {app.version}
                  </span>
                </div>

                {/* Title & Developer info */}
                <h3 className="font-heading font-bold text-base sm:text-lg text-slate-900 group-hover:text-blue-600 transition-colors leading-snug line-clamp-1">
                  {app.title}
                </h3>
                <p className="text-[11px] font-semibold text-slate-400 mt-1 mb-3 line-clamp-1">
                  {app.category} <span className="mx-1">•</span> {app.developer}
                </p>

                {/* Description */}
                <p className="text-xs text-slate-600 leading-relaxed mb-4 line-clamp-3">
                  {app.description}
                </p>
              </div>

              {/* Card Footer: Single View Details button */}
              <div className="pt-2">
                <Link
                  href={app.slug}
                  className="w-full py-2.5 px-4 rounded-xl border border-slate-200/90 bg-slate-50 hover:bg-blue-600 hover:text-white hover:border-blue-600 text-slate-700 text-xs font-bold transition-all text-center block"
                >
                  View Details
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
