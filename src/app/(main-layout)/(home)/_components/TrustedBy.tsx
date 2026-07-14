"use client";

import React from "react";
import { Cpu, Globe, Database, Smartphone, Layout, Blocks, Code2, Layers } from "lucide-react";

const TECH_ITEMS = [
  { name: "Next.js", icon: Code2, color: "text-white" },
  { name: "React", icon: Blocks, color: "text-sky-400" },
  { name: "Flutter", icon: Smartphone, color: "text-cyan-400" },
  { name: "Node.js", icon: Cpu, color: "text-emerald-400" },
  { name: "PostgreSQL", icon: Database, color: "text-indigo-400" },
  { name: "Figma", icon: Layout, color: "text-rose-400" },
  { name: "TailwindCSS", icon: Layers, color: "text-teal-400" },
  { name: "AWS Cloud", icon: Globe, color: "text-orange-400" },
];

export default function TrustedBy() {
  return (
    <section className="py-12 border-y border-slate-900 bg-slate-950/20 overflow-hidden relative">
      <div className="container mx-auto px-4 text-center mb-6 z-10 relative">
        <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
          Engineered with State-Of-The-Art Technologies
        </p>
      </div>

      <div className="flex overflow-hidden select-none relative w-full mask-gradient">
        {/* Shadow overlays for smooth fade edges */}
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#030014] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#030014] to-transparent z-10 pointer-events-none" />

        {/* Double items array for seamless scrolling */}
        <div className="animate-marquee flex gap-12 py-2">
          {[...TECH_ITEMS, ...TECH_ITEMS, ...TECH_ITEMS].map((tech, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-slate-900/40 border border-slate-800/60 backdrop-blur-sm shrink-0 whitespace-nowrap"
            >
              <tech.icon className={`w-5 h-5 ${tech.color}`} />
              <span className="text-sm font-bold text-slate-300">{tech.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
