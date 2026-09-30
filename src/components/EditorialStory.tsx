import React from 'react';
import { motion } from 'motion/react';
import { Award, Shield, Sparkles, Gem, Hammer, Eye, Flame } from 'lucide-react';

export const EditorialStory: React.FC = () => {
  const craftStages = [
    {
      step: '01',
      title: 'Chitrakari & Design',
      desc: 'Hand-rendered gouache sketches and wax masters cast to millimeter tolerances.',
      image: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=800&auto=format&fit=crop',
      icon: Sparkles
    },
    {
      step: '02',
      title: 'Shuddh Swarna Dhalai',
      desc: '100% BIS hallmarked 18K & 22K pure gold alloy fused in induction crucibles.',
      image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=800&auto=format&fit=crop',
      icon: Flame
    },
    {
      step: '03',
      title: 'Jadau & Gemstone Setting',
      desc: 'Natural certified diamonds and royal Polki set under 40x optics for flawless symmetry.',
      image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=800&auto=format&fit=crop',
      icon: Gem
    },
    {
      step: '04',
      title: 'BIS Laser Assay & Vault ID',
      desc: 'Government-certified laser hallmark inscription and cryptographic digital certificate.',
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=800&auto=format&fit=crop',
      icon: Award
    }
  ];

  return (
    <section className="bg-[#1C1A17] text-[#FAF8F5] py-24 my-12 border-y border-[#36322D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Editorial Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Inset Photography with Motion Floating Seal */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="aspect-[4/5] rounded-sm overflow-hidden shadow-2xl border border-[#3E3830] group">
                <img
                  src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1000&auto=format&fit=crop"
                  alt="Subha Atelier Goldsmithing"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center filter brightness-90 contrast-105 group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              </div>

              {/* Floating gold seal with gentle breathing animation */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-6 -right-6 bg-[#C9A86A] text-[#1C1A17] p-4 rounded-sm shadow-2xl flex items-center gap-3 border border-[#E6D7BD]"
              >
                <Award className="w-8 h-8 flex-shrink-0" />
                <div className="text-left">
                  <span className="block text-[10px] uppercase font-bold tracking-widest leading-tight">
                    BIS Certified
                  </span>
                  <span className="block text-xs font-serif italic text-[#1C1A17]">
                    Atelier Standard 1984
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Text Content matching reference image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 flex flex-col justify-center"
          >
            
            <div className="flex items-center gap-2 text-[#C9A86A] text-xs uppercase tracking-[0.25em] font-medium mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Philosophy & Craft</span>
            </div>

            <blockquote className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#FAF8F5] font-light leading-snug mb-8">
              “We believe the most beautiful things are worn closest to the skin, a philosophy that has guided Subha since its very beginning.”
            </blockquote>

            <div className="space-y-4 text-sm text-[#C5BCAD] leading-relaxed max-w-xl font-light">
              <p>
                From the drawing boards in our Dubai atelier to the master setting bench, every Subha creation is forged by hand with certified ethically sourced 18K and 22K gold. We marry architectural permanence with tactile comfort.
              </p>
              <p>
                Each diamond is individually verified under binocular magnification for optical symmetry and color saturation. Before leaving our vault, every piece receives its Bureau of Indian Standards (BIS) laser hallmark inscription and an immutable digital Certificate of Authenticity.
              </p>
            </div>

            {/* Credential Pillars */}
            <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-6 pt-8 border-t border-[#332E27]">
              <div>
                <span className="block font-serif text-2xl text-[#C9A86A]">100%</span>
                <span className="text-xs uppercase tracking-wider text-[#A89F91] mt-1 block">
                  BIS 750 / 916 Hallmarked
                </span>
              </div>
              <div>
                <span className="block font-serif text-2xl text-[#C9A86A]">IGI & GIA</span>
                <span className="text-xs uppercase tracking-wider text-[#A89F91] mt-1 block">
                  Graded Diamonds
                </span>
              </div>
              <div>
                <span className="block font-serif text-2xl text-[#C9A86A]">Lifetime</span>
                <span className="text-xs uppercase tracking-wider text-[#A89F91] mt-1 block">
                  Buyback & Vault Care
                </span>
              </div>
            </div>

          </motion.div>

        </div>

        {/* Filling empty space: The Four Pillars of Haute Joaillerie Craftsmanship Photographic Strip */}
        <div className="mt-24 pt-16 border-t border-[#36322D]">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-[#C9A86A] font-medium block mb-2">
                Atelier Method
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#FAF8F5] font-light">
                The Four Pillars of Subha Craftsmanship
              </h3>
            </div>
            <p className="mt-2 md:mt-0 text-xs text-[#A89F91] max-w-sm">
              An unwavering obsession with structural purity, optical brilliance, and certified authenticity.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {craftStages.map((stage, idx) => {
              const Icon = stage.icon;
              return (
                <motion.div
                  key={stage.step}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.6, delay: idx * 0.12 }}
                  whileHover={{ y: -6 }}
                  className="group bg-[#24211D] rounded-sm overflow-hidden border border-[#3A352D] hover:border-[#C9A86A]/60 transition-all duration-300 flex flex-col"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#1A1815]">
                    <img
                      src={stage.image}
                      alt={stage.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out filter brightness-90"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#24211D] via-transparent to-transparent" />
                    <span className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-[#1C1A17]/85 backdrop-blur-md px-1.5 sm:px-2 py-0.5 rounded text-[9px] sm:text-[10px] uppercase font-mono tracking-wider text-[#C9A86A] border border-[#C9A86A]/30">
                      Phase {stage.step}
                    </span>
                  </div>

                  <div className="p-3 sm:p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-1.5 sm:gap-2 mb-1 text-[#C9A86A]">
                        <Icon className="w-3.5 h-3.5 shrink-0" />
                        <h4 className="font-serif text-sm sm:text-lg text-[#FAF8F5] font-normal line-clamp-1">
                          {stage.title}
                        </h4>
                      </div>
                      <p className="text-[10px] sm:text-xs text-[#B5ABA0] font-light leading-relaxed line-clamp-2 sm:line-clamp-none">
                        {stage.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
