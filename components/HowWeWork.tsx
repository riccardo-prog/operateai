'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

const steps = [
  {
    number: '01',
    name: 'Audit',
    description:
      "We spend 30 minutes walking through your operations. You tell us what's breaking, we tell you what we'd build.",
  },
  {
    number: '02',
    name: 'Build',
    description:
      'We architect and build the system. Most projects ship in one to four weeks.',
  },
  {
    number: '03',
    name: 'Install',
    description:
      "We deploy it, train your team, and maintain it. You don't get handed a zip file and wished luck.",
  },
];

export default function HowWeWork() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px 0px' });
  const prefersReduced = useReducedMotion();

  return (
    <section
      id="how"
      ref={ref}
      className="px-6 md:px-8 py-16 md:py-24 border-t"
      style={{ borderColor: 'rgba(255,255,255,0.06)' }}
    >
      <div className="max-w-content mx-auto">
        <p className="font-mono text-xs text-text-muted uppercase tracking-[0.22em] mb-10">
          How we work
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={prefersReduced ? {} : { opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.48,
                ease: [0.25, 0.1, 0.25, 1] as [number,number,number,number],
                delay: prefersReduced ? 0 : i * 0.11,
              }}
              className="glass rounded-2xl p-8 flex flex-col"
            >
              {/* Ghost numeral */}
              <p
                className="font-display leading-none select-none mb-7"
                style={{
                  fontSize: 'clamp(3.5rem, 7vw, 5.5rem)',
                  letterSpacing: '-0.04em',
                  fontWeight: 700,
                  color: 'rgba(255,255,255,0.07)',
                }}
                aria-hidden="true"
              >
                {step.number}
              </p>

              <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-3">
                {step.name}
              </p>

              <p className="font-body text-sm text-text-secondary leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={prefersReduced ? {} : { opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: prefersReduced ? 0 : 0.45 }}
          className="font-body text-xs text-text-muted mt-10 max-w-sm leading-relaxed"
        >
          We are currently onboarding three founding partners at a locked rate.
          Standard pricing begins after.
        </motion.p>
      </div>
    </section>
  );
}
