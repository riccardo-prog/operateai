import Section from '@/components/ui/Section';
import SectionHeader from '@/components/ui/SectionHeader';

// Three uniform problem cards. Each label maps 1:1 to what Lead Engine fixes —
// Qualifying → surfacing → follow-up — so the section reads as a problem the
// product is built to answer (paid off by the bridge line below the grid).
const problems = [
  {
    label: 'Qualifying',
    statement: "You can't tell who's serious without working every lead.",
    detail:
      'Most inbound is low-intent, so you either burn hours sorting tire-kickers by hand — or you guess, and guessing loses the real buyers.',
  },
  {
    label: 'Surfacing',
    statement: 'The motivated buyers and sellers get buried in the volume.',
    detail:
      "The leads worth your time don't stand out on their own, and they don't wait around to be noticed.",
  },
  {
    label: 'Follow-up',
    statement: "The leads who aren't ready yet never hear from you again.",
    detail:
      "Future opportunities need steady follow-up you don't have time for, so they fade out of your pipeline before they're ever ready to move.",
  },
];

export default function TheProblem() {
  return (
    <Section id="problem" tone="canvas">
      <SectionHeader
        eyebrow="The real problem"
        title="You paid for these leads. You'll never speak to most of them again."
      >
        It was never a volume problem. Without a way to qualify every inquiry,
        surface the serious ones, and keep the rest warm, your best leads get
        buried and the rest go cold.
      </SectionHeader>

      <div className="mt-14 grid grid-cols-1 gap-4 md:mt-16 md:grid-cols-3 md:gap-5">
        {problems.map((p) => (
          <article
            key={p.label}
            className="flex flex-col rounded-2xl border border-border-soft bg-bg-elevated p-6 md:p-8"
          >
            {/* Editorial eyebrow: short ink hairline leads the category label,
                identical across all three cards to keep them uniform. */}
            <div className="flex items-center gap-2.5">
              <span className="h-px w-6 shrink-0 bg-ink-primary" aria-hidden="true" />
              <span className="text-xs font-medium uppercase tracking-[0.14em] text-ink-tertiary">
                {p.label}
              </span>
            </div>
            <h3 className="mt-5 text-lg font-semibold leading-snug text-ink-primary md:text-xl">
              {p.statement}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-ink-secondary md:text-[15px]">
              {p.detail}
            </p>
          </article>
        ))}
      </div>

      <p className="mx-auto mt-12 max-w-3xl text-center text-lg font-medium leading-relaxed text-ink-primary md:mt-14">
        Qualifying every inquiry, surfacing the serious ones, keeping the rest
        warm. That&rsquo;s exactly what Lead Engine does, automatically.
      </p>
    </Section>
  );
}
