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
      description: 'Quick turnaround with driver staging pods deployed across all major Mumbai MMR corridors.',
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
    <section className="py-20 lg:py-24 bg-white text-[#111827] border-b border-[#E5E7EB] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EEF8FC] border border-[#35B6DE]/30 shadow-xs mb-3.5">
            <Sparkles className="w-3.5 h-3.5 text-[#35B6DE]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#35B6DE]">
              The Corporate Standard
            </span>
          </div>
          <h2 className="text-h2 font-extrabold text-[#111827] mb-4">
            Why Choose On Time Driver Service
          </h2>
          <p className="text-subheading text-[#4B5563] font-normal leading-relaxed text-base sm:text-lg">
            We bridge the gap between unorganized driver providers and corporate-grade service delivery with guaranteed punctuality, verified safety, and transparent pricing.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 mb-12">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-[#E5E7EB] hover:border-[#35B6DE] flex flex-col justify-start transition-all duration-200 shadow-xs hover:shadow-md group hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-xl bg-[#EEF8FC] text-[#35B6DE] group-hover:bg-[#35B6DE] group-hover:text-white flex items-center justify-center mb-4 transition-colors">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold font-heading text-[#111827] mb-2 group-hover:text-[#35B6DE] transition-colors">
                  {card.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed font-normal">
                  {card.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <button
            onClick={onOpenBooking}
            className="btn-primary h-12 px-8 text-sm font-bold shadow-xs inline-flex items-center gap-2"
          >
            <span>Book a Verified Driver Today</span>
            <ArrowRight className="w-4 h-4 text-[#111827]" />
          </button>
        </div>
      </div>
    </section>
  );
};
