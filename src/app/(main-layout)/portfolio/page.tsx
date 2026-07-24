"use client";

import React, { useState, useMemo } from "react";
import { PORTFOLIO_PROJECTS } from "@/lib/portfolio-data";
import { Project } from "@/types/portfolio";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Briefcase, ExternalLink, X, Quote, Sparkles, PhoneCall, Layers, ArrowRight, CheckCircle2
} from "lucide-react";

import { usePageCMS } from "@/hooks/usePageCMS";

export default function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [pageConfig] = usePageCMS();

  const categories = ["All", "Web Dev", "Mobile Apps", "UI/UX", "Enterprise"];

  const filteredProjects = useMemo(() => {
    if (selectedCategory === "All") return PORTFOLIO_PROJECTS;
    return PORTFOLIO_PROJECTS.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="min-h-screen pt-28 pb-24 overflow-hidden relative bg-gradient-to-b from-white via-slate-50/50 to-white font-sans">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-200/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-200/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-50 border border-purple-100 text-purple-600 text-xs font-bold uppercase tracking-wider mb-3 shadow-2xs">
            <Briefcase className="w-3.5 h-3.5" />
            <span>{pageConfig.portfolio.hero.badge || "Agency Portfolio"}</span>
          </div>
          <h1 className="font-heading font-extrabold text-4xl md:text-5xl tracking-tight text-slate-900 leading-tight mb-3">
            {pageConfig.portfolio.hero.title || "Featured Case Studies"}
          </h1>
          <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
            {pageConfig.portfolio.hero.subtitle || "Take a closer look at our custom project lifecycle—from problem identification to delivering measurable user success."}
          </p>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap items-center gap-2 justify-center max-w-2xl mx-auto p-2 rounded-full bg-slate-100/80 border border-slate-200/70">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer whitespace-nowrap ${
                selectedCategory === cat
                  ? "bg-purple-600 text-white shadow-md shadow-purple-500/20"
                  : "bg-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Portfolio grid showcase */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="bg-white/95 backdrop-blur-xl rounded-[28px] border border-slate-200/80 overflow-hidden flex flex-col justify-between hover:border-purple-400/50 shadow-[0_10px_35px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_50px_rgba(147,51,234,0.12)] hover:-translate-y-1 transition-all duration-300 group"
              >
                {/* Banner / High-Fidelity Project Preview Cover */}
                <div className="h-56 relative overflow-hidden bg-slate-950 p-6 sm:p-7 flex flex-col justify-between group/banner">
                  {project.image && (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover/banner:scale-108 transition-transform duration-700 opacity-85"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-slate-950/20" />
                  
                  <span className="text-[10px] font-extrabold text-white uppercase tracking-wider px-3.5 py-1 rounded-full bg-slate-950/60 border border-white/20 backdrop-blur-md self-start relative z-10 shadow-sm">
                    {project.category}
                  </span>
                  
                  <div className="relative z-10">
                    <span className="text-xs text-purple-300 font-bold block mb-0.5">{project.client}</span>
                    <h3 className="font-heading font-bold text-xl sm:text-2xl text-white leading-snug drop-shadow-sm">{project.title}</h3>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 sm:p-7 flex flex-col justify-between flex-grow space-y-6">
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3 font-normal">
                    {project.description}
                  </p>

                  {/* Highlights KPI stats row */}
                  <div className="grid grid-cols-3 gap-2 p-4 rounded-2xl bg-slate-50/80 border border-slate-200/70 text-center">
                    {project.results.slice(0, 3).map((res, i) => (
                      <div key={i} className="space-y-0.5">
                        <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">
                          {res.label}
                        </span>
                        <strong className="font-heading font-extrabold text-sm sm:text-base text-slate-900 block">{res.value}</strong>
                      </div>
                    ))}
                  </div>

                  {/* Action trigger button */}
                  <button
                    onClick={() => setActiveProject(project)}
                    className="w-full py-3 rounded-full bg-slate-100/80 hover:bg-purple-600 hover:text-white border border-slate-200/80 text-xs font-bold text-slate-700 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Read Case Study</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 rounded-[28px] bg-white/95 backdrop-blur-xl border border-slate-200/80 max-w-md mx-auto shadow-[0_10px_35px_rgba(0,0,0,0.03)]">
            <Layers className="w-10 h-10 text-slate-400 mx-auto mb-3" />
            <h3 className="font-heading font-bold text-lg text-slate-900 mb-1">No projects found</h3>
            <p className="text-xs text-slate-500 px-6 font-normal">
              We couldn&apos;t find any case studies matching this category filter.
            </p>
          </div>
        )}

        {/* Bespoke Estimates CTA */}
        <div className="p-8 sm:p-10 rounded-[32px] bg-gradient-to-r from-slate-900 via-purple-950 to-slate-900 text-white border border-purple-800/40 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-2xl max-w-5xl mx-auto relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-2 max-w-xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" /> Free Architecture Consultation
            </div>
            <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-white">Have a similar project in mind?</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
              We design and engineer bespoke software solutions. Contact us to audit your project requirements and receive a comprehensive development estimate.
            </p>
          </div>
          <Link
            href="/contact"
            className="flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-white hover:bg-purple-50 text-slate-900 font-bold text-xs transition-all shadow-lg shrink-0 cursor-pointer relative z-10 group-hover:scale-105"
          >
            <PhoneCall className="w-4 h-4 text-purple-600" />
            <span>Request Free Estimate</span>
            <ArrowRight className="w-4 h-4 text-purple-600" />
          </Link>
        </div>
      </div>

      {/* Case Study Detail Overlay Modal */}
      <AnimatePresence>
        {activeProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveProject(null)}
              className="fixed inset-0 bg-slate-950/70 backdrop-blur-md"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 350, damping: 28 }}
              className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-[32px] bg-white/95 backdrop-blur-2xl border border-slate-200/90 p-7 md:p-9 space-y-6 z-10 shadow-2xl no-scrollbar font-sans"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveProject(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-rose-600 hover:text-white border border-slate-200 text-slate-600 transition-all cursor-pointer shadow-xs"
                aria-label="Close Case Study"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Title Header */}
              <div className="space-y-1.5 border-b border-slate-100 pb-5">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-extrabold text-purple-600 uppercase tracking-wider px-3 py-1 rounded-full bg-purple-50 border border-purple-100">
                    {activeProject.category}
                  </span>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">
                    Client: {activeProject.client}
                  </span>
                </div>
                <h2 className="font-heading font-extrabold text-2xl md:text-3xl text-slate-900">{activeProject.title}</h2>
              </div>

              {/* Grid content */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4 border-y border-slate-100">
                {activeProject.results.map((res, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/70 text-center space-y-0.5">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                      {res.label}
                    </span>
                    <strong className="font-heading font-extrabold text-xl text-slate-900 block">{res.value}</strong>
                  </div>
                ))}
              </div>

              {/* Challenge vs Solution layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs md:text-sm">
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-rose-600 uppercase tracking-wider flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-rose-500" />
                    The Challenge
                  </h4>
                  <p className="text-slate-600 leading-relaxed font-normal">
                    {activeProject.challenge}
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-emerald-600 uppercase tracking-wider flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    The Engineered Solution
                  </h4>
                  <p className="text-slate-600 leading-relaxed font-normal">
                    {activeProject.solution}
                  </p>
                </div>
              </div>

              {/* Tech Stack list */}
              <div className="space-y-2">
                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Technologies Leveraged
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {activeProject.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs font-semibold text-slate-700 px-3 py-1 rounded-full bg-slate-100/80 border border-slate-200/70"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Client Review quote block */}
              <div className="p-6 sm:p-7 rounded-[24px] bg-purple-50/60 border border-purple-100/80 relative space-y-3 shadow-2xs">
                <Quote className="absolute top-5 right-6 w-9 h-9 text-purple-200 rotate-180" />
                <p className="text-xs md:text-sm text-slate-700 italic relative z-10 leading-relaxed font-normal">
                  &ldquo;{activeProject.testimonial.quote}&rdquo;
                </p>
                <div className="flex justify-between items-center text-xs pt-2">
                  <div>
                    <strong className="font-heading font-bold text-slate-900 block">{activeProject.testimonial.author}</strong>
                    <span className="text-[10px] text-purple-600 font-bold">{activeProject.testimonial.role}</span>
                  </div>
                  <Sparkles className="w-4 h-4 text-purple-600" />
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
