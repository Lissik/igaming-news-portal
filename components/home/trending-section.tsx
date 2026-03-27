import { getTrendingArticles, getLatestArticles } from "@/lib/data";
import { ArticleCard } from "@/components/articles/article-card";
import { NewsletterWidget } from "@/components/newsletter-widget";
import { TrendingUp, Clock } from "lucide-react";
import Link from "next/link";

export function TrendingSection() {
  const trending = getTrendingArticles().slice(0, 5);
  const latest = getLatestArticles(5);

  return (
    <section aria-label="Trending and latest" className="bg-surface border-y border-border py-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Trending */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-5 pb-3 border-b-2 border-amber">
              <TrendingUp className="w-4 h-4 text-amber" />
              <h2 className="font-serif text-xl font-bold text-navy">Trending</h2>
            </div>
            <div className="flex flex-col">
              {trending.map((article, i) => (
                <div key={article.id} className="flex items-start gap-3 py-3 border-b border-border last:border-0">
                  <span className="font-serif text-3xl font-bold text-border leading-none mt-1 w-6 shrink-0">
                    {i + 1}
                  </span>
                  <div className="min-w-0">
                    <Link
                      href={`/en/category/${article.category}`}
                      className="text-xs font-sans font-semibold uppercase tracking-wider text-amber hover:text-amber/80 transition-colors"
                    >
                      {article.category.replace(/-/g, " ")}
                    </Link>
                    <h3 className="font-serif text-sm font-semibold leading-snug mt-1 line-clamp-2 hover:text-navy transition-colors">
                      <Link href={`/en/article/${article.slug}`}>{article.title}</Link>
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Latest */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-5 pb-3 border-b-2 border-navy">
              <Clock className="w-4 h-4 text-navy" />
              <h2 className="font-serif text-xl font-bold text-navy">Just Published</h2>
            </div>
            <div className="flex flex-col">
              {latest.map((article) => (
                <ArticleCard key={article.id} article={article} variant="compact" />
              ))}
            </div>
          </div>

          {/* Newsletter sidebar */}
          <div className="lg:col-span-1 flex flex-col gap-6">
            <NewsletterWidget variant="sidebar" />

            {/* Ad placeholder */}
            <div className="border border-dashed border-border rounded-sm p-6 text-center bg-white">
              <p className="text-xs text-muted-foreground font-sans uppercase tracking-wider mb-1">Advertisement</p>
              <div className="h-40 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground font-sans">300 × 250 Banner</p>
                  <Link href="/contact" className="text-xs text-amber hover:underline mt-1 block">
                    Advertise here
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
