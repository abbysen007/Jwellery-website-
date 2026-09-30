import React from 'react';
import { motion } from 'motion/react';
import { JewelleryCertificate } from '../types';
import { formatINR } from '../utils/formatters';
import { X, Printer, Download, ShieldCheck, Award, QrCode, CheckCircle2, Share2 } from 'lucide-react';

interface CertificateModalProps {
  certificate: JewelleryCertificate | null;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({ certificate, onClose }) => {
  if (!certificate) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(certificate.qrVerificationCode || window.location.href);
    alert('Certificate verification link copied to clipboard!');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-xs transition-opacity"
      />
      
      {/* Outer wrapper */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-3xl my-auto"
      >
        
        {/* Top Control Bar (Hidden when printing) */}
        <div className="flex items-center justify-between bg-[#1C1A17] text-[#FAF8F5] px-6 py-3 rounded-t-sm border border-[#3E3830]">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#C9A86A]">
            <Award className="w-4 h-4" />
            <span>Subha Official Vault • Certificate of Authenticity</span>
          </div>

          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePrint}
              id="print-certificate-btn"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#FAF8F5]/10 hover:bg-[#C9A86A] hover:text-[#1C1A17] text-xs rounded transition-all text-[#E6D7BD]"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleCopyLink}
              title="Share Verification Link"
              className="p-1.5 text-[#E6D7BD] hover:text-white"
            >
              <Share2 className="w-4 h-4" />
            </motion.button>

            <motion.button
              whileHover={{ rotate: 90 }}
              transition={{ duration: 0.2 }}
              onClick={onClose}
              id="close-certificate-modal-btn"
              className="p-1.5 text-[#E6D7BD] hover:text-white"
            >
              <X className="w-5 h-5" />
            </motion.button>
          </div>
        </div>

        {/* Certificate Document Print Container */}
        <div
          id="certificate-print-area"
          className="bg-[#FFFDF9] text-[#1E1B18] p-8 sm:p-12 border-x border-b border-[#D8CEBE] shadow-2xl relative overflow-hidden"
          style={{ backgroundImage: 'radial-gradient(#E8DFC9 0.75px, transparent 0.75px)', backgroundSize: '24px 24px' }}
        >
          {/* Guilloché Double Border */}
          <div className="absolute inset-3 sm:inset-4 border-2 border-[#C9A86A]/40 pointer-events-none" />
          <div className="absolute inset-4 sm:inset-5 border border-[#8C7449]/30 pointer-events-none" />

          {/* Watermark in background */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
            <span className="font-serif text-[180px] font-bold tracking-widest uppercase">
              AURÉA
            </span>
          </div>

          {/* Certificate Header */}
          <div className="relative text-center pb-6 border-b border-[#E0D5C5]">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#1C1A17] text-[#C9A86A] mb-3 shadow-md border border-[#C9A86A]">
              <Award className="w-6 h-6" />
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl uppercase tracking-[0.25em] text-[#1E1B18] font-normal">
              Subha
            </h2>
            <p className="text-[10px] uppercase tracking-[0.35em] text-[#8C8273] font-medium -mt-0.5">
              Haute Joaillerie Atelier • Dubai & Worldwide
            </p>

            <div className="mt-3 inline-block bg-[#F4EFE6] px-4 py-1 rounded-full border border-[#D8CEBE]">
              <span className="font-serif text-sm italic tracking-widest text-[#4A4338]">
                Certificate of Authenticity, Hallmark & Valuation
              </span>
            </div>
          </div>

          {/* Certificate Reference Metadata */}
          <div className="relative my-6 grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-[#F8F5EE] border border-[#E3DBD0] rounded-sm text-xs">
            <div>
              <span className="text-[9px] uppercase tracking-wider text-[#8C8273] block">Certificate No.</span>
              <span className="font-mono font-bold text-[#1E1B18]">{certificate.certificateNumber}</span>
            </div>
            <div>
              <span className="text-[9px] uppercase tracking-wider text-[#8C8273] block">Order Ref.</span>
              <span className="font-mono font-medium text-[#1E1B18]">{certificate.orderNumber}</span>
            </div>
            <div>
              <span className="text-[9px] uppercase tracking-wider text-[#8C8273] block">Date of Issue</span>
              <span className="font-medium text-[#1E1B18]">{certificate.issueDate}</span>
            </div>
            <div>
              <span className="text-[9px] uppercase tracking-wider text-[#8C8273] block">Assayed To</span>
              <span className="font-medium text-[#1E1B18] truncate block">{certificate.ownerName}</span>
            </div>
          </div>

          {/* Product Overview Section */}
          <div className="relative grid grid-cols-1 sm:grid-cols-12 gap-6 items-center my-6 pb-6 border-b border-[#E0D5C5]">
            
            <div className="sm:col-span-4 flex justify-center">
              <div className="w-36 h-36 rounded-sm overflow-hidden border border-[#D8CEBE] shadow-sm bg-white p-1">
                <img
                  src={certificate.productImage}
                  alt={certificate.productName}
                  className="w-full h-full object-cover rounded-sm"
                />
              </div>
            </div>

            <div className="sm:col-span-8">
              <span className="text-[10px] uppercase tracking-widest text-[#9B7D44] font-semibold">
                Certified Creation
              </span>
              <h3 className="font-serif text-2xl text-[#1E1B18] font-normal leading-tight mb-2">
                {certificate.productName}
              </h3>

              <div className="flex items-center gap-2 mb-4">
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#166534] bg-[#DCFCE7] px-2.5 py-0.5 rounded-full">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  BIS Registered Hallmark Verified
                </span>
                {certificate.giaReportId && (
                  <span className="text-[11px] font-medium text-[#4338CA] bg-[#EEF2FF] px-2.5 py-0.5 rounded-full">
                    {certificate.giaReportId}
                  </span>
                )}
              </div>

              <div className="text-xs text-[#595246] space-y-1">
                <p>
                  This certifies that the creation described herein is crafted from authentic precious metal conforming strictly to the Bureau of Indian Standards (BIS) Hallmarking Order.
                </p>
              </div>
            </div>

          </div>

          {/* Specifications Grid */}
          <div className="relative mb-6">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#695F52] mb-3">
              Laboratory Gemological Examination
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Precious Metal Box */}
              <div className="p-4 bg-[#F8F5EE] border border-[#E3DBD0] rounded-sm text-xs space-y-2">
                <span className="font-serif font-bold text-sm text-[#1C1A17] block border-b border-[#E0D5C5] pb-1">
                  Precious Metal Specifications
                </span>
                <div className="flex justify-between">
                  <span className="text-[#7A7165]">Metal Alloy:</span>
                  <span className="font-medium text-[#1E1B18]">{certificate.metalType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#7A7165]">Assay Purity:</span>
                  <span className="font-medium text-[#1E1B18]">{certificate.metalPurity}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#7A7165]">Gross Weight:</span>
                  <span className="font-medium text-[#1E1B18]">{certificate.grossWeightGrams} grams</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#7A7165]">Net Gold Weight:</span>
                  <span className="font-medium text-[#1E1B18]">{certificate.netGoldWeightGrams} grams</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#7A7165]">BIS Hallmark Ref:</span>
                  <span className="font-mono font-medium text-[#1E1B18]">{certificate.bisHallmarkId}</span>
                </div>
              </div>

              {/* Diamond & Gemstone Box */}
              <div className="p-4 bg-[#F8F5EE] border border-[#E3DBD0] rounded-sm text-xs space-y-2">
                <span className="font-serif font-bold text-sm text-[#1C1A17] block border-b border-[#E0D5C5] pb-1">
                  Gemstone & Diamond 4Cs
                </span>
                <div className="flex justify-between">
                  <span className="text-[#7A7165]">Primary Gem:</span>
                  <span className="font-medium text-[#1E1B18]">{certificate.gemstoneDetails}</span>
                </div>
                {certificate.diamondWeightCarats ? (
                  <>
                    <div className="flex justify-between">
                      <span className="text-[#7A7165]">Diamond Weight:</span>
                      <span className="font-medium text-[#1E1B18]">{certificate.diamondWeightCarats} Carats</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#7A7165]">Color Grade:</span>
                      <span className="font-medium text-[#1E1B18]">{certificate.diamondColor}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#7A7165]">Clarity Grade:</span>
                      <span className="font-medium text-[#1E1B18]">{certificate.diamondClarity}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#7A7165]">Cut Grade:</span>
                      <span className="font-medium text-[#1E1B18]">{certificate.diamondCut}</span>
                    </div>
                  </>
                ) : (
                  <div className="text-[#7A7165] italic py-2">
                    Solid precious metal creation without diamond setting.
                  </div>
                )}
              </div>

            </div>
          </div>

          {/* Replacement Valuation */}
          <div className="relative flex items-center justify-between p-4 bg-[#F4EFE6] border border-[#C9A86A]/50 rounded-sm mb-6">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#7A7165] block">
                Official Insurance Replacement Valuation
              </span>
              <span className="font-serif text-2xl font-bold text-[#1E1B18]">
                {formatINR(certificate.valuationINR)}
              </span>
            </div>
            <div className="text-right text-[11px] text-[#695F52]">
              <span>Audited under Mumbai Bullion Spot Rates</span>
            </div>
          </div>

          {/* Signatures & Security Stamp */}
          <div className="relative pt-6 border-t border-[#E0D5C5] grid grid-cols-1 sm:grid-cols-12 gap-6 items-end">
            
            {/* QR Verification Code */}
            <div className="sm:col-span-4 flex items-center gap-3">
              <div className="w-16 h-16 bg-white p-1 rounded border border-[#D8CEBE] flex items-center justify-center flex-shrink-0 shadow-sm">
                <QrCode className="w-14 h-14 text-[#1C1A17]" />
              </div>
              <div className="text-[10px] text-[#695F52]">
                <span className="font-semibold block text-[#1C1A17]">Instant Vault Scan</span>
                <span>Scan with any camera to verify live hallmark registry status.</span>
              </div>
            </div>

            {/* Gold Hologram Embleming */}
            <div className="sm:col-span-4 text-center">
              <div className="inline-block p-2 rounded-full border border-[#C9A86A] bg-gradient-to-tr from-[#E8DEC8] via-[#FAF6EE] to-[#C9A86A]">
                <ShieldCheck className="w-7 h-7 text-[#9B7D44]" />
              </div>
              <span className="block text-[9px] uppercase tracking-widest text-[#8C7449] font-bold mt-1">
                Tamper-Proof Holographic Seal
              </span>
            </div>

            {/* Gemologist Signature */}
            <div className="sm:col-span-4 text-right">
              <div className="font-serif italic text-lg text-[#1C1A17] font-semibold border-b border-[#8C7449]/40 pb-1 inline-block min-w-[140px] text-center">
                M. S. Deshmukh
              </div>
              <span className="block text-[10px] font-semibold text-[#1C1A17] mt-1">
                {certificate.certifiedGemologist}
              </span>
              <span className="block text-[9px] text-[#7A7165]">
                Chief Assayer & Senior Gemologist
              </span>
            </div>

          </div>

          {/* Footer notice */}
          <div className="text-center text-[9px] text-[#9E9589] tracking-wider mt-6 pt-4 border-t border-[#EAE3D6]">
            This certificate is registered in the Subha Official Vault and certified authentic with tamper-proof security tracking.
          </div>

        </div>

      </motion.div>
    </div>
  );
};
