import React, { useState } from 'react';
import { MessageSquare, X } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleWhatsAppClick = () => {
    window.open(
      'https://wa.me/919930012345?text=Hello%20Driver%20Nest%20India,%20I%20need%20a%20verified%20driver%20in%20Mumbai.%20Please%20assist.',
      '_blank'
    );
  };

  return (
    <div className="fixed bottom-[68px] md:bottom-6 right-3 sm:right-5 z-40 flex flex-col items-end pointer-events-auto">
      {/* Tooltip prompt */}
      {showTooltip && (
        <div className="mb-2 relative bg-[#141414] border border-[#25D366]/40 text-white text-[11px] sm:text-xs px-3 py-1.5 rounded-xl shadow-xl flex items-center gap-1.5 max-w-[240px]">
          <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse shrink-0" />
          <span className="truncate">Drivers available in Mumbai</span>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-neutral-400 hover:text-white ml-1 shrink-0"
            aria-label="Dismiss tooltip"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={handleWhatsAppClick}
        className="w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-gradient-to-tr from-[#1EBE5D] to-[#25D366] text-white flex items-center justify-center shadow-lg shadow-[#25D366]/30 hover:scale-105 active:scale-95 transition-all cursor-pointer relative group"
        aria-label="Chat with Driver Nest India on WhatsApp"
      >
        <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6" />
        <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-[#D4AF37] rounded-full border-2 border-black" />
      </button>
    </div>
  );
};
