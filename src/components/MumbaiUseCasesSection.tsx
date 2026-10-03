import React from 'react';
import { HeartHandshake, Briefcase, PlaneTakeoff, Compass, CheckCircle2, ArrowRight, MessageSquare, Phone, Sparkles } from 'lucide-react';
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
    <section id="mumbai-routes" className="py-20 lg:py-28 bg-[#050505] text-white border-b border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0B0B0B] border border-[#35B6DE]/40 shadow-md mb-3.5">
            <Sparkles className="w-3.5 h-3.5 text-[#F3ED1A]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#35B6DE]">
              Real Mumbai Driving Scenarios
            </span>
          </div>

          <h2 className="text-h2 font-extrabold text-white mb-4">
            Trusted Across Mumbai's Most Demanding Routes
          </h2>

          <p className="text-subheading text-[#CFCFCF] leading-relaxed">
            From assisting elderly parents with hospital visits to executive BKC corporate commutes and family road trips down the expressway in Honda City and Toyota Innova Crysta.
          </p>
        </div>

        {/* 4 Dedicated Deep-Dive Showcases */}
        <div className="space-y-8 sm:space-y-12">
          
          {/* 1. Senior Citizen Section */}
          <div className="bg-[#0B0B0B] rounded-2xl p-6 sm:p-8 lg:p-10 border border-white/10 shadow-xl hover:border-[#35B6DE]/40 transition-all">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-6 rounded-2xl overflow-hidden border border-white/15 aspect-video relative bg-[#181818]">
                <ImageWithFallback
                  src="/images/services/senior-citizen-assistance.jpg"
                  alt="Indian elderly parents assisted safely into vehicle by professional chauffeur"
                  fallbackTitle="Senior Citizen Care"
                  vehicleTag="Maruti Ertiga / Honda City"
                  locationTag="Lilavati & Hinduja Hospitals, Mumbai"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent pointer-events-none" />
              </div>
              <div className="lg:col-span-6 flex flex-col justify-center">
                <div className="flex items-center gap-2 text-xs font-bold text-[#35B6DE] uppercase tracking-wider mb-2">
                  <HeartHandshake className="w-4 h-4 text-[#35B6DE]" />
                  <span>Senior Citizen Transportation Support</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold font-heading text-white mb-3">
                  Compassionate, Gentle Driving for Elderly Parents
                </h3>
                <p className="text-sm text-[#CFCFCF] leading-relaxed mb-5 font-normal">
                  Driving through Mumbai's congested roads can be daunting for senior citizens. Our verified chauffeurs offer door-to-door escorting, assist with bags and walking aids, and maintain smooth, non-jarring driving habits.
                </p>
                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-neutral-300">
                    <CheckCircle2 className="w-4 h-4 text-[#22C55E] shrink-0" />
                    <span>Patient assistance for hospital visits at Lilavati, Hinduja &amp; Kokilaben</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-neutral-300">
                    <CheckCircle2 className="w-4 h-4 text-[#22C55E] shrink-0" />
                    <span>Smooth acceleration and progressive braking for spine-safe travel</span>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <button
                    onClick={() => onSelectServiceAndBook('Senior Citizen Driver Care')}
                    className="btn-primary h-[50px] px-6 text-sm font-bold flex items-center justify-center gap-2"
                  >
                    <span>Book Senior Care Driver</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleWhatsApp('Senior Citizen Assistance')}
                    className="btn-secondary h-[50px] px-5 text-sm font-semibold flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4 text-[#25D366]" />
                    <span>WhatsApp Inquiry</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Corporate BKC Executive Transit */}
          <div className="bg-[#0B0B0B] rounded-2xl p-6 sm:p-8 lg:p-10 border border-white/10 shadow-xl hover:border-[#35B6DE]/40 transition-all">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-6 order-2 lg:order-1 flex flex-col justify-center">
                <div className="flex items-center gap-2 text-xs font-bold text-[#F3ED1A] uppercase tracking-wider mb-2">
                  <Briefcase className="w-4 h-4 text-[#F3ED1A]" />
                  <span>Corporate Mobility &amp; Executive Travel</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold font-heading text-white mb-3">
                  Transform Daily BKC &amp; Lower Parel Traffic into Productive Hours
                </h3>
                <p className="text-sm text-[#CFCFCF] leading-relaxed mb-5 font-normal">
                  Turn stressful commutes along the Western Express Highway, Sea Link, and Eastern Freeway into productive workspace. Review board presentations, attend conference calls, and arrive at meetings refreshed.
                </p>
                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-neutral-300">
                    <CheckCircle2 className="w-4 h-4 text-[#22C55E] shrink-0" />
                    <span>Expertise across BKC, Nariman Point, Lower Parel &amp; Nesco Goregaon</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-neutral-300">
                    <CheckCircle2 className="w-4 h-4 text-[#22C55E] shrink-0" />
                    <span>Full NDA compliance &amp; discreet corporate executive decorum</span>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <button
                    onClick={() => onSelectServiceAndBook('Corporate Chauffeur Service')}
                    className="btn-primary h-[50px] px-6 text-sm font-bold flex items-center justify-center gap-2"
                  >
                    <span>Hire Corporate Chauffeur</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleWhatsApp('Corporate Chauffeur')}
                    className="btn-secondary h-[50px] px-5 text-sm font-semibold flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4 text-[#25D366]" />
                    <span>Corporate Inquiry</span>
                  </button>
                </div>
              </div>
              <div className="lg:col-span-6 order-1 lg:order-2 rounded-2xl overflow-hidden border border-white/15 aspect-video relative bg-[#181818]">
                <ImageWithFallback
                  src="/images/services/corporate-driver.jpg"
                  alt="Corporate executive being driven by professional chauffeur in Mumbai BKC"
                  fallbackTitle="Corporate BKC Transit"
                  vehicleTag="Toyota Innova Crysta & Luxury Sedans"
                  locationTag="BKC Commercial Complex"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          </div>

          {/* 3. Outstation Road Trips */}
          <div className="bg-[#0B0B0B] rounded-2xl p-6 sm:p-8 lg:p-10 border border-white/10 shadow-xl hover:border-[#35B6DE]/40 transition-all">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-6 rounded-2xl overflow-hidden border border-white/15 aspect-video relative bg-[#181818]">
                <ImageWithFallback
                  src="/images/services/outstation-driver.jpg"
                  alt="Indian family arriving safely at outstation resort with experienced highway driver"
                  fallbackTitle="Outstation Travel"
                  vehicleTag="Toyota Innova / Fortuner / Carens"
                  locationTag="Mumbai-Pune Expressway"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent pointer-events-none" />
              </div>
              <div className="lg:col-span-6 flex flex-col justify-center">
                <div className="flex items-center gap-2 text-xs font-bold text-[#35B6DE] uppercase tracking-wider mb-2">
                  <Compass className="w-4 h-4 text-[#35B6DE]" />
                  <span>Outstation &amp; Weekend Getaways</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold font-heading text-white mb-3">
                  Stress-Free Highway Drives to Pune, Lonavala, Nashik &amp; Goa
                </h3>
                <p className="text-sm text-[#CFCFCF] leading-relaxed mb-5 font-normal">
                  Enjoy quality time with your family on weekend holidays without driver fatigue. Our outstation drivers possess extensive experience with ghat sections, night driving, and expressway toll corridors.
                </p>
                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-neutral-300">
                    <CheckCircle2 className="w-4 h-4 text-[#22C55E] shrink-0" />
                    <span>Specialists in Mumbai-Pune Expressway, Kasara Ghat &amp; Samruddhi Mahamarg</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-neutral-300">
                    <CheckCircle2 className="w-4 h-4 text-[#22C55E] shrink-0" />
                    <span>Zero driver advance charges; clean daily allowance terms</span>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <button
                    onClick={() => onSelectServiceAndBook('Outstation Driver Service')}
                    className="btn-primary h-[50px] px-6 text-sm font-bold flex items-center justify-center gap-2"
                  >
                    <span>Book Outstation Chauffeur</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleWhatsApp('Outstation Driver')}
                    className="btn-secondary h-[50px] px-5 text-sm font-semibold flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4 text-[#25D366]" />
                    <span>Inquire Outstation</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
