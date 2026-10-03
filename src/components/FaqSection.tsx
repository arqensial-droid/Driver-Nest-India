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
    <section id="faqs" className="py-20 lg:py-28 bg-[#0A0A0A] text-white border-b border-white/10 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#121212] border border-[#35B5D8]/40 shadow-md mb-3.5">
            <Sparkles className="w-3.5 h-3.5 text-[#F2F028]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#35B5D8]">
              Concierge Answers &amp; Guidance
            </span>
          </div>

          <h2 className="text-h2 font-extrabold text-white mb-4">
            Frequently Asked Questions
          </h2>

          <p className="text-subheading text-[#D1D5DB] leading-relaxed">
            Everything you need to know about our police verification protocols, driver screening, rates, and coverage across Mumbai and MMR.
          </p>

          {/* Search Box */}
          <div className="mt-8 relative max-w-lg mx-auto">
            <Search className="w-4 h-4 text-neutral-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search topics (e.g. police verification, rates, Innova)..."
              className="dark-input w-full h-[52px] pl-11 pr-12 text-sm text-white placeholder-neutral-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white text-xs"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 p-1.5 mt-5 bg-[#121212] border border-white/10 rounded-2xl max-w-md mx-auto overflow-x-auto no-scrollbar justify-start sm:justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  activeCategory === cat
                    ? 'bg-[#35B5D8] text-[#0A0A0A] font-bold shadow-md'
                    : 'text-[#D1D5DB] hover:text-white hover:bg-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* FAQs Accordion List */}
        <div className="space-y-4">
          {filteredFaqs.map((faq) => {
            const isOpen = !!openFaqIds[faq.id];
            return (
              <div
                key={faq.id}
                className="rounded-2xl bg-[#121212] border border-white/10 overflow-hidden transition-all duration-300 hover:border-[#35B5D8]/40"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-bold text-base sm:text-lg text-white">
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 bg-[#35B5D8] text-[#0A0A0A]' : 'bg-white/10 text-white'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-sm text-[#D1D5DB] leading-relaxed border-t border-white/5 animate-fade-in">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions */}
        <div className="mt-12 p-6 rounded-2xl bg-[#121212] border border-white/10 text-center flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h4 className="text-base font-bold text-white">Have a custom corporate or fleet inquiry?</h4>
            <p className="text-xs text-neutral-400 mt-0.5">Speak with our central Mumbai dispatch desk directly.</p>
          </div>
          <a
            href="tel:8652880057"
            className="btn-primary h-11 px-6 text-xs font-bold inline-flex items-center gap-2 shrink-0"
          >
            <span>Call +91 8652880057</span>
          </a>
        </div>

      </div>
    </section>
  );
};
