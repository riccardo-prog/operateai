import type { Metadata } from 'next';
import { dmSerifDisplay, outfit } from '@/lib/fonts';
import './globals.css';

export const metadata: Metadata = {
  title: 'OperateAI — AI Automation Consulting for Small Business | Toronto',
  description:
    'We audit your operations, find bottlenecks, and build custom AI automations to save you 10+ hours per week. Free audit for Toronto-area businesses.',
  metadataBase: new URL('https://operateai.ca'),
  openGraph: {
    title: 'OperateAI — AI Automation Consulting for Small Business | Toronto',
    description:
      'We audit your operations, find bottlenecks, and build custom AI automations to save you 10+ hours per week. Free audit for Toronto-area businesses.',
    url: 'https://operateai.ca',
    siteName: 'OperateAI',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'OperateAI — AI Automation Consulting for Small Business',
      },
    ],
    locale: 'en_CA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OperateAI — AI Automation Consulting for Small Business | Toronto',
    description:
      'We audit your operations, find bottlenecks, and build custom AI automations to save you 10+ hours per week.',
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
      className={`${dmSerifDisplay.variable} ${outfit.variable}`}
    >
      <body className="font-body">{children}</body>
    </html>
  );
}
