import React from 'react';
import { Phone, MessageSquare, Calendar } from 'lucide-react';

interface StickyMobileBarProps {
  onOpenBooking: () => void;
}

export const StickyMobileBar: React.FC<StickyMobileBarProps> = ({ onOpenBooking }) => {
  return (
    <aside
      aria-label="Mobile Quick Actions"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-black/95 backdrop-blur-xl border-t border-[#D4AF37]/35 px-3 py-1.5 pb-[max(0.375rem,env(safe-area-inset-bottom))] shadow-2xl h-[54px] max-h-[60px] flex items-center"
    >
      <div className="flex items-center justify-between gap-2 w-full max-w-md mx-auto">
        {/* Call Now Button - Equal 1/3 Width */}
        <a
          href="tel:+919930012345"
          className="flex-1 h-9 sm:h-10 flex items-center justify-center gap-1.5 px-2 text-[11px] font-semibold text-white bg-neutral-900 border border-neutral-700/80 rounded-lg hover:border-[#D4AF37] active:scale-[0.98] transition-all whitespace-nowrap min-w-0"
          aria-label="Call Helpline"
        >
          <Phone className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
          <span className="truncate">Call Now</span>
        </a>

        {/* WhatsApp Button - Equal 1/3 Width */}
        <a
          href="https://wa.me/919930012345?text=Hello%20Driver%20Nest%20India,%20I%20would%20like%20to%20request%20a%20driver%20in%20Mumbai."
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 h-9 sm:h-10 flex items-center justify-center gap-1.5 px-2 text-[11px] font-semibold text-[#25D366] bg-[#25D366]/15 border border-[#25D366]/40 rounded-lg hover:bg-[#25D366]/25 active:scale-[0.98] transition-all whitespace-nowrap min-w-0"
          aria-label="Chat on WhatsApp"
        >
          <MessageSquare className="w-3.5 h-3.5 text-[#25D366] shrink-0" />
          <span className="truncate">WhatsApp</span>
        </a>

        {/* Book Driver Button - Equal 1/3 Width */}
        <button
          onClick={onOpenBooking}
          className="flex-1 h-9 sm:h-10 flex items-center justify-center gap-1.5 px-2 text-[11px] font-bold text-black bg-gradient-to-r from-[#F3D085] via-[#D4AF37] to-[#B89020] rounded-lg shadow-sm shadow-[#D4AF37]/25 active:scale-[0.98] transition-all whitespace-nowrap cursor-pointer border border-white/20 min-w-0"
          aria-label="Request a Driver"
        >
          <Calendar className="w-3.5 h-3.5 text-black shrink-0" />
          <span className="truncate">Book Driver</span>
        </button>
      </div>
    </aside>
  );
};
