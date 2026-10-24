import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

/**
 * FAQAccordion component
 * Props:
 *   - faqs: Array<{ question: string, answer: string }>
 *   - className: string
 */
const FAQAccordion = ({ faqs = [], className = '' }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className={`space-y-3 ${className}`} role="list">
      {faqs.map((faq, index) => (
        <div
          key={index}
          className="border border-neutral-200 rounded-2xl overflow-hidden bg-white"
          role="listitem"
        >
          <button
            onClick={() => toggle(index)}
            className="flex items-center justify-between w-full px-5 py-4 text-left gap-4 hover:bg-neutral-50 transition-colors"
            aria-expanded={openIndex === index}
            aria-controls={`faq-answer-${index}`}
            id={`faq-question-${index}`}
          >
            <span className="font-semibold text-neutral-800 text-sm md:text-base">
              {faq.question}
            </span>
            <motion.div
              animate={{ rotate: openIndex === index ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="flex-shrink-0"
              aria-hidden="true"
            >
              <ChevronDown size={20} className="text-primary-600" />
            </motion.div>
          </button>

          <AnimatePresence initial={false}>
            {openIndex === index && (
              <motion.div
                id={`faq-answer-${index}`}
                role="region"
                aria-labelledby={`faq-question-${index}`}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="px-5 pb-4 text-sm text-neutral-600 leading-relaxed border-t border-neutral-100 pt-3">
                  {faq.answer}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};

export default FAQAccordion;
