import React from 'react';
import { ShieldCheck, Phone, Mail, MapPin, MessageSquare, ArrowRight } from 'lucide-react';
import { locationsData } from '../data/locationsData';
import { servicesData } from '../data/servicesData';
import { Link } from '../router';

interface FooterProps {
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking }) => {
  return (
    <footer className="bg-[#040404] border-t border-[#D4AF37]/20 pt-16 pb-24 md:pb-12 text-neutral-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10 mb-12">
          {/* Col 1 & 2: Brand Lockup & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5" aria-label="Driver Nest India Home">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#E5C07B] via-[#D4AF37] to-[#99781D] flex items-center justify-center shadow-md shadow-[#D4AF37]/20">
                <ShieldCheck className="w-5 h-5 text-black" />
              </div>
              <span className="font-display text-xl font-bold tracking-wider text-white">
                DRIVER NEST <span className="text-[#D4AF37]">INDIA</span>
              </span>
            </Link>

            <p className="text-neutral-400 text-xs leading-relaxed max-w-sm font-light">
              Driver Nest India is Mumbai’s premier chauffeur and professional driver agency. We provide verified,
              reliable, and skilled chauffeurs for personal vehicles, corporate enterprises, senior citizen assistance,
              and highway outstation journeys.
            </p>

            <div className="flex items-center gap-3 pt-2 text-white">
              <a
                href="tel:+919930012345"
                className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-[#D4AF37] transition-colors"
                aria-label="Call Helpline"
              >
                <Phone className="w-4 h-4 text-[#D4AF37]" />
              </a>
              <a
                href="https://wa.me/919930012345"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-[#25D366] transition-colors"
                aria-label="WhatsApp Support"
              >
                <MessageSquare className="w-4 h-4 text-[#25D366]" />
              </a>
              <a
                href="mailto:concierge@drivernestindia.com"
                className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-[#D4AF37] transition-colors"
                aria-label="Email Concierge"
              >
                <Mail className="w-4 h-4 text-[#D4AF37]" />
              </a>
            </div>

            <div className="pt-2">
              <div className="inline-flex items-center gap-2 text-xs text-[#E5C07B] font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>24/7 Operations Desk Active Across MMR</span>
              </div>
            </div>

            {/* Quick Navigation Links */}
            <div className="pt-2 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-neutral-300">
              <Link href="/" className="hover:text-[#E5C07B] transition-colors">Home</Link>
              <Link href="/about" className="hover:text-[#E5C07B] transition-colors">About Us</Link>
              <Link href="/services" className="hover:text-[#E5C07B] transition-colors">All Services</Link>
              <Link href="/service-areas" className="hover:text-[#E5C07B] transition-colors">Service Areas</Link>
              <Link href="/faqs" className="hover:text-[#E5C07B] transition-colors">FAQs</Link>
              <Link href="/contact" className="hover:text-[#E5C07B] transition-colors">Contact</Link>
            </div>
          </div>

          {/* Col 3: All 12 Services Dedicated Links */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-4 font-mono flex items-center justify-between">
              <span>Driver Services</span>
              <Link href="/services" className="text-[10px] text-[#E5C07B] normal-case hover:underline">View All →</Link>
            </h4>
            <ul className="space-y-2">
              {servicesData.map((svc) => (
                <li key={svc.id}>
                  <Link
                    href={`/services/${svc.slug}`}
                    className="hover:text-[#E5C07B] transition-colors block truncate"
                  >
                    {svc.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: All 11 Service Locations Dedicated Links */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-4 font-mono flex items-center justify-between">
              <span>Service Areas</span>
              <Link href="/service-areas" className="text-[10px] text-[#E5C07B] normal-case hover:underline">View All →</Link>
            </h4>
            <div className="grid grid-cols-2 gap-x-2 gap-y-2">
              {locationsData.map((loc) => (
                <Link
                  key={loc.id}
                  href={`/locations/${loc.id}`}
                  className="hover:text-[#E5C07B] transition-colors truncate"
                >
                  {loc.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Col 5: Quick Contact & Dispatch */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-4 font-mono">
              Central Concierge
            </h4>
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
              <span>BKC &amp; Western Express Highway Corridors, Mumbai, Maharashtra 400051</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span className="font-mono text-white">+91 99300 12345</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span>concierge@drivernestindia.com</span>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenBooking}
                className="w-full btn-primary h-11 text-xs"
              >
                <span>Book a Driver</span>
                <ArrowRight className="w-3.5 h-3.5 text-black" />
              </button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500 font-light">
          <p>© {new Date().getFullYear()} Driver Nest India. All rights reserved. Professional Driver Agency Across Mumbai.</p>
          <div className="flex items-center gap-4 text-neutral-400">
            <span>100% Police Verified</span>
            <span>·</span>
            <span>Zero Brokerage</span>
            <span>·</span>
            <span>MMR Dispatch</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
