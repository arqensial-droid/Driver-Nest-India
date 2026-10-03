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
import { ImageWithFallback } from './ImageWithFallback';

interface WhyMumbaiTrustsSectionProps {
  onOpenBooking: () => void;
}

export const WhyMumbaiTrustsSection: React.FC<WhyMumbaiTrustsSectionProps> = ({ onOpenBooking }) => {
  const trustFeatures = [
    {
      icon: FileCheck2,
      title: 'Police Verification',
      description: 'Official clearance certified with Mumbai, Thane, and Navi Mumbai police records before deployment.',
    },
    {
      icon: ShieldCheck,
      title: 'Background Checked',
      description: 'Permanent address physical verification, biometric Aadhaar authentication, and strict criminal checks.',
    },
    {
      icon: Award,
      title: 'Trained Chauffeurs',
      description: 'Trained in progressive braking, VIP etiquette, vehicle care, and navigating severe Mumbai traffic jams.',
    },
    {
      icon: Clock,
      title: 'Punctual Service',
      description: 'Guaranteed on-time arrivals. Drivers reach 10 minutes prior to scheduled reporting time.',
    },
    {
      icon: RefreshCw,
      title: 'Emergency Replacement',
      description: 'Immediate standby driver dispatch from nearby staging pods if your regular chauffeur takes emergency leave.',
    },
    {
      icon: UserCheck2,
      title: 'Experienced Drivers',
      description: 'Minimum 5+ years of driving expertise on sedans, SUVs, automatics (Innova, City, Creta, Mercedes, Fortuner).',
    },
  ];

  const counters = [
    { number: '5,000+', label: 'Drivers Deployed', icon: UserCheck2, subtitle: 'Across Mumbai & MMR' },
    { number: '10,000+', label: 'Satisfied Customers', icon: Users, subtitle: 'Families & Corporates' },
    { number: '4.9★', label: 'Customer Rating', icon: Star, subtitle: 'Verified Google Reviews' },
    { number: '24/7', label: 'Concierge Support', icon: Phone, subtitle: 'Standby Replacements' },
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#050505] text-white border-b border-white/10 relative overflow-hidden">
      {/* Glows */}
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-[#35B6DE]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0B0B0B] border border-[#35B6DE]/40 shadow-md mb-3.5">
            <Sparkles className="w-3.5 h-3.5 text-[#F3ED1A]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#35B6DE]">
              Uncompromising Trust &amp; Safety
            </span>
          </div>

          <h2 className="text-h2 font-extrabold text-white mb-4">
            Why Mumbai Trusts On Time Driver Service
          </h2>

          <p className="text-subheading text-[#CFCFCF] leading-relaxed">
            We eliminate the hazards of unverified roadside drivers and unorganized agencies by delivering vetted, trained, and police-verified chauffeurs with corporate discipline.
          </p>
        </div>

        {/* Counter Highlight Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-14 sm:mb-20">
          {counters.map((c, i) => (
            <div
              key={i}
              className="bg-[#0B0B0B] rounded-2xl p-6 sm:p-7 border border-white/10 shadow-xl hover:border-[#35B6DE]/50 transition-all text-center group"
            >
              <div className="w-12 h-12 rounded-xl bg-[#35B6DE]/15 border border-[#35B6DE]/30 group-hover:bg-[#35B6DE] text-[#35B6DE] group-hover:text-[#050505] flex items-center justify-center mx-auto mb-3 transition-colors">
                <c.icon className="w-6 h-6" />
              </div>
              <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white font-heading mb-1 group-hover:text-[#F3ED1A] transition-colors">
                {c.number}
              </div>
              <div className="text-xs sm:text-sm font-bold text-white mb-0.5">
                {c.label}
              </div>
              <div className="text-[11px] text-[#9CA3AF]">
                {c.subtitle}
              </div>
            </div>
          ))}
        </div>

        {/* Image + Content Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          
          {/* Left: Professional Indian Driver with Family Image */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden border border-white/15 shadow-2xl aspect-[4/3] bg-[#0B0B0B]">
              <ImageWithFallback
                src="/images/services/senior-citizen-assistance.jpg"
                alt="Professional Indian driver assisting an Indian family and elderly parents safely into car in Mumbai"
                fallbackTitle="Trusted Family & Senior Driver Care"
                vehicleTag="Family Sedans & SUVs"
                locationTag="Mumbai Residential Hubs"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent pointer-events-none" />
              
              <div className="absolute bottom-4 left-4 right-4 text-white z-10">
                <div className="glass-badge rounded-xl px-3.5 py-2.5 inline-flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#F3ED1A]" />
                  <span className="text-xs font-bold text-white">
                    Assisting Mumbai Families, Corporates &amp; Senior Citizens Since 2014
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: 6 Trust Points */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {trustFeatures.map((feat, i) => {
                const Icon = feat.icon;
                return (
                  <div
                    key={i}
                    className="p-5 rounded-2xl bg-[#0B0B0B] border border-white/10 hover:border-[#35B6DE]/40 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-10 h-10 rounded-xl bg-[#35B6DE]/15 border border-[#35B6DE]/30 flex items-center justify-center text-[#35B6DE] mb-3">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="text-base font-bold text-white mb-1.5">
                        {feat.title}
                      </h3>
                      <p className="text-xs text-[#CFCFCF] leading-relaxed">
                        {feat.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick Action Button */}
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={onOpenBooking}
                className="btn-primary h-[52px] px-8 text-base font-bold flex items-center justify-center gap-2 shadow-lg shadow-[#F3ED1A]/20"
              >
                <span>Book a Verified Chauffeur</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="tel:8652880057"
                className="btn-secondary h-[52px] px-6 text-sm font-semibold flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-[#35B6DE]" />
                <span>Call Concierge: 8652880057</span>
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
