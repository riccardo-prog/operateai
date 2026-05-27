import Section from '@/components/ui/Section';
import SectionHeader from '@/components/ui/SectionHeader';
import AuditForm from '@/components/AuditForm';

export default function FinalCta() {
  return (
    <Section id="audit" tone="canvas">
      <SectionHeader
        eyebrow="Get Started"
        title="Stop letting good leads disappear after they inquire."
      >
        If you are already paying to generate attention, the follow-up system
        after the inquiry matters just as much as the ad itself.
      </SectionHeader>

      <div className="mt-12">
        <AuditForm />
      </div>
    </Section>
  );
}
