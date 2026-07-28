"use client";

import React, { use, useState } from "react";
import { PRODUCTS } from "@/lib/products-data";
import CheckoutModal from "@/components/shared/main/CheckoutModal";
import Link from "next/link";
import { 
  ArrowLeft, ArrowRight, ShoppingCart, ExternalLink, 
  CheckCircle2, Share2, Check, Sparkles
} from "lucide-react";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ProductDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const id = resolvedParams.id;

  const product = PRODUCTS.find((p) => p.id === id);
  const similarProducts = PRODUCTS.filter((p) => p.id !== id).slice(0, 4);

  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product?.title,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen pt-28 pb-24 flex items-center justify-center relative bg-gradient-to-b from-white via-slate-50/50 to-white font-sans">
        <div className="text-center relative z-10 p-10 rounded-[28px] bg-white/95 backdrop-blur-xl border border-slate-200/80 shadow-[0_10px_35px_rgba(0,0,0,0.03)] max-w-md">
          <h1 className="font-heading font-extrabold text-2xl text-slate-900 mb-2">Template Not Found</h1>
          <p className="text-xs text-slate-500 mb-6 font-normal">
            The template or digital asset you are looking for does not exist or has been removed.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-xs font-bold text-white transition-all shadow-md shadow-blue-500/20"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Marketplace
          </Link>
        </div>
      </div>
    );
  }

  const defaultHighlights = [
    "Lifetime Access & Free Updates",
    "6 Months Dedicated Tech Support",
    "Commercial License Included",
    "Instant Automated ZIP Download",
    "Easy Customization & Clean Code",
  ];

  return (
    <div className="min-h-screen pt-28 pb-24 relative overflow-hidden bg-gradient-to-b from-white via-slate-50/50 to-white font-sans">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-200/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-200/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Back Link */}
        <Link
          href="/products"
          className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100/80 hover:bg-blue-600 hover:text-white border border-slate-200/80 text-xs font-bold text-slate-700 mb-8 transition-all duration-200 shadow-2xs"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Marketplace</span>
        </Link>

        {/* Borbila Style Top Split Section: Left Image / Right Details Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-14">
          
          {/* Left Column: Image Preview Card */}
          <div className="lg:col-span-7 xl:col-span-8 bg-white/95 backdrop-blur-xl rounded-[28px] border border-slate-200/80 overflow-hidden p-4 sm:p-5 shadow-[0_10px_35px_rgba(0,0,0,0.03)]">
            <div className="rounded-[22px] overflow-hidden bg-slate-950 border border-slate-200/80">
              <img
                src={`/${product.id}-preview.png`}
                alt={product.title}
                className="w-full h-auto object-cover max-h-[480px]"
              />
            </div>
          </div>

          {/* Right Column: Title, Highlights & Purchase Card */}
          <div className="lg:col-span-5 xl:col-span-4 bg-white/95 backdrop-blur-xl rounded-[28px] border border-slate-200/80 p-7 sm:p-8 shadow-[0_12px_45px_rgba(0,0,0,0.04)] space-y-6 sticky top-28">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-[10px] font-bold text-blue-600 uppercase tracking-wider mb-2">
                <Sparkles className="w-3 h-3" /> {product.category} Template
              </span>
              <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 leading-tight">
                {product.title}
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-2 font-normal leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Price Display */}
            <div className="py-3 border-y border-slate-100 flex items-baseline gap-3">
              <span className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900 leading-none">
                {product.price}
              </span>
              <span className="text-sm text-slate-400 line-through font-mono">
                {product.originalPrice}
              </span>
            </div>

            {/* Feature Highlights Bullet List */}
            <div className="space-y-2.5">
              {defaultHighlights.map((highlight, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-xs text-slate-700 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>{highlight}</span>
                </div>
              ))}
            </div>

            {/* Action Buttons: Buy Now & Live Demo */}
            <div className="space-y-3 pt-2">
              <button
                onClick={() => setIsCheckoutOpen(true)}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full bg-blue-600 hover:bg-blue-700 text-xs font-bold text-white shadow-md shadow-blue-500/20 transition-all cursor-pointer"
              >
                <ShoppingCart className="w-4 h-4" />
                Buy Now
              </button>

              {product.demoLink && product.demoLink !== "#" && (
                <a
                  href={product.demoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full bg-slate-100/80 hover:bg-slate-200 border border-slate-200/80 text-xs font-bold text-slate-800 transition-all cursor-pointer"
                >
                  <span>Live Demo</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                </a>
              )}

              {/* Share button */}
              <button
                onClick={handleShare}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-full border border-slate-200/80 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-600 transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5 text-slate-500" />}
                <span>{copied ? "Link Copied!" : "Share Template"}</span>
              </button>
            </div>
          </div>

        </div>

        {/* Detailed Product Description Article Section */}
        <div className="bg-white/95 backdrop-blur-xl rounded-[28px] border border-slate-200/80 p-7 sm:p-10 shadow-[0_10px_35px_rgba(0,0,0,0.03)] space-y-6 mb-16">
          <h2 className="font-heading font-extrabold text-2xl text-slate-900">Template Overview & Features</h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            {product.fullDescription}
          </p>

          <div className="pt-4 border-t border-slate-100">
            <h3 className="font-heading font-bold text-xl text-slate-900 mb-4">Included Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {product.features.map((feat, i) => (
                <div key={i} className="flex gap-2.5 text-xs sm:text-sm text-slate-700 items-start font-semibold p-3 rounded-2xl bg-slate-50 border border-slate-200/70">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Similar Templates Section */}
        {similarProducts.length > 0 && (
          <div className="pt-10 border-t border-slate-200/80 space-y-6">
            <h2 className="font-heading font-bold text-2xl text-slate-900">Similar Templates</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {similarProducts.map((simProd) => (
                <div
                  key={simProd.id}
                  className="bg-white/95 backdrop-blur-xl rounded-[24px] border border-slate-200/80 overflow-hidden hover:border-blue-400/50 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all flex flex-col justify-between group"
                >
                  <div>
                    <Link href={`/products/${simProd.id}`} className="block relative bg-slate-950 h-40 overflow-hidden">
                      <img
                        src={`/${simProd.id}-preview.png`}
                        alt={simProd.title}
                        className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                      />
                      <span className="absolute top-3 left-3 inline-flex items-center px-2 py-0.5 rounded-full bg-white/90 text-[10px] font-extrabold text-blue-600 uppercase">
                        {simProd.category}
                      </span>
                    </Link>

                    <div className="p-4 space-y-2">
                      <Link href={`/products/${simProd.id}`} className="block">
                        <h4 className="font-heading font-bold text-sm text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                          {simProd.title}
                        </h4>
                      </Link>
                      <p className="text-xs text-slate-500 line-clamp-2">
                        {simProd.description}
                      </p>
                    </div>
                  </div>

                  <div className="px-4 pb-4 pt-2 border-t border-slate-100 flex items-center justify-between">
                    <span className="font-heading font-extrabold text-sm text-slate-900">{simProd.price}</span>
                    <Link
                      href={`/products/${simProd.id}`}
                      className="text-xs font-bold text-blue-600 flex items-center gap-1 hover:gap-1.5 transition-all"
                    >
                      <span>View</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Global Manual Payment Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        product={product}
      />
    </div>
  );
}
