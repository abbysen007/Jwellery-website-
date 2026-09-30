import React from 'react';
import { Product } from '../types';
import { formatPrice, Currency } from '../utils/formatters';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';

interface WishlistDrawerProps {
  isOpen: boolean;
  currency: Currency;
  onClose: () => void;
  wishlistProducts: Product[];
  onRemoveFromWishlist: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  currency,
  onClose,
  wishlistProducts,
  onRemoveFromWishlist,
  onAddToCart,
  onQuickView,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div className="w-screen max-w-md bg-[#FAF9F6] border-l border-[#EAE4D9] shadow-2xl flex flex-col justify-between">
          
          <div className="p-6 border-b border-[#EAE4D9] flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-[#8C2D2D] fill-[#8C2D2D]" />
              <h2 className="font-serif text-xl text-[#1C1917] font-normal tracking-wide">
                Saved Creations ({wishlistProducts.length})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-[#7A7165] hover:text-[#1C1917] transition-all cursor-pointer hover:rotate-90"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {wishlistProducts.length === 0 ? (
              <div className="text-center py-20 text-[#7A7165]">
                <Heart className="w-12 h-12 text-[#D8CEBE] mx-auto mb-3" />
                <p className="font-serif text-xl text-[#1C1917] mb-2">No Saved Pieces</p>
                <p className="text-xs mb-6 max-w-xs mx-auto font-light">
                  Click the heart icon on any jewellery creation to save it to your private wishlist.
                </p>
                <button
                  onClick={onClose}
                  className="relative overflow-hidden group px-6 py-2.5 bg-[#1C1917] text-white text-xs uppercase tracking-wide rounded-xs hover:bg-[#9B7D44] transition-all cursor-pointer font-semibold"
                >
                  <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500 bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />
                  Explore Collections
                </button>
              </div>
            ) : (
              wishlistProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex gap-4 p-4 bg-white rounded-xs border border-[#EAE4D9] shadow-xs"
                >
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    onClick={() => {
                      onQuickView(product);
                      onClose();
                    }}
                    className="w-20 h-20 object-cover rounded-xs bg-[#F4EFE6] border border-[#EAE4D9] cursor-pointer shrink-0"
                  />

                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <h4
                          onClick={() => {
                            onQuickView(product);
                            onClose();
                          }}
                          className="font-serif text-sm sm:text-base text-[#1C1917] leading-tight hover:text-[#9B7D44] cursor-pointer break-words"
                        >
                          {product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveFromWishlist(product)}
                          className="text-[#A89F91] hover:text-[#8C2D2D] p-1 transition-colors cursor-pointer shrink-0"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <span className="text-[11px] text-[#7A7165] block mt-0.5 whitespace-nowrap">
                        {product.metalPurity} • {formatPrice(product.price, currency)}
                      </span>
                    </div>

                    <div className="pt-2 flex gap-2">
                      <button
                        onClick={() => {
                          onAddToCart(product);
                          onRemoveFromWishlist(product);
                        }}
                        className="relative overflow-hidden group flex-1 py-1.5 px-3 bg-[#1C1917] text-white text-[10px] uppercase tracking-wide font-semibold rounded-xs hover:bg-gradient-to-r hover:from-[#C9A86A] hover:to-[#DFC285] hover:text-[#141210] transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer shadow-xs hover:shadow-md"
                      >
                        <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500 bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />
                        <ShoppingBag className="w-3 h-3" />
                        <span>Move to Bag</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="p-4 bg-white border-t border-[#EAE4D9] text-center">
            <button
              onClick={onClose}
              className="text-xs uppercase tracking-wide text-[#695F52] hover:text-[#1C1917] transition-colors cursor-pointer"
            >
              Continue Browsing
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
