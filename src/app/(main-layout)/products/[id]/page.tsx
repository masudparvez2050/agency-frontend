"use client";

import React, { use, useState, useMemo } from "react";
import { PRODUCTS } from "@/lib/products-data";
import { Product } from "@/types/product";
import CheckoutModal from "@/components/shared/main/CheckoutModal";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, Star, Download, ShoppingCart, ExternalLink, 
  CheckCircle, Server, FileText, AlertCircle, Info, Calendar, X, ThumbsUp
} from "lucide-react";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ProductDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const id = resolvedParams.id;

  const product = PRODUCTS.find((p) => p.id === id);

  const [activeTab, setActiveTab] = useState<"overview" | "features" | "requirements" | "changelog">("overview");
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Review System States
  const getInitialReviews = (prodId: string) => {
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
        comment: "Great product. Very smooth performance. I would love to see more dark mode color theme options in the next version."
      }
    ];

    if (prodId === "plaxora-ecommerce-template") {
      return [
        {
          id: "pr1",
          userName: "Danielle K.",
          rating: 5,
          date: "2026-07-12",
          title: "Saves so much time!",
          comment: "bKash checkout integration is very easy to connect, page load times are literally near-instant. A complete solution."
        },
        {
          id: "pr2",
          userName: "Marcus Chen",
          rating: 4,
          date: "2026-06-28",
          title: "Solid clean code structure",
          comment: "Upgraded tailwind v4 classes are very clean. Manual payments verification forms work flawlessly."
        }
      ];
    }
    if (prodId === "sass-dashboard-boilerplate") {
      return [
        {
          id: "s1",
          userName: "Elena Rostova",
          rating: 5,
          date: "2026-07-14",
          title: "Saves hours of dashboard coding",
          comment: "Very neat Recharts components setup. Global Zustand store simplifies notification alerts."
        },
        {
          id: "s2",
          userName: "Jordan Smith",
          rating: 4,
          date: "2026-07-01",
          title: "Stripe webhook configs are clean",
          comment: "Axios client setup with JWT decoding wrappers is highly modular. Ideal for SaaS projects."
        }
      ];
    }
    if (prodId === "figma-ui-kit-pro") {
      return [
        {
          id: "f1",
          userName: "Tyler Durden",
          rating: 5,
          date: "2026-07-13",
          title: "Auto-layout variables are a lifesaver",
          comment: "Resizes beautifully, dark-first neon cyan styling looks extremely premium. Highly recommended."
        },
        {
          id: "f2",
          userName: "Sasha Grey",
          rating: 5,
          date: "2026-07-03",
          title: "Lifetime updates is awesome",
          comment: "Drag-and-resize testing auto-layout settings works on the first try. Extremely responsive assets."
        }
      ];
    }
    if (prodId === "flutter-wallet-app") {
      return [
        {
          id: "fl1",
          userName: "Robert Downey",
          rating: 5,
          date: "2026-07-11",
          title: "Runs smoothly on iOS & Android",
          comment: "Local secure relational SQLite caching system handles offline states seamlessly. Clean BLoC setup."
        },
        {
          id: "fl2",
          userName: "Chris Evans",
          rating: 4,
          date: "2026-06-29",
          title: "Stunning chart visualizations",
          comment: "Fl_chart components are nicely configured. Biometric FaceID auth wraps are fully functional."
        }
      ];
    }
    if (prodId === "wordpress-agency-theme") {
      return [
        {
          id: "w1",
          userName: "Bruce Banner",
          rating: 5,
          date: "2026-07-08",
          title: "One-click import works perfectly",
          comment: "Drag and drop Elementor custom widgets compile very fast. bKash payment extension is very easy to configure."
        },
        {
          id: "w2",
          userName: "Natasha Romanoff",
          rating: 4,
          date: "2026-06-25",
          title: "Very fast loading speeds",
          comment: "Code quality is high with minimal JS dependencies. Gutenberg and XML sitemap works out of the box."
        }
      ];
    }
    if (prodId === "plexora-cli") {
      return [
        {
          id: "c1",
          userName: "Arthur Dent",
          rating: 5,
          date: "2026-07-14",
          title: "Best CLI productivity scripts",
          comment: "Scaffolding modular Tailwind components in seconds is brilliant. Saved me hours this week."
        },
        {
          id: "c2",
          userName: "Ford Prefect",
          rating: 4,
          date: "2026-07-02",
          title: "Interactive shell prompt is clean",
          comment: "Powershell and Bash execution triggers are extremely fast. Auto linting saves compile checks."
        }
      ];
    }
    return baseReviews;
  };

  const [reviews, setReviews] = useState(() => getInitialReviews(product?.id || ""));
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

  if (!product) {
    return (
      <div className="min-h-screen pt-32 pb-24 flex items-center justify-center relative">
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
        <div className="text-center relative z-10 p-8 rounded-2xl bg-slate-950/40 border border-slate-900 backdrop-blur-sm max-w-md">
          <AlertCircle className="w-12 h-12 text-rose-500 mx-auto mb-4" />
          <h1 className="text-2xl font-black text-white mb-2">Product Not Found</h1>
          <p className="text-sm text-slate-400 mb-6">
            The template or digital asset you are looking for does not exist or has been removed.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-xs font-bold text-white transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Marketplace
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-24 relative overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-purple-500/5 blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-cyan-500/5 blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Back Link */}
        <Link
          href="/products"
          className="group inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-purple-400 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          Back to Marketplace
        </Link>

        {/* Product Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          
          {/* Main Info Column (Left) */}
          <div className="lg:col-span-2 space-y-10">
            {/* Header info */}
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-[10px] font-extrabold text-purple-300 uppercase tracking-widest mb-4">
                {product.category} Template
              </span>
              <h1 className="text-3xl md:text-5xl font-black text-white leading-tight mb-4">
                {product.title}
              </h1>
              <p className="text-base text-slate-400 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* High-Fidelity Product Cover Image */}
            <div 
              onClick={() => setIsLightboxOpen(true)}
              className="relative h-80 md:h-[400px] rounded-2xl overflow-hidden border border-slate-900 shadow-2xl group/preview cursor-pointer"
            >
              <img
                src={`/${product.id}-preview.png`}
                alt={product.title}
                className="w-full h-full object-cover group-hover/preview:scale-102 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/10 to-transparent pointer-events-none" />
              
              {/* Zoom overlay indicator */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/preview:opacity-100 flex items-center justify-center transition-all duration-305">
                <span className="text-xs font-bold text-white px-4 py-2 rounded-xl bg-slate-950/80 border border-slate-800 backdrop-blur-md">
                  Click to Zoom Image
                </span>
              </div>
            </div>

            {/* Details tabs navigation */}
            <div className="border-b border-slate-900 flex gap-6 overflow-x-auto no-scrollbar">
              {[
                { id: "overview", label: "Overview" },
                { id: "features", label: "Key Features" },
                { id: "requirements", label: "Requirements" },
                { id: "changelog", label: "Changelog" },
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
                  <h3 className="text-lg font-bold text-white">Product Description</h3>
                  <p className="text-sm md:text-base text-slate-400 leading-relaxed">
                    {product.fullDescription}
                  </p>
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-900 flex gap-3 text-xs text-slate-400">
                    <Info className="w-5 h-5 text-purple-400 shrink-0" />
                    <p className="leading-relaxed">
                      This digital asset is packaged as a standard ZIP archive containing clean, modular source code. Standard manual payment confirmation processes apply. Verified purchases unlock lifetime access to the zip file downloads.
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
                  <h3 className="text-lg font-bold text-white">Ecosystem Features</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {product.features.map((feat, i) => (
                      <li key={i} className="flex gap-2.5 text-sm text-slate-300 items-start">
                        <CheckCircle className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}

              {activeTab === "requirements" && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <h3 className="text-lg font-bold text-white">System Requirements</h3>
                  <div className="p-6 rounded-2xl bg-slate-950 border border-slate-900">
                    <ul className="space-y-4">
                      {product.requirements.map((req, i) => (
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
                  {product.changelog.map((entry, idx) => (
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
                  <div className="text-xs text-slate-550 font-bold uppercase tracking-wider">{reviews.length} Ratings</div>
                </div>

                {/* Rating bars */}
                <div className="space-y-1.5 md:col-span-2 md:pl-6">
                  {ratingBreakdown.map((percent, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-xs">
                      <span className="w-3 text-slate-550 font-bold">{5 - idx}</span>
                      <Star className="w-3.5 h-3.5 fill-slate-750 text-slate-755" />
                      <div className="flex-1 h-2 rounded-full bg-slate-900/80 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full"
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                      <span className="w-8 text-right text-slate-550 font-semibold">{Math.round(percent)}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Write a Review Actions */}
              <div className="flex items-center justify-between pb-2 border-b border-slate-900/40">
                <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">User Opinions</span>
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

          {/* Checkout Info Sidebar (Right) */}
          <div className="space-y-8 sticky top-28">
            {/* Purchase Box */}
            <div className="p-6 md:p-8 rounded-2xl bg-slate-950/40 border border-slate-900 shadow-2xl hover:border-purple-500/10 transition-all duration-300 space-y-6">
              <div>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-1.5">Purchase Price</span>
                <div className="flex items-center gap-2.5">
                  <span className="text-3xl font-black text-white">{product.price}</span>
                  <span className="text-xs text-slate-500 line-through font-semibold">{product.originalPrice}</span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded bg-purple-500/10 border border-purple-500/20 text-[9px] font-extrabold text-purple-400 uppercase tracking-widest">
                    Special Deal
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <button
                  onClick={() => setIsCheckoutOpen(true)}
                  className="w-full flex items-center justify-center gap-2.5 py-4 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 text-sm font-bold text-white shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30 hover:scale-[1.02] transition-all hover:brightness-110 active:scale-98"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Purchase Template
                </button>
                {product.demoLink !== "#" && (
                  <a
                    href={product.demoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-1.5 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-sm font-bold text-slate-350 hover:text-white transition-all"
                  >
                    Launch Live Demo
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>

              <div className="w-full h-[1px] bg-slate-900/60" />

              {/* Specs List */}
              <div className="space-y-3.5 text-xs">
                <div className="flex items-center justify-between py-1 border-b border-slate-900/40">
                  <span className="text-slate-500 font-semibold flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-purple-400/80" />
                    License model
                  </span>
                  <span className="text-white font-bold tracking-wide">Standard Developer</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-slate-900/40">
                  <span className="text-slate-500 font-semibold flex items-center gap-1.5">
                    <Download className="w-3.5 h-3.5 text-purple-400/80" />
                    Downloads
                  </span>
                  <span className="text-white font-extrabold flex items-center gap-1">
                    {product.downloads}
                  </span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-slate-900/40">
                  <span className="text-slate-500 font-semibold flex items-center gap-1.5">
                    <Star className="w-3.5 h-3.5 text-purple-400/80" />
                    User Rating
                  </span>
                  <span className="flex items-center gap-1 text-amber-400 font-black">
                    {averageRating}
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                  </span>
                </div>
                <div className="flex items-center justify-between py-1 last:border-b-0">
                  <span className="text-slate-500 font-semibold flex items-center gap-1.5">
                    <Server className="w-3.5 h-3.5 text-purple-400/80" />
                    Tech stack
                  </span>
                  <span className="text-purple-400 font-black tracking-wider uppercase">
                    {product.tags[0]}
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Related Products Section */}
        <div className="mt-24 pt-12 border-t border-slate-900/60">
          <h3 className="text-xl md:text-2xl font-black text-white mb-2">Related Products</h3>
          <p className="text-xs md:text-sm text-slate-550 mb-8">Discover other templates and assets in the digital marketplace.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PRODUCTS
              .filter((p) => p.id !== product.id)
              .slice(0, 3)
              .map((relProd) => (
                <div
                  key={`related-${relProd.id}`}
                  className="group relative rounded-2xl bg-slate-950/40 border border-slate-900 p-6 overflow-hidden flex flex-col justify-between hover:border-purple-500/20 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/5"
                >
                  {/* App Glow border */}
                  <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-purple-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-20" />

                  {/* Hover Preview Image & Overlay */}
                  <div 
                    className="absolute inset-0 bg-cover bg-center opacity-0 group-hover:opacity-[0.14] transition-all duration-700 pointer-events-none scale-105 group-hover:scale-100 z-0"
                    style={{ backgroundImage: `url('/${relProd.id}-preview.png')` }}
                  />
                  <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10" />

                  <div className="relative z-20">
                    {/* Header Icon & version */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-slate-900/60 border border-slate-850 p-[1px] flex items-center justify-center">
                        <FileText className="w-6 h-6 text-purple-400" />
                      </div>
                      <span className="text-[10px] font-bold tracking-widest text-slate-500 uppercase px-2.5 py-1 rounded bg-slate-900 border border-slate-850">
                        {relProd.category}
                      </span>
                    </div>

                    {/* Info */}
                    <h4 className="text-lg font-bold text-white group-hover:text-purple-400 transition-colors truncate">
                      {relProd.title}
                    </h4>
                    <span className="text-xs font-semibold text-purple-400/80 block mb-2 truncate font-mono">
                      {relProd.category} — {relProd.tags[0]}
                    </span>
                    <p className="text-xs text-slate-400 mb-6 leading-relaxed line-clamp-3">
                      {relProd.description}
                    </p>
                  </div>

                  {/* Stats Footer & Actions */}
                  <div className="relative z-20 w-full mt-auto">
                    <div className="w-full h-[1px] bg-slate-900 mb-4" />

                    {/* Stats Row */}
                    <div className="flex items-center justify-between mb-4 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <strong className="text-slate-350">{relProd.rating}</strong>
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Download className="w-3.5 h-3.5" />
                        <strong className="text-slate-350">{relProd.downloads}</strong>
                      </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-2 gap-2">
                      <Link
                        href={`/products/${relProd.id}`}
                        className="flex items-center justify-center gap-1.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-850 text-xs font-bold text-slate-350 hover:text-white transition-all text-center"
                      >
                        Details
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                      <button
                        onClick={() => setIsCheckoutOpen(true)}
                        className="flex items-center justify-center gap-1.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-xs font-bold text-white transition-all shadow-md shadow-purple-500/25"
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                        Buy Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Lightbox Zoom Modal */}
      <AnimatePresence>
        {isLightboxOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsLightboxOpen(false)}
              className="absolute inset-0 bg-black/95 backdrop-blur-md cursor-zoom-out"
            />

            {/* Content Container */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative max-w-5xl w-full max-h-[85vh] z-10 flex flex-col items-center select-none"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsLightboxOpen(false)}
                className="absolute top-[-50px] right-2 p-2.5 rounded-full bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white transition-all shadow-xl focus:outline-none"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Zoomed Image */}
              <div className="relative rounded-2xl overflow-hidden border border-slate-900 shadow-2xl max-w-full">
                <img
                  src={`/${product.id}-preview.png`}
                  alt={product.title}
                  className="max-h-[75vh] w-auto object-contain"
                />
              </div>

              {/* Title label */}
              <div className="mt-4 text-center">
                <h4 className="text-sm font-bold text-white">{product.title}</h4>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-1 font-semibold">{product.category} Preview</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Manual Payment Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        product={product}
      />
    </div>
  );
}
