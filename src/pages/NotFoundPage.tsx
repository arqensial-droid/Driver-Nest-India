import React from 'react';
import { Link, SEO } from '../router';
import { Clock, Home, Car } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <>
      <SEO
        title="404 – Page Not Found | On Time Driver Service"
        description="The page you are looking for does not exist on On Time Driver Service. Explore our verified driver services across Mumbai."
      />

      <div className="min-h-[75vh] flex flex-col items-center justify-center text-center px-4 pt-32 pb-20 bg-[#0A0A0A] text-white">
        <div className="w-16 h-16 rounded-2xl bg-[#35B5D8]/15 border border-[#35B5D8]/30 flex items-center justify-center text-[#35B5D8] mb-6">
          <Clock className="w-8 h-8" />
        </div>

        <span className="text-xs font-bold uppercase tracking-wider text-[#35B5D8] mb-2 block">
          Error 404
        </span>

        <h1 className="text-h1 font-extrabold text-white mb-4">
          Page Not Found
        </h1>

        <p className="text-subheading text-[#D1D5DB] mb-8 max-w-md">
          The requested page could not be located. Let us guide you back to our verified driver services or locations across Mumbai.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3.5">
          <Link href="/" className="btn-primary h-[52px] px-8 text-base font-bold flex items-center gap-2">
            <Home className="w-4 h-4 text-[#0A0A0A]" />
            <span>Return to Home</span>
          </Link>
          <Link href="/services" className="btn-secondary h-[52px] px-8 text-base font-bold flex items-center gap-2">
            <Car className="w-4 h-4 text-[#35B5D8]" />
            <span>Browse All Services</span>
          </Link>
        </div>
      </div>
    </>
  );
};
