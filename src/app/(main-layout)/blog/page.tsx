"use client";

import React, { useState, useMemo } from "react";
import { BLOG_POSTS } from "@/lib/blog-data";
import { BlogPost } from "@/types/blog";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, Clock, X, BookOpen, Check, Sparkles, Send, ArrowRight
} from "lucide-react";

import { useCMSData } from "@/hooks/useCMS";

export default function BlogPage() {
  const [allPosts] = useCMSData<any>("blog", BLOG_POSTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeArticle, setActiveArticle] = useState<BlogPost | null>(null);

  const [emailInput, setEmailInput] = useState("");
  const [subSuccess, setSubSuccess] = useState(false);

  const categories = ["All", "Next.js", "DevOps", "Fintech", "Case Study"];

  const filteredPosts = useMemo(() => {
    let result = allPosts.filter((p: any) => p.published !== false);

    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (post: any) =>
          post.title.toLowerCase().includes(q) ||
          post.excerpt.toLowerCase().includes(q) ||
          (post.author && post.author.toLowerCase().includes(q))
      );
    }

    if (selectedCategory !== "All") {
      result = result.filter((post: any) => post.category === selectedCategory);
    }

    return result;
  }, [allPosts, searchQuery, selectedCategory]);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput) return;
    setSubSuccess(true);
    setEmailInput("");
    setTimeout(() => setSubSuccess(false), 5000);
  };

  return (
    <div className="min-h-screen pt-28 pb-24 overflow-hidden relative bg-gradient-to-b from-white via-slate-50/50 to-white font-sans">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-200/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-200/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-50 border border-purple-100 text-purple-600 text-xs font-bold uppercase tracking-wider mb-3 shadow-2xs">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Tech Insights</span>
          </div>
          <h1 className="font-heading font-extrabold text-4xl md:text-5xl tracking-tight text-slate-900 leading-tight mb-3">
            Plaxora Blog
          </h1>
          <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
            Tutorials and engineering case studies covering React Server Components, cloud VPS server setups, and tokenized mobile payment API integrations.
          </p>
        </div>

        {/* Filters Toolbar */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between p-4 sm:p-5 rounded-[24px] bg-white/95 backdrop-blur-xl border border-slate-200/80 shadow-[0_10px_35px_rgba(0,0,0,0.03)] max-w-4xl mx-auto">
          {/* Search bar */}
          <div className="relative w-full md:w-72 shrink-0">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search tutorials by title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-10 py-2.5 rounded-full bg-slate-100/80 border border-slate-200/70 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-purple-600 focus:bg-white transition-all font-medium"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category selection */}
          <div className="flex items-center gap-1.5 flex-wrap justify-start md:justify-end w-full overflow-x-auto no-scrollbar py-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer whitespace-nowrap ${
                  selectedCategory === cat
                    ? "bg-purple-600 text-white shadow-md shadow-purple-500/20"
                    : "bg-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
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
            {filteredPosts.map((post: any, idx: number) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="bg-white/95 backdrop-blur-xl rounded-[28px] border border-slate-200/80 hover:border-purple-400/50 p-7 shadow-[0_10px_35px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_50px_rgba(147,51,234,0.12)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between cursor-pointer group"
                onClick={() => setActiveArticle(post)}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="px-3 py-1 rounded-full bg-purple-50 border border-purple-100 text-purple-600 text-[10px] font-bold uppercase tracking-wider">
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1.5 text-slate-400 text-xs font-medium">
                      <Clock className="w-3.5 h-3.5 text-purple-500" />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-xl sm:text-2xl text-slate-900 group-hover:text-purple-600 transition-colors leading-snug">
                    {post.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3 font-normal">
                    {post.excerpt}
                  </p>
                </div>

                <div>
                  <div className="w-full h-[1px] bg-slate-100 my-5" />

                  <div className="flex justify-between items-center text-xs">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-2xl bg-purple-600 text-white font-bold flex items-center justify-center text-xs font-heading shadow-xs">
                        {post.author.substring(0, 1)}
                      </div>
                      <div>
                        <strong className="text-slate-900 block font-bold text-xs">{post.author}</strong>
                        <span className="text-[10px] text-slate-400 block font-semibold">{post.authorRole}</span>
                      </div>
                    </div>

                    <span className="text-slate-400 text-[11px] font-mono font-bold">{post.date}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 rounded-[28px] bg-white/95 backdrop-blur-xl border border-slate-200/80 max-w-md mx-auto shadow-[0_10px_35px_rgba(0,0,0,0.03)]">
            <BookOpen className="w-10 h-10 text-slate-400 mx-auto mb-3" />
            <h3 className="font-heading font-bold text-lg text-slate-900 mb-1">No articles found</h3>
            <p className="text-xs text-slate-500 px-6 font-normal">
              We couldn&apos;t find any tech articles matching your query or category filter.
            </p>
          </div>
        )}

        {/* Newsletter subscription box */}
        <div className="p-8 sm:p-10 rounded-[32px] bg-gradient-to-r from-slate-900 via-purple-950 to-slate-900 text-white border border-purple-800/40 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl max-w-4xl mx-auto relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-1.5 max-w-md relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" /> Weekly Tech Digest
            </div>
            <h3 className="font-heading font-extrabold text-2xl text-white">Subscribe to Plaxora Insights</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
              Receive notifications when we release new open-source scripts, Next.js templates, and detailed tech tutorials. Zero spam.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="flex gap-2 w-full md:max-w-sm relative z-10">
            {subSuccess ? (
              <div className="p-3.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2 w-full justify-center font-bold">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Subscription Active!</span>
              </div>
            ) : (
              <>
                <input
                  type="email"
                  placeholder="name@business.com"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="flex-grow px-4 py-3 rounded-full bg-white/10 border border-white/20 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-purple-400 focus:bg-slate-950 transition-all font-medium"
                  required
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-full bg-white hover:bg-purple-50 text-slate-900 font-bold text-xs transition-all shadow-lg shrink-0 cursor-pointer flex items-center gap-1.5 hover:scale-105"
                >
                  <span>Subscribe</span>
                  <Send className="w-3.5 h-3.5 text-purple-600" />
                </button>
              </>
            )}
          </form>
        </div>
      </div>

      {/* Article Detail Overlay Modal */}
      <AnimatePresence>
        {activeArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveArticle(null)}
              className="fixed inset-0 bg-slate-950/70 backdrop-blur-md"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 350, damping: 28 }}
              className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-[32px] bg-white/95 backdrop-blur-2xl border border-slate-200/90 p-7 md:p-9 space-y-6 z-10 shadow-2xl no-scrollbar font-sans"
            >
              <button
                onClick={() => setActiveArticle(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-rose-600 hover:text-white border border-slate-200 text-slate-600 transition-all cursor-pointer shadow-xs"
                aria-label="Close Article"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-2 border-b border-slate-100 pb-5">
                <div className="flex items-center gap-2 text-xs text-slate-500 font-semibold">
                  <span className="uppercase text-purple-600 font-extrabold text-[10px] px-3 py-1 rounded-full bg-purple-50 border border-purple-100">
                    {activeArticle.category}
                  </span>
                  <span>•</span>
                  <span>{activeArticle.readTime}</span>
                </div>
                <h2 className="font-heading font-extrabold text-2xl md:text-3xl text-slate-900 leading-snug">{activeArticle.title}</h2>
              </div>

              <div className="text-xs sm:text-sm text-slate-700 space-y-4 leading-relaxed font-normal">
                {activeArticle.content.split("\n\n").map((para: string, i: number) => (
                  <p key={i}>{para}</p>
                ))}
              </div>

              <div className="flex justify-between items-center text-xs pt-4 border-t border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-2xl bg-purple-600 text-white font-bold flex items-center justify-center text-xs font-heading shadow-xs">
                    {activeArticle.author.substring(0, 1)}
                  </div>
                  <div>
                    <strong className="text-slate-900 block font-bold text-xs">{activeArticle.author}</strong>
                    <span className="text-[10px] text-slate-400 block font-semibold">{activeArticle.authorRole}</span>
                  </div>
                </div>

                <span className="text-slate-400 text-[11px] font-mono font-bold">Published: {activeArticle.date}</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
