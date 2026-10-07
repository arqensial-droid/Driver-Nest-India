import React, { useState } from 'react';
import { servicesData } from '../data/servicesData';
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
  Users,
  FileText,
  Sparkles,
  AlertCircle,
} from 'lucide-react';
import {
  submitLead,
  validateLeadForm,
  getWhatsAppSuccessUrl,
  getWhatsAppFallbackUrl,
  PRIMARY_PHONE,
} from '../services/leadService';
import { BrandLogo } from '../components/BrandLogo';

interface ServiceDetailPageProps {
  slug: string;
  onOpenBooking: (serviceTitle?: string) => void;
}

const SERVICE_FORM_NAMES: Record<string, FormType> = {
  'personal-driver': 'Personal Driver Service Form',
  'hourly-driver': 'Hourly Driver Form',
  'part-time-driver': 'Part-Time Driver Form',
  'full-time-driver': 'Full-Time Driver Form',
  'permanent-driver': 'Permanent Driver Form',
  'corporate-driver': 'Corporate Driver Form',
  'outstation-driver': 'Outstation Driver Form',
  'airport-driver': 'Airport Driver Form',
  'chauffeur-service': 'Chauffeur Service Form',
  'senior-citizen-driver': 'Senior Citizen Driver Form',
  'event-driver': 'Event Driver Form',
  'temporary-driver': 'Temporary Driver Form',
  'family-driver': 'Family Driver Form',
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
    time: 'Priority Dispatch',
    message: '',
    formName,
  });

  const [honeypot, setHoneypot] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingRef, setBookingRef] = useState('');
  const [submissionFailed, setSubmissionFailed] = useState(false);

  if (!service) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 pt-28 pb-16 bg-[#F8FAFC] text-[#111827]">
        <h1 className="text-2xl sm:text-3xl font-bold font-heading text-[#111827] mb-3">Service Not Found</h1>
        <p className="text-[#4B5563] mb-6 max-w-md text-sm">
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
    setSubmissionFailed(false);
    setIsSubmitting(true);

    try {
      const res = await submitLead(formData, formName);
      if (res.success && res.record) {
        setBookingRef(res.record.id);
        setSubmitted(true);
      } else {
        setSubmissionFailed(true);
        setErrors({
          form: res.error || "We couldn't submit your request right now. Please call 8652880057 or contact us on WhatsApp.",
        });
      }
    } catch (err: any) {
      console.error('[SERVICE DETAIL FORM ERROR]', err);
      setSubmissionFailed(true);
      setErrors({
        form: "We couldn't submit your request right now. Please call 8652880057 or contact us on WhatsApp.",
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

  const handleWhatsAppDirect = () => {
    const text = encodeURIComponent(
      `Hello On Time Driver Service, I would like to inquire about ${service.title} in Mumbai. Please share chauffeur availability and rates.`
    );
    window.open(`https://wa.me/918652880057?text=${text}`, '_blank');
  };

  return (
    <div className="bg-[#F8FAFC] text-[#111827] overflow-x-hidden">
      <SEO
        title={`${service.h1Title || service.title} | On Time Driver Service`}
        description={service.metaDescription}
        canonicalPath={`/${service.slug}-service`}
        image={service.image}
      />

      {/* 1. Breadcrumb Bar */}
      <nav aria-label="Breadcrumb" className="bg-white border-b border-[#E5E7EB] pt-24 pb-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ol className="flex items-center gap-1.5 text-xs text-[#4B5563] overflow-x-auto no-scrollbar whitespace-nowrap">
            <li>
              <Link href="/" className="hover:text-[#35B6DE] transition-colors">
                Home
              </Link>
            </li>
            <li><ChevronRight className="w-3.5 h-3.5 text-[#9CA3AF] shrink-0" /></li>
            <li>
              <Link href="/services" className="hover:text-[#35B6DE] transition-colors">
                Driver Services
              </Link>
            </li>
            <li><ChevronRight className="w-3.5 h-3.5 text-[#9CA3AF] shrink-0" /></li>
            <li className="font-semibold text-[#111827] truncate">{service.title}</li>
          </ol>
        </div>
      </nav>

      {/* 2. Hero Section */}
      <section className="py-12 sm:py-16 bg-white border-b border-[#E5E7EB] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EEF8FC] border border-[#35B6DE]/30 shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#35B6DE]" />
                <span className="text-xs font-bold text-[#35B6DE] uppercase tracking-wider">{service.trustStatement}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#111827] tracking-tight font-heading leading-tight">
                {service.h1Title}
              </h1>

              <p className="text-sm sm:text-base text-[#4B5563] font-normal leading-relaxed">
                {service.fullDescription}
              </p>

              {/* Benefits Checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                {service.keyFeatures.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-[#4B5563]">
                    <CheckCircle2 className="w-4 h-4 text-[#22C55E] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              {/* Call to Actions */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-4">
                <button
                  onClick={() => onOpenBooking(service.title)}
                  className="btn-primary h-12 px-7 text-sm sm:text-base font-bold flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                >
                  <Calendar className="w-4 h-4 text-[#111827]" />
                  <span>Request Driver</span>
                </button>

                <a
                  href="tel:8652880057"
                  className="btn-secondary h-12 px-6 text-sm font-semibold flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4 text-[#35B6DE]" />
                  <span>Call 8652880057</span>
                </a>

                <button
                  onClick={handleWhatsAppDirect}
                  className="h-12 px-5 rounded-xl bg-[#25D366] text-white font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#20ba59] transition-colors cursor-pointer shadow-xs"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp</span>
                </button>
              </div>

              <div className="text-xs text-[#4B5563] pt-2 flex flex-wrap items-center gap-4">
                <span>✓ Police Clearance Verified</span>
                <span>✓ Local Mumbai Route Specialists</span>
                <span>✓ Priority Doorstep Dispatch</span>
              </div>
            </div>

            {/* Right Media (16:9 Image with Light Border) */}
            <div className="lg:col-span-5">
              <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-[#E5E7EB] shadow-xs bg-slate-100">
                <ImageWithFallback
                  src={service.image}
                  alt={`${service.title} in Mumbai`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm border border-[#E5E7EB] px-3 py-1.5 rounded-lg text-xs font-semibold text-[#111827] shadow-xs">
                  {service.vehicleTag}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Service Details & Who Is This For */}
      <section className="py-14 sm:py-20 bg-[#EEF8FC] border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-[#35B6DE] block mb-2">
              Comprehensive Service Overview
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111827] font-heading">
              Why Choose Our {service.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
            <div className="bg-white p-6 sm:p-7 rounded-2xl border border-[#E5E7EB] shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-[#EEF8FC] border border-[#35B6DE]/30 text-[#35B6DE] flex items-center justify-center mb-3">
                <FileCheck2 className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-[#111827] mb-2 font-heading">What Is It?</h3>
              <p className="text-sm text-[#4B5563] leading-relaxed font-normal">
                {service.serviceOverview.whatIs}
              </p>
            </div>

            <div className="bg-white p-6 sm:p-7 rounded-2xl border border-[#E5E7EB] shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-[#FEF9C3] border border-[#F3ED1A] text-[#854D0E] flex items-center justify-center mb-3">
                <Users className="w-5 h-5 text-[#854D0E]" />
              </div>
              <h3 className="text-lg font-bold text-[#111827] mb-2 font-heading">Who Is It For?</h3>
              <p className="text-sm text-[#4B5563] leading-relaxed font-normal">
                {service.serviceOverview.whoSuitable}
              </p>
            </div>

            <div className="bg-white p-6 sm:p-7 rounded-2xl border border-[#E5E7EB] shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-[#EEF8FC] border border-[#35B6DE]/30 text-[#35B6DE] flex items-center justify-center mb-3">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-[#111827] mb-2 font-heading">How We Support You</h3>
              <p className="text-sm text-[#4B5563] leading-relaxed font-normal">
                {service.serviceOverview.howOtdsHelps || 'We provide police-verified chauffeurs with zero recruitment hassle, fast replacement guarantees, and transparent pricing.'}
              </p>
            </div>
          </div>

          {/* Use Cases Deep Dive */}
          {service.useCases && service.useCases.length > 0 && (
            <div className="mb-14">
              <h3 className="text-xl sm:text-2xl font-bold text-[#111827] font-heading mb-6">
                Common Mumbai Transit Scenarios
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {service.useCases.map((uc, i) => (
                  <div key={i} className="bg-white p-6 rounded-2xl border border-[#E5E7EB] shadow-xs">
                    <div className="text-xs font-bold text-[#35B6DE] mb-1">Route: {uc.route}</div>
                    <h4 className="text-base font-bold text-[#111827] mb-2 font-heading">{uc.title}</h4>
                    <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed">{uc.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* FAQs Accordion */}
          {service.faqs && service.faqs.length > 0 && (
            <div className="mb-14">
              <h3 className="text-xl sm:text-2xl font-bold text-[#111827] font-heading mb-6">
                Frequently Asked Questions About {service.title}
              </h3>
              <div className="space-y-3 max-w-4xl">
                {service.faqs.map((faq, idx) => {
                  const isOpen = openFaqIndex === idx;
                  return (
                    <div key={idx} className="bg-white rounded-xl border border-[#E5E7EB] overflow-hidden shadow-xs">
                      <button
                        onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                        className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-[#111827] cursor-pointer"
                      >
                        <span>{faq.question}</span>
                        <ChevronDown className={`w-4 h-4 text-[#35B6DE] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
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
          )}

          {/* 4. Complete Lead Booking Form */}
          <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6 sm:p-8 shadow-md max-w-3xl mx-auto">
            {!submitted ? (
              <div>
                <div className="text-center mb-6">
                  <div className="flex justify-center mb-2">
                    <BrandLogo size="md" />
                  </div>
                  <h3 className="text-2xl font-extrabold text-[#111827] font-heading">
                    Instant Driver Booking
                  </h3>
                  <p className="text-xs sm:text-sm text-[#4B5563] mt-1">
                    Fill your details and our team will contact you shortly.
                  </p>
                </div>

                {errors.form && (
                  <div className="p-4 mb-5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs space-y-2">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0 text-red-500 mt-0.5" />
                      <span className="font-semibold">{errors.form}</span>
                    </div>
                    {submissionFailed && (
                      <div className="pt-2 flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={handleWhatsAppFallback}
                          className="px-3 py-1.5 rounded-lg bg-[#25D366] text-white text-xs font-bold flex items-center gap-1.5 hover:bg-[#20ba5a]"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>WhatsApp Us Directly</span>
                        </button>
                        <a
                          href={`tel:${PRIMARY_PHONE}`}
                          className="px-3 py-1.5 rounded-lg bg-[#35B6DE] text-white text-xs font-bold flex items-center gap-1.5"
                        >
                          <Phone className="w-3.5 h-3.5" />
                          <span>Call {PRIMARY_PHONE}</span>
                        </a>
                      </div>
                    )}
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
                      <label className="block text-xs font-semibold text-[#111827] mb-1.5">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-3.5 w-4 h-4 text-[#9CA3AF]" />
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => {
                            setFormData({ ...formData, name: e.target.value });
                            if (errors.name) setErrors({ ...errors, name: '' });
                          }}
                          placeholder="Your full name"
                          className="form-input w-full pl-10 pr-3 py-2.5 text-xs sm:text-sm"
                        />
                      </div>
                      {errors.name && <p className="text-red-500 text-[11px] mt-1">{errors.name}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#111827] mb-1.5">
                        Mobile Number <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3.5 top-3.5 w-4 h-4 text-[#9CA3AF]" />
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
                          className="form-input w-full pl-10 pr-3 py-2.5 text-xs sm:text-sm font-medium"
                        />
                      </div>
                      {errors.mobile && <p className="text-red-500 text-[11px] mt-1">{errors.mobile}</p>}
                    </div>
                  </div>

                  {/* 3. Email & 4. Location */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-semibold text-[#111827] mb-1.5">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-[#9CA3AF]" />
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => {
                            setFormData({ ...formData, email: e.target.value });
                            if (errors.email) setErrors({ ...errors, email: '' });
                          }}
                          placeholder="name@example.com (optional)"
                          className="form-input w-full pl-10 pr-3 py-2.5 text-xs sm:text-sm"
                        />
                      </div>
                      {errors.email && <p className="text-red-500 text-[11px] mt-1">{errors.email}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#111827] mb-1.5">
                        Pickup Location <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3.5 top-3.5 w-4 h-4 text-[#9CA3AF]" />
                        <select
                          value={formData.location}
                          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                          className="form-input w-full pl-10 pr-3 py-2.5 appearance-none text-xs sm:text-sm bg-white"
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
                      <label className="block text-xs font-semibold text-[#111827] mb-1.5">
                        Service Type
                      </label>
                      <div className="relative">
                        <Car className="absolute left-3.5 top-3.5 w-4 h-4 text-[#9CA3AF]" />
                        <input
                          type="text"
                          readOnly
                          value={service.title}
                          className="form-input w-full pl-10 pr-3 py-2.5 bg-slate-50 cursor-not-allowed text-[#35B6DE] font-bold text-xs sm:text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#111827] mb-1.5">
                        Vehicle Type
                      </label>
                      <div className="relative">
                        <Car className="absolute left-3.5 top-3.5 w-4 h-4 text-[#9CA3AF]" />
                        <select
                          value={formData.vehicleType}
                          onChange={(e) => setFormData({ ...formData, vehicleType: e.target.value })}
                          className="form-input w-full pl-10 pr-3 py-2.5 appearance-none text-xs sm:text-sm bg-white"
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
                      <label className="block text-xs font-semibold text-[#111827] mb-1.5">
                        Date Required
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3.5 top-3.5 w-4 h-4 text-[#9CA3AF]" />
                        <input
                          type="date"
                          value={formData.date}
                          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                          className="form-input w-full pl-10 pr-3 py-2.5 text-xs sm:text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#111827] mb-1.5">
                        Time / Shift
                      </label>
                      <div className="relative">
                        <Clock className="absolute left-3.5 top-3.5 w-4 h-4 text-[#9CA3AF]" />
                        <select
                          value={formData.time}
                          onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                          className="form-input w-full pl-10 pr-3 py-2.5 appearance-none text-xs sm:text-sm bg-white"
                        >
                          <option value="Priority Dispatch">Priority Dispatch</option>
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
                    <label className="block text-xs font-semibold text-[#111827] mb-1.5">
                      Specific Instructions (Optional)
                    </label>
                    <div className="relative">
                      <FileText className="absolute left-3.5 top-3 w-4 h-4 text-[#9CA3AF]" />
                      <textarea
                        rows={2}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Car make & model, manual or automatic transmission, flight number (if airport)..."
                        className="form-input w-full pl-10 pr-3 py-2.5 text-xs sm:text-sm"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full h-[52px] text-sm sm:text-base font-bold flex items-center justify-center gap-2 mt-4 shadow-xs cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-[#111827] border-t-transparent rounded-full animate-spin" />
                        <span>Submitting...</span>
                      </span>
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-[#111827]" />
                        <span>Request Driver</span>
                      </>
                    )}
                  </button>

                  <div className="flex flex-wrap items-center justify-between text-[11px] text-[#4B5563] pt-1">
                    <span>✓ Delivered to info@ontimedriverservice.com</span>
                    <span>✓ Guaranteed verified driver replacement</span>
                  </div>
                </form>
              </div>
            ) : (
              /* Standardized Confirmation Screen */
              <div className="text-center py-8 animate-fade-in">
                <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-500 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <h3 className="text-xl sm:text-2xl font-extrabold text-[#111827] mb-2 leading-tight font-heading">
                  Thank you for your enquiry. Our team will contact you shortly.
                </h3>

                <p className="text-sm text-[#4B5563] mb-5">
                  Reference: <span className="font-mono font-bold text-[#111827] bg-[#EEF8FC] px-2 py-0.5 rounded">{bookingRef}</span>
                </p>

                <div className="bg-[#F8FAFC] rounded-xl p-4 border border-[#E5E7EB] text-left text-xs space-y-2 mb-6 text-[#4B5563]">
                  <p>• <strong>Delivered To:</strong> info@ontimedriverservice.com</p>
                  <p>• <strong>Customer:</strong> {formData.name} (+91 {formData.mobile})</p>
                  <p>• <strong>Service:</strong> {service.title} ({formData.vehicleType})</p>
                  <p>• <strong>Location:</strong> {formData.location}</p>
                  <p>• <strong>Timing:</strong> {formData.date} at {formData.time}</p>
                </div>

                {/* Call Now and WhatsApp Us Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href={`tel:${PRIMARY_PHONE}`}
                    className="flex-1 h-12 rounded-xl bg-[#35B6DE] text-white font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#2ca0c4] transition-all shadow-xs"
                  >
                    <Phone className="w-4 h-4 text-white" />
                    <span>Call Now ({PRIMARY_PHONE})</span>
                  </a>

                  <button
                    onClick={handleWhatsAppForward}
                    className="flex-1 h-12 rounded-xl bg-[#25D366] text-white font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#20ba59] transition-all shadow-xs cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4 text-white" />
                    <span>WhatsApp Us</span>
                  </button>
                </div>

                <div className="mt-4">
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-xs text-[#35B6DE] hover:underline cursor-pointer font-semibold"
                  >
                    Book Another Service
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* 5. Bottom Call Now & WhatsApp CTA Banner */}
      <section className="py-14 sm:py-16 bg-white text-[#111827] border-t border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-[#111827]">
            Need an Immediate Driver for {service.title}?
          </h2>
          <p className="text-sm text-[#4B5563] max-w-xl mx-auto">
            Our 24/7 concierge is on standby across Mumbai, Thane, Navi Mumbai, Mira Road, Vasai, Virar &amp; Palghar.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3.5 pt-3">
            <a
              href="tel:8652880057"
              className="btn-primary h-12 px-7 text-sm sm:text-base font-bold flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-[#111827]" />
              <span>Call Now: 8652880057</span>
            </a>
            <button
              onClick={handleWhatsAppDirect}
              className="btn-secondary h-12 px-7 text-sm sm:text-base font-bold flex items-center gap-2 cursor-pointer"
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
