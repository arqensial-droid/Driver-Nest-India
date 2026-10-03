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
      className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-[#050505]/95 backdrop-blur-md border-t border-white/15 px-3 py-2.5 shadow-2xl animate-fade-in"
    >
      <div className="max-w-md mx-auto grid grid-cols-2 gap-2.5">
        {/* Sticky Call Button */}
        <a
          href="tel:8652880057"
          className="h-[50px] rounded-xl bg-[#0B0B0B] border border-[#35B6DE]/50 text-white flex items-center justify-center gap-2 text-sm font-bold active:scale-98 transition-transform shadow-md"
        >
          <Phone className="w-4 h-4 text-[#35B6DE]" />
          <span>Call Desk</span>
        </a>

        {/* Sticky Book Driver Button */}
        <button
          onClick={onOpenBooking}
          className="h-[50px] rounded-xl bg-[#F3ED1A] text-[#050505] flex items-center justify-center gap-2 text-sm font-bold active:scale-98 transition-transform shadow-lg shadow-[#F3ED1A]/20"
        >
          <Calendar className="w-4 h-4 text-[#050505]" />
          <span>Book Driver</span>
        </button>
      </div>
    </nav>
  );
};
