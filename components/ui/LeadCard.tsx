import type { ComponentPropsWithoutRef, CSSProperties, ReactNode } from 'react';
import ScoreCounter from '@/components/ui/ScoreCounter';

/* ───────────────────────────────────────────────────────────────────────────
   Lead Engine — Lead card (Sarah Mitchell)
   The real product-UI card, extracted so the hero and the transparency section
   render the exact same artifact. Brand chrome elsewhere is monochrome; the only
   color lives in here as functional status (green/amber), because this is the
   actual product surface.
   ─────────────────────────────────────────────────────────────────────────── */

// Monochrome brand palette + functional status colors (card only).
export const c = {
  ink: '#0A0A0A',
  graphite: '#1A1A1A',
  slate: '#3D3D3D',
  steel: '#6B6B6B',
  ash: '#9C9C9C',
  mist: '#C9C9C9',
  fog: '#E4E4E4',
  paper: '#F5F5F5',
  white: '#FFFFFF',
  green: '#1E7F4F',
  greenTint: '#E7F2EC',
  amber: '#B5701A',
  amberTint: '#F6ECDD',
  border: 'rgba(10, 10, 10, 0.08)',
} as const;

// Shared micro-label DNA: Outfit 500, UPPERCASE, 0.08em tracking, Ash, ~10.5px.
export const micro: CSSProperties = {
  fontWeight: 500,
  fontSize: '10.5px',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: c.ash,
};

export const tabular: CSSProperties = { fontVariantNumeric: 'tabular-nums lining-nums' };

export function Micro({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return <span style={{ ...micro, ...style }}>{children}</span>;
}

type Tone = 'green' | 'amber' | 'gray';
const toneFg: Record<Tone, string> = { green: c.green, amber: c.amber, gray: c.steel };
const toneBg: Record<Tone, string> = { green: c.greenTint, amber: c.amberTint, gray: c.fog };

export function Pill({ label, tone }: { label: string; tone: Tone }) {
  return (
    <span
      className="inline-flex items-center whitespace-nowrap rounded-full"
      style={{ background: toneBg[tone], color: toneFg[tone], fontWeight: 500, fontSize: 11.5, padding: '3px 9px' }}
    >
      {label}
    </span>
  );
}

function ActionRow({ label, value, dot, strong }: { label: string; value: string; dot?: string; strong?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <Micro style={{ flexShrink: 0 }}>{label}</Micro>
      <span
        className="flex items-center gap-1.5 text-right"
        style={{ fontWeight: strong ? 600 : 400, fontSize: strong ? 13.5 : 12.5, color: strong ? c.ink : c.slate }}
      >
        {dot && <span className="inline-block rounded-full" style={{ width: 6, height: 6, background: dot }} aria-hidden="true" />}
        {value}
      </span>
    </div>
  );
}

function Divider() {
  return <div className="my-4" style={{ height: 1, background: c.border }} aria-hidden="true" />;
}

function Footer({ children }: { children: ReactNode }) {
  return (
    <div className="mt-4" style={{ fontWeight: 400, fontSize: 11, color: c.ash }}>
      {children}
    </div>
  );
}

/* ── The card itself. className/style are merged so callers can layer entrance
      animation or sizing without restyling the card's own chrome. ──────────── */
export default function LeadCard({ className = '', style, ...rest }: ComponentPropsWithoutRef<'article'>) {
  return (
    <article
      {...rest}
      className={`w-full bg-white ${className}`}
      style={{
        borderRadius: 24,
        border: '1px solid rgba(0,0,0,0.08)',
        background: '#FFFFFF',
        boxShadow: '0 18px 50px rgba(10,10,10,0.12)',
        padding: 24,
        ...style,
      }}
    >
      {/* Eyebrow + status pill */}
      <div className="flex items-center justify-between gap-3">
        <span style={{ fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#8A8A8A', fontWeight: 600 }}>
          Buyer lead · Via Meta ad
        </span>
        <span
          className="inline-flex items-center whitespace-nowrap"
          style={{ background: '#E7F2EC', color: '#1E7F4F', borderRadius: 999, fontSize: 12, fontWeight: 600, padding: '6px 12px' }}
        >
          Qualified
        </span>
      </div>

      {/* Lead identity row */}
      <div className="mt-4 flex items-center gap-3">
        <div
          className="flex shrink-0 items-center justify-center"
          style={{ width: 44, height: 44, borderRadius: 12, background: '#000000', color: '#FFFFFF', fontWeight: 600, fontSize: 15 }}
          aria-hidden="true"
        >
          SM
        </div>
        <div className="min-w-0">
          <div className="truncate leading-tight" style={{ fontWeight: 600, fontSize: 17, color: c.ink }}>
            Sarah Mitchell
          </div>
          <div className="mt-0.5 leading-tight" style={{ fontWeight: 400, fontSize: 13.5, color: c.steel }}>
            Buyer · Pre-approved
          </div>
        </div>
      </div>

      {/* Lead score */}
      <div className="mt-5">
        <Micro style={{ fontSize: 11, color: '#8A8A8A', fontWeight: 600 }}>Lead score</Micro>
        <div className="mt-1.5 flex items-end justify-between gap-3">
          <div className="flex items-baseline gap-1">
            <ScoreCounter
              target={94}
              style={{ ...tabular, fontWeight: 800, fontSize: 58, lineHeight: 0.92, letterSpacing: '-0.02em', color: c.ink }}
            />
            <span style={{ ...tabular, fontWeight: 500, fontSize: 18, color: c.ash }}>/100</span>
          </div>
          <span
            className="inline-flex items-center whitespace-nowrap"
            style={{ background: '#E7F2EC', color: '#1E7F4F', borderRadius: 999, fontSize: 12, fontWeight: 600, padding: '6px 12px' }}
          >
            High priority
          </span>
        </div>
      </div>

      {/* Details */}
      <div className="mt-5 flex flex-col gap-2.5">
        <ActionRow label="Looking for" value="3BR Condo" strong />
        <ActionRow label="Timeline" value="30–60 days" strong />
      </div>

      <Divider />

      {/* Next step */}
      <ActionRow label="Next step" value="Book showing consultation" dot={c.green} strong />
      <Footer>Just now</Footer>
    </article>
  );
}
