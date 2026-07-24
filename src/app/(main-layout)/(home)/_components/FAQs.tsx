"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, ChevronDown, Sparkles } from "lucide-react";

const FAQ_ITEMS = [
  {
    question: "How does the manual payment system work?",
    answer: "During checkout, you will choose bKash, Nagad, or Rocket and see our corresponding payment number. Send the price of the product to that number, copy the Transaction ID (TxnID) from your payment confirmation SMS, and submit it along with your sending phone number. Our Admin CMS verifies the transaction and unlocks the zip files for download on your dashboard.",
  },
  {
    question: "Can I request custom adjustments on a template I bought?",
    answer: "Yes, you can! You can submit a support ticket from your User Dashboard or fill out the Contact form describing the changes you need. Depending on the complexity, our developers will estimate a custom modification hourly rate or project fee.",
  },
  {
    question: "Are the app store applications free of tracking and ads?",
    answer: "Absolutely. A core principle of Plaxora is engineering clean software. All of our App Store releases (mobile apps, desktop utility tools, CLI scripts) are ad-free, data-secure, and contain no trackers.",
  },
  {
    question: "How long does a bespoke web or mobile app development project take?",
    answer: "Standard landing pages are delivered in under 7 days. Complex bespoke SaaS or cross-platform Flutter mobile applications generally take between 3 to 6 weeks, depending on data synchronization layers and Admin CMS requirements.",
  },
  {
    question: "What is the refund policy for templates and assets?",
    answer: "Because templates are delivered as zip files containing raw source code, we generally do not offer refunds once the files are unlocked for download. However, if your transaction has been verified but you encounter building errors, our support team will assist you to get it running.",
  },
];

export default function FAQs() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-slate-50/50 via-white to-slate-50/50 border-t border-slate-100 font-sans relative overflow-hidden">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-blue-200/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold uppercase tracking-wider mb-3 shadow-2xs">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Support & Help</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight leading-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2 font-normal leading-relaxed">
            Got questions about our digital products, manual transaction validation, or custom contract services? We have answers.
          </p>
        </div>

        {/* FAQs list */}
        <div className="max-w-3xl mx-auto space-y-3.5">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-[22px] bg-white/95 backdrop-blur-xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? "border-blue-400/60 shadow-[0_10px_30px_rgba(37,99,235,0.08)] ring-1 ring-blue-500/20"
                    : "border-slate-200/80 hover:border-slate-300 shadow-[0_4px_16px_rgba(0,0,0,0.02)]"
                }`}
              >
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left font-heading font-bold text-slate-900 hover:text-blue-600 transition-colors cursor-pointer"
                >
                  <span className="text-sm sm:text-base leading-snug">{item.question}</span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ml-4 transition-all duration-300 ${
                    isOpen ? "bg-blue-600 text-white rotate-180 shadow-sm" : "bg-slate-100/80 text-slate-500"
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden border-t border-slate-100 bg-slate-50/50"
                    >
                      <div className="p-5 sm:p-6 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
