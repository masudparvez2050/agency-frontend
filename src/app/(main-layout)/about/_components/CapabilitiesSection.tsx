import React from "react";
import { Reveal } from "./ui/Reveal";
import { whatWeBuildData } from "./data";

export default function CapabilitiesSection() {
  return (
    <section className="py-24 bg-slate-50 border-y border-slate-200 font-sans" id="what-we-build">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal>
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-xs font-bold tracking-widest text-violet-600 uppercase mb-2">Capabilities</h2>
                    <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">What We Build</h3>
                    <p className="text-slate-500">A comprehensive suite of engineering and design services to bring your ideas to life.</p>
                </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {whatWeBuildData.map((item, index) => (
                    <Reveal delay={(index % 3) * 0.1} key={index}>
                        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover-lift h-full">
                            {item.icon}
                            <h4 className="text-xl font-bold mb-3 text-slate-900">{item.title}</h4>
                            <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                        </div>
                    </Reveal>
                ))}
            </div>
        </div>
    </section>
  );
}
