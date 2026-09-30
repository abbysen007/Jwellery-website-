import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CartItem } from '../types';
import { formatPrice, Currency } from '../utils/formatters';
import { X, Trash2, Plus, Minus, ShoppingBag, ShieldCheck, ArrowRight } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  currency: Currency;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  currency,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
}) => {
  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const total = subtotal;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-3 sm:pl-10">
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          className="w-screen max-w-md bg-[#FAF9F6] border-l border-[#EAE4D9] shadow-2xl flex flex-col justify-between"
        >
          
          {/* Header */}
          <div className="p-6 border-b border-[#EAE4D9] flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#9B7D44]" />
              <h2 className="font-serif text-xl text-[#1C1917] font-normal tracking-wide">
                Your Shopping Bag ({items.reduce((sum, i) => sum + i.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-[#7A7165] hover:text-[#1C1917] transition-all cursor-pointer hover:rotate-90"
              aria-label="Close Bag"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-20 text-[#7A7165]"
              >
                <ShoppingBag className="w-12 h-12 text-[#D8CEBE] mx-auto mb-3" />
                <p className="font-serif text-xl text-[#1C1917] mb-2">Your Bag is Empty</p>
                <p className="text-xs mb-6 max-w-xs mx-auto font-light">
                  Explore our curated collections and discover timeless fine pieces crafted to shine with you.
                </p>
                <button
                  onClick={onClose}
                  className="relative overflow-hidden group px-6 py-2.5 bg-[#1C1917] text-white text-xs uppercase tracking-wide rounded-xs hover:bg-[#9B7D44] transition-all cursor-pointer font-semibold"
                >
                  <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500 bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />
                  Explore Collections
                </button>
              </motion.div>
            ) : (
              <AnimatePresence initial={false}>
                {items.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, height: 0, marginBottom: 0 }}
                    transition={{ duration: 0.25 }}
                    className="flex gap-4 p-4 bg-white rounded-xs border border-[#EAE4D9] shadow-xs"
                  >
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="w-20 h-20 object-cover rounded-xs bg-[#F4EFE6] border border-[#EAE4D9] shrink-0"
                    />

                    <div className="flex-1 flex flex-col justify-between min-w-0">
                      <div>
                        <div className="flex justify-between items-start gap-2">
                          <h4 className="font-serif text-sm sm:text-base text-[#1C1917] leading-tight break-words">
                            {item.product.name}
                          </h4>
                          <button
                            onClick={() => onRemoveItem(item.id)}
                            className="text-[#A89F91] hover:text-[#8C2D2D] transition-colors p-1 cursor-pointer shrink-0"
                            title="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <span className="text-[11px] text-[#7A7165] block mt-0.5 truncate">
                          {item.product.metalPurity} • {item.product.collection}
                        </span>

                        {item.selectedSize && (
                          <span className="text-[11px] text-[#554E43] block">
                            Size: {item.selectedSize}
                          </span>
                        )}

                        {item.engravingText && (
                          <span className="text-[10px] text-[#9B7D44] italic block mt-0.5 truncate">
                            Laser Engraved: "{item.engravingText}"
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-between mt-3 gap-2">
                        <div className="flex items-center border border-[#EAE4D9] rounded-xs bg-[#FAF9F6]">
                          <button
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="px-2 py-1 text-xs text-[#7A7165] hover:bg-white transition-colors cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-semibold text-[#1C1917]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="px-2 py-1 text-xs text-[#7A7165] hover:bg-white transition-colors cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="font-sans text-sm font-semibold text-[#1C1917] whitespace-nowrap">
                          {formatPrice(item.product.price * item.quantity, currency)}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>

          {/* Footer & Checkout Proceed */}
          {items.length > 0 && (
            <div className="p-6 bg-white border-t border-[#EAE4D9] space-y-4">
              
              <div className="space-y-1.5 text-xs text-[#695F52]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-[#1C1917]">{formatPrice(subtotal, currency)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Insured Express Delivery</span>
                  <span className="text-[#15803D] font-medium uppercase tracking-wide text-[10px]">
                    Complimentary
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-[#EAE4D9] text-base font-serif font-bold text-[#1C1917]">
                  <span>Total ({currency})</span>
                  <span>{formatPrice(total, currency)}</span>
                </div>
              </div>

              {/* Security Notice */}
              <div className="p-2.5 bg-[#FAF9F6] rounded-xs border border-[#EAE4D9] flex items-center gap-2 text-[11px] text-[#4A453E]">
                <ShieldCheck className="w-4 h-4 text-[#9B7D44] shrink-0" />
                <span>
                  Official Subha Vault Digital Certificate issued with tamper-proof security seals.
                </span>
              </div>

              {/* Aesthetic Animated Checkout Button */}
              <button
                id="cart-proceed-checkout-btn"
                onClick={() => {
                  onClose();
                  onProceedToCheckout();
                }}
                className="relative overflow-hidden group w-full py-3.5 bg-gradient-to-r from-[#C9A86A] via-[#DFC285] to-[#C9A86A] text-[#141210] text-xs uppercase tracking-wide font-bold hover:shadow-[0_4px_25px_rgba(201,168,106,0.45)] transition-all duration-300 rounded-xs flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
              >
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />
                <span>Proceed to Secure Checkout</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </button>

            </div>
          )}

        </motion.div>
      </div>
    </div>
  );
};
