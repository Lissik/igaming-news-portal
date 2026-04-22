import type { Metadata } from "next";
import { Suspense } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ArticleCard } from "@/components/articles/article-card";
import { NewsletterWidget } from "@/components/newsletter-widget";
import { getAllArticles, getLatestArticles, CATEGORIES } from "@/lib/data";
import Link from "next/link";

export const metadata: Metadata = {
  title: "All News",
  description:
    "Browse all iGaming industry news from iGaming Pulse — operators, affiliates, game providers, regulation, payments, and more. Sorted newest first.",
  alternates: { canonical: "https://igamingpulse.media/en/news" },
  openGraph: {
    title: "All iGaming News | iGaming Pulse",
    description:
      "Browse all iGaming industry news from iGaming Pulse — operators, affiliates, game providers, regulation, payments, and more.",
    url: "https://igamingpulse.media/en/news",
    type: "website",
  },
};

const PAGE_SIZE = 18;

export default function NewsArchivePage() {
  const allArticles = getAllArticles();
  const allCategories = Object.values(CATEGORIES);

  // Show first PAGE_SIZE articles (static; all loaded since data is in-memory)
  const articles = allArticles;

  return (
    <>
      <Suspense fallback={null}><Header /></Suspense>
      <main>
        {/* Page header */}
        <div className="bg-navy text-white py-10">
          <div className="max-w-7xl mx-auto px-4">
            <nav aria-label="Breadcrumb" className="mb-4">
              <ol className="flex items-center gap-2 text-xs text-white/50 font-sans">
                <li>
                  <Link href="/en" className="hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li className="text-white/80">All News</li>
              </ol>
            </nav>
            <h1 className="font-serif text-3xl md:text-4xl font-bold mb-3">All News</h1>
            <p className="text-white/65 max-w-2xl leading-relaxed">
              All published articles from iGaming Pulse, sorted by newest first.
            </p>
            <p className="text-amber text-sm font-sans font-semibold mt-3">
              {articles.length} {articles.length === 1 ? "article" : "articles"}
            </p>
          </div>
        </div>

        {/* Category navigation pills */}
        <div className="border-b border-border bg-white sticky top-16 z-40">
          <div className="max-w-7xl mx-auto px-4">
            <nav
              aria-label="Category navigation"
              className="flex items-center gap-1 overflow-x-auto py-3 scrollbar-hide"
            >
              <Link
                href="/en/news"
                className="shrink-0 text-xs font-sans font-semibold px-3 py-1.5 rounded-full border transition-colors whitespace-nowrap bg-navy text-white border-navy"
              >
                All
              </Link>
              {allCategories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/en/category/${cat.slug}`}
                  className="shrink-0 text-xs font-sans font-semibold px-3 py-1.5 rounded-full border transition-colors whitespace-nowrap bg-white text-foreground/60 border-border hover:border-navy hover:text-navy"
                >
                  {cat.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
            {/* Article grid */}
            <div className="lg:col-span-3">
              {articles.length === 0 ? (
                <div className="text-center py-20">
                  <p className="font-serif text-xl text-muted-foreground mb-2">No articles published yet.</p>
                  <p className="text-sm text-muted-foreground font-sans">Check back soon — we publish new content daily.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {articles.map((article) => (
                    <ArticleCard key={article.id} article={article} variant="default" />
                  ))}
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-1 flex flex-col gap-6">
              <NewsletterWidget variant="sidebar" />

              {/* Categories */}
              <div>
                <h3 className="font-serif font-bold text-navy mb-4 pb-2 border-b-2 border-navy text-lg">
                  Browse by Category
                </h3>
                <div className="flex flex-col gap-1">
                  {allCategories.map((cat) => (
                    <Link
                      key={cat.slug}
                      href={`/en/category/${cat.slug}`}
                      className="text-sm font-sans text-foreground/70 hover:text-navy hover:font-semibold transition-colors py-1.5 border-b border-border last:border-0"
                    >
                      {cat.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Ad banner */}
              <a
                href="https://virtuwise.io/"
                target="_blank"
                rel="noopener noreferrer"
                className="block overflow-hidden rounded-sm"
                aria-label="Virtuwise — B2B Lead Generation"
              >
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%D0%94%D0%BE%D0%B1%D0%B0%D0%B2%D0%B8%D1%82%D1%8C%20%D0%B7%D0%B0%D0%B3%D0%BE%D0%BB%D0%BE%D0%B2%D0%BE%D0%BA%20%281200%20x%20600%20%D0%BF%D0%B8%D0%BA%D1%81.%29-HmTPXQXfRBtlhauj5rALajIvGL51rg.png"
                  alt="Virtuwise — B2B Lead Generation: Not Leads. Real Clients."
                  className="w-full h-auto object-cover"
                />
              </a>
            </aside>
          </div>
        </div>

        <NewsletterWidget variant="banner" />
      </main>
      <Footer />
    </>
  );
}
