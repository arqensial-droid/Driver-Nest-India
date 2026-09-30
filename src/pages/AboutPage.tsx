import React from 'react';
import { Link, SEO } from '../router';
import { AboutSection } from '../components/AboutSection';
import { TrustSection } from '../components/TrustSection';
import {
  ChevronRight,
  ShieldCheck,
  Award,
  Users,
  Compass,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

interface AboutPageProps {
  onOpenBooking: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenBooking }) => {
  return (
    <>
      <SEO
        title="About Us – Driver Nest India | Mumbai's Premier Chauffeur Agency"
        description="Learn about Driver Nest India's mission, background screening standards, and dedicated chauffeur management across Mumbai, Thane, and Navi Mumbai."
        canonicalPath="/about"
      />

      <div className="pt-24 sm:pt-28 pb-20 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs text-neutral-400">
            <Link href="/" className="hover:text-[#E5C07B] transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-600" />
            <span className="text-[#E5C07B] font-medium">About Us</span>
          </nav>

          {/* About Hero */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="text-xs font-semibold tracking-widest uppercase text-[#D4AF37] mb-2 font-mono">
              Institutional Heritage &amp; Safety
            </div>
            <h1 className="text-h1 text-white mb-4">
              About Driver Nest India
            </h1>
            <p className="text-body-lead text-neutral-300 font-light">
              Founded on the belief that private vehicle owners in Mumbai deserve absolute safety, reliability, and executive decorum without the complexities of unverified hiring.
            </p>
          </div>
        </div>

        {/* Existing enriched AboutSection & TrustSection */}
        <AboutSection onOpenBooking={onOpenBooking} />
        <TrustSection />

        {/* Core Values Strip */}
        <section className="py-16 sm:py-20 bg-black border-t border-neutral-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-h2 text-white mb-4">Our Commitment to Mumbai Car Owners</h2>
            <p className="text-body-lead text-neutral-400 font-light max-w-2xl mx-auto mb-10">
              We operate as your dedicated vehicular mobility partner, ensuring verified legal oversight, background transparency, and dependable standby support.
            </p>
            <div className="flex justify-center gap-4">
              <button onClick={onOpenBooking} className="btn-primary">
                <span>Book a Driver Consultation</span>
                <ArrowRight className="w-4 h-4 text-black" />
              </button>
              <Link href="/services" className="btn-secondary">
                <span>Explore Services</span>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
