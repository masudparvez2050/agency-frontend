"use client";

import React, { useState } from "react";
import { PRODUCTS } from "@/lib/products-data";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Pencil, Trash2, Eye, EyeOff, Check, X, Package } from "lucide-react";

type ProductRow = { id: string; title: string; category: string; price: string; active: boolean; };

export default function AdminProductsPage() {
  const [products, setProducts] = useState<ProductRow[]>(
    PRODUCTS.map(p => ({ id: p.id, title: p.title, category: p.category, price: p.price, active: true }))
  );
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Next.js");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [success, setSuccess] = useState(false);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !price) return;
    setProducts(prev => [...prev, {
      id: `prod-${Date.now()}`,
      title, category, price: `${price} BDT`, active: true
    }]);
    setTitle(""); setPrice(""); setDescription(""); setCategory("Next.js");
    setSuccess(true);
    setShowForm(false);
    setTimeout(() => setSuccess(false), 4000);
  };

  const toggleActive = (id: string) =>
    setProducts(prev => prev.map(p => p.id === id ? { ...p, active: !p.active } : p));

  const deleteProduct = (id: string) =>
    setProducts(prev => prev.filter(p => p.id !== id));

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-white">Products CMS</h1>
          <p className="text-xs text-slate-400 mt-1">Manage product listings, pricing and visibility.</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-xs font-bold text-white transition-all shadow cursor-pointer"
        >
          {showForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          {showForm ? "Cancel" : "Add Product"}
        </button>
      </div>

      {success && (
        <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-center gap-2">
          <Check className="w-4 h-4 shrink-0" /> Product published successfully!
        </div>
      )}

      {/* Add Product Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <form onSubmit={handleAdd} className="p-6 rounded-2xl bg-slate-950/70 border border-purple-500/20 space-y-4 shadow-lg">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Package className="w-4 h-4 text-purple-400" /> Add New Product
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">Title *</label>
                  <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Next.js SaaS Boilerplate" className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-850 text-xs text-white placeholder-slate-550 focus:outline-none focus:border-purple-500/40" required />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">Category</label>
                    <select value={category} onChange={e => setCategory(e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-850 text-xs text-slate-300 focus:outline-none focus:border-purple-500/40 cursor-pointer">
                      {["Next.js","React","Flutter","Figma","Scripts","SaaS"].map(c => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">Price (BDT) *</label>
                    <input type="number" value={price} onChange={e => setPrice(e.target.value)} placeholder="1500" className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-850 text-xs text-white placeholder-slate-550 focus:outline-none focus:border-purple-500/40" required />
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">Description</label>
                <textarea rows={2} value={description} onChange={e => setDescription(e.target.value)} placeholder="Short product summary..." className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-850 text-xs text-white placeholder-slate-550 focus:outline-none focus:border-purple-500/40 resize-none" />
              </div>
              <button type="submit" className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-xs font-bold text-white transition-all cursor-pointer">
                Publish Product
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Products Table */}
      <div className="rounded-2xl bg-slate-950/70 border border-slate-900 overflow-x-auto shadow-lg">
        <table className="w-full text-left text-xs border-collapse min-w-[500px]">
          <thead>
            <tr className="bg-slate-900/50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-900">
              <th className="p-4">Product Name</th>
              <th className="p-4">Category</th>
              <th className="p-4">Price</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-900">
            {products.map((p) => (
              <tr key={p.id} className="hover:bg-slate-900/10 transition-colors">
                <td className="p-4 font-bold text-white">{p.title}</td>
                <td className="p-4">
                  <span className="text-[10px] font-bold text-purple-400 bg-purple-500/10 border border-purple-500/20 px-2 py-0.5 rounded">{p.category}</span>
                </td>
                <td className="p-4 font-bold text-white">{p.price}</td>
                <td className="p-4">
                  <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded border ${p.active ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" : "text-slate-500 bg-slate-800 border-slate-700"}`}>
                    {p.active ? "Active" : "Draft"}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex gap-2 justify-end">
                    <button onClick={() => toggleActive(p.id)} className="p-1.5 rounded-lg bg-slate-900 border border-slate-850 text-slate-400 hover:text-white transition-colors cursor-pointer" title={p.active ? "Set Draft" : "Publish"}>
                      {p.active ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                    <button onClick={() => deleteProduct(p.id)} className="p-1.5 rounded-lg bg-slate-900 hover:bg-rose-600/10 border border-slate-850 hover:border-rose-500/20 text-slate-400 hover:text-rose-400 transition-all cursor-pointer" title="Delete">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
