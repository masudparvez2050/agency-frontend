"use client";

import React, { useState, useMemo } from "react";
import { APPS } from "@/lib/apps-data";
import { App } from "@/types/app";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, SlidersHorizontal, Smartphone, Download, Star, 
  ExternalLink, Laptop, Cpu, Check, X, ArrowRight
} from "lucide-react";

import { useCMSData } from "@/hooks/useCMS";

export default function AppsPage() {
  const [allApps] = useCMSData<any>("apps", APPS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPlatform, setSelectedPlatform] = useState("All");
  const [sortBy, setSortBy] = useState("popular");
  const [downloadingApp, setDownloadingApp] = useState<App | null>(null);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

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
    // Simulate package download
    setTimeout(() => {
      setDownloadingApp(null);
      // Trigger a browser file download mock-up
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
          <span className="text-xs font-bold text-purple-400 uppercase tracking-widest mb-3 block">Plaxora Store</span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white mb-4 leading-tight">
            Plaxora App Store
          </h1>
          <p className="text-slate-400">
            Download our native mobile apps, desktop suites, and command-line utilities. ad-free, data-secure, and optimized for performance.
          </p>
        </div>

        {/* Layout Grid: Sidebar + Main Content */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Desktop Left Sidebar Filters */}
          <aside className="hidden lg:block w-64 shrink-0 bg-slate-950/60 border border-slate-900 rounded-2xl p-6 backdrop-blur-xl sticky top-28 shadow-xl">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-900">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Filters</h3>
              {isFilterActive && (
                <button
                  onClick={clearFilters}
                  className="text-xs text-purple-400 hover:text-purple-300 font-bold transition-colors"
                >
                  Clear All
                </button>
              )}
            </div>

            {/* Category Section */}
            <div className="mb-8">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Categories</h4>
              <div className="flex flex-col gap-1.5">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-left transition-all border ${
                      selectedCategory === cat
                        ? "bg-purple-500/10 border-purple-500/20 text-purple-300 shadow-sm"
                        : "border-transparent text-slate-400 hover:text-white hover:bg-slate-900/50"
                    }`}
                  >
                    <span>{cat === "All" ? "All Categories" : cat}</span>
                    {selectedCategory === cat && <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Platform Section */}
            <div>
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Platforms</h4>
              <div className="flex flex-col gap-1.5">
                {platforms.map((plat) => {
                  const isSelected = selectedPlatform === plat;
                  return (
                    <button
                      key={plat}
                      onClick={() => setSelectedPlatform(plat)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-left transition-all border ${
                        isSelected
                          ? "bg-cyan-500/10 border-cyan-500/20 text-cyan-350 shadow-sm"
                          : "border-transparent text-slate-400 hover:text-white hover:bg-slate-900/50"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        {plat === "Windows" || plat === "macOS" || plat === "Linux" ? (
                          <Laptop className="w-3.5 h-3.5 text-slate-500 group-hover:text-white" />
                        ) : plat === "Android" || plat === "iOS" ? (
                          <Smartphone className="w-3.5 h-3.5 text-slate-500 group-hover:text-white" />
                        ) : (
                          <Cpu className="w-3.5 h-3.5 text-slate-500 group-hover:text-white" />
                        )}
                        {plat === "All" ? "All Platforms" : plat}
                      </span>
                      {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <div className="flex-1 w-full">
            
            {/* Top Toolbar (Search, Filter Button, Sort Selector) */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between p-4 rounded-2xl bg-slate-950/60 border border-slate-900 backdrop-blur-xl mb-8 shadow-lg">
              
              {/* Left side: Mobile filters trigger & Results Count */}
              <div className="flex items-center justify-between w-full md:w-auto gap-4">
                <button
                  onClick={() => setIsMobileFilterOpen(true)}
                  className="lg:hidden flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900 border border-slate-850 text-xs font-bold text-slate-300 hover:text-white transition-all"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5 text-purple-400" />
                  <span>Filters</span>
                  {isFilterActive && (
                    <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
                  )}
                </button>

                <div className="text-left">
                  <span className="text-xs font-bold text-white block">
                    {filteredAndSortedApps.length} {filteredAndSortedApps.length === 1 ? "App" : "Apps"} Found
                  </span>
                  <span className="text-[10px] text-slate-500 block">
                    Category: {selectedCategory === "All" ? "All" : selectedCategory} | Platform: {selectedPlatform === "All" ? "All" : selectedPlatform}
                  </span>
                </div>
              </div>

              {/* Right side: Search Input & Sort Selector */}
              <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto justify-end">
                {/* Search Box */}
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="text"
                    placeholder="Search apps..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-8 py-2 rounded-xl bg-slate-900 border border-slate-850 text-xs text-white placeholder-slate-550 focus:outline-none focus:border-purple-500/30 transition-colors"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 rounded-lg hover:bg-slate-800 text-slate-500 hover:text-slate-350 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>

                {/* Sort dropdown */}
                <div className="relative w-full sm:w-auto shrink-0">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full sm:w-auto appearance-none bg-slate-900 border border-slate-850 text-slate-300 text-xs font-semibold pl-3 pr-8 py-2 rounded-xl focus:outline-none focus:border-purple-500/30 transition-colors cursor-pointer"
                  >
                    <option value="popular">Popularity</option>
                    <option value="rating">User Rating</option>
                    <option value="newest">Last Updated</option>
                  </select>
                  <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                    <SlidersHorizontal className="w-3 h-3 rotate-90" />
                  </div>
                </div>
              </div>
            </div>

            {/* Apps Grid */}
            {filteredAndSortedApps.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAndSortedApps.map((app, idx) => (
                  <motion.div
                    key={app.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                    className="group relative rounded-2xl bg-slate-950 border border-slate-900 p-6 overflow-hidden flex flex-col justify-between hover:border-purple-500/20 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/5"
                  >
                    {/* Visual border glow */}
                    <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-purple-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-20" />

                    {/* Hover App Preview Image & Overlay */}
                    <div 
                      className="absolute inset-0 bg-cover bg-center opacity-0 group-hover:opacity-[0.14] transition-all duration-700 pointer-events-none scale-105 group-hover:scale-100 z-0"
                      style={{ backgroundImage: `url('/${app.id}-preview.png')` }}
                    />
                    <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10" />

                    <div className="relative z-20">
                      {/* Top Bar with Icon & version */}
                      <div className="flex items-center justify-between mb-6">
                        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${app.accent} p-[1px] flex items-center justify-center`}>
                          <div className="w-full h-full bg-[#030014] rounded-[15px] flex items-center justify-center">
                            {app.platforms.includes("Windows") || app.platforms.includes("Linux") ? (
                              <Laptop className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
                            ) : (
                              <Smartphone className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
                            )}
                          </div>
                        </div>
                        <span className="text-[10px] font-bold tracking-widest text-slate-500 uppercase px-2.5 py-1 rounded bg-slate-900 border border-slate-850">
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
                        {app.platforms.map((plat: string) => (
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

                    <div className="relative z-20">
                      <div className="w-full h-[1px] bg-slate-900 mb-6" />

                      {/* Stats Row */}
                      <div className="flex items-center justify-between mb-6 text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          <strong className="text-slate-350">{app.rating}</strong>
                        </span>
                        <span className="flex items-center gap-1.5">
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
                  We couldn&apos;t find any native applications matching your search parameters. Try clearing your filters.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Recently Updated Apps Section */}
        <div className="mt-20 pt-10 border-t border-slate-900/60">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-white">Recently Updated</h3>
              <p className="text-xs text-slate-500">Check out our latest releases and version updates.</p>
            </div>
            
            {/* Scroll Navigation Hints */}
            <div className="flex items-center gap-2 text-slate-500 text-[10px] font-bold uppercase tracking-wider group cursor-default">
              <span>Scroll to explore</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>          {/* Scrolling Row */}
          <div className="flex overflow-x-auto gap-4 pb-6 snap-x snap-mandatory scroll-smooth scrollbar-thin scrollbar-track-slate-950/20 scrollbar-thumb-slate-900/60">
            {allApps
              .slice()
              .sort((a: any, b: any) => b.lastUpdated.localeCompare(a.lastUpdated))
              .map((app: any) => (
                <div
                  key={`recent-${app.id}`}
                  className="w-72 shrink-0 snap-start rounded-2xl bg-slate-950/40 border border-slate-900/80 p-5 overflow-hidden flex flex-col justify-between hover:border-purple-500/20 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/5 relative group/recent"
                >
                  {/* App Glow border */}
                  <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-purple-500/30 to-transparent opacity-0 group-hover/recent:opacity-100 transition-opacity z-20" />

                  {/* Hover App Preview Image & Overlay */}
                  <div 
                    className="absolute inset-0 bg-cover bg-center opacity-0 group-hover/recent:opacity-[0.12] transition-all duration-700 pointer-events-none scale-105 group-hover/recent:scale-100 z-0"
                    style={{ backgroundImage: `url('/${app.id}-preview.png')` }}
                  />
                  <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover/recent:opacity-100 transition-opacity duration-500 pointer-events-none z-10" />

                  <div className="relative z-20 w-full">
                    {/* Header Icon & version */}
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${app.accent} p-[1px] flex items-center justify-center`}>
                        <div className="w-full h-full bg-[#030014] rounded-[9px] flex items-center justify-center">
                          {app.platforms.includes("Windows") || app.platforms.includes("Linux") ? (
                            <Laptop className="w-5 h-5 text-white" />
                          ) : (
                            <Smartphone className="w-5 h-5 text-white" />
                          )}
                        </div>
                      </div>
                      <span className="text-[9px] font-bold tracking-widest text-slate-500 uppercase px-2 py-0.5 rounded bg-slate-900 border border-slate-850">
                        {app.version}
                      </span>
                    </div>

                    {/* Info */}
                    <h4 className="text-sm font-bold text-white group-hover/recent:text-purple-400 transition-colors truncate">
                      {app.title}
                    </h4>
                    <span className="text-[10px] font-semibold text-purple-400/80 block mb-2 truncate">
                      {app.category} — {app.developer}
                    </span>
                    <p className="text-[11px] text-slate-400 mb-4 leading-relaxed line-clamp-2">
                      {app.description}
                    </p>

                    {/* Platforms */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {app.platforms.slice(0, 2).map((plat: string) => (
                        <span key={plat} className="inline-flex items-center gap-0.5 text-[9px] font-semibold text-slate-500 px-1.5 py-0.5 rounded bg-slate-900 border border-slate-850">
                          {plat}
                        </span>
                      ))}
                      {app.platforms.length > 2 && (
                        <span className="text-[9px] text-slate-650 font-semibold px-1 py-0.5">+{app.platforms.length - 2}</span>
                      )}
                    </div>
                  </div>

                  {/* Stats Footer & Actions */}
                  <div className="relative z-20 w-full">
                    <div className="w-full h-[1px] bg-slate-900 mb-4" />

                    {/* Stats Row */}
                    <div className="flex items-center justify-between mb-4 text-[10px] text-slate-500">
                      <span className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <strong className="text-slate-350">{app.rating}</strong>
                      </span>
                      <span className="flex items-center gap-1">
                        <Download className="w-3 h-3" />
                        <strong className="text-slate-350">{app.downloads}</strong>
                      </span>
                      <span className="font-semibold">{app.size}</span>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-2 gap-2">
                      <Link
                        href={`/apps/${app.id}`}
                        className="flex items-center justify-center gap-1 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-850 border border-slate-850 text-[10px] font-bold text-slate-350 hover:text-white transition-all"
                      >
                        View
                        <ExternalLink className="w-3 h-3" />
                      </Link>
                      <button
                        onClick={() => handleDownload(app)}
                        disabled={downloadingApp?.id === app.id}
                        className="flex items-center justify-center gap-1 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 disabled:bg-purple-600/30 text-[10px] font-bold text-white transition-all shadow-md shadow-purple-500/25 disabled:cursor-not-allowed"
                      >
                        {downloadingApp?.id === app.id ? "..." : "Download"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileFilterOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 lg:hidden"
            />
            {/* Drawer Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed right-0 top-0 bottom-0 w-80 bg-slate-950 border-l border-slate-900 p-6 z-50 lg:hidden flex flex-col justify-between overflow-y-auto"
            >
              <div>
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-900">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">Filters</h3>
                  <button
                    onClick={() => setIsMobileFilterOpen(false)}
                    className="p-1 rounded-lg hover:bg-slate-900 text-slate-400 hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Categories */}
                <div className="mb-8">
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Categories</h4>
                  <div className="flex flex-col gap-2">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold text-left transition-all border ${
                          selectedCategory === cat
                            ? "bg-purple-650/10 border-purple-500/20 text-purple-300"
                            : "border-transparent text-slate-400 hover:text-white hover:bg-slate-900"
                        }`}
                      >
                        <span>{cat === "All" ? "All Categories" : cat}</span>
                        {selectedCategory === cat && <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Platforms */}
                <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Platforms</h4>
                  <div className="flex flex-col gap-2">
                    {platforms.map((plat) => {
                      const isSelected = selectedPlatform === plat;
                      return (
                        <button
                          key={plat}
                          onClick={() => setSelectedPlatform(plat)}
                          className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold text-left transition-all border ${
                            isSelected
                              ? "bg-cyan-650/10 border-cyan-500/20 text-cyan-300"
                              : "border-transparent text-slate-400 hover:text-white hover:bg-slate-900"
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            {plat === "Windows" || plat === "macOS" || plat === "Linux" ? (
                              <Laptop className="w-3.5 h-3.5" />
                            ) : plat === "Android" || plat === "iOS" ? (
                              <Smartphone className="w-3.5 h-3.5" />
                            ) : (
                              <Cpu className="w-3.5 h-3.5" />
                            )}
                            {plat === "All" ? "All Platforms" : plat}
                          </span>
                          {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Reset / Apply inside drawer */}
              <div className="mt-8 pt-4 border-t border-slate-900">
                <button
                  onClick={() => {
                    clearFilters();
                    setIsMobileFilterOpen(false);
                  }}
                  className="w-full py-3 rounded-xl bg-slate-900 border border-slate-850 hover:bg-slate-850 text-xs font-bold text-slate-300 hover:text-white transition-all text-center mb-3"
                >
                  Reset Filters
                </button>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="w-full py-3 rounded-xl bg-purple-650 hover:bg-purple-500 text-xs font-bold text-white transition-all text-center shadow-lg shadow-purple-500/20"
                >
                  Apply Filters
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

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
