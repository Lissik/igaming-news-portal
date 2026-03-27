import { getLatestArticles } from "@/lib/data";
import { ArticleCard } from "@/components/articles/article-card";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function LatestNewsSection() {
  const articles = getLatestArticles(9);

  return (
    <section aria-labelledby="latest-news-heading" className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6 pb-3 border-b-2 border-navy">
        <h2 id="latest-news-heading" className="font-serif text-2xl font-bold text-navy">
          Latest News
        </h2>
        <Link
          href="/en"
          className="text-sm font-sans font-medium text-amber hover:text-amber/80 flex items-center gap-1 transition-colors"
        >
          View all <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} variant="default" />
        ))}
      </div>
    </section>
  );
}
