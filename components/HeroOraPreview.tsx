'use client';

import { motion, useReducedMotion } from 'framer-motion';

/**
 * Static visual preview of an Ora conversation, embedded inline in the Hero.
 * NOT a live widget — visitors interact with the floating ChatWidget in the
 * corner of the page. This is a representative "sample conversation" so the
 * Hero shows the product instead of describing it.
 *
 * Styling intentionally mirrors the live ChatWidget (chat-msg-assistant,
 * chat-msg-user CSS classes from globals.css) so the preview reads as the
 * same product, just frozen.
 */
const messages: { role: 'user' | 'assistant'; text: string }[] = [
  { role: 'user', text: 'saw your ad. how does this actually work?' },
  {
    role: 'assistant',
    text: "We answer your leads in your voice and book the real ones to your calendar. What kind of business?",
  },
  { role: 'user', text: 'real estate, mostly referrals so leads aren\'t really an issue' },
  {
    role: 'assistant',
    text: "Your network is the warmest source there is. The thing that leaks is timing. Referral comes in while you're closing, sits a week, by then they've forgotten. Worth a 30-min audit? Drop me your name and email.",
  },
];

export default function HeroOraPreview() {
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

  return (
    <motion.div
      {...fade(0.4)}
      className="relative w-full max-w-[420px] mx-auto lg:mx-0"
      aria-label="Sample Ora conversation"
    >
      {/* Tiny label above to disambiguate from the live chat widget */}
      <p className="font-mono text-[10px] text-text-muted uppercase tracking-[0.18em] mb-3">
        Sample conversation
      </p>

      {/* Preview panel — mirrors .chat-panel styling from globals.css but
          inline-flow instead of position: fixed. */}
      <div
        className="rounded-2xl flex flex-col overflow-hidden"
        style={{
          background: 'rgba(17, 24, 39, 0.85)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow:
            '0 8px 40px rgba(0, 0, 0, 0.5), 0 0 60px rgba(56,189,248,0.06)',
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-4 py-3.5"
          style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}
        >
          <div>
            <p className="font-body text-sm font-semibold text-text-primary">Ora</p>
            <p className="font-mono text-[10px] text-accent tracking-wide">
              You&apos;re chatting with Lead Engine right now.
            </p>
          </div>
          <span
            className="flex h-2 w-2 rounded-full bg-accent flex-shrink-0"
            aria-hidden="true"
          />
        </div>

        {/* Messages */}
        <div className="flex flex-col gap-3 p-4">
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={reduced ? { opacity: 1 } : { opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.3,
                ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
                delay: reduced ? 0 : 0.6 + i * 0.18,
              }}
              className="max-w-[85%] px-3.5 py-2.5 rounded-xl"
              style={{
                alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                background:
                  msg.role === 'user'
                    ? 'rgba(56, 189, 248, 0.12)'
                    : 'rgba(255, 255, 255, 0.04)',
                border:
                  msg.role === 'user'
                    ? '1px solid rgba(56, 189, 248, 0.2)'
                    : '1px solid rgba(255, 255, 255, 0.06)',
                lineHeight: 1.6,
              }}
            >
              <p className="text-sm text-text-primary">{msg.text}</p>
            </motion.div>
          ))}
        </div>

        {/* Footer hint — replaces the input bar so it's clear this is a preview */}
        <div
          className="px-4 py-3 flex items-center justify-center gap-2"
          style={{ borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}
        >
          <span className="font-mono text-[10px] text-text-muted tracking-wide">
            Try the live one in the bottom right →
          </span>
        </div>
      </div>
    </motion.div>
  );
}
