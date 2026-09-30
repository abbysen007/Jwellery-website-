import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart } from 'lucide-react';
import { Product } from '../types';

interface WishlistButtonProps {
  product?: Product;
  isWishlisted: boolean;
  onToggle: (product?: Product) => void;
  variant?: 'card' | 'detail';
  size?: 'sm' | 'md' | 'lg' | string;
  id?: string;
}

export const WishlistButton: React.FC<WishlistButtonProps> = ({
  product,
  isWishlisted,
  onToggle,
  variant = 'card',
  size = 'md',
  id
}) => {
  const [isThrobbing, setIsThrobbing] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    const willBeWishlisted = !isWishlisted;
    if (willBeWishlisted) {
      setJustAdded(true);
      setTimeout(() => setJustAdded(false), 700);
    }
    
    setIsThrobbing(true);
    setTimeout(() => setIsThrobbing(false), 550);

    onToggle(product);
  };

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-3.5 h-3.5 sm:w-4 sm:h-4',
    lg: 'w-4 h-4 sm:w-5 sm:h-5'
  };

  const btnSizes = {
    sm: 'w-6 h-6',
    md: 'w-7 h-7 sm:w-8 sm:h-8',
    lg: 'w-9 h-9'
  };

  const currentIconSize = iconSizes[size as keyof typeof iconSizes] || iconSizes.md;
  const currentBtnSize = btnSizes[size as keyof typeof btnSizes] || btnSizes.md;

  if (variant === 'detail') {
    return (
      <div className="relative inline-flex items-center">
        <motion.button
          id={id || (product ? `wishlist-btn-detail-${product.id}` : 'wishlist-btn-detail')}
          type="button"
          onClick={handleClick}
          whileTap={{ scale: 0.92 }}
          className="flex items-center gap-1.5 text-xs text-[#7A7165] hover:text-[#B53F3F] transition-colors py-1 px-2 rounded-xs group select-none"
          aria-label={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <div className="relative flex items-center justify-center">
            <motion.div
              animate={isThrobbing ? { scale: [1, 1.45, 0.88, 1.22, 1], rotate: [0, -10, 8, -4, 0] } : { scale: 1, rotate: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <Heart
                className={`w-4 h-4 transition-colors duration-200 ${
                  isWishlisted ? 'fill-[#B53F3F] text-[#B53F3F]' : 'text-[#7A7165] group-hover:text-[#B53F3F]'
                }`}
                strokeWidth={isWishlisted ? 1.5 : 1.75}
              />
            </motion.div>

            {/* Subtle Expanding Ripple Ring */}
            <AnimatePresence>
              {justAdded && (
                <motion.span
                  initial={{ scale: 0.8, opacity: 0.8 }}
                  animate={{ scale: 2.2, opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  className="absolute inset-0 rounded-full border border-[#B53F3F]/50 pointer-events-none"
                />
              )}
            </AnimatePresence>
          </div>

          <span className={`tracking-wider uppercase text-[10px] font-medium transition-colors ${
            isWishlisted ? 'text-[#B53F3F]' : 'text-[#7A7165] group-hover:text-[#1E1B18]'
          }`}>
            {isWishlisted ? 'Saved' : 'Wishlist'}
          </span>
        </motion.button>
      </div>
    );
  }

  // Card Floating Button
  return (
    <div className="relative inline-flex items-center justify-center">
      <motion.button
        id={id || (product ? `wishlist-btn-${product.id}` : 'wishlist-btn')}
        type="button"
        onClick={handleClick}
        whileTap={{ scale: 0.88 }}
        className={`${currentBtnSize} rounded-full bg-white/92 backdrop-blur-sm flex items-center justify-center text-[#1C1A17] hover:bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition-all z-10`}
        aria-label={isWishlisted ? 'Remove from Wishlist' : 'Save to Wishlist'}
      >
        <motion.div
          animate={isThrobbing ? { scale: [1, 1.48, 0.85, 1.25, 1], rotate: [0, -12, 10, -5, 0] } : { scale: 1, rotate: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-center"
        >
          <Heart
            className={`${currentIconSize} transition-colors duration-200 ${
              isWishlisted ? 'fill-[#B53F3F] text-[#B53F3F]' : 'text-[#4A453E] hover:text-[#B53F3F]'
            }`}
            strokeWidth={isWishlisted ? 1.5 : 1.75}
          />
        </motion.div>

        {/* Pulse Ripple Effect */}
        <AnimatePresence>
          {justAdded && (
            <motion.span
              initial={{ scale: 0.8, opacity: 0.85 }}
              animate={{ scale: 2.1, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.55, ease: 'easeOut' }}
              className="absolute inset-0 rounded-full border border-[#B53F3F]/60 pointer-events-none"
            />
          )}
        </AnimatePresence>

        {/* Floating Heart Micro-Indicator on Add */}
        <AnimatePresence>
          {justAdded && (
            <motion.div
              initial={{ y: 0, opacity: 0.9, scale: 0.7 }}
              animate={{ y: -20, opacity: 0, scale: 1.1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.65, ease: 'easeOut' }}
              className="absolute pointer-events-none text-[#B53F3F]"
            >
              <Heart className="w-3 h-3 fill-[#B53F3F]" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};
