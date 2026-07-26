"use client";

import React from "react";
import { CheckCircle2, ArrowRight, Tag, Sparkles } from "lucide-react";
import Link from "next/link";

const CUSTOM_PLANS = [
  {
    name: "Single Landing Web",
    price: "15,000 BDT",
    frequency: "One-off Project",
    desc: "Custom-made landing pages for local businesses and startups.",
    features: [
      "Unique Tailwind CSS UI custom-coded",
      "1 Week delivery & deployment assistance",
      "Google PageSpeed Score 95+ guarantee",
      "3 Months content update support",
      "Contact query email setup",
    ],
    cta: "Initiate Estimate",
    highlight: false,
  },
  {
    name: "Bespoke SaaS / App",
    price: "45,000 BDT",
    frequency: "One-off Project",
    desc: "Custom database applications, Android & iOS mobile packages.",
    features: [
      "Full Next.js / Flutter cross-platform app",
      "Custom Admin CMS Dashboard",
      "IndexedDB offline cache configuration",
      "Manual payments checkout logs",
      "6 Months code security support",
    ],
    cta: "Initiate Estimate",
    highlight: true,
  },
  {
    name: "Ecosystem Partner",
    price: "Custom",
    frequency: "Retainer Model",
    desc: "Outsourced software engineering team for high-growth tech platforms.",
    features: [
      "Dedicated senior frontend & backend developer",
      "Weekly iterations & code releases",
      "Multi-tenant hosting configurations (AWS/R2)",
      "Continuous SEO optimization audits",
      "24/7 Server downtime recovery SLA",
    ],
    cta: "Consult Partner",
    highlight: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 bg-gradient-to-b from-slate-50/50 via-white to-slate-50/50 border-t border-slate-100 font-sans relative overflow-hidden">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-blue-200/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-purple-200/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold uppercase tracking-wider mb-3 shadow-2xs">
            <Tag className="w-3.5 h-3.5" />
            <span>Pricing Matrix</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight leading-tight">
            Transparent Pricing Plans
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2 font-normal leading-relaxed">
            Choose the right development package tailored to your business scale and engineering requirements.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7 items-stretch max-w-6xl mx-auto">
          {CUSTOM_PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-[28px] p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 border ${
                plan.highlight
                  ? "bg-white/95 backdrop-blur-xl border-blue-400/60 shadow-[0_20px_50px_rgba(37,99,235,0.14)] ring-2 ring-blue-500/30 scale-102"
                  : "bg-white/95 backdrop-blur-xl border-slate-200/80 shadow-[0_10px_35px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.06)] hover:border-slate-300"
              }`}
            >
              {plan.highlight && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-[10px] font-bold uppercase tracking-wider text-white shadow-md shadow-blue-500/25 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Most Popular
                </span>
              )}

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600">{plan.name}</span>
                
                <div className="flex items-baseline gap-1 mt-4 mb-2">
                  <span className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900">{plan.price}</span>
                  <span className="text-xs text-slate-400 font-medium">/ {plan.frequency}</span>
                </div>
                
                <p className="text-xs sm:text-sm text-slate-600 mb-6 leading-relaxed font-normal min-h-[44px]">
                  {plan.desc}
                </p>

                <div className="w-full h-[1px] bg-slate-100 mb-6" />

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs font-semibold text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="leading-snug">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <Link
                href="/contact"
                className={`w-full flex items-center justify-center gap-2 py-3 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  plan.highlight
                    ? "bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-800"
                }`}
              >
                <span>{plan.cta}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
