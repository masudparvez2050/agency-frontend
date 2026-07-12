"use client";

import React from "react";
import { motion } from "framer-motion";
import { Database, Play, CheckCircle, Flame, Server, ArrowRight } from "lucide-react";
import Link from "next/link";

const SAAS_ITEMS = [
  {
    id: "plaxora-crm",
    title: "Plaxora CRM & Client Center",
    status: "Live",
    description: "Manage client contracts, automated monthly invoice triggers, task pipelines, and lead allocations from a unified portal.",
    features: ["Invoice Automation", "Lead Pipeline", "Contract Signatures"],
    uptime: "99.98%",
    color: "from-purple-500 to-indigo-600",
  },
  {
    id: "retail-pos",
    title: "Vortice Point-of-Sale (POS)",
    status: "Beta",
    description: "Cloud-hosted inventory POS database with barcode scanner integration, print receipt engines, and daily sales charts.",
    features: ["Offline Cache", "Barcode Scanner Support", "Daily PDF Reports"],
    uptime: "99.95%",
    color: "from-cyan-500 to-blue-600",
  },
  {
    id: "ai-support-agent",
    title: "Plaxora Support AI Agents",
    status: "Live",
    description: "Embeddable intelligent support chatbot that reads documentation files to resolve customer queries in real-time.",
    features: ["Retrieval-Augmented Chat", "Embed Widget Script", "Admin Slack Sync"],
    uptime: "99.99%",
    color: "from-pink-500 to-purple-600",
  },
];

export default function SaaSPreview() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-cyan-600/5 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-xs font-semibold text-purple-300 mb-4">
              <Database className="w-3.5 h-3.5" />
              <span>SaaS Portfolio & Live Tools</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
              Production-Ready SaaS Products
            </h2>
            <p className="text-slate-400 max-w-xl">
              We deploy and manage highly scalable SaaS systems designed to run complex workflows with near-perfect uptime metrics.
            </p>
          </div>
          <Link
            href="/saas"
            className="group inline-flex items-center gap-1.5 text-sm font-semibold text-purple-400 hover:text-purple-300 mt-4 md:mt-0 transition-colors"
          >
            Explore SaaS hub
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SAAS_ITEMS.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group rounded-2xl bg-slate-950 border border-slate-900 p-6 flex flex-col justify-between hover:border-purple-500/25 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/5"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <span className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                      item.status === "Live" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                    }`}>
                      <Server className="w-3 h-3" />
                      {item.status}
                    </span>
                    <span className="text-[10px] font-semibold text-slate-500">
                      Uptime: {item.uptime}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-400 mb-6 leading-relaxed">
                  {item.description}
                </p>

                {/* Bullet list */}
                <ul className="space-y-2 mb-6">
                  {item.features.map((feat) => (
                    <li key={feat} className="flex items-center gap-2 text-xs text-slate-300">
                      <CheckCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action */}
              <Link
                href={`/saas/${item.id}`}
                className="w-full flex items-center justify-center gap-1.5 py-3 rounded-xl bg-slate-900 group-hover:bg-purple-600 border border-slate-800 group-hover:border-purple-500 text-xs font-bold text-slate-200 group-hover:text-white transition-all shadow-md"
              >
                <Play className="w-3.5 h-3.5" />
                Launch Console
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
