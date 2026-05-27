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
function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
      <rect x="4" y="6" width="16" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M4 10h16M8 4v4M16 4v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
function KanbanIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
      <rect x="4" y="5" width="4.5" height="14" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <rect x="9.75" y="5" width="4.5" height="9" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <rect x="15.5" y="5" width="4.5" height="12" rx="1" stroke="currentColor" strokeWidth="1.5" />
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
function SlidersIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
      <path d="M4 7h7M15 7h5M4 12h9M17 12h3M4 17h3M11 17h9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="13" cy="7" r="2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="15" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="9" cy="17" r="2" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

const features = [
  { Icon: BoltIcon, title: 'Instant Lead Response', desc: 'Every new inquiry gets a fast, professional response while their intent is still fresh.' },
  { Icon: LoopIcon, title: 'Automated Follow-Up', desc: 'When leads go quiet, Lead Engine keeps the conversation alive with natural follow-up.' },
  { Icon: FunnelIcon, title: 'Lead Qualification', desc: 'The system gathers key details like intent, timeline, location, and readiness.' },
  { Icon: CalendarIcon, title: 'Booking or Handoff Flow', desc: 'Interested leads are routed toward booking or direct handoff depending on setup.' },
  { Icon: KanbanIcon, title: 'Pipeline Tracking', desc: 'Leads are organized by status so the agent can see what is happening without digging through messages.' },
  { Icon: ChartIcon, title: 'Weekly Reporting', desc: 'A simple report showing lead volume, responses, follow-ups, conversations, and booking opportunities.' },
  { Icon: SlidersIcon, title: 'Ongoing Optimization', desc: 'Reviewed and improved based on real lead behavior.' },
];

export default function WhatItDoes() {
  return (
    <section id="what-it-does" className="bg-bg-canvas py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-10 lg:gap-16">
        <div className="lg:sticky lg:top-24 self-start">
          <SectionLabel>What It Does</SectionLabel>
          <h2 className="font-body text-3xl md:text-5xl font-semibold tracking-tight leading-[1.1] text-ink-primary">
            Built to stop leads from slipping through the cracks.
          </h2>
          <p className="mt-5 text-lg text-ink-secondary leading-relaxed">
            From the first reply to the weekly report, every inbound lead runs
            through the same steps, every time.
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
