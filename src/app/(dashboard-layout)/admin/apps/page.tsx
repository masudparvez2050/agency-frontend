"use client";

import React, { useState } from "react";
import { APPS } from "@/lib/apps-data";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Eye, EyeOff, Check, X, Smartphone } from "lucide-react";
import { useCMSData } from "@/hooks/useCMS";

export default function AdminAppsPage() {
  const [apps, setApps] = useCMSData<any>("apps", APPS);
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
    const newApp = {
      id: `app-${Date.now()}`,
      title: name,
      category,
      description: "Designed for high scale and strict data security compliance.",
      fullDescription: "Designed for high scale and strict data security compliance.",
      downloads: "0",
      rating: 5.0,
      developer: "Plaxora Labs",
      version,
      lastUpdated: new Date().toISOString().split("T")[0],
      platforms: platform.split(",").map(p => p.trim()),
      size,
      accent: "from-cyan-500 to-blue-500",
      features: ["Offline support", "Biometric secure login"],
      requirements: ["OS v10+ support"],
      changelog: [],
      active: true
    };
    setApps([...apps, newApp]);
    setName(""); setVersion(""); setSize("");
    setSuccess(true); setShowForm(false);
    setTimeout(() => setSuccess(false), 4000);
  };

  const toggleActive = (id: string) => {
    setApps(apps.map((a: any) => a.id === id ? { ...a, active: a.active === false ? false : true } : a));
  };

  const deleteApp = (id: string) => {
    setApps(apps.filter((a: any) => a.id !== id));
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-slate-900">Apps Store CMS</h1>
          <p className="text-xs text-slate-500 mt-1">Manage native application binaries, versions, and platform availability.</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-xs font-bold text-white transition-all shadow-sm cursor-pointer">
          {showForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          {showForm ? "Cancel" : "Add App"}
        </button>
      </div>

      {success && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold flex items-center gap-2">
          <Check className="w-4 h-4 shrink-0" /> App binary configuration uploaded!
        </div>
      )}

      <AnimatePresence>
        {showForm && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
            <form onSubmit={handleAdd} className="p-6 rounded-2xl bg-white border border-purple-200 space-y-4 shadow-sm">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-purple-600" /> Add New App
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">App Name *</label>
                  <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Plaxora GameHub" className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all font-medium" required />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">Category</label>
                    <select value={category} onChange={e => setCategory(e.target.value)} className="w-full px-2 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all font-medium cursor-pointer">
                      {["Utility","Gaming","Fintech","DevTools","Education"].map(c => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">Version *</label>
                    <input type="text" value={version} onChange={e => setVersion(e.target.value)} placeholder="v1.0.0" className="w-full px-2 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all font-medium" required />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">Size</label>
                    <input type="text" value={size} onChange={e => setSize(e.target.value)} placeholder="45 MB" className="w-full px-2 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all font-medium" required />
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">Platform</label>
                <select value={platform} onChange={e => setPlatform(e.target.value)} className="w-full md:w-48 px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all font-medium cursor-pointer">
                  {["Android","iOS","Desktop","Android, iOS","All Platforms"].map(p => <option key={p}>{p}</option>)}
                </select>
              </div>
              <button type="submit" className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-xs font-bold text-white transition-all cursor-pointer shadow-sm">
                Publish App
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="rounded-2xl bg-white border border-slate-200 overflow-x-auto shadow-sm">
        <table className="w-full text-left text-xs border-collapse min-w-[500px]">
          <thead>
            <tr className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200">
              <th className="p-4">App Name</th>
              <th className="p-4">Category</th>
              <th className="p-4">Version</th>
              <th className="p-4">Platform</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {apps.map((a: any) => (
              <tr key={a.id} className="hover:bg-slate-50/80 transition-colors">
                <td className="p-4 font-bold text-slate-900">{a.title || a.name}</td>
                <td className="p-4"><span className="text-[10px] font-bold text-purple-700 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded-full">{a.category}</span></td>
                <td className="p-4 font-mono font-bold text-purple-700">{a.version}</td>
                <td className="p-4 text-slate-600 font-medium">
                  {Array.isArray(a.platforms) ? a.platforms.join(", ") : a.platform}
                </td>
                <td className="p-4">
                  <span className={`text-[9px] font-bold uppercase px-2.5 py-0.5 rounded-full border ${a.active !== false ? "text-emerald-700 bg-emerald-50 border-emerald-200" : "text-slate-500 bg-slate-100 border-slate-200"}`}>
                    {a.active !== false ? "Live" : "Draft"}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex gap-2 justify-end">
                    <button onClick={() => toggleActive(a.id)} className="p-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer">
                      {a.active !== false ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                    <button onClick={() => deleteApp(a.id)} className="p-1.5 rounded-lg bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 text-slate-500 hover:text-rose-600 transition-all cursor-pointer">
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
