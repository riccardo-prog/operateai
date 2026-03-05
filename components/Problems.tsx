import { Clock, PhoneOff, CalendarX, Repeat, BarChart3, DollarSign } from 'lucide-react';
import RevealOnScroll from './ui/RevealOnScroll';
import SectionLabel from './ui/SectionLabel';

const problems = [
  {
    Icon: Clock,
    title: 'Manual data entry eating hours',
    description:
      'Your team is copying data between tools that should be talking to each other. Every hour spent on this is an hour not spent on revenue.',
  },
  {
    Icon: PhoneOff,
    title: 'Leads going cold',
    description:
      'Someone fills out your form or sends an inquiry. Three days later, they still haven\'t heard back. By then they\'ve already hired your competitor.',
  },
  {
    Icon: CalendarX,
    title: 'No-shows draining revenue',
    description:
      'Appointments get booked, nobody shows up. No automated reminders, no easy reschedule option, no recovery. Just lost revenue.',
  },
  {
    Icon: Repeat,
    title: 'The same tasks, every single day',
    description:
      'Sending confirmation emails by hand. Updating spreadsheets manually. Generating the same report every Monday. Your day is 60% busywork.',
  },
  {
    Icon: BarChart3,
    title: 'Flying blind on performance',
    description:
      'You don\'t know which services are most profitable, where clients drop off, or what\'s actually working — because nothing is tracked.',
  },
  {
    Icon: DollarSign,
    title: 'Slow processes losing customers',
    description:
      'Late invoices, delayed quotes, slow follow-ups. Every friction point is a chance for customers to walk away — and they do.',
  },
];

export default function Problems() {
  return (
    <section id="problems" className="py-28 px-6 scroll-mt-[100px]">
      <div className="max-w-content mx-auto">
        <RevealOnScroll>
          {/* Outer card wrapper */}
          <div className="rounded-3xl border border-[#1E293B] bg-[#111827] p-8 md:p-14 lg:p-16">
            {/* Header */}
            <div className="text-center mb-12">
              <SectionLabel>What We Fix</SectionLabel>
              <h2 className="font-display text-4xl md:text-5xl text-[#F1F5F9] mb-4 tracking-tight">
                The problems we eliminate
              </h2>
              <p className="text-[#94A3B8] max-w-[440px] mx-auto leading-[1.75]">
                Every business we audit has at least three of these. Most have all six.
              </p>
            </div>

            {/* Problem grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {problems.map((problem, i) => (
                <RevealOnScroll key={problem.title} delay={i * 0.07}>
                  <div className="flex gap-4 p-6 rounded-2xl border border-[#1E293B] bg-[#0B0F1A] hover:bg-[#1A2335] hover:border-[rgba(56,189,248,0.15)] transition-all duration-300 group">
                    <div className="flex-shrink-0 mt-0.5">
                      <problem.Icon
                        size={22}
                        strokeWidth={1.5}
                        className="text-[#38BDF8]"
                      />
                    </div>
                    <div>
                      <h3 className="font-body font-semibold text-[#F1F5F9] mb-1.5 leading-snug">
                        {problem.title}
                      </h3>
                      <p className="text-sm text-[#94A3B8] leading-[1.75]">
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
