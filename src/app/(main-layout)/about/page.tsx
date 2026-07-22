"use client";

import React from "react";
import { TEAM_MEMBERS, COMPANY_VALUES } from "@/lib/about-data";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ShieldCheck, FileCode, CheckCircle2, Globe, 
  Users, Layers, Download, CheckCircle, ArrowRight 
} from "lucide-react";
import { FaGithub } from "react-icons/fa6";

const ValueIcon = ({ name, className }: { name: string; className?: string }) => {
  switch (name) {
    case "ShieldAlert":
      return <ShieldCheck className={className} />;
    case "FileCode":
      return <FileCode className={className} />;
    case "CheckCircle":
      return <CheckCircle2 className={className} />;
    case "Globe":
      return <Globe className={className} />;
    default:
      return <ShieldCheck className={className} />;
  }
};

import { usePageCMS } from "@/hooks/usePageCMS";

export default function AboutPage() {
  const [pageConfig] = usePageCMS();

  return (
    <div className="min-h-screen pt-32 pb-24 overflow-hidden relative">
      {/* Glow Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-purple-500/5 blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-cyan-500/5 blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10 space-y-24">
        
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-extrabold text-purple-700 uppercase tracking-widest mb-3 block">Our Mission</span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 mb-4 leading-tight">
            {pageConfig.about.hero.title}
          </h1>
          <p className="text-slate-600 font-medium">
            {pageConfig.about.hero.subtitle}
          </p>
        </div>

        {/* Company Core Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto">
          {[
            { label: "Client systems served", value: "120+", icon: Users, color: "text-purple-700 bg-purple-50 border-purple-100" },
            { label: "Template assets released", value: "15+", icon: Layers, color: "text-cyan-700 bg-cyan-50 border-cyan-100" },
            { label: "App downloads", value: "250K+", icon: Download, color: "text-amber-700 bg-amber-50 border-amber-100" },
            { label: "Support tickets resolved", value: "99.8%", icon: CheckCircle, color: "text-emerald-700 bg-emerald-50 border-emerald-100" },
          ].map((stat, i) => (
            <div key={i} className="p-6 rounded-2xl bg-white border border-slate-200/80 flex items-center justify-between shadow-md">
              <div>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  {stat.label}
                </span>
                <span className="text-xl md:text-2xl font-black text-slate-900">{stat.value}</span>
              </div>
              <div className={`p-3 rounded-xl border ${stat.color}`}>
                <stat.icon className="w-5 h-5 shrink-0" />
              </div>
            </div>
          ))}
        </div>

        {/* Value Pillars List */}
        <div className="space-y-12">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h2 className="text-2xl md:text-3xl font-black text-slate-900">Our Core Value Pillars</h2>
            <p className="text-xs text-slate-600 font-medium">
              We operate on principles of privacy, clean software codes, manual verifications, and community guidelines.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {COMPANY_VALUES.map((val, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white border border-slate-200/80 flex gap-4 items-start shadow-sm hover:border-purple-300 transition-colors"
              >
                <div className="p-3 rounded-xl bg-purple-50 border border-purple-100 text-purple-700 shrink-0">
                  <ValueIcon name={val.iconName} className="w-5 h-5" />
                </div>
                <div className="space-y-1.5">
                  <h4 className="text-base font-bold text-slate-900">{val.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    {val.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Members Section */}
        <div className="space-y-12">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h2 className="text-2xl md:text-3xl font-black text-slate-900">Meet Our Engineers</h2>
            <p className="text-xs text-slate-600 font-medium">
              The designers, developers, and DB architects driving our software ecosystem forward.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto items-stretch">
            {TEAM_MEMBERS.map((member, idx) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="group relative rounded-2xl bg-white border border-slate-200/80 p-6 overflow-hidden flex flex-col justify-between hover:border-purple-300 transition-all duration-300 shadow-md hover:shadow-xl hover:shadow-purple-500/5 text-center"
              >
                {/* Visual Top border glow */}
                <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-purple-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="space-y-6">
                  {/* Round avatar container with gradient border */}
                  <div className={`w-20 h-20 rounded-full bg-gradient-to-tr ${member.accent} p-[1.5px] flex items-center justify-center mx-auto shadow-sm`}>
                    <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center font-black text-xl text-white">
                      {member.avatarInitials}
                    </div>
                  </div>

                  {/* Name and role */}
                  <div className="space-y-1">
                    <h4 className="text-lg font-bold text-slate-900 group-hover:text-purple-700 transition-colors">
                      {member.name}
                    </h4>
                    <span className="text-[10px] font-bold text-purple-700 uppercase tracking-widest block">
                      {member.role}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    {member.bio}
                  </p>
                </div>

                <div>
                  <div className="w-full h-[1px] bg-slate-200 my-6" />

                  {/* Github profile link */}
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-purple-700 transition-colors cursor-pointer"
                  >
                    <FaGithub className="w-4 h-4 shrink-0" />
                    <span>Developer Profile</span>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Join Us / Careers CTA */}
        <div className="p-8 rounded-3xl bg-white border border-slate-200/80 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-xl shadow-slate-200/50 relative overflow-hidden max-w-5xl mx-auto">
          <div className="absolute top-0 right-0 w-40 h-40 bg-purple-500/5 blur-2xl rounded-full" />
          <div className="space-y-2 relative z-10 max-w-xl">
            <h3 className="text-2xl font-black text-slate-900">Want to join Plaxora team?</h3>
            <p className="text-sm text-slate-600 leading-relaxed font-medium">
              We are always searching for talented Next.js developers, Flutter compilers, and database architects. Check our active job openings inside our careers board.
            </p>
          </div>
          <Link
            href="/careers"
            className="flex items-center gap-1.5 px-6 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-xs font-bold text-white transition-all shadow-md shrink-0 relative z-10"
          >
            <span>Browse Careers</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}
