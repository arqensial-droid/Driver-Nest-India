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

      <div className="min-h-[75vh] flex flex-col items-center justify-center text-center px-4 pt-32 pb-20 bg-[#F8FAFC] text-[#111827]">
        <div className="w-16 h-16 rounded-2xl bg-[#EEF8FC] border border-[#35B6DE]/30 flex items-center justify-center text-[#35B6DE] mb-6 shadow-xs">
          <Clock className="w-8 h-8" />
        </div>

        <span className="text-xs font-bold uppercase tracking-wider text-[#35B6DE] mb-2 block">
          Error 404
        </span>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#111827] mb-3 font-heading">
          Page Not Found
        </h1>

        <p className="text-sm sm:text-base text-[#4B5563] mb-8 max-w-md leading-relaxed">
          The requested page could not be located. Let us guide you back to our verified driver services or locations across Mumbai.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3.5">
          <Link href="/" className="btn-primary h-12 px-7 text-sm sm:text-base font-bold flex items-center gap-2 shadow-xs">
            <Home className="w-4 h-4 text-[#111827]" />
            <span>Return to Home</span>
          </Link>
          <Link href="/services" className="btn-secondary h-12 px-7 text-sm sm:text-base font-semibold flex items-center gap-2">
            <Car className="w-4 h-4 text-[#35B6DE]" />
            <span>Browse All Services</span>
          </Link>
        </div>
      </div>
    </>
  );
};
