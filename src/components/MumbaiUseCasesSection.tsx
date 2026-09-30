import React from 'react';
import { HeartHandshake, Briefcase, PlaneTakeoff, Compass, CheckCircle, ArrowRight, MessageSquare, Phone } from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';

interface MumbaiUseCasesSectionProps {
  onSelectServiceAndBook: (serviceTitle: string) => void;
}

export const MumbaiUseCasesSection: React.FC<MumbaiUseCasesSectionProps> = ({ onSelectServiceAndBook }) => {
  const handleWhatsApp = (serviceTitle: string) => {
    const text = encodeURIComponent(
      `Hello Driver Nest India, I would like to inquire about ${serviceTitle} for Mumbai. Please share driver availability.`
    );
    window.open(`https://wa.me/919930012345?text=${text}`, '_blank');
  };

  return (
    <section id="mumbai-routes" className="py-16 sm:py-20 lg:py-24 bg-[#050505] relative border-t border-b border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
          <div className="text-xs font-semibold tracking-widest uppercase text-[#D4AF37] mb-3">
            Real Mumbai Driving Scenarios
          </div>
          <h2 className="text-h2 text-white mb-4">
            Trusted Across Mumbai&apos;s <span className="gold-gradient-text">Demanding Routes</span>
          </h2>
          <p className="text-body-lead text-neutral-400 font-light">
            From assisting elderly parents with medical visits to executive BKC corporate commutes and family road trips
            down the expressway in a Toyota Innova Crysta.
          </p>
        </div>

        {/* 4 Dedicated Deep-Dive Showcases with Uniform Rhythm */}
        <div className="space-y-10 sm:space-y-14">
          {/* 1. Senior Citizen Section */}
          <div className="glass-card rounded-2xl p-6 sm:p-8 lg:p-10 border border-[#D4AF37]/30 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-6 rounded-2xl overflow-hidden border border-[#D4AF37]/25 aspect-[16/10] relative shadow-xl">
                <ImageWithFallback
                  src="/images/services/senior-citizen-assistance.jpg"
                  alt="Indian elderly parents assisted safely into vehicle by professional chauffeur"
                  fallbackTitle="Senior Citizen Care"
                  vehicleTag="Maruti Ertiga / Honda City"
                  locationTag="Lilavati & Hinduja Hospitals, Mumbai"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="lg:col-span-6 flex flex-col justify-center">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#E5C07B] uppercase tracking-wider mb-2 font-mono">
                  <HeartHandshake className="w-4 h-4 text-[#D4AF37]" />
                  <span>Senior Citizen Transportation Support</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 font-display">
                  Compassionate, Gentle Driving for Elderly Parents
                </h3>
                <p className="text-sm sm:text-base text-neutral-300 leading-relaxed mb-6 font-light">
                  Driving through Mumbai&apos;s congested roads can be daunting and hazardous for senior citizens.
                  Our senior-friendly chauffeurs offer physical door-to-door escorting, assist with wheelchairs and walking sticks,
                  and drive with smooth acceleration and non-jarring braking.
                </p>
                <div className="space-y-2.5 mb-6 text-xs sm:text-sm text-neutral-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#D4AF37] shrink-0" />
                    <span>Physical door-to-door boarding support &amp; wheelchair/cane handling</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#D4AF37] shrink-0" />
                    <span>Patient waiting during hospital OPD consultations, pathology tests &amp; temples</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#D4AF37] shrink-0" />
                    <span>Live trip updates communicated to family caregivers throughout the journey</span>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => onSelectServiceAndBook('Senior Citizen Driver Assistance')}
                    className="btn-primary"
                  >
                    <span>Request Senior Citizen Driver</span>
                    <ArrowRight className="w-4 h-4 text-black" />
                  </button>
                  <button
                    onClick={() => handleWhatsApp('Senior Citizen Driver Assistance')}
                    className="btn-whatsapp"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>WhatsApp</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Corporate Driver Section */}
          <div className="glass-card rounded-2xl p-6 sm:p-8 lg:p-10 border border-[#D4AF37]/30 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-6 flex flex-col justify-center order-2 lg:order-1">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#E5C07B] uppercase tracking-wider mb-2 font-mono">
                  <Briefcase className="w-4 h-4 text-[#D4AF37]" />
                  <span>Executive &amp; Corporate Chauffeur Mobility</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 font-display">
                  BKC, Nariman Point &amp; Lower Parel Executive Mobility
                </h3>
                <p className="text-sm sm:text-base text-neutral-300 leading-relaxed mb-6 font-light">
                  Managing directors, CXOs, and visiting international business delegations require chauffeurs who mirror
                  corporate professionalism. We deploy uniformed chauffeurs bound by non-disclosure agreements, skilled in
                  business decorum and Western/Coastal expressway transit.
                </p>
                <div className="space-y-2.5 mb-6 text-xs sm:text-sm text-neutral-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#D4AF37] shrink-0" />
                    <span>Formal attire, strict confidentiality agreements &amp; in-cabin discretion</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#D4AF37] shrink-0" />
                    <span>Trained on Toyota Camry, Mercedes E-Class, BMW 5 Series &amp; executive fleets</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#D4AF37] shrink-0" />
                    <span>Centralized billing, account manager oversight &amp; leave backup guarantee</span>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => onSelectServiceAndBook('Corporate Chauffeur Service')}
                    className="btn-primary"
                  >
                    <span>Request Corporate Chauffeur</span>
                    <ArrowRight className="w-4 h-4 text-black" />
                  </button>
                  <button
                    onClick={() => handleWhatsApp('Corporate Chauffeur Service')}
                    className="btn-whatsapp"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>WhatsApp</span>
                  </button>
                </div>
              </div>
              <div className="lg:col-span-6 rounded-2xl overflow-hidden border border-[#D4AF37]/25 aspect-[16/10] relative shadow-xl order-1 lg:order-2">
                <ImageWithFallback
                  src="/images/services/corporate-driver.jpg"
                  alt="Indian corporate executive stepping out of sedan at BKC Mumbai"
                  fallbackTitle="Corporate Chauffeur Service"
                  vehicleTag="Toyota Camry / Mercedes E-Class"
                  locationTag="BKC G-Block, Mumbai"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* 3. Airport Driver Section */}
          <div className="glass-card rounded-2xl p-6 sm:p-8 lg:p-10 border border-[#D4AF37]/30 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-6 rounded-2xl overflow-hidden border border-[#D4AF37]/25 aspect-[16/10] relative shadow-xl">
                <ImageWithFallback
                  src="/images/services/airport-driver.jpg"
                  alt="Driver holding name board at Mumbai Airport arrivals terminal"
                  fallbackTitle="Airport Transfer"
                  vehicleTag="Toyota Innova Crysta / Sedans"
                  locationTag="CSMIA Terminal 1 & 2, Mumbai"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="lg:col-span-6 flex flex-col justify-center">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#E5C07B] uppercase tracking-wider mb-2 font-mono">
                  <PlaneTakeoff className="w-4 h-4 text-[#D4AF37]" />
                  <span>CSMIA T1 &amp; T2 Terminal Transfers</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 font-display">
                  Punctual Mumbai Airport Pickups with Personalized Name Boards
                </h3>
                <p className="text-sm sm:text-base text-neutral-300 leading-relaxed mb-6 font-light">
                  Never stress about flight delays or navigation after long flights. Our chauffeurs arrive 15 minutes before
                  scheduled touchdown, track flight changes in real-time, hold your personalized name board at the arrivals gate,
                  and handle luggage with care.
                </p>
                <div className="space-y-2.5 mb-6 text-xs sm:text-sm text-neutral-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#D4AF37] shrink-0" />
                    <span>Real-time flight arrival tracking with zero waiting penalties</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#D4AF37] shrink-0" />
                    <span>Personalized arrival name board and full luggage loading assistance</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#D4AF37] shrink-0" />
                    <span>Expert navigation via Coastal Road, Sea Link &amp; airport elevated corridors</span>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => onSelectServiceAndBook('Airport Driver Transfer')}
                    className="btn-primary"
                  >
                    <span>Request Airport Chauffeur</span>
                    <ArrowRight className="w-4 h-4 text-black" />
                  </button>
                  <button
                    onClick={() => handleWhatsApp('Airport Driver Transfer')}
                    className="btn-whatsapp"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>WhatsApp</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 4. Outstation Highway Driver Section */}
          <div className="glass-card rounded-2xl p-6 sm:p-8 lg:p-10 border border-[#D4AF37]/30 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-6 flex flex-col justify-center order-2 lg:order-1">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#E5C07B] uppercase tracking-wider mb-2 font-mono">
                  <Compass className="w-4 h-4 text-[#D4AF37]" />
                  <span>Expressway &amp; Ghat Highway Road Trips</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 font-display">
                  Mumbai-Pune Expressway &amp; Western Ghats Certified Drivers
                </h3>
                <p className="text-sm sm:text-base text-neutral-300 leading-relaxed mb-6 font-light">
                  Long-distance highway driving requires specialized skills: maintaining lane discipline at 100 km/h,
                  navigating steep ghat curves (Bhor Ghat, Kasara Ghat), and monsoon driving safety. Our outstation drivers
                  deliver fatigue-free journeys for your family.
                </p>
                <div className="space-y-2.5 mb-6 text-xs sm:text-sm text-neutral-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#D4AF37] shrink-0" />
                    <span>Specialized training on Toyota Innova Crysta, Fortuner &amp; SUVs</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#D4AF37] shrink-0" />
                    <span>Certified ghat navigation &amp; expressway defensive driving disciplines</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#D4AF37] shrink-0" />
                    <span>Single-day return or multi-day road trips to Goa, Lonavala, Nashik &amp; Gujarat</span>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => onSelectServiceAndBook('Outstation Highway Driver')}
                    className="btn-primary"
                  >
                    <span>Request Outstation Driver</span>
                    <ArrowRight className="w-4 h-4 text-black" />
                  </button>
                  <button
                    onClick={() => handleWhatsApp('Outstation Highway Driver')}
                    className="btn-whatsapp"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>WhatsApp</span>
                  </button>
                </div>
              </div>
              <div className="lg:col-span-6 rounded-2xl overflow-hidden border border-[#D4AF37]/25 aspect-[16/10] relative shadow-xl order-1 lg:order-2">
                <ImageWithFallback
                  src="/images/services/outstation-driver.jpg"
                  alt="Indian family travelling in Toyota Innova Crysta on highway"
                  fallbackTitle="Outstation Highway Specialist"
                  vehicleTag="Toyota Innova Crysta"
                  locationTag="Mumbai-Pune Expressway & Ghats"
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
