'use client';

import { motion } from 'framer-motion';
import Button from './ui/Button';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

const transition = (delay: number) => ({
  duration: 0.65,
  delay,
  ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
});

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 pt-24 pb-20">
      {/* Glow orb — top right, electric blue */}
      <div
        className="absolute top-[-8%] right-[-8%] w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at center, rgba(56,189,248,0.09) 0%, transparent 68%)',
        }}
        aria-hidden="true"
      />
      {/* Glow orb — bottom left, indigo */}
      <div
        className="absolute bottom-[-10%] left-[-8%] w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at center, rgba(129,140,248,0.08) 0%, transparent 68%)',
        }}
        aria-hidden="true"
      />

      <img
        src="/operateai-hero-animation.svg"
        alt=""
        aria-hidden="true"
        className="hidden md:block absolute pointer-events-none select-none"
        style={{
          width: '900px',
          top: '50%',
          left: '50%',
          transform: 'translate(calc(-50% - 22px), calc(-50% + 22px))',
          opacity: 0.5,
          zIndex: 1,
        }}
      />

      <div className="max-w-content mx-auto text-center relative z-10">
        {/* Availability badge */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={transition(0)}
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-[#1E293B] bg-[#111827]/80 text-sm text-[#94A3B8] mb-10 backdrop-blur-sm"
        >
          <span className="relative flex h-2 w-2 flex-shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
          </span>
          Now accepting new clients
        </motion.div>

        {/* Main headline */}
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={transition(0.15)}
          className="font-display text-[#F1F5F9] leading-[1.08] mb-7"
          style={{
            fontSize: 'clamp(3rem, 6.5vw, 5.2rem)',
            letterSpacing: '-3px',
          }}
        >
          Stop doing work a{' '}
          <span className="bg-gradient-to-r from-[#38BDF8] to-[#818CF8] bg-clip-text text-transparent">
            machine
          </span>{' '}
          should do
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={transition(0.3)}
          className="text-lg md:text-xl text-[#94A3B8] max-w-[620px] mx-auto leading-[1.75] font-light mb-4"
        >
          We find the bottlenecks bleeding your business of time and money, then build the automations that eliminate them.
        </motion.p>

        {/* Free offer — emphasized line */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={transition(0.38)}
          className="text-xl text-[#38BDF8] font-medium mb-11"
        >
          The first audit is free.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={transition(0.45)}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button href="https://calendly.com/riccardo-operateai/free-audit" size="lg" target="_blank" rel="noopener noreferrer">
            Book Your Free Audit →
          </Button>
          <Button href="#how" variant="secondary" size="lg">
            See How It Works
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
