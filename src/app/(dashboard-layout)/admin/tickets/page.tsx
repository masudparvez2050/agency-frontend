"use client";

import React, { useState, useMemo } from "react";
import { MOCK_TICKETS } from "@/lib/orders-data";
import { Ticket } from "@/types/order";
import { motion } from "framer-motion";
import { Send, CheckCircle, AlertCircle, Search } from "lucide-react";

export default function AdminTicketsPage() {
  const [tickets, setTickets] = useState<Ticket[]>(MOCK_TICKETS);
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [replies, setReplies] = useState<Record<string, string>>({});

  const filtered = useMemo(() => {
    let result = [...tickets];
    if (statusFilter !== "all") result = result.filter(t => t.status === statusFilter);
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(t => t.subject.toLowerCase().includes(q) || t.category.toLowerCase().includes(q));
    }
    return result;
  }, [tickets, statusFilter, search]);

  const handleReply = (id: string) => {
    if (!replies[id]) return;
    setTickets(prev => prev.map(t => t.id === id ? { ...t, status: "replied" } : t));
    setReplies(prev => ({ ...prev, [id]: "" }));
  };

  const handleResolve = (id: string) => {
    setTickets(prev => prev.map(t => t.id === id ? { ...t, status: "resolved" } : t));
  };

  const STATUS_STYLE: Record<string, string> = {
    open: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    replied: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
    resolved: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-white">Support Tickets</h1>
          <p className="text-xs text-slate-400 mt-1">Review and respond to customer support requests.</p>
        </div>
        <div className="flex gap-2 text-center">
          {[
            { label: "Open", count: tickets.filter(t => t.status === "open").length, color: "text-amber-400 border-amber-500/20 bg-amber-500/10" },
            { label: "Replied", count: tickets.filter(t => t.status === "replied").length, color: "text-cyan-400 border-cyan-500/20 bg-cyan-500/10" },
            { label: "Resolved", count: tickets.filter(t => t.status === "resolved").length, color: "text-emerald-400 border-emerald-500/20 bg-emerald-500/10" },
          ].map((s, i) => (
            <div key={i} className={`px-3 py-2 rounded-xl border ${s.color}`}>
              <span className="text-lg font-black block">{s.count}</span>
              <span className="text-[9px] font-bold uppercase">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow max-w-sm">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input type="text" placeholder="Search tickets..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-900 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-purple-500/40" />
        </div>
        <div className="flex gap-2">
          {["all", "open", "replied", "resolved"].map(s => (
            <button key={s} onClick={() => setStatusFilter(s)} className={`px-3 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wide border transition-all ${statusFilter === s ? "bg-purple-600 border-purple-500 text-white" : "border-slate-900 text-slate-500 hover:text-white"}`}>{s}</button>
          ))}
        </div>
      </div>

      {/* Tickets */}
      <div className="space-y-4">
        {filtered.map(t => (
          <motion.div key={t.id} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="p-5 rounded-2xl bg-slate-950/70 border border-slate-900 hover:border-slate-850 transition-colors shadow-lg space-y-4">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-bold text-white">{t.subject}</span>
                  <span className="font-mono text-[10px] text-slate-500">({t.id})</span>
                </div>
                <div className="flex items-center gap-3 mt-1 text-[10px] text-slate-500">
                  <span>Category: <strong className="text-purple-400">{t.category}</strong></span>
                  <span>Date: <strong className="text-slate-300">{t.date}</strong></span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded border ${STATUS_STYLE[t.status]}`}>{t.status}</span>
                {t.status !== "resolved" && (
                  <button onClick={() => handleResolve(t.id)} className="flex items-center gap-1 px-2 py-1.5 rounded-lg bg-emerald-600/10 hover:bg-emerald-600/20 border border-emerald-500/20 text-emerald-400 text-[9px] font-bold transition-all cursor-pointer">
                    <CheckCircle className="w-3 h-3" /> Resolve
                  </button>
                )}
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed border-t border-slate-900 pt-4">{t.message}</p>

            {t.status !== "resolved" && (
              <div className="flex gap-3 items-end border-t border-slate-900 pt-4">
                <div className="flex-grow">
                  <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">Write Response</label>
                  <textarea
                    rows={2}
                    placeholder="Type your reply to the customer..."
                    value={replies[t.id] || ""}
                    onChange={e => setReplies(prev => ({ ...prev, [t.id]: e.target.value }))}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-850 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-purple-500/40 resize-none"
                  />
                </div>
                <button onClick={() => handleReply(t.id)} className="p-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white shadow-md cursor-pointer transition-all" title="Send Reply">
                  <Send className="w-4 h-4" />
                </button>
              </div>
            )}
          </motion.div>
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-16 text-slate-500 text-xs">No tickets found for the selected filter.</div>
        )}
      </div>
    </div>
  );
}
