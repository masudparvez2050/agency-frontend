"use client";

import React, { useState, useMemo } from "react";
import { DOCS_LIBRARY } from "@/lib/docs-data";
import { DocArticle } from "@/types/docs";
import { motion, AnimatePresence } from "framer-motion";
import { 
  BookOpen, Search, Menu, X, ArrowRight, Clipboard, Check, 
  HelpCircle, ChevronRight, AlertTriangle, Lightbulb 
} from "lucide-react";

export default function DocsPage() {
  const [activeDocId, setActiveDocId] = useState("template-installation");
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  // Group documentation categories
  const categories = ["Getting Started", "Products Integration", "Native Apps Guide"];

  // Filter docs based on search queries
  const filteredDocLibrary = useMemo(() => {
    if (searchQuery.trim() === "") return DOCS_LIBRARY;
    const q = searchQuery.toLowerCase();
    return DOCS_LIBRARY.filter(
      (doc) =>
        doc.title.toLowerCase().includes(q) ||
        doc.description.toLowerCase().includes(q) ||
        doc.steps.some((s) => s.instruction.toLowerCase().includes(q))
    );
  }, [searchQuery]);

  const activeDoc = useMemo(() => {
    return DOCS_LIBRARY.find((doc) => doc.id === activeDocId) || DOCS_LIBRARY[0];
  }, [activeDocId]);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedText(code);
    setTimeout(() => setCopiedText(null), 3000);
  };

  return (
    <div className="min-h-screen pt-32 pb-24 overflow-hidden relative bg-white">
      {/* Glow Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-purple-500/5 blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-cyan-500/5 blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        {/* Mobile Header / Sidebar Toggle */}
        <div className="lg:hidden flex items-center justify-between p-4 rounded-xl bg-white border border-slate-200 mb-8 shadow-sm">
          <span className="text-xs font-bold text-slate-900 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-purple-600" />
            {activeDoc.title}
          </span>
          <button
            onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
            className="p-2 text-slate-600 hover:text-slate-900 rounded-lg bg-slate-50 border border-slate-200"
            aria-label="Toggle Docs Navigation"
          >
            {isMobileSidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>

        {/* Two-Column Workspace Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 items-start">
          
          {/* LEFT COLUMN: Sidebar Navigation */}
          <aside className="hidden lg:block lg:col-span-1 space-y-6 sticky top-28 max-h-[80vh] overflow-y-auto pr-2 no-scrollbar">
            {/* Search filter */}
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Filter guides..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all font-medium"
              />
            </div>

            {/* Categorized Link trees */}
            <div className="space-y-6">
              {categories.map((cat) => {
                const categoryDocs = filteredDocLibrary.filter((doc) => doc.category === cat);
                if (categoryDocs.length === 0) return null;
                return (
                  <div key={cat} className="space-y-2">
                    <span className="block text-[9px] font-black text-slate-400 uppercase tracking-widest pl-3">
                      {cat}
                    </span>
                    <div className="space-y-1">
                      {categoryDocs.map((doc) => {
                        const isSelected = activeDoc.id === doc.id;
                        return (
                          <button
                            key={doc.id}
                            onClick={() => setActiveDocId(doc.id)}
                            className={`w-full flex items-center justify-between text-left px-3 py-2.5 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                              isSelected
                                ? "bg-purple-50 border-purple-200 text-purple-700"
                                : "border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                            }`}
                          >
                            <span className="truncate">{doc.title}</span>
                            <ChevronRight className={`w-3.5 h-3.5 opacity-40 shrink-0 ${isSelected ? "opacity-100 text-purple-700" : ""}`} />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </aside>

          {/* RIGHT COLUMN: Reader Workspace */}
          <main className="lg:col-span-3 p-6 md:p-8 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-8">
            
            {/* Header info */}
            <div className="space-y-3 pb-6 border-b border-slate-200">
              <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500">
                <span className="uppercase text-purple-700 tracking-widest pl-1 font-extrabold">
                  {activeDoc.category}
                </span>
                <span>/</span>
                <span>Guides</span>
              </div>
              <h2 className="text-2xl md:text-4xl font-black text-slate-900">{activeDoc.title}</h2>
              <p className="text-xs md:text-sm text-slate-600 leading-relaxed max-w-2xl font-medium">
                {activeDoc.description}
              </p>
            </div>

            {/* Prerequisites */}
            {activeDoc.prerequisites.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-1">
                  Prerequisites Checklist
                </h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {activeDoc.prerequisites.map((prereq, idx) => (
                    <li key={idx} className="flex gap-2.5 text-xs text-slate-700 items-center p-3 rounded-xl bg-slate-50 border border-slate-200 shadow-sm font-medium">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-600 shrink-0" />
                      <span>{prereq}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Steps & code boxes */}
            <div className="space-y-8">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-1">
                Installation Steps
              </h4>

              <div className="space-y-6">
                {activeDoc.steps.map((step, idx) => (
                  <div key={idx} className="space-y-3">
                    <div className="flex gap-3 items-start">
                      <div className="w-5 h-5 rounded bg-purple-50 border border-purple-200 text-purple-700 flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5">
                        {idx + 1}
                      </div>
                      <p className="text-xs md:text-sm text-slate-800 leading-relaxed font-medium">
                        {step.instruction}
                      </p>
                    </div>

                    {step.code && (
                      <div className="relative group rounded-xl bg-slate-900 border border-slate-800 overflow-hidden shadow-md pl-6 py-4 pr-12">
                        {/* Copy Code button */}
                        <button
                          onClick={() => handleCopyCode(step.code!)}
                          className="absolute top-3 right-3 p-1.5 rounded bg-slate-800 border border-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer opacity-0 group-hover:opacity-100"
                          title="Copy Code"
                        >
                          {copiedText === step.code ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <Clipboard className="w-3.5 h-3.5" />
                          )}
                        </button>
                        <pre className="text-xs text-purple-300 font-mono overflow-x-auto leading-relaxed select-all">
                          <code>{step.code}</code>
                        </pre>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Tips Block */}
            {activeDoc.tips.length > 0 && (
              <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 flex gap-4 items-start shadow-sm">
                <Lightbulb className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="space-y-2">
                  <span className="block text-[10px] font-bold text-amber-800 uppercase tracking-widest">
                    Developer Tips
                  </span>
                  <ul className="space-y-1.5">
                    {activeDoc.tips.map((tip, i) => (
                      <li key={i} className="text-xs text-slate-700 leading-relaxed font-medium">
                        • {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

          </main>

        </div>

      </div>

      {/* MOBILE DRAWER SIDEBAR */}
      <AnimatePresence>
        {isMobileSidebarOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileSidebarOpen(false)}
              className="lg:hidden fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-30"
            />

            {/* Sidebar drawer */}
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="lg:hidden fixed inset-y-0 left-0 w-64 bg-white border-r border-slate-200 z-40 p-6 flex flex-col gap-6 shadow-2xl"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-purple-600" />
                  Docs Tree
                </span>
                <button
                  onClick={() => setIsMobileSidebarOpen(false)}
                  className="p-1.5 rounded-lg bg-slate-100 border border-slate-200 text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Search filter */}
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Filter guides..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-purple-500 font-medium"
                />
              </div>

              {/* Categorized Link trees */}
              <div className="space-y-6 overflow-y-auto no-scrollbar">
                {categories.map((cat) => {
                  const categoryDocs = filteredDocLibrary.filter((doc) => doc.category === cat);
                  if (categoryDocs.length === 0) return null;
                  return (
                    <div key={cat} className="space-y-2">
                      <span className="block text-[9px] font-black text-slate-400 uppercase tracking-widest pl-2">
                        {cat}
                      </span>
                      <div className="space-y-1">
                        {categoryDocs.map((doc) => {
                          const isSelected = activeDoc.id === doc.id;
                          return (
                            <button
                              key={doc.id}
                              onClick={() => {
                                setActiveDocId(doc.id);
                                setIsMobileSidebarOpen(false);
                              }}
                              className={`w-full flex items-center justify-between text-left px-3 py-2 rounded-xl text-xs font-bold transition-all border ${
                                isSelected
                                  ? "bg-purple-50 border-purple-200 text-purple-700"
                                  : "border-transparent text-slate-600 hover:text-slate-900"
                              }`}
                            >
                              <span className="truncate">{doc.title}</span>
                              <ChevronRight className="w-3.5 h-3.5 opacity-40 shrink-0" />
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Copy notification popup alert */}
      <AnimatePresence>
        {copiedText && (
          <div className="fixed bottom-6 right-6 z-50">
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              className="flex items-center gap-3 p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white shadow-2xl"
            >
              <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <Check className="w-3.5 h-3.5" />
              </div>
              <p>
                Code snippet copied to clipboard!
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
