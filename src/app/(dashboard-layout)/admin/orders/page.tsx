"use client";

import React, { useState, useMemo } from "react";
import { MOCK_ORDERS } from "@/lib/orders-data";
import { Order } from "@/types/order";
import { motion } from "framer-motion";
import { Check, X, Search, Filter } from "lucide-react";

import { useCMSData } from "@/hooks/useCMS";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useCMSData<any>("orders", MOCK_ORDERS);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = useMemo(() => {
    let result = [...orders];
    if (statusFilter !== "all") result = result.filter(o => o.status === statusFilter);
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(o =>
        o.productTitle.toLowerCase().includes(q) ||
        (o.transactionId && o.transactionId.toLowerCase().includes(q)) ||
        (o.senderPhone && o.senderPhone.includes(q))
      );
    }
    return result;
  }, [orders, statusFilter, searchQuery]);

  const pending = orders.filter(o => o.status === "pending").length;
  const approved = orders.filter(o => o.status === "approved").length;

  const handleApprove = (id: string) => {
    setOrders(orders.map(o => o.id === id ? {
      ...o, status: "approved",
      licenseKey: `PLXR-${Math.random().toString(36).substring(2,6).toUpperCase()}-${Math.random().toString(36).substring(2,6).toUpperCase()}`,
      downloadLink: "#"
    } : o));
  };

  const handleCancel = (id: string) => {
    setOrders(orders.map(o => o.id === id ? { ...o, status: "cancelled" } : o));
  };


  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-black text-white">Orders & Payment Verification</h1>
        <p className="text-xs text-slate-400 mt-1">Verify manual bKash/Nagad transactions and approve or reject customer orders.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Pending", value: pending, color: "text-amber-400 border-amber-500/20 bg-amber-500/10" },
          { label: "Approved", value: approved, color: "text-emerald-400 border-emerald-500/20 bg-emerald-500/10" },
          { label: "Total", value: orders.length, color: "text-purple-400 border-purple-500/20 bg-purple-500/10" },
        ].map((s, i) => (
          <div key={i} className={`p-4 rounded-xl border text-center ${s.color}`}>
            <span className="text-2xl font-black block">{s.value}</span>
            <span className="text-[10px] font-bold uppercase tracking-wider">{s.label}</span>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search by product, TxnID, phone..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-900 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-purple-500/40"
          />
        </div>
        <div className="flex gap-2">
          {["all", "pending", "approved", "cancelled"].map(s => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wide border transition-all ${
                statusFilter === s ? "bg-purple-600 border-purple-500 text-white" : "border-slate-900 text-slate-500 hover:text-white"
              }`}
            >{s}</button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div className="rounded-2xl bg-slate-950/70 border border-slate-900 overflow-x-auto shadow-lg">
        <table className="w-full text-left text-xs border-collapse min-w-[700px]">
          <thead>
            <tr className="bg-slate-900/50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-900">
              <th className="p-4">Product / Order ID</th>
              <th className="p-4">Customer</th>
              <th className="p-4">TxnID</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Date</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-900">
            {filtered.length > 0 ? filtered.map((order) => (
              <motion.tr
                key={order.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="hover:bg-slate-900/10 transition-colors"
              >
                <td className="p-4">
                  <div className="font-bold text-white">{order.productTitle}</div>
                  <div className="text-[9px] text-slate-500 font-mono mt-0.5">{order.id}</div>
                </td>
                <td className="p-4">
                  <div className="font-semibold text-slate-300 capitalize">{order.paymentMethod}</div>
                  <div className="text-[10px] text-slate-500">{order.senderPhone}</div>
                </td>
                <td className="p-4 font-mono font-bold text-cyan-400 uppercase text-[11px]">
                  {order.transactionId}
                </td>
                <td className="p-4 font-bold text-white">{order.price}</td>
                <td className="p-4 text-slate-400">{order.date}</td>
                <td className="p-4">
                  <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded border ${
                    order.status === "approved" ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" :
                    order.status === "cancelled" ? "text-rose-400 bg-rose-500/10 border-rose-500/20" :
                    "text-amber-400 bg-amber-500/10 border-amber-500/20 animate-pulse"
                  }`}>{order.status}</span>
                </td>
                <td className="p-4">
                  {order.status === "pending" ? (
                    <div className="flex gap-2 justify-end">
                      <button onClick={() => handleCancel(order.id)} className="p-2 rounded-xl bg-slate-900 hover:bg-rose-600/10 border border-slate-850 hover:border-rose-500/20 text-slate-400 hover:text-rose-400 transition-all cursor-pointer" title="Reject">
                        <X className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => handleApprove(order.id)} className="flex items-center gap-1 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-[10px] font-bold text-white transition-all cursor-pointer">
                        <Check className="w-3 h-3" /> Approve
                      </button>
                    </div>
                  ) : (
                    <span className="text-[10px] text-slate-650 text-right block pr-2">Audited</span>
                  )}
                </td>
              </motion.tr>
            )) : (
              <tr>
                <td colSpan={7} className="p-8 text-center text-slate-500 text-xs">No orders matching filter.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
