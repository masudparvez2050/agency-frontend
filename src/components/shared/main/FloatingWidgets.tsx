"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowUp, X, Mail, ExternalLink, Phone
} from "lucide-react";
import { FaWhatsapp, FaFacebook, FaXTwitter, FaYoutube, FaLinkedin, FaTiktok, FaGlobe } from "react-icons/fa6";
import { CONTACT_INFO } from "@/lib/contact-info";

export default function FloatingWidgets() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* 1. Left Bottom: Scroll To Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.2 }}
            onClick={scrollToTop}
            className="fixed bottom-6 left-6 z-40 p-3 rounded-full bg-white hover:bg-blue-600 border border-slate-200 text-slate-700 hover:text-white transition-all shadow-md hover:shadow-lg cursor-pointer group flex items-center justify-center font-sans"
            title="Scroll to Top"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* 2. Right Bottom: WhatsApp & Social Contact Floating Launcher */}
      <div className="fixed bottom-6 right-6 z-40 font-sans">
        <AnimatePresence>
          {isContactOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 350, damping: 28 }}
              className="absolute bottom-16 right-0 w-80 rounded-2xl bg-white border border-slate-200 p-5 shadow-2xl space-y-4 overflow-hidden max-h-[80vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                    <FaWhatsapp className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <strong className="font-heading font-bold text-xs text-slate-900 block">Plaxora Group Support</strong>
                    <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Active Now
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setIsContactOpen(false)}
                  className="p-1 rounded-lg bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p className="text-xs text-slate-500 font-normal leading-relaxed">
                Connect with Plaxora Group via phone, WhatsApp, email, or our official social channels:
              </p>

              {/* Social Channels List */}
              <div className="space-y-2">
                {[
                  {
                    name: "WhatsApp Direct",
                    detail: CONTACT_INFO.phone,
                    link: CONTACT_INFO.whatsappHref,
                    icon: FaWhatsapp,
                    color: "bg-emerald-50 text-emerald-600 border-emerald-200 hover:bg-emerald-100",
                  },
                  {
                    name: "Direct Phone Call",
                    detail: CONTACT_INFO.phone,
                    link: CONTACT_INFO.phoneHref,
                    icon: Phone,
                    color: "bg-teal-50 text-teal-600 border-teal-200 hover:bg-teal-100",
                  },
                  {
                    name: "Email Support",
                    detail: CONTACT_INFO.email,
                    link: CONTACT_INFO.emailHref,
                    icon: Mail,
                    color: "bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100",
                  },
                  {
                    name: "Facebook Page",
                    detail: "facebook.com/plaxoragroup",
                    link: CONTACT_INFO.socials.facebook,
                    icon: FaFacebook,
                    color: "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100",
                  },
                  {
                    name: "X (Twitter)",
                    detail: "x.com/plaxoragroup",
                    link: CONTACT_INFO.socials.x,
                    icon: FaXTwitter,
                    color: "bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100",
                  },
                  {
                    name: "YouTube Channel",
                    detail: "youtube.com/@plaxoragroup",
                    link: CONTACT_INFO.socials.youtube,
                    icon: FaYoutube,
                    color: "bg-rose-50 text-rose-600 border-rose-200 hover:bg-rose-100",
                  },
                  {
                    name: "LinkedIn",
                    detail: "linkedin.com/company/plaxoragroup",
                    link: CONTACT_INFO.socials.linkedin,
                    icon: FaLinkedin,
                    color: "bg-sky-50 text-sky-700 border-sky-200 hover:bg-sky-100",
                  },
                  {
                    name: "TikTok",
                    detail: "tiktok.com/@plaxoragroup",
                    link: CONTACT_INFO.socials.tiktok,
                    icon: FaTiktok,
                    color: "bg-gray-100 text-black border-gray-300 hover:bg-gray-200",
                  },
                ].map((item) => (
                  <a
                    key={item.name}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-between p-2.5 rounded-xl border text-xs font-semibold transition-all ${item.color} cursor-pointer group`}
                  >
                    <div className="flex items-center gap-2.5">
                      <item.icon className="w-4 h-4 shrink-0" />
                      <div>
                        <span className="block text-slate-900 font-bold leading-tight">{item.name}</span>
                        <span className="text-[10px] opacity-75 font-normal block">{item.detail}</span>
                      </div>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Launcher Button */}
        <button
          onClick={() => setIsContactOpen((prev) => !prev)}
          className="w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center shadow-lg shadow-emerald-500/30 transition-all hover:scale-105 active:scale-95 cursor-pointer relative group"
          title="Contact Plaxora Group Support"
          aria-label="Open support options"
        >
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-rose-500 border-2 border-white animate-pulse" />
          {isContactOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <FaWhatsapp className="w-7 h-7" />
          )}
        </button>
      </div>
    </>
  );
}
