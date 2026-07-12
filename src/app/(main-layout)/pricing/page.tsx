"use client";

import React, { useState } from "react";
import { PLANS, FEATURE_ROWS, PRICING_FAQS } from "@/lib/pricing-data";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Check, X, ChevronDown, HelpCircle, Calendar, 
  ArrowRight, Sparkles, MessageSquare, Info 
} from "lucide-react";

export default function PricingPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const toggleFaq = (idx: number) => {
    setActiveFaq(activeFaq === idx ? null : idx);
  };

  return (
    <div className="min-h-screen pt-32 pb-24 overflow-hidden relative">
      {/* Glow Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-purple-500/5 blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-cyan-500/5 blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10 space-y-24">
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold text-purple-400 uppercase tracking-widest mb-3 block">Plans Matrix</span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white mb-4 leading-tight">
            Simple, Transparent Rates
          </h1>
          <p className="text-slate-400">
            Choose a digital design package or custom template plan, or consult our software developers for bespoke systems integrations.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
          {PLANS.map((plan, idx) => {
            const isPopular = plan.popular;
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className={`p-6 md:p-8 rounded-2xl border flex flex-col justify-between relative overflow-hidden transition-all duration-300 shadow-xl ${
                  isPopular
                    ? "bg-purple-950/10 border-purple-500/30 hover:border-purple-500/40 shadow-2xl shadow-purple-500/5 scale-100 lg:scale-[1.03] z-10"
                    : "bg-slate-950/80 border-slate-900 hover:border-slate-800"
                }`}
              >
                {isPopular && (
                  <div className="absolute top-4 right-4 bg-purple-500/10 border border-purple-500/20 text-purple-400 text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full tracking-wider">
                    Recommended
                  </div>
                )}

                <div>
                  {/* Title & Info */}
                  <div className="space-y-1.5 mb-6">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">
                      Agency Plan
                    </span>
                    <h4 className="text-xl font-black text-white">{plan.name}</h4>
                  </div>

                  {/* Price & Period */}
                  <div className="mb-6 pb-6 border-b border-slate-900 space-y-1">
                    <div className="text-3xl md:text-4xl font-black text-white">
                      {plan.price}
                    </div>
                    <span className="flex items-center gap-1.5 text-xs text-slate-450 font-semibold">
                      <Calendar className="w-3.5 h-3.5 text-slate-550" />
                      Estimates: {plan.period}
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 mb-6 leading-relaxed">
                    {plan.description}
                  </p>

                  {/* Features checklist */}
                  <ul className="space-y-3.5 mb-8">
                    {plan.features.map((item, i) => (
                      <li key={i} className="flex gap-2.5 text-xs text-slate-350 items-start">
                        <Check className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Contact redirect link */}
                <Link
                  href={`/contact?plan=${plan.id}`}
                  className={`w-full py-3 rounded-xl text-center text-xs font-bold transition-all ${
                    isPopular
                      ? "bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-500/25"
                      : "bg-slate-900 hover:bg-slate-850 border border-slate-850 text-slate-350 hover:text-white"
                  }`}
                >
                  {plan.ctaText}
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* COMPARISON MATRIX SECTION */}
        <div className="space-y-8 max-w-5xl mx-auto">
          <div className="text-center max-w-md mx-auto space-y-2">
            <h2 className="text-2xl font-black text-white">Comprehensive Features Comparison</h2>
            <p className="text-xs text-slate-400">
              Select and check details regarding database integrations, payment gates, and SLA schedules.
            </p>
          </div>

          <div className="rounded-2xl bg-slate-950/70 border border-slate-900 overflow-hidden shadow-lg">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-900/50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-900">
                  <th className="p-4">Key Features</th>
                  <th className="p-4 text-center">Starter Plan</th>
                  <th className="p-4 text-center">Growth Plan</th>
                  <th className="p-4 text-center">Enterprise Plan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-900">
                {FEATURE_ROWS.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-900/10 transition-colors">
                    <td className="p-4 font-bold text-white max-w-xs">{row.featureName}</td>
                    
                    {/* Starter value */}
                    <td className="p-4 text-center">
                      {typeof row.starter === "boolean" ? (
                        row.starter ? (
                          <Check className="w-4 h-4 text-emerald-400 mx-auto" />
                        ) : (
                          <X className="w-4 h-4 text-slate-700 mx-auto" />
                        )
                      ) : (
                        <span className="font-semibold text-slate-400">{row.starter}</span>
                      )}
                    </td>

                    {/* Growth value */}
                    <td className="p-4 text-center">
                      {typeof row.growth === "boolean" ? (
                        row.growth ? (
                          <Check className="w-4 h-4 text-emerald-400 mx-auto" />
                        ) : (
                          <X className="w-4 h-4 text-slate-700 mx-auto" />
                        )
                      ) : (
                        <span className="font-semibold text-purple-400">{row.growth}</span>
                      )}
                    </td>

                    {/* Enterprise value */}
                    <td className="p-4 text-center">
                      {typeof row.enterprise === "boolean" ? (
                        row.enterprise ? (
                          <Check className="w-4 h-4 text-emerald-400 mx-auto" />
                        ) : (
                          <X className="w-4 h-4 text-slate-700 mx-auto" />
                        )
                      ) : (
                        <span className="font-semibold text-cyan-400">{row.enterprise}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ ACCORDION SECTION */}
        <div className="space-y-8 max-w-3xl mx-auto">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-black text-white flex items-center justify-center gap-2">
              <HelpCircle className="w-5 h-5 text-purple-400" />
              Frequently Asked Questions
            </h2>
            <p className="text-xs text-slate-400">
              Find answers regarding manual bKash validation timelines, digital file refunds, and customization requests.
            </p>
          </div>

          <div className="space-y-4">
            {PRICING_FAQS.map((faq, i) => {
              const isOpen = activeFaq === i;
              return (
                <div
                  key={i}
                  className="rounded-xl bg-slate-950/70 border border-slate-900 overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => toggleFaq(i)}
                    className="w-full flex items-center justify-between p-5 text-left text-xs md:text-sm font-bold text-white hover:text-purple-400 transition-colors cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="p-5 pt-0 border-t border-slate-900/60 text-xs text-slate-400 leading-relaxed space-y-2">
                          <p>{faq.answer}</p>
                          <div className="flex gap-2 items-center text-[10px] text-purple-400 font-semibold">
                            <Info className="w-3.5 h-3.5" />
                            <span>Audit checks run 24/7.</span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        {/* Custom Estimate CTA */}
        <div className="p-8 rounded-3xl bg-slate-950/80 border border-slate-900 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden max-w-5xl mx-auto">
          <div className="absolute top-0 right-0 w-40 h-40 bg-purple-500/5 blur-2xl rounded-full" />
          <div className="space-y-2 relative z-10 max-w-xl">
            <h3 className="text-2xl font-black text-white">Need a custom feature blueprint?</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              If your database specs exceed standard package sizes, our expert software engineers can audit your requirement lists and draft a comprehensive estimate contract.
            </p>
          </div>
          <Link
            href="/contact"
            className="flex items-center gap-1.5 px-6 py-4 rounded-xl bg-gradient-to-r from-purple-650 to-cyan-555 hover:opacity-95 text-xs font-bold text-white transition-all shadow-lg shrink-0 relative z-10"
          >
            <span>Consult Developers</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
