import React, { useState } from 'react';
import { ShieldCheck, Phone, Mail, MapPin, MessageSquare, ArrowRight, Clock, Calendar, CheckCircle2, Send, AlertCircle } from 'lucide-react';
import { Link } from '../router';
import { submitLead, validateLeadForm, PRIMARY_PHONE } from '../services/leadService';
import { BrandLogo } from './BrandLogo';

interface FooterProps {
  onOpenBooking: () => void;
}

const FOOTER_SERVICES = [
  { slug: '/personal-driver-service', title: 'Personal Driver Service' },
  { slug: '/corporate-driver-service', title: 'Corporate Driver Service' },
  { slug: '/permanent-driver-service', title: 'Permanent Driver Service' },
  { slug: '/hourly-driver-service', title: 'Hourly Driver Service' },
  { slug: '/airport-driver-service', title: 'Airport Transfer Driver' },
  { slug: '/outstation-driver-service', title: 'Outstation Highway Driver' },
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
  { slug: '/locations/palghar', title: 'Palghar (Boisar, Industrial Corridor)' },
];

export const Footer: React.FC<FooterProps> = ({ onOpenBooking }) => {
  // Footer Quick Lead / Callback Form state
  const [footerName, setFooterName] = useState('');
  const [footerMobile, setFooterMobile] = useState('');
  const [footerLocation, setFooterLocation] = useState('Mumbai');
  const [footerSubmitting, setFooterSubmitting] = useState(false);
  const [footerSubmitted, setFooterSubmitted] = useState(false);
  const [footerRef, setFooterRef] = useState('');
  const [footerError, setFooterError] = useState('');

  const handleFooterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      name: footerName,
      mobile: footerMobile,
      location: footerLocation,
      serviceType: 'Personal Driver',
      email: '',
      formName: 'Footer Lead Form',
    };

    const validation = validateLeadForm(data);
    if (!validation.isValid) {
      setFooterError(validation.errors.name || validation.errors.mobile || 'Please enter valid details.');
      return;
    }

    setFooterError('');
    setFooterSubmitting(true);

    try {
      console.log('[CONSOLE LOG] [FOOTER FORM SUBMISSION]', data);
      const res = await submitLead(data, 'Footer Lead Form');
      if (res.success && res.record) {
        setFooterRef(res.record.id);
        setFooterSubmitted(true);
      } else {
        setFooterError(res.error || 'Failed to submit. Please call 8652880057 or message on WhatsApp.');
      }
    } catch (err: any) {
      console.error('[CONSOLE LOG] [FOOTER FORM ERROR]', err);
      setFooterError('Failed to submit. Please call 8652880057 or message on WhatsApp.');
    } finally {
      setFooterSubmitting(false);
    }
  };

  return (
    <footer className="bg-[#111827] text-white border-t border-slate-800 pt-12 sm:pt-16 pb-24 md:pb-12 text-xs overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 4-COLUMN FOOTER */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 mb-10">
          
          {/* COLUMN 1: Company */}
          <div className="space-y-4">
            <Link href="/" className="inline-block focus:outline-none" aria-label="On Time Driver Service Home">
              <BrandLogo variant="dark" size="footer" priority={false} />
            </Link>

            <p className="text-slate-300 text-xs leading-relaxed font-normal">
              On Time Driver Service provides verified, professional personal, corporate, airport, and monthly drivers across Mumbai, Thane, Navi Mumbai, Mira Road, Bhayandar, Vasai, Virar, and Palghar.
            </p>

            <div className="flex items-center gap-2.5 pt-1 text-white">
              <a
                href="tel:8652880057"
                className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-[#35B6DE] hover:text-[#111827] text-white flex items-center justify-center transition-colors border border-slate-700"
                aria-label="Call 8652880057"
              >
                <Phone className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/918652880057?text=Hi%2C%20I%20need%20a%20professional%20driver%20service%20in%20Mumbai."
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-[#22C55E] hover:text-white text-white flex items-center justify-center transition-colors border border-slate-700"
                aria-label="WhatsApp Support"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
              <a
                href="mailto:info@ontimedriverservice.com"
                className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-[#35B6DE] hover:text-[#111827] text-white flex items-center justify-center transition-colors border border-slate-700"
                aria-label="Email Support"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>

            <div className="inline-flex items-center gap-1.5 text-xs text-[#22C55E] font-semibold pt-1">
              <ShieldCheck className="w-4 h-4 text-[#22C55E] shrink-0" />
              <span>100% Police Verified Drivers</span>
            </div>
          </div>

          {/* COLUMN 2: Services */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-white text-xs uppercase tracking-wider border-l-2 border-[#35B6DE] pl-2">
              Driver Services
            </h4>
            <ul className="space-y-2 text-slate-300">
              {FOOTER_SERVICES.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={s.slug}
                    className="hover:text-[#35B6DE] transition-colors block text-xs"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 3: Locations */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-white text-xs uppercase tracking-wider border-l-2 border-[#35B6DE] pl-2">
              Service Areas
            </h4>
            <ul className="space-y-2 text-slate-300">
              {FOOTER_LOCATIONS.map((loc) => (
                <li key={loc.slug}>
                  <Link
                    href={loc.slug}
                    className="hover:text-[#35B6DE] transition-colors block text-xs"
                  >
                    {loc.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 4: Contact & Footer Quick Lead Form */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-white text-xs uppercase tracking-wider border-l-2 border-[#35B6DE] pl-2">
              Contact &amp; Quick Callback
            </h4>
            
            <div className="space-y-2 text-slate-300 text-xs">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#35B6DE] shrink-0" />
                <a href="tel:8652880057" className="text-white font-bold hover:text-[#35B6DE]">
                  8652880057 (24/7 Helpline)
                </a>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#35B6DE] shrink-0" />
                <a href="mailto:info@ontimedriverservice.com" className="text-white hover:text-[#35B6DE]">
                  info@ontimedriverservice.com
                </a>
              </div>
            </div>

            {/* Embedded Footer Booking / Callback Form */}
            <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-3.5 mt-2">
              <span className="text-[11px] font-bold text-[#35B6DE] block mb-1">
                ⚡ Request Quick Callback
              </span>

              {!footerSubmitted ? (
                <form onSubmit={handleFooterSubmit} className="space-y-2">
                  {footerError && (
                    <p className="text-[10px] text-red-300 bg-red-900/60 p-1.5 rounded border border-red-500/30">
                      {footerError}
                    </p>
                  )}

                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    value={footerName}
                    onChange={(e) => setFooterName(e.target.value)}
                    className="w-full px-2.5 py-1.5 text-[11px] bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-[#35B6DE]"
                  />

                  <input
                    type="tel"
                    required
                    maxLength={10}
                    placeholder="10-digit Mobile"
                    value={footerMobile}
                    onChange={(e) => setFooterMobile(e.target.value)}
                    className="w-full px-2.5 py-1.5 text-[11px] bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-[#35B6DE]"
                  />

                  <button
                    type="submit"
                    disabled={footerSubmitting}
                    className="w-full h-8 bg-[#F3ED1A] hover:bg-[#eae415] text-[#111827] text-[11px] font-bold rounded-lg flex items-center justify-center gap-1.5 shadow-sm cursor-pointer disabled:opacity-75 transition-colors"
                  >
                    {footerSubmitting ? (
                      <span>Submitting...</span>
                    ) : (
                      <>
                        <Send className="w-3 h-3 text-[#111827]" />
                        <span>Request Driver</span>
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <div className="text-center py-2 space-y-1.5 animate-fade-in">
                  <CheckCircle2 className="w-5 h-5 text-[#22C55E] mx-auto" />
                  <p className="text-xs font-bold text-white">
                    Thank you for your enquiry. Our team will contact you shortly.
                  </p>
                  <p className="text-[10px] text-[#35B6DE] font-mono">
                    Ref: {footerRef}
                  </p>
                  <div className="flex gap-1.5 pt-1">
                    <a
                      href={`tel:${PRIMARY_PHONE}`}
                      className="flex-1 py-1 rounded bg-[#35B6DE] text-[#111827] font-bold text-[10px] text-center"
                    >
                      Call Now
                    </a>
                    <a
                      href={`https://wa.me/91${PRIMARY_PHONE}?text=Hi,%20I%20requested%20a%20callback%20Ref:%20${footerRef}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-1 rounded bg-[#22C55E] text-white font-bold text-[10px] text-center"
                    >
                      WhatsApp
                    </a>
                  </div>
                </div>
              )}
            </div>

            <div className="pt-1">
              <button
                onClick={onOpenBooking}
                className="w-full text-center text-xs font-bold text-[#35B6DE] hover:text-[#F3ED1A] transition-colors py-1 cursor-pointer flex items-center justify-center gap-1"
              >
                <span>Open Detailed Booking Form</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-400 text-[11px]">
          <div>
            © {new Date().getFullYear()} On Time Driver Service. All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-slate-400">
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
