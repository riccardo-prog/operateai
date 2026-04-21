# OperateAI Landing Page Redesign + Ora Chat Widget — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Full redesign of the OperateAI landing page with new messaging, updated sections, and an AI chat widget (Ora) powered by Vercel AI SDK + Claude.

**Architecture:** Next.js 14 App Router with client components for interactive sections. Chat widget uses Vercel AI SDK v6 `useChat` hook with `DefaultChatTransport` connecting to a `/api/chat` streaming route. Claude accessed via Vercel AI Gateway (`anthropic/claude-sonnet-4.5` model string). Landing page sections are self-contained client components with Framer Motion animations.

**Tech Stack:** Next.js 14, React 18, Tailwind CSS 3, Framer Motion 11, Vercel AI SDK v6 (`ai`, `@ai-sdk/react`), Zod

**Spec:** `docs/superpowers/specs/2026-04-20-landing-page-redesign-design.md`

---

## File Map

### New files
| File | Responsibility |
|------|---------------|
| `lib/ora-system-prompt.ts` | Ora system prompt constant |
| `app/api/chat/route.ts` | Chat API route — streams Claude responses, handles `capture_lead` tool |
| `components/ChatWidget.tsx` | Ora chat panel + floating bubble trigger (single file) |
| `components/TheProblem.tsx` | Section 3 — concrete scenarios + HBR stat |
| `components/TheSolution.tsx` | Section 4 — Lead Engine features grid |
| `components/HowItWorks.tsx` | Section 5 — 3-step process |
| `components/TrustSignals.tsx` | Section 6 — logos, metrics, what's included |

### Modified files
| File | Changes |
|------|---------|
| `package.json` | Add `ai`, `@ai-sdk/anthropic`, `@ai-sdk/react`, `zod` |
| `app/layout.tsx` | Update metadata, add ChatWidget |
| `app/page.tsx` | New section imports and lineup |
| `app/globals.css` | Chat widget styles, remove unused `.glass-flagship` |
| `components/Nav.tsx` | Update links and CTA copy |
| `components/Hero.tsx` | Full rewrite — new headline, copy, CTAs |
| `components/FAQ.tsx` | Trimmed to 5 questions, updated copy |
| `components/BookAudit.tsx` | Simplified to Calendly CTA only |
| `components/Footer.tsx` | Minor copy update |

### Deleted files
| File | Reason |
|------|--------|
| `components/TheCost.tsx` | Replaced by `TheProblem.tsx` |
| `components/WhatWeBuild.tsx` | Replaced by `TheSolution.tsx` |
| `components/Methodology.tsx` | Replaced by `HowItWorks.tsx` |
| `components/WhatsIncluded.tsx` | Replaced by `TrustSignals.tsx` |

### Unchanged files
| File | Reason |
|------|--------|
| `lib/fonts.ts` | No changes needed |
| `app/api/contact/route.ts` | Ora POSTs here — works as-is |
| `app/api/webhooks/calendly/route.ts` | No changes needed |
| `components/ui/Button.tsx` | Keep as-is |
| `components/ui/RevealOnScroll.tsx` | Keep as-is |
| `components/ui/SectionLabel.tsx` | Keep as-is |

---

## Task 1: Install Dependencies

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install AI SDK packages and Zod**

```bash
cd /Users/riccardocelebre/Desktop/OperateAI\ Website/operateai
npm install ai @ai-sdk/react zod
```

- [ ] **Step 2: Verify installation**

```bash
cd /Users/riccardocelebre/Desktop/OperateAI\ Website/operateai
node -e "require('ai'); require('@ai-sdk/react'); require('zod'); console.log('All packages installed')"
```

Expected: `All packages installed`

- [ ] **Step 3: Commit**

```bash
cd /Users/riccardocelebre/Desktop/OperateAI\ Website/operateai
git add package.json package-lock.json
git commit -m "feat: add AI SDK, Anthropic provider, and Zod dependencies"
```

---

## Task 2: Ora System Prompt

**Files:**
- Create: `lib/ora-system-prompt.ts`

- [ ] **Step 1: Create system prompt file**

```typescript
// lib/ora-system-prompt.ts

export const ORA_SYSTEM_PROMPT = `You are Ora, an AI assistant on the OperateAI website. You help visitors understand Lead Engine — OperateAI's AI-powered lead management platform for service businesses.

## Your primary goal
Move every conversation toward booking a free audit call. Be helpful first — answer questions clearly and directly — then nudge toward the audit. You are a lead capture tool, not an encyclopedia.

## What you know
- Lead Engine automates inbound lead management: AI reads messages, decides next actions, responds on behalf of the business owner
- Supports email (Outlook), Instagram DMs, and Facebook Messenger in one inbox
- AI qualifies leads, scores them (hot/warm/cold), moves them through a pipeline
- Human-in-the-loop: the business owner approves every message before it's sent
- AI persona is fully configurable — name, tone, voice, do-not-say rules
- Automated follow-up for stale leads
- Booking integration with Cal.com
- Built on Next.js, Supabase, and Claude AI
- Setup takes under 3 weeks, done-for-you
- Monthly subscription, no setup fees, no lock-in contracts
- OperateAI is based in Ontario, Canada
- Currently onboarding first clients — early partners get founding pricing

