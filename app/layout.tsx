import type { Metadata } from 'next';
import { inter, jetbrainsMono } from '@/lib/fonts';
import './globals.css';

export const metadata: Metadata = {
  icons: {
    icon: '/logo-symbol.png',
    apple: '/logo-symbol.png',
  },
  title: 'OperateAI — Operational Software for Your Business',
  description:
    'We build custom systems that handle your repetitive work — lead response, booking, follow-up, reporting — and install them into your business. Free 30-minute operational audit.',
  metadataBase: new URL('https://operateai.ca'),
  openGraph: {
    title: 'OperateAI — Operational Software for Your Business',
    description:
      'We build custom systems that handle your repetitive work — lead response, booking, follow-up, reporting — and install them into your business. Free 30-minute operational audit.',
    url: 'https://operateai.ca',
    siteName: 'OperateAI',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'OperateAI — AI Automation for Small Business',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OperateAI — Operational Software for Your Business',
    description:
      'We build custom systems that handle your repetitive work — lead response, booking, follow-up, reporting — and install them into your business.',
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
      className={`${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="font-body">{children}</body>
    </html>
  );
}
