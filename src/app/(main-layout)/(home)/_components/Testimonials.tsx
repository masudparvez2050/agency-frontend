"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, MessageSquare, Quote, Sparkles } from "lucide-react";

const TESTIMONIALS = [
  {
    quote: "Plaxora's templates completely changed how we pitch startups. Their Next.js eCommerce template has manual payments built in, saving us hours of integration work. High-quality code and support!",
    author: "Zahin Rahman",
    role: "Lead Software Architect",
    company: "DevsUnited BD",
    rating: 5,
    gradient: "linear-gradient(135deg, #3b82f6, #6366f1)",
  },
  {
    quote: "We commissioned Plaxora for our hospital management dashboard. They delivered a fast, mobile-friendly interface in under 4 weeks. Highly responsive team and excellent project reporting.",
    author: "Dr. K. Mahmood",
    role: "Operations Consultant",
    company: "MedPlus Diagnostics",
    rating: 5,
    gradient: "linear-gradient(135deg, #a855f7, #ec4899)",
  },
  {
    quote: "I bought the Figma UI Kit and the Vortice POS template. Excellent design structure. The manual bKash validation works great on my startup store. 5 stars all the way!",
    author: "Tariqul Islam",
    role: "Freelance UI Developer",
    company: "Tariq Designs",
    rating: 5,
    gradient: "linear-gradient(135deg, #06b6d4, #14b8a6)",
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  const handlePrev = () => {
    setCurrent((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrent((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white via-slate-50/50 to-white border-t border-slate-100 font-sans relative overflow-hidden">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold uppercase tracking-wider mb-3 shadow-2xs">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Customer Testimonials</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight leading-tight">
            Loved By Developers & Clients
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2 font-normal leading-relaxed">
            Read what other engineers and business operations leaders say about their software experience working with Plaxora.
          </p>
        </div>

        {/* Testimonial slider */}
        <div className="relative max-w-4xl mx-auto rounded-[32px] bg-white/95 backdrop-blur-xl border border-slate-200/80 p-8 sm:p-12 shadow-[0_12px_45px_rgba(0,0,0,0.04)] relative overflow-hidden">
          <div className="absolute top-8 right-8 text-blue-500/10 pointer-events-none">
            <Quote className="w-24 h-24 stroke-[2]" />
          </div>

          <div className="relative min-h-[160px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Rating */}
                <div className="flex gap-1.5 bg-amber-50/80 inline-flex px-3 py-1.5 rounded-full border border-amber-200/60">
                  {[...Array(TESTIMONIALS[current].rating)].map((_, idx) => (
                    <Star key={idx} className="w-4 h-4 fill-amber-500 text-amber-500" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal italic">
                  &ldquo;{TESTIMONIALS[current].quote}&rdquo;
                </p>

                {/* Author Info */}
                <div className="flex items-center gap-4 pt-5 border-t border-slate-100">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-extrabold text-base shadow-sm shrink-0"
                    style={{ background: TESTIMONIALS[current].gradient }}
                  >
                    {TESTIMONIALS[current].author[0]}
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-base text-slate-900 leading-snug">{TESTIMONIALS[current].author}</h4>
                    <p className="text-xs text-slate-500 font-semibold mt-0.5">
                      {TESTIMONIALS[current].role} — <span className="text-blue-600 font-bold">{TESTIMONIALS[current].company}</span>
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-3 justify-end mt-6 pt-4 border-t border-slate-100">
            <span className="text-xs font-mono font-bold text-slate-400 mr-2">
              {current + 1} / {TESTIMONIALS.length}
            </span>
            <button
              onClick={handlePrev}
              className="p-2.5 rounded-full bg-slate-100/80 hover:bg-blue-600 hover:text-white border border-slate-200/80 text-slate-700 transition-all duration-200 cursor-pointer shadow-2xs"
              aria-label="Previous Testimonial"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className="p-2.5 rounded-full bg-slate-100/80 hover:bg-blue-600 hover:text-white border border-slate-200/80 text-slate-700 transition-all duration-200 cursor-pointer shadow-2xs"
              aria-label="Next Testimonial"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
