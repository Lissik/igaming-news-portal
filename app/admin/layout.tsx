import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Admin — iGaming Wire CMS",
    template: "%s | Admin — iGaming Wire",
  },
  description: "iGaming Wire editorial dashboard",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
