"use client";

import React, { use } from "react";
import { BLOG_POSTS } from "@/lib/blog-data";
import { BlogPost } from "@/types/blog";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ArrowLeft, Clock, Calendar, User, Sparkles, BookOpen, 
  Share2, ArrowRight, Check, PhoneCall 
} from "lucide-react";
import { useCMSData } from "@/hooks/useCMS";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function BlogDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const id = resolvedParams.id;

  const [allPosts] = useCMSData<any>("blog", BLOG_POSTS);

  const post: BlogPost | undefined = allPosts.find((p: any) => p.id === id) || BLOG_POSTS.find((p) => p.id === id);

  const relatedPosts = allPosts
    .filter((p: any) => p.id !== id && p.published !== false)
    .slice(0, 3);

  if (!post) {
    return (
      <div className="min-h-screen pt-36 pb-24 flex items-center justify-center font-sans bg-gradient-to-b from-white via-slate-50/50 to-white">
        <div className="text-center space-y-4 max-w-md mx-auto px-4">
          <BookOpen className="w-12 h-12 text-slate-400 mx-auto" />
          <h2 className="font-heading font-extrabold text-2xl text-slate-900">Article Not Found</h2>
          <p className="text-sm text-slate-600">The blog article you are looking for does not exist or has been removed.</p>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition-all shadow-md shadow-purple-500/20"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Blog Directory
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-24 overflow-hidden relative bg-gradient-to-b from-white via-slate-50/50 to-white font-sans">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-200/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-200/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Back Link */}
        <div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100/80 hover:bg-slate-200/80 text-slate-700 text-xs font-bold transition-all border border-slate-200/70"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to All Articles
          </Link>
        </div>

        {/* Main Article Header Card */}
        <div className="bg-white/95 backdrop-blur-xl rounded-[32px] p-7 sm:p-10 border border-slate-200/80 shadow-[0_10px_35px_rgba(0,0,0,0.03)] space-y-6">
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <span className="px-3.5 py-1 rounded-full bg-purple-50 border border-purple-100 text-purple-600 text-xs font-extrabold uppercase tracking-wider">
              {post.category}
            </span>
            <span className="flex items-center gap-1.5 text-slate-500 font-medium">
              <Clock className="w-3.5 h-3.5 text-purple-500" />
              {post.readTime}
            </span>
            <span className="text-slate-300">•</span>
            <span className="flex items-center gap-1.5 text-slate-500 font-medium font-mono">
              <Calendar className="w-3.5 h-3.5 text-purple-500" />
              Published: {post.date}
            </span>
          </div>

          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl text-slate-900 leading-tight tracking-tight">
            {post.title}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal border-l-4 border-purple-500 pl-4 py-1 italic bg-purple-50/40 rounded-r-2xl">
            {post.excerpt}
          </p>

          {/* Author Badge Bar */}
          <div className="flex items-center justify-between pt-6 border-t border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-purple-600 text-white font-extrabold flex items-center justify-center text-sm font-heading shadow-md shadow-purple-500/20">
                {post.author.substring(0, 1)}
              </div>
              <div>
                <strong className="text-slate-900 block font-bold text-sm">{post.author}</strong>
                <span className="text-xs text-purple-600 block font-semibold">{post.authorRole}</span>
              </div>
            </div>

            <button
              onClick={() => {
                if (navigator.clipboard) {
                  navigator.clipboard.writeText(window.location.href);
                  alert("Article link copied to clipboard!");
                }
              }}
              className="p-2.5 rounded-full bg-slate-100/80 hover:bg-purple-50 text-slate-600 hover:text-purple-600 transition-colors border border-slate-200/70 cursor-pointer"
              title="Share article"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Article Body Content */}
        <div className="bg-white/95 backdrop-blur-xl rounded-[32px] p-7 sm:p-10 border border-slate-200/80 shadow-[0_10px_35px_rgba(0,0,0,0.03)] space-y-6 text-slate-700 leading-relaxed font-normal text-sm sm:text-base">
          {post.content.split("\n\n").map((paragraph, idx) => {
            if (paragraph.startsWith("### ")) {
              return (
                <h3 key={idx} className="font-heading font-extrabold text-xl sm:text-2xl text-slate-900 pt-4 pb-1 border-b border-slate-100">
                  {paragraph.replace("### ", "")}
                </h3>
              );
            }
            if (paragraph.startsWith("1. ") || paragraph.startsWith("2. ")) {
              const lines = paragraph.split("\n");
              return (
                <ul key={idx} className="space-y-2.5 my-3 pl-2">
                  {lines.map((line, lIdx) => (
                    <li key={lIdx} className="flex gap-2.5 items-start text-xs sm:text-sm text-slate-700">
                      <span className="w-5 h-5 rounded-full bg-purple-50 text-purple-600 font-extrabold text-[11px] flex items-center justify-center shrink-0 mt-0.5 border border-purple-100">
                        {lIdx + 1}
                      </span>
                      <span>{line.replace(/^\d+\.\s*/, "")}</span>
                    </li>
                  ))}
                </ul>
              );
            }
            return (
              <p key={idx} className="text-slate-600 leading-relaxed">
                {paragraph}
              </p>
            );
          })}
        </div>

        {/* Related Articles Showcase */}
        {relatedPosts.length > 0 && (
          <div className="space-y-6 pt-4">
            <h3 className="font-heading font-extrabold text-2xl text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-600" />
              More Engineering Articles
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {relatedPosts.map((relPost: any) => (
                <Link
                  key={relPost.id}
                  href={`/blog/${relPost.id}`}
                  className="bg-white/95 backdrop-blur-xl rounded-[24px] p-5 border border-slate-200/80 hover:border-purple-400/50 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_35px_rgba(147,51,234,0.1)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div className="space-y-3">
                    <span className="px-3 py-0.5 rounded-full bg-purple-50 border border-purple-100 text-purple-600 text-[10px] font-bold uppercase tracking-wider self-start inline-block">
                      {relPost.category}
                    </span>
                    <h4 className="font-heading font-bold text-sm text-slate-900 group-hover:text-purple-600 transition-colors line-clamp-2 leading-snug">
                      {relPost.title}
                    </h4>
                  </div>
                  <div className="pt-4 flex items-center justify-between text-[11px] text-slate-400 font-medium border-t border-slate-100 mt-4">
                    <span>{relPost.author}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-purple-600 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Bottom CTA Banner */}
        <div className="p-8 sm:p-10 rounded-[32px] bg-gradient-to-r from-slate-900 via-purple-950 to-slate-900 text-white border border-purple-800/40 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="space-y-2 max-w-xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" /> Plaxora Engineering
            </div>
            <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-white">Need Custom Web or Mobile Architecture?</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
              Our team builds scalable, high-performance web applications and native mobile tools. Let&apos;s turn your product ideas into reality.
            </p>
          </div>
          <Link
            href="/contact"
            className="flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-white hover:bg-purple-50 text-slate-900 font-bold text-xs transition-all shadow-lg shrink-0 cursor-pointer relative z-10 group-hover:scale-105"
          >
            <PhoneCall className="w-4 h-4 text-purple-600" />
            <span>Consult Developers</span>
            <ArrowRight className="w-4 h-4 text-purple-600" />
          </Link>
        </div>

      </div>
    </div>
  );
}
