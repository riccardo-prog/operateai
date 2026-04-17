'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

const stats = [
  {
    value: '80%',
    label: 'After 5 minutes, lead conversion drops by this much.',
    source: 'Harvard Business Review, 2011',
    large: true,
  },
  {
    value: '21 hrs',
    label: 'The average SMB loses this many hours every week to repetitive tasks.',
    source: 'Asana Anatomy of Work Index, 2023',
    large: false,
  },
  {
    value: '27%',
    label: 'Only this many leads ever get contacted by the business they reached out to.',
    source: 'InsideSales, 2019',
    large: false,
  },
];

export default function TheCost() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px 0px' });
  const prefersReduced = useReducedMotion();

  const fade = (delay: number) => ({
    initial: prefersReduced ? {} : { opacity: 0, y: 20 },
    animate: isInView ? { opacity: 1, y: 0 } : {},
    transition: {
      duration: 0.55,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
      delay: prefersReduced ? 0 : delay,
    },
  });

  return (
    <section
      ref={ref}
      className="px-6 md:px-8 py-24 md:py-32 border-t border-white/[0.06]"
    >
      <div className="max-w-content mx-auto">
        <p className="font-mono text-xs text-text-muted uppercase tracking-[0.22em] mb-14">
          The cost of inaction
        </p>

        {/* Asymmetric grid: dominant left (col-span-2), stacked right */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          {/* Dominant card — 80%, spans 2 cols */}
          <motion.div
            {...fade(0)}
            className="md:col-span-2 rounded-2xl bg-[rgba(17,24,39,0.5)] backdrop-blur-xl border border-white/[0.07] p-8 md:p-10 flex flex-col justify-between min-h-[220px] md:min-h-[280px]"
          >
            <p className="font-display text-[6rem] sm:text-[7rem] md:text-[8.5rem] text-text-primary leading-none tracking-tight tabular-nums font-semibold">
              80%
            </p>
            <div className="mt-6">
              <p className="font-body text-sm text-text-secondary leading-snug mb-2 max-w-[28ch]">
                {stats[0].label}
              </p>
              <p className="font-mono text-[10px] text-text-muted tracking-[0.1em]">
                {stats[0].source}
              </p>
            </div>
          </motion.div>

          {/* Stacked right column */}
          <div className="flex flex-col gap-4">
            {stats.slice(1).map((stat, i) => (
              <motion.div
                key={stat.value}
                {...fade(0.13 + i * 0.1)}
                className="flex-1 rounded-2xl bg-[rgba(17,24,39,0.5)] backdrop-blur-xl border border-white/[0.07] p-7 flex flex-col justify-between"
              >
                <p className="font-display text-5xl md:text-6xl text-text-primary leading-none tracking-tight tabular-nums font-semibold mb-4">
                  {stat.value}
                </p>
                <div>
                  <p className="font-body text-sm text-text-secondary leading-snug mb-2">
                    {stat.label}
                  </p>
                  <p className="font-mono text-[10px] text-text-muted tracking-[0.1em]">
                    {stat.source}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
