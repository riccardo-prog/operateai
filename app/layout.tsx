import type { Metadata } from 'next';
import { dmSerifDisplay, outfit, jetbrainsMono } from '@/lib/fonts';
import ChatWidgetLoader from '@/components/ChatWidgetLoader';
import './globals.css';

export const metadata: Metadata = {
  icons: {
    icon: '/logo-symbol.png',
    apple: '/logo-symbol.png',
  },
  title: 'OperateAI | AI-Powered Lead Management for Service Businesses',
  description:
    'OperateAI builds Lead Engine, the AI that responds to your leads in seconds, qualifies them, and books appointments. While you sleep.',
  metadataBase: new URL('https://operateai.ca'),
  openGraph: {
    title: 'OperateAI | AI-Powered Lead Management for Service Businesses',
    description:
      'OperateAI builds Lead Engine, the AI that responds to your leads in seconds, qualifies them, and books appointments. While you sleep.',
    url: 'https://operateai.ca',
    siteName: 'OperateAI',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'OperateAI | AI-Powered Lead Management',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OperateAI | AI-Powered Lead Management for Service Businesses',
    description:
      'OperateAI responds to your leads in seconds, qualifies them, and books appointments. While you sleep.',
    images: ['/og-image.png'],
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
                'OperateAI builds Lead Engine, the AI that responds to your leads in seconds, qualifies them, and books appointments.',
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
