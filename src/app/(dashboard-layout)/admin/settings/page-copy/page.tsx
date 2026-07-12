"use client";

import React, { useState, useEffect } from "react";
import { usePageCMS, PageCopyConfig } from "@/hooks/usePageCMS";
import { motion } from "framer-motion";
import { Save, Check, FileText, ArrowRight, RotateCcw } from "lucide-react";

export default function AdminPageCopyCMS() {
  const [config, setConfig] = usePageCMS();
  
  // Local form states to avoid sluggish inputs
  const [heroBadge, setHeroBadge] = useState("");
  const [heroTitle, setHeroTitle] = useState("");
  const [heroSub, setHeroSub] = useState("");
  
  const [ctaTitle, setCtaTitle] = useState("");
  const [ctaSub, setCtaSub] = useState("");
  
  const [aboutTitle, setAboutTitle] = useState("");
  const [aboutSub, setAboutSub] = useState("");

  const [saved, setSaved] = useState(false);

  // Sync form inputs when config is loaded from storage
  useEffect(() => {
    if (config) {
      setHeroBadge(config.home.hero.badge || "");
      setHeroTitle(config.home.hero.title || "");
      setHeroSub(config.home.hero.subtitle || "");
      
      setCtaTitle(config.home.cta.title || "");
      setCtaSub(config.home.cta.subtitle || "");
      
      setAboutTitle(config.about.hero.title || "");
      setAboutSub(config.about.hero.subtitle || "");
    }
  }, [config]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: PageCopyConfig = {
      home: {
        hero: { badge: heroBadge, title: heroTitle, subtitle: heroSub },
        cta: { title: ctaTitle, subtitle: ctaSub }
      },
      about: {
        hero: { title: aboutTitle, subtitle: aboutSub }
      }
    };
    setConfig(updated);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleReset = () => {
    if (confirm("Are you sure you want to reset all copywriting to original system defaults?")) {
      localStorage.removeItem("plaxora_cms_page_content");
      window.location.reload();
    }
  };

  return (
    <div className="space-y-8 max-w-3xl">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-white">Page Sections Copywriting CMS</h1>
          <p className="text-xs text-slate-400 mt-1">
            Dynamically edit headings, subtitles, and labels for Home and About pages.
          </p>
        </div>
        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs font-bold text-slate-400 hover:text-white transition-all cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset Defaults
        </button>
      </div>

      {saved && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-center gap-2"
        >
          <Check className="w-4 h-4 shrink-0" />
          Page section copy changes successfully saved and published!
        </motion.div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* Home Hero CMS */}
        <div className="p-6 rounded-2xl bg-slate-950/70 border border-slate-900 space-y-5 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 blur-xl rounded-full" />
          <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-900 pb-3">
            <FileText className="w-4 h-4 text-purple-400" />
            Home Hero Section Content
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">Hero Badge Text</label>
              <input type="text" value={heroBadge} onChange={e => setHeroBadge(e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-850 text-xs text-white focus:outline-none focus:border-purple-500/40" />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">Main Hero Title</label>
              <input type="text" value={heroTitle} onChange={e => setHeroTitle(e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-850 text-xs text-white focus:outline-none focus:border-purple-500/40" />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">Hero Subtitle</label>
              <textarea rows={3} value={heroSub} onChange={e => setHeroSub(e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-850 text-xs text-white focus:outline-none focus:border-purple-500/40 resize-none" />
            </div>
          </div>
        </div>

        {/* Home CTA Section CMS */}
        <div className="p-6 rounded-2xl bg-slate-950/70 border border-slate-900 space-y-5 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 blur-xl rounded-full" />
          <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-900 pb-3">
            <FileText className="w-4 h-4 text-cyan-400" />
            Home Bottom CTA Section Content
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">CTA Section Title</label>
              <input type="text" value={ctaTitle} onChange={e => setCtaTitle(e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-850 text-xs text-white focus:outline-none focus:border-purple-500/40" />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">CTA Section Subtitle</label>
              <textarea rows={3} value={ctaSub} onChange={e => setCtaSub(e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-850 text-xs text-white focus:outline-none focus:border-purple-500/40 resize-none" />
            </div>
          </div>
        </div>

        {/* About Hero Section CMS */}
        <div className="p-6 rounded-2xl bg-slate-950/70 border border-slate-900 space-y-5 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 blur-xl rounded-full" />
          <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-900 pb-3">
            <FileText className="w-4 h-4 text-amber-400" />
            About Page Hero Content
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">Hero Page Heading</label>
              <input type="text" value={aboutTitle} onChange={e => setAboutTitle(e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-850 text-xs text-white focus:outline-none focus:border-purple-500/40" />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">Hero Page Description</label>
              <textarea rows={3} value={aboutSub} onChange={e => setAboutSub(e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-850 text-xs text-white focus:outline-none focus:border-purple-500/40 resize-none" />
            </div>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-purple-650 to-cyan-555 hover:opacity-95 text-xs font-bold text-white transition-all shadow-lg cursor-pointer"
        >
          <Save className="w-4 h-4" />
          Publish Copywriting Updates
        </button>

      </form>
    </div>
  );
}
