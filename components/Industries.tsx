import { Heart, Home, Wrench, UtensilsCrossed, Scale, ShoppingCart } from 'lucide-react';
import RevealOnScroll from './ui/RevealOnScroll';
import SectionLabel from './ui/SectionLabel';

const industries = [
  {
    Icon: Heart,
    name: 'Dental & Medical Clinics',
    description: 'Automated reminders, digital intake, review requests',
  },
  {
    Icon: Home,
    name: 'Real Estate',
    description: 'Lead nurture sequences, CRM sync, listing automation',
  },
  {
    Icon: Wrench,
    name: 'Trades & Contractors',
    description: 'Quote generation, scheduling, job status updates',
  },
  {
    Icon: UtensilsCrossed,
    name: 'Restaurants & Food',
    description: 'Inventory alerts, social content, supplier ordering',
  },
  {
    Icon: Scale,
    name: 'Law Firms',
    description: 'Client intake, document automation, billing sync',
  },
  {
    Icon: ShoppingCart,
    name: 'E-commerce & Retail',
    description: 'Order processing, AI support, returns handling',
  },
];

export default function Industries() {
  return (
    <section className="py-28 px-6">
      <div className="max-w-content mx-auto">
        {/* Header */}
        <RevealOnScroll className="text-center mb-14">
          <SectionLabel>Who We Help</SectionLabel>
          <h2 className="font-display text-4xl md:text-5xl text-[#F1F5F9] mb-4 tracking-tight">
            Industries we automate
          </h2>
          <p className="text-[#94A3B8] max-w-[440px] mx-auto leading-[1.75]">
            We build automations for businesses that are too busy doing the work to optimize how it gets done.
          </p>
        </RevealOnScroll>

        {/* Industry cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {industries.map((industry, i) => (
            <RevealOnScroll key={industry.name} delay={i * 0.08}>
              <div className="relative group rounded-2xl border border-[#1E293B] bg-[#111827] p-6 hover:bg-[#1A2335] hover:-translate-y-1 hover:border-[rgba(56,189,248,0.15)] transition-all duration-300 overflow-hidden">
                {/* Gradient top border — appears on hover */}
                <div
                  className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background:
                      'linear-gradient(90deg, #38BDF8 0%, #818CF8 100%)',
                  }}
                  aria-hidden="true"
                />
                <div className="mb-3">
                  <industry.Icon
                    size={22}
                    strokeWidth={1.5}
                    className="text-[#F59E0B]"
                  />
                </div>
                <h3 className="font-body font-semibold text-[#F1F5F9] text-sm mb-1.5 leading-snug">
                  {industry.name}
                </h3>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  {industry.description}
                </p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