## What you do NOT do
- Do NOT quote specific prices. Say: "Pricing depends on your volume and channels — the audit call is the best way to get a quote."
- Do NOT commit to features that aren't listed above. If asked about something you're unsure of, say: "I'd want the team to answer that directly — want to book a quick audit call?"
- Do NOT answer off-topic questions. If someone asks for help with their code, homework, or anything unrelated, say: "I'm here to help with Lead Engine — is there anything about the product I can help with?"
- Do NOT pretend to be human. If asked, say: "I'm Ora, an AI assistant built on Lead Engine — the same technology we'd set up for your business."

## Lead capture behavior
- Be naturally conversational. Don't ask for info out of nowhere.
- By the 3rd or 4th exchange, if the visitor seems interested, ask for their name and email: "If you'd like, I can have the team reach out with more details. What's your name and best email?"
- If they provide contact info, use the capture_lead tool to save it.
- After capturing, suggest booking: "Thanks! You can also book a free 30-minute audit directly — no pitch deck, no commitment."
- If they decline to share info, don't push. Continue being helpful.

## Tone
Bold and direct. Confident, not salesy. Match the energy of the landing page. Short sentences. No filler words. No emoji unless the visitor uses them first.

## Meta-awareness
You ARE the product demo. If someone asks how the chat works, lean into it: "You're experiencing Lead Engine right now. This is what your leads would see — fast, helpful, on-brand responses 24/7."`;
```

- [ ] **Step 2: Commit**

```bash
cd /Users/riccardocelebre/Desktop/OperateAI\ Website/operateai
git add lib/ora-system-prompt.ts
git commit -m "feat: add Ora system prompt"
```

---

## Task 3: Chat API Route

**Files:**
- Create: `app/api/chat/route.ts`

- [ ] **Step 1: Create the chat API route**

Read the AI SDK docs first to verify `streamText` and `tool` APIs:
```bash
cd /Users/riccardocelebre/Desktop/OperateAI\ Website/operateai
grep -r "streamText" node_modules/ai/docs/ | head -5
grep -r "export function tool" node_modules/ai/src/ | head -3
```

Then create the file:

```typescript
// app/api/chat/route.ts

import { streamText, tool, UIMessage } from 'ai';
import { z } from 'zod';
import { ORA_SYSTEM_PROMPT } from '@/lib/ora-system-prompt';

// Track captured emails per request to prevent dupes within a session
// (The client sends the full message history each time, so we check against prior tool calls)
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  try {
    const { messages }: { messages: UIMessage[] } = await req.json();

    // Extract already-captured emails from prior tool calls in message history
    const capturedEmails = new Set<string>();
    for (const msg of messages) {
      if (msg.role === 'assistant' && msg.parts) {
        for (const part of msg.parts) {
          if (
            'toolName' in part &&
            part.toolName === 'capture_lead' &&
            'output' in part &&
            part.output?.email
          ) {
            capturedEmails.add(part.output.email.toLowerCase());
          }
        }
      }
    }

    const result = streamText({
      model: 'anthropic/claude-sonnet-4.5',
      system: ORA_SYSTEM_PROMPT,
      messages,
      tools: {
        capture_lead: tool({
          description:
            'Capture a lead\'s contact information when they provide their name and email. Call this when a visitor shares their contact details.',
          inputSchema: z.object({
            name: z.string().describe('The visitor\'s name'),
            email: z.string().describe('The visitor\'s email address'),
            business: z
              .string()
              .optional()
              .describe('The visitor\'s business name, if provided'),
          }),
          execute: async ({ name, email, business }) => {
            // Server-side email validation
            if (!email || !EMAIL_REGEX.test(email)) {
              console.warn('[Ora] Invalid email from AI:', { name, email, business });
              return {
                success: false,
                reason: 'invalid_email',
                message: 'The email address doesn\'t look right. Could you double-check it?',
              };
            }

            // Reject placeholder/empty data
            if (!name || name.trim().length < 2) {
              console.warn('[Ora] Invalid name from AI:', { name, email, business });
              return {
                success: false,
                reason: 'invalid_name',
                message: 'I didn\'t catch the name clearly. Could you confirm?',
              };
            }

            const normalizedEmail = email.toLowerCase().trim();

            // Dedup check
            if (capturedEmails.has(normalizedEmail)) {
              console.log('[Ora] Duplicate email skipped:', normalizedEmail);
              return {
                success: true,
                reason: 'already_captured',
                message: 'Already got your details — the team will be in touch!',
              };
            }

            // Log the tool call
            console.log('[Ora] capture_lead called:', {
              ai_intended: { name, email, business },
              validated: { name: name.trim(), email: normalizedEmail, business: business?.trim() || null },
            });

            // POST to /api/contact
            try {
              const contactRes = await fetch(
                new URL('/api/contact', req.url).toString(),
                {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    name: name.trim(),
                    email: normalizedEmail,
                    business: business?.trim() || '',
                    message: 'Lead captured via Ora chat widget on operateai.ca',
                  }),
                }
              );

              if (!contactRes.ok) {
                console.error('[Ora] /api/contact failed:', contactRes.status);
                return {
                  success: false,
                  reason: 'server_error',
                  message: 'Got it — I\'ll make sure the team follows up with you.',
                };
              }

              capturedEmails.add(normalizedEmail);

              return {
                success: true,
                reason: 'captured',
                message: `Thanks ${name.trim()}! The team will reach out to ${normalizedEmail} shortly.`,
              };
            } catch (err) {
              console.error('[Ora] capture_lead error:', err);
              return {
                success: false,
                reason: 'server_error',
                message: 'Got it — I\'ll make sure the team follows up with you.',
              };
            }
          },
        }),
      },
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error('[Ora] Chat route error:', error);
    return new Response(
      JSON.stringify({ error: 'Something went wrong. Please try again.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
```

