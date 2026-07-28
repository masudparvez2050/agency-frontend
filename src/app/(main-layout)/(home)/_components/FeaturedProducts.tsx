"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  ShoppingCart, ExternalLink,
  Star, Download, Store, Sparkles, ArrowRight
} from "lucide-react";
import Link from "next/link";
import { PRODUCTS } from "@/lib/products-data";
import { Product } from "@/types/product";
import CheckoutModal from "@/components/shared/main/CheckoutModal";

const FEATURED_PRODUCTS = PRODUCTS.slice(0, 4);

export default function FeaturedProducts() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <section id="marketplace" className="py-20 bg-gradient-to-b from-slate-50/50 via-white to-slate-50/50 border-t border-slate-100 font-sans relative overflow-hidden">
      
      {/* Background Decorative Gradient Blobs */}
      <div className="absolute top-1/4 right-10 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold uppercase tracking-wider mb-3 shadow-2xs">
              <Store className="w-3.5 h-3.5" />
              <span>Digital Marketplace</span>
            </div>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight leading-tight">
              Premium Web Templates & Assets
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 font-normal max-w-2xl leading-relaxed">
              Buy ready-made eCommerce templates, SaaS dashboards, Figma systems, and automation scripts. Manual payment checkout (bKash/Nagad) supported.
            </p>
          </div>

          <Link
            href="/products"
            className="mt-6 md:mt-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold text-slate-700 bg-white border border-slate-200/90 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-all duration-200 shadow-2xs group"
          >
            <span>Explore marketplace</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Product Grid: 4 columns desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {FEATURED_PRODUCTS.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white/95 backdrop-blur-xl rounded-[24px] border border-slate-200/80 overflow-hidden hover:border-blue-400/50 shadow-[0_10px_35px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_50px_rgba(37,99,235,0.12)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Product Cover Preview (Clickable to details page) */}
                <Link href={`/products/${product.id}`} className="block relative bg-slate-950 h-44 sm:h-48 overflow-hidden">
                  <img
                    src={`/${product.id}-preview.png`}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                  
                  {/* Floating Category Badge Tag */}
                  <span className="absolute top-3 left-3 inline-flex items-center px-2.5 py-0.5 rounded-full bg-white/90 backdrop-blur-md border border-white/90 text-[10px] font-extrabold text-blue-600 uppercase tracking-wider shadow-xs">
                    {product.category}
                  </span>

                  {/* Price Tag pill */}
                  <span className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-mono font-bold border border-white/20 shadow-xs">
                    {product.price}
                  </span>
                </Link>

                {/* Card Details */}
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                    <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wide">
                      {product.category}
                    </span>
                  </div>

                  <Link href={`/products/${product.id}`} className="block">
                    <h3 className="font-heading font-bold text-base text-slate-900 group-hover:text-blue-600 transition-colors leading-snug line-clamp-1">
                      {product.title}
                    </h3>
                  </Link>

                  <p className="text-xs text-slate-500 mt-1.5 leading-relaxed line-clamp-2">
                    {product.description}
                  </p>

                  {/* Platform / Tech Tags */}
                  <div className="flex flex-wrap gap-1 mt-3">
                    {product.tags.slice(0, 3).map((tag: string) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 bg-slate-100/80 text-[10px] font-bold text-slate-600 rounded-full border border-slate-200/60"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-5 pb-5 pt-0 space-y-3">
                {/* Price row */}
                <div className="flex items-center justify-between text-xs text-slate-500 border-t border-slate-100 pt-3">
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-heading font-extrabold text-base text-slate-900">
                      {product.price}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono line-through">
                      {product.originalPrice}
                    </span>
                  </div>
                </div>

                {/* Button Pair: Live Demo + Buy Now */}
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={product.demoLink || `/products/${product.id}`}
                    target={product.demoLink ? "_blank" : "_self"}
                    rel="noopener noreferrer"
                    className="py-2 px-2.5 rounded-xl border border-slate-200/90 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold transition-all text-center whitespace-nowrap flex items-center justify-center gap-1"
                  >
                    <ExternalLink className="w-3 h-3 text-slate-500" /> Live Demo
                  </a>
                  <button
                    onClick={() => setSelectedProduct(product)}
                    className="py-2 px-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-md shadow-blue-500/20 cursor-pointer flex items-center justify-center gap-1 whitespace-nowrap"
                  >
                    <ShoppingCart className="w-3 h-3" /> Buy Now
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Manual Payment Checkout Modal */}
      <CheckoutModal
        isOpen={selectedProduct !== null}
        onClose={() => setSelectedProduct(null)}
        product={selectedProduct}
      />
    </section>
  );
}
