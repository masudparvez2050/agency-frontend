import React from "react";
import { Reveal } from "./ui/Reveal";
import { whyUsData } from "./data";

export default function WhyUsSection() {
  return (
    <section className="py-24 bg-white font-sans" id="why-us">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal>
                <div className="flex flex-col md:flex-row gap-12 items-end mb-16">
                    <div className="flex-1">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Why Businesses Choose Us</h2>
                        <p className="text-slate-500 text-lg max-w-xl">We don't just write code; we build partnerships. Our approach is focused on long-term success, security, and scalability.</p>
                    </div>
                </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-slate-900">
                {whyUsData.map((item, index) => (
                    <Reveal delay={(index % 3) * 0.1} key={index}>
                        <div className="flex gap-4">
                            <div className="flex-shrink-0 mt-1">
                                <div className={`w-10 h-10 rounded-full ${item.bg} flex items-center justify-center`}>
                                    {item.icon}
                                </div>
                            </div>
                            <div>
                                <h4 className="text-lg font-bold mb-2">{item.title}</h4>
                                <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        </div>
                    </Reveal>
                ))}
            </div>
        </div>
    </section>
  );
}
