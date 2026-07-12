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
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-purple-600/10 via-fuchsia-600/5 to-cyan-500/10 blur-[130px] pointer-events-none rounded-full" />
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative max-w-5xl mx-auto rounded-3xl p-10 md:p-16 border border-purple-500/20 bg-slate-950/80 backdrop-blur-xl overflow-hidden shadow-2xl text-center"
        >
          {/* Ambient Glow Corner */}
          <div className="absolute -top-32 -right-32 w-64 h-64 bg-cyan-400/20 blur-3xl rounded-full" />

          {/* Heading content */}
          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-xs font-semibold text-purple-300">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span>Launch Your Vision Today</span>
            </div>

            <h2 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-500 to-cyan-400 leading-tight">
              {pageConfig.home.cta.title}
            </h2>

            <p className="text-sm md:text-base text-slate-400 leading-relaxed">
              {pageConfig.home.cta.subtitle}
            </p>


            <div className="flex flex-wrap items-center justify-center gap-4 pt-6">
              <Link
                href="/contact"
                className="group flex items-center gap-2 px-7 py-4 text-xs font-extrabold text-white bg-gradient-to-r from-purple-600 via-fuchsia-600 to-cyan-500 rounded-xl hover:opacity-95 shadow-xl shadow-purple-500/20 transition-all hover:-translate-y-0.5 duration-300"
              >
                <Send className="w-3.5 h-3.5" />
                Start Your Project
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/products"
                className="flex items-center gap-2 px-7 py-4 text-xs font-extrabold text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl hover:border-purple-500/35 transition-all hover:-translate-y-0.5 duration-300"
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
