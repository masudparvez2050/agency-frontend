"use client";

import React, { useState, useMemo } from "react";
import { JOB_LISTINGS } from "@/lib/careers-data";
import { JobListing } from "@/types/career";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase, MapPin, Clock, DollarSign, Check, X,
  ChevronDown, ChevronUp, Send, CheckCircle, AlertCircle, Users
} from "lucide-react";

const DEPT_COLORS: Record<string, string> = {
  Engineering: "text-blue-700 bg-blue-50 border-blue-200",
  Design: "text-purple-700 bg-purple-50 border-purple-200",
  Marketing: "text-pink-700 bg-pink-50 border-pink-200",
  Operations: "text-emerald-700 bg-emerald-50 border-emerald-200",
};

function ApplicationModal({ job, onClose }: { job: JobListing; onClose: () => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!name || !email || !message) {
      setError("Please fill all required fields.");
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: "spring", stiffness: 350, damping: 28 }}
        className="relative w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-2xl bg-white border border-slate-200 p-6 md:p-8 space-y-6 z-10 shadow-2xl no-scrollbar"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="space-y-1 border-b border-slate-200 pb-5">
          <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded border ${DEPT_COLORS[job.department]}`}>
            {job.department}
          </span>
          <h2 className="text-xl font-black text-slate-900 mt-2">Apply: {job.title}</h2>
          <p className="text-xs text-slate-500 font-medium">{job.location} · {job.type}</p>
        </div>

        <AnimatePresence mode="wait">
          {!isSuccess ? (
            <motion.form key="apply-form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2 font-bold">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {error}
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">Full Name *</label>
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Masud Parvez" className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-purple-500/50 font-medium" required />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">Email *</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@example.com" className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-purple-500/50 font-medium" required />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">Portfolio / Github URL <span className="text-slate-400">(Optional)</span></label>
                <input type="url" value={portfolio} onChange={(e) => setPortfolio(e.target.value)} placeholder="https://github.com/yourprofile" className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-purple-500/50 font-medium" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">Cover Letter / Message *</label>
                <textarea rows={4} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Tell us about your experience and why you'd be a great fit..." className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-purple-500/50 resize-none font-medium" required />
              </div>
              <button type="submit" disabled={isLoading} className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-xs font-bold text-white transition-all shadow-md disabled:opacity-50 cursor-pointer">
                {isLoading ? "Submitting..." : <><Send className="w-3.5 h-3.5" /><span>Submit Application</span></>}
              </button>
            </motion.form>
          ) : (
            <motion.div key="apply-success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="p-8 text-center space-y-5">
              <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center mx-auto">
                <CheckCircle className="w-6 h-6" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-lg font-bold text-slate-900">Application Received!</h3>
                <p className="text-xs text-slate-600 leading-relaxed max-w-xs mx-auto font-medium">Our hiring team will review your application and reach back within 5 business days.</p>
              </div>
              <button onClick={onClose} className="px-6 py-2 rounded-xl bg-slate-100 border border-slate-200 text-xs font-bold text-slate-700 hover:text-slate-900 transition-colors cursor-pointer">Close</button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

import { useCMSData } from "@/hooks/useCMS";

export default function CareersPage() {
  const [allJobs] = useCMSData<any>("careers", JOB_LISTINGS);
  const [selectedDept, setSelectedDept] = useState("All");
  const [expandedJob, setExpandedJob] = useState<string | null>(null);
  const [applyJob, setApplyJob] = useState<JobListing | null>(null);

  const departments = ["All", "Engineering", "Design", "Marketing", "Operations"];

  const filteredJobs = useMemo(() => {
    const activeJobs = allJobs.filter((j: any) => j.active !== false);
    if (selectedDept === "All") return activeJobs;
    return activeJobs.filter((j) => j.department === selectedDept);
  }, [allJobs, selectedDept]);

  return (
    <div className="min-h-screen pt-32 pb-24 overflow-hidden relative bg-slate-50">
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10 space-y-16">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-extrabold text-purple-700 uppercase tracking-widest mb-3 block">Open Positions</span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 mb-4 leading-tight">Join Plaxora Team</h1>
          <p className="text-slate-600 font-medium">Build state-of-the-art digital tools with our remote-first engineering team. We value clean code, autonomy, and continuous learning.</p>
        </div>

        {/* Perks Banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {[
            { label: "100% Remote", icon: "🌍" },
            { label: "Flexible Hours", icon: "⏰" },
            { label: "Open Source", icon: "💻" },
            { label: "Growth Bonuses", icon: "🚀" },
          ].map((perk, i) => (
            <div key={i} className="p-4 rounded-xl bg-white border border-slate-200/80 text-center space-y-1 shadow-sm">
              <span className="text-2xl block">{perk.icon}</span>
              <span className="text-xs font-bold text-slate-900">{perk.label}</span>
            </div>
          ))}
        </div>

        {/* Dept Filters */}
        <div className="flex flex-wrap gap-2 justify-center max-w-2xl mx-auto">
          {departments.map((dept) => (
            <button
              key={dept}
              onClick={() => setSelectedDept(dept)}
              className={`px-4 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all border ${selectedDept === dept ? "bg-purple-600 border-purple-600 text-white shadow-md shadow-purple-500/15" : "bg-white border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50"}`}
            >
              {dept}
            </button>
          ))}
        </div>

        {/* Job Listings */}
        <div className="space-y-4 max-w-3xl mx-auto">
          {filteredJobs.length > 0 ? filteredJobs.map((job, idx) => {
            const isExpanded = expandedJob === job.id;
            return (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.04 }}
                className="rounded-2xl bg-white border border-slate-200/80 overflow-hidden hover:border-purple-300 transition-colors shadow-sm"
              >
                {/* Job header row */}
                <div className="p-5 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center flex-wrap gap-2">
                      <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded border ${DEPT_COLORS[job.department]}`}>
                        {job.department}
                      </span>
                      <span className="text-[9px] font-bold uppercase tracking-widest text-slate-600 px-2 py-0.5 rounded border border-slate-200 bg-slate-100">
                        {job.type}
                      </span>
                    </div>
                    <h3 className="text-base md:text-lg font-bold text-slate-900">{job.title}</h3>
                    <div className="flex flex-wrap gap-3 text-[10px] text-slate-500 font-semibold">
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{job.location}</span>
                      <span className="flex items-center gap-1"><DollarSign className="w-3 h-3" />{job.salary}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" />Posted {job.postedDate}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => setApplyJob(job)}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-xs font-bold text-white transition-all shadow-sm cursor-pointer"
                    >
                      Apply Now
                    </button>
                    <button
                      onClick={() => setExpandedJob(isExpanded ? null : job.id)}
                      className="p-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
                    >
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Expanded detail area */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 md:px-6 pb-6 border-t border-slate-200 pt-5 grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-normal">
                        <div>
                          <p className="text-slate-600 leading-relaxed mb-5 font-medium">{job.description}</p>
                          <h5 className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-3">Requirements</h5>
                           <ul className="space-y-2">
                            {job.requirements.map((req: string, i: number) => (
                              <li key={i} className="flex gap-2 text-slate-700 items-start font-medium">
                                <Check className="w-3.5 h-3.5 text-purple-600 shrink-0 mt-0.5" />
                                <span>{req}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h5 className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-3">Perks & Benefits</h5>
                          <ul className="space-y-2 mb-6">
                            {(job.perks || []).map((perk: string, i: number) => (
                              <li key={i} className="flex gap-2 text-slate-700 items-start font-medium">
                                <span className="w-1.5 h-1.5 rounded-full bg-purple-600 shrink-0 mt-1.5" />
                                <span>{perk}</span>
                              </li>
                            ))}
                          </ul>
                          <button
                            onClick={() => setApplyJob(job)}
                            className="w-full py-2.5 rounded-xl bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-700 font-bold text-xs transition-colors cursor-pointer"
                          >
                            Apply for this position
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          }) : (
            <div className="text-center py-24 rounded-2xl bg-white border border-slate-200 shadow-md">
              <Users className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-slate-900 mb-2">No positions available</h3>
              <p className="text-sm text-slate-600 px-6 font-medium">
                We currently don&apos;t have any active openings in this department.
              </p>
            </div>
          )}
        </div>

        {/* General Application CTA */}
        <div className="p-8 rounded-3xl bg-white border border-slate-200/80 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl shadow-slate-200/50 relative overflow-hidden max-w-3xl mx-auto">
          <div className="space-y-1.5 relative z-10 max-w-md">
            <h3 className="text-lg font-bold text-slate-900">Don&apos;t see a matching role?</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              We are always excited to meet exceptional engineers, designers, and system builders. Send us an open application.
            </p>
          </div>
          <button
            onClick={() => setApplyJob({
              id: "general-open",
              title: "General Open Application",
              department: "Engineering",
              location: "Remote",
              type: "Full-time",
              salary: "Competitive",
              postedDate: "Recent",
              description: "Open application for engineering and design roles.",
              requirements: ["Strong technical foundations", "Passion for high-performance software"],
              perks: ["Contribute to core codebase and user experiences"]
            })}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-xs font-bold text-white transition-all shadow-md shrink-0 cursor-pointer"
          >
            Send Open Application
          </button>
        </div>
      </div>

      {/* Application Modal */}
      <AnimatePresence>
        {applyJob && <ApplicationModal job={applyJob} onClose={() => setApplyJob(null)} />}
      </AnimatePresence>
    </div>
  );
}
