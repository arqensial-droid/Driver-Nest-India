import React, { useState } from 'react';
import { locationsData } from '../data/locationsData';
import { servicesData } from '../data/servicesData';
import { Link, useRouter, SEO } from '../router';
import { ImageWithFallback } from '../components/ImageWithFallback';
import {
  MapPin,
  Clock,
  Route,
  ChevronRight,
  ShieldCheck,
  Calendar,
  Phone,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  User,
  Mail,
  Send,
  Car,
  FileText,
  Sparkles,
  AlertCircle,
} from 'lucide-react';
import { LeadFormData } from '../types';
import { submitLead, validateLeadForm } from '../services/leadService';

interface LocationDetailPageProps {
  slug: string;
  onOpenBooking: (serviceTitle?: string, locationName?: string) => void;
}

const DEDICATED_SEO_MAP: Record<string, string> = {
  'personal-driver': '/personal-driver-service',
  'full-time-driver': '/full-time-driver-service',
  'part-time-driver': '/part-time-driver-service',
  'temporary-driver': '/temporary-driver-service',
  'hourly-driver': '/hourly-driver-service',
  'corporate-driver': '/corporate-driver-service',
  'airport-driver': '/airport-driver-service',
  'outstation-driver': '/outstation-driver-service',
  'chauffeur-service': '/chauffeur-service',
};

