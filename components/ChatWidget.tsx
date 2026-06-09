'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

const transport = new DefaultChatTransport({ api: '/api/chat' });

const GREETING =
  "Hey, I'm Ora. Ask me anything about Lead Engine, or tell me how leads reach you and I'll show you where they tend to slip.";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isHidden, setIsHidden] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const reduced = useReducedMotion();

  const { messages, sendMessage, status } = useChat({ transport });
  const isLoading = status === 'streaming' || status === 'submitted';

  // Hide the launcher while the audit section (the page's primary CTA) is in
  // view, so the two CTAs do not compete. The open panel stays put.
  useEffect(() => {
    const auditSection = document.getElementById('book');
    if (!auditSection) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsHidden(entry.isIntersecting),
      { threshold: 0.4 }
    );
    observer.observe(auditSection);
    return () => observer.disconnect();
  }, []);

  // Auto-scroll to the latest message within the panel's own scroll container.
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: reduced ? 'auto' : 'smooth',
      block: 'nearest',
    });
  }, [messages, reduced]);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 100);
  }, [isOpen]);

  // Open on the `open-ora` event (dispatched by the Ora intro section), and
  // consume a pending-open flag set before this lazy-loaded bundle mounted.
  useEffect(() => {
    const handler = () => setIsOpen(true);
    window.addEventListener('open-ora', handler);
    try {
      if (sessionStorage.getItem('ora-pending-open') === '1') {
        sessionStorage.removeItem('ora-pending-open');
        setIsOpen(true);
      }
    } catch {
      // sessionStorage unavailable; the event listener still covers normal flows
    }
    return () => window.removeEventListener('open-ora', handler);
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const trimmed = input.trim();
      if (!trimmed || isLoading) return;
      sendMessage({ text: trimmed });
      setInput('');
    },
    [input, isLoading, sendMessage]
  );

  const getMessageText = (msg: (typeof messages)[number]): string =>
    (msg.parts || [])
      .filter((p): p is { type: 'text'; text: string } => p.type === 'text')
      .map((p) => p.text)
      .join('');

  // Fallback for a finished assistant turn that produced no text (e.g. it ended
  // on a tool call): surface the tool's own user-facing message so Ora never
  // renders an empty bubble.
  const getToolMessage = (msg: (typeof messages)[number]): string => {
    for (const part of msg.parts || []) {
      const output = (part as { output?: { message?: unknown } }).output;
      if (output && typeof output.message === 'string') return output.message;
    }
    return '';
  };

  const showLauncher = !isOpen && !isHidden;

  return (
    <>
      {/* Floating launcher: primary pill + the Ora gradient dot */}
      <AnimatePresence>
        {showLauncher && (
          <motion.button
            initial={reduced ? {} : { scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 inline-flex items-center gap-2.5 rounded-full bg-ink-primary text-white px-5 py-3 text-sm font-medium shadow-[0_8px_32px_rgba(10,10,11,0.12)] hover:opacity-90 transition-opacity cursor-pointer"
            aria-label="Ask Ora"
          >
            <span
              className="h-2 w-2 rounded-full"
              style={{ background: '#1E7F4F' }}
              aria-hidden="true"
            />
            Ask Ora
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={reduced ? {} : { opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="fixed z-50 flex flex-col bottom-4 right-4 left-4 sm:left-auto sm:bottom-6 sm:right-6 w-auto sm:w-[380px] h-[520px] max-h-[calc(100dvh-2rem)] rounded-2xl bg-bg-elevated border border-border-soft shadow-[0_8px_32px_rgba(10,10,11,0.08)] overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border-soft">
              <div className="flex items-center gap-2.5">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ background: '#1E7F4F' }}
                  aria-hidden="true"
                />
                <div className="leading-tight">
                  <p className="text-sm font-semibold text-ink-primary">Ora</p>
                  <p className="text-xs text-ink-secondary">Inbound assistant</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg hover:bg-bg-muted transition-colors cursor-pointer"
                aria-label="Close chat"
              >
                <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4 text-ink-tertiary">
                  <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
              {messages.length === 0 && (
                <div className="self-start max-w-[85%] rounded-2xl bg-bg-muted text-ink-primary px-3.5 py-2.5">
                  <p className="text-sm leading-relaxed">{GREETING}</p>
                </div>
              )}
              {messages.map((msg, i) => {
                const isStreamingThis =
                  isLoading && i === messages.length - 1 && msg.role === 'assistant';
                // Prefer the model's text. Only fall back to a tool message once
                // the turn is done, so the typing indicator covers the gap while
                // a reply is still streaming in.
                const text = getMessageText(msg);
                const content = text || (isStreamingThis ? '' : getToolMessage(msg));
                if (!content) return null;
                const isUser = msg.role === 'user';
                return (
                  <div
                    key={msg.id}
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 ${
                      isUser
                        ? 'self-end bg-ink-primary text-white'
                        : 'self-start bg-bg-muted text-ink-primary'
                    }`}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{content}</p>
                  </div>
                );
              })}
              {isLoading && (
                <div className="self-start rounded-2xl bg-bg-muted px-3.5 py-3">
                  <div className="flex gap-1.5">
                    {[0, 150, 300].map((d) => (
                      <span
                        key={d}
                        className="h-1.5 w-1.5 rounded-full bg-ink-tertiary animate-pulse"
                        style={{ animationDelay: `${d}ms` }}
                      />
                    ))}
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t border-border-soft p-3">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about Lead Engine..."
                className="flex-1 min-w-0 rounded-full border border-border-soft bg-bg-canvas px-4 py-2 text-sm text-ink-primary placeholder:text-ink-tertiary outline-none focus:border-ink-primary/30"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="shrink-0 inline-flex h-9 w-9 items-center justify-center rounded-full bg-ink-primary text-white disabled:opacity-40 hover:opacity-90 transition-opacity cursor-pointer"
                aria-label="Send message"
              >
                <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4">
                  <path
                    d="M14 2L7 9M14 2l-5 12-2-5-5-2 12-5z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
