"use client";

import React, { useState } from "react";
import { PLANS, FEATURE_ROWS, PRICING_FAQS } from "@/lib/pricing-data";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Check, X, ChevronDown, HelpCircle, Calendar, 
  ArrowRight, Info, Tag 
} from "lucide-react";

import { usePageCMS } from "@/hooks/usePageCMS";

export default function PricingPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [pageConfig] = usePageCMS();

  const toggleFaq = (idx: number) => {
    setActiveFaq(activeFaq === idx ? null : idx);
  };

  return (
    <div className="min-h-screen pt-28 pb-24 overflow-hidden relative bg-gradient-to-b from-white via-slate-50/50 to-white font-sans">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-200/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-200/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-20">
        
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-50 border border-purple-100 text-purple-600 text-xs font-bold uppercase tracking-wider mb-3 shadow-2xs">
            <Tag className="w-3.5 h-3.5" />
            <span>{pageConfig.pricing.hero.badge || "Pricing Matrix"}</span>
          </div>
          <h1 className="font-heading font-extrabold text-4xl md:text-5xl tracking-tight text-slate-900 leading-tight mb-3">
            {pageConfig.pricing.hero.title || "Transparent Pricing Plans"}
          </h1>
          <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
            {pageConfig.pricing.hero.subtitle || "Simple, predictable plans designed for startups, software developers, and scaling enterprise operations."}
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto items-stretch">
          {PLANS.map((plan, idx) => {
            const isPopular = plan.popular;
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className={`p-7 sm:p-8 rounded-[28px] border flex flex-col justify-between relative overflow-hidden transition-all duration-300 ${
                  isPopular
                    ? "bg-gradient-to-b from-purple-50/70 via-white to-white border-purple-300 shadow-[0_15px_40px_rgba(147,51,234,0.12)] ring-2 ring-purple-600/20"
                    : "bg-white/95 backdrop-blur-xl border-slate-200/80 shadow-[0_10px_35px_rgba(0,0,0,0.03)] hover:border-purple-300/60 hover:-translate-y-1"
                }`}
              >
                {isPopular && (
                  <div className="absolute top-4 right-4 bg-purple-600 text-white text-[10px] font-display font-extrabold uppercase px-3 py-0.5 rounded-full tracking-wider shadow-sm">
                    Recommended
                  </div>
                )}

                <div>
                  <div className="space-y-1 mb-4">
                    <span className="text-[10px] font-bold text-purple-600 uppercase tracking-wider block">
                      Agency Plan
                    </span>
                    <h4 className="font-heading font-extrabold text-2xl text-slate-900">{plan.name}</h4>
                  </div>

                  <div className="mb-6 pb-6 border-b border-slate-100 space-y-1">
                    <div className="font-heading font-extrabold text-3xl md:text-4xl text-slate-900">
                      {plan.price}
                    </div>
                    <span className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                      <Calendar className="w-3.5 h-3.5 text-purple-500" />
                      Estimates: {plan.period}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 mb-6 leading-relaxed font-normal min-h-[36px]">
                    {plan.description}
                  </p>

                  <ul className="space-y-3 mb-8 text-xs text-slate-700 font-medium">
                    {plan.features.map((item, i) => (
                      <li key={i} className="flex gap-2 items-start">
                        <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href={`/contact?plan=${plan.id}`}
                  className={`w-full py-3 rounded-full text-center text-xs font-bold transition-all cursor-pointer shadow-xs ${
                    isPopular
                      ? "bg-purple-600 hover:bg-purple-700 text-white shadow-md shadow-purple-500/25"
                      : "bg-slate-100 hover:bg-slate-200/80 border border-slate-200/80 text-slate-700"
                  }`}
                >
                  {plan.ctaText}
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* COMPARISON MATRIX SECTION */}
        <div className="space-y-6 max-w-5xl mx-auto">
          <div className="text-center max-w-md mx-auto space-y-1">
            <h2 className="font-heading font-extrabold text-2xl md:text-3xl text-slate-900">Comprehensive Features Comparison</h2>
            <p className="text-xs text-slate-600 font-normal">
              Select and check details regarding database integrations, payment gates, and SLA schedules.
            </p>
          </div>

          <div className="rounded-[28px] bg-white/95 backdrop-blur-xl border border-slate-200/80 overflow-hidden shadow-[0_10px_35px_rgba(0,0,0,0.03)]">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50/80 text-slate-700 font-bold uppercase tracking-wider border-b border-slate-200/80">
                  <th className="p-5">Key Features</th>
                  <th className="p-5 text-center">Starter Plan</th>
                  <th className="p-5 text-center">Growth Plan</th>
                  <th className="p-5 text-center">Enterprise Plan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {FEATURE_ROWS.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-4 sm:p-5 font-bold text-slate-900 max-w-xs">{row.featureName}</td>
                    
                    <td className="p-4 sm:p-5 text-center">
                      {typeof row.starter === "boolean" ? (
                        row.starter ? (
                          <Check className="w-4 h-4 text-emerald-500 mx-auto" />
                        ) : (
                          <X className="w-4 h-4 text-slate-300 mx-auto" />
                        )
                      ) : (
                        <span className="font-medium text-slate-600">{row.starter}</span>
                      )}
                    </td>

                    <td className="p-4 sm:p-5 text-center">
                      {typeof row.growth === "boolean" ? (
                        row.growth ? (
                          <Check className="w-4 h-4 text-emerald-500 mx-auto" />
                        ) : (
                          <X className="w-4 h-4 text-slate-300 mx-auto" />
                        )
                      ) : (
                        <span className="font-bold text-purple-600">{row.growth}</span>
                      )}
                    </td>

                    <td className="p-4 sm:p-5 text-center">
                      {typeof row.enterprise === "boolean" ? (
                        row.enterprise ? (
                          <Check className="w-4 h-4 text-emerald-500 mx-auto" />
                        ) : (
                          <X className="w-4 h-4 text-slate-300 mx-auto" />
                        )
                      ) : (
                        <span className="font-bold text-blue-600">{row.enterprise}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ ACCORDION SECTION */}
        <div className="space-y-6 max-w-3xl mx-auto">
          <div className="text-center space-y-1">
            <h2 className="font-heading font-extrabold text-2xl md:text-3xl text-slate-900 flex items-center justify-center gap-2">
              <HelpCircle className="w-6 h-6 text-purple-600" />
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-normal">
              Find answers regarding manual bKash validation timelines, digital file refunds, and customization requests.
            </p>
          </div>

          <div className="space-y-3">
            {PRICING_FAQS.map((faq, i) => {
              const isOpen = activeFaq === i;
              return (
                <div
                  key={i}
                  className="rounded-2xl bg-white/95 backdrop-blur-xl border border-slate-200/80 overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:border-purple-300/80 transition-all"
                >
                  <button
                    onClick={() => toggleFaq(i)}
                    className="w-full flex items-center justify-between p-5 text-left font-heading font-bold text-xs md:text-sm text-slate-900 hover:text-purple-600 transition-colors cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 ml-4 transition-transform ${isOpen ? "rotate-180 text-purple-600" : ""}`} />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="p-5 pt-0 border-t border-slate-100 text-xs text-slate-600 leading-relaxed space-y-2 font-normal">
                          <p>{faq.answer}</p>
                          <div className="flex gap-2 items-center text-[10px] text-purple-600 font-semibold">
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
        <div className="p-8 sm:p-10 rounded-[32px] bg-gradient-to-r from-slate-900 via-purple-950 to-slate-900 text-white border border-purple-800/40 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-2xl max-w-5xl mx-auto relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-2 max-w-xl relative z-10">
            <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-white">Need a custom feature blueprint?</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
              If your database specs exceed standard package sizes, our expert software engineers can audit your requirement lists and draft a comprehensive estimate contract.
            </p>
          </div>
          <Link
            href="/contact"
            className="flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-white hover:bg-purple-50 text-slate-900 font-bold text-xs transition-all shadow-lg shrink-0 cursor-pointer relative z-10 group-hover:scale-105"
          >
            <span>Consult Developers</span>
            <ArrowRight className="w-4 h-4 text-purple-600" />
          </Link>
        </div>
      </div>
    </div>
  );
}
