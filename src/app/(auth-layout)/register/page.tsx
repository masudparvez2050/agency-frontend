"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { User, Mail, Lock, Eye, EyeOff, UserPlus, AlertCircle } from "lucide-react";
import { FaGoogle, FaGithub } from "react-icons/fa6";

export default function RegisterPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!fullName || !email || !password || !confirmPassword) {
      setErrorMsg("Please fill out all required fields.");
      return;
    }

    if (password.length < 6) {
      setErrorMsg("Password must be at least 6 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match.");
      return;
    }

    if (!acceptTerms) {
      setErrorMsg("You must accept the Terms of Service and Privacy Policy.");
      return;
    }

    setIsLoading(true);
    // Simulate user registration API call
    setTimeout(() => {
      setIsLoading(false);
      // Route user to login page
      router.push("/login");
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="p-8 rounded-2xl bg-slate-950/70 border border-slate-900 backdrop-blur-xl shadow-2xl space-y-6"
    >
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-black text-white">Create Account</h2>
        <p className="text-xs text-slate-500 mt-1">Start building with premium templates and SaaS products.</p>
      </div>

      {/* Social Sign up buttons */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => {
            setIsLoading(true);
            setTimeout(() => router.push("/login"), 1000);
          }}
          className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-855 text-xs font-bold text-slate-350 hover:text-white transition-all cursor-pointer"
        >
          <FaGoogle className="w-3.5 h-3.5" />
          Google
        </button>
        <button
          onClick={() => {
            setIsLoading(true);
            setTimeout(() => router.push("/login"), 1000);
          }}
          className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-855 text-xs font-bold text-slate-350 hover:text-white transition-all cursor-pointer"
        >
          <FaGithub className="w-3.5 h-3.5" />
          GitHub
        </button>
      </div>

      {/* Divider */}
      <div className="flex items-center justify-center gap-3">
        <div className="flex-grow h-[1px] bg-slate-900" />
        <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest shrink-0">
          Or register with email
        </span>
        <div className="flex-grow h-[1px] bg-slate-900" />
      </div>

      {/* Register Form */}
      <form onSubmit={handleRegisterSubmit} className="space-y-4">
        {errorMsg && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <div>
          <label htmlFor="reg-name" className="block text-[10px] font-bold text-slate-505 uppercase tracking-wide mb-1.5">
            Full Name
          </label>
          <div className="relative">
            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              id="reg-name"
              type="text"
              placeholder="e.g. Masud Parvez"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-850 text-xs text-white placeholder-slate-550 focus:outline-none focus:border-purple-500/40 transition-colors"
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="reg-email" className="block text-[10px] font-bold text-slate-505 uppercase tracking-wide mb-1.5">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              id="reg-email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-850 text-xs text-white placeholder-slate-550 focus:outline-none focus:border-purple-500/40 transition-colors"
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="reg-pass" className="block text-[10px] font-bold text-slate-505 uppercase tracking-wide mb-1.5">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              id="reg-pass"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-900 border border-slate-850 text-xs text-white placeholder-slate-550 focus:outline-none focus:border-purple-500/40 transition-colors"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 p-0.5 text-slate-500 hover:text-slate-300"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <div>
          <label htmlFor="reg-confirm" className="block text-[10px] font-bold text-slate-505 uppercase tracking-wide mb-1.5">
            Confirm Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              id="reg-confirm"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-900 border border-slate-850 text-xs text-white placeholder-slate-550 focus:outline-none focus:border-purple-500/40 transition-colors"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 p-0.5 text-slate-500 hover:text-slate-300"
            >
              {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Accept terms */}
        <div className="flex items-start gap-2">
          <input
            id="terms"
            type="checkbox"
            checked={acceptTerms}
            onChange={(e) => setAcceptTerms(e.target.checked)}
            className="w-3.5 h-3.5 rounded bg-slate-900 border-slate-800 text-purple-600 focus:ring-0 focus:ring-offset-0 mt-0.5"
          />
          <label htmlFor="terms" className="text-[10px] font-bold text-slate-400 uppercase cursor-pointer leading-tight">
            I accept the{" "}
            <Link href="/terms" className="text-purple-400 hover:text-purple-300">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-purple-400 hover:text-purple-300">
              Privacy Policy
            </Link>
          </label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-1.5 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 hover:opacity-95 text-xs font-bold text-white transition-all shadow-lg disabled:from-slate-800 disabled:to-slate-800 disabled:text-slate-600 disabled:cursor-not-allowed cursor-pointer"
        >
          {isLoading ? (
            <span>Creating Account...</span>
          ) : (
            <>
              <UserPlus className="w-4 h-4" />
              <span>Create Account</span>
            </>
          )}
        </button>
      </form>

      {/* Redirect to login */}
      <div className="text-center pt-2 text-xs text-slate-500 border-t border-slate-900">
        Already have an account?{" "}
        <Link href="/login" className="text-purple-400 hover:text-purple-300 font-bold">
          Log in
        </Link>
      </div>
    </motion.div>
  );
}