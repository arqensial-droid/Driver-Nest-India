import React from 'react';
import {
  ShieldCheck,
  Award,
  Zap,
  Phone,
  ArrowRight,
  Clock,
  UserCheck2,
  FileCheck2,
  CheckCircle2,
  Users,
  Sparkles,
  FileText,
} from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';
import { BrandLogo } from './BrandLogo';

interface AboutSectionProps {
  onOpenBooking: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenBooking }) => {
  const verificationSteps = [
    {
      step: '01',
      title: 'Police Clearance Dossier',
      desc: 'Criminal record verification conducted in coordination with local police commissionerates across Mumbai, Thane & Navi Mumbai.',
      image: '/images/services/chauffeur-service.jpg',
      tag: 'Legal Background Clear',
    },
    {
      step: '02',
      title: 'Biometric Aadhaar & Address Audit',
      desc: 'Physical residence verification and UIDAI biometric identification ensuring 100% trace-verified workforce personnel.',
      image: '/images/services/corporate-driver.jpg',
      tag: 'Biometric Verification',
    },
    {
      step: '03',
      title: 'Practical Road & Transmission Test',
      desc: 'Rigorous driving test covering smooth braking, narrow Mumbai lanes, multi-story parking, and automatic transmissions.',
      image: '/images/services/permanent-driver.jpg',
      tag: 'Defensive Driving Audit',
    },
    {
      step: '04',
      title: 'Etiquette & Protocol Training',
      desc: 'Professional grooming, non-disclosure confidentiality, route navigation optimization, and emergency standby protocols.',
      image: '/images/services/hourly-driver.jpg',
      tag: 'Chauffeur Standards',
    },
  ];

  const workforceHighlights = [
    {
      title: '5,000+ Verified Drivers',
      desc: 'Screened professional drivers stationed throughout Mumbai, Thane, Navi Mumbai, and the extended MMR corridor.',
      icon: Users,
    },
    {
      title: 'Zero Brokerage Agency Fees',
      desc: 'We operate transparently with direct driver allocation without exorbitant upfront placement agency commissions.',
      icon: FileText,
    },
    {
      title: 'Standby Replacement Fleet',
      desc: 'Our Mumbai staging pods ensure guaranteed backup driver deployment if your regular driver is on leave.',
      icon: Zap,
    },
    {
      title: '5+ Years Verified Experience',
      desc: 'Every candidate possesses verified years behind the wheel of sedans, SUVs, and luxury automatic transmissions.',
      icon: Award,
    },
  ];

  return (
    <section id="about" className="py-20 lg:py-24 bg-white text-[#111827] border-b border-[#E5E7EB] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center mb-16 sm:mb-20">
          {/* Left: Brand Story */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="mb-4">
              <BrandLogo size="md" />
            </div>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EEF8FC] border border-[#35B6DE]/30 shadow-xs mb-3.5 w-fit">
              <Sparkles className="w-3.5 h-3.5 text-[#35B6DE]" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#35B6DE]">
                Mumbai Driver Authority
              </span>
            </div>

            <h2 className="text-h2 font-extrabold text-[#111827] mb-4">
              Professional Driver Services for Mumbai Families &amp; Businesses
            </h2>

            <div className="space-y-4 text-[#4B5563] text-sm sm:text-base leading-relaxed mb-6 font-normal">
              <p>
                Navigating the roads of Mumbai, Thane, and Navi Mumbai shouldn't consume your energy or compromise your peace of mind. On Time Driver Service was founded to deliver dependable, punctual, and 100% background-cleared chauffeurs for car owners who value their safety and time.
              </p>
              <p>
                Whether you need an executive chauffeur for daily corporate commutes in BKC, an airport pickup driver at 3:00 AM, a dedicated monthly driver for your family, or a safe highway driver for a weekend trip to Pune or Lonavala, our verified chauffeurs provide complete reliability.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={onOpenBooking}
                className="btn-primary w-full sm:w-auto h-12 px-7 text-sm font-bold shadow-xs flex items-center justify-center gap-2"
              >
                <span>Book a Verified Driver</span>
                <ArrowRight className="w-4 h-4 text-[#111827]" />
              </button>

              <a
                href="tel:8652880057"
                className="btn-secondary w-full sm:w-auto h-12 px-6 text-sm font-semibold flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-[#35B6DE]" />
                <span>Call Concierge: 8652880057</span>
              </a>
            </div>
          </div>

          {/* Right: Visual Experience */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden border border-[#E5E7EB] shadow-md aspect-video bg-slate-100">
              <picture className="w-full h-full block">
                <source type="image/webp" srcSet="/images/services/about-team-service.webp" />
                <img
                  src="/images/services/about-team-service.jpg"
                  alt="Team of professional Indian chauffeurs with police verification dossier in Mumbai"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </picture>
              <div className="absolute inset-0 bg-gradient-to-t from-[#111827]/70 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl p-4 border border-[#E5E7EB] shadow-xs">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#EEF8FC] border border-[#35B6DE]/30 flex items-center justify-center text-[#35B6DE] shrink-0">
                    <ShieldCheck className="w-6 h-6 text-[#22C55E]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#111827]">
                      100% Police Verified &middot; Zero Compromise
                    </h4>
                    <p className="text-xs text-[#4B5563]">
                      Biometrically verified Aadhaar &amp; address checks for every chauffeur.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Pillars Grid */}
        <div className="mb-16">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h3 className="text-xl sm:text-2xl font-bold font-heading text-[#111827] mb-2">
              Our 4-Stage Driver Verification Framework
            </h3>
            <p className="text-sm text-[#4B5563]">
              We reject over 40% of applicants who fail our stringent background and practical driving benchmarks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {verificationSteps.map((step, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-[#E5E7EB] hover:border-[#35B6DE] p-6 shadow-xs hover:shadow-md transition-all group"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-extrabold text-[#35B6DE] font-heading">
                    {step.step}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#EEF8FC] text-[#35B6DE] border border-[#35B6DE]/20">
                    {step.tag}
                  </span>
                </div>
                <h4 className="text-base font-bold text-[#111827] mb-2 font-heading">
                  {step.title}
                </h4>
                <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Highlights Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {workforceHighlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-[#EEF8FC] rounded-2xl p-6 border border-[#E5E7EB] text-left"
              >
                <div className="w-10 h-10 rounded-xl bg-white text-[#35B6DE] flex items-center justify-center mb-3 shadow-xs">
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-[#111827] mb-1 font-heading">
                  {item.title}
                </h4>
                <p className="text-xs text-[#4B5563] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
