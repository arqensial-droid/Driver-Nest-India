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
    <section id="faqs" className="py-20 lg:py-28 bg-[#050505] text-white border-b border-white/10 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0B0B0B] border border-[#35B6DE]/40 shadow-md mb-3.5">
            <Sparkles className="w-3.5 h-3.5 text-[#F3ED1A]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#35B6DE]">
              Frequently Asked Questions
            </span>
          </div>

          <h2 className="text-h2 font-extrabold text-white mb-4">
            Frequently Asked Questions
          </h2>

          <p className="text-subheading text-[#CFCFCF] leading-relaxed font-normal">
            Everything you need to know about our police verification protocols, driver screening, rates, and coverage across Mumbai and MMR.
          </p>

          {/* Search Box */}
          <div className="mt-8 relative max-w-lg mx-auto">
            <Search className="w-4 h-4 text-neutral-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search verification, rates, routes, replacement..."
              className="w-full pl-11 pr-4 py-3 bg-[#0B0B0B] border border-white/15 focus:border-[#35B6DE] rounded-xl text-sm text-white placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-[#35B6DE] transition-all shadow-inner"
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
                    ? 'bg-[#35B6DE] text-[#050505] font-bold shadow-md'
                    : 'bg-[#0B0B0B] text-[#CFCFCF] border border-white/10 hover:border-white/20'
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
                  className="bg-[#0B0B0B] rounded-2xl border border-white/10 overflow-hidden transition-all duration-200 hover:border-[#35B6DE]/40"
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left gap-4 cursor-pointer focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span className="font-heading font-bold text-sm sm:text-base text-white hover:text-[#35B6DE] transition-colors">
                      {faq.question}
                    </span>
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-transform duration-300 ${
                        isOpen
                          ? 'bg-[#35B6DE] text-[#050505] rotate-180'
                          : 'bg-white/5 text-neutral-400'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-[#CFCFCF] leading-relaxed border-t border-white/5 animate-fade-in font-normal">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="text-center py-12 bg-[#0B0B0B] rounded-2xl border border-white/10">
              <p className="text-neutral-400 text-sm mb-3">No matching FAQs found for "{searchQuery}".</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('All');
                }}
                className="text-xs font-bold text-[#35B6DE] hover:underline"
              >
                Clear Search &amp; Reset Filters
              </button>
            </div>
          )}
        </div>

        {/* Support Help Banner */}
        <div className="mt-12 p-6 rounded-2xl bg-[#0B0B0B] border border-white/10 text-center flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h4 className="text-sm font-bold text-white mb-1">Have a specific route or fleet query?</h4>
            <p className="text-xs text-[#CFCFCF]">Our central dispatch concierge desk operates 24/7 across Mumbai MMR.</p>
          </div>
          <a
            href="tel:8652880057"
            className="btn-secondary h-10 px-5 text-xs font-bold shrink-0"
          >
            Call Desk: 8652880057
          </a>
        </div>

      </div>
    </section>
  );
};
