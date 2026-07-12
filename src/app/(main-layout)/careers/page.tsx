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
  Engineering: "text-blue-400 bg-blue-500/10 border-blue-500/20",
  Design: "text-purple-400 bg-purple-500/10 border-purple-500/20",
  Marketing: "text-pink-400 bg-pink-500/10 border-pink-500/20",
  Operations: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
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
        className="fixed inset-0 bg-black/75 backdrop-blur-sm"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: "spring", stiffness: 350, damping: 28 }}
        className="relative w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-2xl bg-slate-950 border border-slate-900 p-6 md:p-8 space-y-6 z-10 shadow-2xl no-scrollbar"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg bg-slate-900 border border-slate-850 text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="space-y-1 border-b border-slate-900 pb-5">
          <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded border ${DEPT_COLORS[job.department]}`}>
            {job.department}
          </span>
          <h2 className="text-xl font-black text-white mt-2">Apply: {job.title}</h2>
          <p className="text-xs text-slate-500">{job.location} · {job.type}</p>
        </div>

        <AnimatePresence mode="wait">
          {!isSuccess ? (
            <motion.form key="apply-form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {error}
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">Full Name *</label>
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Masud Parvez" className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-850 text-xs text-white placeholder-slate-550 focus:outline-none focus:border-purple-500/40" required />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">Email *</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@example.com" className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-850 text-xs text-white placeholder-slate-550 focus:outline-none focus:border-purple-500/40" required />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">Portfolio / Github URL <span className="text-slate-600">(Optional)</span></label>
                <input type="url" value={portfolio} onChange={(e) => setPortfolio(e.target.value)} placeholder="https://github.com/yourprofile" className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-850 text-xs text-white placeholder-slate-550 focus:outline-none focus:border-purple-500/40" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">Cover Letter / Message *</label>
                <textarea rows={4} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Tell us about your experience and why you'd be a great fit..." className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-850 text-xs text-white placeholder-slate-550 focus:outline-none focus:border-purple-500/40 resize-none" required />
              </div>
              <button type="submit" disabled={isLoading} className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-purple-650 to-cyan-555 hover:opacity-95 text-xs font-bold text-white transition-all shadow-lg disabled:opacity-50 cursor-pointer">
                {isLoading ? "Submitting..." : <><Send className="w-3.5 h-3.5" /><span>Submit Application</span></>}
              </button>
            </motion.form>
          ) : (
            <motion.div key="apply-success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="p-8 text-center space-y-5">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle className="w-6 h-6" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-lg font-bold text-white">Application Received!</h3>
                <p className="text-xs text-slate-400 leading-relaxed max-w-xs mx-auto">Our hiring team will review your application and reach back within 5 business days.</p>
              </div>
              <button onClick={onClose} className="px-6 py-2 rounded-xl bg-slate-900 border border-slate-850 text-xs font-bold text-slate-350 hover:text-white transition-colors cursor-pointer">Close</button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default function CareersPage() {
  const [selectedDept, setSelectedDept] = useState("All");
  const [expandedJob, setExpandedJob] = useState<string | null>(null);
  const [applyJob, setApplyJob] = useState<JobListing | null>(null);

  const departments = ["All", "Engineering", "Design", "Marketing", "Operations"];

  const filteredJobs = useMemo(() => {
    if (selectedDept === "All") return JOB_LISTINGS;
    return JOB_LISTINGS.filter((j) => j.department === selectedDept);
  }, [selectedDept]);

  return (
    <div className="min-h-screen pt-32 pb-24 overflow-hidden relative">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-purple-500/5 blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-cyan-500/5 blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10 space-y-16">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold text-purple-400 uppercase tracking-widest mb-3 block">Open Positions</span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white mb-4 leading-tight">Join Plaxora Team</h1>
          <p className="text-slate-400">Build state-of-the-art digital tools with our remote-first engineering team. We value clean code, autonomy, and continuous learning.</p>
        </div>

        {/* Perks Banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {[
            { label: "100% Remote", icon: "🌍" },
            { label: "Flexible Hours", icon: "⏰" },
            { label: "Open Source", icon: "💻" },
            { label: "Growth Bonuses", icon: "🚀" },
          ].map((perk, i) => (
            <div key={i} className="p-4 rounded-xl bg-slate-950/70 border border-slate-900 text-center space-y-1 shadow">
              <span className="text-2xl block">{perk.icon}</span>
              <span className="text-xs font-bold text-white">{perk.label}</span>
            </div>
          ))}
        </div>

        {/* Dept Filters */}
        <div className="flex flex-wrap gap-2 justify-center max-w-2xl mx-auto">
          {departments.map((dept) => (
            <button
              key={dept}
              onClick={() => setSelectedDept(dept)}
              className={`px-4 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all border ${selectedDept === dept ? "bg-purple-600 border-purple-500 text-white shadow-lg shadow-purple-500/25" : "bg-slate-950/85 border-slate-900 text-slate-400 hover:text-white"}`}
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
                className="rounded-2xl bg-slate-950/80 border border-slate-900 overflow-hidden hover:border-slate-850 transition-colors shadow-lg"
              >
                {/* Job header row */}
                <div className="p-5 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center flex-wrap gap-2">
                      <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded border ${DEPT_COLORS[job.department]}`}>
                        {job.department}
                      </span>
                      <span className="text-[9px] font-bold uppercase tracking-widest text-slate-550 px-2 py-0.5 rounded border border-slate-900 bg-slate-900/60">
                        {job.type}
                      </span>
                    </div>
                    <h3 className="text-base md:text-lg font-bold text-white">{job.title}</h3>
                    <div className="flex flex-wrap gap-3 text-[10px] text-slate-500 font-semibold">
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{job.location}</span>
                      <span className="flex items-center gap-1"><DollarSign className="w-3 h-3" />{job.salary}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" />Posted {job.postedDate}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => setApplyJob(job)}
                      className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-xs font-bold text-white transition-all shadow cursor-pointer"
                    >
                      Apply Now
                    </button>
                    <button
                      onClick={() => setExpandedJob(isExpanded ? null : job.id)}
                      className="p-2 rounded-xl bg-slate-900 border border-slate-850 text-slate-400 hover:text-white transition-colors cursor-pointer"
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
                      <div className="px-5 md:px-6 pb-6 border-t border-slate-900 pt-5 grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                        <div>
                          <p className="text-slate-400 leading-relaxed mb-5">{job.description}</p>
                          <h5 className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-3">Requirements</h5>
                          <ul className="space-y-2">
                            {job.requirements.map((req, i) => (
                              <li key={i} className="flex gap-2 text-slate-350 items-start">
                                <Check className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                                <span>{req}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h5 className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-3">Perks & Benefits</h5>
                          <ul className="space-y-2">
                            {job.perks.map((perk, i) => (
                              <li key={i} className="flex gap-2 text-slate-350 items-start">
                                <span className="text-amber-400 shrink-0">✦</span>
                                <span>{perk}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          }) : (
            <div className="text-center py-24 rounded-2xl bg-slate-950/40 border border-slate-900">
              <Users className="w-12 h-12 text-slate-650 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">No openings found</h3>
              <p className="text-xs text-slate-450">Check back soon — we're growing!</p>
            </div>
          )}
        </div>

        {/* Spontaneous CTA */}
        <div className="p-8 rounded-3xl bg-slate-950/80 border border-slate-900 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden max-w-3xl mx-auto">
          <div className="absolute top-0 right-0 w-40 h-40 bg-purple-500/5 blur-2xl rounded-full" />
          <div className="space-y-1.5 relative z-10">
            <h3 className="text-xl font-black text-white">Don't see the right role?</h3>
            <p className="text-xs text-slate-400">Send us a spontaneous application — we are always looking for talented builders.</p>
          </div>
          <button
            onClick={() => setApplyJob({ id: "spontaneous", title: "Spontaneous Application", department: "Engineering", type: "Full-time", location: "Remote", salary: "Negotiable", description: "Open application for any future roles.", requirements: [], perks: [], postedDate: new Date().toISOString().split("T")[0] })}
            className="flex items-center gap-1.5 px-6 py-4 rounded-xl bg-gradient-to-r from-purple-650 to-cyan-555 hover:opacity-95 text-xs font-bold text-white transition-all shadow-lg shrink-0 relative z-10 cursor-pointer"
          >
            <Send className="w-4 h-4" />
            Send Your CV
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
