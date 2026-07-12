"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileCode, ShoppingCart, ExternalLink, X, CreditCard, Check, AlertCircle, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const FEATURED_PRODUCTS = [
  {
    id: "plaxora-ecommerce-template",
    title: "Plaxora-Shop eCommerce Template",
    category: "Next.js Template",
    description: "Ultra-fast eCommerce frontend with complete cart, search filters, manual payment forms, and Next.js ISR pre-rendering.",
    price: "1,500 BDT",
    originalPrice: "3,000 BDT",
    tags: ["Next.js", "TailwindCSS", "Prisma"],
    imageGradient: "from-indigo-600 via-purple-600 to-pink-500",
    demoLink: "https://demo.plaxora.shop",
  },
  {
    id: "sass-dashboard-boilerplate",
    title: "Vortex SaaS Admin Boilerplate",
    category: "React Template",
    description: "Clean dashboard framework featuring charts, notifications, multi-role user dashboards, and Stripe hook adapters.",
    price: "2,200 BDT",
    originalPrice: "4,500 BDT",
    tags: ["React", "Recharts", "Zustand"],
    imageGradient: "from-blue-600 via-cyan-500 to-indigo-500",
    demoLink: "https://vortex.plaxora.shop",
  },
  {
    id: "figma-ui-kit-pro",
    title: "Plaxora Premium UI Figma Kit",
    category: "Figma UI Kit",
    description: "Design system containing 200+ responsive elements, dark-first grids, custom web layouts, and interactive variables.",
    price: "850 BDT",
    originalPrice: "1,800 BDT",
    tags: ["Figma", "UI/UX", "Design Tokens"],
    imageGradient: "from-teal-600 via-cyan-600 to-emerald-500",
    demoLink: "#",
  },
];

