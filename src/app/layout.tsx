import type { Metadata } from 'next';
import Script from 'next/script';
import { Geist, Geist_Mono } from 'next/font/google';
import AnalyticsProvider from '@/components/AnalyticsProvider';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://blreats.com'),
  title: 'BLR // EATS — The Definitive Bangalore Food, Coffee & Brewery Map',
  description:
    'An interactive spatial guide to Bengaluru’s most iconic heritage eateries, craft microbreweries, specialty coffee bars, and cult dining gems.',
  keywords: [
    'BLR EATS',
    'blreats.com',
    'BLR food map',
    'Bangalore food map',
    'Bangalore restaurants',
    'Indiranagar cafes',
    'Koramangala eateries',
    'Bengaluru microbreweries',
    'Vidyarthi Bhavan',
    'CTR dosa',
    'Toit',
    'Araku coffee',
    'Subko Bangalore',
    'Lavonne Cafe',
  ],
  authors: [{ name: 'Mohit Garg' }],
  applicationName: 'BLR // EATS',
  appleWebApp: {
    title: 'BLR // EATS',
    statusBarStyle: 'default',
    capable: true,
  },
  alternates: {
    canonical: 'https://blreats.com',
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'icon', url: '/icon.png', type: 'image/png' },
    ],
  },
  openGraph: {
    title: 'BLR // EATS — The Definitive Bangalore Food, Coffee & Brewery Map',
    description:
      'Curated spatial guide to Bengaluru’s legendary breakfast institutions, artisanal roasters, craft breweries, and cult dining spots.',
    type: 'website',
    locale: 'en_IN',
    siteName: 'BLR // EATS',
    url: 'https://blreats.com',
    images: [
      {
        url: 'https://blreats.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'BLR EATS — The Definitive Bengaluru Food & Brewery Compass',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BLR // EATS — The Definitive Bangalore Food, Coffee & Brewery Map',
    description:
      'Curated spatial guide to Bengaluru’s legendary breakfast institutions, artisanal roasters, craft breweries, and cult dining spots.',
    images: ['https://blreats.com/og-image.png'],
  },
};

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        {GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}
      </head>
      <body className="h-full w-full overflow-hidden bg-zinc-100 text-zinc-900">
        <AnalyticsProvider />
        {children}
      </body>
    </html>
  );
}
