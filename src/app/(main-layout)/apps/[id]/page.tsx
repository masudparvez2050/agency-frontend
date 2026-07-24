"use client";

import React, { use, useState, useRef, useMemo, useEffect } from "react";
import { createPortal } from "react-dom";
import { APPS } from "@/lib/apps-data";
import { App } from "@/types/app";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, Star, Download, Smartphone, Laptop, 
  CheckCircle2, Server, AlertCircle, Info, Calendar, Check, X, ArrowRight, ExternalLink, ThumbsUp, Gamepad, Wallet, Terminal, Sparkles, ShieldCheck
} from "lucide-react";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function AppDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const id = resolvedParams.id;

  const app = APPS.find((a) => a.id === id);

  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "features" | "specs" | "changelog">("overview");
  const [downloadingApp, setDownloadingApp] = useState<App | null>(null);
  
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const getInitialReviews = (appId: string) => {
    const baseReviews = [
      {
        id: "1",
        userName: "Sarah Jenkins",
        rating: 5,
        date: "2026-07-10",
        title: "Absolutely fantastic!",
        comment: "This has completely changed how I manage my daily workflows. Extremely optimized, zero lag, and the UI is gorgeous.",
        helpfulCount: 8,
      },
      {
        id: "2",
        userName: "Alex Rivera",
        rating: 4,
        date: "2026-07-05",
        title: "Highly recommended, minor tweaks needed",
        comment: "Great app. Very smooth performance. I would love to see more dark mode color theme options in the next version.",
        helpfulCount: 5,
      }
    ];

    if (appId === "plexora-cli") {
      return [
        {
          id: "p1",
          userName: "Danielle K.",
          rating: 5,
          date: "2026-07-12",
          title: "Saves me hours every week",
          comment: "The component generator is a lifesaver. Standardized git hooks are super helpful. Pure utility!",
          helpfulCount: 12,
        },
        {
          id: "p2",
          userName: "Marcus Chen",
          rating: 4,
          date: "2026-06-28",
          title: "Solid developer tool",
          comment: "Runs super fast on Windows PowerShell. Standard commands are easy to memorize. Great work Plaxora!",
          helpfulCount: 7,
        }
      ];
    }
    return baseReviews;
  };

  const [reviews, setReviews] = useState(() => getInitialReviews(app?.id || ""));
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [formRating, setFormRating] = useState(5);
  const [formName, setFormName] = useState("");
  const [formTitle, setFormTitle] = useState("");
  const [formComment, setFormComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [helpfulness, setHelpfulness] = useState<Record<string, { count: number; voted: boolean }>>({});

  const averageRating = useMemo(() => {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
    return Math.round((sum / reviews.length) * 10) / 10;
  }, [reviews]);

  const ratingBreakdown = useMemo(() => {
    const counts = [0, 0, 0, 0, 0];
    reviews.forEach((r) => {
      const idx = Math.min(Math.max(1, r.rating), 5) - 1;
      counts[idx]++;
    });
    return counts.map((count) => (reviews.length > 0 ? (count / reviews.length) * 100 : 0)).reverse();
  }, [reviews]);

  const handleHelpfulClick = (reviewId: string, baseCount: number) => {
    setHelpfulness((prev) => {
      const current = prev[reviewId] || { count: baseCount, voted: false };
      if (current.voted) {
        return { ...prev, [reviewId]: { count: current.count - 1, voted: false } };
      } else {
        return { ...prev, [reviewId]: { count: current.count + 1, voted: true } };
      }
    });
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formTitle.trim() || !formComment.trim()) {
      alert("Please fill in all fields.");
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      const newReview = {
        id: Date.now().toString(),
        userName: formName,
        rating: formRating,
        date: new Date().toISOString().split("T")[0],
        title: formTitle,
        comment: formComment,
        helpfulCount: 0,
      };
      setReviews((prev) => [newReview, ...prev]);
      setFormName("");
      setFormTitle("");
      setFormComment("");
      setFormRating(5);
      setShowReviewForm(false);
      setIsSubmitting(false);
    }, 1000);
  };

  if (!app) {
    return (
      <div className="min-h-screen pt-28 pb-24 flex items-center justify-center relative bg-gradient-to-b from-white via-slate-50/50 to-white font-sans">
        <div className="text-center relative z-10 p-10 rounded-[28px] bg-white/95 backdrop-blur-xl border border-slate-200/80 shadow-[0_10px_35px_rgba(0,0,0,0.03)] max-w-md">
          <AlertCircle className="w-12 h-12 text-rose-500 mx-auto mb-4" />
          <h1 className="font-heading font-extrabold text-2xl text-slate-900 mb-2">Application Not Found</h1>
          <p className="text-xs text-slate-500 mb-6 font-normal">
            The application you are searching for does not exist in our store or has been unlisted.
          </p>
          <Link
            href="/apps"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-xs font-bold text-white transition-all shadow-md shadow-blue-500/20"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to App Store
          </Link>
        </div>
      </div>
    );
  }

  const handleDownload = () => {
    setDownloadingApp(app);
    setTimeout(() => {
      setDownloadingApp(null);
    }, 2000);
  };

  const getAppGradient = (appId: string) => {
    if (appId.includes("game")) return { gradient: "linear-gradient(135deg, #8b5cf6, #ec4899)", glow: "rgba(236,72,153,0.25)", icon: Gamepad };
    if (appId.includes("wallet") || appId.includes("pay")) return { gradient: "linear-gradient(135deg, #3b82f6, #06b6d4)", glow: "rgba(6,182,212,0.25)", icon: Wallet };
    return { gradient: "linear-gradient(135deg, #06b6d4, #10b981)", glow: "rgba(16,185,129,0.25)", icon: Terminal };
  };

  const { gradient, glow, icon: AppIcon } = getAppGradient(app.id);
  const isMobileLayout = app.id === "galaxy-games" || app.id === "sendpay-wallet";

  const screenshots = [
    { url: `/${app.id}-preview.png`, title: "Dashboard Overview" },
    { url: `/${app.id}-preview.png`, title: "Analytics Panel", style: { filter: "hue-rotate(80deg) saturate(1.1)" } },
    { url: `/${app.id}-preview.png`, title: "System Configurations", style: { filter: "hue-rotate(240deg) brightness(0.95)" } },
    { url: `/${app.id}-preview.png`, title: "Theme Customization", style: { filter: "hue-rotate(150deg) saturate(1.2)" } },
  ];

  const scrollSlider = (direction: "left" | "right") => {
    if (sliderRef.current) {
      const scrollAmount = direction === "left" ? -320 : 320;
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-24 relative overflow-hidden bg-gradient-to-b from-white via-slate-50/50 to-white font-sans">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-200/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-200/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Back Link */}
        <Link
          href="/apps"
          className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100/80 hover:bg-purple-600 hover:text-white border border-slate-200/80 text-xs font-bold text-slate-700 mb-8 transition-all duration-200 shadow-2xs"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
          <span>Back to App Store</span>
        </Link>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Content Column (Left) */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-8">
            
            {/* Header Area */}
            <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 shadow-md"
                style={{ background: gradient, boxShadow: `0 10px 25px -5px ${glow}` }}
              >
                <AppIcon style={{ width: 30, height: 30, color: "#fff" }} strokeWidth={2} />
              </div>

              <div>
                <div className="flex items-center gap-2 flex-wrap mb-1.5">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 border border-purple-100 text-[10px] font-bold text-purple-600 uppercase tracking-wider">
                    <Sparkles className="w-3 h-3" /> {app.category} Application
                  </span>
                  <span className="text-[10px] font-mono font-bold px-3 py-1 bg-slate-100/80 text-slate-600 rounded-full border border-slate-200/70">
                    {app.version}
                  </span>
                </div>
                <h1 className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl text-slate-900 leading-tight mb-2">
                  {app.title}
                </h1>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal max-w-xl">
                  {app.description}
                </p>
              </div>
            </div>

            {/* Play Store Style Screenshot Slider */}
            <div className="relative group/slider w-full bg-white/95 backdrop-blur-xl border border-slate-200/80 p-6 sm:p-7 rounded-[28px] shadow-[0_10px_35px_rgba(0,0,0,0.03)]">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Screenshots Preview</h3>
              
              <div className="relative w-full">
                <button
                  onClick={() => scrollSlider("left")}
                  className="absolute -left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white border border-slate-200 text-slate-700 flex items-center justify-center hover:bg-purple-600 hover:text-white shadow-md cursor-pointer transition-all z-30 opacity-0 group-hover/slider:opacity-100 duration-200"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>

                <div
                  ref={sliderRef}
                  className="flex overflow-x-auto gap-4 pb-2 snap-x snap-mandatory scroll-smooth scrollbar-none"
                >
                  {screenshots.map((shot, i) => (
                    <div
                      key={i}
                      onClick={() => setSelectedImageIndex(i)}
                      className={`shrink-0 snap-start rounded-2xl overflow-hidden border border-slate-200/80 hover:border-purple-400/60 transition-all cursor-zoom-in relative group/shot shadow-sm bg-slate-950 ${
                        isMobileLayout ? "w-44 h-80" : "w-72 sm:w-80 h-48 sm:h-52"
                      }`}
                    >
                      <img
                        src={shot.url}
                        alt={shot.title}
                        style={shot.style}
                        className="w-full h-full object-cover group-hover/shot:scale-108 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover/shot:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                        <span className="text-[11px] font-bold text-slate-900 bg-white/95 px-3 py-1 rounded-full shadow-sm">
                          Zoom
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => scrollSlider("right")}
                  className="absolute -right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white border border-slate-200 text-slate-700 flex items-center justify-center hover:bg-purple-600 hover:text-white shadow-md cursor-pointer transition-all z-30 opacity-0 group-hover/slider:opacity-100 duration-200"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Details tabs navigation */}
            <div className="p-1.5 rounded-full bg-slate-100/80 border border-slate-200/70 inline-flex gap-1 overflow-x-auto no-scrollbar max-w-full">
              {[
                { id: "overview", label: "Overview" },
                { id: "features", label: "Key Features" },
                { id: "specs", label: "Technical Specs" },
                { id: "changelog", label: "Changelog" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-5 py-2 rounded-full text-xs font-bold transition-all duration-200 shrink-0 cursor-pointer ${
                    activeTab === tab.id
                      ? "bg-purple-600 text-white shadow-md shadow-purple-500/20"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab content area */}
            <div className="relative min-h-[200px] p-7 rounded-[28px] bg-white/95 backdrop-blur-xl border border-slate-200/80 shadow-[0_10px_35px_rgba(0,0,0,0.03)]">
              {activeTab === "overview" && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <h3 className="font-heading font-bold text-xl text-slate-900">Application Overview</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    {app.fullDescription}
                  </p>
                  <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-100 flex gap-3 text-xs text-slate-700 font-normal">
                    <Info className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                    <p className="leading-relaxed">
                      All Plaxora App Store packages are pre-verified, 100% ad-free, and safe from background telemetry trackers.
                    </p>
                  </div>
                </motion.div>
              )}

              {activeTab === "features" && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <h3 className="font-heading font-bold text-xl text-slate-900">Core Features</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    {app.features.map((feat, i) => (
                      <li key={i} className="flex gap-2.5 text-xs sm:text-sm text-slate-700 items-start font-semibold">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}

              {activeTab === "specs" && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <h3 className="font-heading font-bold text-xl text-slate-900">Technical Specifications</h3>
                  <div className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200/70">
                    <ul className="space-y-3">
                      {app.requirements.map((req, i) => (
                        <li key={i} className="flex gap-2.5 text-xs sm:text-sm text-slate-700 items-center font-semibold">
                          <Server className="w-4 h-4 text-purple-600 shrink-0" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}

              {activeTab === "changelog" && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  {app.changelog.map((entry, idx) => (
                    <div key={idx} className="relative pl-6 border-l-2 border-slate-200 space-y-2">
                      <div className="absolute left-[-6px] top-1.5 w-2.5 h-2.5 rounded-full bg-purple-600" />
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="font-heading font-bold text-sm text-slate-900">{entry.version}</span>
                        <span className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold">
                          <Calendar className="w-3.5 h-3.5 text-purple-600" />
                          {entry.date}
                        </span>
                      </div>
                      <ul className="space-y-1.5">
                        {entry.changes.map((change, i) => (
                          <li key={i} className="text-xs text-slate-600 flex gap-2 font-normal">
                            <span className="text-purple-600 font-bold">•</span>
                            <span>{change}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </motion.div>
              )}
            </div>

            {/* Ratings & Reviews Section */}
            <div className="pt-8 border-t border-slate-200/80 space-y-6">
              <h3 className="font-heading font-bold text-2xl text-slate-900">Ratings & Reviews</h3>

              {/* Rating Dashboard Summary */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-7 rounded-[28px] bg-white/95 backdrop-blur-xl border border-slate-200/80 shadow-[0_10px_35px_rgba(0,0,0,0.03)] items-center">
                <div className="text-center md:border-r md:border-slate-100 py-2">
                  <div className="font-heading font-extrabold text-4xl text-slate-900">{averageRating}</div>
                  <div className="flex justify-center my-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${
                          star <= Math.round(averageRating)
                            ? "fill-amber-400 text-amber-400"
                            : "text-slate-200 fill-slate-200"
                        }`}
                      />
                    ))}
                  </div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{reviews.length} Ratings</div>
                </div>

                <div className="space-y-1.5 md:col-span-2 md:pl-6">
                  {ratingBreakdown.map((percent, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-xs">
                      <span className="w-3 text-slate-600 font-bold">{5 - idx}</span>
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <div className="flex-1 h-2 rounded-full bg-slate-100 overflow-hidden">
                        <div
                          className="h-full bg-amber-400 rounded-full"
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                      <span className="w-8 text-right text-slate-500 font-semibold">{Math.round(percent)}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reviews List */}
              <div className="space-y-4">
                {reviews.map((review) => {
                  const initials = review.userName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()
                    .slice(0, 2);
                  
                  const baseCount = (review as any).helpfulCount || 6;
                  const voteState = helpfulness[review.id] || { count: baseCount, voted: false };

                  return (
                    <div
                      key={review.id}
                      className="p-6 rounded-[24px] bg-white/95 backdrop-blur-xl border border-slate-200/80 space-y-3 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:border-purple-300 transition-all duration-200"
                    >
                      <div className="flex items-center justify-between gap-3 flex-wrap">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-2xl bg-purple-600 flex items-center justify-center text-xs font-bold text-white font-heading shadow-xs">
                            {initials}
                          </div>
                          <div>
                            <span className="font-heading font-bold text-sm text-slate-900 block">{review.userName}</span>
                            <span className="text-[10px] text-slate-400 block font-semibold">Posted {review.date}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-3.5 h-3.5 ${
                                star <= review.rating
                                  ? "fill-amber-400 text-amber-400"
                                  : "text-slate-200 fill-slate-200"
                              }`}
                            />
                          ))}
                        </div>
                      </div>

                      <div className="space-y-1">
                        <h4 className="font-heading font-bold text-sm text-slate-900">{review.title}</h4>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">{review.comment}</p>
                      </div>

                      <div className="flex items-center gap-3 pt-2.5 border-t border-slate-100 text-xs text-slate-500 font-semibold">
                        <span>Was this review helpful?</span>
                        <button
                          onClick={() => handleHelpfulClick(review.id, baseCount)}
                          className={`flex items-center gap-1.5 py-1 px-3 rounded-full border transition-all cursor-pointer ${
                            voteState.voted
                              ? "bg-purple-50 border-purple-200 text-purple-600 font-bold"
                              : "bg-slate-100/80 border-slate-200/80 hover:bg-slate-200 text-slate-600"
                          }`}
                        >
                          <ThumbsUp className="w-3.5 h-3.5" />
                          <span className="font-bold">{voteState.count}</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Download Action Sidebar (Right) */}
          <div className="lg:col-span-5 xl:col-span-4 space-y-6 sticky top-28">
            <div className="p-7 sm:p-8 rounded-[28px] bg-white/95 backdrop-blur-xl border border-slate-200/80 shadow-[0_12px_45px_rgba(0,0,0,0.04)] space-y-6">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Cost</span>
                <span className="font-heading font-extrabold text-2xl sm:text-3xl text-emerald-600 leading-none whitespace-nowrap">Free Open-Source</span>
              </div>

              <div className="space-y-3">
                <button
                  onClick={handleDownload}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full bg-blue-600 hover:bg-blue-700 text-xs font-bold text-white shadow-md shadow-blue-500/20 transition-all cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  Download Installer
                </button>
              </div>

              <div className="w-full h-[1px] bg-slate-100" />

              <div className="space-y-3.5 text-xs font-medium">
                <div className="flex items-center justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500 flex items-center gap-2">
                    <Download className="w-3.5 h-3.5 text-purple-600" />
                    Total Installs
                  </span>
                  <span className="text-slate-900 font-bold">
                    {app.downloads}
                  </span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500 flex items-center gap-2">
                    <Star className="w-3.5 h-3.5 text-purple-600" />
                    User Rating
                  </span>
                  <span className="flex items-center gap-1 text-amber-500 font-bold">
                    {averageRating}
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  </span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500 flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />
                    Category
                  </span>
                  <span className="text-purple-600 font-bold uppercase">
                    {app.category}
                  </span>
                </div>
                <div className="flex items-center justify-between py-1">
                  <span className="text-slate-500 flex items-center gap-2">
                    <Server className="w-3.5 h-3.5 text-purple-600" />
                    Size
                  </span>
                  <span className="text-slate-900 font-mono font-bold">
                    {app.size}
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Download Alert Overlay */}
      <AnimatePresence>
        {downloadingApp && (
          <div className="fixed bottom-6 right-6 z-50">
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              className="flex items-center gap-3 p-4 rounded-2xl bg-slate-900 text-xs text-white shadow-2xl border border-slate-800"
            >
              <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                <Check className="w-4 h-4" />
              </div>
              <p className="font-medium">
                Initiating installation download for <strong className="font-bold">{downloadingApp.title}</strong>...
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Full-Screen Floating 3D Coverflow Lightbox Portal */}
      {mounted && selectedImageIndex !== null && createPortal(
        <AnimatePresence>
          <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-between p-4 sm:p-8 bg-slate-950/75 backdrop-blur-2xl overflow-hidden">
            
            {/* Top Floating Control Bar */}
            <div className="w-full max-w-6xl flex items-center justify-between z-50 pt-2">
              <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-lg">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span className="text-xs font-bold tracking-wide">
                  {screenshots[selectedImageIndex]?.title || app.title}
                </span>
                <span className="text-[11px] font-mono text-slate-300 px-2.5 py-0.5 rounded-full bg-white/10 border border-white/15">
                  {selectedImageIndex + 1} / {screenshots.length}
                </span>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setSelectedImageIndex(null)}
                className="p-3 rounded-full bg-white/10 hover:bg-rose-600/90 text-white border border-white/20 backdrop-blur-md transition-all cursor-pointer shadow-xl hover:scale-110"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Main Fullscreen 3D Coverflow Perspective Stage */}
            <div className="relative w-full flex-1 flex items-center justify-center my-4 overflow-hidden [perspective:1400px]">
              
              {/* Floating Left Arrow */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImageIndex((prev) => (prev === null || prev === 0 ? screenshots.length - 1 : prev - 1));
                }}
                className="absolute left-4 sm:left-12 z-50 p-4 rounded-full bg-white/10 hover:bg-purple-600 text-white border border-white/20 backdrop-blur-md transition-transform duration-150 shadow-2xl cursor-pointer hover:scale-110 active:scale-95"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>

              {/* 3D Floating Carousel Stage */}
              <div className="relative w-full max-w-5xl h-[420px] sm:h-[560px] flex items-center justify-center [transform-style:preserve-3d]">
                {screenshots.map((shot, idx) => {
                  const offset = idx - selectedImageIndex;
                  const isActive = offset === 0;

                  let rotateY = 0;
                  let translateX = 0;
                  let scale = 1;
                  let opacity = 1;
                  let zIndex = 30;

                  if (offset === -1) {
                    rotateY = 32;
                    translateX = isMobileLayout ? -75 : -62;
                    scale = 0.85;
                    opacity = 0.7;
                    zIndex = 20;
                  } else if (offset === 1) {
                    rotateY = -32;
                    translateX = isMobileLayout ? 75 : 62;
                    scale = 0.85;
                    opacity = 0.7;
                    zIndex = 20;
                  } else if (offset < -1) {
                    rotateY = 45;
                    translateX = isMobileLayout ? -130 : -110;
                    scale = 0.7;
                    opacity = 0;
                    zIndex = 10;
                  } else if (offset > 1) {
                    rotateY = -45;
                    translateX = isMobileLayout ? 130 : 110;
                    scale = 0.7;
                    opacity = 0;
                    zIndex = 10;
                  }

                  return (
                    <motion.div
                      key={idx}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedImageIndex(idx);
                      }}
                      animate={{
                        rotateY,
                        x: `${translateX}%`,
                        scale,
                        opacity,
                        zIndex,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 32,
                        mass: 0.8,
                      }}
                      className={`absolute rounded-[28px] overflow-hidden cursor-pointer shadow-2xl ${
                        isMobileLayout ? "w-[260px] sm:w-[320px] h-[420px] sm:h-[520px]" : "w-full max-w-2xl h-[340px] sm:h-[480px]"
                      } ${
                        isActive
                          ? "border-2 border-white/80 shadow-[0_25px_70px_rgba(168,85,247,0.4)] ring-4 ring-purple-500/40"
                          : "border border-white/20 hover:opacity-90"
                      }`}
                      style={{
                        transformStyle: "preserve-3d",
                      }}
                    >
                      <img
                        src={shot.url}
                        alt={shot.title}
                        style={shot.style}
                        className="w-full h-full object-cover bg-slate-950"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
                      <div className="absolute bottom-5 left-5 right-5 text-center">
                        <span className="inline-block px-4 py-1.5 rounded-full bg-slate-900/85 backdrop-blur-md border border-white/20 text-xs font-bold text-white shadow-lg">
                          {shot.title}
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Floating Right Arrow */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImageIndex((prev) => (prev === null || prev === screenshots.length - 1 ? 0 : prev + 1));
                }}
                className="absolute right-4 sm:right-12 z-50 p-4 rounded-full bg-white/10 hover:bg-purple-600 text-white border border-white/20 backdrop-blur-md transition-transform duration-150 shadow-2xl cursor-pointer hover:scale-110 active:scale-95"
              >
                <ArrowRight className="w-6 h-6" />
              </button>
            </div>

            {/* Floating Bottom Thumbnail Strip */}
            <div className="flex items-center justify-center gap-3 p-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 z-50 shadow-xl overflow-x-auto">
              {screenshots.map((shot, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImageIndex(idx);
                  }}
                  className={`w-14 h-10 rounded-full overflow-hidden border-2 transition-all cursor-pointer ${
                    selectedImageIndex === idx
                      ? "border-purple-400 scale-110 shadow-md shadow-purple-500/40"
                      : "border-white/20 opacity-50 hover:opacity-100"
                  }`}
                >
                  <img src={shot.url} style={shot.style} alt={shot.title} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

          </div>
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
}
