'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

const timeline = [
  { time: '9:01 PM', event: 'Someone inquires about your service', status: 'missed' as const },
  { time: '9:03 PM', event: 'They message your competitor too', status: 'danger' as const },
  { time: '9:04 PM', event: 'Competitor replies instantly', status: 'danger' as const },
  { time: '9:12 PM', event: 'They book with the competitor', status: 'lost' as const },
  { time: '7:00 AM', event: 'You finally see the message', status: 'lost' as const },
];

export default function TheProblem() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px 0px' });
  const reduced = useReducedMotion();

  const fade = (delay: number) => ({
    initial: reduced ? {} : { opacity: 0, y: 16 },
    animate: isInView ? { opacity: 1, y: 0 } : {},
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
      delay: reduced ? 0 : delay,
    },
  });

  return (
    <section
      id="product"
      ref={ref}
      className="relative px-6 md:px-8 py-24 md:py-32 overflow-hidden"
    >
      {/* Red urgency glow */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          style={{
            position: 'absolute',
            top: '20%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '900px',
            height: '600px',
            background: 'radial-gradient(ellipse 60% 50%, rgba(239,68,68,0.06) 0%, rgba(245,158,11,0.03) 40%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
      </div>

      <div className="relative max-w-content mx-auto">
        {/* Section label */}
        <motion.div {...fade(0)} className="mb-6">
          <span className="font-mono text-[11px] text-red-400/70 uppercase tracking-[0.2em]">
            The problem
          </span>
        </motion.div>

        {/* Main headline — emotional, big */}
        <motion.h2
          {...fade(0.06)}
          className="font-display text-text-primary mb-5"
          style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            letterSpacing: '-0.03em',
            fontWeight: 400,
            lineHeight: 1.1,
          }}
        >
          Your leads aren&apos;t waiting.
          <br />
          <span className="text-red-400/90">They&apos;re leaving.</span>
        </motion.h2>

        {/* Supporting copy */}
        <motion.p
          {...fade(0.12)}
          className="font-body text-text-secondary text-lg max-w-xl mb-16"
          style={{ lineHeight: 1.7 }}
        >
          Every minute without a response is a minute your competitor has to close them instead. Here&apos;s what happens while you sleep:
        </motion.p>

        {/* Timeline visualization */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-16 items-start">
          {/* Left: The timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div
              className="absolute left-[7px] top-3 bottom-3 w-px"
              aria-hidden="true"
              style={{
                background: 'linear-gradient(180deg, rgba(239,68,68,0.3) 0%, rgba(239,68,68,0.6) 50%, rgba(239,68,68,0.2) 100%)',
              }}
            />

            <div className="flex flex-col gap-0">
              {timeline.map((item, i) => (
                <motion.div
                  key={i}
                  {...fade(0.14 + i * 0.07)}
                  className="relative pl-8 py-4 group"
                >
                  {/* Dot */}
                  <div
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-[15px] h-[15px] rounded-full border-2 flex items-center justify-center"
                    style={{
                      borderColor: item.status === 'missed'
                        ? 'rgba(251,191,36,0.6)'
                        : item.status === 'danger'
                          ? 'rgba(239,68,68,0.6)'
                          : 'rgba(239,68,68,0.8)',
                      background: item.status === 'lost'
                        ? 'rgba(239,68,68,0.2)'
                        : 'rgba(17,24,39,0.8)',
                    }}
                  >
                    {item.status === 'lost' && (
                      <div className="w-[5px] h-[5px] rounded-full bg-red-400" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-[11px] text-text-muted tracking-wide whitespace-nowrap w-16 flex-shrink-0">
                      {item.time}
                    </span>
                    <span
                      className={`font-body text-sm ${
                        item.status === 'lost'
                          ? 'text-red-400/90 font-medium'
                          : item.status === 'danger'
                            ? 'text-text-secondary'
                            : 'text-text-primary'
                      }`}
                      style={{ lineHeight: 1.5 }}
                    >
                      {item.event}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Time elapsed badge */}
            <motion.div
              {...fade(0.55)}
              className="mt-6 ml-8 inline-flex items-center gap-2 px-3 py-1.5 rounded-full"
              style={{
                background: 'rgba(239,68,68,0.08)',
                border: '1px solid rgba(239,68,68,0.2)',
              }}
            >
              <span className="font-mono text-[11px] text-red-400 tracking-wide">
                10 hours too late
              </span>
            </motion.div>
          </div>

          {/* Right: The stat + impact */}
          <div className="flex flex-col gap-6">
            {/* Big stat card */}
            <motion.div
              {...fade(0.3)}
              className="rounded-2xl p-8 md:p-10 relative"
              style={{
                background: 'linear-gradient(135deg, rgba(239,68,68,0.04) 0%, rgba(17,24,39,0.6) 100%)',
                border: '1px solid rgba(239,68,68,0.12)',
                boxShadow: '0 0 60px rgba(239,68,68,0.04)',
              }}
            >
              <p className="font-mono text-[10px] text-text-muted uppercase tracking-[0.2em] mb-4">
                Harvard Business Review
              </p>
              <p
                className="font-display text-text-primary mb-3"
                style={{
                  fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                  letterSpacing: '-0.03em',
                  fontWeight: 400,
                  lineHeight: 1,
                }}
              >
                100<span className="text-red-400">×</span>
              </p>
              <p className="font-body text-text-secondary text-base" style={{ lineHeight: 1.6 }}>
                more likely to connect with a lead if you respond within{' '}
                <span className="text-text-primary font-semibold">5 minutes</span>.
              </p>
              <p className="font-mono text-[10px] text-text-muted mt-4 tracking-wide">
                &quot;The Short Life of Online Sales Leads&quot; // HBR, 2011
              </p>
            </motion.div>

            {/* Impact bullets */}
            <motion.div
              {...fade(0.4)}
              className="rounded-2xl p-7 md:p-8"
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <p className="font-mono text-[10px] text-text-muted uppercase tracking-[0.2em] mb-5">
                What this costs you
              </p>
              <div className="flex flex-col gap-4">
                {[
                  'Leads go cold in minutes, not days',
                  'Manual follow-up can\'t scale past 10 leads/day',
                  'Every missed message is revenue your competitor collects',
                ].map((line, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div
                      className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                      style={{ background: 'rgba(239,68,68,0.6)' }}
                    />
                    <p className="font-body text-sm text-text-secondary" style={{ lineHeight: 1.6 }}>
                      {line}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Closing line — transition to solution */}
        <motion.div {...fade(0.55)} className="mt-16 pt-10" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
          <p
            className="font-body text-xl md:text-2xl font-semibold"
            style={{ lineHeight: 1.4 }}
          >
            <span className="text-text-primary">You don&apos;t have a lead problem. </span>
            <span className="text-text-primary">You have a </span>
            <span className="text-red-400">speed</span>
            <span className="text-text-primary"> problem.</span>
          </p>
          <p className="font-body text-text-muted text-sm mt-3">
            <span
              style={{
                background: 'linear-gradient(135deg, #38BDF8, #7dd3fc)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Lead Engine
            </span>
            {' '}responds in seconds. Every single lead.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
