"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Send, Download } from "lucide-react";
import Link from "next/link";
import { usePageCMS } from "@/hooks/usePageCMS";

export default function CTASection() {
  const [pageConfig] = usePageCMS();

  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-white via-slate-50/50 to-white font-sans border-t border-slate-100">
      
      {/* Background Ambient Glow Spheres */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative max-w-5xl mx-auto rounded-[36px] p-10 sm:p-16 border border-slate-200/80 bg-white/95 backdrop-blur-2xl text-center shadow-[0_20px_60px_rgba(0,0,0,0.05)] overflow-hidden"
        >
          {/* Internal Glow Blobs */}
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

          {/* Heading content */}
          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-xs font-bold text-blue-600 uppercase tracking-wider shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-purple-600 animate-pulse" />
              <span>Launch Your Vision Today</span>
            </div>

            {/* Title */}
            <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-slate-900 tracking-tight leading-tight">
              {pageConfig.home.cta.title || "Ready to Accelerate Your Digital Growth?"}
            </h2>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              {pageConfig.home.cta.subtitle || "Explore our ecosystem of ready-to-deploy templates and native apps, or get in touch for custom software development tailored to your enterprise goals."}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 font-sans">
              <Link
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-full transition-all shadow-md shadow-blue-500/25 hover:shadow-lg hover:shadow-blue-500/35 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                Start Your Project
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
              <Link
                href="/products"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 text-xs font-bold text-slate-700 bg-white border border-slate-200/90 hover:bg-slate-50 rounded-full transition-all shadow-2xs cursor-pointer"
              >
                <Download className="w-4 h-4" />
                Browse Products
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
