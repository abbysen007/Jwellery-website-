import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, HelpCircle, Mail, Phone } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'Can I change or cancel my order after placing it?',
      answer: 'We process orders quickly, so please contact our Concierge as soon as possible if you need to make a change. If your order has not been dispatched yet, we will do our best to update the size, engraving, or item. Once an order has shipped, we are unable to modify it, but our returns and exchanges process is simple and seamless, and an in-person boutique visit also helps process complimentary exchanges.'
    },
    {
      question: 'Can I add engraving or personalisation to my order?',
      answer: 'Yes! Many of our signature pieces can be personalised with names, initials, commemorative dates, or short messages. Look for the personalisation option on the product page, or contact our Concierge before placing your order and we will guide you through bespoke engraving fonts and styles.'
    },
    {
      question: 'Do you offer custom or bespoke jewellery design?',
      answer: 'Absolutely. Subha Jewellers specialises in custom-made haute joaillerie, including bridal sets, engagement rings, wedding bands, and one-of-a-kind bespoke creations. Reach out to our design atelier or book a store consultation to discuss your vision, and our master gemologists will help bring it to life.'
    },
    {
      question: 'How long will my order take to ship?',
      answer: 'Orders are typically crafted, inspected, and shipped within 3–5 business days from the date of purchase, for both domestic and international destinations. Personalised or custom bespoke pieces may occasionally take longer depending on technical complexity, and our concierge team will keep you informed at every stage.'
    },
    {
      question: 'Do you ship internationally?',
      answer: 'Yes, Subha Jewellers ships worldwide with fully insured courier transit partners (Malca-Amit, Brinks, FedEx Priority). International shipments are securely packaged with tamper-proof seals and tracking. Depending on destination customs regulations, local import duties may apply, and our global fulfillment desk assists with full documentation.'
    },
    {
      question: 'What happens if my order is lost or delayed in transit?',
      answer: 'Every Subha order is 100% insured from our vault to your hands and sent with signature-required tracking. In the extremely rare event of delay or transit complications, our dedicated logistics team opens an immediate priority investigation and guarantees complimentary expedited replacement or full refund.'
    },
    {
      question: 'How can I track my order?',
      answer: 'Once your creation passes final inspection and is dispatched, you will receive an official dispatch confirmation email and SMS with your live tracking number, insured airway bill, and real-time transit link. You can also view live status in the Subha digital portal with your order number.'
    },
    {
      question: 'What is your return and exchange policy?',
      answer: 'We offer a 30-day return policy and lifetime exchange guarantee on all unworn, authentic creations accompanied by original Subha certificate documentation and security tags intact. Custom bespoke designs and personalized engraved pieces are eligible for lifetime maintenance, resizing, and trade-up consultations.'
    }
  ];

  return (
    <section id="faq-section" className="py-20 sm:py-28 bg-[#FAF9F6] border-b border-[#EAE4D9]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <span className="text-xs uppercase tracking-[0.26em] text-[#9B7D44] font-medium block mb-2">
            Get in Touch
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1C1917] font-normal tracking-tight mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-[#6B6152] font-sans font-light">
            Answers to common questions regarding bespoke orders, authenticity, international shipping, and care.
          </p>
        </div>

        {/* Accordion List with 3D elevation */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <motion.div
                key={idx}
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
                className={`bg-white border rounded-xs overflow-hidden transition-all duration-300 shadow-xs hover:shadow-md ${
                  isOpen ? 'border-[#C9A86A] border-l-4' : 'border-[#EAE4D9]'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full text-left px-5 sm:px-7 py-4.5 sm:py-5 flex items-center justify-between gap-4 hover:bg-[#FAF9F6] transition-colors"
                >
                  <span className="font-serif text-base sm:text-lg text-[#1C1917] font-normal pr-2">
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="shrink-0 text-[#9B7D44]"
                  >
                    <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <div className="px-5 sm:px-7 pb-5 pt-1 text-[#5A5245] text-xs sm:text-sm leading-relaxed border-t border-[#F2ECE1]">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Contact Concierge Prompt */}
        <div className="mt-12 p-6 sm:p-8 bg-[#F4EFE6]/80 rounded-xs border border-[#E3DBD0] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h4 className="font-serif text-lg text-[#1C1917] mb-1">
              Have a question not addressed here?
            </h4>
            <p className="text-xs text-[#6B6152] font-light">
              Our master jewellery concierge is available 7 days a week for personalized consultations.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="mailto:concierge@subha.luxury"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#1C1917] text-white text-[11px] uppercase tracking-[0.2em] hover:bg-[#9B7D44] transition-colors rounded-xs"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Email Atelier</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
