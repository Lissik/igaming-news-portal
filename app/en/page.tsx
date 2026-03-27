import type { Metadata } from "next";
import { SiteLayout } from "@/components/layout/site-layout";
import { HeroSection } from "@/components/home/hero-section";
import { LatestNewsSection } from "@/components/home/latest-news-section";
import { TrendingSection } from "@/components/home/trending-section";
import { CategoryBlocks } from "@/components/home/category-blocks";
import { EventsSection } from "@/components/home/events-section";
import { NewsletterWidget } from "@/components/newsletter-widget";

export const metadata: Metadata = {
  title: "iGaming Pulse — Independent iGaming Industry News",
  description:
    "The latest iGaming industry news for operators, affiliates, game providers, regulators, and payment companies. Independent editorial since January 2026.",
};

export default function HomePage() {
  return (
    <SiteLayout>
        {/* Hero */}
        <HeroSection />

        {/* Ticker / breaking news strip */}
        <div className="bg-navy text-white py-2 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 flex items-center gap-4">
            <span className="shrink-0 bg-amber text-navy text-xs font-sans font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm">
              Latest
            </span>
            <p className="text-sm text-white/80 font-sans truncate">
              iGaming B2B M&amp;A Activity Surges in Q1 2026 &nbsp;&middot;&nbsp; Flutter Reports $6.2B 2025 Revenue &nbsp;&middot;&nbsp; Google Expands Gambling Ads to Brazil, Colombia &amp; Argentina &nbsp;&middot;&nbsp; EU Proposes Unified Licensing Framework
            </p>
          </div>
        </div>

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
    </SiteLayout>
  );
}
