import React from 'react';
import { Link, SEO } from '../router';
import { ShieldCheck, ArrowRight, Home, Compass } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <>
      <SEO
        title="404 – Page Not Found | Driver Nest India"
        description="The page you are looking for does not exist on Driver Nest India. Explore our driver services across Mumbai."
      />

      <div className="min-h-[75vh] flex flex-col items-center justify-center text-center px-4 pt-32 pb-20 bg-black text-white">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#E5C07B] to-[#D4AF37] flex items-center justify-center text-black mb-6 shadow-xl shadow-[#D4AF37]/20">
          <ShieldCheck className="w-8 h-8" />
        </div>

        <span className="text-xs font-mono uppercase tracking-widest text-[#E5C07B] mb-2 block">
          Error 404
        </span>

        <h1 className="text-h1 text-white mb-4">
          Route Not Found
        </h1>

        <p className="text-body-lead text-neutral-400 font-light mb-8 max-w-md">
          The requested page could not be located. Let us guide you back to our verified driver services or locations across Mumbai.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link href="/" className="btn-primary">
            <Home className="w-4 h-4 text-black" />
            <span>Return to Home</span>
          </Link>
          <Link href="/services" className="btn-secondary">
            <Compass className="w-4 h-4 text-[#D4AF37]" />
            <span>Browse All Services</span>
          </Link>
        </div>
      </div>
    </>
  );
};
