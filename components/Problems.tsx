import RevealOnScroll from './ui/RevealOnScroll';
import SectionLabel from './ui/SectionLabel';

const problems = [
  {
    icon: '⏱',
    title: 'Hours lost to manual data entry',
    description:
      'Copying information between spreadsheets, inboxes, and tools that should be talking to each other.',
  },
  {
    icon: '📞',
    title: 'Leads falling through the cracks',
    description:
      'Potential customers reaching out and not hearing back fast enough — or at all.',
  },
  {
    icon: '📅',
    title: 'No-shows and missed appointments',
    description:
      "Clients booking and not showing up because there's no automated reminder system in place.",
  },
  {
    icon: '🔁',
    title: 'Repetitive tasks eating your day',
    description:
      'Sending the same emails, generating the same reports, updating the same records — over and over.',
  },
  {
    icon: '📊',
    title: "No visibility into what's working",
    description:
      "Making decisions based on gut feeling because there's no dashboard or tracking in place.",
  },
  {
    icon: '💸',
    title: 'Revenue leaking from slow processes',
    description:
      "Invoices going out late, follow-ups not happening, and customers leaving because things take too long.",
  },
];

export default function Problems() {
  return (
    <section id="problems" className="py-28 px-6">
      <div className="max-w-content mx-auto">
        <RevealOnScroll>
          {/* Outer card wrapper */}
          <div className="rounded-3xl border border-[#1E293B] bg-[#111827] p-8 md:p-14 lg:p-16">
            {/* Header */}
            <div className="text-center mb-12">
              <SectionLabel>What We Fix</SectionLabel>
              <h2 className="font-display text-4xl md:text-5xl text-[#F1F5F9] mb-4 tracking-tight">
                Sound familiar?
              </h2>
              <p className="text-[#94A3B8] max-w-[440px] mx-auto leading-relaxed">
                These are the problems we see in almost every small business we
                audit.
              </p>
            </div>

            {/* Problem grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {problems.map((problem, i) => (
                <RevealOnScroll key={problem.title} delay={i * 0.07}>
                  <div className="flex gap-4 p-6 rounded-2xl border border-[#1E293B] bg-[#0B0F1A] hover:bg-[#1A2335] hover:border-[#38BDF8]/25 transition-all duration-300 group">
                    <div className="text-2xl flex-shrink-0 mt-0.5 leading-none">
                      {problem.icon}
                    </div>
                    <div>
                      <h3 className="font-body font-semibold text-[#F1F5F9] mb-1.5 leading-snug">
                        {problem.title}
                      </h3>
                      <p className="text-sm text-[#94A3B8] leading-relaxed">
                        {problem.description}
                      </p>
                    </div>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
