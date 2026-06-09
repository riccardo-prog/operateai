import type { ReactNode } from 'react';
import LeadCard, { c, micro, Micro, Pill } from '@/components/ui/LeadCard';

/* ───────────────────────────────────────────────────────────────────────────
   Lead Engine — Hero
   Single self-contained component. Typeface: Outfit only (loaded globally via
   next/font as `font-body`, weights 400/500/600/700). Brand chrome is strictly
   monochrome; the only color lives inside the product cards as functional status.
   The front card is the shared <LeadCard>; the fanned deck behind it is local.
   ─────────────────────────────────────────────────────────────────────────── */

/* ── Supporting (background) card — exactly 4 of these sit behind the front card.
   Fixed 380×150 deck plates: visible enough to read the source + status, but
   muted (opacity 0.72, faint blur) so they never compete with the front card.
   On mobile the bottom-row pair is hidden so only the front + 2 cards remain. ── */

function SupportCard({ wrapper, mobileHidden, z, delay, name, dot, eyebrow, title, pill }: {
  wrapper: string;
  mobileHidden?: boolean;
  z: number;
  delay: number;
  name: string;
  dot: string;
  eyebrow: string;
  title: string;
  pill: ReactNode;
}) {
  return (
    <div
      className={`w-full max-w-[380px] min-[1380px]:max-w-none ${mobileHidden ? 'hidden min-[1380px]:block ' : ''}${wrapper}`}
      style={{ zIndex: z }}
    >
      <article
        data-card={name}
        className="hero-card-anim w-full bg-white min-[1380px]:h-[150px]"
        style={{
          borderRadius: 22,
          border: '1px solid rgba(0,0,0,0.07)',
          background: '#FFFFFF',
          boxShadow: '0 20px 60px rgba(0,0,0,0.08)',
          opacity: 0.72,
          filter: 'blur(0.2px)',
          padding: 18,
          animationDelay: `${delay}ms`,
        }}
      >
        {/* Header band carries the status: source + state pill, recognizable
            even when only the top strip of the card peeks out. */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex min-w-0 items-center gap-1.5">
            <span className="inline-block shrink-0 rounded-full" style={{ width: 7, height: 7, background: dot }} aria-hidden="true" />
            <Micro style={{ color: c.steel }}>{eyebrow}</Micro>
          </div>
          {pill}
        </div>
        <div className="mt-3 truncate" style={{ fontWeight: 600, fontSize: 15, color: c.ink }}>
          {title}
        </div>
      </article>
    </div>
  );
}

/* ── Hero ─────────────────────────────────────────────────────────────────── */

export default function Hero() {
  return (
    <section id="home" className="relative bg-white" style={{ color: c.ink }}>
      <div className="mx-auto flex max-w-[1480px] flex-col justify-center px-6 py-16 sm:px-8 md:py-20 min-[1380px]:min-h-[calc(100dvh-5rem)] min-[1380px]:py-12">
        <div className="grid w-full grid-cols-1 items-center gap-12 min-[1380px]:grid-cols-[minmax(0,1fr)_620px] min-[1380px]:gap-10">
        {/* LEFT — copy (solid Ink/Graphite, no underline accent, no color) */}
        <div className="flex min-w-0 flex-col">
          {/* Editorial eyebrow: a crisp ink hairline leads the micro-label. */}
          <div className="hero-rise flex items-center gap-3" style={{ animationDelay: '40ms' }}>
            <span className="h-px w-7 shrink-0" style={{ background: c.ink }} aria-hidden="true" />
            <Micro style={{ fontSize: '11px' }}>AI lead qualification for real estate</Micro>
          </div>

          <h1
            className="hero-rise mt-6 text-balance text-[40px] leading-[1.02] sm:text-5xl md:text-6xl xl:text-[64px]"
            style={{ animationDelay: '120ms', fontWeight: 700, letterSpacing: '-0.025em', color: c.ink }}
          >
            Turn inbound inquiries into qualified conversations.
          </h1>

          <p
            className="hero-rise mt-6 max-w-xl text-pretty"
            style={{ animationDelay: '230ms', fontWeight: 400, fontSize: 19, lineHeight: 1.6, color: c.steel }}
          >
            Lead Engine qualifies every inbound inquiry automatically, surfacing serious buyers and sellers while keeping
            future opportunities warm until they&rsquo;re ready.
          </p>

          <div
            className="hero-rise mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4"
            style={{ animationDelay: '320ms' }}
          >
            <a
              href="#book"
              className="group inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 transition-opacity duration-200 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0A0A0A]"
              style={{ background: c.ink, color: c.white, fontWeight: 500, fontSize: 15 }}
            >
              Book a demo
              <svg
                viewBox="0 0 16 16"
                width="15"
                height="15"
                fill="none"
                aria-hidden="true"
                className="transition-transform duration-200 ease-out group-hover:translate-x-0.5"
              >
                <path d="M2.5 8h10M9 4.5L12.5 8 9 11.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a
              href="#how-it-works"
              className="group inline-flex items-center justify-center rounded-full border px-7 py-3.5 transition-colors duration-200 border-[#C9C9C9] hover:border-[#6B6B6B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0A0A0A]"
              style={{ background: c.white, color: c.ink, fontWeight: 500, fontSize: 15 }}
            >
              <span className="relative">
                See how it works
                <span
                  aria-hidden="true"
                  className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100"
                  style={{ background: c.ink }}
                />
              </span>
            </a>
          </div>

          <p
            className="hero-rise mt-6"
            style={{ animationDelay: '400ms', fontWeight: 400, fontSize: 13.5, color: c.steel }}
          >
            Works with inbound from Meta, Realtor.ca, email, website forms, and more.
          </p>
        </div>

        {/* RIGHT — one cohesive deck: a centered front card over a fanned stack.
            Mobile stacks the cards in a column; the desktop deck is an absolutely
            positioned cluster inside a fixed 560×420 frame. Rotation + position
            live on each wrapper so the front card's entrance animation (which
            resets transform) never wipes the fan. */}
        <div
          className="mx-auto flex w-full max-w-[420px] flex-col items-center gap-4 min-[1380px]:relative min-[1380px]:mx-0 min-[1380px]:block min-[1380px]:h-[460px] min-[1380px]:w-[620px] min-[1380px]:max-w-none min-[1380px]:origin-center min-[1380px]:[transform:translate(-80px,20px)_scale(1.08)]"
          role="img"
          aria-label="Lead Engine preview: Sarah Mitchell, a qualified buyer lead scored 94 out of 100 and being booked for a showing, sits at the front of a fanned stack of incoming leads from Meta, Instagram, nurture, and a seller inquiry."
        >
          {/* Front — Sarah Mitchell (centered, largest, highest z, fully readable) */}
          <div
            className="order-first w-full max-w-[420px] min-[1380px]:absolute min-[1380px]:left-[120px] min-[1380px]:top-[90px] min-[1380px]:w-[440px] min-[1380px]:max-w-none"
            style={{ zIndex: 50 }}
          >
            <LeadCard
              data-card="sarah"
              className="hero-card-anim min-[1380px]:min-h-[300px]"
              style={{ animationDelay: '480ms' }}
            />
          </div>

          {/* Back top-left — Meta lead */}
          <SupportCard
            name="meta"
            z={20}
            delay={600}
            wrapper="min-[1380px]:absolute min-[1380px]:left-[40px] min-[1380px]:top-[50px] min-[1380px]:w-[380px] min-[1380px]:rotate-[-4deg]"
            eyebrow="Meta lead"
            dot={c.green}
            title="New buyer inquiry"
            pill={<Pill label="New" tone="green" />}
          />

          {/* Back top-right — Instagram DM */}
          <SupportCard
            name="instagram"
            z={25}
            delay={640}
            wrapper="min-[1380px]:absolute min-[1380px]:left-[220px] min-[1380px]:top-[35px] min-[1380px]:w-[380px] min-[1380px]:rotate-[4deg]"
            eyebrow="Instagram DM"
            dot={c.green}
            title="Asked about listing"
            pill={<Pill label="Responding" tone="green" />}
          />

          {/* Back bottom-left — Pipeline (hidden on mobile) */}
          <SupportCard
            name="nurture"
            mobileHidden
            z={15}
            delay={680}
            wrapper="min-[1380px]:absolute min-[1380px]:left-[55px] min-[1380px]:top-[250px] min-[1380px]:w-[380px] min-[1380px]:rotate-[3deg]"
            eyebrow="Pipeline"
            dot={c.steel}
            title="Needs long-term nurture"
            pill={<Pill label="Nurture" tone="gray" />}
          />

          {/* Back bottom-right — Seller inquiry (hidden on mobile) */}
          <SupportCard
            name="seller"
            mobileHidden
            z={10}
            delay={720}
            wrapper="min-[1380px]:absolute min-[1380px]:left-[255px] min-[1380px]:top-[245px] min-[1380px]:w-[380px] min-[1380px]:rotate-[-3deg]"
            eyebrow="Seller inquiry"
            dot={c.amber}
            title="Home valuation request"
            pill={<Pill label="Follow up" tone="amber" />}
          />
        </div>
        </div>
      </div>

      {/* Scroll affordance — a dot travels down a hairline track (desktop). */}
      <div
        className="pointer-events-none absolute bottom-9 left-6 hidden select-none items-center gap-3 sm:left-8 min-[1380px]:flex"
        aria-hidden="true"
      >
        <span style={{ ...micro, fontSize: '9.5px', writingMode: 'vertical-rl' }}>Scroll</span>
        <span className="relative block h-9 w-px" style={{ background: c.fog }}>
          <span
            className="hero-scroll-dot absolute left-1/2 top-0 block h-1.5 w-1.5 -translate-x-1/2 rounded-full"
            style={{ background: c.ink }}
          />
        </span>
      </div>
    </section>
  );
}
