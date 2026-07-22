"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Menu, X, Home, LogOut, LayoutDashboard, ShieldAlert,
  ShoppingCart, Package, Smartphone, Users, BookOpen,
  Briefcase, MessageSquare, Settings, ChevronDown, ChevronRight,
  FileSpreadsheet
} from "lucide-react";
import { MOCK_USER } from "@/lib/orders-data";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const ADMIN_NAV = [
  {
    group: "Main",
    items: [
      { label: "Overview", href: "/admin", icon: LayoutDashboard, exact: true },
      { label: "Orders & Payments", href: "/admin/orders", icon: ShoppingCart, badge: 3 },
    ],
  },
  {
    group: "CMS",
    items: [
      { 
        label: "Page CMS", 
        href: "/admin/cms", 
        icon: FileSpreadsheet,
        children: [
          { label: "Home Page", href: "/admin/cms/home" },
          { label: "Products Page", href: "/admin/cms/products" },
          { label: "Apps Page", href: "/admin/cms/apps" },
          { label: "SaaS Page", href: "/admin/cms/saas" },
          { label: "Portfolio Page", href: "/admin/cms/portfolio" },
          { label: "Services Page", href: "/admin/cms/services" },
          { label: "Pricing Page", href: "/admin/cms/pricing" },
          { label: "Blog Page", href: "/admin/cms/blog" },
          { label: "About Page", href: "/admin/cms/about" },
          { label: "Contact Page", href: "/admin/cms/contact" },
        ]
      },
      { label: "Products", href: "/admin/products", icon: Package },
      { label: "Apps Store", href: "/admin/apps", icon: Smartphone },
      { label: "Blog Posts", href: "/admin/blog", icon: BookOpen },
      { label: "Job Listings", href: "/admin/careers", icon: Briefcase },
    ],
  },
  {
    group: "System",
    items: [
      { label: "Users", href: "/admin/users", icon: Users },
      { label: "Support Tickets", href: "/admin/tickets", icon: MessageSquare, badge: 2 },
      { label: "Settings", href: "/admin/settings", icon: Settings },
    ],
  },
];

const USER_NAV = [
  { label: "My Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Back to Store", href: "/", icon: Home },
];

