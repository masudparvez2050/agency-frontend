"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Save, Check, Globe, Bell, ShieldCheck, AlertTriangle } from "lucide-react";

export default function AdminSettingsPage() {
  const [siteName, setSiteName] = useState("Plaxora Ecosystem");
  const [siteDesc, setSiteDesc] = useState("Premium digital products, apps, and SaaS tools for modern businesses.");
  const [contactEmail, setContactEmail] = useState("masudparvez00019@gmail.com");
  const [supportEmail, setSupportEmail] = useState("support@plaxora.com");
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [orderAlerts, setOrderAlerts] = useState(true);
  const [ticketAlerts, setTicketAlerts] = useState(true);
  const [sessionTimeout, setSessionTimeout] = useState("60");
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3500);
  };

  const Toggle = ({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) => (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`relative w-10 h-5 rounded-full transition-all cursor-pointer border ${checked ? "bg-purple-600 border-purple-500" : "bg-slate-800 border-slate-700"}`}
    >
      <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${checked ? "translate-x-5" : "translate-x-0.5"}`} />
    </button>
  );

  return (
    <div className="space-y-10 max-w-2xl">
      <div>
        <h1 className="text-2xl md:text-3xl font-black text-white">Site Settings</h1>
        <p className="text-xs text-slate-400 mt-1">Configure global platform settings, notifications and security.</p>
      </div>

      {saved && (
        <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-center gap-2">
          <Check className="w-4 h-4 shrink-0" /> Settings saved successfully!
        </motion.div>
      )}

      <form onSubmit={handleSave} className="space-y-8">
        {/* Site Info */}
        <div className="p-6 rounded-2xl bg-slate-950/70 border border-slate-900 space-y-4 shadow-lg">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Globe className="w-4 h-4 text-blue-400" /> Site Information
          </h3>
          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">Platform Name</label>
            <input type="text" value={siteName} onChange={e => setSiteName(e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-850 text-xs text-white focus:outline-none focus:border-purple-500/40" />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">Platform Description</label>
            <textarea rows={2} value={siteDesc} onChange={e => setSiteDesc(e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-850 text-xs text-white focus:outline-none focus:border-purple-500/40 resize-none" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">Contact Email</label>
              <input type="email" value={contactEmail} onChange={e => setContactEmail(e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-850 text-xs text-white focus:outline-none focus:border-purple-500/40" />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">Support Email</label>
              <input type="email" value={supportEmail} onChange={e => setSupportEmail(e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-850 text-xs text-white focus:outline-none focus:border-purple-500/40" />
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="p-6 rounded-2xl bg-slate-950/70 border border-slate-900 space-y-4 shadow-lg">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Bell className="w-4 h-4 text-amber-400" /> Notification Preferences
          </h3>
          {[
            { label: "Email Notifications", desc: "Receive general email notifications", value: emailNotifs, set: setEmailNotifs },
            { label: "Order Alerts", desc: "Get notified when new orders are placed", value: orderAlerts, set: setOrderAlerts },
            { label: "Ticket Alerts", desc: "Get notified when support tickets are opened", value: ticketAlerts, set: setTicketAlerts },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between p-3 rounded-xl bg-slate-900/40 border border-slate-900">
              <div>
                <span className="text-xs font-bold text-white block">{item.label}</span>
                <span className="text-[10px] text-slate-500">{item.desc}</span>
              </div>
              <Toggle checked={item.value} onChange={item.set} />
            </div>
          ))}
        </div>

        {/* Security */}
        <div className="p-6 rounded-2xl bg-slate-950/70 border border-slate-900 space-y-4 shadow-lg">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" /> Security Settings
          </h3>
          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">Session Timeout (minutes)</label>
            <select value={sessionTimeout} onChange={e => setSessionTimeout(e.target.value)} className="w-full md:w-48 px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-850 text-xs text-slate-300 focus:outline-none cursor-pointer">
              {["15","30","60","120","240"].map(v => <option key={v}>{v}</option>)}
            </select>
          </div>
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/40 border border-slate-900">
            <div>
              <span className="text-xs font-bold text-white block">Two-Factor Authentication (2FA)</span>
              <span className="text-[10px] text-slate-500">Currently not configured — coming soon</span>
            </div>
            <span className="text-[9px] font-bold px-2 py-0.5 rounded border text-slate-500 bg-slate-800 border-slate-700">Soon</span>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="p-6 rounded-2xl bg-rose-950/20 border border-rose-500/20 space-y-4 shadow-lg">
          <h3 className="text-sm font-bold text-rose-400 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" /> Danger Zone
          </h3>
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/40 border border-rose-500/10">
            <div>
              <span className="text-xs font-bold text-white block">Clear All Caches</span>
              <span className="text-[10px] text-slate-500">Force-clear all server-side cache layers</span>
            </div>
            <button type="button" className="px-3 py-1.5 rounded-xl bg-slate-900 border border-rose-500/20 text-rose-400 text-[10px] font-bold hover:bg-rose-600/10 transition-all cursor-pointer">
              Clear Cache
            </button>
          </div>
        </div>

        <button type="submit" className="flex items-center gap-2 px-8 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-sm font-bold text-white transition-all shadow-lg cursor-pointer">
          <Save className="w-4 h-4" /> Save All Settings
        </button>
      </form>
    </div>
  );
}
