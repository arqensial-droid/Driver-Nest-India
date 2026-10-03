import React from 'react';
import {
  ShieldCheck,
  FileCheck2,
  Award,
  RefreshCw,
  Zap,
  UserCheck,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

export const TrustSection: React.FC = () => {
  const trustPillars = [
    {
      icon: ShieldCheck,
      title: 'Police Verified',
      badge: '100% Certified',
      description:
        'Official character verification and clearance certificates authenticated directly with local Mumbai, Thane, and Navi Mumbai police commissionerates.',
      accent: '#35B6DE',
    },
    {
      icon: FileCheck2,
      title: 'Background Checked',
      badge: 'Biometric & Address',
      description:
        'Biometric Aadhaar authentication, physical residence audits, past employer reviews, and clean RTO driving license verification.',
      accent: '#F3ED1A',
    },
    {
      icon: Award,
      title: 'Experienced Drivers',
      badge: '5+ Years Track Record',
      description:
        'Minimum 5 years of verified experience in high-density Mumbai traffic, Western Express Highway, Sea Link, and luxury automatic sedans and SUVs.',
      accent: '#35B6DE',
    },
    {
      icon: RefreshCw,
      title: 'Emergency Replacement',
      badge: 'Zero Downtime',
      description:
        'Seamless leave management with guaranteed standby chauffeurs dispatched from our regional staging hubs if your regular driver is unavailable.',
      accent: '#F3ED1A',
    },
    {
      icon: Zap,
      title: 'Instant Dispatch',
      badge: '30–45 Min Arrival',
      description:
        'Strategic driver staging network across South Mumbai, BKC, Western Suburbs, Thane, and Navi Mumbai for rapid urgent allocation.',
      accent: '#35B6DE',
    },
    {
      icon: UserCheck,
      title: 'Uniformed Chauffeurs',
      badge: 'VIP Protocol',
      description:
        'Crisp formal uniform, immaculate personal grooming, non-smoking policy, and trained executive etiquette tailored for corporate and family travel.',
      accent: '#F3ED1A',
    },
  ];

  return (
    <section id="trust" className="relative py-20 lg:py-28 bg-[#050505] text-white overflow-hidden border-t border-b border-white/10">
      {/* Ambient background glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#35B6DE]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-[300px] h-[300px] bg-[#F3ED1A]/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0B0B0B] border border-[#35B6DE]/40 shadow-md mb-3.5">
            <Sparkles className="w-3.5 h-3.5 text-[#F3ED1A]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#35B6DE]">
              Vetted Excellence
            </span>
          </div>

          <h2 className="text-h2 text-white font-extrabold tracking-tight mb-4">
            Built on Rigorous Trust &amp; Uncompromised Safety
          </h2>

          <p className="text-subheading text-[#CFCFCF] leading-relaxed font-normal">
            Every chauffeur on our platform passes rigorous multi-tier screening, in-depth background checks, and practical executive etiquette training.
          </p>
        </div>

        {/* 6 Dark Premium Cards Grid (3 cols desktop, 2 cols tablet, 1 col mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {trustPillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="bg-[#0B0B0B] rounded-2xl border border-white/10 hover:border-[#35B6DE]/50 p-7 flex flex-col justify-between group hover:-translate-y-1.5 duration-300 relative overflow-hidden shadow-xl"
              >
                {/* Subtle top indicator bar */}
                <div
                  className="absolute top-0 left-0 right-0 h-1 transition-opacity duration-300 group-hover:opacity-100 opacity-40"
                  style={{ backgroundColor: pillar.accent }}
                />

                <div>
                  <div className="flex items-center justify-between gap-3 mb-5">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
                      style={{
                        backgroundColor: `${pillar.accent}15`,
                        border: `1px solid ${pillar.accent}30`,
                        color: pillar.accent,
                      }}
                    >
                      <Icon className="w-6 h-6" />
                    </div>

                    <span
                      className="text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider"
                      style={{
                        backgroundColor: `${pillar.accent}10`,
                        color: pillar.accent,
                        border: `1px solid ${pillar.accent}25`,
                      }}
                    >
                      {pillar.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2.5 font-heading group-hover:text-white transition-colors">
                    {pillar.title}
                  </h3>

                  <p className="text-sm text-[#CFCFCF] leading-relaxed font-normal">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-5 mt-5 border-t border-white/5 flex items-center gap-2 text-xs font-semibold text-neutral-400 group-hover:text-[#35B6DE] transition-colors">
                  <CheckCircle2 className="w-4 h-4 text-[#35B6DE]" />
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