- [ ] **Step 2: Verify the route compiles**

```bash
cd /Users/riccardocelebre/Desktop/OperateAI\ Website/operateai
npx tsc --noEmit app/api/chat/route.ts 2>&1 | head -20
```

If there are type errors, check `node_modules/ai/docs/` for the correct API and fix.

- [ ] **Step 3: Commit**

```bash
cd /Users/riccardocelebre/Desktop/OperateAI\ Website/operateai
git add app/api/chat/route.ts
git commit -m "feat: add /api/chat route with Ora system prompt and capture_lead tool"
```

---

## Task 4: Chat Widget Component

**Files:**
- Create: `components/ChatWidget.tsx`
- Modify: `app/globals.css`

- [ ] **Step 1: Create the ChatWidget component**

Before writing, verify the `useChat` API:
```bash
cd /Users/riccardocelebre/Desktop/OperateAI\ Website/operateai
grep -r "useChat" node_modules/@ai-sdk/react/docs/ 2>/dev/null | head -5
grep -r "sendMessage" node_modules/@ai-sdk/react/src/ 2>/dev/null | head -5
```

The AI SDK v6 `useChat` hook:
- Does NOT manage input state (use `useState` manually)
- Uses `transport: new DefaultChatTransport({ api })` instead of `api` prop
- Uses `sendMessage({ text })` instead of `handleSubmit`
- Messages have `.parts` array with `{ type: 'text', text }` entries

```tsx
// components/ChatWidget.tsx

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

  const { messages, sendMessage, isLoading } = useChat({ transport });

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

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
  }, [messages, reduced]);

  // Focus input when opening
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

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

  // Extract text from message parts
  const getMessageText = (msg: (typeof messages)[number]): string => {
    if (!msg.parts) return '';
    return msg.parts
      .filter((p): p is { type: 'text'; text: string } => p.type === 'text')
      .map((p) => p.text)
      .join('');
  };

  if (isHidden) return null;

  return (
    <>
      {/* Floating trigger button */}
      <AnimatePresence>
        {!isOpen && (
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
                    Hey — I&apos;m Ora. Ask me anything about Lead Engine, or tell me about your business and I&apos;ll show you how we can help.
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
```

- [ ] **Step 2: Add chat widget CSS to globals.css**

Append the following to the end of `app/globals.css` (before the `@media (prefers-reduced-motion)` block):

```css
/* ── Chat widget ───────────────────────────────────────── */
.chat-bubble {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 50;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: #38BDF8;
  color: #0B0F1A;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 20px rgba(56, 189, 248, 0.3);
  transition: box-shadow 200ms ease-out, transform 200ms ease-out;
  border: none;
}
.chat-bubble:hover {
  box-shadow: 0 6px 28px rgba(56, 189, 248, 0.45);
  transform: scale(1.05);
}

.chat-panel {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 50;
  width: 400px;
  height: 500px;
  max-height: calc(100dvh - 48px);
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  background: rgba(17, 24, 39, 0.95);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.5);
  overflow: hidden;
}

@media (max-width: 480px) {
  .chat-panel {
    width: 100%;
    height: 70dvh;
    bottom: 0;
    right: 0;
    border-radius: 16px 16px 0 0;
  }
  .chat-bubble {
    bottom: 16px;
    right: 16px;
  }
}

.chat-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  flex-shrink: 0;
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.chat-msg {
  max-width: 85%;
  padding: 10px 14px;
  border-radius: 12px;
  line-height: 1.6;
}
.chat-msg-assistant {
  align-self: flex-start;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.06);
  color: #F1F5F9;
}
.chat-msg-user {
  align-self: flex-end;
  background: rgba(56, 189, 248, 0.12);
  border: 1px solid rgba(56, 189, 248, 0.2);
  color: #F1F5F9;
}

.chat-input-area {
  display: flex;
  gap: 8px;
  padding: 12px 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  flex-shrink: 0;
}

.chat-input {
  flex: 1;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #F1F5F9;
  font-size: 0.875rem;
  padding: 10px 14px;
  border-radius: 10px;
  outline: none;
  font-family: var(--font-outfit), system-ui, sans-serif;
  min-height: 40px;
}
.chat-input::placeholder { color: #64748B; }
.chat-input:focus {
  border-color: rgba(56, 189, 248, 0.4);
  box-shadow: 0 0 0 2px rgba(56, 189, 248, 0.12);
}

.chat-send {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: #38BDF8;
  color: #0B0F1A;
  border: none;
  cursor: pointer;
  flex-shrink: 0;
  transition: opacity 150ms;
}
.chat-send:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

@keyframes chat-bounce {
  0%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-4px); }
}
.chat-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #64748B;
  animation: chat-bounce 1s ease-in-out infinite;
}
```

- [ ] **Step 3: Update reduced motion media query in globals.css**

Add `.chat-dot` to the reduced motion block. Find the existing `@media (prefers-reduced-motion: reduce)` block at the end of `globals.css` and add:

