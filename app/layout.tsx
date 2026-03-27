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
    default: "iGaming Wire — Independent iGaming Industry News",
    template: "%s | iGaming Wire",
  },
  description:
    "iGaming Wire is an independent B2B media platform covering the global iGaming industry. News, analysis, and insights for operators, affiliates, game providers, and regulators.",
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
  authors: [{ name: "iGaming Wire Editorial Team" }],
  creator: "iGaming Wire",
  publisher: "iGaming Wire",
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: "iGaming Wire",
    title: "iGaming Wire — Independent iGaming Industry News",
    description:
      "Independent B2B media covering the global iGaming industry — operators, affiliates, game providers, regulation, and fintech.",
  },
  twitter: {
    card: "summary_large_image",
    title: "iGaming Wire",
    description: "Independent iGaming industry news and analysis.",
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
