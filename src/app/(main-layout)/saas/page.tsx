"use client";

import React, { useState, useRef } from "react";
import { SAAS_PRODUCTS } from "@/lib/saas-data";
import { SaaSProduct } from "@/types/saas";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Layers, Check, Sparkles, Monitor, Layout, Calendar, 
  DollarSign, Activity, Users, Plus, Star, PhoneCall 
} from "lucide-react";

export default function SaasPage() {
  const [activeSim, setActiveSim] = useState<"vortex-pos" | "apex-crm" | "edulink-lms">("vortex-pos");
  const simulatorRef = useRef<HTMLDivElement>(null);

  const handleScrollToSim = (id: "vortex-pos" | "apex-crm" | "edulink-lms") => {
    setActiveSim(id);
    if (simulatorRef.current) {
      simulatorRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
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
          <span className="text-xs font-bold text-purple-400 uppercase tracking-widest mb-3 block">SaaS Directory</span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white mb-4 leading-tight">
            Plaxora SaaS Hub
          </h1>
          <p className="text-slate-400">
            Explore ready-made Point-of-Sale, Customer Relationships, and School Management platforms built by Plaxora. Launch instantly or order custom modifications.
          </p>
        </div>

        {/* Directory Listings Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {SAAS_PRODUCTS.map((saas, idx) => (
            <motion.div
              key={saas.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="group relative rounded-2xl bg-slate-950/80 border border-slate-900 p-6 overflow-hidden flex flex-col justify-between hover:border-purple-500/20 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/5"
            >
              {/* Top border glow */}
              <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-purple-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div>
                {/* Niche tag */}
                <span className="text-[10px] font-bold tracking-widest text-purple-400 uppercase block mb-2">
                  {saas.niche}
                </span>

                <h3 className="text-2xl font-black text-white group-hover:text-purple-400 transition-colors">
                  {saas.title}
                </h3>

                <p className="text-xs text-slate-400 mt-4 leading-relaxed line-clamp-4">
                  {saas.fullDescription}
                </p>

                {/* Tech Stack logs */}
                <div className="flex flex-wrap gap-1.5 mt-6 mb-8">
                  {saas.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="text-[9px] font-semibold text-slate-400 px-2 py-0.5 rounded bg-slate-900 border border-slate-850"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="w-full h-[1px] bg-slate-900 mb-6" />

                {/* Features checklists */}
                <ul className="space-y-2.5 mb-8">
                  {saas.features.slice(0, 3).map((feat, i) => (
                    <li key={i} className="flex gap-2 text-xs text-slate-350 items-start">
                      <Check className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action trigger */}
              <button
                onClick={() => handleScrollToSim(saas.id as any)}
                className="w-full py-3 rounded-xl bg-purple-650 hover:bg-purple-600/10 border border-purple-550/20 text-xs font-bold text-purple-300 hover:text-white transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Monitor className="w-3.5 h-3.5" />
                Live Demo Simulator
              </button>
            </motion.div>
          ))}
        </div>

        {/* INTERACTIVE DEMO SIMULATOR PANEL */}
        <div 
          ref={simulatorRef}
          className="p-1 rounded-3xl bg-gradient-to-tr from-slate-900 via-slate-950 to-slate-900 border border-slate-900 shadow-2xl relative"
        >
          {/* Header toolbar */}
          <div className="p-4 md:p-6 border-b border-slate-900 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-2">
                Ecosystem Sandbox Live Simulator
              </span>
            </div>

            {/* Dashboard Selector Tabs */}
            <div className="flex gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-850">
              {[
                { id: "vortex-pos", label: "Vortex POS" },
                { id: "apex-crm", label: "Apex CRM" },
                { id: "edulink-lms", label: "EduLink LMS" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveSim(tab.id as any)}
                  className={`px-3.5 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    activeSim === tab.id
                      ? "bg-purple-600 text-white shadow-lg"
                      : "text-slate-550 hover:text-slate-350"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Simulator Content Area */}
          <div className="p-6 md:p-8 bg-[#030014]/40 min-h-[450px]">
            <AnimatePresence mode="wait">
              
              {/* POS Dashboard Simulator */}
              {activeSim === "vortex-pos" && (
                <motion.div
                  key="pos-sim"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  {/* Top Stats */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { label: "Daily Store Revenue", value: "84,250 BDT", icon: DollarSign, color: "text-emerald-400" },
                      { label: "Critical Stock Alerts", value: "4 Items", icon: Layers, color: "text-amber-400" },
                      { label: "Invoices Compiled", value: "182 Printed", icon: Activity, color: "text-purple-400" },
                    ].map((stat, i) => (
                      <div key={i} className="p-4 rounded-xl bg-slate-950/90 border border-slate-900 flex items-center justify-between">
                        <div>
                          <span className="text-[9px] font-bold text-slate-550 uppercase tracking-wide block mb-1">
                            {stat.label}
                          </span>
                          <span className="text-base font-black text-white">{stat.value}</span>
                        </div>
                        <div className={`p-2 rounded-lg bg-slate-900 border border-slate-850 ${stat.color}`}>
                          <stat.icon className="w-4 h-4 shrink-0" />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Layout Split */}
                  <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                    {/* Visual SVG Sales Chart */}
                    <div className="lg:col-span-3 p-5 rounded-xl bg-slate-950/90 border border-slate-900 space-y-4">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">
                        Sales Timeline (Last 6 Hours)
                      </span>
                      <div className="h-40 flex items-end justify-between px-2 pt-6 relative">
                        {/* Grid lines */}
                        <div className="absolute inset-x-0 top-1/3 border-t border-slate-900/60" />
                        <div className="absolute inset-x-0 top-2/3 border-t border-slate-900/60" />
                        
                        {/* Bars representing hourly sales */}
                        {[
                          { hour: "11:00", val: "h-2/5", amt: "12K" },
                          { hour: "12:00", val: "h-3/5", amt: "18K" },
                          { hour: "13:00", val: "h-4/5", amt: "24K" },
                          { hour: "14:00", val: "h-5/6", amt: "32K" },
                          { hour: "15:00", val: "h-3/4", amt: "28K" },
                          { hour: "16:00", val: "h-full", amt: "40K" },
                        ].map((bar, i) => (
                          <div key={i} className="flex flex-col items-center gap-2 group cursor-pointer relative z-10">
                            <span className="text-[9px] font-bold text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity">
                              {bar.amt}
                            </span>
                            <div className={`w-8 rounded-t bg-gradient-to-t from-blue-600 to-cyan-400 ${bar.val} group-hover:from-purple-500 transition-all duration-300`} />
                            <span className="text-[9px] font-bold text-slate-550 uppercase tracking-wide">
                              {bar.hour}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Active Invoices List */}
                    <div className="lg:col-span-2 p-5 rounded-xl bg-slate-950/90 border border-slate-900 space-y-4">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">
                        Recent Transactions
                      </span>
                      <div className="space-y-3">
                        {[
                          { customer: "Ahmad Sharif", items: "3 items", price: "2,400 BDT", method: "bKash", time: "5 mins ago" },
                          { customer: "Jahanara Kabir", items: "1 item", price: "650 BDT", method: "Cash", time: "14 mins ago" },
                          { customer: "Rashedul Alam", items: "8 items", price: "7,800 BDT", method: "Nagad", time: "28 mins ago" },
                        ].map((tx, idx) => (
                          <div key={idx} className="flex justify-between items-center text-xs p-2.5 rounded-lg bg-slate-900/50 border border-slate-900 hover:border-slate-850 transition-colors">
                            <div>
                              <div className="font-bold text-white">{tx.customer}</div>
                              <div className="text-[9px] text-slate-550 mt-0.5">{tx.items} • {tx.method}</div>
                            </div>
                            <div className="text-right">
                              <div className="font-bold text-purple-400">{tx.price}</div>
                              <div className="text-[9px] text-slate-550 mt-0.5">{tx.time}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* CRM Dashboard Simulator */}
              {activeSim === "apex-crm" && (
                <motion.div
                  key="crm-sim"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  {/* Top Stats */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { label: "Active Deals Value", value: "$45,800 USD", icon: DollarSign, color: "text-pink-400" },
                      { label: "Leads automated", value: "3,820 Profiles", icon: Users, color: "text-cyan-400" },
                      { label: "Average Conversion", value: "14.8% rate", icon: Activity, color: "text-emerald-400" },
                    ].map((stat, i) => (
                      <div key={i} className="p-4 rounded-xl bg-slate-950/90 border border-slate-900 flex items-center justify-between">
                        <div>
                          <span className="text-[9px] font-bold text-slate-555 uppercase tracking-wide block mb-1">
                            {stat.label}
                          </span>
                          <span className="text-base font-black text-white">{stat.value}</span>
                        </div>
                        <div className={`p-2 rounded-lg bg-slate-900 border border-slate-855 ${stat.color}`}>
                          <stat.icon className="w-4 h-4 shrink-0" />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Layout Split */}
                  <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                    {/* Visual SVG Conversion Graph */}
                    <div className="lg:col-span-3 p-5 rounded-xl bg-slate-950/90 border border-slate-900 space-y-4">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">
                        Monthly Conversion Trend
                      </span>
                      <div className="h-40 flex items-end justify-between px-2 pt-6 relative">
                        {/* Grid lines */}
                        <div className="absolute inset-x-0 top-1/3 border-t border-slate-900/60" />
                        <div className="absolute inset-x-0 top-2/3 border-t border-slate-900/60" />
                        
                        {/* Styled SVG Area chart representing monthly lead conversions */}
                        <svg className="absolute inset-0 w-full h-full p-2 pt-6" viewBox="0 0 400 120" preserveAspectRatio="none">
                          <defs>
                            <linearGradient id="crm-grad" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#ec4899" stopOpacity="0.2"/>
                              <stop offset="100%" stopColor="#ec4899" stopOpacity="0.0"/>
                            </linearGradient>
                          </defs>
                          <path
                            d="M0,100 Q60,80 120,60 T240,40 T360,20 L400,20 L400,120 L0,120 Z"
                            fill="url(#crm-grad)"
                          />
                          <path
                            d="M0,100 Q60,80 120,60 T240,40 T360,20 L400,20"
                            fill="none"
                            stroke="#ec4899"
                            strokeWidth="2.5"
                          />
                        </svg>

                        {["Feb", "Mar", "Apr", "May", "Jun", "Jul"].map((mon, i) => (
                          <div key={i} className="flex flex-col items-center gap-2 relative z-10 w-8">
                            <div className="h-20 w-[1px] bg-transparent" />
                            <span className="text-[9px] font-bold text-slate-555 uppercase tracking-wide">
                              {mon}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Agent performance */}
                    <div className="lg:col-span-2 p-5 rounded-xl bg-slate-950/90 border border-slate-900 space-y-4">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">
                        Sales Agents Ranking
                      </span>
                      <div className="space-y-3">
                        {[
                          { name: "Tahmid Reza", closed: "42 deals", value: "$12,400", rate: "18%" },
                          { name: "Sultana Yasmin", closed: "36 deals", value: "$9,800", rate: "15%" },
                          { name: "Monirul Islam", closed: "28 deals", value: "$8,500", rate: "12%" },
                        ].map((ag, idx) => (
                          <div key={idx} className="flex justify-between items-center text-xs p-2.5 rounded-lg bg-slate-900/50 border border-slate-900 hover:border-slate-850 transition-colors">
                            <div>
                              <div className="font-bold text-white">{ag.name}</div>
                              <div className="text-[9px] text-slate-555 mt-0.5">{ag.closed} closed</div>
                            </div>
                            <div className="text-right">
                              <div className="font-bold text-rose-455">{ag.value}</div>
                              <div className="text-[9px] text-slate-555 mt-0.5">{ag.rate} conv</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* LMS Dashboard Simulator */}
              {activeSim === "edulink-lms" && (
                <motion.div
                  key="lms-sim"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  {/* Top Stats */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { label: "Registered Pupils", value: "850 Students", icon: Users, color: "text-amber-400" },
                      { label: "Class Attendance Rate", value: "96.4% avg", icon: Activity, color: "text-teal-400" },
                      { label: "Fee Collections", value: "450K BDT", icon: DollarSign, color: "text-purple-400" },
                    ].map((stat, i) => (
                      <div key={i} className="p-4 rounded-xl bg-slate-950/90 border border-slate-900 flex items-center justify-between">
                        <div>
                          <span className="text-[9px] font-bold text-slate-550 uppercase tracking-wide block mb-1">
                            {stat.label}
                          </span>
                          <span className="text-base font-black text-white">{stat.value}</span>
                        </div>
                        <div className={`p-2 rounded-lg bg-slate-900 border border-slate-850 ${stat.color}`}>
                          <stat.icon className="w-4 h-4 shrink-0" />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Layout Split */}
                  <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                    {/* Visual Fee collection bars */}
                    <div className="lg:col-span-3 p-5 rounded-xl bg-slate-950/90 border border-slate-900 space-y-4">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">
                        Monthly Fee Collections (BDT)
                      </span>
                      <div className="h-40 flex items-end justify-between px-2 pt-6 relative">
                        {/* Grid lines */}
                        <div className="absolute inset-x-0 top-1/3 border-t border-slate-900/60" />
                        <div className="absolute inset-x-0 top-2/3 border-t border-slate-900/60" />
                        
                        {/* Bars representing monthly collections */}
                        {[
                          { month: "Jan", val: "h-3/5", amt: "220K" },
                          { month: "Feb", val: "h-2/5", amt: "180K" },
                          { month: "Mar", val: "h-4/5", amt: "310K" },
                          { month: "Apr", val: "h-11/12", amt: "420K" },
                          { month: "May", val: "h-5/6", amt: "380K" },
                          { month: "Jun", val: "h-full", amt: "450K" },
                        ].map((bar, i) => (
                          <div key={i} className="flex flex-col items-center gap-2 group cursor-pointer relative z-10">
                            <span className="text-[9px] font-bold text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity">
                              {bar.amt}
                            </span>
                            <div className={`w-8 rounded-t bg-gradient-to-t from-teal-600 to-emerald-500 ${bar.val} group-hover:from-amber-500 transition-all duration-300`} />
                            <span className="text-[9px] font-bold text-slate-550 uppercase tracking-wide">
                              {bar.month}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Attendance Logs */}
                    <div className="lg:col-span-2 p-5 rounded-xl bg-slate-950/90 border border-slate-900 space-y-4">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">
                        Active Classes Log
                      </span>
                      <div className="space-y-3">
                        {[
                          { class: "Grade 10 - Mathematics", status: "Present: 28/30", time: "09:00 - 09:45" },
                          { class: "Grade 08 - English Lang", status: "Present: 22/24", time: "10:00 - 10:45" },
                          { class: "Grade 12 - Physics Lab", status: "Present: 18/18", time: "11:00 - 12:30" },
                        ].map((cl, idx) => (
                          <div key={idx} className="flex justify-between items-center text-xs p-2.5 rounded-lg bg-slate-900/50 border border-slate-900 hover:border-slate-850 transition-colors">
                            <div>
                              <div className="font-bold text-white">{cl.class}</div>
                              <div className="text-[9px] text-slate-550 mt-0.5">{cl.status} pupils</div>
                            </div>
                            <div className="text-right">
                              <div className="font-bold text-teal-400">Class Active</div>
                              <div className="text-[9px] text-slate-550 mt-0.5">{cl.time}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </div>

        {/* Custom Lead Call to Action */}
        <div className="p-8 rounded-3xl bg-slate-950/80 border border-slate-900 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-purple-500/5 blur-2xl rounded-full" />
          <div className="space-y-2 relative z-10 max-w-xl">
            <h3 className="text-2xl font-black text-white">Need a Custom SaaS Solution?</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              We specialize in custom Software-as-a-Service architecture. Tell us your business parameters and we will estimate, design, develop, and host a bespoke solution tailored to your workflow.
            </p>
          </div>
          <Link
            href="/contact"
            className="flex items-center gap-1.5 px-6 py-4 rounded-xl bg-gradient-to-r from-purple-650 to-cyan-555 hover:opacity-95 text-xs font-bold text-white transition-all shadow-lg shrink-0 relative z-10"
          >
            <PhoneCall className="w-4 h-4" />
            Request Bespoke Setup
          </Link>
        </div>
      </div>
    </div>
  );
}
