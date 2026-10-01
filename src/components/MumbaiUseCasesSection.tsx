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
    <section id="mumbai-routes" className="py-8 sm:py-16 lg:py-20 bg-[#050505] relative border-t border-b border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <div className="text-[11px] font-semibold tracking-widest uppercase text-[#D4AF37] mb-2 font-mono">
            Real Mumbai Driving Scenarios
          </div>
          <h2 className="text-h2 text-white mb-3">
            Trusted Across Mumbai&apos;s <span className="gold-gradient-text">Demanding Routes</span>
          </h2>
          <p className="text-body-lead text-neutral-400 font-light">
            From assisting elderly parents with medical visits to executive BKC corporate commutes and family road trips
            down the expressway in a Toyota Innova Crysta.
          </p>
        </div>

        {/* 4 Dedicated Deep-Dive Showcases with Uniform Rhythm */}
        <div className="space-y-6 sm:space-y-10">
          {/* 1. Senior Citizen Section */}
          <div className="glass-card rounded-2xl p-4 sm:p-8 lg:p-10 border border-[#D4AF37]/30 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
              <div className="lg:col-span-6 rounded-2xl overflow-hidden border border-[#D4AF37]/25 aspect-video relative shadow-xl">
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
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-3 font-display">
                  Compassionate, Gentle Driving for Elderly Parents
                </h3>
                <p className="text-xs sm:text-sm md:text-base text-neutral-300 leading-relaxed mb-4 font-light">
                  Driving through Mumbai&apos;s congested roads can be daunting and hazardous for senior citizens.
                  Our senior-friendly chauffeurs offer physical door-to-door escorting, assist with wheelchairs and walking sticks,
                  and drive with smooth acceleration and non-jarring braking.
                </p>

                <div className="space-y-1.5 mb-6 text-xs sm:text-sm text-neutral-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#D4AF37] shrink-0" />
                    <span>Gentle boarding &amp; disembarking assistance</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#D4AF37] shrink-0" />
                    <span>Regular medical visits: Lilavati, Hinduja, Kokilaben &amp; Nanavati</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#D4AF37] shrink-0" />
                    <span>Careful speed compliance and non-abrupt braking</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => onSelectServiceAndBook('Senior Citizen Driver')}
                    className="btn-primary"
                  >
                    <span>Request Senior Citizen Driver</span>
                    <ArrowRight className="w-4 h-4 text-black" />
                  </button>
                  <button
                    onClick={() => handleWhatsApp('Senior Citizen Driver Service')}
                    className="btn-whatsapp"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Inquire via WhatsApp</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Corporate & Executive Section */}
          <div className="glass-card rounded-2xl p-4 sm:p-8 lg:p-10 border border-[#D4AF37]/30 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
              <div className="lg:col-span-6 lg:order-2 rounded-2xl overflow-hidden border border-[#D4AF37]/25 aspect-video relative shadow-xl">
                <ImageWithFallback
                  src="/images/services/corporate-driver.jpg"
                  alt="Corporate executive in business district being chauffeured"
                  fallbackTitle="Corporate Chauffeur Service"
                  vehicleTag="Toyota Camry / Mercedes-Benz E-Class"
                  locationTag="BKC & Nariman Point, Mumbai"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="lg:col-span-6 lg:order-1 flex flex-col justify-center">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#E5C07B] uppercase tracking-wider mb-2 font-mono">
                  <Briefcase className="w-4 h-4 text-[#D4AF37]" />
                  <span>Corporate &amp; Executive Transit</span>
                </div>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-3 font-display">
                  Transform Commute Hours into Productive Boardroom Time
                </h3>
                <p className="text-xs sm:text-sm md:text-base text-neutral-300 leading-relaxed mb-4 font-light">
                  Executives navigating Mumbai between Nariman Point, Lower Parel, and Bandra Kurla Complex lose hours
                  to traffic stress. Our corporate chauffeurs maintain strict executive decorum, discreet privacy,
                  and flawless punctuality.
                </p>

                <div className="space-y-1.5 mb-6 text-xs sm:text-sm text-neutral-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#D4AF37] shrink-0" />
                    <span>Discreet in-cabin privacy for confidential calls</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#D4AF37] shrink-0" />
                    <span>Familiarity with Coastal Road, Sea Link &amp; Eastern Freeway</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#D4AF37] shrink-0" />
                    <span>Monthly corporate retainers with GST compliant billing</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => onSelectServiceAndBook('Corporate Driver')}
                    className="btn-primary"
                  >
                    <span>Book Corporate Chauffeur</span>
                    <ArrowRight className="w-4 h-4 text-black" />
                  </button>
                  <button
                    onClick={() => handleWhatsApp('Corporate Driver Service')}
                    className="btn-whatsapp"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Corporate Desk WhatsApp</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 3. Airport Transfers Section */}
          <div className="glass-card rounded-2xl p-4 sm:p-8 lg:p-10 border border-[#D4AF37]/30 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
              <div className="lg:col-span-6 rounded-2xl overflow-hidden border border-[#D4AF37]/25 aspect-video relative shadow-xl">
                <ImageWithFallback
                  src="/images/services/airport-transfer.jpg"
                  alt="Chauffeur greeting passenger at Mumbai CSMIA Airport Terminal 2"
                  fallbackTitle="Airport Chauffeur Service"
                  vehicleTag="Toyota Innova / Honda City"
                  locationTag="Mumbai Airport T2 & T1"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="lg:col-span-6 flex flex-col justify-center">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#E5C07B] uppercase tracking-wider mb-2 font-mono">
                  <PlaneTakeoff className="w-4 h-4 text-[#D4AF37]" />
                  <span>24/7 Airport Transfer Desk</span>
                </div>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-3 font-display">
                  Punctual CSMIA T1 &amp; T2 Airport Departures &amp; Arrivals
                </h3>
                <p className="text-xs sm:text-sm md:text-base text-neutral-300 leading-relaxed mb-4 font-light">
                  Never stress over midnight airport transfers or early morning 4 AM flights. Our airport drivers arrive
                  15 minutes prior to scheduled reporting, handle heavy luggage, and ensure a calm drive to Chhatrapati Shivaji Maharaj International Airport.
                </p>

                <div className="space-y-1.5 mb-6 text-xs sm:text-sm text-neutral-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#D4AF37] shrink-0" />
                    <span>Flight delay monitoring &amp; flexible pickup adjustment</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#D4AF37] shrink-0" />
                    <span>Luggage loading &amp; airport ramp drop-off assistance</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#D4AF37] shrink-0" />
                    <span>Coverage from South Mumbai, Thane, Navi Mumbai &amp; Mira-Bhayandar</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => onSelectServiceAndBook('Airport Driver')}
                    className="btn-primary"
                  >
                    <span>Reserve Airport Chauffeur</span>
                    <ArrowRight className="w-4 h-4 text-black" />
                  </button>
                  <button
                    onClick={() => handleWhatsApp('Airport Driver Service')}
                    className="btn-whatsapp"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>WhatsApp Airport Desk</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 4. Outstation Highway Trips Section */}
          <div className="glass-card rounded-2xl p-4 sm:p-8 lg:p-10 border border-[#D4AF37]/30 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
              <div className="lg:col-span-6 lg:order-2 rounded-2xl overflow-hidden border border-[#D4AF37]/25 aspect-video relative shadow-xl">
                <ImageWithFallback
                  src="/images/services/outstation-driver.jpg"
                  alt="Toyota Innova Crysta driving down Mumbai-Pune Expressway"
                  fallbackTitle="Outstation Highway Chauffeur"
                  vehicleTag="Toyota Innova Crysta / Fortuner"
                  locationTag="Mumbai-Pune Expressway & NH-48"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="lg:col-span-6 lg:order-1 flex flex-col justify-center">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#E5C07B] uppercase tracking-wider mb-2 font-mono">
                  <Compass className="w-4 h-4 text-[#D4AF37]" />
                  <span>Outstation Highway Specialists</span>
                </div>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-3 font-display">
                  Relax with Family While an Expert Drives the Highway
                </h3>
                <p className="text-xs sm:text-sm md:text-base text-neutral-300 leading-relaxed mb-4 font-light">
                  Long drives down the Mumbai-Pune Expressway, Mumbai-Goa Highway (NH-66), or the ghats of Khandala and
                  Mahabaleshwar require seasoned highway focus. Our certified outstation drivers maintain defensive driving,
                  speed discipline, and vehicle inspection throughout the round trip.
                </p>

                <div className="space-y-1.5 mb-6 text-xs sm:text-sm text-neutral-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#D4AF37] shrink-0" />
                    <span>Expertise across ghats, hairpin bends &amp; monsoon highways</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#D4AF37] shrink-0" />
                    <span>Popular corridors: Pune, Lonavala, Shirdi, Nashik, Alibaug &amp; Goa</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#D4AF37] shrink-0" />
                    <span>Transparent daily driver allowances with zero hidden charges</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => onSelectServiceAndBook('Outstation Driver')}
                    className="btn-primary"
                  >
                    <span>Book Outstation Driver</span>
                    <ArrowRight className="w-4 h-4 text-black" />
                  </button>
                  <button
                    onClick={() => handleWhatsApp('Outstation Driver Service')}
                    className="btn-whatsapp"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>WhatsApp Route Inquiry</span>
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
