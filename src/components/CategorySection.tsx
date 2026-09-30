import React from 'react';
import { motion } from 'motion/react';
import { Category } from '../types';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Card3DTilt } from './Card3DTilt';

interface CategorySectionProps {
  onSelectCategory: (category: Category) => void;
}

export const CategorySection: React.FC<CategorySectionProps> = ({ onSelectCategory }) => {
  const categories = [
    {
      id: 'rings',
      name: 'Rings',
      buttonText: 'Shop Rings',
      category: 'Rings' as Category,
      image: 'https://www.kiarajewellers.com/cdn/shop/files/DRN000045-Diamond_cascade_2_f1b489ac-9b59-4037-84bb-16e7ab18886a.jpg',
      tagline: 'Solitaires, multi-diamond clusters & eternity bands'
    },
    {
      id: 'necklaces',
      name: 'Necklaces',
      buttonText: 'Shop Necklaces',
      category: 'Necklaces' as Category,
      image: 'https://www.kiarajewellers.com/cdn/shop/files/Chic_Tassel-_Sunlight_M_2_8043058a-ddbd-44f1-8046-196d782971bf.jpg',
      tagline: 'Fluid gold tassels, diamond collars & pendants'
    },
    {
      id: 'bracelets',
      name: 'Bracelets',
      buttonText: 'Shop Bracelets',
      category: 'Bracelets' as Category,
      image: 'https://www.kiarajewellers.com/cdn/shop/files/ScarletMajesty-bracelet-Daylight_4.jpg',
      tagline: 'Articulated flex cuffs, hinged bangles & tennis designs'
    },
    {
      id: 'earrings',
      name: 'Earrings',
      buttonText: 'Shop Earrings',
      category: 'Earrings' as Category,
      image: 'https://cdn.shopify.com/s/files/1/0694/7084/7210/files/JOY09731_4x3_9d702747-ec60-41eb-9cd8-bc2e838f455a.jpg',
      tagline: 'Golden fans, linear diamond drops & royal studs'
    }
  ];

  return (
    <section id="categories-section" className="py-20 sm:py-28 bg-[#FFFFFF] border-b border-[#EAE4D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-18">
          <span className="text-xs uppercase tracking-wide text-[#9B7D44] font-medium block mb-2">
            Categories
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1C1917] font-normal tracking-tight mb-4">
            Shop by Category
          </h2>
          <p className="text-sm sm:text-base text-[#6B6152] font-sans font-light">
            Every creation is individually hallmarked and finished to mirror-perfection in our atelier.
          </p>
        </div>

        {/* 4 Cards Grid with 3D Spatial Tilt - 2 cols on mobile, 4 on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <Card3DTilt maxTilt={10} scale={1.03}>
                <div
                  onClick={() => onSelectCategory(cat.category)}
                  className="group cursor-pointer bg-[#FAF9F6] border border-[#EAE4D9] rounded-xs overflow-hidden flex flex-col justify-between hover:border-[#C9A86A] hover:shadow-xl transition-all duration-300 h-full"
                >
                  {/* Image Aspect */}
                  <div className="relative aspect-[3/4] overflow-hidden bg-[#F2ECE1]">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 filter contrast-[1.02]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    
                    {/* Overlay Text */}
                    <div className="absolute bottom-2.5 inset-x-2.5 sm:bottom-4 sm:inset-x-4 text-white">
                      <h3 className="font-serif text-lg sm:text-2xl text-white font-normal mb-0.5 sm:mb-1">
                        {cat.name}
                      </h3>
                      <p className="text-[10px] sm:text-[11px] text-white/85 font-light line-clamp-1">
                        {cat.tagline}
                      </p>
                    </div>
                  </div>

                  {/* Aesthetic Animated Action Button Bar */}
                  <div className="relative overflow-hidden p-2.5 sm:p-4 bg-white border-t border-[#EAE4D9] flex items-center justify-between text-[10px] sm:text-xs tracking-wide uppercase font-semibold text-[#1C1917] group-hover:bg-[#1C1917] group-hover:text-[#C9A86A] transition-all duration-300">
                    <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-[#C9A86A]/20 to-transparent pointer-events-none" />
                    <span className="relative z-10">{cat.buttonText}</span>
                    <ArrowRight className="relative z-10 w-3.5 h-3.5 sm:w-4 sm:h-4 transform group-hover:translate-x-1.5 transition-transform text-[#C9A86A]" />
                  </div>
                </div>
              </Card3DTilt>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
