# OperateAI

AI automation consulting for small and local businesses in Toronto, Ontario.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deploy to Vercel

```bash
git init
git add .
git commit -m "Initial commit"
vercel deploy
```

Or connect the GitHub repo directly in the Vercel dashboard for automatic deployments.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v3
- **Animations:** Framer Motion
- **Fonts:** DM Serif Display + Outfit (via next/font/google)
- **Deploy target:** Vercel

## Project Structure

```
operateai/
├── app/
│   ├── layout.tsx          # Root layout, fonts, metadata
│   ├── page.tsx            # Homepage
│   ├── globals.css         # Tailwind + custom CSS
│   └── api/contact/        # Contact form endpoint
├── components/
│   ├── Nav.tsx
│   ├── Hero.tsx
│   ├── StatsBar.tsx
│   ├── HowItWorks.tsx
│   ├── Problems.tsx
│   ├── Industries.tsx
│   ├── Results.tsx
│   ├── CTA.tsx
│   ├── Footer.tsx
│   └── ui/
│       ├── Button.tsx
│       ├── SectionLabel.tsx
│       └── RevealOnScroll.tsx
├── lib/
│   └── fonts.ts
└── public/
    └── og-image.png        # Add your OG image here
```

## Before Launch

1. Replace `https://operateai.ca` in `app/layout.tsx` with your real domain
2. ~~Replace the `https://calendly.com` placeholder in `components/CTA.tsx` with your real Calendly link~~ — done (`https://calendly.com/riccardo-operateai/free-audit`)
3. Add your OG image to `public/og-image.png` (1200×630px recommended)
4. Wire up the contact API in `app/api/contact/route.ts` with Resend or SendGrid
