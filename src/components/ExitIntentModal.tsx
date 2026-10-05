import React, { useState, useEffect } from 'react';
import { X, ShieldCheck, Phone, ArrowRight, Clock } from 'lucide-react';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white border border-[#E5E7EB] rounded-2xl max-w-md w-full p-6 sm:p-8 relative shadow-2xl text-center text-[#111827]">
        <button
          onClick={handleDismiss}
          className="absolute top-4 right-4 p-2 text-[#4B5563] hover:text-[#111827] rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-12 h-12 rounded-2xl bg-[#EEF8FC] border border-[#35B6DE]/30 flex items-center justify-center mx-auto mb-3.5 text-[#35B6DE]">
          <Clock className="w-6 h-6" />
        </div>

        <span className="text-xs font-bold uppercase tracking-wider text-[#35B6DE] block mb-1">
          Instant Driver Allocation Desk
        </span>

        <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#111827] mb-2 leading-tight">
          Looking for a Verified Driver in Mumbai?
        </h3>

        <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed mb-6 font-normal">
          Speak directly with our concierge team. We match your vehicle model and schedule with a 100% police-verified chauffeur within 30 minutes.
        </p>

        <div className="space-y-3">
          <button
            onClick={handleClaim}
            className="btn-primary w-full h-12 text-sm font-bold flex items-center justify-center gap-2 shadow-xs"
          >
            <span>Book a Driver Online</span>
            <ArrowRight className="w-4 h-4 text-[#111827]" />
          </button>

          <a
            href="tel:8652880057"
            className="btn-secondary w-full h-12 text-sm font-semibold flex items-center justify-center gap-2"
          >
            <Phone className="w-4 h-4 text-[#35B6DE]" />
            <span>Call 24/7 Desk: 8652880057</span>
          </a>
        </div>

        <div className="mt-5 flex items-center justify-center gap-2 text-xs text-[#4B5563]">
          <ShieldCheck className="w-4 h-4 text-[#22C55E]" />
          <span>No advance brokerages &middot; 100% Police Verified Drivers</span>
        </div>
      </div>
    </div>
  );
};
