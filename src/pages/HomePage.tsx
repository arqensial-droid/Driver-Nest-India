import React from 'react';
import { servicesData } from '../data/servicesData';
import { locationsData } from '../data/locationsData';
import { faqsData } from '../data/faqsData';
import { Hero } from '../components/Hero';
import { SocialProofSection } from '../components/SocialProofSection';
import { LeadFormSection } from '../components/LeadFormSection';
import { ImageWithFallback } from '../components/ImageWithFallback';
import { Link, SEO } from '../router';
import {
  ShieldCheck,
  CheckCircle2,
  Calendar,
  MessageSquare,
  ArrowRight,
  MapPin,
  Clock,
  Sparkles,
  Award,
  Zap,
  HelpCircle,
  Car,
  Check,
} from 'lucide-react';

interface HomePageProps {
  onOpenBooking: (serviceTitle?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenBooking }) => {
  const homeSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    'name': 'Driver Nest India',
    'image': 'https://drivernestindia.com/images/services/chauffeur-service.jpg',
    '@id': 'https://drivernestindia.com',
    'url': 'https://drivernestindia.com',
    'telephone': '+91-9930012345',
    'priceRange': '$$',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': 'Bandra Kurla Complex (BKC)',
      'addressLocality': 'Mumbai',
      'addressRegion': 'Maharashtra',
      'postalCode': '400051',
      'addressCountry': 'IN'
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': 19.0664,
      'longitude': 72.8687
    },
    'areaServed': [
      'Mumbai',
      'Thane',
      'Navi Mumbai',
      'Mira Road',
      'Bhayandar',
      'Panvel',
      'Kalyan',
      'Dombivli'
    ]
  };

  return (
    <>
      <SEO
        title="Driver Nest India – Professional Driver & Chauffeur Services in Mumbai"
        description="Hire verified, police-screened drivers in Mumbai for personal cars, corporate fleets, outstation trips, airport transfers & monthly retainers. 30-45 min dispatch."
        canonicalPath="/"
        image="/images/services/chauffeur-service.jpg"
        schema={homeSchema}
      />

      <div className="bg-black text-white overflow-x-hidden">
        {/* 1. Hero Section */}
        <Hero onOpenBooking={() => onOpenBooking()} />

        {/* 2. Trust Indicators Strip */}
        <section className="py-6 sm:py-8 bg-[#080808] border-t border-b border-neutral-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 text-center">
              <div className="p-2 sm:p-3">
                <span className="text-xl sm:text-2xl font-bold font-mono text-[#D4AF37] block">100%</span>
                <span className="text-[11px] sm:text-xs text-neutral-400">Police Verified Roster</span>
              </div>
              <div className="p-2 sm:p-3">
                <span className="text-xl sm:text-2xl font-bold font-mono text-[#D4AF37] block">30–45 Mins</span>
                <span className="text-[11px] sm:text-xs text-neutral-400">Average Mumbai Dispatch</span>
              </div>
              <div className="p-2 sm:p-3">
                <span className="text-xl sm:text-2xl font-bold font-mono text-[#D4AF37] block">5+ Years</span>
                <span className="text-[11px] sm:text-xs text-neutral-400">Minimum Track Record</span>
              </div>
              <div className="p-2 sm:p-3">
                <span className="text-xl sm:text-2xl font-bold font-mono text-[#D4AF37] block">Zero Lock-In</span>
                <span className="text-[11px] sm:text-xs text-neutral-400">No Advance Brokerage</span>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Short About Section (Concise for Homepage - 32px Mobile Rhythm) */}
        <section className="py-8 sm:py-16 bg-black border-b border-neutral-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
              <div className="lg:col-span-6">
                <div className="text-[11px] font-semibold tracking-widest uppercase text-[#D4AF37] mb-2 font-mono">
                  About Driver Nest India
                </div>
                <h2 className="text-h2 text-white mb-3">
                  Mumbai&apos;s Gold Standard in <span className="gold-gradient-text">Private Chauffeuring</span>
                </h2>
                <p className="text-body-lead text-neutral-300 font-light mb-5">
                  Driver Nest India provides discerning car owners, corporate institutions, and families with vetted,
                  police-cleared drivers trained for modern Indian vehicular dynamics—from Toyota Innova Crysta and Honda City
                  to luxury Mercedes-Benz and BMW sedans.
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <Link href="/about" className="btn-secondary">
                    <span>Learn More About Us</span>
                    <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
                  </Link>
                  <button onClick={() => onOpenBooking()} className="btn-primary">
                    <span>Book a Driver</span>
                  </button>
                </div>
              </div>

              <div className="lg:col-span-6 rounded-2xl overflow-hidden border border-[#D4AF37]/30 aspect-video shadow-2xl relative">
                <ImageWithFallback
                  src="/images/services/personal-driver.jpg"
                  alt="Professional Indian family driver beside Honda City"
                  fallbackTitle="Driver Nest India Family Chauffeur"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* 4. Driver Services Grid (Concise Cards with "Explore Service" Button) */}
        <section id="services" className="py-8 sm:py-16 lg:py-20 bg-[#060606] border-b border-neutral-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
              <div className="text-[11px] font-semibold tracking-widest uppercase text-[#D4AF37] mb-2 font-mono">
                Bespoke Chauffeur Solutions
              </div>
              <h2 className="text-h2 text-white mb-3">
                Professional Driver Services <span className="gold-gradient-text">for Every Requirement</span>
              </h2>
              <p className="text-body-lead text-neutral-400 font-light">
                Each service is backed by specialized vehicle training, verified police clearance dossiers, and seamless standby replacements.
              </p>
            </div>

            {/* 12 Concise Service Cards - 16px mobile card gap and 16px padding */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 items-stretch">
              {servicesData.map((svc) => (
                <div
                  key={svc.id}
                  className="glass-card glass-card-hover rounded-2xl overflow-hidden border border-[#D4AF37]/25 flex flex-col justify-between h-full group"
                >
                  <div>
                    {/* Consistent 16:9 Image Aspect Ratio */}
                    <div className="relative aspect-video overflow-hidden bg-neutral-950">
                      <ImageWithFallback
                        src={svc.image}
                        alt={svc.sceneDescription}
                        fallbackTitle={svc.title}
                        vehicleTag={svc.vehicleTag}
                        locationTag={svc.locationTag}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent pointer-events-none" />
                      
                      {/* Non-overlapping, wrapping badge container */}
                      <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-1.5 z-10 pointer-events-none">
                        <span className="text-[10px] sm:text-[11px] font-semibold text-white px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md bg-black/85 backdrop-blur-md border border-[#D4AF37]/35 whitespace-normal max-w-[85%] leading-tight">
                          {svc.badge}
                        </span>
                      </div>
                    </div>

                    {/* 16px mobile padding (p-4 sm:p-6) */}
                    <div className="p-4 sm:p-6">
                      <span className="text-[10px] sm:text-[11px] font-semibold text-[#E5C07B] uppercase tracking-wider block mb-1 font-mono">
                        {svc.shortHeadline}
                      </span>
                      <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-[#E5C07B] transition-colors font-display">
                        {svc.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-light mb-3 line-clamp-2">
                        {svc.shortDescription}
                      </p>
                    </div>
                  </div>

                  {/* Bottom Action Footer with 48px Explore Service Button */}
                  <div className="px-4 pb-4 pt-2 sm:px-6 sm:pb-6 border-t border-neutral-800/80 bg-neutral-950/40 mt-auto">
                    <div className="flex items-center gap-3">
                      <Link
                        href={`/services/${svc.slug}`}
                        className="flex-1 btn-primary h-12 text-xs"
                      >
                        <span>Explore Service</span>
                        <ArrowRight className="w-3.5 h-3.5 text-black" />
                      </Link>
                      <button
                        onClick={() => onOpenBooking(svc.title)}
                        className="btn-secondary h-12 text-xs px-3"
                        title="Quick Booking"
                        aria-label={`Book ${svc.title}`}
                      >
                        <Calendar className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-8 sm:mt-12">
              <Link href="/services" className="btn-secondary">
                <span>View Full Services Directory</span>
                <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
              </Link>
            </div>
          </div>
        </section>

        {/* 5. Why Choose Driver Nest India (32px Mobile Rhythm) */}
        <section className="py-8 sm:py-16 bg-black border-b border-neutral-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
              <div className="text-[11px] font-semibold tracking-widest uppercase text-[#D4AF37] mb-2 font-mono">
                Institutional Assurance
              </div>
              <h2 className="text-h2 text-white">Why Choose Driver Nest India?</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              <div className="p-4 sm:p-6 rounded-2xl glass-card border border-[#D4AF37]/25">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] mb-3">
                  <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white mb-2 font-display">100% Police Verified</h3>
                <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed">
                  Official clearance certificates obtained directly from local Mumbai, Thane, and Navi Mumbai police commissionerates.
                </p>
              </div>

              <div className="p-4 sm:p-6 rounded-2xl glass-card border border-[#D4AF37]/25">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] mb-3">
                  <Award className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white mb-2 font-display">5+ Years Driving Standards</h3>
                <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed">
                  Rigorous road testing on smooth acceleration, gentle braking, expressway discipline, and multi-story parking.
                </p>
              </div>

              <div className="p-4 sm:p-6 rounded-2xl glass-card border border-[#D4AF37]/25">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] mb-3">
                  <Zap className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white mb-2 font-display">Free Leave Replacement</h3>
                <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed">
                  Instant standby chauffeur deployed automatically whenever your regular driver takes personal leaves.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 6. How It Works (32px Mobile Rhythm) */}
        <section className="py-8 sm:py-16 bg-[#060606] border-b border-neutral-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
              <div className="text-[11px] font-semibold tracking-widest uppercase text-[#D4AF37] mb-2 font-mono">
                Streamlined Protocol
              </div>
              <h2 className="text-h2 text-white">How It Works</h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
              {[
                { step: '01', title: 'Share Requirement', desc: 'Specify vehicle, hours, and pickup zone.' },
                { step: '02', title: 'Consultation', desc: 'Our concierge verifies schedule details.' },
                { step: '03', title: 'Driver Matching', desc: 'Candidate paired near your locality.' },
                { step: '04', title: 'Verification', desc: 'Police dossier delivered to your phone.' },
                { step: '05', title: 'Deployment', desc: 'Chauffeur reports for duty punctually.' },
                { step: '06', title: '24/7 Support', desc: 'Dedicated coordinator and replacement.' }
              ].map((s, idx) => (
                <div key={idx} className="p-3.5 sm:p-5 rounded-xl bg-neutral-950 border border-neutral-800">
                  <span className="text-lg sm:text-xl font-bold font-mono text-[#D4AF37] block mb-1">{s.step}</span>
                  <h3 className="text-xs sm:text-sm font-bold text-white mb-1">{s.title}</h3>
                  <p className="text-[11px] sm:text-xs text-neutral-400 font-light leading-tight">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 7. Mumbai Service Coverage (Links to location pages) */}
        <section className="py-8 sm:py-16 bg-black border-b border-neutral-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
              <div className="text-[11px] font-semibold tracking-widest uppercase text-[#D4AF37] mb-2 font-mono">
                Regional Staging
              </div>
              <h2 className="text-h2 text-white">Mumbai Metropolitan Coverage</h2>
              <p className="text-body-lead text-neutral-400 font-light mt-2">
                Active chauffeur staging hubs providing rapid 30-45 minute dispatch across MMR.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-6 sm:mb-8">
              {locationsData.map((loc) => (
                <Link
                  key={loc.id}
                  href={`/locations/${loc.id}`}
                  className="p-2.5 sm:p-3 rounded-xl bg-[#0E0E0E] border border-neutral-800 hover:border-[#D4AF37]/50 hover:bg-[#141414] transition-all group block text-left"
                >
                  <div className="h-14 sm:h-16 w-full rounded-lg overflow-hidden mb-2 relative">
                    <ImageWithFallback
                      src={loc.image}
                      alt={loc.name}
                      fallbackTitle={loc.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute inset-0 bg-black/40" />
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold text-white group-hover:text-[#E5C07B] truncate">{loc.name}</h3>
                  <p className="text-[10px] text-neutral-400 truncate">{loc.district}</p>
                </Link>
              ))}
            </div>

            <div className="text-center">
              <Link href="/service-areas" className="btn-secondary">
                <span>Explore All Service Areas &amp; Routes</span>
                <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
              </Link>
            </div>
          </div>
        </section>

        {/* 8. Testimonials Section */}
        <SocialProofSection />

        {/* 9. FAQs Preview */}
        <section className="py-8 sm:py-16 bg-[#060606] border-b border-neutral-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
              <div className="text-[11px] font-semibold tracking-widest uppercase text-[#D4AF37] mb-2 font-mono">
                Common Questions
              </div>
              <h2 className="text-h2 text-white">Frequently Asked Questions</h2>
            </div>

            <div className="space-y-3 mb-6 sm:mb-8">
              {faqsData.slice(0, 4).map((faq) => (
                <div key={faq.id} className="p-4 sm:p-5 rounded-xl bg-neutral-950 border border-neutral-800">
                  <h3 className="text-xs sm:text-sm md:text-base font-semibold text-white mb-2 flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-[#D4AF37] shrink-0" />
                    <span>{faq.question}</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-light pl-6">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>

            <div className="text-center">
              <Link href="/faqs" className="btn-secondary">
                <span>View All Frequently Asked Questions</span>
                <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
              </Link>
            </div>
          </div>
        </section>

        {/* 10. Lead Form Section */}
        <LeadFormSection />

        {/* 11. Final CTA Banner */}
        <section className="py-8 sm:py-16 bg-black border-t border-neutral-900 text-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-h2 text-white mb-3">Ready to Experience Effortless Driving?</h2>
            <p className="text-body-lead text-neutral-400 font-light mb-6 max-w-xl mx-auto">
              Connect with our central Mumbai dispatch desk. We assess your vehicle model, commute routes, and allocate a police-verified chauffeur.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button onClick={() => onOpenBooking()} className="btn-primary">
                <span>Request a Driver Now</span>
                <ArrowRight className="w-4 h-4 text-black" />
              </button>
              <a
                href="https://wa.me/919930012345?text=Hello%20Driver%20Nest%20India,%20I%20would%20like%20to%20request%20a%20driver."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Concierge</span>
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
