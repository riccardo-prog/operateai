'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

function ShieldIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5" aria-hidden="true">
      <path d="M10 2l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V5l7-3z" stroke="#38BDF8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7.5 10l2 2 3.5-4" stroke="#38BDF8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5" aria-hidden="true">
      <circle cx="10" cy="10" r="7.5" stroke="#38BDF8" strokeWidth="1.5" />
      <path d="M10 6v4l2.5 2.5" stroke="#38BDF8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckCircleIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5" aria-hidden="true">
      <circle cx="10" cy="10" r="7.5" stroke="#38BDF8" strokeWidth="1.5" />
      <path d="M7 10l2 2 4-4" stroke="#38BDF8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function BookAudit() {
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
      id="book"
      ref={ref}
      className="relative px-6 md:px-8 py-28 md:py-36 border-t overflow-hidden"
      style={{ borderColor: 'rgba(255,255,255,0.06)' }}
    >
      {/* Atmospheric glows */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 60% at 50% 0%, rgba(56,189,248,0.1) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 60% at 50% 100%, rgba(139,92,246,0.08) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-content mx-auto text-center relative">
        {/* Decorative line with dot */}
        <motion.div {...fade(0)} className="flex items-center justify-center mb-10">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-[rgba(56,189,248,0.4)]" />
          <div className="w-2 h-2 rounded-full bg-[#38BDF8] mx-3 opacity-70" />
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-[rgba(56,189,248,0.4)]" />
        </motion.div>

        <motion.h2
          {...fade(0.06)}
          className="font-display text-text-primary mb-10"
          style={{
            fontSize: 'clamp(2.25rem, 6vw, 4rem)',
            letterSpacing: '-0.03em',
            fontWeight: 400,
            lineHeight: 1.1,
          }}
        >
          Stop Losing Leads.
          <br />
          Book a Free Audit.
        </motion.h2>

        <motion.div {...fade(0.14)} className="mb-6">
          <a
            href="https://cal.com/riccardocelebre/free-audit"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center font-body text-lg font-semibold bg-accent text-bg-primary px-10 py-5 rounded-xl min-h-[56px] cursor-pointer transition-shadow duration-300"
            style={{
              boxShadow: '0 0 20px rgba(56,189,248,0.3), 0 0 60px rgba(56,189,248,0.1)',
              animation: 'pulse-glow 3s ease-in-out infinite',
            }}
          >
            Book a Free Audit
          </a>
        </motion.div>

        <motion.p
          {...fade(0.22)}
          className="font-mono text-[12px] text-text-muted tracking-[0.08em] mb-10"
        >
          No pitch deck &middot; No commitment &middot; 30 minutes
        </motion.p>

        {/* Trust icons row */}
        <motion.div {...fade(0.30)} className="flex items-center justify-center gap-8 md:gap-12">
          <div className="flex flex-col items-center gap-2">
            <ShieldIcon />
            <span className="font-mono text-[10px] text-text-muted uppercase tracking-[0.1em]">Secure</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <ClockIcon />
            <span className="font-mono text-[10px] text-text-muted uppercase tracking-[0.1em]">30 min</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <CheckCircleIcon />
            <span className="font-mono text-[10px] text-text-muted uppercase tracking-[0.1em]">No commitment</span>
          </div>
        </motion.div>
      </div>

    </section>
  );
}
