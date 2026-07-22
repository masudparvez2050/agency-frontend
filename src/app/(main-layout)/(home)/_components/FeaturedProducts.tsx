"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FileCode, ShoppingCart, ExternalLink, X, CreditCard, Check, AlertCircle, Sparkles,
  Star, Download
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { PRODUCTS } from "@/lib/products-data";
import { Product } from "@/types/product";

const FEATURED_PRODUCTS = PRODUCTS.slice(0, 3);

export default function FeaturedProducts() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<"bkash" | "nagad" | "rocket" | null>(null);
  const [senderNumber, setSenderNumber] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const handlePurchase = (product: Product) => {
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
    <section className="py-24 bg-transparent border-t border-slate-200 relative overflow-hidden">
      {/* Decorative Blur Orb */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-purple-500/5 blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-xs font-bold text-purple-700 mb-4">
              <FileCode className="w-3.5 h-3.5" />
              <span>Digital Marketplace</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4">
              Premium Web Templates & Assets
            </h2>
            <p className="text-slate-600 font-medium max-w-xl">
              Buy ready-made eCommerce templates, SaaS dashboards, figma systems, and automation scripts. Manual payment checkout (bKash/Nagad) supported.
            </p>
          </div>
          <Link
            href="/products"
            className="group inline-flex items-center gap-1.5 text-sm font-bold text-purple-700 hover:text-purple-800 mt-4 md:mt-0 transition-colors"
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
              className="group relative rounded-2xl bg-white border border-slate-200/80 overflow-hidden flex flex-col justify-between hover:border-purple-300 transition-all duration-300 shadow-md hover:shadow-xl hover:shadow-purple-500/5"
            >
              {/* Visual Graphic Representation */}
              <div className="h-48 relative overflow-hidden transition-transform duration-500 border-b border-slate-200 group-hover:scale-[1.01]">
                <img
                  src={`/${product.id}-preview.png`}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" />
                
                {/* Category Overlay Tag */}
                <span className="absolute top-4 left-4 inline-flex items-center px-2.5 py-1 rounded-lg bg-white/90 backdrop-blur-md border border-slate-200 text-[10px] font-extrabold text-purple-700 uppercase tracking-widest shadow-sm">
                  {product.category}
                </span>
              </div>

              {/* Card Details */}
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold tracking-widest text-purple-700 uppercase">
                    {product.category}
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 mt-1 mb-2 group-hover:text-purple-700 transition-colors line-clamp-1">
                    {product.title}
                  </h3>
                  <p className="text-sm text-slate-600 mb-6 line-clamp-3 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                <div>
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {product.tags.map((tag: string) => (
                      <span
                        key={tag}
                        className="text-[10px] font-bold text-slate-600 px-2 py-0.5 rounded-full bg-slate-100 border border-slate-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="w-full h-[1px] bg-slate-200 mb-6" />

                  {/* Footer Info */}
                  <div className="flex items-center justify-between mb-6 text-xs text-slate-500 font-medium">
                    <span className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <strong className="text-slate-800">{product.rating}</strong>
                    </span>
                    <span className="flex items-center gap-1">
                      <Download className="w-3.5 h-3.5" />
                      <strong className="text-slate-800">{product.downloads} downloads</strong>
                    </span>
                  </div>

                  {/* Price and Action Buttons */}
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold text-slate-400 line-through">
                        {product.originalPrice}
                      </span>
                      <span className="text-lg font-black text-slate-900">{product.price}</span>
                    </div>

                    <div className="flex gap-2">
                      <Link
                        href={`/products/${product.id}`}
                        className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 transition-all shadow-sm"
                        title="View Details"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handlePurchase(product)}
                        className="flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-xs font-bold text-white transition-all shadow-md shadow-purple-500/15"
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                        Buy Now
                      </button>
                    </div>
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
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              className="relative w-full max-w-lg rounded-2xl bg-white border border-slate-200 p-6 md:p-8 shadow-2xl z-10 max-h-[90vh] overflow-y-auto"
            >
              {/* Close */}
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-all"
              >
                <X className="w-5 h-5" />
              </button>

              {!orderSuccess ? (
                <>
                  {/* Step 1: Select payment */}
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Checkout Order</h3>
                  <p className="text-xs text-slate-600 mb-6">
                    Product: <span className="font-bold text-purple-700">{selectedProduct.title}</span> (Price: <span className="text-slate-900 font-extrabold">{selectedProduct.price}</span>)
                  </p>

                  <form onSubmit={handleCheckoutSubmit} className="space-y-6">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">
                        Choose Manual Payment Method
                      </label>
                      <div className="grid grid-cols-3 gap-3">
                        {[
                          { id: "bkash", name: "bKash", color: "border-pink-200 hover:border-pink-500 bg-pink-50 text-pink-700" },
                          { id: "nagad", name: "Nagad", color: "border-orange-200 hover:border-orange-500 bg-orange-50 text-orange-700" },
                          { id: "rocket", name: "Rocket", color: "border-purple-200 hover:border-purple-500 bg-purple-50 text-purple-700" },
                        ].map((method) => (
                          <button
                            key={method.id}
                            type="button"
                            onClick={() => setPaymentMethod(method.id as any)}
                            className={`p-3 rounded-xl border text-sm font-black transition-all flex flex-col items-center justify-center ${method.color} ${
                              paymentMethod === method.id ? "ring-2 ring-purple-600 border-transparent shadow-sm" : ""
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
                        className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-2.5"
                      >
                        <div className="flex items-center gap-1.5 text-purple-700 font-bold">
                          <AlertCircle className="w-4 h-4 shrink-0" />
                          <span>Instructions</span>
                        </div>
                        <p>
                          Please send <strong className="text-slate-900">{selectedProduct.price}</strong> to the following personal/merchant number using {paymentMethod === "bkash" ? "bKash" : paymentMethod === "nagad" ? "Nagad" : "Rocket"} app or code dial:
                        </p>
                        <p className="text-lg font-mono font-bold text-center text-slate-900 py-1 bg-white rounded border border-slate-200 shadow-inner">
                          {paymentMethod === "bkash" ? "01783-XXXXXX (bKash)" : paymentMethod === "nagad" ? "01944-XXXXXX (Nagad)" : "01521-XXXXXX (Rocket)"}
                        </p>
                        <p className="text-[10px] text-slate-500">
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
                          <label htmlFor="sender-number" className="block text-xs font-bold text-slate-600 uppercase tracking-wide mb-2">
                            Your Payment Phone Number
                          </label>
                          <input
                            id="sender-number"
                            type="text"
                            placeholder="e.g. 017XXXXXXXX"
                            value={senderNumber}
                            onChange={(e) => setSenderNumber(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-100 transition-all font-medium"
                            required
                          />
                        </div>

                        <div>
                          <label htmlFor="txn-id" className="block text-xs font-bold text-slate-600 uppercase tracking-wide mb-2">
                            Transaction ID (TxnID)
                          </label>
                          <input
                            id="txn-id"
                            type="text"
                            placeholder="e.g. A2B9KD82LL"
                            value={transactionId}
                            onChange={(e) => setTransactionId(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-100 transition-all font-mono uppercase font-medium"
                            required
                          />
                        </div>
                      </motion.div>
                    )}

                    {/* Submit checkout */}
                    <button
                      type="submit"
                      disabled={!paymentMethod || !senderNumber || !transactionId || isSubmitting}
                      className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 disabled:from-slate-200 disabled:to-slate-200 hover:opacity-95 text-sm font-bold text-white transition-all disabled:text-slate-400 disabled:cursor-not-allowed shadow-md shadow-purple-500/15"
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
                  <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto text-emerald-600 shadow-sm">
                    <Check className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">Order Submitted!</h3>
                  <p className="text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
                    Thank you! Your transaction ID (<strong className="text-slate-900 font-mono">{transactionId}</strong>) has been submitted to the Admin panel.
                  </p>
                  <p className="text-xs text-slate-500">
                    Our team will verify the payment. Once approved, you will find your download link in the User Dashboard.
                  </p>
                  <button
                    onClick={() => setSelectedProduct(null)}
                    className="mt-6 px-6 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-xs font-bold text-slate-700 transition-all"
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
