import Section from '@/components/ui/Section';
import SectionHeader from '@/components/ui/SectionHeader';

const without = [
  'Buyers wait for a reply and move on',
  'Follow-up stops after the first message',
  'Inquiries get lost between DMs, forms, and email',
  'You chase every conversation yourself',
];

const withEngine = [
  'Every buyer and seller gets an instant reply',
  'No lead goes cold. Nurture keeps running',
  'Serious leads come pre-qualified',
  'You step in once they want to book',
];

function XMark() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="w-3 h-3">
      <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function Check() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="w-3 h-3">
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

export default function TheProblem() {
  return (
    <Section id="problem" tone="canvas">
      <SectionHeader
        eyebrow="The Problem"
        title="Every slow reply is a deal walking out the door."
      >
        Realtors are not losing deals because the leads are bad. They are losing
        deals because nobody replied fast enough. The lead got forgotten. The
        follow-up never happened. You already paid to get them through the
        door. Lead Engine makes sure they do not walk back out.
      </SectionHeader>

      <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
        {/* Without a system */}
        <div className="rounded-2xl bg-bg-elevated border border-border-soft p-6 md:p-8">
          <p className="text-xs font-medium tracking-[0.14em] uppercase text-ink-tertiary mb-6">
            Without a system
          </p>
          <ul className="flex flex-col gap-4">
            {without.map((item) => (
              <li key={item} className="flex items-center gap-3">
                <span className="shrink-0 flex h-6 w-6 items-center justify-center rounded-full border border-border-soft text-ink-tertiary">
                  <XMark />
                </span>
                <span className="text-sm md:text-base text-ink-secondary">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* With Lead Engine */}
        <div className="rounded-2xl bg-bg-elevated border border-border-soft p-6 md:p-8">
          <p className="text-xs font-medium tracking-[0.14em] uppercase text-ink-tertiary mb-6">
            With Lead Engine
          </p>
          <ul className="flex flex-col gap-4">
            {withEngine.map((item) => (
              <li key={item} className="flex items-center gap-3">
                <span className="shrink-0 flex h-6 w-6 items-center justify-center rounded-full bg-ink-primary text-white">
                  <Check />
                </span>
                <span className="text-sm md:text-base text-ink-primary">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
