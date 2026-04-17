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
        staggerChildren: prefersReduced ? 0 : 0.07,
        delayChildren: prefersReduced ? 0 : 0.45,
      },
    },
  };

  const wordVariants = {
    hidden: prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
      },
    },
  };

  const fade = (delay: number) => ({
    initial: prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
      delay: prefersReduced ? 0 : delay,
    },
  });

  return (
    <section
      id="home"
      className="relative min-h-dvh flex flex-col justify-center px-6 md:px-8 pt-24 pb-20 overflow-hidden"
    >
      {/* Aurora gradient mesh */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute -top-48 -left-24 w-[500px] h-[500px] bg-accent/[0.12] rounded-full filter blur-[140px]" />
        <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-violet-500/[0.07] rounded-full filter blur-[120px]" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-sky-500/[0.06] rounded-full filter blur-[100px]" />
      </div>

      <div className="relative max-w-content mx-auto w-full">
        {/* Eyebrow label */}
        <motion.p
          {...fade(0.05)}
          className="font-mono text-xs text-text-muted uppercase tracking-[0.22em] mb-8"
        >
          Operational Software Consulting
        </motion.p>

        {/* Pill badge */}
        <motion.div {...fade(0.18)} className="mb-10">
          <div className="inline-flex items-center gap-2.5 bg-accent/[0.08] border border-accent/[0.2] rounded-full px-4 py-1.5">
            <span className="relative flex h-2 w-2 flex-shrink-0" aria-hidden="true">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
            </span>
            <span className="font-mono text-xs text-accent uppercase tracking-[0.18em]">
              Accepting founding partners
            </span>
          </div>
        </motion.div>

        {/* Kinetic headline */}
        <h1
          className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-[5.25rem] text-text-primary leading-[1.05] tracking-tight font-semibold mb-8"
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
                className="inline-block mr-[0.22em] last:mr-0"
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
            duration: 0.7,
            ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
            delay: prefersReduced ? 0 : 1.05,
          }}
          style={{ transformOrigin: 'left' }}
          className="h-px w-24 bg-gradient-to-r from-accent to-accent/0 mb-8"
        />

        {/* Subtitle */}
        <motion.p
          {...fade(1.1)}
          className="font-body text-lg md:text-xl text-text-secondary max-w-2xl leading-relaxed mb-10"
        >
          We build custom systems that handle your repetitive work: lead
          response, booking, follow-up, reporting. Then we install them
          directly into your business.
        </motion.p>

        {/* CTAs */}
        <motion.div
          {...fade(1.2)}
          className="flex flex-col sm:flex-row gap-3"
        >
          <a
            href="#book"
            className="inline-flex items-center justify-center font-body text-sm font-medium bg-accent text-bg-primary px-6 py-3 rounded-full hover:bg-accent/90 transition-all duration-200 min-h-[44px] cursor-pointer shadow-[0_0_24px_rgba(56,189,248,0.25)]"
          >
            Book a free audit
          </a>
          <a
            href="#what"
            className="inline-flex items-center justify-center font-body text-sm font-medium border border-white/[0.1] text-text-muted px-6 py-3 rounded-full hover:text-text-primary hover:border-white/[0.2] hover:bg-white/[0.04] transition-all duration-200 min-h-[44px] cursor-pointer"
          >
            See what we build
          </a>
        </motion.div>
      </div>
    </section>
  );
}
