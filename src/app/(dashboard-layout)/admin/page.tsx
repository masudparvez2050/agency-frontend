"use client";

import React from "react";
import Link from "next/link";
import { MOCK_ORDERS, MOCK_TICKETS } from "@/lib/orders-data";
import { motion } from "framer-motion";
import {
  DollarSign, Clock, ShieldAlert, TrendingUp,
  ShoppingCart, Package, Smartphone, BookOpen, MessageSquare,
  ArrowRight, CheckCircle
} from "lucide-react";
import { useCMSData } from "@/hooks/useCMS";

const WEEKLY_DATA = [18000, 24000, 21000, 31000, 27000, 38000, 42000];
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const maxVal = Math.max(...WEEKLY_DATA);

export default function AdminOverviewPage() {
  const [orders] = useCMSData<any>("orders", MOCK_ORDERS);
  const [tickets] = useCMSData<any>("tickets", MOCK_TICKETS);

  const totalRevenue = orders.filter((o: any) => o.status === "approved")
    .reduce((sum: number, o: any) => sum + parseInt(o.price.replace(/[^0-9]/g, "")), 0);
  const pendingOrders = orders.filter((o: any) => o.status === "pending").length;
  const openTickets = tickets.filter((t: any) => t.status === "open").length;
  const approvedOrders = orders.filter((o: any) => o.status === "approved").length;

  return (
    <div className="space-y-8 font-sans">
      {/* Header */}
      <div className="p-8 rounded-3xl bg-blue-600 text-white relative overflow-hidden shadow-2xs">
        <div className="relative z-10 space-y-2">
          <h1 className="font-heading font-extrabold text-2xl md:text-4xl">Admin CMS Console</h1>
          <p className="text-xs md:text-sm text-blue-100 font-medium">
            Ecosystem Manager — Monitor revenue, verify payments, manage content, and respond to support.
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {[
          { label: "Total Revenue", value: `${totalRevenue.toLocaleString()} BDT`, icon: DollarSign, color: "text-emerald-600", bg: "bg-emerald-50 border-emerald-200" },
          { label: "Pending Verification", value: pendingOrders.toString(), icon: Clock, color: "text-amber-600", bg: "bg-amber-50 border-amber-200" },
          { label: "Open Support Tickets", value: openTickets.toString(), icon: ShieldAlert, color: "text-rose-600", bg: "bg-rose-50 border-rose-200" },
          { label: "Orders Approved", value: approvedOrders.toString(), icon: CheckCircle, color: "text-blue-600", bg: "bg-blue-50 border-blue-200" },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="p-6 rounded-2xl bg-white border border-slate-200 flex items-center justify-between shadow-2xs"
          >
            <div>
              <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block mb-1">{stat.label}</span>
              <span className="font-heading font-extrabold text-xl md:text-2xl text-slate-900">{stat.value}</span>
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
        <div className="lg:col-span-2 p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-heading font-bold text-base text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-blue-600" />
              Weekly Revenue (BDT)
            </h3>
            <span className="text-[10px] font-semibold text-slate-500 uppercase">Last 7 days</span>
          </div>
          <div className="relative h-44">
            <svg viewBox="0 0 420 140" className="w-full h-full" preserveAspectRatio="none">
              {[0, 1, 2, 3].map(i => (
                <line key={i} x1="0" y1={i * 35} x2="420" y2={i * 35} stroke="#f1f5f9" strokeWidth="1" />
              ))}
              <polyline
                points={WEEKLY_DATA.map((v, i) => `${(i / (WEEKLY_DATA.length - 1)) * 420},${140 - (v / maxVal) * 130}`).join(" ")}
                fill="none"
                stroke="#2563eb"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {WEEKLY_DATA.map((v, i) => (
                <circle
                  key={i}
                  cx={(i / (WEEKLY_DATA.length - 1)) * 420}
                  cy={140 - (v / maxVal) * 130}
                  r="4"
                  fill="#2563eb"
                  stroke="#ffffff"
                  strokeWidth="2"
                />
              ))}
            </svg>
            <div className="absolute bottom-0 left-0 right-0 flex justify-between px-0 -mb-5">
              {DAYS.map((d) => (
                <span key={d} className="text-[9px] font-semibold text-slate-400">{d}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Access Links */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-4">
          <h3 className="font-heading font-bold text-base text-slate-900">Quick Access</h3>
          <div className="space-y-2">
            {[
              { label: "Verify Payments", href: "/admin/orders", icon: ShoppingCart, color: "text-amber-600 bg-amber-50" },
              { label: "Manage Products", href: "/admin/products", icon: Package, color: "text-blue-600 bg-blue-50" },
              { label: "Manage Apps", href: "/admin/apps", icon: Smartphone, color: "text-purple-600 bg-purple-50" },
              { label: "Blog Posts", href: "/admin/blog", icon: BookOpen, color: "text-emerald-600 bg-emerald-50" },
              { label: "Tickets Inbox", href: "/admin/tickets", icon: MessageSquare, color: "text-rose-600 bg-rose-50" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-3 p-3 rounded-xl bg-[#F8FAFC] border border-slate-200 hover:border-blue-200 hover:bg-blue-50/50 text-xs font-semibold text-slate-700 hover:text-slate-900 transition-all group"
              >
                <div className={`p-1.5 rounded-lg ${link.color}`}>
                  <link.icon className="w-4 h-4 shrink-0" />
                </div>
                <span className="flex-grow">{link.label}</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 transition-all" />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-heading font-bold text-base text-slate-900">Recent Orders</h3>
          <Link href="/admin/orders" className="text-[11px] font-semibold text-blue-600 hover:text-purple-600 flex items-center gap-1">
            View All <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-2xs">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider border-b border-slate-200">
                <th className="p-4">Product</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {orders.slice(0, 5).map((order: any) => (
                <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-bold text-slate-900">{order.productTitle}</td>
                  <td className="p-4 text-slate-600 font-medium">{order.senderPhone}</td>
                  <td className="p-4 font-black text-slate-900">{order.price}</td>
                  <td className="p-4">
                    <span className={`text-[9px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                      order.status === "approved" ? "text-emerald-600 bg-emerald-50 border-emerald-200" :
                      order.status === "cancelled" ? "text-rose-600 bg-rose-50 border-rose-200" :
                      "text-amber-700 bg-amber-50 border-amber-200"
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
