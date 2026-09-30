import React from 'react';
import {
  ShieldCheck,
  CheckCircle,
  SlidersHorizontal,
  Clock,
  Briefcase,
  Headphones,
  Award,
  MapPin,
  ArrowRight,
} from 'lucide-react';

interface WhyChooseSectionProps {
  onOpenBooking: () => void;
}

export const WhyChooseSection: React.FC<WhyChooseSectionProps> = ({ onOpenBooking }) => {
  const cards = [
    {
      icon: ShieldCheck,
      title: 'Verified Professionals',
      description: '100% police-verified chauffeurs with clean legal track records and authenticated background profiles.',
    },
    {
      icon: CheckCircle,
      title: 'Reliable Service',
      description: 'Punctual arrivals, dependable duty schedules, and defensive driving with zero abrupt maneuvers.',
    },
    {
      icon: SlidersHorizontal,
      title: 'Flexible Hiring Options',
      description: 'Hourly, part-time, full-time, outstation, or dedicated monthly engagements without lock-in penalties.',
    },
    {
      icon: Clock,
      title: 'Fast Response',
      description: 'Quick turnaround with chauffeur staging pods deployed across all major MMR corridors.',
    },
    {
      icon: Briefcase,
      title: 'Corporate Solutions',
      description: 'Executive chauffeurs for CXOs, visiting delegations, corporate fleets, and institutional compliance.',
    },
    {
      icon: Headphones,
      title: 'Dedicated Support',
      description: '24/7 dedicated dispatch team with immediate replacement chauffeur guarantees during leaves.',
    },
    {
      icon: Award,
      title: 'Experienced Drivers',
      description: 'Minimum 5+ years of verified driving experience on luxury sedans, automatics, and high-performance cars.',
    },
    {
      icon: MapPin,
      title: 'Trusted Across Mumbai',
      description: 'Serving thousands of households and corporate firms from South Mumbai to Thane, Navi Mumbai, and Palghar.',
    },
  ];

  return (
    <section id="why-us" className="py-16 sm:py-20 lg:py-24 bg-black relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
          <div className="text-xs font-semibold tracking-widest uppercase text-[#D4AF37] mb-3">
            Why Discerning Clients Choose Us
          </div>
          <h2 className="text-h2 text-white mb-4">
            Why Choose <span className="gold-gradient-text">Driver Nest India</span>
          </h2>
          <p className="text-body-lead text-neutral-400 font-light">
            We deliver the gold standard in private chauffeuring—combining institutional verification with the refined
            touch of a luxury concierge service.
          </p>
        </div>

        {/* 8 Premium Cards Grid with Equal Height */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 items-stretch">
          {cards.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="glass-card glass-card-hover rounded-xl p-6 border border-[#D4AF37]/20 flex flex-col justify-between h-full"
              >
                <div>
                  <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-[#D4AF37]" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2 font-display">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-light">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <button
            onClick={onOpenBooking}
            className="btn-primary"
          >
            <span>Request Your Chauffeur Consultation</span>
            <ArrowRight className="w-4 h-4 text-black" />
          </button>
        </div>
      </div>
    </section>
  );
};
