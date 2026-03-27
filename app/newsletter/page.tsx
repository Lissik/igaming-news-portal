import type { Metadata } from "next";
import Link from "next/link";
import { SiteLayout } from "@/components/layout/site-layout";
import { NewsletterWidget } from "@/components/newsletter-widget";
import { CheckCircle, Clock, Users, Globe } from "lucide-react";

export const metadata: Metadata = {
  title: "Newsletter — iGaming Pulse",
  description:
    "Subscribe to the iGaming Pulse newsletter. Weekly B2B iGaming industry briefings delivered free to your inbox every Thursday.",
};

const BENEFITS = [
  {
    icon: <Clock className="w-5 h-5 text-amber" />,
    title: "Weekly briefing",
    description:
      "Every Thursday morning — curated highlights from the week in iGaming, selected by our editorial team.",
  },
  {
    icon: <Users className="w-5 h-5 text-amber" />,
    title: "5,000+ subscribers",
    description:
      "Join operators, affiliates, suppliers, regulators, and investors who read iGaming Pulse each week.",
  },
  {
    icon: <Globe className="w-5 h-5 text-amber" />,
    title: "Global coverage",
    description:
      "Europe, Americas, Asia, and emerging regulated markets — all covered in a single concise read.",
  },
];

const WHAT_TO_EXPECT = [
  "Top 5 news stories of the week",
  "Regulatory updates and compliance news",
  "M&A activity and funding rounds",
  "New product launches and partnerships",
  "Upcoming conference highlights",
  "Editor's pick: one deep-read article",
];

const PAST_ISSUES = [
  {
    date: "20 Mar 2026",
    headline: "Flutter hits $6.2B; EU Licensing proposal moves forward; ICE recap",
  },
  {
    date: "13 Mar 2026",
    headline: "UK affordability deadlines; Betsson LatAm launch; Crypto in licensed gambling",
  },
  {
    date: "6 Mar 2026",
    headline: "Evolution Q4 record; GiGE preview; AI compliance tools roundup",
  },
  {
    date: "27 Feb 2026",
    headline: "White Paper enforcement; PENN acquisition talk; SEA licensing wave",
  },
];

export default function NewsletterPage() {
  return (
    <SiteLayout>
        {/* Hero */}
        <div className="bg-navy text-white py-16">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <p className="text-amber text-xs font-sans font-bold uppercase tracking-widest mb-4">
              Free newsletter
            </p>
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-5 text-balance">
              The iGaming Pulse Weekly
            </h1>
            <p className="text-white/70 text-lg leading-relaxed max-w-xl mx-auto mb-8">
              The week&apos;s most important iGaming B2B news, curated and delivered to your inbox
              every Thursday morning. Free, always.
            </p>
            <div className="flex flex-col gap-2 items-center">
              <p className="text-white/40 text-sm font-sans">
                Trusted by 5,000+ iGaming professionals
              </p>
            </div>
          </div>
        </div>

        {/* Subscription form */}
        <div className="max-w-2xl mx-auto px-4 -mt-6">
          <div className="bg-white border border-border rounded-sm shadow-lg p-8">
            <NewsletterWidget variant="compact" />
            <p className="text-xs text-muted-foreground mt-3 text-center font-sans">
              No spam. Unsubscribe at any time with one click.
            </p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-14">
          {/* Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
            {BENEFITS.map((b) => (
              <div key={b.title} className="bg-white border border-border rounded-sm p-6">
                <div className="mb-3">{b.icon}</div>
                <h3 className="font-serif font-bold text-navy mb-2">{b.title}</h3>
                <p className="text-sm text-foreground/75 leading-relaxed">{b.description}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-14">
            {/* What to expect */}
            <div>
              <h2 className="font-serif text-2xl font-bold text-navy mb-5 pb-3 border-b-2 border-navy">
                What&apos;s in each issue
              </h2>
              <ul className="flex flex-col gap-3">
                {WHAT_TO_EXPECT.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <CheckCircle className="w-4 h-4 text-amber shrink-0" />
                    <span className="text-sm text-foreground/80">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Recent issues */}
            <div>
              <h2 className="font-serif text-2xl font-bold text-navy mb-5 pb-3 border-b-2 border-navy">
                Recent issues
              </h2>
              <div className="flex flex-col gap-4">
                {PAST_ISSUES.map((issue) => (
                  <div
                    key={issue.date}
                    className="bg-surface border border-border rounded-sm p-4"
                  >
                    <p className="text-xs font-sans text-amber font-semibold mb-1">{issue.date}</p>
                    <p className="text-sm font-sans text-foreground/80">{issue.headline}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Advertise in newsletter CTA */}
          <div className="bg-surface border border-border rounded-sm p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-serif font-bold text-navy text-xl mb-2">
                Advertise in the newsletter
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-lg">
                Reach 5,000+ iGaming industry professionals with a dedicated newsletter sponsorship.
                Banner placements, dedicated sends, and content partnerships available.
              </p>
            </div>
            <Link
              href="/contact"
              className="shrink-0 bg-navy text-white font-sans font-semibold text-sm px-6 py-3 rounded-sm hover:bg-navy-light transition-colors whitespace-nowrap"
            >
              Get in touch
            </Link>
          </div>
        </div>
    </SiteLayout>
  );
}
