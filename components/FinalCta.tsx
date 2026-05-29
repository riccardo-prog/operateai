import Section from '@/components/ui/Section';
import SectionHeader from '@/components/ui/SectionHeader';
import AuditForm from '@/components/AuditForm';

export default function FinalCta() {
  return (
    <Section id="audit" tone="canvas">
      <SectionHeader
        eyebrow="Get Started"
        title="Every delayed response is another chance for the lead to move on."
      >
        You are already paying to bring in inquiries. The system that handles
        them after they come in decides whether that money turns into
        appointments or disappears.
      </SectionHeader>

      <div className="mt-12">
        <AuditForm />
      </div>
    </Section>
  );
}
