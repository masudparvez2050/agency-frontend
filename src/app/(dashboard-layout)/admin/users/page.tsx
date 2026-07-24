"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Users, ShieldCheck, Ban, Search } from "lucide-react";

type UserRow = {
  id: string; name: string; email: string; role: string;
  joined: string; orders: number; status: "active" | "suspended";
};

const MOCK_USERS: UserRow[] = [
  { id: "u1", name: "Masud Parvez", email: "masudparvez00019@gmail.com", role: "Admin", joined: "2026-01-10", orders: 12, status: "active" },
  { id: "u2", name: "Rahim Uddin", email: "rahim@example.com", role: "Customer", joined: "2026-02-18", orders: 4, status: "active" },
  { id: "u3", name: "Fatema Begum", email: "fatema@example.com", role: "Customer", joined: "2026-03-05", orders: 2, status: "active" },
  { id: "u4", name: "Karim Ali", email: "karim@example.com", role: "Customer", joined: "2026-04-12", orders: 1, status: "suspended" },
  { id: "u5", name: "Sumaiya Islam", email: "sumaiya@example.com", role: "Customer", joined: "2026-05-20", orders: 6, status: "active" },
  { id: "u6", name: "Nabil Hossain", email: "nabil@example.com", role: "Customer", joined: "2026-06-01", orders: 3, status: "active" },
];

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserRow[]>(MOCK_USERS);
  const [search, setSearch] = useState("");

  const filtered = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  const toggleStatus = (id: string) =>
    setUsers(prev => prev.map(u => u.id === id ? { ...u, status: u.status === "active" ? "suspended" : "active" } : u));

  const promoteToAdmin = (id: string) =>
    setUsers(prev => prev.map(u => u.id === id ? { ...u, role: "Admin" } : u));

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-slate-900">User Management</h1>
          <p className="text-xs text-slate-500 mt-1">View, promote, and manage platform users.</p>
        </div>
        <div className="flex gap-3 text-center">
          <div className="px-4 py-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 shadow-sm">
            <span className="text-xl font-black block">{users.filter(u => u.status === "active").length}</span>
            <span className="text-[9px] font-bold uppercase">Active</span>
          </div>
          <div className="px-4 py-2 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 shadow-sm">
            <span className="text-xl font-black block">{users.filter(u => u.status === "suspended").length}</span>
            <span className="text-[9px] font-bold uppercase">Suspended</span>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text" placeholder="Search by name or email..." value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all font-medium"
        />
      </div>

      {/* Users Table */}
      <div className="rounded-2xl bg-white border border-slate-200 overflow-x-auto shadow-sm">
        <table className="w-full text-left text-xs border-collapse min-w-[600px]">
          <thead>
            <tr className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200">
              <th className="p-4">User</th>
              <th className="p-4">Role</th>
              <th className="p-4">Joined</th>
              <th className="p-4">Orders</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map(u => (
              <motion.tr key={u.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="hover:bg-slate-50/80 transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center font-bold text-xs text-white shrink-0 shadow-sm">
                      {u.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-slate-900">{u.name}</div>
                      <div className="text-[10px] text-slate-500">{u.email}</div>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <span className={`text-[9px] font-bold uppercase px-2.5 py-0.5 rounded-full border ${u.role === "Admin" ? "text-purple-700 bg-purple-50 border-purple-200" : "text-slate-600 bg-slate-100 border-slate-200"}`}>
                    {u.role}
                  </span>
                </td>
                <td className="p-4 text-slate-600 font-medium">{u.joined}</td>
                <td className="p-4 font-black text-slate-900">{u.orders}</td>
                <td className="p-4">
                  <span className={`text-[9px] font-bold uppercase px-2.5 py-0.5 rounded-full border ${u.status === "active" ? "text-emerald-700 bg-emerald-50 border-emerald-200" : "text-rose-700 bg-rose-50 border-rose-200"}`}>
                    {u.status}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex gap-2 justify-end">
                    {u.role !== "Admin" && (
                      <button onClick={() => promoteToAdmin(u.id)} className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-700 text-[10px] font-bold transition-all cursor-pointer">
                        <ShieldCheck className="w-3.5 h-3.5" /> Admin
                      </button>
                    )}
                    <button onClick={() => toggleStatus(u.id)} className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg border text-[10px] font-bold transition-all cursor-pointer ${u.status === "active" ? "bg-rose-50 hover:bg-rose-100 border-rose-200 text-rose-700" : "bg-emerald-50 hover:bg-emerald-100 border-emerald-200 text-emerald-700"}`}>
                      <Ban className="w-3.5 h-3.5" /> {u.status === "active" ? "Suspend" : "Unsuspend"}
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
