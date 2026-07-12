"use client";

import React, { useState, useMemo } from "react";
import { PORTFOLIO_PROJECTS } from "@/lib/portfolio-data";
import { Project } from "@/types/portfolio";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Briefcase, Activity, CheckCircle, Users, ExternalLink, 
  X, Quote, Sparkles, PhoneCall, Layers, ArrowRight 
} from "lucide-react";

import { usePageCMS } from "@/hooks/usePageCMS";

export default function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [pageConfig] = usePageCMS();

  const categories = ["All", "Web Dev", "Mobile Apps", "UI/UX", "Enterprise"];

  // Filter projects
  const filteredProjects = useMemo(() => {
    if (selectedCategory === "All") return PORTFOLIO_PROJECTS;
    return PORTFOLIO_PROJECTS.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="min-h-screen pt-32 pb-24 overflow-hidden relative">
      {/* Glow Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-purple-500/5 blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-cyan-500/5 blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10 space-y-24">
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold text-purple-400 uppercase tracking-widest mb-3 block">{pageConfig.portfolio.hero.badge}</span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white mb-4 leading-tight">
            {pageConfig.portfolio.hero.title}
          </h1>
          <p className="text-slate-400">
            {pageConfig.portfolio.hero.subtitle}
          </p>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap items-center gap-2 mb-12 justify-center max-w-2xl mx-auto border-b border-slate-900 pb-8">
          <span className="text-xs font-bold text-slate-550 uppercase mr-2">Category:</span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                selectedCategory === cat
                  ? "bg-purple-600 border-purple-500 text-white shadow-lg shadow-purple-500/25"
                  : "bg-slate-950/85 border-slate-900 text-slate-400 hover:text-white"
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
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="group relative rounded-2xl bg-slate-950/80 border border-slate-900 overflow-hidden flex flex-col justify-between hover:border-purple-500/20 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/5"
              >
                {/* Visual Top Glow */}
                <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-purple-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* Banner / Gradient Cover */}
                <div className={`h-40 bg-gradient-to-tr ${project.imageGradient} p-6 flex flex-col justify-between relative`}>
                  <div className="absolute inset-0 bg-black/10" />
                  <span className="text-[10px] font-bold text-white uppercase tracking-widest px-2.5 py-1 rounded bg-black/40 border border-white/10 backdrop-blur-md self-start relative z-10">
                    {project.category}
                  </span>
                  
                  <div className="relative z-10">
                    <span className="text-xs text-white/70 font-semibold block">{project.client}</span>
                    <h3 className="text-xl font-bold text-white mt-0.5">{project.title}</h3>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 flex flex-col justify-between flex-grow space-y-6">
                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                    {project.description}
                  </p>

                  {/* Highlights KPI stats row */}
                  <div className="grid grid-cols-3 gap-2 py-3.5 border-y border-slate-900 text-center">
                    {project.results.slice(0, 3).map((res, i) => (
                      <div key={i} className="space-y-1">
                        <span className="text-[10px] text-slate-550 font-bold uppercase tracking-wide block">
                          {res.label}
                        </span>
                        <strong className="text-sm font-black text-white">{res.value}</strong>
                      </div>
                    ))}
                  </div>

                  {/* Action trigger button */}
                  <button
                    onClick={() => setActiveProject(project)}
                    className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-850 text-xs font-bold text-slate-350 hover:text-white transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Read Case Study</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 rounded-2xl bg-slate-950/40 border border-slate-900 max-w-md mx-auto">
            <Layers className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">No projects found</h3>
            <p className="text-sm text-slate-450 px-6">
              We couldn&apos;t find any case studies matching this category filter.
            </p>
          </div>
        )}

        {/* Bespoke Estimates CTA */}
        <div className="p-8 rounded-3xl bg-slate-950/80 border border-slate-900 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden max-w-5xl mx-auto">
          <div className="absolute top-0 right-0 w-40 h-40 bg-purple-500/5 blur-2xl rounded-full" />
          <div className="space-y-2 relative z-10 max-w-xl">
            <h3 className="text-2xl font-black text-white">Have a similar project in mind?</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              We design and engineer bespoke software solutions. Contact us to audit your project requirements and receive a comprehensive development estimate.
            </p>
          </div>
          <Link
            href="/contact"
            className="flex items-center gap-1.5 px-6 py-4 rounded-xl bg-gradient-to-r from-purple-650 to-cyan-555 hover:opacity-95 text-xs font-bold text-white transition-all shadow-lg shrink-0 relative z-10"
          >
            <PhoneCall className="w-4 h-4" />
            Request Free Estimate
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
              className="fixed inset-0 bg-black/75 backdrop-blur-sm"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 350, damping: 28 }}
              className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-2xl bg-slate-950 border border-slate-900 p-6 md:p-8 space-y-8 z-10 shadow-2xl no-scrollbar"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveProject(null)}
                className="absolute top-4 right-4 p-1.5 rounded-lg bg-slate-900 border border-slate-850 text-slate-400 hover:text-white transition-colors cursor-pointer"
                aria-label="Close Case Study"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Title Header */}
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-purple-400 uppercase tracking-widest px-2 py-0.5 rounded bg-purple-500/10 border border-purple-500/20">
                    {activeProject.category}
                  </span>
                  <span className="text-[10px] text-slate-550 font-bold uppercase tracking-wide">
                    Client: {activeProject.client}
                  </span>
                </div>
                <h2 className="text-xl md:text-3xl font-black text-white">{activeProject.title}</h2>
              </div>

              {/* Grid content */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-6 border-y border-slate-900">
                {activeProject.results.map((res, i) => (
                  <div key={i} className="p-4 rounded-xl bg-slate-900/40 border border-slate-900 text-center space-y-1 shadow-md">
                    <span className="text-[10px] text-slate-550 font-bold uppercase tracking-widest block">
                      {res.label}
                    </span>
                    <strong className="text-xl md:text-2xl font-black text-white">{res.value}</strong>
                  </div>
                ))}
              </div>

              {/* Challenge vs Solution layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs md:text-sm">
                <div className="space-y-3">
                  <h4 className="text-sm font-bold text-rose-455 uppercase tracking-wide flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                    The Challenge
                  </h4>
                  <p className="text-slate-400 leading-relaxed">
                    {activeProject.challenge}
                  </p>
                </div>
                <div className="space-y-3">
                  <h4 className="text-sm font-bold text-emerald-455 uppercase tracking-wide flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    The Engineered Solution
                  </h4>
                  <p className="text-slate-400 leading-relaxed">
                    {activeProject.solution}
                  </p>
                </div>
              </div>

              {/* Tech Stack list */}
              <div className="space-y-3">
                <span className="block text-[10px] font-bold text-slate-550 uppercase tracking-widest">
                  Technologies Leveraged
                </span>
                <div className="flex flex-wrap gap-2">
                  {activeProject.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs font-semibold text-slate-300 px-3 py-1 rounded-xl bg-slate-905 bg-slate-900 border border-slate-850"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Client Review quote block */}
              <div className="p-6 rounded-2xl bg-purple-950/10 border border-purple-500/20 relative space-y-4 shadow-md">
                <Quote className="absolute top-4 right-6 w-10 h-10 text-purple-500/10 rotate-180" />
                <p className="text-xs md:text-sm text-slate-300 italic relative z-10 leading-relaxed">
                  &ldquo;{activeProject.testimonial.quote}&rdquo;
                </p>
                <div className="flex justify-between items-center text-xs">
                  <div>
                    <strong className="text-white font-bold block">{activeProject.testimonial.author}</strong>
                    <span className="text-[10px] text-purple-400 font-semibold">{activeProject.testimonial.role}</span>
                  </div>
                  <Sparkles className="w-4 h-4 text-purple-400" />
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
