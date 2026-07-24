"use client";

import React, { useState, useRef } from "react";
import { SERVICES } from "@/lib/services-data";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Laptop, Smartphone, Server, Palette, CreditCard, ShieldCheck, 
  Check, ArrowRight, Calendar, Layers
} from "lucide-react";

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
    <div className="min-h-screen pt-28 pb-24 overflow-hidden relative bg-gradient-to-b from-white via-slate-50/50 to-white font-sans">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-200/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-200/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-20">
        
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-50 border border-purple-100 text-purple-600 text-xs font-bold uppercase tracking-wider mb-3 shadow-2xs">
            <Layers className="w-3.5 h-3.5" />
            <span>{pageConfig.services.hero.badge || "Our Core Agency Services"}</span>
          </div>
          <h1 className="font-heading font-extrabold text-4xl md:text-5xl tracking-tight text-slate-900 leading-tight mb-3">
            {pageConfig.services.hero.title || "Bespoke Software Services"}
          </h1>
          <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
            {pageConfig.services.hero.subtitle || "Though templates are our strength, we provide premier bespoke development services to seed startup growth and deploy enterprise operations."}
          </p>
        </div>

        {/* Services Directory Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="bg-white/95 backdrop-blur-xl rounded-[28px] p-7 border border-slate-200/80 hover:border-purple-400/50 shadow-[0_10px_35px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_50px_rgba(147,51,234,0.12)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="w-13 h-13 rounded-2xl bg-purple-50 border border-purple-100/80 flex items-center justify-center text-purple-600 mb-6 shadow-2xs group-hover:scale-105 transition-transform duration-200">
                  <ServiceIcon name={service.iconName} className="w-6 h-6" />
                </div>

                <h3 className="font-heading font-bold text-xl text-slate-900 group-hover:text-purple-600 transition-colors">
                  {service.title}
                </h3>
                
                <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100/80 border border-slate-200/70 text-[11px] font-bold text-slate-700">
                  <span>Est. Cost:</span>
                  <span className="text-purple-600 font-extrabold">{service.priceRange}</span>
                </div>

                <p className="text-xs text-slate-600 mt-4 mb-6 leading-relaxed line-clamp-3 font-normal">
                  {service.description}
                </p>

                <div className="w-full h-[1px] bg-slate-100 mb-6" />

                <ul className="space-y-2.5 mb-6 text-xs text-slate-700 font-medium">
                  {service.deliverablesSummary.map((feat, i) => (
                    <li key={i} className="flex gap-2 items-start">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => handleScrollToPackages(service.id)}
                className="w-full py-3 rounded-full bg-slate-100/80 hover:bg-purple-600 hover:text-white border border-slate-200/80 text-xs font-bold text-slate-700 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>View Packages Matrix</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          ))}
        </div>

        {/* INTERACTIVE PRICING TIERS PACKAGE PANEL */}
        <div ref={packagesRef} className="space-y-8 pt-6">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 border border-purple-100 text-purple-600 text-xs font-bold uppercase tracking-wider">Est. Packages Matrix</span>
            <h2 className="font-heading font-extrabold text-3xl md:text-4xl text-slate-900">Compare Pricing & Timelines</h2>
            <p className="text-xs sm:text-sm text-slate-600 font-normal">
              Select an agency service category below to view deliverables list and estimated delivery schedules.
            </p>
          </div>

          {/* Services selector Tabs */}
          <div className="flex flex-wrap gap-2 p-2 rounded-full bg-slate-100/80 border border-slate-200/70 max-w-4xl mx-auto justify-center shadow-2xs">
            {SERVICES.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveService(s.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  activeService === s.id
                    ? "bg-purple-600 text-white shadow-md shadow-purple-500/20"
                    : "bg-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
                }`}
              >
                <ServiceIcon name={s.iconName} className="w-3.5 h-3.5" />
                {s.title}
              </button>
            ))}
          </div>

          {/* Pricing tiers grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {currentService.tiers.map((tier, idx) => {
              const isPopular = idx === 1;
              return (
                <div
                  key={tier.name}
                  className={`p-7 sm:p-8 rounded-[28px] border flex flex-col justify-between relative overflow-hidden transition-all duration-300 ${
                    isPopular
                      ? "bg-gradient-to-b from-purple-50/70 via-white to-white border-purple-300 shadow-[0_15px_40px_rgba(147,51,234,0.12)] ring-2 ring-purple-600/20"
                      : "bg-white/95 backdrop-blur-xl border-slate-200/80 shadow-[0_10px_35px_rgba(0,0,0,0.03)] hover:border-purple-300/60"
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
                        Package Tier
                      </span>
                      <h4 className="font-heading font-extrabold text-xl text-slate-900">{tier.name}</h4>
                    </div>

                    <div className="mb-6 pb-6 border-b border-slate-100 space-y-1">
                      <div className="font-heading font-extrabold text-3xl text-slate-900">
                        {tier.price}
                      </div>
                      <span className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                        <Calendar className="w-3.5 h-3.5 text-purple-500" />
                        Timeframe: {tier.timeframe}
                      </span>
                    </div>

                    <ul className="space-y-3 mb-8 text-xs text-slate-700 font-medium">
                      {tier.deliverables.map((item, i) => (
                        <li key={i} className="flex gap-2 items-start">
                          <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    href={`/contact?service=${currentService.id}&tier=${tier.name.toLowerCase().replace(/ /g, "-")}`}
                    className={`w-full py-3 rounded-full text-center text-xs font-bold transition-all cursor-pointer shadow-xs ${
                      isPopular
                        ? "bg-purple-600 hover:bg-purple-700 text-white shadow-md shadow-purple-500/25"
                        : "bg-slate-100 hover:bg-slate-200/80 border border-slate-200/80 text-slate-700"
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
        <div className="p-8 sm:p-10 rounded-[32px] bg-gradient-to-r from-slate-900 via-purple-950 to-slate-900 text-white border border-purple-800/40 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-2 max-w-xl relative z-10">
            <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-white">Custom Dev Project Requirements?</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
              If your codebase specs exceed standard package sizes, our expert software engineers can audit your requirement lists and draft a bespoke estimate contract.
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
