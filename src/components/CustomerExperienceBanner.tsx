import React from 'react';
import { Phone, Calendar, MessageSquare, ShieldCheck, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';

interface CustomerExperienceBannerProps {
  onOpenBooking: () => void;
}

export const CustomerExperienceBanner: React.FC<CustomerExperienceBannerProps> = ({ onOpenBooking }) => {
  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      'Hello On Time Driver Service, I would like to book a professional chauffeur in Mumbai.'
    );
    window.open(`https://wa.me/918652880057?text=${text}`, '_blank');
  };

  return (
    <section className="relative py-20 lg:py-28 overflow-hidden bg-[#0A0A0A] text-white border-b border-white/10">
      {/* Background Chauffeur Opening Car Door Image with Dark Cinematic Overlay */}
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src="/images/services/chauffeur-service.jpg"
          alt="Professional Indian chauffeur opening luxury car door politely for passenger in Mumbai"
          fallbackTitle="Chauffeur Opening Car Door for Passenger"
          className="w-full h-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/90 to-[#0A0A0A]/85" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center lg:text-left">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#121212] border border-[#35B5D8]/40 text-[#35B5D8] text-xs font-bold uppercase tracking-wider mb-4 shadow-md">
              <Sparkles className="w-3.5 h-3.5 text-[#F2F028]" />
              <span>Executive Chauffeur &amp; Mobility Experience</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-white tracking-tight mb-4 leading-tight">
              Professional Drivers.<br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#35B5D8] to-[#85dbf2]"> Reliable Service.</span><br />
              <span className="text-[#F2F028]">Available Across Mumbai.</span>
            </h2>

            <p className="text-sm sm:text-base text-[#D1D5DB] font-normal max-w-2xl mb-7 leading-relaxed">
              Experience the unmatched peace of mind of having your own verified, punctual chauffeur behind the wheel of your Honda City, Toyota Innova Crysta, or luxury car. Perfect for office commutes, family appointments, and airport transfers.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-300 mb-8 justify-center lg:justify-start">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#22C55E]" />
                <span>Police Verified Chauffeurs</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#22C55E]" />
                <span>Guaranteed Punctuality</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#22C55E]" />
                <span>Zero Brokerage or Advance Commissions</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3.5">
              <button
                onClick={onOpenBooking}
                className="btn-primary w-full sm:w-auto h-[52px] px-8 text-base font-bold flex items-center justify-center gap-2 shadow-xl shadow-[#F2F028]/20"
              >
                <Calendar className="w-4 h-4 text-[#0A0A0A]" />
                <span>Book Driver Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="tel:8652880057"
                className="btn-secondary w-full sm:w-auto h-[52px] px-7 text-base font-bold flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-[#35B5D8]" />
                <span>Call 8652880057</span>
              </a>

              <button
                onClick={handleWhatsApp}
                className="h-[52px] px-6 rounded-xl bg-[#25D366]/20 border border-[#25D366]/40 text-[#25D366] font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#25D366]/30 transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Desk</span>
              </button>
            </div>
          </div>

          {/* Quick highlight stat box */}
          <div className="lg:col-span-4 hidden lg:block">
            <div className="p-7 rounded-2xl bg-[#121212] border border-white/15 text-left shadow-2xl">
              <div className="text-xs font-bold text-[#F2F028] uppercase tracking-wider mb-2">
                Rapid Doorstep Dispatch
              </div>
              <div className="text-3xl font-extrabold text-white font-heading mb-1">
                30–45 Mins
              </div>
              <p className="text-xs text-[#D1D5DB] mb-5">
                Chauffeurs staged across BKC, South Mumbai, Western Suburbs, Thane &amp; Navi Mumbai.
              </p>
              <div className="p-4 rounded-xl bg-black/50 border border-white/10 text-xs text-neutral-300 space-y-2.5">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#35B5D8]" />
                  <span>Uniformed &amp; Disciplined Chauffeur</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#35B5D8]" />
                  <span>Manual &amp; Automatic Transmission Expert</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#35B5D8]" />
                  <span>Non-Smoking &amp; VIP Etiquette Trained</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
