'use client';

import { useState } from 'react';
import Section from '@/components/ui/Section';
import SectionHeader from '@/components/ui/SectionHeader';

const faqs = [
  {
    q: 'Is this lead generation?',
    a: 'No. Lead Engine does not create leads. It helps you respond to, follow up with, and convert more of the leads you already generate.',
  },
  {
    q: 'Is Lead Engine a CRM?',
    a: 'No. Lead Engine is not meant to replace your CRM. It focuses on the response, follow-up, qualification, and handoff window after a new inquiry comes in.',
  },
  {
    q: 'How is this different from my CRM?',
    a: 'Your CRM stores and organizes the lead. Lead Engine focuses on the response and follow-up window right after a lead inquires, where opportunities often slip.',
  },
  {
    q: 'How is this different from a chatbot?',
    a: 'Generic chat tools usually answer questions. Lead Engine is built around a realtor-specific response and follow-up workflow that qualifies intent and routes serious opportunities toward handoff or booking.',
  },
  {
    q: 'Will this replace me as the realtor?',
    a: 'No. Lead Engine handles repetitive first-touch response and follow-up. You step in when the lead is ready for a real conversation.',
  },
  {
    q: 'Will the AI sound robotic?',
    a: 'No. The system is customized around your tone, lead source, and conversation flow.',
  },
  {
    q: 'Do I need to change CRMs?',
    a: 'Not necessarily. Lead Engine works around your existing lead flow where possible.',
  },
  {
    q: 'What happens when a lead is ready to talk?',
    a: 'The system routes the lead toward booking or direct handoff depending on your setup.',
  },
  {
    q: 'Does this guarantee more deals?',
    a: 'No system can guarantee closed deals. Lead Engine improves the response and follow-up process so fewer opportunities are lost before you get a chance to speak with them.',
  },
  {
    q: 'Who is this for?',
    a: 'Realtors, teams, or brokerages that already receive inbound leads from ads, forms, DMs, or other sources and want a better system for handling them.',
  },
  {
    q: 'What is Ora?',
    a: 'Ora is the inbound assistant on this website. Ora helps visitors ask questions, share lead flow details, and request a Lead Flow Audit.',
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
  return (
    <div className="border-b border-border-soft">
      <button
        onClick={onToggle}
        className="w-full text-left py-5 flex items-center justify-between gap-6 cursor-pointer group"
        aria-expanded={isOpen}
      >
        <span className="text-sm md:text-base font-medium text-ink-primary">{q}</span>
        <svg
          viewBox="0 0 16 16"
          fill="none"
          className={`w-4 h-4 shrink-0 text-ink-tertiary transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
          aria-hidden="true"
        >
          <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <div
        className={`grid transition-all duration-200 ease-out ${
          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <p className="text-ink-secondary leading-relaxed pb-5 pr-8">{a}</p>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <Section id="faq" tone="muted">
      <SectionHeader eyebrow="FAQ" title="Common questions." />
      <div className="mt-10 max-w-3xl mx-auto border-t border-border-soft">
        {faqs.map((faq, i) => (
          <FAQItem
            key={faq.q}
            q={faq.q}
            a={faq.a}
            isOpen={openIndex === i}
            onToggle={() => setOpenIndex(openIndex === i ? null : i)}
          />
        ))}
      </div>
    </Section>
  );
}
