import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Award, Mail, ArrowRight, Check, Instagram, Sparkles } from 'lucide-react';
import { Category } from '../types';

interface FooterProps {
  onSelectCategory: (cat: Category) => void;
  onSelectCollection?: (col: string) => void;
  onOpenCertVerify: () => void;
  onBookAppointment: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onSelectCollection = () => {},
  onOpenCertVerify,
  onBookAppointment,
}) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const galleryImages = [
    {
      img: 'https://www.kiarajewellers.com/cdn/shop/files/Chic_Tassel-_Sunlight_M_2_8043058a-ddbd-44f1-8046-196d782971bf.jpg',
      title: 'Sunlight Suite'
    },
    {
      img: 'https://www.kiarajewellers.com/cdn/shop/files/DRN000045-Diamond_cascade_2_f1b489ac-9b59-4037-84bb-16e7ab18886a.jpg',
      title: 'Starlight Pavé'
    },
    {
      img: 'https://www.kiarajewellers.com/cdn/shop/files/ScarletMajesty-bracelet-Daylight_4.jpg',
      title: 'Daylight Cuffs'
    },
    {
      img: 'https://cdn.shopify.com/s/files/1/0694/7084/7210/files/JOY09731_4x3_9d702747-ec60-41eb-9cd8-bc2e838f455a.jpg',
      title: 'Golden Fan Heirlooms'
    },
    {
      img: 'https://cdn.shopify.com/s/files/1/0694/7084/7210/files/hf_20260915_093034_ce1b2d5f-b815-495b-9d88-9f03ace1631a.png',
      title: 'Firelight Meenakari'
    },
    {
      img: 'https://cdn.shopify.com/s/files/1/0694/7084/7210/files/Joy9x16br.png',
      title: 'Moonlight Frost'
    }
  ];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
      setSubscribed(false);
    }, 4000);
  };

  return (
    <footer className="bg-[#FAF9F6] border-t border-[#EAE4D9] text-[#4A453E] pt-16 pb-12">
      
      {/* Visual Gallery Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="flex items-center justify-between mb-5 flex-wrap gap-2">
          <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-[#9B7D44] font-medium">
            <Instagram className="w-3.5 h-3.5" />
            <span>@SubhaJewellery Atelier</span>
          </div>
          <span className="text-[11px] text-[#8C8273] font-light hidden sm:inline">
            Follow our daily craftsmanship & private releases
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {galleryImages.map((item, idx) => (
            <div
              key={idx}
              className="group relative aspect-square overflow-hidden rounded-xs bg-[#EFECE6] border border-[#EAE4D9]"
            >
              <img
                src={item.img}
                alt={item.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 filter contrast-[1.02]"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-2 text-center">
                <span className="text-white text-[10px] uppercase tracking-wide font-medium">
                  {item.title}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 pb-16 border-b border-[#EAE4D9]">
        <div className="bg-white border border-[#EAE4D9] rounded-xs p-8 sm:p-12 text-center max-w-3xl mx-auto shadow-xs">
          <span className="text-xs uppercase tracking-wide text-[#9B7D44] font-medium block mb-2">
            The Subha Circle
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#1C1917] font-normal mb-3">
            Light, Delivered to Your Inbox
          </h3>
          <p className="text-xs sm:text-sm text-[#6B6152] font-sans font-light max-w-lg mx-auto mb-6">
            Receive private viewing invitations, bespoke releases, and jewellery care editorials directly from our Dubai atelier.
          </p>

          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-center justify-center gap-2 max-w-md mx-auto">
            <div className="relative w-full">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full pl-9 pr-4 py-3 bg-[#FAF9F6] border border-[#EAE4D9] rounded-xs text-xs text-[#1C1917] placeholder:text-[#9E9080] focus:outline-none focus:border-[#C9A86A]"
              />
              <Mail className="w-4 h-4 text-[#9E9080] absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
            <button
              type="submit"
              className="relative overflow-hidden group w-full sm:w-auto px-6 py-3 bg-[#1C1917] text-white text-xs uppercase tracking-wide font-medium hover:bg-[#9B7D44] transition-all duration-300 rounded-xs shrink-0 flex items-center justify-center gap-1.5 cursor-pointer shadow-sm hover:scale-[1.02] active:scale-[0.98]"
            >
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />
              {subscribed ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Subscribed</span>
                </>
              ) : (
                <>
                  <span>Join</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* 4 Main Footer Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Brand Info */}
          <div>
            <h4 className="font-serif text-2xl text-[#1C1917] tracking-wide uppercase mb-3">
              SUBHA
            </h4>
            <p className="text-xs uppercase tracking-wide text-[#9B7D44] font-medium mb-4">
              Where Elegance Finds Its Light
            </p>
            <p className="text-xs text-[#665D50] leading-relaxed font-light mb-5">
              Subha Jewellery crafts timeless gold and diamond creations that celebrate heritage, artistry, and modern elegance. Designed to inspire and endure across generations.
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={onOpenCertVerify}
                className="relative overflow-hidden group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xs border border-[#EAE4D9] bg-white text-[10px] uppercase tracking-wide text-[#1C1917] hover:border-[#C9A86A] transition-all duration-300 cursor-pointer hover:shadow-xs"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#C9A86A]" />
                <span>Verify Vault Certificate</span>
              </button>
            </div>
          </div>

          {/* Shop Categories */}
          <div>
            <h4 className="text-xs uppercase tracking-wide text-[#1C1917] font-semibold mb-4 pb-2 border-b border-[#EAE4D9]">
              Shop Creations
            </h4>
            <ul className="space-y-2.5 text-xs text-[#665D50]">
              <li>
                <button onClick={() => onSelectCategory('Rings')} className="hover:text-[#1C1917] transition-colors cursor-pointer">
                  Solitaire & Diamond Rings
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('Necklaces')} className="hover:text-[#1C1917] transition-colors cursor-pointer">
                  Fine Collars & Tassel Necklaces
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('Bracelets')} className="hover:text-[#1C1917] transition-colors cursor-pointer">
                  Flex-Spring Bangles & Cuffs
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('Earrings')} className="hover:text-[#1C1917] transition-colors cursor-pointer">
                  Articulated Drops & Golden Fans
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('Pendants')} className="hover:text-[#1C1917] transition-colors cursor-pointer">
                  22K Filigree Pendants
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('High Jewellery')} className="hover:text-[#1C1917] transition-colors cursor-pointer">
                  Bespoke High Joaillerie
                </button>
              </li>
            </ul>
          </div>

          {/* Signature Collections */}
          <div>
            <h4 className="text-xs uppercase tracking-wide text-[#1C1917] font-semibold mb-4 pb-2 border-b border-[#EAE4D9]">
              Collections
            </h4>
            <ul className="space-y-2.5 text-xs text-[#665D50]">
              <li>
                <button onClick={() => onSelectCollection('Starlight')} className="hover:text-[#1C1917] transition-colors cursor-pointer">
                  Starlight Collection
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCollection('Moonlight')} className="hover:text-[#1C1917] transition-colors cursor-pointer">
                  Moonlight Collection
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCollection('Daylight')} className="hover:text-[#1C1917] transition-colors cursor-pointer">
                  Daylight Collection
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCollection('Sunlight')} className="hover:text-[#1C1917] transition-colors cursor-pointer">
                  Sunlight Collection
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCollection('Firelight')} className="hover:text-[#1C1917] transition-colors cursor-pointer">
                  Firelight Collection
                </button>
              </li>
            </ul>
          </div>

          {/* Boutiques & Concierge */}
          <div>
            <h4 className="text-xs uppercase tracking-wide text-[#1C1917] font-semibold mb-4 pb-2 border-b border-[#EAE4D9]">
              Boutiques & Concierge
            </h4>
            <div className="space-y-3 text-xs text-[#665D50]">
              <div>
                <p className="font-medium text-[#1C1917]">Dubai Flagship</p>
                <p className="text-[11px] text-[#8C8273]">Cosmos Lane, Meena Bazaar, Bur Dubai</p>
              </div>
              <div>
                <p className="font-medium text-[#1C1917]">Deira Gold Souk</p>
                <p className="text-[11px] text-[#8C8273]">Sikkat Al Khail, Dubai, UAE</p>
              </div>
              <div className="pt-2">
                <p className="font-medium text-[#1C1917]">Concierge Desk</p>
                <p className="text-[11px] text-[#8C8273]">+971 4 352 9900 • concierge@subha.luxury</p>
              </div>
              <button
                onClick={onBookAppointment}
                className="relative overflow-hidden group mt-2 w-full py-2.5 bg-[#1C1917] text-white text-[10px] uppercase tracking-wide font-semibold hover:bg-gradient-to-r hover:from-[#C9A86A] hover:to-[#DFC285] hover:text-[#141210] transition-all duration-300 rounded-xs cursor-pointer shadow-xs"
              >
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500 bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />
                Schedule Private Salon
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Trust & Guarantee Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-[#EAE4D9]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center mb-8">
          <div className="p-3 bg-white border border-[#EAE4D9] rounded-xs">
            <ShieldCheck className="w-4 h-4 text-[#9B7D44] mx-auto mb-1" />
            <p className="text-[10px] uppercase tracking-wide font-semibold text-[#1C1917]">100% Certified Diamonds</p>
            <p className="text-[9px] text-[#8C8273]">GIA & IGI Authenticated</p>
          </div>
          <div className="p-3 bg-white border border-[#EAE4D9] rounded-xs">
            <Award className="w-4 h-4 text-[#9B7D44] mx-auto mb-1" />
            <p className="text-[10px] uppercase tracking-wide font-semibold text-[#1C1917]">Hallmarked Purity</p>
            <p className="text-[9px] text-[#8C8273]">18K (750) & 22K (916) Assayed</p>
          </div>
          <div className="p-3 bg-white border border-[#EAE4D9] rounded-xs">
            <Sparkles className="w-4 h-4 text-[#9B7D44] mx-auto mb-1" />
            <p className="text-[10px] uppercase tracking-wide font-semibold text-[#1C1917]">Insured Worldwide Delivery</p>
            <p className="text-[9px] text-[#8C8273]">Tamper-Proof Armored Transit</p>
          </div>
          <div className="p-3 bg-white border border-[#EAE4D9] rounded-xs">
            <ShieldCheck className="w-4 h-4 text-[#9B7D44] mx-auto mb-1" />
            <p className="text-[10px] uppercase tracking-wide font-semibold text-[#1C1917]">Lifetime Exchange</p>
            <p className="text-[9px] text-[#8C8273]">Complimentary Care & Polish</p>
          </div>
        </div>

        {/* Bottom copyright and payment icons */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#8C8273] font-light gap-4">
          <p>© 2026 Subha Jewellery. All rights reserved.</p>
          <div className="flex items-center gap-3 text-[10px] tracking-wide uppercase flex-wrap">
            <span>Visa</span>
            <span>•</span>
            <span>Mastercard</span>
            <span>•</span>
            <span>American Express</span>
            <span>•</span>
            <span>Apple Pay</span>
            <span>•</span>
            <span>Cash on Delivery</span>
          </div>
        </div>
      </div>

    </footer>
  );
};
