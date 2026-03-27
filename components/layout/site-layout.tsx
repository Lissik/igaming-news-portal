import { Suspense } from "react";
import { Header } from "./header";
import { Footer } from "./footer";

function HeaderFallback() {
  return (
    <div className="sticky top-0 z-50 h-16 bg-white/95 border-b border-border shadow-sm" aria-hidden="true" />
  );
}

export function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Suspense fallback={<HeaderFallback />}>
        <Header />
      </Suspense>
      <main>{children}</main>
      <Footer />
    </>
  );
}
