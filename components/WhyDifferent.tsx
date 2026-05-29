import Section from '@/components/ui/Section';
import SectionHeader from '@/components/ui/SectionHeader';

function DatabaseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
      <ellipse cx="12" cy="6" rx="7" ry="3" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function BroadcastIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
      <path d="M3 10v4h3l5 4V6L6 10H3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M16 9a4 4 0 010 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
      <path
        d="M5 5h14a1 1 0 011 1v9a1 1 0 01-1 1H9l-4 3v-3a1 1 0 01-1-1V6a1 1 0 011-1z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
      <path
        d="M6 4h3l1.5 4-2 1.5a11 11 0 005 5l1.5-2 4 1.5v3a2 2 0 01-2 2A15 15 0 014 6a2 2 0 012-2z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const cards = [
  {
    Icon: DatabaseIcon,
    other: 'CRMs organize the database.',
    ours: 'Lead Engine runs the conversation that decides whether the lead becomes a client.',
  },
  {
    Icon: BroadcastIcon,
    other: 'Lead gen tools create more inquiries.',
    ours: 'Lead Engine makes sure the inquiries you already paid for turn into appointments.',
  },
  {
    Icon: ChatIcon,
    other: 'Generic chat tools answer questions.',
    ours: 'Lead Engine runs a real buyer and seller conversation. It qualifies, books, and keeps long-term leads warm.',
  },
  {
    Icon: PhoneIcon,
    other: 'Some follow-up tools are built around cold calling.',
    ours: 'Lead Engine works where your lead actually wrote you. DMs, forms, email. It keeps the conversation going until they book or want to talk.',
  },
];

export default function WhyDifferent() {
  return (
    <Section id="why-different" tone="muted">
      <SectionHeader eyebrow="Why Different" title="The money leak nobody is fixing.">
        Most tools help you find leads or store them. They do not handle the
        window where deals are actually won or lost. That window is right after
        someone inquires. Lead Engine lives in that window.
      </SectionHeader>

      <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
        {cards.map(({ Icon, other, ours }) => (
          <div
            key={other}
            className="rounded-2xl bg-bg-elevated border border-border-soft p-6 md:p-8"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-bg-muted text-ink-secondary mb-5">
              <Icon />
            </span>
            <p className="text-sm text-ink-secondary">{other}</p>
            <p className="mt-2 text-base md:text-lg font-medium text-ink-primary leading-relaxed">
              {ours}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
