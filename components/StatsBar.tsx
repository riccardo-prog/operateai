import RevealOnScroll from './ui/RevealOnScroll';

const stats = [
  {
    number: '10+',
    label: 'Hours saved per week, per client',
  },
  {
    number: '$0',
    label: 'Cost of the initial operations audit',
  },
  {
    number: '48hr',
    label: 'From audit to first automation live',
  },
];

export default function StatsBar() {
  return (
    <section className="border-y border-[#1E293B]">
      <div className="max-w-content mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3">
          {stats.map((stat, i) => (
            <RevealOnScroll key={stat.number} delay={i * 0.12}>
              <div
                className={`py-10 text-center ${
                  i < stats.length - 1
                    ? 'border-b md:border-b-0 md:border-r border-[#1E293B]'
                    : ''
                }`}
              >
                <div className="font-display text-5xl md:text-6xl text-[#38BDF8] mb-2 tracking-tight">
                  {stat.number}
                </div>
                <div className="text-sm text-[#94A3B8] max-w-[180px] mx-auto leading-snug">
                  {stat.label}
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
