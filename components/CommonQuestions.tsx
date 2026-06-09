import type { CSSProperties } from 'react';

/* ───────────────────────────────────────────────────────────────────────────
   Lead Engine — Common Questions
   Removes the last friction before booking a demo. Plain, honest answers to the
   real objections. Brand content: strictly monochrome, Outfit only, no status
   color. Four uniform question cards, copy-only differences.
   ─────────────────────────────────────────────────────────────────────────── */

const c = {
  ink: '#0A0A0A',
  graphite: '#1A1A1A',
  slate: '#3D3D3D',
  steel: '#6B6B6B',
  ash: '#9C9C9C',
  mist: '#C9C9C9',
  fog: '#E4E4E4',
  paper: '#F5F5F5',
  white: '#FFFFFF',
} as const;

const micro: CSSProperties = {
  fontWeight: 500,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
};

const questions = [
  {
    q: 'Will it sound robotic to my clients?',
    a: 'You set the voice and you see every message. Lead Engine asks qualifying questions the way a sharp assistant would, not a chatbot. The moment a lead is ready, it hands them to you, so the real relationship is always yours.',
  },
  {
    q: 'Do I need to switch CRMs or rebuild my setup?',
    a: 'No. Lead Engine connects to the lead sources you already use and works alongside your CRM. There is nothing to rip out and no new system to learn.',
  },
  {
    q: 'Does it talk to my leads on its own?',
    a: 'It engages and qualifies, then prepares the decision for you. You can read the full conversation, override any score or action, and step in whenever you want. The AI does the sorting. You stay the agent.',
  },
  {
    q: 'What if my leads or my market are different?',
    a: 'You define what "ready" means. The scoring follows your own criteria for motivation, intent, and qualification, so it reflects how you actually work, not a generic template.',
  },
];

export default function CommonQuestions() {
  return (
    <section id="common-questions" className="bg-white" style={{ color: c.ink }}>
      <div className="mx-auto max-w-[1120px] px-6 py-[72px] min-[820px]:py-[104px]">
        {/* Intro — left aligned, same structure as the other sections */}
        <div>
          <span className="block" style={{ ...micro, fontSize: 11, color: c.ash }}>
            Common questions
          </span>
          <h2
            className="mt-4 max-w-[600px] text-[28px] leading-[1.1] min-[820px]:text-[38px]"
            style={{ fontWeight: 700, letterSpacing: '-0.02em', color: c.ink }}
          >
            Questions you&rsquo;re probably asking.
          </h2>
          <p
            className="mt-5 max-w-[580px]"
            style={{ fontWeight: 400, fontSize: 18, lineHeight: 1.6, color: c.steel }}
          >
            If something is not covered here, a quick demo will answer it.
          </p>
        </div>

        {/* 2x2 grid of uniform question cards (single column under 820px) */}
        <div className="mt-14 grid grid-cols-1 gap-4 min-[820px]:mt-16 min-[820px]:grid-cols-2 min-[820px]:gap-6 min-[820px]:[grid-auto-rows:1fr]">
          {questions.map(({ q, a }) => (
            <article
              key={q}
              className="flex h-full flex-col bg-white"
              style={{
                borderRadius: 16,
                border: `1px solid ${c.fog}`,
                boxShadow: '0 4px 12px rgba(10, 10, 10, 0.05)',
                padding: 26,
              }}
            >
              <h3 style={{ fontWeight: 600, fontSize: 17, lineHeight: 1.3, color: c.ink }}>{q}</h3>
              <p className="mt-3.5" style={{ fontWeight: 400, fontSize: 15, lineHeight: 1.5, color: c.steel }}>
                {a}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
