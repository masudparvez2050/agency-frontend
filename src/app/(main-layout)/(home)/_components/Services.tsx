"use client";

import React from "react";
import { motion } from "framer-motion";
import { Code, Smartphone, LayoutGrid, Cpu, Check } from "lucide-react";

const SERVICES = [
  {
    id: "web-dev",
    title: "Custom Web Development",
    icon: Code,
    description: "Highly performant web applications constructed with modern Next.js server actions, Tailwind UI, and serverless architectures.",
    bullets: ["SEO & metadata pre-configured", "Page speed score optimized", "Responsive layouts for mobile/tablet"],
    tech: ["Next.js", "React", "TypeScript", "TailwindCSS"],
    color: "from-purple-500 to-indigo-600",
  },
  {
    id: "mobile-dev",
    title: "Mobile App Development",
    icon: Smartphone,
    description: "Native-quality mobile applications for Android & iOS built with Flutter frameworks for consolidated single-codebase speed.",
    bullets: ["Push notification servers", "Biometric secure login (FaceID)", "Local SQLite offline syncing"],
    tech: ["Flutter", "Dart", "Firebase", "SQLite"],
    color: "from-cyan-500 to-blue-600",
  },
  {
    id: "ui-ux",
    title: "UI/UX Design Systems",
    icon: LayoutGrid,
    description: "Figma wireframing, mockup prototypes, brand identity development, and full component tokens to bridge design and code.",
    bullets: ["Interactive Figma prototypes", "Design-to-code typography guides", "Accessibility checking (WCAG)"],
    tech: ["Figma", "Adobe CC", "Prototyping", "Design Tokens"],
    color: "from-pink-500 to-rose-600",
  },
  {
    id: "saas-infra",
    title: "SaaS & API Architecture",
    icon: Cpu,
    description: "Multi-tenant cloud databases, JWT authorization gates, email notification servers, and developer portal configurations.",
    bullets: ["Docker containerization", "Redis caching integration", "PostgreSQL database optimization"],
    tech: ["Node.js", "Docker", "PostgreSQL", "Redis"],
    color: "from-amber-500 to-orange-600",
  },
];

export default function Services() {
  return (
    <section className="py-24 bg-transparent border-y border-slate-900/60 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-purple-600/5 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <p className="text-xs font-bold text-cyan-400 uppercase tracking-widest mb-3">Our Core Agency Services</p>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
            Bespoke Software Services
          </h2>
          <p className="text-slate-400">
            Though templates are our strength, we provide premier bespoke development services to seed startup growth and deploy enterprise operations.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SERVICES.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group p-8 rounded-2xl bg-slate-950 border border-slate-900 hover:border-cyan-500/25 transition-all duration-300 relative overflow-hidden hover:shadow-2xl hover:shadow-cyan-500/5"
            >
              {/* Decorative accent element */}
              <div className={`absolute top-0 left-0 w-2 h-full bg-gradient-to-b ${service.color} opacity-80`} />

              <div className="pl-4">
                {/* Header */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-cyan-400 group-hover:scale-110 transition-transform">
                    <service.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                    {service.title}
                  </h3>
                </div>

                <p className="text-sm text-slate-400 mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Bullets */}
                <ul className="space-y-2.5 mb-8">
                  {service.bullets.map((bullet, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs text-slate-300">
                      <div className="p-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 shrink-0">
                        <Check className="w-3 h-3" />
                      </div>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-2">
                  {service.tech.map((tech) => (
                    <span
                      key={tech}
                      className="text-[10px] font-bold text-slate-400 px-2.5 py-1 rounded bg-slate-900 border border-slate-800/80 uppercase tracking-wider"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
