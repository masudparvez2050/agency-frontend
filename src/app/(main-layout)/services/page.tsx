"use client";

import React, { useState, useRef } from "react";
import { SERVICES } from "@/lib/services-data";
import { Service, PricingTier } from "@/types/service";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Laptop, Smartphone, Server, Palette, CreditCard, ShieldCheck, 
  Check, ArrowRight, Sparkles, MessageSquare, Info, Calendar, DollarSign 
} from "lucide-react";

// Helper component to resolve icon component dynamically
const ServiceIcon = ({ name, className }: { name: string; className?: string }) => {
  switch (name) {
    case "Laptop":
      return <Laptop className={className} />;
    case "Smartphone":
      return <Smartphone className={className} />;
    case "Server":
      return <Server className={className} />;
    case "Palette":
      return <Palette className={className} />;
    case "CreditCard":
      return <CreditCard className={className} />;
    case "ShieldCheck":
      return <ShieldCheck className={className} />;
    default:
      return <Laptop className={className} />;
  }
};

import { usePageCMS } from "@/hooks/usePageCMS";

export default function ServicesPage() {
  const [activeService, setActiveService] = useState<string>("custom-web-dev");
  const packagesRef = useRef<HTMLDivElement>(null);
  const [pageConfig] = usePageCMS();

  const currentService = SERVICES.find((s) => s.id === activeService) || SERVICES[0];

  const handleScrollToPackages = (id: string) => {
    setActiveService(id);
    if (packagesRef.current) {
      packagesRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
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
          <span className="text-xs font-extrabold text-purple-700 uppercase tracking-widest mb-3 block">{pageConfig.services.hero.badge}</span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 mb-4 leading-tight">
            {pageConfig.services.hero.title}
          </h1>
          <p className="text-slate-600 font-medium">
            {pageConfig.services.hero.subtitle}
          </p>
        </div>

        {/* Services Directory Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="group relative rounded-2xl bg-white border border-slate-200/80 p-6 overflow-hidden flex flex-col justify-between hover:border-purple-300 transition-all duration-300 shadow-md hover:shadow-xl hover:shadow-purple-500/5"
            >
              {/* Top border glow */}
              <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-purple-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div>
                {/* Icon wrapper */}
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${service.accent} p-[1px] flex items-center justify-center mb-6 shadow-sm`}>
                  <div className="w-full h-full bg-white rounded-[15px] flex items-center justify-center">
                    <ServiceIcon name={service.iconName} className="w-6 h-6 text-purple-700 group-hover:scale-110 transition-transform" />
                  </div>
                </div>

                <h3 className="text-xl font-bold text-slate-900 group-hover:text-purple-700 transition-colors">
                  {service.title}
                </h3>
                
                <span className="text-[10px] font-bold text-slate-500 uppercase mt-1.5 block">
                  Est. Cost: <strong className="text-purple-700">{service.priceRange}</strong>
                </span>

                <p className="text-sm text-slate-600 mt-4 mb-6 leading-relaxed line-clamp-3 font-normal">
                  {service.description}
                </p>

                <div className="w-full h-[1px] bg-slate-200 mb-6" />

                {/* Checklist of deliverables */}
                <ul className="space-y-2.5 mb-8">
                  {service.deliverablesSummary.map((feat, i) => (
                    <li key={i} className="flex gap-2.5 text-xs text-slate-700 font-medium items-start">
                      <Check className="w-3.5 h-3.5 text-purple-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Scroll Trigger button */}
              <button
                onClick={() => handleScrollToPackages(service.id)}
                className="w-full py-3 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-xs font-bold text-slate-700 hover:text-slate-900 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>View Pricing Packages</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          ))}
        </div>

        {/* INTERACTIVE PRICING TIERS PACKAGE PANEL */}
        <div 
          ref={packagesRef}
          className="space-y-8"
        >
          <div className="text-center max-w-xl mx-auto space-y-3">
            <span className="text-xs font-bold text-purple-700 uppercase tracking-widest block">Est. Packages Matrix</span>
            <h2 className="text-3xl font-black text-slate-900">Compare Pricing & Timelines</h2>
            <p className="text-xs text-slate-600 font-medium">
              Select an agency service category below to view deliverables list and estimated delivery schedules.
            </p>
          </div>

          {/* Services selector Tabs */}
          <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-white border border-slate-200 backdrop-blur-xl max-w-4xl mx-auto justify-center shadow-md">
            {SERVICES.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveService(s.id)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer border ${
                  activeService === s.id
                    ? "border-purple-300 bg-purple-50 text-purple-700 shadow-sm"
                    : "border-transparent text-slate-600 hover:text-slate-900"
                }`}
              >
                <ServiceIcon name={s.iconName} className="w-3.5 h-3.5" />
                {s.title}
              </button>
            ))}
          </div>

          {/* Pricing tiers grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {currentService.tiers.map((tier, idx) => {
              const isPopular = idx === 1; // Highlight middle standard tier
              return (
                <div
                  key={tier.name}
                  className={`p-6 md:p-8 rounded-2xl border flex flex-col justify-between relative overflow-hidden transition-all duration-300 shadow-lg ${
                    isPopular
                      ? "bg-purple-50/60 border-purple-300 hover:border-purple-400 shadow-xl shadow-purple-500/10 scale-100 lg:scale-[1.03] z-10 ring-2 ring-purple-600/20"
                      : "bg-white border-slate-200/80 hover:border-slate-300"
                  }`}
                >
                  {isPopular && (
                    <div className="absolute top-4 right-4 bg-purple-100 border border-purple-200 text-purple-700 text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full tracking-wider">
                      Recommended
                    </div>
                  )}

                  <div>
                    {/* Header info */}
                    <div className="space-y-1.5 mb-6">
                      <span className="text-[10px] font-bold text-purple-700 uppercase tracking-widest block">
                        Package Tier
                      </span>
                      <h4 className="text-lg font-black text-slate-900">{tier.name}</h4>
                    </div>

                    {/* Price and timeline */}
                    <div className="mb-6 pb-6 border-b border-slate-200 space-y-1">
                      <div className="text-2xl md:text-3xl font-black text-slate-900">
                        {tier.price}
                      </div>
                      <span className="flex items-center gap-1.5 text-xs text-slate-600 font-bold">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        Timeframe: {tier.timeframe}
                      </span>
                    </div>

                    {/* Deliverables checklist */}
                    <ul className="space-y-3.5 mb-8">
                      {tier.deliverables.map((item, i) => (
                        <li key={i} className="flex gap-2.5 text-xs text-slate-700 font-medium items-start">
                          <Check className="w-3.5 h-3.5 text-purple-600 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Contact redirection button */}
                  <Link
                    href={`/contact?service=${currentService.id}&tier=${tier.name.toLowerCase().replace(/ /g, "-")}`}
                    className={`w-full py-3 rounded-xl text-center text-xs font-bold transition-all ${
                      isPopular
                        ? "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-md shadow-purple-500/20"
                        : "bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 hover:text-slate-900"
                    }`}
                  >
                    Select Package
                  </Link>
                </div>
              );
            })}
          </div>
        </div>

        {/* Company bespoke project CTA */}
        <div className="p-8 rounded-3xl bg-white border border-slate-200/80 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-xl shadow-slate-200/50 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-purple-500/5 blur-2xl rounded-full" />
          <div className="space-y-2 relative z-10 max-w-xl">
            <h3 className="text-2xl font-black text-slate-900">Custom Dev Project Requirements?</h3>
            <p className="text-sm text-slate-600 leading-relaxed font-medium">
              If your codebase specs exceed standard package sizes, our expert software engineers can audit your requirement lists and draft a bespoke estimate contract.
            </p>
          </div>
          <Link
            href="/contact"
            className="flex items-center gap-1.5 px-6 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-xs font-bold text-white transition-all shadow-md shrink-0 relative z-10"
          >
            <span>Consult Developers</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
