import Section from '@/components/ui/Section';
import SectionHeader from '@/components/ui/SectionHeader';

const without = [
  'Leads sit too long',
  'Manual follow-up gets missed',
  'DMs, forms, and emails are scattered',
  'Agent has to chase every conversation',
];

const withEngine = [
  'Every lead gets a fast first response',
  'Follow-up happens automatically',
  'Serious leads are qualified',
  'Agent steps in when the conversation is ready',
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
        title="Your ads may be working. Your follow-up may be leaking deals."
      >
        Most agents do not lose leads because the leads are bad. They lose them
        because the response is too slow, the follow-up is inconsistent, or the
        lead gets forgotten after the first message. The expensive part is
        getting the lead. Lead Engine helps make sure that opportunity does not
        disappear after they click submit.
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
