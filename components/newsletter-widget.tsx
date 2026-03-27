"use client";

import { useState } from "react";
import { Mail, ArrowRight } from "lucide-react";

interface NewsletterWidgetProps {
  variant?: "banner" | "sidebar" | "compact";
}

export function NewsletterWidget({ variant = "banner" }: NewsletterWidgetProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setSubmitted(true);
  }

  if (variant === "sidebar") {
    return (
      <div className="bg-navy text-white rounded-sm p-5">
        <div className="flex items-center gap-2 mb-3">
          <Mail className="w-4 h-4 text-amber" />
          <h3 className="font-serif font-bold text-base">Newsletter</h3>
        </div>
        <p className="text-white/70 text-sm leading-relaxed mb-4">
          Weekly insights from the iGaming industry. Free.
        </p>
        {submitted ? (
          <p className="text-amber text-sm font-medium">Thank you! You&apos;re subscribed.</p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="w-full bg-white/10 border border-white/20 text-white placeholder-white/40 text-sm px-3 py-2 rounded-sm focus:outline-none focus:border-amber"
            />
            {error && <p className="text-red-400 text-xs">{error}</p>}
            <button
              type="submit"
              className="w-full bg-amber text-navy text-sm font-semibold py-2 rounded-sm hover:bg-amber/90 transition-colors flex items-center justify-center gap-2"
            >
              Subscribe <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        )}
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <div className="bg-surface border border-border rounded-sm p-4">
        <p className="text-sm font-sans font-semibold text-foreground mb-3">
          Get iGaming Wire in your inbox
        </p>
        {submitted ? (
          <p className="text-amber text-sm font-medium">Thank you! You&apos;re subscribed.</p>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              className="flex-1 bg-white border border-border text-foreground placeholder-muted-foreground text-sm px-3 py-2 rounded-sm focus:outline-none focus:border-navy min-w-0"
            />
            <button
              type="submit"
              className="bg-navy text-white text-sm font-semibold px-4 py-2 rounded-sm hover:bg-navy-light transition-colors shrink-0"
            >
              Subscribe
            </button>
          </form>
        )}
        {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
      </div>
    );
  }

  // Banner variant
  return (
    <section className="bg-navy text-white">
      <div className="max-w-7xl mx-auto px-4 py-14 md:py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full mb-5">
            <Mail className="w-4 h-4 text-amber" />
            <span className="text-xs font-sans font-semibold uppercase tracking-wider text-white/80">
              Newsletter
            </span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4 text-balance">
            Stay ahead of the iGaming industry
          </h2>
          <p className="text-white/70 leading-relaxed mb-8 text-lg">
            Weekly briefings covering regulation, operator moves, B2B deals, and market analysis — delivered free to your inbox every Thursday.
          </p>
          {submitted ? (
            <div className="bg-white/10 rounded-sm px-6 py-4 inline-block">
              <p className="text-amber font-semibold text-lg">You&apos;re subscribed. Welcome aboard.</p>
              <p className="text-white/60 text-sm mt-1">Expect your first issue next Thursday.</p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 bg-white/10 border border-white/20 text-white placeholder-white/40 px-4 py-3 rounded-sm focus:outline-none focus:border-amber text-sm"
              />
              <button
                type="submit"
                className="bg-amber text-navy font-semibold px-6 py-3 rounded-sm hover:bg-amber/90 transition-colors flex items-center justify-center gap-2 text-sm whitespace-nowrap"
              >
                Subscribe Free <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
          {error && <p className="text-red-400 text-sm mt-3">{error}</p>}
          <p className="text-white/40 text-xs mt-4 font-sans">
            No spam. Unsubscribe at any time. 5,000+ industry professionals already subscribed.
          </p>
        </div>
      </div>
    </section>
  );
}
