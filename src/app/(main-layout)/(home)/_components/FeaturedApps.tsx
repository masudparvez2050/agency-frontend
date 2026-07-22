"use client";

import React from "react";
import { motion } from "framer-motion";
import { Smartphone, Download, Star, CheckCircle, ArrowRight, Laptop, Sparkles, ExternalLink } from "lucide-react";
import Link from "next/link";

const FEATURED_APPS = [
  {
    id: "galaxy-games",
    title: "Galaxy Games Hub",
    category: "Gaming",
    developer: "Plaxora Gaming Labs",
    version: "V1.2.0",
    description: "An interactive gaming hub presenting multiple retro, physics-based, and strategy web and mobile mini-games.",
    platforms: ["Android", "iOS"],
    downloads: "5,400+",
    rating: 4.9,
    size: "68 MB",
    accent: "from-amber-500 to-rose-500",
    slug: "/apps/galaxy-games",
    previewImage: "/galaxy-games-preview.png",
  },
  {
    id: "sendpay-wallet",
    title: "SendPay Digital Wallet",
    category: "Fintech",
    developer: "Plaxora Fintech Corp",
    version: "V2.1.0",
    description: "Secure, lightning-fast digital wallet concept app supporting multi-currency conversions and offline transactions.",
    platforms: ["Android", "iOS", "macOS"],
    downloads: "12,200+",
    rating: 4.8,
    size: "34 MB",
    accent: "from-blue-600 to-cyan-400",
    slug: "/apps/sendpay-wallet",
    previewImage: "/sendpay-wallet-preview.png",
  },
  {
    id: "plexora-cli",
    title: "Plexora Developer CLI",
    category: "DevTools",
    developer: "Plaxora Open Source",
    version: "V1.3.1",
    description: "Desktop utility terminal suite that automates Tailwind component generation, Git workflows, and builds local templates.",
    platforms: ["Windows", "macOS", "Linux"],
    downloads: "3,100+",
    rating: 4.9,
    size: "12 MB",
    accent: "from-purple-600 to-fuchsia-400",
    slug: "/apps/plexora-cli",
    previewImage: "/plexora-cli-preview.png",
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
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-xs font-bold text-purple-700 mb-4">
              <Smartphone className="w-3.5 h-3.5" />
              <span>Plaxora App Store</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4">
              Explore Our Native Apps
            </h2>
            <p className="text-slate-600 font-medium max-w-xl">
              We publish and maintain custom applications for mobile, desktop, and terminal. Fast download, zero trackers, 100% utility.
            </p>
          </div>
          <Link
            href="/apps"
            className="group inline-flex items-center gap-1.5 text-sm font-bold text-purple-700 hover:text-purple-800 mt-4 md:mt-0 transition-colors"
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
              className="group relative rounded-2xl bg-white border border-slate-200/80 p-6 overflow-hidden flex flex-col justify-between hover:border-purple-300 transition-all duration-300 shadow-md hover:shadow-xl hover:shadow-purple-500/5"
            >
              {/* App Glow border */}
              <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-purple-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-20" />

              {/* Hover App Preview Image & Overlay */}
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-0 group-hover:opacity-[0.1] transition-all duration-700 pointer-events-none scale-105 group-hover:scale-100 z-0"
                style={{ backgroundImage: `url('${app.previewImage}')` }}
              />
              <div className="absolute inset-0 bg-white/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10" />

              <div className="relative z-20">
                {/* Header Icon & version */}
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${app.accent} p-[1px] flex items-center justify-center shadow-sm`}>
                    <div className="w-full h-full bg-white rounded-[15px] flex items-center justify-center">
                      {app.id === "plexora-cli" ? (
                        <Laptop className="w-6 h-6 text-purple-700 group-hover:scale-110 transition-transform" />
                      ) : (
                        <Smartphone className="w-6 h-6 text-purple-700 group-hover:scale-110 transition-transform" />
                      )}
                    </div>
                  </div>
                  <span className="text-[10px] font-bold tracking-widest text-slate-600 uppercase px-2.5 py-1 rounded bg-slate-100 border border-slate-200">
                    {app.version}
                  </span>
                </div>

                {/* Info */}
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-purple-700 transition-colors">
                  {app.title}
                </h3>
                <span className="text-xs font-bold text-purple-700 block mb-3">
                  {app.category} — Developed by {app.developer}
                </span>
                <p className="text-sm text-slate-600 mb-6 leading-relaxed line-clamp-3 font-normal">
                  {app.description}
                </p>

                {/* Platforms */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {app.platforms.map((platform) => (
                    <span
                      key={platform}
                      className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-600 px-2.5 py-0.5 rounded-full bg-slate-100 border border-slate-200"
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

              {/* Stats Footer & Actions */}
              <div className="relative z-20">
                <div className="w-full h-[1px] bg-slate-200 mb-6" />

                {/* Stats Row */}
                <div className="flex items-center justify-between mb-6 text-xs text-slate-500 font-medium">
                  <span className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <strong className="text-slate-800">{app.rating}</strong>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Download className="w-3.5 h-3.5" />
                    <strong className="text-slate-800">{app.downloads} downloads</strong>
                  </span>
                  <span className="font-bold text-slate-700">{app.size}</span>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <Link
                    href={app.slug}
                    className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-xs font-bold text-slate-700 transition-all"
                  >
                    View Details
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                  <Link
                    href={app.slug}
                    className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-xs font-bold text-white transition-all shadow-md shadow-purple-500/15"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Download
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
