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
  Sparkles,
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
      description: 'Quick turnaround with driver staging pods deployed across all major MMR corridors.',
    },
    {
      icon: Briefcase,
      title: 'Corporate Solutions',
      description: 'Executive chauffeurs for CXOs, visiting delegations, corporate fleets, and institutional compliance.',
    },
    {
      icon: Headphones,
      title: 'Dedicated Support',
      description: '24/7 dedicated dispatch team with immediate replacement driver guarantees during leaves.',
    },
    {
      icon: Award,
      title: 'Experienced Drivers',
      description: 'Minimum 5+ years of verified driving experience on sedans, SUVs, automatics, and family cars.',
    },
    {
      icon: MapPin,
      title: 'Trusted Across Mumbai',
      description: 'Serving thousands of households and corporate firms from South Mumbai to Thane, Navi Mumbai, and Palghar.',
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#050505] text-white border-b border-white/10 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[500px] h-[500px] bg-[#35B6DE]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0B0B0B] border border-[#35B6DE]/40 shadow-md mb-3.5">
            <Sparkles className="w-3.5 h-3.5 text-[#F3ED1A]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#35B6DE]">
              The Gold Standard
            </span>
          </div>
          <h2 className="text-h2 font-extrabold text-white mb-4">
            Why Choose On Time Driver Service
          </h2>
          <p className="text-subheading text-[#CFCFCF] font-normal leading-relaxed">
            We bridge the gap between unorganized local driver agencies and corporate-grade service delivery with guaranteed punctuality and safety.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 mb-12">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className="bg-[#0B0B0B] rounded-2xl p-6 border border-white/10 hover:border-[#35B6DE]/50 flex flex-col justify-start transition-all duration-300 hover:shadow-xl group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#35B6DE]/15 text-[#35B6DE] group-hover:bg-[#35B6DE] group-hover:text-[#050505] flex items-center justify-center mb-4 transition-colors">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold font-heading text-white mb-2 group-hover:text-[#F3ED1A] transition-colors">
                  {card.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#CFCFCF] leading-relaxed font-normal">
                  {card.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <button
            onClick={onOpenBooking}
            className="btn-primary h-12 px-8 text-sm font-bold inline-flex items-center gap-2 shadow-lg"
          >
            <span>Book Your On-Time Driver Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
