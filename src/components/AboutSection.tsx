import React from 'react';
import { ShieldCheck, Award, Sliders, FileText, Zap, Headphones, Check, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';

interface AboutSectionProps {
  onOpenBooking: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenBooking }) => {
  const pillars = [
    {
      icon: ShieldCheck,
      title: 'Verified Indian Drivers',
      description: 'Strict police verification, authentic Aadhaar validation, and criminal record clearance before any deployment in Mumbai.',
    },
    {
      icon: Award,
      title: 'Trained Chauffeurs',
      description: 'Chauffeurs trained in smooth braking, executive business etiquette, VIP protocol, and Indian vehicle dynamics.',
    },
    {
      icon: Sliders,
      title: 'Flexible Hiring Options',
      description: 'Hourly, part-time, full-time, outstation, or dedicated monthly retainers tailored to your family or corporate calendar.',
    },
    {
      icon: FileText,
      title: 'Transparent Process',
      description: 'Bespoke consultation, clear vehicle matching (Innova, City, Creta, E-Class), and zero advance placement brokerage.',
    },
    {
      icon: Zap,
      title: 'Fast Driver Allocation',
      description: 'Strategic driver staging hubs throughout Mumbai and MMR enable rapid door-to-door allocation within 30 to 45 mins.',
    },
    {
      icon: Headphones,
      title: 'Dedicated Support',
      description: '24/7 dedicated support desk with instant replacement driver guarantees during unexpected leaves.',
    },
  ];

  return (
    <section id="about" className="py-16 sm:py-20 lg:py-24 bg-[#080808] relative border-t border-b border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Story Section: Brand Narrative & Indian Driver Visuals */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center mb-16 lg:mb-20">
          {/* Left: Brand Story */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="text-xs font-semibold tracking-widest uppercase text-[#D4AF37] mb-3 flex items-center gap-2">
              <span className="w-6 h-[1.5px] bg-[#D4AF37]" />
              <span>Your Trusted Driver Partner in Mumbai</span>
            </div>

            <h2 className="text-h2 text-white mb-6">
              Professional Driver Services for <span className="gold-gradient-text">Mumbai Families &amp; Businesses</span>
            </h2>

            <div className="space-y-4 text-neutral-300 text-body-lead font-light leading-relaxed mb-8">
              <p>
                Driver Nest India provides professional chauffeur and driver services across Mumbai and surrounding areas.
                We help families, businesses, senior citizens, and vehicle owners find trusted and experienced drivers for
                every driving need.
              </p>
              <p>
                Our focus is safety, reliability, professionalism, and customer satisfaction. Whether driving a family
                Toyota Innova Crysta, Honda City, or executive Mercedes-Benz, our chauffeurs understand Mumbai traffic nuances,
                flyovers, arterial shortcuts, and parking protocols.
              </p>
              <p className="text-neutral-400 text-xs sm:text-sm">
                Every driver is backed by institutional oversight, police verification dossiers, regular skill audits,
                and seamless standby replacements.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              <button
                onClick={onOpenBooking}
                className="btn-primary"
              >
                <span>Schedule Driver Consultation</span>
                <ArrowRight className="w-4 h-4 text-black" />
              </button>

              <div className="flex items-center gap-2 text-xs sm:text-sm text-[#E5C07B] font-medium">
                <Check className="w-4 h-4 text-[#D4AF37]" />
                <span>100% Police Verified Roster</span>
              </div>
            </div>
          </div>

          {/* Right: Indian Family Assisting Imagery Grid with Consistent Aspect Ratios */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="rounded-2xl overflow-hidden border border-[#D4AF37]/25 shadow-2xl aspect-[4/3] sm:aspect-auto sm:h-64 lg:h-72 relative">
                <ImageWithFallback
                  src="/images/services/personal-driver.jpg"
                  alt="Indian driver assisting family entering clean vehicle"
                  fallbackTitle="Indian Family Travel"
                  vehicleTag="Honda City / Verna"
                  locationTag="Western Express, Mumbai"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-2xl overflow-hidden border border-neutral-800 shadow-xl aspect-[4/3] sm:aspect-auto sm:h-44 lg:h-48 relative">
                <ImageWithFallback
                  src="/images/services/senior-citizen-assistance.jpg"
                  alt="Professional driver assisting senior citizen parents safely"
                  fallbackTitle="Elderly Passenger Escort"
                  vehicleTag="Personal Car"
                  locationTag="Dadar West, Mumbai"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="space-y-4 pt-4 sm:pt-6">
              <div className="rounded-2xl overflow-hidden border border-neutral-800 shadow-xl aspect-[4/3] sm:aspect-auto sm:h-44 lg:h-48 relative">
                <ImageWithFallback
                  src="/images/services/corporate-driver.jpg"
                  alt="Indian corporate executive stepping out of sedan at BKC"
                  fallbackTitle="Corporate Executive Chauffeur"
                  vehicleTag="BKC Corporate Fleet"
                  locationTag="BKC G-Block, Mumbai"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-2xl overflow-hidden border border-[#D4AF37]/25 shadow-2xl aspect-[4/3] sm:aspect-auto sm:h-64 lg:h-72 relative">
                <ImageWithFallback
                  src="/images/services/outstation-driver.jpg"
                  alt="Toyota Innova Crysta on Mumbai-Pune expressway outstation trip"
                  fallbackTitle="Expressway Highway Specialist"
                  vehicleTag="Toyota Innova Crysta"
                  locationTag="Mumbai-Pune Expressway"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 6 Core Pillars Grid: Equal Height & Premium Polish */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="glass-card glass-card-hover rounded-xl p-6 border border-[#D4AF37]/20 flex flex-col justify-between h-full"
              >
                <div>
                  <div className="w-11 h-11 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-[#D4AF37]" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white mb-2 font-display">{pillar.title}</h3>
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-light">{pillar.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
