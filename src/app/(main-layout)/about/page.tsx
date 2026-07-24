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
    <div className="min-h-screen pt-28 pb-24 overflow-hidden relative bg-gradient-to-b from-white via-slate-50/50 to-white font-sans">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-200/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-200/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-20">
        
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-50 border border-purple-100 text-purple-600 text-xs font-bold uppercase tracking-wider mb-3 shadow-2xs">
            <Users className="w-3.5 h-3.5" />
            <span>{pageConfig.about.hero.badge || "Our Mission"}</span>
          </div>
          <h1 className="font-heading font-extrabold text-4xl md:text-5xl tracking-tight text-slate-900 leading-tight mb-3">
            {pageConfig.about.hero.title || "Pioneering Bangladesh's Premier Digital Product Ecosystem"}
          </h1>
          <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
            {pageConfig.about.hero.subtitle || "We build, maintain, and support high-quality website templates, native mobile apps, SaaS tools, and bespoke software solutions."}
          </p>
        </div>

        {/* Company Core Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto">
          {[
            { label: "Client systems served", value: "120+", icon: Users, color: "text-purple-600 bg-purple-50 border-purple-100" },
            { label: "Template assets released", value: "15+", icon: Layers, color: "text-blue-600 bg-blue-50 border-blue-100" },
            { label: "App downloads", value: "250K+", icon: Download, color: "text-amber-600 bg-amber-50 border-amber-100" },
            { label: "Support tickets resolved", value: "99.8%", icon: CheckCircle, color: "text-emerald-600 bg-emerald-50 border-emerald-100" },
          ].map((stat, i) => (
            <div
              key={i}
              className="p-6 sm:p-7 rounded-[28px] bg-white/95 backdrop-blur-xl border border-slate-200/80 hover:border-purple-300/80 shadow-[0_10px_35px_rgba(0,0,0,0.03)] transition-all duration-300 hover:-translate-y-1 flex items-center justify-between group"
            >
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  {stat.label}
                </span>
                <span className="font-heading font-extrabold text-2xl md:text-3xl text-slate-900">{stat.value}</span>
              </div>
              <div className={`p-3.5 rounded-2xl border ${stat.color} group-hover:scale-105 transition-transform`}>
                <stat.icon className="w-5 h-5 shrink-0" />
              </div>
            </div>
          ))}
        </div>

        {/* Value Pillars List */}
        <div className="space-y-10">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h2 className="font-heading font-extrabold text-2xl md:text-3xl text-slate-900">Our Core Value Pillars</h2>
            <p className="text-xs sm:text-sm text-slate-600 font-normal">
              We operate on principles of privacy, clean software codes, manual verifications, and community guidelines.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {COMPANY_VALUES.map((val, idx) => (
              <div
                key={idx}
                className="p-7 rounded-[28px] bg-white/95 backdrop-blur-xl border border-slate-200/80 hover:border-purple-400/50 shadow-[0_10px_35px_rgba(0,0,0,0.03)] hover:-translate-y-1 transition-all duration-300 flex gap-4 items-start group"
              >
                <div className="p-3.5 rounded-2xl bg-purple-50 border border-purple-100 text-purple-600 shrink-0 group-hover:scale-105 transition-transform">
                  <ValueIcon name={val.iconName} className="w-5 h-5" />
                </div>
                <div className="space-y-1.5">
                  <h4 className="font-heading font-bold text-lg text-slate-900 group-hover:text-purple-600 transition-colors">{val.title}</h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    {val.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Members Section */}
        <div className="space-y-10">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h2 className="font-heading font-extrabold text-2xl md:text-3xl text-slate-900">Meet Our Engineers</h2>
            <p className="text-xs sm:text-sm text-slate-600 font-normal">
              The designers, developers, and DB architects driving our software ecosystem forward.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto items-stretch">
            {TEAM_MEMBERS.map((member, idx) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="bg-white/95 backdrop-blur-xl rounded-[28px] border border-slate-200/80 p-7 overflow-hidden flex flex-col justify-between hover:border-purple-400/50 shadow-[0_10px_35px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_50px_rgba(147,51,234,0.12)] hover:-translate-y-1 transition-all duration-300 text-center group"
              >
                <div className="space-y-6">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-purple-600 to-blue-600 p-1 flex items-center justify-center mx-auto shadow-md group-hover:scale-105 transition-transform duration-300">
                    <div className="w-full h-full bg-slate-950 rounded-full flex items-center justify-center font-bold text-xl text-white font-heading">
                      {member.avatarInitials}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <h4 className="font-heading font-extrabold text-lg text-slate-900 group-hover:text-purple-600 transition-colors">
                      {member.name}
                    </h4>
                    <span className="text-[10px] font-bold text-purple-600 uppercase tracking-wider block">
                      {member.role}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    {member.bio}
                  </p>
                </div>

                <div>
                  <div className="w-full h-[1px] bg-slate-100 my-6" />

                  <a
                    href={member.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100/80 hover:bg-purple-600 hover:text-white text-xs font-bold text-slate-700 transition-all duration-200 cursor-pointer border border-slate-200/70"
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
        <div className="p-8 sm:p-10 rounded-[32px] bg-gradient-to-r from-slate-900 via-purple-950 to-slate-900 text-white border border-purple-800/40 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-2xl max-w-5xl mx-auto relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-2 max-w-xl relative z-10">
            <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-white">Want to join Plaxora team?</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
              We are always searching for talented Next.js developers, Flutter compilers, and database architects. Check our active job openings inside our careers board.
            </p>
          </div>
          <Link
            href="/careers"
            className="flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-white hover:bg-purple-50 text-slate-900 font-bold text-xs transition-all shadow-lg shrink-0 cursor-pointer relative z-10 group-hover:scale-105"
          >
            <span>Browse Careers</span>
            <ArrowRight className="w-4 h-4 text-purple-600" />
          </Link>
        </div>

      </div>
    </div>
  );
}
