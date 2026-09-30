import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { CartItem, JewelleryCertificate, Order, ShippingAddress } from '../types';
import { formatPrice, Currency, generateCertificate, generateOrderNumber, generateTrackingNumber, getEstimatedDeliveryDate } from '../utils/formatters';
import { X, ShieldCheck, Lock, CheckCircle2, CreditCard, Smartphone, Building, Sparkles, Award, ArrowRight, ArrowLeft } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  currency: Currency;
  onClose: () => void;
  items: CartItem[];
  onOrderComplete: (order: Order) => void;
  onViewCertificate: (cert: JewelleryCertificate) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  currency,
  onClose,
  items,
  onOrderComplete,
  onViewCertificate,
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);

  // Address State
  const [address, setAddress] = useState<ShippingAddress>({
    fullName: 'Ananya Sharma',
    email: 'ananya.sharma@example.com',
    phone: '+91 98201 44550',
    streetAddress: 'Flat 14B, One Avighna Park, Lower Parel',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400013',
    country: 'India',
    isGiftPackaging: true,
    giftMessage: 'With endless love and celebratory wishes on our anniversary.',
  });

  // Payment State
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking' | 'emi'>('upi');
  const [upiId, setUpiId] = useState('ananya@okhdfcbank');
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 9924');
  const [cardExpiry, setCardExpiry] = useState('08/29');
  const [cardCvv, setCardCvv] = useState('•••');
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');

  // Calculations
  const subtotal = items.reduce((acc, i) => acc + i.product.price * i.quantity, 0);
  const gst = Math.round(subtotal * 0.03); // 3% GST
  const total = subtotal + gst;

  if (!isOpen) return null;

  // Process Final Order
  const handleCompletePayment = () => {
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      const orderNumber = generateOrderNumber();
      const trackingNumber = generateTrackingNumber();

      // Generate Certificates for every item in order
      const certificates: JewelleryCertificate[] = items.map((item) =>
        generateCertificate(item.product, orderNumber, address.fullName)
      );

      const newOrder: Order = {
        id: `ord-${Date.now()}`,
        orderNumber,
        createdAt: new Date().toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        shipping: address,
        items,
        subtotal,
        gstAmount: gst,
        shippingCharge: 0,
        total,
        paymentMethod,
        paymentReference: paymentMethod === 'upi' ? `UPI-REF-${Math.floor(100000000000 + Math.random() * 900000000000)}` : `PG-TXN-${Math.floor(10000000 + Math.random() * 90000000)}`,
        paymentStatus: 'Paid',
        orderStatus: 'BIS Hallmarked',
        estimatedDeliveryDate: getEstimatedDeliveryDate(),
        trackingNumber,
        certificates,
      };

      setConfirmedOrder(newOrder);
      onOrderComplete(newOrder);
      setStep(4);

      // Trigger celebration confetti
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#C9A86A', '#E8DEC8', '#1C1A17', '#BFA57A']
        });
      } catch (e) {
        // Confetti fallback
      }
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={step !== 4 ? onClose : undefined}
        className="fixed inset-0 bg-black/80 backdrop-blur-xs transition-opacity"
      />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-4xl bg-[#FAF8F5] rounded-sm shadow-2xl border border-[#E3DBD0] my-auto overflow-hidden"
      >
        
        {/* Header Bar */}
        <div className="bg-[#1C1A17] text-[#FAF8F5] px-6 py-4 flex items-center justify-between border-b border-[#36322D]">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-[#C9A86A]" />
            <span className="font-serif text-lg tracking-wider text-[#FAF8F5]">
              Subha 256-Bit Encrypted Secure Checkout
            </span>
          </div>

          {step !== 4 && (
            <motion.button
              whileHover={{ rotate: 90 }}
              transition={{ duration: 0.2 }}
              onClick={onClose}
              className="text-[#E6D7BD] hover:text-white p-1"
              aria-label="Close Checkout"
            >
              <X className="w-5 h-5" />
            </motion.button>
          )}
        </div>

        {/* Checkout Progress Stepper */}
        {step !== 4 && (
          <div className="bg-[#F4EFE6] px-6 py-3 border-b border-[#E3DBD0] flex items-center justify-between text-xs">
            <div className="flex items-center gap-6 sm:gap-10">
              <span className={`flex items-center gap-1.5 font-medium transition-colors ${step >= 1 ? 'text-[#1C1A17]' : 'text-[#A89F91]'}`}>
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] transition-all ${step >= 1 ? 'bg-[#1C1A17] text-white' : 'bg-[#D8CEBE]'}`}>1</span>
                <span>Delivery</span>
              </span>

              <span className={`flex items-center gap-1.5 font-medium transition-colors ${step >= 2 ? 'text-[#1C1A17]' : 'text-[#A89F91]'}`}>
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] transition-all ${step >= 2 ? 'bg-[#1C1A17] text-white' : 'bg-[#D8CEBE]'}`}>2</span>
                <span>Presentation</span>
              </span>

              <span className={`flex items-center gap-1.5 font-medium transition-colors ${step >= 3 ? 'text-[#1C1A17]' : 'text-[#A89F91]'}`}>
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] transition-all ${step >= 3 ? 'bg-[#1C1A17] text-white' : 'bg-[#D8CEBE]'}`}>3</span>
                <span>Payment ({currency})</span>
              </span>
            </div>

            <div className="text-right hidden sm:block text-[#695F52]">
              <span>Total: <strong className="text-[#1C1A17] font-serif">{formatPrice(total, currency)}</strong></span>
            </div>
          </div>
        )}

        {/* Step Contents */}
        <div className="p-6 sm:p-10 max-h-[75vh] overflow-y-auto">
          <AnimatePresence mode="wait">
          
          {/* STEP 1: Delivery Address */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              <div>
                <h3 className="font-serif text-2xl text-[#1E1B18] font-normal mb-1">
                  Recipient & Insured Transit Address
                </h3>
                <p className="text-xs text-[#7A7165]">
                  All shipments are conveyed via high-security armored logistics (BVC / Ferrari Security) with signature verification upon delivery.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block uppercase tracking-wider text-[#695F52] mb-1 font-medium">
                    Full Legal Name
                  </label>
                  <input
                    type="text"
                    value={address.fullName}
                    onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                    className="w-full p-2.5 bg-white border border-[#D8CEBE] rounded-sm focus:outline-none focus:border-[#C9A86A]"
                  />
                </div>

                <div>
                  <label className="block uppercase tracking-wider text-[#695F52] mb-1 font-medium">
                    Contact Phone (+91 for OTP confirmation)
                  </label>
                  <input
                    type="text"
                    value={address.phone}
                    onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                    className="w-full p-2.5 bg-white border border-[#D8CEBE] rounded-sm focus:outline-none focus:border-[#C9A86A]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block uppercase tracking-wider text-[#695F52] mb-1 font-medium">
                    Email Address (for Vault Certificate & Tracking)
                  </label>
                  <input
                    type="email"
                    value={address.email}
                    onChange={(e) => setAddress({ ...address, email: e.target.value })}
                    className="w-full p-2.5 bg-white border border-[#D8CEBE] rounded-sm focus:outline-none focus:border-[#C9A86A]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block uppercase tracking-wider text-[#695F52] mb-1 font-medium">
                    Delivery Address
                  </label>
                  <input
                    type="text"
                    value={address.streetAddress}
                    onChange={(e) => setAddress({ ...address, streetAddress: e.target.value })}
                    placeholder="Building name, street, apartment"
                    className="w-full p-2.5 bg-white border border-[#D8CEBE] rounded-sm focus:outline-none focus:border-[#C9A86A]"
                  />
                </div>

                <div>
                  <label className="block uppercase tracking-wider text-[#695F52] mb-1 font-medium">
                    City
                  </label>
                  <input
                    type="text"
                    value={address.city}
                    onChange={(e) => setAddress({ ...address, city: e.target.value })}
                    className="w-full p-2.5 bg-white border border-[#D8CEBE] rounded-sm focus:outline-none focus:border-[#C9A86A]"
                  />
                </div>

                <div>
                  <label className="block uppercase tracking-wider text-[#695F52] mb-1 font-medium">
                    State
                  </label>
                  <select
                    value={address.state}
                    onChange={(e) => setAddress({ ...address, state: e.target.value })}
                    className="w-full p-2.5 bg-white border border-[#D8CEBE] rounded-sm focus:outline-none focus:border-[#C9A86A]"
                  >
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Delhi">Delhi NCR</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Gujarat">Gujarat</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="Telangana">Telangana</option>
                    <option value="West Bengal">West Bengal</option>
                    <option value="Rajasthan">Rajasthan</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                    <option value="Kerala">Kerala</option>
                  </select>
                </div>

                <div>
                  <label className="block uppercase tracking-wider text-[#695F52] mb-1 font-medium">
                    PIN Code
                  </label>
                  <input
                    type="text"
                    value={address.pincode}
                    onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                    className="w-full p-2.5 bg-white border border-[#D8CEBE] rounded-sm focus:outline-none focus:border-[#C9A86A]"
                  />
                </div>

                <div>
                  <label className="block uppercase tracking-wider text-[#695F52] mb-1 font-medium">
                    Country
                  </label>
                  <input
                    type="text"
                    readOnly
                    value="India (Pan-India Insured Transit)"
                    className="w-full p-2.5 bg-[#F0EBE1] border border-[#D8CEBE] rounded-sm text-[#4A4338]"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t border-[#EAE3D6]">
                <button
                  id="checkout-step1-continue-btn"
                  onClick={() => setStep(2)}
                  className="relative overflow-hidden group py-3 px-8 bg-[#1C1A17] text-white text-xs uppercase tracking-wide font-semibold hover:bg-gradient-to-r hover:from-[#C9A86A] hover:to-[#DFC285] hover:text-[#1C1A17] transition-all duration-300 rounded-sm flex items-center gap-2 cursor-pointer shadow-md hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />
                  <span>Continue to Presentation</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: Packaging & Gifting */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              <div>
                <h3 className="font-serif text-2xl text-[#1E1B18] font-normal mb-1">
                  Atelier Packaging & Personal Keepsake
                </h3>
                <p className="text-xs text-[#7A7165]">
                  Every creation is encased in our signature handcrafted presentation box with certificate pocket.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
                <div className="p-4 bg-white rounded-sm border border-[#D8CEBE] shadow-xs">
                  <div className="aspect-[4/3] rounded-sm overflow-hidden bg-[#162B1D] mb-3 relative flex items-center justify-center">
                    <img
                      src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=800&auto=format&fit=crop"
                      alt="Luxury Subha Suede & Walnut Casket"
                      className="w-full h-full object-cover opacity-90"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <span className="font-serif text-white tracking-widest uppercase text-xs border border-white/40 px-3 py-1">
                        Subha Signature Velvet Casket
                      </span>
                    </div>
                  </div>
                  <h4 className="font-serif text-base text-[#1E1B18] font-semibold">
                    Emerald Velvet Presentation Box
                  </h4>
                  <p className="text-[11px] text-[#695F52] mt-1">
                    Handmade Italian velvet lining, brass corner guards, and secure dual clasp.
                  </p>
                </div>

                <div className="space-y-4 text-xs">
                  <label className="flex items-start gap-3 p-3 bg-white rounded-sm border border-[#D8CEBE] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={address.isGiftPackaging}
                      onChange={(e) => setAddress({ ...address, isGiftPackaging: e.target.checked })}
                      className="mt-0.5 accent-[#C9A86A]"
                    />
                    <div>
                      <span className="font-semibold block text-[#1C1A17]">Complimentary Gift Presentation</span>
                      <span className="text-[#7A7165] text-[11px]">
                        Includes personalized wax-sealed envelope with calligraphed letter.
                      </span>
                    </div>
                  </label>

                  {address.isGiftPackaging && (
                    <div>
                      <label className="block uppercase tracking-wider text-[#695F52] mb-1 font-medium">
                        Personal Gift Note Inscription
                      </label>
                      <textarea
                        rows={3}
                        value={address.giftMessage}
                        onChange={(e) => setAddress({ ...address, giftMessage: e.target.value })}
                        className="w-full p-2.5 bg-white border border-[#D8CEBE] rounded-sm focus:outline-none focus:border-[#C9A86A] text-xs font-serif italic"
                      />
                    </div>
                  )}

                  <div className="p-3 bg-[#F4EFE6] rounded-sm border border-[#E3DBD0] flex items-center gap-2 text-[11px] text-[#554E43]">
                    <Award className="w-4 h-4 text-[#9B7D44] flex-shrink-0" />
                    <span>Official BIS Digital Vault Certificate document placed inside presentation sleeve.</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-between pt-4 border-t border-[#EAE3D6]">
                <button
                  onClick={() => setStep(1)}
                  className="py-3 px-6 border border-[#1C1A17] text-[#1C1A17] text-xs uppercase tracking-wide font-semibold hover:bg-[#FAF6EE] transition-all rounded-sm flex items-center gap-2 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Delivery</span>
                </button>

                <button
                  id="checkout-step2-continue-btn"
                  onClick={() => setStep(3)}
                  className="relative overflow-hidden group py-3 px-8 bg-[#1C1A17] text-white text-xs uppercase tracking-wide font-semibold hover:bg-gradient-to-r hover:from-[#C9A86A] hover:to-[#DFC285] hover:text-[#1C1A17] transition-all duration-300 rounded-sm flex items-center gap-2 cursor-pointer shadow-md hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />
                  <span>Proceed to Payment</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: Payment Gateway (INR) */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              <div>
                <h3 className="font-serif text-2xl text-[#1E1B18] font-normal mb-1">
                  Secure Payment Gateway (INR)
                </h3>
                <p className="text-xs text-[#7A7165]">
                  Protected by 256-bit SSL encryption. Authorizing transaction for <strong>{formatPrice(total, currency)}</strong>.
                </p>
              </div>

              {/* Payment Methods Selection */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                <button
                  id="pay-method-upi"
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-3 rounded-sm border text-center transition-all ${
                    paymentMethod === 'upi'
                      ? 'bg-[#1C1A17] text-white border-[#1C1A17] shadow-sm font-semibold'
                      : 'bg-white text-[#4A4338] border-[#D8CEBE] hover:border-[#1C1A17]'
                  }`}
                >
                  <Smartphone className="w-5 h-5 mx-auto mb-1 text-[#C9A86A]" />
                  <span>UPI / QR</span>
                </button>

                <button
                  id="pay-method-card"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-sm border text-center transition-all ${
                    paymentMethod === 'card'
                      ? 'bg-[#1C1A17] text-white border-[#1C1A17] shadow-sm font-semibold'
                      : 'bg-white text-[#4A4338] border-[#D8CEBE] hover:border-[#1C1A17]'
                  }`}
                >
                  <CreditCard className="w-5 h-5 mx-auto mb-1 text-[#C9A86A]" />
                  <span>Cards / RuPay</span>
                </button>

                <button
                  id="pay-method-netbanking"
                  onClick={() => setPaymentMethod('netbanking')}
                  className={`p-3 rounded-sm border text-center transition-all ${
                    paymentMethod === 'netbanking'
                      ? 'bg-[#1C1A17] text-white border-[#1C1A17] shadow-sm font-semibold'
                      : 'bg-white text-[#4A4338] border-[#D8CEBE] hover:border-[#1C1A17]'
                  }`}
                >
                  <Building className="w-5 h-5 mx-auto mb-1 text-[#C9A86A]" />
                  <span>Net Banking</span>
                </button>

                <button
                  id="pay-method-emi"
                  onClick={() => setPaymentMethod('emi')}
                  className={`p-3 rounded-sm border text-center transition-all ${
                    paymentMethod === 'emi'
                      ? 'bg-[#1C1A17] text-white border-[#1C1A17] shadow-sm font-semibold'
                      : 'bg-white text-[#4A4338] border-[#D8CEBE] hover:border-[#1C1A17]'
                  }`}
                >
                  <Sparkles className="w-5 h-5 mx-auto mb-1 text-[#C9A86A]" />
                  <span>0% Jewel EMI</span>
                </button>
              </div>

              {/* Gateway Subform */}
              <div className="p-5 bg-white rounded-sm border border-[#D8CEBE]">
                {paymentMethod === 'upi' && (
                  <div className="space-y-4 text-xs">
                    <div className="flex items-center justify-between pb-3 border-b border-[#EAE3D6]">
                      <span className="font-semibold text-[#1C1A17]">Instant UPI Apps</span>
                      <span className="text-[11px] text-[#695F52]">Google Pay • PhonePe • Paytm • BHIM</span>
                    </div>

                    <div>
                      <label className="block uppercase tracking-wider text-[#695F52] mb-1 font-medium">
                        Enter UPI VPA ID
                      </label>
                      <input
                        type="text"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        placeholder="yourname@bank"
                        className="w-full p-2.5 bg-[#FAF8F5] border border-[#D8CEBE] rounded-sm focus:outline-none focus:border-[#C9A86A]"
                      />
                    </div>

                    <div className="p-3 bg-[#F4EFE6] rounded-sm flex items-center justify-between">
                      <div className="text-[11px] text-[#554E43]">
                        <span className="font-semibold block">Dynamic Payment QR Available</span>
                        <span>Scan from any UPI app on checkout approval</span>
                      </div>
                      <span className="text-xs font-mono font-bold text-[#1C1A17]">
                        {formatPrice(total, currency)}
                      </span>
                    </div>
                  </div>
                )}

                {paymentMethod === 'card' && (
                  <div className="space-y-4 text-xs">
                    <div>
                      <label className="block uppercase tracking-wider text-[#695F52] mb-1 font-medium">
                        Card Number (Visa, Mastercard, Amex, RuPay)
                      </label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full p-2.5 bg-[#FAF8F5] border border-[#D8CEBE] rounded-sm font-mono focus:outline-none focus:border-[#C9A86A]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block uppercase tracking-wider text-[#695F52] mb-1 font-medium">
                          Expiry MM/YY
                        </label>
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          className="w-full p-2.5 bg-[#FAF8F5] border border-[#D8CEBE] rounded-sm font-mono focus:outline-none focus:border-[#C9A86A]"
                        />
                      </div>
                      <div>
                        <label className="block uppercase tracking-wider text-[#695F52] mb-1 font-medium">
                          CVV (3 or 4 digits)
                        </label>
                        <input
                          type="password"
                          maxLength={4}
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                          className="w-full p-2.5 bg-[#FAF8F5] border border-[#D8CEBE] rounded-sm font-mono focus:outline-none focus:border-[#C9A86A]"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'netbanking' && (
                  <div className="space-y-4 text-xs">
                    <label className="block uppercase tracking-wider text-[#695F52] mb-1 font-medium">
                      Select Premier Banking Portal
                    </label>
                    <select
                      value={selectedBank}
                      onChange={(e) => setSelectedBank(e.target.value)}
                      className="w-full p-2.5 bg-[#FAF8F5] border border-[#D8CEBE] rounded-sm focus:outline-none focus:border-[#C9A86A]"
                    >
                      <option value="HDFC Bank">HDFC Bank — Imperia & Preferred</option>
                      <option value="ICICI Bank">ICICI Bank — Wealth Management</option>
                      <option value="State Bank of India">State Bank of India (SBI)</option>
                      <option value="Axis Bank">Axis Bank — Burgundy</option>
                      <option value="Kotak Mahindra Bank">Kotak Silk / Privy League</option>
                    </select>
                  </div>
                )}

                {paymentMethod === 'emi' && (
                  <div className="space-y-3 text-xs">
                    <span className="font-semibold text-[#1C1A17] block">
                      0% Interest Luxury Jewel Installments
                    </span>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="p-2.5 bg-[#FAF8F5] border border-[#C9A86A] rounded-sm text-center">
                        <span className="block font-bold text-[#1C1A17]">3 Months</span>
                        <span className="text-[10px] text-[#695F52]">{formatPrice(Math.round(total / 3), currency)}/mo</span>
                      </div>
                      <div className="p-2.5 bg-[#FAF8F5] border border-[#D8CEBE] rounded-sm text-center">
                        <span className="block font-bold text-[#1C1A17]">6 Months</span>
                        <span className="text-[10px] text-[#695F52]">{formatPrice(Math.round(total / 6), currency)}/mo</span>
                      </div>
                      <div className="p-2.5 bg-[#FAF8F5] border border-[#D8CEBE] rounded-sm text-center">
                        <span className="block font-bold text-[#1C1A17]">12 Months</span>
                        <span className="text-[10px] text-[#695F52]">{formatPrice(Math.round(total / 12), currency)}/mo</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Order summary check */}
              <div className="p-4 bg-[#F4EFE6] rounded-sm border border-[#E3DBD0] text-xs space-y-1">
                <div className="flex justify-between text-[#695F52]">
                  <span>Creations ({items.length} items)</span>
                  <span>{formatPrice(subtotal, currency)}</span>
                </div>
                <div className="flex justify-between text-[#695F52]">
                  <span>Assayed Certification</span>
                  <span className="text-[#166534] font-semibold">Complimentary</span>
                </div>
                <div className="flex justify-between text-[#695F52]">
                  <span>Insured Courier & Certification Vault Fee</span>
                  <span className="text-[#166534] font-semibold">Complimentary</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-[#D8CEBE] text-base font-serif font-bold text-[#1E1B18]">
                  <span>Total Payable</span>
                  <span>{formatPrice(total, currency)}</span>
                </div>
              </div>

              <div className="flex justify-between pt-4 border-t border-[#EAE3D6]">
                <button
                  onClick={() => setStep(2)}
                  className="py-3 px-6 border border-[#1C1A17] text-[#1C1A17] text-xs uppercase tracking-wide font-semibold hover:bg-[#FAF6EE] transition-all rounded-sm flex items-center gap-2 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>

                <button
                  id="checkout-pay-now-btn"
                  onClick={handleCompletePayment}
                  disabled={isProcessing}
                  className="relative overflow-hidden group py-3.5 px-8 bg-gradient-to-r from-[#C9A86A] via-[#DFC285] to-[#C9A86A] text-[#141210] text-xs uppercase tracking-wide font-bold hover:shadow-[0_4px_25px_rgba(201,168,106,0.4)] transition-all duration-300 rounded-sm flex items-center gap-2 shadow-lg disabled:opacity-50 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />
                  {isProcessing ? (
                    <span className="flex items-center gap-2">
                      <span className="w-3.5 h-3.5 border-2 border-[#141210] border-t-transparent rounded-full animate-spin" />
                      Securing Vault Transaction...
                    </span>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      <span>Authorize Payment — {formatPrice(total, currency)}</span>
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 4: Success, Hallmarking & Generated Jewellery Certificates */}
          {step === 4 && confirmedOrder && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="text-center space-y-6 py-4"
            >
              
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#E8F5E9] text-[#166534] mb-2 border border-[#A7F3D0]">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div>
                <span className="text-xs uppercase tracking-[0.25em] text-[#9B7D44] font-semibold block mb-1">
                  Payment Confirmed & Assayed
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl text-[#1E1B18] font-normal">
                  Thank You, {confirmedOrder.shipping.fullName}
                </h3>
                <p className="text-xs text-[#7A7165] mt-1 max-w-md mx-auto">
                  Your order has been recorded in our Dubai Atelier. Your digital certificate has been permanently issued to the Subha Vault.
                </p>
              </div>

              {/* Order Reference Box */}
              <div className="max-w-md mx-auto p-4 bg-[#F8F5EE] border border-[#E3DBD0] rounded-sm text-xs grid grid-cols-2 gap-4 text-left">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#8C8273] block">Order Reference</span>
                  <span className="font-mono font-bold text-[#1E1B18]">{confirmedOrder.orderNumber}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#8C8273] block">Total Paid</span>
                  <span className="font-serif font-bold text-[#1E1B18]">{formatPrice(confirmedOrder.total, currency)}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#8C8273] block">Armored Tracking</span>
                  <span className="font-mono text-[#1E1B18]">{confirmedOrder.trackingNumber}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#8C8273] block">Estimated Delivery</span>
                  <span className="font-medium text-[#1E1B18]">{confirmedOrder.estimatedDeliveryDate}</span>
                </div>
              </div>

              {/* Generated Certificates Showcase */}
              <div className="border-t border-[#EAE3D6] pt-6 text-left max-w-xl mx-auto">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-[#9B7D44]" />
                    <h4 className="font-serif text-xl text-[#1E1B18]">
                      Your Official Jewellery Certificates ({confirmedOrder.certificates.length})
                    </h4>
                  </div>
                  <span className="text-[10px] uppercase tracking-widest text-[#166534] font-semibold bg-[#DCFCE7] px-2 py-0.5 rounded">
                    BIS Certified
                  </span>
                </div>

                <div className="space-y-3">
                  {confirmedOrder.certificates.map((cert) => (
                    <motion.div
                      key={cert.certificateNumber}
                      whileHover={{ scale: 1.01 }}
                      className="flex items-center justify-between p-3.5 bg-white border border-[#D8CEBE] rounded-sm shadow-xs hover:border-[#C9A86A] transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={cert.productImage}
                          alt={cert.productName}
                          className="w-12 h-12 object-cover rounded-sm border border-[#E8DEC8]"
                        />
                        <div className="text-xs">
                          <span className="font-mono text-[10px] text-[#8C7449] block font-bold">
                            {cert.certificateNumber}
                          </span>
                          <h5 className="font-serif text-sm font-semibold text-[#1E1B18]">
                            {cert.productName}
                          </h5>
                          <span className="text-[11px] text-[#695F52]">
                            {cert.metalPurity} • BIS {cert.bisHallmarkId}
                          </span>
                        </div>
                      </div>

                      <button
                        id={`view-cert-btn-${cert.certificateNumber}`}
                        onClick={() => onViewCertificate(cert)}
                        className="relative overflow-hidden group px-3.5 py-1.5 bg-[#1C1A17] text-[#FAF8F5] text-xs uppercase tracking-wide font-semibold hover:bg-gradient-to-r hover:from-[#C9A86A] hover:to-[#DFC285] hover:text-[#1C1A17] transition-all duration-300 rounded-sm flex items-center gap-1.5 shadow-xs cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
                      >
                        <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500 bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />
                        <Award className="w-3.5 h-3.5" />
                        <span>View & Print</span>
                      </button>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Close Button */}
              <div className="pt-4 flex justify-center">
                <button
                  onClick={onClose}
                  className="relative overflow-hidden group px-8 py-3 bg-[#FAF8F5] border border-[#1C1A17] text-[#1C1A17] text-xs uppercase tracking-wide font-semibold hover:bg-[#1C1A17] hover:text-white transition-all duration-300 rounded-sm cursor-pointer shadow-sm hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500 bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />
                  <span>Return to Atelier</span>
                </button>
              </div>

            </motion.div>
          )}
          </AnimatePresence>

        </div>

      </motion.div>
    </div>
  );
};
