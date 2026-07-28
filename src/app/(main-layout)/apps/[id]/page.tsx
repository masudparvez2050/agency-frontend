"use client";

import React, { use } from "react";
import { APPS } from "@/lib/apps-data";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ArrowLeft, Download, Smartphone, Laptop, 
  CheckCircle2, Server, Info, Gamepad, Wallet, Terminal, Sparkles, ArrowRight
} from "lucide-react";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function AppDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const id = resolvedParams.id;

  const app = APPS.find((a) => a.id === id);
  const relatedApps = APPS.filter((a) => a.id !== id).slice(0, 4);

  if (!app) {
    return (
      <div className="min-h-screen pt-28 pb-24 flex items-center justify-center relative bg-gradient-to-b from-white via-slate-50/50 to-white font-sans">
        <div className="text-center relative z-10 p-10 rounded-[28px] bg-white/95 backdrop-blur-xl border border-slate-200/80 shadow-[0_10px_35px_rgba(0,0,0,0.03)] max-w-md">
          <h1 className="font-heading font-extrabold text-2xl text-slate-900 mb-2">Application Not Found</h1>
          <p className="text-xs text-slate-500 mb-6 font-normal">
            The application you are searching for does not exist in our store or has been unlisted.
          </p>
          <Link
            href="/apps"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-xs font-bold text-white transition-all shadow-md shadow-blue-500/20"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to App Store
          </Link>
        </div>
      </div>
    );
  }

  const getAppGradient = (appId: string) => {
    if (appId.includes("game")) return { gradient: "linear-gradient(135deg, #8b5cf6, #ec4899)", glow: "rgba(236,72,153,0.25)", icon: Gamepad };
    if (appId.includes("wallet") || appId.includes("pay")) return { gradient: "linear-gradient(135deg, #3b82f6, #06b6d4)", glow: "rgba(6,182,212,0.25)", icon: Wallet };
    return { gradient: "linear-gradient(135deg, #06b6d4, #10b981)", glow: "rgba(16,185,129,0.25)", icon: Terminal };
  };

  const { gradient, glow, icon: AppIcon } = getAppGradient(app.id);

  return (
    <div className="min-h-screen pt-28 pb-24 relative overflow-hidden bg-gradient-to-b from-white via-slate-50/50 to-white font-sans">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-200/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-200/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Back Link */}
        <Link
          href="/apps"
          className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100/80 hover:bg-purple-600 hover:text-white border border-slate-200/80 text-xs font-bold text-slate-700 mb-8 transition-all duration-200 shadow-2xs"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
          <span>Back to App Store</span>
        </Link>

        {/* Article Header */}
        <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center mb-10 pb-8 border-b border-slate-200/80">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 shadow-md"
            style={{ background: gradient, boxShadow: `0 10px 25px -5px ${glow}` }}
          >
            <AppIcon style={{ width: 30, height: 30, color: "#fff" }} strokeWidth={2} />
          </div>

          <div>
            <div className="flex items-center gap-2 flex-wrap mb-1.5">
              <span className="text-[10px] font-mono font-bold px-3 py-1 bg-slate-100/80 text-slate-600 rounded-full border border-slate-200/70">
                {app.version}
              </span>
            </div>
            <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900 leading-tight mb-2">
              {app.title}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              {app.description}
            </p>
          </div>
        </div>

        {/* SEO Blog Article Style Main Content */}
        <article className="prose prose-slate max-w-none space-y-8 text-slate-700">
          
          {/* Main Hero Cover / Preview Image */}
          <div className="rounded-[28px] overflow-hidden border border-slate-200/80 shadow-md bg-slate-950">
            <img
              src={`/${app.id}-preview.png`}
              alt={app.title}
              className="w-full h-auto max-h-[420px] object-cover"
            />
          </div>

          {/* About / Full Description */}
          <div className="space-y-4">
            <h2 className="font-heading font-bold text-2xl text-slate-900">About {app.title}</h2>
            <p className="text-sm sm:text-base leading-relaxed text-slate-600 font-normal">
              {app.fullDescription}
            </p>
          </div>

          {/* Verified Badge Notice */}
          <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-100 flex gap-3 text-xs text-slate-700 font-normal">
            <Info className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              All Plaxora App Store packages are pre-verified, 100% open-source & ad-free, and safe from background telemetry trackers.
            </p>
          </div>

          {/* Key Features */}
          <div className="space-y-4 pt-4">
            <h2 className="font-heading font-bold text-2xl text-slate-900">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {app.features.map((feat, i) => (
                <div key={i} className="flex gap-2.5 text-xs sm:text-sm text-slate-700 items-start font-semibold p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Specifications */}
          <div className="space-y-4 pt-4">
            <h2 className="font-heading font-bold text-2xl text-slate-900">Technical Specifications</h2>
            <div className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200/70">
              <ul className="space-y-3">
                {app.requirements.map((req, i) => (
                  <li key={i} className="flex gap-2.5 text-xs sm:text-sm text-slate-700 items-center font-semibold">
                    <Server className="w-4 h-4 text-purple-600 shrink-0" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Download & Installation Section */}
          <div className="p-7 sm:p-8 rounded-[28px] bg-gradient-to-r from-slate-900 via-purple-950 to-slate-900 text-white border border-purple-800/40 space-y-5 my-10 shadow-xl">
            <div className="space-y-1">
              <h3 className="font-heading font-extrabold text-2xl text-white">Download & Install {app.title}</h3>
              <p className="text-xs text-slate-300">Choose your target platform installer below:</p>
            </div>
            
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={() => alert(`Downloading ${app.title} installer...`)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
              >
                <Download className="w-4 h-4" /> Download Release ({app.version})
              </button>
            </div>
          </div>

        </article>

        {/* Related Apps Section */}
        {relatedApps.length > 0 && (
          <div className="mt-16 pt-12 border-t border-slate-200/80 space-y-6">
            <h2 className="font-heading font-bold text-2xl text-slate-900">Related Applications</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
              {relatedApps.map((relApp) => {
                const { gradient: relGrad, glow: relGlow, icon: RelIcon } = getAppGradient(relApp.id);
                return (
                  <Link
                    key={relApp.id}
                    href={`/apps/${relApp.id}`}
                    className="bg-white/95 backdrop-blur-xl rounded-[24px] p-5 border border-slate-200/80 hover:border-purple-400/50 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center shadow-xs"
                          style={{ background: relGrad, boxShadow: `0 6px 16px -4px ${relGlow}` }}
                        >
                          <RelIcon style={{ width: 18, height: 18, color: "#fff" }} strokeWidth={2} />
                        </div>
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full border border-slate-200">
                          {relApp.version}
                        </span>
                      </div>
                      <h4 className="font-heading font-bold text-sm text-slate-900 group-hover:text-purple-600 transition-colors line-clamp-1">
                        {relApp.title}
                      </h4>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                        {relApp.description}
                      </p>
                    </div>

                    <div className="pt-4 text-xs font-bold text-purple-600 flex items-center gap-1 group-hover:gap-1.5 transition-all">
                      <span>View App</span>
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
