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
  title: 'BLR // EATS — The Definitive Bangalore Food, Coffee & Brewery Map',
  description:
    'An interactive spatial guide to Bengaluru’s most iconic heritage eateries, craft microbreweries, specialty coffee bars, and cult dining gems.',
  keywords: [
    'BLR EATS',
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
  openGraph: {
    title: 'BLR // EATS — The Definitive Bangalore Food, Coffee & Brewery Map',
    description:
      'Curated spatial guide to Bengaluru’s legendary breakfast institutions, artisanal roasters, craft breweries, and cult dining spots.',
    type: 'website',
    locale: 'en_IN',
    siteName: 'BLR // EATS',
    url: 'https://blr-food-map-2026.web.app',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BLR // EATS — The Definitive Bangalore Food, Coffee & Brewery Map',
    description:
      'Curated spatial guide to Bengaluru’s legendary breakfast institutions, artisanal roasters, craft breweries, and cult dining spots.',
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
        <AnalyticsProvider gaMeasurementId={GA_MEASUREMENT_ID} />
        {children}
      </body>
    </html>
  );
}
