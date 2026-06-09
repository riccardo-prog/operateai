import type { CSSProperties } from 'react';
import LeadCard, { c } from '@/components/ui/LeadCard';

/* ───────────────────────────────────────────────────────────────────────────
   Lead Engine — See It (transparency & control)
   Proof the product is real and that every decision is explained. Section chrome
   is strictly monochrome on Paper; the only color is inside the real <LeadCard>.
   Layout flips the hero: card on the left, copy on the right.
   ─────────────────────────────────────────────────────────────────────────── */

const micro: CSSProperties = {
  fontWeight: 500,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
};

const points = [
  {
    label: 'The score',
    title: 'See why, not just what.',
    desc: 'Motivation, intent, and qualification are scored separately, so you know exactly why a lead is rated the way it is.',
  },
  {
    label: 'The summary',
    title: 'Catch up in one line.',
    desc: 'The whole conversation distilled into a plain summary, so you walk in already knowing the lead.',
  },
  {
    label: 'The next action',
    title: 'Know what to do next.',
    desc: 'Book, follow up, or nurture. Lead Engine recommends the next step and shows its reasoning.',
  },
  {
    label: 'The conversation',
    title: 'Nothing is hidden.',
    desc: 'Every message is yours to read, and you can override any score or action. The AI prepares the decision. You make it.',
  },
];

export default function SeeIt() {
  return (
    <section id="see-it" style={{ background: c.paper, color: c.ink }}>
      <div className="mx-auto max-w-[1120px] px-6 py-[72px] min-[820px]:py-[104px]">
        {/* Card on the left, copy on the right (desktop). On mobile the order is
            intro, card, points, closing, so the three blocks are separate DOM
            nodes placed via grid areas at >=820px. */}
        <div className="flex flex-col gap-10 min-[820px]:grid min-[820px]:grid-cols-[minmax(0,440px)_minmax(0,1fr)] min-[820px]:grid-rows-[auto_auto] min-[820px]:items-center min-[820px]:gap-x-16 min-[820px]:gap-y-0">
          {/* INTRO (right column, top row) */}
          <div className="min-[820px]:[grid-column:2] min-[820px]:[grid-row:1]">
            <span className="block" style={{ ...micro, fontSize: 11, color: c.ash }}>
              What you see
            </span>
            <h2
              className="mt-4 max-w-[520px] text-[28px] leading-[1.1] min-[820px]:text-[38px]"
              style={{ fontWeight: 700, letterSpacing: '-0.02em', color: c.ink }}
            >
              Every score comes with its reasoning.
            </h2>
            <p
              className="mt-5 max-w-[520px]"
              style={{ fontWeight: 400, fontSize: 18, lineHeight: 1.6, color: c.steel }}
            >
              For every lead, Lead Engine shows the full conversation, how the score was reached, a
              plain summary, and the recommended next action. You stay the decision maker.
            </p>
          </div>

          {/* CARD (left column, spanning both rows, vertically centered) */}
          <div className="min-[820px]:[grid-column:1] min-[820px]:[grid-row:1/3] min-[820px]:self-center">
            <div className="relative mx-auto w-full max-w-[400px] min-[820px]:mx-0 min-[820px]:max-w-[380px]">
              {/* Optional flat backing: a crisp Fog outline, offset, no glow. */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 translate-x-3 translate-y-3"
                style={{ borderRadius: 24, border: `1px solid ${c.fog}` }}
              />
              <LeadCard className="relative" />
            </div>
          </div>

          {/* POINTS + CLOSING (right column, bottom row) */}
          <div className="min-[820px]:mt-10 min-[820px]:[grid-column:2] min-[820px]:[grid-row:2]">
            <div>
              {points.map((p, i) => (
                <div
                  key={p.label}
                  className="py-5 first:pt-0"
                  style={i > 0 ? { borderTop: `1px solid ${c.fog}` } : undefined}
                >
                  <span className="block" style={{ ...micro, fontSize: 11, color: c.ash }}>
                    {p.label}
                  </span>
                  <h3 className="mt-2" style={{ fontWeight: 600, fontSize: 16, lineHeight: 1.3, color: c.ink }}>
                    {p.title}
                  </h3>
                  <p className="mt-1.5" style={{ fontWeight: 400, fontSize: 14, lineHeight: 1.5, color: c.steel }}>
                    {p.desc}
                  </p>
                </div>
              ))}
            </div>

            <p className="mt-8" style={{ fontWeight: 500, fontSize: 16, lineHeight: 1.5, color: c.graphite }}>
              Every lead handled. Every decision explained.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
