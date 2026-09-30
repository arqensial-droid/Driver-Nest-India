import React from 'react';
import { Phone, MessageSquare, Calendar } from 'lucide-react';

interface StickyMobileBarProps {
  onOpenBooking: () => void;
}

export const StickyMobileBar: React.FC<StickyMobileBarProps> = ({ onOpenBooking }) => {
  return (
    <aside
      aria-label="Mobile Quick Actions"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-black/95 backdrop-blur-xl border-t border-[#D4AF37]/30 px-3 py-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))] shadow-2xl"
    >
      <div className="flex items-center justify-between gap-2 max-w-md mx-auto h-11">
        {/* Call Now Button */}
        <a
          href="tel:+919930012345"
          className="flex-1 h-11 flex items-center justify-center gap-1.5 px-2 text-xs font-semibold text-white bg-neutral-900 border border-neutral-700/80 rounded-xl hover:border-[#D4AF37] active:scale-[0.98] transition-all whitespace-nowrap"
          aria-label="Call Helpline"
        >
          <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>Call Now</span>
        </a>

        {/* WhatsApp Button */}
        <a
          href="https://wa.me/919930012345?text=Hello%20Driver%20Nest%20India,%20I%20would%20like%20to%20request%20a%20driver%20in%20Mumbai."
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 h-11 flex items-center justify-center gap-1.5 px-2 text-xs font-semibold text-[#25D366] bg-[#25D366]/15 border border-[#25D366]/40 rounded-xl hover:bg-[#25D366]/25 active:scale-[0.98] transition-all whitespace-nowrap"
          aria-label="Chat on WhatsApp"
        >
          <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
          <span>WhatsApp</span>
        </a>

        {/* Book Driver Button */}
        <button
          onClick={onOpenBooking}
          className="flex-[1.2] h-11 flex items-center justify-center gap-1.5 px-3 text-xs font-bold text-black bg-gradient-to-r from-[#F3D085] via-[#D4AF37] to-[#B89020] rounded-xl shadow-md shadow-[#D4AF37]/25 active:scale-[0.98] transition-all whitespace-nowrap cursor-pointer border border-white/20"
          aria-label="Request a Driver"
        >
          <Calendar className="w-3.5 h-3.5 text-black" />
          <span>Book Driver</span>
        </button>
      </div>
    </aside>
  );
};
