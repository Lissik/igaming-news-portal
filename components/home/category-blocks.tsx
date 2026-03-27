import { getArticlesByCategory, CATEGORIES, Category } from "@/lib/data";
import { ArticleCard } from "@/components/articles/article-card";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const FEATURED_CATEGORIES: Category[] = [
  "regulation",
  "operators",
  "affiliates",
  "payments-fintech",
];

function CategoryBlock({ category }: { category: Category }) {
  const meta = CATEGORIES[category];
  const articles = getArticlesByCategory(category).slice(0, 3);

  if (articles.length === 0) return null;

  const [lead, ...rest] = articles;

  return (
    <div>
      <div className="flex items-center justify-between mb-4 pb-3 border-b-2 border-navy">
        <h2 className="font-serif text-xl font-bold text-navy">{meta.label}</h2>
        <Link
          href={`/en/category/${meta.slug}`}
          className="text-xs font-sans font-medium text-amber hover:text-amber/80 flex items-center gap-1 transition-colors"
        >
          More <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Lead article */}
        <article className="group md:col-span-2">
          <div className="bg-white border border-border rounded-sm overflow-hidden hover:shadow-sm transition-shadow h-full flex flex-col">
            <div className="relative h-44 bg-surface overflow-hidden shrink-0">
              <img
                src={lead.featuredImage}
                alt={lead.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
            </div>
            <div className="p-4 flex flex-col flex-1">
              <Link
                href={`/en/category/${lead.category}`}
                className="text-xs font-sans font-semibold uppercase tracking-wider text-amber mb-2 inline-block"
              >
                {meta.label}
              </Link>
              <h3 className="font-serif font-bold text-base leading-snug line-clamp-2 group-hover:text-navy transition-colors flex-1">
                <Link href={`/en/article/${lead.slug}`}>{lead.title}</Link>
              </h3>
              <p className="text-xs text-muted-foreground font-sans mt-2">
                {lead.author.name} &middot;{" "}
                {new Date(lead.publishedAt).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>
        </article>

        {/* Supporting articles */}
        <div className="flex flex-col">
          {rest.map((article) => (
            <ArticleCard key={article.id} article={article} variant="compact" />
          ))}
        </div>
      </div>
    </div>
  );
}

export function CategoryBlocks() {
  return (
    <section aria-label="News by category" className="max-w-7xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
        {FEATURED_CATEGORIES.map((cat) => (
          <CategoryBlock key={cat} category={cat} />
        ))}
      </div>
    </section>
  );
}
