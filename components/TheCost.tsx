'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

export default function TheCost() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px 0px' });
  const prefersReduced = useReducedMotion();

  const fade = (delay: number) => ({
    initial: prefersReduced ? {} : { opacity: 0, y: 16 },
    animate: isInView ? { opacity: 1, y: 0 } : {},
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1] as [number,number,number,number],
      delay: prefersReduced ? 0 : delay,
    },
  });

  return (
    <section
      ref={ref}
      className="px-6 md:px-8 py-16 md:py-24 border-t"
      style={{ borderColor: 'rgba(255,255,255,0.06)' }}
    >
      <div className="max-w-content mx-auto">
        <p className="font-mono text-xs text-text-muted uppercase tracking-[0.22em] mb-10">
          The cost of inaction
        </p>

        {/* Asymmetric grid — left spans 2 cols, right stacks 2 equal-height cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:items-stretch">

          {/* Dominant — 80% */}
          <motion.div
            {...fade(0)}
            className="glass rounded-2xl p-8 md:p-10 flex flex-col justify-between md:col-span-2 md:h-full"
          >
            <p
              className="font-display text-text-primary leading-none tabular-nums"
              style={{ fontSize: 'clamp(5rem, 12vw, 9.5rem)', letterSpacing: '-0.04em', fontWeight: 700 }}
            >
              80%
            </p>
            <div className="mt-6">
              <p className="font-body text-sm text-text-secondary leading-snug mb-2 max-w-[26ch]">
                After 5 minutes, lead conversion drops by this much.
              </p>
              <p className="font-mono text-[10px] text-text-muted tracking-[0.1em]">
                Harvard Business Review, 2011
              </p>
            </div>
          </motion.div>

          {/* Stacked right — each flex-1 so they split height evenly */}
          <div className="flex flex-col gap-3 md:h-full">
            <motion.div
              {...fade(0.12)}
              className="glass rounded-2xl p-7 flex flex-col justify-between flex-1"
            >
              <p
                className="font-display text-text-primary leading-none tabular-nums"
                style={{ fontSize: 'clamp(2.8rem, 6vw, 5rem)', letterSpacing: '-0.04em', fontWeight: 700 }}
              >
                21 hrs
              </p>
              <div className="mt-4">
                <p className="font-body text-sm text-text-secondary leading-snug mb-2">
                  The average SMB loses this many hours every week to repetitive tasks.
                </p>
                <p className="font-mono text-[10px] text-text-muted tracking-[0.1em]">
                  Asana Anatomy of Work Index, 2023
                </p>
              </div>
            </motion.div>

            <motion.div
              {...fade(0.22)}
              className="glass rounded-2xl p-7 flex flex-col justify-between flex-1"
            >
              <p
                className="font-display text-text-primary leading-none tabular-nums"
                style={{ fontSize: 'clamp(2.8rem, 6vw, 5rem)', letterSpacing: '-0.04em', fontWeight: 700 }}
              >
                27%
              </p>
              <div className="mt-4">
                <p className="font-body text-sm text-text-secondary leading-snug mb-2">
                  Only this many leads ever get contacted by the business they reached out to.
                </p>
                <p className="font-mono text-[10px] text-text-muted tracking-[0.1em]">
                  InsideSales, 2019
                </p>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
