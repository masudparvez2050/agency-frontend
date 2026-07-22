"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Send, Download } from "lucide-react";
import Link from "next/link";
import { usePageCMS } from "@/hooks/usePageCMS";

export default function CTASection() {
  const [pageConfig] = usePageCMS();

  return (
    <section className="py-28 relative overflow-hidden bg-transparent">
      {/* Decorative Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-purple-500/10 via-indigo-500/5 to-cyan-500/10 blur-[130px] pointer-events-none rounded-full" />
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative max-w-5xl mx-auto rounded-3xl p-10 md:p-16 border border-slate-200/80 bg-white/90 backdrop-blur-xl overflow-hidden shadow-2xl shadow-purple-500/5 text-center"
        >
          {/* Ambient Glow Corner */}
          <div className="absolute -top-32 -right-32 w-64 h-64 bg-purple-400/10 blur-3xl rounded-full" />

          {/* Heading content */}
          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-xs font-bold text-purple-700">
              <Sparkles className="w-3.5 h-3.5 text-purple-600 animate-pulse" />
              <span>Launch Your Vision Today</span>
            </div>

            <h2 className="text-3xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-purple-700 via-indigo-600 to-cyan-600 leading-tight">
              {pageConfig.home.cta.title}
            </h2>

            <p className="text-sm md:text-base text-slate-600 leading-relaxed font-medium">
              {pageConfig.home.cta.subtitle}
            </p>


            <div className="flex flex-wrap items-center justify-center gap-4 pt-6">
              <Link
                href="/contact"
                className="group flex items-center gap-2 px-7 py-4 text-xs font-extrabold text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 rounded-xl hover:opacity-95 shadow-xl shadow-purple-500/20 transition-all hover:-translate-y-0.5 duration-300"
              >
                <Send className="w-3.5 h-3.5" />
                Start Your Project
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/products"
                className="flex items-center gap-2 px-7 py-4 text-xs font-extrabold text-slate-800 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl shadow-sm hover:border-slate-300 transition-all hover:-translate-y-0.5 duration-300"
              >
                <Download className="w-3.5 h-3.5" />
                Browse Products
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
