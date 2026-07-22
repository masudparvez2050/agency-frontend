"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, LogIn, AlertCircle } from "lucide-react";
import { FaGoogle, FaGithub } from "react-icons/fa6";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!email || !password) {
      setErrorMsg("Please fill out all required fields.");
      return;
    }

    setIsLoading(true);
    // Simulate user authentication API call
    setTimeout(() => {
      setIsLoading(false);
      // Route user to dashboard workspace
      router.push("/dashboard");
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="p-8 rounded-2xl bg-white border border-slate-200/80 backdrop-blur-xl shadow-2xl shadow-slate-200/50 space-y-6"
    >
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-black text-slate-900">Welcome Back</h2>
        <p className="text-xs text-slate-600 mt-1 font-medium">Sign in to manage your templates, apps, and licenses.</p>
      </div>

      {/* Social Login buttons */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => {
            setIsLoading(true);
            setTimeout(() => router.push("/dashboard"), 1000);
          }}
          className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-bold text-slate-700 transition-all cursor-pointer shadow-sm"
        >
          <FaGoogle className="w-3.5 h-3.5 text-rose-500" />
          Google
        </button>
        <button
          onClick={() => {
            setIsLoading(true);
            setTimeout(() => router.push("/dashboard"), 1000);
          }}
          className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-bold text-slate-700 transition-all cursor-pointer shadow-sm"
        >
          <FaGithub className="w-3.5 h-3.5 text-slate-900" />
          GitHub
        </button>
      </div>

      {/* Divider */}
      <div className="flex items-center justify-center gap-3">
        <div className="flex-grow h-[1px] bg-slate-200" />
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest shrink-0">
          Or continue with email
        </span>
        <div className="flex-grow h-[1px] bg-slate-200" />
      </div>

      {/* Login Form */}
      <form onSubmit={handleLoginSubmit} className="space-y-4">
        {errorMsg && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2 font-bold">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <div>
          <label htmlFor="login-email" className="block text-[10px] font-bold text-slate-600 uppercase tracking-wide mb-1.5">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              id="login-email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-purple-500/50 transition-all font-medium"
              required
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label htmlFor="login-pass" className="block text-[10px] font-bold text-slate-600 uppercase tracking-wide">
              Password
            </label>
            <Link
              href="/forgot-password"
              className="text-[10px] text-purple-700 hover:text-purple-900 font-extrabold"
            >
              Forgot Password?
            </Link>
          </div>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              id="login-pass"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-purple-500/50 transition-all font-medium"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 p-0.5 text-slate-400 hover:text-slate-600"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Remember me */}
        <div className="flex items-center gap-2">
          <input
            id="remember-me"
            type="checkbox"
            className="w-3.5 h-3.5 rounded bg-slate-100 border-slate-300 text-purple-600 focus:ring-0 focus:ring-offset-0 cursor-pointer"
          />
          <label htmlFor="remember-me" className="text-[10px] font-bold text-slate-600 uppercase cursor-pointer">
            Remember me
          </label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-1.5 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-xs font-bold text-white transition-all shadow-md shadow-purple-500/15 disabled:opacity-50 cursor-pointer"
        >
          {isLoading ? (
            <span>Signing in...</span>
          ) : (
            <>
              <LogIn className="w-4 h-4" />
              <span>Sign In</span>
            </>
          )}
        </button>
      </form>

      {/* Redirect to Sign up */}
      <div className="text-center pt-2 text-xs text-slate-500 border-t border-slate-200 font-medium">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="text-purple-700 hover:text-purple-900 font-extrabold">
          Sign up
        </Link>
      </div>
    </motion.div>
  );
}