import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Product, Category, MetalType, GemstoneType } from '../types';
import { formatPrice, Currency } from '../utils/formatters';
import { Search, SlidersHorizontal, Eye, ShoppingBag, X, Check, ArrowUpDown, Sparkles } from 'lucide-react';
import { WishlistButton } from './WishlistButton';
import { Card3DTilt } from './Card3DTilt';
import { ProductRealtimeShimmer } from './ProductRealtimeShimmer';

interface ProductCatalogProps {
  products: Product[];
  selectedCategory: Category;
  currency: Currency;
  onSelectCategory: (cat: Category) => void;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  wishlistIds: string[];
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  products,
  selectedCategory,
  currency,
  onSelectCategory,
  onQuickView,
  onAddToCart,
  onToggleWishlist,
  wishlistIds,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMetal, setSelectedMetal] = useState<MetalType>('All Metals');
  const [selectedGemstone, setSelectedGemstone] = useState<GemstoneType>('All Gemstones');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'popular'>('featured');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [priceRange, setPriceRange] = useState<number>(60000); // AED cap
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [hoveredProductId, setHoveredProductId] = useState<string | null>(null);

  const categories: Category[] = [
    'All',
    'Rings',
    'Pendants',
    'Necklaces',
    'Bracelets',
    'Earrings',
    'High Jewellery'
  ];

  const metals: MetalType[] = [
    'All Metals',
    '18K Yellow Gold',
    '18K Rose Gold',
    '18K White Gold',
    '22K Heritage Gold',
    'Platinum 950'
  ];

  const gemstones: GemstoneType[] = [
    'All Gemstones',
    'Natural Diamond',
    'Zambian Emerald',
    'Burmese Ruby',
    'Ceylon Sapphire',
    'South Sea Pearl',
    'Black Onyx'
  ];

  // Filtering Logic
  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      if (selectedCategory !== 'All' && item.category !== selectedCategory) {
        return false;
      }
      if (selectedMetal !== 'All Metals' && !item.metal.toLowerCase().includes(selectedMetal.toLowerCase().replace('all metals', ''))) {
        return false;
      }
      if (selectedGemstone !== 'All Gemstones' && !item.gemstone.toLowerCase().includes(selectedGemstone.toLowerCase().replace('all gemstones', ''))) {
        return false;
      }
      if (item.price > priceRange) {
        return false;
      }
      if (inStockOnly && !item.inStock) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = item.name.toLowerCase().includes(q);
        const matchSubtitle = item.subtitle.toLowerCase().includes(q);
        const matchDesc = item.description.toLowerCase().includes(q);
        const matchMetal = item.metal.toLowerCase().includes(q);
        const matchGem = item.gemstone.toLowerCase().includes(q);
        const matchHallmark = item.bisHallmarkNumber.toLowerCase().includes(q);
        const matchCol = item.collection.toLowerCase().includes(q);
        if (!matchTitle && !matchSubtitle && !matchDesc && !matchMetal && !matchGem && !matchHallmark && !matchCol) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'popular') return (b.reviewsCount || 0) - (a.reviewsCount || 0);
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [products, selectedCategory, selectedMetal, selectedGemstone, priceRange, inStockOnly, searchQuery, sortBy]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedMetal('All Metals');
    setSelectedGemstone('All Gemstones');
    setPriceRange(60000);
    setInStockOnly(false);
    onSelectCategory('All');
  };

  const activeFiltersCount = 
    (selectedCategory !== 'All' ? 1 : 0) +
    (selectedMetal !== 'All Metals' ? 1 : 0) +
    (selectedGemstone !== 'All Gemstones' ? 1 : 0) +
    (inStockOnly ? 1 : 0) +
    (searchQuery.trim() ? 1 : 0);

  return (
    <section id="catalog-section" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Header & Category Tabs */}
      <div className="mb-10 text-center sm:text-left">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#EAE4D9] pb-6 gap-4">
          <div>
            <span className="text-xs uppercase tracking-wide text-[#9B7D44] font-medium block mb-2">
              Atelier Creations
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1C1917] font-normal tracking-tight">
              {selectedCategory === 'All' ? 'Fine Jewellery Collections' : selectedCategory}
            </h2>
            <p className="text-xs sm:text-sm text-[#736B5F] mt-1 font-light">
              Showing {filteredProducts.length} certified bespoke creations
            </p>
          </div>

          {/* Quick Search */}
          <div className="relative w-full sm:w-72">
            <input
              type="text"
              placeholder="Search diamond, gold, collection..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-8 py-2.5 bg-white border border-[#EAE4D9] rounded-xs text-xs text-[#1C1917] placeholder:text-[#9E9080] focus:outline-none focus:border-[#C9A86A] transition-colors"
            />
            <Search className="w-4 h-4 text-[#9E9080] absolute left-3 top-1/2 -translate-y-1/2" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#9E9080] hover:text-[#1C1917] cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Categories Bar */}
        <div className="flex items-center justify-between mt-6 flex-wrap gap-4">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none max-w-full">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className={`relative overflow-hidden group px-4 py-2 rounded-xs text-xs uppercase tracking-wide transition-all duration-300 shrink-0 cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#1C1917] text-white font-medium shadow-md'
                    : 'bg-white text-[#665D50] hover:bg-[#FAF9F6] border border-[#EAE4D9]'
                }`}
              >
                <span className="relative z-10">{cat === 'All' ? 'All Pieces' : cat}</span>
              </button>
            ))}
          </div>

          {/* Controls: Sort & Filter Toggle */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#8C8273] uppercase tracking-wide hidden sm:inline">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-1.5 bg-white border border-[#EAE4D9] rounded-xs text-xs text-[#1C1917] focus:outline-none focus:border-[#C9A86A] cursor-pointer"
              >
                <option value="featured">Featured Curations</option>
                <option value="popular">Most Desired</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>

            <button
              onClick={() => setFilterDrawerOpen(!filterDrawerOpen)}
              className={`relative overflow-hidden group flex items-center gap-1.5 px-4 py-2 rounded-xs border text-xs uppercase tracking-wide transition-all duration-300 cursor-pointer ${
                activeFiltersCount > 0
                  ? 'bg-[#C9A86A] text-[#1C1917] border-[#C9A86A] font-semibold shadow-md'
                  : 'bg-white text-[#4A4338] border-[#EAE4D9] hover:border-[#1C1917]'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters</span>
              {activeFiltersCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-[#1C1917] text-white text-[10px] flex items-center justify-center font-bold">
                  {activeFiltersCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Collapsible Filter Panel */}
        <AnimatePresence>
          {filterDrawerOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="bg-[#FAF9F6] p-6 rounded-xs border border-[#EAE4D9] mt-4 shadow-sm">
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#EAE4D9]">
                  <h3 className="font-serif text-lg text-[#1C1917]">Refine Atelier Selection</h3>
                  {activeFiltersCount > 0 && (
                    <button
                      onClick={resetFilters}
                      className="text-xs text-[#8C2D2D] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                      Reset all filters
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Metal */}
                  <div>
                    <label className="block text-xs uppercase tracking-wide text-[#695F52] mb-2 font-medium">
                      Gold & Metal Alloy
                    </label>
                    <select
                      value={selectedMetal}
                      onChange={(e) => setSelectedMetal(e.target.value as MetalType)}
                      className="w-full p-2.5 bg-white border border-[#EAE4D9] rounded-xs text-xs text-[#2E2A25] focus:outline-none focus:border-[#C9A86A]"
                    >
                      {metals.map((m) => (
                        <option key={m} value={m}>{m}</option>
                      ))}
                    </select>
                  </div>

                  {/* Gemstone */}
                  <div>
                    <label className="block text-xs uppercase tracking-wide text-[#695F52] mb-2 font-medium">
                      Gemstones & Diamonds
                    </label>
                    <select
                      value={selectedGemstone}
                      onChange={(e) => setSelectedGemstone(e.target.value as GemstoneType)}
                      className="w-full p-2.5 bg-white border border-[#EAE4D9] rounded-xs text-xs text-[#2E2A25] focus:outline-none focus:border-[#C9A86A]"
                    >
                      {gemstones.map((g) => (
                        <option key={g} value={g}>{g}</option>
                      ))}
                    </select>
                  </div>

                  {/* Price Range Slider */}
                  <div>
                    <div className="flex justify-between items-center text-xs uppercase tracking-wide text-[#695F52] mb-2 font-medium">
                      <span>Max Price</span>
                      <span className="text-[#1C1917] font-semibold">{formatPrice(priceRange, currency)}</span>
                    </div>
                    <input
                      type="range"
                      min="1000"
                      max="60000"
                      step="1000"
                      value={priceRange}
                      onChange={(e) => setPriceRange(Number(e.target.value))}
                      className="w-full accent-[#C9A86A] cursor-pointer"
                    />
                  </div>

                  {/* In stock toggle */}
                  <div className="flex flex-col justify-end">
                    <label className="flex items-center gap-2 cursor-pointer p-2.5 bg-white border border-[#EAE4D9] rounded-xs text-xs text-[#2E2A25]">
                      <input
                        type="checkbox"
                        checked={inStockOnly}
                        onChange={(e) => setInStockOnly(e.target.checked)}
                        className="accent-[#C9A86A] rounded"
                      />
                      <span>In Stock & Ready for Dispatch</span>
                    </label>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* Products Grid or Empty State */}
      {filteredProducts.length === 0 ? (
        <div className="py-16 px-6 bg-white rounded-xs border border-[#EAE4D9] text-center max-w-xl mx-auto">
          <p className="font-serif text-2xl text-[#1C1917] mb-2">No matching creations found</p>
          <p className="text-xs text-[#7A7165] mb-6 font-light">
            We couldn't find items matching your exact filter criteria. Clear filters to explore our full collection.
          </p>
          <button
            onClick={resetFilters}
            className="px-6 py-2.5 bg-[#1C1917] text-white text-xs uppercase tracking-wide rounded-xs hover:bg-[#9B7D44] transition-colors cursor-pointer"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <motion.div layout className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-7">
          <AnimatePresence>
            {filteredProducts.map((product) => {
              const isWishlisted = wishlistIds.includes(product.id);
              const isCardHovered = hoveredProductId === product.id;

              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  key={product.id}
                  onMouseEnter={() => setHoveredProductId(product.id)}
                  onMouseLeave={() => setHoveredProductId(null)}
                >
                  <Card3DTilt maxTilt={7} scale={1.02}>
                    <div className="group bg-white border border-[#EAE4D9] rounded-xs overflow-hidden flex flex-col justify-between hover:border-[#C9A86A] hover:shadow-xl transition-all duration-300 h-full">
                      
                      {/* Image Container with Real-Time Rendering Shimmer */}
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
                          loading="lazy"
                        />
                        {product.images[1] && (
                          <img
                            src={product.images[1]}
                            alt={`${product.name} view 2`}
                            referrerPolicy="no-referrer"
                            className="absolute inset-0 w-full h-full object-cover object-center opacity-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 filter contrast-[1.02]"
                            loading="lazy"
                          />
                        )}

                        {/* Collection & Purity Badges */}
                        <div className="absolute top-2 left-2 sm:top-2.5 sm:left-2.5 flex flex-col gap-1 z-10 pointer-events-none">
                          <span className="px-1.5 sm:px-2 py-0.5 rounded-xs bg-[#1C1917]/85 backdrop-blur-xs text-white text-[8px] sm:text-[9px] font-medium tracking-wide uppercase">
                            {product.collection}
                          </span>
                          <span className="px-1.5 sm:px-2 py-0.5 rounded-xs bg-white/90 backdrop-blur-xs text-[#1C1917] text-[8px] sm:text-[9px] font-semibold tracking-wide uppercase border border-[#EAE4D9]">
                            {product.metalPurity}
                          </span>
                        </div>

                        {/* Wishlist Button */}
                        <div className="absolute top-2 right-2 sm:top-2.5 sm:right-2.5 z-20">
                          <WishlistButton
                            isWishlisted={isWishlisted}
                            onToggle={() => onToggleWishlist(product)}
                            size="sm"
                          />
                        </div>

                        {/* Quick View Overlay on Hover */}
                        <div className="absolute bottom-0 inset-x-0 p-2 sm:p-3 bg-gradient-to-t from-black/70 via-black/30 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex items-center justify-center gap-2 z-20">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onQuickView(product);
                            }}
                            className="relative overflow-hidden group/btn flex-1 py-1.5 sm:py-2 bg-white/95 backdrop-blur-md text-[#1C1917] text-[9px] sm:text-[10px] uppercase tracking-wide font-semibold hover:bg-white flex items-center justify-center gap-1 sm:gap-1.5 rounded-xs shadow-sm transition-all cursor-pointer"
                          >
                            <span className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-500 bg-gradient-to-r from-transparent via-[#C9A86A]/20 to-transparent pointer-events-none" />
                            <Eye className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#C9A86A]" />
                            <span>Quick View</span>
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onAddToCart(product);
                            }}
                            className="relative overflow-hidden group/btn p-1.5 sm:p-2 bg-[#1C1917] text-white hover:bg-[#C9A86A] hover:text-[#141210] transition-colors rounded-xs shadow-sm cursor-pointer"
                            title="Add to Bag"
                          >
                            <ShoppingBag className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Details - No Overlap */}
                      <div className="p-2.5 sm:p-5 flex flex-col flex-grow justify-between min-w-0">
                        <div>
                          <p className="text-[9px] sm:text-[10px] uppercase tracking-wide text-[#9B7D44] font-medium mb-1 truncate">
                            {product.metal} • {product.gemstone}
                          </p>
                          <h3
                            onClick={() => onQuickView(product)}
                            className="font-serif text-xs sm:text-base text-[#1C1917] font-normal leading-snug mb-1 hover:text-[#9B7D44] transition-colors cursor-pointer line-clamp-2 break-words"
                          >
                            {product.name}
                          </h3>
                          <p className="text-[10px] sm:text-[11px] text-[#7A7165] line-clamp-1 mb-1.5 sm:mb-2 font-light">
                            {product.subtitle}
                          </p>
                        </div>

                        {/* Price & Action */}
                        <div className="pt-2 sm:pt-3 border-t border-[#F2ECE1] flex items-center justify-between gap-1.5 sm:gap-2 min-w-0">
                          <div className="min-w-0">
                            <span className="text-[9px] sm:text-[10px] uppercase tracking-wide text-[#8C8273] block">Price</span>
                            <span className="font-sans text-xs sm:text-sm font-semibold text-[#1C1917] whitespace-nowrap">
                              {formatPrice(product.price, currency)}
                            </span>
                          </div>

                          <button
                            onClick={() => onAddToCart(product)}
                            className="relative overflow-hidden group/btn px-2.5 sm:px-3.5 py-1 sm:py-1.5 bg-[#1C1917] text-white text-[10px] sm:text-[11px] uppercase tracking-wide hover:bg-gradient-to-r hover:from-[#C9A86A] hover:to-[#DFC285] hover:text-[#141210] transition-all duration-300 rounded-xs flex items-center gap-1 shrink-0 cursor-pointer shadow-xs hover:shadow-md"
                          >
                            <span className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-500 bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />
                            <ShoppingBag className="w-3 h-3" />
                            <span>Add</span>
                          </button>
                        </div>
                      </div>

                    </div>
                  </Card3DTilt>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      )}

    </section>
  );
};
