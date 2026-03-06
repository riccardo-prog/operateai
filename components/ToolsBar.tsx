import RevealOnScroll from './ui/RevealOnScroll';
import SectionLabel from './ui/SectionLabel';

const CDN = 'https://cdn.simpleicons.org';
const COLOR = 'F1F5F9';

// Logos available on SimpleIcons CDN
const logos: { name: string; slug: string | null }[] = [
  { name: 'Zapier',      slug: 'zapier'      },
  { name: 'Make',        slug: 'make'        },
  { name: 'n8n',         slug: 'n8n'         },
  { name: 'Google',      slug: 'google'      },
  { name: 'Slack',       slug: 'slack'       },
  { name: 'HubSpot',     slug: 'hubspot'     },
  { name: 'Airtable',    slug: 'airtable'    },
  { name: 'Notion',      slug: 'notion'      },
  { name: 'OpenAI',      slug: 'openai'      },
  { name: 'Claude AI',   slug: null          }, // no simple-icons entry — use text fallback
  { name: 'Calendly',    slug: 'calendly'    },
  { name: 'QuickBooks',  slug: 'quickbooks'  },
  { name: 'Mailchimp',   slug: 'mailchimp'   },
  { name: 'Shopify',     slug: 'shopify'     },
  { name: 'Stripe',      slug: 'stripe'      },
  { name: 'Twilio',      slug: 'twilio'      },
];

// Claude AI doesn't have a simple-icons entry — rendered as styled SVG text
function ClaudeTextLogo() {
  return (
    <svg
      viewBox="0 0 104 28"
      width="104"
      height="28"
      aria-hidden="true"
      overflow="visible"
    >
      <text
        x="2"
        y="22"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontWeight="400"
        fontSize="22"
        fill="currentColor"
      >
        Claude
      </text>
    </svg>
  );
}

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
          {[...logos, ...logos].map(({ name, slug }, i) => (
            <div
              key={`${name}-${i}`}
              className="logo-item flex-shrink-0 flex items-center justify-center px-8"
              title={name}
            >
              {slug ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={`${CDN}/${slug}/${COLOR}`}
                  alt={name}
                  height={28}
                  className="h-7 w-auto block"
                />
              ) : (
                <ClaudeTextLogo />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
