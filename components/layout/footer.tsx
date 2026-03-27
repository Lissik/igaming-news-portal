import Link from "next/link";
import Image from "next/image";
import { Twitter, Linkedin, Globe } from "lucide-react";
import { CATEGORIES } from "@/lib/data";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy text-white">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/en" className="flex items-center gap-2 mb-4">
              <Image
                src="/logo.png"
                alt="iGaming Pulse Media waveform"
                width={36}
                height={36}
                className="w-9 h-9 object-contain brightness-0 invert"
              />
              <span className="font-serif font-bold text-xl text-white">
                iGaming<span className="text-amber">Pulse</span>
              </span>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mb-5">
              Independent B2B media for the global iGaming industry. Credible, neutral, editorial. Launched January 2026.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow on X (Twitter)"
                className="w-8 h-8 rounded bg-white/10 flex items-center justify-center text-white/70 hover:bg-amber hover:text-navy transition-colors"
              >
                <Twitter className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow on LinkedIn"
                className="w-8 h-8 rounded bg-white/10 flex items-center justify-center text-white/70 hover:bg-amber hover:text-navy transition-colors"
              >
                <Linkedin className="w-3.5 h-3.5" />
              </a>
              <a
                href="#"
                aria-label="Language options"
                className="w-8 h-8 rounded bg-white/10 flex items-center justify-center text-white/70 hover:bg-amber hover:text-navy transition-colors"
              >
                <Globe className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-sans font-semibold text-white text-sm uppercase tracking-wider mb-4">
              Categories
            </h3>
            <ul className="flex flex-col gap-2">
              {Object.values(CATEGORIES)
                .slice(0, 5)
                .map((cat) => (
                  <li key={cat.slug}>
                    <Link
                      href={`/en/category/${cat.slug}`}
                      className="text-sm text-white/60 hover:text-amber transition-colors"
                    >
                      {cat.label}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>

          {/* More categories + company */}
          <div>
            <h3 className="font-sans font-semibold text-white text-sm uppercase tracking-wider mb-4">
              More
            </h3>
            <ul className="flex flex-col gap-2">
              {Object.values(CATEGORIES)
                .slice(5)
                .map((cat) => (
                  <li key={cat.slug}>
                    <Link
                      href={`/en/category/${cat.slug}`}
                      className="text-sm text-white/60 hover:text-amber transition-colors"
                    >
                      {cat.label}
                    </Link>
                  </li>
                ))}
              <li className="mt-2">
                <Link href="/about" className="text-sm text-white/60 hover:text-amber transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-white/60 hover:text-amber transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-sans font-semibold text-white text-sm uppercase tracking-wider mb-4">
              Newsletter
            </h3>
            <p className="text-sm text-white/60 leading-relaxed mb-4">
              Industry news delivered to your inbox. Join 5,000+ iGaming professionals.
            </p>
            <Link
              href="/newsletter"
              className="inline-block bg-amber text-navy text-sm font-semibold px-4 py-2 rounded hover:bg-amber/90 transition-colors"
            >
              Subscribe Free
            </Link>
            <div className="mt-6">
              <h4 className="font-sans font-semibold text-white text-xs uppercase tracking-wider mb-3">
                Media Partnerships
              </h4>
              <Link
                href="/contact"
                className="text-sm text-white/60 hover:text-amber transition-colors"
              >
                Partner with iGaming Pulse &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/40 font-sans">
            &copy; {currentYear} iGaming Pulse. All rights reserved. Independent editorial media.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="text-xs text-white/40 hover:text-white/70 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-xs text-white/40 hover:text-white/70 transition-colors">
              Terms of Use
            </Link>
            <span className="text-xs text-white/30">|</span>
            <span className="text-xs text-white/40">English (EN)</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
