import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, MapPin, Calendar, Gift, ShieldCheck, Sparkles } from 'lucide-react';

interface EditorialBentoProps {
  onBookAppointment: () => void;
  onExploreGifts: () => void;
  onExploreStores: () => void;
}

export const EditorialBento: React.FC<EditorialBentoProps> = ({
  onBookAppointment,
  onExploreGifts,
  onExploreStores
}) => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* 2x2 Bento Grid exactly matching reference layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        
        {/* Block 1: Our Store Text */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="bg-[#F5EFE6] p-6 sm:p-12 lg:p-14 rounded-sm border border-[#E3DBD0] flex flex-col justify-center shadow-sm"
        >
          <div className="flex items-center gap-2 text-[#9B7D44] text-xs uppercase tracking-[0.25em] font-medium mb-4">
            <MapPin className="w-4 h-4" />
            <span>Jewellery Stores</span>
          </div>
          
          <h3 className="font-serif text-2xl sm:text-4xl text-[#1E1B18] font-normal tracking-wide mb-3 sm:mb-4">
            Our Jewellery Stores
          </h3>

          <p className="text-xs sm:text-sm text-[#736B5F] leading-relaxed mb-6 sm:mb-8 max-w-md">
            Our favorite spaces to shop, stack, and stay a while. Experience private viewing suites at our flagship jewellery stores in Mumbai (Kala Ghoda & Lower Parel), New Delhi (DLF Emporio), Bengaluru (UB City), and Jaipur (Johari Bazaar).
          </p>

          <div>
            <button
              id="bento-visit-stores-btn"
              onClick={onExploreStores}
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-[#1E1B18] hover:text-[#9B7D44] group transition-colors"
            >
              <span>Visit Our Jewellery Stores</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </button>
          </div>
        </motion.div>

        {/* Block 2: Our Store Architecture Image */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="group relative rounded-sm overflow-hidden min-h-[320px] aspect-[4/3] bg-[#EAE2D5] shadow-sm"
        >
          <img
            src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1200&auto=format&fit=crop"
            alt="Subha Luxury Jewellery Store Interior"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center filter brightness-95 group-hover:scale-105 transition-transform duration-700 ease-out"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <span className="absolute bottom-4 left-4 text-[11px] tracking-widest uppercase font-mono text-white/90 opacity-0 group-hover:opacity-100 transition-opacity">
            Mumbai Flagship Jewellery Store
          </span>
        </motion.div>

        {/* Block 3: Gold Wrist Bracelet and Heirloom Rings */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="group relative rounded-sm overflow-hidden min-h-[320px] aspect-[4/3] bg-[#EAE2D5] shadow-sm"
        >
          <img
            src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1200&auto=format&fit=crop"
            alt="Gold Wrist Bracelet and Heirloom Rings"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center filter brightness-95 group-hover:scale-105 transition-transform duration-700 ease-out"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <span className="absolute bottom-4 left-4 text-[11px] tracking-widest uppercase font-mono text-white/90 opacity-0 group-hover:opacity-100 transition-opacity">
            Gold Wrist Bracelet & Heirloom Rings
          </span>
        </motion.div>

        {/* Block 4: Book an Appointment Text */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-[#F5EFE6] p-6 sm:p-12 lg:p-14 rounded-sm border border-[#E3DBD0] flex flex-col justify-center shadow-sm"
        >
          <div className="flex items-center gap-2 text-[#9B7D44] text-xs uppercase tracking-[0.25em] font-medium mb-4">
            <Calendar className="w-4 h-4" />
            <span>Private Consultations</span>
          </div>

          <h3 className="font-serif text-2xl sm:text-4xl text-[#1E1B18] font-normal tracking-wide mb-3 sm:mb-4">
            Book an Appointment
          </h3>

          <p className="text-xs sm:text-sm text-[#736B5F] leading-relaxed mb-6 sm:mb-8 max-w-md">
            Master the art of milestone gifting with a one-on-one in-store or virtual appointment guided by a senior client advisor and gemologist.
          </p>

          <div>
            <button
              id="bento-book-appointment-btn"
              onClick={onBookAppointment}
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-[#1E1B18] hover:text-[#9B7D44] group transition-colors"
            >
              <span>Book an Appointment</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </button>
          </div>
        </motion.div>

        {/* Block 5: For Someone You Love Text */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="bg-[#FAF8F5] p-6 sm:p-12 lg:p-14 rounded-sm border border-[#E3DBD0] flex flex-col justify-center shadow-sm"
        >
          <div className="flex items-center gap-2 text-[#9B7D44] text-xs uppercase tracking-[0.25em] font-medium mb-4">
            <Gift className="w-4 h-4" />
            <span>Curated Gifting</span>
          </div>

          <h3 className="font-serif text-2xl sm:text-4xl text-[#1E1B18] font-normal tracking-wide mb-3 sm:mb-4">
            For Someone You Love
          </h3>

          <p className="text-xs sm:text-sm text-[#736B5F] leading-relaxed mb-6 sm:mb-8 max-w-md">
            Gift guides for your beloved one, and timeless heirlooms to mark engagements, anniversaries, and grand celebratory chapters.
          </p>

          <div>
            <button
              id="bento-gift-guide-btn"
              onClick={onExploreGifts}
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-[#1E1B18] hover:text-[#9B7D44] group transition-colors"
            >
              <span>Explore Gift Guide</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </button>
          </div>
        </motion.div>

        {/* Block 6: 22K Solid Gold Bangles */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="group relative rounded-sm overflow-hidden min-h-[320px] aspect-[4/3] bg-[#EAE2D5] shadow-sm"
        >
          <img
            src="https://images.unsplash.com/photo-1611652022419-a9419f74343d?q=80&w=1200&auto=format&fit=crop"
            alt="22K Solid Gold Bangles"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center filter brightness-95 group-hover:scale-105 transition-transform duration-700 ease-out"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <span className="absolute bottom-4 left-4 text-[11px] tracking-widest uppercase font-mono text-white/90 opacity-0 group-hover:opacity-100 transition-opacity">
            22K Solid Gold Bangles
          </span>
        </motion.div>

      </div>

      {/* Full-width Black & White Editorial Banner matching reference bottom portrait */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.8 }}
        className="mt-12 relative rounded-sm overflow-hidden bg-[#141210] text-[#FAF8F5] border border-[#2E2924]"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
          
          <div className="lg:col-span-7 h-[360px] sm:h-[460px] relative">
            <img
              src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1400&auto=format&fit=crop"
              alt="Artisanal Diamond Model Portrait"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center filter grayscale contrast-125 brightness-90"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#141210] hidden lg:block" />
          </div>

          <div className="lg:col-span-5 p-8 sm:p-12 lg:p-14 flex flex-col justify-center">
            <div className="flex items-center gap-2 text-[#C9A86A] text-xs uppercase tracking-[0.25em] font-medium mb-4">
              <ShieldCheck className="w-4 h-4" />
              <span>Purity & Provenance</span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#FAF8F5] font-light leading-snug mb-6">
              Every Subha jewel bears an indelible legacy.
            </h3>

            <p className="text-xs sm:text-sm text-[#C5BCAD] leading-relaxed font-light mb-8">
              Stenciled with the official Bureau of Indian Standards (BIS) Hallmark and accompanied by our tamper-proof Digital Vault Certificate, our creations guarantee verified gold purity and ethically sourced natural diamonds for generations to come.
            </p>

            <div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onBookAppointment}
                className="px-6 py-3.5 bg-[#FAF8F5] text-[#1E1B18] text-xs uppercase tracking-[0.2em] font-semibold hover:bg-[#C9A86A] transition-colors shadow"
              >
                Inquire with a Gemologist
              </motion.button>
            </div>
          </div>

        </div>
      </motion.div>

    </section>
  );
};
