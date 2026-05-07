'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

const steps = [
  {
    num: '01',
    title: 'We audit your lead flow',
    body: '30-minute call. We find where leads are leaking.',
  },
  {
    num: '02',
    title: 'We build your system',
    body: 'Lead Engine configured for your business, channels connected, AI persona matched to your voice. Most builds ship in a few weeks.',
  },
  {
    num: '03',
    title: 'We run it with you',
    body: 'The AI handles the chasing. You approve messages and show up to close. We maintain everything in the background.',
  },
];

export default function HowItWorks() {
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
      id="how"
      ref={ref}
      className="px-6 md:px-8 py-20 md:py-24 border-t"
      style={{ borderColor: 'rgba(255,255,255,0.06)' }}
    >
      <div className="max-w-content mx-auto">
        <motion.p
          {...fade(0)}
          className="font-mono text-[11px] text-text-muted uppercase tracking-[0.2em] mb-12"
        >
          How it works
        </motion.p>

        {/* Timeline container */}
        <div className="relative">
          {/* Horizontal connecting line (desktop only) */}
          <div
            className="hidden md:block absolute top-[24px] left-[calc(16.666%+24px)] right-[calc(16.666%+24px)] h-[1px]"
            style={{
              background:
                'linear-gradient(90deg, rgba(56,189,248,0.3) 0%, rgba(56,189,248,0.5) 50%, rgba(56,189,248,0.3) 100%)',
              backgroundImage:
                'repeating-linear-gradient(90deg, rgba(56,189,248,0.4) 0px, rgba(56,189,248,0.4) 6px, transparent 6px, transparent 12px)',
            }}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((step, i) => {
              const isMiddle = i === 1;
              return (
                <motion.div
                  key={step.num}
                  {...fade(0.07 + i * 0.1)}
                  className="relative flex flex-col items-center text-center"
                >
                  {/* Step number circle */}
                  <div
                    className="relative z-10 w-12 h-12 rounded-full flex items-center justify-center shrink-0"
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      border: '1.5px solid rgba(56,189,248,0.5)',
                      boxShadow: isMiddle
                        ? '0 0 20px rgba(56,189,248,0.2)'
                        : '0 0 10px rgba(56,189,248,0.1)',
                    }}
                  >
                    <span className="font-display text-accent text-sm font-medium">
                      {step.num}
                    </span>
                  </div>

                  {/* Vertical connector */}
                  <div
                    className="w-[1px] h-6 my-2"
                    style={{
                      background:
                        'linear-gradient(180deg, rgba(56,189,248,0.4) 0%, rgba(56,189,248,0.1) 100%)',
                    }}
                  />

                  {/* Card */}
                  <div
                    className={`glass rounded-2xl p-8 md:p-10 relative overflow-hidden w-full ${
                      isMiddle ? 'md:py-12' : ''
                    }`}
                    style={{
                      boxShadow: isMiddle
                        ? 'inset 0 0 0 1px rgba(56,189,248,0.15), 0 0 40px rgba(56,189,248,0.06)'
                        : 'inset 0 0 0 1px rgba(255,255,255,0.06)',
                      transform: isMiddle ? undefined : 'scale(0.97)',
                    }}
                  >
                    {/* Middle card background glow */}
                    {isMiddle && (
                      <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          background:
                            'radial-gradient(ellipse at center, rgba(56,189,248,0.04) 0%, transparent 70%)',
                        }}
                      />
                    )}

                    <h3
                      className="font-body font-semibold text-text-primary text-lg mb-3 relative z-10"
                      style={{ lineHeight: 1.3 }}
                    >
                      {step.title}
                    </h3>
                    <p
                      className="font-body text-text-secondary text-sm relative z-10"
                      style={{ lineHeight: 1.7 }}
                    >
                      {step.body}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <motion.div {...fade(0.5)} className="mt-14 text-center">
          <a
            href="#book"
            className="inline-flex items-center gap-2 font-body text-accent hover:text-white transition-colors duration-200 text-sm font-medium group"
          >
            Ready to start?
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
              aria-hidden="true"
            >
              <path
                d="M5 12h14M12 5l7 7-7 7"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
