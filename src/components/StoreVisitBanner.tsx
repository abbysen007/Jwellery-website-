import React from 'react';
import { motion } from 'motion/react';
import { Calendar, ArrowRight, Sparkles } from 'lucide-react';

interface StoreVisitBannerProps {
  onBookVisit: () => void;
}

export const StoreVisitBanner: React.FC<StoreVisitBannerProps> = ({ onBookVisit }) => {
  return (
    <section className="relative py-20 sm:py-28 bg-[#181512] text-[#FAF9F6] overflow-hidden">
      {/* Subtle Background Ambience */}
      <div className="absolute inset-0 opacity-25">
        <img
          src="https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=2000&auto=format&fit=crop"
          alt="Subha Boutique Interior"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center filter contrast-[1.1]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#181512] via-[#181512]/90 to-[#181512]/80" />
      </div>

      <div className="relative max-w-5xl mx-auto px-6 sm:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#C9A86A] text-[10px] sm:text-xs uppercase tracking-wide font-medium mb-5 backdrop-blur-sm border border-white/10">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Flagship Boutiques</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#FAF9F6] font-normal tracking-tight mb-4">
          Where Every Piece Tells a Story
        </h2>

        <p className="font-serif italic text-base sm:text-xl text-[#D8CEBE] font-light max-w-2xl mx-auto mb-4 leading-relaxed">
          Crafted to be worn, admired, and remembered — jewelry that becomes part of your legacy.
        </p>

        <p className="text-xs sm:text-sm text-[#A89F91] tracking-wide uppercase font-light mb-10">
          Crafted with trust and light.
        </p>

        {/* Aesthetic Animated Action Button */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onBookVisit}
            className="relative overflow-hidden group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-[#C9A86A] via-[#DFC285] to-[#C9A86A] text-[#141210] text-xs uppercase tracking-wide font-bold hover:shadow-[0_4px_25px_rgba(201,168,106,0.45)] transition-all duration-300 min-w-[240px] rounded-xs cursor-pointer hover:scale-[1.03] active:scale-[0.98]"
          >
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />
            <Calendar className="w-4 h-4 mr-2.5" />
            <span>Book a Store Visit</span>
            <ArrowRight className="w-3.5 h-3.5 ml-2 transform group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Boutique Footprint */}
        <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <p className="text-xs uppercase tracking-wide text-[#C9A86A] font-medium mb-1">Dubai Flagship</p>
            <p className="text-[11px] text-[#A89F91] font-light">Meena Bazaar, Cosmos Lane</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-[#C9A86A] font-medium mb-1">Gold Souk</p>
            <p className="text-[11px] text-[#A89F91] font-light">Sikkat Al Khail, Deira</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-[#C9A86A] font-medium mb-1">Mumbai Atelier</p>
            <p className="text-[11px] text-[#A89F91] font-light">Waterfield Road, Bandra</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-[#C9A86A] font-medium mb-1">Delhi Boutique</p>
            <p className="text-[11px] text-[#A89F91] font-light">South Extension Part II</p>
          </div>
        </div>

      </div>
    </section>
  );
};
