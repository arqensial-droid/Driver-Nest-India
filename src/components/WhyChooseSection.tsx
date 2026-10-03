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
    <section className="py-8 sm:py-16 lg:py-20 bg-white text-[#111111] border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <div className="text-xs font-bold uppercase tracking-wider text-[#37B5D6] mb-2">
            The Service Standard
          </div>
          <h2 className="text-h2 font-bold font-heading text-neutral-900 mb-3">
            Why Choose On Time Driver Service
          </h2>
          <p className="text-body-lead text-neutral-600 font-normal">
            We bridge the gap between unorganized local driver agencies and corporate-grade service delivery with guaranteed punctuality and safety.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className="bg-[#F8F9FA] rounded-[16px] p-5 border border-gray-200 flex flex-col justify-start"
              >
                <div className="w-10 h-10 rounded-[12px] bg-[#37B5D6]/10 text-[#37B5D6] flex items-center justify-center mb-3">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-sm sm:text-base font-bold font-heading text-neutral-900 mb-1.5">
                  {card.title}
                </h3>
                <p className="text-xs text-neutral-600 leading-relaxed font-normal">
                  {card.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <button
            onClick={onOpenBooking}
            className="btn-primary h-12 px-6 text-sm font-semibold inline-flex items-center gap-2"
          >
            <span>Book Your On-Time Driver Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
