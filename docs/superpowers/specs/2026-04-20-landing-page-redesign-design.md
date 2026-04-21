# OperateAI Landing Page Redesign + Ora Chat Widget — Design Spec

## Overview

Full redesign of the OperateAI landing page (operateai.ca) plus a new AI chat widget ("Ora"). The site sells Lead Engine — OperateAI's AI-powered inbound lead management platform — to service businesses, launching with real estate.

**Positioning**: Hybrid. Lead with the lead management problem, showcase Lead Engine as the solution, frame OperateAI as the team that builds and runs it.

**Tone**: Bold and direct. Challenge the reader, create urgency, back it up with specifics. No jargon, no fluff.

**Aesthetic**: Evolved dark luxury. Deep glassmorphism, atmospheric radial glows, refined typography. Premium SaaS feel (Linear, Vercel tier).

---

## Brand Clarity

OperateAI is the company. Lead Engine is the product. First-time visitors must understand this immediately.

- Nav and footer say "OperateAI"
- Hero explicitly states: "OperateAI builds Lead Engine"
- Product sections reference "Lead Engine" by name
- Chat widget header: "You're chatting with Lead Engine right now."

---

## Visual Design

### Palette
- Background: `#0B0F1A` (primary), `#111827` (cards), `#1A2335` (card hover)
- Accent: `#38BDF8` (cyan) — CTAs, highlights, links
- Text: `#F1F5F9` (primary), `#94A3B8` (secondary), `#64748B` (muted)
- Borders: `#1E293B` (subtle)
- Glow effects: radial gradients using cyan and violet at low opacity

### Typography
- Display/Headlines: DM Serif Display (serif) — `var(--font-dm-serif)`
- Body: Outfit (sans-serif) — `var(--font-outfit)` — test at 14px on dark bg; fall back to Inter if too thin
- Mono/Code: JetBrains Mono — `var(--font-jetbrains-mono)`
- All via `next/font/google` with `display: 'swap'`

### Effects
- Glassmorphism cards: `background: rgba(255,255,255,0.03)`, `border: 1px solid rgba(255,255,255,0.08)`, `backdrop-filter: blur(12px)`
- Atmospheric radial glows behind key sections
- Noise texture overlay at 0.03 opacity
- Framer Motion scroll-triggered reveals with `prefers-reduced-motion` support
- Smooth scroll with 80px offset for fixed nav

---

## Page Structure (8 sections + chat widget)

### 1. Nav (Fixed Header)

- **Left**: OperateAI logo
- **Center**: Product · How It Works · FAQ (anchor links)
- **Right**: "Book a Free Audit" button (cyan accent)
- Scroll detection: background opacity increases on scroll
- Mobile: hamburger menu with Framer Motion slide

### 2. Hero

- **Pill badge**: "powered by Lead Engine" (lowercase "powered by") — links the two brands immediately
- **Headline**: "A lead just messaged you. By the time you see this, we've already replied."
- **Subhead**: "OperateAI builds Lead Engine — the AI that responds to your leads in seconds, qualifies them, and books appointments. While you sleep."
- **Primary CTA**: "Book a Free Audit" (scrolls to Section 7)
- **Secondary CTA**: "Try Ora — she's running on Lead Engine" (opens chat widget)
- **Background**: Two atmospheric radial glows (cyan top-left, violet bottom-right)
- **Animation**: Staggered fade-up on load, reduced motion support

### 3. The Problem

Three concrete scenarios (no unsourced stats):

1. "A lead DMs you on Instagram at 9pm. You see it at 7am. They booked with your competitor at 9:30pm."
2. "You spend your morning copying leads from email into a spreadsheet instead of closing deals."
3. "A warm lead went cold because nobody followed up for 4 days."

**Anchoring stat**: "Harvard Business Review found that responding within 5 minutes makes you 100x more likely to connect with a lead." — cited inline with source.

**Closing line**: "This is the problem. Lead Engine is the fix."

**Layout**: Asymmetric card grid similar to current TheCost section. Each scenario in a glassmorphism card with subtle icon or number.

### 4. The Solution (Lead Engine Features)

Four feature blocks in a 2x2 grid:

1. **Multi-Channel Inbox**
   - Email, Instagram DMs, Facebook Messenger — unified in one view
   - Integration logos: Outlook, Instagram, Messenger, Cal.com
   - "No more switching between five apps."

2. **AI That Responds in Seconds**
   - Reads every inbound message, decides the best reply
   - Human-in-the-loop: you approve before it sends
   - "24/7 response time. Your voice, not a robot's."

