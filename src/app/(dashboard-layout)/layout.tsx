"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Menu, X, Home, ShoppingBag, Download, MessageSquare, 
  Settings, LogOut, LayoutDashboard, ShieldAlert 
} from "lucide-react";
import { MOCK_USER } from "@/lib/orders-data";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navItems = [
    { label: "Dashboard Overview", href: "/dashboard", icon: LayoutDashboard },
    { label: "Admin Console", href: "/admin", icon: ShieldAlert },
    { label: "Back to Store", href: "/", icon: Home },
  ];

  return (
    <div className="min-h-screen bg-[#030014] text-slate-100 flex overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-purple-500/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-cyan-500/5 blur-3xl pointer-events-none" />

      {/* Desktop Sidebar (Sticky left) */}
      <aside className="hidden lg:flex flex-col justify-between w-64 shrink-0 bg-slate-950/70 border-r border-slate-900/80 backdrop-blur-xl relative z-30 p-6">
        <div className="space-y-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="relative w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-600 to-cyan-400 p-[1px] flex items-center justify-center">
              <div className="w-full h-full bg-[#030014] rounded-[7px] flex items-center justify-center">
                <span className="text-sm font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-300">P</span>
              </div>
            </div>
            <span className="text-lg font-bold tracking-tight text-white">
              Plaxora Dashboard
            </span>
          </Link>

          {/* User Widget */}
          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/40 border border-slate-900">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-cyan-500 flex items-center justify-center font-extrabold text-sm text-white">
              {MOCK_USER.avatarInitials}
            </div>
            <div className="overflow-hidden">
              <h4 className="text-xs font-bold text-white truncate">{MOCK_USER.name}</h4>
              <p className="text-[10px] text-purple-400 font-semibold">{MOCK_USER.role} Account</p>
            </div>
          </div>

          {/* Menu links */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all border ${
                    isActive
                      ? "bg-purple-600/10 border-purple-500/20 text-purple-400"
                      : "border-transparent text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <item.icon className="w-4 h-4 shrink-0" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="space-y-4 pt-6 border-t border-slate-900">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold text-slate-400 hover:text-rose-400 hover:bg-rose-500/5 transition-all border border-transparent"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            Logout Session
          </Link>
        </div>
      </aside>

      {/* Main Panel wrapper */}
      <div className="flex-grow flex flex-col min-h-screen relative z-10 overflow-y-auto">
        {/* Mobile Header (Sticky top) */}
        <header className="lg:hidden flex items-center justify-between p-4 bg-[#030014]/90 border-b border-slate-900/80 backdrop-blur-md sticky top-0 z-40">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative w-7 h-7 rounded-lg bg-gradient-to-tr from-purple-600 to-cyan-400 p-[1px] flex items-center justify-center">
              <div className="w-full h-full bg-[#030014] rounded-[7px] flex items-center justify-center">
                <span className="text-xs font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-300">P</span>
              </div>
            </div>
            <span className="text-sm font-bold text-white">Plaxora Dashboard</span>
          </Link>

          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-900"
            aria-label="Toggle Dashboard Menu"
          >
            {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </header>

        {/* Mobile Sidebar overlay */}
        <AnimatePresence>
          {isMobileOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMobileOpen(false)}
                className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-30"
              />

              {/* Sidebar Menu */}
              <motion.aside
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="lg:hidden fixed inset-y-0 left-0 w-64 bg-slate-950/95 border-r border-slate-900 z-40 p-6 flex flex-col justify-between"
              >
                <div className="space-y-8">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-white">Plaxora Dashboard</span>
                    <button
                      onClick={() => setIsMobileOpen(false)}
                      className="p-1 text-slate-400 hover:text-white"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* User Profile */}
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/40 border border-slate-900">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-purple-500 to-cyan-500 flex items-center justify-center font-extrabold text-xs text-white">
                      {MOCK_USER.avatarInitials}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white truncate">{MOCK_USER.name}</h4>
                      <p className="text-[10px] text-purple-400 font-semibold">{MOCK_USER.role} Account</p>
                    </div>
                  </div>

                  <nav className="space-y-1">
                    {navItems.map((item) => {
                      const isActive = pathname === item.href;
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setIsMobileOpen(false)}
                          className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all border ${
                            isActive
                              ? "bg-purple-600/10 border-purple-500/20 text-purple-400"
                              : "border-transparent text-slate-400 hover:text-white hover:bg-white/5"
                          }`}
                        >
                          <item.icon className="w-4 h-4 shrink-0" />
                          {item.label}
                        </Link>
                      );
                    })}
                  </nav>
                </div>

                <div className="space-y-4 pt-6 border-t border-slate-900">
                  <Link
                    href="/"
                    onClick={() => setIsMobileOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold text-slate-400 hover:text-rose-400 hover:bg-rose-500/5 transition-all"
                  >
                    <LogOut className="w-4 h-4 shrink-0" />
                    Logout Session
                  </Link>
                </div>
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* Dashboard page content wrapper */}
        <main className="flex-grow p-6 lg:p-10 relative">
          {children}
        </main>
      </div>
    </div>
  );
}