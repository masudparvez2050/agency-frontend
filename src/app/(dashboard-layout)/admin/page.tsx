"use client";

import React from "react";
import Link from "next/link";
import { MOCK_ORDERS, MOCK_TICKETS } from "@/lib/orders-data";
import { motion } from "framer-motion";
import {
  DollarSign, Clock, ShieldAlert, Layers, Users, TrendingUp,
  ShoppingCart, Package, Smartphone, BookOpen, MessageSquare,
  ArrowRight, CheckCircle, AlertTriangle
} from "lucide-react";

const totalRevenue = MOCK_ORDERS.filter(o => o.status === "approved")
  .reduce((sum, o) => sum + parseInt(o.price.replace(/[^0-9]/g, "")), 0);
const pendingOrders = MOCK_ORDERS.filter(o => o.status === "pending").length;
const openTickets = MOCK_TICKETS.filter(t => t.status === "open").length;
const approvedOrders = MOCK_ORDERS.filter(o => o.status === "approved").length;

// Mock weekly revenue data for SVG chart
const WEEKLY_DATA = [18000, 24000, 21000, 31000, 27000, 38000, 42000];
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const maxVal = Math.max(...WEEKLY_DATA);

export default function AdminOverviewPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-purple-900/20 via-slate-950 to-cyan-900/10 border border-purple-500/10 shadow-xl">
        <h1 className="text-2xl md:text-4xl font-black text-white">Admin CMS Console</h1>
        <p className="text-xs md:text-sm text-slate-400 mt-1">
          Ecosystem Manager — Monitor revenue, verify payments, manage content, and respond to support.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {[
          { label: "Total Revenue", value: `${totalRevenue.toLocaleString()} BDT`, icon: DollarSign, color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" },
          { label: "Pending Verification", value: pendingOrders.toString(), icon: Clock, color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/20" },
          { label: "Open Support Tickets", value: openTickets.toString(), icon: ShieldAlert, color: "text-pink-400", bg: "bg-pink-500/10 border-pink-500/20" },
          { label: "Orders Approved", value: approvedOrders.toString(), icon: CheckCircle, color: "text-cyan-400", bg: "bg-cyan-500/10 border-cyan-500/20" },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="p-6 rounded-2xl bg-slate-950/70 border border-slate-900/80 backdrop-blur-md flex items-center justify-between shadow-lg"
          >
            <div>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">{stat.label}</span>
              <span className="text-xl md:text-2xl font-black text-white">{stat.value}</span>
            </div>
            <div className={`p-3 rounded-xl border ${stat.bg} ${stat.color}`}>
              <stat.icon className="w-5 h-5 shrink-0" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Revenue Chart + Quick Links */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Weekly Revenue SVG Chart */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-slate-950/70 border border-slate-900 shadow-lg space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-purple-400" />
              Weekly Revenue (BDT)
            </h3>
            <span className="text-[10px] font-bold text-slate-500 uppercase">Last 7 days</span>
          </div>
          <div className="relative h-44">
            <svg viewBox="0 0 420 140" className="w-full h-full" preserveAspectRatio="none">
              {/* Grid lines */}
              {[0, 1, 2, 3].map(i => (
                <line key={i} x1="0" y1={i * 35} x2="420" y2={i * 35} stroke="#1e293b" strokeWidth="1" />
              ))}
              {/* Area fill */}
              <defs>
                <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#9333ea" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#9333ea" stopOpacity="0" />
                </linearGradient>
              </defs>
              <polygon
                points={`0,140 ${WEEKLY_DATA.map((v, i) => `${(i / (WEEKLY_DATA.length - 1)) * 420},${140 - (v / maxVal) * 130}`).join(" ")} 420,140`}
                fill="url(#revenueGrad)"
              />
              {/* Line */}
              <polyline
                points={WEEKLY_DATA.map((v, i) => `${(i / (WEEKLY_DATA.length - 1)) * 420},${140 - (v / maxVal) * 130}`).join(" ")}
                fill="none"
                stroke="#9333ea"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Dots */}
              {WEEKLY_DATA.map((v, i) => (
                <circle
                  key={i}
                  cx={(i / (WEEKLY_DATA.length - 1)) * 420}
                  cy={140 - (v / maxVal) * 130}
                  r="4"
                  fill="#9333ea"
                  stroke="#030014"
                  strokeWidth="2"
                />
              ))}
            </svg>
            {/* X axis labels */}
            <div className="absolute bottom-0 left-0 right-0 flex justify-between px-0 -mb-5">
              {DAYS.map((d) => (
                <span key={d} className="text-[9px] font-bold text-slate-600">{d}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Access Links */}
        <div className="p-6 rounded-2xl bg-slate-950/70 border border-slate-900 shadow-lg space-y-4">
          <h3 className="text-base font-bold text-white">Quick Access</h3>
          <div className="space-y-2">
            {[
              { label: "Verify Payments", href: "/admin/orders", icon: ShoppingCart, color: "text-amber-400" },
              { label: "Manage Products", href: "/admin/products", icon: Package, color: "text-blue-400" },
              { label: "Manage Apps", href: "/admin/apps", icon: Smartphone, color: "text-cyan-400" },
              { label: "Blog Posts", href: "/admin/blog", icon: BookOpen, color: "text-green-400" },
              { label: "Tickets Inbox", href: "/admin/tickets", icon: MessageSquare, color: "text-pink-400" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/40 border border-slate-900 hover:border-slate-800 text-xs font-bold text-slate-350 hover:text-white transition-all group"
              >
                <link.icon className={`w-4 h-4 ${link.color} shrink-0`} />
                <span className="flex-grow">{link.label}</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white">Recent Orders</h3>
          <Link href="/admin/orders" className="text-[10px] font-bold text-purple-400 hover:text-purple-300 flex items-center gap-1">
            View All <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="rounded-2xl bg-slate-950/70 border border-slate-900 overflow-hidden shadow-lg">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-900/50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-900">
                <th className="p-4">Product</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-900">
              {MOCK_ORDERS.slice(0, 5).map((order) => (
                <tr key={order.id} className="hover:bg-slate-900/10 transition-colors">
                  <td className="p-4 font-semibold text-white">{order.productTitle}</td>
                  <td className="p-4 text-slate-400">{order.senderPhone}</td>
                  <td className="p-4 font-bold text-white">{order.price}</td>
                  <td className="p-4">
                    <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${
                      order.status === "approved" ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" :
                      order.status === "cancelled" ? "text-rose-400 bg-rose-500/10 border-rose-500/20" :
                      "text-amber-400 bg-amber-500/10 border-amber-500/20 animate-pulse"
                    }`}>{order.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
