import React from 'react';
import { ShieldCheck, Phone, Mail, MapPin, MessageSquare, ArrowRight, Clock, Calendar } from 'lucide-react';
import { Link } from '../router';

interface FooterProps {
  onOpenBooking: () => void;
}

const FOOTER_SERVICES = [
  { slug: '/hourly-driver-service', title: 'Hourly Driver Service' },
  { slug: '/permanent-driver-service', title: 'Permanent Driver Service' },
  { slug: '/corporate-driver-service', title: 'Corporate Driver Service' },
  { slug: '/airport-driver-service', title: 'Airport Transfer Driver' },
  { slug: '/outstation-driver-service', title: 'Outstation Highway Driver' },
  { slug: '/personal-driver-service', title: 'Personal Driver Service' },
  { slug: '/chauffeur-service', title: 'Executive Chauffeur Service' },
  { slug: '/services', title: 'View All Driver Services →' },
];

const FOOTER_LOCATIONS = [
  { slug: '/locations/mumbai', title: 'Mumbai (BKC, South Mumbai, Suburbs)' },
  { slug: '/locations/thane', title: 'Thane (Ghodbunder, Majiwada)' },
  { slug: '/locations/navi-mumbai', title: 'Navi Mumbai (Vashi, Belapur, Panvel)' },
  { slug: '/locations/mira-road', title: 'Mira Road (Shanti Nagar, Kanakia)' },
  { slug: '/locations/bhayandar', title: 'Bhayandar (East & West)' },
  { slug: '/locations/vasai', title: 'Vasai (Evershine, Ambadi Road)' },
  { slug: '/locations/virar', title: 'Virar (Global City, Bolinj)' },
  { slug: '/service-areas', title: 'View All Service Areas →' },
];

export const Footer: React.FC<FooterProps> = ({ onOpenBooking }) => {
  return (
    <footer className="bg-[#111111] text-neutral-300 border-t border-neutral-800 pt-10 sm:pt-14 pb-20 md:pb-12 text-xs overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* EXACT 4-COLUMN FOOTER (Company, Services, Locations, Contact) - Collapses into stacked on Mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 mb-10">
          {/* COLUMN 1: Company */}
          <div className="space-y-3.5">
            <Link href="/" className="flex items-center gap-2.5" aria-label="On Time Driver Service Home">
              <div className="w-9 h-9 rounded-[10px] bg-[#35B5D8] flex items-center justify-center text-white shadow-xs shrink-0">
                <Clock className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1 leading-none font-heading font-extrabold text-base tracking-tight text-white">
                  <span>ON TIME</span>
                  <span className="text-[#35B5D8]">DRIVER</span>
                </div>
                <span className="text-[9px] uppercase font-bold tracking-wider text-neutral-400 mt-0.5">
                  Mumbai · Thane · Navi Mumbai
                </span>
              </div>
            </Link>

            <p className="text-neutral-400 text-xs leading-relaxed">
              On Time Driver Service provides verified, professional personal, corporate, airport, and monthly chauffeurs across Mumbai, Thane, Navi Mumbai, Mira Road, Vasai, Virar, and Palghar.
            </p>

            <div className="flex items-center gap-2.5 pt-1 text-white">
              <a
                href="tel:8652880057"
                className="w-9 h-9 rounded-[10px] bg-neutral-800 hover:bg-[#35B5D8] text-white flex items-center justify-center transition-colors shadow-xs"
                aria-label="Call 8652880057"
              >
                <Phone className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/918652880057?text=Hello%20On%20Time%20Driver%20Service,%20I%20need%20driver%20service%20in%20Mumbai.%20Please%20contact%20me."
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-[10px] bg-neutral-800 hover:bg-[#25D366] text-white flex items-center justify-center transition-colors shadow-xs"
                aria-label="WhatsApp Support"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
              <a
                href="mailto:info@ontimedriverservice.com"
                className="w-9 h-9 rounded-[10px] bg-neutral-800 hover:bg-[#35B5D8] text-white flex items-center justify-center transition-colors shadow-xs"
                aria-label="Email Support"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>

            <div className="inline-flex items-center gap-1.5 text-xs text-[#F2F028] font-semibold pt-1">
              <ShieldCheck className="w-4 h-4 text-[#35B5D8] shrink-0" />
              <span>100% Police Verified Chauffeurs</span>
            </div>
          </div>

          {/* COLUMN 2: Services */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-white text-xs uppercase tracking-wider border-l-2 border-[#35B5D8] pl-2">
              Our Services
            </h4>
            <ul className="space-y-2 text-neutral-400">
              {FOOTER_SERVICES.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={s.slug}
                    className="hover:text-[#35B5D8] transition-colors block text-xs"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 3: Locations */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-white text-xs uppercase tracking-wider border-l-2 border-[#35B5D8] pl-2">
              Service Areas
            </h4>
            <ul className="space-y-2 text-neutral-400">
              {FOOTER_LOCATIONS.map((loc) => (
                <li key={loc.slug}>
                  <Link
                    href={loc.slug}
                    className="hover:text-[#35B5D8] transition-colors block text-xs"
                  >
                    {loc.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 4: Contact & Quick Booking */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-white text-xs uppercase tracking-wider border-l-2 border-[#35B5D8] pl-2">
              Contact &amp; Bookings
            </h4>
            
            <div className="space-y-2.5 text-neutral-400 text-xs">
              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-[#35B5D8] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] text-neutral-500 uppercase block">Direct Phone</span>
                  <a href="tel:8652880057" className="text-white font-bold hover:text-[#35B5D8]">
                    8652880057
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-[#35B5D8] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] text-neutral-500 uppercase block">Official Lead Email</span>
                  <a href="mailto:info@ontimedriverservice.com" className="text-white hover:text-[#35B5D8] break-all">
                    info@ontimedriverservice.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#35B5D8] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] text-neutral-500 uppercase block">Operations Hub</span>
                  <span>Bandra Kurla Complex (BKC) &amp; Andheri East, Mumbai, MH</span>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-[#35B5D8] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] text-neutral-500 uppercase block">Working Hours</span>
                  <span>24 Hours / 7 Days a Week</span>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenBooking}
                className="btn-primary w-full h-11 text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm"
              >
                <Calendar className="w-4 h-4" />
                <span>Book a Verified Driver</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-6 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-neutral-500 text-[11px]">
          <div>
            © {new Date().getFullYear()} On Time Driver Service. All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-neutral-400">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <Link href="/services" className="hover:text-white transition-colors">Services</Link>
            <Link href="/service-areas" className="hover:text-white transition-colors">Service Areas</Link>
            <Link href="/about" className="hover:text-white transition-colors">About Us</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
