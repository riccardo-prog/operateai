import Section from '@/components/ui/Section';
import SectionHeader from '@/components/ui/SectionHeader';

const guardrails = [
  'No pretending AI is the realtor',
  'No robotic generic scripts',
  'No sensitive promises made on your behalf',
  'Human handoff when the conversation matters',
  'Customized around your voice, your rules, and how you work',
];

function Check() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5 shrink-0 text-ink-secondary">
      <path
        d="M3.5 8.5l3 3 6-7"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function HumanReassurance() {
  return (
    <Section id="human" tone="muted">
      <SectionHeader
        eyebrow="Human in the Loop"
        title="AI handles the repetition. You handle the relationship."
      >
        Lead Engine does not pretend to be the realtor. It handles the first
        reply, the qualification, and the long-term nurture. You step in when
        the lead wants a real conversation about their home.
      </SectionHeader>

      <div className="mt-10 flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
        {guardrails.map((g) => (
          <span
            key={g}
            className="inline-flex items-center gap-2 rounded-full border border-border-soft bg-bg-elevated px-4 py-2 text-sm text-ink-secondary"
          >
            <Check />
            {g}
          </span>
        ))}
      </div>
    </Section>
  );
}
