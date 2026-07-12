"use client";

import React, { use, useState } from "react";
import { PRODUCTS } from "@/lib/products-data";
import CheckoutModal from "@/components/shared/main/CheckoutModal";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ArrowLeft, Star, Download, ShoppingCart, ExternalLink, 
  CheckCircle, Server, FileText, AlertCircle, Info, Calendar 
} from "lucide-react";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ProductDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const id = resolvedParams.id;

  const product = PRODUCTS.find((p) => p.id === id);

  const [activeTab, setActiveTab] = useState<"overview" | "features" | "requirements" | "changelog">("overview");
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen pt-32 pb-24 flex items-center justify-center relative">
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
        <div className="text-center relative z-10 p-8 rounded-2xl bg-slate-950/40 border border-slate-900 backdrop-blur-sm max-w-md">
          <AlertCircle className="w-12 h-12 text-rose-500 mx-auto mb-4" />
          <h1 className="text-2xl font-black text-white mb-2">Product Not Found</h1>
          <p className="text-sm text-slate-400 mb-6">
            The template or digital asset you are looking for does not exist or has been removed.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-xs font-bold text-white transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Marketplace
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-24 relative overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-purple-500/5 blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-cyan-500/5 blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Back Link */}
        <Link
          href="/products"
          className="group inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-purple-400 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          Back to Marketplace
        </Link>

        {/* Product Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          
          {/* Main Info Column (Left) */}
          <div className="lg:col-span-2 space-y-10">
            {/* Header info */}
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-[10px] font-extrabold text-purple-300 uppercase tracking-widest mb-4">
                {product.category} Template
              </span>
              <h1 className="text-3xl md:text-5xl font-black text-white leading-tight mb-4">
                {product.title}
              </h1>
              <p className="text-base text-slate-400 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Simulated Live Frame / Image Preview */}
            <div className={`h-80 md:h-[400px] rounded-2xl bg-gradient-to-br ${product.imageGradient} relative flex items-center justify-center p-8 border border-slate-900 shadow-2xl`}>
              <div className="absolute inset-0 bg-black/10" />
              <div className="relative p-6 rounded-2xl bg-[#030014]/90 border border-white/10 text-center max-w-md shadow-2xl backdrop-blur-md">
                <span className="text-[10px] uppercase font-bold tracking-widest text-purple-400">{product.category}</span>
                <p className="text-xl font-extrabold text-white mt-1.5 mb-2">{product.title}</p>
                <div className="flex gap-2 justify-center flex-wrap mt-4">
                  {product.tags.map((tag) => (
                    <span key={tag} className="text-xs bg-white/5 border border-white/10 px-2.5 py-0.5 rounded text-slate-350">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Details tabs navigation */}
            <div className="border-b border-slate-900 flex gap-6 overflow-x-auto no-scrollbar">
              {[
                { id: "overview", label: "Overview" },
                { id: "features", label: "Key Features" },
                { id: "requirements", label: "Requirements" },
                { id: "changelog", label: "Changelog" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`py-3.5 text-sm font-bold border-b-2 transition-all shrink-0 ${
                    activeTab === tab.id
                      ? "border-purple-500 text-white"
                      : "border-transparent text-slate-500 hover:text-slate-300"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab content area */}
            <div className="relative min-h-[250px]">
              {activeTab === "overview" && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <h3 className="text-lg font-bold text-white">Product Description</h3>
                  <p className="text-sm md:text-base text-slate-400 leading-relaxed">
                    {product.fullDescription}
                  </p>
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-900 flex gap-3 text-xs text-slate-400">
                    <Info className="w-5 h-5 text-purple-400 shrink-0" />
                    <p className="leading-relaxed">
                      This digital asset is packaged as a standard ZIP archive containing clean, modular source code. Standard manual payment confirmation processes apply. Verified purchases unlock lifetime access to the zip file downloads.
                    </p>
                  </div>
                </motion.div>
              )}

              {activeTab === "features" && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <h3 className="text-lg font-bold text-white">Ecosystem Features</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {product.features.map((feat, i) => (
                      <li key={i} className="flex gap-2.5 text-sm text-slate-300 items-start">
                        <CheckCircle className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}

              {activeTab === "requirements" && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <h3 className="text-lg font-bold text-white">System Requirements</h3>
                  <div className="p-6 rounded-2xl bg-slate-950 border border-slate-900">
                    <ul className="space-y-4">
                      {product.requirements.map((req, i) => (
                        <li key={i} className="flex gap-3 text-sm text-slate-300 items-center">
                          <Server className="w-4 h-4 text-purple-400" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}

              {activeTab === "changelog" && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-8"
                >
                  {product.changelog.map((entry, idx) => (
                    <div key={idx} className="relative pl-6 border-l border-slate-900 space-y-3">
                      <div className="absolute left-[-5px] top-1.5 w-2.5 h-2.5 rounded-full bg-purple-500" />
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="text-sm font-black text-white">{entry.version}</span>
                        <span className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold">
                          <Calendar className="w-3.5 h-3.5" />
                          {entry.date}
                        </span>
                      </div>
                      <ul className="space-y-2">
                        {entry.changes.map((change, i) => (
                          <li key={i} className="text-xs text-slate-400 flex gap-2">
                            <span className="text-purple-500">•</span>
                            <span>{change}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </motion.div>
              )}
            </div>
          </div>

          {/* Checkout Info Sidebar (Right) */}
          <div className="space-y-8 sticky top-28">
            {/* Purchase Box */}
            <div className="p-6 md:p-8 rounded-2xl bg-slate-950 border border-slate-900 space-y-6 shadow-xl">
              <div>
                <span className="text-xs font-bold text-slate-500 uppercase">Purchase Price</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-3xl font-black text-white">{product.price}</span>
                  <span className="text-xs text-slate-500 line-through font-semibold">{product.originalPrice}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <button
                  onClick={() => setIsCheckoutOpen(true)}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 hover:opacity-95 text-sm font-bold text-white transition-all shadow-lg shadow-purple-500/10"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Purchase Template
                </button>
                {product.demoLink !== "#" && (
                  <a
                    href={product.demoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-1.5 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-sm font-bold text-slate-350 hover:text-white transition-all"
                  >
                    Launch Live Demo
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>

              <div className="w-full h-[1px] bg-slate-900" />

              {/* Specs List */}
              <div className="space-y-4 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-semibold">License model</span>
                  <span className="text-white font-bold">Standard Developer</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-semibold">Downloads</span>
                  <span className="flex items-center gap-1 text-white font-bold">
                    <Download className="w-3 h-3 text-slate-400" />
                    {product.downloads}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-semibold">User Rating</span>
                  <span className="flex items-center gap-0.5 text-white font-bold">
                    {product.rating}
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-semibold">Tech stack</span>
                  <span className="text-purple-400 font-black tracking-wider uppercase">
                    {product.tags[0]}
                  </span>
                </div>
              </div>
            </div>

            {/* Manual Payment verification info */}
            <div className="p-5 rounded-2xl bg-purple-950/10 border border-purple-500/20 text-xs text-purple-300 space-y-2.5">
              <div className="flex items-center gap-1.5 font-bold">
                <FileText className="w-4 h-4 shrink-0 text-cyan-400" />
                <span>Manual Verification Guarantee</span>
              </div>
              <p className="leading-relaxed text-slate-400">
                Purchasing digital assets uses our secure manual ledger verification system. Submit your payment phone number and Transaction ID (TxnID). Our operators verify the receipt and immediately unlock the ZIP files on your dashboard.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Manual Payment Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        product={product}
      />
    </div>
  );
}
