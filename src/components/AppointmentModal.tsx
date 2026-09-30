import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Clock, MapPin, CheckCircle2, Sparkles, ArrowRight } from 'lucide-react';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AppointmentModal: React.FC<AppointmentModalProps> = ({ isOpen, onClose }) => {
  const [location, setLocation] = useState('Dubai — Subha Flagship Boutique, Meena Bazaar');
  const [date, setDate] = useState('2026-10-15');
  const [timeSlot, setTimeSlot] = useState('3:00 PM — 4:30 PM');
  const [interest, setInterest] = useState('Bridal & High Jewellery Suites');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/75 backdrop-blur-xs transition-opacity"
      />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-xl bg-[#FAF9F6] rounded-xs shadow-2xl border border-[#EAE4D9] p-6 sm:p-8"
      >
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#7A7165] hover:text-[#1C1917] p-1.5 transition-all cursor-pointer hover:rotate-90 rounded-full hover:bg-black/5"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <AnimatePresence mode="wait">
        {!submitted ? (
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="text-center mb-6">
              <span className="text-xs uppercase tracking-wide text-[#9B7D44] font-medium block mb-1">
                Private Consultation
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#1C1917] font-normal tracking-tight">
                Book a Boutique Visit
              </h2>
              <p className="text-xs text-[#7A7165] mt-1 font-light max-w-md mx-auto">
                Experience dedicated private viewings of 100% certified diamonds & hallmarked gold with our master gemologists.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block uppercase tracking-wide text-[#695F52] mb-1 font-medium">
                  Select Boutique Location
                </label>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full p-2.5 bg-white border border-[#EAE4D9] rounded-xs focus:outline-none focus:border-[#C9A86A]"
                >
                  <option value="Dubai — Subha Flagship Boutique, Meena Bazaar">Dubai — Subha Flagship Boutique, Meena Bazaar</option>
                  <option value="Dubai — Subha Gold Souk Salon, Deira">Dubai — Subha Gold Souk Salon, Deira</option>
                  <option value="Mumbai — Subha Bandra Flagship Boutique">Mumbai — Subha Bandra Flagship Boutique</option>
                  <option value="New Delhi — Subha South Extension Boutique">New Delhi — Subha South Extension Boutique</option>
                  <option value="Virtual VIP Viewing Suite">Virtual VIP Private Viewing (Live Video Atelier)</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block uppercase tracking-wide text-[#695F52] mb-1 font-medium">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full p-2.5 bg-white border border-[#EAE4D9] rounded-xs focus:outline-none focus:border-[#C9A86A]"
                  />
                </div>
                <div>
                  <label className="block uppercase tracking-wide text-[#695F52] mb-1 font-medium">
                    Preferred Time Slot
                  </label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full p-2.5 bg-white border border-[#EAE4D9] rounded-xs focus:outline-none focus:border-[#C9A86A]"
                  >
                    <option value="11:30 AM — 1:00 PM">11:30 AM — 1:00 PM</option>
                    <option value="3:00 PM — 4:30 PM">3:00 PM — 4:30 PM</option>
                    <option value="5:30 PM — 7:00 PM">5:30 PM — 7:00 PM</option>
                    <option value="7:30 PM — 9:00 PM">7:30 PM — 9:00 PM</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block uppercase tracking-wide text-[#695F52] mb-1 font-medium">
                  Creation of Interest
                </label>
                <select
                  value={interest}
                  onChange={(e) => setInterest(e.target.value)}
                  className="w-full p-2.5 bg-white border border-[#EAE4D9] rounded-xs focus:outline-none focus:border-[#C9A86A]"
                >
                  <option value="Bridal & High Jewellery Suites">Bridal & High Jewellery Suites</option>
                  <option value="Solitaire & Natural Diamond Rings">Solitaire & Natural Diamond Rings</option>
                  <option value="Sunlight & Tassel Suites">Sunlight & Tassel Suites</option>
                  <option value="Bespoke Custom CAD Design">Bespoke Custom CAD Design</option>
                  <option value="Everyday Fine Luxury">Everyday Fine Luxury</option>
                </select>
              </div>

              <div>
                <label className="block uppercase tracking-wide text-[#695F52] mb-1 font-medium">
                  Your Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Eleanor Vance"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2.5 bg-white border border-[#EAE4D9] rounded-xs focus:outline-none focus:border-[#C9A86A]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block uppercase tracking-wide text-[#695F52] mb-1 font-medium">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@domain.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2.5 bg-white border border-[#EAE4D9] rounded-xs focus:outline-none focus:border-[#C9A86A]"
                  />
                </div>
                <div>
                  <label className="block uppercase tracking-wide text-[#695F52] mb-1 font-medium">
                    Phone / WhatsApp
                  </label>
                  <input
                    type="tel"
                    placeholder="+971 50 123 4567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-2.5 bg-white border border-[#EAE4D9] rounded-xs focus:outline-none focus:border-[#C9A86A]"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="relative overflow-hidden group w-full py-3.5 bg-gradient-to-r from-[#C9A86A] via-[#DFC285] to-[#C9A86A] text-[#141210] uppercase tracking-wide font-bold text-xs hover:shadow-[0_4px_20px_rgba(201,168,106,0.4)] transition-all duration-300 rounded-xs cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />
                  <span>Confirm Boutique Appointment</span>
                </button>
              </div>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="confirmed"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-8 space-y-4"
          >
            <div className="w-14 h-14 rounded-full bg-[#15803D]/10 text-[#15803D] flex items-center justify-center mx-auto mb-2">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-2xl text-[#1C1917]">
              Appointment Confirmed
            </h3>
            <p className="text-xs text-[#5A5245] max-w-md mx-auto leading-relaxed">
              Thank you, <strong>{name}</strong>. A dedicated Subha Concierge Advisor has reserved your private viewing at <strong>{location}</strong> on <strong>{date}</strong> ({timeSlot}).
            </p>
            <p className="text-[11px] text-[#8C8273]">
              A calendar invitation and salon pass have been dispatched to <strong>{email}</strong>.
            </p>
            <div className="pt-4">
              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="relative overflow-hidden group px-6 py-2.5 bg-[#1C1917] text-white text-xs uppercase tracking-wide rounded-xs hover:bg-[#9B7D44] transition-all cursor-pointer font-semibold"
              >
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500 bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />
                Return to Collections
              </button>
            </div>
          </motion.div>
        )}
        </AnimatePresence>

      </motion.div>
    </div>
  );
};
