'use client';

import type { CSSProperties, ReactNode } from 'react';
import { c } from '@/components/ui/LeadCard';
import RevealOnScroll from '@/components/ui/RevealOnScroll';

/* ───────────────────────────────────────────────────────────────────────────
   Lead Engine — Ora (inbound assistant)
   Experiential proof plus a self-serve Lead Flow Audit: let the visitor have the
   qualifying conversation their leads would get, and surface where their own
   inbound slips. Section chrome is monochrome; the only color is a single green
   live dot beside Ora's name. The CTA opens the real, globally-mounted widget.
   ─────────────────────────────────────────────────────────────────────────── */

const micro: CSSProperties = {
  fontWeight: 500,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
};

function Bubble({ role, children }: { role: 'assistant' | 'user'; children: ReactNode }) {
  const assistant = role === 'assistant';
  return (
    <div
      className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 ${assistant ? 'self-start' : 'self-end'}`}
      style={{
        background: assistant ? c.fog : c.ink,
        color: assistant ? c.graphite : c.white,
      }}
    >
      <p style={{ fontWeight: 400, fontSize: 14, lineHeight: 1.5 }}>{children}</p>
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
    <section id="ora" className="bg-white" style={{ color: c.ink }}>
      <div className="mx-auto max-w-[1120px] px-6 py-[72px] min-[820px]:py-[104px]">
        <div className="grid grid-cols-1 items-center gap-12 min-[820px]:grid-cols-2 min-[820px]:gap-16">
          {/* LEFT — copy */}
          <div className="min-w-0">
            <span className="block" style={{ ...micro, fontSize: 11, color: c.ash }}>
              Inbound assistant
            </span>
            <h2
              className="mt-4 max-w-[560px] text-[28px] leading-[1.1] min-[820px]:text-[40px]"
              style={{ fontWeight: 700, letterSpacing: '-0.02em', color: c.ink }}
            >
              Talk to Ora the way your leads would.
            </h2>
            <p
              className="mt-5 max-w-[560px]"
              style={{ fontWeight: 400, fontSize: 18, lineHeight: 1.6, color: c.steel }}
            >
              Ora is the same assistant that talks to your buyers and sellers. Tell her how your
              leads reach you and she will show you exactly where they slip today. It is the fast
              first response your inbound is missing.
            </p>

            <button
              type="button"
              onClick={openOra}
              className="mt-8 inline-flex items-center justify-center transition-colors duration-200 hover:bg-[#F5F5F5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0A0A0A]"
              style={{
                background: c.white,
                border: `1px solid ${c.mist}`,
                color: c.ink,
                fontWeight: 500,
                fontSize: 15,
                padding: '12px 22px',
                borderRadius: 8,
              }}
            >
              Talk to Ora
            </button>
          </div>

          {/* RIGHT — chat widget (seeded example state; CTA opens the live Ora) */}
          <div className="w-full max-w-[440px] mx-auto min-[820px]:mx-0 min-[820px]:ml-auto min-[820px]:mr-0">
            <div
              className="w-full overflow-hidden bg-white"
              style={{
                borderRadius: 18,
                border: `1px solid ${c.fog}`,
                boxShadow: '0 20px 60px rgba(10, 10, 10, 0.08)',
              }}
            >
              {/* Header */}
              <div
                className="flex items-center justify-between px-4 py-3.5"
                style={{ borderBottom: `1px solid ${c.fog}` }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
                    style={{ background: c.ink, color: c.white, fontWeight: 600, fontSize: 14 }}
                    aria-hidden="true"
                  >
                    O
                  </div>
                  <div className="leading-tight">
                    <div className="flex items-center gap-2">
                      <span style={{ fontWeight: 600, fontSize: 15, color: c.ink }}>Ora</span>
                      {/* The one allowed color: a small green live dot. */}
                      <span
                        className="live-dot inline-block rounded-full"
                        style={{ width: 7, height: 7, background: c.green }}
                        aria-label="Online"
                        role="img"
                      />
                    </div>
                    <span style={{ fontWeight: 400, fontSize: 12.5, color: c.steel }}>
                      Inbound assistant
                    </span>
                  </div>
                </div>
                <svg viewBox="0 0 16 16" width="16" height="16" fill="none" aria-hidden="true" style={{ color: c.ash }}>
                  <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>

              {/* Messages */}
              <div className="flex flex-col gap-3 px-4 py-4">
                <RevealOnScroll delay={0} className="flex flex-col">
                  <Bubble role="assistant">
                    Hey, I&rsquo;m Ora. Tell me how leads reach you and I&rsquo;ll show you where they
                    tend to slip.
                  </Bubble>
                </RevealOnScroll>
                <RevealOnScroll delay={0.07} className="flex flex-col">
                  <Bubble role="user">Mostly Meta lead forms and Instagram DMs.</Bubble>
                </RevealOnScroll>
                <RevealOnScroll delay={0.14} className="flex flex-col">
                  <Bubble role="assistant">
                    Those go cold fast when the first reply lags. How quickly do they get answered at
                    9pm on a weekend?
                  </Bubble>
                </RevealOnScroll>
              </div>

              {/* Input (decorative; real typing happens in the live widget) */}
              <div className="flex items-center gap-2 px-3 py-3" style={{ borderTop: `1px solid ${c.fog}` }}>
                <div
                  className="flex-1 truncate"
                  style={{ border: `1px solid ${c.mist}`, borderRadius: 8, padding: '9px 14px', fontSize: 13.5, color: c.ash }}
                  aria-hidden="true"
                >
                  Ask about Lead Engine...
                </div>
                <span
                  className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
                  style={{ background: c.ink, color: c.white }}
                  aria-hidden="true"
                >
                  <svg viewBox="0 0 16 16" width="16" height="16" fill="none">
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
          </div>
        </div>
      </div>
    </section>
  );
}
