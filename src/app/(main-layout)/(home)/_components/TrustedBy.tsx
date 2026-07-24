"use client";

import React from "react";
import { Cpu, Globe, Database, Smartphone, Layout, Blocks, Code2, Layers, ShieldCheck, Zap, Terminal, Server } from "lucide-react";

const TECH_ITEMS = [
  { name: "Next.js", icon: Code2, accent: "#2563eb", bg: "rgba(37,99,235,0.08)", border: "rgba(37,99,235,0.2)" },
  { name: "React", icon: Blocks, accent: "#06b6d4", bg: "rgba(6,182,212,0.08)", border: "rgba(6,182,212,0.2)" },
  { name: "Flutter", icon: Smartphone, accent: "#0284c7", bg: "rgba(2,132,199,0.08)", border: "rgba(2,132,199,0.2)" },
  { name: "Node.js", icon: Cpu, accent: "#10b981", bg: "rgba(16,185,129,0.08)", border: "rgba(16,185,129,0.2)" },
  { name: "PostgreSQL", icon: Database, accent: "#6366f1", bg: "rgba(99,102,241,0.08)", border: "rgba(99,102,241,0.2)" },
  { name: "Figma", icon: Layout, accent: "#a855f7", bg: "rgba(168,85,247,0.08)", border: "rgba(168,85,247,0.2)" },
  { name: "TailwindCSS", icon: Layers, accent: "#14b8a6", bg: "rgba(20,184,166,0.08)", border: "rgba(20,184,166,0.2)" },
  { name: "AWS Cloud", icon: Globe, accent: "#f59e0b", bg: "rgba(245,158,11,0.08)", border: "rgba(245,158,11,0.2)" },
  { name: "TypeScript", icon: Terminal, accent: "#3b82f6", bg: "rgba(59,130,246,0.08)", border: "rgba(59,130,246,0.2)" },
  { name: "GraphQL", icon: Zap, accent: "#ec4899", bg: "rgba(236,72,153,0.08)", border: "rgba(236,72,153,0.2)" },
  { name: "Docker", icon: Server, accent: "#0284c7", bg: "rgba(2,132,199,0.08)", border: "rgba(2,132,199,0.2)" },
  { name: "Security", icon: ShieldCheck, accent: "#10b981", bg: "rgba(16,185,129,0.08)", border: "rgba(16,185,129,0.2)" },
];

export default function TrustedBy() {
  return (
    <section className="py-14 border-y border-slate-100 bg-gradient-to-b from-slate-50/70 via-white to-slate-50/50 relative overflow-hidden">
      
      {/* Background Decorative Ambient Glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-blue-400/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-purple-400/5 rounded-full blur-3xl pointer-events-none" />

      {/* Modern Header Tag */}
      <div className="max-w-7xl mx-auto px-4 text-center mb-8 z-10 relative">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-slate-200/80 shadow-xs">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
          <span className="text-[11px] font-extrabold text-slate-500 uppercase tracking-[0.22em] font-sans">
            Engineered With State-of-the-Art Technologies
          </span>
        </div>
      </div>

      {/* Infinite Marquee Wrapper */}
      <div className="flex overflow-hidden select-none relative w-full">
        
        {/* Left & Right Glass Fade Mask Gradient */}
        <div className="absolute inset-y-0 left-0 w-28 sm:w-40 bg-gradient-to-r from-white via-white/80 to-transparent z-20 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-28 sm:w-40 bg-gradient-to-l from-white via-white/80 to-transparent z-20 pointer-events-none" />

        {/* Marquee Row */}
        <div className="animate-marquee flex gap-5 py-3 font-sans shrink-0">
          {[...TECH_ITEMS, ...TECH_ITEMS, ...TECH_ITEMS].map((tech, idx) => (
            <div
              key={idx}
              className="inline-flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-white/90 backdrop-blur-xl border border-slate-100 shadow-[0_8px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 transition-all duration-300 shrink-0 cursor-pointer group"
            >
              {/* Colored squircle icon badge */}
              <span
                className="flex items-center justify-center w-8 h-8 rounded-xl transition-transform duration-300 group-hover:scale-110"
                style={{ background: tech.bg, border: `1px solid ${tech.border}` }}
              >
                <tech.icon style={{ width: 16, height: 16, color: tech.accent }} strokeWidth={2.2} />
              </span>
              {/* Tech Label */}
              <span className="text-xs font-bold text-slate-700 tracking-tight whitespace-nowrap group-hover:text-slate-900">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
