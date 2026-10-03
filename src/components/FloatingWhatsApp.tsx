import React, { useState } from 'react';
import { MessageSquare, X } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  const handleWhatsAppClick = () => {
    const text = encodeURIComponent('Hi, I need a professional driver service.');
    window.open(`https://wa.me/918652880057?text=${text}`, '_blank');
  };

  return (
    <aside
      aria-label="Direct WhatsApp support"
      className="fixed bottom-[84px] sm:bottom-[20px] right-[20px] z-40 flex flex-col items-end pointer-events-auto"
    >
      {/* Interactive status teaser */}
      {showTooltip && (
        <div className="mb-2 relative bg-[#0B0B0B]/95 backdrop-blur-md border border-[#35B6DE]/40 text-white text-xs px-3.5 py-2 rounded-xl shadow-2xl shadow-black/80 flex items-center gap-2 max-w-[260px] animate-fade-in">
          <span className="w-2.5 h-2.5 rounded-full bg-[#25D366] animate-pulse shrink-0" />
          <span className="font-semibold text-neutral-200">
            24/7 Chauffeur Desk <span className="text-[#F3ED1A] font-bold">Online</span>
          </span>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-neutral-400 hover:text-white ml-1 shrink-0 p-0.5"
            aria-label="Dismiss message"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating WhatsApp Button (20px margin, never overlaps CTA buttons) */}
      <button
        onClick={handleWhatsAppClick}
        className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white flex items-center justify-center shadow-2xl shadow-[#25D366]/30 hover:scale-110 active:scale-95 transition-all cursor-pointer relative group border-2 border-white/20"
        aria-label="Chat with On Time Driver Service on WhatsApp: 8652880057"
      >
        <MessageSquare className="w-6 h-6" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#F3ED1A] text-[#050505] font-extrabold text-[9px] rounded-full flex items-center justify-center border-2 border-[#050505]">
          1
        </span>
      </button>
    </aside>
  );
};
