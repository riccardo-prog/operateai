import Section from '@/components/ui/Section';
import SectionHeader from '@/components/ui/SectionHeader';

function FormIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
      <rect x="5" y="4" width="14" height="17" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M9 4h6v3H9z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M8 12h8M8 16h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
function MessageIcon() {
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
function WindowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3 9h18M7 13h6M7 16h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
function EnvelopeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
      <rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M4 7l8 6 8-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
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

const sources = [
  { Icon: FormIcon, label: 'Meta lead forms' },
  { Icon: MessageIcon, label: 'Instagram and Facebook messages' },
  { Icon: WindowIcon, label: 'Website forms' },
  { Icon: EnvelopeIcon, label: 'Email inquiries' },
  { Icon: DatabaseIcon, label: 'CRM or pipeline leads' },
];

export default function LeadSources() {
  return (
    <Section id="lead-sources" tone="canvas">
      <SectionHeader
        align="left"
        eyebrow="Lead Sources"
        title="Wherever your buyers and sellers reach you, Lead Engine is there."
      >
        We connect to the channels you already use. No CRM swap. No
        rebuilding your workflow. Just consistent, fast response in the places
        leads actually come in.
      </SectionHeader>

      <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {sources.map(({ Icon, label }) => (
          <div
            key={label}
            className="rounded-2xl bg-bg-elevated border border-border-soft p-5 flex flex-col items-start gap-3"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-bg-muted text-ink-secondary">
              <Icon />
            </span>
            <span className="text-sm font-medium text-ink-primary leading-snug">{label}</span>
          </div>
        ))}
      </div>

      <p className="mt-6 text-sm text-ink-tertiary">
        Connected where applicable, depending on your setup.
      </p>
    </Section>
  );
}
