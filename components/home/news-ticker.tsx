"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

interface TickerItem {
  title: string;
  slug: string;
}

interface NewsTickerProps {
  items: TickerItem[];
}

export function NewsTicker({ items }: NewsTickerProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [duration, setDuration] = useState(40);

  // Calculate animation duration based on total text width so speed is constant
  useEffect(() => {
    if (trackRef.current) {
      const width = trackRef.current.scrollWidth / 2; // divided by 2 because we duplicate
      // ~160px per second (2x speed)
      setDuration(Math.max(10, width / 160));
    }
  }, [items]);

  // Duplicate items so the loop is seamless
  const doubled = [...items, ...items];

  return (
    <div className="bg-navy text-white py-2 overflow-hidden select-none">
      <div className="flex items-center">
        {/* Static badge */}
        <div className="shrink-0 z-10 bg-navy pl-4 pr-3 flex items-center self-stretch">
          <span className="bg-amber text-navy text-xs font-sans font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm">
            Latest
          </span>
        </div>

        {/* Scrolling track */}
        <div className="flex-1 overflow-hidden relative">
          {/* Left fade */}
          <div className="absolute left-0 top-0 h-full w-6 bg-gradient-to-r from-navy to-transparent z-10 pointer-events-none" />
          {/* Right fade */}
          <div className="absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-navy to-transparent z-10 pointer-events-none" />

          <div
            ref={trackRef}
            className="flex whitespace-nowrap"
            style={{
              animation: `ticker-scroll ${duration}s linear infinite`,
            }}
          >
            {doubled.map((item, i) => (
              <span key={i} className="inline-flex items-center">
                <Link
                  href={`/en/article/${item.slug}`}
                  className="text-sm text-white/85 font-sans hover:text-amber transition-colors duration-150 cursor-pointer"
                >
                  {item.title}
                </Link>
                <span className="mx-5 text-white/30 text-xs">·</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
