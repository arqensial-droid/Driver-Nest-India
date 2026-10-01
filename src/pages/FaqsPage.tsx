import React from 'react';
import { Link, SEO } from '../router';
import { FaqSection } from '../components/FaqSection';
import { ChevronRight } from 'lucide-react';
import { faqsData } from '../data/faqsData';

export const FaqsPage: React.FC = () => {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqsData.map((f) => ({
      '@type': 'Question',
      'name': f.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': f.answer
      }
    }))
  };

  return (
    <>
      <SEO
        title="Frequently Asked Questions – Driver Nest India"
        description="Find answers to all questions regarding police background verification, chauffeur screening, duty schedules, replacement guarantees, and booking in Mumbai."
        canonicalPath="/faqs"
        schema={faqSchema}
      />

      <div className="pt-16 sm:pt-24 pb-12 sm:pb-20 bg-black text-white overflow-x-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-4 sm:mb-6">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-neutral-400">
            <Link href="/" className="hover:text-[#E5C07B] transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-600" />
            <span className="text-[#E5C07B] font-medium">FAQs</span>
          </nav>
        </div>

        <FaqSection />
      </div>
    </>
  );
};
