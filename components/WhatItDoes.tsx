import SectionLabel from '@/components/ui/SectionLabel';

function BoltIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
      <path d="M13 3L5 13h6l-1 8 8-10h-6l1-8z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}
function LoopIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
      <path d="M19 5v4h-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 19v-4h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18.5 9A7 7 0 006 7.5M5.5 15A7 7 0 0018 16.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function FunnelIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
      <path d="M4 5h16l-6 7v6l-4 2v-8L4 5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}
function ChartIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
      <path d="M5 20V11M10 20V5M15 20v-7M20 20V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M4 20h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
const features = [
  {
    Icon: BoltIcon,
    title: 'Every buyer and seller gets an instant reply',
    desc: 'The moment someone inquires from a DM, form, or email, Lead Engine answers. No buyer is left wondering if you saw them.',
  },
  {
    Icon: FunnelIcon,
    title: 'Qualified leads land on your calendar',
    desc: 'Lead Engine asks the questions you would ask, references the specific listing they inquired about, and walks buyers and sellers toward a booked time or a direct handoff.',
  },
  {
    Icon: LoopIcon,
    title: 'Stay top of mind until the timing is right',
    desc: 'Quiet leads get nurtured for weeks or months until they come back. Post-booking check-ins, no-show recovery, and long-term touches keep clients warm long after the first meeting.',
  },
  {
    Icon: ChartIcon,
    title: 'One weekly view of what is actually happening',
    desc: 'A weekly summary of inquiries, replies, conversations, and appointments. Plus a dashboard for when you want to dig in. You see exactly where the money is moving.',
  },
];

export default function WhatItDoes() {
  return (
    <section id="what-it-does" className="bg-bg-canvas py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-10 lg:gap-16">
        <div className="lg:sticky lg:top-24 self-start">
          <SectionLabel>What It Does</SectionLabel>
          <h2 className="font-body text-3xl md:text-5xl font-semibold tracking-tight leading-[1.1] text-ink-primary">
            Built so no inquiry falls through the cracks.
          </h2>
          <p className="mt-5 text-lg text-ink-secondary leading-relaxed">
            Every buyer and seller goes through the same steps. Replied to.
            Qualified. Booked or nurtured. Followed up with even after the
            first meeting.
          </p>
        </div>

        <ul className="divide-y divide-border-soft border-t border-border-soft lg:border-t-0">
          {features.map(({ Icon, title, desc }) => (
            <li key={title} className="flex gap-4 py-5 first:pt-0 lg:first:pt-5">
              <span className="shrink-0 flex h-10 w-10 items-center justify-center rounded-xl bg-bg-muted text-ink-secondary">
                <Icon />
              </span>
              <div className="min-w-0">
                <h3 className="text-lg font-semibold tracking-tight text-ink-primary">{title}</h3>
                <p className="mt-1 text-ink-secondary leading-relaxed">{desc}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
