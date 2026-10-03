import React, { useState, useEffect, useRef } from 'react';
import {
  Phone,
  Calendar,
  Menu,
  X,
  ShieldCheck,
  ChevronDown,
  ChevronRight,
  Car,
  Clock,
  MessageSquare,
  Sparkles,
} from 'lucide-react';
import { Link, useRouter } from '../router';

interface NavbarProps {
  onOpenBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking }) => {
  const { currentPath } = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);

  const servicesTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
  }, [currentPath]);

  const handleServicesMouseEnter = () => {
    if (servicesTimeoutRef.current) clearTimeout(servicesTimeoutRef.current);
    setServicesDropdownOpen(true);
  };

  const handleServicesMouseLeave = () => {
    servicesTimeoutRef.current = setTimeout(() => {
      setServicesDropdownOpen(false);
    }, 200);
  };

  const handleWhatsAppClick = () => {
    const text = encodeURIComponent(
      'Hello On Time Driver Service, I would like to book a verified chauffeur in Mumbai.'
    );
    window.open(`https://wa.me/918652880057?text=${text}`, '_blank');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300">
      {/* 1. Top Executive Announcement Strip (Desktop only) */}
      <div className="hidden lg:block bg-[#050505] text-[#D1D5DB] text-[11px] py-1.5 px-6 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 font-bold text-[#F2F028]">
              <Sparkles className="w-3.5 h-3.5 text-[#35B5D8]" />
              MUMBAI EXECUTIVE NETWORK:
            </span>
            <span className="text-neutral-400">
              Verified Chauffeurs for Personal, Family &amp; Corporate Fleets
            </span>
          </div>

          <div className="flex items-center gap-6 text-neutral-300">
            <span className="flex items-center gap-1.5 text-xs">
              <ShieldCheck className="w-3.5 h-3.5 text-[#35B5D8]" />
              Police Clearance Certified
            </span>
            <span className="text-neutral-600">|</span>
            <a
              href="mailto:info@ontimedriverservice.com"
              className="hover:text-[#35B5D8] transition-colors"
            >
              info@ontimedriverservice.com
            </a>
            <span className="text-neutral-600">|</span>
            <a
              href="tel:8652880057"
              className="font-bold text-white hover:text-[#35B5D8] transition-colors flex items-center gap-1.5"
            >
              <Phone className="w-3 h-3 text-[#35B5D8]" />
              +91 8652880057
            </a>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <nav
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0A0A0A]/95 backdrop-blur-md shadow-2xl border-b border-white/10'
            : 'bg-[#0A0A0A]/85 backdrop-blur-sm border-b border-white/5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-16 sm:h-20 flex items-center justify-between gap-4">
            
            {/* Logo Left */}
            <Link
              href="/"
              className="flex items-center gap-3 group focus:outline-none"
              aria-label="On Time Driver Service Home"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#35B5D8] to-[#1e85a3] flex items-center justify-center text-white shadow-lg shadow-[#35B5D8]/20 group-hover:scale-105 transition-transform border border-white/15">
                <Clock className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col text-left">
                <div className="flex items-center gap-1 font-heading font-extrabold text-base sm:text-lg tracking-tight text-white">
                  <span>ON TIME</span>
                  <span className="text-[#35B5D8]">DRIVER</span>
                </div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#F2F028]">
                  Premium Chauffeur Network
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-1 xl:gap-2">
              <Link
                href="/"
                className={`px-3.5 py-2 text-sm font-semibold rounded-lg transition-colors ${
                  currentPath === '/'
                    ? 'text-[#35B5D8] bg-[#35B5D8]/10'
                    : 'text-[#D1D5DB] hover:text-white hover:bg-white/5'
                }`}
              >
                Home
              </Link>

              {/* Services Dropdown */}
              <div
                className="relative"
                onMouseEnter={handleServicesMouseEnter}
                onMouseLeave={handleServicesMouseLeave}
              >
                <Link
                  href="/services"
                  className={`px-3.5 py-2 text-sm font-semibold rounded-lg flex items-center gap-1.5 transition-colors ${
                    currentPath.startsWith('/services') || currentPath.endsWith('-service')
                      ? 'text-[#35B5D8] bg-[#35B5D8]/10'
                      : 'text-[#D1D5DB] hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span>Services</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      servicesDropdownOpen ? 'rotate-180 text-[#35B5D8]' : ''
                    }`}
                  />
                </Link>

                {servicesDropdownOpen && (
                  <div className="absolute top-full left-0 w-[500px] bg-[#121212] rounded-2xl shadow-2xl border border-white/15 p-4 animate-fade-in mt-1 z-50">
                    <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#35B5D8]">
                        Verified Chauffeur Services
                      </span>
                      <Link
                        href="/services"
                        className="text-xs font-semibold text-[#F2F028] hover:underline flex items-center gap-1"
                      >
                        All Services <ChevronRight className="w-3 h-3" />
                      </Link>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <Link
                        href="/hourly-driver-service"
                        className="p-2.5 rounded-xl hover:bg-white/5 transition-colors flex items-center gap-2.5 font-medium text-[#D1D5DB] hover:text-[#35B5D8]"
                      >
                        <Car className="w-4 h-4 text-[#35B5D8]" />
                        <span>Hourly Driver</span>
                      </Link>
                      <Link
                        href="/permanent-driver-service"
                        className="p-2.5 rounded-xl hover:bg-white/5 transition-colors flex items-center gap-2.5 font-medium text-[#D1D5DB] hover:text-[#35B5D8]"
                      >
                        <Car className="w-4 h-4 text-[#35B5D8]" />
                        <span>Permanent Driver</span>
                      </Link>
                      <Link
                        href="/corporate-driver-service"
                        className="p-2.5 rounded-xl hover:bg-white/5 transition-colors flex items-center gap-2.5 font-medium text-[#D1D5DB] hover:text-[#35B5D8]"
                      >
                        <Car className="w-4 h-4 text-[#35B5D8]" />
                        <span>Corporate Chauffeur</span>
                      </Link>
                      <Link
                        href="/airport-driver-service"
                        className="p-2.5 rounded-xl hover:bg-white/5 transition-colors flex items-center gap-2.5 font-medium text-[#D1D5DB] hover:text-[#35B5D8]"
                      >
                        <Car className="w-4 h-4 text-[#35B5D8]" />
                        <span>Airport Transfer</span>
                      </Link>
                      <Link
                        href="/outstation-driver-service"
                        className="p-2.5 rounded-xl hover:bg-white/5 transition-colors flex items-center gap-2.5 font-medium text-[#D1D5DB] hover:text-[#35B5D8]"
                      >
                        <Car className="w-4 h-4 text-[#35B5D8]" />
                        <span>Outstation Chauffeur</span>
                      </Link>
                      <Link
                        href="/personal-driver-service"
                        className="p-2.5 rounded-xl hover:bg-white/5 transition-colors flex items-center gap-2.5 font-medium text-[#D1D5DB] hover:text-[#35B5D8]"
                      >
                        <Car className="w-4 h-4 text-[#35B5D8]" />
                        <span>Personal Driver</span>
                      </Link>
                      <Link
                        href="/chauffeur-service"
                        className="p-2.5 rounded-xl hover:bg-white/5 transition-colors flex items-center gap-2.5 font-medium text-[#D1D5DB] hover:text-[#35B5D8]"
                      >
                        <Car className="w-4 h-4 text-[#35B5D8]" />
                        <span>Luxury Chauffeur</span>
                      </Link>
                      <Link
                        href="/part-time-driver-service"
                        className="p-2.5 rounded-xl hover:bg-white/5 transition-colors flex items-center gap-2.5 font-medium text-[#D1D5DB] hover:text-[#35B5D8]"
                      >
                        <Car className="w-4 h-4 text-[#35B5D8]" />
                        <span>Part-Time Driver</span>
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <Link
                href="/service-areas"
                className={`px-3.5 py-2 text-sm font-semibold rounded-lg transition-colors ${
                  currentPath === '/service-areas'
                    ? 'text-[#35B5D8] bg-[#35B5D8]/10'
                    : 'text-[#D1D5DB] hover:text-white hover:bg-white/5'
                }`}
              >
                Service Areas
              </Link>

              <Link
                href="/about"
                className={`px-3.5 py-2 text-sm font-semibold rounded-lg transition-colors ${
                  currentPath === '/about'
                    ? 'text-[#35B5D8] bg-[#35B5D8]/10'
                    : 'text-[#D1D5DB] hover:text-white hover:bg-white/5'
                }`}
              >
                About Us
              </Link>

              <Link
                href="/contact"
                className={`px-3.5 py-2 text-sm font-semibold rounded-lg transition-colors ${
                  currentPath === '/contact'
                    ? 'text-[#35B5D8] bg-[#35B5D8]/10'
                    : 'text-[#D1D5DB] hover:text-white hover:bg-white/5'
                }`}
              >
                Contact
              </Link>
            </div>

            {/* Desktop Action Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href="tel:8652880057"
                className="h-11 px-4 rounded-xl bg-[#161616] hover:bg-[#202020] text-white border border-white/15 font-bold text-xs flex items-center gap-2 transition-all hover:border-[#35B5D8]"
                title="Call 24/7 Concierge"
              >
                <Phone className="w-3.5 h-3.5 text-[#35B5D8]" />
                <span>8652880057</span>
              </a>

              <button
                onClick={onOpenBooking}
                className="btn-primary h-11 px-6 text-sm font-bold shadow-md shadow-[#F2F028]/15"
              >
                <Calendar className="w-4 h-4 text-[#0A0A0A] mr-2" />
                <span>Book Driver</span>
              </button>
            </div>

            {/* Mobile Header Right: Call & Hamburger Menu */}
            <div className="flex lg:hidden items-center gap-2">
              <a
                href="tel:8652880057"
                className="h-10 px-3 rounded-lg bg-[#161616] border border-white/15 text-white flex items-center gap-1.5 text-xs font-bold"
                aria-label="Call concierge"
              >
                <Phone className="w-3.5 h-3.5 text-[#35B5D8]" />
                <span className="hidden sm:inline">Call</span>
              </a>

              <button
                onClick={onOpenBooking}
                className="h-10 px-3.5 rounded-lg bg-[#F2F028] text-[#0A0A0A] text-xs font-bold flex items-center gap-1 shadow-sm"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book</span>
              </button>

              <button
                onClick={() => setMobileMenuOpen(true)}
                className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#161616] border border-white/15 text-white transition-colors"
                aria-label="Open Mobile Menu"
              >
                <Menu className="w-5 h-5 text-white" />
              </button>
            </div>

          </div>
        </div>
      </nav>

      {/* Slide-Out Drawer Menu on Mobile (Clean slide-in from right) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          <div className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-[#121212] border-l border-white/15 shadow-2xl flex flex-col justify-between overflow-y-auto z-10 p-6 animate-fade-in text-left">
            <div>
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-5 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#35B5D8] flex items-center justify-center text-white">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-heading font-bold text-sm text-white">ON TIME DRIVER</p>
                    <p className="text-[10px] text-[#F2F028]">Executive Chauffeur Network</p>
                  </div>
                </div>

                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center text-white hover:bg-white/20"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Links */}
              <div className="py-6 flex flex-col gap-2">
                <Link
                  href="/"
                  className="px-4 py-3 rounded-xl font-bold text-white hover:bg-white/5 transition-colors flex items-center justify-between"
                >
                  <span>Home</span>
                  <ChevronRight className="w-4 h-4 text-neutral-500" />
                </Link>

                <Link
                  href="/services"
                  className="px-4 py-3 rounded-xl font-bold text-white hover:bg-white/5 transition-colors flex items-center justify-between"
                >
                  <span>All Chauffeur Services</span>
                  <ChevronRight className="w-4 h-4 text-neutral-500" />
                </Link>

                <div className="pl-4 pr-2 py-1 grid grid-cols-1 gap-1 text-sm text-[#D1D5DB]">
                  <Link href="/hourly-driver-service" className="py-1.5 px-3 rounded-lg hover:bg-white/5">
                    • Hourly Driver Service
                  </Link>
                  <Link href="/permanent-driver-service" className="py-1.5 px-3 rounded-lg hover:bg-white/5">
                    • Permanent / Monthly Chauffeur
                  </Link>
                  <Link href="/corporate-driver-service" className="py-1.5 px-3 rounded-lg hover:bg-white/5">
                    • Corporate Executive Driver
                  </Link>
                  <Link href="/airport-driver-service" className="py-1.5 px-3 rounded-lg hover:bg-white/5">
                    • Airport Pickup &amp; Drop
                  </Link>
                  <Link href="/outstation-driver-service" className="py-1.5 px-3 rounded-lg hover:bg-white/5">
                    • Outstation Travel Chauffeur
                  </Link>
                </div>

                <Link
                  href="/service-areas"
                  className="px-4 py-3 rounded-xl font-bold text-white hover:bg-white/5 transition-colors flex items-center justify-between"
                >
                  <span>Service Areas (MMR)</span>
                  <ChevronRight className="w-4 h-4 text-neutral-500" />
                </Link>

                <Link
                  href="/about"
                  className="px-4 py-3 rounded-xl font-bold text-white hover:bg-white/5 transition-colors flex items-center justify-between"
                >
                  <span>About Us</span>
                  <ChevronRight className="w-4 h-4 text-neutral-500" />
                </Link>

                <Link
                  href="/contact"
                  className="px-4 py-3 rounded-xl font-bold text-white hover:bg-white/5 transition-colors flex items-center justify-between"
                >
                  <span>Contact &amp; Support</span>
                  <ChevronRight className="w-4 h-4 text-neutral-500" />
                </Link>
              </div>
            </div>

            {/* Drawer Bottom Actions */}
            <div className="pt-6 border-t border-white/10 flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="btn-primary w-full h-[52px] text-base font-bold flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4 text-[#0A0A0A]" />
                <span>Book Driver Now</span>
              </button>

              <a
                href="tel:8652880057"
                className="btn-secondary w-full h-[52px] text-base font-bold flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-[#35B5D8]" />
                <span>Call 24/7: 8652880057</span>
              </a>

              <button
                onClick={handleWhatsAppClick}
                className="w-full h-[48px] rounded-xl bg-[#25D366]/20 border border-[#25D366]/40 text-[#25D366] font-bold text-sm flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
