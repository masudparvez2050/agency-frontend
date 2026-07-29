"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Reveal } from "./ui/Reveal";
import { storyData } from "./data";

export default function StorySection() {
  const storyRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: storyRef,
    offset: ["start center", "end center"]
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="py-24 bg-slate-50 relative font-sans" id="story">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal>
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-xs font-bold tracking-widest text-blue-600 uppercase mb-2">Our Journey</h2>
                    <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">The Plaxora Story</h3>
                    <p className="text-slate-500">A timeline of our evolution from a small team to a global technology group.</p>
                </div>
            </Reveal>

            <div className="relative max-w-4xl mx-auto" ref={storyRef}>
                {/* Center Line for Desktop & Mobile (Background) */}
                <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-slate-200 rounded-full"></div>

                {/* Active Progress Line */}
                <motion.div 
                  className="absolute left-4 md:left-1/2 transform -translate-x-1/2 w-0.5 bg-gradient-to-b from-blue-600 via-violet-500 to-purple-600 origin-top z-0 rounded-full"
                  style={{ height: lineHeight }}
                ></motion.div>

                <div className="space-y-12 relative z-10">
                    {storyData.map((item, index) => {
                        const isEven = index % 2 === 0;
                        const directionClass = isEven ? "md:flex-row-reverse" : "";
                        const paddingClass = isEven ? "md:pr-12" : "md:pl-12";

                        return (
                            <Reveal delay={index * 0.1} key={index}>
                                <div className={`relative flex items-center justify-between ${directionClass} group`}>
                                    <div className="hidden md:block w-1/2"></div>
                                    <div className={`absolute left-4 md:left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-white border-4 ${item.dotBorder} z-10 timeline-dot group-hover:scale-125 transition-transform duration-300 flex items-center justify-center`}></div>
                                    <div className={`w-full md:w-1/2 pl-14 md:pl-0 ${paddingClass}`}>
                                        <div className={`bg-white p-6 rounded-2xl shadow-sm border border-slate-200 transition-all duration-500 group-hover:shadow-xl group-hover:-translate-y-1 ${item.hoverBorder} relative overflow-hidden`}>
                                            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${item.gradientFrom} ${item.gradientTo} rounded-full filter blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700 translate-x-10 -translate-y-10 group-hover:translate-x-0 group-hover:translate-y-0 z-0`}></div>
                                            <div className="relative z-10">
                                                <span className={`${item.textClass} font-bold text-sm mb-2 block`}>{item.year}</span>
                                                <h4 className="text-xl font-bold mb-2 text-slate-900">{item.title}</h4>
                                                <p className="text-slate-500 text-sm">{item.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Reveal>
                        );
                    })}
                </div>
            </div>
        </div>
    </section>
  );
}
