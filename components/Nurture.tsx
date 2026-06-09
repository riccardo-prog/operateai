'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

const mechanics = [
  {
    title: 'Watches every quiet lead',
    body: 'When someone goes silent without booking, the system picks them back up automatically. No reminders to set, no sticky notes.',
  },
  {
    title: 'Different angle every touch',
    body: 'Value-add, social proof, soft check-in, last call. Each follow-up is written fresh against their conversation, not a copy-paste sequence.',
  },
  {
    title: 'Pauses the second they reply',
    body: 'You handle the live one. If they go quiet again, the sequence picks back up. If they say no, it stops for good.',
  },
];

export default function Nurture() {
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
      id="nurture"
      ref={ref}
      className="relative px-6 md:px-8 py-20 md:py-28 border-t overflow-hidden"
      style={{ borderColor: 'rgba(255,255,255,0.06)' }}
    >
      {/* Soft violet glow to differentiate from the cyan Solution section above */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          style={{
            position: 'absolute',
            top: '10%',
            right: '-100px',
            width: '700px',
            height: '700px',
            background:
              'radial-gradient(circle, rgba(139,92,246,0.08) 0%, rgba(139,92,246,0.03) 35%, transparent 70%)',
          }}
        />
      </div>

      <div className="relative max-w-content mx-auto">
        <motion.p
          {...fade(0)}
          className="font-mono text-[11px] uppercase tracking-[0.2em] mb-4"
          style={{ color: 'rgba(167,139,250,0.85)' }}
        >
          The Nurture System
        </motion.p>

        <motion.h2
          {...fade(0.05)}
          className="font-display text-text-primary mb-5"
          style={{
            fontSize: 'clamp(2rem, 5vw, 3.25rem)',
            lineHeight: 1.15,
            letterSpacing: '-0.03em',
            fontWeight: 400,
          }}
        >
          Most of your money
          <br />
          is in the leads you stopped chasing.
        </motion.h2>

        <motion.p
          {...fade(0.1)}
          className="font-body text-text-secondary text-base md:text-lg max-w-xl mb-14"
          style={{ lineHeight: 1.7 }}
        >
          The lead who didn&apos;t book the first time isn&apos;t lost. They got busy, distracted, or weren&apos;t ready yet. The Nurture System brings them back so they come to you, not your competitor.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {mechanics.map((item, i) => (
            <motion.div
              key={item.title}
              {...fade(0.14 + i * 0.08)}
              className="glass rounded-2xl p-7 md:p-8 relative overflow-hidden"
              style={{
                boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.06)',
              }}
            >
              {/* Top accent line — violet to match section glow */}
              <div
                className="absolute top-0 left-0 right-0 h-[2px]"
                style={{
                  background:
                    'linear-gradient(90deg, rgba(167,139,250,0.7) 0%, rgba(167,139,250,0) 100%)',
                }}
              />
              <h3
                className="font-body font-semibold text-text-primary text-base md:text-lg mb-3"
                style={{ lineHeight: 1.3 }}
              >
                {item.title}
              </h3>
              <p
                className="font-body text-text-secondary text-sm"
                style={{ lineHeight: 1.7 }}
              >
                {item.body}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Outcome callout — what they actually get */}
        <motion.div
          {...fade(0.4)}
          className="rounded-2xl p-7 md:p-9"
          style={{
            background:
              'linear-gradient(135deg, rgba(167,139,250,0.05) 0%, rgba(17,24,39,0.4) 100%)',
            border: '1px solid rgba(167,139,250,0.18)',
          }}
        >
          <p className="font-mono text-[10px] text-text-muted uppercase tracking-[0.2em] mb-4">
            What you get back
          </p>
          <p
            className="font-body text-text-primary text-lg md:text-xl"
            style={{ lineHeight: 1.55 }}
          >
            Deals you would have written off as dead. Hours you would have spent
            on manual follow-up. Quiet leads that come back when they&apos;re ready,
            so your calendar fills itself while you&apos;re with clients.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
