import React from "react";
import { Reveal } from "./ui/Reveal";
import { FileCode2, FileJson, Code2, Atom, Triangle, Hexagon, Database, Flame, Smartphone, Box, Cloud, Wind, PenTool } from "lucide-react";
import { FaGithub } from "react-icons/fa6";

const techStackData = [
  { icon: <FileCode2 className="w-8 h-8 text-orange-500 mb-2" />, title: "HTML/CSS" },
  { icon: <FileJson className="w-8 h-8 text-yellow-400 mb-2" />, title: "JavaScript" },
  { icon: <Code2 className="w-8 h-8 text-blue-500 mb-2" />, title: "TypeScript" },
  { icon: <Atom className="w-8 h-8 text-cyan-400 mb-2" />, title: "React" },
  { icon: <Triangle className="w-8 h-8 text-black mb-2 fill-black" />, title: "Next.js" },
  { icon: <Hexagon className="w-8 h-8 text-green-500 mb-2" />, title: "Node.js" },
  { icon: <Database className="w-8 h-8 text-blue-400 mb-2" />, title: "PostgreSQL" },
  { icon: <Flame className="w-8 h-8 text-orange-400 mb-2" />, title: "Firebase" },
  { icon: <Smartphone className="w-8 h-8 text-blue-400 mb-2" />, title: "Flutter" },
  { icon: <Box className="w-8 h-8 text-blue-600 mb-2" />, title: "Docker" },
  { icon: <FaGithub className="w-8 h-8 text-gray-800 mb-2" />, title: "GitHub" },
  { icon: <Cloud className="w-8 h-8 text-yellow-500 mb-2" />, title: "AWS / GCP" },
  { icon: <Wind className="w-8 h-8 text-cyan-500 mb-2" />, title: "Tailwind CSS" },
  { icon: <PenTool className="w-8 h-8 text-purple-500 mb-2" />, title: "Figma" }
];

export default function TechStackSection() {
  return (
    <section className="py-24 bg-slate-50 font-sans" id="tech-stack">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal>
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h3 className="text-3xl font-bold text-slate-900 mb-4">Modern Technology Stack</h3>
                    <p className="text-slate-500">We use industry-leading tools and frameworks to ensure performance, security, and scalability.</p>
                </div>
            </Reveal>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 text-slate-900">
                {techStackData.map((tech, index) => (
                    <Reveal key={index} delay={(index % 7) * 0.1}>
                        <div className="bg-white py-6 px-4 rounded-2xl border border-slate-200 flex flex-col items-center justify-center hover:border-blue-600 transition-colors shadow-sm">
                            {tech.icon}
                            <span className="text-sm font-medium">{tech.title}</span>
                        </div>
                    </Reveal>
                ))}
            </div>
        </div>
    </section>
  );
}
