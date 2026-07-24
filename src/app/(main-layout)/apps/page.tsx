"use client";

import React, { useState, useMemo } from "react";
import { APPS } from "@/lib/apps-data";
import { App } from "@/types/app";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, SlidersHorizontal, Smartphone, Download, Star, 
  Laptop, Cpu, Check, X, Gamepad, Wallet, Terminal, RotateCcw, Filter, Sparkles
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

            {/* Apps Grid - Spacious 2 columns per row */}
            {filteredAndSortedApps.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-7 sm:gap-8">
                {filteredAndSortedApps.map((app: any, idx: number) => {
                  const { gradient, glow, icon: AppIcon } = getAppGradient(app.id);

                  return (
                    <motion.div
                      key={app.id}
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: idx * 0.05 }}
                      className="bg-white/95 backdrop-blur-xl rounded-[28px] p-6 sm:p-7 border border-slate-200/80 hover:border-purple-400/50 shadow-[0_10px_35px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_50px_rgba(147,51,234,0.12)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
                    >
                      <div>
                        {/* Top Bar with Icon & version */}
                        <div className="flex items-center justify-between mb-5">
                          <div
                            className="w-13 h-13 rounded-2xl flex items-center justify-center shadow-md transition-transform duration-300 group-hover:scale-108"
                            style={{ background: gradient, boxShadow: `0 10px 25px -5px ${glow}` }}
                          >
                            <AppIcon style={{ width: 24, height: 24, color: "#fff" }} strokeWidth={2} />
                          </div>
                          <span className="text-[11px] font-mono font-bold px-3 py-1 bg-slate-100/80 text-slate-600 rounded-full border border-slate-200/70">
                            {app.version}
                          </span>
                        </div>

                        {/* Title & Info */}
                        <h3 className="font-heading font-bold text-xl sm:text-2xl text-slate-900 group-hover:text-purple-600 transition-colors leading-snug">
                          {app.title}
                        </h3>
                        <p className="text-xs font-semibold text-slate-400 mt-1 mb-3">
                          {app.category} <span className="mx-1">•</span> {app.developer}
                        </p>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5 font-normal">
                          {app.description}
                        </p>

                        {/* Platforms Supported */}
                        <div className="flex flex-wrap gap-1.5 mb-6">
                          {app.platforms.map((plat: string) => (
                            <span
                              key={plat}
                              className="px-3 py-1 bg-slate-50 text-[11px] font-semibold text-slate-600 rounded-full border border-slate-200/80 flex items-center gap-1.5"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                              {plat}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        {/* Stats Row */}
                        <div className="flex items-center justify-between text-xs font-semibold text-slate-500 py-3.5 border-t border-slate-100 mb-5">
                          <span className="flex items-center text-amber-500 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200/60">
                            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500 mr-1" /> {app.rating}
                          </span>
                          <span className="flex items-center text-slate-600">
                            <Download className="w-3.5 h-3.5 mr-1.5 text-purple-500" /> {app.downloads}
                          </span>
                          <span className="text-slate-400 font-mono text-[11px]">{app.size}</span>
                        </div>

                        {/* Action Buttons */}
                        <div className="grid grid-cols-2 gap-2.5">
                          <Link
                            href={`/apps/${app.id}`}
                            className="py-2.5 px-3 rounded-xl border border-slate-200/90 bg-slate-50/80 hover:bg-slate-100 text-slate-700 text-xs font-bold transition-all text-center"
                          >
                            View Details
                          </Link>
                          <button
                            onClick={() => handleDownload(app)}
                            disabled={downloadingApp?.id === app.id}
                            className="py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-purple-600 text-white text-xs font-bold transition-all shadow-md shadow-blue-500/20 text-center flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            {downloadingApp?.id === app.id ? (
                              <span className="animate-pulse">Downloading...</span>
                            ) : (
                              <>
                                <Download className="w-3.5 h-3.5" /> Download
                              </>
                            )}
                          </button>
                        </div>
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
