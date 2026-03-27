import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
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
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: "iGaming Pulse",
    title: "iGaming Pulse — Independent iGaming Industry News",
    description:
      "Independent B2B media covering the global iGaming industry — operators, affiliates, game providers, regulation, and fintech.",
    images: [
      {
        url: "/logo.png",
        width: 1080,
        height: 1080,
        alt: "iGaming Pulse Media",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "iGaming Pulse",
    description: "Independent iGaming industry news and analysis.",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased bg-background text-foreground">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
