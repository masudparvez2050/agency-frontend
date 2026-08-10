"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { FaGithub, FaXTwitter, FaFacebook, FaYoutube, FaLinkedin, FaTiktok, FaGlobe } from "react-icons/fa6";
import { CONTACT_INFO } from "@/lib/contact-info";

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
    <footer className="relative bg-white border-t border-slate-200 pt-20 pb-10 overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-x-4 gap-y-10 lg:gap-6 mb-16">
          {/* Brand Info */}
          <div className="col-span-2 space-y-4">
            <Link href="/" className="flex items-center group">
              <img
                src="/plaxora_logo.png"
                alt="Plaxora Group Logo"
                className="h-10 w-auto object-contain group-hover:scale-105 transition-transform duration-200"
              />
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed max-w-sm font-normal">
              Building a premier digital ecosystem. Plaxora Group engineers software templates, native mobile apps, SaaS tools, and provides bespoke enterprise development solutions.
            </p>
            {/* Newsletter */}
            <form onSubmit={handleSubscribe} className="max-w-sm pt-2">
              <label htmlFor="footer-email" className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                Subscribe to Plaxora Group newsletter
              </label>
              <div className="relative flex items-center p-1.5 rounded-2xl bg-[#F8FAFC] border border-slate-200 focus-within:border-blue-600 transition-all shadow-2xs">
                <Mail className="w-4 h-4 text-slate-400 ml-3 shrink-0" />
                <input
                  id="footer-email"
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-1.5 bg-transparent text-sm text-slate-900 placeholder-slate-400 focus:outline-none font-sans"
                  required
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-purple-600 text-xs font-semibold text-white transition-all shrink-0 shadow-2xs cursor-pointer"
                >
                  {subscribed ? "Subscribed!" : "Join"}
                </button>
              </div>
            </form>
          </div>

          {/* Column 1: Templates Category */}
          <div>
            <h4 className="font-heading font-extrabold text-xs text-slate-900 uppercase tracking-wider mb-4">Template Category</h4>
            <ul className="space-y-2.5 text-sm font-medium">
              <li><Link href="/products" className="text-slate-600 hover:text-blue-600 transition-colors">Web Templates</Link></li>
              <li><Link href="/products" className="text-slate-600 hover:text-blue-600 transition-colors">Boilerplates</Link></li>
              <li><Link href="/products" className="text-slate-600 hover:text-blue-600 transition-colors">SaaS Dashboards</Link></li>
              <li><Link href="/products" className="text-slate-600 hover:text-blue-600 transition-colors">Figma UI Kits</Link></li>
              <li><Link href="/products" className="text-slate-600 hover:text-blue-600 transition-colors">Custom Scripts</Link></li>
            </ul>
          </div>

          {/* Column 2: Apps Category */}
          <div>
            <h4 className="font-heading font-extrabold text-xs text-slate-900 uppercase tracking-wider mb-4">Apps Category</h4>
            <ul className="space-y-2.5 text-sm font-medium">
              <li><Link href="/apps" className="text-slate-600 hover:text-blue-600 transition-colors">Android Apps</Link></li>
              <li><Link href="/apps" className="text-slate-600 hover:text-blue-600 transition-colors">iOS Apps</Link></li>
              <li><Link href="/apps" className="text-slate-600 hover:text-blue-600 transition-colors">Desktop Apps</Link></li>
              <li><Link href="/apps" className="text-slate-600 hover:text-blue-600 transition-colors">FinTech Apps</Link></li>
              <li><Link href="/apps" className="text-slate-600 hover:text-blue-600 transition-colors">Developer Tools</Link></li>
            </ul>
          </div>

          {/* Column 3: Ecosystem */}
          <div>
            <h4 className="font-heading font-extrabold text-xs text-slate-900 uppercase tracking-wider mb-4">Ecosystem</h4>
            <ul className="space-y-2.5 text-sm font-medium">
              <li><Link href="/about" className="text-slate-600 hover:text-blue-600 transition-colors">About Us</Link></li>
              <li><Link href="/services" className="text-slate-600 hover:text-blue-600 transition-colors">Services</Link></li>
              <li><Link href="/portfolio" className="text-slate-600 hover:text-blue-600 transition-colors">Portfolio</Link></li>
              <li><Link href="/blog" className="text-slate-600 hover:text-blue-600 transition-colors">Blogs & News</Link></li>
              <li><Link href="/careers" className="text-slate-600 hover:text-blue-600 transition-colors">Careers</Link></li>
              <li><Link href="/docs" className="text-slate-600 hover:text-blue-600 transition-colors">Docs Portal</Link></li>
            </ul>
          </div>

          {/* Column 4: Office Info */}
          <div>
            <h4 className="font-heading font-extrabold text-xs text-slate-900 uppercase tracking-wider mb-4">Office Info</h4>
            <div className="space-y-3 text-xs text-slate-600 font-normal">
              <div>
                <strong className="text-slate-900 flex items-center gap-1 font-bold text-xs mb-0.5">
                  <Mail className="w-3.5 h-3.5 text-blue-600" /> Email Support
                </strong>
                <a href={CONTACT_INFO.emailHref} className="hover:text-blue-600 transition-colors break-all">
                  {CONTACT_INFO.email}
                </a>
              </div>
              <div>
                <strong className="text-slate-900 flex items-center gap-1 font-bold text-xs mb-0.5">
                  <Phone className="w-3.5 h-3.5 text-emerald-600" /> Phone
                </strong>
                <a href={CONTACT_INFO.phoneHref} className="hover:text-emerald-600 transition-colors">
                  {CONTACT_INFO.phone}
                </a>
              </div>
              <div>
                <strong className="text-slate-900 flex items-center gap-1 font-bold text-xs mb-0.5">
                  <MapPin className="w-3.5 h-3.5 text-rose-600" /> Office Address
                </strong>
                <p className="text-slate-600 leading-tight">{CONTACT_INFO.address}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Lower footer */}
        <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-medium text-slate-500">
          <p>© {new Date().getFullYear()} Plaxora Group. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-slate-900 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-slate-900 transition-colors">Terms of Service</Link>
            <Link href="/refund" className="hover:text-slate-900 transition-colors">Refund Policy</Link>
          </div>
          {/* Social icons */}
          <div className="flex items-center gap-2 flex-wrap">
            <a href={CONTACT_INFO.socials.x} target="_blank" rel="noopener noreferrer" title="X (Twitter)" className="p-2 bg-[#F8FAFC] hover:bg-slate-100 text-slate-600 hover:text-blue-600 rounded-xl transition-colors border border-slate-200">
              <FaXTwitter className="w-4 h-4" />
            </a>
            <a href={CONTACT_INFO.socials.facebook} target="_blank" rel="noopener noreferrer" title="Facebook" className="p-2 bg-[#F8FAFC] hover:bg-slate-100 text-slate-600 hover:text-blue-600 rounded-xl transition-colors border border-slate-200">
              <FaFacebook className="w-4 h-4" />
            </a>
            <a href={CONTACT_INFO.socials.youtube} target="_blank" rel="noopener noreferrer" title="YouTube" className="p-2 bg-[#F8FAFC] hover:bg-slate-100 text-slate-600 hover:text-rose-600 rounded-xl transition-colors border border-slate-200">
              <FaYoutube className="w-4 h-4" />
            </a>
            <a href={CONTACT_INFO.socials.linkedin} target="_blank" rel="noopener noreferrer" title="LinkedIn" className="p-2 bg-[#F8FAFC] hover:bg-slate-100 text-slate-600 hover:text-blue-700 rounded-xl transition-colors border border-slate-200">
              <FaLinkedin className="w-4 h-4" />
            </a>
            <a href={CONTACT_INFO.socials.tiktok} target="_blank" rel="noopener noreferrer" title="TikTok" className="p-2 bg-[#F8FAFC] hover:bg-slate-100 text-slate-600 hover:text-black rounded-xl transition-colors border border-slate-200">
              <FaTiktok className="w-4 h-4" />
            </a>
            <a href={CONTACT_INFO.socials.github} target="_blank" rel="noopener noreferrer" title="GitHub" className="p-2 bg-[#F8FAFC] hover:bg-slate-100 text-slate-600 hover:text-purple-600 rounded-xl transition-colors border border-slate-200">
              <FaGithub className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
