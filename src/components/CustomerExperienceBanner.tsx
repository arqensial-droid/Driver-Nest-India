import React from 'react';
import { Phone, Calendar, MessageSquare, ShieldCheck, ArrowRight, CheckCircle2, Sparkles, Clock, MapPin } from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';

interface CustomerExperienceBannerProps {
  onOpenBooking: () => void;
}

export const CustomerExperienceBanner: React.FC<CustomerExperienceBannerProps> = ({ onOpenBooking }) => {
  const handleWhatsApp = () => {
    const text = encodeURIComponent('Hi, I need a professional driver service.');
    window.open(`https://wa.me/918652880057?text=${text}`, '_blank');
  };

  return (
    <section className="relative py-16 lg:py-24 overflow-hidden bg-[#EEF8FC] text-[#111827] border-b border-[#E5E7EB]">
      {/* Subtle Corporate Chauffeur Background with Clean Light Overlay */}
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src="/images/services/chauffeur-service.jpg"
          alt="Professional Indian chauffeur opening car door for executive in Mumbai"
          fallbackTitle="Chauffeur Service Experience"
          className="w-full h-full object-cover opacity-15"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#EEF8FC] via-[#EEF8FC]/90 to-[#EEF8FC]/75" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center lg:text-left">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          <div className="lg:col-span-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#35B6DE]/30 text-[#35B6DE] text-xs font-bold uppercase tracking-wider mb-4 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#35B6DE]" />
              <span>Executive Chauffeur &amp; Mobility Experience</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-[#111827] tracking-tight mb-4 leading-tight">
              Professional Drivers.<br className="hidden sm:inline" />
              <span className="text-[#35B6DE]"> Reliable Service.</span><br />
              <span>Available Across Mumbai.</span>
            </h2>

            <p className="text-sm sm:text-base text-[#4B5563] font-normal max-w-2xl mb-7 leading-relaxed">
              Experience the unmatched peace of mind of having your own verified, punctual chauffeur behind the wheel of your Honda City, Toyota Innova Crysta, or luxury car. Perfect for office commutes, family appointments, and airport transfers.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-[#4B5563] mb-8 justify-center lg:justify-start">
              <div className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#22C55E]" />
                <span>Police Verified Chauffeurs</span>
              </div>
              <div className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#22C55E]" />
                <span>Guaranteed Punctuality</span>
              </div>
              <div className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#22C55E]" />
                <span>Zero Brokerage or Hidden Charges</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3.5">
              <button
                onClick={onOpenBooking}
                className="btn-primary w-full sm:w-auto h-[50px] px-8 text-sm sm:text-base font-bold flex items-center justify-center gap-2 shadow-xs cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-[#111827]" />
                <span>Request Driver</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="tel:8652880057"
                className="btn-secondary w-full sm:w-auto h-[50px] px-7 text-sm sm:text-base font-bold flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-[#35B6DE]" />
                <span>Call 8652880057</span>
              </a>

              <button
                onClick={handleWhatsApp}
                className="h-[50px] px-6 rounded-xl bg-[#25D366] text-white font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#20ba59] shadow-xs transition-colors cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 text-white" />
                <span>WhatsApp Desk</span>
              </button>
            </div>
          </div>

          {/* Quick highlight stat box */}
          <div className="lg:col-span-4 hidden lg:block">
            <div className="p-7 rounded-2xl bg-white border border-[#E5E7EB] text-left shadow-xs">
              <div className="text-xs font-bold text-[#35B6DE] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#35B6DE]" />
                <span>Rapid Doorstep Dispatch</span>
              </div>
              <div className="text-2xl font-extrabold text-[#111827] font-heading mb-1">
                Prompt Allocation
              </div>
              <p className="text-xs text-[#4B5563] mb-5 leading-relaxed">
                Chauffeurs staged across BKC, South Mumbai, Western Suburbs, Thane &amp; Navi Mumbai.
              </p>

              <div className="space-y-2 pt-3 border-t border-[#E5E7EB] text-xs text-[#4B5563]">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#35B6DE]" />
                  <span>Verified Identity &amp; Clean Record</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#35B6DE]" />
                  <span>Familiar with Coastal Road &amp; Sea Link</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
