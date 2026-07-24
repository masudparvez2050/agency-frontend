"use client";

import React, { useState, useMemo } from "react";
import { PRODUCTS } from "@/lib/products-data";
import { Product } from "@/types/product";
import CheckoutModal from "@/components/shared/main/CheckoutModal";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Search, SlidersHorizontal, Star, Download, ShoppingCart,
  X, LayoutGrid, Layers, Terminal, Palette, Smartphone, DollarSign, Filter, RotateCcw, Store, Sparkles
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
  const [, setIsMobileFilterOpen] = useState(false);

  const categoriesList = [
    { name: "All", icon: LayoutGrid },
    { name: "Next.js", icon: Layers },
    { name: "React", icon: Layers },
    { name: "Flutter", icon: Smartphone },
    { name: "Figma", icon: Palette },
    { name: "Scripts", icon: Terminal },
  ];

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

  const filteredAndSortedProducts = useMemo(() => {
    let result = allProducts.filter((p: any) => p.active !== false);

    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p: any) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t: string) => t.toLowerCase().includes(q))
      );
    }

    if (selectedCategory !== "All") {
      result = result.filter((p: any) => p.category === selectedCategory);
    }

    if (selectedPriceRange === "under-1000") {
      result = result.filter((p: any) => p.priceVal < 1000);
    } else if (selectedPriceRange === "1000-2000") {
      result = result.filter((p: any) => p.priceVal >= 1000 && p.priceVal <= 2000);
    } else if (selectedPriceRange === "over-2000") {
      result = result.filter((p: any) => p.priceVal > 2000);
    }

    if (sortBy === "popular") {
      result.sort((a: any, b: any) => parseInt(b.downloads) - parseInt(a.downloads));
    } else if (sortBy === "price-low") {
      result.sort((a: any, b: any) => a.priceVal - b.priceVal);
    } else if (sortBy === "price-high") {
      result.sort((a: any, b: any) => b.priceVal - a.priceVal);
    } else if (sortBy === "rating") {
      result.sort((a: any, b: any) => b.rating - a.rating);
    }

    return result;
  }, [allProducts, searchQuery, selectedCategory, selectedPriceRange, sortBy]);

  const handleOpenCheckout = (product: Product) => {
    setCheckoutProduct(product);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="min-h-screen pt-28 pb-24 overflow-hidden relative bg-gradient-to-b from-white via-slate-50/50 to-white font-sans">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-200/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-purple-200/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold uppercase tracking-wider mb-3 shadow-2xs">
            <Store className="w-3.5 h-3.5" />
            <span>Plaxora Marketplace</span>
          </div>
          <h1 className="font-heading font-extrabold text-4xl md:text-5xl tracking-tight text-slate-900 leading-tight mb-3">
            Digital Marketplace
          </h1>
          <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
            Deploy high-quality Next.js frontends, SaaS boilerplates, Flutter application shells, Figma files, and scripts in minutes.
          </p>
        </div>

        {/* Main Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
          
          {/* Desktop Left Sidebar Filter Panel */}
          <div className="hidden lg:block lg:col-span-3 space-y-4 sticky top-28">
            {/* Category Filter Group */}
            <div className="p-5 rounded-[24px] bg-white/95 backdrop-blur-xl border border-slate-200/80 shadow-[0_10px_35px_rgba(0,0,0,0.03)] space-y-3">
              <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Categories</span>
              <div className="space-y-1">
                {categoriesList.map((cat) => {
                  const Icon = cat.icon;
                  const isActive = selectedCategory === cat.name;
                  return (
                    <button
                      key={cat.name}
                      onClick={() => setSelectedCategory(cat.name)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
                        isActive
                          ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                          : "bg-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100/70"
                      }`}
                    >
                      <span className="flex items-center gap-2 truncate">
                        <Icon className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate">{cat.name}</span>
                      </span>
                      {isActive && <div className="w-1.5 h-1.5 rounded-full bg-white shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Price Filter Group */}
            <div className="p-5 rounded-[24px] bg-white/95 backdrop-blur-xl border border-slate-200/80 shadow-[0_10px_35px_rgba(0,0,0,0.03)] space-y-3">
              <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Price Range</span>
              <div className="space-y-1">
                {priceRanges.map((range) => {
                  const isActive = selectedPriceRange === range.id;
                  return (
                    <button
                      key={range.id}
                      onClick={() => setSelectedPriceRange(range.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
                        isActive
                          ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                          : "bg-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100/70"
                      }`}
                    >
                      <span className="flex items-center gap-2 truncate">
                        <DollarSign className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate">{range.name}</span>
                      </span>
                      {isActive && <div className="w-1.5 h-1.5 rounded-full bg-white shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Reset Filter Button */}
            {isFiltered && (
              <button
                onClick={resetFilters}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors shadow-2xs cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Clear Filters
              </button>
            )}
          </div>

          {/* Products Main Column */}
          <div className="lg:col-span-9 space-y-6">
            
            {/* Top Toolbar */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between p-4 sm:p-5 rounded-[24px] bg-white/95 backdrop-blur-xl border border-slate-200/80 shadow-[0_10px_35px_rgba(0,0,0,0.03)]">
              {/* Search input */}
              <div className="flex items-center gap-2.5 w-full md:max-w-md">
                <button
                  onClick={() => setIsMobileFilterOpen(true)}
                  className="lg:hidden p-2.5 rounded-full bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-900 shrink-0"
                >
                  <Filter className="w-4 h-4" />
                </button>
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search templates & assets..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-11 pr-10 py-2.5 rounded-full bg-slate-100/80 border border-slate-200/70 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition-all font-medium"
                  />
                  {searchQuery !== "" && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-slate-200 text-slate-400 hover:text-slate-700"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Sort Selection */}
              <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
                <div className="text-xs text-slate-500 font-bold">
                  Found <span className="text-blue-600">{filteredAndSortedProducts.length}</span> templates
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-slate-100/80 border border-slate-200/70 text-slate-700 text-xs font-bold px-4 py-2.5 rounded-full focus:outline-none focus:border-blue-600 transition-colors cursor-pointer font-sans"
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-7 sm:gap-8">
                {filteredAndSortedProducts.map((product: any, idx: number) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                    className="bg-white/95 backdrop-blur-xl rounded-[28px] border border-slate-200/80 overflow-hidden hover:border-blue-400/50 shadow-[0_10px_35px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_50px_rgba(37,99,235,0.12)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
                  >
                    <div>
                      {/* Product Cover Preview */}
                      <div className="relative bg-slate-950 h-52 sm:h-56 overflow-hidden">
                        <img
                          src={`/${product.id}-preview.png`}
                          alt={product.title}
                          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                        
                        {/* Floating Category Badge Tag */}
                        <span className="absolute top-3.5 left-3.5 inline-flex items-center px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-white/90 text-[10px] font-extrabold text-blue-600 uppercase tracking-wider shadow-sm">
                          {product.category}
                        </span>

                        {/* Floating Price Tag */}
                        <span className="absolute top-3.5 right-3.5 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-xs font-mono font-bold border border-white/20 shadow-sm">
                          {product.price}
                        </span>
                      </div>

                      {/* Card Details */}
                      <div className="p-6 sm:p-7">
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                          <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wide">
                            {product.category}
                          </span>
                        </div>

                        <h3 className="font-heading font-bold text-xl sm:text-2xl text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                          {product.title}
                        </h3>

                        <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed line-clamp-2">
                          {product.description}
                        </p>

                        {/* Platform / Tech Tags */}
                        <div className="flex flex-wrap gap-1.5 mt-4">
                          {product.tags.map((tag: string) => (
                            <span
                              key={tag}
                              className="px-2.5 py-1 bg-slate-100/80 text-[10px] font-bold text-slate-600 rounded-full border border-slate-200/60"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Card Footer */}
                    <div className="px-6 pb-6 pt-0 space-y-4">
                      {/* Price and Ratings row */}
                      <div className="flex items-center justify-between text-xs text-slate-500 border-t border-slate-100 pt-3.5">
                        <div className="flex items-baseline gap-1.5">
                          <span className="font-heading font-extrabold text-lg text-slate-900">
                            {product.price}
                          </span>
                          <span className="text-[11px] text-slate-400 font-mono line-through">
                            {product.originalPrice}
                          </span>
                        </div>

                        <div className="flex items-center gap-2.5 text-xs font-semibold">
                          <span className="flex items-center text-amber-500 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200/60">
                            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500 mr-1" /> {product.rating}
                          </span>
                          <span className="flex items-center text-[11px] text-slate-400">
                            <Download className="w-3.5 h-3.5 mr-1 text-slate-400" /> {product.downloads}
                          </span>
                        </div>
                      </div>

                      {/* Equal width button pair */}
                      <div className="grid grid-cols-2 gap-2.5">
                        <Link
                          href={`/products/${product.id}`}
                          className="py-2.5 px-3 rounded-xl border border-slate-200/90 bg-slate-50/80 hover:bg-slate-100 text-slate-700 text-xs font-bold transition-all text-center whitespace-nowrap"
                        >
                          View Details
                        </Link>
                        <button
                          onClick={() => handleOpenCheckout(product)}
                          className="py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-md shadow-blue-500/20 cursor-pointer flex items-center justify-center gap-1.5 whitespace-nowrap"
                        >
                          <ShoppingCart className="w-3.5 h-3.5" /> Buy Now
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 rounded-[28px] bg-white/95 backdrop-blur-xl border border-slate-200/80 shadow-[0_10px_35px_rgba(0,0,0,0.03)] max-w-md mx-auto">
                <SlidersHorizontal className="w-10 h-10 text-slate-400 mx-auto mb-3" />
                <h3 className="font-heading font-bold text-lg text-slate-900 mb-1">No templates found</h3>
                <p className="text-xs text-slate-500 px-6 font-normal">
                  We couldn&apos;t find any digital templates matching your search criteria. Please try another search query or adjust your filters.
                </p>
              </div>
            )}
          </div>
        </div>
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
