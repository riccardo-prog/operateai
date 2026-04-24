'use client';

import { motion, useReducedMotion } from 'framer-motion';

export default function Hero() {
  const reduced = useReducedMotion();

  const fade = (delay: number) => ({
    initial: reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
      delay: reduced ? 0 : delay,
    },
  });

  const openChat = () => {
    window.dispatchEvent(new CustomEvent('open-ora'));
  };

  return (
    <section
      id="home"
      className="relative min-h-dvh flex flex-col justify-center px-6 md:px-8 pt-24 pb-20 overflow-hidden"
    >
      {/* CSS Grid pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          zIndex: 0,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse 70% 50% at 50% 40%, black 20%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 50% at 50% 40%, black 20%, transparent 70%)',
        }}
      />

      {/* Atmospheric gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }} aria-hidden="true">
        {/* Cyan glow - top left */}
        <div
          style={{
            position: 'absolute',
            top: '-200px',
            left: '-100px',
            width: '800px',
            height: '800px',
            background: 'radial-gradient(circle, rgba(56,189,248,0.12) 0%, transparent 50%)',
            filter: 'blur(80px)',
          }}
        />
        {/* Violet glow - bottom right */}
        <div
          style={{
            position: 'absolute',
            bottom: '-100px',
            right: '-200px',
            width: '600px',
            height: '600px',
            background: 'radial-gradient(circle, rgba(139,92,246,0.10) 0%, transparent 50%)',
            filter: 'blur(80px)',
          }}
        />
        {/* Third violet/magenta glow - center right */}
        <div
          style={{
            position: 'absolute',
            top: '20%',
            right: '10%',
            width: '500px',
            height: '500px',
            background: 'radial-gradient(circle, rgba(139,92,246,0.07) 0%, rgba(56,189,248,0.03) 40%, transparent 60%)',
            filter: 'blur(100px)',
          }}
        />
      </div>

      <div className="relative max-w-content mx-auto w-full" style={{ zIndex: 1 }}>
        {/* Pill badge with animated gradient border */}
        <motion.div {...fade(0.05)} className="mb-8">
          <div
            className="inline-flex items-center gap-2.5 rounded-full px-4 py-1.5 relative"
            style={{
              background: 'rgba(56,189,248,0.06)',
              border: 'none',
            }}
          >
            {/* Animated gradient border */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                padding: '1px',
                background: 'linear-gradient(135deg, rgba(56,189,248,0.5), rgba(139,92,246,0.5), rgba(56,189,248,0.5))',
                backgroundSize: '200% 200%',
                animation: 'gradient-shift 3s ease infinite',
                WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                WebkitMaskComposite: 'xor',
                maskComposite: 'exclude',
              }}
            />
            <span className="relative flex h-2 w-2 flex-shrink-0" aria-hidden="true">
              <span className="pulse-ring absolute inline-flex h-full w-full rounded-full bg-accent" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
            </span>
            <span className="font-mono text-[11px] text-accent tracking-[0.2em]">
              OperateAI · powered by Lead Engine
            </span>
          </div>
        </motion.div>

        {/* Headline with text gradient */}
        <motion.h1
          {...fade(0.13)}
          className="font-display mb-7"
          style={{
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            letterSpacing: '-0.04em',
            fontWeight: 400,
            lineHeight: 1.08,
            background: 'linear-gradient(180deg, #FFFFFF 0%, rgba(255,255,255,0.7) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          A lead just messaged you.
          <br />
          By the time you see this, we&apos;ve already replied.
        </motion.h1>

        {/* Subhead */}
        <motion.p
          {...fade(0.21)}
          className="font-body text-lg md:text-xl text-text-secondary max-w-2xl mb-9"
          style={{ lineHeight: 1.65 }}
        >
          OperateAI builds Lead Engine, the AI that responds to your leads in seconds, qualifies them, and books appointments. While you sleep.
        </motion.p>

        {/* CTAs */}
        <motion.div {...fade(0.29)} className="flex flex-wrap items-center gap-4 mb-6">
          <a
            href="#book"
            className="btn-primary inline-flex items-center justify-center font-body text-sm font-semibold bg-accent text-bg-primary px-7 py-3.5 rounded-lg min-h-[44px] cursor-pointer transition-all duration-200 hover:shadow-[0_0_24px_rgba(56,189,248,0.3)]"
          >
            Book a Free Audit
          </a>
          <button
            onClick={openChat}
            className="group inline-flex items-center justify-center font-body text-sm font-semibold text-accent px-6 py-3.5 rounded-lg min-h-[44px] cursor-pointer transition-all duration-300 hover:bg-accent/5 relative"
            style={{ border: 'none' }}
          >
            {/* Shimmer gradient border */}
            <span
              className="absolute inset-0 rounded-lg transition-all duration-300"
              style={{
                padding: '1px',
                background: 'linear-gradient(135deg, rgba(56,189,248,0.4), rgba(139,92,246,0.2), rgba(56,189,248,0.4))',
                backgroundSize: '200% 200%',
                animation: 'gradient-shift 4s ease infinite',
                WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                WebkitMaskComposite: 'xor',
                maskComposite: 'exclude',
              }}
            />
            <span className="relative">Try Ora. She&apos;s running on Lead Engine</span>
          </button>
        </motion.div>

        {/* Micro trust signal */}
        <motion.p
          {...fade(0.37)}
          className="font-mono text-[12px] text-text-muted"
          style={{ letterSpacing: '0.01em' }}
        >
          30-minute call · No pitch deck · No commitment
        </motion.p>
      </div>

      {/* Bottom separator line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        aria-hidden="true"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(56,189,248,0.15) 30%, rgba(139,92,246,0.1) 70%, transparent)',
        }}
      />

    </section>
  );
}
