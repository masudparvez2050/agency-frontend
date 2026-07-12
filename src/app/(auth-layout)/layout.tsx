"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-[#030014] text-slate-100 flex flex-col justify-between relative overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-purple-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/3 w-[300px] h-[300px] rounded-full bg-cyan-500/5 blur-[100px] pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

      {/* Header Bar */}
      <header className="p-6 relative z-10">
        <div className="container mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="group inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            Back to Store
          </Link>

          <Link href="/" className="flex items-center gap-2">
            <div className="relative w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-600 to-cyan-400 p-[1px] flex items-center justify-center">
              <div className="w-full h-full bg-[#030014] rounded-[7px] flex items-center justify-center">
                <span className="text-sm font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-300">P</span>
              </div>
            </div>
            <span className="text-lg font-bold tracking-tight text-white">
              Plaxora<span className="text-purple-500">.</span>
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
      <footer className="p-6 text-center text-xs text-slate-650 relative z-10">
        <p>© {new Date().getFullYear()} Plaxora Ecosystem. All rights reserved.</p>
      </footer>
    </div>
  );
}
