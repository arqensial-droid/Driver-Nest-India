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
      desc: 'Screened Indian chauffeurs stationed throughout Mumbai, Thane, Navi Mumbai, and the extended MMR corridor.',
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
    <section id="about" className="py-20 lg:py-28 bg-[#050505] text-white border-b border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center mb-16 sm:mb-24">
          {/* Left: Brand Story */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0B0B0B] border border-[#35B6DE]/40 shadow-md mb-3.5 w-fit">
              <Sparkles className="w-3.5 h-3.5 text-[#F3ED1A]" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#35B6DE]">
                Mumbai Chauffeur Authority
              </span>
            </div>

            <h2 className="text-h2 font-extrabold text-white mb-4">
              Professional Driver Services for Mumbai Families &amp; Businesses
            </h2>

            <div className="space-y-4 text-[#CFCFCF] text-sm sm:text-base leading-relaxed mb-6 font-normal">
              <p>
                Navigating the roads of Mumbai, Thane, and Navi Mumbai shouldn't consume your energy or compromise your peace of mind. On Time Driver Service was founded to deliver dependable, punctual, and 100% background-cleared chauffeurs for car owners who value their safety and time.
              </p>
              <p>
                Whether you commute through the Western Express Highway daily, need a disciplined driver for your children’s school runs, or require an executive chauffeur for corporate partners visiting BKC, our platform provides vetted professionals with guaranteed punctuality.
              </p>
            </div>

            {/* Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-neutral-300">
                <CheckCircle2 className="w-4 h-4 text-[#35B6DE] shrink-0" />
                <span>100% Police Verified Records</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-neutral-300">
                <CheckCircle2 className="w-4 h-4 text-[#35B6DE] shrink-0" />
                <span>Zero Advance Placement Fees</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-neutral-300">
                <CheckCircle2 className="w-4 h-4 text-[#35B6DE] shrink-0" />
                <span>Rapid 30–45 Min Dispatch</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-neutral-300">
                <CheckCircle2 className="w-4 h-4 text-[#35B6DE] shrink-0" />
                <span>Standby Replacement Guarantee</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <button
                onClick={onOpenBooking}
                className="btn-primary h-[52px] px-8 text-base font-bold flex items-center justify-center gap-2 shadow-lg shadow-[#F3ED1A]/20"
              >
                <span>Hire a Chauffeur Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="tel:8652880057"
                className="btn-secondary h-[52px] px-6 text-sm font-semibold flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-[#35B6DE]" />
                <span>Call Desk: 8652880057</span>
              </a>
            </div>
          </div>

          {/* Right: Real Photography Card */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden border border-white/15 aspect-[4/3] bg-[#0B0B0B] shadow-2xl">
              <ImageWithFallback
                src="/images/services/chauffeur-service.jpg"
                alt="Executive Indian chauffeur in formal uniform standing beside luxury vehicle in Mumbai"
                fallbackTitle="Executive Chauffeur"
                vehicleTag="Toyota Innova Crysta & Luxury Sedans"
                locationTag="Mumbai BKC District"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent pointer-events-none" />

              <div className="absolute bottom-4 left-4 right-4 text-white z-10">
                <div className="glass-badge rounded-xl px-4 py-3 border border-white/10">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-white">Discipline · Decorum · Safety</div>
                      <div className="text-[11px] text-[#35B6DE]">Trained specifically for Mumbai driving protocols</div>
                    </div>
                    <span className="px-2.5 py-1 text-[10px] font-bold rounded-md bg-[#22C55E]/20 text-[#22C55E] border border-[#22C55E]/30">
                      Vetted
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Step Verification Process Cards */}
        <div className="mb-16 sm:mb-24">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h3 className="text-h2 font-extrabold text-white mb-3">
              Our 4-Stage Driver Induction &amp; Verification Protocol
            </h3>
            <p className="text-sm text-[#CFCFCF] leading-relaxed">
              Before any driver represents On Time Driver Service behind your wheel, they must clear all four verification gates.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {verificationSteps.map((step, idx) => (
              <div
                key={idx}
                className="bg-[#0B0B0B] rounded-2xl border border-white/10 overflow-hidden shadow-xl hover:border-[#35B6DE]/50 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#181818]">
                    <ImageWithFallback
                      src={step.image}
                      alt={step.title}
                      fallbackTitle={step.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-transparent to-transparent pointer-events-none" />
                    <div className="absolute top-3 left-3 bg-[#35B6DE] text-[#050505] text-xs font-extrabold px-2.5 py-1 rounded-md shadow-md">
                      Step {step.step}
                    </div>
                    <div className="absolute bottom-2.5 right-3 text-[10px] font-bold text-[#F3ED1A] bg-black/75 px-2 py-0.5 rounded border border-white/10">
                      {step.tag}
                    </div>
                  </div>

                  <div className="p-5">
                    <h4 className="text-base font-bold text-white mb-2">
                      {step.title}
                    </h4>
                    <p className="text-xs text-[#CFCFCF] leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>

                <div className="px-5 pb-5 pt-2 border-t border-white/5 flex items-center gap-1.5 text-xs text-[#22C55E] font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Mandatory Clearance</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Workforce Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {workforceHighlights.map((hl, i) => {
            const Icon = hl.icon;
            return (
              <div
                key={i}
                className="bg-[#0B0B0B] rounded-2xl p-6 border border-white/10 hover:border-[#35B6DE]/40 transition-all text-center flex flex-col items-center justify-center"
              >
                <div className="w-12 h-12 rounded-xl bg-[#35B6DE]/15 border border-[#35B6DE]/30 text-[#35B6DE] flex items-center justify-center mb-3">
                  <Icon className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-white mb-2">
                  {hl.title}
                </h4>
                <p className="text-xs text-[#CFCFCF] leading-relaxed">
                  {hl.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
