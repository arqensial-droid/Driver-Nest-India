import React from 'react';
import { Phone, Calendar, MessageSquare, ShieldCheck, ArrowRight, CheckCircle2, Sparkles, Clock, MapPin } from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';

interface FinalCTASectionProps {
  onOpenBooking: () => void;
}

export const FinalCTASection: React.FC<FinalCTASectionProps> = ({ onOpenBooking }) => {
  const handleWhatsApp = () => {
    const text = encodeURIComponent('Hi, I need a professional driver service.');
    window.open(`https://wa.me/918652880057?text=${text}`, '_blank');
  };

  return (
    <section className="relative py-20 lg:py-28 overflow-hidden bg-[#050505] text-white border-t border-b border-white/10">
      {/* Background Chauffeur & Executive Atmosphere with 75% Dark Overlay */}
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src="/images/services/chauffeur-service.jpg"
          alt="Professional Indian chauffeur opening luxury car door politely for passenger in Mumbai"
          fallbackTitle="Executive Chauffeur Service Mumbai"
          className="w-full h-full object-cover opacity-20 filter grayscale contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/95 to-[#050505]/80" />
      </div>

      {/* Ambient Glows */}
      <div className="glow-blue-lg top-10 left-10 pointer-events-none" />
      <div className="glow-yellow-sm bottom-10 right-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-[#0B0B0B]/90 backdrop-blur-md rounded-3xl border border-white/15 p-8 sm:p-12 lg:p-16 shadow-2xl relative overflow-hidden">
          
          <div className="max-w-3xl mx-auto text-center">
            {/* Elegant Header Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#050505] border border-[#35B6DE]/50 text-[#35B6DE] text-xs font-bold uppercase tracking-wider mb-5 shadow-lg">
              <Sparkles className="w-3.5 h-3.5 text-[#F3ED1A]" />
              <span>Premium Chauffeur Experience</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-white tracking-tight mb-5 leading-tight">
              Ready to Hire a Verified Chauffeur{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#35B6DE] to-[#F3ED1A]">
                in Mumbai?
              </span>
            </h2>

            <p className="text-sm sm:text-base lg:text-lg text-[#CFCFCF] font-normal mb-8 leading-relaxed">
              Experience the unmatched luxury and peace of mind of having your own 100% police-verified, punctual chauffeur behind the wheel of your Honda City, Toyota Innova Crysta, or luxury car across Mumbai, Thane &amp; Navi Mumbai.
            </p>

            {/* Badges Strip */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm text-neutral-300 mb-10">
              <div className="flex items-center gap-1.5 bg-[#050505] px-3 py-1.5 rounded-lg border border-white/10">
                <CheckCircle2 className="w-4 h-4 text-[#22C55E]" />
                <span className="text-white font-medium">Police Verified Chauffeurs</span>
              </div>
              <div className="flex items-center gap-1.5 bg-[#050505] px-3 py-1.5 rounded-lg border border-white/10">
                <CheckCircle2 className="w-4 h-4 text-[#22C55E]" />
                <span className="text-white font-medium">Rapid 30-Min Dispatch</span>
              </div>
              <div className="flex items-center gap-1.5 bg-[#050505] px-3 py-1.5 rounded-lg border border-white/10">
                <CheckCircle2 className="w-4 h-4 text-[#22C55E]" />
                <span className="text-white font-medium">Replacement Guarantee</span>
              </div>
            </div>

            {/* CTA Buttons: All exactly same height (52px). Stack on mobile, inline on desktop */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3.5 max-w-xl mx-auto mb-8">
              {/* Primary: Book Driver */}
              <button
                onClick={onOpenBooking}
                className="btn-primary w-full sm:w-auto h-[52px] px-8 text-base font-bold flex items-center justify-center gap-2 shadow-xl shadow-[#F3ED1A]/20 transition-all hover:scale-[1.02]"
              >
                <Calendar className="w-4 h-4 text-[#050505]" />
                <span>Book Driver</span>
              </button>

              {/* Secondary: Call Now */}
              <a
                href="tel:8652880057"
                className="btn-secondary w-full sm:w-auto h-[52px] px-7 text-base font-bold flex items-center justify-center gap-2 transition-all hover:border-[#35B6DE]"
              >
                <Phone className="w-4 h-4 text-[#35B6DE]" />
                <span>Call Now</span>
              </a>

              {/* Tertiary: Whatsapp */}
              <button
                onClick={handleWhatsApp}
                className="btn-whatsapp w-full sm:w-auto h-[52px] px-7 text-base font-bold flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
                aria-label="WhatsApp Concierge"
              >
                <MessageSquare className="w-4 h-4 text-white" />
                <span>Whatsapp</span>
              </button>
            </div>

            {/* Direct Contact Reference */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-[#CFCFCF] pt-4 border-t border-white/10">
              <span className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-[#35B6DE]" />
                Direct Concierge: <strong className="text-white">8652880057</strong>
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#35B6DE]" />
                Lead Email: <strong className="text-white">info@ontimedriverservice.com</strong>
              </span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
