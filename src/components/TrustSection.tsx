import React from 'react';
import {
  ShieldCheck,
  Award,
  Zap,
  RefreshCw,
  Headphones,
  UserCheck,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

export const TrustSection: React.FC = () => {
  const trustPillars = [
    {
      icon: ShieldCheck,
      title: '100% Police Verified Drivers',
      badge: 'Official Clearance',
      description:
        'Official character verification certificates and background authentication validated directly with local Mumbai, Thane, and Navi Mumbai police authorities.',
      color: '#35B6DE',
    },
    {
      icon: Award,
      title: '5+ Years Experience',
      badge: 'Rigorous Driving Test',
      description:
        'Minimum 5 years of verified professional driving in Mumbai traffic, Western Express Highway, Coastal Road, and premium automatic luxury sedans and SUVs.',
      color: '#35B6DE',
    },
    {
      icon: Zap,
      title: 'Fast Driver Allocation',
      badge: '30–45 Mins Arrival',
      description:
        'Strategic driver stations positioned across South Mumbai, BKC, Western Suburbs, Thane, and Navi Mumbai for prompt doorstep allocation.',
      color: '#35B6DE',
    },
    {
      icon: RefreshCw,
      title: 'Replacement Guarantee',
      badge: 'Zero Downtime',
      description:
        'Immediate backup driver provided with zero downtime if your assigned chauffeur takes leave or is unavailable for personal reasons.',
      color: '#35B6DE',
    },
    {
      icon: Headphones,
      title: '24/7 Support',
      badge: 'Dedicated Concierge',
      description:
        'Always-on dispatch desk reachable via direct phone (8652880057) or WhatsApp to accommodate early-morning airport runs or late-night returns.',
      color: '#35B6DE',
    },
    {
      icon: UserCheck,
      title: 'Uniformed & Groomed',
      badge: 'Executive Etiquette',
      description:
        'Impeccable personal grooming, formal uniform, polite communication, non-smoking policy, and trained executive driving standards.',
      color: '#35B6DE',
    },
  ];

  return (
    <section id="trust" className="py-16 sm:py-20 bg-white text-[#111827] border-b border-[#E5E7EB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EEF8FC] border border-[#35B6DE]/30 shadow-xs mb-3.5">
            <Sparkles className="w-3.5 h-3.5 text-[#35B6DE]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#35B6DE]">
              Mumbai's Trusted Driver Network
            </span>
          </div>

          <h2 className="text-h2 text-[#111827] font-extrabold tracking-tight mb-4">
            Built on Verified Trust, Safety &amp; Punctuality
          </h2>

          <p className="text-subheading text-[#4B5563] leading-relaxed font-normal text-base sm:text-lg">
            Every driver on our platform completes comprehensive background verification, document audits, and executive driving etiquette training.
          </p>
        </div>

        {/* 6 Premium Icon Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {trustPillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-[#E5E7EB] hover:border-[#35B6DE] p-7 flex flex-col justify-between group hover:-translate-y-1 duration-200 shadow-xs hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-5">
                    <div className="w-12 h-12 rounded-xl bg-[#EEF8FC] border border-[#35B6DE]/20 flex items-center justify-center text-[#35B6DE] transition-transform group-hover:scale-105">
                      <Icon className="w-6 h-6" />
                    </div>

                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider bg-[#EEF8FC] text-[#35B6DE] border border-[#35B6DE]/20">
                      {pillar.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#111827] mb-2 font-heading">
                    {pillar.title}
                  </h3>

                  <p className="text-sm text-[#4B5563] leading-relaxed font-normal">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-5 mt-5 border-t border-[#E5E7EB] flex items-center gap-2 text-xs font-semibold text-[#4B5563] group-hover:text-[#35B6DE] transition-colors">
                  <CheckCircle2 className="w-4 h-4 text-[#22C55E]" />
                  <span>On Time Driver Service Guarantee</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
