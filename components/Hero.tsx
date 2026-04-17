'use client';

import { motion, useReducedMotion } from 'framer-motion';

const HEADLINE = "Operations shouldn't be the bottleneck.";

export default function Hero() {
  const prefersReduced = useReducedMotion();
  const words = HEADLINE.split(' ');

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: prefersReduced ? 0 : 0.065,
        delayChildren: prefersReduced ? 0 : 0.4,
      },
    },
  };

  const wordVariants = {
    hidden: prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.48, ease: [0.25, 0.1, 0.25, 1] as [number,number,number,number] },
    },
  };

  const fade = (delay: number) => ({
    initial: prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: 0.45,
      ease: [0.25, 0.1, 0.25, 1] as [number,number,number,number],
      delay: prefersReduced ? 0 : delay,
    },
  });

  return (
    <section
      id="home"
      className="relative min-h-dvh flex flex-col justify-center px-6 md:px-8 pt-24 pb-16 overflow-hidden"
    >
      {/* Close-range hero aurora — tighter and more vivid than page glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div style={{
          position: 'absolute', top: '-20%', left: '-5%',
          width: '700px', height: '600px',
          background: 'radial-gradient(ellipse, rgba(56,189,248,0.07) 0%, transparent 65%)',
          filter: 'blur(2px)',
        }} />
        <div style={{
          position: 'absolute', top: '10%', right: '-10%',
          width: '500px', height: '500px',
          background: 'radial-gradient(circle, rgba(99,102,241,0.05) 0%, transparent 65%)',
          filter: 'blur(2px)',
        }} />
      </div>

      <div className="relative max-w-content mx-auto w-full">
        {/* Eyebrow */}
        <motion.p
          {...fade(0.05)}
          className="font-mono text-xs text-text-muted uppercase tracking-[0.22em] mb-7"
        >
          Operational Software Consulting
        </motion.p>

        {/* Pill badge */}
        <motion.div {...fade(0.16)} className="mb-9">
          <div className="inline-flex items-center gap-2.5 hero-pill rounded-full px-4 py-1.5">
            <span className="relative flex h-2 w-2 flex-shrink-0" aria-hidden="true">
              <span className="pulse-ring absolute inline-flex h-full w-full rounded-full bg-accent" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
            </span>
            <span className="font-mono text-xs text-accent uppercase tracking-[0.18em]">
              Accepting founding partners
            </span>
          </div>
        </motion.div>

        {/* Kinetic headline */}
        <h1
          className="font-display text-text-primary leading-[1.04] mb-7"
          style={{ fontSize: 'clamp(2.8rem, 7vw, 5.75rem)', letterSpacing: '-0.04em', fontWeight: 700 }}
          aria-label={HEADLINE}
        >
          <motion.span
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="inline"
            aria-hidden="true"
          >
            {words.map((word, i) => (
              <motion.span
                key={i}
                variants={wordVariants}
                className="inline-block mr-[0.2em] last:mr-0"
              >
                {word}
              </motion.span>
            ))}
          </motion.span>
        </h1>

        {/* Accent rule */}
        <motion.div
          initial={prefersReduced ? { scaleX: 1 } : { scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{
            duration: 0.65,
            ease: [0.25, 0.1, 0.25, 1] as [number,number,number,number],
            delay: prefersReduced ? 0 : 1.0,
          }}
          style={{ transformOrigin: 'left' }}
          className="h-px w-20 mb-7"
          aria-hidden="true"
          // gradient rule
        >
          <div className="h-full w-full" style={{ background: 'linear-gradient(90deg, #38BDF8 0%, transparent 100%)' }} />
        </motion.div>

        {/* Subtitle */}
        <motion.p
          {...fade(1.05)}
          className="font-body text-lg md:text-xl text-text-secondary max-w-2xl leading-relaxed mb-9"
        >
          We build custom systems that handle your repetitive work: lead
          response, booking, follow-up, reporting. Then we install them
          directly into your business.
        </motion.p>

        {/* CTAs */}
        <motion.div {...fade(1.15)} className="flex flex-col sm:flex-row gap-3">
          <a
            href="#book"
            className="btn-primary inline-flex items-center justify-center font-body text-sm font-semibold bg-accent text-bg-primary px-6 py-3 rounded-full min-h-[44px] cursor-pointer"
          >
            Book a free audit
          </a>
          <a
            href="#what"
            className="inline-flex items-center justify-center font-body text-sm font-medium px-6 py-3 rounded-full min-h-[44px] cursor-pointer transition-all duration-200 hover:bg-white/[0.05] hover:border-white/[0.16]"
            style={{ border: '1px solid rgba(255,255,255,0.1)', color: '#94A3B8' }}
          >
            See what we build
          </a>
        </motion.div>
      </div>
    </section>
  );
}
