import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  getArticleBySlug,
  getRelatedArticles,
  ARTICLES,
  CATEGORIES,
  formatDate,
} from "@/lib/data";
import { Suspense } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ArticleCard } from "@/components/articles/article-card";
import { NewsletterWidget } from "@/components/newsletter-widget";
import { ArticleInteractions } from "@/components/articles/article-interactions";
import { ExternalLink, Heart, MessageCircle, Clock, Tag } from "lucide-react";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};
  const url = `https://igamingpulse.media/en/article/${slug}`;
  const image = article.featuredImage.startsWith("http")
    ? article.featuredImage
    : `https://igamingpulse.media${article.featuredImage}`;
  return {
    title: article.seoTitle,
    description: article.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: article.seoTitle,
      description: article.metaDescription,
      url,
      images: [{ url: image, width: 1200, height: 630, alt: article.title }],
      type: "article",
      publishedTime: article.publishedAt,
      authors: [article.author.name],
      siteName: "iGaming Pulse",
    },
    twitter: {
      card: "summary_large_image",
      title: article.seoTitle,
      description: article.metaDescription,
      images: [image],
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const related = getRelatedArticles(article, 3);
  const category = CATEGORIES[article.category];
  const readingTime = Math.max(1, Math.ceil(article.content.split(" ").length / 200));

  const articleUrl = `https://igamingpulse.media/en/article/${slug}`;
  const articleImage = article.featuredImage.startsWith("http")
    ? article.featuredImage
    : `https://igamingpulse.media${article.featuredImage}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.excerpt,
    url: articleUrl,
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    image: [articleImage],
    author: {
      "@type": "Person",
      name: article.author.name,
      jobTitle: article.author.title,
    },
    publisher: {
      "@type": "Organization",
      name: "iGaming Pulse",
      url: "https://igamingpulse.media",
      logo: {
        "@type": "ImageObject",
        url: "https://igamingpulse.media/images/og-default.jpg",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": articleUrl,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Suspense fallback={null}><Header /></Suspense>
      <main>
        {/* Article header */}
        <div className="bg-navy text-white py-10">
          <div className="max-w-4xl mx-auto px-4">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="mb-5">
              <ol className="flex items-center gap-2 text-xs text-white/50 font-sans">
                <li>
                  <Link href="/en" className="hover:text-white transition-colors">Home</Link>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <Link
                    href={`/en/category/${category.slug}`}
                    className="hover:text-white transition-colors"
                  >
                    {category.label}
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li className="text-white/70 truncate max-w-xs">{article.title}</li>
              </ol>
            </nav>

            {/* Labels */}
            <div className="flex items-center gap-2 flex-wrap mb-4">
              <Link
                href={`/en/category/${category.slug}`}
                className="text-xs font-sans font-bold uppercase tracking-widest bg-amber text-navy px-2.5 py-1 rounded-sm hover:bg-amber/90 transition-colors"
              >
                {category.label}
              </Link>
              {article.sponsored && (
                <span className="text-xs font-sans font-medium bg-white/20 text-white px-2.5 py-1 rounded-sm">
                  Sponsored
                </span>
              )}
              {article.trending && (
                <span className="text-xs font-sans font-medium bg-red-500/80 text-white px-2.5 py-1 rounded-sm">
                  Trending
                </span>
              )}
            </div>

            <h1 className="font-serif text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-5 leading-tight text-balance">
              {article.title}
            </h1>

            <p className="text-white/70 text-lg leading-relaxed mb-6 max-w-2xl">
              {article.excerpt}
            </p>

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-white/60 font-sans border-t border-white/15 pt-5">
              <div className="flex items-center gap-2.5">
                <div className="relative shrink-0 w-8 h-8 rounded-full overflow-hidden">
                  <Image
                    src={article.author.avatar}
                    alt={article.author.name}
                    fill
                    sizes="32px"
                    className="object-cover object-top"
                  />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm leading-tight">{article.author.name}</p>
                  <p className="text-white/50 text-xs">{article.author.title}</p>
                </div>
              </div>
              <span className="text-white/20 hidden sm:inline">|</span>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span>{readingTime} min read</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5" />
                <span>{article.likes}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MessageCircle className="w-3.5 h-3.5" />
                <span>{article.comments.length}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Article body */}
        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
            {/* Main article content */}
            <article className="lg:col-span-3">
              {/* Featured image */}
              <div className="relative w-full h-64 md:h-96 rounded-sm overflow-hidden mb-8">
                <Image
                  src={article.featuredImage}
                  alt={article.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 75vw"
                  priority
                  loading="eager"
                />
              </div>

              {/* Prose content */}
              <div className="max-w-none font-sans text-foreground leading-relaxed">
                {article.content.split("\n\n").map((block, i) => {
                  const trimmed = block.trim();
                  if (!trimmed) return null;

                  // ## Heading
                  if (trimmed.startsWith("## ")) {
                    return (
                      <h2 key={i} className="font-serif text-xl font-bold text-navy mt-8 mb-3 pb-2 border-b border-border">
                        {trimmed.replace(/^## /, "")}
                      </h2>
                    );
                  }
                  // ### Subheading
                  if (trimmed.startsWith("### ")) {
                    return (
                      <h3 key={i} className="font-serif text-lg font-bold text-navy mt-6 mb-2">
                        {trimmed.replace(/^### /, "")}
                      </h3>
                    );
                  }

                  // Render inline **bold** within paragraphs
                  const renderInline = (text: string) => {
                    const parts = text.split(/(\*\*[^*]+\*\*)/g);
                    return parts.map((part, j) =>
                      part.startsWith("**") && part.endsWith("**")
                        ? <strong key={j} className="font-semibold text-foreground">{part.slice(2, -2)}</strong>
                        : part
                    );
                  };

                  return (
                    <p key={i} className="mb-5 text-base leading-relaxed text-foreground/90">
                      {renderInline(trimmed)}
                    </p>
                  );
                })}
              </div>

              {/* Source citation */}
              {article.sourceName && (
                <div className="mt-8 pt-5 border-t border-border">
                  <p className="text-sm text-muted-foreground font-sans">
                    <span className="font-medium text-foreground">Source:</span>{" "}
                    {article.sourceUrl ? (
                      <a
                        href={article.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-amber hover:underline inline-flex items-center gap-1"
                      >
                        {article.sourceName}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : (
                      <span>{article.sourceName}</span>
                    )}
                  </p>
                </div>
              )}

              {/* Tags */}
              {article.tags.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-2 items-center">
                  <Tag className="w-3.5 h-3.5 text-muted-foreground" />
                  {article.tags.map((tag) => (
                    <span
                      key={tag.id}
                      className="text-xs font-sans text-foreground/70 bg-surface border border-border px-2.5 py-1 rounded-full hover:border-navy hover:text-navy transition-colors cursor-default"
                    >
                      {tag.label}
                    </span>
                  ))}
                </div>
              )}

              {/* Author box */}
              <div className="mt-10 p-6 bg-surface border border-border rounded-sm flex gap-5">
                <div className="relative shrink-0 w-14 h-14 rounded-full overflow-hidden">
                  <Image
                    src={article.author.avatar}
                    alt={article.author.name}
                    fill
                    sizes="56px"
                    className="object-cover object-top"
                  />
                </div>
                <div>
                  <p className="font-serif font-bold text-navy text-base">{article.author.name}</p>
                  <p className="text-sm text-amber font-sans font-medium mb-2">{article.author.title}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Member of the iGaming Pulse editorial team. Covering industry news, analysis, and
                    B2B developments across the global iGaming sector.
                  </p>
                </div>
              </div>

              {/* Likes & Comments */}
              <ArticleInteractions
                initialLikes={article.likes}
                initialComments={article.comments}
              />
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-1 flex flex-col gap-6">
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

              {/* Share */}
              <div className="bg-white border border-border rounded-sm p-4">
                <h3 className="font-sans font-semibold text-sm text-foreground mb-3">
                  Share this article
                </h3>
                <div className="flex flex-col gap-2">
                  <a
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(`https://igamingpulse.com/en/article/${article.slug}`)}&text=${encodeURIComponent(article.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-sans font-medium text-foreground/70 border border-border rounded-sm px-3 py-2 hover:border-navy hover:text-navy transition-colors flex items-center gap-2"
                  >
                    Share on X (Twitter)
                  </a>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://igamingpulse.com/en/article/${article.slug}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-sans font-medium text-foreground/70 border border-border rounded-sm px-3 py-2 hover:border-navy hover:text-navy transition-colors flex items-center gap-2"
                  >
                    Share on LinkedIn
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </div>

        {/* Related articles */}
        {related.length > 0 && (
          <div className="border-t border-border bg-surface">
            <div className="max-w-7xl mx-auto px-4 py-10">
              <h2 className="font-serif text-2xl font-bold text-navy mb-6 pb-3 border-b-2 border-navy">
                Related Articles
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {related.map((a) => (
                  <ArticleCard key={a.id} article={a} variant="default" />
                ))}
              </div>
            </div>
          </div>
        )}

        <NewsletterWidget variant="banner" />
      </main>
      <Footer />
    </>
  );
}
