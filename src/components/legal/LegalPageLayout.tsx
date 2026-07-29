"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  ShieldCheck, 
  FileText, 
  RotateCcw, 
  Search, 
  Calendar, 
  Clock, 
  Printer, 
  ChevronRight, 
  Mail, 
  CheckCircle2, 
  HelpCircle,
  Sparkles,
  ArrowUpRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface LegalSection {
  id: string;
  title: string;
  badge?: string;
  icon?: React.ReactNode;
  content: React.ReactNode;
}

interface LegalPageLayoutProps {
  title: string;
  subtitle: string;
  lastUpdated: string;
  readTime: string;
  policyType: "privacy" | "terms" | "refund";
  sections: LegalSection[];
  summaryItems?: { title: string; desc: string; icon?: React.ReactNode }[];
}

export default function LegalPageLayout({
  title,
  subtitle,
  lastUpdated,
  readTime,
  policyType,
  sections,
  summaryItems,
}: LegalPageLayoutProps) {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState<string>(sections[0]?.id || "");
  const [searchQuery, setSearchQuery] = useState("");

  const policyTabs = [
    { name: "Privacy Policy", href: "/privacy", icon: <ShieldCheck className="w-4 h-4" />, id: "privacy" },
    { name: "Terms of Service", href: "/terms", icon: <FileText className="w-4 h-4" />, id: "terms" },
    { name: "Refund Policy", href: "/refund", icon: <RotateCcw className="w-4 h-4" />, id: "refund" },
  ];

  // Intersection observer for table of contents active state
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  const handlePrint = () => {
    window.print();
  };

  const filteredSections = sections.filter(
    (sec) =>
      sec.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (typeof sec.content === "string" && sec.content.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="bg-slate-50/60 min-h-screen font-sans pb-24 text-slate-800">
      {/* Background Glow Deco */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -left-40 w-96 h-96 bg-violet-400/10 rounded-full blur-3xl" />
      </div>

      {/* Hero Header */}
      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-20 border-b border-slate-200/80 bg-white/80 backdrop-blur-xl z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50/80 border border-blue-200/60 text-blue-600 text-xs font-semibold uppercase tracking-wider mb-6 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              Plaxora Group Legal & Transparency
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-6">
              {title}
            </h1>

            <p className="text-lg text-slate-600 leading-relaxed mb-8 font-normal">
              {subtitle}
            </p>

            {/* Meta Stats Bar */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-500 pt-2 border-t border-slate-100">
              <div className="flex items-center gap-1.5 bg-slate-100/70 px-3 py-1.5 rounded-lg">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                Updated: <span className="text-slate-700 font-semibold">{lastUpdated}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-100/70 px-3 py-1.5 rounded-lg">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                Est. Read Time: <span className="text-slate-700 font-semibold">{readTime}</span>
              </div>
              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-3 py-1.5 rounded-lg transition-colors cursor-pointer shadow-2xs ml-auto"
              >
                <Printer className="w-3.5 h-3.5 text-slate-500" />
                Print / PDF
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="mt-12 flex flex-wrap gap-2 border-b border-slate-200/80 pb-px">
            {policyTabs.map((tab) => {
              const isActive = pathname === tab.href;
              return (
                <Link
                  key={tab.id}
                  href={tab.href}
                  className={`inline-flex items-center gap-2 px-5 py-3 rounded-t-2xl font-semibold text-sm transition-all duration-200 border-t border-x ${
                    isActive
                      ? "bg-slate-50 border-slate-200/80 text-blue-600 shadow-2xs -mb-px border-b-2 border-b-blue-600"
                      : "border-transparent text-slate-500 hover:text-slate-900 hover:bg-slate-100/60"
                  }`}
                >
                  {tab.icon}
                  {tab.name}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 relative z-10">
        {/* Quick Highlights Grid if available */}
        {summaryItems && summaryItems.length > 0 && (
          <div className="mb-12">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              Key Highlights at a Glance
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {summaryItems.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white/80 backdrop-blur-md p-5 rounded-2xl border border-slate-200/80 shadow-2xs hover:border-blue-200 hover:shadow-md transition-all duration-300"
                >
                  <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 mb-3 font-bold text-sm">
                    {item.icon || (idx + 1)}
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm mb-1">{item.title}</h4>
                  <p className="text-slate-500 text-xs leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Sidebar Table of Contents */}
          <aside className="lg:col-span-4 sticky top-28 space-y-6 hidden lg:block">
            {/* Search Box */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search this policy..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 transition-all shadow-2xs"
              />
            </div>

            {/* Table of Contents Card */}
            <div className="bg-white/90 backdrop-blur-md rounded-2xl border border-slate-200/80 p-5 shadow-2xs">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-4 flex items-center justify-between">
                <span>On This Page</span>
                <span className="text-[10px] text-slate-400 font-normal">{sections.length} Sections</span>
              </h3>
              <nav className="space-y-1">
                {sections.map((sec) => {
                  const isActive = activeSection === sec.id;
                  return (
                    <a
                      key={sec.id}
                      href={`#${sec.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        const el = document.getElementById(sec.id);
                        if (el) {
                          const yOffset = -120;
                          const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
                          window.scrollTo({ top: y, behavior: "smooth" });
                        }
                      }}
                      className={`group flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                        isActive
                          ? "bg-blue-50 text-blue-600 font-bold translate-x-1"
                          : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                      }`}
                    >
                      <span className="truncate">{sec.title}</span>
                      <ChevronRight
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          isActive ? "text-blue-600 translate-x-0.5 opacity-100" : "text-slate-300 opacity-0 group-hover:opacity-100"
                        }`}
                      />
                    </a>
                  );
                })}
              </nav>
            </div>

            {/* Contact Card Widget */}
            <div className="bg-gradient-to-br from-slate-900 to-blue-950 text-white rounded-2xl p-6 shadow-lg relative overflow-hidden">
              <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl pointer-events-none" />
              <HelpCircle className="w-6 h-6 text-blue-400 mb-3" />
              <h4 className="font-bold text-sm text-white mb-1">Need Legal Clarification?</h4>
              <p className="text-slate-300 text-xs leading-relaxed mb-4">
                Our legal and compliance team is available to answer any questions regarding terms or privacy.
              </p>
              <a
                href="mailto:info@plaxora.com"
                className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md hover:shadow-blue-500/20"
              >
                <Mail className="w-3.5 h-3.5" />
                info@plaxora.com
              </a>
            </div>
          </aside>

          {/* Right Main Body Content */}
          <main className="lg:col-span-8 space-y-8">
            {filteredSections.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
                <Search className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                <h3 className="text-base font-bold text-slate-800 mb-1">No matching policy sections</h3>
                <p className="text-xs text-slate-500">Try searching for a different keyword or term.</p>
              </div>
            ) : (
              filteredSections.map((sec, idx) => (
                <section
                  key={sec.id}
                  id={sec.id}
                  className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-2xs hover:border-slate-300 transition-all duration-300 scroll-mt-28 relative overflow-hidden group"
                >
                  {/* Decorative Section Bar */}
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-blue-600 via-violet-500 to-purple-600 opacity-80 rounded-l-3xl" />

                  <div className="pl-3 sm:pl-4">
                    {/* Section Header */}
                    <div className="flex items-center justify-between gap-4 mb-4 pb-4 border-b border-slate-100">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-blue-50 text-blue-600 font-bold text-xs">
                          {idx + 1}
                        </span>
                        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                          {sec.title}
                        </h2>
                      </div>
                      {sec.badge && (
                        <span className="hidden sm:inline-block px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-[11px] font-semibold">
                          {sec.badge}
                        </span>
                      )}
                    </div>

                    {/* Section Content */}
                    <div className="prose prose-slate max-w-none text-slate-600 text-sm leading-relaxed prose-headings:text-slate-900 prose-strong:text-slate-900 prose-a:text-blue-600 hover:prose-a:underline">
                      {sec.content}
                    </div>
                  </div>
                </section>
              ))
            )}

            {/* Bottom Contact Banner */}
            <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-3xl p-8 border border-blue-100 flex flex-col sm:flex-row items-center justify-between gap-6 mt-12 shadow-2xs">
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">Got questions about Plaxora policies?</h3>
                <p className="text-slate-600 text-xs">
                  We are transparent about how we operate, license products, and handle customer data.
                </p>
              </div>
              <a
                href="mailto:info@plaxora.com"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition-all hover:-translate-y-0.5 shrink-0"
              >
                Contact Legal Team
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
