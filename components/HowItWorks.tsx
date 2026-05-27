import Section from '@/components/ui/Section';
import SectionHeader from '@/components/ui/SectionHeader';

function InboxIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
      <path
        d="M5 13l1.5-7h11L19 13v4a2 2 0 01-2 2H7a2 2 0 01-2-2v-4z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M5 13h4l1 2h4l1-2h4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BoltIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
      <path d="M13 3L5 13h6l-1 8 8-10h-6l1-8z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
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

function FollowUpIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
      <path d="M19 5v4h-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 19v-4h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M18.5 9A7 7 0 006 7.5M5.5 15A7 7 0 0018 16.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
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

function ChartIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
      <path d="M5 20V11M10 20V5M15 20v-7M20 20V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M4 20h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

const steps = [
  { label: 'Lead in', Icon: InboxIcon },
  { label: 'Instant response', Icon: BoltIcon },
  { label: 'Qualification', Icon: FunnelIcon },
  { label: 'Follow-up', Icon: FollowUpIcon },
  { label: 'Booking or handoff', Icon: CalendarIcon },
  { label: 'Weekly report', Icon: ChartIcon },
];

export default function HowItWorks() {
  return (
    <Section id="how-it-works" tone="muted">
      <SectionHeader
        eyebrow="How It Works"
        title="Speed-to-lead, follow-up, and handoff in one system."
      >
        Lead Engine connects to your lead sources, responds while the lead&apos;s
        intent is still fresh, follows up when they go quiet, qualifies their
        needs, and routes serious opportunities toward booking with you. AI
        handles the repetitive first touch and follow-up. You handle the
        relationship.
      </SectionHeader>

      {/* Desktop: horizontal flow with the sanctioned cyan to purple line */}
      <div className="hidden lg:block relative mt-16">
        <div
          className="absolute top-7 left-[calc(100%/12)] right-[calc(100%/12)] h-px bg-gradient-to-r from-accent-from to-accent-to"
          aria-hidden="true"
        />
        <ol className="grid grid-cols-6">
          {steps.map(({ label, Icon }) => (
            <li key={label} className="flex flex-col items-center text-center px-2">
              <span className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-bg-elevated border border-border-soft text-ink-secondary">
                <Icon />
              </span>
              <span className="mt-4 text-sm font-medium text-ink-primary">{label}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* Mobile + tablet: vertical flow (no horizontal scroll) */}
      <ol className="lg:hidden relative mt-12">
        <div
          className="absolute left-7 top-7 bottom-7 w-px bg-gradient-to-b from-accent-from to-accent-to"
          aria-hidden="true"
        />
        {steps.map(({ label, Icon }) => (
          <li key={label} className="relative flex items-center gap-4 py-3">
            <span className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-bg-elevated border border-border-soft text-ink-secondary">
              <Icon />
            </span>
            <span className="text-base font-medium text-ink-primary">{label}</span>
          </li>
        ))}
      </ol>
    </Section>
  );
}
