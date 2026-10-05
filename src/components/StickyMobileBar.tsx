import React, { useState, useEffect } from 'react';
import { Phone, Calendar } from 'lucide-react';

interface StickyMobileBarProps {
  onOpenBooking: () => void;
}

export const StickyMobileBar: React.FC<StickyMobileBarProps> = ({ onOpenBooking }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky bar once user scrolls slightly past hero
      setIsVisible(window.scrollY > 200);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <nav
      aria-label="Quick mobile booking actions"
      className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-white/95 backdrop-blur-md border-t border-[#E5E7EB] px-3 py-2.5 shadow-lg animate-fade-in"
    >
      <div className="max-w-md mx-auto grid grid-cols-2 gap-2.5">
        {/* Sticky Call Button */}
        <a
          href="tel:8652880057"
          className="h-[48px] rounded-xl bg-white border border-[#E5E7EB] text-[#111827] flex items-center justify-center gap-2 text-xs sm:text-sm font-bold active:scale-98 transition-transform shadow-xs hover:border-[#35B6DE]"
        >
          <Phone className="w-4 h-4 text-[#35B6DE]" />
          <span>Call 8652880057</span>
        </a>

        {/* Sticky Book Driver Button */}
        <button
          onClick={onOpenBooking}
          className="h-[48px] rounded-xl bg-[#F3ED1A] text-[#111827] flex items-center justify-center gap-2 text-xs sm:text-sm font-bold active:scale-98 transition-transform shadow-xs"
        >
          <Calendar className="w-4 h-4 text-[#111827]" />
          <span>Book Driver</span>
        </button>
      </div>
    </nav>
  );
};
