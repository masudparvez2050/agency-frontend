"use client";

import React, { useState, useMemo } from "react";
import { PRODUCTS } from "@/lib/products-data";
import { Product } from "@/types/product";
import CheckoutModal from "@/components/shared/main/CheckoutModal";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal, ArrowUpDown, Star, Download, ShoppingCart, ExternalLink } from "lucide-react";

import { useCMSData } from "@/hooks/useCMS";

export default function ProductsPage() {
  const [allProducts] = useCMSData<any>("products", PRODUCTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("popular");
  const [checkoutProduct, setCheckoutProduct] = useState<Product | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // List of unique categories + "All"
  const categories = ["All", "Next.js", "React", "Flutter", "Figma", "Scripts"];

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    // Filter active products if property exists, fallback to true
    let result = allProducts.filter((p: any) => p.active !== false);


    // 1. Search Query
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p: any) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t: string) => t.toLowerCase().includes(q))
      );
    }

    // 2. Category Tab
    if (selectedCategory !== "All") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // 3. Sort By
    if (sortBy === "popular") {
      // Sort by downloads descending
      result.sort((a, b) => parseInt(b.downloads) - parseInt(a.downloads));
    } else if (sortBy === "price-low") {
      result.sort((a, b) => a.priceVal - b.priceVal);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.priceVal - a.priceVal);
    } else if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [searchQuery, selectedCategory, sortBy]);

  const handleOpenCheckout = (product: Product) => {
    setCheckoutProduct(product);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="min-h-screen pt-32 pb-24 overflow-hidden relative">
      {/* Glow Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-purple-500/5 blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-cyan-500/5 blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold text-purple-400 uppercase tracking-widest mb-3 block">Plaxora Store</span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white mb-4 leading-tight">
            Digital Marketplace
          </h1>
          <p className="text-slate-400">
            Deploy high-quality Next.js frontends, SaaS boilerplates, Flutter application shells, Figma files, and scripts in minutes.
          </p>
        </div>

        {/* Filter Toolbar */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between p-4 rounded-2xl bg-slate-950/60 border border-slate-900 backdrop-blur-xl mb-12 shadow-xl">
          {/* Search bar */}
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search templates & assets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-850 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/40 transition-colors"
            />
          </div>

          {/* Sort selection */}
          <div className="flex items-center gap-3 w-full md:w-auto shrink-0 justify-end">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-bold uppercase tracking-wider">
              <ArrowUpDown className="w-3.5 h-3.5" />
              <span>Sort By</span>
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-slate-900 border border-slate-850 text-slate-300 text-xs font-semibold px-3 py-2.5 rounded-xl focus:outline-none focus:border-purple-500/40 transition-colors cursor-pointer"
            >
              <option value="popular">Most Popular</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-12 justify-center border-b border-slate-900 pb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all border ${
                selectedCategory === cat
                  ? "bg-purple-600 border-purple-500 text-white shadow-lg shadow-purple-500/25"
                  : "bg-slate-950/80 border-slate-900 text-slate-400 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        {filteredAndSortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredAndSortedProducts.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="group relative rounded-2xl bg-slate-950/80 border border-slate-900 overflow-hidden flex flex-col justify-between hover:border-purple-500/20 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/5"
              >
                {/* Visual Graphic Representation */}
                <div className={`h-48 bg-gradient-to-br ${product.imageGradient} relative flex items-center justify-center p-6 group-hover:scale-[1.01] transition-transform duration-500`}>
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="relative p-4 rounded-xl bg-[#030014]/90 border border-white/10 text-center max-w-xs shadow-2xl backdrop-blur-md">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-purple-400">{product.category}</span>
                    <p className="text-sm font-extrabold text-white mt-1 line-clamp-1">{product.title}</p>
                    <div className="flex gap-1.5 justify-center mt-3">
                      {product.tags.slice(0, 3).map((tag: string) => (
                        <span key={tag} className="text-[9px] bg-white/5 border border-white/10 px-1.5 py-0.5 rounded text-slate-300">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Details */}
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold tracking-widest text-purple-400 uppercase">
                      {product.category}
                    </span>
                    <h3 className="text-xl font-bold text-white mt-1 mb-2 group-hover:text-purple-400 transition-colors line-clamp-1">
                      {product.title}
                    </h3>
                    <p className="text-sm text-slate-400 mb-6 line-clamp-3 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  <div>
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {product.tags.map((tag: string) => (
                        <span
                          key={tag}
                          className="text-[10px] font-semibold text-slate-400 px-2 py-0.5 rounded-full bg-slate-900 border border-slate-850"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="w-full h-[1px] bg-slate-900 mb-6" />

                    {/* Footer Info */}
                    <div className="flex items-center justify-between mb-6 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <strong className="text-slate-350">{product.rating}</strong>
                      </span>
                      <span className="flex items-center gap-1">
                        <Download className="w-3.5 h-3.5" />
                        <strong className="text-slate-350">{product.downloads} downloads</strong>
                      </span>
                    </div>

                    {/* Price and Action Buttons */}
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex flex-col">
                        <span className="text-xs font-semibold text-slate-500 line-through">
                          {product.originalPrice}
                        </span>
                        <span className="text-lg font-black text-white">{product.price}</span>
                      </div>

                      <div className="flex gap-2">
                        <Link
                          href={`/products/${product.id}`}
                          className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-850 text-slate-300 hover:text-white transition-all shadow-md"
                          title="View Details"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleOpenCheckout(product)}
                          className="flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-xs font-bold text-white transition-all shadow-md shadow-purple-500/20"
                        >
                          <ShoppingCart className="w-3.5 h-3.5" />
                          Buy Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 rounded-2xl bg-slate-950/40 border border-slate-900 backdrop-blur-sm max-w-md mx-auto">
            <SlidersHorizontal className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">No products found</h3>
            <p className="text-sm text-slate-400 px-6">
              We couldn&apos;t find any digital templates matching your search criteria. Please try another search query or adjust your filters.
            </p>
          </div>
        )}
      </div>

      {/* Global Manual Payment Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        product={checkoutProduct}
      />
    </div>
  );
}
