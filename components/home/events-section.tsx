import { getArticlesByCategory } from "@/lib/data";
import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";

const UPCOMING_EVENTS = [
  { name: "SBC Summit Malta 2026", date: "Apr 28–30, 2026", location: "Malta", href: "/en/article/sbc-summit-malta-2026-preview" },
  { name: "iGB Live! 2026", date: "Jul 14–17, 2026", location: "Amsterdam, Netherlands", href: "/en/article/igb-live-2026-amsterdam-preview" },
  { name: "SBC Summit Lisbon 2026", date: "Sep 22–24, 2026", location: "Lisbon, Portugal", href: "/en/article/sbc-summit-lisbon-2026-announcement" },
  { name: "SiGMA Europe 2026", date: "Nov 16–20, 2026", location: "Malta", href: "/en/article/sigma-europe-2026-preview" },
];

export function EventsSection() {
  const eventArticles = getArticlesByCategory("conferences-events").slice(0, 2);

  return (
    <section aria-labelledby="events-heading" className="max-w-7xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Event articles */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-5 pb-3 border-b-2 border-navy">
            <h2 id="events-heading" className="font-serif text-xl font-bold text-navy">
              Conferences &amp; Events
            </h2>
            <Link
              href="/en/category/conferences-events"
              className="text-xs font-sans font-medium text-amber hover:text-amber/80 flex items-center gap-1 transition-colors"
            >
              All events <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {eventArticles.map((article) => (
              <article key={article.id} className="group bg-white border border-border rounded-sm overflow-hidden hover:shadow-sm transition-shadow">
                <div className="relative h-36 overflow-hidden bg-surface">
                  <img
                    src={article.featuredImage}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-serif font-bold text-sm leading-snug line-clamp-2 group-hover:text-navy transition-colors">
                    <Link href={`/en/article/${article.slug}`}>{article.title}</Link>
                  </h3>
                  <p className="text-xs text-muted-foreground font-sans mt-2">
                    {new Date(article.publishedAt).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Upcoming events sidebar */}
        <div>
          <div className="flex items-center gap-2 mb-5 pb-3 border-b-2 border-amber">
            <CalendarDays className="w-4 h-4 text-amber" />
            <h2 className="font-serif text-xl font-bold text-navy">Upcoming Events</h2>
          </div>
          <div className="flex flex-col gap-3">
            {UPCOMING_EVENTS.map((event) => (
              <Link
                key={event.name}
                href={event.href}
                className="group flex flex-col bg-white border border-border rounded-sm p-4 hover:shadow-sm hover:border-amber/50 transition-all"
              >
                <span className="text-xs font-sans font-semibold text-amber uppercase tracking-wider">
                  {event.date}
                </span>
                <span className="font-serif font-bold text-sm mt-1 group-hover:text-navy transition-colors">
                  {event.name}
                </span>
                <span className="text-xs text-muted-foreground font-sans mt-0.5">{event.location}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
