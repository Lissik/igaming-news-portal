import Link from "next/link";
import Image from "next/image";
import { Heart } from "lucide-react";
import { Article, CATEGORIES, formatDateShort } from "@/lib/data";

interface ArticleCardProps {
  article: Article;
  variant?: "default" | "compact" | "featured" | "horizontal";
}

export function ArticleCard({ article, variant = "default" }: ArticleCardProps) {
  const category = CATEGORIES[article.category];
  const articleUrl = `/en/article/${article.slug}`;

  if (variant === "featured") {
    return (
      <article className="group relative overflow-hidden rounded-sm bg-navy text-white h-[480px] md:h-[520px]">
        <Image
          src={article.featuredImage}
          alt={article.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105 opacity-50"
          sizes="(max-width: 768px) 100vw, 60vw"
          priority
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/60 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
          <div className="flex items-center gap-2 mb-3">
            <Link
              href={`/en/category/${category.slug}`}
              className="text-xs font-sans font-semibold uppercase tracking-widest bg-amber text-navy px-2 py-1 rounded-sm hover:bg-amber/90 transition-colors"
            >
              {category.label}
            </Link>
            {article.sponsored && (
              <span className="text-xs font-sans font-medium bg-white/20 text-white px-2 py-1 rounded-sm">
                Sponsored
              </span>
            )}
            {article.trending && (
              <span className="text-xs font-sans font-medium bg-red-500/80 text-white px-2 py-1 rounded-sm">
                Trending
              </span>
            )}
          </div>
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-white mb-3 leading-tight text-balance">
            <Link href={articleUrl} className="hover:text-amber transition-colors">
              {article.title}
            </Link>
          </h2>
          <p className="text-white/75 text-sm leading-relaxed mb-4 hidden md:line-clamp-2">
            {article.excerpt}
          </p>
          <div className="flex items-center gap-3 text-white/60 text-xs font-sans">
            <span>{article.author.name}</span>
            <span>&middot;</span>
            <time dateTime={article.publishedAt}>{formatDateShort(article.publishedAt)}</time>
            <span>&middot;</span>
            <span className="flex items-center gap-1">
              <Heart className="w-3 h-3" />
              {article.likes}
            </span>
          </div>
        </div>
      </article>
    );
  }

  if (variant === "horizontal") {
    return (
      <article className="group flex gap-4 py-4 border-b border-border last:border-0">
        <div className="shrink-0 w-24 h-20 relative overflow-hidden rounded-sm bg-surface">
          <Image
            src={article.featuredImage}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="96px"
          />
        </div>
        <div className="flex flex-col justify-between min-w-0">
          <div>
            <Link
              href={`/en/category/${category.slug}`}
              className="text-xs font-sans font-semibold uppercase tracking-wider text-amber hover:text-amber/80 transition-colors"
            >
              {category.label}
            </Link>
            <h3 className="font-serif text-sm font-bold text-foreground mt-1 leading-snug line-clamp-2 group-hover:text-navy transition-colors">
              <Link href={articleUrl}>{article.title}</Link>
            </h3>
          </div>
          <time className="text-xs text-muted-foreground font-sans mt-1" dateTime={article.publishedAt}>
            {formatDateShort(article.publishedAt)}
          </time>
        </div>
      </article>
    );
  }

  if (variant === "compact") {
    return (
      <article className="group flex gap-3 py-3 border-b border-border last:border-0">
        <div className="flex flex-col justify-between min-w-0 flex-1">
          <Link
            href={`/en/category/${category.slug}`}
            className="text-xs font-sans font-semibold uppercase tracking-wider text-amber hover:text-amber/80 transition-colors mb-1 inline-block"
          >
            {category.label}
          </Link>
          <h3 className="font-serif text-sm font-semibold text-foreground leading-snug line-clamp-2 group-hover:text-navy transition-colors">
            <Link href={articleUrl}>{article.title}</Link>
          </h3>
          <time className="text-xs text-muted-foreground font-sans mt-1.5" dateTime={article.publishedAt}>
            {formatDateShort(article.publishedAt)}
          </time>
        </div>
      </article>
    );
  }

  // Default card
  return (
    <article className="group flex flex-col bg-white border border-border rounded-sm overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative h-48 overflow-hidden bg-surface">
        <Image
          src={article.featuredImage}
          alt={article.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {article.sponsored && (
          <span className="absolute top-3 left-3 text-xs font-sans font-semibold bg-foreground/80 text-white px-2 py-0.5 rounded-sm">
            Sponsored
          </span>
        )}
      </div>
      <div className="flex flex-col flex-1 p-4">
        <div className="flex items-center gap-2 mb-2">
          <Link
            href={`/en/category/${category.slug}`}
            className="text-xs font-sans font-semibold uppercase tracking-wider text-amber hover:text-amber/80 transition-colors"
          >
            {category.label}
          </Link>
          {article.trending && (
            <span className="text-xs font-sans bg-red-50 text-red-600 px-1.5 py-0.5 rounded-sm font-medium">
              Trending
            </span>
          )}
        </div>
        <h3 className="font-serif font-bold text-foreground leading-snug mb-2 line-clamp-2 group-hover:text-navy transition-colors text-base">
          <Link href={articleUrl}>{article.title}</Link>
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-4 flex-1">
          {article.excerpt}
        </p>
        <div className="flex items-center justify-between text-xs text-muted-foreground font-sans mt-auto pt-3 border-t border-border/50">
          <div className="flex items-center gap-2">
            <span className="font-medium text-foreground/70">{article.author.name}</span>
            <span>&middot;</span>
            <time dateTime={article.publishedAt}>{formatDateShort(article.publishedAt)}</time>
          </div>
          <span className="flex items-center gap-1">
            <Heart className="w-3 h-3" />
            {article.likes}
          </span>
        </div>
      </div>
    </article>
  );
}
