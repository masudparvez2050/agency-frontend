"use client";

import React, { useState } from "react";
import { JOB_LISTINGS } from "@/lib/careers-data";
import { JobListing } from "@/types/career";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, ToggleLeft, ToggleRight, X, Check, Briefcase } from "lucide-react";

type JobRow = JobListing & { active: boolean };

import { useCMSData } from "@/hooks/useCMS";

export default function AdminCareersPage() {
  const [jobs, setJobs] = useCMSData<any>("careers", JOB_LISTINGS);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [dept, setDept] = useState<JobListing["department"]>("Engineering");
  const [type, setType] = useState<JobListing["type"]>("Full-time");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [description, setDescription] = useState("");
  const [requirements, setRequirements] = useState("");
  const [success, setSuccess] = useState(false);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !location || !salary) return;
    const newJob = {
      id: `job-${Date.now()}`,
      title, department: dept, type, location, salary,
      description: description || "Join our team to build next-generation applications.",
      requirements: requirements.split("\n").filter(Boolean),
      perks: [
        "100% remote-first setup",
        "Flexible working schedules",
        "Annual learning budget"
      ],
      postedDate: new Date().toISOString().split("T")[0],
      active: true
    };
    setJobs([newJob, ...jobs]);
    setTitle(""); setLocation(""); setSalary(""); setDescription(""); setRequirements("");
    setSuccess(true); setShowForm(false);
    setTimeout(() => setSuccess(false), 4000);
  };

  const toggleActive = (id: string) => {
    setJobs(jobs.map((j: any) => j.id === id ? { ...j, active: j.active === false ? true : false } : j));
  };

  const deleteJob = (id: string) => {
    setJobs(jobs.filter((j: any) => j.id !== id));
  };


  const DEPT_COLORS: Record<string, string> = {
    Engineering: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    Design: "text-purple-400 bg-purple-500/10 border-purple-500/20",
    Marketing: "text-pink-400 bg-pink-500/10 border-pink-500/20",
    Operations: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-white">Job Listings CMS</h1>
          <p className="text-xs text-slate-400 mt-1">Add, manage, and close career openings.</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-xs font-bold text-white transition-all shadow cursor-pointer">
          {showForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          {showForm ? "Cancel" : "Add Job"}
        </button>
      </div>

      {success && (
        <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-center gap-2">
          <Check className="w-4 h-4 shrink-0" /> Job listing published!
        </div>
      )}

      <AnimatePresence>
        {showForm && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
            <form onSubmit={handleAdd} className="p-6 rounded-2xl bg-slate-950/70 border border-amber-500/20 space-y-4 shadow-lg">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-amber-400" /> Add New Job Listing
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">Job Title *</label>
                  <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Senior React Developer" className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-850 text-xs text-white placeholder-slate-550 focus:outline-none focus:border-amber-500/40" required />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">Department</label>
                    <select value={dept} onChange={e => setDept(e.target.value as any)} className="w-full px-2 py-2.5 rounded-xl bg-slate-900 border border-slate-850 text-xs text-slate-300 focus:outline-none cursor-pointer">
                      {["Engineering","Design","Marketing","Operations"].map(d => <option key={d}>{d}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">Type</label>
                    <select value={type} onChange={e => setType(e.target.value as any)} className="w-full px-2 py-2.5 rounded-xl bg-slate-900 border border-slate-850 text-xs text-slate-300 focus:outline-none cursor-pointer">
                      {["Full-time","Part-time","Contract","Remote"].map(t => <option key={t}>{t}</option>)}
                    </select>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">Location *</label>
                  <input type="text" value={location} onChange={e => setLocation(e.target.value)} placeholder="e.g. Remote (Dhaka)" className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-850 text-xs text-white placeholder-slate-550 focus:outline-none focus:border-amber-500/40" required />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">Salary Range *</label>
                  <input type="text" value={salary} onChange={e => setSalary(e.target.value)} placeholder="৳40,000 – ৳60,000 / month" className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-850 text-xs text-white placeholder-slate-550 focus:outline-none focus:border-amber-500/40" required />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">Description</label>
                <textarea rows={2} value={description} onChange={e => setDescription(e.target.value)} placeholder="Role description..." className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-850 text-xs text-white placeholder-slate-550 focus:outline-none focus:border-amber-500/40 resize-none" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">Requirements (one per line)</label>
                <textarea rows={3} value={requirements} onChange={e => setRequirements(e.target.value)} placeholder={"3+ years Next.js experience\nPostgreSQL proficiency\nStrong TypeScript skills"} className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-850 text-xs text-white placeholder-slate-550 focus:outline-none focus:border-amber-500/40 resize-none" />
              </div>
              <button type="submit" className="px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-xs font-bold text-white transition-all cursor-pointer">
                Publish Job Listing
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Jobs Table */}
      <div className="rounded-2xl bg-slate-950/70 border border-slate-900 overflow-x-auto shadow-lg">
        <table className="w-full text-left text-xs border-collapse min-w-[560px]">
          <thead>
            <tr className="bg-slate-900/50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-900">
              <th className="p-4">Job Title</th>
              <th className="p-4">Department</th>
              <th className="p-4">Type</th>
              <th className="p-4">Salary</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-900">
            {jobs.map(j => (
              <tr key={j.id} className="hover:bg-slate-900/10 transition-colors">
                <td className="p-4">
                  <div className="font-bold text-white">{j.title}</div>
                  <div className="text-[10px] text-slate-500">{j.location}</div>
                </td>
                <td className="p-4"><span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded border ${DEPT_COLORS[j.department]}`}>{j.department}</span></td>
                <td className="p-4 text-slate-400">{j.type}</td>
                <td className="p-4 text-slate-300 font-semibold">{j.salary}</td>
                <td className="p-4">
                  <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded border ${j.active ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" : "text-slate-500 bg-slate-800 border-slate-700"}`}>
                    {j.active ? "Open" : "Closed"}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex gap-2 justify-end">
                    <button onClick={() => toggleActive(j.id)} className={`p-1.5 rounded-lg border transition-all cursor-pointer ${j.active ? "bg-slate-900 border-slate-850 text-slate-400 hover:text-amber-400" : "bg-emerald-600/10 border-emerald-500/20 text-emerald-400"}`} title={j.active ? "Close Position" : "Reopen"}>
                      {j.active ? <ToggleRight className="w-3.5 h-3.5" /> : <ToggleLeft className="w-3.5 h-3.5" />}
                    </button>
                    <button onClick={() => deleteJob(j.id)} className="p-1.5 rounded-lg bg-slate-900 hover:bg-rose-600/10 border border-slate-850 hover:border-rose-500/20 text-slate-400 hover:text-rose-400 transition-all cursor-pointer">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
