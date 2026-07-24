"use client";

import React, { useState, useMemo } from "react";
import { MOCK_ORDERS } from "@/lib/orders-data";
import { motion } from "framer-motion";
import { Check, X, Search } from "lucide-react";

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

  const pending = orders.filter((o: any) => o.status === "pending").length;
  const approved = orders.filter((o: any) => o.status === "approved").length;

  const handleApprove = (id: string) => {
    setOrders(orders.map((o: any) => o.id === id ? {
      ...o, status: "approved",
      licenseKey: `PLXR-${Math.random().toString(36).substring(2,6).toUpperCase()}-${Math.random().toString(36).substring(2,6).toUpperCase()}`,
      downloadLink: "#"
    } : o));
  };

  const handleCancel = (id: string) => {
    setOrders(orders.map((o: any) => o.id === id ? { ...o, status: "cancelled" } : o));
  };

  return (
    <div className="space-y-6 font-sans">
      <div>
        <h1 className="font-heading font-extrabold text-2xl md:text-3xl text-slate-900">Orders & Payment Verification</h1>
        <p className="text-xs text-slate-500 mt-1 font-normal">Verify manual bKash/Nagad transactions and approve or reject customer orders.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Pending", value: pending, color: "text-amber-700 border-amber-200 bg-amber-50" },
          { label: "Approved", value: approved, color: "text-emerald-600 border-emerald-200 bg-emerald-50" },
          { label: "Total", value: orders.length, color: "text-blue-600 border-blue-200 bg-blue-50" },
        ].map((s, i) => (
          <div key={i} className={`p-4 rounded-xl border text-center shadow-2xs ${s.color}`}>
            <span className="font-heading font-extrabold text-2xl block">{s.value}</span>
            <span className="text-[10px] font-semibold uppercase tracking-wider">{s.label}</span>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by product, TxnID, phone..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 transition-all font-medium"
          />
        </div>
        <div className="flex gap-2">
          {["all", "pending", "approved", "cancelled"].map(s => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider border transition-all cursor-pointer ${
                statusFilter === s ? "bg-blue-600 border-blue-600 text-white shadow-2xs" : "bg-white border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >{s}</button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div className="rounded-2xl bg-white border border-slate-200 overflow-x-auto shadow-2xs">
        <table className="w-full text-left text-xs border-collapse min-w-[700px]">
          <thead>
            <tr className="bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider border-b border-slate-200">
              <th className="p-4">Product / Order ID</th>
              <th className="p-4">Customer</th>
              <th className="p-4">TxnID</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Date</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.length > 0 ? filtered.map((order: any) => (
              <motion.tr
                key={order.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="hover:bg-slate-50 transition-colors"
              >
                <td className="p-4">
                  <div className="font-bold text-slate-900">{order.productTitle}</div>
                  <div className="text-[9px] text-slate-400 font-mono mt-0.5">{order.id}</div>
                </td>
                <td className="p-4">
                  <div className="font-semibold text-slate-700 capitalize">{order.paymentMethod}</div>
                  <div className="text-[10px] text-slate-500">{order.senderPhone}</div>
                </td>
                <td className="p-4 font-mono font-bold text-blue-600 uppercase text-[11px]">
                  {order.transactionId}
                </td>
                <td className="p-4 font-black text-slate-900">{order.price}</td>
                <td className="p-4 text-slate-600">{order.date}</td>
                <td className="p-4">
                  <span className={`text-[9px] font-semibold uppercase px-2.5 py-0.5 rounded-full border ${
                    order.status === "approved" ? "text-emerald-600 bg-emerald-50 border-emerald-200" :
                    order.status === "cancelled" ? "text-rose-600 bg-rose-50 border-rose-200" :
                    "text-amber-700 bg-amber-50 border-amber-200"
                  }`}>{order.status}</span>
                </td>
                <td className="p-4">
                  {order.status === "pending" ? (
                    <div className="flex gap-2 justify-end">
                      <button onClick={() => handleCancel(order.id)} className="p-2 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 text-slate-500 hover:text-rose-600 transition-all cursor-pointer" title="Reject">
                        <X className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => handleApprove(order.id)} className="flex items-center gap-1 py-1.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-[10px] font-semibold text-white transition-all cursor-pointer shadow-2xs">
                        <Check className="w-3 h-3" /> Approve
                      </button>
                    </div>
                  ) : (
                    <span className="text-[10px] text-slate-400 text-right block pr-2">Audited</span>
                  )}
                </td>
              </motion.tr>
            )) : (
              <tr>
                <td colSpan={7} className="p-8 text-center text-slate-500 text-xs font-normal">No orders matching filter.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
