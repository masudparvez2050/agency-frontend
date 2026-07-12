"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Mail, MapPin, Clock, Send, CheckCircle, 
  AlertCircle, Smartphone, Globe, ShieldCheck, Palette 
} from "lucide-react";
import { FaFacebook, FaXTwitter, FaLinkedin, FaDiscord, FaGithub } from "react-icons/fa6";

// Separated component to securely use useSearchParams in Suspense boundary
function ContactFormInner() {
  const searchParams = useSearchParams();
  
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [interest, setInterest] = useState("general");
  const [budgetPlan, setBudgetPlan] = useState("custom");
  const [message, setMessage] = useState("");
  
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Check URL queries and pre-populate options
  useEffect(() => {
    const serviceParam = searchParams.get("service");
    const planParam = searchParams.get("plan");

    if (serviceParam) {
      if (serviceParam.includes("web")) setInterest("web-dev");
      else if (serviceParam.includes("mobile")) setInterest("mobile-dev");
      else if (serviceParam.includes("saas")) setInterest("saas-hosting");
      else if (serviceParam.includes("design") || serviceParam.includes("uiux")) setInterest("uiux-design");
      else if (serviceParam.includes("api") || serviceParam.includes("payment")) setInterest("api-payments");
      else if (serviceParam.includes("audit") || serviceParam.includes("consult")) setInterest("tech-audit");
    }

    if (planParam) {
      if (planParam === "starter") setBudgetPlan("starter");
      else if (planParam === "growth") setBudgetPlan("growth");
      else if (planParam === "enterprise") setBudgetPlan("enterprise");
    }
  }, [searchParams]);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!fullName || !email || !message) {
      setErrorMsg("Please fill out all required fields.");
      return;
    }

    setIsLoading(true);
    // Simulate estimate transaction submission API
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <AnimatePresence mode="wait">
        {!isSuccess ? (
          <motion.form
            key="contact-form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleContactSubmit}
            className="space-y-4"
          >
            {errorMsg && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="cnt-name" className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">
                  Your Full Name
                </label>
                <input
                  id="cnt-name"
                  type="text"
                  placeholder="e.g. Masud Parvez"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-850 text-xs text-white placeholder-slate-550 focus:outline-none focus:border-purple-500/40 transition-colors"
                  required
                />
              </div>
              <div>
                <label htmlFor="cnt-email" className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">
                  Business Email
                </label>
                <input
                  id="cnt-email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-850 text-xs text-white placeholder-slate-550 focus:outline-none focus:border-purple-500/40 transition-colors"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="cnt-comp" className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">
                Company Name / Niche <span className="text-slate-600">(Optional)</span>
              </label>
              <input
                id="cnt-comp"
                type="text"
                placeholder="e.g. Plaxora Solutions"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-850 text-xs text-white placeholder-slate-550 focus:outline-none focus:border-purple-500/40 transition-colors"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="cnt-interest" className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">
                  Project Category
                </label>
                <select
                  id="cnt-interest"
                  value={interest}
                  onChange={(e) => setInterest(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-850 text-xs text-slate-350 focus:outline-none focus:border-purple-500/40 transition-colors cursor-pointer"
                >
                  <option value="general">General Inquiries</option>
                  <option value="web-dev">Custom Web Application</option>
                  <option value="mobile-dev">Native Mobile App</option>
                  <option value="saas-hosting">SaaS Cloud Architecture</option>
                  <option value="uiux-design">UI/UX Design System</option>
                  <option value="api-payments">API Payments Integration</option>
                  <option value="tech-audit">Code Speed & SEO Audit</option>
                </select>
              </div>
              <div>
                <label htmlFor="cnt-budget" className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">
                  Budget package
                </label>
                <select
                  id="cnt-budget"
                  value={budgetPlan}
                  onChange={(e) => setBudgetPlan(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-850 text-xs text-slate-350 focus:outline-none focus:border-purple-500/40 transition-colors cursor-pointer"
                >
                  <option value="custom">Bespoke Custom Budget</option>
                  <option value="starter">Starter Plan (15,000 BDT)</option>
                  <option value="growth">Growth Plan (35,000 BDT)</option>
                  <option value="enterprise">Enterprise Plan (85,000 BDT)</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="cnt-msg" className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">
                Outline your requirements
              </label>
              <textarea
                id="cnt-msg"
                rows={4}
                placeholder="Details about pages, database integrations, target dates..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-850 text-xs text-white placeholder-slate-550 focus:outline-none focus:border-purple-500/40 transition-colors resize-none"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-purple-650 to-cyan-555 hover:opacity-95 text-xs font-bold text-white transition-all shadow-lg disabled:from-slate-800 disabled:to-slate-800 disabled:text-slate-600 disabled:cursor-not-allowed cursor-pointer"
            >
              {isLoading ? (
                <span>Dispatching Inquiry...</span>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Send Requirements</span>
                </>
              )}
            </button>
          </motion.form>
        ) : (
          <motion.div
            key="success-overlay"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-8 rounded-2xl bg-slate-950/60 border border-emerald-500/20 text-center space-y-6 shadow-2xl"
          >
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-white">Inquiry Dispatched!</h3>
              <p className="text-xs text-slate-400 leading-relaxed max-w-sm mx-auto">
                Thank you for consulting Plaxora. We have logged your project parameters. Our software engineers will audit details and reach back within 12 hours.
              </p>
            </div>
            <button
              onClick={() => setIsSuccess(false)}
              className="px-6 py-2 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-850 text-xs font-bold text-slate-350 hover:text-white transition-colors cursor-pointer"
            >
              Send Another Request
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-32 pb-24 overflow-hidden relative">
      {/* Glow Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-purple-500/5 blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-cyan-500/5 blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold text-purple-400 uppercase tracking-widest mb-3 block">Consultation Portal</span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white mb-4 leading-tight">
            Contact Plaxora
          </h1>
          <p className="text-slate-400">
            Submit your app design, web development, or cloud hosting requirements. Receive custom project pricing contracts.
          </p>
        </div>

        {/* Layout Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 max-w-5xl mx-auto items-start">
          
          {/* Form Column (Left - 3 cols) */}
          <div className="lg:col-span-3 p-6 md:p-8 rounded-2xl bg-slate-950/70 border border-slate-900/80 backdrop-blur-xl shadow-xl">
            <Suspense fallback={
              <div className="py-24 text-center text-xs text-slate-550 animate-pulse font-bold">
                Loading interactive forms...
              </div>
            }>
              <ContactFormInner />
            </Suspense>
          </div>

          {/* Coordinates Column (Right - 2 cols) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Info Box */}
            <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-900 shadow-xl space-y-6">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block border-b border-slate-900 pb-3">
                Agency Coordinates
              </span>

              <div className="space-y-4">
                {[
                  { title: "Direct Contact", detail: "masudparvez00019@gmail.com", icon: Mail, sub: "Response within 12 hours" },
                  { title: "Plaxora Office", detail: "Dhaka, Bangladesh", icon: MapPin, sub: "Ecosystem headquarters" },
                  { title: "Support Timings", detail: "Sun - Thu (9 AM - 6 PM BDT)", icon: Clock, sub: "Excludes holidays" },
                ].map((item, i) => (
                  <div key={i} className="flex gap-3.5 items-start">
                    <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-850 text-purple-400 shrink-0">
                      <item.icon className="w-4 h-4" />
                    </div>
                    <div>
                      <strong className="text-xs font-bold text-white block">{item.title}</strong>
                      <span className="text-xs text-slate-400 block mt-0.5">{item.detail}</span>
                      <span className="text-[9px] text-slate-550 block mt-0.5">{item.sub}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Links Box */}
            <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-900 shadow-xl space-y-4">
              <span className="text-[10px] font-bold text-slate-550 uppercase tracking-widest block">
                Social Networks
              </span>
              <div className="grid grid-cols-4 gap-3 text-center">
                {[
                  { label: "Github", link: "https://github.com/masudparvez00019", icon: FaGithub },
                  { label: "Facebook", link: "https://facebook.com", icon: FaFacebook },
                  { label: "X-Twitter", link: "https://twitter.com", icon: FaXTwitter },
                  { label: "Discord", link: "https://discord.com", icon: FaDiscord },
                ].map((soc) => (
                  <a
                    key={soc.label}
                    href={soc.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-slate-900 hover:bg-purple-600/10 border border-slate-850 hover:border-purple-500/20 text-slate-450 hover:text-purple-400 transition-all flex items-center justify-center cursor-pointer"
                    title={soc.label}
                  >
                    <soc.icon className="w-4 h-4 shrink-0" />
                  </a>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
