import React, { useState, useMemo } from 'react';
import { faqsData } from '../data/faqsData';
import { Search, ChevronDown, Sparkles } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openFaqIds, setOpenFaqIds] = useState<Record<string, boolean>>({
    'faq-1': true,
    'faq-2': true,
  });

  const categories = ['All', 'General', 'Verification & Safety', 'Services & Booking'];

  const toggleFaq = (id: string) => {
    setOpenFaqIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const filteredFaqs = useMemo(() => {
    return faqsData.filter((faq) => {
      const matchesCategory = activeCategory === 'All' || faq.category === activeCategory;
      const matchesQuery =
        searchQuery.trim() === '' ||
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, searchQuery]);

  return (
    <section id="faqs" className="py-20 lg:py-24 bg-[#EEF8FC] text-[#111827] border-b border-[#E5E7EB] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#35B6DE]/30 shadow-xs mb-3.5">
            <Sparkles className="w-3.5 h-3.5 text-[#35B6DE]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#35B6DE]">
              Frequently Asked Questions
            </span>
          </div>

          <h2 className="text-h2 font-extrabold text-[#111827] mb-4">
            Frequently Asked Questions
          </h2>

          <p className="text-subheading text-[#4B5563] leading-relaxed font-normal text-base sm:text-lg">
            Everything you need to know about our police verification protocols, driver screening, hourly and monthly rates, and coverage across Mumbai and MMR.
          </p>

          {/* Search Box */}
          <div className="mt-8 relative max-w-lg mx-auto">
            <Search className="w-4 h-4 text-[#9CA3AF] absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search verification, rates, routes, replacement..."
              className="w-full pl-11 pr-4 py-3 bg-white border border-[#E5E7EB] focus:border-[#35B6DE] rounded-xl text-sm text-[#111827] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#35B6DE]/20 transition-all shadow-xs"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center justify-center gap-2 mt-4 overflow-x-auto no-scrollbar py-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                  activeCategory === cat
                    ? 'bg-[#35B6DE] text-white font-bold shadow-xs'
                    : 'bg-white text-[#4B5563] border border-[#E5E7EB] hover:text-[#111827]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* FAQs Accordion List */}
        <div className="space-y-3.5">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq) => {
              const isOpen = Boolean(openFaqIds[faq.id]);
              return (
                <div
                  key={faq.id}
                  className="bg-white rounded-2xl border border-[#E5E7EB] overflow-hidden transition-all duration-200 shadow-xs hover:border-[#35B6DE]"
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left gap-4 cursor-pointer focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span className="font-heading font-bold text-sm sm:text-base text-[#111827] hover:text-[#35B6DE] transition-colors">
                      {faq.question}
                    </span>
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                        isOpen ? 'bg-[#EEF8FC] text-[#35B6DE] rotate-180' : 'bg-slate-100 text-[#4B5563]'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-1 text-sm text-[#4B5563] leading-relaxed border-t border-[#E5E7EB] animate-fade-in">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="text-center py-10 bg-white rounded-2xl border border-[#E5E7EB] p-8">
              <p className="text-sm text-[#4B5563] mb-3">No questions matched your search query.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('All');
                }}
                className="text-xs font-bold text-[#35B6DE] hover:underline"
              >
                Reset Search Filters
              </button>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
