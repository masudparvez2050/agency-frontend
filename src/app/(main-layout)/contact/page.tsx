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
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="cnt-name" className="block text-[10px] font-bold text-slate-600 uppercase tracking-wide mb-1.5">
                  Your Full Name
                </label>
                <input
                  id="cnt-name"
                  type="text"
                  placeholder="e.g. Masud Parvez"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-100 transition-all font-medium"
                  required
                />
              </div>
              <div>
                <label htmlFor="cnt-email" className="block text-[10px] font-bold text-slate-600 uppercase tracking-wide mb-1.5">
                  Work Email Address
                </label>
                <input
                  id="cnt-email"
                  type="email"
                  placeholder="masud@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-100 transition-all font-medium"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="cnt-comp" className="block text-[10px] font-bold text-slate-600 uppercase tracking-wide mb-1.5">
                  Company / Organization
                </label>
                <input
                  id="cnt-comp"
                  type="text"
                  placeholder="e.g. Tech Solutions Inc."
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-100 transition-all font-medium"
                />
              </div>
              <div>
                <label htmlFor="cnt-interest" className="block text-[10px] font-bold text-slate-600 uppercase tracking-wide mb-1.5">
                  Primary Area of Interest
                </label>
                <select
                  id="cnt-interest"
                  value={interest}
                  onChange={(e) => setInterest(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-100 transition-all font-medium"
                >
                  <option value="general" className="bg-white text-slate-900">General Inquiry</option>
                  <option value="web-dev" className="bg-white text-slate-900">Custom Web Development</option>
                  <option value="mobile-dev" className="bg-white text-slate-900">Flutter Mobile Application</option>
                  <option value="saas-hosting" className="bg-white text-slate-900">SaaS Hub & Database Architecture</option>
                  <option value="uiux-design" className="bg-white text-slate-900">UI/UX Figma Design Tokens</option>
                  <option value="api-payments" className="bg-white text-slate-900">Manual bKash/Nagad Integration</option>
                  <option value="tech-audit" className="bg-white text-slate-900">Code Audit & Security</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="cnt-msg" className="block text-[10px] font-bold text-slate-600 uppercase tracking-wide mb-1.5">
                Project Specs & Requirements
              </label>
              <textarea
                id="cnt-msg"
                rows={4}
                placeholder="Describe your tech stack preferences, target release dates, and key features..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-100 transition-all font-medium resize-none"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 disabled:opacity-50 text-xs font-bold text-white transition-all shadow-md shadow-purple-500/15 cursor-pointer"
            >
              {isLoading ? (
                <span>Dispatching Inquiry...</span>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Estimate Request</span>
                </>
              )}
            </button>
          </motion.form>
        ) : (
          <motion.div
            key="success-box"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-8 rounded-2xl bg-emerald-50/50 border border-emerald-200 text-center space-y-6 shadow-md"
          >
            <div className="w-12 h-12 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-700 flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-slate-900">Inquiry Dispatched!</h3>
              <p className="text-xs text-slate-600 leading-relaxed max-w-sm mx-auto font-medium">
                Thank you for consulting Plaxora. We have logged your project parameters. Our software engineers will audit details and reach back within 12 hours.
              </p>
            </div>
            <button
              onClick={() => setIsSuccess(false)}
              className="px-6 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-xs font-bold text-slate-700 transition-colors cursor-pointer"
            >
              Send Another Request
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

import { usePageCMS } from "@/hooks/usePageCMS";

export default function ContactPage() {
  const [pageConfig] = usePageCMS();

  return (
    <div className="min-h-screen pt-32 pb-24 overflow-hidden relative">
      {/* Glow Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-purple-500/5 blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-cyan-500/5 blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-extrabold text-purple-700 uppercase tracking-widest mb-3 block">{pageConfig.contact.hero.badge}</span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 mb-4 leading-tight">
            {pageConfig.contact.hero.title}
          </h1>
          <p className="text-slate-600 font-medium">
            {pageConfig.contact.hero.subtitle}
          </p>
        </div>

        {/* Layout Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 max-w-5xl mx-auto items-start">
          
          {/* Form Column (Left - 3 cols) */}
          <div className="lg:col-span-3 p-6 md:p-8 rounded-2xl bg-white border border-slate-200/80 backdrop-blur-xl shadow-xl shadow-slate-200/40">
            <Suspense fallback={
              <div className="py-24 text-center text-xs text-slate-500 animate-pulse font-bold">
                Loading interactive forms...
              </div>
            }>
              <ContactFormInner />
            </Suspense>
          </div>

          {/* Coordinates Column (Right - 2 cols) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Info Box */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-md space-y-6">
              <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest block border-b border-slate-200 pb-3">
                Agency Coordinates
              </span>

              <div className="space-y-4">
                {[
                  { title: "Direct Contact", detail: "masudparvez00019@gmail.com", icon: Mail, sub: "Response within 12 hours" },
                  { title: "Plaxora Office", detail: "Dhaka, Bangladesh", icon: MapPin, sub: "Ecosystem headquarters" },
                  { title: "Support Timings", detail: "Sun - Thu (9 AM - 6 PM BDT)", icon: Clock, sub: "Excludes holidays" },
                ].map((item, i) => (
                  <div key={i} className="flex gap-3.5 items-start">
                    <div className="p-2.5 rounded-lg bg-purple-50 border border-purple-100 text-purple-700 shrink-0">
                      <item.icon className="w-4 h-4" />
                    </div>
                    <div>
                      <strong className="text-xs font-bold text-slate-900 block">{item.title}</strong>
                      <span className="text-xs text-slate-600 font-medium block mt-0.5">{item.detail}</span>
                      <span className="text-[9px] text-slate-400 block mt-0.5">{item.sub}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Links Box */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-md space-y-4">
              <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest block">
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
                    className="p-3 rounded-xl bg-slate-100 hover:bg-purple-50 border border-slate-200 hover:border-purple-200 text-slate-600 hover:text-purple-700 transition-all flex items-center justify-center cursor-pointer shadow-sm"
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
