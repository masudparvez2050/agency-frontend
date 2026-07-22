"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CreditCard, Check, AlertCircle, ShoppingCart } from "lucide-react";
import { Product } from "@/types/product";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
}

export default function CheckoutModal({ isOpen, onClose, product }: CheckoutModalProps) {
  const [paymentMethod, setPaymentMethod] = useState<"bkash" | "nagad" | "rocket" | null>(null);
  const [senderNumber, setSenderNumber] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  if (!product) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!paymentMethod || !senderNumber || !transactionId) return;

    setIsSubmitting(true);
    // Simulate API request to backend Admin CMS
    setTimeout(() => {
      setIsSubmitting(false);
      setOrderSuccess(true);
    }, 1500);
  };

  const handleModalClose = () => {
    // Reset state on close
    setPaymentMethod(null);
    setSenderNumber("");
    setTransactionId("");
    setOrderSuccess(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleModalClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            className="relative w-full max-w-lg rounded-2xl bg-white border border-slate-200 p-6 md:p-8 shadow-2xl z-10 max-h-[90vh] overflow-y-auto"
          >
            {/* Close Button */}
            <button
              onClick={handleModalClose}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            {!orderSuccess ? (
              <>
                <h3 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5 text-purple-600" />
                  Checkout Order
                </h3>
                <p className="text-xs text-slate-600 mb-6">
                  Product: <span className="font-bold text-purple-700">{product.title}</span> (Price: <span className="text-slate-900 font-extrabold">{product.price}</span>)
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
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
                        Please send <strong className="text-slate-900">{product.price}</strong> to the following personal/merchant number using {paymentMethod === "bkash" ? "bKash" : paymentMethod === "nagad" ? "Nagad" : "Rocket"} app or code dial:
                      </p>
                      <p className="text-lg font-mono font-bold text-center text-slate-900 py-1.5 bg-white rounded border border-slate-200 tracking-wider shadow-inner">
                        {paymentMethod === "bkash" ? "01783-XXXXXX (bKash)" : paymentMethod === "nagad" ? "01944-XXXXXX (Nagad)" : "01521-XXXXXX (Rocket)"}
                      </p>
                      <p className="text-[10px] text-slate-500 leading-normal">
                        Use the <strong>Send Money</strong> or <strong>Cash Out</strong> option. Keep your Transaction ID (TxnID) ready to submit below.
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
                        <label htmlFor="sender-phone" className="block text-xs font-bold text-slate-600 uppercase tracking-wide mb-2">
                          Your Payment Phone Number
                        </label>
                        <input
                          id="sender-phone"
                          type="text"
                          placeholder="e.g. 017XXXXXXXX"
                          value={senderNumber}
                          onChange={(e) => setSenderNumber(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-100 transition-all font-medium"
                          required
                        />
                      </div>

                      <div>
                        <label htmlFor="txn-code" className="block text-xs font-bold text-slate-600 uppercase tracking-wide mb-2">
                          Transaction ID (TxnID)
                        </label>
                        <input
                          id="txn-code"
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

                  {/* Submit button */}
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
                  Thank you! Your manual transaction ID (<strong className="text-slate-900 font-mono">{transactionId}</strong>) has been submitted to the Admin panel.
                </p>
                <p className="text-xs text-slate-500 max-w-xs mx-auto leading-normal">
                  Our administrators will cross-verify this ID. Once validated, your code downloads will unlock in your User Dashboard.
                </p>
                <button
                  onClick={handleModalClose}
                  className="mt-6 px-6 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-xs font-bold text-slate-700 transition-all"
                >
                  Close Window
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
