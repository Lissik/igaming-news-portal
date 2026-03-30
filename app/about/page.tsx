import type { Metadata } from "next";
import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { AUTHORS } from "@/lib/data";
import { NewsletterWidget } from "@/components/newsletter-widget";

export const metadata: Metadata = {
  title: "About iGaming Pulse",
  description:
    "iGaming Pulse is an independent B2B media platform covering the global iGaming industry. Learn about our editorial team, mission, and values.",
  alternates: { canonical: "https://igamingpulse.media/about" },
  openGraph: {
    title: "About iGaming Pulse | Independent iGaming Industry News",
    description:
      "iGaming Pulse is an independent B2B media platform covering the global iGaming industry. Learn about our editorial team, mission, and values.",
    url: "https://igamingpulse.media/about",
    type: "website",
  },
};

const STATS = [
  { value: "25+", label: "Articles per month" },
  { value: "5,000+", label: "Newsletter subscribers" },
  { value: "8", label: "Content categories" },
  { value: "4", label: "Languages" },
];

export default function AboutPage() {
  return (
    <>
      <Suspense fallback={null}><Header /></Suspense>
      <main>
        {/* Page header */}
        <div className="bg-navy text-white py-14">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-5 text-balance">
              About iGaming Pulse
            </h1>
            <p className="text-white/70 text-lg leading-relaxed max-w-2xl mx-auto">
              Independent editorial media for the global iGaming industry — operators, affiliates,
              game providers, and regulators.
            </p>
          </div>
        </div>

        {/* Mission */}
        <div className="max-w-4xl mx-auto px-4 py-14">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-14">
            <div>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-navy mb-5">
                Our mission
              </h2>
              <p className="text-foreground/80 leading-relaxed mb-4">
                iGaming Pulse was founded in January 2026 to fill a gap in B2B iGaming media: a
                publisher committed to independent, factually rigorous reporting without commercial
                conflicts or operator-sponsored editorial.
              </p>
              <p className="text-foreground/80 leading-relaxed mb-4">
                We cover the full value chain — regulation, operator news, game provider
                developments, affiliate strategy, payments, marketing, and industry events — from
                the perspective of professionals who work in the sector.
              </p>
              <p className="text-foreground/80 leading-relaxed">
                Our content is written and edited by journalists with direct iGaming industry
                experience, not generalist reporters. We do not accept payment for editorial
                coverage.
              </p>
            </div>
            <div className="relative h-72 rounded-sm overflow-hidden bg-surface">
              <Image
                src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80"
                alt="iGaming Pulse newsroom"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-14 bg-surface border border-border rounded-sm p-8">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-serif text-3xl font-bold text-navy">{stat.value}</p>
                <p className="text-sm text-muted-foreground font-sans mt-1">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Editorial principles */}
          <div className="mb-14">
            <h2 className="font-serif text-2xl font-bold text-navy mb-6 pb-3 border-b-2 border-navy">
              Editorial principles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Independence",
                  body: "Editorial decisions are made solely by our journalism team. Advertisers have no influence over coverage. We clearly distinguish between sponsored content and editorial articles.",
                },
                {
                  title: "Accuracy",
                  body: "We verify information with primary sources before publication. Corrections are published prominently when errors occur. We do not speculate without clear attribution.",
                },
                {
                  title: "Relevance",
                  body: "We focus exclusively on the B2B iGaming sector. We do not cover consumer gambling promotions, odds, or casino bonus content — only industry news for industry professionals.",
                },
              ].map((principle) => (
                <div
                  key={principle.title}
                  className="bg-white border border-border rounded-sm p-6"
                >
                  <div className="w-8 h-1 bg-amber mb-4 rounded-full" />
                  <h3 className="font-serif font-bold text-navy mb-3 text-lg">{principle.title}</h3>
                  <p className="text-sm text-foreground/75 leading-relaxed">{principle.body}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Team */}
          <div className="mb-14">
            <h2 className="font-serif text-2xl font-bold text-navy mb-6 pb-3 border-b-2 border-navy">
              Editorial team
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {AUTHORS.map((author) => (
                <div
                  key={author.id}
                  className="bg-white border border-border rounded-sm p-5 flex gap-4 items-center"
                >
                  <div className="relative shrink-0 w-[52px] h-[52px] rounded-full overflow-hidden">
                    <Image
                      src={author.avatar}
                      alt={author.name}
                      fill
                      sizes="52px"
                      className="object-cover object-top"
                    />
                  </div>
                  <div>
                    <p className="font-serif font-bold text-navy leading-tight">{author.name}</p>
                    <p className="text-xs text-amber font-sans font-semibold mt-0.5">{author.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="bg-surface border border-border rounded-sm p-8 text-center">
            <h2 className="font-serif text-2xl font-bold text-navy mb-3">
              Work with iGaming Pulse
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6 max-w-xl mx-auto">
              We offer advertising placements, sponsored content packages, event media partnerships,
              and press release distribution. All commercial content is clearly labelled.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                href="/contact"
                className="bg-navy text-white font-sans font-semibold text-sm px-6 py-3 rounded-sm hover:bg-navy-light transition-colors"
              >
                Contact us
              </Link>
              <Link
                href="/newsletter"
                className="bg-amber text-navy font-sans font-semibold text-sm px-6 py-3 rounded-sm hover:bg-amber/90 transition-colors"
              >
                Subscribe to newsletter
              </Link>
            </div>
          </div>
        </div>

        <NewsletterWidget variant="banner" />
      </main>
      <Footer />
    </>
  );
}
