import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Calendar, X, Sparkles } from 'lucide-react';
import { Card3DTilt } from './Card3DTilt';

export const EditorialStories: React.FC = () => {
  const [activeStory, setActiveStory] = useState<{
    title: string;
    date: string;
    author: string;
    category: string;
    image: string;
    snippet: string;
    content: string[];
  } | null>(null);

  const stories = [
    {
      title: 'Subha Jewellery Unveils Gold Savings Plan',
      date: 'Mar 23, 2026',
      author: 'Ada Panday',
      category: 'Wealth & Investment',
      image: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?q=80&w=1200&auto=format&fit=crop',
      snippet: 'Introducing a modern, high-yield gold accumulation plan designed to make pure 22K and 18K gold ownership seamless, transparent, and rewarding.',
      content: [
        'Subha Jewellery today officially launched its anticipated "Swarna Sanchay" Gold Savings Plan, allowing patrons to build long-term gold reserves with zero making charge penalties upon maturity and an exclusive 12th-month bonus contribution from the brand.',
        'With gold continuing its ascent as both a cultural cornerstone and an inflation-resistant hedge, Subha’s new plan pairs physical allocation with digital vault tracking through our certified blockchain register.',
        'Members can redeem their saved grams for any fine gold piece or bespoke diamond bridal suite at our Dubai and Indian boutiques, or have physical hallmarked coins securely delivered to their doorsteps.'
      ]
    },
    {
      title: 'Ada Panday Showcases Subha at 56th Jewellery Show Sharjah',
      date: 'Mar 19, 2026',
      author: 'Editorial Desk',
      category: 'Exhibitions & Runways',
      image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1200&auto=format&fit=crop',
      snippet: 'The Middle East Watch & Jewellery Show hosted Subha’s celestial Starlight and Firelight suites to an audience of international collectors and royal patrons.',
      content: [
        'At the 56th edition of the MidEast Watch & Jewellery Show in Expo Centre Sharjah, Subha Jewellery commanded center stage with an avant-garde pavilion conceived around the interplay of sunlight and diamond refractions.',
        'Creative Director Ada Panday unveiled the one-of-a-kind "Solar Eclipse" necklace—an arresting cascade of D-color flawless diamonds centered by a 14.5-carat fancy intense yellow diamond.',
        '"Our mission at Subha has always been grounded in honouring antique goldsmithing traditions while stripping away ornamental heaviness in favor of fluid, kinetic silhouettes that can be worn effortlessly every day," said Ada Panday during the inaugural address.'
      ]
    },
    {
      title: 'Subha Jewellery Opens 20M Flagship Store in Meena Bazaar Dubai',
      date: 'Feb 28, 2026',
      author: 'Retail Bureau',
      category: 'Boutique Expansion',
      image: 'https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=1200&auto=format&fit=crop',
      snippet: 'Spanning three floors of Italian travertine, private bridal salons, and an open gemological grading lab in the historic heart of Dubai’s gold quarter.',
      content: [
        'Subha Jewellery has unveiled its multimillion-dollar flagship boutique located on Cosmos Lane in Meena Bazaar, Dubai. The new architectural landmark blends warm walnut timber, hand-applied gold leaf ceilings, and whisper-quiet VIP viewing suites.',
        'Clients can meet one-on-one with certified in-house gemologists, inspect loose GIA diamonds under 100x binocular microscopy, and participate in custom 3D CAD modeling of custom heirlooms in real time.',
        'The opening marks a pivotal milestone in Subha’s global retail roadmap, bridging heritage craftsmanship with state-of-the-art client privacy.'
      ]
    },
    {
      title: 'Lara Dutta Inaugurates Subha Jewellery in Dubai',
      date: 'Jan 14, 2026',
      author: 'Special Correspondent',
      category: 'Gala & Heritage',
      image: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?q=80&w=1200&auto=format&fit=crop',
      snippet: 'Former Miss Universe and celebrated icon Lara Dutta lit the ceremonial golden lamp alongside founder Sonal Panday at a star-studded gala celebration.',
      content: [
        'Amidst an intimate gathering of diplomats, patrons, and jewelry connoisseurs, Lara Dutta inaugurated Subha Jewellery’s flagship presence in the United Arab Emirates.',
        'Wearing the handcrafted "Sunlight Chic Tassel" 18K suite, Dutta remarked: "There is an effortless honesty in the way Subha treats gold. It doesn’t scream; it glows with dignity and quiet luxury that transitions from a daylight boardroom to an evening soiree."',
        'The evening concluded with an exclusive preview of the Moonlight Diamond Collection, featuring ethically sourced, conflict-free natural diamonds.'
      ]
    }
  ];

  return (
    <section id="stories-section" className="py-20 sm:py-28 bg-[#FFFFFF] border-b border-[#EAE4D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-18">
          <span className="text-xs uppercase tracking-wide text-[#9B7D44] font-medium block mb-2">
            Our Stories
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1C1917] font-normal tracking-tight mb-4">
            Where Every Piece Tells a Story
          </h2>
          <p className="text-sm sm:text-base text-[#6B6152] font-sans font-light">
            Crafted to be worn, admired, and remembered, jewelry that becomes part of your legacy.
          </p>
        </div>

        {/* Stories Grid with 3D Spatial Parallax */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stories.map((story, idx) => (
            <motion.article
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <Card3DTilt maxTilt={8} scale={1.02}>
                <div
                  onClick={() => setActiveStory(story)}
                  className="group cursor-pointer bg-[#FAF9F6] border border-[#EAE4D9] rounded-xs overflow-hidden flex flex-col justify-between hover:border-[#C9A86A] hover:shadow-xl transition-all duration-300 h-full"
                >
                  {/* Image */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#EFECE6]">
                    <img
                      src={story.image}
                      alt={story.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 filter contrast-[1.03]"
                    />
                    <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-xs bg-black/60 backdrop-blur-sm text-[9px] uppercase tracking-wide text-white font-medium">
                      {story.category}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 flex flex-col flex-grow justify-between min-w-0">
                    <div>
                      <div className="flex items-center gap-3 text-[10px] text-[#8C8273] font-light mb-2">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-[#C9A86A]" />
                          {story.date}
                        </span>
                        <span>•</span>
                        <span>{story.author}</span>
                      </div>

                      <h3 className="font-serif text-lg text-[#1C1917] font-normal leading-snug mb-2 group-hover:text-[#9B7D44] transition-colors line-clamp-2 break-words">
                        {story.title}
                      </h3>

                      <p className="text-xs text-[#665D50] font-light line-clamp-3 leading-relaxed mb-4">
                        {story.snippet}
                      </p>
                    </div>

                    {/* Aesthetic Animated Action Button Bar */}
                    <div className="relative overflow-hidden pt-3 border-t border-[#EAE4D9] flex items-center justify-between text-[11px] tracking-wide uppercase font-semibold text-[#1C1917] group-hover:text-[#9B7D44] transition-colors">
                      <span>Read Story</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-[#C9A86A]" />
                    </div>
                  </div>
                </div>
              </Card3DTilt>
            </motion.article>
          ))}
        </div>

      </div>

      {/* Story Detail Modal */}
      <AnimatePresence>
        {activeStory && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveStory(null)}
              className="fixed inset-0 bg-black/75 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative z-10 w-full max-w-3xl bg-[#FAF9F6] rounded-xs shadow-2xl border border-[#EAE4D9] my-auto overflow-hidden"
            >
              <button
                onClick={() => setActiveStory(null)}
                className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm text-[#1C1917] hover:bg-[#1C1917] hover:text-white flex items-center justify-center transition-all cursor-pointer hover:rotate-90"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="max-h-[85vh] overflow-y-auto">
                <div className="relative aspect-[21/9] w-full bg-[#EFECE6] overflow-hidden">
                  <img
                    src={activeStory.image}
                    alt={activeStory.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-6 right-6 text-white">
                    <span className="text-[10px] uppercase tracking-wide px-2.5 py-1 bg-[#C9A86A] text-[#141210] font-bold rounded-xs inline-block mb-2">
                      {activeStory.category}
                    </span>
                    <h2 className="font-serif text-2xl sm:text-3xl text-white font-normal leading-tight">
                      {activeStory.title}
                    </h2>
                  </div>
                </div>

                <div className="p-6 sm:p-8">
                  <div className="flex items-center gap-3 text-xs text-[#8C8273] font-light pb-4 mb-6 border-b border-[#EAE4D9]">
                    <span>Published: {activeStory.date}</span>
                    <span>•</span>
                    <span>By: {activeStory.author}</span>
                  </div>

                  <div className="space-y-4 text-sm text-[#4A453E] leading-relaxed font-sans font-light">
                    {activeStory.content.map((paragraph, pIdx) => (
                      <p key={pIdx}>{paragraph}</p>
                    ))}
                  </div>

                  <div className="mt-8 pt-6 border-t border-[#EAE4D9] flex justify-end">
                    <button
                      onClick={() => setActiveStory(null)}
                      className="relative overflow-hidden group px-6 py-2.5 bg-[#1C1917] text-white text-xs uppercase tracking-wide rounded-xs hover:bg-[#9B7D44] transition-all cursor-pointer font-semibold"
                    >
                      <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500 bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />
                      Close Story
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
