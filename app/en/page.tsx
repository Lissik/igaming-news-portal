import type { Metadata } from "next";
import { Suspense } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/home/hero-section";
import { LatestNewsSection } from "@/components/home/latest-news-section";
import { TrendingSection } from "@/components/home/trending-section";
import { CategoryBlocks } from "@/components/home/category-blocks";
import { EventsSection } from "@/components/home/events-section";
import { NewsletterWidget } from "@/components/newsletter-widget";
import { NewsTicker } from "@/components/home/news-ticker";
import { getLatestArticles } from "@/lib/data";

export const metadata: Metadata = {
  title: "iGaming Pulse — Independent iGaming Industry News",
  description:
    "The latest iGaming industry news for operators, affiliates, game providers, regulators, and payment companies. Independent editorial since January 2026.",
};

export default function HomePage() {
  const tickerItems = getLatestArticles(12).map((a) => ({
    title: a.title,
    slug: a.slug,
  }));

  return (
    <>
      <Suspense fallback={null}><Header /></Suspense>
      <main>
        {/* Hero */}
        <HeroSection />

        {/* Scrolling news ticker */}
        <NewsTicker items={tickerItems} />

        {/* Latest news grid */}
        <LatestNewsSection />

        {/* Trending + sidebar */}
        <TrendingSection />

        {/* Ad banner slot */}
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="border border-dashed border-border rounded-sm p-4 flex items-center justify-center bg-surface h-24">
            <div className="text-center">
              <p className="text-xs text-muted-foreground font-sans uppercase tracking-wider">Advertisement — 970 × 90 Leaderboard</p>
              <a href="/contact" className="text-xs text-amber hover:underline mt-1 block">Advertise with iGaming Pulse</a>
            </div>
          </div>
        </div>

        {/* Category blocks */}
        <CategoryBlocks />

        {/* Events section */}
        <EventsSection />

        {/* Newsletter banner */}
        <NewsletterWidget variant="banner" />
      </main>
      <Footer />
    </>
  );
}
