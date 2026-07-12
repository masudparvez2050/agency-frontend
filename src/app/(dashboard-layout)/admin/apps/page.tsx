"use client";

import React, { useState } from "react";
import { APPS } from "@/lib/apps-data";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Eye, EyeOff, Check, X, Smartphone } from "lucide-react";

type AppRow = { id: string; name: string; category: string; version: string; platform: string; active: boolean; };

export default function AdminAppsPage() {
  const [apps, setApps] = useState<AppRow[]>(
    APPS.map(a => ({ id: a.id, name: a.title, category: a.category, version: a.version, platform: a.platforms.join(", "), active: true }))
  );
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Utility");
  const [version, setVersion] = useState("");
  const [platform, setPlatform] = useState("Android");
  const [size, setSize] = useState("");
  const [success, setSuccess] = useState(false);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !version || !size) return;
    setApps(prev => [...prev, { id: `app-${Date.now()}`, name, category, version, platform, active: true }]);
    setName(""); setVersion(""); setSize("");
    setSuccess(true); setShowForm(false);
    setTimeout(() => setSuccess(false), 4000);
  };

  const toggleActive = (id: string) => setApps(prev => prev.map(a => a.id === id ? { ...a, active: !a.active } : a));
  const deleteApp = (id: string) => setApps(prev => prev.filter(a => a.id !== id));

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-white">Apps Store CMS</h1>
          <p className="text-xs text-slate-400 mt-1">Manage native application binaries, versions, and platform availability.</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-xs font-bold text-white transition-all shadow cursor-pointer">
          {showForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          {showForm ? "Cancel" : "Add App"}
        </button>
      </div>

      {success && (
        <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-center gap-2">
          <Check className="w-4 h-4 shrink-0" /> App binary configuration uploaded!
        </div>
      )}

      <AnimatePresence>
        {showForm && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
            <form onSubmit={handleAdd} className="p-6 rounded-2xl bg-slate-950/70 border border-cyan-500/20 space-y-4 shadow-lg">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-cyan-400" /> Add New App
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">App Name *</label>
                  <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Plaxora GameHub" className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-850 text-xs text-white placeholder-slate-550 focus:outline-none focus:border-cyan-500/40" required />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">Category</label>
                    <select value={category} onChange={e => setCategory(e.target.value)} className="w-full px-2 py-2.5 rounded-xl bg-slate-900 border border-slate-850 text-xs text-slate-300 focus:outline-none focus:border-cyan-500/40 cursor-pointer">
                      {["Utility","Gaming","Fintech","DevTools","Education"].map(c => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">Version *</label>
                    <input type="text" value={version} onChange={e => setVersion(e.target.value)} placeholder="v1.0.0" className="w-full px-2 py-2.5 rounded-xl bg-slate-900 border border-slate-850 text-xs text-white placeholder-slate-550 focus:outline-none focus:border-cyan-500/40" required />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">Size</label>
                    <input type="text" value={size} onChange={e => setSize(e.target.value)} placeholder="45 MB" className="w-full px-2 py-2.5 rounded-xl bg-slate-900 border border-slate-850 text-xs text-white placeholder-slate-550 focus:outline-none focus:border-cyan-500/40" required />
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">Platform</label>
                <select value={platform} onChange={e => setPlatform(e.target.value)} className="w-full md:w-48 px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-850 text-xs text-slate-300 focus:outline-none focus:border-cyan-500/40 cursor-pointer">
                  {["Android","iOS","Desktop","Android, iOS","All Platforms"].map(p => <option key={p}>{p}</option>)}
                </select>
              </div>
              <button type="submit" className="px-6 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-xs font-bold text-white transition-all cursor-pointer">
                Publish App
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="rounded-2xl bg-slate-950/70 border border-slate-900 overflow-x-auto shadow-lg">
        <table className="w-full text-left text-xs border-collapse min-w-[500px]">
          <thead>
            <tr className="bg-slate-900/50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-900">
              <th className="p-4">App Name</th>
              <th className="p-4">Category</th>
              <th className="p-4">Version</th>
              <th className="p-4">Platform</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-900">
            {apps.map(a => (
              <tr key={a.id} className="hover:bg-slate-900/10 transition-colors">
                <td className="p-4 font-bold text-white">{a.name}</td>
                <td className="p-4"><span className="text-[10px] font-bold text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded">{a.category}</span></td>
                <td className="p-4 font-mono text-slate-300">{a.version}</td>
                <td className="p-4 text-slate-400">{a.platform}</td>
                <td className="p-4">
                  <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded border ${a.active ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" : "text-slate-500 bg-slate-800 border-slate-700"}`}>
                    {a.active ? "Live" : "Draft"}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex gap-2 justify-end">
                    <button onClick={() => toggleActive(a.id)} className="p-1.5 rounded-lg bg-slate-900 border border-slate-850 text-slate-400 hover:text-white transition-colors cursor-pointer">
                      {a.active ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                    <button onClick={() => deleteApp(a.id)} className="p-1.5 rounded-lg bg-slate-900 hover:bg-rose-600/10 border border-slate-850 hover:border-rose-500/20 text-slate-400 hover:text-rose-400 transition-all cursor-pointer">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
