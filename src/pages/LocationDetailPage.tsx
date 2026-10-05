import React, { useState } from 'react';
import { locationsData } from '../data/locationsData';
import { Link, SEO, useRouter } from '../router';
import { ImageWithFallback } from '../components/ImageWithFallback';
import {
  MapPin,
  Clock,
  Route,
  ShieldCheck,
  CheckCircle2,
  Phone,
  Calendar,
  Send,
  AlertCircle,
  MessageSquare,
  ChevronDown,
  Sparkles,
  ChevronRight,
  Car,
  FileText,
  User,
  Mail,
} from 'lucide-react';
import { submitLead, validateLeadForm, getWhatsAppFallbackUrl, getWhatsAppSuccessUrl, PRIMARY_PHONE } from '../services/leadService';
import { LeadFormData } from '../types';

interface LocationDetailPageProps {
  slug: string;
  onOpenBooking: (serviceTitle?: string, locationName?: string) => void;
}

export const LocationDetailPage: React.FC<LocationDetailPageProps> = ({ slug, onOpenBooking }) => {
  const location = locationsData.find((l) => (l.slug || l.id) === slug || l.id === slug);

  const [formData, setFormData] = useState<LeadFormData>({
    name: '',
    mobile: '',
    email: '',
    location: location?.name || 'Mumbai',
    serviceType: 'Personal Driver',
    vehicleType: 'Sedan / SUV',
    date: new Date().toISOString().split('T')[0],
    time: 'Immediate Dispatch',
    message: '',
    formName: `Driver Requirement Form (${location?.name || 'Mumbai'})`,
  });

  const [honeypot, setHoneypot] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingRef, setBookingRef] = useState('');
  const [submissionFailed, setSubmissionFailed] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  if (!location) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 pt-24 pb-16 bg-[#F8FAFC] text-[#111827]">
        <h1 className="text-3xl font-extrabold mb-4 font-heading text-[#111827]">Location Not Found</h1>
        <p className="text-[#4B5563] mb-6">The location you requested does not exist or has been moved.</p>
        <Link href="/service-areas" className="btn-primary h-11 px-6 text-sm font-bold">
          View All Mumbai Service Areas
        </Link>
      </div>
    );
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const dataToSubmit = {
      ...formData,
      location: location.name,
      formName: `Driver Requirement Form (${location.name})` as const,
    };

    const validation = validateLeadForm(dataToSubmit, honeypot);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    setSubmissionFailed(false);
    setIsSubmitting(true);

    try {
      console.log(`[CONSOLE LOG] [LOCATION FORM SUBMISSION - ${location.name}]`, dataToSubmit);
      const res = await submitLead(dataToSubmit, `Driver Requirement Form (${location.name})`);

      if (res.success && res.record) {
        setBookingRef(res.record.id);
        setSubmitted(true);
      } else {
        setSubmissionFailed(true);
        setErrors({
          form: res.error || "We couldn't submit your request right now. Please call 8652880057 or message on WhatsApp.",
        });
      }
    } catch (err: any) {
      console.error(`[CONSOLE LOG] [LOCATION FORM ERROR - ${location.name}]`, err);
      setSubmissionFailed(true);
      setErrors({
        form: "We couldn't submit your request right now. Please call 8652880057 or message on WhatsApp.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppForward = () => {
    window.open(getWhatsAppSuccessUrl(formData, bookingRef), '_blank');
  };

  const handleWhatsAppFallback = () => {
    window.open(getWhatsAppFallbackUrl(formData), '_blank');
  };

  const locationSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    'name': `On Time Driver Service - ${location.name}`,
    'image': location.image,
    'telephone': '+91 8652880057',
    'email': 'info@ontimedriverservice.com',
    'url': `https://ontimedriverservice.com/locations/${location.slug || location.id}`,
    'address': {
      '@type': 'PostalAddress',
      'addressLocality': location.name,
      'addressRegion': 'Maharashtra',
      'addressCountry': 'IN',
    },
    'areaServed': location.name,
    'description': location.metaDescription || location.shortSnippet || location.seoHeadline,
  };

  return (
    <>
      <SEO
        title={location.metaTitle || location.seoHeadline}
        description={location.metaDescription || location.shortSnippet}
        canonicalPath={`/locations/${location.id}`}
        image={location.image}
        schema={locationSchema}
      />

      <div className="pt-24 sm:pt-28 pb-20 bg-[#F8FAFC] text-[#111827] overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-xs text-[#4B5563]">
            <Link href="/" className="hover:text-[#35B6DE] transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#9CA3AF]" />
            <Link href="/service-areas" className="hover:text-[#35B6DE] transition-colors">Service Areas</Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#9CA3AF]" />
            <span className="text-[#111827] font-semibold">{location.name}</span>
          </nav>

          {/* Hero Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center mb-16 sm:mb-20">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#35B6DE]/30 shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#35B6DE]" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#35B6DE]">
                  Verified Dispatch: {location.avgDispatchTime}
                </span>
              </div>

              <h1 className="text-h1 font-extrabold text-[#111827] tracking-tight">
                Driver Service in {location.name}
              </h1>

              <p className="text-subheading text-[#4B5563] leading-relaxed text-base sm:text-lg">
                {location.fullContent}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-4">
                <button
                  onClick={() => onOpenBooking(undefined, location.name)}
                  className="btn-primary h-12 px-8 text-sm font-bold flex items-center justify-center gap-2 shadow-xs"
                >
                  <Calendar className="w-4 h-4 text-[#111827]" />
                  <span>Book Driver in {location.name}</span>
                </button>

                <a
                  href="tel:8652880057"
                  className="btn-secondary h-12 px-6 text-sm font-semibold flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4 text-[#35B6DE]" />
                  <span>Call 8652880057</span>
                </a>
              </div>
            </div>

            {/* Media */}
            <div className="lg:col-span-5">
              <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-[#E5E7EB] shadow-md bg-slate-100">
                <ImageWithFallback
                  src={location.image}
                  alt={`Driver service in ${location.name}`}
                  fallbackTitle={`${location.name} Hub`}
                  locationTag={location.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111827]/70 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm border border-[#E5E7EB] px-3 py-1 rounded-md text-xs font-bold text-[#111827] shadow-xs">
                  {location.name} Local Staging Pod
                </div>
              </div>
            </div>
          </div>

          {/* Local Staging Hubs & Key Corridors */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            <div className="bg-white p-6 sm:p-7 rounded-2xl border border-[#E5E7EB] shadow-xs">
              <div className="flex items-center gap-2 text-sm font-bold text-[#111827] mb-3">
                <MapPin className="w-4 h-4 text-[#35B6DE]" />
                <span>Key Staging Hubs in {location.name}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {location.popularHubs.map((hub, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 rounded-xl bg-[#EEF8FC] border border-[#E5E7EB] text-[#4B5563] text-xs font-medium"
                  >
                    {hub}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 sm:p-7 rounded-2xl border border-[#E5E7EB] shadow-xs">
              <div className="flex items-center gap-2 text-sm font-bold text-[#111827] mb-3">
                <Route className="w-4 h-4 text-[#35B6DE]" />
                <span>Major Transit Arteries</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {location.keyRoutes.map((route, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 rounded-xl bg-[#EEF8FC] border border-[#E5E7EB] text-[#35B6DE] text-xs font-medium"
                  >
                    {route}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Local FAQs */}
          <div className="max-w-3xl mx-auto mb-16">
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-[#111827] text-center mb-6">
              {location.name} Driver FAQs
            </h2>
            <div className="space-y-3">
              {location.localFaqs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div key={idx} className="bg-white rounded-xl border border-[#E5E7EB] overflow-hidden shadow-xs">
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full p-4 sm:p-5 text-left font-bold text-[#111827] text-sm flex items-center justify-between gap-3"
                    >
                      <span>{faq.question}</span>
                      <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180 text-[#35B6DE]' : ''}`} />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 text-sm text-[#4B5563] leading-relaxed border-t border-[#E5E7EB] pt-3">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Lead Form for this location */}
          <div className="max-w-2xl mx-auto bg-white rounded-2xl border border-[#E5E7EB] p-6 sm:p-8 shadow-md">
            {submitted ? (
              <div className="py-8 text-center space-y-4 animate-fade-in">
                <div className="w-16 h-16 rounded-full bg-[#22C55E]/15 border border-[#22C55E] text-[#22C55E] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8 text-[#22C55E]" />
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-[#111827] leading-tight">
                  Thank you. Our team will contact you within 15 minutes.
                </h3>
                <p className="text-xs sm:text-sm text-[#4B5563]">
                  Booking Reference: <strong className="font-mono text-[#35B6DE]">{bookingRef}</strong> · Dispatching in <strong className="text-[#111827]">{location.name}</strong>
                </p>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <a
                    href={`tel:${PRIMARY_PHONE}`}
                    className="flex-1 h-11 rounded-xl bg-white border border-[#E5E7EB] text-[#111827] font-bold text-xs flex items-center justify-center gap-2 hover:border-[#35B6DE]"
                  >
                    <Phone className="w-4 h-4 text-[#35B6DE]" />
                    <span>Call Now ({PRIMARY_PHONE})</span>
                  </a>

                  <button
                    onClick={handleWhatsAppForward}
                    className="flex-1 h-11 rounded-xl bg-[#22C55E] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs hover:bg-[#1fa952]"
                  >
                    <MessageSquare className="w-4 h-4 text-white" />
                    <span>WhatsApp Us</span>
                  </button>
                </div>

                <div>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-xs text-[#4B5563] hover:text-[#111827] underline cursor-pointer mt-2"
                  >
                    Submit Another Request
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="text-center mb-6">
                  <span className="text-xs font-bold text-[#35B6DE] uppercase tracking-wider block mb-1">
                    Direct Staging Dispatch
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold font-heading text-[#111827]">
                    Book a Driver in {location.name}
                  </h2>
                  <p className="text-xs sm:text-sm text-[#4B5563] mt-1">
                    Delivered directly to <span className="text-[#35B6DE] font-semibold">info@ontimedriverservice.com</span>.
                  </p>
                </div>

                {errors.form && (
                  <div className="p-3 mb-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
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
                      <label className="block text-xs font-semibold text-[#111827] mb-1">
                        Full Name <span className="text-red-500">*</span>
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
                        className="form-input w-full px-3 py-2 text-xs"
                      />
                      {errors.name && <p className="text-red-500 text-[11px] mt-0.5">{errors.name}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#111827] mb-1">
                        Mobile Number <span className="text-red-500">*</span>
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
                        className="form-input w-full px-3 py-2 text-xs font-medium"
                      />
                      {errors.mobile && <p className="text-red-500 text-[11px] mt-0.5">{errors.mobile}</p>}
                    </div>
                  </div>

                  {/* 3. Email & 4. Location */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-[#111827] mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          if (errors.email) setErrors({ ...errors, email: '' });
                        }}
                        placeholder="name@example.com (optional)"
                        className="form-input w-full px-3 py-2 text-xs"
                      />
                      {errors.email && <p className="text-red-500 text-[11px] mt-0.5">{errors.email}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#111827] mb-1">
                        Location
                      </label>
                      <input
                        type="text"
                        readOnly
                        value={location.name}
                        className="form-input w-full px-3 py-2 text-xs bg-slate-50 cursor-not-allowed text-[#35B6DE] font-bold"
                      />
                    </div>
                  </div>

                  {/* 5. Service Type & 6. Vehicle Type */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-[#111827] mb-1">
                        Service Type
                      </label>
                      <select
                        value={formData.serviceType}
                        onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                        className="form-input w-full px-3 py-2 text-xs bg-white font-medium"
                      >
                        <option value="Personal Driver">Personal Driver</option>
                        <option value="Corporate Driver">Corporate Driver</option>
                        <option value="Permanent Driver">Permanent Driver</option>
                        <option value="Hourly Driver">Hourly Driver</option>
                        <option value="Airport Driver">Airport Driver</option>
                        <option value="Outstation Driver">Outstation Driver</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#111827] mb-1">
                        Vehicle Details
                      </label>
                      <input
                        type="text"
                        value={formData.vehicleType}
                        onChange={(e) => setFormData({ ...formData, vehicleType: e.target.value })}
                        placeholder="e.g. Innova / Honda City"
                        className="form-input w-full px-3 py-2 text-xs"
                      />
                    </div>
                  </div>

                  {/* Date & Time */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-[#111827] mb-1">
                        Date Required
                      </label>
                      <input
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="form-input w-full px-3 py-2 text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#111827] mb-1">
                        Reporting Time
                      </label>
                      <input
                        type="text"
                        value={formData.time}
                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                        placeholder="e.g. 09:00 AM or Immediate"
                        className="form-input w-full px-3 py-2 text-xs"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-semibold text-[#111827] mb-1">
                      Specific Instructions (Optional)
                    </label>
                    <textarea
                      rows={2}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Add pickup address details or duty duration..."
                      className="form-input w-full px-3 py-2 text-xs resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-11 bg-[#F3ED1A] hover:bg-[#eae415] text-[#111827] font-bold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer disabled:opacity-75"
                  >
                    {isSubmitting ? (
                      <span>Dispatching Request...</span>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5 text-[#111827]" />
                        <span>Book Driver in {location.name}</span>
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-between text-[11px] text-[#4B5563] pt-1">
                    <span>✓ Leads sent to info@ontimedriverservice.com</span>
                    <span>✓ 100% Police Verified</span>
                  </div>
                </form>
              </div>
            )}
          </div>

        </div>
      </div>
    </>
  );
};
