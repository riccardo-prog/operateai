'use client';

import { useState } from 'react';
import Section from '@/components/ui/Section';
import SectionHeader from '@/components/ui/SectionHeader';

const faqs = [
  {
    q: 'Is this lead generation?',
    a: 'No. Lead Engine does not create new leads. It converts the inquiries you already get into appointments and clients.',
  },
  {
    q: 'Is Lead Engine a CRM?',
    a: 'No. Lead Engine sits in front of your CRM. It handles the response, qualification, booking, and long-term nurture window where leads usually slip.',
  },
  {
    q: 'How is this different from my CRM?',
    a: 'Your CRM stores the lead. Lead Engine works the lead. It runs the actual conversation that turns an inquiry into an appointment.',
  },
  {
    q: 'How is this different from a chatbot?',
    a: 'Generic chatbots answer questions. Lead Engine is a real buyer and seller conversation built for real estate. It qualifies intent, books appointments, and keeps long-term leads warm for months.',
  },
  {
    q: 'Will this replace me as the realtor?',
    a: 'No. Lead Engine handles the repetitive first touch and the long-term nurture. You step in when the lead is ready for a real conversation about their home.',
  },
  {
    q: 'Will the AI sound robotic?',
    a: 'No. The conversation is customized around your voice, your listings, and how you actually talk to your buyers and sellers. You set the tone, the rules, and the boundaries. Lead Engine works inside what you give it.',
  },
  {
    q: 'Do I need to change CRMs?',
    a: 'No. Lead Engine works around what you already use.',
  },
  {
    q: 'What happens when a lead is ready to talk?',
    a: 'Depending on the rules you set, the system either books the appointment directly into your calendar or hands the lead off to you. You decide which leads go to booking and which come to you first.',
  },
  {
    q: 'Does Lead Engine work for listing inquiries?',
    a: 'Yes. When a lead asks about a specific property, the conversation references that listing so buyers feel heard instead of dropped into a generic flow.',
  },
  {
    q: 'What happens after the appointment is booked?',
    a: 'Lead Engine keeps working. Post-booking touches, no-show recovery, and long-term nurture keep the relationship going after the first meeting.',
  },
  {
    q: 'Does this guarantee more deals?',
    a: 'No system can guarantee closed deals. Lead Engine makes sure inquiries do not slip through cracks, so more of them turn into appointments where you can actually win the deal.',
  },
  {
    q: 'Who is this for?',
    a: 'Realtors and small teams already getting inquiries from ads, listings, DMs, forms, or email who want to stop losing them to slow or inconsistent follow-up.',
  },
  {
    q: 'What is Ora?',
    a: 'Ora is the assistant on this site. Ora answers questions about Lead Engine, learns where your leads are slipping, and helps you book a free Lead Flow Audit.',
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
