import React from 'react';
import {
  ShieldCheck,
  FileCheck2,
  Award,
  Clock,
  RefreshCw,
  UserCheck2,
  CheckCircle2,
  Phone,
  ArrowRight,
  Star,
  Users,
  Car,
  Sparkles,
} from 'lucide-react';

interface WhyMumbaiTrustsSectionProps {
  onOpenBooking: () => void;
}

export const WhyMumbaiTrustsSection: React.FC<WhyMumbaiTrustsSectionProps> = ({ onOpenBooking }) => {
  const trustFeatures = [
    {
      icon: FileCheck2,
      title: 'Police Verification',
      description: 'Official clearance certified with Mumbai, Thane, and Navi Mumbai police commissionerate records before deployment.',
    },
    {
      icon: ShieldCheck,
      title: 'Background Checked',
      description: 'Permanent address physical verification, biometric Aadhaar authentication, and strict criminal background checks.',
    },
    {
      icon: Award,
      title: 'Trained Chauffeurs',
      description: 'Trained in progressive braking, VIP etiquette, vehicle care, and navigating severe Mumbai traffic jams safely.',
    },
    {
      icon: Clock,
      title: 'Punctual Service',
      description: 'Guaranteed on-time arrivals. Drivers reach 10 minutes prior to scheduled reporting time.',
    },
    {
      icon: RefreshCw,
      title: 'Emergency Replacement',
      description: 'Immediate standby driver dispatch from nearby staging hubs if your regular chauffeur takes emergency leave.',
    },
    {
      icon: UserCheck2,
      title: 'Experienced Drivers',
      description: 'Minimum 5+ years of driving expertise on sedans, SUVs, automatics (Innova, City, Creta, Fortuner, luxury cars).',
    },
  ];

  const counters = [
    { number: '5,000+', label: 'Drivers Deployed', icon: UserCheck2, subtitle: 'Across Mumbai & MMR' },
    { number: '10,000+', label: 'Satisfied Customers', icon: Users, subtitle: 'Families & Corporates' },
    { number: '4.9★', label: 'Customer Rating', icon: Star, subtitle: 'Verified Google Reviews' },
    { number: '24/7', label: 'Concierge Support', icon: Phone, subtitle: 'Standby Replacements' },
  ];

  return (
    <section className="py-20 lg:py-24 bg-[#EEF8FC] text-[#111827] border-b border-[#E5E7EB] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#35B6DE]/30 shadow-xs mb-3.5">
            <Sparkles className="w-3.5 h-3.5 text-[#35B6DE]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#35B6DE]">
              Uncompromising Trust &amp; Safety
            </span>
          </div>

          <h2 className="text-h2 font-extrabold text-[#111827] mb-4">
            Why Mumbai Trusts On Time Driver Service
          </h2>

          <p className="text-subheading text-[#4B5563] leading-relaxed text-base sm:text-lg">
            We eliminate the hazards of unverified roadside drivers and unorganized agencies by delivering vetted, trained, and police-verified chauffeurs with corporate discipline.
          </p>
        </div>

        {/* Counter Highlight Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-14 sm:mb-16">
          {counters.map((c, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 sm:p-7 border border-[#E5E7EB] shadow-xs hover:border-[#35B6DE] transition-all text-center group"
            >
              <div className="w-12 h-12 rounded-xl bg-[#EEF8FC] text-[#35B6DE] group-hover:bg-[#35B6DE] group-hover:text-white flex items-center justify-center mx-auto mb-3 transition-colors">
                <c.icon className="w-6 h-6" />
              </div>
              <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#111827] font-heading mb-1 group-hover:text-[#35B6DE] transition-colors">
                {c.number}
              </div>
              <div className="text-sm font-bold text-[#111827] mb-0.5">
                {c.label}
              </div>
              <div className="text-xs text-[#4B5563]">
                {c.subtitle}
              </div>
            </div>
          ))}
        </div>

        {/* 6 Trust Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 mb-14">
          {trustFeatures.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-7 border border-[#E5E7EB] hover:border-[#35B6DE] flex flex-col justify-between shadow-xs hover:shadow-md transition-all group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#EEF8FC] text-[#35B6DE] group-hover:bg-[#35B6DE] group-hover:text-white flex items-center justify-center mb-5 transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-[#111827] mb-2 font-heading">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#4B5563] leading-relaxed">
                    {item.description}
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-[#E5E7EB] flex items-center gap-2 text-xs font-semibold text-[#22C55E]">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>100% Guaranteed Standard</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Corporate Trust Banner */}
        <div className="bg-white rounded-2xl border border-[#E5E7EB] p-8 sm:p-10 shadow-xs flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="max-w-2xl text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-[#35B6DE] block mb-1">
              Zero Surge &middot; Transparent Billing
            </span>
            <h3 className="text-xl sm:text-2xl font-bold font-heading text-[#111827] mb-2">
              Need a Permanent or Corporate Driver for Your Fleet?
            </h3>
            <p className="text-sm text-[#4B5563] leading-relaxed">
              We provide monthly contracts, direct invoicing, GST compliance, and guaranteed replacements for corporate executives and busy professionals.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto shrink-0">
            <button
              onClick={onOpenBooking}
              className="btn-primary w-full sm:w-auto h-12 px-7 text-sm font-bold shadow-xs"
            >
              <span>Book Driver Now</span>
            </button>
            <a
              href="tel:8652880057"
              className="btn-secondary w-full sm:w-auto h-12 px-6 text-sm font-bold flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-[#35B6DE]" />
              <span>8652880057</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
