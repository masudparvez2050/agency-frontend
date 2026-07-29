import React from "react";
import { Reveal } from "./ui/Reveal";
import { valuesData } from "./data";

export default function ValuesSection() {
  return (
    <section className="py-24 bg-slate-50 font-sans" id="values">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal>
                <div className="text-center mb-16">
                    <h3 className="text-3xl font-bold text-slate-900 mb-4">Our Core Values</h3>
                </div>
            </Reveal>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 text-slate-900">
                {valuesData.map((value, index) => (
                    <Reveal delay={(index % 6) * 0.1} key={index}>
                        <div className="bg-white p-6 rounded-2xl text-center border border-slate-200 shadow-sm">
                            {value.icon}
                            <h5 className="font-semibold text-sm whitespace-nowrap">{value.title}</h5>
                        </div>
                    </Reveal>
                ))}
            </div>
        </div>
    </section>
  );
}
