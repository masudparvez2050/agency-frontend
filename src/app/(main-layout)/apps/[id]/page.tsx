"use client";

import React, { use, useState, useRef, useMemo } from "react";
import { APPS } from "@/lib/apps-data";
import { App } from "@/types/app";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, Star, Download, Smartphone, Laptop, 
  CheckCircle, Server, AlertCircle, Info, Calendar, Check, X, ArrowRight, ExternalLink, Building2, ThumbsUp
} from "lucide-react";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function AppDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const id = resolvedParams.id;

  const app = APPS.find((a) => a.id === id);

  const [activeTab, setActiveTab] = useState<"overview" | "features" | "specs" | "changelog">("overview");
  const [downloadingApp, setDownloadingApp] = useState<App | null>(null);
  
  // Slider states and references
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Review System States
  const getInitialReviews = (appId: string) => {
    const baseReviews = [
      {
        id: "1",
        userName: "Sarah Jenkins",
        rating: 5,
        date: "2026-07-10",
        title: "Absolutely fantastic!",
        comment: "This has completely changed how I manage my daily workflows. Extremely optimized, zero lag, and the UI is gorgeous."
      },
      {
        id: "2",
        userName: "Alex Rivera",
        rating: 4,
        date: "2026-07-05",
        title: "Highly recommended, minor tweaks needed",
        comment: "Great app. Very smooth performance. I would love to see more dark mode color theme options in the next version."
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
          comment: "The component generator is a lifesaver. Standardized git hooks are super helpful. Pure utility!"
        },
        {
          id: "p2",
          userName: "Marcus Chen",
          rating: 4,
          date: "2026-06-28",
          title: "Solid developer tool",
          comment: "Runs super fast on Windows PowerShell. Standard commands are easy to memorize. Great work Plaxora!"
        }
      ];
    }
    if (appId === "sendpay-wallet") {
      return [
        {
          id: "s1",
          userName: "Elena Rostova",
          rating: 5,
          date: "2026-07-14",
          title: "Best Fintech concept I have seen",
          comment: "The local IndexedDB cache makes ledger lookups instant. Biometric FaceID is super fast. Perfect UI."
        },
        {
          id: "s2",
          userName: "Jordan Smith",
          rating: 4,
          date: "2026-07-01",
          title: "Very fast and clean UI",
          comment: "Offline sync works flawlessly. Love the monthly savings chart. Adding currency conversions was a great touch."
        }
      ];
    }
    if (appId === "galaxy-games") {
      return [
        {
          id: "g1",
          userName: "Tyler Durden",
          rating: 5,
          date: "2026-07-13",
          title: "Incredibly fun retro games",
          comment: "Brings back arcade memories. The physics games run super smoothly on both iPhone and Android. 100% recommended!"
        },
        {
          id: "g2",
          userName: "Sasha Grey",
          rating: 5,
          date: "2026-07-03",
          title: "Zero ads, amazing performance",
          comment: "Love that there are no annoying ads or tracker frameworks. Truly optimized for high frame rate mobile gameplay."
        }
      ];
    }
    if (appId === "apex-inventory") {
      return [
        {
          id: "a1",
          userName: "Robert Downey",
          rating: 5,
          date: "2026-07-11",
          title: "Essential tool for inventory check",
          comment: "PDF invoice export styling is top-tier. Multi-warehouse support is exactly what our warehouse manager needed."
        },
        {
          id: "a2",
          userName: "Chris Evans",
          rating: 4,
          date: "2026-06-29",
          title: "Clean dashboard design",
          comment: "Really useful sales logs charts. Works offline first. Exporting sheets capability is very smooth."
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

  const handleHelpfulClick = (reviewId: string) => {
    setHelpfulness((prev) => {
      const current = prev[reviewId] || { count: Math.floor(Math.random() * 12) + 2, voted: false };
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
      <div className="min-h-screen pt-32 pb-24 flex items-center justify-center relative">
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
        <div className="text-center relative z-10 p-8 rounded-2xl bg-slate-950/40 border border-slate-900 backdrop-blur-sm max-w-md">
          <AlertCircle className="w-12 h-12 text-rose-500 mx-auto mb-4" />
          <h1 className="text-2xl font-black text-white mb-2">Application Not Found</h1>
          <p className="text-sm text-slate-400 mb-6">
            The application you are searching for does not exist in our store or has been unlisted.
          </p>
          <Link
            href="/apps"
            className="inline-flex items-center gap-1.5 px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-xs font-bold text-white transition-all"
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
    <div className="min-h-screen pt-32 pb-24 relative overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-purple-500/5 blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-cyan-500/5 blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Back Link */}
        <Link
          href="/apps"
          className="group inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-purple-400 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          Back to App Store
        </Link>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          
          {/* Main Content Column (Left) */}
          <div className="lg:col-span-2 space-y-10">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
              <div className={`w-20 h-20 rounded-2xl bg-gradient-to-tr ${app.accent} p-[1px] flex items-center justify-center shrink-0`}>
                <div className="w-full h-full bg-[#030014] rounded-[19px] flex items-center justify-center">
                  {app.platforms.includes("Windows") || app.platforms.includes("Linux") ? (
                    <Laptop className="w-10 h-10 text-white" />
                  ) : (
                    <Smartphone className="w-10 h-10 text-white" />
                  )}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-[10px] font-extrabold text-purple-300 uppercase tracking-wider">
                    {app.category} Application
                  </span>
                  <span className="text-[10px] text-slate-500 font-semibold">
                    Version: {app.version}
                  </span>
                </div>
                <h1 className="text-3xl md:text-5xl font-black text-white mt-2 mb-3">
                  {app.title}
                </h1>
                <p className="text-sm text-slate-400 leading-relaxed max-w-xl">
                  {app.description}
                </p>
              </div>
            </div>

            {/* Play Store Style Screenshot Slider */}
            <div className="relative group/slider w-full bg-slate-950/20 border border-slate-900 p-6 rounded-2xl shadow-xl">
              <h3 className="text-xs font-bold text-slate-550 uppercase tracking-widest mb-4">Screenshots Preview</h3>
              
              <div className="relative w-full">
                {/* Left Arrow Button */}
                <button
                  onClick={() => scrollSlider("left")}
                  className="absolute -left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-slate-900/90 border border-slate-800 text-white flex items-center justify-center hover:bg-purple-650 hover:border-purple-500 shadow-md cursor-pointer transition-all z-30 opacity-0 group-hover/slider:opacity-100 duration-300"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>

                {/* Scrollable Screenshots Container */}
                <div
                  ref={sliderRef}
                  className="flex overflow-x-auto gap-4 pb-2 snap-x snap-mandatory scroll-smooth scrollbar-none"
                >
                  {screenshots.map((shot, i) => (
                    <div
                      key={i}
                      onClick={() => setSelectedImageIndex(i)}
                      className={`shrink-0 snap-start rounded-xl overflow-hidden border border-slate-900 hover:border-purple-500/30 transition-all cursor-zoom-in relative group/shot shadow-lg ${
                        isMobileLayout 
                          ? "w-[160px] md:w-[185px] aspect-[9/16]" 
                          : "w-[280px] md:w-[360px] aspect-[16/10]"
                      }`}
                    >
                      <img
                        src={shot.url}
                        alt={shot.title}
                        style={shot.style}
                        className="w-full h-full object-cover group-hover/shot:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/shot:opacity-100 transition-opacity flex items-center justify-center duration-300">
                        <span className="text-[10px] font-bold text-white bg-slate-950/90 px-3 py-1.5 rounded-xl border border-slate-800 shadow-md">
                          Zoom Screenshot
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Right Arrow Button */}
                <button
                  onClick={() => scrollSlider("right")}
                  className="absolute -right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-slate-900/90 border border-slate-800 text-white flex items-center justify-center hover:bg-purple-650 hover:border-purple-500 shadow-md cursor-pointer transition-all z-30 opacity-0 group-hover/slider:opacity-100 duration-300"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Lightbox / Zoom Modal */}
            <AnimatePresence>
              {selectedImageIndex !== null && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setSelectedImageIndex(null)}
                  className="fixed inset-0 bg-black/95 backdrop-blur-md z-50 flex items-center justify-center"
                >
                  {/* Close button */}
                  <button
                    onClick={() => setSelectedImageIndex(null)}
                    className="absolute top-6 right-6 p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-all hover:scale-105 z-55"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  {/* Left slider button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedImageIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : screenshots.length - 1));
                    }}
                    className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-900/80 border border-slate-800 text-white flex items-center justify-center hover:bg-purple-650 hover:border-purple-500 shadow-lg cursor-pointer transition-all z-55"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>

                  {/* Image Display */}
                  <motion.div
                    key={selectedImageIndex}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="max-w-4xl max-h-[85vh] px-4 flex flex-col items-center justify-center z-51"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <img
                      src={screenshots[selectedImageIndex].url}
                      alt={screenshots[selectedImageIndex].title}
                      style={screenshots[selectedImageIndex].style}
                      className={`max-w-full max-h-[75vh] rounded-2xl border border-slate-800 shadow-2xl object-contain ${
                        isMobileLayout ? "h-[75vh] w-auto aspect-[9/16]" : "w-full h-auto aspect-[16/10]"
                      }`}
                    />
                    <p className="text-xs font-bold text-slate-400 mt-4 tracking-wide uppercase bg-slate-950/80 border border-slate-900 px-3 py-1.5 rounded-full">
                      {screenshots[selectedImageIndex].title} ({selectedImageIndex + 1} of {screenshots.length})
                    </p>
                  </motion.div>

                  {/* Right slider button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedImageIndex((prev) => (prev !== null && prev < screenshots.length - 1 ? prev + 1 : 0));
                    }}
                    className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-900/80 border border-slate-800 text-white flex items-center justify-center hover:bg-purple-650 hover:border-purple-500 shadow-lg cursor-pointer transition-all z-55"
                  >
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Details tabs */}
            <div className="border-b border-slate-900 flex gap-6 overflow-x-auto no-scrollbar">
              {[
                { id: "overview", label: "Overview" },
                { id: "features", label: "Features" },
                { id: "specs", label: "System Specs" },
                { id: "changelog", label: "Release History" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`py-3.5 text-sm font-bold border-b-2 transition-all shrink-0 ${
                    activeTab === tab.id
                      ? "border-purple-500 text-white"
                      : "border-transparent text-slate-500 hover:text-slate-300"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab content area */}
            <div className="relative min-h-[250px]">
              {activeTab === "overview" && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <h3 className="text-lg font-bold text-white">About this App</h3>
                  <p className="text-sm md:text-base text-slate-400 leading-relaxed">
                    {app.fullDescription}
                  </p>
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-900 flex gap-3 text-xs text-slate-400">
                    <Info className="w-5 h-5 text-purple-400 shrink-0" />
                    <p className="leading-relaxed">
                      Plaxora applications are strictly monitored. We guarantee zero telemetry data logs, no interstitial ads, and optimized local performance. Package updates are published in sync with the repository.
                    </p>
                  </div>
                </motion.div>
              )}

              {activeTab === "features" && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <h3 className="text-lg font-bold text-white">Key Features</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {app.features.map((feat, i) => (
                      <li key={i} className="flex gap-2.5 text-sm text-slate-300 items-start">
                        <CheckCircle className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
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
                  className="space-y-6"
                >
                  <h3 className="text-lg font-bold text-white">System Requirements</h3>
                  <div className="p-6 rounded-2xl bg-slate-950 border border-slate-900">
                    <ul className="space-y-4">
                      {app.requirements.map((req, i) => (
                        <li key={i} className="flex gap-3 text-sm text-slate-300 items-center">
                          <Server className="w-4 h-4 text-purple-400" />
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
                  className="space-y-8"
                >
                  {app.changelog.map((entry, idx) => (
                    <div key={idx} className="relative pl-6 border-l border-slate-900 space-y-3">
                      <div className="absolute left-[-5px] top-1.5 w-2.5 h-2.5 rounded-full bg-purple-500" />
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="text-sm font-black text-white">{entry.version}</span>
                        <span className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold">
                          <Calendar className="w-3.5 h-3.5" />
                          {entry.date}
                        </span>
                      </div>
                      <ul className="space-y-2">
                        {entry.changes.map((change, i) => (
                          <li key={i} className="text-xs text-slate-400 flex gap-2">
                            <span className="text-purple-500">•</span>
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
            <div className="pt-10 border-t border-slate-900/60 space-y-8">
              <h3 className="text-xl font-bold text-white">Ratings & Reviews</h3>

              {/* Rating Dashboard Summary */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 rounded-2xl bg-slate-950/40 border border-slate-900 shadow-xl items-center">
                {/* Total Stats */}
                <div className="text-center md:border-r md:border-slate-900/60 py-2">
                  <div className="text-5xl font-black text-white">{averageRating}</div>
                  <div className="flex justify-center my-2.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${
                          star <= Math.round(averageRating)
                            ? "fill-amber-400 text-amber-400"
                            : "text-slate-700 fill-slate-700"
                        }`}
                      />
                    ))}
                  </div>
                  <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">{reviews.length} Ratings</div>
                </div>

                {/* Rating bars */}
                <div className="space-y-1.5 md:col-span-2 md:pl-6">
                  {ratingBreakdown.map((percent, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-xs">
                      <span className="w-3 text-slate-500 font-bold">{5 - idx}</span>
                      <Star className="w-3.5 h-3.5 fill-slate-750 text-slate-750" />
                      <div className="flex-1 h-2 rounded-full bg-slate-900/80 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full"
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                      <span className="w-8 text-right text-slate-500 font-semibold">{Math.round(percent)}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Write a Review Actions */}
              <div className="flex items-center justify-between pb-2 border-b border-slate-900/40">
                <span className="text-xs text-slate-555 font-bold uppercase tracking-wider">User Opinions</span>
                <button
                  onClick={() => setShowReviewForm((prev) => !prev)}
                  className="px-4 py-2 rounded-xl border border-slate-850 hover:border-purple-500 bg-[#0c101b] hover:bg-slate-900 text-xs font-bold text-slate-300 hover:text-white transition-all shadow-sm"
                >
                  {showReviewForm ? "Cancel Review" : "Write a Review"}
                </button>
              </div>

              {/* Write review Form */}
              <AnimatePresence>
                {showReviewForm && (
                  <motion.form
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    onSubmit={handleReviewSubmit}
                    className="p-6 rounded-2xl bg-slate-950/60 border border-slate-900 space-y-4 shadow-2xl overflow-hidden"
                  >
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Your Rating</label>
                      <div className="flex items-center gap-1.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            type="button"
                            key={star}
                            onClick={() => setFormRating(star)}
                            className="focus:outline-none transition-transform hover:scale-110 active:scale-95"
                          >
                            <Star
                              className={`w-6 h-6 ${
                                star <= formRating
                                  ? "fill-amber-400 text-amber-400"
                                  : "text-slate-700 fill-slate-700"
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Your Name</label>
                        <input
                          type="text"
                          required
                          value={formName}
                          onChange={(e) => setFormName(e.target.value)}
                          placeholder="e.g. John Doe"
                          className="px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-850 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-purple-500/30 transition-colors"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Review Title</label>
                        <input
                          type="text"
                          required
                          value={formTitle}
                          onChange={(e) => setFormTitle(e.target.value)}
                          placeholder="e.g. Excellent experience!"
                          className="px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-850 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-purple-500/30 transition-colors"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Review Details</label>
                      <textarea
                        required
                        rows={3}
                        value={formComment}
                        onChange={(e) => setFormComment(e.target.value)}
                        placeholder="Tell us what you like or dislike about the app..."
                        className="px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-850 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-purple-500/30 transition-colors resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:bg-purple-600/30 text-xs font-bold text-white transition-all shadow-md shadow-purple-500/25 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? "Submitting..." : "Submit Review"}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>

              {/* Reviews List */}
              <div className="space-y-4">
                {reviews.map((review) => {
                  const initials = review.userName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()
                    .slice(0, 2);
                  const glows = [
                    "from-purple-600 to-indigo-600",
                    "from-cyan-600 to-blue-600",
                    "from-amber-500 to-rose-500",
                    "from-teal-600 to-emerald-600",
                  ];
                  const charCode = review.userName.charCodeAt(0) || 0;
                  const gradient = glows[charCode % glows.length];
                  
                  const voteState = helpfulness[review.id] || { count: Math.floor(Math.random() * 12) + 2, voted: false };

                  return (
                    <div
                      key={review.id}
                      className="p-5 rounded-2xl bg-slate-950/20 border border-slate-900 space-y-3 hover:border-slate-850 transition-all duration-300 shadow-sm"
                    >
                      <div className="flex items-center justify-between gap-3 flex-wrap">
                        {/* User Header */}
                        <div className="flex items-center gap-2.5">
                          <div className={`w-8 h-8 rounded-full bg-gradient-to-tr ${gradient} flex items-center justify-center text-[10px] font-black text-white shadow-sm`}>
                            {initials}
                          </div>
                          <div>
                            <span className="text-xs font-bold text-white block">{review.userName}</span>
                            <span className="text-[9px] text-slate-550 block font-semibold">Posted {review.date}</span>
                          </div>
                        </div>

                        {/* Stars rating */}
                        <div className="flex items-center gap-0.5">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-3 h-3 ${
                                star <= review.rating
                                  ? "fill-amber-400 text-amber-400"
                                  : "text-slate-800 fill-slate-800"
                              }`}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="space-y-1.5 pl-0.5">
                        <h4 className="text-xs font-bold text-slate-200">{review.title}</h4>
                        <p className="text-xs text-slate-400 leading-relaxed">{review.comment}</p>
                      </div>

                      {/* Helpfulness Action */}
                      <div className="flex items-center gap-3 pt-2 border-t border-slate-900/20 text-[10px] text-slate-550 pl-0.5">
                        <span>Was this review helpful?</span>
                        <button
                          onClick={() => handleHelpfulClick(review.id)}
                          className={`flex items-center gap-1 py-1 px-2.5 rounded-lg border transition-all ${
                            voteState.voted
                              ? "bg-purple-500/10 border-purple-500/20 text-purple-400"
                              : "bg-slate-900/40 border-slate-900 hover:border-slate-850 text-slate-400 hover:text-white"
                          }`}
                        >
                          <ThumbsUp className="w-3 h-3" />
                          <span className="font-bold">{voteState.count}</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Pricing Info Sidebar (Right) */}
          <div className="space-y-8 sticky top-28">
            {/* Purchase Box */}
            <div className="p-6 md:p-8 rounded-2xl bg-slate-950/40 border border-slate-900 shadow-2xl hover:border-purple-500/10 transition-all duration-300 space-y-6">
              <div>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-1.5">License Cost</span>
                <div className="flex items-center gap-2.5">
                  <span className="text-3xl font-black text-white">Free Download</span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-[9px] font-extrabold text-emerald-400 uppercase tracking-widest">
                    Free
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={handleDownload}
                disabled={downloadingApp !== null}
                className="w-full flex items-center justify-center gap-2.5 py-4 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 text-sm font-bold text-white shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30 hover:scale-[1.02] transition-all hover:brightness-110 active:scale-98 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {downloadingApp ? (
                  <span className="flex items-center gap-1 animate-pulse">
                    Downloading...
                  </span>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    Download Package ({app.size})
                  </>
                )}
              </button>

              <div className="w-full h-[1px] bg-slate-900/60" />

              {/* Specs List */}
              <div className="space-y-3.5 text-xs">
                <div className="flex items-center justify-between py-1 border-b border-slate-900/40">
                  <span className="text-slate-500 font-semibold flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-purple-400/80" />
                    Developer
                  </span>
                  <span className="text-white font-bold tracking-wide">{app.developer}</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-slate-900/40">
                  <span className="text-slate-500 font-semibold flex items-center gap-1.5">
                    <Download className="w-3.5 h-3.5 text-purple-400/80" />
                    Downloads
                  </span>
                  <span className="text-white font-extrabold flex items-center gap-1">
                    {app.downloads}
                  </span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-slate-900/40">
                  <span className="text-slate-500 font-semibold flex items-center gap-1.5">
                    <Star className="w-3.5 h-3.5 text-purple-400/80" />
                    User Rating
                  </span>
                  <span className="flex items-center gap-1 text-amber-400 font-black">
                    {averageRating}
                    <Star className="w-3 h-3 fill-amber-400" />
                  </span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-slate-900/40">
                  <span className="text-slate-500 font-semibold flex items-center gap-1.5">
                    <Server className="w-3.5 h-3.5 text-purple-400/80" />
                    File Size
                  </span>
                  <span className="text-slate-200 font-bold">{app.size}</span>
                </div>
                <div className="flex items-center justify-between py-1 last:border-b-0">
                  <span className="text-slate-500 font-semibold flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-purple-400/80" />
                    Updated
                  </span>
                  <span className="text-slate-200 font-bold">{app.lastUpdated}</span>
                </div>
              </div>
            </div>

            {/* Platform badges */}
            <div className="p-6 rounded-2xl bg-slate-950/40 border border-slate-900 space-y-4 shadow-lg hover:border-purple-500/10 transition-all duration-300">
              <span className="block text-xs font-bold text-slate-500 uppercase tracking-wider">OS Platform Support</span>
              <div className="flex flex-wrap gap-2.5">
                {app.platforms.map((plat) => (
                  <span
                    key={plat}
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900/60 border border-slate-850 hover:border-purple-500/20 text-xs font-semibold text-slate-350 transition-all cursor-default"
                  >
                    {plat === "Windows" || plat === "macOS" || plat === "Linux" ? (
                      <Laptop className="w-4 h-4 text-purple-400 shrink-0" />
                    ) : (
                      <Smartphone className="w-4 h-4 text-cyan-400 shrink-0" />
                    )}
                    {plat}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Related Applications Section */}
        <div className="mt-24 pt-12 border-t border-slate-900/60">
          <h3 className="text-xl md:text-2xl font-black text-white mb-2">Related Applications</h3>
          <p className="text-xs md:text-sm text-slate-550 mb-8">Discover other tools and applications built by Plaxora.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {APPS
              .filter((a) => a.id !== app.id)
              .slice(0, 3)
              .map((relApp) => (
                <div
                  key={`related-${relApp.id}`}
                  className="group relative rounded-2xl bg-slate-950/40 border border-slate-900 p-6 overflow-hidden flex flex-col justify-between hover:border-purple-500/20 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/5"
                >
                  {/* App Glow border */}
                  <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-purple-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-20" />

                  {/* Hover App Preview Image & Overlay */}
                  <div 
                    className="absolute inset-0 bg-cover bg-center opacity-0 group-hover:opacity-[0.14] transition-all duration-700 pointer-events-none scale-105 group-hover:scale-100 z-0"
                    style={{ backgroundImage: `url('/${relApp.id}-preview.png')` }}
                  />
                  <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10" />

                  <div className="relative z-20">
                    {/* Header Icon & version */}
                    <div className="flex items-center justify-between mb-6">
                      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${relApp.accent} p-[1px] flex items-center justify-center`}>
                        <div className="w-full h-full bg-[#030014] rounded-[15px] flex items-center justify-center">
                          {relApp.platforms.includes("Windows") || relApp.platforms.includes("Linux") ? (
                            <Laptop className="w-6 h-6 text-white" />
                          ) : (
                            <Smartphone className="w-6 h-6 text-white" />
                          )}
                        </div>
                      </div>
                      <span className="text-[10px] font-bold tracking-widest text-slate-500 uppercase px-2.5 py-1 rounded bg-slate-900 border border-slate-850">
                        {relApp.version}
                      </span>
                    </div>

                    {/* Info */}
                    <h4 className="text-lg font-bold text-white group-hover:text-purple-400 transition-colors truncate">
                      {relApp.title}
                    </h4>
                    <span className="text-xs font-semibold text-purple-400/80 block mb-2 truncate">
                      {relApp.category} — {relApp.developer}
                    </span>
                    <p className="text-xs text-slate-400 mb-6 leading-relaxed line-clamp-3">
                      {relApp.description}
                    </p>
                  </div>

                  {/* Stats Footer & Actions */}
                  <div className="relative z-20 w-full mt-auto">
                    <div className="w-full h-[1px] bg-slate-900 mb-4" />

                    {/* Stats Row */}
                    <div className="flex items-center justify-between mb-4 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <strong className="text-slate-350">{relApp.rating}</strong>
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Download className="w-3.5 h-3.5" />
                        <strong className="text-slate-350">{relApp.downloads}</strong>
                      </span>
                      <span className="font-semibold">{relApp.size}</span>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-2 gap-2">
                      <Link
                        href={`/apps/${relApp.id}`}
                        className="flex items-center justify-center gap-1.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-850 text-xs font-bold text-slate-350 hover:text-white transition-all text-center"
                      >
                        Details
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                      <button
                        onClick={handleDownload}
                        className="flex items-center justify-center gap-1.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-xs font-bold text-white transition-all shadow-md shadow-purple-500/25"
                      >
                        <Download className="w-3.5 h-3.5" />
                        Download
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Downloading success confirmation overlay */}
      <AnimatePresence>
        {downloadingApp && (
          <div className="fixed bottom-6 right-6 z-50">
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              className="flex items-center gap-3 p-4 rounded-xl bg-slate-950 border border-emerald-500/30 text-xs text-slate-350 shadow-2xl"
            >
              <div className="w-6 h-6 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <Check className="w-3.5 h-3.5" />
              </div>
              <p>
                Downloading <strong className="text-white">{downloadingApp.title}</strong> installer package...
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
