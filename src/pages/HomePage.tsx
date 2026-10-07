import React from 'react';
import { Hero } from '../components/Hero';
import { TrustSection } from '../components/TrustSection';
import { WhyChooseSection } from '../components/WhyChooseSection';
import { ServicesSection } from '../components/ServicesSection';
import { WhyMumbaiTrustsSection } from '../components/WhyMumbaiTrustsSection';
import { LocationsSection } from '../components/LocationsSection';
import { MumbaiUseCasesSection } from '../components/MumbaiUseCasesSection';
import { SocialProofSection } from '../components/SocialProofSection';
import { FaqSection } from '../components/FaqSection';
import { FinalCTASection } from '../components/FinalCTASection';
import { LeadFormSection } from '../components/LeadFormSection';
import { SEO } from '../router';
import { faqsData } from '../data/faqsData';

interface HomePageProps {
  onOpenBooking: (serviceTitle?: string, locationName?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenBooking }) => {
  const homeSchema = [
    {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      'name': 'On Time Driver Service',
      'image': 'https://ontimedriverservice.com/images/services/chauffeur-service.jpg',
      '@id': 'https://ontimedriverservice.com',
      'url': 'https://ontimedriverservice.com',
      'telephone': '+91 8652880057',
      'email': 'info@ontimedriverservice.com',
      'priceRange': '₹₹',
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': 'Bandra Kurla Complex (BKC)',
        'addressLocality': 'Mumbai',
        'addressRegion': 'Maharashtra',
        'postalCode': '400051',
        'addressCountry': 'IN',
      },
      'geo': {
        '@type': 'GeoCoordinates',
        'latitude': 19.0664,
        'longitude': 72.8687,
      },
      'areaServed': [
        'Mumbai',
        'Navi Mumbai',
        'Thane',
        'Mira Road',
        'Bhayandar',
        'Vasai',
        'Virar',
        'Palghar',
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      'name': 'On Time Driver Service',
      'url': 'https://ontimedriverservice.com',
      'logo': 'https://ontimedriverservice.com/images/Logo.png',
      'email': 'info@ontimedriverservice.com',
      'contactPoint': {
        '@type': 'ContactPoint',
        'telephone': '+91 8652880057',
        'contactType': 'customer service',
        'areaServed': 'IN-MH',
        'availableLanguage': ['English', 'Hindi', 'Marathi'],
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      'serviceType': 'Professional Chauffeur & Driver Service',
      'provider': {
        '@type': 'LocalBusiness',
        'name': 'On Time Driver Service',
        'telephone': '+91 8652880057',
        'email': 'info@ontimedriverservice.com',
      },
      'areaServed': {
        '@type': 'City',
        'name': 'Mumbai',
      },
      'hasOfferCatalog': {
        '@type': 'OfferCatalog',
        'name': 'Driver Service Categories',
        'itemListElement': [
          { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Personal Driver Service' } },
          { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Corporate Driver Service' } },
          { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Permanent Driver Service' } },
          { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Outstation Driver Service' } },
          { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Airport Driver Service' } },
          { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Hourly Driver Service' } },
        ],
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': faqsData.slice(0, 6).map((f) => ({
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
        title="On Time Driver Service – Professional Driver & Chauffeur Services in Mumbai"
        description="Hire verified, on-time professional drivers in Mumbai, Navi Mumbai, Thane, Mira Road, Bhayandar, Vasai, Virar & Palghar. Personal, corporate, airport transfers & outstation. Instant booking."
        canonicalPath="/"
        schema={homeSchema}
      />

      {/* 1. Mobile & Desktop Luxury Hero (Chauffeur background, 75% dark overlay, modern badges, equal-height CTAs) */}
      <Hero onOpenBooking={() => onOpenBooking()} />

      {/* 2. Trust Section (6 Dark Cards with hover effects) */}
      <TrustSection />

      {/* 3. Section 1: Why Choose Us (Corporate Standards, Zero Brokerage, Standby Guarantees) */}
      <WhyChooseSection onOpenBooking={() => onOpenBooking()} />

      {/* 4. Section 2: Driver Categories (Personal, Corporate, Permanent, Outstation, Airport, Hourly) */}
      <ServicesSection onSelectServiceAndBook={(title) => onOpenBooking(title)} />

      {/* 5. Why Mumbai Trusts Us (5000+ Drivers, 10000+ Customers, 4.9 Rating, 24x7 Support counters) */}
      <WhyMumbaiTrustsSection onOpenBooking={() => onOpenBooking()} />

      {/* 6. Section 3: Service Areas (Mumbai, Thane, Navi Mumbai, Mira Road, Bhayandar, Vasai, Virar, Palghar) */}
      <LocationsSection onSelectLocationAndBook={(loc) => onOpenBooking(undefined, loc)} />

      {/* 7. Real Demanding Mumbai Driving Scenarios (BKC Corporate, Airport, Senior Citizen, Expressway) */}
      <MumbaiUseCasesSection onSelectServiceAndBook={(title) => onOpenBooking(title)} />

      {/* 8. Section 4: Customer Reviews & Verified Testimonials */}
      <SocialProofSection />

      {/* 9. Section 5: Frequently Asked Questions (FAQ) */}
      <FaqSection />

      {/* 10. Comprehensive 9-Field Lead Requirement Form */}
      <LeadFormSection />

      {/* 11. Section 6: Final Elegant CTA Section */}
      <FinalCTASection onOpenBooking={() => onOpenBooking()} />
    </>
  );
};
