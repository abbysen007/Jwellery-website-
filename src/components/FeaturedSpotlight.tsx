import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Product } from '../types';
import { formatINR } from '../utils/formatters';
import { ShieldCheck, Sparkles, ArrowLeft, ArrowRight, Eye, ShoppingBag } from 'lucide-react';

interface FeaturedSpotlightProps {
  product: Product;
  onAddToCart: (product: Product, size?: string) => void;
  onQuickView: (product: Product) => void;
}

export const FeaturedSpotlight: React.FC<FeaturedSpotlightProps> = ({
  product,
  onAddToCart,
  onQuickView
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>(product.availableSizes?.[2] || '14');

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-[#FAF8F5]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7 }}
        className="text-center mb-10"
      >
        <span className="text-xs uppercase tracking-wide text-[#9B7D44] font-medium mb-2 flex items-center justify-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#C9A86A]" />
          <span>{product.collection}</span>
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1E1B18] font-normal tracking-tight">
          Spotlight Creation
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.8 }}
        className="bg-[#F4EFE6] rounded-sm border border-[#E3DBD0] p-6 sm:p-8 lg:p-14 shadow-sm"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          
          {/* Left / Center Image Showcase with navigation arrows */}
          <div className="lg:col-span-7 relative flex flex-col items-center">
            
            <div className="relative w-full max-w-md aspect-square bg-[#ECE4D8] rounded-sm overflow-hidden shadow-md flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImageIndex}
                  src={product.images[activeImageIndex]}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.03 }}
                  transition={{ duration: 0.35 }}
                  className="w-full h-full object-cover object-center"
                />
              </AnimatePresence>

              {/* Prev / Next Arrows */}
              <button
                onClick={prevImage}
                aria-label="Previous view"
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/85 backdrop-blur-md text-[#1E1B18] hover:bg-white shadow-md flex items-center justify-center transition-all cursor-pointer hover:scale-110 active:scale-95"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>

              <button
                onClick={nextImage}
                aria-label="Next view"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/85 backdrop-blur-md text-[#1E1B18] hover:bg-white shadow-md flex items-center justify-center transition-all cursor-pointer hover:scale-110 active:scale-95"
              >
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Angle Tag */}
              <span className="absolute bottom-3 right-3 text-[10px] uppercase tracking-wide bg-black/60 text-white px-2.5 py-1 rounded backdrop-blur-sm">
                View {activeImageIndex + 1} of {product.images.length}
              </span>
            </div>

            {/* Thumbnail selector */}
            <div className="flex gap-2.5 mt-4">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-14 h-14 rounded-sm overflow-hidden border-2 transition-all cursor-pointer ${
                    activeImageIndex === idx ? 'border-[#C9A86A] scale-105 shadow-md' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`Angle ${idx + 1}`} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

          </div>

          {/* Right Product Details & Buy Actions */}
          <div className="lg:col-span-5 flex flex-col justify-center min-w-0">
            
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full bg-[#E8DEC8] text-[#69542D] text-[10px] font-semibold tracking-wide uppercase">
                {product.metalPurity} Gold
              </span>
              <span className="text-[11px] text-[#7A7165]">
                BIS Hallmark: {product.bisHallmarkNumber}
              </span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#1E1B18] font-normal leading-tight mb-2 break-words">
              {product.name}
            </h3>

            <p className="text-xs text-[#7A7165] tracking-wide mb-6 font-light">
              {product.subtitle}
            </p>

            <div className="flex items-baseline gap-4 mb-6 flex-wrap">
              <span className="text-2xl sm:text-3xl font-sans font-semibold text-[#1E1B18] whitespace-nowrap">
                {formatINR(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-base text-[#9E9589] line-through whitespace-nowrap">
                  {formatINR(product.originalPrice)}
                </span>
              )}
              <span className="text-xs text-[#2E7D32] font-medium bg-[#E8F5E9] px-2.5 py-1 rounded inline-flex items-center gap-1.5 whitespace-nowrap">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2E7D32] animate-pulse" />
                Insured Delivery Included
              </span>
            </div>

            {/* Specifications Quick Grid */}
            <div className="grid grid-cols-2 gap-3 p-4 bg-[#EDE5D8] rounded-sm text-xs mb-6 border border-[#DFD6C8]">
              <div>
                <span className="text-[#857B6E] block text-[10px] uppercase tracking-wide">Gross Weight</span>
                <span className="font-medium text-[#1E1B18]">{product.grossWeight}g (Net: {product.netGoldWeight}g)</span>
              </div>
              <div>
                <span className="text-[#857B6E] block text-[10px] uppercase tracking-wide">Natural Diamonds</span>
                <span className="font-medium text-[#1E1B18]">{product.diamondCarats} ctw ({product.diamondClarity} / {product.diamondColor})</span>
              </div>
              <div>
                <span className="text-[#857B6E] block text-[10px] uppercase tracking-wide">Certification</span>
                <span className="font-medium text-[#1E1B18]">BIS 750 + Subha Vault ID</span>
              </div>
              <div>
                <span className="text-[#857B6E] block text-[10px] uppercase tracking-wide">Dispatch</span>
                <span className="font-medium text-[#1E1B18]">Immediate Express Courier</span>
              </div>
            </div>

            {/* Size Selector */}
            {product.availableSizes && (
              <div className="mb-6">
                <div className="flex justify-between items-center text-xs mb-2 flex-wrap gap-1">
                  <span className="font-medium text-[#38332C] uppercase tracking-wide text-[11px]">
                    Indian Ring Size (Standard)
                  </span>
                  <span className="text-[#8C7449] hover:underline cursor-pointer">
                    Complimentary Sizing Guide
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.availableSizes.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`min-w-[42px] h-10 px-3 text-xs font-medium rounded-sm border transition-all cursor-pointer ${
                        selectedSize === sz
                          ? 'bg-[#1C1A17] text-white border-[#1C1A17] shadow-sm'
                          : 'bg-[#FAF8F5] text-[#4A4338] border-[#D4C9BC] hover:border-[#1C1A17]'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Actions - Aesthetic Animated Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                id="spotlight-add-cart-btn"
                onClick={() => onAddToCart(product, selectedSize)}
                className="relative overflow-hidden group flex-1 py-4 px-6 bg-[#1C1A17] text-[#FAF8F5] text-xs uppercase tracking-wide font-semibold hover:bg-gradient-to-r hover:from-[#C9A86A] hover:to-[#DFC285] hover:text-[#1C1A17] transition-all duration-300 flex items-center justify-center gap-2 shadow-md rounded-xs cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
              >
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />
                <ShoppingBag className="w-4 h-4" />
                <span>Add To Bag — {formatINR(product.price)}</span>
              </button>

              <button
                id="spotlight-quickview-btn"
                onClick={() => onQuickView(product)}
                className="relative overflow-hidden group py-4 px-6 border border-[#BFA57A] bg-white text-[#1C1A17] text-xs uppercase tracking-wide font-semibold hover:bg-[#FAF9F6] transition-all duration-300 flex items-center justify-center gap-2 rounded-xs cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
              >
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-[#C9A86A]/20 to-transparent pointer-events-none" />
                <Eye className="w-4 h-4 text-[#8C7449]" />
                <span>Examine Piece</span>
              </button>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-[#7A7165] mt-4">
              <ShieldCheck className="w-4 h-4 text-[#C9A86A] shrink-0" />
              <span>Complimentary insured shipping, tamper-evident security seal, and certificate</span>
            </div>

          </div>

        </div>
      </motion.div>
    </section>
  );
};
