"use client";

import React, { useState } from "react";
import { PRODUCTS } from "@/lib/products-data";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Pencil, Trash2, Eye, EyeOff, Check, X, Package } from "lucide-react";

type ProductRow = { id: string; title: string; category: string; price: string; active: boolean; };

import { useCMSData } from "@/hooks/useCMS";

export default function AdminProductsPage() {
  const [products, setProducts] = useCMSData<any>("products", PRODUCTS);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Next.js");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [success, setSuccess] = useState(false);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !price) return;
    const newProd = {
      id: `prod-${Date.now()}`,
      title,
      category,
      price: `${parseInt(price).toLocaleString()} BDT`,
      originalPrice: `${Math.round(parseInt(price) * 1.5).toLocaleString()} BDT`,
      priceVal: parseInt(price),
      description: description || "Fully responsive layout optimized for user conversion.",
      rating: 5.0,
      downloads: "1",
      imageGradient: "from-indigo-650 to-purple-650",
      tags: [category.toLowerCase(), "boilerplate", "clean-code"],
      active: true
    };
    setProducts([...products, newProd]);
    setTitle(""); setPrice(""); setDescription(""); setCategory("Next.js");
    setSuccess(true);
    setShowForm(false);
    setTimeout(() => setSuccess(false), 4000);
  };

  const toggleActive = (id: string) => {
    setProducts(products.map((p: any) => p.id === id ? { ...p, active: p.active === false ? true : false } : p));
  };

  const deleteProduct = (id: string) => {
    setProducts(products.filter((p: any) => p.id !== id));
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-slate-900">Products CMS</h1>
          <p className="text-xs text-slate-500 mt-1">Manage product listings, pricing and visibility.</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-xs font-bold text-white transition-all shadow-sm cursor-pointer"
        >
          {showForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          {showForm ? "Cancel" : "Add Product"}
        </button>
      </div>

      {success && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold flex items-center gap-2">
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
            <form onSubmit={handleAdd} className="p-6 rounded-2xl bg-white border border-purple-200 space-y-4 shadow-sm">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Package className="w-4 h-4 text-purple-600" /> Add New Product
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">Title *</label>
                  <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Next.js SaaS Boilerplate" className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all font-medium" required />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">Category</label>
                    <select value={category} onChange={e => setCategory(e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all font-medium cursor-pointer">
                      {["Next.js","React","Flutter","Figma","Scripts","SaaS"].map(c => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">Price (BDT) *</label>
                    <input type="number" value={price} onChange={e => setPrice(e.target.value)} placeholder="1500" className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all font-medium" required />
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">Description</label>
                <textarea rows={2} value={description} onChange={e => setDescription(e.target.value)} placeholder="Short product summary..." className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all font-medium resize-none" />
              </div>
              <button type="submit" className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-xs font-bold text-white transition-all cursor-pointer shadow-sm">
                Publish Product
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Products Table */}
      <div className="rounded-2xl bg-white border border-slate-200 overflow-x-auto shadow-sm">
        <table className="w-full text-left text-xs border-collapse min-w-[500px]">
          <thead>
            <tr className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200">
              <th className="p-4">Product Name</th>
              <th className="p-4">Category</th>
              <th className="p-4">Price</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {products.map((p: any) => (
              <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                <td className="p-4 font-bold text-slate-900">{p.title}</td>
                <td className="p-4">
                  <span className="text-[10px] font-bold text-purple-700 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded-full">{p.category}</span>
                </td>
                <td className="p-4 font-black text-slate-900">{p.price}</td>
                <td className="p-4">
                  <span className={`text-[9px] font-bold uppercase px-2.5 py-0.5 rounded-full border ${p.active ? "text-emerald-700 bg-emerald-50 border-emerald-200" : "text-slate-500 bg-slate-100 border-slate-200"}`}>
                    {p.active ? "Active" : "Draft"}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex gap-2 justify-end">
                    <button onClick={() => toggleActive(p.id)} className="p-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer" title={p.active ? "Set Draft" : "Publish"}>
                      {p.active ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                    <button onClick={() => deleteProduct(p.id)} className="p-1.5 rounded-lg bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 text-slate-500 hover:text-rose-600 transition-all cursor-pointer" title="Delete">
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
