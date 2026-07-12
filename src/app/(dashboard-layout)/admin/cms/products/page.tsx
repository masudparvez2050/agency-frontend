"use client";

import React, { useState, useEffect } from "react";
import { usePageCMS, PageCopyConfig } from "@/hooks/usePageCMS";
import { motion } from "framer-motion";
import { Save, Check, FileText } from "lucide-react";

export default function ProductsCMS() {
  const [config, setConfig] = usePageCMS();
  const [saved, setSaved] = useState(false);

  const [badge, setBadge] = useState("");
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");

  useEffect(() => {
    if (config) {
      setBadge(config.products.hero.badge || "");
      setTitle(config.products.hero.title || "");
      setSubtitle(config.products.hero.subtitle || "");
    }
  }, [config]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: PageCopyConfig = {
      ...config,
      products: { hero: { badge, title, subtitle } }
    };
    setConfig(updated);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <h1 className="text-2xl font-black text-white">Products Page CMS</h1>
        <p className="text-xs text-slate-400 mt-1">Manage header/hero content for Products landing page.</p>
      </div>

      {saved && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-center gap-2">
          <Check className="w-4 h-4 shrink-0" /> Changes saved and published!
        </motion.div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        <div className="p-6 rounded-2xl bg-slate-955/60 border border-slate-900 space-y-4 shadow-lg relative">
          <h3 className="text-xs font-bold text-white flex items-center gap-2 border-b border-slate-900 pb-3">
            <FileText className="w-4 h-4 text-purple-400" /> Header Section Content
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">Hero Badge Text</label>
              <input type="text" value={badge} onChange={e => setBadge(e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-850 text-xs text-white focus:outline-none focus:border-purple-500/40" />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">Hero Title headline</label>
              <input type="text" value={title} onChange={e => setTitle(e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-850 text-xs text-white focus:outline-none focus:border-purple-500/40" />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">Hero Subtitle</label>
              <textarea rows={3} value={subtitle} onChange={e => setSubtitle(e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-850 text-xs text-white focus:outline-none focus:border-purple-500/40 resize-none" />
            </div>
          </div>
        </div>

        <button type="submit" className="flex items-center gap-2 px-8 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-xs font-bold text-white transition-all shadow-md">
          <Save className="w-4 h-4" /> Save Products CMS Content
        </button>
      </form>
    </div>
  );
}
