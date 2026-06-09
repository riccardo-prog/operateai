import { ImageResponse } from 'next/og';

// Custom, hero-style Open Graph card (1200x630) — a designed brand image that
// echoes the landing hero (headline + the lead-score card motif), not a
// screenshot. Monochrome with the single green status accent. Typeset in
// Outfit (the site face), loaded from local woff files so the preview matches
// the page exactly.
export const runtime = 'edge';
export const alt = 'Lead Engine by OperateAI: qualify every real estate inquiry automatically';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const INK = '#0A0A0A';
const STEEL = '#6B6B6B';
const ASH = '#9C9C9C';
const GREEN = '#1E7F4F';
const GREEN_TINT = '#E7F2EC';

// Outfit weights, bundled as assets and resolved at the edge.
const fonts = Promise.all([
  fetch(new URL('../lib/og-fonts/outfit-400.woff', import.meta.url)).then((r) => r.arrayBuffer()),
  fetch(new URL('../lib/og-fonts/outfit-600.woff', import.meta.url)).then((r) => r.arrayBuffer()),
  fetch(new URL('../lib/og-fonts/outfit-700.woff', import.meta.url)).then((r) => r.arrayBuffer()),
  fetch(new URL('../lib/og-fonts/outfit-800.woff', import.meta.url)).then((r) => r.arrayBuffer()),
]);

export default async function OpengraphImage() {
  const [w400, w600, w700, w800] = await fonts;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#FFFFFF',
          padding: '72px 80px',
          fontFamily: 'Outfit',
        }}
      >
        {/* Brand lockup */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 13, height: 13, borderRadius: 999, background: GREEN }} />
          <div style={{ fontSize: 30, fontWeight: 700, color: INK, letterSpacing: -0.5 }}>OperateAI</div>
          <div style={{ fontSize: 24, color: ASH }}>Lead Engine</div>
        </div>

        {/* Headline + lead-card motif */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 56 }}>
          <div style={{ display: 'flex', flexDirection: 'column', width: 660 }}>
            <div style={{ display: 'flex', fontSize: 62, fontWeight: 700, color: INK, lineHeight: 1.04, letterSpacing: -2 }}>
              Turn inbound inquiries into qualified conversations.
            </div>
            <div style={{ display: 'flex', marginTop: 28, fontSize: 27, color: STEEL, lineHeight: 1.4 }}>
              AI lead qualification for real estate.
            </div>
          </div>

          {/* Lead-score card */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: 320,
              background: '#FFFFFF',
              border: '1px solid rgba(10,10,10,0.08)',
              borderRadius: 22,
              boxShadow: '0 18px 50px rgba(10,10,10,0.12)',
              padding: 26,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', fontSize: 14, fontWeight: 600, letterSpacing: 1.2, color: ASH }}>BUYER LEAD</div>
              <div
                style={{
                  display: 'flex',
                  background: GREEN_TINT,
                  color: GREEN,
                  borderRadius: 999,
                  fontSize: 15,
                  fontWeight: 600,
                  padding: '7px 14px',
                }}
              >
                Qualified
              </div>
            </div>
            <div style={{ display: 'flex', marginTop: 22, fontSize: 14, fontWeight: 600, letterSpacing: 1.2, color: ASH }}>
              LEAD SCORE
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, marginTop: 4 }}>
              <div style={{ display: 'flex', fontSize: 88, fontWeight: 800, color: INK, lineHeight: 1, letterSpacing: -3 }}>94</div>
              <div style={{ display: 'flex', fontSize: 28, color: ASH, marginBottom: 12 }}>/100</div>
            </div>
            <div style={{ display: 'flex', marginTop: 18, height: 1, background: 'rgba(10,10,10,0.08)' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 18 }}>
              <div style={{ width: 8, height: 8, borderRadius: 999, background: GREEN }} />
              <div style={{ display: 'flex', fontSize: 18, fontWeight: 600, color: INK }}>Book showing consultation</div>
            </div>
          </div>
        </div>

        {/* Tagline */}
        <div style={{ display: 'flex', fontSize: 25, color: '#3D3D3D' }}>
          Qualify every inquiry. Surface the serious ones. Keep the rest warm.
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Outfit', data: w400, weight: 400, style: 'normal' },
        { name: 'Outfit', data: w600, weight: 600, style: 'normal' },
        { name: 'Outfit', data: w700, weight: 700, style: 'normal' },
        { name: 'Outfit', data: w800, weight: 800, style: 'normal' },
      ],
    }
  );
}
