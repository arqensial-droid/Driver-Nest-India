import React, { useState, useEffect } from 'react';
import { X, ShieldCheck, MessageSquare, Phone, ArrowRight, Award } from 'lucide-react';

interface ExitIntentModalProps {
  onOpenBooking: () => void;
}

export const ExitIntentModal: React.FC<ExitIntentModalProps> = ({ onOpenBooking }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 15 && !dismissed && !isOpen) {
        setIsOpen(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [dismissed, isOpen]);

  if (!isOpen) return null;

  const handleClaim = () => {
    setIsOpen(false);
    setDismissed(true);
    onOpenBooking();
  };

  const handleDismiss = () => {
    setIsOpen(false);
    setDismissed(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="bg-[#111111] border border-[#D4AF37]/50 rounded-2xl max-w-md w-full p-6 sm:p-8 relative shadow-2xl text-center">
        <button
          onClick={handleDismiss}
          className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white rounded-xl bg-neutral-900 border border-neutral-800 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#E5C07B] to-[#D4AF37] flex items-center justify-center mx-auto mb-4 shadow-lg shadow-[#D4AF37]/25 text-black">
          <Award className="w-7 h-7" />
        </div>

        <span className="text-[11px] font-mono uppercase tracking-widest text-[#E5C07B] block mb-1 font-semibold">
          Priority Chauffeur Allocation
        </span>

        <h3 className="font-display text-2xl font-bold text-white mb-2 leading-tight">
          Need a Verified Chauffeur <span className="gold-gradient-text">in Mumbai?</span>
        </h3>

        <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-6 font-light">
          Speak directly with our senior concierge coordinator. We evaluate your vehicle model and schedule to provide a pre-screened,
          police-verified chauffeur matched to your exact standards.
        </p>

        <div className="space-y-3">
          <button
            onClick={handleClaim}
            className="w-full btn-primary h-12 text-sm"
          >
            <span>Request Priority Consultation</span>
            <ArrowRight className="w-4 h-4 text-black" />
          </button>

          <a
            href="https://wa.me/919930012345?text=Hello%20Driver%20Nest%20India,%20I%20would%20like%20to%20request%20priority%20driver%20consultation."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full btn-whatsapp h-12 text-sm"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Consult via WhatsApp Concierge</span>
          </a>
        </div>

        <div className="flex items-center justify-center gap-2 pt-5 text-[11px] text-neutral-400 font-light">
          <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>Available across Mumbai, Thane, Navi Mumbai &amp; MMR</span>
        </div>
      </div>
    </div>
  );
};
