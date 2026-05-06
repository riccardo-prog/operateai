'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

const metrics = [
  { value: 'Seconds', label: 'Reply Time' },
  { value: '24/7', label: 'Coverage' },
  { value: '100%', label: 'Human-Approved' },
];

const included = [
  'Trained on how you actually talk to clients, so the replies sound like you',
  'You approve every outgoing message until you trust it fully',
  'Plugs into wherever your leads already message you',
  'Quiet leads get followed up automatically until they book or say no',
  'No long-term contracts. Founding partner rates available.',
];

function CheckIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4 flex-shrink-0 mt-0.5" aria-hidden="true">
      <path d="M3 8.5l3.5 3.5L13 5" stroke="#38BDF8" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function TrustSignals() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px 0px' });
  const reduced = useReducedMotion();

  const fade = (delay: number) => ({
    initial: reduced ? {} : { opacity: 0, y: 12 },
    animate: isInView ? { opacity: 1, y: 0 } : {},
    transition: {
      duration: 0.45,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
      delay: reduced ? 0 : delay,
    },
  });

  return (
    <section
      ref={ref}
      className="px-6 md:px-8 py-20 md:py-28 border-t"
      style={{ borderColor: 'rgba(255,255,255,0.06)' }}
    >
      <div className="max-w-content mx-auto">
        <motion.p
          {...fade(0)}
          className="font-mono text-[11px] text-text-muted uppercase tracking-[0.2em] mb-4"
        >
          Built for service businesses
        </motion.p>

        <motion.h2
          {...fade(0.05)}
          className="font-display text-text-primary mb-14"
          style={{
            fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
            fontWeight: 400,
          }}
        >
          What you get.
        </motion.h2>

        {/* Metrics cards with radial glow */}
        <motion.div {...fade(0.1)} className="relative mb-12">
          <div
            className="absolute inset-0 -inset-y-8 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(56,189,248,0.05) 0%, transparent 70%)',
            }}
            aria-hidden="true"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative">
            {metrics.map((metric) => (
              <div
                key={metric.label}
                className="flex flex-col items-center justify-center py-8 px-6 rounded-2xl text-center"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                <span
                  className="font-display block mb-2"
                  style={{
                    fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                    letterSpacing: '-0.03em',
                    fontWeight: 400,
                    color: '#38BDF8',
                  }}
                >
                  {metric.value}
                </span>
                <span className="font-mono text-[11px] text-text-muted uppercase tracking-[0.14em]">
                  {metric.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* What's included */}
        <motion.div
          {...fade(0.2)}
          className="rounded-2xl p-8 md:p-10 mb-8"
          style={{
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <p className="font-body font-semibold text-text-primary text-base mb-6">
            What&apos;s included
          </p>
          <ul className="flex flex-col gap-4">
            {included.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckIcon />
                <span className="font-body text-sm text-text-secondary" style={{ lineHeight: 1.6 }}>
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Early partner callout */}
        <motion.div
          {...fade(0.3)}
          className="rounded-xl px-6 py-5"
          style={{
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderLeft: '3px solid rgba(56,189,248,0.6)',
          }}
        >
          <p
            className="font-body text-text-secondary text-base"
            style={{ lineHeight: 1.65 }}
          >
            Currently onboarding our first clients.{' '}
            <span className="text-text-primary font-semibold">Early partners lock in founding pricing.</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
