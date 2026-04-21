'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

const features = [
  {
    title: 'Connects Where Your Leads Are',
    description:
      'Instagram DMs, Facebook messages, website forms, Google Business. Wherever people find you, Lead Engine is already there listening.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 text-accent" aria-hidden="true">
        <path
          d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: 'Replies in Seconds, Not Hours',
    description:
      'Reads every inbound message, crafts a reply in your voice, and sends it. 24/7. Your leads get an instant, human-feeling response even at 2am.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 text-accent" aria-hidden="true">
        <path
          d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: 'Qualifies & Books Automatically',
    description:
      'Asks the right questions, scores intent, and books qualified leads directly into your calendar. You only talk to people ready to buy.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 text-accent" aria-hidden="true">
        <path
          d="M22 12h-4l-3 9L9 3l-3 9H2"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: 'Never Lets a Lead Go Cold',
    description:
      'Automatic follow-ups on your schedule. Stale leads get re-engaged. No one falls through the cracks, even when you\'re busy with clients.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 text-accent" aria-hidden="true">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
        <polyline
          points="12 6 12 12 16 14"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

export default function TheSolution() {
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
          className="font-mono text-[11px] text-accent/70 uppercase tracking-[0.2em] mb-4"
        >
          Lead Engine
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
          It plugs into wherever
          <br />
          your leads already come from.
        </motion.h2>

        <motion.p
          {...fade(0.1)}
          className="font-body text-text-secondary text-base md:text-lg max-w-xl mb-14"
          style={{ lineHeight: 1.7 }}
        >
          Instagram, Facebook, your website, Google. We don&apos;t care where they message you. Lead Engine connects to your existing channels and handles every conversation.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              {...fade(0.12 + i * 0.08)}
              className="glass rounded-2xl p-8 md:p-10 relative overflow-hidden group transition-shadow duration-300"
              style={{
                boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.06)',
              }}
              whileHover={{
                boxShadow:
                  'inset 0 0 0 1px rgba(56,189,248,0.3), 0 0 20px rgba(56,189,248,0.08)',
              }}
            >
              {/* Top accent gradient line */}
              <div
                className="absolute top-0 left-0 right-0 h-[2px]"
                style={{
                  background:
                    'linear-gradient(90deg, #38BDF8 0%, rgba(56,189,248,0) 100%)',
                }}
              />

              {/* Icon container with glow */}
              <div className="relative mb-5">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center relative"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  <div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background:
                        'radial-gradient(circle, rgba(56,189,248,0.15) 0%, transparent 70%)',
                    }}
                  />
                  <div className="relative z-10">{feature.icon}</div>
                </div>
              </div>

              <h3
                className="font-body font-semibold text-text-primary text-lg md:text-xl mb-3"
                style={{ lineHeight: 1.3 }}
              >
                {feature.title}
              </h3>
              <p
                className="font-body text-text-secondary text-sm md:text-base"
                style={{ lineHeight: 1.7 }}
              >
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
