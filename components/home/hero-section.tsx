import { ArticleCard } from "@/components/articles/article-card";
import { getFeaturedArticles, getLatestArticles } from "@/lib/data";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  const featured = getFeaturedArticles();
  // Always pull from latest for the sidebar — sorted newest-first
  const latest = getLatestArticles(10);

  // Hero: most-recent featured article, or most-recent overall
  const hero = featured[0] ?? latest[0];

  // Secondaries: 3 most-recent articles that are not the hero
  const secondaries = latest.filter((a) => a.id !== hero?.id).slice(0, 3);

  if (!hero) return null;

  return (
    <section aria-label="Featured stories" className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main hero */}
        <div className="lg:col-span-2">
          <ArticleCard article={hero} variant="featured" />
        </div>

        {/* Secondary features */}
        <div className="flex flex-col gap-4">
          {secondaries.map((article) => (
            <article
              key={article.id}
              className="group flex gap-4 bg-white border border-border rounded-sm p-4 hover:shadow-sm transition-shadow"
            >
              <div className="flex-1 min-w-0">
                <Link
                  href={`/en/category/${article.category}`}
                  className="text-xs font-sans font-semibold uppercase tracking-wider text-amber hover:text-amber/80 transition-colors"
                >
                  {article.category.replace(/-/g, " ")}
                </Link>
                <h3 className="font-serif font-bold text-sm leading-snug mt-1 line-clamp-3 group-hover:text-navy transition-colors">
                  <Link href={`/en/article/${article.slug}`}>{article.title}</Link>
                </h3>
                <p className="text-xs text-muted-foreground font-sans mt-2">
                  {article.author.name} &middot;{" "}
                  {new Date(article.publishedAt).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                  })}
                </p>
              </div>
            </article>
          ))}

          <Link
            href="#latest-news"
            className="text-sm font-sans font-semibold text-navy hover:text-amber transition-colors flex items-center gap-1 mt-auto"
          >
            All Latest News <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
