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
          </div>
        </div>
      </div>
    </section>
  );
}
