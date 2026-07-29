import React from "react";
import { Reveal } from "./ui/Reveal";
import { FaLinkedin, FaGithub, FaDribbble } from "react-icons/fa6";

const teamData = [
  {
    name: "Alex Carter",
    role: "Founder & CEO",
    roleColor: "text-blue-600",
    desc: "Visionary leader driving product strategy and company growth with 10+ years in tech.",
    avatar: "https://ui-avatars.com/api/?name=Alex+Carter&background=2563EB&color=fff&size=256&font-size=0.33&rounded=true",
    links: [
      { icon: <FaLinkedin className="w-5 h-5" />, url: "#" },
      { icon: <FaGithub className="w-5 h-5" />, url: "#" }
    ]
  },
  {
    name: "Sarah Chen",
    role: "Lead Software Engineer",
    roleColor: "text-violet-600",
    desc: "Full-stack expert specializing in scalable microservices and React architecture.",
    avatar: "https://ui-avatars.com/api/?name=Sarah+Chen&background=7C3AED&color=fff&size=256&font-size=0.33&rounded=true",
    links: [
      { icon: <FaLinkedin className="w-5 h-5" />, url: "#" },
      { icon: <FaGithub className="w-5 h-5" />, url: "#" }
    ]
  },
  {
    name: "Marcus Doe",
    role: "Principal UI/UX Designer",
    roleColor: "text-violet-500",
    desc: "Award-winning designer focused on creating intuitive, accessible, and beautiful interfaces.",
    avatar: "https://ui-avatars.com/api/?name=Marcus+Doe&background=8B5CF6&color=fff&size=256&font-size=0.33&rounded=true",
    links: [
      { icon: <FaLinkedin className="w-5 h-5" />, url: "#" },
      { icon: <FaDribbble className="w-5 h-5" />, url: "#" }
    ]
  },
  {
    name: "Elena Rios",
    role: "Sr. Cloud Architect",
    roleColor: "text-green-600",
    desc: "AWS certified specialist ensuring our infrastructure is secure, fast, and always online.",
    avatar: "https://ui-avatars.com/api/?name=Elena+Rios&background=10B981&color=fff&size=256&font-size=0.33&rounded=true",
    links: [
      { icon: <FaLinkedin className="w-5 h-5" />, url: "#" },
      { icon: <FaGithub className="w-5 h-5" />, url: "#" }
    ]
  }
];

export default function TeamSection() {
  return (
    <section className="py-24 bg-white font-sans" id="team">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal>
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Meet the Minds Behind Plaxora</h3>
                    <p className="text-slate-500">A collective of engineers, designers, and strategists passionate about building the future.</p>
                </div>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {teamData.map((member, index) => (
                    <Reveal delay={index * 0.1} key={index}>
                        <div className="bg-slate-50 rounded-3xl p-6 border border-slate-200 text-center hover-lift h-full flex flex-col">
                            <img src={member.avatar} alt={member.name} className="w-24 h-24 rounded-full mx-auto mb-4 shadow-md border-4 border-white" />
                            <h4 className="text-lg font-bold text-slate-900">{member.name}</h4>
                            <p className={`${member.roleColor} text-sm font-medium mb-3`}>{member.role}</p>
                            <p className="text-slate-500 text-xs mb-6 line-clamp-3 flex-grow">{member.desc}</p>
                            <div className="flex justify-center space-x-3">
                                {member.links.map((link, i) => (
                                    <a key={i} href={link.url} className="text-gray-400 hover:text-slate-900 transition-colors">
                                        {link.icon}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </Reveal>
                ))}
            </div>
        </div>
    </section>
  );
}
