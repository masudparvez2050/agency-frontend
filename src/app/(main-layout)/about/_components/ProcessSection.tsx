import React from "react";
import { Reveal } from "./ui/Reveal";
import { ArrowRight } from "lucide-react";

const processSteps = [
  { num: 1, title: "Discover", desc: "Research & gather", hoverBg: "group-hover:bg-blue-600", hoverText: "group-hover:text-blue-400", hoverBorder: "group-hover:border-blue-400", shadowStr: "group-hover:shadow-[0_0_30px_rgba(37,99,235,0.6)]" },
  { num: 2, title: "Plan", desc: "Architecture & scope", hoverBg: "group-hover:bg-blue-500", hoverText: "group-hover:text-blue-400", hoverBorder: "group-hover:border-blue-300", shadowStr: "group-hover:shadow-[0_0_30px_rgba(59,130,246,0.6)]" },
  { num: 3, title: "Design", desc: "UI/UX & wireframes", hoverBg: "group-hover:bg-indigo-500", hoverText: "group-hover:text-indigo-400", hoverBorder: "group-hover:border-indigo-300", shadowStr: "group-hover:shadow-[0_0_30px_rgba(99,102,241,0.6)]" },
  { num: 4, title: "Develop", desc: "Code & build", hoverBg: "group-hover:bg-violet-600", hoverText: "group-hover:text-violet-400", hoverBorder: "group-hover:border-violet-400", shadowStr: "group-hover:shadow-[0_0_30px_rgba(124,58,237,0.6)]" },
  { num: 5, title: "Test", desc: "QA & optimization", hoverBg: "group-hover:bg-purple-500", hoverText: "group-hover:text-purple-400", hoverBorder: "group-hover:border-purple-300", shadowStr: "group-hover:shadow-[0_0_30px_rgba(168,85,247,0.6)]" },
  { num: 6, title: "Launch", desc: "Deployment & release", hoverBg: "group-hover:bg-pink-500", hoverText: "group-hover:text-pink-400", hoverBorder: "group-hover:border-pink-300", shadowStr: "group-hover:shadow-[0_0_30px_rgba(236,72,153,0.6)]" },
  { num: 7, title: "Support", desc: "Maintain & scale", hoverBg: "group-hover:bg-rose-500", hoverText: "group-hover:text-rose-400", hoverBorder: "group-hover:border-rose-300", shadowStr: "group-hover:shadow-[0_0_30px_rgba(244,63,94,0.6)]" }
];

export default function ProcessSection() {
  return (
    <section className="py-24 bg-gray-900 text-white relative overflow-hidden font-sans" id="process">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full mix-blend-screen filter blur-[100px]"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-violet-600/20 rounded-full mix-blend-screen filter blur-[100px]"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <Reveal>
                <div className="mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Methodology</h2>
                    <p className="text-gray-400 max-w-2xl">A proven, systematic approach to turning complex requirements into elegant, functional software.</p>
                </div>
            </Reveal>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-y-10 gap-x-4 md:gap-4 lg:gap-2">
                {processSteps.map((step, index) => (
                    <React.Fragment key={index}>
                        <Reveal delay={(index % 4) * 0.1}>
                            <div className="flex flex-col items-center text-center group cursor-pointer">
                                <div 
                                    className={`w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center mb-4 text-gray-400 font-bold text-lg group-hover:scale-110 ${step.hoverBg} group-hover:text-white ${step.hoverBorder} ${step.shadowStr} transition-all duration-300 relative`}
                                >
                                    {step.num}
                                </div>
                                <h4 className={`text-sm font-semibold mb-2 ${step.hoverText} transition-colors`}>{step.title}</h4>
                                <p className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors">{step.desc}</p>
                            </div>
                        </Reveal>
                        
                        {index < processSteps.length - 1 && (
                            <div className="hidden lg:flex items-center justify-center text-white/30">
                                <Reveal delay={(index % 4) * 0.1}><ArrowRight className="w-5 h-5" /></Reveal>
                            </div>
                        )}
                    </React.Fragment>
                ))}
            </div>
        </div>
    </section>
  );
}
