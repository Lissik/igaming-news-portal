import type { MetadataRoute } from "next";
import { getAllArticles, CATEGORIES } from "@/lib/data";

const BASE_URL = "https://igamingpulse.media";

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = getAllArticles();

  // ── Static pages ─────────────────────────────────────────────────────────────
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/en`,
      lastModified: new Date(),
      changeFrequency: "hourly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/en/news`,
      lastModified: new Date(),
      changeFrequency: "hourly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date("2026-01-01"),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date("2026-01-01"),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/newsletter`,
      lastModified: new Date("2026-01-01"),
      changeFrequency: "monthly",
      priority: 0.4,
    },
  ];

  // ── Category pages ────────────────────────────────────────────────────────────
  const categoryPages: MetadataRoute.Sitemap = Object.keys(CATEGORIES).map((slug) => {
    // Find the most recently published article in this category for lastmod
    const latest = articles.find((a) => a.category === slug);
    return {
      url: `${BASE_URL}/en/category/${slug}`,
      lastModified: latest ? new Date(latest.publishedAt) : new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    };
  });

  // ── Article pages ─────────────────────────────────────────────────────────────
  const articlePages: MetadataRoute.Sitemap = articles
    .filter((a) => a.language === "en") // only index English articles
    .map((article) => ({
      url: `${BASE_URL}/en/article/${article.slug}`,
      lastModified: new Date(article.publishedAt),
      changeFrequency: "weekly" as const,
      priority: article.featured || article.trending ? 0.9 : 0.7,
    }));

  return [...staticPages, ...categoryPages, ...articlePages];
}