function SidebarContent({ pathname, onLinkClick }: { pathname: string; onLinkClick?: () => void }) {
  const [adminExpanded, setAdminExpanded] = useState(pathname.startsWith("/admin"));
  const [pageCmsExpanded, setPageCmsExpanded] = useState(pathname.startsWith("/admin/cms"));

  // Keep dropdown open if we are in one of the cms child routes
  useEffect(() => {
    if (pathname.startsWith("/admin/cms")) {
      setPageCmsExpanded(true);
    }
  }, [pathname]);

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname === href || pathname.startsWith(href + "/");

  return (
    <div className="flex flex-col h-full justify-between">
      <div className="space-y-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2" onClick={onLinkClick}>
          <div className="relative w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-600 to-indigo-600 p-[1px] flex items-center justify-center shadow-sm">
            <div className="w-full h-full bg-white rounded-[7px] flex items-center justify-center">
              <span className="text-sm font-black text-purple-700">P</span>
            </div>
          </div>
          <span className="text-base font-black tracking-tight text-slate-900">Plaxora Admin</span>
        </Link>

        {/* User Widget */}
        <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center font-extrabold text-sm text-white shrink-0 shadow-sm">
            {MOCK_USER.avatarInitials}
          </div>
          <div className="overflow-hidden">
            <h4 className="text-xs font-bold text-slate-900 truncate">{MOCK_USER.name}</h4>
            <p className="text-[10px] text-purple-700 font-bold">{MOCK_USER.role} Account</p>
          </div>
        </div>

        {/* Admin Navigation Groups */}
        <nav className="space-y-5">
          {/* Admin section with toggle */}
          <div>
            <button
              onClick={() => setAdminExpanded(!adminExpanded)}
              className="w-full flex items-center justify-between px-2 mb-2 text-[9px] font-black text-slate-500 uppercase tracking-widest hover:text-slate-900 transition-colors cursor-pointer"
            >
              <span>Admin Console</span>
              {adminExpanded ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
            </button>
            <AnimatePresence initial={false}>
              {adminExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden space-y-4"
                >
                  {ADMIN_NAV.map((group) => (
                    <div key={group.group} className="space-y-1">
                      <span className="block px-3 text-[9px] font-extrabold text-slate-400 uppercase tracking-widest mb-1">
                        {group.group}
                      </span>
                      {group.items.map((item: any) => {
                        const hasChildren = !!item.children;
                        const active = isActive(item.href, (item as any).exact);

                        if (hasChildren) {
                          return (
                            <div key={item.label} className="space-y-1">
                              <button
                                onClick={() => setPageCmsExpanded(!pageCmsExpanded)}
                                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all border text-left cursor-pointer ${
                                  pathname.startsWith(item.href)
                                    ? "bg-purple-50 border-purple-200 text-purple-700"
                                    : "border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                                }`}
                              >
                                <item.icon className="w-4 h-4 shrink-0" />
                                <span className="flex-grow">{item.label}</span>
                                {pageCmsExpanded ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
                              </button>
                              
                              <AnimatePresence initial={false}>
                                {pageCmsExpanded && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="pl-6 space-y-0.5 overflow-hidden border-l border-slate-200 ml-5"
                                  >
                                    {item.children?.map((child: any) => {
                                      const childActive = pathname === child.href;
                                      return (
                                        <Link
                                          key={child.href}
                                          href={child.href}
                                          onClick={onLinkClick}
                                          className={`block px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all ${
                                            childActive
                                              ? "text-purple-700 bg-purple-50"
                                              : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                                          }`}
                                        >
                                          {child.label}
                                        </Link>
                                      );
                                    })}
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          );
                        }

                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={onLinkClick}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all border ${
                              active
                                ? "bg-purple-50 border-purple-200 text-purple-700"
                                : "border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                            }`}
                          >
                            <item.icon className="w-4 h-4 shrink-0" />
                            <span className="flex-grow">{item.label}</span>
                            {(item as any).badge && (
                              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                                {(item as any).badge}
                              </span>
                            )}
                          </Link>
                        );
                      })}
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Divider */}
          <div className="h-px bg-slate-200" />

          {/* User nav */}
          <div className="space-y-1">
            <span className="block px-3 text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">User Area</span>
            {USER_NAV.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onLinkClick}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all border ${
                    active
                      ? "bg-purple-50 border-purple-200 text-purple-700"
                      : "border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  <item.icon className="w-4 h-4 shrink-0" />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </nav>
      </div>

      {/* Footer Logout */}
      <div className="pt-4 border-t border-slate-200">
        <Link
          href="/"
          onClick={onLinkClick}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:text-rose-600 hover:bg-rose-50 transition-all border border-transparent"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          Logout Session
        </Link>
      </div>
    </div>
  );
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-purple-500/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-cyan-500/5 blur-3xl pointer-events-none" />

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 shrink-0 bg-white border-r border-slate-200/80 backdrop-blur-xl relative z-30 p-6 min-h-screen sticky top-0 overflow-y-auto no-scrollbar shadow-sm">
        <SidebarContent pathname={pathname} />
      </aside>

      {/* Main Panel */}
      <div className="flex-grow flex flex-col min-h-screen relative z-10 overflow-y-auto">
        {/* Mobile Header */}
        <header className="lg:hidden flex items-center justify-between p-4 bg-white/90 border-b border-slate-200 backdrop-blur-md sticky top-0 z-40">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative w-7 h-7 rounded-lg bg-gradient-to-tr from-purple-600 to-indigo-600 p-[1px] flex items-center justify-center shadow-sm">
              <div className="w-full h-full bg-white rounded-[7px] flex items-center justify-center">
                <span className="text-xs font-black text-purple-700">P</span>
              </div>
            </div>
            <span className="text-sm font-black text-slate-900">Plaxora Admin</span>
          </Link>
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100"
            aria-label="Toggle Dashboard Menu"
          >
            {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </header>

        {/* Mobile Sidebar Drawer */}
        <AnimatePresence>
          {isMobileOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMobileOpen(false)}
                className="lg:hidden fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-30"
              />
              <motion.aside
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="lg:hidden fixed inset-y-0 left-0 w-64 bg-white border-r border-slate-200 z-40 p-6 overflow-y-auto no-scrollbar shadow-2xl"
              >
                <SidebarContent pathname={pathname} onLinkClick={() => setIsMobileOpen(false)} />
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* Page Content */}
        <main className="flex-grow p-6 lg:p-10 relative">
          {children}
        </main>
      </div>
    </div>
  );
}