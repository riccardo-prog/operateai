import RevealOnScroll from './ui/RevealOnScroll';
import SectionLabel from './ui/SectionLabel';
import Button from './ui/Button';

export default function CTA() {
  return (
    <section id="book" className="py-32 px-6 relative overflow-hidden scroll-mt-[100px]">
      {/* Centered glow orb */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at center, rgba(56,189,248,0.07) 0%, transparent 65%)',
        }}
        aria-hidden="true"
      />
      {/* Subtle indigo counterpoint */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at center, rgba(129,140,248,0.05) 0%, transparent 65%)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-content mx-auto text-center relative z-10">
        <RevealOnScroll>
          <SectionLabel>Get Started</SectionLabel>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-[#F1F5F9] mb-6 tracking-tight leading-[1.1]">
            Find out what&apos;s costing you
          </h2>
          <p className="text-lg text-[#94A3B8] max-w-[520px] mx-auto mb-10 leading-[1.75]">
            Book a free 30-minute audit. We&apos;ll map your operations, identify the biggest drains on your time and revenue, and show you exactly what to automate first. No commitment.
          </p>
          <Button
            href="https://calendly.com/operateai/free-audit"
            size="lg"
            target="_blank"
            rel="noopener noreferrer"
          >
            Book Your Free Audit →
          </Button>
          <p className="mt-6 text-sm text-[#64748B]">
            Typically responds within 2 hours · Available Mon–Fri
          </p>
        </RevealOnScroll>
      </div>
    </section>
  );
}
