import Button from '@/components/ui/Button';
import SectionLabel from '@/components/ui/SectionLabel';

// Workflow preview steps for the hero product visual.
const flowSteps = [
  { label: 'New lead', meta: 'Just now' },
  { label: 'Instant response', meta: 'Sent' },
  { label: 'Follow-up scheduled', meta: 'Queued' },
  { label: 'Lead qualified', meta: 'Buyer' },
  { label: 'Booking or handoff ready', meta: 'Ready' },
];

function HeroFlowMock() {
  return (
    // THE Dovetail pattern: mock UI sits on a white card inside a tinted
    // gradient frame. This soft tint is the framing device, not the bold
    // signature gradient (which lives only on the headline accent here).
    <div className="rounded-3xl bg-gradient-to-br from-accent-soft-from to-accent-soft-to p-5 sm:p-8 lg:p-10">
      <div className="rounded-2xl bg-bg-elevated border border-border-soft p-5 sm:p-6 shadow-[0_1px_2px_rgba(10,10,11,0.04)]">
        <div className="flex items-center justify-between pb-4 mb-2 border-b border-border-soft">
          <span className="text-sm font-semibold tracking-tight text-ink-primary">
            Lead flow
          </span>
          <span className="inline-flex items-center gap-1.5 text-[11px] text-ink-tertiary">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
            Live
          </span>
        </div>

        <ol className="relative pt-2">
          {flowSteps.map((step, i) => {
            const last = i === flowSteps.length - 1;
            return (
              <li key={step.label} className="relative flex items-center gap-4 pl-9 py-2.5">
                {/* Continuous connector rail; nodes sit on top and mask it. */}
                <span
                  aria-hidden="true"
                  className={`absolute left-[15px] w-px bg-border-soft ${
                    i === 0 ? 'top-1/2' : 'top-0'
                  } ${last ? 'bottom-1/2' : 'bottom-0'}`}
                />
                <span
                  aria-hidden="true"
                  className={`absolute left-1 flex h-6 w-6 items-center justify-center rounded-full ${
                    last
                      ? 'bg-ink-primary text-white'
                      : 'border border-border-soft bg-bg-elevated'
                  }`}
                >
                  {last ? (
                    <svg viewBox="0 0 16 16" fill="none" className="h-3 w-3">
                      <path
                        d="M3.5 8.5l3 3 6-7"
                        stroke="currentColor"
                        strokeWidth="1.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : (
                    <span className="h-2 w-2 rounded-full bg-ink-tertiary" />
                  )}
                </span>

                <span className="flex-1 text-sm text-ink-primary">{step.label}</span>
                <span className="rounded-full bg-bg-muted px-2.5 py-0.5 text-[11px] font-medium text-ink-secondary">
                  {step.meta}
                </span>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section
      id="home"
      className="relative bg-bg-canvas min-h-[calc(100dvh-4rem)] flex items-center overflow-hidden"
    >
      {/* Single subtle fade-in on load (the only hero animation). */}
      <div className="animate-fade-up w-full min-w-0 max-w-7xl mx-auto px-6 lg:px-8 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div className="flex flex-col min-w-0">
          <SectionLabel>Lead Response for Realtors</SectionLabel>

          <h1 className="font-body text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.05] text-ink-primary">
            Turn more real estate leads into{' '}
            <span className="relative inline-block">
              booked
              <span
                aria-hidden="true"
                className="absolute left-0 -bottom-1 md:-bottom-1.5 h-[3px] w-full rounded-full bg-gradient-to-r from-accent-from to-accent-to"
              />
            </span>{' '}
            conversations.
          </h1>

          <p className="mt-6 text-lg md:text-xl text-ink-secondary leading-relaxed max-w-2xl">
            Lead Engine responds to new leads in seconds, follows up
            automatically, and helps realtors stop losing opportunities to slow
            replies, missed messages, and inconsistent follow-up.
          </p>

          <div className="mt-9 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
            <Button href="#audit" variant="primary">
              Request a Lead Flow Audit
            </Button>
            <Button href="#how-it-works" variant="secondary">
              See How It Works
            </Button>
          </div>

          <p className="mt-5 text-sm text-ink-tertiary">
            For realtors already generating leads through ads, forms, DMs, or
            inbound inquiries.
          </p>
        </div>

        <div className="w-full min-w-0">
          <HeroFlowMock />
        </div>
      </div>
    </section>
  );
}
