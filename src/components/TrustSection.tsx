import React from 'react';
import {
  FileCheck2,
  Fingerprint,
  UserCheck2,
  CalendarCheck,
  Headphones,
  Zap,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';

export const TrustSection: React.FC = () => {
  const trustCards = [
    {
      icon: FileCheck2,
      title: 'Police Verification Process',
      description: 'Official clearance certificates obtained directly from local Mumbai, Thane, and Navi Mumbai police commissionerates.',
    },
    {
      icon: Fingerprint,
      title: 'Biometric ID Verification',
      description: 'Aadhaar biometric validation, PAN verification, and physical permanent address cross-examinations.',
    },
    {
      icon: UserCheck2,
      title: 'Driver Screening & Training',
      description: 'In-depth behavioral interviews, background checks with past 2 Mumbai employers, and practical road testing.',
    },
    {
      icon: CalendarCheck,
      title: 'Experience Verification',
      description: 'Mandatory minimum 5+ years of verified driving track record across Mumbai flyovers, toll plazas, and expressways.',
    },
    {
      icon: Headphones,
      title: '24/7 Operations Support',
      description: 'Dedicated Mumbai operations team with immediate phone coordination and free standby replacement driver guarantees.',
    },
    {
      icon: Zap,
      title: 'Fast Doorstep Allocation',
      description: 'Driver staging clusters across Western, Central, Harbor, and Thane lines enable 30 to 45 min dispatch.',
    },
    {
      icon: Sparkles,
      title: 'Professional Chauffeur Etiquette',
      description: 'Neat formal attire, non-intrusive in-cabin conduct, smoke-free clean personal hygiene, and vehicle respect.',
    },
    {
      icon: ShieldCheck,
      title: 'Defensive Driving Standards',
      description: 'Smooth non-jarring braking, speed regulation, and monsoon waterlogging navigation protocols.',
    },
  ];

  return (
    <section id="trust" className="py-16 sm:py-20 lg:py-24 bg-[#060606] relative border-t border-b border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
          <div className="text-xs font-semibold tracking-widest uppercase text-[#D4AF37] mb-3">
            Institutional Verification &amp; Background Screening
          </div>
          <h2 className="text-h2 text-white mb-4">
            Driver Verification &amp; <span className="gold-gradient-text">Screening Protocols</span>
          </h2>
          <p className="text-body-lead text-neutral-400 font-light">
            Every chauffeur on our Mumbai roster undergoes mandatory legal police checks, biometric Aadhaar identification,
            and vehicle handling audits before being deployed to your doorstep.
          </p>
        </div>

        {/* 8 Premium Icon Cards Grid with Equal Height */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 lg:mb-16 items-stretch">
          {trustCards.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="glass-card glass-card-hover rounded-xl p-6 border border-[#D4AF37]/20 flex flex-col justify-between h-full"
              >
                <div>
                  <div className="w-11 h-11 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-[#D4AF37]" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2 font-display">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-light">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Realistic Verification Banner */}
        <div className="rounded-2xl overflow-hidden border border-[#D4AF37]/30 relative shadow-2xl">
          <div className="h-72 sm:h-96 w-full relative">
            <ImageWithFallback
              src="/images/services/corporate-driver.jpg"
              alt="Driver Nest India verification team conducting driver screening and background checks"
              fallbackTitle="Driver Screening & Verification Office"
              vehicleTag="Verified Document Clearance"
              locationTag="Mumbai Central Operations Desk"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-transparent" />
            <div className="absolute inset-0 p-6 sm:p-10 lg:p-12 flex flex-col justify-center max-w-xl">
              <span className="text-xs font-mono uppercase text-[#E5C07B] tracking-wider mb-2 font-semibold">
                Verification Dossier Guarantee
              </span>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-3 font-display">
                Police Verification Clearance Delivered to Your Phone
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-6 font-light">
                Before your permanent or corporate chauffeur reports for duty, you receive full digital copies of their
                police verification certificate, Aadhaar validation, and driving license directly on WhatsApp or email.
              </p>
              <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-[#E5C07B] font-medium">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Police Verification Clear
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Aadhaar Biometric Check
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Zero Criminal Records
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
