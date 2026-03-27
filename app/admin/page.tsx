import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { ARTICLES, AUTHORS, CATEGORIES, getLatestArticles, formatDateShort } from "@/lib/data";
import Link from "next/link";
import Image from "next/image";
import {
  FileText,
  TrendingUp,
  Mail,
  Users,
  PlusCircle,
  ArrowRight,
  Eye,
  Heart,
  MessageCircle,
} from "lucide-react";

const totalLikes = ARTICLES.reduce((sum, a) => sum + a.likes, 0);
const totalComments = ARTICLES.reduce((sum, a) => sum + a.comments.length, 0);
const featuredCount = ARTICLES.filter((a) => a.featured).length;
const sponsoredCount = ARTICLES.filter((a) => a.sponsored).length;

const STATS = [
  { label: "Total Articles", value: ARTICLES.length, icon: FileText, color: "text-navy" },
  { label: "Total Likes", value: totalLikes, icon: Heart, color: "text-amber" },
  { label: "Total Comments", value: totalComments, icon: MessageCircle, color: "text-navy" },
  { label: "Featured Articles", value: featuredCount, icon: TrendingUp, color: "text-amber" },
  { label: "Sponsored", value: sponsoredCount, icon: Eye, color: "text-navy" },
  { label: "Authors", value: AUTHORS.length, icon: Users, color: "text-amber" },
];

const categoryBreakdown = Object.entries(CATEGORIES).map(([slug, cat]) => ({
  ...cat,
  count: ARTICLES.filter((a) => a.category === slug).length,
}));

