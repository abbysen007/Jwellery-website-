import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Heart, ShoppingBag, ShieldCheck, LayoutDashboard, Menu, X, ChevronDown, Sparkles, Calendar, Globe } from 'lucide-react';
import { Category } from '../types';
import { Currency } from '../utils/formatters';

interface NavbarProps {
  cartCount: number;
  wishlistCount: number;
  currency?: Currency;
  onSelectCurrency?: (currency: Currency) => void;
  onCurrencyChange?: (currency: Currency) => void;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenSearch: () => void;
  onOpenCertVerify: () => void;
  onToggleAdmin: () => void;
  isAdminOpen: boolean;
  onSelectCategory: (category: Category) => void;
  selectedCategory: Category;
  onSelectCollection?: (collection: string) => void;
  onBookAppointment: () => void;
  onScrollToSection?: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  wishlistCount,
  currency = 'INR',
  onSelectCurrency,
  onCurrencyChange,
  onOpenCart,
  onOpenWishlist,
  onOpenSearch,
  onOpenCertVerify,
  onToggleAdmin,
  isAdminOpen,
  onSelectCategory,
  selectedCategory,
  onSelectCollection = () => {},
  onBookAppointment,
  onScrollToSection = () => {}
}) => {
  const handleCurrencySelect = (curr: Currency) => {
    if (onSelectCurrency) onSelectCurrency(curr);
    if (onCurrencyChange) onCurrencyChange(curr);
  };
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [shopDropdownOpen, setShopDropdownOpen] = useState(false);
  const [collectionsDropdownOpen, setCollectionsDropdownOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);

  const categories: { label: string; value: Category }[] = [
    { label: 'Rings', value: 'Rings' },
    { label: 'Pendants', value: 'Pendants' },
    { label: 'Necklaces', value: 'Necklaces' },
    { label: 'Bracelets', value: 'Bracelets' },
    { label: 'Earrings', value: 'Earrings' },
    { label: 'High Jewellery', value: 'High Jewellery' },
    { label: 'Shop All', value: 'All' }
  ];

  const collections = [
    { name: 'Starlight', desc: 'Celestial multi-diamond pavé' },
    { name: 'Moonlight', desc: 'Luminous platinum & white gold' },
    { name: 'Daylight', desc: 'Contemporary flex luxury' },
    { name: 'Sunlight', desc: 'Radiant 18K & 22K gold warmth' },
    { name: 'Firelight', desc: 'Burmese rubies & hand-fired enamel' }
  ];

  const currencies: { code: Currency; label: string }[] = [
    { code: 'INR', label: 'INR (₹)' },
    { code: 'AED', label: 'AED (Dhs.)' },
    { code: 'USD', label: 'USD ($)' },
    { code: 'GBP', label: 'GBP (£)' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-black/40 backdrop-blur-xl border-b border-white/10 text-white transition-all shadow-md">
      
      {/* Top Announcement Bar - Hidden on mobile view, visible on desktop view */}
      <div className="hidden md:block bg-black/30 backdrop-blur-md text-[#FAF9F6] text-[11px] py-2 px-4 sm:px-6 border-b border-white/5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          
          {/* Left: Store Visit helper */}
          <div className="hidden md:flex items-center space-x-3 text-[#E8DFD0] shrink-0">
            <button
              onClick={onBookAppointment}
              className="relative overflow-hidden group hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer py-0.5"
            >
              <Calendar className="w-3.5 h-3.5 text-[#C9A86A] group-hover:scale-110 transition-transform" />
              <span className="font-light tracking-wide">Book a Store Visit</span>
            </button>
            <span className="text-white/20">•</span>
            <span className="text-white/70 font-light">Flagship: Meena Bazaar, Dubai</span>
          </div>

          {/* Center: Main announcement statement - No overlap with clean tracking */}
          <div className="flex-1 text-center font-sans tracking-wide uppercase text-[10px] sm:text-[11px] text-[#FAF9F6]/90 min-w-0 px-2 truncate sm:whitespace-normal">
            <span>A Statement of Pure Elegance · Crafted to shine with you, wherever life takes you</span>
          </div>

          {/* Right: Currency switcher & Certificate lookup */}
          <div className="hidden sm:flex items-center space-x-3 text-[#E8DFD0] shrink-0">
            <button
              onClick={onOpenCertVerify}
              className="relative overflow-hidden group hover:text-white transition-colors flex items-center gap-1.5 text-[10px] uppercase tracking-wide cursor-pointer py-0.5"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#C9A86A] group-hover:scale-110 transition-transform" />
              <span>Verify Vault</span>
            </button>

            <span className="text-white/20">|</span>

            {/* Currency Picker */}
            <div className="relative">
              <button
                onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
                className="flex items-center gap-1 text-[10px] uppercase tracking-wide text-white hover:text-[#C9A86A] transition-colors py-0.5 cursor-pointer"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>{currency}</span>
                <ChevronDown className="w-2.5 h-2.5" />
              </button>

              <AnimatePresence>
                {currencyDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="absolute right-0 top-full mt-1 bg-[#1A1816]/95 backdrop-blur-xl text-white border border-[#C9A86A]/30 rounded-xs shadow-2xl py-1 min-w-[120px] z-50"
                  >
                    {currencies.map(c => (
                      <button
                        key={c.code}
                        onClick={() => {
                          handleCurrencySelect(c.code);
                          setCurrencyDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-1.5 text-xs hover:bg-white/10 transition-colors flex items-center justify-between cursor-pointer ${
                          currency === c.code ? 'text-[#C9A86A] font-medium' : 'text-[#E8DFD0]'
                        }`}
                      >
                        <span>{c.code}</span>
                        <span className="text-[10px] text-white/50">{c.label.split(' ')[1]}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>

      {/* Main Transparent Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 sm:h-20 gap-4">
          
          {/* Mobile Menu Hamburger */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-white hover:text-[#C9A86A] transition-colors cursor-pointer"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Left Nav Menu Links - Desktop with Animated Hovers and Balanced Letter Spacing */}
          <nav className="hidden lg:flex items-center space-x-5 xl:space-x-7 text-[11px] uppercase tracking-wide font-normal text-white/80 shrink-0">
            
            {/* Shop Dropdown */}
            <div
              className="relative py-4"
              onMouseEnter={() => setShopDropdownOpen(true)}
              onMouseLeave={() => setShopDropdownOpen(false)}
            >
              <button
                onClick={() => {
                  onSelectCategory('All');
                  onScrollToSection('catalog-section');
                }}
                className={`relative group inline-flex items-center gap-1 hover:text-white transition-colors cursor-pointer py-1 ${
                  selectedCategory !== 'All' ? 'text-[#E6CA85] font-medium' : ''
                }`}
              >
                <span>Shop</span>
                <ChevronDown className="w-3 h-3 text-[#C9A86A] transform group-hover:rotate-180 transition-transform duration-300" />
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#C9A86A] group-hover:w-full transition-all duration-300" />
              </button>

              <AnimatePresence>
                {shopDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="absolute top-full left-0 w-56 bg-[#181614]/95 backdrop-blur-xl border border-[#C9A86A]/40 rounded-xs shadow-2xl py-2 z-50"
                  >
                    {categories.map(cat => (
                      <button
                        key={cat.value}
                        onClick={() => {
                          onSelectCategory(cat.value);
                          setShopDropdownOpen(false);
                          onScrollToSection('catalog-section');
                        }}
                        className={`w-full text-left px-4 py-2 text-xs uppercase tracking-wide hover:bg-white/10 transition-colors cursor-pointer ${
                          selectedCategory === cat.value ? 'text-[#E6CA85] font-medium bg-white/5' : 'text-[#FAF9F6]'
                        }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Collections Dropdown */}
            <div
              className="relative py-4"
              onMouseEnter={() => setCollectionsDropdownOpen(true)}
              onMouseLeave={() => setCollectionsDropdownOpen(false)}
            >
              <button
                onClick={() => onScrollToSection('collections-section')}
                className="relative group inline-flex items-center gap-1 hover:text-white transition-colors cursor-pointer py-1"
              >
                <span>Collections</span>
                <ChevronDown className="w-3 h-3 text-[#C9A86A] transform group-hover:rotate-180 transition-transform duration-300" />
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#C9A86A] group-hover:w-full transition-all duration-300" />
              </button>

              <AnimatePresence>
                {collectionsDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="absolute top-full left-0 w-64 bg-[#181614]/95 backdrop-blur-xl border border-[#C9A86A]/40 rounded-xs shadow-2xl py-2 z-50"
                  >
                    {collections.map(col => (
                      <button
                        key={col.name}
                        onClick={() => {
                          onSelectCollection(col.name);
                          setCollectionsDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-white/10 transition-colors group cursor-pointer"
                      >
                        <span className="block text-xs uppercase tracking-wide text-[#FAF9F6] group-hover:text-[#E6CA85] font-medium">
                          {col.name}
                        </span>
                        <span className="block text-[10px] text-[#A89F91] font-light">
                          {col.desc}
                        </span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Bestsellers */}
            <button
              onClick={() => onScrollToSection('bestsellers-section')}
              className="relative group hover:text-white transition-colors py-1 cursor-pointer"
            >
              <span>Bestsellers</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#C9A86A] group-hover:w-full transition-all duration-300" />
            </button>

            {/* Visit Store */}
            <button
              onClick={onBookAppointment}
              className="relative group hover:text-white transition-colors py-1 cursor-pointer"
            >
              <span>Visit Store</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#C9A86A] group-hover:w-full transition-all duration-300" />
            </button>

            {/* Stories */}
            <button
              onClick={() => onScrollToSection('stories-section')}
              className="relative group hover:text-white transition-colors py-1 cursor-pointer"
            >
              <span>Stories</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#C9A86A] group-hover:w-full transition-all duration-300" />
            </button>
          </nav>

          {/* Brand Logo - SUBHA Jewellery */}
          <div className="flex-1 lg:flex-none text-center">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onSelectCategory('All');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-block group py-1 select-none"
            >
              <span className="font-serif text-2xl sm:text-3xl lg:text-4xl tracking-[0.06em] text-[#FAF9F6] uppercase font-medium group-hover:text-[#E6CA85] transition-colors block">
                SUBHA
              </span>
              <span className="block text-[9px] tracking-[0.16em] text-[#C9A86A] uppercase font-sans font-light -mt-0.5">
                Jewellery
              </span>
            </a>
          </div>

          {/* Right Action Icons - Aesthetic, Animated, No Overlap */}
          <div className="flex items-center space-x-1.5 sm:space-x-3 text-white shrink-0">
            
            {/* Search Button */}
            <button
              onClick={onOpenSearch}
              className="relative overflow-hidden group p-2 text-white hover:text-[#E6CA85] hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer rounded-full hover:bg-white/10"
              title="Search Catalog"
              aria-label="Search Catalog"
            >
              <Search className="w-4.5 h-4.5 sm:w-5 sm:h-5" strokeWidth={1.5} />
            </button>

            {/* Wishlist Button with Counter */}
            <button
              onClick={onOpenWishlist}
              className="relative overflow-hidden group p-2 text-white hover:text-[#E6CA85] hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer rounded-full hover:bg-white/10"
              title="Wishlist"
              aria-label="Wishlist"
            >
              <Heart className="w-4.5 h-4.5 sm:w-5 sm:h-5 group-hover:fill-[#E6CA85] transition-colors" strokeWidth={1.5} />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#C9A86A] text-[#141210] text-[9px] font-bold rounded-full flex items-center justify-center animate-pulse">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Shopping Bag Button */}
            <button
              onClick={onOpenCart}
              className="relative overflow-hidden group p-2 text-white hover:text-[#E6CA85] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer rounded-full hover:bg-white/10 flex items-center gap-1.5"
              title="Cart"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-4.5 h-4.5 sm:w-5 sm:h-5" strokeWidth={1.5} />
              <span className="hidden xl:inline text-[11px] uppercase tracking-wide font-light text-[#E8DFD0]">
                Cart ({cartCount})
              </span>
              {cartCount > 0 && (
                <span className="xl:hidden absolute top-1 right-1 w-4 h-4 bg-[#FAF9F6] text-[#141210] text-[9px] font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Admin Toggle - Luxury Button */}
            <button
              onClick={onToggleAdmin}
              className={`relative overflow-hidden group flex items-center gap-1 px-3 py-1.5 rounded-xs text-[10px] font-sans tracking-wide uppercase transition-all duration-300 border cursor-pointer ${
                isAdminOpen
                  ? 'bg-gradient-to-r from-[#C9A86A] to-[#DFC285] text-[#141210] border-[#C9A86A] shadow-[0_0_15px_rgba(201,168,106,0.5)]'
                  : 'bg-white/10 text-white/90 border-white/20 hover:border-[#C9A86A] hover:bg-white/15 hover:text-[#E6CA85]'
              }`}
              title="Admin Inventory Portal"
            >
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500 bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />
              <LayoutDashboard className="w-3 h-3 text-[#C9A86A]" />
              <span className="hidden sm:inline font-medium">
                {isAdminOpen ? 'Close' : 'Admin'}
              </span>
            </button>

          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#141210]/98 backdrop-blur-2xl border-b border-[#C9A86A]/40 text-white overflow-hidden"
          >
            <div className="px-6 py-6 space-y-4">
              <div className="border-b border-white/10 pb-3">
                <span className="text-[10px] uppercase tracking-wider text-[#C9A86A] font-semibold block mb-2">
                  Shop Categories
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat.value}
                      onClick={() => {
                        onSelectCategory(cat.value);
                        setMobileMenuOpen(false);
                        onScrollToSection('catalog-section');
                      }}
                      className="text-left py-1 text-xs uppercase tracking-wide text-[#E8DFD0] hover:text-[#E6CA85] transition-colors cursor-pointer"
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2 pt-1">
                <button
                  onClick={() => {
                    onScrollToSection('bestsellers-section');
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left py-1.5 text-xs uppercase tracking-wide text-white hover:text-[#E6CA85] cursor-pointer"
                >
                  Bestsellers
                </button>
                <button
                  onClick={() => {
                    onScrollToSection('collections-section');
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left py-1.5 text-xs uppercase tracking-wide text-white hover:text-[#E6CA85] cursor-pointer"
                >
                  Collections
                </button>
                <button
                  onClick={() => {
                    onBookAppointment();
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left py-1.5 text-xs uppercase tracking-wide text-[#E6CA85] font-medium cursor-pointer"
                >
                  Book Boutique Consultation
                </button>
                <button
                  onClick={() => {
                    onOpenCertVerify();
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left py-1.5 text-xs uppercase tracking-wide text-white/90 hover:text-[#E6CA85] cursor-pointer"
                >
                  Verify BIS Vault Certificate
                </button>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-[#E8DFD0]">
                <span>Currency</span>
                <div className="flex items-center gap-2">
                  {currencies.map((c) => (
                    <button
                      key={c.code}
                      onClick={() => handleCurrencySelect(c.code)}
                      className={`px-2 py-0.5 text-[10px] rounded-xs cursor-pointer ${
                        currency === c.code ? 'bg-[#C9A86A] text-black font-bold' : 'bg-white/10 text-white'
                      }`}
                    >
                      {c.code}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </header>
  );
};