3. **Smart Pipeline**
   - Leads auto-scored and classified (hot/warm/cold)
   - Visual funnel: New → Contacted → Nurturing → Qualified → Booked → Closed
   - "Focus on the leads that are ready to close."

4. **Automated Follow-Up**
   - Stale leads re-engaged automatically
   - Compliance-aware send windows
   - "No lead falls through the cracks."

Each block: glassmorphism card, icon, headline, 2-sentence description. Equal-weight 2x2 grid — no flagship treatment. Let the copy differentiate.

### 5. How It Works

Three steps, horizontal layout on desktop, stacked on mobile:

1. **We audit your pipeline** — "30-minute call. We find where leads are leaking."
2. **We build your system** — "Lead Engine configured for your business, channels connected, AI persona matched to your voice. Most builds ship in under 3 weeks."
3. **We run it with you** — "AI handles the volume. You approve messages, close deals. We maintain everything."

Each step: number (01/02/03), title, description. Connected by a subtle line or arrow on desktop.

### 6. Trust Signals

**Integration logos row**: Outlook, Instagram, Messenger, Cal.com, Claude (Anthropic)

**Key metrics** (three pills or cards):
- "24/7 Response"
- "< 30s Reply Time"
- "Human Approval on Every Message"

**What's included**:
- AI persona matched to your voice using samples of how you actually write
- You approve every outbound message — full autonomy when you're ready
- Weekly review calls for the first month, then monthly
- CASL-compliant send windows built in
- No setup fees. No lock-in contracts.

**Early partner angle**: "Currently onboarding our first clients. Early partners lock in founding pricing." — honest, no manufactured scarcity.

### 7. FAQ

Accordion with Framer Motion height animation. 5 questions:

1. **Is this a SaaS tool or a done-for-you service?** — Done-for-you. We build, configure, and maintain Lead Engine for your business. You approve messages and close deals.
2. **How long does setup take?** — Most builds ship in under 3 weeks. We start with a 30-minute audit call, then handle everything.
3. **What does it cost?** — Monthly subscription, no setup fees. Pricing depends on your volume and channels. Book an audit and we'll quote you on the call.
4. **Can I control what the AI says?** — Yes. You set the AI's persona — name, tone, voice, things to always say and never say. And you can approve every message before it's sent.
5. **What channels does it support?** — Email (Outlook), Instagram DMs, and Facebook Messenger today. More coming soon.

### 8. CTA / Book Audit

- **Headline**: "Stop Losing Leads. Book a Free Audit."
- **Calendly link button**: Opens Calendly in new tab (same as current site; embed is a future enhancement)
- **Below CTA**: "No pitch deck. No commitment. 30 minutes."
- Single-column, centered layout. No contact form here — the chat widget (Ora) handles lead capture conversationally.

### 9. Footer

- OperateAI logo
- "© 2026 OperateAI · Based in Ontario, Canada"
- Privacy policy link (placeholder)

---

## CTA Consistency

The CTA copy is **"Book a Free Audit"** everywhere — Nav, Hero, Section 7. Identical capitalization, identical wording. No variations.

---

## Ora Chat Widget

### Purpose

Ora is a **lead capture tool that answers product questions along the way**. Every conversation's goal is to move toward booking an audit. The chatbot is helpful first, then nudges — not the other way around.

Ora is Lead Engine eating its own dog food. When someone chats with Ora and the AI captures their info or directs them to book, you've just demonstrated the product live.

### UI

- **Trigger**: Floating circle button, bottom-right corner, cyan accent with subtle pulse animation
- **Expanded state**: Glassmorphism panel (400px wide, 500px tall on desktop), slides up from bottom-right with Framer Motion
- **Header**: "You're chatting with Lead Engine right now." — the revelation is the hook, not the branding. Ora's name comes through naturally in conversation.
- **Messages**: Dark bubbles for Ora, slightly lighter for user. Streaming text (tokens appear as they arrive).
- **Input**: Glass-styled input field with send button. Placeholder: "Ask about Lead Engine..."
- **Close**: X button in header, or click outside panel
- **Mobile**: Full-width panel, slides up from bottom, 70vh height
- **Reduced motion**: Respects `prefers-reduced-motion`
- **Visibility**: Hidden when Section 7 (Book Audit) is in the viewport (IntersectionObserver, threshold: 0.5). Shows again when they scroll away. Also hidden on `/book` route. Keeps the conversion moment clean without trapping the user.

### Tech Stack

