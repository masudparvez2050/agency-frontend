"use client";

import React from "react";
import { SAAS_PRODUCTS } from "@/lib/saas-data";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  CheckCircle2, Database, ExternalLink, PhoneCall, Sparkles, ArrowRight
} from "lucide-react";

import { usePageCMS } from "@/hooks/usePageCMS";

export default function SaasPage() {
  const [pageConfig] = usePageCMS();

  return (
    <div className="min-h-screen pt-28 pb-24 overflow-hidden relative bg-gradient-to-b from-white via-slate-50/50 to-white font-sans">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-200/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-200/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-50 border border-purple-100 text-purple-600 text-xs font-bold uppercase tracking-wider mb-3 shadow-2xs">
            <Database className="w-3.5 h-3.5" />
            <span>{pageConfig.saas.hero.badge || "SaaS Hub & Live Platforms"}</span>
          </div>
          <h1 className="font-heading font-extrabold text-4xl md:text-5xl tracking-tight text-slate-900 leading-tight mb-3">
            {pageConfig.saas.hero.title || "Self-Hosted SaaS Tools"}
          </h1>
          <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
            {pageConfig.saas.hero.subtitle || "Deploy production-grade open source and proprietary SaaS platforms on your own servers in a single click."}
          </p>
        </div>

        {/* Directory Listings Showcase Cards with Images & Visit Site Buttons */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {SAAS_PRODUCTS.map((saas, idx) => (
            <motion.div
              key={saas.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="bg-white/95 backdrop-blur-xl rounded-[28px] border border-slate-200/80 hover:border-purple-400/50 overflow-hidden shadow-[0_10px_35px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_50px_rgba(147,51,234,0.12)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* SaaS Product Preview Image */}
                <div className="relative bg-slate-950 h-52 overflow-hidden border-b border-slate-100">
                  <img
                    src={`/${saas.id}-preview.png`}
                    alt={saas.title}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/product-1-preview.png";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />
                  
                  {/* Category Badge */}
                  <span className="absolute top-3.5 left-3.5 inline-flex items-center px-3 py-1 rounded-full bg-white/95 backdrop-blur-md border border-slate-200/80 text-[10px] font-extrabold text-purple-600 uppercase tracking-wider shadow-sm">
                    {saas.niche.split("&")[0].trim()}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-7">
                  <span className="text-[11px] font-bold text-purple-600 uppercase block mb-1">
                    {saas.niche}
                  </span>

                  <h3 className="font-heading font-bold text-xl sm:text-2xl text-slate-900 group-hover:text-purple-600 transition-colors leading-snug">
                    {saas.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed line-clamp-3 font-normal">
                    {saas.fullDescription}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mt-4 mb-5">
                    {saas.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-slate-100/80 text-[11px] font-semibold text-slate-600 rounded-full border border-slate-200/70"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="w-full h-[1px] bg-slate-100 mb-5" />

                  <ul className="space-y-2 mb-2 text-xs text-slate-600 font-semibold">
                    {saas.features.slice(0, 3).map((feat, i) => (
                      <li key={i} className="flex gap-2 items-center">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span className="line-clamp-1">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Button: Visit Site */}
              <div className="p-6 sm:p-7 pt-0">
                <a
                  href={saas.demoUrl || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-md shadow-blue-500/20 cursor-pointer"
                >
                  <ExternalLink className="w-4 h-4" /> Visit Site
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Custom Lead Call to Action */}
        <div className="p-8 sm:p-10 rounded-[32px] bg-gradient-to-r from-slate-900 via-purple-950 to-slate-900 text-white border border-purple-800/40 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="space-y-2 max-w-xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" /> Bespoke Engineering
            </div>
            <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-white">Need a Custom SaaS Solution?</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
              We specialize in custom Software-as-a-Service architecture. Tell us your business parameters and we will estimate, design, develop, and host a bespoke solution tailored to your workflow.
            </p>
          </div>
          <Link
            href="/contact"
            className="flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-white hover:bg-purple-50 text-slate-900 font-bold text-xs transition-all shadow-lg shrink-0 cursor-pointer relative z-10 group-hover:scale-105"
          >
            <PhoneCall className="w-4 h-4 text-purple-600" />
            <span>Request Bespoke Setup</span>
            <ArrowRight className="w-4 h-4 text-purple-600" />
          </Link>
        </div>
      </div>
    </div>
  );
}
