"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { ARTICLES, CATEGORIES, AUTHORS, formatDateShort } from "@/lib/data";
import type { Category } from "@/lib/data";
import { PlusCircle, Search, Heart, MessageCircle, Filter } from "lucide-react";

export default function AdminArticlesPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<Category | "all">("all");
  const [featured, setFeatured] = useState<"all" | "featured" | "not-featured">("all");

  const filtered = ARTICLES.filter((a) => {
    const matchSearch =
      !search ||
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.author.name.toLowerCase().includes(search.toLowerCase());
    const matchCategory = category === "all" || a.category === category;
    const matchFeatured =
      featured === "all" ||
      (featured === "featured" && a.featured) ||
      (featured === "not-featured" && !a.featured);
    return matchSearch && matchCategory && matchFeatured;
  }).sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  return (
    <div className="flex min-h-screen bg-surface">
      <AdminSidebar />

      <div className="flex-1 overflow-auto">
        {/* Top bar */}
        <div className="bg-white border-b border-border px-8 py-4 flex items-center justify-between sticky top-0 z-30">
          <div>
            <h1 className="font-serif text-xl font-bold text-navy">Articles</h1>
            <p className="text-xs text-muted-foreground font-sans">{ARTICLES.length} total articles</p>
          </div>
          <Link
            href="/admin/articles/new"
            className="flex items-center gap-2 bg-navy text-white text-sm font-sans font-semibold px-4 py-2 rounded-sm hover:bg-navy-light transition-colors"
          >
            <PlusCircle className="w-4 h-4" />
            New Article
          </Link>
        </div>

        <div className="px-8 py-6">
          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3 mb-6 bg-white border border-border rounded-sm p-4">
            <div className="flex items-center gap-2 border border-border rounded-sm px-3 py-2 flex-1 min-w-48">
              <Search className="w-3.5 h-3.5 text-muted-foreground" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search articles or authors..."
                className="text-sm font-sans bg-transparent outline-none flex-1 placeholder-muted-foreground"
              />
            </div>

            <div className="flex items-center gap-2">
              <Filter className="w-3.5 h-3.5 text-muted-foreground" />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as Category | "all")}
                className="text-sm font-sans border border-border rounded-sm px-3 py-2 bg-white focus:outline-none focus:border-navy"
              >
                <option value="all">All categories</option>
                {Object.values(CATEGORIES).map((cat) => (
                  <option key={cat.slug} value={cat.slug}>
                    {cat.label}
                  </option>
                ))}
              </select>

              <select
                value={featured}
                onChange={(e) => setFeatured(e.target.value as "all" | "featured" | "not-featured")}
                className="text-sm font-sans border border-border rounded-sm px-3 py-2 bg-white focus:outline-none focus:border-navy"
              >
                <option value="all">All articles</option>
                <option value="featured">Featured only</option>
                <option value="not-featured">Not featured</option>
              </select>
            </div>

            {filtered.length !== ARTICLES.length && (
              <span className="text-xs font-sans text-muted-foreground">
                Showing {filtered.length} of {ARTICLES.length}
              </span>
            )}
          </div>

          {/* Table */}
          <div className="bg-white border border-border rounded-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-surface">
                  <th className="text-left px-5 py-3 font-sans font-semibold text-xs text-muted-foreground uppercase tracking-wider">
                    Article
                  </th>
                  <th className="text-left px-4 py-3 font-sans font-semibold text-xs text-muted-foreground uppercase tracking-wider hidden md:table-cell">
                    Category
                  </th>
                  <th className="text-left px-4 py-3 font-sans font-semibold text-xs text-muted-foreground uppercase tracking-wider hidden lg:table-cell">
                    Author
                  </th>
                  <th className="text-left px-4 py-3 font-sans font-semibold text-xs text-muted-foreground uppercase tracking-wider hidden lg:table-cell">
                    Published
                  </th>
                  <th className="text-right px-4 py-3 font-sans font-semibold text-xs text-muted-foreground uppercase tracking-wider">
                    Stats
                  </th>
                  <th className="text-right px-5 py-3 font-sans font-semibold text-xs text-muted-foreground uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((article) => (
                  <tr key={article.id} className="hover:bg-surface transition-colors group">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-10 rounded-sm overflow-hidden shrink-0 bg-surface hidden sm:block">
                          <Image
                            src={article.featuredImage}
                            alt=""
                            fill
                            className="object-cover"
                            sizes="48px"
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="font-sans font-medium text-foreground line-clamp-2 leading-snug text-sm">
                            {article.title}
                          </p>
                          <div className="flex gap-1.5 mt-1 flex-wrap">
                            {article.featured && (
                              <span className="text-xs bg-navy/10 text-navy font-sans font-medium px-1.5 py-0.5 rounded-sm">
                                Featured
                              </span>
                            )}
                            {article.trending && (
                              <span className="text-xs bg-red-50 text-red-600 font-sans font-medium px-1.5 py-0.5 rounded-sm">
                                Trending
                              </span>
                            )}
                            {article.sponsored && (
                              <span className="text-xs bg-amber/15 text-amber font-sans font-medium px-1.5 py-0.5 rounded-sm">
                                Sponsored
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 hidden md:table-cell">
                      <span className="text-xs font-sans font-semibold text-amber uppercase tracking-wider">
                        {CATEGORIES[article.category].label}
                      </span>
                    </td>
                    <td className="px-4 py-4 hidden lg:table-cell">
                      <span className="text-sm font-sans text-foreground/70">{article.author.name}</span>
                    </td>
                    <td className="px-4 py-4 hidden lg:table-cell">
                      <time className="text-sm font-sans text-muted-foreground">
                        {formatDateShort(article.publishedAt)}
                      </time>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <div className="flex items-center justify-end gap-3 text-xs text-muted-foreground font-sans">
                        <span className="flex items-center gap-1">
                          <Heart className="w-3 h-3" /> {article.likes}
                        </span>
                        <span className="flex items-center gap-1 hidden sm:flex">
                          <MessageCircle className="w-3 h-3" /> {article.comments.length}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/en/article/${article.slug}`}
                          target="_blank"
                          className="text-xs font-sans text-muted-foreground hover:text-navy border border-border px-2.5 py-1.5 rounded-sm hover:border-navy transition-colors"
                        >
                          View
                        </Link>
                        <Link
                          href={`/admin/articles/${article.id}`}
                          className="text-xs font-sans text-white bg-navy hover:bg-navy-light px-2.5 py-1.5 rounded-sm transition-colors"
                        >
                          Edit
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filtered.length === 0 && (
              <div className="text-center py-12">
                <p className="font-sans text-muted-foreground">No articles match your filters.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
