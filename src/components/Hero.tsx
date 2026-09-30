import React, { useState, useRef } from 'react';
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Compass,
  Award,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Calendar
} from 'lucide-react';

interface HeroProps {
  onExploreCollections?: () => void;
  onShopBestsellers?: () => void;
  onDiscoverClick?: () => void;
  onExploreHighJewellery?: () => void;
  onBookConsultation?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreCollections,
  onShopBestsellers,
  onDiscoverClick,
  onExploreHighJewellery,
  onBookConsultation,
}) => {
  const handlePrimary = onExploreCollections || onDiscoverClick || (() => {});
  const handleSecondary = onExploreHighJewellery || onShopBestsellers || (() => {});

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play().catch(() => {});
        setIsPlaying(true);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section className="relative overflow-hidden bg-[#0F0D0B] text-[#FAF9F6]">
      {/* Cinematic Full-Bleed Background Video */}
      <div className="relative min-h-[88vh] sm:min-h-[92vh] w-full flex items-center justify-center overflow-hidden">
        
        {/* Background Video Layer */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <video
            ref={videoRef}
            src="/hero-diamond-ring.mp4"
            poster="/hero-poster-wide.jpg"
            autoPlay
            loop
            muted={isMuted}
            playsInline
            className="w-full h-full object-cover object-center filter brightness-[0.42] contrast-[1.12] scale-105 transition-transform duration-1000"
          />
          {/* Subtle multi-stop gradient overlays for optimal text legibility and luxury atmosphere */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0F0D0B]/85 via-[#0F0D0B]/40 to-[#0F0D0B]/95" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_#0F0D0B/80_100%)]" />
        </div>

        {/* Ambient Subtle Video Controls in Bottom Right */}
        <div className="absolute bottom-6 right-6 z-20 hidden sm:flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-xs text-[#E8DFD0]/70">
          <button
            type="button"
            onClick={togglePlay}
            className="hover:text-white transition-colors cursor-pointer p-1"
            title={isPlaying ? 'Pause background video' : 'Play background video'}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
          </button>
          <span className="w-1 h-1 rounded-full bg-white/20" />
          <button
            type="button"
            onClick={toggleMute}
            className="hover:text-white transition-colors cursor-pointer p-1"
            title={isMuted ? 'Unmute video' : 'Mute video'}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Main Hero Content */}
        <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 flex flex-col items-center text-center">
          
          {/* Top Fine Jewellery Pill Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#1A1613]/80 border border-[#C9A86A]/40 mb-6 backdrop-blur-md shadow-lg">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C9A86A] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C9A86A]"></span>
            </span>
            <span className="text-[11px] uppercase tracking-widest text-[#E6CA85] font-semibold">
              Haute Joaillerie & Bespoke Solitaires
            </span>
            <span className="w-1 h-1 rounded-full bg-[#C9A86A]/50" />
            <span className="text-[11px] text-[#FAF9F6]/80 font-serif">Certified Natural Diamonds</span>
          </div>

          {/* Master Headline */}
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-[#FAF9F6] font-normal leading-[1.08] mb-6 drop-shadow-2xl max-w-4xl">
            Where Elegance <br />
            <span className="italic font-light text-transparent bg-clip-text bg-gradient-to-r from-[#FAF9F6] via-[#F3E8D2] to-[#C9A86A]">
              Finds Its Light
            </span>
          </h1>

          {/* Subtitle */}
          <p className="font-sans text-base sm:text-lg lg:text-xl text-[#E8DFD0]/90 font-light max-w-2xl leading-relaxed mb-10 drop-shadow-md">
            Handcrafted in pure 950 platinum and 18K hallmarked gold. Discover extraordinary solitaires, 
            artisanal polki, and contemporary heirlooms cut to radiate eternal brilliance.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-14">
            {/* Primary CTA */}
            <button
              id="hero-explore-collections-btn"
              onClick={handlePrimary}
              className="relative overflow-hidden group px-9 py-4 bg-gradient-to-r from-[#C9A86A] to-[#B08D4C] hover:from-[#D8B77B] hover:to-[#C9A86A] text-[#12100E] text-xs uppercase tracking-wider font-semibold rounded-xs shadow-[0_6px_30px_rgba(201,168,106,0.35)] hover:shadow-[0_8px_40px_rgba(201,168,106,0.55)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 min-w-[210px] cursor-pointer flex items-center justify-center gap-2"
            >
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />
              <span>Explore Collection</span>
              <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Secondary CTA: Book Atelier Appointment */}
            <button
              id="hero-book-consultation-btn"
              onClick={onBookConsultation || handleSecondary}
              className="relative overflow-hidden group px-8 py-4 bg-[#141210]/60 hover:bg-white/10 text-[#FAF9F6] border border-white/30 hover:border-[#C9A86A] hover:text-[#E6CA85] text-xs uppercase tracking-wider font-medium rounded-xs hover:shadow-[0_4px_20px_rgba(255,255,255,0.12)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 backdrop-blur-md min-w-[210px] cursor-pointer flex items-center justify-center gap-2"
            >
              <Calendar className="w-3.5 h-3.5 text-[#C9A86A]" />
              <span>Book Consultation</span>
            </button>
          </div>

          {/* Micro Trust Accreditations Bar */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 pt-8 border-t border-white/15 text-xs text-[#E8DFD0]/90 tracking-normal w-full max-w-3xl">
            <span className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#C9A86A] shrink-0" />
              <span className="font-light">BIS 750 Hallmarked Gold</span>
            </span>
            <span className="hidden sm:inline text-white/20">•</span>
            <span className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#C9A86A] shrink-0" />
              <span className="font-light">IGI / GIA Certified Solitaires</span>
            </span>
            <span className="hidden sm:inline text-white/20">•</span>
            <span className="flex items-center gap-2">
              <Award className="w-4 h-4 text-[#C9A86A] shrink-0" />
              <span className="font-light">Bespoke Atelier Craft</span>
            </span>
            <span className="hidden sm:inline text-white/20">•</span>
            <span className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-[#C9A86A] shrink-0" />
              <span className="font-light">Insured White Glove Delivery</span>
            </span>
          </div>

          {/* Scroll To Begin Explore Indicator */}
          <div className="mt-14 flex justify-center">
            <button
              type="button"
              className="flex flex-col items-center text-center cursor-pointer group bg-transparent border-0"
              onClick={handlePrimary}
            >
              <span className="text-[10px] uppercase tracking-widest text-[#A89F91] font-light group-hover:text-[#FAF9F6] transition-colors mb-2">
                Scroll to Explore
              </span>
              <div className="w-[1px] h-8 bg-gradient-to-b from-[#C9A86A] to-transparent animate-pulse" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};
