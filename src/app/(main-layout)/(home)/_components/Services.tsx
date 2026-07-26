"use client";

import React from "react";
import { motion } from "framer-motion";
import { Code, Smartphone, LayoutGrid, Cpu, CheckCircle2, Layers, Sparkles, ArrowRight, PhoneCall } from "lucide-react";
import Link from "next/link";

const SERVICES = [
  {
    id: "web-dev",
    title: "Custom Web Development",
    icon: Code,
    description: "Highly performant web applications constructed with modern Next.js server actions, Tailwind UI, and serverless architectures.",
    bullets: ["SEO & metadata pre-configured", "Page speed score optimized", "Responsive layouts for mobile/tablet"],
    tech: ["Next.js", "React", "TypeScript", "TailwindCSS"],
    accent: "#3b82f6",
    gradient: "linear-gradient(135deg, #3b82f6, #6366f1)",
    glowColor: "rgba(59,130,246,0.25)",
    iconBg: "rgba(237, 245, 255, 1)",
  },
  {
    id: "mobile-dev",
    title: "Mobile App Development",
    icon: Smartphone,
    description: "Native-quality mobile applications for Android & iOS built with Flutter frameworks for consolidated single-codebase speed.",
    bullets: ["Push notification servers", "Biometric secure login (FaceID)", "Local SQLite offline syncing"],
    tech: ["Flutter", "Dart", "Firebase", "SQLite"],
    accent: "#a855f7",
    gradient: "linear-gradient(135deg, #a855f7, #ec4899)",
    glowColor: "rgba(168,85,247,0.25)",
    iconBg: "rgba(252, 242, 255, 1)",
  },
  {
    id: "ui-ux",
    title: "UI/UX Design Systems",
    icon: LayoutGrid,
    description: "Figma wireframing, mockup prototypes, brand identity development, and full component tokens to bridge design and code.",
    bullets: ["Interactive Figma prototypes", "Design-to-code typography guides", "Accessibility checking (WCAG)"],
    tech: ["Figma", "Adobe CC", "Prototyping", "Design Tokens"],
    accent: "#06b6d4",
    gradient: "linear-gradient(135deg, #06b6d4, #14b8a6)",
    glowColor: "rgba(6,182,212,0.25)",
    iconBg: "rgba(230, 251, 250, 1)",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-20 bg-gradient-to-b from-white via-slate-50/50 to-white border-t border-slate-100 font-sans relative overflow-hidden">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-blue-200/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-purple-200/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold uppercase tracking-wider mb-3 shadow-2xs">
            <Layers className="w-3.5 h-3.5" />
            <span>Our Core Agency Services</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight leading-tight">
            Bespoke Software Services
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2 font-normal leading-relaxed">
            Though templates are our strength, we provide premier bespoke development services to seed startup growth and deploy enterprise operations.
          </p>
        </div>

        {/* Services Grid — 3 columns on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          {SERVICES.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white/95 backdrop-blur-xl rounded-[28px] p-6 sm:p-7 border border-slate-200/80 hover:border-blue-400/50 shadow-[0_10px_35px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_50px_rgba(37,99,235,0.12)] hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group flex flex-col justify-between"
            >
              {/* Left Accent Glow Line */}
              <div
                className="absolute top-0 left-0 w-1.5 h-full rounded-r-full transition-all duration-300 group-hover:w-2"
                style={{ background: service.gradient }}
              />

              <div className="pl-2">
                {/* Header: Icon + Title */}
                <div className="flex items-center gap-3.5 mb-4">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm shrink-0 transition-transform duration-300 group-hover:scale-108"
                    style={{ background: service.iconBg }}
                  >
                    <service.icon style={{ width: 22, height: 22, color: service.accent }} strokeWidth={2} />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-lg text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                      {service.title}
                    </h3>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                      Bespoke Engineering
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-600 mb-5 leading-relaxed">
                  {service.description}
                </p>

                {/* Bullet Features */}
                <div className="space-y-2 mb-5">
                  {service.bullets.map((bullet, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-slate-100">
                  {service.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-0.5 bg-slate-100/80 text-[10px] font-bold text-slate-600 rounded-full border border-slate-200/60 group-hover:border-blue-200 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Custom Project Call to Action Banner */}
        <div className="p-8 sm:p-10 rounded-[28px] bg-white border border-slate-200/80 shadow-[0_12px_45px_rgba(0,0,0,0.04)] flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="space-y-2 max-w-xl text-center md:text-left relative z-10">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Tailored Development</span>
            </div>
            <h3 className="font-heading font-extrabold text-2xl text-slate-900">Have a Custom Project in Mind?</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              Share your business requirements with us. Our expert engineers will design, build, and deploy your custom solution.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-blue-600 hover:bg-blue-700 text-xs font-bold text-white transition-all shadow-md shadow-blue-500/20 shrink-0 cursor-pointer relative z-10"
          >
            <PhoneCall className="w-4 h-4" /> Start Custom Project
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>

      </div>
    </section>
  );
}
