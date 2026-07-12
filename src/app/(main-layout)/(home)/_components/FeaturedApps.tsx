"use client";

import React from "react";
import { motion } from "framer-motion";
import { Smartphone, Download, Star, CheckCircle, ArrowRight, Laptop, Sparkles } from "lucide-react";
import Link from "next/link";

const FEATURED_APPS = [
  {
    id: "galaxy-games",
    title: "Galaxy Games",
    category: "Gaming Hub",
    description: "An interactive gaming hub presenting multiple retro, physics-based, and strategy web and mobile mini-games.",
    platforms: ["Android", "iOS"],
    downloads: "5,400+",
    rating: 4.9,
    accent: "from-amber-500 to-rose-500",
    slug: "/apps/galaxy-games",
    badge: "New Release",
  },
  {
    id: "sendpay-wallet",
    title: "SendPay Wallet",
    category: "Fintech App",
    description: "Secure, lightning-fast digital wallet concept app supporting multi-currency conversions and offline transactions.",
    platforms: ["Android", "iOS", "macOS"],
    downloads: "12,200+",
    rating: 4.8,
    accent: "from-blue-600 to-cyan-400",
    slug: "/apps/sendpay-wallet",
    badge: "Popular",
  },
  {
    id: "plexora-cli",
    title: "Plexora CLI & Devsuite",
    category: "Developer Tools",
    description: "Desktop utility terminal suite that automates Tailwind component generation, Git workflows, and builds local templates.",
    platforms: ["Windows", "macOS", "Linux"],
    downloads: "3,100+",
    rating: 4.9,
    accent: "from-purple-600 to-fuchsia-400",
    slug: "/apps/plexora-cli",
    badge: "Developer Tool",
  },
];

export default function FeaturedApps() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/4 w-96 h-96 rounded-full bg-purple-500/5 blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full bg-cyan-500/5 blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-xs font-semibold text-purple-300 mb-4">
              <Smartphone className="w-3.5 h-3.5" />
              <span>Plaxora App Store</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
              Explore Our Native Apps
            </h2>
            <p className="text-slate-400 max-w-xl">
              We publish and maintain custom applications for mobile, desktop, and terminal. Fast download, zero trackers, 100% utility.
            </p>
          </div>
          <Link
            href="/apps"
            className="group inline-flex items-center gap-1.5 text-sm font-semibold text-purple-400 hover:text-purple-300 mt-4 md:mt-0 transition-colors"
          >
            Browse all apps
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Apps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {FEATURED_APPS.map((app, idx) => (
            <motion.div
              key={app.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group relative rounded-2xl bg-slate-950 border border-slate-900 overflow-hidden flex flex-col justify-between hover:border-purple-500/20 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/5"
            >
              {/* App Glow border */}
              <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-purple-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="p-6">
                {/* Header Icon */}
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${app.accent} p-[1px] flex items-center justify-center`}>
                    <div className="w-full h-full bg-[#030014] rounded-[15px] flex items-center justify-center">
                      <Smartphone className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
                    </div>
                  </div>
                  <span className="text-[10px] font-bold tracking-widest text-slate-500 uppercase px-2 py-1 rounded bg-slate-900 border border-slate-800">
                    {app.badge}
                  </span>
                </div>

                {/* Info */}
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
                  {app.title}
                </h3>
                <p className="text-xs font-semibold text-purple-400/80 mb-3">{app.category}</p>
                <p className="text-sm text-slate-400 mb-6 leading-relaxed">
                  {app.description}
                </p>

                {/* Platforms */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {app.platforms.map((platform) => (
                    <span
                      key={platform}
                      className="inline-flex items-center gap-1 text-[10px] font-semibold text-slate-400 px-2 py-0.5 rounded-full bg-slate-900 border border-slate-800"
                    >
                      {platform === "Windows" || platform === "macOS" || platform === "Linux" ? (
                        <Laptop className="w-2.5 h-2.5" />
                      ) : (
                        <Smartphone className="w-2.5 h-2.5" />
                      )}
                      {platform}
                    </span>
                  ))}
                </div>
              </div>

              {/* Stats Footer */}
              <div className="p-6 bg-slate-900/40 border-t border-slate-900/80 flex items-center justify-between mt-auto">
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <span className="block text-xs font-bold text-white">{app.downloads}</span>
                    <span className="text-[10px] text-slate-500 font-semibold uppercase">Downloads</span>
                  </div>
                  <div className="w-[1px] h-6 bg-slate-800" />
                  <div className="text-center">
                    <span className="flex items-center gap-0.5 text-xs font-bold text-white">
                      {app.rating} <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    </span>
                    <span className="text-[10px] text-slate-500 font-semibold uppercase block">Rating</span>
                  </div>
                </div>

                <Link
                  href={app.slug}
                  className="p-2.5 rounded-xl bg-slate-900 hover:bg-purple-600 border border-slate-800 hover:border-purple-500 text-slate-300 hover:text-white transition-all shadow-md"
                >
                  <Download className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
