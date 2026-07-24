"use client";

import React, { useState, useMemo } from "react";
import { MOCK_TICKETS } from "@/lib/orders-data";
import { Ticket } from "@/types/order";
import { motion } from "framer-motion";
import { Send, CheckCircle, AlertCircle, Search } from "lucide-react";

import { useCMSData } from "@/hooks/useCMS";

export default function AdminTicketsPage() {
  const [tickets, setTickets] = useCMSData<any>("tickets", MOCK_TICKETS);
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
    setTickets(tickets.map(t => t.id === id ? { ...t, status: "replied" } : t));
    setReplies(prev => ({ ...prev, [id]: "" }));
  };

  const handleResolve = (id: string) => {
    setTickets(tickets.map(t => t.id === id ? { ...t, status: "resolved" } : t));
  };

  const STATUS_STYLE: Record<string, string> = {
    open: "text-amber-700 bg-amber-50 border-amber-200",
    replied: "text-purple-700 bg-purple-50 border-purple-200",
    resolved: "text-emerald-700 bg-emerald-50 border-emerald-200",
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-slate-900">Support Tickets</h1>
          <p className="text-xs text-slate-500 mt-1">Review and respond to customer support requests.</p>
        </div>
        <div className="flex gap-2 text-center">
          {[
            { label: "Open", count: tickets.filter((t: any) => t.status === "open").length, color: "text-amber-700 border-amber-200 bg-amber-50" },
            { label: "Replied", count: tickets.filter((t: any) => t.status === "replied").length, color: "text-purple-700 border-purple-200 bg-purple-50" },
            { label: "Resolved", count: tickets.filter((t: any) => t.status === "resolved").length, color: "text-emerald-700 border-emerald-200 bg-emerald-50" },
          ].map((s, i) => (
            <div key={i} className={`px-3.5 py-2 rounded-xl border shadow-sm ${s.color}`}>
              <span className="text-lg font-black block">{s.count}</span>
              <span className="text-[9px] font-bold uppercase">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow max-w-sm">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input type="text" placeholder="Search tickets..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all font-medium" />
        </div>
        <div className="flex gap-2">
          {["all", "open", "replied", "resolved"].map(s => (
            <button key={s} onClick={() => setStatusFilter(s)} className={`px-3 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wide border transition-all cursor-pointer ${statusFilter === s ? "bg-purple-600 border-purple-600 text-white shadow-sm" : "bg-white border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50"}`}>{s}</button>
          ))}
        </div>
      </div>

      {/* Tickets */}
      <div className="space-y-4">
        {filtered.map((t: any) => (
          <motion.div key={t.id} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-purple-200 transition-colors shadow-sm space-y-4">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-bold text-slate-900">{t.subject}</span>
                  <span className="font-mono text-[10px] text-slate-400 font-semibold">({t.id})</span>
                </div>
                <div className="flex items-center gap-3 mt-1 text-[10px] text-slate-500">
                  <span>Category: <strong className="text-purple-700">{t.category}</strong></span>
                  <span>Date: <strong className="text-slate-700">{t.date}</strong></span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-[9px] font-bold uppercase px-2.5 py-0.5 rounded-full border ${STATUS_STYLE[t.status] || "text-slate-600 bg-slate-100 border-slate-200"}`}>{t.status}</span>
                {t.status !== "resolved" && (
                  <button onClick={() => handleResolve(t.id)} className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-700 text-[10px] font-bold transition-all cursor-pointer">
                    <CheckCircle className="w-3.5 h-3.5" /> Resolve
                  </button>
                )}
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-4">{t.message}</p>

            {t.status !== "resolved" && (
              <div className="flex gap-3 items-end border-t border-slate-100 pt-4">
                <div className="flex-grow">
                  <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">Write Response</label>
                  <textarea
                    rows={2}
                    placeholder="Type your reply to the customer..."
                    value={replies[t.id] || ""}
                    onChange={e => setReplies(prev => ({ ...prev, [t.id]: e.target.value }))}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all font-medium resize-none"
                  />
                </div>
                <button onClick={() => handleReply(t.id)} className="p-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white shadow-sm cursor-pointer transition-all" title="Send Reply">
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