export const LocationDetailPage: React.FC<LocationDetailPageProps> = ({ slug, onOpenBooking }) => {
  const location = locationsData.find((l) => l.id === slug);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const [formData, setFormData] = useState<LeadFormData>({
    name: '',
    mobile: '',
    email: '',
    location: location?.name || 'Mumbai',
    serviceType: 'Personal Driver',
    vehicleType: 'Toyota Innova Crysta / Hycross',
    date: new Date().toISOString().split('T')[0],
    time: 'Immediate Dispatch (30-45 mins)',
    message: '',
    formName: 'Driver Requirement Form',
  });

  const [honeypot, setHoneypot] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  if (!location) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 pt-24 pb-16 bg-[#050505] text-white">
        <h1 className="text-2xl sm:text-3xl font-bold font-heading text-white mb-3">Location Not Found</h1>
        <p className="text-neutral-400 mb-6 max-w-md text-sm">
          The requested service area could not be located. Explore our coverage across Mumbai and MMR.
        </p>
        <Link href="/service-areas" className="btn-primary">
          <span>View All Service Areas</span>
          <ArrowRight className="w-4 h-4 ml-2" />
        </Link>
      </div>
    );
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateLeadForm(formData, honeypot);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }
    setErrors({});
    setIsSubmitting(true);

    try {
      const res = await submitLead(formData, 'Driver Requirement Form');
      if (res.success && res.record) {
        setBookingRef(res.record.id);
        setSubmitted(true);
      }
    } catch (err) {
      setErrors({ form: 'Transmission error. Please call our 24/7 desk at 8652880057 directly.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const locationSchema = [
    {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      'name': `On Time Driver Service - ${location.name}`,
      'telephone': '+91 8652880057',
      'address': {
        '@type': 'PostalAddress',
        'addressLocality': location.name,
        'addressRegion': 'Maharashtra',
        'addressCountry': 'IN',
      },
      'areaServed': location.name,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': location.localFaqs.map((f) => ({
        '@type': 'Question',
        'name': f.question,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': f.answer,
        },
      })),
    },
  ];

  return (
    <>
      <SEO
        title={`Driver Service in ${location.name} – Verified Chauffeurs | On Time Driver Service`}
        description={`Hire police-verified drivers in ${location.name}. Punctual personal, corporate & outstation chauffeurs. Average dispatch time: ${location.avgDispatchTime}.`}
        canonicalPath={`/locations/${location.id}`}
        image={location.image}
        schema={locationSchema}
      />

      <div className="pt-24 sm:pt-28 pb-20 bg-[#050505] text-white overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-xs text-neutral-400">
            <Link href="/" className="hover:text-[#35B6DE] transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-600" />
            <Link href="/service-areas" className="hover:text-[#35B6DE] transition-colors">Service Areas</Link>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-600" />
            <span className="text-white font-semibold">{location.name}</span>
          </nav>

          {/* Hero Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center mb-16 sm:mb-20">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0B0B0B] border border-[#35B6DE]/40 shadow-md">
                <Sparkles className="w-3.5 h-3.5 text-[#F3ED1A]" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#35B6DE]">
                  Verified Dispatch: {location.avgDispatchTime}
                </span>
              </div>

              <h1 className="text-h1 font-extrabold text-white tracking-tight">
                Driver Service in {location.name}
              </h1>

              <p className="text-subheading text-[#CFCFCF] leading-relaxed">
                {location.fullContent}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-4">
                <button
                  onClick={() => onOpenBooking(undefined, location.name)}
                  className="btn-primary h-[52px] px-8 text-base font-bold flex items-center justify-center gap-2 shadow-lg shadow-[#F3ED1A]/20"
                >
                  <Calendar className="w-4 h-4 text-[#050505]" />
                  <span>Book Driver in {location.name}</span>
                </button>

                <a
                  href="tel:8652880057"
                  className="btn-secondary h-[52px] px-6 text-sm font-semibold flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4 text-[#35B6DE]" />
                  <span>Call 8652880057</span>
                </a>
              </div>
            </div>

            {/* Media */}
            <div className="lg:col-span-5">
              <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-white/15 shadow-2xl bg-[#0B0B0B]">
                <ImageWithFallback
                  src={location.image}
                  alt={`Driver service in ${location.name}`}
                  fallbackTitle={`${location.name} Hub`}
                  locationTag={location.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3 bg-[#0B0B0B]/90 border border-white/10 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#F3ED1A]">
                  {location.name} Local Staging Pod
                </div>
              </div>
            </div>
          </div>

          {/* Local Staging Hubs & Key Corridors */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            <div className="bg-[#0B0B0B] p-6 sm:p-7 rounded-2xl border border-white/10 shadow-xl">
              <div className="flex items-center gap-2 text-sm font-bold text-white mb-3">
                <MapPin className="w-4 h-4 text-[#35B6DE]" />
                <span>Key Staging Hubs in {location.name}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {location.popularHubs.map((hub, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 rounded-xl bg-black/40 border border-white/10 text-neutral-300 text-xs font-medium"
                  >
                    {hub}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-[#0B0B0B] p-6 sm:p-7 rounded-2xl border border-white/10 shadow-xl">
              <div className="flex items-center gap-2 text-sm font-bold text-white mb-3">
                <Route className="w-4 h-4 text-[#F3ED1A]" />
                <span>Major Transit Arteries</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {location.keyRoutes.map((route, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 rounded-xl bg-[#35B6DE]/10 border border-[#35B6DE]/20 text-[#35B6DE] text-xs font-medium"
                  >
                    {route}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Local FAQs */}
          <div className="max-w-3xl mx-auto mb-16">
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-white text-center mb-6">
              {location.name} Driver FAQs
            </h2>
            <div className="space-y-3">
              {location.localFaqs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div key={idx} className="bg-[#0B0B0B] rounded-xl border border-white/10 overflow-hidden">
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full p-4 sm:p-5 text-left font-bold text-white text-sm flex items-center justify-between gap-3"
                    >
                      <span>{faq.question}</span>
                      <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180 text-[#35B6DE]' : ''}`} />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 text-sm text-[#CFCFCF] leading-relaxed border-t border-white/5 pt-3">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Lead Form for this location */}
          <div className="max-w-2xl mx-auto bg-[#0B0B0B] rounded-2xl border border-white/15 p-6 sm:p-8 shadow-2xl">
            {submitted ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-[#35B6DE]/20 border border-[#35B6DE] text-[#35B6DE] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8 text-[#35B6DE]" />
                </div>
                <h3 className="text-2xl font-extrabold text-white">
                  Booking Request Received!
                </h3>
                <p className="text-sm text-[#CFCFCF]">
                  A booking manager is assigning a driver in {location.name}. Reference ID: <strong className="text-[#F3ED1A]">{bookingRef}</strong>.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="btn-primary h-11 px-6 text-xs font-bold mt-2"
                >
                  Submit Another Request
                </button>
              </div>
            ) : (
              <div>
                <div className="text-center mb-6">
                  <span className="text-xs font-bold text-[#35B6DE] uppercase tracking-wider block mb-1">
                    Direct Staging Dispatch
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold font-heading text-white">
                    Book a Driver in {location.name}
                  </h2>
                  <p className="text-xs sm:text-sm text-[#CFCFCF] mt-1">
                    Delivered directly to <span className="text-[#35B6DE]">info@ontimedriverservice.com</span>.
                  </p>
                </div>

                {errors.form && (
                  <div className="p-3 mb-4 rounded-xl bg-red-950/60 border border-red-500/40 text-red-200 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                    <span>{errors.form}</span>
                  </div>
                )}

                <form onSubmit={handleFormSubmit} className="space-y-3.5">
                  <input
                    type="text"
                    name="bot_field_loc"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    tabIndex={-1}
                    className="hidden"
                  />

                  {/* 1. Name & 2. Mobile */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1">
                        Full Name <span className="text-[#F3ED1A]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => {
                          setFormData({ ...formData, name: e.target.value });
                          if (errors.name) setErrors({ ...errors, name: '' });
                        }}
                        placeholder="Your Name"
                        className="dark-input w-full px-3 py-2.5"
                      />
                      {errors.name && <p className="text-red-400 text-[11px] mt-0.5">{errors.name}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1">
                        Mobile Number <span className="text-[#F3ED1A]">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        maxLength={10}
                        value={formData.mobile}
                        onChange={(e) => {
                          setFormData({ ...formData, mobile: e.target.value });
                          if (errors.mobile) setErrors({ ...errors, mobile: '' });
                        }}
                        placeholder="10-digit mobile"
                        className="dark-input w-full px-3 py-2.5"
                      />
                      {errors.mobile && <p className="text-red-400 text-[11px] mt-0.5">{errors.mobile}</p>}
                    </div>
                  </div>

                  {/* 3. Email & 4. Location */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1">
                        Email Address <span className="text-[#F3ED1A]">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          if (errors.email) setErrors({ ...errors, email: '' });
                        }}
                        placeholder="name@example.com"
                        className="dark-input w-full px-3 py-2.5"
                      />
                      {errors.email && <p className="text-red-400 text-[11px] mt-0.5">{errors.email}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1">
                        Location
                      </label>
                      <input
                        type="text"
                        readOnly
                        value={location.name}
                        className="dark-input w-full px-3 py-2.5 opacity-80 cursor-not-allowed text-[#35B6DE] font-bold"
                      />
                    </div>
                  </div>

                  {/* 5. Service Type & 6. Vehicle Type */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1">
                        Service Type
                      </label>
                      <select
                        value={formData.serviceType}
                        onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                        className="dark-input w-full px-3 py-2.5 appearance-none"
                      >
                        <option value="Personal Driver">Personal Driver</option>
                        <option value="Hourly Driver">Hourly Driver</option>
                        <option value="Part-Time Driver">Part-Time Driver</option>
                        <option value="Full-Time Driver">Full-Time Driver</option>
                        <option value="Corporate Driver">Corporate Chauffeur</option>
                        <option value="Airport Transfer">Airport Transfer</option>
                        <option value="Outstation Driver">Outstation Driver</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1">
                        Vehicle Type
                      </label>
                      <select
                        value={formData.vehicleType}
                        onChange={(e) => setFormData({ ...formData, vehicleType: e.target.value })}
                        className="dark-input w-full px-3 py-2.5 appearance-none"
                      >
                        <option value="Toyota Innova Crysta / Hycross">Toyota Innova Crysta / Hycross</option>
                        <option value="Sedan (Honda City / Dzire / Verna)">Sedan (Honda City / Dzire / Verna)</option>
                        <option value="SUV (Creta / Fortuner / Seltos)">SUV (Creta / Fortuner / Seltos)</option>
                        <option value="Luxury (Mercedes / BMW / Audi)">Luxury (Mercedes / BMW / Audi)</option>
                        <option value="Compact (Swift / i20 / Baleno)">Compact (Swift / i20 / Baleno)</option>
                      </select>
                    </div>
                  </div>

                  {/* 7. Date & 8. Time */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1">
                        Date Required
                      </label>
                      <input
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="dark-input w-full px-3 py-2.5"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1">
                        Time / Urgency
                      </label>
                      <select
                        value={formData.time}
                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                        className="dark-input w-full px-3 py-2.5 appearance-none"
                      >
                        <option value="Immediate Dispatch (30-45 mins)">Immediate Dispatch (30–45 mins)</option>
                        <option value="Morning Shift (07:00 AM - 03:00 PM)">Morning Shift</option>
                        <option value="Office Hours (09:00 AM - 07:00 PM)">Office Hours</option>
                        <option value="Evening Return (05:00 PM - 01:00 AM)">Evening Return</option>
                      </select>
                    </div>
                  </div>

                  {/* 9. Message */}
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">
                      Pickup Address &amp; Instructions
                    </label>
                    <textarea
                      rows={2}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="e.g. Near Majiwada junction, manual transmission..."
                      className="dark-input w-full px-3 py-2 text-xs"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full h-[52px] text-base font-bold flex items-center justify-center gap-2 mt-4 shadow-lg shadow-[#F3ED1A]/20"
                  >
                    {isSubmitting ? 'Transmitting to Desk...' : `Book Chauffeur in ${location.name}`}
                  </button>
                </form>
              </div>
            )}
          </div>

        </div>
      </div>
    </>
  );
};
