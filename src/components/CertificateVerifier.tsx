import React, { useState } from 'react';
import { motion } from 'motion/react';
import { JewelleryCertificate } from '../types';
import { ShieldCheck, Search, X, CheckCircle, Award } from 'lucide-react';
import { formatINR } from '../utils/formatters';

interface CertificateVerifierProps {
  isOpen: boolean;
  onClose: () => void;
  allCertificates: JewelleryCertificate[];
  onViewCertificate: (cert: JewelleryCertificate) => void;
}

export const CertificateVerifier: React.FC<CertificateVerifierProps> = ({
  isOpen,
  onClose,
  allCertificates,
  onViewCertificate,
}) => {
  const [query, setQuery] = useState('');
  const [searched, setSearched] = useState(false);
  const [foundCert, setFoundCert] = useState<JewelleryCertificate | null>(null);

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setSearched(true);
    const q = query.trim().toUpperCase();
    const result = allCertificates.find(
      (c) =>
        c.certificateNumber.toUpperCase().includes(q) ||
        c.bisHallmarkId.toUpperCase().includes(q) ||
        c.orderNumber.toUpperCase().includes(q)
    );
    setFoundCert(result || null);
  };

  const sampleCert = allCertificates[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
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
        className="relative z-10 w-full max-w-2xl bg-[#FAF8F5] rounded-sm shadow-2xl border border-[#E3DBD0] p-6 sm:p-8"
      >
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#7A7165] hover:text-[#1E1B18] p-1.5 transition-all cursor-pointer hover:rotate-90 rounded-full hover:bg-black/5"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="text-center mb-6">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#F4EFE6] text-[#9B7D44] mb-3 border border-[#E3DBD0]"
          >
            <ShieldCheck className="w-6 h-6" />
          </motion.div>
          <h2 className="font-serif text-2xl sm:text-3xl text-[#1E1B18] font-normal tracking-tight">
            Verify BIS Vault Authenticity
          </h2>
          <p className="text-xs text-[#7A7165] mt-1 max-w-md mx-auto">
            Input your Certificate ID or BIS Hallmark registration number to verify gold purity, natural diamond grading, and official valuation.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSearch} className="mb-6">
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#8C7449] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g. AUR-BIS-2026-..."
                className="w-full pl-10 pr-4 py-3 bg-white border border-[#D8CEBE] rounded-sm text-xs font-mono tracking-wide focus:outline-none focus:border-[#C9A86A]"
              />
            </div>
            <button
              type="submit"
              className="relative overflow-hidden group py-3 px-6 bg-[#1C1A17] text-white text-xs uppercase tracking-wide font-semibold hover:bg-gradient-to-r hover:from-[#C9A86A] hover:to-[#DFC285] hover:text-[#1C1A17] transition-all duration-300 rounded-sm flex items-center justify-center gap-1.5 cursor-pointer shadow-md hover:scale-[1.02] active:scale-[0.98]"
            >
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />
              <span>Verify Registry</span>
            </button>
          </div>

          {/* Quick sample link if available */}
          {sampleCert && (
            <div className="mt-2 text-right">
              <button
                type="button"
                onClick={() => {
                  setQuery(sampleCert.certificateNumber);
                  setFoundCert(sampleCert);
                  setSearched(true);
                }}
                className="text-[11px] text-[#8C7449] hover:underline cursor-pointer"
              >
                Try sample certificate: <span className="font-mono">{sampleCert.certificateNumber}</span>
              </button>
            </div>
          )}
        </form>

        {/* Result Area */}
        {searched && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 pt-4 border-t border-[#EAE3D6]"
          >
            {foundCert ? (
              <div className="bg-[#F8F5EE] border border-[#C9A86A]/40 p-4 sm:p-5 rounded-sm">
                <div className="flex items-center gap-2 text-[#166534] text-xs font-semibold mb-3">
                  <CheckCircle className="w-4 h-4" />
                  <span>Official Certificate Authenticated in Subha Vault</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                  <div className="sm:col-span-3">
                    <img
                      src={foundCert.productImage}
                      alt={foundCert.productName}
                      className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-sm border border-[#D8CEBE]"
                    />
                  </div>

                  <div className="sm:col-span-9 text-xs space-y-1 min-w-0">
                    <span className="font-mono text-[#8C7449] block text-[10px] font-bold truncate">
                      {foundCert.certificateNumber}
                    </span>
                    <h4 className="font-serif text-lg text-[#1E1B18] font-medium leading-tight break-words">
                      {foundCert.productName}
                    </h4>
                    <p className="text-[#695F52]">
                      Assayed to: <strong>{foundCert.ownerName}</strong> • Date: {foundCert.issueDate}
                    </p>
                    <p className="text-[#695F52]">
                      Gold: <strong>{foundCert.metalPurity}</strong> ({foundCert.netGoldWeightGrams}g) • BIS: {foundCert.bisHallmarkId}
                    </p>
                    {foundCert.diamondWeightCarats && (
                      <p className="text-[#695F52]">
                        Diamonds: <strong>{foundCert.diamondWeightCarats} ctw</strong> ({foundCert.diamondColor} / {foundCert.diamondClarity})
                      </p>
                    )}
                    <p className="text-[#1E1B18] font-serif font-bold text-sm pt-1">
                      Valuation: {formatINR(foundCert.valuationINR)}
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-[#E3DBD0] flex justify-end">
                  <button
                    onClick={() => {
                      onViewCertificate(foundCert);
                      onClose();
                    }}
                    className="relative overflow-hidden group flex items-center gap-1.5 px-4 py-2 bg-[#1C1A17] text-[#FAF8F5] text-xs uppercase tracking-wide font-semibold rounded-sm hover:bg-gradient-to-r hover:from-[#C9A86A] hover:to-[#DFC285] hover:text-[#1C1A17] transition-all duration-300 cursor-pointer shadow-sm hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />
                    <Award className="w-3.5 h-3.5" />
                    <span>View & Print Full Certificate</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-6 bg-[#FBF0F0] border border-[#F5C6CB] rounded-sm text-xs text-[#721C24] p-4">
                <p className="font-semibold mb-1">No certificate record matched "{query}"</p>
                <p className="text-[11px] text-[#856404]">
                  Please verify the certificate serial etched onto your physical Subha guarantee card or receipt.
                </p>
              </div>
            )}
          </motion.div>
        )}

      </motion.div>
    </div>
  );
};
