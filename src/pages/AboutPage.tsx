import React from 'react';
import { Link, SEO } from '../router';
import { AboutSection } from '../components/AboutSection';
import { TrustSection } from '../components/TrustSection';
import {
  ChevronRight,
  ShieldCheck,
  Award,
  Users,
  Clock,
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

interface AboutPageProps {
  onOpenBooking: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenBooking }) => {
  return (
    <>
      <SEO
        title="About Us – On Time Driver Service | Mumbai's Trusted Driver Partner"
        description="Learn about On Time Driver Service's mission, police verification standards, and professional chauffeur management across Mumbai, Thane, Navi Mumbai, and MMR."
        canonicalPath="/about"
      />

      <div className="pt-24 sm:pt-28 pb-20 bg-[#050505] text-white overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-xs text-neutral-400">
            <Link href="/" className="hover:text-[#35B6DE] transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-600" />
            <span className="text-white font-semibold">About Us</span>
          </nav>

          {/* About Hero Header */}
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0B0B0B] border border-[#35B6DE]/40 shadow-md mb-3.5">
              <Sparkles className="w-3.5 h-3.5 text-[#F3ED1A]" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#35B6DE]">
                Corporate Standards &amp; Verified Safety
              </span>
            </div>
            <h1 className="text-h1 font-extrabold text-white mb-4">
              About On Time Driver Service
            </h1>
            <p className="text-subheading text-[#CFCFCF] leading-relaxed">
              Founded on the principle that car owners in Mumbai deserve punctual, reliable, and 100% police-verified chauffeurs without the risks and hassles of unorganized agencies.
            </p>
          </div>
        </div>

        {/* Existing AboutSection & TrustSection in dark theme */}
        <AboutSection onOpenBooking={onOpenBooking} />
        <TrustSection />

        {/* Core Values Strip */}
        <section className="py-16 sm:py-20 bg-[#050505] border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-h2 font-extrabold text-white mb-4">
              Our Commitment to Mumbai Car Owners
            </h2>
            <p className="text-subheading text-[#CFCFCF] max-w-2xl mx-auto mb-8 leading-relaxed">
              We operate as your dedicated vehicular mobility partner, ensuring complete legal verification, background transparency, and guaranteed standby replacements.
            </p>

            <div className="flex justify-center gap-4">
              <button
                onClick={onOpenBooking}
                className="btn-primary h-[52px] px-8 text-base font-bold inline-flex items-center gap-2 shadow-xl shadow-[#F3ED1A]/20"
              >
                <span>Book a Verified Driver Today</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
