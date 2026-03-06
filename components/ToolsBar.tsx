import RevealOnScroll from './ui/RevealOnScroll';
import SectionLabel from './ui/SectionLabel';

// --- Logo SVG Components ---

function ZapierLogo() {
  return (
    <svg viewBox="0 0 40 40" width="40" height="40" fill="none" aria-hidden="true">
      {/* Z lightning bolt */}
      <path d="M9 11h22L9 29h22" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MakeLogo() {
  return (
    <svg viewBox="0 0 80 40" width="80" height="40" fill="none" aria-hidden="true">
      {/* Three circles in a diagonal chain */}
      <circle cx="10" cy="30" r="8" fill="currentColor" />
      <circle cx="40" cy="10" r="8" fill="currentColor" />
      <circle cx="70" cy="30" r="8" fill="currentColor" />
      <line x1="17" y1="24" x2="33" y2="16" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
      <line x1="47" y1="16" x2="63" y2="24" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
    </svg>
  );
}

function N8nLogo() {
  return (
    <svg viewBox="0 0 66 36" width="66" height="36" aria-hidden="true" overflow="visible">
      <text x="2" y="28" fontFamily="'Courier New', Courier, monospace" fontWeight="900" fontSize="28" fill="currentColor">n8n</text>
    </svg>
  );
}

function GoogleLogo() {
  return (
    <svg viewBox="0 0 116 36" width="116" height="36" aria-hidden="true" overflow="visible">
      <text x="2" y="27" fontFamily="system-ui, -apple-system, BlinkMacSystemFont, sans-serif" fontWeight="500" fontSize="24" fill="currentColor">Google</text>
    </svg>
  );
}

function SlackLogo() {
  return (
    <svg viewBox="0 0 40 40" width="40" height="40" aria-hidden="true">
      {/* Hashtag with rounded ends */}
      <rect x="4" y="14" width="32" height="5.5" rx="2.75" fill="currentColor" />
      <rect x="4" y="20.5" width="32" height="5.5" rx="2.75" fill="currentColor" />
      <rect x="13" y="4" width="5.5" height="32" rx="2.75" fill="currentColor" />
      <rect x="21.5" y="4" width="5.5" height="32" rx="2.75" fill="currentColor" />
    </svg>
  );
}

function HubSpotLogo() {
  return (
    <svg viewBox="0 0 40 40" width="40" height="40" fill="none" aria-hidden="true">
      {/* Center ring */}
      <circle cx="20" cy="20" r="6" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="20" cy="20" r="2.5" fill="currentColor" />
      {/* Top arm + dot */}
      <line x1="20" y1="14" x2="20" y2="8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="20" cy="5" r="3" fill="currentColor" />
      {/* Bottom arm + dot */}
      <line x1="20" y1="26" x2="20" y2="32" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="20" cy="35" r="3" fill="currentColor" />
      {/* Left arm + dot */}
      <line x1="14" y1="20" x2="8" y2="20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="5" cy="20" r="3" fill="currentColor" />
      {/* Right arm + dot */}
      <line x1="26" y1="20" x2="32" y2="20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="35" cy="20" r="3" fill="currentColor" />
    </svg>
  );
}

function AirtableLogo() {
  return (
    <svg viewBox="0 0 40 40" width="40" height="40" fill="none" aria-hidden="true">
      {/* Geometric A — triangle with crossbar */}
      <path d="M20 5L35 34H5L20 5Z" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
      <line x1="11" y1="26" x2="29" y2="26" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function NotionLogo() {
  return (
    <svg viewBox="0 0 40 40" width="40" height="40" fill="none" aria-hidden="true">
      {/* Bold N lettermark */}
      <path
        d="M8 7L8 33 M8 7L28 33 M28 7L28 33"
        stroke="currentColor"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function OpenAILogo() {
  return (
    <svg viewBox="0 0 40 40" width="40" height="40" fill="none" aria-hidden="true">
      {/* Three overlapping ellipses — hexagonal pinwheel approximation */}
      <ellipse cx="20" cy="20" rx="5" ry="13" stroke="currentColor" strokeWidth="2" />
      <ellipse cx="20" cy="20" rx="5" ry="13" stroke="currentColor" strokeWidth="2" transform="rotate(60 20 20)" />
      <ellipse cx="20" cy="20" rx="5" ry="13" stroke="currentColor" strokeWidth="2" transform="rotate(120 20 20)" />
    </svg>
  );
}

function ClaudeLogo() {
  return (
    <svg viewBox="0 0 104 36" width="104" height="36" aria-hidden="true" overflow="visible">
      <text x="2" y="27" fontFamily="Georgia, 'Times New Roman', serif" fontWeight="400" fontSize="24" fill="currentColor">Claude</text>
    </svg>
  );
}

function CalendlyLogo() {
  return (
    <svg viewBox="0 0 40 40" width="40" height="40" fill="none" aria-hidden="true">
      {/* Calendar body */}
      <rect x="5" y="9" width="30" height="27" rx="4" stroke="currentColor" strokeWidth="2.5" />
      {/* Header divider */}
      <line x1="5" y1="17" x2="35" y2="17" stroke="currentColor" strokeWidth="2.5" />
      {/* Ring pegs */}
      <line x1="13" y1="5" x2="13" y2="13" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="27" y1="5" x2="27" y2="13" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      {/* Date dots */}
      <circle cx="13" cy="24" r="2" fill="currentColor" />
      <circle cx="20" cy="24" r="2" fill="currentColor" />
      <circle cx="27" cy="24" r="2" fill="currentColor" />
      <circle cx="13" cy="31" r="2" fill="currentColor" />
      <circle cx="20" cy="31" r="2" fill="currentColor" />
    </svg>
  );
}

function QuickBooksLogo() {
  return (
    <svg viewBox="0 0 168 36" width="168" height="36" aria-hidden="true" overflow="visible">
      <text x="2" y="27" fontFamily="system-ui, -apple-system, BlinkMacSystemFont, sans-serif" fontWeight="600" fontSize="22" fill="currentColor">QuickBooks</text>
    </svg>
  );
}

function MailchimpLogo() {
  return (
    <svg viewBox="0 0 152 36" width="152" height="36" aria-hidden="true" overflow="visible">
      <text x="2" y="27" fontFamily="system-ui, -apple-system, BlinkMacSystemFont, sans-serif" fontWeight="500" fontSize="22" fill="currentColor">Mailchimp</text>
    </svg>
  );
}

function ShopifyLogo() {
  return (
    <svg viewBox="0 0 40 40" width="40" height="40" fill="none" aria-hidden="true">
      {/* Shopping bag body */}
      <path d="M10 17L8 35H32L30 17Z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
      {/* Handle arc */}
      <path d="M14 17C14 11 20 7 20 7C20 7 26 11 26 17" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      {/* S letterform */}
      <path d="M15 24C15 21.5 25 21.5 25 24C25 26.5 15 26.5 15 29C15 31.5 25 31.5 25 29" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function StripeLogo() {
  return (
    <svg viewBox="0 0 84 36" width="84" height="36" aria-hidden="true" overflow="visible">
      <text x="2" y="28" fontFamily="system-ui, -apple-system, BlinkMacSystemFont, sans-serif" fontWeight="700" fontSize="26" fill="currentColor">Stripe</text>
    </svg>
  );
}

function TwilioLogo() {
  return (
    <svg viewBox="0 0 94 36" width="94" height="36" aria-hidden="true" overflow="visible">
      <text x="2" y="27" fontFamily="system-ui, -apple-system, BlinkMacSystemFont, sans-serif" fontWeight="600" fontSize="24" fill="currentColor">Twilio</text>
    </svg>
  );
}

const logos = [
  { name: 'Zapier', Logo: ZapierLogo },
  { name: 'Make', Logo: MakeLogo },
  { name: 'n8n', Logo: N8nLogo },
  { name: 'Google Workspace', Logo: GoogleLogo },
  { name: 'Slack', Logo: SlackLogo },
  { name: 'HubSpot', Logo: HubSpotLogo },
  { name: 'Airtable', Logo: AirtableLogo },
  { name: 'Notion', Logo: NotionLogo },
  { name: 'OpenAI', Logo: OpenAILogo },
  { name: 'Claude AI', Logo: ClaudeLogo },
  { name: 'Calendly', Logo: CalendlyLogo },
  { name: 'QuickBooks', Logo: QuickBooksLogo },
  { name: 'Mailchimp', Logo: MailchimpLogo },
  { name: 'Shopify', Logo: ShopifyLogo },
  { name: 'Stripe', Logo: StripeLogo },
  { name: 'Twilio', Logo: TwilioLogo },
];

export default function ToolsBar() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-content mx-auto">
        <RevealOnScroll className="text-center mb-12">
          <SectionLabel>Trusted Tools</SectionLabel>
          <h2 className="font-display text-4xl md:text-5xl text-[#F1F5F9] mb-4 tracking-tight">
            We build with the platforms you already use
          </h2>
        </RevealOnScroll>
      </div>

      {/* Full-width scrolling marquee */}
      <div className="relative overflow-hidden py-4">
        {/* Left gradient fade */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 z-10 bg-gradient-to-r from-[#0B0F1A] to-transparent" />
        {/* Right gradient fade */}
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 z-10 bg-gradient-to-l from-[#0B0F1A] to-transparent" />

        {/* Marquee track — two copies for seamless loop */}
        <div className="marquee-track">
          {[...logos, ...logos].map(({ name, Logo }, i) => (
            <div
              key={`${name}-${i}`}
              className="flex-shrink-0 flex items-center justify-center text-[#F1F5F9] opacity-40 hover:opacity-70 transition-opacity duration-300 px-8"
              title={name}
            >
              <Logo />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
