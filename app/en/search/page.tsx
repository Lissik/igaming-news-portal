"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { ARTICLES, CATEGORIES, formatDateShort } from "@/lib/data";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ArticleCard } from "@/components/articles/article-card";
import { Search } from "lucide-react";

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q")?.trim().toLowerCase() ?? "";

  const results = query
    ? ARTICLES.filter(
        (a) =>
          a.title.toLowerCase().includes(query) ||
          a.excerpt.toLowerCase().includes(query) ||
          a.content.toLowerCase().includes(query) ||
          a.tags.some((t) => t.label.toLowerCase().includes(query)) ||
          CATEGORIES[a.category].label.toLowerCase().includes(query)
      ).sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    : [];

  return (
    <>
      {/* Search header */}
      <div className="bg-navy text-white py-10">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-2 text-white/60 text-sm font-sans mb-3">
            <Search className="w-4 h-4" />
            <span>Search Results</span>
          </div>
          {query ? (
            <>
              <h1 className="font-serif text-2xl md:text-3xl font-bold mb-2">
                Results for &ldquo;{query}&rdquo;
              </h1>
              <p className="text-white/60 font-sans text-sm">
                {results.length} {results.length === 1 ? "article" : "articles"} found
              </p>
            </>
          ) : (
            <h1 className="font-serif text-2xl md:text-3xl font-bold">Search</h1>
          )}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10">
        {!query && (
          <p className="text-muted-foreground font-sans text-center py-16">
            Enter a search term using the search icon in the navigation bar.
          </p>
        )}

        {query && results.length === 0 && (
          <div className="text-center py-16">
            <p className="font-serif text-xl text-muted-foreground mb-2">
              No articles found for &ldquo;{query}&rdquo;
            </p>
            <p className="text-sm text-muted-foreground font-sans">
              Try different keywords or browse by category below.
            </p>
            <div className="flex flex-wrap gap-2 justify-center mt-6">
              {Object.values(CATEGORIES).map((cat) => (
                <a
                  key={cat.slug}
                  href={`/en/category/${cat.slug}`}
                  className="text-xs font-sans font-semibold px-3 py-1.5 rounded-full border border-border text-foreground/60 hover:border-navy hover:text-navy transition-colors"
                >
                  {cat.label}
                </a>
              ))}
            </div>
          </div>
        )}

        {results.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((article) => (
              <ArticleCard key={article.id} article={article} variant="default" />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default function SearchPage() {
  return (
    <>
      <Header />
      <main>
        <Suspense
          fallback={
            <div className="bg-navy text-white py-10">
              <div className="max-w-4xl mx-auto px-4">
                <h1 className="font-serif text-3xl font-bold">Searching...</h1>
              </div>
            </div>
          }
        >
          <SearchResults />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
