"use client";

import Link from "next/link";
import { useState, Suspense } from "react";
import { Search, Menu, X, Globe, ChevronDown } from "lucide-react";
import { CATEGORIES } from "@/lib/data";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

const NAV_ITEMS = [
  { label: "News", href: "/en" },
  { label: "Affiliates", href: "/en/category/affiliates" },
  { label: "Operators", href: "/en/category/operators" },
  { label: "Regulation", href: "/en/category/regulation" },
  { label: "Payments", href: "/en/category/payments-fintech" },
  { label: "Slots", href: "/en/category/slots-game-providers" },
  { label: "Events", href: "/en/category/conferences-events" },
  { label: "More", href: "#", hasDropdown: true },
];

const MORE_ITEMS = [
  { label: "Marketing & Traffic", href: "/en/category/marketing-traffic" },
  { label: "Industry Services", href: "/en/category/industry-services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const LANGUAGES = [
  { code: "en", label: "EN", active: true },
  { code: "bg", label: "BG", active: false },
  { code: "de", label: "DE", active: false },
  { code: "ru", label: "RU", active: false },
];

function SearchForm({
  onClose,
}: {
  onClose: () => void;
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/en/search?q=${encodeURIComponent(searchQuery.trim())}`);
      onClose();
      setSearchQuery("");
    }
  }

  return (
    <form onSubmit={handleSearch} className="flex items-center gap-2">
      <Input
        autoFocus
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search articles..."
        className="h-8 w-48 text-sm"
      />
      <button
        type="button"
        onClick={onClose}
        className="p-1.5 text-muted-foreground hover:text-navy"
      >
        <X className="w-4 h-4" />
      </button>
    </form>
  );
}

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  return (
    <>
      {/* Top bar */}
      <div className="bg-navy text-primary-foreground text-xs py-1.5 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <span className="text-white/60 font-sans tracking-wide">
            Independent iGaming Industry Media — Est. January 2026
          </span>
          <div className="flex items-center gap-4">
            <span className="text-white/60">Newsletter</span>
            <Link href="/newsletter" className="text-amber hover:text-amber/80 transition-colors font-medium">
              Subscribe Free
            </Link>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/en" className="flex items-center gap-2 shrink-0">
              <div className="w-8 h-8 bg-navy rounded flex items-center justify-center">
                <span className="text-white font-serif font-bold text-sm leading-none">iG</span>
              </div>
              <div className="hidden sm:block">
                <span className="font-serif font-bold text-navy text-xl leading-none tracking-tight">
                  iGaming<span className="text-amber">Pulse</span>
                </span>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
              {NAV_ITEMS.map((item) =>
                item.hasDropdown ? (
                  <div key={item.label} className="relative">
                    <button
                      onClick={() => setMoreOpen(!moreOpen)}
                      className="flex items-center gap-1 px-3 py-2 text-sm font-sans font-medium text-foreground/70 hover:text-navy transition-colors rounded-sm hover:bg-surface"
                    >
                      {item.label}
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform ${moreOpen ? "rotate-180" : ""}`} />
                    </button>
                    {moreOpen && (
                      <div className="absolute top-full right-0 mt-1 w-52 bg-white border border-border rounded shadow-lg z-50 py-1">
                        {MORE_ITEMS.map((sub) => (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            onClick={() => setMoreOpen(false)}
                            className="block px-4 py-2 text-sm text-foreground/70 hover:text-navy hover:bg-surface transition-colors"
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="px-3 py-2 text-sm font-sans font-medium text-foreground/70 hover:text-navy transition-colors rounded-sm hover:bg-surface"
                  >
                    {item.label}
                  </Link>
                )
              )}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-2">
              {/* Search */}
              {searchOpen ? (
                <Suspense fallback={null}>
                  <SearchForm onClose={() => setSearchOpen(false)} />
                </Suspense>
              ) : (
                <button
                  onClick={() => setSearchOpen(true)}
                  aria-label="Open search"
                  className="p-2 text-muted-foreground hover:text-navy transition-colors"
                >
                  <Search className="w-4.5 h-4.5" />
                </button>
              )}

              {/* Language switcher */}
              <div className="hidden md:flex items-center gap-1 border-l border-border pl-2 ml-1">
                <Globe className="w-3.5 h-3.5 text-muted-foreground" />
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    disabled={!lang.active}
                    className={`text-xs font-medium px-1.5 py-0.5 rounded transition-colors ${
                      lang.active
                        ? "text-navy font-bold"
                        : "text-muted-foreground cursor-not-allowed opacity-40"
                    }`}
                    title={lang.active ? `Switch to ${lang.label}` : "Coming soon"}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>

              {/* Mobile menu toggle */}
              <button
                className="lg:hidden p-2 text-muted-foreground hover:text-navy transition-colors"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle mobile menu"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-border bg-white">
            <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1" aria-label="Mobile navigation">
              <Link href="/en" onClick={() => setMobileOpen(false)} className="py-2.5 px-2 text-sm font-medium text-foreground/70 hover:text-navy border-b border-border/50">
                Latest News
              </Link>
              {Object.values(CATEGORIES).map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/en/category/${cat.slug}`}
                  onClick={() => setMobileOpen(false)}
                  className="py-2.5 px-2 text-sm font-medium text-foreground/70 hover:text-navy border-b border-border/50"
                >
                  {cat.label}
                </Link>
              ))}
              <Link href="/about" onClick={() => setMobileOpen(false)} className="py-2.5 px-2 text-sm font-medium text-foreground/70 hover:text-navy border-b border-border/50">
                About
              </Link>
              <Link href="/contact" onClick={() => setMobileOpen(false)} className="py-2.5 px-2 text-sm font-medium text-foreground/70 hover:text-navy">
                Contact
              </Link>
              <div className="pt-3 flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Languages:</span>
                {LANGUAGES.map((lang) => (
                  <span
                    key={lang.code}
                    className={`text-xs font-medium ${lang.active ? "text-navy font-bold" : "text-muted-foreground opacity-40"}`}
                  >
                    {lang.label}
                  </span>
                ))}
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Search overlay on mobile */}
    </>
  );
}
