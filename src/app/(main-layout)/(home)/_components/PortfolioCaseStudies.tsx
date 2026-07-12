"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, ArrowRight, ExternalLink, Calendar, Users, Trophy } from "lucide-react";

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
    gradient: "from-blue-600 to-cyan-500",
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
    gradient: "from-purple-600 to-fuchsia-500",
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
    gradient: "from-amber-600 to-rose-500",
  },
];

export default function PortfolioCaseStudies() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-cyan-600/5 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-xs font-semibold text-purple-300 mb-4">
              <Briefcase className="w-3.5 h-3.5" />
              <span>Agency Portfolio</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
              Featured Case Studies
            </h2>
            <p className="text-slate-400 max-w-xl">
              Take a closer look at our custom project lifecycle—from problem identification to delivering measurable user success.
            </p>
          </div>

          {/* Tab buttons */}
          <div className="flex flex-wrap gap-2 mt-6 md:mt-0">
            {CASE_STUDIES.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => setActiveIndex(idx)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                  activeIndex === idx
                    ? "bg-purple-600 border-purple-500 text-white shadow-lg shadow-purple-500/20"
                    : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                }`}
              >
                {item.title.split(" ")[0]} Project
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Display Panel */}
        <div className="relative rounded-2xl bg-slate-950 border border-slate-900 p-8 md:p-12 overflow-hidden hover:border-purple-500/15 transition-all shadow-2xl">
          <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-center relative z-10"
            >
              {/* Meta column */}
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-purple-400">Client Case Study</span>
                  <h3 className="text-2xl md:text-3xl font-extrabold text-white mt-1">{CASE_STUDIES[activeIndex].title}</h3>
                </div>

                <div className="space-y-3.5 border-y border-slate-900 py-6">
                  <div className="flex items-center gap-3 text-sm text-slate-400">
                    <Users className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>Client: <strong>{CASE_STUDIES[activeIndex].client}</strong></span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-400">
                    <Calendar className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>Timeline: <strong>{CASE_STUDIES[activeIndex].timeline}</strong></span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-400">
                    <Trophy className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>Result: <strong className="text-emerald-400">{CASE_STUDIES[activeIndex].result}</strong></span>
                  </div>
                </div>

                {/* Tech Tags */}
                <div>
                  <span className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Technologies Used</span>
                  <div className="flex flex-wrap gap-2">
                    {CASE_STUDIES[activeIndex].tags.map((tag) => (
                      <span key={tag} className="text-[10px] bg-slate-900 border border-slate-800 text-slate-300 px-2.5 py-1 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Description column */}
              <div className="lg:col-span-3 space-y-8">
                <div className="p-6 rounded-xl bg-slate-900/60 border border-slate-800/80">
                  <h4 className="text-xs font-extrabold uppercase tracking-widest text-rose-400 mb-2">The Challenge</h4>
                  <p className="text-sm md:text-base text-slate-300 leading-relaxed">{CASE_STUDIES[activeIndex].problem}</p>
                </div>

                <div className="p-6 rounded-xl bg-slate-900/60 border border-slate-800/80">
                  <h4 className="text-xs font-extrabold uppercase tracking-widest text-emerald-400 mb-2">The Solution</h4>
                  <p className="text-sm md:text-base text-slate-300 leading-relaxed">{CASE_STUDIES[activeIndex].solution}</p>
                </div>

                <div className="flex justify-end">
                  <a
                    href={`/portfolio/${CASE_STUDIES[activeIndex].id}`}
                    className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-purple-600 border border-slate-800 hover:border-purple-500 text-xs font-bold text-slate-200 hover:text-white transition-all shadow-md"
                  >
                    Read Full Case Study
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
