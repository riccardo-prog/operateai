'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import RevealOnScroll from './ui/RevealOnScroll';
import SectionLabel from './ui/SectionLabel';

const faqs = [
  {
    question: 'What happens during the free audit?',
    answer:
      'We get on a 30-minute call where you walk us through how your business operates day-to-day. We ask targeted questions to identify where time and money are being lost. After the call, you receive a written report outlining the top bottlenecks and our recommended automations, with estimated ROI for each. The report is yours regardless of whether you move forward.',
  },
  {
    question: 'How long does implementation take?',
    answer:
      'Most automations are live within 1–2 weeks. Simple workflows (like automated reminders or lead routing) can be up and running in 48 hours. More complex builds involving multiple systems or custom AI logic typically take 2–3 weeks.',
  },
  {
    question: 'Do I need to be technical?',
    answer:
      'Not at all. We handle everything, from design to build to deployment. You just need to tell us how your business works and what\'s frustrating you. We translate that into working automations.',
  },
  {
    question: 'What tools do you work with?',
    answer:
      'We work with whatever you\'re already using: Google Workspace, HubSpot, Slack, QuickBooks, Calendly, Mailchimp, Shopify, and hundreds more. If your tools can connect, we can automate the workflow between them.',
  },
  {
    question: 'What does ongoing support include?',
    answer:
      'We monitor your automations for errors, fix issues proactively, optimize workflows based on real performance data, and build new automations as your needs grow. You get a direct line to us. No ticketing systems, no waiting.',
  },
  {
    question: "What if the audit shows I don't need automation?",
    answer:
      "Then we tell you that. We're not going to sell you something you don't need. The audit is genuinely free with no strings. If your operations are already tight, we'll say so.",
  },
];

function FAQItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <RevealOnScroll delay={index * 0.06}>
      <div className="border-b border-[#1E293B]">
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between gap-4 py-5 text-left"
          aria-expanded={open}
        >
          <span className="font-body font-semibold text-[#F1F5F9] leading-snug">
            {question}
          </span>
          <ChevronDown
            size={20}
            strokeWidth={1.5}
            className="flex-shrink-0 text-[#94A3B8] transition-transform duration-300"
            style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
          />
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="answer"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="overflow-hidden"
            >
              <p className="text-[#94A3B8] leading-[1.75] pb-5 text-sm">
                {answer}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </RevealOnScroll>
  );
}

export default function FAQ() {
  return (
    <section className="py-28 px-6">
      <div className="max-w-content mx-auto">
        <RevealOnScroll className="text-center mb-14">
          <SectionLabel>FAQ</SectionLabel>
          <h2 className="font-display text-4xl md:text-5xl text-[#F1F5F9] mb-4 tracking-tight">
            Common questions
          </h2>
        </RevealOnScroll>

        <div className="max-w-[760px] mx-auto border-t border-[#1E293B]">
          {faqs.map((faq, i) => (
            <FAQItem
              key={faq.question}
              question={faq.question}
              answer={faq.answer}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
