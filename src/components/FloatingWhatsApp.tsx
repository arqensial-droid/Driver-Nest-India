import React, { useState } from 'react';
import { MessageSquare, X, ChevronLeft } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  const handleWhatsAppClick = () => {
    const text = encodeURIComponent('Hi, I need a professional driver service.');
    window.open(`https://wa.me/918652880057?text=${text}`, '_blank');
  };

  return (
    <aside
      aria-label="Direct WhatsApp support"
      className="fixed bottom-[84px] sm:bottom-[24px] right-[20px] z-40 flex flex-col items-end pointer-events-auto"
    >
      {/* Interactive status teaser with brand logo */}
      {showTooltip && (
        <div className="mb-2.5 relative bg-white/95 backdrop-blur-md border border-[#E5E7EB] text-[#111827] text-xs p-3 rounded-2xl shadow-xl flex flex-col gap-2 max-w-[280px] animate-fade-in transition-all duration-300 hover:border-[#25D366]">
          <div className="flex items-center justify-between gap-2 border-b border-[#E5E7EB]/80 pb-1.5">
            <BrandLogo size="widget" />
            <button
              onClick={() => setShowTooltip(false)}
              className="text-[#9CA3AF] hover:text-[#111827] shrink-0 p-0.5 cursor-pointer"
              aria-label="Dismiss message"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#22C55E] animate-pulse shrink-0" />
            <span className="font-semibold text-[#111827] text-[11px]">
              24/7 Central Desk <span className="text-[#35B6DE] font-bold">Online</span>
            </span>
          </div>
        </div>
      )}

      {/* Floating WhatsApp Action Container */}
      <div className="flex items-center gap-2.5 group">
        {/* Subtle Horizontal Slide Label on Desktop Hover */}
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-[#E5E7EB] text-[#111827] text-xs font-semibold shadow-md opacity-0 translate-x-3 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-out">
          <ChevronLeft className="w-3.5 h-3.5 text-[#22C55E] animate-pulse" />
          <span>Chat on WhatsApp</span>
        </div>

        {/* Floating WhatsApp Button */}
        <button
          onClick={handleWhatsAppClick}
          className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center relative cursor-pointer border-2 border-white shadow-lg shadow-[#25D366]/30 transition-all duration-300 ease-out transform group-hover:scale-105 group-hover:bg-[#20ba59] active:scale-95"
          aria-label="Chat with On Time Driver Service on WhatsApp: 8652880057"
        >
          <MessageSquare className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" />
          
          {/* Notification Counter Badge */}
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#F3ED1A] text-[#111827] font-extrabold text-[9px] rounded-full flex items-center justify-center border-2 border-white shadow-xs">
            1
          </span>
        </button>
      </div>
    </aside>
  );
};