```css
@media (prefers-reduced-motion: reduce) {
  .pulse-ring { animation: none; }
  .glass, .glass-flagship { transition: none; }
  .btn-primary { transition: none; }
  .chat-dot { animation: none; }
  .chat-bubble { transition: none; }
  html { scroll-behavior: auto; }
}
```

- [ ] **Step 4: Verify dev server starts**

```bash
cd /Users/riccardocelebre/Desktop/OperateAI\ Website/operateai
npm run build 2>&1 | tail -10
```

Expected: Build succeeds (ChatWidget not yet mounted in layout, so it's tree-shaken but should compile).

- [ ] **Step 5: Commit**

```bash
cd /Users/riccardocelebre/Desktop/OperateAI\ Website/operateai
git add components/ChatWidget.tsx app/globals.css
git commit -m "feat: add Ora chat widget component and styles"
```

---

## Task 5: Rewrite Hero Section

**Files:**
- Modify: `components/Hero.tsx`

- [ ] **Step 1: Rewrite Hero.tsx**

Replace the entire contents of `components/Hero.tsx`:

```tsx
// components/Hero.tsx

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
    // Dispatch custom event that ChatWidget listens for
    window.dispatchEvent(new CustomEvent('open-ora'));
  };

  return (
    <section
      id="home"
      className="relative min-h-dvh flex flex-col justify-center px-6 md:px-8 pt-24 pb-20 overflow-hidden"
    >
      {/* Atmospheric gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }} aria-hidden="true">
        <div
          style={{
            position: 'absolute',
            top: '-200px',
            left: '-100px',
            width: '800px',
            height: '800px',
            background: 'radial-gradient(circle, rgba(56,189,248,0.08) 0%, transparent 50%)',
            filter: 'blur(80px)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-100px',
            right: '-200px',
            width: '600px',
            height: '600px',
            background: 'radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 50%)',
            filter: 'blur(80px)',
          }}
        />
      </div>

      <div className="relative max-w-content mx-auto w-full" style={{ zIndex: 1 }}>
        {/* Pill badge */}
        <motion.div {...fade(0.05)} className="mb-8">
          <div className="inline-flex items-center gap-2.5 hero-pill rounded-full px-4 py-1.5">
            <span className="relative flex h-2 w-2 flex-shrink-0" aria-hidden="true">
              <span className="pulse-ring absolute inline-flex h-full w-full rounded-full bg-accent" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
            </span>
            <span className="font-mono text-[11px] text-accent tracking-[0.2em]">
              powered by Lead Engine
            </span>
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          {...fade(0.13)}
          className="font-display text-text-primary mb-7"
          style={{
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            letterSpacing: '-0.04em',
            fontWeight: 400,
            lineHeight: 1.08,
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
          OperateAI builds Lead Engine — the AI that responds to your leads in seconds, qualifies them, and books appointments. While you sleep.
        </motion.p>

        {/* CTAs */}
        <motion.div {...fade(0.29)} className="flex flex-wrap items-center gap-4 mb-6">
          <a
            href="#book"
            className="btn-primary inline-flex items-center justify-center font-body text-sm font-semibold bg-accent text-bg-primary px-7 py-3.5 rounded-lg min-h-[44px] cursor-pointer"
          >
            Book a Free Audit
          </a>
          <button
            onClick={openChat}
            className="inline-flex items-center justify-center font-body text-sm font-semibold text-accent px-6 py-3.5 rounded-lg min-h-[44px] cursor-pointer transition-colors duration-200 hover:bg-accent/10"
            style={{ border: '1px solid rgba(56,189,248,0.3)' }}
          >
            Try Ora — she&apos;s running on Lead Engine
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
    </section>
  );
}
```

- [ ] **Step 2: Add `open-ora` event listener to ChatWidget**

In `components/ChatWidget.tsx`, add this effect inside the component, after the existing `useEffect` hooks:

```typescript
  // Listen for open-ora event from Hero CTA
  useEffect(() => {
    const handler = () => setIsOpen(true);
    window.addEventListener('open-ora', handler);
    return () => window.removeEventListener('open-ora', handler);
  }, []);
```

- [ ] **Step 3: Commit**

```bash
cd /Users/riccardocelebre/Desktop/OperateAI\ Website/operateai
git add components/Hero.tsx components/ChatWidget.tsx
git commit -m "feat: rewrite Hero with new copy and Ora CTA integration"
```

---

## Task 6: Create TheProblem Section

**Files:**
- Create: `components/TheProblem.tsx`
- Delete: `components/TheCost.tsx`

- [ ] **Step 1: Create TheProblem.tsx**

```tsx
// components/TheProblem.tsx

'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

const scenarios = [
  {
    num: '01',
    text: 'A lead DMs you on Instagram at 9pm. You see it at 7am. They booked with your competitor at 9:30pm.',
  },
  {
    num: '02',
    text: 'You spend your morning copying leads from email into a spreadsheet instead of closing deals.',
  },
  {
    num: '03',
    text: 'A warm lead went cold because nobody followed up for 4 days.',
  },
];

export default function TheProblem() {
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
      className="px-6 md:px-8 py-20 md:py-24 border-t"
      style={{ borderColor: 'rgba(255,255,255,0.06)' }}
    >
      <div className="max-w-content mx-auto">
        <motion.p
          {...fade(0)}
          className="font-mono text-[11px] text-text-muted uppercase tracking-[0.2em] mb-12"
        >
          The problem
        </motion.p>

        {/* Asymmetric grid: large card + two stacked */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          <motion.div
            {...fade(0.08)}
            className="glass rounded-2xl p-8 md:p-10 md:col-span-2 flex flex-col justify-between"
          >
            <p className="font-mono text-[11px] text-accent uppercase tracking-[0.18em] mb-4">
              {scenarios[0].num}
            </p>
            <p
              className="font-body text-text-primary text-lg md:text-xl font-semibold"
              style={{ lineHeight: 1.5 }}
            >
              {scenarios[0].text}
            </p>
          </motion.div>

          <div className="flex flex-col gap-4">
            {scenarios.slice(1).map((s, i) => (
              <motion.div
                key={s.num}
                {...fade(0.16 + i * 0.08)}
                className="glass rounded-2xl p-7 flex flex-col justify-between flex-1"
              >
                <p className="font-mono text-[11px] text-accent uppercase tracking-[0.18em] mb-3">
                  {s.num}
                </p>
                <p
                  className="font-body text-sm text-text-secondary"
                  style={{ lineHeight: 1.65 }}
                >
                  {s.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* HBR stat */}
        <motion.p
          {...fade(0.32)}
          className="font-body text-text-secondary text-base md:text-lg mb-3"
          style={{ lineHeight: 1.65 }}
        >
          Harvard Business Review found that responding within 5 minutes makes you{' '}
          <span className="text-text-primary font-semibold">100x more likely</span> to connect with a lead.
        </motion.p>

        <motion.p
          {...fade(0.36)}
          className="font-mono text-[10px] text-text-muted uppercase tracking-[0.16em] mb-8"
        >
          Source: HBR, &quot;The Short Life of Online Sales Leads&quot;, 2011
        </motion.p>

        {/* Closing line */}
        <motion.p
          {...fade(0.40)}
          className="font-body text-text-primary text-lg md:text-xl font-semibold"
          style={{ lineHeight: 1.4 }}
        >
          This is the problem. Lead Engine is the fix.
        </motion.p>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Delete TheCost.tsx**

```bash
cd /Users/riccardocelebre/Desktop/OperateAI\ Website/operateai
rm components/TheCost.tsx
```

- [ ] **Step 3: Commit**

```bash
cd /Users/riccardocelebre/Desktop/OperateAI\ Website/operateai
git add components/TheProblem.tsx
git rm components/TheCost.tsx
git commit -m "feat: replace TheCost with TheProblem (scenario-based copy)"
```

---

## Task 7: Create TheSolution Section

**Files:**
- Create: `components/TheSolution.tsx`
- Delete: `components/WhatWeBuild.tsx`

- [ ] **Step 1: Create TheSolution.tsx**

```tsx
// components/TheSolution.tsx

'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

const features = [
  {
    title: 'Multi-Channel Inbox',
    description: 'Email, Instagram DMs, Facebook Messenger — unified in one view. No more switching between five apps.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-accent" aria-hidden="true">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'AI That Responds in Seconds',
    description: 'Reads every inbound message, decides the best reply, sends it with your approval. 24/7 response time. Your voice, not a robot\u2019s.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-accent" aria-hidden="true">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'Smart Pipeline',
    description: 'Leads auto-scored and classified — hot, warm, or cold. Visual funnel from new lead to booked appointment. Focus on the ones ready to close.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-accent" aria-hidden="true">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'Automated Follow-Up',
    description: 'Stale leads get re-engaged automatically. CASL-compliant send windows built in. No lead falls through the cracks.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-accent" aria-hidden="true">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
        <polyline points="12 6 12 12 16 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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
      id="product"
      ref={ref}
      className="px-6 md:px-8 py-20 md:py-24 border-t"
      style={{ borderColor: 'rgba(255,255,255,0.06)' }}
    >
      <div className="max-w-content mx-auto">
        <motion.p
          {...fade(0)}
          className="font-mono text-[11px] text-text-muted uppercase tracking-[0.2em] mb-12"
        >
          Lead Engine
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              {...fade(0.07 + i * 0.08)}
              className="glass rounded-2xl p-8 md:p-10"
            >
              <div className="mb-5">{feature.icon}</div>
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
```

- [ ] **Step 2: Delete WhatWeBuild.tsx**

```bash
cd /Users/riccardocelebre/Desktop/OperateAI\ Website/operateai
rm components/WhatWeBuild.tsx
```

- [ ] **Step 3: Commit**

```bash
cd /Users/riccardocelebre/Desktop/OperateAI\ Website/operateai
git add components/TheSolution.tsx
git rm components/WhatWeBuild.tsx
git commit -m "feat: replace WhatWeBuild with TheSolution (Lead Engine features)"
```

---

## Task 8: Create HowItWorks Section

**Files:**
- Create: `components/HowItWorks.tsx`
- Delete: `components/Methodology.tsx`

- [ ] **Step 1: Create HowItWorks.tsx**

```tsx
// components/HowItWorks.tsx

'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

const steps = [
  {
    num: '01',
    title: 'We audit your pipeline',
    body: '30-minute call. We find where leads are leaking.',
  },
  {
    num: '02',
    title: 'We build your system',
    body: 'Lead Engine configured for your business, channels connected, AI persona matched to your voice. Most builds ship in under 3 weeks.',
  },
  {
    num: '03',
    title: 'We run it with you',
    body: 'AI handles the volume. You approve messages, close deals. We maintain everything.',
  },
];

export default function HowItWorks() {
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
      id="how"
      ref={ref}
      className="px-6 md:px-8 py-20 md:py-24 border-t"
      style={{ borderColor: 'rgba(255,255,255,0.06)' }}
    >
      <div className="max-w-content mx-auto">
        <motion.p
          {...fade(0)}
          className="font-mono text-[11px] text-text-muted uppercase tracking-[0.2em] mb-12"
        >
          How it works
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              {...fade(0.07 + i * 0.1)}
              className="glass rounded-2xl p-8 md:p-10 relative"
            >
              <p
                className="font-display text-text-muted leading-none mb-6 select-none"
                style={{
                  fontSize: 'clamp(3rem, 6vw, 4.5rem)',
                  letterSpacing: '-0.03em',
                  fontWeight: 400,
                  opacity: 0.25,
                }}
                aria-hidden="true"
              >
                {step.num}
              </p>
              <h3
                className="font-body font-semibold text-text-primary text-lg mb-3"
                style={{ lineHeight: 1.3 }}
              >
                {step.title}
              </h3>
              <p
                className="font-body text-text-secondary text-sm"
                style={{ lineHeight: 1.7 }}
              >
                {step.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Delete Methodology.tsx**

```bash
cd /Users/riccardocelebre/Desktop/OperateAI\ Website/operateai
rm components/Methodology.tsx
```

- [ ] **Step 3: Commit**

```bash
cd /Users/riccardocelebre/Desktop/OperateAI\ Website/operateai
git add components/HowItWorks.tsx
git rm components/Methodology.tsx
git commit -m "feat: replace Methodology with HowItWorks (3 steps)"
```

---

## Task 9: Create TrustSignals Section

**Files:**
- Create: `components/TrustSignals.tsx`
- Delete: `components/WhatsIncluded.tsx`

- [ ] **Step 1: Create TrustSignals.tsx**

```tsx
// components/TrustSignals.tsx

'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

const metrics = [
  '24/7 Response',
  '< 30s Reply Time',
  'Human Approval on Every Message',
];

const included = [
  'AI persona matched to your voice using samples of how you actually write',
  'You approve every outbound message \u2014 full autonomy when you\u2019re ready',
  'Weekly review calls for the first month, then monthly',
  'CASL-compliant send windows built in',
  'No setup fees. No lock-in contracts.',
];

const integrations = [
  { name: 'Outlook', label: 'Email' },
  { name: 'Instagram', label: 'DMs' },
  { name: 'Messenger', label: 'Chat' },
  { name: 'Cal.com', label: 'Booking' },
  { name: 'Claude', label: 'AI' },
];

function CheckIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4 flex-shrink-0 mt-0.5" aria-hidden="true">
      <path d="M3 8.5l3.5 3.5L13 5" stroke="#38BDF8" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function TrustSignals() {
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
      className="px-6 md:px-8 py-20 md:py-24 border-t"
      style={{ borderColor: 'rgba(255,255,255,0.06)' }}
    >
      <div className="max-w-content mx-auto">
        <motion.p
          {...fade(0)}
          className="font-mono text-[11px] text-text-muted uppercase tracking-[0.2em] mb-12"
        >
          Built for service businesses
        </motion.p>

        {/* Integration logos */}
        <motion.div {...fade(0.08)} className="flex flex-wrap gap-6 mb-12">
          {integrations.map((item) => (
            <div key={item.name} className="flex items-center gap-2">
              <span className="font-body text-sm text-text-primary font-semibold">{item.name}</span>
              <span className="font-mono text-[10px] text-text-muted uppercase tracking-[0.12em]">{item.label}</span>
            </div>
          ))}
        </motion.div>

        {/* Key metrics */}
        <motion.div {...fade(0.16)} className="flex flex-wrap gap-3 mb-12">
          {metrics.map((metric) => (
            <span
              key={metric}
              className="inline-flex items-center px-4 py-2 rounded-full font-mono text-[11px] text-accent tracking-[0.1em]"
              style={{
                background: 'rgba(56,189,248,0.06)',
                border: '1px solid rgba(56,189,248,0.2)',
              }}
            >
              {metric}
            </span>
          ))}
        </motion.div>

        {/* What's included */}
        <motion.div {...fade(0.24)} className="glass rounded-2xl p-8 md:p-10 mb-8">
          <p className="font-body font-semibold text-text-primary text-base mb-6">
            What&apos;s included
          </p>
          <ul className="flex flex-col gap-4">
            {included.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckIcon />
                <span className="font-body text-sm text-text-secondary" style={{ lineHeight: 1.6 }}>
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Early partner angle */}
        <motion.p
          {...fade(0.32)}
          className="font-body text-text-secondary text-base"
          style={{ lineHeight: 1.65 }}
        >
          Currently onboarding our first clients.{' '}
          <span className="text-text-primary font-semibold">Early partners lock in founding pricing.</span>
        </motion.p>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Delete WhatsIncluded.tsx**

```bash
cd /Users/riccardocelebre/Desktop/OperateAI\ Website/operateai
rm components/WhatsIncluded.tsx
```

- [ ] **Step 3: Commit**

```bash
cd /Users/riccardocelebre/Desktop/OperateAI\ Website/operateai
git add components/TrustSignals.tsx
git rm components/WhatsIncluded.tsx
git commit -m "feat: replace WhatsIncluded with TrustSignals (metrics, logos, what's included)"
```

---

## Task 10: Update FAQ Section

**Files:**
- Modify: `components/FAQ.tsx`

- [ ] **Step 1: Update the faqs array**

In `components/FAQ.tsx`, replace the `faqs` array (lines 7-31) with:

```typescript
const faqs = [
  {
    q: 'Is this a SaaS tool or a done-for-you service?',
    a: 'Done-for-you. We build, configure, and maintain Lead Engine for your business. You approve messages and close deals.',
  },
  {
    q: 'How long does setup take?',
    a: 'Most builds ship in under 3 weeks. We start with a 30-minute audit call, then handle everything.',
  },
  {
    q: 'What does it cost?',
    a: 'Monthly subscription, no setup fees. Pricing depends on your volume and channels. Book an audit and we\'ll quote you on the call.',
  },
  {
    q: 'Can I control what the AI says?',
    a: 'Yes. You set the AI\'s persona — name, tone, voice, things to always say and never say. And you can approve every message before it\'s sent.',
  },
  {
    q: 'What channels does it support?',
    a: 'Email (Outlook), Instagram DMs, and Facebook Messenger today. More coming soon.',
  },
];
```

- [ ] **Step 2: Add `id="faq"` to the section element**

In `components/FAQ.tsx`, on the `<section>` element (around line 117), add `id="faq"`:

Change:
```tsx
    <section
      ref={ref}
      className="px-6 md:px-8 py-20 md:py-24 border-t"
```

To:
```tsx
    <section
      id="faq"
      ref={ref}
      className="px-6 md:px-8 py-20 md:py-24 border-t"
```

- [ ] **Step 3: Commit**

```bash
cd /Users/riccardocelebre/Desktop/OperateAI\ Website/operateai
git add components/FAQ.tsx
git commit -m "feat: update FAQ to 5 questions with new copy"
```

---

## Task 11: Simplify BookAudit Section

**Files:**
- Modify: `components/BookAudit.tsx`

- [ ] **Step 1: Rewrite BookAudit.tsx**

Replace the entire contents of `components/BookAudit.tsx`:

```tsx
// components/BookAudit.tsx

'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

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
      className="px-6 md:px-8 py-20 md:py-28 border-t"
      style={{ borderColor: 'rgba(255,255,255,0.06)' }}
    >
      <div className="max-w-content mx-auto text-center">
        <motion.h2
          {...fade(0)}
          className="font-display text-text-primary mb-6"
          style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            letterSpacing: '-0.03em',
            fontWeight: 400,
            lineHeight: 1.1,
          }}
        >
          Stop Losing Leads.
          <br />
          Book a Free Audit.
        </motion.h2>

        <motion.div {...fade(0.12)} className="mb-8">
          <a
            href="https://calendly.com/operateai/free-audit"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center justify-center font-body text-base font-semibold bg-accent text-bg-primary px-8 py-4 rounded-lg min-h-[48px] cursor-pointer"
          >
            Book a Free Audit
          </a>
        </motion.div>

        <motion.p
          {...fade(0.20)}
          className="font-mono text-[12px] text-text-muted tracking-[0.08em]"
        >
          No pitch deck &middot; No commitment &middot; 30 minutes
        </motion.p>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
cd /Users/riccardocelebre/Desktop/OperateAI\ Website/operateai
git add components/BookAudit.tsx
git commit -m "feat: simplify BookAudit to centered Calendly CTA"
```

---

## Task 12: Update Nav

**Files:**
- Modify: `components/Nav.tsx`

- [ ] **Step 1: Update navigation links and CTA copy**

In `components/Nav.tsx`, replace the desktop nav links (lines 55-73) with:

```tsx
        <nav className="hidden md:flex items-center gap-8" aria-label="Primary navigation">
          <a
            href="#product"
            className="font-body text-sm text-text-muted hover:text-text-primary transition-colors duration-200"
          >
            Product
          </a>
          <a
            href="#how"
            className="font-body text-sm text-text-muted hover:text-text-primary transition-colors duration-200"
          >
            How It Works
          </a>
          <a
            href="#faq"
            className="font-body text-sm text-text-muted hover:text-text-primary transition-colors duration-200"
          >
            FAQ
          </a>
          <a
            href="#book"
            className="btn-primary font-body text-sm font-semibold bg-accent text-bg-primary px-5 py-2 rounded-lg min-h-[36px] inline-flex items-center cursor-pointer"
          >
            Book a Free Audit
          </a>
        </nav>
```

- [ ] **Step 2: Update mobile menu links**

In `components/Nav.tsx`, replace the mobile menu links (lines 109-129) with:

```tsx
            <a
              href="#product"
              onClick={() => setMenuOpen(false)}
              className="font-body text-sm text-text-muted hover:text-text-primary transition-colors cursor-pointer"
            >
              Product
            </a>
            <a
              href="#how"
              onClick={() => setMenuOpen(false)}
              className="font-body text-sm text-text-muted hover:text-text-primary transition-colors cursor-pointer"
            >
              How It Works
            </a>
            <a
              href="#faq"
              onClick={() => setMenuOpen(false)}
              className="font-body text-sm text-text-muted hover:text-text-primary transition-colors cursor-pointer"
            >
              FAQ
            </a>
            <a
              href="#book"
              onClick={() => setMenuOpen(false)}
              className="btn-primary font-body text-sm font-semibold bg-accent text-bg-primary px-5 py-3 rounded-lg text-center cursor-pointer"
            >
              Book a Free Audit
            </a>
```

- [ ] **Step 3: Commit**

```bash
cd /Users/riccardocelebre/Desktop/OperateAI\ Website/operateai
git add components/Nav.tsx
git commit -m "feat: update Nav links (Product, How It Works, FAQ) and CTA copy"
```

---

## Task 13: Assemble Page and Layout

**Files:**
- Modify: `app/page.tsx`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Update page.tsx with new section lineup**

Replace the entire contents of `app/page.tsx`:

```tsx
// app/page.tsx

import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import TheProblem from '@/components/TheProblem';
import TheSolution from '@/components/TheSolution';
import HowItWorks from '@/components/HowItWorks';
import TrustSignals from '@/components/TrustSignals';
import FAQ from '@/components/FAQ';
import BookAudit from '@/components/BookAudit';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <TheProblem />
        <TheSolution />
        <HowItWorks />
        <TrustSignals />
        <FAQ />
        <BookAudit />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 2: Update layout.tsx — add ChatWidget and update metadata**

Replace the entire contents of `app/layout.tsx`:

```tsx
// app/layout.tsx

import type { Metadata } from 'next';
import { dmSerifDisplay, outfit, jetbrainsMono } from '@/lib/fonts';
import ChatWidget from '@/components/ChatWidget';
import './globals.css';

export const metadata: Metadata = {
  icons: {
    icon: '/logo-symbol.png',
    apple: '/logo-symbol.png',
  },
  title: 'OperateAI — AI-Powered Lead Management for Service Businesses',
  description:
    'OperateAI builds Lead Engine — the AI that responds to your leads in seconds, qualifies them, and books appointments. While you sleep.',
  metadataBase: new URL('https://operateai.ca'),
  openGraph: {
    title: 'OperateAI — AI-Powered Lead Management for Service Businesses',
    description:
      'OperateAI builds Lead Engine — the AI that responds to your leads in seconds, qualifies them, and books appointments. While you sleep.',
    url: 'https://operateai.ca',
    siteName: 'OperateAI',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'OperateAI — AI-Powered Lead Management',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OperateAI — AI-Powered Lead Management for Service Businesses',
    description:
      'Lead Engine responds to your leads in seconds, qualifies them, and books appointments. While you sleep.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: 'https://operateai.ca',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${dmSerifDisplay.variable} ${outfit.variable} ${jetbrainsMono.variable}`}
    >
      <body className="font-body">
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}
```

- [ ] **Step 3: Commit**

```bash
cd /Users/riccardocelebre/Desktop/OperateAI\ Website/operateai
git add app/page.tsx app/layout.tsx
git commit -m "feat: assemble new page sections and add ChatWidget to layout"
```

---

## Task 14: Build Verification

**Files:** None (verification only)

- [ ] **Step 1: Run the build**

```bash
cd /Users/riccardocelebre/Desktop/OperateAI\ Website/operateai
npm run build 2>&1
```

Expected: Build succeeds with no errors. Warnings about missing `AI_GATEWAY_API_KEY` at runtime are fine — the chat route will gracefully error without it.

- [ ] **Step 2: Fix any build errors**

If there are TypeScript errors, fix them. Common issues:
- Import paths (check exact filenames)
- AI SDK API changes (verify against `node_modules/ai/docs/`)
- Missing types (add type assertions as needed)

- [ ] **Step 3: Visual check with dev server**

```bash
cd /Users/riccardocelebre/Desktop/OperateAI\ Website/operateai
npm run dev
```

Open `http://localhost:3000` and verify:
- Nav: shows "Product", "How It Works", "FAQ", "Book a Free Audit"
- Hero: new headline, pill badge says "powered by Lead Engine", both CTAs visible
- The Problem: 3 scenario cards, HBR stat, closing line
- The Solution: 4 equal-weight feature cards in 2x2 grid
- How It Works: 3 step cards
- Trust Signals: integration names, metric pills, what's included list, early partner line
- FAQ: 5 questions with accordion
- Book Audit: centered headline + Calendly button + micro copy
- Chat bubble: visible in bottom-right, opens on click, hidden when Book Audit section is in view
- Mobile: all sections responsive, chat panel full-width

- [ ] **Step 4: Test Ora chat (requires AI Gateway key)**

Set up AI Gateway auth. Option A (recommended for Vercel-deployed projects):
```bash
vercel env pull .env.local
```

Option B (local dev with API key):
```
AI_GATEWAY_API_KEY=your-gateway-key-here
```

Restart dev server, open chat widget, send a message. Verify:
- Streaming response appears
- Ora responds in character (bold, direct, product-knowledgeable)
- "Try Ora" button in Hero opens the chat

- [ ] **Step 5: Final commit**

```bash
cd /Users/riccardocelebre/Desktop/OperateAI\ Website/operateai
git add -A
git commit -m "feat: complete OperateAI landing page redesign with Ora chat widget"
```
