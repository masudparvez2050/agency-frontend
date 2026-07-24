"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Mail, MapPin, Clock, Send, CheckCircle, 
  AlertCircle, PhoneCall
} from "lucide-react";
import { FaFacebook, FaXTwitter, FaDiscord, FaGithub } from "react-icons/fa6";

function ContactFormInner() {
  const searchParams = useSearchParams();
  
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [interest, setInterest] = useState("general");
  const [message, setMessage] = useState("");
  
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const serviceParam = searchParams.get("service");

    if (serviceParam) {
      if (serviceParam.includes("web")) setInterest("web-dev");
      else if (serviceParam.includes("mobile")) setInterest("mobile-dev");
      else if (serviceParam.includes("saas")) setInterest("saas-hosting");
      else if (serviceParam.includes("design") || serviceParam.includes("uiux")) setInterest("uiux-design");
      else if (serviceParam.includes("api") || serviceParam.includes("payment")) setInterest("api-payments");
      else if (serviceParam.includes("audit") || serviceParam.includes("consult")) setInterest("tech-audit");
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
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 1500);
  };

  return (
    <div className="space-y-6 font-sans">
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
                <label htmlFor="cnt-name" className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Your Full Name *
                </label>
                <input
                  id="cnt-name"
                  type="text"
                  placeholder="e.g. Masud Parvez"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-slate-50/80 border border-slate-200/80 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-600/15 transition-all font-medium"
                  required
                />
              </div>
              <div>
                <label htmlFor="cnt-email" className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Work Email Address *
                </label>
                <input
                  id="cnt-email"
                  type="email"
                  placeholder="masud@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-slate-50/80 border border-slate-200/80 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-600/15 transition-all font-medium"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="cnt-comp" className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Company / Organization
                </label>
                <input
                  id="cnt-comp"
                  type="text"
                  placeholder="e.g. Tech Solutions Inc."
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-slate-50/80 border border-slate-200/80 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-600/15 transition-all font-medium"
                />
              </div>
              <div>
                <label htmlFor="cnt-interest" className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Primary Area of Interest
                </label>
                <select
                  id="cnt-interest"
                  value={interest}
                  onChange={(e) => setInterest(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-slate-50/80 border border-slate-200/80 text-xs text-slate-900 focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-600/15 transition-all font-medium cursor-pointer"
                >
                  <option value="general">General Inquiry</option>
                  <option value="web-dev">Custom Web Development</option>
                  <option value="mobile-dev">Flutter Mobile Application</option>
                  <option value="saas-hosting">SaaS Hub & Database Architecture</option>
                  <option value="uiux-design">UI/UX Figma Design Tokens</option>
                  <option value="api-payments">Manual bKash/Nagad Integration</option>
                  <option value="tech-audit">Code Audit & Security</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="cnt-msg" className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                Project Specs & Requirements *
              </label>
              <textarea
                id="cnt-msg"
                rows={4}
                placeholder="Describe your tech stack preferences, target release dates, and key features..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-slate-50/80 border border-slate-200/80 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-600/15 transition-all font-medium resize-none"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-xs font-bold text-white transition-all shadow-md shadow-purple-500/25 cursor-pointer hover:shadow-lg hover:shadow-purple-500/35"
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
            className="p-8 rounded-[28px] bg-emerald-50/80 border border-emerald-200 text-center space-y-4 shadow-sm"
          >
            <div className="w-13 h-13 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="font-heading font-extrabold text-xl text-slate-900">Inquiry Dispatched!</h3>
              <p className="text-xs text-slate-600 leading-relaxed max-w-sm mx-auto font-normal">
                Thank you for consulting Plaxora. We have logged your project parameters. Our software engineers will audit details and reach back within 12 hours.
              </p>
            </div>
            <button
              onClick={() => setIsSuccess(false)}
              className="px-6 py-2.5 rounded-full bg-white hover:bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 transition-colors cursor-pointer shadow-xs"
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
    <div className="min-h-screen pt-28 pb-24 overflow-hidden relative bg-gradient-to-b from-white via-slate-50/50 to-white font-sans">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-200/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-200/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-50 border border-purple-100 text-purple-600 text-xs font-bold uppercase tracking-wider mb-3 shadow-2xs">
            <PhoneCall className="w-3.5 h-3.5" />
            <span>{pageConfig.contact.hero.badge || "Start Your Project"}</span>
          </div>
          <h1 className="font-heading font-extrabold text-4xl md:text-5xl tracking-tight text-slate-900 leading-tight mb-3">
            {pageConfig.contact.hero.title || "Let's Build Something Great Together"}
          </h1>
          <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
            {pageConfig.contact.hero.subtitle || "Tell us about your digital product requirements, template support needs, or custom development contract goals."}
          </p>
        </div>

        {/* Layout Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-5xl mx-auto items-start">
          
          {/* Form Column (Left - 3 cols) */}
          <div className="lg:col-span-3 p-7 md:p-9 rounded-[28px] bg-white/95 backdrop-blur-xl border border-slate-200/80 shadow-[0_10px_35px_rgba(0,0,0,0.03)]">
            <Suspense fallback={
              <div className="py-24 text-center text-xs text-slate-500 animate-pulse font-medium">
                Loading interactive form...
              </div>
            }>
              <ContactFormInner />
            </Suspense>
          </div>

          {/* Coordinates Column (Right - 2 cols) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Info Box */}
            <div className="p-7 rounded-[28px] bg-white/95 backdrop-blur-xl border border-slate-200/80 shadow-[0_10px_35px_rgba(0,0,0,0.03)] space-y-6">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block border-b border-slate-100 pb-3">
                Agency Coordinates
              </span>

              <div className="space-y-5">
                {[
                  { title: "Direct Contact", detail: "masudparvez00019@gmail.com", icon: Mail, sub: "Response within 12 hours" },
                  { title: "Plaxora Office", detail: "Dhaka, Bangladesh", icon: MapPin, sub: "Ecosystem headquarters" },
                  { title: "Support Timings", detail: "Sun - Thu (9 AM - 6 PM BDT)", icon: Clock, sub: "Excludes holidays" },
                ].map((item, i) => (
                  <div key={i} className="flex gap-3.5 items-start">
                    <div className="w-10 h-10 rounded-2xl bg-purple-50 border border-purple-100 text-purple-600 flex items-center justify-center shrink-0">
                      <item.icon className="w-4.5 h-4.5" />
                    </div>
                    <div>
                      <strong className="text-xs font-bold text-slate-900 block">{item.title}</strong>
                      <span className="text-xs text-slate-600 font-medium block mt-0.5">{item.detail}</span>
                      <span className="text-[10px] text-slate-400 block mt-0.5">{item.sub}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Links Box */}
            <div className="p-7 rounded-[28px] bg-white/95 backdrop-blur-xl border border-slate-200/80 shadow-[0_10px_35px_rgba(0,0,0,0.03)] space-y-4">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
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
                    className="p-3.5 rounded-2xl bg-slate-100/80 hover:bg-purple-600 hover:text-white border border-slate-200/80 text-slate-700 transition-all flex items-center justify-center cursor-pointer shadow-xs hover:scale-105"
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
