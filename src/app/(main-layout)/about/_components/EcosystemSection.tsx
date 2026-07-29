import React from "react";
import { Reveal } from "./ui/Reveal";
import { Layers, Braces, Smartphone, Layout, Cloud, TerminalSquare, Briefcase, PackageOpen, Database } from "lucide-react";

const orbitNodes = [
  { icon: <Braces className="text-blue-600 w-4 h-4 md:w-5 md:h-5 mb-1" />, label: "Software", top: "10%", left: "50%" },
  { icon: <Smartphone className="text-violet-600 w-4 h-4 md:w-5 md:h-5 mb-1" />, label: "Apps", top: "22%", left: "78%" },
  { icon: <Layout className="text-violet-500 w-4 h-4 md:w-5 md:h-5 mb-1" />, label: "Templates", top: "50%", left: "90%" },
  { icon: <Cloud className="text-blue-500 w-4 h-4 md:w-5 md:h-5 mb-1" />, label: "SaaS", top: "78%", left: "78%" },
  { icon: <TerminalSquare className="text-purple-500 w-4 h-4 md:w-5 md:h-5 mb-1" />, label: "Dev Tools", top: "90%", left: "50%" },
  { icon: <Briefcase className="text-indigo-500 w-4 h-4 md:w-5 md:h-5 mb-1" />, label: "Solutions", top: "78%", left: "22%" },
  { icon: <PackageOpen className="text-pink-500 w-4 h-4 md:w-5 md:h-5 mb-1" />, label: "Products", top: "50%", left: "10%" },
  { icon: <Database className="text-teal-500 w-4 h-4 md:w-5 md:h-5 mb-1" />, label: "Data", top: "22%", left: "22%" }
];

export default function EcosystemSection() {
  return (
    <section className="py-32 bg-white overflow-hidden relative font-sans" id="ecosystem">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal>
                <div className="text-center max-w-2xl mx-auto mb-20">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">The Plaxora Ecosystem</h2>
                    <p className="text-slate-500">Everything we do is interconnected. We build tools that support our software, and software that scales our tools.</p>
                </div>
            </Reveal>

            <Reveal scale={true}>
                <div className="relative w-full max-w-[360px] md:max-w-xl lg:max-w-2xl mx-auto aspect-square mt-8 md:mt-0">
                    
                    {/* Central Node */}
                    <div className="absolute z-20 w-28 h-28 md:w-40 md:h-40 bg-white rounded-full shadow-glow flex flex-col items-center justify-center border-4 border-blue-50 top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2">
                        <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-blue-600 to-violet-600 rounded-xl flex items-center justify-center mb-1 md:mb-2 shadow-sm">
                            <Layers className="text-white w-4 h-4 md:w-6 md:h-6" />
                        </div>
                        <span className="font-bold text-[11px] md:text-sm text-slate-900 text-center leading-tight">Plaxora Group</span>
                    </div>

                    {/* Orbit Nodes Wrapper for Animation */}
                    <div className="absolute inset-0 z-10 animate-spin-slow pointer-events-none">
                        {orbitNodes.map((node, idx) => (
                            <div key={idx} className={`absolute top-[${node.top}] left-[${node.left}] -translate-x-1/2 -translate-y-1/2 pointer-events-auto`} style={{ top: node.top, left: node.left }}>
                                <div className="w-20 h-20 md:w-24 md:h-24 bg-slate-50 rounded-full shadow-md border border-slate-200 flex flex-col items-center justify-center text-slate-900 animate-spin-reverse-slow shadow-sm hover:shadow-lg transition-shadow">
                                    {node.icon}
                                    <span className="text-[10px] md:text-xs font-semibold text-center leading-tight">{node.label}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <svg className="absolute inset-0 w-full h-full z-0 opacity-20 pointer-events-none" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="40" fill="none" stroke="#6B7280" strokeWidth="0.5" strokeDasharray="2 2" className="animate-spin-slow"></circle>
                        <circle cx="50" cy="50" r="24" fill="none" stroke="#2563EB" strokeWidth="0.5" strokeDasharray="1 3" className="animate-spin-slow" style={{ animationDirection: 'reverse' }}></circle>
                    </svg>
                </div>
            </Reveal>
        </div>
    </section>
  );
}
