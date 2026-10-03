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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="bg-[#121212] border border-white/15 rounded-2xl max-w-md w-full p-6 sm:p-8 relative shadow-2xl text-center text-white">
        <button
          onClick={handleDismiss}
          className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-13 h-13 rounded-2xl bg-[#35B5D8]/15 border border-[#35B5D8]/30 flex items-center justify-center mx-auto mb-3.5 text-[#35B5D8]">
          <Clock className="w-6 h-6" />
        </div>

        <span className="text-xs font-bold uppercase tracking-wider text-[#35B5D8] block mb-1">
          Instant Driver Allocation Desk
        </span>

        <h3 className="font-heading text-xl sm:text-2xl font-bold text-white mb-2 leading-tight">
          Looking for a Verified Driver in Mumbai?
        </h3>

        <p className="text-xs sm:text-sm text-[#D1D5DB] leading-relaxed mb-6 font-normal">
          Speak directly with our concierge team. We match your vehicle model and schedule with a 100% police-verified chauffeur within 30 minutes.
        </p>

        <div className="space-y-3">
          <button
            onClick={handleClaim}
            className="btn-primary w-full h-[52px] text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-[#F2F028]/20"
          >
            <span>Book a Driver Online</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <a
            href="tel:8652880057"
            className="btn-secondary w-full h-[52px] text-sm font-semibold flex items-center justify-center gap-2"
          >
            <Phone className="w-4 h-4 text-[#35B5D8]" />
            <span>Call 24/7 Concierge: 8652880057</span>
          </a>
        </div>

        <div className="mt-5 flex items-center justify-center gap-2 text-xs text-neutral-400">
          <ShieldCheck className="w-4 h-4 text-[#22C55E]" />
          <span>No advance brokerages · Police Verified Drivers</span>
        </div>
      </div>
    </div>
  );
};
