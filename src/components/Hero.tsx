import React from 'react';
import {
  Phone,
  Calendar,
  ShieldCheck,
  Star,
  Users,
  Clock,
  Sparkles,
  CheckCircle2,
  Car,
} from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';

interface HeroProps {
  onOpenBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking }) => {
  return (
    <section className="relative min-h-[90vh] lg:min-h-[94vh] flex items-center pt-28 pb-16 lg:py-24 overflow-hidden bg-[#0A0A0A] text-white">
      {/* Background Glows & Luxury Mesh Pattern */}
      <div className="absolute inset-0 bg-mesh-pattern opacity-60 pointer-events-none" />
      <div className="glow-blue-lg -top-24 -left-24" />
      <div className="glow-yellow-sm top-1/2 -right-20" />
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0A0A0A] to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* ================= LEFT SIDE ================= */}
          <div className="lg:col-span-6 flex flex-col justify-center text-left">
            {/* Small Badge: Mumbai's Trusted Driver Network */}
            <div className="inline-flex items-center gap-2 self-start px-3.5 py-1.5 rounded-full bg-[#121212] border border-[#35B5D8]/40 shadow-lg shadow-[#35B5D8]/10 mb-4">
              <span className="w-2 h-2 rounded-full bg-[#35B5D8] animate-pulse"></span>
              <Sparkles className="w-3.5 h-3.5 text-[#F2F028]" />
              <span className="text-xs sm:text-sm font-semibold tracking-wide text-[#35B5D8]">
                Mumbai's Trusted Driver Network
              </span>
            </div>

            {/* Large Headline: Professional Driver Service Across Mumbai */}
            <h1 className="text-h1 text-white font-extrabold tracking-tight mb-4">
              Professional Driver Service{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#35B5D8] via-[#85dbf2] to-[#F2F028]">
                Across Mumbai
              </span>
            </h1>

            {/* Subheadline: Verified chauffeurs for personal, family, corporate and outstation requirements. */}
            <p className="text-subheading text-[#D1D5DB] mb-7 leading-relaxed max-w-xl">
              Verified chauffeurs for personal, family, corporate and outstation requirements. Experience elite, disciplined driving for your sedans, SUVs, and luxury cars.
            </p>

            {/* CTA 1 & CTA 2 Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-8">
              <button
                onClick={onOpenBooking}
                className="btn-primary w-full sm:w-auto h-[52px] px-8 text-base font-bold flex items-center justify-center gap-2 shadow-lg shadow-[#F2F028]/20 transition-all hover:scale-[1.02]"
              >
                <Calendar className="w-4 h-4 text-[#0A0A0A]" />
                <span>Book Driver</span>
              </button>

              <a
                href="tel:8652880057"
                className="btn-secondary w-full sm:w-auto h-[52px] px-8 text-base font-bold flex items-center justify-center gap-2 transition-all hover:border-[#35B5D8]"
              >
                <Phone className="w-4 h-4 text-[#35B5D8]" />
                <span>Call Now: 8652880057</span>
              </a>
            </div>

            {/* Trust Metrics: 5000+ Drivers, 10000+ Customers, 4.9 Rating, 24x7 Support */}
            <div className="pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-3 rounded-xl bg-[#121212]/80 border border-white/5">
                <div className="flex items-center gap-1.5 text-[#35B5D8] mb-1">
                  <Car className="w-4 h-4" />
                  <span className="text-lg sm:text-xl font-extrabold text-white">5000+</span>
                </div>
                <p className="text-xs text-[#9CA3AF] font-medium">Verified Drivers</p>
              </div>

              <div className="p-3 rounded-xl bg-[#121212]/80 border border-white/5">
                <div className="flex items-center gap-1.5 text-[#F2F028] mb-1">
                  <Users className="w-4 h-4" />
                  <span className="text-lg sm:text-xl font-extrabold text-white">10000+</span>
                </div>
                <p className="text-xs text-[#9CA3AF] font-medium">Satisfied Clients</p>
              </div>

              <div className="p-3 rounded-xl bg-[#121212]/80 border border-white/5">
                <div className="flex items-center gap-1.5 text-[#F2F028] mb-1">
                  <Star className="w-4 h-4 fill-[#F2F028]" />
                  <span className="text-lg sm:text-xl font-extrabold text-white">4.9 / 5</span>
                </div>
                <p className="text-xs text-[#9CA3AF] font-medium">Client Rating</p>
              </div>

              <div className="p-3 rounded-xl bg-[#121212]/80 border border-white/5">
                <div className="flex items-center gap-1.5 text-[#35B5D8] mb-1">
                  <Clock className="w-4 h-4" />
                  <span className="text-lg sm:text-xl font-extrabold text-white">24x7</span>
                </div>
                <p className="text-xs text-[#9CA3AF] font-medium">Live Concierge</p>
              </div>
            </div>
          </div>

          {/* ================= RIGHT SIDE ================= */}
          {/* Large premium image: Indian chauffeur, Toyota Innova Crysta, Business environment, Luxury appearance, Dark overlay */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden border border-white/15 shadow-2xl shadow-[#35B5D8]/10 group">
              {/* Outer decorative glow frame */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#35B5D8]/40 to-[#F2F028]/20 rounded-2xl blur-xs -z-10 opacity-70 group-hover:opacity-100 transition-opacity" />

              <div className="relative aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/3] w-full overflow-hidden bg-[#121212]">
                <ImageWithFallback
                  src="/images/services/chauffeur-service.jpg"
                  alt="Professional Indian chauffeur in crisp uniform standing beside Toyota Innova Crysta in Mumbai BKC business district"
                  fallbackTitle="Executive Indian Chauffeur with Toyota Innova Crysta"
                  vehicleTag="Toyota Innova Crysta & Luxury Sedans"
                  locationTag="BKC & South Mumbai Corridor"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Dark Cinematic Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-transparent" />
                <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#0A0A0A]/20 to-[#0A0A0A]/70" />

                {/* Glassmorphic Floating Badge 1 - Top Left */}
                <div className="absolute top-4 left-4 glass-badge rounded-xl px-3.5 py-2 flex items-center gap-2.5 animate-float-slow">
                  <div className="w-7 h-7 rounded-lg bg-[#35B5D8]/20 border border-[#35B5D8]/40 flex items-center justify-center text-[#35B5D8]">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white leading-tight">100% Police Verified</p>
                    <p className="text-[10px] text-[#35B5D8]">Background Checked & Biometric Audited</p>
                  </div>
                </div>

                {/* Glassmorphic Floating Badge 2 - Bottom Content Card */}
                <div className="absolute bottom-4 left-4 right-4 glass-badge rounded-xl p-3.5 border border-white/15">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-[#F2F028]/15 border border-[#F2F028]/30 flex items-center justify-center text-[#F2F028]">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm font-bold text-white">Toyota Innova Crysta & Sedan Experts</p>
                        <p className="text-[11px] text-[#D1D5DB]">Automatic & Manual Transmission Specialists</p>
                      </div>
                    </div>
                    <span className="hidden sm:inline-block px-2.5 py-1 text-[11px] font-bold rounded-md bg-[#35B5D8]/20 text-[#35B5D8] border border-[#35B5D8]/30">
                      30–45 Min Dispatch
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
