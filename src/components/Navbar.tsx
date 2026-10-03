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
    const text = encodeURIComponent('Hi, I need a professional driver service.');
    window.open(`https://wa.me/918652880057?text=${text}`, '_blank');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300">
      {/* 1. Top Executive Announcement Strip (Desktop only) */}
      <div className="hidden lg:block bg-[#050505] text-[#CFCFCF] text-[11px] py-1.5 px-6 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 font-bold text-[#F3ED1A]">
              <Sparkles className="w-3.5 h-3.5 text-[#35B6DE]" />
              MUMBAI EXECUTIVE CHAUFFEUR NETWORK:
            </span>
            <span className="text-[#CFCFCF]">
              Verified Drivers for Personal, Corporate &amp; Outstation Fleets
            </span>
          </div>

          <div className="flex items-center gap-6 text-[#CFCFCF]">
            <span className="flex items-center gap-1.5 text-xs">
              <ShieldCheck className="w-3.5 h-3.5 text-[#35B6DE]" />
              100% Police Verified
            </span>
            <span className="text-white/20">|</span>
            <a
              href="mailto:info@ontimedriverservice.com"
              className="hover:text-[#35B6DE] transition-colors"
            >
              info@ontimedriverservice.com
            </a>
            <span className="text-white/20">|</span>
            <a
              href="tel:8652880057"
              className="font-bold text-white hover:text-[#35B6DE] transition-colors flex items-center gap-1.5"
            >
              <Phone className="w-3 h-3 text-[#35B6DE]" />
              8652880057
            </a>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar - Sticky Glassmorphism Header (Max 72px on mobile) */}
      <nav
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-[#050505]/95 backdrop-blur-md shadow-2xl border-b border-white/10'
            : 'bg-[#050505]/90 backdrop-blur-md border-b border-white/10'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          {/* Header Row: exactly maximum 72px on mobile, single row only */}
          <div className="h-16 sm:h-[70px] max-h-[72px] flex items-center justify-between gap-2 sm:gap-4">
            
            {/* Logo Left: ON TIME DRIVER SERVICE (Never wraps, never breaks into multiple lines) */}
            <Link
              href="/"
              className="flex items-center gap-2 sm:gap-2.5 shrink-0 focus:outline-none min-w-0"
              aria-label="On Time Driver Service Home"
            >
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-gradient-to-br from-[#35B6DE] to-[#1e85a3] flex items-center justify-center text-[#050505] shadow-md shadow-[#35B6DE]/20 shrink-0 border border-white/15">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <span className="font-heading font-extrabold text-xs sm:text-base lg:text-lg tracking-tight text-white whitespace-nowrap overflow-hidden">
                ON TIME DRIVER SERVICE
              </span>
            </Link>

            {/* Desktop Navigation Links (hidden on mobile/tablet < 1024px) */}
            <div className="hidden lg:flex items-center gap-1 xl:gap-2">
              <Link
                href="/"
                className={`px-3 py-2 text-sm font-semibold rounded-lg transition-colors ${
                  currentPath === '/'
                    ? 'text-[#35B6DE] bg-[#35B6DE]/10'
                    : 'text-[#CFCFCF] hover:text-white hover:bg-white/5'
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
                  className={`px-3 py-2 text-sm font-semibold rounded-lg flex items-center gap-1.5 transition-colors ${
                    currentPath.startsWith('/services') || currentPath.endsWith('-service')
                      ? 'text-[#35B6DE] bg-[#35B6DE]/10'
                      : 'text-[#CFCFCF] hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span>Services</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      servicesDropdownOpen ? 'rotate-180 text-[#35B6DE]' : ''
                    }`}
                  />
                </Link>

                {servicesDropdownOpen && (
                  <div className="absolute top-full left-0 w-[500px] bg-[#0B0B0B] rounded-2xl shadow-2xl border border-white/15 p-4 animate-fade-in mt-1 z-50">
                    <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#35B6DE]">
                        Chauffeur Categories
                      </span>
                      <Link
                        href="/services"
                        className="text-xs font-semibold text-[#F3ED1A] hover:underline flex items-center gap-1"
                      >
                        All Services <ChevronRight className="w-3 h-3" />
                      </Link>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <Link
                        href="/personal-driver-service"
                        className="p-2.5 rounded-xl hover:bg-white/5 transition-colors flex items-center gap-2.5 font-medium text-[#CFCFCF] hover:text-[#35B6DE]"
                      >
                        <Car className="w-4 h-4 text-[#35B6DE]" />
                        <span>Personal Driver</span>
                      </Link>
                      <Link
                        href="/corporate-driver-service"
                        className="p-2.5 rounded-xl hover:bg-white/5 transition-colors flex items-center gap-2.5 font-medium text-[#CFCFCF] hover:text-[#35B6DE]"
                      >
                        <Car className="w-4 h-4 text-[#35B6DE]" />
                        <span>Corporate Driver</span>
                      </Link>
                      <Link
                        href="/permanent-driver-service"
                        className="p-2.5 rounded-xl hover:bg-white/5 transition-colors flex items-center gap-2.5 font-medium text-[#CFCFCF] hover:text-[#35B6DE]"
                      >
                        <Car className="w-4 h-4 text-[#35B6DE]" />
                        <span>Permanent Driver</span>
                      </Link>
                      <Link
                        href="/outstation-driver-service"
                        className="p-2.5 rounded-xl hover:bg-white/5 transition-colors flex items-center gap-2.5 font-medium text-[#CFCFCF] hover:text-[#35B6DE]"
                      >
                        <Car className="w-4 h-4 text-[#35B6DE]" />
                        <span>Outstation Driver</span>
                      </Link>
                      <Link
                        href="/airport-driver-service"
                        className="p-2.5 rounded-xl hover:bg-white/5 transition-colors flex items-center gap-2.5 font-medium text-[#CFCFCF] hover:text-[#35B6DE]"
                      >
                        <Car className="w-4 h-4 text-[#35B6DE]" />
                        <span>Airport Driver</span>
                      </Link>
                      <Link
                        href="/hourly-driver-service"
                        className="p-2.5 rounded-xl hover:bg-white/5 transition-colors flex items-center gap-2.5 font-medium text-[#CFCFCF] hover:text-[#35B6DE]"
                      >
                        <Car className="w-4 h-4 text-[#35B6DE]" />
                        <span>Hourly Driver</span>
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <Link
                href="/service-areas"
                className={`px-3 py-2 text-sm font-semibold rounded-lg transition-colors ${
                  currentPath === '/service-areas'
                    ? 'text-[#35B6DE] bg-[#35B6DE]/10'
                    : 'text-[#CFCFCF] hover:text-white hover:bg-white/5'
                }`}
              >
                Service Areas
              </Link>

              <Link
                href="/about"
                className={`px-3 py-2 text-sm font-semibold rounded-lg transition-colors ${
                  currentPath === '/about'
                    ? 'text-[#35B6DE] bg-[#35B6DE]/10'
                    : 'text-[#CFCFCF] hover:text-white hover:bg-white/5'
                }`}
              >
                About Us
              </Link>

              <Link
                href="/contact"
                className={`px-3 py-2 text-sm font-semibold rounded-lg transition-colors ${
                  currentPath === '/contact'
                    ? 'text-[#35B6DE] bg-[#35B6DE]/10'
                    : 'text-[#CFCFCF] hover:text-white hover:bg-white/5'
                }`}
              >
                Contact
              </Link>
            </div>

            {/* Desktop Action Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href="tel:8652880057"
                className="h-11 px-4 rounded-xl bg-[#0B0B0B] hover:bg-[#161616] text-white border border-white/15 font-bold text-xs flex items-center gap-2 transition-all hover:border-[#35B6DE]"
                title="Call 24/7 Concierge"
              >
                <Phone className="w-3.5 h-3.5 text-[#35B6DE]" />
                <span>8652880057</span>
              </a>

              <button
                onClick={onOpenBooking}
                className="btn-primary h-11 px-6 text-sm font-bold shadow-md shadow-[#F3ED1A]/15"
              >
                <Calendar className="w-4 h-4 text-[#050505] mr-2" />
                <span>Book Driver</span>
              </button>
            </div>

            {/* Mobile Header Single Row Layout:
                Logo left | Call button center | Book button right | Menu icon far right
                Max height 72px, single row, no wrapping. */}
            <div className="flex lg:hidden items-center gap-1.5 sm:gap-2 shrink-0">
              {/* Call button center */}
              <a
                href="tel:8652880057"
                className="h-9 px-2.5 sm:px-3 rounded-lg bg-[#0B0B0B] border border-white/15 text-white flex items-center justify-center gap-1 text-xs font-bold hover:border-[#35B6DE] transition-colors shrink-0"
                aria-label="Call 8652880057"
              >
                <Phone className="w-3.5 h-3.5 text-[#35B6DE]" />
                <span className="text-[11px] sm:text-xs">Call</span>
              </a>

              {/* Book button right */}
              <button
                onClick={onOpenBooking}
                className="h-9 px-2.5 sm:px-3.5 rounded-lg bg-[#F3ED1A] text-[#050505] text-[11px] sm:text-xs font-bold flex items-center justify-center gap-1 shadow-sm hover:bg-[#e5df15] transition-colors shrink-0"
                aria-label="Book Driver"
              >
                <Calendar className="w-3.5 h-3.5 text-[#050505]" />
                <span>Book</span>
              </button>

              {/* Menu icon far right */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="w-9 h-9 flex items-center justify-center rounded-lg bg-[#0B0B0B] border border-white/15 text-white hover:border-white/30 transition-colors shrink-0"
                aria-label="Open Navigation Menu"
              >
                <Menu className="w-4 h-4 text-white" />
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

          <div className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-[#0B0B0B] border-l border-white/15 shadow-2xl flex flex-col justify-between overflow-y-auto z-10 p-5 sm:p-6 animate-fade-in text-left">
            <div>
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#35B6DE] flex items-center justify-center text-[#050505]">
                    <Clock className="w-4 h-4 text-[#050505]" />
                  </div>
                  <div>
                    <p className="font-heading font-bold text-sm text-white">ON TIME DRIVER SERVICE</p>
                    <p className="text-[10px] text-[#F3ED1A]">Executive Chauffeur Network</p>
                  </div>
                </div>

                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-lg text-[#CFCFCF] hover:text-white hover:bg-white/10 transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Main Navigation Links */}
              <div className="py-4 space-y-1">
                <Link
                  href="/"
                  className={`block px-3 py-2.5 rounded-xl font-bold text-sm transition-colors ${
                    currentPath === '/' ? 'bg-[#35B6DE]/10 text-[#35B6DE]' : 'text-white hover:bg-white/5'
                  }`}
                >
                  Home
                </Link>

                {/* Services Section with Accordion-like list */}
                <div className="pt-2">
                  <div className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#35B6DE]">
                    Driver Categories
                  </div>
                  <div className="mt-1 space-y-1">
                    <Link
                      href="/personal-driver-service"
                      className="block px-3 py-2 rounded-lg text-xs font-semibold text-[#CFCFCF] hover:text-white hover:bg-white/5"
                    >
                      • Personal Driver
                    </Link>
                    <Link
                      href="/corporate-driver-service"
                      className="block px-3 py-2 rounded-lg text-xs font-semibold text-[#CFCFCF] hover:text-white hover:bg-white/5"
                    >
                      • Corporate Driver
                    </Link>
                    <Link
                      href="/permanent-driver-service"
                      className="block px-3 py-2 rounded-lg text-xs font-semibold text-[#CFCFCF] hover:text-white hover:bg-white/5"
                    >
                      • Permanent Driver
                    </Link>
                    <Link
                      href="/outstation-driver-service"
                      className="block px-3 py-2 rounded-lg text-xs font-semibold text-[#CFCFCF] hover:text-white hover:bg-white/5"
                    >
                      • Outstation Driver
                    </Link>
                    <Link
                      href="/airport-driver-service"
                      className="block px-3 py-2 rounded-lg text-xs font-semibold text-[#CFCFCF] hover:text-white hover:bg-white/5"
                    >
                      • Airport Driver
                    </Link>
                    <Link
                      href="/hourly-driver-service"
                      className="block px-3 py-2 rounded-lg text-xs font-semibold text-[#CFCFCF] hover:text-white hover:bg-white/5"
                    >
                      • Hourly Driver
                    </Link>
                  </div>
                </div>

                <div className="pt-2">
                  <div className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#35B6DE]">
                    Service Areas
                  </div>
                  <div className="mt-1 space-y-1">
                    <Link
                      href="/service-areas"
                      className="block px-3 py-2 rounded-lg text-xs font-semibold text-[#CFCFCF] hover:text-white hover:bg-white/5"
                    >
                      • Mumbai, Thane, Navi Mumbai, Mira Road &amp; MMR
                    </Link>
                  </div>
                </div>

                <Link
                  href="/about"
                  className={`block px-3 py-2.5 rounded-xl font-bold text-sm transition-colors ${
                    currentPath === '/about' ? 'bg-[#35B6DE]/10 text-[#35B6DE]' : 'text-white hover:bg-white/5'
                  }`}
                >
                  About Us
                </Link>

                <Link
                  href="/contact"
                  className={`block px-3 py-2.5 rounded-xl font-bold text-sm transition-colors ${
                    currentPath === '/contact' ? 'bg-[#35B6DE]/10 text-[#35B6DE]' : 'text-white hover:bg-white/5'
                  }`}
                >
                  Contact
                </Link>

                <Link
                  href="/faqs"
                  className={`block px-3 py-2.5 rounded-xl font-bold text-sm transition-colors ${
                    currentPath === '/faqs' ? 'bg-[#35B6DE]/10 text-[#35B6DE]' : 'text-white hover:bg-white/5'
                  }`}
                >
                  FAQs
                </Link>
              </div>
            </div>

            {/* Drawer Bottom Actions */}
            <div className="pt-4 border-t border-white/10 space-y-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="btn-primary w-full h-12 text-sm font-bold flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4 text-[#050505]" />
                <span>Book Driver</span>
              </button>

              <a
                href="tel:8652880057"
                className="btn-secondary w-full h-12 text-sm font-bold flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-[#35B6DE]" />
                <span>Call: 8652880057</span>
              </a>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleWhatsAppClick();
                }}
                className="btn-whatsapp w-full h-12 text-sm font-bold flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Concierge</span>
              </button>

              <div className="pt-2 text-center text-[11px] text-[#CFCFCF]">
                <span>Email: </span>
                <a href="mailto:info@ontimedriverservice.com" className="text-[#35B6DE] hover:underline">
                  info@ontimedriverservice.com
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
