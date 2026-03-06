import RevealOnScroll from './ui/RevealOnScroll';
import SectionLabel from './ui/SectionLabel';

const results = [
  {
    metric: '85%',
    label: 'Reduction in no-show rates',
    description:
      'Automated SMS and email reminders sent at the right time, with one-click rescheduling built in.',
  },
  {
    metric: '12 hrs',
    label: 'Saved per week on admin',
    description:
      'By connecting tools that currently require manual data transfer: CRM, email, invoicing, scheduling.',
  },
  {
    metric: '2x',
    label: 'Faster lead response time',
    description:
      'AI-powered instant responses and automated routing so no inquiry goes unanswered.',
  },
  {
    metric: '$3K+',
    label: 'Monthly revenue recovered',
    description:
      'From faster invoicing, fewer missed appointments, and better follow-up on warm leads.',
  },
];

export default function Results() {
  return (
    <section id="results" className="py-28 px-6 scroll-mt-[100px]">
      <div className="max-w-content mx-auto">
        {/* Header */}
        <RevealOnScroll className="text-center mb-14">
          <SectionLabel>What Changes</SectionLabel>
          <h2 className="font-display text-4xl md:text-5xl text-[#F1F5F9] mb-4 tracking-tight">
            Results you can actually measure
          </h2>
          <p className="text-[#94A3B8] max-w-[440px] mx-auto leading-[1.75]">
            Measurable impact from the first month.
          </p>
        </RevealOnScroll>

        {/* Result cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {results.map((result, i) => (
            <RevealOnScroll key={result.metric} delay={i * 0.1}>
              <div className="relative group h-full rounded-2xl border border-[#1E293B] bg-[#111827] p-8 md:p-10 hover:bg-[#1A2335] hover:-translate-y-1 hover:border-[rgba(56,189,248,0.15)] transition-all duration-300 overflow-hidden">
                {/* Gradient top border — appears on hover */}
                <div
                  className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background:
                      'linear-gradient(90deg, #38BDF8 0%, #818CF8 100%)',
                  }}
                  aria-hidden="true"
                />
                <div className="font-display text-5xl md:text-6xl text-[#38BDF8] mb-3 tracking-tight">
                  {result.metric}
                </div>
                <div className="font-body font-semibold text-[#F1F5F9] mb-2 text-lg leading-snug">
                  {result.label}
                </div>
                <p className="text-sm text-[#94A3B8] leading-relaxed">
                  {result.description}
                </p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
