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
          <h1 className="text-2xl md:text-3xl font-black text-white">User Management</h1>
          <p className="text-xs text-slate-400 mt-1">View, promote, and manage platform users.</p>
        </div>
        <div className="flex gap-3 text-center">
          <div className="px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
            <span className="text-xl font-black block">{users.filter(u => u.status === "active").length}</span>
            <span className="text-[9px] font-bold uppercase">Active</span>
          </div>
          <div className="px-4 py-2 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400">
            <span className="text-xl font-black block">{users.filter(u => u.status === "suspended").length}</span>
            <span className="text-[9px] font-bold uppercase">Suspended</span>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
        <input
          type="text" placeholder="Search by name or email..." value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-900 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-purple-500/40"
        />
      </div>

      {/* Users Table */}
      <div className="rounded-2xl bg-slate-950/70 border border-slate-900 overflow-x-auto shadow-lg">
        <table className="w-full text-left text-xs border-collapse min-w-[600px]">
          <thead>
            <tr className="bg-slate-900/50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-900">
              <th className="p-4">User</th>
              <th className="p-4">Role</th>
              <th className="p-4">Joined</th>
              <th className="p-4">Orders</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-900">
            {filtered.map(u => (
              <motion.tr key={u.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="hover:bg-slate-900/10 transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-cyan-500 flex items-center justify-center font-bold text-xs text-white shrink-0">
                      {u.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-white">{u.name}</div>
                      <div className="text-[10px] text-slate-500">{u.email}</div>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded border ${u.role === "Admin" ? "text-purple-400 bg-purple-500/10 border-purple-500/20" : "text-slate-400 bg-slate-800 border-slate-700"}`}>
                    {u.role}
                  </span>
                </td>
                <td className="p-4 text-slate-400">{u.joined}</td>
                <td className="p-4 font-bold text-white">{u.orders}</td>
                <td className="p-4">
                  <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded border ${u.status === "active" ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" : "text-rose-400 bg-rose-500/10 border-rose-500/20"}`}>
                    {u.status}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex gap-2 justify-end">
                    {u.role !== "Admin" && (
                      <button onClick={() => promoteToAdmin(u.id)} className="flex items-center gap-1 px-2 py-1.5 rounded-lg bg-purple-600/10 hover:bg-purple-600/20 border border-purple-500/20 text-purple-400 text-[9px] font-bold transition-all cursor-pointer">
                        <ShieldCheck className="w-3 h-3" /> Admin
                      </button>
                    )}
                    <button onClick={() => toggleStatus(u.id)} className={`flex items-center gap-1 px-2 py-1.5 rounded-lg border text-[9px] font-bold transition-all cursor-pointer ${u.status === "active" ? "bg-rose-600/10 hover:bg-rose-600/20 border-rose-500/20 text-rose-400" : "bg-emerald-600/10 hover:bg-emerald-600/20 border-emerald-500/20 text-emerald-400"}`}>
                      <Ban className="w-3 h-3" /> {u.status === "active" ? "Suspend" : "Unsuspend"}
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
