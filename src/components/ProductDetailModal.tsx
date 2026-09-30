import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Product } from '../types';
import { formatPrice, Currency } from '../utils/formatters';
import { 
  X, ShieldCheck, Gem, ShoppingBag, Check, Award, Truck, RotateCcw, 
  Camera, Sparkles, Eye, Share2, Compass, ChevronLeft, ChevronRight, Video
} from 'lucide-react';
import { WishlistButton } from './WishlistButton';
import { ARTryOnModal } from './ARTryOnModal';

interface ProductDetailModalProps {
  product: Product | null;
  currency: Currency;
  onClose: () => void;
  onAddToCart: (product: Product, size?: string, engraving?: string) => void;
  onBuyNow: (product: Product, size?: string, engraving?: string) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  currency,
  onClose,
  onAddToCart,
  onBuyNow,
  isWishlisted,
  onToggleWishlist,
}) => {
  const [isAROpen, setIsAROpen] = useState(false);
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>(
    product?.availableSizes ? product.availableSizes[0] : ''
  );
  const [engravingText, setEngravingText] = useState('');
  const [showEngravingInput, setShowEngravingInput] = useState(false);
  const [addedNotice, setAddedNotice] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  if (!product) return null;

  const handleAdd = () => {
    onAddToCart(product, selectedSize, engravingText);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2000);
  };

  const handleInstantBuy = () => {
    onBuyNow(product, selectedSize, engravingText);
  };

  const nextImage = () => {
    setActiveImageIdx((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setActiveImageIdx((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  const isEarringOrNecklace = 
    product.category === 'Earrings' || 
    product.category === 'Necklaces' || 
    product.category === 'Pendants' ||
    product.name.toLowerCase().includes('earring') ||
    product.name.toLowerCase().includes('necklace') ||
    product.name.toLowerCase().includes('pendant');

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        />
        
        {/* Modal Shell */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-5xl bg-[#FAF9F6] rounded-xs shadow-2xl border border-[#EAE4D9] my-auto overflow-hidden"
        >
          
          {/* Close Button - Aesthetic & Animated */}
          <button
            id="close-product-detail-modal"
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md text-[#1C1917] hover:bg-[#1C1917] hover:text-white flex items-center justify-center transition-all duration-300 shadow-sm cursor-pointer hover:rotate-90"
            aria-label="Close details"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-12 max-h-[90vh] overflow-y-auto">
            
            {/* Left Gallery */}
            <div className="lg:col-span-6 p-6 sm:p-8 bg-[#F4EFE6] border-b lg:border-b-0 lg:border-r border-[#EAE4D9] flex flex-col items-center justify-between">
              
              {/* Header Bar with AR Try-On & Live Video Quick Launcher */}
              <div className="w-full max-w-md flex items-center justify-between mb-4 flex-wrap gap-2">
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setShowVideo(false)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all cursor-pointer ${
                      !showVideo
                        ? 'bg-[#1C1917] text-white'
                        : 'bg-white/70 text-[#695F52] hover:bg-white'
                    }`}
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Photos</span>
                  </button>

                  {product.videoUrl && (
                    <button
                      type="button"
                      onClick={() => setShowVideo(true)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer border ${
                        showVideo
                          ? 'bg-[#C9A86A] text-[#141210] border-[#C9A86A]'
                          : 'bg-white/80 text-[#9B7D44] border-[#C9A86A]/40 hover:bg-white'
                      }`}
                    >
                      <Video className="w-3.5 h-3.5" />
                      <span>Live Video Reel</span>
                    </button>
                  )}
                </div>

                {/* AR Try-On Mirror Quick Launcher */}
                <button
                  type="button"
                  onClick={() => setIsAROpen(true)}
                  className="relative overflow-hidden group px-3.5 py-1 rounded-full bg-[#C9A86A]/25 hover:bg-[#C9A86A] text-[#9B7D44] hover:text-[#141210] border border-[#C9A86A]/50 text-xs font-semibold flex items-center gap-1.5 transition-all duration-300 shadow-xs cursor-pointer hover:scale-105"
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>AR Try-On</span>
                </button>
              </div>

              {/* High-Res Photo Display OR Live Video Player */}
              <div className="relative w-full aspect-square max-w-md rounded-xs overflow-hidden bg-[#ECE4D8] shadow-md mb-4 group">
                {showVideo && product.videoUrl ? (
                  <video
                    src={product.videoUrl}
                    poster={product.images[0]}
                    autoPlay
                    loop
                    muted
                    controls
                    playsInline
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={activeImageIdx}
                      src={product.images[activeImageIdx]}
                      alt={`${product.name} view ${activeImageIdx + 1}`}
                      referrerPolicy="no-referrer"
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.02 }}
                      transition={{ duration: 0.25 }}
                      className="w-full h-full object-cover object-center transition-all duration-700 group-hover:scale-105"
                    />
                  </AnimatePresence>
                )}

                {/* Navigation Arrows (Photos only) */}
                {!showVideo && product.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      aria-label="Previous image"
                      className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 backdrop-blur-md text-[#1C1917] hover:bg-white shadow-md flex items-center justify-center transition-all cursor-pointer opacity-80 hover:opacity-100 hover:scale-110"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={nextImage}
                      aria-label="Next image"
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 backdrop-blur-md text-[#1C1917] hover:bg-white shadow-md flex items-center justify-center transition-all cursor-pointer opacity-80 hover:opacity-100 hover:scale-110"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </>
                )}

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-1.5 pointer-events-none">
                  <span className="px-2.5 py-1 rounded-xs bg-[#1C1917]/85 backdrop-blur-xs text-white text-[9px] font-medium tracking-wide uppercase">
                    {product.collection}
                  </span>
                  <span className="px-2.5 py-1 rounded-xs bg-white/90 backdrop-blur-xs text-[#1C1917] text-[9px] font-semibold tracking-wide uppercase border border-[#EAE4D9]">
                    BIS Hallmark: {product.bisHallmarkNumber}
                  </span>
                </div>

                {/* Wishlist */}
                <div className="absolute top-3 right-3">
                  <WishlistButton
                    isWishlisted={isWishlisted}
                    onToggle={() => onToggleWishlist(product)}
                    size="md"
                  />
                </div>

                {/* Photo indicator */}
                <div className="absolute bottom-2.5 inset-x-0 text-center pointer-events-none">
                  <span className="text-[10px] text-[#5C5449] bg-white/85 backdrop-blur-xs px-2.5 py-0.5 rounded-full font-light shadow-xs">
                    View {activeImageIdx + 1} of {product.images.length}
                  </span>
                </div>
              </div>

              {/* Thumbnails row */}
              <div className="flex items-center gap-2 max-w-md overflow-x-auto py-1">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIdx(idx)}
                    className={`relative w-14 h-14 rounded-xs overflow-hidden border-2 transition-all flex-shrink-0 cursor-pointer ${
                      activeImageIdx === idx
                        ? 'border-[#C9A86A] shadow-md scale-105'
                        : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>

            </div>

            {/* Right Information & Acquisition Panel */}
            <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between">
              <div>
                {/* Eyebrow */}
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span className="text-xs uppercase tracking-wide text-[#9B7D44] font-medium">
                    {product.collection} Collection
                  </span>
                  <span className="text-[#8C8273]">•</span>
                  <span className="text-xs text-[#8C8273] font-light">
                    SKU: {product.id}
                  </span>
                </div>

                {/* Title */}
                <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#1C1917] font-normal leading-tight mb-2 break-words">
                  {product.name}
                </h2>

                <p className="text-xs text-[#695F52] mb-5 font-light leading-relaxed">
                  {product.subtitle}
                </p>

                {/* Virtual AR Mirror Try-On Banner */}
                <div className="mb-6 p-3 bg-gradient-to-r from-[#FAF6ED] via-[#F4EFE6] to-[#FAF6ED] border border-[#C9A86A]/40 rounded-xs flex items-center justify-between gap-3 flex-wrap sm:flex-nowrap">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-full bg-[#C9A86A] text-[#141210] flex items-center justify-center flex-shrink-0 shadow-xs">
                      <Camera className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <span className="block text-xs font-semibold text-[#1C1917] truncate">
                        Virtual AR Mirror Try-On
                      </span>
                      <span className="text-[10px] text-[#7A7165] line-clamp-1">
                        {isEarringOrNecklace
                          ? 'Visualize exact drop on your ears and neckline via camera'
                          : 'Virtual fitting preview with lighting & scale calibration'}
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsAROpen(true)}
                    className="relative overflow-hidden group px-3.5 py-1.5 bg-[#1C1917] text-[#FAF9F6] hover:bg-gradient-to-r hover:from-[#C9A86A] hover:to-[#DFC285] hover:text-[#141210] text-xs uppercase tracking-wide font-semibold rounded-xs transition-all duration-300 shadow-xs cursor-pointer shrink-0"
                  >
                    <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500 bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />
                    <span>Open AR</span>
                  </button>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-3 mb-6 pb-6 border-b border-[#EAE4D9] flex-wrap">
                  <span className="font-sans text-2xl sm:text-3xl font-semibold text-[#1C1917] whitespace-nowrap">
                    {formatPrice(product.price, currency)}
                  </span>
                  {product.originalPrice && (
                    <span className="font-sans text-base text-[#9E9589] line-through whitespace-nowrap">
                      {formatPrice(product.originalPrice, currency)}
                    </span>
                  )}
                  <span className="text-[11px] bg-[#15803D]/10 text-[#15803D] px-2 py-0.5 rounded-xs font-medium whitespace-nowrap">
                    Complimentary Insured Shipping
                  </span>
                </div>

                {/* Technical Specifications */}
                <div className="mb-6">
                  <h4 className="text-xs uppercase tracking-wide text-[#695F52] font-semibold mb-3">
                    Craftsmanship Specifications
                  </h4>
                  <div className="grid grid-cols-2 gap-2 text-xs bg-white p-4 rounded-xs border border-[#EAE4D9]">
                    <div>
                      <span className="text-[#8C8273] block text-[10px] uppercase">Metal Alloy</span>
                      <span className="font-medium text-[#1C1917]">{product.metal} ({product.metalPurity})</span>
                    </div>
                    <div>
                      <span className="text-[#8C8273] block text-[10px] uppercase">Gemstones</span>
                      <span className="font-medium text-[#1C1917]">{product.gemstone}</span>
                    </div>
                    <div>
                      <span className="text-[#8C8273] block text-[10px] uppercase">Total Carat Weight</span>
                      <span className="font-medium text-[#1C1917]">{product.diamondCarats} ctw</span>
                    </div>
                    <div>
                      <span className="text-[#8C8273] block text-[10px] uppercase">Clarity & Color</span>
                      <span className="font-medium text-[#1C1917]">{product.diamondClarity} • {product.diamondColor}</span>
                    </div>
                    <div>
                      <span className="text-[#8C8273] block text-[10px] uppercase">Gross Weight</span>
                      <span className="font-medium text-[#1C1917]">{product.grossWeight}g</span>
                    </div>
                    <div>
                      <span className="text-[#8C8273] block text-[10px] uppercase">Net Gold Weight</span>
                      <span className="font-medium text-[#1C1917]">{product.netGoldWeight}g</span>
                    </div>
                  </div>
                </div>

                {/* Sizing options if applicable */}
                {product.availableSizes && product.availableSizes.length > 0 && (
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-xs uppercase tracking-wide text-[#695F52] font-semibold">
                        Select Standard Size
                      </label>
                      <span className="text-[11px] text-[#9B7D44] hover:underline cursor-pointer">
                        Size Guide
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {product.availableSizes.map((size) => (
                        <button
                          key={size}
                          type="button"
                          onClick={() => setSelectedSize(size)}
                          className={`px-3 py-1.5 text-xs rounded-xs border transition-all cursor-pointer ${
                            selectedSize === size
                              ? 'bg-[#1C1917] text-white border-[#1C1917] shadow-sm font-semibold'
                              : 'bg-white text-[#4A453E] border-[#EAE4D9] hover:border-[#C9A86A]'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Bespoke Laser Engraving toggle */}
                <div className="mb-6">
                  {!showEngravingInput ? (
                    <button
                      type="button"
                      onClick={() => setShowEngravingInput(true)}
                      className="text-xs text-[#9B7D44] hover:underline flex items-center gap-1 font-medium cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Add Complimentary Atelier Laser Engraving</span>
                    </button>
                  ) : (
                    <div className="space-y-1.5 bg-[#FAF9F6] p-3 rounded-xs border border-[#EAE4D9]">
                      <div className="flex justify-between items-center text-xs">
                        <label className="font-medium text-[#1C1917]">
                          Personal Inscription (max 20 characters)
                        </label>
                        <button
                          onClick={() => {
                            setShowEngravingInput(false);
                            setEngravingText('');
                          }}
                          className="text-[#8C8273] hover:text-[#1C1917] cursor-pointer"
                        >
                          Remove
                        </button>
                      </div>
                      <input
                        type="text"
                        maxLength={20}
                        value={engravingText}
                        onChange={(e) => setEngravingText(e.target.value)}
                        placeholder="e.g. Forever Yours • 2026"
                        className="w-full p-2 bg-white border border-[#EAE4D9] rounded-xs text-xs focus:outline-none focus:border-[#C9A86A]"
                      />
                    </div>
                  )}
                </div>

              </div>

              {/* Action Buttons with Aesthetic Hover Sheen & Smooth Animations */}
              <div className="space-y-3 pt-4 border-t border-[#EAE4D9]">
                <div className="flex gap-3">
                  <button
                    id="product-detail-add-bag-btn"
                    onClick={handleAdd}
                    className="relative overflow-hidden group flex-1 py-3.5 px-6 bg-[#1C1917] text-white text-xs uppercase tracking-wide font-semibold hover:bg-gradient-to-r hover:from-[#C9A86A] hover:to-[#DFC285] hover:text-[#141210] transition-all duration-300 rounded-xs flex items-center justify-center gap-2 shadow-sm cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />
                    {addedNotice ? (
                      <>
                        <Check className="w-4 h-4 text-[#15803D]" />
                        <span>Added to Bag</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        <span>Add to Bag</span>
                      </>
                    )}
                  </button>

                  <button
                    id="product-detail-buy-now-btn"
                    onClick={handleInstantBuy}
                    className="relative overflow-hidden group flex-1 py-3.5 px-6 bg-gradient-to-r from-[#C9A86A] via-[#DFC285] to-[#C9A86A] text-[#141210] text-xs uppercase tracking-wide font-bold hover:shadow-[0_4px_20px_rgba(201,168,106,0.4)] transition-all duration-300 rounded-xs flex items-center justify-center gap-1.5 shadow-sm cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />
                    <span>Instant Checkout</span>
                  </button>
                </div>

                {/* Trust Badges */}
                <div className="grid grid-cols-3 gap-2 pt-2 text-[10px] text-[#7A7165] text-center">
                  <div className="flex flex-col items-center">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#C9A86A] mb-0.5" />
                    <span>100% Certified</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <Truck className="w-3.5 h-3.5 text-[#C9A86A] mb-0.5" />
                    <span>Insured Delivery</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <RotateCcw className="w-3.5 h-3.5 text-[#C9A86A] mb-0.5" />
                    <span>Lifetime Exchange</span>
                  </div>
                </div>

              </div>

            </div>

          </div>

        </motion.div>
      </div>

      {/* AR Modal View */}
      {isAROpen && (
        <ARTryOnModal
          isOpen={isAROpen}
          product={product}
          onClose={() => setIsAROpen(false)}
        />
      )}
    </>
  );
};
