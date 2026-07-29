"use client";
import React, { useState } from "react";
import { Reveal } from "./ui/Reveal";
import { Plus } from "lucide-react";
import { faqData } from "./data";

export default function FaqSection() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <section className="py-24 bg-slate-50 font-sans" id="faq">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal>
                <div className="text-center mb-12">
                    <h3 className="text-3xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h3>
                    <p className="text-slate-500">Everything you need to know about working with us.</p>
                </div>
            </Reveal>

            <div className="space-y-4">
                {faqData.map((faq, index) => (
                    <Reveal key={index} delay={index * 0.1}>
                        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
                            <button 
                              onClick={() => toggleFaq(index)}
                              className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none"
                            >
                                <span className="font-semibold text-slate-900">{faq.q}</span>
                                <Plus className={`w-5 h-5 text-slate-500 transition-transform duration-300 ${activeFaq === index ? 'rotate-45' : ''}`} />
                            </button>
                            <div className={`px-6 text-slate-500 text-sm leading-relaxed border-t border-gray-50 transition-all duration-300 overflow-hidden ${activeFaq === index ? 'pb-5 pt-4 max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                                {faq.a}
                            </div>
                        </div>
                    </Reveal>
                ))}
            </div>
        </div>
    </section>
  );
}