- **Frontend**: React component with Vercel AI SDK `useChat` hook from `@ai-sdk/react`
- **Backend**: `/api/chat` route using Vercel AI SDK with `@ai-sdk/anthropic` provider
- **Model**: Claude (via Anthropic provider)
- **Streaming**: Server-sent events via AI SDK streaming response
- **Lead capture**: AI uses tool calling to POST lead info to `/api/contact` when user provides name + email

### System Prompt

```
You are Ora, an AI assistant on the OperateAI website. You help visitors understand Lead Engine — OperateAI's AI-powered lead management platform for service businesses.

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
You ARE the product demo. If someone asks how the chat works, lean into it: "You're experiencing Lead Engine right now. This is what your leads would see — fast, helpful, on-brand responses 24/7."
```

### Chat API Route (`/api/chat`)

- Accepts POST with `messages` array (AI SDK format)
- System prompt prepended server-side (not exposed to client)
- Streams response back using AI SDK streaming utilities
- Tool definition: `capture_lead` — accepts `{ name, email, business? }`, POSTs to `/api/contact` internally
- **Server-side validation on capture_lead execution**:
  - Email format validation (regex) before POST to `/api/contact`
  - Log every tool call: what the AI intended to capture vs what was actually received
  - Dedup check: skip if the same email was already captured in this session
  - Reject clearly invalid data (empty strings, placeholder text)
- Rate limiting: none at launch. Add Upstash-based limiting when abuse is observed. No false security from cookie/IP checks.
- Error handling: if Claude API fails, return a friendly fallback message

### Dependencies to Add

- `ai` — Vercel AI SDK core (includes AI Gateway provider)
- `@ai-sdk/react` — React hooks (`useChat`)
- `zod` — Schema validation for tool definitions

---

## Removed from Current Site

- **Methodology section** — replaced by simpler "How It Works" (3 steps vs 4)
- **WhatWeBuild section** — replaced by focused Lead Engine features. Other products (Booking Systems, Invoice & Collections, etc.) are cut. Ship one product, sell one product.
- **WhatsIncluded as standalone section** — merged into Trust Signals
- **BookAudit contact form** — replaced by Ora chat widget for lead capture. Section 7 is Calendly-only.
- **Calendly webhook route** — keep as-is, no changes needed

---

## Files to Create or Modify

### New files
- `components/ChatWidget.tsx` — Ora chat widget (client component)
- `components/ChatBubble.tsx` — floating trigger button
- `app/api/chat/route.ts` — AI SDK chat endpoint
- `lib/ora-system-prompt.ts` — system prompt constant

### Modified files
- `app/page.tsx` — new section lineup
- `app/layout.tsx` — add ChatWidget to layout (hidden when Book Audit section is in viewport via IntersectionObserver, and on `/book` route)
- `app/globals.css` — new/updated styles for chat widget, refined glassmorphism
- `components/Hero.tsx` — full rewrite with new copy
- `components/TheCost.tsx` → rename to `components/TheProblem.tsx` — scenario-based rewrite
- `components/WhatWeBuild.tsx` → rename to `components/TheSolution.tsx` — Lead Engine features
- `components/Methodology.tsx` → rename to `components/HowItWorks.tsx` — 3 steps
- `components/WhatsIncluded.tsx` → rename to `components/TrustSignals.tsx` — merged section
- `components/FAQ.tsx` — trimmed to 5 questions, updated copy
- `components/BookAudit.tsx` — simplified to Calendly CTA only
- `components/Nav.tsx` — updated links (Product, How It Works, FAQ)
- `components/Footer.tsx` — minor copy update
- `package.json` — add AI SDK dependencies
- `tailwind.config.ts` — no structural changes expected, but may refine values

### Unchanged files
- `lib/fonts.ts` — keep as-is
- `app/api/contact/route.ts` — keep as-is (Ora POSTs here)
- `app/api/webhooks/calendly/route.ts` — keep as-is
- `components/ui/Button.tsx` — keep as-is
- `components/ui/RevealOnScroll.tsx` — keep as-is
- `components/ui/SectionLabel.tsx` — keep as-is

---

## Environment Variables Required

Existing (no changes):
- `LEAD_ENGINE_SUPABASE_URL`
- `LEAD_ENGINE_SUPABASE_SERVICE_KEY`
- `LEAD_ENGINE_AGENT_ID`
- `RESEND_API_KEY`
- `NOTIFICATION_EMAIL`
- `CALENDLY_WEBHOOK_TOKEN`

New:
- `AI_GATEWAY_API_KEY` — for Vercel AI Gateway (required for Ora). Use `vercel env pull` for OIDC-based auth on Vercel deployments.
