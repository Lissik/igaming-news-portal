import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Admin — iGaming Pulse CMS",
    template: "%s | Admin — iGaming Pulse",
  },
  description: "iGaming Pulse editorial dashboard",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
