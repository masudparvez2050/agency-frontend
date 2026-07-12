"use client";

import React, { use, useState } from "react";
import { APPS } from "@/lib/apps-data";
import { App } from "@/types/app";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, Star, Download, Smartphone, Laptop, 
  CheckCircle, Server, AlertCircle, Info, Calendar, Check 
} from "lucide-react";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function AppDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const id = resolvedParams.id;

  const app = APPS.find((a) => a.id === id);

  const [activeTab, setActiveTab] = useState<"overview" | "features" | "specs" | "changelog">("overview");
  const [downloadingApp, setDownloadingApp] = useState<App | null>(null);

  if (!app) {
    return (
      <div className="min-h-screen pt-32 pb-24 flex items-center justify-center relative">
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
        <div className="text-center relative z-10 p-8 rounded-2xl bg-slate-950/40 border border-slate-900 backdrop-blur-sm max-w-md">
          <AlertCircle className="w-12 h-12 text-rose-500 mx-auto mb-4" />
          <h1 className="text-2xl font-black text-white mb-2">Application Not Found</h1>
          <p className="text-sm text-slate-400 mb-6">
            The application you are searching for does not exist in our store or has been unlisted.
          </p>
          <Link
            href="/apps"
            className="inline-flex items-center gap-1.5 px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-xs font-bold text-white transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to App Store
          </Link>
        </div>
      </div>
    );
  }

  const handleDownload = () => {
    setDownloadingApp(app);
    setTimeout(() => {
      setDownloadingApp(null);
    }, 2000);
  };

  return (
    <div className="min-h-screen pt-32 pb-24 relative overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-purple-500/5 blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-cyan-500/5 blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Back Link */}
        <Link
          href="/apps"
          className="group inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-purple-400 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          Back to App Store
        </Link>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          
          {/* Main Content Column (Left) */}
          <div className="lg:col-span-2 space-y-10">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
              <div className={`w-20 h-20 rounded-2xl bg-gradient-to-tr ${app.accent} p-[1px] flex items-center justify-center shrink-0`}>
                <div className="w-full h-full bg-[#030014] rounded-[19px] flex items-center justify-center">
                  <Smartphone className="w-10 h-10 text-white" />
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-[10px] font-extrabold text-purple-300 uppercase tracking-wider">
                    {app.category} Application
                  </span>
                  <span className="text-[10px] text-slate-500 font-semibold">
                    Version: {app.version}
                  </span>
                </div>
                <h1 className="text-3xl md:text-5xl font-black text-white mt-2 mb-3">
                  {app.title}
                </h1>
                <p className="text-sm text-slate-400 leading-relaxed max-w-xl">
                  {app.description}
                </p>
              </div>
            </div>

            {/* Simulated Live Frame / Image Preview */}
            <div className={`h-80 md:h-[400px] rounded-2xl bg-gradient-to-br ${app.accent} relative flex items-center justify-center p-8 border border-slate-900 shadow-2xl`}>
              <div className="absolute inset-0 bg-black/10" />
              <div className="relative p-6 rounded-2xl bg-[#030014]/90 border border-white/10 text-center max-w-md shadow-2xl backdrop-blur-md">
                <span className="text-[10px] uppercase font-bold tracking-widest text-purple-400">{app.category}</span>
                <p className="text-xl font-extrabold text-white mt-1.5 mb-2">{app.title}</p>
                <div className="flex gap-2 justify-center flex-wrap mt-4">
                  {app.platforms.map((plat) => (
                    <span key={plat} className="text-xs bg-white/5 border border-white/10 px-2.5 py-0.5 rounded text-slate-350">
                      {plat}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Details tabs */}
            <div className="border-b border-slate-900 flex gap-6 overflow-x-auto no-scrollbar">
              {[
                { id: "overview", label: "Overview" },
                { id: "features", label: "Features" },
                { id: "specs", label: "System Specs" },
                { id: "changelog", label: "Release History" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`py-3.5 text-sm font-bold border-b-2 transition-all shrink-0 ${
                    activeTab === tab.id
                      ? "border-purple-500 text-white"
                      : "border-transparent text-slate-500 hover:text-slate-300"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab content area */}
            <div className="relative min-h-[250px]">
              {activeTab === "overview" && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <h3 className="text-lg font-bold text-white">About this App</h3>
                  <p className="text-sm md:text-base text-slate-400 leading-relaxed">
                    {app.fullDescription}
                  </p>
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-900 flex gap-3 text-xs text-slate-400">
                    <Info className="w-5 h-5 text-purple-400 shrink-0" />
                    <p className="leading-relaxed">
                      Plaxora applications are strictly monitored. We guarantee zero telemetry data logs, no interstitial ads, and optimized local performance. Package updates are published in sync with the repository.
                    </p>
                  </div>
                </motion.div>
              )}

              {activeTab === "features" && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <h3 className="text-lg font-bold text-white">Key Features</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {app.features.map((feat, i) => (
                      <li key={i} className="flex gap-2.5 text-sm text-slate-300 items-start">
                        <CheckCircle className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}

              {activeTab === "specs" && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <h3 className="text-lg font-bold text-white">System Requirements</h3>
                  <div className="p-6 rounded-2xl bg-slate-950 border border-slate-900">
                    <ul className="space-y-4">
                      {app.requirements.map((req, i) => (
                        <li key={i} className="flex gap-3 text-sm text-slate-300 items-center">
                          <Server className="w-4 h-4 text-purple-400" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}

              {activeTab === "changelog" && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-8"
                >
                  {app.changelog.map((entry, idx) => (
                    <div key={idx} className="relative pl-6 border-l border-slate-900 space-y-3">
                      <div className="absolute left-[-5px] top-1.5 w-2.5 h-2.5 rounded-full bg-purple-500" />
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="text-sm font-black text-white">{entry.version}</span>
                        <span className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold">
                          <Calendar className="w-3.5 h-3.5" />
                          {entry.date}
                        </span>
                      </div>
                      <ul className="space-y-2">
                        {entry.changes.map((change, i) => (
                          <li key={i} className="text-xs text-slate-400 flex gap-2">
                            <span className="text-purple-500">•</span>
                            <span>{change}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </motion.div>
              )}
            </div>
          </div>

          {/* Pricing Info Sidebar (Right) */}
          <div className="space-y-8 sticky top-28">
            {/* Purchase Box */}
            <div className="p-6 md:p-8 rounded-2xl bg-slate-950 border border-slate-900 space-y-6 shadow-xl">
              <div>
                <span className="text-xs font-bold text-slate-500 uppercase">License Cost</span>
                <div className="text-3xl font-black text-white mt-1">
                  Free Download
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={handleDownload}
                disabled={downloadingApp !== null}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 disabled:bg-purple-600/30 text-sm font-bold text-white transition-all shadow-lg shadow-purple-500/10 disabled:cursor-not-allowed"
              >
                {downloadingApp ? (
                  <span className="flex items-center gap-1 animate-pulse">
                    Downloading...
                  </span>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    Download Package ({app.size})
                  </>
                )}
              </button>

              <div className="w-full h-[1px] bg-slate-900" />

              {/* Specs List */}
              <div className="space-y-4 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-semibold">Developer</span>
                  <span className="text-white font-bold">{app.developer}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-semibold">Downloads</span>
                  <span className="flex items-center gap-1 text-white font-bold">
                    <Download className="w-3 h-3 text-slate-400" />
                    {app.downloads}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-semibold">User Rating</span>
                  <span className="flex items-center gap-0.5 text-white font-bold">
                    {app.rating}
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-semibold">File size</span>
                  <span className="text-white font-bold">{app.size}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-semibold">Updated</span>
                  <span className="text-white font-bold">{app.lastUpdated}</span>
                </div>
              </div>
            </div>

            {/* Platform badges */}
            <div className="p-5 rounded-2xl bg-purple-950/10 border border-purple-500/20 space-y-4 shadow-md">
              <span className="block text-xs font-bold text-white uppercase tracking-wider">OS Platform Support</span>
              <div className="flex flex-wrap gap-2">
                {app.platforms.map((plat) => (
                  <span
                    key={plat}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-900 text-xs font-semibold text-slate-300"
                  >
                    {plat === "Windows" || plat === "macOS" || plat === "Linux" ? (
                      <Laptop className="w-3.5 h-3.5 text-purple-405 shrink-0" />
                    ) : (
                      <Smartphone className="w-3.5 h-3.5 text-cyan-405 shrink-0" />
                    )}
                    {plat}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>
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
