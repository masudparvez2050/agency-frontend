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

  // Filter and sort apps
  const filteredAndSortedApps = useMemo(() => {
    let result = allApps.filter((a: any) => a.active !== false);

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
      result.sort((a, b) => parseInt(b.downloads.replace(/,/g, '')) - parseInt(a.downloads.replace(/,/g, '')));
    } else if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "newest") {
      result.sort((a, b) => b.lastUpdated.localeCompare(a.lastUpdated));
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

  return (
    <div className="min-h-screen pt-32 pb-24 overflow-hidden relative">
      {/* Glow Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-purple-500/5 blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-cyan-500/5 blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-extrabold text-purple-700 uppercase tracking-widest mb-3 block">Plaxora Store</span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 mb-4 leading-tight">
            Plaxora App Store
          </h1>
          <p className="text-slate-600 font-medium">
            Explore native Android, iOS, desktop, and CLI tools built for speed, simplicity, and efficiency.
          </p>
        </div>

        {/* Main Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          
          {/* Desktop Left Sidebar Filter Panel */}
          <div className="hidden lg:block space-y-6 sticky top-28">
            {/* Categories */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <span className="block text-xs font-extrabold text-slate-500 uppercase tracking-widest">Categories</span>
                {isFilterActive && (
                  <button onClick={clearFilters} className="text-[10px] font-bold text-purple-700 hover:underline">
                    Reset
                  </button>
                )}
              </div>
              <div className="space-y-1.5">
                {categories.map((cat) => {
                  const isActive = selectedCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all border ${
                        isActive
                          ? "bg-purple-50 border-purple-200 text-purple-700"
                          : "bg-transparent border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                      }`}
                    >
                      <span>{cat}</span>
                      {isActive && <div className="w-1.5 h-1.5 rounded-full bg-purple-600" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Platforms */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-4">
              <span className="block text-xs font-extrabold text-slate-500 uppercase tracking-widest">Target Platform</span>
              <div className="space-y-1.5">
                {platforms.map((plat) => {
                  const isActive = selectedPlatform === plat;
                  return (
                    <button
                      key={plat}
                      onClick={() => setSelectedPlatform(plat)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all border ${
                        isActive
                          ? "bg-purple-50 border-purple-200 text-purple-700"
                          : "bg-transparent border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        {plat === "Windows" || plat === "macOS" || plat === "Linux" ? (
                          <Laptop className="w-4 h-4" />
                        ) : plat === "Android" || plat === "iOS" ? (
                          <Smartphone className="w-4 h-4" />
                        ) : (
                          <Cpu className="w-4 h-4" />
                        )}
                        {plat}
                      </span>
                      {isActive && <div className="w-1.5 h-1.5 rounded-full bg-purple-600" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Apps Main Column */}
          <div className="lg:col-span-3 space-y-8">
            
            {/* Top Toolbar */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between p-4 rounded-2xl bg-white border border-slate-200/80 backdrop-blur-xl shadow-md">
              <div className="flex items-center gap-2.5 w-full md:max-w-md">
                <div className="relative flex-1">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search applications..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-purple-500/50 transition-all font-medium"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 text-slate-400 hover:text-slate-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              <div className="text-xs text-slate-500 font-extrabold uppercase tracking-wider hidden md:block">
                Found {filteredAndSortedApps.length} Applications
              </div>
            </div>

            {/* Apps Grid */}
            {filteredAndSortedApps.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredAndSortedApps.map((app, idx) => (
                  <motion.div
                    key={app.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                    className="group relative rounded-2xl bg-white border border-slate-200/80 p-6 overflow-hidden flex flex-col justify-between hover:border-purple-300 transition-all duration-300 shadow-md hover:shadow-xl hover:shadow-purple-500/5"
                  >
                    <div className="relative z-20">
                      {/* Top Bar with Icon & version */}
                      <div className="flex items-center justify-between mb-6">
                        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${app.accent} p-[1px] flex items-center justify-center shadow-sm`}>
                          <div className="w-full h-full bg-white rounded-[15px] flex items-center justify-center">
                            {app.platforms.includes("Windows") || app.platforms.includes("Linux") ? (
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

                      {/* Title & Info */}
                      <h3 className="text-xl font-bold text-slate-900 group-hover:text-purple-700 transition-colors">
                        {app.title}
                      </h3>
                      <span className="text-xs font-bold text-purple-700 block mb-3">
                        {app.category} — Developed by {app.developer}
                      </span>
                      <p className="text-sm text-slate-600 mb-6 leading-relaxed line-clamp-3 font-normal">
                        {app.description}
                      </p>

                      {/* Platforms Supported */}
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {app.platforms.map((plat: string) => (
                          <span
                            key={plat}
                            className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-600 px-2.5 py-0.5 rounded-full bg-slate-100 border border-slate-200"
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
                          href={`/apps/${app.id}`}
                          className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-xs font-bold text-slate-700 transition-all shadow-sm"
                        >
                          View Details
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>
                        <button
                          onClick={() => handleDownload(app)}
                          disabled={downloadingApp?.id === app.id}
                          className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 disabled:opacity-50 text-xs font-bold text-white transition-all shadow-md shadow-purple-500/15"
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
              <div className="text-center py-24 rounded-2xl bg-white border border-slate-200/80 backdrop-blur-sm max-w-md mx-auto shadow-md">
                <SlidersHorizontal className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-slate-900 mb-2">No applications found</h3>
                <p className="text-sm text-slate-600 px-6 font-medium">
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
              className="flex items-center gap-3 p-4 rounded-xl bg-white border border-emerald-200 text-xs text-slate-700 shadow-2xl"
            >
              <div className="w-6 h-6 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center">
                <Check className="w-3.5 h-3.5" />
              </div>
              <p className="font-medium">
                Downloading <strong className="text-slate-900 font-bold">{downloadingApp.title}</strong> installer...
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
