import Section from '@/components/ui/Section';
import SectionHeader from '@/components/ui/SectionHeader';

// Representative figures for the product preview only (labelled "Example").
const metrics = [
  { label: 'New leads received', value: '48' },
  { label: 'Leads responded to', value: '48' },
  { label: 'Follow-ups sent', value: '112' },
  { label: 'Conversations started', value: '31' },
  { label: 'Positive replies', value: '19' },
  { label: 'Booking opportunities', value: '7' },
];

export default function Reporting() {
  return (
    <Section id="reporting" tone="muted">
      <SectionHeader eyebrow="Reporting" title="Know what happens after the inquiry.">
        Lead Engine gives you visibility into the part of the funnel most agents
        never properly track: what happens after someone becomes a lead.
      </SectionHeader>

      {/* Weekly-summary mock on the soft tinted frame (Dovetail framing device) */}
      <div className="mt-12 max-w-3xl mx-auto rounded-3xl bg-gradient-to-br from-accent-soft-from to-accent-soft-to p-5 sm:p-8 lg:p-10">
        <div className="rounded-2xl bg-bg-elevated border border-border-soft p-6 md:p-8 shadow-[0_1px_2px_rgba(10,10,11,0.04)]">
          <div className="flex items-center justify-between pb-5 mb-6 border-b border-border-soft">
            <div>
              <p className="text-sm font-semibold tracking-tight text-ink-primary">Weekly summary</p>
              <p className="mt-0.5 text-xs text-ink-tertiary">Last 7 days</p>
            </div>
            <span className="rounded-full bg-bg-muted px-2.5 py-1 text-[11px] font-medium text-ink-tertiary">
              Example
            </span>
          </div>

          {/* Metric grid with hairline dividers */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-px bg-border-soft rounded-xl overflow-hidden border border-border-soft">
            {metrics.map((m) => (
              <div key={m.label} className="bg-bg-elevated p-4">
                <p className="text-2xl font-semibold tracking-tight text-ink-primary tabular-nums">
                  {m.value}
                </p>
                <p className="mt-1 text-xs text-ink-secondary leading-snug">{m.label}</p>
              </div>
            ))}
          </div>

          {/* Watch metric */}
          <div className="mt-4 flex items-center justify-between rounded-xl border border-border-soft px-4 py-3">
            <span className="flex items-center gap-2.5 text-sm text-ink-secondary">
              <span className="h-1.5 w-1.5 rounded-full bg-ink-tertiary" aria-hidden="true" />
              Missed or failed handoffs
            </span>
            <span className="text-sm font-semibold text-ink-primary tabular-nums">1</span>
          </div>

          {/* Recommended improvements */}
          <div className="mt-4 rounded-xl bg-bg-muted p-4">
            <p className="text-xs font-medium tracking-[0.14em] uppercase text-ink-tertiary mb-1">
              Recommended improvements
            </p>
            <p className="text-sm text-ink-primary">
              Tighten weekend follow-up timing and add a second touch for portal
              leads.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}
