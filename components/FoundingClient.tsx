import Section from '@/components/ui/Section';
import SectionLabel from '@/components/ui/SectionLabel';
import Button from '@/components/ui/Button';

const includes = [
  'Lead flow audit',
  'Custom response and nurture design',
  'Connection to your existing channels',
  'Qualification and handoff rules around your process',
  'Booking and handoff logic',
  'Listing-specific conversation setup',
  'Weekly performance report',
  'First 30 days of refinement',
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

export default function FoundingClient() {
  return (
    <Section id="founding" tone="canvas">
      {/* Single banner card on the faint cyan to purple backdrop (sanctioned) */}
      <div className="rounded-3xl border border-border-soft bg-gradient-to-br from-accent-soft-from to-accent-soft-to p-8 md:p-12 lg:p-14">
        <SectionLabel>Founding Clients</SectionLabel>
        <h2 className="font-body text-3xl md:text-5xl font-semibold tracking-tight leading-[1.1] text-ink-primary">
          Founding client installs are limited while we work closely with early partners.
        </h2>
        <p className="mt-5 text-lg text-ink-secondary leading-relaxed max-w-2xl">
          We are installing Lead Engine for a small group of real estate
          professionals at founding client pricing, in exchange for feedback
          and anonymized results.
        </p>

        <p className="mt-9 text-xs font-medium tracking-[0.14em] uppercase text-ink-tertiary">
          Each install includes
        </p>
        <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 max-w-3xl">
          {includes.map((item) => (
            <li key={item} className="flex items-center gap-3">
              <span className="shrink-0 flex h-6 w-6 items-center justify-center rounded-full bg-ink-primary text-white">
                <Check />
              </span>
              <span className="text-sm md:text-base text-ink-primary">{item}</span>
            </li>
          ))}
        </ul>

        <div className="mt-9">
          <Button href="#audit" variant="primary">
            Request a Lead Flow Audit
          </Button>
        </div>
      </div>
    </Section>
  );
}
