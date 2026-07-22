"use client";

import React, { useState, useMemo } from "react";
import { PRODUCTS } from "@/lib/products-data";
import { Product } from "@/types/product";
import CheckoutModal from "@/components/shared/main/CheckoutModal";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, SlidersHorizontal, ArrowUpDown, Star, Download, ShoppingCart, ExternalLink,
  X, LayoutGrid, Layers, Terminal, Palette, Smartphone, DollarSign, Filter, RotateCcw
} from "lucide-react";

import { useCMSData } from "@/hooks/useCMS";

export default function ProductsPage() {
  const [allProducts] = useCMSData<any>("products", PRODUCTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPriceRange, setSelectedPriceRange] = useState("all");
  const [sortBy, setSortBy] = useState("popular");
  const [checkoutProduct, setCheckoutProduct] = useState<Product | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // List of categories mapped to icons
  const categoriesList = [
    { name: "All", icon: LayoutGrid },
    { name: "Next.js", icon: Layers },
    { name: "React", icon: Layers },
    { name: "Flutter", icon: Smartphone },
    { name: "Figma", icon: Palette },
    { name: "Scripts", icon: Terminal },
  ];

  // List of price range filters
  const priceRanges = [
    { id: "all", name: "All Prices" },
    { id: "under-1000", name: "Under 1,000 BDT" },
    { id: "1000-2000", name: "1,000 - 2,000 BDT" },
    { id: "over-2000", name: "Over 2,000 BDT" },
  ];

  const isFiltered = searchQuery !== "" || selectedCategory !== "All" || selectedPriceRange !== "all";

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setSelectedPriceRange("all");
  };

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

    // 2. Category Filter
    if (selectedCategory !== "All") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // 3. Price Range Filter
    if (selectedPriceRange === "under-1000") {
      result = result.filter((p) => p.priceVal < 1000);
    } else if (selectedPriceRange === "1000-2000") {
      result = result.filter((p) => p.priceVal >= 1000 && p.priceVal <= 2000);
    } else if (selectedPriceRange === "over-2000") {
      result = result.filter((p) => p.priceVal > 2000);
    }

    // 4. Sort By
    if (sortBy === "popular") {
      result.sort((a, b) => parseInt(b.downloads) - parseInt(a.downloads));
    } else if (sortBy === "price-low") {
      result.sort((a, b) => a.priceVal - b.priceVal);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.priceVal - a.priceVal);
    } else if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [allProducts, searchQuery, selectedCategory, selectedPriceRange, sortBy]);

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
          <span className="text-xs font-extrabold text-purple-700 uppercase tracking-widest mb-3 block">Plaxora Store</span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 mb-4 leading-tight">
            Digital Marketplace
          </h1>
          <p className="text-slate-600 font-medium">
            Deploy high-quality Next.js frontends, SaaS boilerplates, Flutter application shells, Figma files, and scripts in minutes.
          </p>
        </div>

        {/* Main Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          
          {/* Desktop Left Sidebar Filter Panel */}
          <div className="hidden lg:block space-y-6 sticky top-28">
            {/* Category Filter Group */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-4">
              <span className="block text-xs font-extrabold text-slate-500 uppercase tracking-widest">Categories</span>
              <div className="space-y-1.5">
                {categoriesList.map((cat) => {
                  const Icon = cat.icon;
                  const isActive = selectedCategory === cat.name;
                  return (
                    <button
                      key={cat.name}
                      onClick={() => setSelectedCategory(cat.name)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all border ${
                        isActive
                          ? "bg-purple-50 border-purple-200 text-purple-700"
                          : "bg-transparent border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <Icon className="w-4 h-4" />
                        {cat.name}
                      </span>
                      {isActive && <div className="w-1.5 h-1.5 rounded-full bg-purple-600" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Price Filter Group */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-4">
              <span className="block text-xs font-extrabold text-slate-500 uppercase tracking-widest">Price Range</span>
              <div className="space-y-1.5">
                {priceRanges.map((range) => {
                  const isActive = selectedPriceRange === range.id;
                  return (
                    <button
                      key={range.id}
                      onClick={() => setSelectedPriceRange(range.id)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all border ${
                        isActive
                          ? "bg-purple-50 border-purple-200 text-purple-700"
                          : "bg-transparent border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4" />
                        {range.name}
                      </span>
                      {isActive && <div className="w-1.5 h-1.5 rounded-full bg-purple-600" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Reset Filter Button */}
            {isFiltered && (
              <button
                onClick={resetFilters}
                className="w-full flex items-center justify-center gap-1.5 py-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors shadow-sm"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Clear All Filters
              </button>
            )}
          </div>

          {/* Products Main Column */}
          <div className="lg:col-span-3 space-y-8">
            
            {/* Top Toolbar */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between p-4 rounded-2xl bg-white border border-slate-200/80 backdrop-blur-xl shadow-md">
              {/* Left: Search & Mobile Filter Toggle */}
              <div className="flex items-center gap-2.5 w-full md:max-w-md">
                <button
                  onClick={() => setIsMobileFilterOpen(true)}
                  className="lg:hidden p-2.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-900 transition-colors shrink-0"
                  title="Toggle Filters"
                >
                  <Filter className="w-4 h-4" />
                </button>
                <div className="relative flex-1">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search templates & assets..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-100 transition-all font-medium"
                  />
                  {searchQuery !== "" && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 rounded-md hover:bg-slate-200 text-slate-400 hover:text-slate-700 transition-colors"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Center: Total Results Count */}
              <div className="text-xs text-slate-500 font-extrabold uppercase tracking-wider hidden md:block">
                Found {filteredAndSortedProducts.length} Premium templates
              </div>

              {/* Right: Sort Selection */}
              <div className="flex items-center gap-2.5 w-full md:w-auto justify-between md:justify-end">
                <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider lg:hidden">
                  Found {filteredAndSortedProducts.length} Templates
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider hidden sm:inline-flex items-center gap-1">
                    <ArrowUpDown className="w-3 h-3" />
                    Sort By
                  </span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold px-3 py-2.5 rounded-xl focus:outline-none focus:border-purple-500/50 transition-colors cursor-pointer"
                  >
                    <option value="popular">Most Popular</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Top Rated</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            {filteredAndSortedProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredAndSortedProducts.map((product, idx) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                    className="group relative rounded-2xl bg-white border border-slate-200/80 overflow-hidden flex flex-col justify-between hover:border-purple-300 transition-all duration-300 shadow-md hover:shadow-xl hover:shadow-purple-500/5"
                  >
                    {/* Visual Graphic Representation */}
                    <div className="h-48 relative overflow-hidden transition-transform duration-500 border-b border-slate-200 group-hover:scale-[1.01]">
                      <img
                        src={`/${product.id}-preview.png`}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" />
                      
                      {/* Category Overlay Tag */}
                      <span className="absolute top-4 left-4 inline-flex items-center px-2.5 py-1 rounded-lg bg-white/90 backdrop-blur-md border border-slate-200 text-[10px] font-extrabold text-purple-700 uppercase tracking-widest shadow-sm">
                        {product.category}
                      </span>
                    </div>

                    {/* Card Details */}
                    <div className="p-6 flex-grow flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] font-bold tracking-widest text-purple-700 uppercase">
                          {product.category}
                        </span>
                        <h3 className="text-xl font-bold text-slate-900 mt-1 mb-2 group-hover:text-purple-700 transition-colors line-clamp-1">
                          {product.title}
                        </h3>
                        <p className="text-sm text-slate-600 mb-6 line-clamp-3 leading-relaxed font-normal">
                          {product.description}
                        </p>
                      </div>

                      <div>
                        {/* Tags */}
                        <div className="flex flex-wrap gap-1.5 mb-6">
                          {product.tags.map((tag: string) => (
                            <span
                              key={tag}
                              className="text-[10px] font-bold text-slate-600 px-2 py-0.5 rounded-full bg-slate-100 border border-slate-200"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <div className="w-full h-[1px] bg-slate-200 mb-6" />

                        {/* Footer Info */}
                        <div className="flex items-center justify-between mb-6 text-xs text-slate-500 font-medium">
                          <span className="flex items-center gap-1">
                            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                            <strong className="text-slate-800">{product.rating}</strong>
                          </span>
                          <span className="flex items-center gap-1">
                            <Download className="w-3.5 h-3.5" />
                            <strong className="text-slate-800">{product.downloads} downloads</strong>
                          </span>
                        </div>

                        {/* Price and Action Buttons */}
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex flex-col">
                            <span className="text-xs font-semibold text-slate-400 line-through">
                              {product.originalPrice}
                            </span>
                            <span className="text-lg font-black text-slate-900">{product.price}</span>
                          </div>

                          <div className="flex gap-2">
                            <Link
                              href={`/products/${product.id}`}
                              className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 transition-all shadow-sm"
                              title="View Details"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </Link>
                            <button
                              onClick={() => handleOpenCheckout(product)}
                              className="flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-xs font-bold text-white transition-all shadow-md shadow-purple-500/15"
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
              <div className="text-center py-24 rounded-2xl bg-white border border-slate-200/80 backdrop-blur-sm max-w-md mx-auto shadow-md">
                <SlidersHorizontal className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-slate-900 mb-2">No templates found</h3>
                <p className="text-sm text-slate-600 px-6 font-medium">
                  We couldn&apos;t find any digital templates matching your search criteria. Please try another search query or adjust your filters.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileFilterOpen(false)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 lg:hidden"
            />

            {/* Drawer Panel */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed inset-y-0 left-0 w-80 bg-white border-r border-slate-200 p-6 z-55 overflow-y-auto lg:hidden flex flex-col justify-between shadow-2xl"
            >
              <div className="space-y-8">
                {/* Header */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                  <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-purple-700" />
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Filter Templates</h3>
                  </div>
                  <button
                    onClick={() => setIsMobileFilterOpen(false)}
                    className="p-1.5 rounded-lg bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-900"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Categories */}
                <div className="space-y-3">
                  <span className="block text-xs font-bold text-slate-500 uppercase tracking-widest">Categories</span>
                  <div className="grid grid-cols-2 gap-2">
                    {categoriesList.map((cat) => {
                      const Icon = cat.icon;
                      const isActive = selectedCategory === cat.name;
                      return (
                        <button
                          key={cat.name}
                          onClick={() => setSelectedCategory(cat.name)}
                          className={`flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-[10px] font-bold border transition-all ${
                            isActive
                              ? "bg-purple-50 border-purple-200 text-purple-700"
                              : "bg-slate-50 border-slate-200 text-slate-600"
                          }`}
                        >
                          <Icon className="w-3.5 h-3.5" />
                          {cat.name}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Price range */}
                <div className="space-y-3">
                  <span className="block text-xs font-bold text-slate-500 uppercase tracking-widest">Price Range</span>
                  <div className="space-y-2">
                    {priceRanges.map((range) => {
                      const isActive = selectedPriceRange === range.id;
                      return (
                        <button
                          key={range.id}
                          onClick={() => setSelectedPriceRange(range.id)}
                          className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold border transition-all ${
                            isActive
                              ? "bg-purple-50 border-purple-200 text-purple-700"
                              : "bg-slate-50 border-slate-200 text-slate-600"
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            <DollarSign className="w-3.5 h-3.5" />
                            {range.name}
                          </span>
                          {isActive && <div className="w-1.5 h-1.5 rounded-full bg-purple-600" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="pt-6 border-t border-slate-200 flex gap-3">
                <button
                  onClick={() => {
                    resetFilters();
                    setIsMobileFilterOpen(false);
                  }}
                  className="flex-1 py-2.5 rounded-xl border border-slate-200 bg-slate-100 text-xs font-bold text-slate-700 hover:text-slate-900"
                >
                  Reset
                </button>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-xs font-bold text-white shadow-md shadow-purple-500/15"
                >
                  Apply
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Global Manual Payment Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        product={checkoutProduct}
      />
    </div>
  );
}