export default function AdminDashboardPage() {
  const latest = getLatestArticles(8);

  return (
    <div className="flex min-h-screen bg-surface">
      <AdminSidebar />

      <div className="flex-1 overflow-auto">
        {/* Top bar */}
        <div className="bg-white border-b border-border px-8 py-4 flex items-center justify-between sticky top-0 z-30">
          <div>
            <h1 className="font-serif text-xl font-bold text-navy">Dashboard</h1>
            <p className="text-xs text-muted-foreground font-sans">
              Overview of iGaming Wire content and performance
            </p>
          </div>
          <Link
            href="/admin/articles/new"
            className="flex items-center gap-2 bg-navy text-white text-sm font-sans font-semibold px-4 py-2 rounded-sm hover:bg-navy-light transition-colors"
          >
            <PlusCircle className="w-4 h-4" />
            New Article
          </Link>
        </div>

        <div className="px-8 py-8">
          {/* Stats grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
            {STATS.map(({ label, value, icon: Icon, color }) => (
              <div key={label} className="bg-white border border-border rounded-sm p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-sans text-muted-foreground">{label}</p>
                  <Icon className={`w-4 h-4 ${color}`} />
                </div>
                <p className="font-serif text-2xl font-bold text-navy">{value}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Recent articles */}
            <div className="xl:col-span-2 bg-white border border-border rounded-sm">
              <div className="px-6 py-4 border-b border-border flex items-center justify-between">
                <h2 className="font-serif font-bold text-navy">Recent Articles</h2>
                <Link
                  href="/admin/articles"
                  className="text-xs font-sans text-amber hover:underline flex items-center gap-1"
                >
                  View all <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
              <div className="divide-y divide-border">
                {latest.map((article) => (
                  <div key={article.id} className="px-6 py-4 flex gap-4 items-start hover:bg-surface transition-colors">
                    <div className="relative w-14 h-12 rounded-sm overflow-hidden shrink-0 bg-surface">
                      <Image
                        src={article.featuredImage}
                        alt={article.title}
                        fill
                        className="object-cover"
                        sizes="56px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-sans font-semibold text-amber uppercase tracking-wider">
                          {CATEGORIES[article.category].label}
                        </span>
                        {article.featured && (
                          <span className="text-xs font-sans bg-navy/10 text-navy px-1.5 py-0.5 rounded-sm">
                            Featured
                          </span>
                        )}
                        {article.sponsored && (
                          <span className="text-xs font-sans bg-amber/15 text-amber px-1.5 py-0.5 rounded-sm">
                            Sponsored
                          </span>
                        )}
                      </div>
                      <p className="text-sm font-serif font-semibold text-foreground line-clamp-1">
                        {article.title}
                      </p>
                      <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground font-sans">
                        <span>{article.author.name}</span>
                        <span>{formatDateShort(article.publishedAt)}</span>
                        <span className="flex items-center gap-0.5">
                          <Heart className="w-3 h-3" /> {article.likes}
                        </span>
                        <span className="flex items-center gap-0.5">
                          <MessageCircle className="w-3 h-3" /> {article.comments.length}
                        </span>
                      </div>
                    </div>
                    <Link
                      href={`/admin/articles/${article.id}`}
                      className="shrink-0 text-xs font-sans text-muted-foreground hover:text-navy border border-border px-2.5 py-1.5 rounded-sm hover:border-navy transition-colors"
                    >
                      Edit
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* Right column */}
            <div className="flex flex-col gap-6">
              {/* Category breakdown */}
              <div className="bg-white border border-border rounded-sm">
                <div className="px-5 py-4 border-b border-border">
                  <h2 className="font-serif font-bold text-navy">By Category</h2>
                </div>
                <div className="px-5 py-4 flex flex-col gap-3">
                  {categoryBreakdown
                    .sort((a, b) => b.count - a.count)
                    .map((cat) => (
                      <div key={cat.slug} className="flex items-center justify-between gap-3">
                        <Link
                          href={`/admin/articles?category=${cat.slug}`}
                          className="text-sm font-sans text-foreground/75 hover:text-navy transition-colors truncate"
                        >
                          {cat.label}
                        </Link>
                        <div className="flex items-center gap-2 shrink-0">
                          <div className="w-16 h-1.5 bg-surface rounded-full overflow-hidden">
                            <div
                              className="h-full bg-amber rounded-full"
                              style={{ width: `${Math.min(100, (cat.count / ARTICLES.length) * 100 * 3)}%` }}
                            />
                          </div>
                          <span className="text-xs font-sans font-semibold text-navy w-4 text-right">
                            {cat.count}
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* Quick actions */}
              <div className="bg-white border border-border rounded-sm">
                <div className="px-5 py-4 border-b border-border">
                  <h2 className="font-serif font-bold text-navy">Quick Actions</h2>
                </div>
                <div className="px-5 py-4 flex flex-col gap-2">
                  {[
                    { label: "Write new article", href: "/admin/articles/new", icon: PlusCircle },
                    { label: "Manage newsletter", href: "/admin/newsletter", icon: Mail },
                    { label: "View all authors", href: "/admin/authors", icon: Users },
                    { label: "Site settings", href: "/admin/settings", icon: FileText },
                  ].map(({ label, href, icon: Icon }) => (
                    <Link
                      key={href}
                      href={href}
                      className="flex items-center gap-2.5 text-sm font-sans text-foreground/70 hover:text-navy hover:bg-surface rounded-sm px-2.5 py-2 transition-colors"
                    >
                      <Icon className="w-4 h-4 text-amber shrink-0" />
                      {label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Newsletter stats placeholder */}
              <div className="bg-navy text-white rounded-sm p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Mail className="w-4 h-4 text-amber" />
                  <h3 className="font-sans font-semibold text-sm">Newsletter</h3>
                </div>
                <p className="font-serif text-3xl font-bold mb-1">5,024</p>
                <p className="text-white/50 text-xs font-sans">Active subscribers</p>
                <div className="mt-4 pt-4 border-t border-white/10 flex gap-4 text-xs font-sans text-white/60">
                  <div>
                    <p className="text-white font-semibold text-sm">48.2%</p>
                    <p>Open rate</p>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">6.1%</p>
                    <p>Click rate</p>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">+127</p>
                    <p>This week</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
