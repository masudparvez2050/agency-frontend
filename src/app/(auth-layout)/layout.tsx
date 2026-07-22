"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col justify-between relative overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-purple-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/3 w-[300px] h-[300px] rounded-full bg-cyan-500/5 blur-[100px] pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

      {/* Header Bar */}
      <header className="p-6 relative z-10">
        <div className="container mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="group inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            Back to Store
          </Link>

          <Link href="/" className="flex items-center gap-2">
            <div className="relative w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-600 to-indigo-600 p-[1px] flex items-center justify-center shadow-sm">
              <div className="w-full h-full bg-white rounded-[7px] flex items-center justify-center">
                <span className="text-sm font-black text-purple-700">P</span>
              </div>
            </div>
            <span className="text-lg font-black tracking-tight text-slate-900">
              Plaxora<span className="text-purple-600">.</span>
            </span>
          </Link>
        </div>
      </header>

      {/* Centered Children Container */}
      <main className="flex-grow flex items-center justify-center p-4 relative z-10">
        <div className="w-full max-w-md">
          {children}
        </div>
      </main>

      {/* Footer Bar */}
      <footer className="p-6 text-center text-xs text-slate-500 font-medium relative z-10">
        <p>© {new Date().getFullYear()} Plaxora Ecosystem. All rights reserved.</p>
      </footer>
    </div>
  );
}
