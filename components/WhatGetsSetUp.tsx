import Section from '@/components/ui/Section';
import SectionHeader from '@/components/ui/SectionHeader';

const items = [
  'Connect your existing lead channels',
  'Customize conversations in your voice',
  'Set qualification, booking, and handoff rules around your process',
  'Set up long-term nurture for quiet leads',
  'Configure listing-specific conversation flows',
  'Weekly summary plus dashboard visibility',
];

function Check() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="w-3 h-3">
      <path
        d="M3.5 8.5l3 3 6-7"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function WhatGetsSetUp() {
  return (
    <Section id="setup" tone="muted">
      <SectionHeader
        eyebrow="What We Handle For You"
        title="We handle the setup. You stay in control."
      >
        We build Lead Engine around your business. You run it from one
        dashboard, with everything tuned to how you work.
      </SectionHeader>

      <div className="mt-12 max-w-3xl mx-auto rounded-2xl bg-bg-elevated border border-border-soft p-6 md:p-10">
        <div className="flex items-center justify-between pb-5 mb-6 border-b border-border-soft">
          <p className="text-sm font-semibold tracking-tight text-ink-primary">
            Included in every install
          </p>
          <span className="rounded-full bg-bg-muted px-2.5 py-1 text-[11px] font-medium text-ink-tertiary">
            Done for you
          </span>
        </div>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
          {items.map((item) => (
            <li key={item} className="flex items-center gap-3">
              <span className="shrink-0 flex h-6 w-6 items-center justify-center rounded-full bg-ink-primary text-white">
                <Check />
              </span>
              <span className="text-sm md:text-base text-ink-primary">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
