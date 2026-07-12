"use client";

import React, { useState } from "react";
import { Check, HelpCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

const TEMPLATE_PLANS = [
  {
    name: "Starter License",
    price: "1,500 BDT",
    frequency: "Single Product",
    desc: "Perfect for single-domain web platforms and developers starting out.",
    features: [
      "1 Website Template Zip",
      "Standard SQLite / Local JSON config",
      "6 Months updates & bug-fixes",
      "Manual payments activation key",
      "Standard Discord community support",
    ],
    cta: "Purchase Template",
    highlight: false,
  },
  {
    name: "Developer Pass",
    price: "5,000 BDT",
    frequency: "Annual Ecosystem Pass",
    desc: "Unlocks standard developer tools and templates for client websites.",
    features: [
      "Access to all 15+ website templates",
      "Figma UI Design kit files included",
      "Unlimited domain deployments",
      "12 Months developer updates",
      "Priority API support & developer keys",
    ],
    cta: "Get Developer Pass",
    highlight: true,
  },
  {
    name: "Enterprise Bundle",
    price: "12,000 BDT",
    frequency: "Lifetime Pass",
    desc: "Full codebases and scripts licensing for software houses.",
    features: [
      "Access to all templates & scripts",
      "SaaS dashboard boilerplate zip files",
      "Lifetime updates & source patches",
      "Manual / Stripe API custom adapters",
      "Private Slack channel developer support",
    ],
    cta: "Get Lifetime Pass",
    highlight: false,
  },
];

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
  const [billingType, setBillingType] = useState<"templates" | "custom">("templates");
  const activePlans = billingType === "templates" ? TEMPLATE_PLANS : CUSTOM_PLANS;

  return (
    <section className="py-24 bg-transparent border-t border-slate-900/60 relative overflow-hidden">
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-purple-500/5 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs font-bold text-cyan-400 uppercase tracking-widest mb-3">Pricing Matrix</p>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6">
            Transparent Pricing Plans
          </h2>

          {/* Toggle buttons */}
          <div className="inline-flex p-1 rounded-xl bg-slate-950 border border-slate-900">
            <button
              onClick={() => setBillingType("templates")}
              className={`px-6 py-2.5 rounded-lg text-xs font-bold transition-all ${
                billingType === "templates"
                  ? "bg-purple-600 text-white shadow-md shadow-purple-500/20"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Marketplace Templates
            </button>
            <button
              onClick={() => setBillingType("custom")}
              className={`px-6 py-2.5 rounded-lg text-xs font-bold transition-all ${
                billingType === "custom"
                  ? "bg-purple-600 text-white shadow-md shadow-purple-500/20"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Bespoke Development
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
          {activePlans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-8 flex flex-col justify-between transition-all duration-300 border ${
                plan.highlight
                  ? "bg-purple-950/20 border-purple-500/30 shadow-xl shadow-purple-500/5"
                  : "bg-slate-950/80 border-slate-900 hover:border-slate-800"
              }`}
            >
              {plan.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 text-[10px] font-extrabold uppercase tracking-widest text-white shadow-lg">
                  Highly Recommended
                </span>
              )}

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">{plan.name}</span>
                <div className="flex items-baseline gap-1 mt-4 mb-2">
                  <span className="text-4xl font-black text-white">{plan.price}</span>
                  <span className="text-xs text-slate-500 font-semibold">/ {plan.frequency}</span>
                </div>
                <p className="text-sm text-slate-400 mb-8 leading-relaxed h-12">
                  {plan.desc}
                </p>

                {/* Features checklist */}
                <div className="w-full h-[1px] bg-slate-900 mb-8" />
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-xs text-slate-300">
                      <div className="p-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 mt-0.5 shrink-0">
                        <Check className="w-3 h-3" />
                      </div>
                      <span className="leading-tight">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <Link
                href={billingType === "templates" ? "/products" : "/contact"}
                className={`w-full flex items-center justify-center gap-1.5 py-3.5 rounded-xl text-xs font-bold transition-all shadow-md ${
                  plan.highlight
                    ? "bg-gradient-to-r from-purple-600 to-cyan-500 hover:opacity-95 text-white shadow-purple-500/20"
                    : "bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200"
                }`}
              >
                {plan.cta}
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
