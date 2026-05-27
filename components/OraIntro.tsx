'use client';

import Section from '@/components/ui/Section';
import SectionLabel from '@/components/ui/SectionLabel';
import Button from '@/components/ui/Button';

const points = [
  'Answers questions about Lead Engine',
  'Collects lead flow details',
  'Guides visitors toward a Lead Flow Audit',
  'Shows how fast, helpful inbound response can feel',
];

function Check() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4 mt-0.5 shrink-0 text-ink-secondary">
      <path
        d="M3.5 8.5l3 3 6-7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Static, non-interactive replica of the floating Ora panel.
function OraPanelPreview() {
  return (
    <div
      aria-hidden="true"
      className="mx-auto w-full max-w-[380px] rounded-2xl bg-bg-elevated border border-border-soft shadow-[0_8px_32px_rgba(10,10,11,0.08)] overflow-hidden"
    >
      <div className="flex items-center justify-between px-4 py-3 border-b border-border-soft">
        <div className="flex items-center gap-2.5">
          <span className="h-2 w-2 rounded-full bg-gradient-to-br from-accent-from to-accent-to" />
          <div className="leading-tight">
            <p className="text-sm font-semibold text-ink-primary">Ora</p>
            <p className="text-xs text-ink-secondary">Inbound assistant</p>
          </div>
        </div>
        <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4 text-ink-tertiary">
          <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>

      <div className="px-4 py-4 flex flex-col gap-3">
        <div className="self-start max-w-[85%] rounded-2xl bg-bg-muted text-ink-primary px-3.5 py-2.5">
          <p className="text-sm leading-relaxed">
            Hey, I&apos;m Ora. Tell me how leads reach you and I&apos;ll show you
            where they tend to slip.
          </p>
        </div>
        <div className="self-end max-w-[85%] rounded-2xl bg-ink-primary text-white px-3.5 py-2.5">
          <p className="text-sm leading-relaxed">Mostly Meta lead forms and Instagram DMs.</p>
        </div>
        <div className="self-start max-w-[85%] rounded-2xl bg-bg-muted text-ink-primary px-3.5 py-2.5">
          <p className="text-sm leading-relaxed">
            Those go cold fast when the first reply lags. How quickly do they get
            answered at 9pm on a weekend?
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 border-t border-border-soft p-3">
        <div className="flex-1 rounded-full border border-border-soft bg-bg-canvas px-4 py-2 text-sm text-ink-tertiary">
          Ask about Lead Engine...
        </div>
        <span className="shrink-0 inline-flex h-9 w-9 items-center justify-center rounded-full bg-ink-primary text-white">
          <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4">
            <path
              d="M14 2L7 9M14 2l-5 12-2-5-5-2 12-5z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
    </div>
  );
}

export default function OraIntro() {
  const openOra = () => {
    try {
      sessionStorage.setItem('ora-pending-open', '1');
    } catch {
      // sessionStorage unavailable; the event still opens an already-mounted panel
    }
    window.dispatchEvent(new CustomEvent('open-ora'));
  };

  return (
    <Section id="ora" tone="canvas">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div className="min-w-0">
          <SectionLabel>Inbound Assistant</SectionLabel>
          <h2 className="font-body text-3xl md:text-5xl font-semibold tracking-tight leading-[1.1] text-ink-primary">
            Meet Ora, our inbound assistant.
          </h2>
          <p className="mt-5 text-lg text-ink-secondary leading-relaxed max-w-xl">
            Ora is built into this site to answer questions, collect lead flow
            details, and help visitors see whether Lead Engine is a fit. A small
            example of the same principle behind Lead Engine: fast, helpful
            response before interest goes cold.
          </p>

          <ul className="mt-8 flex flex-col gap-3">
            {points.map((p) => (
              <li key={p} className="flex items-start gap-3">
                <Check />
                <span className="text-ink-secondary">{p}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <Button variant="secondary" onClick={openOra}>
              Ask Ora a question
            </Button>
          </div>
        </div>

        <div className="min-w-0">
          <OraPanelPreview />
        </div>
      </div>
    </Section>
  );
}
