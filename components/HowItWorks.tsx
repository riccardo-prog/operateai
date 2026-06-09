import { Fragment } from 'react';
import type { CSSProperties } from 'react';

/* ───────────────────────────────────────────────────────────────────────────
   Lead Engine — How It Works
   The mechanism that answers the three problems raised above (qualifying,
   surfacing, follow-up). Brand content, not product UI: strictly monochrome,
   Outfit only, no status color. The routing is described in copy, the only
   flow visual is a thin monochrome connector from step 01 to 04.
   ─────────────────────────────────────────────────────────────────────────── */

const c = {
  ink: '#0A0A0A',
  graphite: '#1A1A1A',
  slate: '#3D3D3D',
  steel: '#6B6B6B',
  ash: '#9C9C9C',
  mist: '#C9C9C9',
  fog: '#E4E4E4',
  paper: '#F5F5F5',
  white: '#FFFFFF',
  border: 'rgba(10, 10, 10, 0.08)',
} as const;

const tabular: CSSProperties = { fontVariantNumeric: 'tabular-nums lining-nums' };

// Shared micro-label DNA, identical to the rest of the site.
const micro: CSSProperties = {
  fontWeight: 500,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
};

const steps = [
  {
    n: '01',
    title: 'Capture every inquiry',
    desc: 'Connect Meta, Realtor.ca, email, website forms, and DMs once. Every new inquiry lands in one place the moment it arrives.',
  },
  {
    n: '02',
    title: 'Qualify the lead',
    desc: 'Lead Engine engages each inquiry and reads its motivation, intent, and qualification, the way a sharp assistant would.',
  },
  {
    n: '03',
    title: 'Score and route',
    desc: 'Each lead is scored against your definition of ready. Serious buyers go to booking, the unsure get follow up questions, and the rest move to nurture.',
  },
  {
    n: '04',
    title: 'Hand off to you',
    desc: 'You get the full conversation, an AI summary, the score, and a recommended next action. You step in only for the conversations worth having.',
  },
] as const;

function ChevronRight() {
  return (
    <svg viewBox="0 0 16 16" width="13" height="13" fill="none" aria-hidden="true" style={{ color: c.ash }}>
      <path d="M6 3.5L10.5 8 6 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronDown() {
  return (
    <svg viewBox="0 0 16 16" width="13" height="13" fill="none" aria-hidden="true" style={{ color: c.ash }}>
      <path d="M3.5 6L8 10.5 12.5 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ── Uniform step card — built once, rendered four times. Identical DNA;
      only the index number and copy differ. h-full keeps all four equal. ── */
function StepCard({ n, title, desc }: { n: string; title: string; desc: string }) {
  return (
    <div
      className="flex h-full flex-col bg-white"
      style={{
        borderRadius: 16,
        border: `1px solid ${c.fog}`,
        boxShadow: '0 4px 12px rgba(10, 10, 10, 0.05)',
        padding: 24,
      }}
    >
      <span style={{ ...micro, ...tabular, fontSize: 13, color: c.ash }}>{n}</span>
      <h3 className="mt-4" style={{ fontWeight: 600, fontSize: 17, lineHeight: 1.3, color: c.ink }}>
        {title}
      </h3>
      <p className="mt-2.5" style={{ fontWeight: 400, fontSize: 14, lineHeight: 1.5, color: c.steel }}>
        {desc}
      </p>
    </div>
  );
}

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-white" style={{ color: c.ink }}>
      <div className="mx-auto max-w-[1120px] px-6 py-[72px] min-[820px]:py-[104px]">
        {/* Intro — left aligned, same structure as the Problem section */}
        <div>
          <span className="block" style={{ ...micro, fontSize: 11, color: c.ash }}>
            How it works
          </span>
          <h2
            className="mt-4 max-w-[640px] text-[30px] leading-[1.08] min-[820px]:text-[40px]"
            style={{ fontWeight: 700, letterSpacing: '-0.02em', color: c.ink }}
          >
            Every inquiry qualified and sorted before it reaches you.
          </h2>
          <p
            className="mt-5 max-w-[620px]"
            style={{ fontWeight: 400, fontSize: 18, lineHeight: 1.6, color: c.steel }}
          >
            Connect your lead sources once. From then on, Lead Engine handles every inquiry the same
            way, every time.
          </p>
        </div>

        {/* Desktop (>=820px): horizontal flow, thin connector with right chevrons */}
        <ol className="mt-14 hidden items-stretch min-[820px]:flex" aria-label="How Lead Engine works, steps 1 through 4">
          {steps.map((s, i) => (
            <Fragment key={s.n}>
              <li className="flex-1">
                <StepCard n={s.n} title={s.title} desc={s.desc} />
              </li>
              {i < steps.length - 1 && (
                <li aria-hidden="true" className="relative flex w-9 shrink-0 items-center justify-center lg:w-12">
                  <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2" style={{ background: c.mist }} />
                  <span className="relative flex items-center justify-center px-1" style={{ background: c.white }}>
                    <ChevronRight />
                  </span>
                </li>
              )}
            </Fragment>
          ))}
        </ol>

        {/* Mobile (<820px): single full-width column, vertical connector on the
            left with down chevrons. The rail extends into the gap to link cards. */}
        <ol className="mt-12 flex flex-col gap-5 min-[820px]:hidden">
          {steps.map((s, i) => {
            const last = i === steps.length - 1;
            return (
              <li key={s.n} className="relative flex gap-4">
                <div className="relative flex w-4 shrink-0 justify-center" aria-hidden="true">
                  <span
                    className="absolute top-1 w-px"
                    style={{ background: c.mist, bottom: last ? '0.25rem' : '-1.25rem' }}
                  />
                  {!last && (
                    <span
                      className="absolute left-1/2 flex -translate-x-1/2 items-center justify-center px-0.5"
                      style={{ background: c.white, bottom: '-1.1rem' }}
                    >
                      <ChevronDown />
                    </span>
                  )}
                </div>
                <div className="flex-1">
                  <StepCard n={s.n} title={s.title} desc={s.desc} />
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
