"use client";

import React, { useState, useMemo } from "react";
import { BLOG_POSTS } from "@/lib/blog-data";
import { BlogPost } from "@/types/blog";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, SlidersHorizontal, Calendar, Clock, User, 
  ArrowRight, X, BookOpen, Sparkles, Check, AlertCircle 
} from "lucide-react";

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeArticle, setActiveArticle] = useState<BlogPost | null>(null);

  // Newsletter states
  const [emailInput, setEmailInput] = useState("");
  const [subSuccess, setSubSuccess] = useState(false);

  const categories = ["All", "Next.js", "DevOps", "Fintech", "Case Study"];

  // Filter blog posts
  const filteredPosts = useMemo(() => {
    let result = [...BLOG_POSTS];

    // 1. Search Query
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (post) =>
          post.title.toLowerCase().includes(q) ||
          post.excerpt.toLowerCase().includes(q) ||
          post.author.toLowerCase().includes(q)
      );
    }

    // 2. Category Filter
    if (selectedCategory !== "All") {
      result = result.filter((post) => post.category === selectedCategory);
    }

    return result;
  }, [searchQuery, selectedCategory]);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput) return;
    setSubSuccess(true);
    setEmailInput("");
    setTimeout(() => setSubSuccess(false), 5000);
  };

  return (
    <div className="min-h-screen pt-32 pb-24 overflow-hidden relative">
      {/* Glow Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-purple-500/5 blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-cyan-500/5 blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10 space-y-16">
        
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold text-purple-400 uppercase tracking-widest mb-3 block">Tech Insights</span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white mb-4 leading-tight">
            Plaxora Blog
          </h1>
          <p className="text-slate-400">
            Tutorials and engineering case studies covering React Server Components, cloud VPS server setups, and tokenized mobile payment API integrations.
          </p>
        </div>

        {/* Filters Toolbar */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between p-4 rounded-2xl bg-slate-950/60 border border-slate-900 backdrop-blur-xl max-w-4xl mx-auto shadow-xl">
          {/* Search bar */}
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search tutorials by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-850 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/40 transition-colors"
            />
          </div>

          {/* Category selection */}
          <div className="flex flex-wrap gap-1.5 justify-end w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all border ${
                  selectedCategory === cat
                    ? "bg-purple-655 border-purple-500 bg-purple-600/10 text-purple-400"
                    : "border-transparent text-slate-500 hover:text-slate-300"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {filteredPosts.map((post, idx) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="group relative rounded-2xl bg-slate-950/80 border border-slate-900 p-6 overflow-hidden flex flex-col justify-between hover:border-purple-500/20 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/5 cursor-pointer"
                onClick={() => setActiveArticle(post)}
              >
                {/* Visual Top Glow */}
                <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-purple-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <div>
                  {/* Meta tag & date */}
                  <div className="flex items-center justify-between mb-4 text-[10px] font-bold text-slate-500">
                    <span className="uppercase text-purple-400 tracking-wider">
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors leading-snug">
                    {post.title}
                  </h3>

                  <p className="text-xs text-slate-405 text-slate-400 mt-3 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>

                <div>
                  <div className="w-full h-[1px] bg-slate-900 my-5" />

                  {/* Author details */}
                  <div className="flex justify-between items-center text-[10px]">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-slate-900 border border-slate-850 flex items-center justify-center text-slate-400 font-bold uppercase">
                        {post.author.substring(0, 1)}
                      </div>
                      <div>
                        <strong className="text-white block">{post.author}</strong>
                        <span className="text-slate-550 block font-semibold">{post.authorRole}</span>
                      </div>
                    </div>

                    <span className="text-slate-550 font-semibold">{post.date}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 rounded-2xl bg-slate-950/40 border border-slate-900 max-w-md mx-auto">
            <BookOpen className="w-12 h-12 text-slate-650 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">No articles found</h3>
            <p className="text-sm text-slate-450 px-6">
              We couldn&apos;t find any tech articles matching your query or category filter.
            </p>
          </div>
        )}

        {/* Newsletter subscription box */}
        <div className="p-8 rounded-3xl bg-slate-950/80 border border-slate-900 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden max-w-4xl mx-auto">
          <div className="absolute top-0 right-0 w-40 h-40 bg-purple-500/5 blur-2xl rounded-full" />
          <div className="space-y-1.5 relative z-10 max-w-md">
            <h3 className="text-lg font-bold text-white">Subscribe to Plaxora Insights</h3>
            <p className="text-xs text-slate-450 leading-relaxed">
              Receive notifications when we release new open-source scripts, Next.js templates, and detailed tech tutorials. Zero spam.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="flex gap-2 w-full md:max-w-sm relative z-10">
            {subSuccess ? (
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-center gap-2 w-full justify-center">
                <Check className="w-4 h-4" />
                <span>Subscription active!</span>
              </div>
            ) : (
              <>
                <input
                  type="email"
                  placeholder="name@business.com"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="flex-grow px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-850 text-xs text-white placeholder-slate-550 focus:outline-none focus:border-purple-500/40 transition-colors"
                  required
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-xs font-bold text-white transition-all shadow-md shadow-purple-500/25 shrink-0 cursor-pointer"
                >
                  Subscribe
                </button>
              </>
            )}
          </form>
        </div>
      </div>

      {/* Case Study Detail Overlay Modal */}
      <AnimatePresence>
        {activeArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveArticle(null)}
              className="fixed inset-0 bg-black/75 backdrop-blur-sm"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 350, damping: 28 }}
              className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl bg-slate-950 border border-slate-900 p-6 md:p-8 space-y-6 z-10 shadow-2xl no-scrollbar"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveArticle(null)}
                className="absolute top-4 right-4 p-1.5 rounded-lg bg-slate-900 border border-slate-850 text-slate-400 hover:text-white transition-colors cursor-pointer"
                aria-label="Close Article"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Title Header */}
              <div className="space-y-2 border-b border-slate-900 pb-5">
                <div className="flex items-center gap-2 text-[10px] font-bold text-slate-550">
                  <span className="uppercase text-purple-400 tracking-widest px-2 py-0.5 rounded bg-purple-500/10 border border-purple-500/20">
                    {activeArticle.category}
                  </span>
                  <span>•</span>
                  <span>{activeArticle.readTime}</span>
                </div>
                <h2 className="text-xl md:text-2xl font-black text-white leading-tight">
                  {activeArticle.title}
                </h2>
              </div>

              {/* Content text */}
              <div className="text-xs md:text-sm text-slate-350 space-y-4 leading-relaxed font-normal">
                {activeArticle.content.split("\n\n").map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>

              {/* Article Footer (Author Details) */}
              <div className="flex justify-between items-center text-[10px] pt-6 border-t border-slate-900">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-slate-900 border border-slate-850 flex items-center justify-center text-slate-400 font-bold uppercase">
                    {activeArticle.author.substring(0, 1)}
                  </div>
                  <div>
                    <strong className="text-white block">{activeArticle.author}</strong>
                    <span className="text-slate-550 block font-semibold">{activeArticle.authorRole}</span>
                  </div>
                </div>

                <span className="text-slate-550 font-semibold">Published: {activeArticle.date}</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
