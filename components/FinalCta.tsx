import type { CSSProperties } from 'react';

/* ───────────────────────────────────────────────────────────────────────────
   Lead Engine — Final CTA
   The one inverted section: a flat Ink band for the last, calm push to book a
   demo. Monochrome only, Outfit only, one clear action. The headline bookends
   the Problem section (paid for the leads, then losing them).
   ─────────────────────────────────────────────────────────────────────────── */

const c = {
  ink: '#0A0A0A',
  ash: '#9C9C9C',
  mist: '#C9C9C9',
  white: '#FFFFFF',
} as const;

const micro: CSSProperties = {
  fontWeight: 500,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
};

// The real scheduler used across the product.
const BOOK_HREF = 'https://cal.com/riccardocelebre/free-audit';

export default function FinalCta() {
  return (
    <section id="book" style={{ background: c.ink, color: c.white }}>
      <div className="mx-auto flex max-w-[720px] flex-col items-center px-6 py-[80px] text-center min-[820px]:py-[120px]">
        <span className="block" style={{ ...micro, fontSize: 11, color: c.ash }}>
          Get started
        </span>

        <h2
          className="mt-5 max-w-[640px] text-[32px] leading-[1.1] min-[820px]:text-[44px]"
          style={{ fontWeight: 700, letterSpacing: '-0.02em', color: c.white }}
        >
          Stop losing the leads you already paid for.
        </h2>

        <p
          className="mt-5 max-w-[600px]"
          style={{ fontWeight: 400, fontSize: 18, lineHeight: 1.6, color: c.mist }}
        >
          Book a free audit and watch Lead Engine qualify your real inbound. We set it up with you, and you
          see it work before you commit.
        </p>

        <a
          href={BOOK_HREF}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-9 inline-flex items-center justify-center rounded-lg transition-transform duration-200 ease-out hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0A]"
          style={{ background: c.white, color: c.ink, fontWeight: 500, fontSize: 15, padding: '14px 28px', borderRadius: 8 }}
        >
          Book a free audit
        </a>

        <p className="mt-4" style={{ fontWeight: 400, fontSize: 13, lineHeight: 1.5, color: c.ash }}>
          A ten minute walkthrough on your own leads. No new CRM, no commitment.
        </p>
      </div>
    </section>
  );
}
