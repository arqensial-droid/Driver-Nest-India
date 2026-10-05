import React from 'react';
import { HeartHandshake, Briefcase, PlaneTakeoff, Compass, CheckCircle2, ArrowRight, MessageSquare, Sparkles } from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';

interface MumbaiUseCasesSectionProps {
  onSelectServiceAndBook: (serviceTitle: string) => void;
}

export const MumbaiUseCasesSection: React.FC<MumbaiUseCasesSectionProps> = ({ onSelectServiceAndBook }) => {
  const handleWhatsApp = (serviceTitle: string) => {
    const text = encodeURIComponent(
      `Hello On Time Driver Service, I would like to inquire about ${serviceTitle} for Mumbai. Please share driver availability.`
    );
    window.open(`https://wa.me/918652880057?text=${text}`, '_blank');
  };

  return (
    <section id="mumbai-routes" className="py-20 lg:py-24 bg-[#EEF8FC] text-[#111827] border-b border-[#E5E7EB] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#35B6DE]/30 shadow-xs mb-3.5">
            <Sparkles className="w-3.5 h-3.5 text-[#35B6DE]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#35B6DE]">
              Real Mumbai Driving Scenarios
            </span>
          </div>

          <h2 className="text-h2 font-extrabold text-[#111827] mb-4">
            Trusted Across Mumbai's Most Demanding Routes
          </h2>

          <p className="text-subheading text-[#4B5563] leading-relaxed text-base sm:text-lg">
            From assisting elderly parents with hospital visits to executive BKC corporate commutes, late-night airport arrivals, and outstation family trips down the expressway.
          </p>
        </div>

        {/* 4 Dedicated Deep-Dive Showcases */}
        <div className="space-y-8 sm:space-y-10">
          
          {/* 1. Senior Citizen Section */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 lg:p-10 border border-[#E5E7EB] shadow-xs hover:border-[#35B6DE] transition-all">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-6 rounded-2xl overflow-hidden border border-[#E5E7EB] aspect-video relative bg-slate-100 shadow-xs">
                <ImageWithFallback
                  src="/images/services/senior-citizen-assistance.jpg"
                  alt="Senior citizen assisted safely into vehicle by professional chauffeur"
                  fallbackTitle="Senior Citizen Care"
                  vehicleTag="Maruti Ertiga / Honda City"
                  locationTag="Lilavati & Hinduja Hospitals, Mumbai"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="lg:col-span-6 flex flex-col justify-center">
                <div className="flex items-center gap-2 text-xs font-bold text-[#35B6DE] uppercase tracking-wider mb-2">
                  <HeartHandshake className="w-4 h-4 text-[#35B6DE]" />
                  <span>Senior Citizen Transportation Support</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold font-heading text-[#111827] mb-3">
                  Compassionate, Gentle Driving for Elderly Parents
                </h3>
                <p className="text-sm text-[#4B5563] leading-relaxed mb-5 font-normal">
                  Driving through Mumbai's congested roads can be exhausting for senior citizens. Our verified chauffeurs offer door-to-door escorting, assist with bags and walking aids, and maintain smooth, non-jarring driving habits.
                </p>
                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-[#4B5563]">
                    <CheckCircle2 className="w-4 h-4 text-[#22C55E] shrink-0" />
                    <span>Patient assistance for hospital visits at Lilavati, Hinduja &amp; Kokilaben</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-[#4B5563]">
                    <CheckCircle2 className="w-4 h-4 text-[#22C55E] shrink-0" />
                    <span>Smooth acceleration and progressive braking for spine-safe comfort</span>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <button
                    onClick={() => onSelectServiceAndBook('Senior Citizen Driver Care')}
                    className="btn-primary h-11 px-6 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-xs"
                  >
                    <span>Book Senior Care Driver</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleWhatsApp('Senior Citizen Assistance')}
                    className="btn-secondary h-11 px-5 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4 text-[#22C55E]" />
                    <span>WhatsApp Inquiry</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Corporate BKC Executive Transit */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 lg:p-10 border border-[#E5E7EB] shadow-xs hover:border-[#35B6DE] transition-all">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-6 order-2 lg:order-1 flex flex-col justify-center">
                <div className="flex items-center gap-2 text-xs font-bold text-[#35B6DE] uppercase tracking-wider mb-2">
                  <Briefcase className="w-4 h-4 text-[#35B6DE]" />
                  <span>Corporate Transit &amp; BKC Headquarters</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold font-heading text-[#111827] mb-3">
                  Executive Chauffeurs for CXOs, Delegations &amp; Daily Commutes
                </h3>
                <p className="text-sm text-[#4B5563] leading-relaxed mb-5 font-normal">
                  Turn congested commutes between South Mumbai, Bandra, and BKC into productive executive workspaces. Our corporate chauffeurs respect client confidentiality, understand Mumbai traffic bottlenecks, and arrive impeccably groomed in formal attire.
                </p>
                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-[#4B5563]">
                    <CheckCircle2 className="w-4 h-4 text-[#22C55E] shrink-0" />
                    <span>Strict non-disclosure privacy adherence for in-car phone calls &amp; meetings</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-[#4B5563]">
                    <CheckCircle2 className="w-4 h-4 text-[#22C55E] shrink-0" />
                    <span>Monthly corporate invoicing with GST compliance and zero hassle</span>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <button
                    onClick={() => onSelectServiceAndBook('Corporate Chauffeur')}
                    className="btn-primary h-11 px-6 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-xs"
                  >
                    <span>Hire Corporate Chauffeur</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleWhatsApp('Corporate Chauffeur Service')}
                    className="btn-secondary h-11 px-5 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4 text-[#22C55E]" />
                    <span>Corporate Inquiry</span>
                  </button>
                </div>
              </div>
              <div className="lg:col-span-6 order-1 lg:order-2 rounded-2xl overflow-hidden border border-[#E5E7EB] aspect-video relative bg-slate-100 shadow-xs">
                <ImageWithFallback
                  src="/images/services/corporate-driver.jpg"
                  alt="Corporate executive entering luxury car driven by chauffeur in BKC Mumbai"
                  fallbackTitle="BKC Corporate Transit"
                  vehicleTag="Toyota Camry / Mercedes E-Class"
                  locationTag="Bandra Kurla Complex (BKC), Mumbai"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* 3. Airport Transfers (T1 & T2) */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 lg:p-10 border border-[#E5E7EB] shadow-xs hover:border-[#35B6DE] transition-all">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-6 rounded-2xl overflow-hidden border border-[#E5E7EB] aspect-video relative bg-slate-100 shadow-xs">
                <ImageWithFallback
                  src="/images/services/airport-driver.jpg"
                  alt="Airport pickup chauffeur with name placard at Mumbai CSMIA Terminal 2"
                  fallbackTitle="CSMIA Airport Transfers"
                  vehicleTag="Toyota Innova Crysta / Fortuner"
                  locationTag="Chhatrapati Shivaji Maharaj Airport (T1 & T2)"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="lg:col-span-6 flex flex-col justify-center">
                <div className="flex items-center gap-2 text-xs font-bold text-[#35B6DE] uppercase tracking-wider mb-2">
                  <PlaneTakeoff className="w-4 h-4 text-[#35B6DE]" />
                  <span>Chhatrapati Shivaji Maharaj International Airport (T1/T2)</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold font-heading text-[#111827] mb-3">
                  Punctual Airport Pickups &amp; Drop-offs Anytime, Day or Night
                </h3>
                <p className="text-sm text-[#4B5563] leading-relaxed mb-5 font-normal">
                  Never stress about parking fees, midnight flight delays, or finding a cab outside Terminal 2. Our drivers arrive at your residence or terminal parking 15 minutes before reporting time, handle luggage with care, and drive you home smoothly.
                </p>
                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-[#4B5563]">
                    <CheckCircle2 className="w-4 h-4 text-[#22C55E] shrink-0" />
                    <span>Live flight tracking so delays are monitored automatically</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-[#4B5563]">
                    <CheckCircle2 className="w-4 h-4 text-[#22C55E] shrink-0" />
                    <span>Fixed transparent pricing with zero midnight surge multipliers</span>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <button
                    onClick={() => onSelectServiceAndBook('Airport Transfer Driver')}
                    className="btn-primary h-11 px-6 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-xs"
                  >
                    <span>Book Airport Chauffeur</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleWhatsApp('Airport Transfer Service')}
                    className="btn-secondary h-11 px-5 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4 text-[#22C55E]" />
                    <span>WhatsApp Inquiry</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 4. Outstation Highway Trips */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 lg:p-10 border border-[#E5E7EB] shadow-xs hover:border-[#35B6DE] transition-all">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-6 order-2 lg:order-1 flex flex-col justify-center">
                <div className="flex items-center gap-2 text-xs font-bold text-[#35B6DE] uppercase tracking-wider mb-2">
                  <Compass className="w-4 h-4 text-[#35B6DE]" />
                  <span>Outstation Expressway Journeys</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold font-heading text-[#111827] mb-3">
                  Experienced Highway Pilots for Pune, Nashik, Goa &amp; Gujarat
                </h3>
                <p className="text-sm text-[#4B5563] leading-relaxed mb-5 font-normal">
                  Enjoy your road trips in the comfort of your own car while a seasoned highway driver takes the wheel. Trained on the Mumbai-Pune Expressway, Samruddhi Mahamarg, and mountain ghats with proven safety records.
                </p>
                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-[#4B5563]">
                    <CheckCircle2 className="w-4 h-4 text-[#22C55E] shrink-0" />
                    <span>Specialized ghat driving expertise for Khandala, Kasara, and Mahabaleshwar</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-[#4B5563]">
                    <CheckCircle2 className="w-4 h-4 text-[#22C55E] shrink-0" />
                    <span>Round-trip and one-way outstation drivers available with food/night allowances</span>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <button
                    onClick={() => onSelectServiceAndBook('Outstation Highway Driver')}
                    className="btn-primary h-11 px-6 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-xs"
                  >
                    <span>Book Outstation Driver</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleWhatsApp('Outstation Driver Booking')}
                    className="btn-secondary h-11 px-5 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4 text-[#22C55E]" />
                    <span>WhatsApp Inquiry</span>
                  </button>
                </div>
              </div>
              <div className="lg:col-span-6 order-1 lg:order-2 rounded-2xl overflow-hidden border border-[#E5E7EB] aspect-video relative bg-slate-100 shadow-xs">
                <ImageWithFallback
                  src="/images/services/outstation-driver.jpg"
                  alt="Family luxury SUV driving smoothly on Mumbai-Pune Expressway"
                  fallbackTitle="Mumbai-Pune Expressway"
                  vehicleTag="Toyota Fortuner / Innova Hycross"
                  locationTag="Mumbai-Pune Expressway & Western Ghats"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
