"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  MOCK_USER, MOCK_ORDERS, MOCK_DOWNLOADS, MOCK_TICKETS 
} from "@/lib/orders-data";
import { Ticket } from "@/types/order";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShoppingBag, Download, MessageSquare, Clipboard, Check, 
  AlertCircle, PlusCircle, Clock, CheckCircle2, TicketIcon 
} from "lucide-react";

export default function UserDashboard() {
  const [activeTab, setActiveTab] = useState<"purchases" | "apps" | "tickets">("purchases");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  
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

  const totalSpent = MOCK_ORDERS
    .filter(o => o.status === "approved")
    .reduce((sum, o) => sum + parseInt(o.price.replace(/[^0-9]/g, "")), 0);

  return (
    <div className="space-y-8 relative font-sans">
      {/* Welcome Banner */}
      <div className="p-8 rounded-3xl bg-blue-600 text-white relative overflow-hidden shadow-2xs">
        <div className="relative z-10 space-y-2">
          <h1 className="font-heading font-extrabold text-2xl md:text-4xl">
            Welcome back, {MOCK_USER.name}! 👋
          </h1>
          <p className="text-xs md:text-sm text-blue-100 font-medium">
            Account Type: <strong className="text-white font-bold bg-white/20 px-2 py-0.5 rounded-full text-xs">{MOCK_USER.role}</strong> — Joined Plaxora on {MOCK_USER.joinedDate}
          </p>
        </div>
      </div>

      {/* Stats Widgets Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {[
          { label: "Total Spent", value: `${totalSpent.toLocaleString()} BDT`, icon: ShoppingBag, color: "bg-blue-50 text-blue-600 border-blue-200" },
          { label: "Templates Owned", value: MOCK_ORDERS.length.toString(), icon: Clipboard, color: "bg-purple-50 text-purple-600 border-purple-200" },
          { label: "App Downloads", value: MOCK_DOWNLOADS.length.toString(), icon: Download, color: "bg-amber-50 text-amber-600 border-amber-200" },
          { label: "Open Tickets", value: tickets.filter(t => t.status === "open").length.toString(), icon: MessageSquare, color: "bg-rose-50 text-rose-600 border-rose-200" },
        ].map((stat, i) => (
          <div key={i} className="p-6 rounded-2xl bg-white border border-slate-200 flex items-center justify-between shadow-2xs">
            <div>
              <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                {stat.label}
              </span>
              <span className="font-heading font-extrabold text-xl md:text-2xl text-slate-900">{stat.value}</span>
            </div>
            <div className={`p-3 rounded-xl border ${stat.color}`}>
              <stat.icon className="w-5 h-5 shrink-0" />
            </div>
          </div>
        ))}
      </div>

      {/* Tabs Switcher */}
      <div className="border-b border-slate-200 flex gap-6 overflow-x-auto no-scrollbar">
        {[
          { id: "purchases", label: "My Purchases", count: MOCK_ORDERS.length },
          { id: "apps", label: "Downloaded Apps", count: MOCK_DOWNLOADS.length },
          { id: "tickets", label: "Support Tickets", count: tickets.length },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`py-3 text-sm font-semibold border-b-2 transition-all shrink-0 flex items-center gap-2 cursor-pointer ${
              activeTab === tab.id
                ? "border-blue-600 text-blue-600 font-bold"
                : "border-transparent text-slate-500 hover:text-slate-900"
            }`}
          >
            <span>{tab.label}</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-slate-700 font-semibold">
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
            className="space-y-4"
          >
            {MOCK_ORDERS.map((order) => (
              <div
                key={order.id}
                className="p-6 rounded-2xl bg-white border border-slate-200 grid grid-cols-1 lg:grid-cols-4 gap-6 items-center shadow-2xs hover:border-purple-300 transition-all"
              >
                {/* Product Icon & Info */}
                <div className="lg:col-span-2 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                    <ShoppingBag className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-sm md:text-base text-slate-900 leading-snug">
                      {order.productTitle}
                    </h3>
                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                      <span className="text-[10px] text-slate-500">Order ID: <strong className="text-slate-700">{order.id}</strong></span>
                      <span className="text-[10px] text-slate-300">•</span>
                      <span className="text-[10px] text-slate-500">Date: <strong className="text-slate-700">{order.date}</strong></span>
                    </div>
                  </div>
                </div>

                {/* Status Column */}
                <div className="flex flex-col lg:items-center">
                  <div className="flex items-center gap-2">
                    {order.status === "approved" ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-emerald-600 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Approved
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full">
                        <Clock className="w-3.5 h-3.5" />
                        Pending Approval
                      </span>
                    )}
                    <span className="font-heading font-bold text-xs text-slate-900">{order.price}</span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-medium mt-1">
                    Via {order.paymentMethod === "bkash" ? "bKash" : order.paymentMethod === "nagad" ? "Nagad" : "Rocket"} ({order.senderPhone})
                  </span>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2 lg:items-end">
                  {order.status === "approved" ? (
                    <>
                      <button
                        onClick={() => handleDownloadZIP(order.productTitle)}
                        className="flex items-center justify-center gap-1.5 w-full lg:max-w-[150px] py-2 px-4 rounded-xl bg-blue-600 hover:bg-purple-600 text-xs font-semibold text-white transition-all shadow-2xs cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" />
                        Download ZIP
                      </button>
                      <button
                        onClick={() => handleCopyLicense(order.licenseKey)}
                        className="flex items-center justify-center gap-1.5 w-full lg:max-w-[150px] py-2 px-4 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-[10px] font-semibold text-slate-700 transition-all cursor-pointer"
                      >
                        {copiedKey === order.licenseKey ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-600" />
                            Copied Key!
                          </>
                        ) : (
                          <>
                            <Clipboard className="w-3 h-3 text-slate-500" />
                            Copy License
                          </>
                        )}
                      </button>
                    </>
                  ) : (
                    <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-[10px] text-slate-700 space-y-1 leading-normal max-w-xs">
                      <div className="flex items-center gap-1 font-semibold text-amber-800">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>Verifying Transaction</span>
                      </div>
                      <p className="text-slate-600 font-normal">
                        Manual validation of TxnID: <code className="font-mono font-bold text-slate-900 bg-white px-1 py-0.5 rounded border border-amber-200">{order.transactionId}</code> is currently being audited. Unlocks within 1-2 hours.
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
            <div className="rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-2xs">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider border-b border-slate-200">
                    <th className="p-4">App Title</th>
                    <th className="p-4">Version</th>
                    <th className="p-4">OS Platform</th>
                    <th className="p-4">Downloaded Date</th>
                    <th className="p-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {MOCK_DOWNLOADS.map((log) => (
                    <tr key={log.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-4 font-bold text-slate-900">{log.appTitle}</td>
                      <td className="p-4 text-blue-600 font-mono font-bold">{log.version}</td>
                      <td className="p-4 text-slate-600 font-medium">{log.platform}</td>
                      <td className="p-4 text-slate-600 font-medium">{log.date}</td>
                      <td className="p-4 text-right">
                        <Link
                          href={`/apps/${log.appId}`}
                          className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-600 hover:text-purple-600 transition-colors"
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
            <div className="lg:col-span-2 p-6 rounded-2xl bg-white border border-slate-200 space-y-4 shadow-2xs">
              <h3 className="font-heading font-bold text-base text-slate-900 flex items-center gap-2">
                <PlusCircle className="w-4 h-4 text-purple-600" />
                Submit Support Ticket
              </h3>

              <form onSubmit={handleCreateTicket} className="space-y-3.5">
                <div>
                  <label htmlFor="tck-subj" className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                    Ticket Subject
                  </label>
                  <input
                    id="tck-subj"
                    type="text"
                    placeholder="e.g. Tailwind compile issue"
                    value={ticketSubject}
                    onChange={(e) => setTicketSubject(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8FAFC] border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 transition-all font-medium"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="tck-cat" className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                    Support Category
                  </label>
                  <select
                    id="tck-cat"
                    value={ticketCategory}
                    onChange={(e) => setTicketCategory(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8FAFC] border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-blue-600 transition-all font-medium cursor-pointer"
                  >
                    <option value="Technical">Technical Support</option>
                    <option value="Billing">Billing / Payment Issue</option>
                    <option value="Bespoke Request">Bespoke Estimate Request</option>
                    <option value="General">General Inquiry</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="tck-msg" className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                    Describe your issue
                  </label>
                  <textarea
                    id="tck-msg"
                    rows={4}
                    placeholder="Type details..."
                    value={ticketMessage}
                    onChange={(e) => setTicketMessage(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8FAFC] border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 transition-all font-medium resize-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-blue-600 hover:bg-purple-600 text-xs font-semibold text-white transition-all shadow-2xs cursor-pointer"
                >
                  Create Ticket
                </button>
              </form>
            </div>

            {/* Tickets list */}
            <div className="lg:col-span-3 space-y-4">
              <h3 className="font-heading font-bold text-base text-slate-900 flex items-center gap-2 pl-1">
                <TicketIcon className="w-4 h-4 text-purple-600" />
                Past Ticket Logs
              </h3>

              {tickets.map((t) => (
                <div
                  key={t.id}
                  className="p-5 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-2xs hover:border-purple-300 transition-colors"
                >
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-heading font-bold text-xs text-slate-900">{t.subject}</span>
                      <span className="text-[10px] text-slate-400 font-mono font-semibold">({t.id})</span>
                    </div>
                    {t.status === "resolved" ? (
                      <span className="text-[8px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200">
                        Resolved
                      </span>
                    ) : t.status === "replied" ? (
                      <span className="text-[8px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-cyan-50 text-cyan-600 border border-cyan-200">
                        Agent Replied
                      </span>
                    ) : (
                      <span className="text-[8px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                        Open Log
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3 font-normal">
                    {t.message}
                  </p>

                  <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1">
                    <span>Category: <strong className="text-blue-600 font-semibold">{t.category}</strong></span>
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
              className="flex items-center gap-3 p-4 rounded-xl bg-slate-900 text-xs text-white shadow-2xl"
            >
              <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <Check className="w-3.5 h-3.5" />
              </div>
              <p>License key copied to clipboard!</p>
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
              className="flex items-center gap-3 p-4 rounded-xl bg-slate-900 text-xs text-white shadow-2xl"
            >
              <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <Check className="w-3.5 h-3.5" />
              </div>
              <p>Support ticket submitted successfully!</p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function handleDownloadZIP(productTitle: string) {
  const link = document.createElement("a");
  link.href = "#";
  link.setAttribute("download", `${productTitle.toLowerCase().replace(/ /g, "-")}-source.zip`);
  document.body.appendChild(link);
  document.body.removeChild(link);
}
