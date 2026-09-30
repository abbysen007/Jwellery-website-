import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Card3DTilt } from './Card3DTilt';

interface CollectionsSectionProps {
  onSelectCollection: (collection: string) => void;
}

export const CollectionsSection: React.FC<CollectionsSectionProps> = ({ onSelectCollection }) => {
  const collections = [
    {
      id: 'starlight',
      name: 'Starlight',
      subtitle: 'Multi-Diamond Pavé & Celestial Radiance',
      description: 'Reflecting cosmic brilliance with tiered multi-diamond cluster architecture that catches light from every angle.',
      image: 'https://www.kiarajewellers.com/cdn/shop/collections/Starlight_olay.png',
      badge: 'Signature Series'
    },
    {
      id: 'moonlight',
      name: 'Moonlight',
      subtitle: 'Luminous White Gold & Platinum Suites',
      description: 'Quiet grace rendered in rhodium-plated white gold, natural pearls, and liquid linear diamond cascades.',
      image: 'https://www.kiarajewellers.com/cdn/shop/collections/Moonlight_olay.png',
      badge: 'Haute Éclat'
    },
    {
      id: 'daylight',
      name: 'Daylight',
      subtitle: 'Contemporary Everyday Fine Luxury',
      description: 'Featherlight flex-spring bangles, contoured chains, and ergonomic cuffs crafted for the modern rhythm of life.',
      image: 'https://www.kiarajewellers.com/cdn/shop/files/ScarletMajesty-bracelet-Daylight_4.jpg',
      badge: 'Modern Essential'
    },
    {
      id: 'sunlight',
      name: 'Sunlight',
      subtitle: 'Warm 18K & 22K Golden Radiance',
      description: 'Fluted sunburst silhouettes, fluid golden tassels, and deep heritage golds forged with timeless warmth.',
      image: 'https://www.kiarajewellers.com/cdn/shop/files/Chic_Tassel-_Sunlight_M_2_8043058a-ddbd-44f1-8046-196d782971bf.jpg',
      badge: 'Solar Heritage'
    },
    {
      id: 'firelight',
      name: 'Firelight',
      subtitle: 'Hand-Fired Meenakari & Statement Gems',
      description: 'Intense Burmese rubies, hand-fired rose enamel, and rare syndicate diamonds sculpted for grand occasions.',
      image: 'https://cdn.shopify.com/s/files/1/0694/7084/7210/files/hf_20260915_093034_ce1b2d5f-b815-495b-9d88-9f03ace1631a.png',
      badge: 'Grand Statement'
    }
  ];

  return (
    <section id="collections-section" className="py-20 sm:py-28 bg-[#FFFFFF] border-b border-[#EAE4D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-18">
          <span className="text-xs uppercase tracking-wide text-[#9B7D44] font-medium block mb-2">
            Our Collections
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1C1917] font-normal tracking-tight mb-4">
            Crafted for Every Chapter
          </h2>
          <p className="text-sm sm:text-base text-[#6B6152] font-sans font-light">
            Discover jewellery designed to shine with you, illuminating each milestone with timeless artistry.
          </p>
        </div>

        {/* Collections Grid with 3D Spatial Parallax */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {collections.map((col, idx) => (
            <motion.div
              key={col.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className={idx === 0 ? 'md:col-span-2 lg:col-span-1' : ''}
            >
              <Card3DTilt maxTilt={8} scale={1.02}>
                <div
                  onClick={() => onSelectCollection(col.name)}
                  className="group cursor-pointer bg-[#FAF9F6] border border-[#EAE4D9] rounded-xs overflow-hidden flex flex-col justify-between hover:border-[#C9A86A] hover:shadow-xl transition-all duration-300 h-full"
                >
                  {/* Image Container */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F2EFE9]">
                    <img
                      src={col.image}
                      alt={`${col.name} Collection — Subha Jewellery`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 filter contrast-[1.02]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                    
                    {/* Badge */}
                    <div className="absolute top-3 left-3 text-[10px] tracking-wide uppercase font-medium text-white/95 bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded-xs">
                      {col.badge}
                    </div>
                  </div>

                  {/* Text Information */}
                  <div className="p-6 sm:p-7 flex flex-col flex-grow justify-between min-w-0">
                    <div>
                      <h3 className="font-serif text-2xl text-[#1C1917] font-normal mb-1.5 group-hover:text-[#9B7D44] transition-colors break-words">
                        {col.name}
                      </h3>
                      <p className="text-xs uppercase tracking-wide text-[#9B7D44] font-medium mb-3">
                        {col.subtitle}
                      </p>
                      <p className="text-xs sm:text-sm text-[#665D50] leading-relaxed mb-6 font-light">
                        {col.description}
                      </p>
                    </div>

                    {/* Explore Collection Action Link - Aesthetic & Animated */}
                    <div className="pt-4 border-t border-[#EAE4D9] flex items-center justify-between text-xs tracking-wide uppercase font-semibold text-[#1C1917] group-hover:text-[#9B7D44] transition-colors">
                      <span>Explore Collection</span>
                      <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform duration-300 text-[#C9A86A]" />
                    </div>
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
