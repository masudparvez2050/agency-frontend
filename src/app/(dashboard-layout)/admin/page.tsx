"use client";

import React, { useState } from "react";
import { 
  MOCK_ORDERS, MOCK_TICKETS 
} from "@/lib/orders-data";
import { Order, Ticket } from "@/types/order";
import { motion, AnimatePresence } from "framer-motion";
import { 
  DollarSign, Clock, ShieldAlert, Layers, Check, X, 
  Send, Plus, FileCode, Smartphone, ArrowRight, MessageSquare 
} from "lucide-react";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<"audits" | "upload" | "support">("audits");
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);
  const [tickets, setTickets] = useState<Ticket[]>(MOCK_TICKETS);
  
  // CMS upload form states
  const [productTitle, setProductTitle] = useState("");
  const [productCategory, setProductCategory] = useState("Next.js");
  const [productPrice, setProductPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productSuccess, setProductSuccess] = useState(false);

  const [appTitle, setAppTitle] = useState("");
  const [appCategory, setAppCategory] = useState("Utility");
  const [appVersion, setAppVersion] = useState("");
  const [appSize, setAppSize] = useState("");
  const [appSuccess, setAppSuccess] = useState(false);

  // Ticket reply states
  const [replyMessage, setReplyMessage] = useState<{ [key: string]: string }>({});

  const handleApproveOrder = (orderId: string) => {
    setOrders(prevOrders => 
      prevOrders.map(order => 
        order.id === orderId 
          ? { 
              ...order, 
              status: "approved", 
              licenseKey: `PLXR-AUTO-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`, 
              downloadLink: "#" 
            } 
          : order
      )
    );
  };

  const handleCancelOrder = (orderId: string) => {
    setOrders(prevOrders => 
      prevOrders.map(order => 
        order.id === orderId ? { ...order, status: "cancelled" } : order
      )
    );
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productTitle || !productPrice) return;
    setProductSuccess(true);
    setProductTitle("");
    setProductPrice("");
    setProductDescription("");
    setTimeout(() => setProductSuccess(false), 5000);
  };

  const handleAddApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!appTitle || !appVersion || !appSize) return;
    setAppSuccess(true);
    setAppTitle("");
    setAppVersion("");
    setAppSize("");
    setTimeout(() => setAppSuccess(false), 5000);
  };

  const handleSendTicketReply = (ticketId: string) => {
    if (!replyMessage[ticketId]) return;
    
    setTickets(prevTickets => 
      prevTickets.map(ticket => 
        ticket.id === ticketId ? { ...ticket, status: "replied" } : ticket
      )
    );

    // Clear message field
    setReplyMessage(prev => ({ ...prev, [ticketId]: "" }));
  };

  // Metrics calculation
  const totalRevenue = orders
    .filter(o => o.status === "approved")
    .reduce((sum, o) => sum + parseInt(o.price.replace(/[^0-9]/g, "")), 0);

  const pendingCount = orders.filter(o => o.status === "pending").length;
  const unresolvedTickets = tickets.filter(t => t.status === "open").length;

  return (
    <div className="space-y-10 relative">
      {/* Welcome Header */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-purple-900/20 via-slate-950 to-cyan-900/10 border border-purple-500/10 shadow-xl">
        <h1 className="text-2xl md:text-4xl font-black text-white">Admin CMS Console</h1>
        <p className="text-xs md:text-sm text-slate-400 mt-1">
          Ecosystem Manager — Verify manual payments, upload templates or native app binaries, and answer customer support logs.
        </p>
      </div>

      {/* Admin Stats Widgets */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {[
          { label: "Total Revenue", value: `${totalRevenue.toLocaleString()} BDT`, icon: DollarSign, color: "text-emerald-400" },
          { label: "Pending Verification", value: pendingCount.toString(), icon: Clock, color: "text-amber-400" },
          { label: "Ecosystem Products", value: "6 Templates", icon: Layers, color: "text-cyan-400" },
          { label: "Unresolved Tickets", value: unresolvedTickets.toString(), icon: ShieldAlert, color: "text-pink-400" },
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

      {/* Tabs Menu */}
      <div className="border-b border-slate-900 flex gap-6 overflow-x-auto no-scrollbar">
        {[
          { id: "audits", label: "Manual Payments Audit", count: pendingCount },
          { id: "upload", label: "CMS Content Uploader", count: null },
          { id: "support", label: "Support Tickets", count: unresolvedTickets },
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
            {tab.count !== null && (
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full border ${
                tab.count > 0 ? "bg-amber-500/10 border-amber-500/20 text-amber-400" : "bg-slate-900 border-slate-800 text-slate-400"
              }`}>
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Tab Panels */}
      <div className="relative min-h-[300px]">
        
        {/* Tab 1: Manual Payments Audit */}
        {activeTab === "audits" && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="rounded-2xl bg-slate-950/70 border border-slate-900 overflow-hidden shadow-lg">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-900/50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-900">
                    <th className="p-4">Customer Order</th>
                    <th className="p-4">Details</th>
                    <th className="p-4">Transaction ID (TxnID)</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-900">
                  {orders.map((order) => (
                    <tr key={order.id} className="hover:bg-slate-900/10 transition-colors">
                      <td className="p-4">
                        <div className="font-bold text-white">{order.productTitle}</div>
                        <div className="text-[10px] text-slate-500 mt-0.5">OrderID: {order.id} | Date: {order.date}</div>
                      </td>
                      <td className="p-4">
                        <div className="font-semibold text-slate-300">Price: {order.price}</div>
                        <div className="text-[10px] text-slate-500 uppercase mt-0.5">Via {order.paymentMethod} ({order.senderPhone})</div>
                      </td>
                      <td className="p-4 font-mono font-bold text-cyan-400 uppercase tracking-wide">
                        {order.transactionId}
                      </td>
                      <td className="p-4">
                        {order.status === "approved" ? (
                          <span className="inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
                            Approved
                          </span>
                        ) : order.status === "cancelled" ? (
                          <span className="inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider text-rose-400 bg-rose-500/10 border border-rose-500/20 px-2 py-0.5 rounded">
                            Cancelled
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded animate-pulse">
                            Pending Verify
                          </span>
                        )}
                      </td>
                      <td className="p-4 text-right">
                        {order.status === "pending" ? (
                          <div className="flex gap-2 justify-end">
                            <button
                              onClick={() => handleCancelOrder(order.id)}
                              className="p-2 rounded-xl bg-slate-900 hover:bg-rose-600/10 border border-slate-850 hover:border-rose-500/20 text-slate-400 hover:text-rose-400 transition-all cursor-pointer"
                              title="Reject Transaction"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleApproveOrder(order.id)}
                              className="flex items-center gap-1 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-[10px] font-bold text-white transition-all shadow-md shadow-emerald-500/10 cursor-pointer"
                            >
                              <Check className="w-3 h-3" />
                              Approve
                            </button>
                          </div>
                        ) : (
                          <span className="text-[10px] text-slate-650 font-medium">Audited</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* Tab 2: CMS Content Uploader */}
        {activeTab === "upload" && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start"
          >
            {/* Upload Template */}
            <div className="p-6 rounded-2xl bg-slate-950/70 border border-slate-900 backdrop-blur-md space-y-6 shadow-lg">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <FileCode className="w-5 h-5 text-purple-400" />
                Upload New Product / Template
              </h3>

              <form onSubmit={handleAddProduct} className="space-y-4">
                {productSuccess && (
                  <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-center gap-2">
                    <Check className="w-4 h-4 shrink-0" />
                    <span>Product template metadata uploaded successfully!</span>
                  </div>
                )}

                <div>
                  <label htmlFor="prod-title" className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">
                    Product Title
                  </label>
                  <input
                    id="prod-title"
                    type="text"
                    placeholder="e.g. Next.js SaaS Boilerplate"
                    value={productTitle}
                    onChange={(e) => setProductTitle(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-850 text-xs text-white placeholder-slate-550 focus:outline-none focus:border-purple-500/40 transition-colors"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="prod-cat" className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">
                      Category
                    </label>
                    <select
                      id="prod-cat"
                      value={productCategory}
                      onChange={(e) => setProductCategory(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-850 text-xs text-slate-300 focus:outline-none focus:border-purple-500/40 transition-colors cursor-pointer"
                    >
                      <option>Next.js</option>
                      <option>React</option>
                      <option>Flutter</option>
                      <option>Figma</option>
                      <option>Scripts</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="prod-price" className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">
                      Price (BDT)
                    </label>
                    <input
                      id="prod-price"
                      type="text"
                      placeholder="e.g. 1500"
                      value={productPrice}
                      onChange={(e) => setProductPrice(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-850 text-xs text-white placeholder-slate-550 focus:outline-none focus:border-purple-500/40 transition-colors"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="prod-desc" className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">
                    Short Description
                  </label>
                  <textarea
                    id="prod-desc"
                    rows={3}
                    placeholder="Describe main features..."
                    value={productDescription}
                    onChange={(e) => setProductDescription(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-850 text-xs text-white placeholder-slate-550 focus:outline-none focus:border-purple-500/40 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-1.5 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-xs font-bold text-white transition-all shadow-md shadow-purple-500/25 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  Publish Template
                </button>
              </form>
            </div>

            {/* Upload App */}
            <div className="p-6 rounded-2xl bg-slate-950/70 border border-slate-900 backdrop-blur-md space-y-6 shadow-lg">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-cyan-400" />
                Upload Native Store App
              </h3>

              <form onSubmit={handleAddApp} className="space-y-4">
                {appSuccess && (
                  <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-center gap-2">
                    <Check className="w-4 h-4 shrink-0" />
                    <span>App binary configuration uploaded successfully!</span>
                  </div>
                )}

                <div>
                  <label htmlFor="app-title" className="block text-[10px] font-bold text-slate-505 uppercase tracking-wide mb-1.5">
                    Application Name
                  </label>
                  <input
                    id="app-title"
                    type="text"
                    placeholder="e.g. Plaxora Gaming Hub"
                    value={appTitle}
                    onChange={(e) => setAppTitle(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-850 text-xs text-white placeholder-slate-550 focus:outline-none focus:border-purple-500/40 transition-colors"
                    required
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-1">
                    <label htmlFor="app-cat" className="block text-[10px] font-bold text-slate-505 uppercase tracking-wide mb-1.5">
                      Category
                    </label>
                    <select
                      id="app-cat"
                      value={appCategory}
                      onChange={(e) => setAppCategory(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-850 text-xs text-slate-300 focus:outline-none focus:border-purple-500/40 transition-colors cursor-pointer"
                    >
                      <option>Utility</option>
                      <option>Gaming</option>
                      <option>Fintech</option>
                      <option>DevTools</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="app-ver" className="block text-[10px] font-bold text-slate-505 uppercase tracking-wide mb-1.5">
                      Version
                    </label>
                    <input
                      id="app-ver"
                      type="text"
                      placeholder="e.g. v1.0.0"
                      value={appVersion}
                      onChange={(e) => setAppVersion(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-850 text-xs text-white placeholder-slate-550 focus:outline-none focus:border-purple-500/40 transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="app-size" className="block text-[10px] font-bold text-slate-505 uppercase tracking-wide mb-1.5">
                      Size (MB)
                    </label>
                    <input
                      id="app-size"
                      type="text"
                      placeholder="e.g. 45 MB"
                      value={appSize}
                      onChange={(e) => setAppSize(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-850 text-xs text-white placeholder-slate-550 focus:outline-none focus:border-purple-500/40 transition-colors"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-1.5 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-xs font-bold text-white transition-all shadow-md shadow-cyan-500/25 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  Publish App Binary
                </button>
              </form>
            </div>
          </motion.div>
        )}

        {/* Tab 3: Support Tickets Reply Center */}
        {activeTab === "support" && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {tickets.map((t) => (
              <div
                key={t.id}
                className="p-6 rounded-2xl bg-slate-950/70 border border-slate-900 backdrop-blur-md space-y-4 shadow-lg hover:border-slate-850 transition-colors"
              >
                {/* Header */}
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-black text-white">{t.subject}</span>
                    <span className="text-[10px] text-slate-500 font-mono">({t.id})</span>
                  </div>
                  {t.status === "resolved" ? (
                    <span className="text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      Resolved
                    </span>
                  ) : t.status === "replied" ? (
                    <span className="text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                      Replied
                    </span>
                  ) : (
                    <span className="text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                      Unresolved
                    </span>
                  )}
                </div>

                {/* Msg body */}
                <p className="text-xs text-slate-400 leading-relaxed border-t border-slate-900 pt-3.5">
                  {t.message}
                </p>

                <div className="flex items-center justify-between text-[10px] text-slate-500 border-b border-slate-900 pb-3.5">
                  <span>Category: <strong className="text-purple-400 font-bold">{t.category}</strong></span>
                  <span>Logged Date: <strong>{t.date}</strong></span>
                </div>

                {/* Reply Form */}
                {t.status !== "resolved" && (
                  <div className="flex gap-3 items-end">
                    <div className="flex-grow">
                      <label htmlFor={`rep-${t.id}`} className="block text-[9px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">
                        Write Response
                      </label>
                      <textarea
                        id={`rep-${t.id}`}
                        rows={2}
                        placeholder="Type developer support answer..."
                        value={replyMessage[t.id] || ""}
                        onChange={(e) => setReplyMessage(prev => ({ ...prev, [t.id]: e.target.value }))}
                        className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-850 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-purple-500/40 transition-colors resize-none"
                      />
                    </div>
                    <button
                      onClick={() => handleSendTicketReply(t.id)}
                      className="p-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white shadow-md cursor-pointer"
                      title="Send Reply"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
