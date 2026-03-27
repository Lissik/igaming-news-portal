"use client";

import { useState } from "react";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { CATEGORIES, AUTHORS } from "@/lib/data";
import { Save, Eye, ArrowLeft, CheckCircle } from "lucide-react";
import Link from "next/link";

type FormState = {
  title: string;
  excerpt: string;
  content: string;
  category: string;
  authorId: string;
  featuredImage: string;
  featured: boolean;
  trending: boolean;
  sponsored: boolean;
  sourceName: string;
  sourceUrl: string;
  seoTitle: string;
  metaDescription: string;
  tags: string;
  language: string;
};

const DEFAULT: FormState = {
  title: "",
  excerpt: "",
  content: "",
  category: "",
  authorId: "",
  featuredImage: "",
  featured: false,
  trending: false,
  sponsored: false,
  sourceName: "",
  sourceUrl: "",
  seoTitle: "",
  metaDescription: "",
  tags: "",
  language: "en",
};

export default function NewArticlePage() {
  const [form, setForm] = useState<FormState>(DEFAULT);
  const [saved, setSaved] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  function validate() {
    const e: Partial<Record<keyof FormState, string>> = {};
    if (!form.title.trim()) e.title = "Title is required.";
    if (!form.excerpt.trim()) e.excerpt = "Excerpt is required.";
    if (!form.content.trim()) e.content = "Content is required.";
    if (!form.category) e.category = "Category is required.";
    if (!form.authorId) e.authorId = "Author is required.";
    return e;
  }

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    const v = validate();
    if (Object.keys(v).length > 0) {
      setErrors(v);
      return;
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  const wordCount = form.content.trim().split(/\s+/).filter(Boolean).length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <div className="flex min-h-screen bg-surface">
      <AdminSidebar />

      <div className="flex-1 overflow-auto">
        {/* Top bar */}
        <div className="bg-white border-b border-border px-8 py-4 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <Link
              href="/admin/articles"
              className="text-muted-foreground hover:text-navy transition-colors"
              aria-label="Back to articles"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="font-serif text-xl font-bold text-navy">New Article</h1>
              {wordCount > 0 && (
                <p className="text-xs text-muted-foreground font-sans">
                  {wordCount} words &middot; ~{readingTime} min read
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-3">
            {saved && (
              <span className="flex items-center gap-1.5 text-sm text-green-600 font-sans">
                <CheckCircle className="w-4 h-4" />
                Saved
              </span>
            )}
            <button
              type="button"
              onClick={handleSave}
              className="flex items-center gap-2 bg-navy text-white text-sm font-sans font-semibold px-4 py-2 rounded-sm hover:bg-navy-light transition-colors"
            >
              <Save className="w-4 h-4" />
              Save Article
            </button>
          </div>
        </div>

        <form onSubmit={handleSave} noValidate className="px-8 py-8">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Main content area */}
            <div className="xl:col-span-2 flex flex-col gap-6">
              {/* Title */}
              <div className="bg-white border border-border rounded-sm p-6 flex flex-col gap-4">
                <h2 className="font-sans font-semibold text-sm text-foreground border-b border-border pb-3">
                  Article Content
                </h2>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="title" className="text-xs font-sans font-semibold text-foreground uppercase tracking-wider">
                    Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="title"
                    type="text"
                    value={form.title}
                    onChange={(e) => set("title", e.target.value)}
                    placeholder="Enter a compelling article title..."
                    className={`border rounded-sm px-4 py-3 text-base font-serif bg-white focus:outline-none focus:border-navy transition-colors ${
                      errors.title ? "border-red-400" : "border-border"
                    }`}
                  />
                  {errors.title && <p className="text-xs text-red-500">{errors.title}</p>}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="excerpt" className="text-xs font-sans font-semibold text-foreground uppercase tracking-wider">
                    Excerpt / Standfirst <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="excerpt"
                    rows={3}
                    value={form.excerpt}
                    onChange={(e) => set("excerpt", e.target.value)}
                    placeholder="A 1–2 sentence summary shown on article cards and in search results..."
                    className={`border rounded-sm px-4 py-3 text-sm font-sans bg-white focus:outline-none focus:border-navy transition-colors resize-y ${
                      errors.excerpt ? "border-red-400" : "border-border"
                    }`}
                  />
                  {errors.excerpt && <p className="text-xs text-red-500">{errors.excerpt}</p>}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="content" className="text-xs font-sans font-semibold text-foreground uppercase tracking-wider">
                    Body Content <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="content"
                    rows={20}
                    value={form.content}
                    onChange={(e) => set("content", e.target.value)}
                    placeholder="Write the full article body here. Separate paragraphs with a blank line."
                    className={`border rounded-sm px-4 py-3 text-sm font-sans leading-relaxed bg-white focus:outline-none focus:border-navy transition-colors resize-y font-mono ${
                      errors.content ? "border-red-400" : "border-border"
                    }`}
                  />
                  {errors.content && <p className="text-xs text-red-500">{errors.content}</p>}
                  <p className="text-xs text-muted-foreground font-sans">
                    {wordCount} words · ~{readingTime} min read
                  </p>
                </div>
              </div>

              {/* SEO */}
              <div className="bg-white border border-border rounded-sm p-6 flex flex-col gap-4">
                <h2 className="font-sans font-semibold text-sm text-foreground border-b border-border pb-3">
                  SEO & Metadata
                </h2>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="seoTitle" className="text-xs font-sans font-semibold text-foreground uppercase tracking-wider">
                    SEO Title
                  </label>
                  <input
                    id="seoTitle"
                    type="text"
                    value={form.seoTitle}
                    onChange={(e) => set("seoTitle", e.target.value)}
                    placeholder="Defaults to article title if empty"
                    className="border border-border rounded-sm px-4 py-2.5 text-sm font-sans bg-white focus:outline-none focus:border-navy transition-colors"
                  />
                  <p className="text-xs text-muted-foreground font-sans">
                    {form.seoTitle.length}/60 characters recommended
                  </p>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="metaDescription" className="text-xs font-sans font-semibold text-foreground uppercase tracking-wider">
                    Meta Description
                  </label>
                  <textarea
                    id="metaDescription"
                    rows={2}
                    value={form.metaDescription}
                    onChange={(e) => set("metaDescription", e.target.value)}
                    placeholder="150–160 characters describing the article for search engines..."
                    className="border border-border rounded-sm px-4 py-2.5 text-sm font-sans bg-white focus:outline-none focus:border-navy transition-colors resize-none"
                  />
                  <p className="text-xs text-muted-foreground font-sans">
                    {form.metaDescription.length}/160 characters recommended
                  </p>
                </div>
              </div>

              {/* Source */}
              <div className="bg-white border border-border rounded-sm p-6 flex flex-col gap-4">
                <h2 className="font-sans font-semibold text-sm text-foreground border-b border-border pb-3">
                  Source (optional)
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="sourceName" className="text-xs font-sans font-semibold text-foreground uppercase tracking-wider">
                      Source name
                    </label>
                    <input
                      id="sourceName"
                      type="text"
                      value={form.sourceName}
                      onChange={(e) => set("sourceName", e.target.value)}
                      placeholder="e.g. UKGC Press Release"
                      className="border border-border rounded-sm px-4 py-2.5 text-sm font-sans bg-white focus:outline-none focus:border-navy transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="sourceUrl" className="text-xs font-sans font-semibold text-foreground uppercase tracking-wider">
                      Source URL
                    </label>
                    <input
                      id="sourceUrl"
                      type="url"
                      value={form.sourceUrl}
                      onChange={(e) => set("sourceUrl", e.target.value)}
                      placeholder="https://..."
                      className="border border-border rounded-sm px-4 py-2.5 text-sm font-sans bg-white focus:outline-none focus:border-navy transition-colors"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right sidebar settings */}
            <div className="flex flex-col gap-6">
              {/* Publish settings */}
              <div className="bg-white border border-border rounded-sm p-5 flex flex-col gap-4">
                <h2 className="font-sans font-semibold text-sm text-foreground border-b border-border pb-3">
                  Publish Settings
                </h2>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="category" className="text-xs font-sans font-semibold text-foreground uppercase tracking-wider">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="category"
                    value={form.category}
                    onChange={(e) => set("category", e.target.value)}
                    className={`border rounded-sm px-3 py-2.5 text-sm font-sans bg-white focus:outline-none focus:border-navy transition-colors ${
                      errors.category ? "border-red-400" : "border-border"
                    }`}
                  >
                    <option value="">Select category...</option>
                    {Object.values(CATEGORIES).map((cat) => (
                      <option key={cat.slug} value={cat.slug}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                  {errors.category && <p className="text-xs text-red-500">{errors.category}</p>}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="author" className="text-xs font-sans font-semibold text-foreground uppercase tracking-wider">
                    Author <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="author"
                    value={form.authorId}
                    onChange={(e) => set("authorId", e.target.value)}
                    className={`border rounded-sm px-3 py-2.5 text-sm font-sans bg-white focus:outline-none focus:border-navy transition-colors ${
                      errors.authorId ? "border-red-400" : "border-border"
                    }`}
                  >
                    <option value="">Select author...</option>
                    {AUTHORS.map((author) => (
                      <option key={author.id} value={author.id}>
                        {author.name} — {author.title}
                      </option>
                    ))}
                  </select>
                  {errors.authorId && <p className="text-xs text-red-500">{errors.authorId}</p>}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="language" className="text-xs font-sans font-semibold text-foreground uppercase tracking-wider">
                    Language
                  </label>
                  <select
                    id="language"
                    value={form.language}
                    onChange={(e) => set("language", e.target.value)}
                    className="border border-border rounded-sm px-3 py-2.5 text-sm font-sans bg-white focus:outline-none focus:border-navy transition-colors"
                  >
                    <option value="en">English (EN)</option>
                    <option value="bg">Bulgarian (BG)</option>
                    <option value="de">German (DE)</option>
                    <option value="ru">Russian (RU)</option>
                  </select>
                </div>

                {/* Flags */}
                <div className="flex flex-col gap-3 pt-2 border-t border-border">
                  {(
                    [
                      { key: "featured", label: "Mark as Featured" },
                      { key: "trending", label: "Mark as Trending" },
                      { key: "sponsored", label: "Mark as Sponsored" },
                    ] as const
                  ).map(({ key, label }) => (
                    <label key={key} className="flex items-center gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={form[key] as boolean}
                        onChange={(e) => set(key, e.target.checked)}
                        className="w-4 h-4 accent-navy"
                      />
                      <span className="text-sm font-sans text-foreground/80">{label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Featured image */}
              <div className="bg-white border border-border rounded-sm p-5 flex flex-col gap-4">
                <h2 className="font-sans font-semibold text-sm text-foreground border-b border-border pb-3">
                  Featured Image
                </h2>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="featuredImage" className="text-xs font-sans font-semibold text-foreground uppercase tracking-wider">
                    Image URL
                  </label>
                  <input
                    id="featuredImage"
                    type="url"
                    value={form.featuredImage}
                    onChange={(e) => set("featuredImage", e.target.value)}
                    placeholder="https://..."
                    className="border border-border rounded-sm px-3 py-2.5 text-sm font-sans bg-white focus:outline-none focus:border-navy transition-colors"
                  />
                </div>
                {form.featuredImage && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={form.featuredImage}
                    alt="Preview"
                    className="w-full h-36 object-cover rounded-sm border border-border"
                  />
                )}
              </div>

              {/* Tags */}
              <div className="bg-white border border-border rounded-sm p-5 flex flex-col gap-3">
                <h2 className="font-sans font-semibold text-sm text-foreground border-b border-border pb-3">
                  Tags
                </h2>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="tags" className="text-xs font-sans font-semibold text-foreground uppercase tracking-wider">
                    Tags (comma-separated)
                  </label>
                  <input
                    id="tags"
                    type="text"
                    value={form.tags}
                    onChange={(e) => set("tags", e.target.value)}
                    placeholder="Regulation, UKGC, Safer Gambling"
                    className="border border-border rounded-sm px-3 py-2.5 text-sm font-sans bg-white focus:outline-none focus:border-navy transition-colors"
                  />
                </div>
                {form.tags && (
                  <div className="flex flex-wrap gap-1.5">
                    {form.tags
                      .split(",")
                      .map((t) => t.trim())
                      .filter(Boolean)
                      .map((t) => (
                        <span
                          key={t}
                          className="text-xs font-sans bg-surface border border-border text-foreground/70 px-2 py-0.5 rounded-full"
                        >
                          {t}
                        </span>
                      ))}
                  </div>
                )}
              </div>

              {/* Preview link */}
              <button
                type="submit"
                className="w-full bg-navy text-white font-sans font-semibold text-sm py-3 rounded-sm hover:bg-navy-light transition-colors flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" />
                Save Article
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
