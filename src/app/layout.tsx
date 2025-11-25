import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { CurrencyProvider } from "@/contexts/CurrencyContext";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ChartGoldPrice - Real-Time Gold & Silver Price Charts | Live Precious Metal Prices",
  description: "Track live gold and silver prices in multiple currencies with interactive charts, historical data, market analysis, and real-time news. Free gold value calculator with karat options.",
  keywords: ["gold price", "silver price", "precious metals", "gold chart", "silver chart", "gold value calculator", "gold news", "XAU USD", "XAG USD", "live gold price"],
  authors: [{ name: "ChartGoldPrice" }],
  creator: "ChartGoldPrice",
  publisher: "ChartGoldPrice",
  metadataBase: new URL('https://chartgoldprice.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "ChartGoldPrice - Real-Time Gold & Silver Price Charts",
    description: "Track live gold and silver prices with interactive charts, market analysis, and real-time news in multiple currencies.",
    url: 'https://chartgoldprice.com',
    siteName: 'ChartGoldPrice',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'ChartGoldPrice - Live Gold & Silver Prices',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "ChartGoldPrice - Real-Time Gold & Silver Prices",
    description: "Track live gold and silver prices with interactive charts and market analysis.",
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}
      >
        <CurrencyProvider>
          <JsonLd />
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </CurrencyProvider>
        <Analytics />
      </body>
    </html>
  );
}
