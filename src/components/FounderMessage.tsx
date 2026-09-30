import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Quote, Award } from 'lucide-react';
import { Card3DTilt } from './Card3DTilt';

export const FounderMessage: React.FC = () => {
  return (
    <section className="py-20 sm:py-28 bg-[#FAF9F6] border-b border-[#EAE4D9] relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 sm:px-8">
        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-16">
          
          {/* Founder Portrait / Atelier Image with 3D Spatial Tilt */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full md:w-5/12 max-w-sm shrink-0"
          >
            <Card3DTilt maxTilt={10} scale={1.03}>
              <div className="relative">
                {/* Refined Frame Border */}
                <div className="aspect-[3/4] overflow-hidden rounded-xs bg-[#EFECE6] shadow-2xl relative">
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1200&auto=format&fit=crop"
                    alt="Sonal Panday — Founder, Subha Jewellery"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top filter contrast-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <p className="font-serif text-lg tracking-wide">Sonal Panday</p>
                    <p className="text-[10px] tracking-[0.22em] uppercase text-white/80 font-sans">
                      Chairwoman & Founder — Subha Jewellery
                    </p>
                  </div>
                </div>
                {/* Architectural gold accent outline */}
                <div className="absolute -bottom-3 -right-3 w-full h-full border border-[#C9A86A]/50 rounded-xs -z-10 pointer-events-none" />
              </div>
            </Card3DTilt>
          </motion.div>

          {/* Vision Statement & Quote */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full md:w-7/12"
          >
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#9B7D44] font-medium mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#C9A86A]" />
              <span>Philosophy & Craft</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#1C1917] font-normal leading-snug mb-6">
              "Jewellery is at its best when it means something."
            </h2>

            <div className="space-y-4 text-[#4A453E] text-sm sm:text-base leading-relaxed font-sans font-normal">
              <p>
                Long after trends change and occasions pass, the pieces we hold onto are the ones connected to memories, people, and moments that matter.
              </p>
              <p className="text-[#38332C]">
                That belief is woven into <strong className="font-semibold text-[#1C1917]">Subha</strong>. Every piece is created with care, not just to be worn, but to become a small part of your journey. Something familiar, meaningful, and lasting—something you reach for because of how it makes you feel.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-[#EAE4D9] flex items-center justify-between">
              <div>
                <p className="font-serif italic text-lg text-[#1C1917]">Sonal Panday</p>
                <p className="text-xs uppercase tracking-[0.2em] text-[#7A7165]">
                  Chairwoman, Founder — Subha Jewellery
                </p>
              </div>

              {/* 3D Gold Monogram Seal */}
              <motion.div
                whileHover={{ rotate: 180, scale: 1.1 }}
                transition={{ duration: 0.6 }}
                className="w-14 h-14 rounded-full border-2 border-[#C9A86A] flex flex-col items-center justify-center text-xs font-serif text-[#9B7D44] tracking-widest bg-white shadow-md cursor-pointer"
              >
                <span className="font-bold text-sm">SJ</span>
                <span className="text-[8px] tracking-tighter text-[#A89F91]">VAULT</span>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
