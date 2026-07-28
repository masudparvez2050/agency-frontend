"use client";

import React from "react";
import { BLOG_POSTS } from "@/lib/blog-data";
import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, BookOpen } from "lucide-react";

import { useCMSData } from "@/hooks/useCMS";

export default function BlogPage() {
  const [allPosts] = useCMSData<any>("blog", BLOG_POSTS);

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

        {/* Blog Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {allPosts.filter((p: any) => p.published !== false).map((post: any, idx: number) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
            >
              <Link
                href={`/blog/${post.id}`}
                className="bg-white/95 backdrop-blur-xl rounded-[28px] border border-slate-200/80 hover:border-purple-400/50 p-5 sm:p-6 shadow-[0_10px_35px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_50px_rgba(147,51,234,0.12)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between cursor-pointer group h-full block"
              >
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="px-3 py-1 rounded-full bg-purple-50 border border-purple-100 text-purple-600 text-[10px] font-bold uppercase tracking-wider">
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1.5 text-slate-400 text-xs font-medium">
                      <Clock className="w-3.5 h-3.5 text-purple-500" />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-base sm:text-lg text-slate-900 group-hover:text-purple-600 transition-colors leading-snug">
                    {post.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 font-normal">
                    {post.excerpt}
                  </p>
                </div>

                <div>
                  <div className="w-full h-[1px] bg-slate-100 my-4" />

                  <div className="flex justify-between items-center text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-xl bg-purple-600 text-white font-bold flex items-center justify-center text-xs font-heading shadow-xs shrink-0">
                        {post.author.substring(0, 1)}
                      </div>
                      <div className="min-w-0">
                        <strong className="text-slate-900 block font-bold text-xs truncate">{post.author}</strong>
                        <span className="text-[9px] text-slate-400 block font-semibold truncate">{post.authorRole}</span>
                      </div>
                    </div>

                    <span className="text-slate-400 text-[10px] font-mono font-bold shrink-0 ml-1">{post.date}</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
