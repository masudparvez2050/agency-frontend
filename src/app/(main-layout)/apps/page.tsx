"use client";

import React, { useState, useMemo } from "react";
import { APPS } from "@/lib/apps-data";
import { App } from "@/types/app";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, SlidersHorizontal, Smartphone, Download, Star, 
  Laptop, Cpu, Check, X, Gamepad, Wallet, Terminal, RotateCcw, Filter, Sparkles, PhoneCall, ArrowRight
} from "lucide-react";

import { useCMSData } from "@/hooks/useCMS";

export default function AppsPage() {
  const [allApps] = useCMSData<any>("apps", APPS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPlatform, setSelectedPlatform] = useState("All");
  const [sortBy] = useState("popular");
  const [downloadingApp, setDownloadingApp] = useState<App | null>(null);

  const categories = ["All", "Gaming", "Fintech", "DevTools", "Utility"];
  const platforms = ["All", "Android", "iOS", "Windows", "macOS", "Linux"];

  const filteredAndSortedApps = useMemo(() => {
    let result = allApps.filter((a: any) => a.active !== false);

    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (app: any) =>
          app.title.toLowerCase().includes(q) ||
          app.description.toLowerCase().includes(q) ||
          app.developer.toLowerCase().includes(q)
      );
    }

    if (selectedCategory !== "All") {
      result = result.filter((app: any) => app.category === selectedCategory);
    }

    if (selectedPlatform !== "All") {
      result = result.filter((app: any) => app.platforms.includes(selectedPlatform));
    }

    if (sortBy === "popular") {
      result.sort((a: any, b: any) => parseInt(b.downloads.replace(/,/g, '')) - parseInt(a.downloads.replace(/,/g, '')));
    } else if (sortBy === "rating") {
      result.sort((a: any, b: any) => b.rating - a.rating);
    } else if (sortBy === "newest") {
      result.sort((a: any, b: any) => b.lastUpdated.localeCompare(a.lastUpdated));
    }

    return result;
  }, [allApps, searchQuery, selectedCategory, selectedPlatform, sortBy]);

  const handleDownload = (app: App) => {
    setDownloadingApp(app);
    setTimeout(() => {
      setDownloadingApp(null);
      const link = document.createElement("a");
      link.href = "#";
      link.setAttribute("download", `${app.id}-${app.version}.zip`);
      document.body.appendChild(link);
      document.body.removeChild(link);
    }, 2000);
  };

  const isFilterActive = selectedCategory !== "All" || selectedPlatform !== "All" || searchQuery !== "";

  const clearFilters = () => {
    setSelectedCategory("All");
    setSelectedPlatform("All");
    setSearchQuery("");
  };

  const getAppGradient = (id: string) => {
    if (id.includes("game")) return { gradient: "linear-gradient(135deg, #8b5cf6, #ec4899)", glow: "rgba(236,72,153,0.25)", icon: Gamepad };
    if (id.includes("wallet") || id.includes("pay")) return { gradient: "linear-gradient(135deg, #3b82f6, #06b6d4)", glow: "rgba(6,182,212,0.25)", icon: Wallet };
    return { gradient: "linear-gradient(135deg, #06b6d4, #10b981)", glow: "rgba(16,185,129,0.25)", icon: Terminal };
  };

  return (
    <div className="min-h-screen pt-28 pb-24 overflow-hidden relative bg-gradient-to-b from-white via-slate-50/50 to-white font-sans">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-200/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-blue-200/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-50 border border-purple-100 text-purple-600 text-xs font-bold uppercase tracking-wider mb-3 shadow-2xs">
            <Smartphone className="w-3.5 h-3.5" />
            <span>Plaxora App Store</span>
          </div>
          <h1 className="font-heading font-extrabold text-4xl md:text-5xl tracking-tight text-slate-900 leading-tight mb-3">
            Explore Native Apps
          </h1>
          <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
            Explore native Android, iOS, desktop, and CLI tools built for speed, simplicity, and efficiency.
          </p>
        </div>

        {/* Main Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
          
          {/* Desktop Left Sidebar Filter Panel */}
          <div className="hidden lg:block lg:col-span-3 space-y-4 sticky top-28">
            {/* Categories */}
            <div className="p-5 rounded-[24px] bg-white/95 backdrop-blur-xl border border-slate-200/80 shadow-[0_10px_35px_rgba(0,0,0,0.03)] space-y-3">
              <div className="flex items-center justify-between">
                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Categories</span>
                {isFilterActive && (
                  <button onClick={clearFilters} className="text-[10px] font-bold text-blue-600 hover:underline cursor-pointer">
                    Reset
                  </button>
                )}
              </div>
              <div className="space-y-1">
                {categories.map((cat) => {
                  const isActive = selectedCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
                        isActive
                          ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                          : "bg-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100/70"
                      }`}
                    >
                      <span className="truncate">{cat}</span>
                      {isActive && <div className="w-1.5 h-1.5 rounded-full bg-white shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Target Platforms */}
            <div className="p-5 rounded-[24px] bg-white/95 backdrop-blur-xl border border-slate-200/80 shadow-[0_10px_35px_rgba(0,0,0,0.03)] space-y-3">
              <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Target Platform</span>
              <div className="space-y-1">
                {platforms.map((plat) => {
                  const isActive = selectedPlatform === plat;
                  return (
                    <button
                      key={plat}
                      onClick={() => setSelectedPlatform(plat)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
                        isActive
                          ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                          : "bg-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100/70"
                      }`}
                    >
                      <span className="flex items-center gap-2 truncate">
                        {plat === "Windows" || plat === "macOS" || plat === "Linux" ? (
                          <Laptop className="w-3.5 h-3.5 shrink-0" />
                        ) : plat === "Android" || plat === "iOS" ? (
                          <Smartphone className="w-3.5 h-3.5 shrink-0" />
                        ) : (
                          <Cpu className="w-3.5 h-3.5 shrink-0" />
                        )}
                        <span className="truncate">{plat}</span>
                      </span>
                      {isActive && <div className="w-1.5 h-1.5 rounded-full bg-white shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Reset Button */}
            {isFilterActive && (
              <button
                onClick={clearFilters}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors shadow-2xs cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Clear Filters
              </button>
            )}
          </div>

          {/* Apps Main Column */}
          <div className="lg:col-span-9 space-y-6">
            
            {/* Top Toolbar */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between p-4 sm:p-5 rounded-[24px] bg-white/95 backdrop-blur-xl border border-slate-200/80 shadow-[0_10px_35px_rgba(0,0,0,0.03)]">
              <div className="flex items-center gap-2.5 w-full md:max-w-md">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search applications..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-11 pr-10 py-2.5 rounded-full bg-slate-100/80 border border-slate-200/70 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-purple-600 focus:bg-white transition-all font-medium"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              <div className="text-xs text-slate-500 font-bold">
                Found <span className="text-purple-600">{filteredAndSortedApps.length}</span> applications
              </div>
            </div>

            {/* Apps Grid - 3 columns per row on desktop */}
            {filteredAndSortedApps.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredAndSortedApps.map((app: any, idx: number) => {
                  const { gradient, glow, icon: AppIcon } = getAppGradient(app.id);

                  return (
                    <motion.div
                      key={app.id}
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: idx * 0.05 }}
                      className="bg-white/95 backdrop-blur-xl rounded-[24px] p-5 sm:p-6 border border-slate-200/80 hover:border-purple-400/50 shadow-[0_10px_35px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_50px_rgba(147,51,234,0.12)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
                    >
                      <div>
                        {/* Top Bar with Icon & version */}
                        <div className="flex items-center justify-between mb-4">
                          <div
                            className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-md transition-transform duration-300 group-hover:scale-108"
                            style={{ background: gradient, boxShadow: `0 10px 25px -5px ${glow}` }}
                          >
                            <AppIcon style={{ width: 22, height: 22, color: "#fff" }} strokeWidth={2} />
                          </div>
                          <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 bg-slate-100/80 text-slate-600 rounded-full border border-slate-200/70">
                            {app.version}
                          </span>
                        </div>

                        {/* Title & Info */}
                        <h3 className="font-heading font-bold text-base sm:text-lg text-slate-900 group-hover:text-purple-600 transition-colors leading-snug line-clamp-1">
                          {app.title}
                        </h3>
                        <p className="text-[11px] font-semibold text-slate-400 mt-1 mb-2 line-clamp-1">
                          {app.category} <span className="mx-1">•</span> {app.developer}
                        </p>
                        <p className="text-xs text-slate-600 leading-relaxed mb-4 line-clamp-3 font-normal">
                          {app.description}
                        </p>
                      </div>

                      {/* Card Footer: Single View Details button */}
                      <div className="pt-2">
                        <Link
                          href={`/apps/${app.id}`}
                          className="w-full py-2.5 px-4 rounded-xl border border-slate-200/90 bg-slate-50 hover:bg-blue-600 hover:text-white hover:border-blue-600 text-slate-700 text-xs font-bold transition-all text-center block"
                        >
                          View Details
                        </Link>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-20 rounded-[28px] bg-white/95 backdrop-blur-xl border border-slate-200/80 shadow-[0_10px_35px_rgba(0,0,0,0.03)] max-w-md mx-auto">
                <SlidersHorizontal className="w-10 h-10 text-slate-400 mx-auto mb-3" />
                <h3 className="font-heading font-bold text-lg text-slate-900 mb-1">No applications found</h3>
                <p className="text-xs text-slate-500 px-6 font-normal">
                  We couldn&apos;t find any native applications matching your search parameters. Try clearing your filters.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Custom Solution Call to Action Banner */}
        <div className="mt-16 p-8 sm:p-10 rounded-[32px] bg-gradient-to-r from-slate-900 via-purple-950 to-slate-900 text-white border border-purple-800/40 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="space-y-2 max-w-xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" /> Bespoke Engineering
            </div>
            <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-white">Need a Custom Software Solution?</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
              We specialize in custom web and mobile software architecture. Tell us your business parameters and we will estimate, design, develop, and host a bespoke solution tailored to your workflow.
            </p>
          </div>
          <Link
            href="/contact"
            className="flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-white hover:bg-purple-50 text-slate-900 font-bold text-xs transition-all shadow-lg shrink-0 cursor-pointer relative z-10 group-hover:scale-105"
          >
            <PhoneCall className="w-4 h-4 text-purple-600" />
            <span>Request Bespoke Setup</span>
            <ArrowRight className="w-4 h-4 text-purple-600" />
          </Link>
        </div>
      </div>

      {/* Downloading notification */}
      <AnimatePresence>
        {downloadingApp && (
          <div className="fixed bottom-6 right-6 z-50">
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              className="flex items-center gap-3 p-4 rounded-2xl bg-slate-900 text-xs text-white shadow-2xl border border-slate-800"
            >
              <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                <Check className="w-4 h-4" />
              </div>
              <p className="font-medium">
                Downloading <strong className="font-bold">{downloadingApp.title}</strong> installer...
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
