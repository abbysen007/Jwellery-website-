import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Product } from '../types';
import { Currency, formatPrice } from '../utils/formatters';
import { ShoppingBag, Eye, Sparkles, Check, ArrowRight } from 'lucide-react';
import { Card3DTilt } from './Card3DTilt';
import { WishlistButton } from './WishlistButton';
import { ProductRealtimeShimmer } from './ProductRealtimeShimmer';

interface BestsellersSpotlightProps {
  products: Product[];
  currency?: Currency;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  wishlistIds: string[];
  onToggleWishlist: (id: string) => void;
  onViewAll?: () => void;
}

export const BestsellersSpotlight: React.FC<BestsellersSpotlightProps> = ({
  products,
  currency = 'INR',
  onQuickView,
  onAddToCart,
  wishlistIds,
  onToggleWishlist,
  onViewAll = () => {},
}) => {
  const [activeTab, setActiveTab] = useState<string>('All');
  const [addedId, setAddedId] = useState<string | null>(null);
  const [hoveredProductId, setHoveredProductId] = useState<string | null>(null);

  const tabs = ['All', 'Rings', 'Necklaces', 'Earrings', 'Bracelets'];

  const filtered = products.filter((p) => {
    if (activeTab === 'All') return true;
    return p.category === activeTab;
  });

  const handleAdd = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1800);
  };

  return (
    <section id="bestsellers-section" className="py-20 sm:py-28 bg-[#FAF9F6] border-b border-[#EAE4D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with balanced tracking */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wide text-[#9B7D44] font-medium mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#C9A86A]" />
              <span>Curated Icons</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1C1917] font-normal tracking-tight">
              Our Bestsellers
            </h2>
            <p className="text-sm text-[#6B6152] font-sans font-light mt-2 max-w-xl">
              Timeless signatures chosen by collectors across the Emirates and worldwide.
            </p>
          </div>

          {/* Filter Tabs - Aesthetic & Animated */}
          <div className="flex flex-wrap items-center gap-2 border-b border-[#EAE4D9] pb-2 sm:pb-0 sm:border-0">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative overflow-hidden group px-4 py-2 text-xs uppercase tracking-wide transition-all duration-300 rounded-xs cursor-pointer ${
                  activeTab === tab
                    ? 'bg-[#1C1917] text-white font-medium shadow-md'
                    : 'text-[#665D50] hover:text-[#1C1917] hover:bg-[#EFEBE3]'
                }`}
              >
                <span className="relative z-10">{tab === 'All' ? 'All Bestsellers' : tab}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid with Real-Time Rendering Shimmer & 3D Tilt - 2 cols on mobile, 4 cols on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-7">
          {filtered.slice(0, 8).map((product) => {
            const isWishlisted = wishlistIds.includes(product.id);
            const isJustAdded = addedId === product.id;
            const isCardHovered = hoveredProductId === product.id;

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                onMouseEnter={() => setHoveredProductId(product.id)}
                onMouseLeave={() => setHoveredProductId(null)}
              >
                <Card3DTilt maxTilt={7} scale={1.02}>
                  <div className="group relative bg-white border border-[#EAE4D9] rounded-xs overflow-hidden flex flex-col justify-between hover:border-[#C9A86A] hover:shadow-xl transition-all duration-300 h-full">
                    
                    {/* Image Container with Real-Time Rendering Shimmer Canvas */}
                    <div
                      onClick={() => onQuickView(product)}
                      className="relative aspect-square w-full overflow-hidden bg-[#F5F2ED] cursor-pointer"
                    >
                      {/* Real-time caustic canvas animation */}
                      <ProductRealtimeShimmer isHovered={isCardHovered} />

                      <img
                        src={product.images[0]}
                        alt={product.name}
                        referrerPolicy="no-referrer"
                        className={`w-full h-full object-cover object-center transition-all duration-700 filter contrast-[1.02] ${
                          product.images[1] ? 'group-hover:opacity-0' : 'group-hover:scale-105'
                        }`}
                      />
                      {product.images[1] && (
                        <img
                          src={product.images[1]}
                          alt={`${product.name} alternate view`}
                          referrerPolicy="no-referrer"
                          className="absolute inset-0 w-full h-full object-cover object-center opacity-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 filter contrast-[1.02]"
                        />
                      )}

                      {/* Collection & Status Badges */}
                      <div className="absolute top-2 left-2 sm:top-2.5 sm:left-2.5 flex flex-col gap-1 z-10 pointer-events-none">
                        <span className="text-[8px] sm:text-[9px] uppercase tracking-wide font-medium bg-[#1C1917]/85 backdrop-blur-xs text-white px-1.5 sm:px-2 py-0.5 rounded-xs">
                          {product.collection}
                        </span>
                        {product.originalPrice && (
                          <span className="text-[8px] sm:text-[9px] uppercase tracking-wide font-medium bg-[#8C2D2D] text-white px-1.5 sm:px-2 py-0.5 rounded-xs">
                            Sale
                          </span>
                        )}
                      </div>

                      {/* Wishlist Button */}
                      <div className="absolute top-2 right-2 sm:top-2.5 sm:right-2.5 z-20">
                        <WishlistButton
                          isWishlisted={isWishlisted}
                          onToggle={() => onToggleWishlist(product.id)}
                          size="sm"
                        />
                      </div>

                      {/* Quick 3D & AR Inspect Overlay Bar */}
                      <div className="absolute bottom-0 inset-x-0 p-2 sm:p-3 bg-gradient-to-t from-black/70 via-black/30 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex items-center justify-center gap-2 z-20">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onQuickView(product);
                          }}
                          className="relative overflow-hidden group/btn w-full py-1.5 sm:py-2 bg-white/95 backdrop-blur-md text-[#1C1917] text-[9px] sm:text-[10px] uppercase tracking-wide font-semibold hover:bg-white flex items-center justify-center gap-1 sm:gap-1.5 rounded-xs shadow-md transition-all duration-300 cursor-pointer"
                        >
                          <span className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-500 bg-gradient-to-r from-transparent via-[#C9A86A]/30 to-transparent pointer-events-none" />
                          <Eye className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#C9A86A]" />
                          <span>Quick View</span>
                        </button>
                      </div>
                    </div>

                    {/* Product Details - No Overlap */}
                    <div className="p-2.5 sm:p-5 flex flex-col flex-grow justify-between min-w-0">
                      <div>
                        <p className="text-[9px] sm:text-[10px] uppercase tracking-wide text-[#9B7D44] font-medium mb-1 truncate">
                          {product.metalPurity} • {product.gemstone}
                        </p>
                        <h3
                          onClick={() => onQuickView(product)}
                          className="font-serif text-xs sm:text-base text-[#1C1917] font-normal leading-snug mb-1 hover:text-[#9B7D44] transition-colors cursor-pointer line-clamp-2 break-words"
                        >
                          {product.name}
                        </h3>
                      </div>

                      {/* Price & Add To Bag Button */}
                      <div className="pt-2 sm:pt-3 mt-2 sm:mt-3 border-t border-[#F2ECE1]">
                        <div className="flex items-baseline gap-1.5 mb-2 sm:mb-3">
                          <span className="text-[10px] sm:text-xs uppercase tracking-wide text-[#8C8273] font-light">
                            Price:
                          </span>
                          <span className="font-sans text-xs sm:text-sm font-semibold text-[#1C1917] whitespace-nowrap">
                            {formatPrice(product.price, currency)}
                          </span>
                        </div>

                        <button
                          onClick={(e) => handleAdd(product, e)}
                          disabled={!product.inStock}
                          className={`relative overflow-hidden group/btn w-full py-2 sm:py-2.5 px-2 sm:px-3 text-[10px] sm:text-xs uppercase tracking-wide font-medium flex items-center justify-center gap-1.5 sm:gap-2 rounded-xs transition-all duration-300 cursor-pointer ${
                            isJustAdded
                              ? 'bg-[#15803D] text-white shadow-sm'
                              : 'bg-[#1C1917] text-white hover:bg-gradient-to-r hover:from-[#C9A86A] hover:to-[#DFC285] hover:text-[#141210] hover:shadow-[0_4px_20px_rgba(201,168,106,0.3)]'
                          }`}
                        >
                          <span className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />
                          {isJustAdded ? (
                            <>
                              <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                              <span className="truncate">Added</span>
                            </>
                          ) : (
                            <>
                              <ShoppingBag className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                              <span className="truncate">Add to Bag</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                  </div>
                </Card3DTilt>
              </motion.div>
            );
          })}
        </div>

        {/* View All Bestsellers CTA Button */}
        <div className="mt-14 text-center">
          <button
            onClick={onViewAll}
            className="relative overflow-hidden group inline-flex items-center gap-2 px-8 py-3.5 border border-[#1C1917] text-[#1C1917] text-xs uppercase tracking-wide font-medium hover:bg-[#1C1917] hover:text-white transition-all duration-300 rounded-xs hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-[#C9A86A]/20 to-transparent pointer-events-none" />
            <span className="relative z-10 flex items-center gap-2">
              <span>Explore All Creations</span>
              <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
        </div>

      </div>
    </section>
  );
};
