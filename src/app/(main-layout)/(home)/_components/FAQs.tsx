"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, ChevronDown } from "lucide-react";

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
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-transparent border-t border-slate-900/60 relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600/5 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-semibold text-cyan-300 mb-4">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Support & Help</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-400">
            Got questions about our digital products, manual transaction validation, or custom contract services? We have answers.
          </p>
        </div>

        {/* FAQs list */}
        <div className="max-w-3xl mx-auto space-y-4">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-slate-950 border border-slate-900 overflow-hidden hover:border-slate-800 transition-colors"
              >
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full flex items-center justify-between p-6 text-left font-bold text-white hover:text-purple-400 transition-colors"
                >
                  <span className="text-sm md:text-base leading-snug">{item.question}</span>
                  <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform duration-300 ${isOpen ? "rotate-180 text-purple-400" : ""}`} />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden border-t border-slate-900/60 bg-slate-950/40"
                    >
                      <div className="p-6 text-sm text-slate-400 leading-relaxed border-t border-slate-900">
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
