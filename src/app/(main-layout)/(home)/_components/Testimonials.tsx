"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, MessageSquare, Quote } from "lucide-react";

const TESTIMONIALS = [
  {
    quote: "Plaxora's templates completely changed how we pitch startups. Their Next.js eCommerce template has manual payments built in, saving us hours of integration work. High-quality code and support!",
    author: "Zahin Rahman",
    role: "Lead Software Architect",
    company: "DevsUnited BD",
    rating: 5,
    avatarGradient: "from-purple-500 to-indigo-500",
  },
  {
    quote: "We commissioned Plaxora for our hospital management dashboard. They delivered a fast, mobile-friendly interface in under 4 weeks. Highly responsive team and excellent project reporting.",
    author: "Dr. K. Mahmood",
    role: "Operations Consultant",
    company: "MedPlus Diagnostics",
    rating: 5,
    avatarGradient: "from-cyan-500 to-blue-500",
  },
  {
    quote: "I bought the Figma UI Kit and the Vortice POS template. Excellent design structure. The manual bKash validation works great on my startup store. 5 stars all the way!",
    author: "Tariqul Islam",
    role: "Freelance UI Developer",
    company: "Tariq Designs",
    rating: 5,
    avatarGradient: "from-pink-500 to-rose-500",
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
    <section className="py-24 relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-purple-500/5 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-xs font-bold text-purple-700 mb-4">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Customer Testimonials</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4">
            Loved By Developers & Clients
          </h2>
          <p className="text-slate-600 font-medium">
            Read what other engineers and business operations leaders say about their software experience working with Plaxora.
          </p>
        </div>

        {/* Testimonial slider */}
        <div className="relative max-w-4xl mx-auto rounded-2xl bg-white border border-slate-200/80 p-8 md:p-12 shadow-xl shadow-slate-200/40 hover:border-purple-300 transition-all">
          <div className="absolute top-8 right-8 text-purple-600/10 pointer-events-none">
            <Quote className="w-24 h-24 stroke-[4]" />
          </div>

          <div className="relative min-h-[180px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Rating */}
                <div className="flex gap-1">
                  {[...Array(TESTIMONIALS[current].rating)].map((_, idx) => (
                    <Star key={idx} className="w-4.5 h-4.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-base md:text-lg text-slate-700 leading-relaxed italic font-medium">
                  &ldquo;{TESTIMONIALS[current].quote}&rdquo;
                </p>

                {/* Author Info */}
                <div className="flex items-center gap-4 pt-4 border-t border-slate-200">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-tr ${TESTIMONIALS[current].avatarGradient} flex items-center justify-center text-white font-black text-lg shadow-sm`}>
                    {TESTIMONIALS[current].author[0]}
                  </div>
                  <div>
                    <h4 className="text-sm font-extrabold text-slate-900">{TESTIMONIALS[current].author}</h4>
                    <p className="text-xs text-slate-500 font-medium">
                      {TESTIMONIALS[current].role} — <span className="text-purple-700 font-bold">{TESTIMONIALS[current].company}</span>
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="flex gap-2 justify-end mt-8">
            <button
              onClick={handlePrev}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-600 hover:text-slate-900 transition-colors"
              aria-label="Previous Testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-600 hover:text-slate-900 transition-colors"
              aria-label="Next Testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
