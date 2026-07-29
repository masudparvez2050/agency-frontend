"use client";
import React from "react";
import { Reveal } from "./ui/Reveal";
import { Counter } from "./ui/Counter";
import { statsData } from "./data";

export default function StatsSection() {
  return (
    <section className="py-20 bg-slate-50 border-y border-slate-200 font-sans" id="stats">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 text-center" id="counter-section">
                {statsData.map((stat, index) => (
                    <Reveal delay={(index % 6) * 0.1} key={index}>
                        <div className="text-4xl font-extrabold text-slate-900 mb-2">
                            <Counter target={stat.target} />{stat.suffix}
                        </div>
                        <div className="text-sm font-medium text-slate-500">{stat.text}</div>
                    </Reveal>
                ))}
            </div>
        </div>
    </section>
  );
}
