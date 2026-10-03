import React, { useState } from 'react';
import { servicesData } from '../data/servicesData';
import { testimonialsData } from '../data/testimonialsData';
import { FormType, LeadFormData } from '../types';
import { Link, useRouter, SEO } from '../router';
import { ImageWithFallback } from '../components/ImageWithFallback';
import {
  ShieldCheck,
  Calendar,
  MessageSquare,
  Phone,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Clock,
  MapPin,
  Car,
  User,
  Mail,
  Send,
  ChevronDown,
  FileCheck2,
  Award,
  Users,
  Briefcase,
  Home,
  Star,
  FileText,
  Sparkles,
  AlertCircle,
} from 'lucide-react';
import { submitLead, validateLeadForm } from '../services/leadService';

interface ServiceDetailPageProps {
  slug: string;
  onOpenBooking: (serviceTitle?: string) => void;
}

const SERVICE_FORM_NAMES: Record<string, FormType> = {
  'corporate-driver': 'Corporate Driver Request Form',
  'chauffeur-service': 'Chauffeur Request Form',
  'airport-driver': 'Airport Transfer Request Form',
  'personal-driver': 'Driver Requirement Form',
  'full-time-driver': 'Driver Requirement Form',
  'part-time-driver': 'Driver Requirement Form',
  'temporary-driver': 'Driver Requirement Form',
  'hourly-driver': 'Quick Booking Form',
  'outstation-driver': 'Driver Requirement Form',
};

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({ slug, onOpenBooking }) => {
  const { navigate } = useRouter();
  const service = servicesData.find((s) => s.slug === slug);

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const formName: FormType = service ? SERVICE_FORM_NAMES[service.slug] || 'Driver Requirement Form' : 'Driver Requirement Form';

  const [formData, setFormData] = useState<LeadFormData>({
    name: '',
    mobile: '',
    email: '',
    location: 'Mumbai (BKC, South Mumbai, Suburbs)',
    serviceType: service?.title || 'Personal Driver',
    vehicleType: 'Toyota Innova Crysta / Hycross',
    date: new Date().toISOString().split('T')[0],
    time: 'Immediate Dispatch (30-45 mins)',
    message: '',
    formName,
  });

  const [honeypot, setHoneypot] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  if (!service) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 pt-24 pb-16 bg-[#0A0A0A] text-white">
        <h1 className="text-2xl sm:text-3xl font-bold font-heading text-white mb-3">Service Not Found</h1>
        <p className="text-neutral-400 mb-6 max-w-md text-sm">
          The requested driver service could not be located. Explore our range of verified driver solutions.
        </p>
        <Link href="/services" className="btn-primary">
          <span>View All Driver Services</span>
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
      const res = await submitLead(formData, formName);
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

  const handleWhatsAppDirect = () => {
    const text = encodeURIComponent(
      `Hello On Time Driver Service, I would like to inquire about ${service.title} in Mumbai. Please share chauffeur availability and rates.`
    );
    window.open(`https://wa.me/918652880057?text=${text}`, '_blank');
  };

  return (
    <div className="bg-[#0A0A0A] text-white overflow-x-hidden">
      <SEO
        title={`${service.h1Title || service.title} | On Time Driver Service`}
        description={service.metaDescription}
        canonicalPath={`/${service.slug}-service`}
        image={service.image}
      />

      {/* 1. Breadcrumb Bar */}
      <nav aria-label="Breadcrumb" className="bg-[#0A0A0A] border-b border-white/10 pt-24 pb-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ol className="flex items-center gap-1.5 text-xs text-neutral-400 overflow-x-auto no-scrollbar whitespace-nowrap">
            <li>
              <Link href="/" className="hover:text-[#35B5D8] transition-colors">
                Home
              </Link>
            </li>
            <li><ChevronRight className="w-3.5 h-3.5 text-neutral-600 shrink-0" /></li>
            <li>
              <Link href="/services" className="hover:text-[#35B5D8] transition-colors">
                Driver Services
              </Link>
            </li>
            <li><ChevronRight className="w-3.5 h-3.5 text-neutral-600 shrink-0" /></li>
            <li className="font-semibold text-white truncate">{service.title}</li>
          </ol>
        </div>
      </nav>

      {/* 2. Hero Section */}
      <section className="py-12 sm:py-20 bg-[#0A0A0A] border-b border-white/10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#121212] border border-[#35B5D8]/40 shadow-md">
                <Sparkles className="w-3.5 h-3.5 text-[#F2F028]" />
                <span className="text-xs font-bold text-[#35B5D8] uppercase tracking-wider">{service.trustStatement}</span>
              </div>

              <h1 className="text-h1 text-white font-extrabold tracking-tight">
                {service.h1Title}
              </h1>

              <p className="text-subheading text-[#D1D5DB] font-normal leading-relaxed">
                {service.fullDescription}
              </p>

              {/* Benefits Checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {service.keyFeatures.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-neutral-300">
                    <CheckCircle2 className="w-4 h-4 text-[#35B5D8] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              {/* Call to Actions */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-4">
                <button
                  onClick={() => onOpenBooking(service.title)}
                  className="btn-primary h-[52px] px-8 text-base font-bold flex items-center justify-center gap-2 shadow-lg shadow-[#F2F028]/20"
                >
                  <Calendar className="w-4 h-4 text-[#0A0A0A]" />
                  <span>Book {service.title}</span>
                </button>

                <a
                  href="tel:8652880057"
                  className="btn-secondary h-[52px] px-6 text-sm font-semibold flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4 text-[#35B5D8]" />
                  <span>Call 8652880057</span>
                </a>

                <button
                  onClick={handleWhatsAppDirect}
                  className="h-[52px] px-5 rounded-xl bg-[#25D366]/20 border border-[#25D366]/40 text-[#25D366] font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#25D366]/30 transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp</span>
                </button>
              </div>

              <div className="text-xs text-neutral-400 pt-2 flex items-center gap-4">
                <span>✓ Police Clearance Verified</span>
                <span>✓ Local Mumbai Route Specialists</span>
                <span>✓ 30–45 Min Dispatch</span>
              </div>
            </div>

            {/* Right Media (16:9 Image with Dark Overlay) */}
            <div className="lg:col-span-5">
              <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-white/15 shadow-2xl bg-[#121212]">
                <ImageWithFallback
                  src={service.image}
                  alt={`${service.title} in Mumbai`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3 bg-[#121212]/90 border border-white/10 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#F2F028] shadow-md">
                  {service.vehicleTag}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Service Details & Who Is This For */}
      <section className="py-16 sm:py-24 bg-[#0A0A0A] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#35B5D8] block mb-2">
              Comprehensive Service Overview
            </span>
            <h2 className="text-h2 font-extrabold text-white">
              Why Choose Our {service.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="bg-[#121212] p-6 sm:p-7 rounded-2xl border border-white/10 shadow-xl">
              <div className="w-10 h-10 rounded-xl bg-[#35B5D8]/15 border border-[#35B5D8]/30 text-[#35B5D8] flex items-center justify-center mb-3">
                <FileCheck2 className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">What Is It?</h3>
              <p className="text-sm text-[#D1D5DB] leading-relaxed font-normal">
                {service.serviceOverview.whatIs}
              </p>
            </div>

            <div className="bg-[#121212] p-6 sm:p-7 rounded-2xl border border-white/10 shadow-xl">
              <div className="w-10 h-10 rounded-xl bg-[#F2F028]/15 border border-[#F2F028]/30 text-[#F2F028] flex items-center justify-center mb-3">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Who Is It For?</h3>
              <p className="text-sm text-[#D1D5DB] leading-relaxed font-normal">
                {service.serviceOverview.whoSuitable}
              </p>
            </div>

            <div className="bg-[#121212] p-6 sm:p-7 rounded-2xl border border-white/10 shadow-xl">
              <div className="w-10 h-10 rounded-xl bg-[#35B5D8]/15 border border-[#35B5D8]/30 text-[#35B5D8] flex items-center justify-center mb-3">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">How We Support You</h3>
              <p className="text-sm text-[#D1D5DB] leading-relaxed font-normal">
                {service.serviceOverview.howOtdsHelps || 'We provide police-verified chauffeurs with zero recruitment hassle, fast replacement guarantees, and transparent pricing.'}
              </p>
            </div>
          </div>

          {/* Use Cases Deep Dive */}
          {service.useCases && service.useCases.length > 0 && (
            <div className="mb-14">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-6">
                Common Mumbai Transit Scenarios
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {service.useCases.map((uc, i) => (
                  <div key={i} className="bg-[#121212] p-6 rounded-2xl border border-white/10">
                    <div className="text-xs font-bold text-[#F2F028] mb-1">Route: {uc.route}</div>
                    <h4 className="text-base font-bold text-white mb-2">{uc.title}</h4>
                    <p className="text-xs sm:text-sm text-[#D1D5DB] leading-relaxed">{uc.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* FAQs Accordion */}
          {service.faqs && service.faqs.length > 0 && (
            <div className="mb-16">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-6">
                Frequently Asked Questions About {service.title}
              </h3>
              <div className="space-y-3.5 max-w-4xl">
                {service.faqs.map((faq, idx) => {
                  const isOpen = openFaqIndex === idx;
                  return (
                    <div key={idx} className="bg-[#121212] rounded-xl border border-white/10 overflow-hidden">
                      <button
                        onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                        className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-white"
                      >
                        <span>{faq.question}</span>
                        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180 text-[#35B5D8]' : ''}`} />
                      </button>
                      {isOpen && (
                        <div className="px-5 pb-5 text-sm text-[#D1D5DB] leading-relaxed border-t border-white/5 pt-3">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 4. Complete 9-Field Lead Booking Form */}
          <div className="bg-[#121212] rounded-2xl border border-white/15 p-6 sm:p-8 shadow-2xl max-w-3xl mx-auto">
            {!submitted ? (
              <div>
                <div className="text-center mb-6">
                  <span className="text-xs font-bold text-[#35B5D8] uppercase tracking-wider block mb-1">
                    Instant Booking Concierge
                  </span>
                  <h3 className="text-2xl font-extrabold text-white">
                    Book {service.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#D1D5DB] mt-1">
                    All 9 fields below are delivered to <span className="text-[#35B5D8]">info@ontimedriverservice.com</span>. We allocate your driver within 15–30 minutes.
                  </p>
                </div>

                {errors.form && (
                  <div className="p-3 mb-4 rounded-xl bg-red-950/60 border border-red-500/40 text-red-200 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                    <span>{errors.form}</span>
                  </div>
                )}

                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <input
                    type="text"
                    name="bot_protection_field"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                    className="hidden"
                  />

                  {/* 1. Name & 2. Mobile */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                        Full Name <span className="text-[#F2F028]">*</span>
                      </label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-3.5 w-4 h-4 text-neutral-400" />
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => {
                            setFormData({ ...formData, name: e.target.value });
                            if (errors.name) setErrors({ ...errors, name: '' });
                          }}
                          placeholder="Your full name"
                          className="dark-input w-full pl-10 pr-3 py-2.5"
                        />
                      </div>
                      {errors.name && <p className="text-red-400 text-[11px] mt-1">{errors.name}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                        Mobile Number <span className="text-[#F2F028]">*</span>
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3.5 top-3.5 w-4 h-4 text-neutral-400" />
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
                          className="dark-input w-full pl-10 pr-3 py-2.5"
                        />
                      </div>
                      {errors.mobile && <p className="text-red-400 text-[11px] mt-1">{errors.mobile}</p>}
                    </div>
                  </div>

                  {/* 3. Email & 4. Location */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                        Email Address <span className="text-[#F2F028]">*</span>
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-neutral-400" />
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => {
                            setFormData({ ...formData, email: e.target.value });
                            if (errors.email) setErrors({ ...errors, email: '' });
                          }}
                          placeholder="name@example.com"
                          className="dark-input w-full pl-10 pr-3 py-2.5"
                        />
                      </div>
                      {errors.email && <p className="text-red-400 text-[11px] mt-1">{errors.email}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                        Pickup Location <span className="text-[#F2F028]">*</span>
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3.5 top-3.5 w-4 h-4 text-neutral-400" />
                        <select
                          value={formData.location}
                          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                          className="dark-input w-full pl-10 pr-3 py-2.5 appearance-none"
                        >
                          <option value="Mumbai (BKC, South Mumbai, Suburbs)">Mumbai (BKC / South Mumbai / Suburbs)</option>
                          <option value="Bandra / Khar / Juhu / Andheri">Bandra / Khar / Juhu / Andheri</option>
                          <option value="Worli / Lower Parel / Marine Lines">Worli / Lower Parel / Marine Lines</option>
                          <option value="Powai / Ghatkopar / Mulund">Powai / Ghatkopar / Mulund</option>
                          <option value="Thane (Majiwada, Ghodbunder)">Thane (Majiwada / Ghodbunder)</option>
                          <option value="Navi Mumbai (Vashi, Nerul, Belapur)">Navi Mumbai (Vashi / Nerul / Belapur)</option>
                          <option value="Mira Road & Bhayandar">Mira Road &amp; Bhayandar</option>
                          <option value="Vasai, Virar & Palghar">Vasai, Virar &amp; Palghar</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* 5. Service Type & 6. Vehicle Type */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                        Service Type
                      </label>
                      <div className="relative">
                        <Car className="absolute left-3.5 top-3.5 w-4 h-4 text-neutral-400" />
                        <input
                          type="text"
                          readOnly
                          value={service.title}
                          className="dark-input w-full pl-10 pr-3 py-2.5 opacity-80 cursor-not-allowed text-[#35B5D8] font-bold"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                        Vehicle Type
                      </label>
                      <div className="relative">
                        <Car className="absolute left-3.5 top-3.5 w-4 h-4 text-neutral-400" />
                        <select
                          value={formData.vehicleType}
                          onChange={(e) => setFormData({ ...formData, vehicleType: e.target.value })}
                          className="dark-input w-full pl-10 pr-3 py-2.5 appearance-none"
                        >
                          <option value="Toyota Innova Crysta / Hycross">Toyota Innova Crysta / Hycross</option>
                          <option value="Sedan (Honda City / Dzire / Verna)">Sedan (Honda City / Dzire / Verna)</option>
                          <option value="SUV (Creta / Fortuner / Seltos)">SUV (Creta / Fortuner / Seltos)</option>
                          <option value="Luxury (Mercedes / BMW / Audi)">Luxury (Mercedes / BMW / Audi)</option>
                          <option value="Hatchback (Swift / i20 / Baleno)">Hatchback (Swift / i20 / Baleno)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* 7. Date & 8. Time */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                        Date Required
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3.5 top-3.5 w-4 h-4 text-neutral-400" />
                        <input
                          type="date"
                          value={formData.date}
                          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                          className="dark-input w-full pl-10 pr-3 py-2.5"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                        Time / Shift
                      </label>
                      <div className="relative">
                        <Clock className="absolute left-3.5 top-3.5 w-4 h-4 text-neutral-400" />
                        <select
                          value={formData.time}
                          onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                          className="dark-input w-full pl-10 pr-3 py-2.5 appearance-none"
                        >
                          <option value="Immediate Dispatch (30-45 mins)">Immediate Dispatch (30–45 mins)</option>
                          <option value="Morning Shift (07:00 AM - 03:00 PM)">Morning Shift (07:00 AM – 03:00 PM)</option>
                          <option value="General Office Hours (09:00 AM - 07:00 PM)">General Office Hours (09:00 AM – 07:00 PM)</option>
                          <option value="Evening Return (05:00 PM - 01:00 AM)">Evening Return (05:00 PM – 01:00 AM)</option>
                          <option value="Outstation Multi-Day Schedule">Outstation Multi-Day Schedule</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* 9. Message */}
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                      Specific Instructions (Optional)
                    </label>
                    <div className="relative">
                      <FileText className="absolute left-3.5 top-3 w-4 h-4 text-neutral-400" />
                      <textarea
                        rows={2}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Car make & model, manual or automatic transmission, flight number (if airport)..."
                        className="dark-input w-full pl-10 pr-3 py-2.5 text-xs"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full h-[54px] text-base font-bold flex items-center justify-center gap-2 mt-4 shadow-xl shadow-[#F2F028]/25"
                  >
                    {isSubmitting ? (
                      <span>Sending to info@ontimedriverservice.com...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-[#0A0A0A]" />
                        <span>Submit Booking &amp; Allocate Chauffeur</span>
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-between text-[11px] text-neutral-400 pt-1">
                    <span>✓ Delivered to info@ontimedriverservice.com</span>
                    <span>✓ Guaranteed verified driver replacement</span>
                  </div>
                </form>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-[#35B5D8]/20 border border-[#35B5D8] text-[#35B5D8] flex items-center justify-center mx-auto mb-4 animate-bounce">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-extrabold text-white mb-2">
                  Booking Request Received!
                </h3>
                <p className="text-sm text-[#D1D5DB] mb-5">
                  Reference: <span className="font-mono font-bold text-[#F2F028]">{bookingRef}</span>
                </p>
                <div className="bg-[#181818] rounded-xl p-4 border border-white/10 text-left text-xs space-y-2 mb-6 text-neutral-300">
                  <p>• <strong>Delivered To:</strong> info@ontimedriverservice.com</p>
                  <p>• <strong>Customer:</strong> {formData.name} (+91 {formData.mobile})</p>
                  <p>• <strong>Service:</strong> {service.title} ({formData.vehicleType})</p>
                  <p>• <strong>Timing:</strong> {formData.date} at {formData.time}</p>
                </div>
                <button
                  onClick={() => setSubmitted(false)}
                  className="btn-primary h-[50px] px-8 text-sm font-bold"
                >
                  Book Another Service
                </button>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* 5. Bottom Call Now & WhatsApp CTA Banner */}
      <section className="py-16 bg-[#050505] text-white border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
            Need an Immediate Driver for {service.title}?
          </h2>
          <p className="text-sm text-[#D1D5DB] max-w-xl mx-auto">
            Our 24/7 concierge is on standby across Mumbai, Thane, Navi Mumbai, Mira Road, Vasai, Virar &amp; Palghar.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3.5 pt-4">
            <a
              href="tel:8652880057"
              className="btn-primary h-[52px] px-8 text-base font-bold flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-[#0A0A0A]" />
              <span>Call Now: +91 8652880057</span>
            </a>
            <button
              onClick={handleWhatsAppDirect}
              className="btn-secondary h-[52px] px-8 text-base font-bold flex items-center gap-2 text-white"
            >
              <MessageSquare className="w-4 h-4 text-[#25D366]" />
              <span>WhatsApp Concierge</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
