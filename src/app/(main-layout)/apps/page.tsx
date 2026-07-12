"use client";

import React, { useState, useMemo } from "react";
import { APPS } from "@/lib/apps-data";
import { App } from "@/types/app";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, SlidersHorizontal, Smartphone, Download, Star, 
  ExternalLink, Laptop, Cpu, Check, X 
} from "lucide-react";

export default function AppsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPlatform, setSelectedPlatform] = useState("All");
  const [sortBy, setSortBy] = useState("popular");
  const [downloadingApp, setDownloadingApp] = useState<App | null>(null);

  const categories = ["All", "Gaming", "Fintech", "DevTools", "Utility"];
  const platforms = ["All", "Android", "iOS", "Windows", "macOS", "Linux"];

  // Filter and sort apps
  const filteredAndSortedApps = useMemo(() => {
    let result = [...APPS];

    // 1. Search Query
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (app) =>
          app.title.toLowerCase().includes(q) ||
          app.description.toLowerCase().includes(q) ||
          app.developer.toLowerCase().includes(q)
      );
    }

    // 2. Category Filter
    if (selectedCategory !== "All") {
      result = result.filter((app) => app.category === selectedCategory);
    }

    // 3. Platform Filter
    if (selectedPlatform !== "All") {
      result = result.filter((app) => app.platforms.includes(selectedPlatform));
    }

    // 4. Sort By
    if (sortBy === "popular") {
      result.sort((a, b) => parseInt(b.downloads) - parseInt(a.downloads));
    } else if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "newest") {
      // compare version or update date
      result.sort((a, b) => b.lastUpdated.localeCompare(a.lastUpdated));
    }

    return result;
  }, [searchQuery, selectedCategory, selectedPlatform, sortBy]);

  const handleDownload = (app: App) => {
    setDownloadingApp(app);
    // Simulate package download
    setTimeout(() => {
      setDownloadingApp(null);
      // Trigger a browser file download mock-up
      const link = document.createElement("a");
      link.href = "#";
      link.setAttribute("download", `${app.id}-${app.version}.zip`);
      document.body.appendChild(link);
      // We don't click it to avoid navigation issues, just visual feedback
      document.body.removeChild(link);
    }, 2000);
  };

  return (
    <div className="min-h-screen pt-32 pb-24 overflow-hidden relative">
      {/* Glow Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-purple-500/5 blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-cyan-500/5 blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold text-purple-400 uppercase tracking-widest mb-3 block">Plaxora Store</span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white mb-4 leading-tight">
            Plaxora App Store
          </h1>
          <p className="text-slate-400">
            Download our native mobile apps, desktop suites, and command-line utilities. ad-free, data-secure, and optimized for performance.
          </p>
        </div>

        {/* Filters Toolbar */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between p-4 rounded-2xl bg-slate-950/60 border border-slate-900 backdrop-blur-xl mb-12 shadow-xl">
          {/* Search bar */}
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search apps by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-850 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/40 transition-colors"
            />
          </div>

          {/* Sort selection */}
          <div className="flex items-center gap-3 w-full md:w-auto shrink-0 justify-end">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-bold uppercase tracking-wider">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Sort By</span>
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-slate-900 border border-slate-850 text-slate-300 text-xs font-semibold px-3 py-2.5 rounded-xl focus:outline-none focus:border-purple-500/40 transition-colors cursor-pointer"
            >
              <option value="popular">Downloads</option>
              <option value="rating">User Rating</option>
              <option value="newest">Last Updated</option>
            </select>
          </div>
        </div>

        {/* Platform tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-6 justify-center">
          <span className="text-xs font-bold text-slate-500 uppercase mr-2">Platform:</span>
          {platforms.map((plat) => (
            <button
              key={plat}
              onClick={() => setSelectedPlatform(plat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                selectedPlatform === plat
                  ? "bg-purple-600 border-purple-500 text-white shadow-lg shadow-purple-500/25"
                  : "bg-slate-950/80 border-slate-900 text-slate-400 hover:text-white"
              }`}
            >
              {plat}
            </button>
          ))}
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap items-center gap-2 mb-12 justify-center border-b border-slate-900 pb-8">
          <span className="text-xs font-bold text-slate-500 uppercase mr-2">Category:</span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                selectedCategory === cat
                  ? "bg-cyan-600 border-cyan-550 text-white shadow-lg shadow-cyan-500/25"
                  : "bg-slate-950/80 border-slate-900 text-slate-400 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Apps Grid */}
        {filteredAndSortedApps.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAndSortedApps.map((app, idx) => (
              <motion.div
                key={app.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="group relative rounded-2xl bg-slate-950/80 border border-slate-900 p-6 overflow-hidden flex flex-col justify-between hover:border-purple-500/20 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/5"
              >
                {/* Visual border glow */}
                <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-purple-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <div>
                  {/* Top Bar with Icon & version */}
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${app.accent} p-[1px] flex items-center justify-center`}>
                      <div className="w-full h-full bg-[#030014] rounded-[15px] flex items-center justify-center">
                        <Smartphone className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
                      </div>
                    </div>
                    <span className="text-[10px] font-bold tracking-widest text-slate-500 uppercase px-2 py-1 rounded bg-slate-900 border border-slate-850">
                      {app.version}
                    </span>
                  </div>

                  {/* Title & Info */}
                  <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors">
                    {app.title}
                  </h3>
                  <span className="text-xs font-semibold text-purple-400/80 block mb-3">
                    {app.category} — Developed by {app.developer}
                  </span>
                  <p className="text-sm text-slate-400 mb-6 leading-relaxed line-clamp-3">
                    {app.description}
                  </p>

                  {/* Platforms Supported */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {app.platforms.map((plat) => (
                      <span
                        key={plat}
                        className="inline-flex items-center gap-1 text-[10px] font-semibold text-slate-400 px-2.5 py-0.5 rounded-full bg-slate-900 border border-slate-850"
                      >
                        {plat === "Windows" || plat === "macOS" || plat === "Linux" ? (
                          <Laptop className="w-2.5 h-2.5 shrink-0" />
                        ) : (
                          <Smartphone className="w-2.5 h-2.5 shrink-0" />
                        )}
                        {plat}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="w-full h-[1px] bg-slate-900 mb-6" />

                  {/* Stats Row */}
                  <div className="flex items-center justify-between mb-6 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <strong className="text-slate-350">{app.rating}</strong>
                    </span>
                    <span className="flex items-center gap-1">
                      <Download className="w-3.5 h-3.5" />
                      <strong className="text-slate-350">{app.downloads} downloads</strong>
                    </span>
                    <span className="font-semibold">{app.size}</span>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-3">
                    <Link
                      href={`/apps/${app.id}`}
                      className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-850 text-xs font-bold text-slate-350 hover:text-white transition-all"
                    >
                      View Details
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                    <button
                      onClick={() => handleDownload(app)}
                      disabled={downloadingApp?.id === app.id}
                      className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:bg-purple-600/30 text-xs font-bold text-white transition-all shadow-md shadow-purple-500/25 disabled:cursor-not-allowed"
                    >
                      {downloadingApp?.id === app.id ? (
                        <span className="flex items-center gap-1 animate-pulse">
                          Downloading...
                        </span>
                      ) : (
                        <>
                          <Download className="w-3.5 h-3.5" />
                          Download
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 rounded-2xl bg-slate-950/40 border border-slate-900 backdrop-blur-sm max-w-md mx-auto">
            <SlidersHorizontal className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">No applications found</h3>
            <p className="text-sm text-slate-400 px-6">
              We couldn&apos;t find any native applications matching your search or platform filter. Please try adjusting your filters.
            </p>
          </div>
        )}
      </div>

      {/* Downloading success confirmation overlay */}
      <AnimatePresence>
        {downloadingApp && (
          <div className="fixed bottom-6 right-6 z-50">
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              className="flex items-center gap-3 p-4 rounded-xl bg-slate-950 border border-emerald-500/30 text-xs text-slate-350 shadow-2xl"
            >
              <div className="w-6 h-6 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <Check className="w-3.5 h-3.5" />
              </div>
              <p>
                Downloading <strong className="text-white">{downloadingApp.title}</strong> installer package...
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
