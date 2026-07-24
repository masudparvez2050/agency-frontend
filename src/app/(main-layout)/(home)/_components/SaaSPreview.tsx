"use client";

import React from "react";
import { motion } from "framer-motion";
import { Database, ArrowRight, ExternalLink, CheckCircle2, Sparkles, Activity } from "lucide-react";
import Link from "next/link";
import { SAAS_PRODUCTS } from "@/lib/saas-data";

export default function SaaSPreview() {
  return (
    <section id="saas" className="py-20 bg-gradient-to-b from-white via-slate-50/50 to-white border-t border-slate-100 font-sans relative overflow-hidden">
      
      {/* Background Decorative Ambient Glows */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-50 border border-purple-100 text-purple-600 text-xs font-bold uppercase tracking-wider mb-3 shadow-2xs">
              <Database className="w-3.5 h-3.5" />
              <span>SaaS Portfolio & Live Tools</span>
            </div>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight leading-tight">
              Production-Ready SaaS Products
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 font-normal max-w-2xl leading-relaxed">
              We deploy and manage highly scalable SaaS systems designed to run complex workflows with near-perfect uptime metrics.
            </p>
          </div>

          <Link
            href="/saas"
            className="mt-6 md:mt-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold text-slate-700 bg-white border border-slate-200/90 hover:bg-purple-50 hover:text-purple-600 hover:border-purple-200 transition-all duration-200 shadow-2xs group"
          >
            <span>Explore SaaS hub</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* SaaS Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {SAAS_PRODUCTS.slice(0, 3).map((saas, idx) => (
            <motion.div
              key={saas.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white/95 backdrop-blur-xl rounded-[28px] border border-slate-200/80 overflow-hidden hover:border-purple-400/50 shadow-[0_10px_35px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_50px_rgba(147,51,234,0.12)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Product Cover Preview Image */}
                <div className="relative bg-slate-950 h-48 sm:h-52 overflow-hidden">
                  <img
                    src={`/${saas.id}-preview.png`}
                    alt={saas.title}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/product-1-preview.png";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                  
                  {/* Status & Uptime Badge Overlay */}
                  <span className="absolute top-3.5 left-3.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/85 backdrop-blur-md border border-white/20 text-[10px] font-mono font-bold text-emerald-400 shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    LIVE • {saas.stats.find(s => s.label.includes("Uptime"))?.value || "99.99% Uptime"}
                  </span>

                  {/* Niche Badge Overlay */}
                  <span className="absolute top-3.5 right-3.5 inline-flex items-center px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-white/90 text-[10px] font-extrabold text-purple-600 uppercase tracking-wider shadow-sm">
                    {saas.niche.split(",")[0].trim()}
                  </span>
                </div>

                {/* Card Content */}
                <div className="p-6 sm:p-7">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-600" />
                    <span className="text-[11px] font-bold text-purple-600 uppercase tracking-wide">
                      {saas.niche}
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-xl text-slate-900 group-hover:text-purple-600 transition-colors leading-snug">
                    {saas.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed line-clamp-2">
                    {saas.description}
                  </p>

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-1.5 mt-4 mb-5">
                    {saas.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 bg-slate-100/80 text-[10px] font-bold text-slate-600 rounded-full border border-slate-200/60"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Features List */}
                  <div className="border-t border-slate-100 pt-4 space-y-2">
                    {saas.features.slice(0, 3).map((feat, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span className="line-clamp-1">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button Footer */}
              <div className="p-6 sm:p-7 pt-0">
                <a
                  href={saas.demoUrl || `/saas/${saas.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white text-xs font-bold transition-all shadow-md shadow-purple-500/20 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> Visit Site
                </a>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
