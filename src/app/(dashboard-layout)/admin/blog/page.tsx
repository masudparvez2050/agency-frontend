"use client";

import React, { useState } from "react";
import { BLOG_POSTS } from "@/lib/blog-data";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Eye, EyeOff, Check, X, BookOpen, Edit3 } from "lucide-react";
import { useCMSData } from "@/hooks/useCMS";

export default function AdminBlogPage() {
  const [posts, setPosts] = useCMSData<any>("blog", BLOG_POSTS);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Engineering");
  const [content, setContent] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [isDraft, setIsDraft] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;
    const newPost = {
      id: `blog-${Date.now()}`,
      title,
      category,
      excerpt: excerpt || content.slice(0, 120) + "...",
      content: content,
      date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }),
      author: "Plaxora Admin",
      readTime: `${Math.max(1, Math.round(content.split(" ").length / 200))} min read`,
      tags: [category.toLowerCase(), "tech"],
      published: !isDraft,
    };
    setPosts([newPost, ...posts]);
    setTitle(""); setContent(""); setExcerpt(""); setIsDraft(false);
    setSuccess(true); setShowForm(false);
    setTimeout(() => setSuccess(false), 4000);
  };

  const togglePublish = (id: string) => {
    setPosts(posts.map((p: any) => p.id === id ? { ...p, published: p.published === false ? true : false } : p));
  };

  const deletePost = (id: string) => {
    setPosts(posts.filter((p: any) => p.id !== id));
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-white">Blog CMS</h1>
          <p className="text-xs text-slate-400 mt-1">Write, publish, and manage tech blog articles.</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-green-600 hover:bg-green-500 text-xs font-bold text-white transition-all shadow cursor-pointer">
          {showForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          {showForm ? "Cancel" : "Write Post"}
        </button>
      </div>

      {success && (
        <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-center gap-2">
          <Check className="w-4 h-4 shrink-0" /> Blog post saved successfully!
        </div>
      )}

      <AnimatePresence>
        {showForm && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
            <form onSubmit={handleAdd} className="p-6 rounded-2xl bg-slate-950/70 border border-green-500/20 space-y-4 shadow-lg">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-green-400" /> Write New Blog Post
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">Post Title *</label>
                  <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. How to build a SaaS with Next.js" className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-850 text-xs text-white placeholder-slate-550 focus:outline-none focus:border-green-500/40" required />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">Category</label>
                  <select value={category} onChange={e => setCategory(e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-850 text-xs text-slate-300 focus:outline-none focus:border-green-500/40 cursor-pointer">
                    {["Engineering","Business","Design","DevOps","Announcement"].map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">Short Excerpt</label>
                <input type="text" value={excerpt} onChange={e => setExcerpt(e.target.value)} placeholder="Brief summary shown on blog card..." className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-850 text-xs text-white placeholder-slate-550 focus:outline-none focus:border-green-500/40" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">Full Content *</label>
                <textarea rows={6} value={content} onChange={e => setContent(e.target.value)} placeholder="Write your full blog post content here..." className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-850 text-xs text-white placeholder-slate-550 focus:outline-none focus:border-green-500/40 resize-none" required />
              </div>
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={isDraft} onChange={e => setIsDraft(e.target.checked)} className="w-3.5 h-3.5 rounded" />
                  <span className="text-xs text-slate-400">Save as Draft</span>
                </label>
                <button type="submit" className="px-6 py-2.5 rounded-xl bg-green-600 hover:bg-green-500 text-xs font-bold text-white transition-all cursor-pointer">
                  {isDraft ? "Save Draft" : "Publish Post"}
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Blog Posts Table */}
      <div className="rounded-2xl bg-slate-950/70 border border-slate-900 overflow-x-auto shadow-lg">
        <table className="w-full text-left text-xs border-collapse min-w-[500px]">
          <thead>
            <tr className="bg-slate-900/50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-900">
              <th className="p-4">Title</th>
              <th className="p-4">Category</th>
              <th className="p-4">Date</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-900">
            {posts.map((p: any) => (
              <tr key={p.id} className="hover:bg-slate-900/10 transition-colors">
                <td className="p-4">
                  <div className="font-bold text-white max-w-xs truncate">{p.title}</div>
                  <div className="text-[10px] text-slate-500 mt-0.5 max-w-xs truncate">{p.excerpt}</div>
                </td>
                <td className="p-4"><span className="text-[10px] font-bold text-green-400 bg-green-500/10 border border-green-500/20 px-2 py-0.5 rounded">{p.category}</span></td>
                <td className="p-4 text-slate-400">{p.date}</td>
                <td className="p-4">
                  <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded border ${p.published !== false ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" : "text-slate-500 bg-slate-800 border-slate-700"}`}>
                    {p.published !== false ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex gap-2 justify-end">
                    <button onClick={() => togglePublish(p.id)} className="p-1.5 rounded-lg bg-slate-900 border border-slate-850 text-slate-400 hover:text-white transition-colors cursor-pointer" title={p.published !== false ? "Unpublish" : "Publish"}>
                      {p.published !== false ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                    <button onClick={() => deletePost(p.id)} className="p-1.5 rounded-lg bg-slate-900 hover:bg-rose-600/10 border border-slate-850 hover:border-rose-500/20 text-slate-400 hover:text-rose-400 transition-all cursor-pointer">
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
