import type { ReactNode } from 'react';
import LeadCard, { c, micro, Micro, Pill } from '@/components/ui/LeadCard';

/* ───────────────────────────────────────────────────────────────────────────
   Lead Engine — Hero
   Typeface: Outfit only. Brand chrome is strictly monochrome; the only color
   lives inside the product cards as functional status. The front card is the
   shared <LeadCard>; behind it sit three axis-aligned supporting cards forming
   a clean composed stack (no rotation, no glow). Each supporting card peeks only
   from the TOP, showing a full, un-sliced header row, with a soft mask fading
   its lower edge so it reads as "there is more behind."
   ─────────────────────────────────────────────────────────────────────────── */

// Shadow ladder (locked system).
const SHADOW = {
  back: '0 4px 12px rgba(10,10,10,0.05)',
  mid: '0 10px 28px rgba(10,10,10,0.08)',
  front: '0 18px 50px rgba(10,10,10,0.12)',
} as const;

// Soft fade on each supporting card's lower edge.
const EDGE_MASK = 'linear-gradient(to bottom, #000 56%, transparent 100%)';

/* ── Supporting (background) card. Absolutely placed within the cluster on
   >=641px; hidden entirely on small screens so the hero card stands alone. ── */
function SupportCard({ top, z, width, delay, shadow, dot, source, title, pill }: {
  top: number;
  z: number;
  width: number;
  delay: number;
  shadow: string;
  dot: string;
  source: string;
  title: string;
  pill: ReactNode;
}) {
  return (
    <div
      className="hidden min-[641px]:block min-[641px]:absolute min-[641px]:left-1/2 min-[641px]:-translate-x-1/2"
      style={{ top, zIndex: z, width }}
    >
      <article
        className="hero-card-anim w-full bg-white"
        style={{
          borderRadius: 16,
          border: `1px solid ${c.border}`,
          boxShadow: shadow,
          padding: '14px 16px',
          animationDelay: `${delay}ms`,
          maskImage: EDGE_MASK,
          WebkitMaskImage: EDGE_MASK,
        }}
      >
        {/* Header band: source + status pill, always fully visible in the peek. */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex min-w-0 items-center gap-1.5">
            <span className="inline-block shrink-0 rounded-full" style={{ width: 7, height: 7, background: dot }} aria-hidden="true" />
            <Micro style={{ color: c.steel }}>{source}</Micro>
          </div>
          {pill}
        </div>
        <div className="mt-2 truncate" style={{ fontWeight: 600, fontSize: 14, color: c.ink }}>
          {title}
        </div>
      </article>
    </div>
  );
}

export default function Hero() {
  return (
    <section id="home" className="relative bg-white" style={{ color: c.ink }}>
      <div className="mx-auto flex max-w-[1280px] flex-col justify-center px-6 py-16 sm:px-8 min-[900px]:min-h-[calc(100dvh-68px)] min-[900px]:py-10">
        <div className="grid w-full grid-cols-1 items-center gap-12 min-[900px]:grid-cols-[minmax(0,1fr)_400px] min-[900px]:gap-12">
          {/* LEFT — copy */}
          <div className="flex min-w-0 flex-col">
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
                className="group inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg px-7 py-3.5 transition-[transform,box-shadow] duration-150 hover:-translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0A0A0A]"
                style={{ background: c.ink, color: c.white, fontWeight: 500, fontSize: 15, boxShadow: SHADOW.back }}
              >
                Book a free audit
                <svg
                  viewBox="0 0 16 16"
                  width="15"
                  height="15"
                  fill="none"
                  aria-hidden="true"
                  className="transition-transform duration-150 ease-out group-hover:translate-x-[3px]"
                >
                  <path d="M2.5 8h10M9 4.5L12.5 8 9 11.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a
                href="#how-it-works"
                className="group inline-flex min-h-[44px] items-center justify-center rounded-lg border px-7 py-3.5 transition-colors duration-150 border-[#C9C9C9] hover:border-[#3D3D3D] hover:bg-[#F5F5F5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0A0A0A]"
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

          {/* RIGHT — composed stack: the Sarah Mitchell card forward over three
              supporting cards (new inbound, mid-conversation, long-term nurture).
              On <=640px only the hero card renders. */}
          <div
            className="relative isolate mx-auto w-full max-w-[400px] min-[641px]:h-[600px] min-[641px]:w-[380px] min-[641px]:max-w-none"
            role="img"
            aria-label="Lead Engine preview: Sarah Mitchell, a qualified buyer lead scored 94 out of 100 and being booked for a showing, sits in front of three incoming leads being handled automatically: a new Meta lead, an Instagram DM mid conversation, and a long-term nurture lead."
          >
            {/* Back — new inbound (animates first) */}
            <SupportCard
              top={12}
              z={20}
              width={330}
              delay={480}
              shadow={SHADOW.back}
              dot={c.green}
              source="Meta lead"
              title="New buyer inquiry"
              pill={<Pill label="New" tone="green" />}
            />
            {/* Middle — mid-conversation */}
            <SupportCard
              top={58}
              z={30}
              width={330}
              delay={550}
              shadow={SHADOW.back}
              dot={c.green}
              source="Instagram DM"
              title="Asked about a listing"
              pill={<Pill label="Responding" tone="green" />}
            />
            {/* Nearest — long-term nurture (amber), full header visible above hero */}
            <SupportCard
              top={104}
              z={40}
              width={330}
              delay={620}
              shadow={SHADOW.mid}
              dot={c.amber}
              source="Pipeline"
              title="Long-term nurture"
              pill={<Pill label="Nurture" tone="amber" />}
            />

            {/* Front — Sarah Mitchell (lands last) */}
            <div
              className="mx-auto w-full max-w-[400px] min-[641px]:absolute min-[641px]:left-1/2 min-[641px]:top-[150px] min-[641px]:w-[350px] min-[641px]:max-w-none min-[641px]:-translate-x-1/2"
              style={{ zIndex: 50 }}
            >
              <LeadCard data-card="sarah" className="hero-card-anim" style={{ animationDelay: '690ms' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll affordance — a dot travels down a hairline track (desktop). */}
      <div
        className="pointer-events-none absolute bottom-9 left-6 hidden select-none items-center gap-3 sm:left-8 min-[900px]:flex"
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
