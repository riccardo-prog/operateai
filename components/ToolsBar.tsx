import RevealOnScroll from './ui/RevealOnScroll';
import SectionLabel from './ui/SectionLabel';

const tools = [
  { name: 'Zapier',      src: 'https://cdn.simpleicons.org/zapier'      },
  { name: 'Make',        src: 'https://cdn.simpleicons.org/make'        },
  { name: 'n8n',         src: 'https://cdn.simpleicons.org/n8n'         },
  { name: 'Google',      src: 'https://cdn.simpleicons.org/google'      },
  { name: 'Slack',       src: 'https://cdn.simpleicons.org/slack'       },
  { name: 'HubSpot',     src: 'https://cdn.simpleicons.org/hubspot'     },
  { name: 'Airtable',    src: 'https://cdn.simpleicons.org/airtable'    },
  { name: 'Notion',      src: 'https://cdn.simpleicons.org/notion'      },
  { name: 'Gmail',       src: 'https://cdn.simpleicons.org/gmail'           },
  { name: 'Calendly',    src: 'https://cdn.simpleicons.org/calendly'    },
  { name: 'Shopify',     src: 'https://cdn.simpleicons.org/shopify'     },
  { name: 'Stripe',      src: 'https://cdn.simpleicons.org/stripe'      },
  { name: 'QuickBooks',  src: 'https://cdn.simpleicons.org/quickbooks'  },
  { name: 'Mailchimp',   src: 'https://cdn.simpleicons.org/mailchimp'   },
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
          {[...tools, ...tools].map(({ name, src }, i) => (
            <div
              key={`${name}-${i}`}
              className="logo-item flex-shrink-0 flex flex-col items-center gap-2 px-10"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={name}
                height={40}
                className="h-10 w-auto block"
              />
              <span className="text-sm text-[#64748B] font-body tracking-wide whitespace-nowrap">
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
