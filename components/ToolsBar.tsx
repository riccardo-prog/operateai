import RevealOnScroll from './ui/RevealOnScroll';
import SectionLabel from './ui/SectionLabel';

const tools = [
  'Zapier',
  'Make',
  'n8n',
  'Google Workspace',
  'Slack',
  'HubSpot',
  'Airtable',
  'Notion',
  'OpenAI',
  'Claude AI',
  'Calendly',
  'QuickBooks',
  'Mailchimp',
  'Shopify',
  'Stripe',
  'Twilio',
];

export default function ToolsBar() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-content mx-auto">
        <RevealOnScroll className="text-center mb-10">
          <SectionLabel>Trusted Tools</SectionLabel>
          <h2 className="font-display text-4xl md:text-5xl text-[#F1F5F9] mb-4 tracking-tight">
            We build with the platforms you already use
          </h2>
        </RevealOnScroll>

        <RevealOnScroll delay={0.1}>
          <div className="flex flex-wrap justify-center gap-3">
            {tools.map((tool) => (
              <span
                key={tool}
                className="px-5 py-2 rounded-full border border-[#1E293B] text-[#64748B] font-mono text-sm transition-colors duration-200 hover:text-[#94A3B8] hover:border-[#2D3F55] cursor-default select-none"
              >
                {tool}
              </span>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
