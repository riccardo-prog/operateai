'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

const transport = new DefaultChatTransport({ api: '/api/chat' });

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isHidden, setIsHidden] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const reduced = useReducedMotion();

  const { messages, sendMessage, status } = useChat({ transport });
  const isLoading = status === 'streaming' || status === 'submitted';

  // Hide when Book Audit section is in viewport
  useEffect(() => {
    const bookSection = document.getElementById('book');
    if (!bookSection) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsHidden(entry.isIntersecting),
      { threshold: 0.5 }
    );
    observer.observe(bookSection);
    return () => observer.disconnect();
  }, []);

  // Hide on /book route
  useEffect(() => {
    if (window.location.pathname === '/book') {
      setIsHidden(true);
    }
  }, []);

  // Auto-scroll to latest message — `block: 'nearest'` keeps the scroll inside
  // the chat panel's own scroll container instead of scrolling the page.
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: reduced ? 'auto' : 'smooth',
      block: 'nearest',
    });
  }, [messages, reduced]);

  // Focus input when opening
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Listen for open-ora event from Hero CTA. Also consume any pending-open
  // flag set before this component hydrated — covers the race where a user
  // clicks "Try Ora" before the lazy-loaded widget bundle is ready.
  useEffect(() => {
    const handler = () => setIsOpen(true);
    window.addEventListener('open-ora', handler);
    try {
      if (sessionStorage.getItem('ora-pending-open') === '1') {
        sessionStorage.removeItem('ora-pending-open');
        setIsOpen(true);
      }
    } catch {
      // sessionStorage unavailable — event listener still covers normal flows
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

  const getMessageText = (msg: (typeof messages)[number]): string => {
    if (!msg.parts) return '';
    return msg.parts
      .filter((p): p is { type: 'text'; text: string } => p.type === 'text')
      .map((p) => p.text)
      .join('');
  };

  // Floating bubble hides near the BookAudit section to avoid colliding with
  // the booking CTA. The open chat panel stays visible regardless — once a
  // visitor is mid-conversation, scrolling shouldn't make Ora vanish.
  const showBubble = !isOpen && !isHidden;

  return (
    <>
      {/* Floating trigger button */}
      <AnimatePresence>
        {showBubble && (
          <motion.button
            initial={reduced ? {} : { scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsOpen(true)}
            className="chat-bubble"
            aria-label="Open chat with Ora"
          >
            <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
              <path
                d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={reduced ? {} : { opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="chat-panel"
          >
            {/* Header */}
            <div className="chat-header">
              <div>
                <p className="font-body text-sm font-semibold text-text-primary">Ora</p>
                <p className="font-mono text-[10px] text-accent tracking-wide">
                  You&apos;re chatting with Lead Engine right now.
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
                aria-label="Close chat"
              >
                <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4 text-text-muted">
                  <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* Messages */}
            <div className="chat-messages">
              {messages.length === 0 && (
                <div className="chat-msg chat-msg-assistant">
                  <p className="text-sm">
                    Hey, I&apos;m Ora. Ask me anything about Lead Engine, or tell me about your business and I&apos;ll show you how we can help.
                  </p>
                </div>
              )}
              {messages.map((msg) => {
                const text = getMessageText(msg);
                if (!text) return null;
                return (
                  <div
                    key={msg.id}
                    className={`chat-msg ${
                      msg.role === 'assistant' ? 'chat-msg-assistant' : 'chat-msg-user'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{text}</p>
                  </div>
                );
              })}
              {isLoading && (
                <div className="chat-msg chat-msg-assistant">
                  <div className="flex gap-1.5">
                    <span className="chat-dot" style={{ animationDelay: '0ms' }} />
                    <span className="chat-dot" style={{ animationDelay: '150ms' }} />
                    <span className="chat-dot" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="chat-input-area">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about Lead Engine..."
                className="chat-input"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="chat-send"
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