export default function FeaturedProducts() {
  const [selectedProduct, setSelectedProduct] = useState<typeof FEATURED_PRODUCTS[0] | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<"bkash" | "nagad" | "rocket" | null>(null);
  const [senderNumber, setSenderNumber] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const handlePurchase = (product: typeof FEATURED_PRODUCTS[0]) => {
    setSelectedProduct(product);
    setPaymentMethod(null);
    setSenderNumber("");
    setTransactionId("");
    setOrderSuccess(false);
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!paymentMethod || !senderNumber || !transactionId) return;

    setIsSubmitting(true);
    // Simulate API request to Admin panel CMS
    setTimeout(() => {
      setIsSubmitting(false);
      setOrderSuccess(true);
    }, 1500);
  };

  return (
    <section className="py-24 bg-transparent border-t border-slate-900/60 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-purple-500/5 blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-semibold text-cyan-300 mb-4">
              <FileCode className="w-3.5 h-3.5" />
              <span>Digital Marketplace</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
              Premium Web Templates & Assets
            </h2>
            <p className="text-slate-400 max-w-xl">
              Buy ready-made eCommerce templates, SaaS dashboards, figma systems, and automation scripts. Manual payment checkout (bKash/Nagad) supported.
            </p>
          </div>
          <Link
            href="/products"
            className="group inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-400 hover:text-cyan-300 mt-4 md:mt-0 transition-colors"
          >
            Explore marketplace
            <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {FEATURED_PRODUCTS.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group relative rounded-2xl bg-slate-950 border border-slate-900 overflow-hidden flex flex-col justify-between hover:border-cyan-500/20 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/5"
            >
              {/* Product graphic preview */}
              <div className={`h-48 bg-gradient-to-br ${product.imageGradient} relative flex items-center justify-center p-6 group-hover:scale-[1.02] transition-transform duration-500`}>
                <div className="absolute inset-0 bg-black/20" />
                <div className="relative p-4 rounded-xl bg-[#030014]/90 border border-white/10 text-center max-w-xs shadow-2xl backdrop-blur-md">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-cyan-400">{product.category}</span>
                  <p className="text-sm font-extrabold text-white mt-1 line-clamp-1">{product.title}</p>
                  <div className="flex gap-1.5 justify-center mt-3">
                    {product.tags.map((tag) => (
                      <span key={tag} className="text-[9px] bg-white/5 border border-white/10 px-1.5 py-0.5 rounded text-slate-300">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                    {product.title}
                  </h3>
                  <p className="text-xs font-semibold text-cyan-400/80 mb-3">{product.category}</p>
                  <p className="text-sm text-slate-400 mb-6 line-clamp-3 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                <div>
                  {/* Price */}
                  <div className="flex items-baseline gap-2 mb-6">
                    <span className="text-2xl font-black text-white">{product.price}</span>
                    <span className="text-xs text-slate-500 line-through font-semibold">{product.originalPrice}</span>
                  </div>

                  {/* Actions */}
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => handlePurchase(product)}
                      className="flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-xs font-bold text-white transition-all shadow-md shadow-purple-500/20"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      Buy Now
                    </button>
                    {product.demoLink !== "#" ? (
                      <a
                        href={product.demoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-bold text-slate-300 transition-all"
                      >
                        Live Demo
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : (
                      <div className="flex items-center justify-center py-2.5 px-4 rounded-xl bg-slate-950 border border-slate-900 text-xs font-bold text-slate-600">
                        No Demo
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Manual Payment Checkout Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              className="relative w-full max-w-lg rounded-2xl bg-slate-950 border border-slate-800 p-6 md:p-8 shadow-2xl z-10 max-h-[90vh] overflow-y-auto"
            >
              {/* Close */}
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-900 border border-transparent transition-all"
              >
                <X className="w-5 h-5" />
              </button>

              {!orderSuccess ? (
                <>
                  {/* Step 1: Select payment */}
                  <h3 className="text-xl font-bold text-white mb-2">Checkout Order</h3>
                  <p className="text-xs text-slate-400 mb-6">
                    Product: <span className="font-bold text-cyan-400">{selectedProduct.title}</span> (Price: <span className="text-white font-extrabold">{selectedProduct.price}</span>)
                  </p>

                  <form onSubmit={handleCheckoutSubmit} className="space-y-6">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wide mb-3">
                        Choose Manual Payment Method
                      </label>
                      <div className="grid grid-cols-3 gap-3">
                        {[
                          { id: "bkash", name: "bKash", color: "border-pink-500/20 hover:border-pink-500 bg-pink-500/5 text-pink-300" },
                          { id: "nagad", name: "Nagad", color: "border-orange-500/20 hover:border-orange-500 bg-orange-500/5 text-orange-300" },
                          { id: "rocket", name: "Rocket", color: "border-purple-500/20 hover:border-purple-500 bg-purple-500/5 text-purple-300" },
                        ].map((method) => (
                          <button
                            key={method.id}
                            type="button"
                            onClick={() => setPaymentMethod(method.id as any)}
                            className={`p-3 rounded-xl border text-sm font-black transition-all flex flex-col items-center justify-center ${method.color} ${
                              paymentMethod === method.id ? "ring-2 ring-cyan-400 border-transparent bg-white/5" : ""
                            }`}
                          >
                            {method.name}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Payment instructions */}
                    {paymentMethod && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 space-y-2.5"
                      >
                        <div className="flex items-center gap-1.5 text-cyan-400 font-bold">
                          <AlertCircle className="w-4 h-4 shrink-0" />
                          <span>Instructions</span>
                        </div>
                        <p>
                          Please send <strong className="text-white">{selectedProduct.price}</strong> to the following personal/merchant number using {paymentMethod === "bkash" ? "bKash" : paymentMethod === "nagad" ? "Nagad" : "Rocket"} app or code dial:
                        </p>
                        <p className="text-lg font-mono font-bold text-center text-white py-1 bg-black/30 rounded border border-slate-800">
                          {paymentMethod === "bkash" ? "01783-XXXXXX (bKash)" : paymentMethod === "nagad" ? "01944-XXXXXX (Nagad)" : "01521-XXXXXX (Rocket)"}
                        </p>
                        <p className="text-[10px] text-slate-400">
                          Use the Send Money or Cash Out option. Keep your Transaction ID (TxnID) ready to submit below.
                        </p>
                      </motion.div>
                    )}

                    {/* Transaction Details */}
                    {paymentMethod && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-4"
                      >
                        <div>
                          <label htmlFor="sender-number" className="block text-xs font-bold text-slate-400 uppercase tracking-wide mb-2">
                            Your Payment Phone Number
                          </label>
                          <input
                            id="sender-number"
                            type="text"
                            placeholder="e.g. 017XXXXXXXX"
                            value={senderNumber}
                            onChange={(e) => setSenderNumber(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/40 transition-colors"
                            required
                          />
                        </div>

                        <div>
                          <label htmlFor="txn-id" className="block text-xs font-bold text-slate-400 uppercase tracking-wide mb-2">
                            Transaction ID (TxnID)
                          </label>
                          <input
                            id="txn-id"
                            type="text"
                            placeholder="e.g. A2B9KD82LL"
                            value={transactionId}
                            onChange={(e) => setTransactionId(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/40 transition-colors font-mono uppercase"
                            required
                          />
                        </div>
                      </motion.div>
                    )}

                    {/* Submit checkout */}
                    <button
                      type="submit"
                      disabled={!paymentMethod || !senderNumber || !transactionId || isSubmitting}
                      className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 disabled:from-slate-800 disabled:to-slate-800 hover:opacity-95 text-sm font-bold text-white transition-all disabled:text-slate-600 disabled:cursor-not-allowed shadow-lg"
                    >
                      {isSubmitting ? (
                        <span>Submitting Request...</span>
                      ) : (
                        <>
                          <CreditCard className="w-4 h-4" />
                          <span>Submit Transaction ID</span>
                        </>
                      )}
                    </button>
                  </form>
                </>
              ) : (
                <div className="text-center py-8 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto text-emerald-400">
                    <Check className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Order Submitted!</h3>
                  <p className="text-sm text-slate-400 max-w-sm mx-auto leading-relaxed">
                    Thank you! Your transaction ID (<strong className="text-white font-mono">{transactionId}</strong>) has been submitted to the Admin panel.
                  </p>
                  <p className="text-xs text-slate-500">
                    Our team will verify the payment. Once approved, you will find your download link in the User Dashboard.
                  </p>
                  <button
                    onClick={() => setSelectedProduct(null)}
                    className="mt-6 px-6 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-bold text-slate-300 transition-all"
                  >
                    Close Window
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
