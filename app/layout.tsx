import type { Metadata } from 'next';
import { dmSerifDisplay, outfit, jetbrainsMono } from '@/lib/fonts';
import ChatWidgetLoader from '@/components/ChatWidgetLoader';
import './globals.css';

export const metadata: Metadata = {
  icons: {
    icon: '/logo-symbol.png',
    apple: '/logo-symbol.png',
  },
  title: 'Lead Engine | Stop losing real estate leads after they inquire',
  description:
    'Lead Engine responds to new leads in seconds, follows up automatically, and helps realtors stop losing opportunities to slow replies, missed messages, and inconsistent follow-up.',
  metadataBase: new URL('https://operateai.ca'),
  openGraph: {
    title: 'Lead Engine | Stop losing real estate leads after they inquire',
    description:
      'Lead Engine responds to new leads in seconds, follows up automatically, and helps realtors stop losing opportunities to slow replies, missed messages, and inconsistent follow-up.',
    url: 'https://operateai.ca',
    siteName: 'OperateAI',
    images: [
      {
        url: '/og-image.png?v=2',
        width: 1200,
        height: 630,
        alt: 'Lead Engine by OperateAI: lead response for realtors',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lead Engine | Stop losing real estate leads after they inquire',
    description:
      'Lead Engine responds to new leads in seconds, follows up automatically, and helps realtors stop losing opportunities to slow replies, missed messages, and inconsistent follow-up.',
    images: ['/og-image.png?v=2'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: 'https://operateai.ca',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${dmSerifDisplay.variable} ${outfit.variable} ${jetbrainsMono.variable}`}
    >
      <body className="font-body">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'OperateAI',
              url: 'https://operateai.ca',
              logo: 'https://operateai.ca/logo-symbol.png',
              description:
                'OperateAI builds Lead Engine, the AI lead response and follow-up system for realtors.',
              areaServed: 'CA',
              sameAs: [],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'OperateAI',
              url: 'https://operateai.ca',
            }),
          }}
        />
        {children}
        <ChatWidgetLoader />
      </body>
    </html>
  );
}
