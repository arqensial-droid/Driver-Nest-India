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
import { BrandLogo } from './BrandLogo';

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
      <div className="hidden lg:block bg-[#EEF8FC] text-[#4B5563] text-[12px] py-1.5 px-6 border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 font-bold text-[#111827]">
              <Sparkles className="w-3.5 h-3.5 text-[#35B6DE]" />
              MUMBAI EXECUTIVE DRIVER SERVICE:
            </span>
            <span className="text-[#4B5563]">
              Verified Drivers for Personal, Corporate, Airport &amp; Outstation Travel
            </span>
          </div>

          <div className="flex items-center gap-5 text-[#4B5563]">
            <span className="flex items-center gap-1.5 text-xs font-semibold text-[#111827]">
              <ShieldCheck className="w-4 h-4 text-[#22C55E]" />
              100% Police Verified Drivers
            </span>
            <span className="text-[#E5E7EB]">|</span>
            <a
              href="mailto:info@ontimedriverservice.com"
              className="hover:text-[#35B6DE] transition-colors"
            >
              info@ontimedriverservice.com
            </a>
            <span className="text-[#E5E7EB]">|</span>
            <a
              href="tel:8652880057"
              className="font-bold text-[#111827] hover:text-[#35B6DE] transition-colors flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5 text-[#35B6DE]" />
              8652880057
            </a>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar - Sticky White Corporate Header with Scroll Shadow */}
      <nav
        className={`w-full transition-all duration-300 bg-white/95 backdrop-blur-md border-b ${
          isScrolled ? 'shadow-md border-[#E5E7EB]' : 'border-[#E5E7EB]/80'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="h-16 sm:h-[70px] max-h-[72px] flex items-center justify-between gap-2 sm:gap-4">
            
            {/* Logo Left: ON TIME DRIVER SERVICE */}
            <Link
              href="/"
              className="flex items-center shrink-0 focus:outline-none min-w-0 py-1"
              aria-label="On Time Driver Service Home"
            >
              <BrandLogo size="header" priority />
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-1 xl:gap-2">
              <Link
                href="/"
                className={`px-3 py-2 text-sm font-semibold rounded-lg transition-colors ${
                  currentPath === '/'
                    ? 'text-[#35B6DE] bg-[#EEF8FC]'
                    : 'text-[#4B5563] hover:text-[#111827] hover:bg-slate-50'
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
                      ? 'text-[#35B6DE] bg-[#EEF8FC]'
                      : 'text-[#4B5563] hover:text-[#111827] hover:bg-slate-50'
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
                  <div className="absolute top-full left-0 w-[500px] bg-white rounded-2xl shadow-xl border border-[#E5E7EB] p-4 animate-fade-in mt-1 z-50">
                    <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB] mb-3">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#35B6DE]">
                        Driver Services
                      </span>
                      <Link
                        href="/services"
                        className="text-xs font-semibold text-[#111827] hover:text-[#35B6DE] flex items-center gap-1"
                      >
                        All Services <ChevronRight className="w-3 h-3" />
                      </Link>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <Link
                        href="/personal-driver-service"
                        className="p-2.5 rounded-xl hover:bg-[#EEF8FC] transition-colors flex items-center gap-2.5 font-medium text-[#4B5563] hover:text-[#111827]"
                      >
                        <Car className="w-4 h-4 text-[#35B6DE]" />
                        <span>Personal Driver</span>
                      </Link>
                      <Link
                        href="/corporate-driver-service"
                        className="p-2.5 rounded-xl hover:bg-[#EEF8FC] transition-colors flex items-center gap-2.5 font-medium text-[#4B5563] hover:text-[#111827]"
                      >
                        <Car className="w-4 h-4 text-[#35B6DE]" />
                        <span>Corporate Driver</span>
                      </Link>
                      <Link
                        href="/permanent-driver-service"
                        className="p-2.5 rounded-xl hover:bg-[#EEF8FC] transition-colors flex items-center gap-2.5 font-medium text-[#4B5563] hover:text-[#111827]"
                      >
                        <Car className="w-4 h-4 text-[#35B6DE]" />
                        <span>Permanent Driver</span>
                      </Link>
                      <Link
                        href="/hourly-driver-service"
                        className="p-2.5 rounded-xl hover:bg-[#EEF8FC] transition-colors flex items-center gap-2.5 font-medium text-[#4B5563] hover:text-[#111827]"
                      >
                        <Car className="w-4 h-4 text-[#35B6DE]" />
                        <span>Hourly Driver</span>
                      </Link>
                      <Link
                        href="/airport-driver-service"
                        className="p-2.5 rounded-xl hover:bg-[#EEF8FC] transition-colors flex items-center gap-2.5 font-medium text-[#4B5563] hover:text-[#111827]"
                      >
                        <Car className="w-4 h-4 text-[#35B6DE]" />
                        <span>Airport Driver</span>
                      </Link>
                      <Link
                        href="/outstation-driver-service"
                        className="p-2.5 rounded-xl hover:bg-[#EEF8FC] transition-colors flex items-center gap-2.5 font-medium text-[#4B5563] hover:text-[#111827]"
                      >
                        <Car className="w-4 h-4 text-[#35B6DE]" />
                        <span>Outstation Driver</span>
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <Link
                href="/service-areas"
                className={`px-3 py-2 text-sm font-semibold rounded-lg transition-colors ${
                  currentPath === '/service-areas'
                    ? 'text-[#35B6DE] bg-[#EEF8FC]'
                    : 'text-[#4B5563] hover:text-[#111827] hover:bg-slate-50'
                }`}
              >
                Service Areas
              </Link>

              <Link
                href="/about"
                className={`px-3 py-2 text-sm font-semibold rounded-lg transition-colors ${
                  currentPath === '/about'
                    ? 'text-[#35B6DE] bg-[#EEF8FC]'
                    : 'text-[#4B5563] hover:text-[#111827] hover:bg-slate-50'
                }`}
              >
                About Us
              </Link>

              <Link
                href="/faqs"
                className={`px-3 py-2 text-sm font-semibold rounded-lg transition-colors ${
                  currentPath === '/faqs'
                    ? 'text-[#35B6DE] bg-[#EEF8FC]'
                    : 'text-[#4B5563] hover:text-[#111827] hover:bg-slate-50'
                }`}
              >
                FAQs
              </Link>

              <Link
                href="/contact"
                className={`px-3 py-2 text-sm font-semibold rounded-lg transition-colors ${
                  currentPath === '/contact'
                    ? 'text-[#35B6DE] bg-[#EEF8FC]'
                    : 'text-[#4B5563] hover:text-[#111827] hover:bg-slate-50'
                }`}
              >
                Contact
              </Link>
            </div>

            {/* Desktop Action Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href="tel:8652880057"
                className="h-11 px-4 rounded-xl bg-white hover:bg-[#EEF8FC] text-[#111827] border border-[#E5E7EB] font-bold text-xs flex items-center gap-2 transition-all hover:border-[#35B6DE]"
                title="Call 24/7 Concierge"
              >
                <Phone className="w-3.5 h-3.5 text-[#35B6DE]" />
                <span>8652880057</span>
              </a>

              <button
                onClick={onOpenBooking}
                className="btn-primary h-11 px-6 text-sm font-bold shadow-xs cursor-pointer flex items-center gap-2"
              >
                <Calendar className="w-4 h-4 text-[#111827]" />
                <span>Request Driver</span>
              </button>
            </div>

            {/* Mobile Header Layout - Fixed with min 44px touch target, no overflow */}
            <div className="flex lg:hidden items-center gap-2 shrink-0">
              <a
                href="tel:8652880057"
                className="w-11 h-11 rounded-xl bg-white border border-[#E5E7EB] text-[#111827] flex items-center justify-center hover:border-[#35B6DE] hover:bg-[#EEF8FC] transition-colors shrink-0"
                aria-label="Call 8652880057"
              >
                <Phone className="w-4 h-4 text-[#35B6DE]" />
              </a>

              <button
                onClick={onOpenBooking}
                className="h-11 px-3.5 sm:px-4 rounded-xl bg-[#F3ED1A] hover:bg-[#eae415] text-[#111827] text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-colors shrink-0 cursor-pointer active:scale-98"
                aria-label="Request Driver"
              >
                <Calendar className="w-3.5 h-3.5 text-[#111827]" />
                <span className="whitespace-nowrap font-extrabold">Request Driver</span>
              </button>

              <button
                onClick={() => setMobileMenuOpen(true)}
                className="w-11 h-11 flex items-center justify-center rounded-xl bg-white border border-[#E5E7EB] text-[#111827] hover:border-[#35B6DE] hover:bg-slate-50 transition-colors shrink-0 cursor-pointer"
                aria-label="Open Navigation Menu"
              >
                <Menu className="w-5 h-5 text-[#111827]" />
              </button>
            </div>

          </div>
        </div>
      </nav>

      {/* Slide-Out Drawer Menu on Mobile */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          <div className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-white border-l border-[#E5E7EB] shadow-2xl flex flex-col justify-between overflow-y-auto z-10 p-5 sm:p-6 animate-fade-in text-left">
            <div>
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-4 border-b border-[#E5E7EB]">
                <BrandLogo size="md" />

                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-10 h-10 flex items-center justify-center rounded-xl text-[#4B5563] hover:text-[#111827] hover:bg-slate-100 transition-colors cursor-pointer"
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
                    currentPath === '/' ? 'bg-[#EEF8FC] text-[#35B6DE]' : 'text-[#111827] hover:bg-slate-50'
                  }`}
                >
                  Home
                </Link>

                {/* Services Section */}
                <div className="pt-2">
                  <div className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#35B6DE]">
                    Driver Services
                  </div>
                  <div className="mt-1 space-y-1">
                    <Link
                      href="/personal-driver-service"
                      className="block px-3 py-2 rounded-lg text-xs font-semibold text-[#4B5563] hover:text-[#111827] hover:bg-slate-50"
                    >
                      • Personal Driver
                    </Link>
                    <Link
                      href="/corporate-driver-service"
                      className="block px-3 py-2 rounded-lg text-xs font-semibold text-[#4B5563] hover:text-[#111827] hover:bg-slate-50"
                    >
                      • Corporate Driver
                    </Link>
                    <Link
                      href="/permanent-driver-service"
                      className="block px-3 py-2 rounded-lg text-xs font-semibold text-[#4B5563] hover:text-[#111827] hover:bg-slate-50"
                    >
                      • Permanent Driver
                    </Link>
                    <Link
                      href="/hourly-driver-service"
                      className="block px-3 py-2 rounded-lg text-xs font-semibold text-[#4B5563] hover:text-[#111827] hover:bg-slate-50"
                    >
                      • Hourly Driver
                    </Link>
                    <Link
                      href="/airport-driver-service"
                      className="block px-3 py-2 rounded-lg text-xs font-semibold text-[#4B5563] hover:text-[#111827] hover:bg-slate-50"
                    >
                      • Airport Driver
                    </Link>
                    <Link
                      href="/outstation-driver-service"
                      className="block px-3 py-2 rounded-lg text-xs font-semibold text-[#4B5563] hover:text-[#111827] hover:bg-slate-50"
                    >
                      • Outstation Driver
                    </Link>
                  </div>
                </div>

                <div className="pt-2">
                  <div className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#35B6DE]">
                    Coverage Areas
                  </div>
                  <div className="mt-1 space-y-1">
                    <Link
                      href="/service-areas"
                      className="block px-3 py-2 rounded-lg text-xs font-semibold text-[#4B5563] hover:text-[#111827] hover:bg-slate-50"
                    >
                      • Mumbai, Thane, Navi Mumbai, Mira Road &amp; MMR
                    </Link>
                  </div>
                </div>

                <Link
                  href="/about"
                  className={`block px-3 py-2.5 rounded-xl font-bold text-sm transition-colors ${
                    currentPath === '/about' ? 'bg-[#EEF8FC] text-[#35B6DE]' : 'text-[#111827] hover:bg-slate-50'
                  }`}
                >
                  About Us
                </Link>

                <Link
                  href="/faqs"
                  className={`block px-3 py-2.5 rounded-xl font-bold text-sm transition-colors ${
                    currentPath === '/faqs' ? 'bg-[#EEF8FC] text-[#35B6DE]' : 'text-[#111827] hover:bg-slate-50'
                  }`}
                >
                  FAQs
                </Link>

                <Link
                  href="/contact"
                  className={`block px-3 py-2.5 rounded-xl font-bold text-sm transition-colors ${
                    currentPath === '/contact' ? 'bg-[#EEF8FC] text-[#35B6DE]' : 'text-[#111827] hover:bg-slate-50'
                  }`}
                >
                  Contact
                </Link>
              </div>
            </div>

            {/* Drawer Bottom Actions */}
            <div className="pt-4 border-t border-[#E5E7EB] space-y-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="btn-primary w-full h-12 text-sm font-bold flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4 text-[#111827]" />
                <span>Request Driver</span>
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
                <span>WhatsApp: 8652880057</span>
              </button>

              <div className="pt-2 text-center text-[12px] text-[#4B5563]">
                <span>Email: </span>
                <a href="mailto:info@ontimedriverservice.com" className="text-[#35B6DE] font-semibold hover:underline">
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
