"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  MOCK_USER, MOCK_ORDERS, MOCK_DOWNLOADS, MOCK_TICKETS 
} from "@/lib/orders-data";
import { Order, Ticket, DownloadLog } from "@/types/order";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShoppingBag, Download, MessageSquare, Clipboard, Check, 
  AlertCircle, PlusCircle, Clock, CheckCircle2, TicketIcon 
} from "lucide-react";

export default function UserDashboard() {
  const [activeTab, setActiveTab] = useState<"purchases" | "apps" | "tickets">("purchases");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  
  // Support ticket form state
  const [ticketSubject, setTicketSubject] = useState("");
  const [ticketCategory, setTicketCategory] = useState<any>("Technical");
  const [ticketMessage, setTicketMessage] = useState("");
  const [tickets, setTickets] = useState<Ticket[]>(MOCK_TICKETS);
  const [ticketSuccess, setTicketSuccess] = useState(false);

  const handleCopyLicense = (key: string) => {
    navigator.clipboard.writeText(key);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 3000);
  };

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketSubject || !ticketMessage) return;

    const newTicket: Ticket = {
      id: `TCK-${Math.floor(1000 + Math.random() * 9000)}`,
      subject: ticketSubject,
      category: ticketCategory,
      message: ticketMessage,
      status: "open",
      date: new Date().toISOString().split("T")[0],
    };

    setTickets([newTicket, ...tickets]);
    setTicketSubject("");
    setTicketMessage("");
    setTicketSuccess(true);
    setTimeout(() => setTicketSuccess(false), 5000);
  };

  // Stats calculation
  const totalSpent = MOCK_ORDERS
    .filter(o => o.status === "approved")
    .reduce((sum, o) => sum + parseInt(o.price.replace(/[^0-9]/g, "")), 0);

  return (
    <div className="space-y-10 relative">
      {/* Welcome Banner */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-purple-900/20 via-slate-950 to-cyan-900/10 border border-purple-500/10 relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 blur-2xl rounded-full" />
        <div className="relative z-10 space-y-2">
          <h1 className="text-2xl md:text-4xl font-black text-white">
            Welcome back, {MOCK_USER.name}! 👋
          </h1>
          <p className="text-xs md:text-sm text-slate-400">
            Account Type: <strong className="text-purple-400 font-bold">{MOCK_USER.role}</strong> — Joined Plaxora on {MOCK_USER.joinedDate}
          </p>
        </div>
      </div>

      {/* Stats Widgets Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {[
          { label: "Total Spent", value: `${totalSpent.toLocaleString()} BDT`, icon: ShoppingBag, color: "text-purple-400" },
          { label: "Templates Owned", value: MOCK_ORDERS.length.toString(), icon: Clipboard, color: "text-cyan-400" },
          { label: "App Downloads", value: MOCK_DOWNLOADS.length.toString(), icon: Download, color: "text-amber-400" },
          { label: "Open Tickets", value: tickets.filter(t => t.status === "open").length.toString(), icon: MessageSquare, color: "text-pink-400" },
        ].map((stat, i) => (
          <div key={i} className="p-6 rounded-2xl bg-slate-950/70 border border-slate-900/80 backdrop-blur-md flex items-center justify-between shadow-lg">
            <div>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                {stat.label}
              </span>
              <span className="text-xl md:text-2xl font-black text-white">{stat.value}</span>
            </div>
            <div className={`p-3 rounded-xl bg-slate-900 border border-slate-850 ${stat.color}`}>
              <stat.icon className="w-5 h-5 shrink-0" />
            </div>
          </div>
        ))}
      </div>

      {/* Tabs Switcher */}
      <div className="border-b border-slate-900 flex gap-6 overflow-x-auto no-scrollbar">
        {[
          { id: "purchases", label: "My Purchases", count: MOCK_ORDERS.length },
          { id: "apps", label: "Downloaded Apps", count: MOCK_DOWNLOADS.length },
          { id: "tickets", label: "Support Tickets", count: tickets.length },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`py-3.5 text-sm font-bold border-b-2 transition-all shrink-0 flex items-center gap-2 ${
              activeTab === tab.id
                ? "border-purple-500 text-white"
                : "border-transparent text-slate-500 hover:text-slate-350"
            }`}
          >
            <span>{tab.label}</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-slate-400">
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Tab Panels */}
      <div className="relative min-h-[300px]">
        
        {/* Tab 1: Purchases */}
        {activeTab === "purchases" && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {MOCK_ORDERS.map((order) => (
              <div
                key={order.id}
                className="p-6 rounded-2xl bg-slate-950/70 border border-slate-900/80 backdrop-blur-md grid grid-cols-1 lg:grid-cols-4 gap-6 items-center shadow-lg hover:border-slate-800 transition-colors"
              >
                {/* Product Icon & Info */}
                <div className="lg:col-span-2 flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-tr ${order.imageGradient} shrink-0 relative flex items-center justify-center p-3 text-white border border-white/5`}>
                    <ShoppingBag className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-sm md:text-base font-bold text-white leading-snug">
                      {order.productTitle}
                    </h3>
                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                      <span className="text-[10px] text-slate-500">Order ID: <strong>{order.id}</strong></span>
                      <span className="text-[10px] text-slate-500">•</span>
                      <span className="text-[10px] text-slate-500">Date: <strong>{order.date}</strong></span>
                    </div>
                  </div>
                </div>

                {/* Status Column */}
                <div className="flex flex-col lg:items-center">
                  <div className="flex items-center gap-2.5">
                    {order.status === "approved" ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Approved
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded">
                        <Clock className="w-3.5 h-3.5" />
                        Pending Approval
                      </span>
                    )}
                    <span className="text-xs font-bold text-white">{order.price}</span>
                  </div>
                  <span className="text-[9px] text-slate-500 font-semibold mt-1">
                    Via {order.paymentMethod === "bkash" ? "bKash" : order.paymentMethod === "nagad" ? "Nagad" : "Rocket"} ({order.senderPhone})
                  </span>
                </div>

                {/* Actions (Downloads & keys) */}
                <div className="flex flex-col gap-2.5 lg:items-end">
                  {order.status === "approved" ? (
                    <>
                      <button
                        onClick={() => handleDownloadZIP(order.productTitle)}
                        className="flex items-center justify-center gap-1.5 w-full lg:max-w-[150px] py-2 px-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-xs font-bold text-white transition-all shadow-md shadow-purple-500/10"
                      >
                        <Download className="w-3.5 h-3.5" />
                        Download ZIP
                      </button>
                      <button
                        onClick={() => handleCopyLicense(order.licenseKey)}
                        className="flex items-center justify-center gap-1.5 w-full lg:max-w-[150px] py-2 px-4 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 text-[10px] font-bold text-slate-300 hover:text-white transition-all"
                      >
                        {copiedKey === order.licenseKey ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            Copied Key!
                          </>
                        ) : (
                          <>
                            <Clipboard className="w-3 h-3" />
                            Copy License
                          </>
                        )}
                      </button>
                    </>
                  ) : (
                    <div className="p-3.5 rounded-xl bg-slate-900/50 border border-slate-850 text-[10px] text-slate-400 space-y-1.5 leading-normal max-w-xs">
                      <div className="flex items-center gap-1 font-bold text-amber-400">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>Verifying Transaction</span>
                      </div>
                      <p>
                        Manual validation of TxnID: <code className="font-mono text-white">{order.transactionId}</code> is currently being audited by CMS admin. Unlocks within 1-2 hours.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* Tab 2: Apps Downloads */}
        {activeTab === "apps" && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="rounded-2xl bg-slate-950/70 border border-slate-900 overflow-hidden shadow-lg">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-900/50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-900">
                    <th className="p-4">App Title</th>
                    <th className="p-4">Version</th>
                    <th className="p-4">OS Platform</th>
                    <th className="p-4">Downloaded Date</th>
                    <th className="p-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-900">
                  {MOCK_DOWNLOADS.map((log) => (
                    <tr key={log.id} className="hover:bg-slate-900/20 transition-colors">
                      <td className="p-4 font-bold text-white">{log.appTitle}</td>
                      <td className="p-4 text-purple-400 font-mono font-semibold">{log.version}</td>
                      <td className="p-4 text-slate-400 font-medium">{log.platform}</td>
                      <td className="p-4 text-slate-400 font-medium">{log.date}</td>
                      <td className="p-4 text-right">
                        <Link
                          href={`/apps/${log.appId}`}
                          className="inline-flex items-center gap-1 text-[10px] font-bold text-cyan-400 hover:text-cyan-300 transition-colors"
                        >
                          Check Updates
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* Tab 3: Support Tickets */}
        {activeTab === "tickets" && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start"
          >
            {/* Create ticket form */}
            <div className="lg:col-span-2 p-6 rounded-2xl bg-slate-950/70 border border-slate-900 backdrop-blur-md space-y-5 shadow-lg">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <PlusCircle className="w-4 h-4 text-purple-400" />
                Submit Support Ticket
              </h3>

              <form onSubmit={handleCreateTicket} className="space-y-4">
                <div>
                  <label htmlFor="tck-subj" className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">
                    Ticket Subject
                  </label>
                  <input
                    id="tck-subj"
                    type="text"
                    placeholder="e.g. Tailwind v4 compile issue"
                    value={ticketSubject}
                    onChange={(e) => setTicketSubject(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-850 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/40 transition-colors"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="tck-cat" className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">
                    Support Category
                  </label>
                  <select
                    id="tck-cat"
                    value={ticketCategory}
                    onChange={(e) => setTicketCategory(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-850 text-xs text-slate-300 focus:outline-none focus:border-purple-500/40 transition-colors cursor-pointer"
                  >
                    <option value="Technical">Technical Support</option>
                    <option value="Billing">Billing / Payment Issue</option>
                    <option value="Bespoke Request">Bespoke Estimate Request</option>
                    <option value="General">General Inquiry</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="tck-msg" className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">
                    Describe your issue
                  </label>
                  <textarea
                    id="tck-msg"
                    rows={4}
                    placeholder="Type details..."
                    value={ticketMessage}
                    onChange={(e) => setTicketMessage(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-850 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/40 transition-colors resize-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-xs font-bold text-white transition-all shadow-md shadow-purple-500/25"
                >
                  Create Ticket
                </button>
              </form>
            </div>

            {/* Tickets list */}
            <div className="lg:col-span-3 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2 pl-2">
                <TicketIcon className="w-4 h-4 text-purple-400" />
                Past Ticket Logs
              </h3>

              {tickets.map((t) => (
                <div
                  key={t.id}
                  className="p-5 rounded-2xl bg-slate-950/70 border border-slate-900 backdrop-blur-md space-y-3.5 shadow-md hover:border-slate-800 transition-colors"
                >
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-2.5">
                      <span className="text-xs font-black text-white">{t.subject}</span>
                      <span className="text-[10px] text-slate-500 font-mono">({t.id})</span>
                    </div>
                    {t.status === "resolved" ? (
                      <span className="text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        Resolved
                      </span>
                    ) : t.status === "replied" ? (
                      <span className="text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                        Agent Replied
                      </span>
                    ) : (
                      <span className="text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                        Open Log
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed border-t border-slate-900 pt-3">
                    {t.message}
                  </p>

                  <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1">
                    <span>Category: <strong className="text-purple-400 font-bold">{t.category}</strong></span>
                    <span>Date logged: <strong>{t.date}</strong></span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Copy notification popup alert */}
      <AnimatePresence>
        {copiedKey && (
          <div className="fixed bottom-6 right-6 z-50">
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              className="flex items-center gap-3 p-4 rounded-xl bg-slate-950 border border-emerald-500/30 text-xs text-slate-350 shadow-2xl"
            >
              <div className="w-6 h-6 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <Check className="w-3.5 h-3.5" />
              </div>
              <p>
                License key copied to clipboard!
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Support ticket submission success overlay */}
      <AnimatePresence>
        {ticketSuccess && (
          <div className="fixed bottom-6 right-6 z-50">
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              className="flex items-center gap-3 p-4 rounded-xl bg-slate-950 border border-emerald-500/30 text-xs text-slate-350 shadow-2xl"
            >
              <div className="w-6 h-6 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <Check className="w-3.5 h-3.5" />
              </div>
              <p>
                Support ticket submitted successfully to Plaxora CMS!
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Simulated ZIP download trigger helper
function handleDownloadZIP(productTitle: string) {
  const link = document.createElement("a");
  link.href = "#";
  link.setAttribute("download", `${productTitle.toLowerCase().replace(/ /g, "-")}-source.zip`);
  document.body.appendChild(link);
  document.body.removeChild(link);
}
