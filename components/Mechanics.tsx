'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

const mechanics = [
  {
    title: 'Pauses the moment they reply',
    body: "Every sequence stops the second a lead messages back. You handle the live conversation. If they ghost again, the system picks back up on its own.",
  },
  {
    title: 'Knows a form-fill from a real message',
    body: "A \"Hi, I'm interested\" form gets a real first-touch reply that introduces itself. A typed message gets a thread response. No \"thanks for your message\" weirdness.",
  },
  {
    title: 'Respects the 24-hour DM window',
    body: "Facebook and Instagram both close the DM window 24 hours after a lead's last message. Lead Engine tracks it per channel and switches to email automatically when the window closes, so messages never fail silently.",
  },
  {
    title: 'CASL and TCPA compliance baked in',
    body: "Send hours, daily caps, opt-out enforcement, and consent rules run before any message goes out. Canada and US compliance handled at the system level, not by you remembering to check.",
  },
  {
    title: 'Knows when to stop',
    body: "Lead booked? Stops. Wrong city? Stops. Said no? Stops. Already opted out? Never starts. The system tracks every reason a lead is no longer in play and won't keep messaging dead conversations.",
  },
  {
    title: 'You approve until you trust it',
    body: "Every outbound message can route through your approval queue first. Reject, edit, or send. Once you trust the voice, you let it run on its own. Your call, every step of the way.",
  },
];

export default function Mechanics() {
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

  const openChat = () => {
    try {
      sessionStorage.setItem('ora-pending-open', '1');
    } catch {
      // sessionStorage unavailable in private mode — event still works
    }
    window.dispatchEvent(new CustomEvent('open-ora'));
  };

  return (
    <section
      ref={ref}
      className="px-6 md:px-8 py-20 md:py-28 border-t"
      style={{ borderColor: 'rgba(255,255,255,0.06)' }}
    >
      <div className="max-w-content mx-auto">
        <motion.p
          {...fade(0)}
          className="font-mono text-[11px] text-text-muted uppercase tracking-[0.2em] mb-4"
        >
          Inside the system
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
          The boring details
          <br />
          that keep this from going wrong.
        </motion.h2>

        <motion.p
          {...fade(0.1)}
          className="font-body text-text-secondary text-base md:text-lg max-w-xl mb-14"
          style={{ lineHeight: 1.7 }}
        >
          Anyone can wire an AI to send messages. The hard part is everything
          that happens around it: knowing when to stop, when to pause, when to
          switch channels, when to step aside. Here&apos;s what we got right.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mechanics.map((item, i) => (
            <motion.div
              key={item.title}
              {...fade(0.14 + i * 0.06)}
              className="rounded-2xl p-6 md:p-7 relative overflow-hidden"
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              {/* Subtle top accent line */}
              <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{
                  background:
                    'linear-gradient(90deg, rgba(56,189,248,0.3) 0%, rgba(56,189,248,0) 60%)',
                }}
              />
              <h3
                className="font-body font-semibold text-text-primary text-base mb-3"
                style={{ lineHeight: 1.35 }}
              >
                {item.title}
              </h3>
              <p
                className="font-body text-text-secondary text-sm"
                style={{ lineHeight: 1.65 }}
              >
                {item.body}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Live demo callout — points to the chat widget that's already on the page */}
        <motion.div
          {...fade(0.6)}
          className="mt-14 rounded-2xl p-7 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-5"
          style={{
            background:
              'linear-gradient(135deg, rgba(56,189,248,0.06) 0%, rgba(17,24,39,0.4) 100%)',
            border: '1px solid rgba(56,189,248,0.18)',
          }}
        >
          <div className="flex flex-col gap-2 max-w-xl">
            <p className="font-mono text-[10px] text-accent/80 uppercase tracking-[0.2em]">
              You&apos;re looking at the demo
            </p>
            <p
              className="font-body text-text-primary text-base md:text-lg"
              style={{ lineHeight: 1.55 }}
            >
              The Ora chat in the corner of this page is Lead Engine. Same AI
              that will reply to your leads. Try her.
            </p>
          </div>
          <button
            onClick={openChat}
            className="inline-flex items-center justify-center font-body text-sm font-semibold bg-accent text-bg-primary px-6 py-3 rounded-lg min-h-[44px] cursor-pointer transition-all duration-200 hover:shadow-[0_0_24px_rgba(56,189,248,0.3)] flex-shrink-0"
          >
            Open Ora
          </button>
        </motion.div>
      </div>
    </section>
  );
}
