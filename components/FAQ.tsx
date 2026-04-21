'use client';

import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence, useReducedMotion } from 'framer-motion';

const faqs = [
  {
    q: 'Is this a SaaS tool or a done-for-you service?',
    a: 'Done-for-you. We build, configure, and maintain Lead Engine for your business. You approve messages and close deals.',
  },
  {
    q: 'How long does setup take?',
    a: 'Most builds ship in a few weeks. We start with a 30-minute audit call, then handle everything.',
  },
  {
    q: 'What does it cost?',
    a: 'Monthly plan based on your channels and volume. First clients get founding partner rates. We\'ll quote you on the audit call.',
  },
  {
    q: 'Can I control what the AI says?',
    a: 'Yes. You set the AI\'s persona: name, tone, voice, things to always say and never say. And you can approve every message before it\'s sent.',
  },
  {
    q: 'What channels does it support?',
    a: 'Email (Outlook), Instagram DMs, and Facebook Messenger today. More coming soon.',
  },
];

function FAQItem({
  q,
  a,
  isOpen,
  onToggle,
}: {
  q: string;
  a: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const reduced = useReducedMotion();

  return (
    <div
      className="border-b"
      style={{ borderColor: 'rgba(255,255,255,0.07)' }}
    >
      <button
        onClick={onToggle}
        className="w-full text-left py-5 flex items-center justify-between gap-6 cursor-pointer group"
        aria-expanded={isOpen}
      >
        <span
          className="font-body font-semibold text-text-primary text-sm md:text-base group-hover:text-white transition-colors duration-200"
          style={{ lineHeight: 1.45 }}
        >
          {q}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: reduced ? 0 : 0.2, ease: 'easeOut' }}
          className="flex-shrink-0"
          aria-hidden="true"
        >
          <svg
            viewBox="0 0 16 16"
            fill="none"
            className="w-4 h-4 text-text-muted"
          >
            <path
              d="M4 6l4 4 4-4"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              duration: reduced ? 0 : 0.2,
              ease: 'easeOut',
            }}
            className="overflow-hidden"
          >
            <p
              className="font-body text-sm text-text-secondary pb-5 pr-8"
              style={{ lineHeight: 1.7 }}
            >
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px 0px' });
  const reduced = useReducedMotion();

  return (
    <section
      id="faq"
      ref={ref}
      className="px-6 md:px-8 py-20 md:py-24 border-t"
      style={{ borderColor: 'rgba(255,255,255,0.06)' }}
    >
      <div className="max-w-content mx-auto">
        <motion.p
          initial={reduced ? {} : { opacity: 0, y: 8 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          className="font-mono text-[11px] text-text-muted uppercase tracking-[0.2em] mb-12"
        >
          Common questions
        </motion.p>

        <motion.div
          initial={reduced ? {} : { opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1], delay: reduced ? 0 : 0.08 }}
          className="border-t"
          style={{ borderColor: 'rgba(255,255,255,0.07)' }}
        >
          {faqs.map((faq, i) => (
            <FAQItem
              key={faq.q}
              q={faq.q}
              a={faq.a}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
