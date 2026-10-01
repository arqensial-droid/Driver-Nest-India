import React, { useState, useEffect, useRef } from 'react';
import { Phone, Calendar, Menu, X, ShieldCheck, ChevronDown, ChevronRight, MapPin, Car, ArrowRight } from 'lucide-react';
import { Link, useRouter } from '../router';
import { servicesData } from '../data/servicesData';
import { locationsData } from '../data/locationsData';

interface NavbarProps {
  onOpenBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking }) => {
  const { currentPath } = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [locationsDropdownOpen, setLocationsDropdownOpen] = useState(false);

  // Mobile submenu accordions
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileLocationsOpen, setMobileLocationsOpen] = useState(false);

  const servicesTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const locationsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Close dropdowns on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
    setLocationsDropdownOpen(false);
  }, [currentPath]);

  const handleServicesMouseEnter = () => {
    if (servicesTimeoutRef.current) clearTimeout(servicesTimeoutRef.current);
    setServicesDropdownOpen(true);
    setLocationsDropdownOpen(false);
  };

  const handleServicesMouseLeave = () => {
    servicesTimeoutRef.current = setTimeout(() => {
      setServicesDropdownOpen(false);
    }, 150);
  };

  const handleLocationsMouseEnter = () => {
    if (locationsTimeoutRef.current) clearTimeout(locationsTimeoutRef.current);
    setLocationsDropdownOpen(true);
    setServicesDropdownOpen(false);
  };

  const handleLocationsMouseLeave = () => {
    locationsTimeoutRef.current = setTimeout(() => {
      setLocationsDropdownOpen(false);
    }, 150);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        isScrolled
          ? 'bg-black/95 backdrop-blur-md border-b border-[#D4AF37]/25 shadow-xl py-1 sm:py-2'
          : 'bg-gradient-to-b from-black/95 via-black/75 to-transparent py-1.5 sm:py-2'
      }`}
    >
      {/* Container with 16px padding on mobile, giving hamburger 16px right margin */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-9 sm:h-11">
          {/* Brand Wordmark & Crest - Compact Mobile Width, Fully Visible */}
          <Link
            href="/"
            className="flex items-center gap-2 group transition-transform focus:outline-none shrink-0"
            aria-label="Driver Nest India Home"
          >
            <div className="w-7 h-7 sm:w-8.5 sm:h-8.5 rounded-lg bg-gradient-to-br from-[#E5C07B] via-[#D4AF37] to-[#99781D] flex items-center justify-center shadow-md shadow-[#D4AF37]/20 group-hover:scale-105 transition-transform duration-300 shrink-0">
              <ShieldCheck className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-black" />
            </div>
            <div className="flex flex-col justify-center min-w-0">
              <span className="font-display text-xs sm:text-base lg:text-xl font-bold tracking-wide text-white group-hover:text-[#E5C07B] transition-colors whitespace-nowrap leading-none">
                DRIVER NEST <span className="text-[#D4AF37]">INDIA</span>
              </span>
              <span className="text-[8px] sm:text-[9px] uppercase tracking-widest text-[#E5C07B] font-mono leading-none hidden sm:block mt-0.5">
                Professional Drivers · Mumbai
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Menu */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8" aria-label="Main Navigation">
            <Link
              href="/"
              className={`text-sm font-medium transition-colors py-1 relative hover:text-[#E5C07B] ${
                currentPath === '/' ? 'text-[#E5C07B]' : 'text-neutral-300'
              }`}
            >
              Home
            </Link>

            <Link
              href="/about"
              className={`text-sm font-medium transition-colors py-1 relative hover:text-[#E5C07B] ${
                currentPath === '/about' ? 'text-[#E5C07B]' : 'text-neutral-300'
              }`}
            >
              About
            </Link>

            {/* Services Dropdown */}
            <div
              className="relative py-2"
              onMouseEnter={handleServicesMouseEnter}
              onMouseLeave={handleServicesMouseLeave}
            >
              <button
                type="button"
                onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                className={`text-sm font-medium transition-colors flex items-center gap-1.5 cursor-pointer hover:text-[#E5C07B] ${
                  currentPath.startsWith('/services') ? 'text-[#E5C07B]' : 'text-neutral-300'
                }`}
              >
                <span>Services</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${servicesDropdownOpen ? 'rotate-180 text-[#D4AF37]' : ''}`} />
              </button>

              {servicesDropdownOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-[680px] p-5 rounded-2xl bg-[#0D0D0D] border border-[#D4AF37]/35 shadow-2xl backdrop-blur-2xl z-50 animate-fade-in grid grid-cols-2 gap-x-6 gap-y-2">
                  <div className="col-span-2 pb-2 mb-1 border-b border-neutral-800 flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider font-mono">
                      All Driver Services (12 Categories)
                    </span>
                    <Link
                      href="/services"
                      className="text-xs text-[#E5C07B] hover:underline font-medium flex items-center gap-1"
                    >
                      <span>View Directory</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>

                  {servicesData.map((svc) => (
                    <Link
                      key={svc.id}
                      href={`/services/${svc.slug}`}
                      className="p-2.5 rounded-xl hover:bg-neutral-900 border border-transparent hover:border-neutral-800 transition-all flex items-start gap-2.5 group"
                    >
                      <div className="w-7 h-7 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                        <Car className="w-3.5 h-3.5" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-xs font-bold text-white group-hover:text-[#E5C07B] transition-colors truncate">
                          {svc.title}
                        </h4>
                        <p className="text-[11px] text-neutral-400 truncate font-light">
                          {svc.shortHeadline}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Service Areas Dropdown */}
            <div
              className="relative py-2"
              onMouseEnter={handleLocationsMouseEnter}
              onMouseLeave={handleLocationsMouseLeave}
            >
              <button
                type="button"
                onClick={() => setLocationsDropdownOpen(!locationsDropdownOpen)}
                className={`text-sm font-medium transition-colors flex items-center gap-1.5 cursor-pointer hover:text-[#E5C07B] ${
                  currentPath.startsWith('/locations') || currentPath === '/service-areas'
                    ? 'text-[#E5C07B]'
                    : 'text-neutral-300'
                }`}
              >
                <span>Service Areas</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${locationsDropdownOpen ? 'rotate-180 text-[#D4AF37]' : ''}`} />
              </button>

              {locationsDropdownOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-[580px] p-5 rounded-2xl bg-[#0D0D0D] border border-[#D4AF37]/35 shadow-2xl backdrop-blur-2xl z-50 animate-fade-in grid grid-cols-2 gap-x-4 gap-y-1.5">
                  <div className="col-span-2 pb-2 mb-1 border-b border-neutral-800 flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider font-mono">
                      Mumbai &amp; MMR Staging Zones (11 Regions)
                    </span>
                    <Link
                      href="/service-areas"
                      className="text-xs text-[#E5C07B] hover:underline font-medium flex items-center gap-1"
                    >
                      <span>All Areas</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>

                  {locationsData.map((loc) => (
                    <Link
                      key={loc.id}
                      href={`/locations/${loc.id}`}
                      className="p-2 rounded-xl hover:bg-neutral-900 border border-transparent hover:border-neutral-800 transition-all flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-2 truncate">
                        <MapPin className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                        <span className="text-xs font-semibold text-white group-hover:text-[#E5C07B] transition-colors truncate">
                          {loc.name}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-neutral-500 shrink-0 ml-2">
                        {loc.avgDispatchTime}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/faqs"
              className={`text-sm font-medium transition-colors py-1 hover:text-[#E5C07B] ${
                currentPath === '/faqs' ? 'text-[#E5C07B]' : 'text-neutral-300'
              }`}
            >
              FAQs
            </Link>

            <Link
              href="/contact"
              className={`text-sm font-medium transition-colors py-1 hover:text-[#E5C07B] ${
                currentPath === '/contact' ? 'text-[#E5C07B]' : 'text-neutral-300'
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Action CTAs: Properly spaced with min 12px gap between Logo, Button, Hamburger */}
          <div className="flex items-center gap-3">
            <a
              href="tel:+919930012345"
              className="hidden md:inline-flex items-center gap-1.5 h-8.5 sm:h-9 px-3 text-xs font-semibold text-[#E5C07B] bg-black/60 border border-[#D4AF37]/45 rounded-xl hover:bg-[#D4AF37]/10 transition-all whitespace-nowrap backdrop-blur-md"
              aria-label="Call Concierge"
            >
              <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="font-mono tracking-wide">+91 99300 12345</span>
            </a>

            {/* Mobile-optimized Book Driver CTA: Significantly reduced width to prevent overcrowding */}
            <button
              onClick={onOpenBooking}
              className="inline-flex items-center justify-center gap-1 sm:gap-1.5 h-8 sm:h-9 px-2.5 sm:px-3 text-[11px] sm:text-xs font-bold text-black bg-gradient-to-r from-[#F3D085] via-[#D4AF37] to-[#B89020] rounded-lg sm:rounded-xl hover:brightness-110 active:scale-[0.98] transition-all shadow-sm shadow-[#D4AF37]/25 whitespace-nowrap cursor-pointer border border-white/20"
            >
              <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-black shrink-0" />
              <span className="hidden min-[380px]:inline">Book Driver</span>
              <span className="min-[380px]:hidden">Book</span>
            </button>

            {/* Mobile Hamburger Button with 16px right margin from container */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 text-neutral-300 hover:text-[#E5C07B] focus:outline-none rounded-lg bg-neutral-900/80 border border-neutral-800 transition-colors flex items-center justify-center"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-4.5 h-4.5 text-[#E5C07B]" /> : <Menu className="w-4.5 h-4.5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Smooth Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[44px] sm:top-[50px] bg-black/95 backdrop-blur-2xl z-50 overflow-y-auto animate-fade-in flex flex-col justify-between border-t border-[#D4AF37]/25">
          <div className="px-4 py-3 space-y-1">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between py-2 px-3 text-sm font-medium text-neutral-200 hover:text-white rounded-lg hover:bg-neutral-900 border-b border-neutral-900/60"
            >
              <span>Home</span>
              <ChevronRight className="w-4 h-4 text-neutral-600" />
            </Link>

            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between py-2 px-3 text-sm font-medium text-neutral-200 hover:text-white rounded-lg hover:bg-neutral-900 border-b border-neutral-900/60"
            >
              <span>About Us</span>
              <ChevronRight className="w-4 h-4 text-neutral-600" />
            </Link>

            {/* Mobile Services Accordion */}
            <div className="border-b border-neutral-900/60">
              <button
                type="button"
                onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                className="w-full flex items-center justify-between py-2 px-3 text-sm font-medium text-neutral-200 hover:text-white rounded-lg hover:bg-neutral-900 cursor-pointer"
              >
                <span>Services (12)</span>
                <ChevronDown className={`w-4 h-4 text-[#D4AF37] transition-transform ${mobileServicesOpen ? 'rotate-180' : ''}`} />
              </button>

              {mobileServicesOpen && (
                <div className="pl-3 pr-2 py-1.5 space-y-1 bg-neutral-950/80 rounded-lg mb-1.5">
                  <Link
                    href="/services"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-1 px-2 text-xs font-semibold text-[#E5C07B] uppercase tracking-wider"
                  >
                    View All Services Directory →
                  </Link>
                  {servicesData.map((svc) => (
                    <Link
                      key={svc.id}
                      href={`/services/${svc.slug}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block py-1 px-2 text-xs text-neutral-300 hover:text-white rounded hover:bg-neutral-900"
                    >
                      {svc.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Service Areas Accordion */}
            <div className="border-b border-neutral-900/60">
              <button
                type="button"
                onClick={() => setMobileLocationsOpen(!mobileLocationsOpen)}
                className="w-full flex items-center justify-between py-2 px-3 text-sm font-medium text-neutral-200 hover:text-white rounded-lg hover:bg-neutral-900 cursor-pointer"
              >
                <span>Service Areas (11)</span>
                <ChevronDown className={`w-4 h-4 text-[#D4AF37] transition-transform ${mobileLocationsOpen ? 'rotate-180' : ''}`} />
              </button>

              {mobileLocationsOpen && (
                <div className="pl-3 pr-2 py-1.5 space-y-1 bg-neutral-950/80 rounded-lg mb-1.5">
                  <Link
                    href="/service-areas"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-1 px-2 text-xs font-semibold text-[#E5C07B] uppercase tracking-wider"
                  >
                    View All Service Areas →
                  </Link>
                  {locationsData.map((loc) => (
                    <Link
                      key={loc.id}
                      href={`/locations/${loc.id}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block py-1 px-2 text-xs text-neutral-300 hover:text-white rounded hover:bg-neutral-900"
                    >
                      {loc.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/faqs"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between py-2 px-3 text-sm font-medium text-neutral-200 hover:text-white rounded-lg hover:bg-neutral-900 border-b border-neutral-900/60"
            >
              <span>FAQs</span>
              <ChevronRight className="w-4 h-4 text-neutral-600" />
            </Link>

            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between py-2 px-3 text-sm font-medium text-neutral-200 hover:text-white rounded-lg hover:bg-neutral-900 border-b border-neutral-900/60"
            >
              <span>Contact Us</span>
              <ChevronRight className="w-4 h-4 text-neutral-600" />
            </Link>
          </div>

          <div className="p-4 bg-neutral-950/95 border-t border-neutral-900 space-y-2 pb-[max(1rem,env(safe-area-inset-bottom))]">
            <a
              href="tel:+919930012345"
              className="w-full flex items-center justify-center gap-2 h-10 text-xs font-semibold text-[#E5C07B] bg-black/60 border border-[#D4AF37]/50 rounded-xl hover:bg-[#D4AF37]/10 transition-colors font-mono"
            >
              <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Call Concierge: +91 99300 12345</span>
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full flex items-center justify-center gap-2 h-10 text-xs font-bold text-black bg-gradient-to-r from-[#F3D085] via-[#D4AF37] to-[#B89020] rounded-xl hover:brightness-110 shadow-md shadow-[#D4AF37]/25"
            >
              <Calendar className="w-3.5 h-3.5 text-black" />
              <span>Book a Driver Now</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
