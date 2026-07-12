"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Mail, Globe } from "lucide-react";
import { FaGithub, FaXTwitter, FaFacebook, FaDiscord } from "react-icons/fa6";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="relative bg-[#02000c] border-t border-purple-500/10 pt-20 pb-10 overflow-hidden">
      {/* Decorative Blur Orbs */}
      <div className="absolute -bottom-48 -left-48 w-96 h-96 rounded-full bg-purple-500/5 blur-3xl pointer-events-none" />
      <div className="absolute -top-48 -right-48 w-96 h-96 rounded-full bg-cyan-500/5 blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 lg:gap-6 mb-16">
          {/* Brand Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="relative w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 to-cyan-400 p-[1px] flex items-center justify-center">
                <div className="w-full h-full bg-[#030014] rounded-[10px] flex items-center justify-center">
                  <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-300">P</span>
                </div>
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Plaxora<span className="text-purple-500">.</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm mb-6 max-w-sm">
              Building a premier digital ecosystem. We engineer premium software templates, native mobile apps, SaaS tools, and provide premium development services.
            </p>
            {/* Newsletter */}
            <form onSubmit={handleSubscribe} className="max-w-sm">
              <label htmlFor="footer-email" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Subscribe to our newsletter
              </label>
              <div className="relative flex items-center p-1 rounded-full bg-slate-900 border border-slate-800 focus-within:border-purple-500/35 transition-colors">
                <Mail className="w-4 h-4 text-slate-500 ml-3 shrink-0" />
                <input
                  id="footer-email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-1.5 bg-transparent text-sm text-slate-100 placeholder-slate-500 focus:outline-none"
                  required
                />
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-full bg-purple-600 hover:bg-purple-500 text-xs font-bold text-white transition-all shrink-0"
                >
                  {subscribed ? "Subscribed!" : "Join"}
                </button>
              </div>
            </form>
          </div>

          {/* Column 1: Products */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Products</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/products" className="text-slate-400 hover:text-purple-400 transition-colors">Web Templates</Link></li>
              <li><Link href="/products" className="text-slate-400 hover:text-purple-400 transition-colors">Boilerplates</Link></li>
              <li><Link href="/products" className="text-slate-400 hover:text-purple-400 transition-colors">Figma UI Kits</Link></li>
              <li><Link href="/products" className="text-slate-400 hover:text-purple-400 transition-colors">Custom Scripts</Link></li>
            </ul>
          </div>

          {/* Column 2: Apps */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">App Store</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/apps" className="text-slate-400 hover:text-purple-400 transition-colors">Android Apps</Link></li>
              <li><Link href="/apps" className="text-slate-400 hover:text-purple-400 transition-colors">iOS Apps</Link></li>
              <li><Link href="/apps" className="text-slate-400 hover:text-purple-400 transition-colors">Desktop Apps</Link></li>
              <li><Link href="/apps" className="text-slate-400 hover:text-purple-400 transition-colors">Developer Portal</Link></li>
            </ul>
          </div>

          {/* Column 3: SaaS Tools */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">SaaS Hub</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/saas" className="text-slate-400 hover:text-purple-400 transition-colors">CRM Portal</Link></li>
              <li><Link href="/saas" className="text-slate-400 hover:text-purple-400 transition-colors">Business POS</Link></li>
              <li><Link href="/saas" className="text-slate-400 hover:text-purple-400 transition-colors">AI Assistants</Link></li>
              <li><Link href="/saas" className="text-slate-400 hover:text-purple-400 transition-colors">API Keys</Link></li>
            </ul>
          </div>

          {/* Column 4: Ecosystem */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Ecosystem</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/about" className="text-slate-400 hover:text-purple-400 transition-colors">About Us</Link></li>
              <li><Link href="/services" className="text-slate-400 hover:text-purple-400 transition-colors">Services</Link></li>
              <li><Link href="/portfolio" className="text-slate-400 hover:text-purple-400 transition-colors">Portfolio</Link></li>
              <li><Link href="/blog" className="text-slate-400 hover:text-purple-400 transition-colors">Blogs & News</Link></li>
              <li><Link href="/careers" className="text-slate-400 hover:text-purple-400 transition-colors">Careers</Link></li>
              <li><Link href="/docs" className="text-slate-400 hover:text-purple-400 transition-colors">Docs Portal</Link></li>
            </ul>
          </div>
        </div>

        {/* Lower footer */}
        <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Plaxora. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-slate-400 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-slate-400 transition-colors">Terms of Service</Link>
            <Link href="/refund" className="hover:text-slate-400 transition-colors">Refund Policy</Link>
          </div>
          {/* Social icons */}
          <div className="flex items-center gap-3">
            <a href="https://github.com/masudparvez00019" target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white rounded-full transition-colors">
              <FaGithub className="w-4 h-4" />
            </a>
            <a href="#" className="p-2 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white rounded-full transition-colors">
              <FaXTwitter className="w-4 h-4" />
            </a>
            <a href="#" className="p-2 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white rounded-full transition-colors">
              <FaDiscord className="w-4 h-4" />
            </a>
            <a href="#" className="p-2 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white rounded-full transition-colors">
              <FaFacebook className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
