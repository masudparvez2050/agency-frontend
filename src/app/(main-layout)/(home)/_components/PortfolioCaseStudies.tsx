"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, ArrowRight, Calendar, Users, Trophy, Sparkles, CheckCircle2, AlertCircle } from "lucide-react";
import Link from "next/link";

const CASE_STUDIES = [
  {
    id: "medplus-healthcare",
    title: "MedPlus Hospital CMS & App",
    client: "MedPlus Diagnostics LLC",
    timeline: "3 Months",
    problem: "The hospital managed registrations manually on paper, leading to long queues and delayed appointments.",
    solution: "Designed a multi-tenant hospital dashboard integrating live doctor roster calendars, payment slips, and SMS reminders.",
    result: "Reduced wait times by 65% and processed over 15,000 online registrations in the first two months.",
    tags: ["Next.js", "PostgreSQL", "Node.js", "Firebase SMS"],
  },
  {
    id: "apex-pos-inventory",
    title: "Apex POS Offline Dashboard",
    client: "Apex Distributors",
    timeline: "2 Months",
    problem: "Shops lost connection frequently, freezing transactions and inventory records in their database.",
    solution: "Built a customized web POS system using local IndexedDB caching that auto-syncs to cloud servers once back online.",
    result: "Eliminated transaction downtime completely across 5 retail stores.",
    tags: ["React", "IndexedDB", "Zustand", "Express API"],
  },
  {
    id: "educare-school-portal",
    title: "EduCare School Management ERP",
    client: "EduCare International School",
    timeline: "4 Months",
    problem: "Teachers, students, and parents used different disjointed tools to track classes, marks, and fees.",
    solution: "Consolidated student information system providing online mark sheets, automated fee collections, and parent push chats.",
    result: "Centralized management for 1,200 students with zero ledger accounting error rates.",
    tags: ["Flutter", "Next.js", "Prisma", "PostgreSQL"],
  },
];

export default function PortfolioCaseStudies() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="case-studies" className="py-20 bg-gradient-to-b from-white via-slate-50/50 to-white border-t border-slate-100 font-sans relative overflow-hidden">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-blue-200/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-200/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-50 border border-purple-100 text-purple-600 text-xs font-bold uppercase tracking-wider mb-3 shadow-2xs">
              <Briefcase className="w-3.5 h-3.5" />
              <span>Agency Portfolio</span>
            </div>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight leading-tight">
              Featured Case Studies
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 font-normal max-w-2xl leading-relaxed">
              Take a closer look at our custom project lifecycle—from problem identification to delivering measurable user success.
            </p>
          </div>

          {/* Tab buttons */}
          <div className="flex flex-wrap gap-2 mt-6 md:mt-0 p-1.5 rounded-full bg-slate-100/80 border border-slate-200/70">
            {CASE_STUDIES.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => setActiveIndex(idx)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
                  activeIndex === idx
                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {item.title.split(" ")[0]} Project
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Display Panel */}
        <div className="rounded-[32px] bg-white/95 backdrop-blur-xl border border-slate-200/80 p-8 sm:p-12 shadow-[0_12px_45px_rgba(0,0,0,0.04)] relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-center"
            >
              {/* Meta column */}
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-[10px] uppercase font-extrabold tracking-wider text-purple-600 border border-purple-100 mb-2">
                    <Sparkles className="w-3 h-3" /> Client Case Study
                  </span>
                  <h3 className="font-heading font-bold text-2xl sm:text-3xl text-slate-900 leading-snug">
                    {CASE_STUDIES[activeIndex].title}
                  </h3>
                </div>

                <div className="space-y-4 border-y border-slate-100 py-6">
                  <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-600 font-medium">
                    <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                      <Users className="w-4 h-4" />
                    </div>
                    <span>Client: <strong className="text-slate-900 font-bold">{CASE_STUDIES[activeIndex].client}</strong></span>
                  </div>
                  
                  <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-600 font-medium">
                    <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <span>Timeline: <strong className="text-slate-900 font-bold">{CASE_STUDIES[activeIndex].timeline}</strong></span>
                  </div>

                  <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-600 font-medium">
                    <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
                      <Trophy className="w-4 h-4" />
                    </div>
                    <span>Result: <strong className="text-emerald-600 font-bold">{CASE_STUDIES[activeIndex].result}</strong></span>
                  </div>
                </div>

                {/* Tech Tags */}
                <div>
                  <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Technologies Used</span>
                  <div className="flex flex-wrap gap-1.5">
                    {CASE_STUDIES[activeIndex].tags.map((tag) => (
                      <span key={tag} className="text-[10px] font-bold bg-slate-100/80 text-slate-600 px-3 py-1 rounded-full border border-slate-200/60">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Description column */}
              <div className="lg:col-span-3 space-y-6">
                <div className="p-6 sm:p-7 rounded-[22px] bg-slate-50/80 border border-slate-200/70">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="w-4 h-4 text-rose-500" />
                    <h4 className="text-xs font-extrabold uppercase tracking-wider text-rose-600">The Challenge</h4>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">{CASE_STUDIES[activeIndex].problem}</p>
                </div>

                <div className="p-6 sm:p-7 rounded-[22px] bg-emerald-50/50 border border-emerald-100">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <h4 className="text-xs font-extrabold uppercase tracking-wider text-emerald-700">The Solution</h4>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">{CASE_STUDIES[activeIndex].solution}</p>
                </div>

                <div className="flex justify-end pt-2">
                  <Link
                    href={`/portfolio/${CASE_STUDIES[activeIndex].id}`}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-xs font-bold text-white transition-all shadow-md shadow-blue-500/20 cursor-pointer"
                  >
                    Read Full Case Study
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
