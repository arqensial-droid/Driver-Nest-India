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
      accent: '#35B5D8',
    },
    {
      icon: FileCheck2,
      title: 'Background Checked',
      badge: 'Biometric & Address',
      description:
        'Biometric Aadhaar authentication, physical residence audits, past employer reviews, and clean RTO driving license verification.',
      accent: '#F2F028',
    },
    {
      icon: Award,
      title: 'Experienced Drivers',
      badge: '5+ Years Track Record',
      description:
        'Minimum 5 years of verified experience in high-density Mumbai traffic, Western Express Highway, Sea Link, and luxury automatic sedans and SUVs.',
      accent: '#35B5D8',
    },
    {
      icon: RefreshCw,
      title: 'Emergency Replacement',
      badge: 'Zero Downtime',
      description:
        'Seamless leave management with guaranteed standby chauffeurs dispatched from our regional staging hubs if your regular driver is unavailable.',
      accent: '#F2F028',
    },
    {
      icon: Zap,
      title: 'Instant Dispatch',
      badge: '30–45 Min Arrival',
      description:
        'Strategic driver staging network across South Mumbai, BKC, Western Suburbs, Thane, and Navi Mumbai for rapid urgent allocation.',
      accent: '#35B5D8',
    },
    {
      icon: UserCheck,
      title: 'Uniformed Chauffeurs',
      badge: 'VIP Protocol',
      description:
        'Crisp formal uniform, immaculate personal grooming, non-smoking policy, and trained executive etiquette tailored for corporate and family travel.',
      accent: '#F2F028',
    },
  ];

  return (
    <section id="trust" className="relative py-20 lg:py-28 bg-[#0A0A0A] text-white overflow-hidden border-t border-b border-white/10">
      {/* Ambient background glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#35B5D8]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-[300px] h-[300px] bg-[#F2F028]/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#121212] border border-[#35B5D8]/40 shadow-md mb-3.5">
            <Sparkles className="w-3.5 h-3.5 text-[#F2F028]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#35B5D8]">
              Vetted Excellence
            </span>
          </div>

          <h2 className="text-h2 text-white font-extrabold tracking-tight mb-4">
            Built on Rigorous Trust & Uncompromised Safety
          </h2>

          <p className="text-subheading text-[#D1D5DB] leading-relaxed">
            Every chauffeur in our network undergoes comprehensive multi-tier background screening, police verification, and executive etiquette training before stepping behind your wheel.
          </p>
        </div>

        {/* 6 Dark Premium Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {trustPillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            const isBlue = pillar.accent === '#35B5D8';

            return (
              <div
                key={idx}
                className="group relative p-7 rounded-2xl bg-[#121212] border border-white/10 hover:border-[#35B5D8]/60 transition-all duration-300 hover:-translate-y-1.5 shadow-xl hover:shadow-[#35B5D8]/10 flex flex-col justify-between"
              >
                {/* Subtle card top glow indicator */}
                <div
                  className="absolute top-0 left-8 right-8 h-[2px] transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                  style={{
                    background: isBlue
                      ? 'linear-gradient(90deg, transparent, #35B5D8, transparent)'
                      : 'linear-gradient(90deg, transparent, #F2F028, transparent)',
                  }}
                />

                <div>
                  <div className="flex items-center justify-between gap-3 mb-5">
                    <div
                      className="w-13 h-13 rounded-xl flex items-center justify-center transition-colors duration-300"
                      style={{
                        backgroundColor: isBlue ? 'rgba(53, 181, 216, 0.15)' : 'rgba(242, 240, 40, 0.12)',
                        border: isBlue ? '1px solid rgba(53, 181, 216, 0.3)' : '1px solid rgba(242, 240, 40, 0.3)',
                      }}
                    >
                      <Icon
                        className="w-6 h-6 transition-transform duration-300 group-hover:scale-110"
                        style={{ color: pillar.accent }}
                      />
                    </div>

                    <span
                      className="text-[11px] font-bold px-2.5 py-1 rounded-full border"
                      style={{
                        backgroundColor: isBlue ? 'rgba(53, 181, 216, 0.1)' : 'rgba(242, 240, 40, 0.08)',
                        color: pillar.accent,
                        borderColor: isBlue ? 'rgba(53, 181, 216, 0.3)' : 'rgba(242, 240, 40, 0.3)',
                      }}
                    >
                      {pillar.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2.5 group-hover:text-[#35B5D8] transition-colors">
                    {pillar.title}
                  </h3>

                  <p className="text-sm text-[#D1D5DB] leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-5 mt-5 border-t border-white/5 flex items-center gap-1.5 text-xs font-semibold text-neutral-400 group-hover:text-white transition-colors">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E]" />
                  <span>Strictly Enforced Protocol</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
