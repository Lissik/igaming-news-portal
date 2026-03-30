import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://igamingpulse.media"),
  title: {
    default: "iGaming Pulse — Independent iGaming Industry News",
    template: "%s | iGaming Pulse",
  },
  description:
    "iGaming Pulse is an independent B2B media platform covering the global iGaming industry. News, analysis, and insights for operators, affiliates, game providers, and regulators.",
  keywords: [
    "iGaming news",
    "online gambling industry",
    "casino operators",
    "affiliate marketing",
    "game providers",
    "gambling regulation",
    "sports betting",
    "B2B iGaming",
  ],
  authors: [{ name: "iGaming Pulse Editorial Team" }],
  creator: "iGaming Pulse",
  publisher: "iGaming Pulse",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    siteName: "iGaming Pulse",
    title: "iGaming Pulse — Independent iGaming Industry News",
    description:
      "iGaming Pulse is an independent B2B media platform covering the global iGaming industry.",
    images: [
      {
        url: "/images/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "iGaming Pulse — Independent iGaming Industry News",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "iGaming Pulse — Independent iGaming Industry News",
    description:
      "Independent iGaming industry news for operators, affiliates, game providers, and regulators.",
    images: ["/images/og-default.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased bg-background text-foreground" suppressHydrationWarning>
        {children}
        <Analytics />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-V51KQ9HCBM"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-V51KQ9HCBM');
        `}</Script>
      </body>
    </html>
  );
}
