import React from "react";
import { Reveal } from "./ui/Reveal";
import { missionData } from "./data";

export default function MissionSection() {
  return (
    <section className="py-24 bg-white font-sans" id="mission">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {missionData.map((mission, index) => (
                    <Reveal delay={index * 0.1} key={index}>
                        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 hover-lift h-full">
                            <div className={`w-14 h-14 ${mission.bg} rounded-2xl flex items-center justify-center mb-6`}>
                                {mission.icon}
                            </div>
                            <h3 className="text-2xl font-bold mb-4 text-slate-900">{mission.title}</h3>
                            <p className="text-slate-500 leading-relaxed">
                                {mission.desc}
                            </p>
                        </div>
                    </Reveal>
                ))}
            </div>
        </div>
    </section>
  );
}
