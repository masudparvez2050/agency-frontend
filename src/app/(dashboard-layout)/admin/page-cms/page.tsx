"use client";

import React, { useState, useEffect } from "react";
import { usePageCMS, PageCopyConfig } from "@/hooks/usePageCMS";
import { motion, AnimatePresence } from "framer-motion";
import { Save, Check, FileText, RotateCcw, Layout, ArrowRight } from "lucide-react";

type PageKey = keyof PageCopyConfig;

const PAGES: { key: PageKey; label: string }[] = [
  { key: "home", label: "Home Page" },
  { key: "products", label: "Products Store" },
  { key: "apps", label: "App Store" },
  { key: "saas", label: "SaaS Directory" },
  { key: "portfolio", label: "Portfolio" },
  { key: "services", label: "Services" },
  { key: "pricing", label: "Pricing Plans" },
  { key: "blog", label: "Blog Insights" },
  { key: "about", label: "About Us" },
  { key: "contact", label: "Contact Form" },
];

export default function AdminPageCMS() {
  const [config, setConfig] = usePageCMS();
  const [activePage, setActivePage] = useState<PageKey>("home");
  const [saved, setSaved] = useState(false);

  // Form states matching standard page content structure
  const [badge, setBadge] = useState("");
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");

  // Home specific extra sections
  const [ctaTitle, setCtaTitle] = useState("");
  const [ctaSub, setCtaSub] = useState("");

  // Sync form inputs when active page or config changes
  useEffect(() => {
    if (config && config[activePage]) {
      const pageData = config[activePage];
      setBadge(pageData.hero.badge || "");
      setTitle(pageData.hero.title || "");
      setSubtitle(pageData.hero.subtitle || "");

      if (activePage === "home") {
        setCtaTitle(config.home.cta?.title || "");
        setCtaSub(config.home.cta?.subtitle || "");
      }
    }
  }, [config, activePage]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Construct new page data
    const updatedPageData: any = {
      hero: { badge, title, subtitle }
    };

    if (activePage === "home") {
      updatedPageData.cta = { title: ctaTitle, subtitle: ctaSub };
    }

    const newConfig: PageCopyConfig = {
      ...config,
      [activePage]: updatedPageData
    };

    setConfig(newConfig);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleReset = () => {
    if (confirm("Reset all copywriting to original system defaults?")) {
      localStorage.removeItem("plaxora_cms_page_content");
      window.location.reload();
    }
  };

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="flex items-center justify-between flex-wrap gap-4 p-6 rounded-3xl bg-gradient-to-r from-purple-900/20 via-slate-950 to-cyan-900/10 border border-purple-500/10 shadow-xl">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-white">Site-wide Page CMS</h1>
          <p className="text-xs text-slate-400 mt-1">
            Configure titles, descriptions, and banners for all 10 frontend pages in real-time.
          </p>
        </div>
        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 border border-slate-850 hover:border-slate-800 text-xs font-bold text-slate-400 hover:text-white transition-all cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset All Defaults
        </button>
      </div>

      {saved && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-center gap-2"
        >
          <Check className="w-4 h-4 shrink-0" />
          Changes for {PAGES.find(p => p.key === activePage)?.label} saved and published!
        </motion.div>
      )}

      {/* Editor Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Left Sidebar Menu */}
        <div className="md:col-span-1 p-4 rounded-2xl bg-slate-950/70 border border-slate-900 shadow-lg space-y-1.5 h-fit">
          <span className="block px-3 text-[9px] font-black text-slate-650 uppercase tracking-widest mb-3">
            Select Website Page
          </span>
          {PAGES.map(p => (
            <button
              key={p.key}
              onClick={() => {
                setActivePage(p.key);
                setSaved(false);
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all border text-left cursor-pointer ${
                activePage === p.key
                  ? "bg-purple-600/10 border-purple-500/20 text-purple-400"
                  : "border-transparent text-slate-450 hover:text-white hover:bg-white/5"
              }`}
            >
              <span>{p.label}</span>
              {activePage === p.key && <ArrowRight className="w-3.5 h-3.5" />}
            </button>
          ))}
        </div>

        {/* Right Active Editor Form */}
        <div className="md:col-span-3">
          <form onSubmit={handleSave} className="space-y-6">
            
            {/* Active Page Header Section Form */}
            <div className="p-6 rounded-3xl bg-slate-950/70 border border-slate-900 space-y-5 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 blur-2xl rounded-full" />
              <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-900 pb-3">
                <FileText className="w-4 h-4 text-purple-400" />
                {PAGES.find(p => p.key === activePage)?.label} — Hero Banner Content
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">
                    Hero Badge Text / Tagline
                  </label>
                  <input
                    type="text"
                    value={badge}
                    onChange={e => setBadge(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-850 text-xs text-white focus:outline-none focus:border-purple-500/40"
                    placeholder="e.g. Launching Ecosystem"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">
                    Main Heading Title
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-850 text-xs text-white focus:outline-none focus:border-purple-500/40"
                    placeholder="e.g. Modern Web Solutions"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">
                    Description Subtitle
                  </label>
                  <textarea
                    rows={4}
                    value={subtitle}
                    onChange={e => setSubtitle(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-850 text-xs text-white focus:outline-none focus:border-purple-500/40 resize-none"
                    placeholder="e.g. Build apps in minutes with customized layout components..."
                  />
                </div>
              </div>
            </div>

            {/* Home Page Specific CTA Editor */}
            {activePage === "home" && (
              <div className="p-6 rounded-3xl bg-slate-950/70 border border-slate-900 space-y-5 shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 blur-2xl rounded-full" />
                <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-900 pb-3">
                  <Layout className="w-4 h-4 text-cyan-400" />
                  Home Bottom Call-To-Action Copy
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">
                      CTA Title
                    </label>
                    <input
                      type="text"
                      value={ctaTitle}
                      onChange={e => setCtaTitle(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-850 text-xs text-white focus:outline-none focus:border-purple-500/40"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">
                      CTA Description Subtitle
                    </label>
                    <textarea
                      rows={3}
                      value={ctaSub}
                      onChange={e => setCtaSub(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-850 text-xs text-white focus:outline-none focus:border-purple-500/40 resize-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Save Button */}
            <button
              type="submit"
              className="w-full md:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-purple-650 to-cyan-555 hover:opacity-95 text-xs font-bold text-white transition-all shadow-lg cursor-pointer"
            >
              <Save className="w-4 h-4" />
              Save {PAGES.find(p => p.key === activePage)?.label} CMS Updates
            </button>

          </form>
        </div>

      </div>
    </div>
  );
}
