import RevealOnScroll from './ui/RevealOnScroll';
import SectionLabel from './ui/SectionLabel';

const steps = [
  {
    number: '01',
    title: 'Free Operations Audit',
    description:
      'A 30-minute call where we map your workflows, identify the 3–5 biggest bottlenecks, and show you exactly how much time and money each one is costing you. You get a written report regardless.',
    tag: 'Free — No Strings',
    tagClass: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  },
  {
    number: '02',
    title: 'We Build the Fix',
    description:
      'We design and build custom automations tailored to your business — connecting your existing tools, adding AI where it matters, and eliminating the manual work that drains your team.',
    tag: 'One-Time Implementation',
    tagClass: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
  },
  {
    number: '03',
    title: 'Ongoing Optimization',
    description:
      'Automations need care. We monitor everything, fix issues before you notice them, and continuously improve your systems as your business grows. You always have a direct line to us.',
    tag: 'Monthly Support',
    tagClass: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
  },
];

export default function HowItWorks() {
  return (
    <section id="how" className="py-28 px-6">
      <div className="max-w-content mx-auto">
        {/* Header */}
        <RevealOnScroll className="text-center mb-16">
          <SectionLabel>How It Works</SectionLabel>
          <h2 className="font-display text-4xl md:text-5xl text-[#F1F5F9] mb-4 tracking-tight">
            Three steps. No fluff.
          </h2>
          <p className="text-[#94A3B8] max-w-[440px] mx-auto leading-relaxed">
            We keep it simple because your business is already complicated
            enough.
          </p>
        </RevealOnScroll>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {steps.map((step, i) => (
            <RevealOnScroll key={step.number} delay={i * 0.1}>
              <div className="relative group h-full rounded-2xl border border-[#1E293B] bg-[#111827] p-8 hover:bg-[#1A2335] hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col">
                {/* Gradient top border — appears on hover */}
                <div
                  className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background:
                      'linear-gradient(90deg, #38BDF8 0%, #818CF8 100%)',
                  }}
                  aria-hidden="true"
                />

                {/* Step number */}
                <div className="font-display text-6xl text-[#1E293B] group-hover:text-[#38BDF8]/15 transition-colors duration-300 mb-6 leading-none select-none">
                  {step.number}
                </div>

                {/* Content */}
                <h3 className="font-body font-semibold text-lg text-[#F1F5F9] mb-3 leading-snug">
                  {step.title}
                </h3>
                <p className="text-[#94A3B8] text-sm leading-relaxed flex-1 mb-7">
                  {step.description}
                </p>

                {/* Tag */}
                <span
                  className={`inline-block self-start text-xs font-medium px-3 py-1.5 rounded-full border ${step.tagClass}`}
                >
                  {step.tag}
                </span>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
