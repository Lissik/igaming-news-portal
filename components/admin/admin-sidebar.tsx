"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  PlusCircle,
  Tag,
  Users,
  Mail,
  BarChart2,
  Settings,
  Globe,
  LogOut,
} from "lucide-react";

const NAV = [
  {
    group: "Content",
    items: [
      { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
      { label: "All Articles", href: "/admin/articles", icon: FileText },
      { label: "New Article", href: "/admin/articles/new", icon: PlusCircle },
      { label: "Categories", href: "/admin/categories", icon: Tag },
    ],
  },
  {
    group: "Audience",
    items: [
      { label: "Newsletter", href: "/admin/newsletter", icon: Mail },
      { label: "Authors", href: "/admin/authors", icon: Users },
    ],
  },
  {
    group: "Analytics",
    items: [
      { label: "Traffic", href: "/admin/analytics", icon: BarChart2 },
    ],
  },
  {
    group: "Settings",
    items: [
      { label: "Site Settings", href: "/admin/settings", icon: Settings },
    ],
  },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-60 shrink-0 bg-navy text-white flex flex-col min-h-screen">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-white/10">
        <Link href="/admin" className="flex items-center gap-2.5">
          <Image
            src="/logo.png"
            alt="iGaming Pulse Media"
            width={120}
            height={45}
            className="h-8 w-auto object-contain brightness-0 invert"
          />
          <span className="text-white/40 text-xs font-sans border-l border-white/20 pl-2.5">CMS</span>
        </Link>
      </div>

      {/* Nav groups */}
      <nav className="flex-1 px-3 py-5 overflow-y-auto" aria-label="Admin navigation">
        {NAV.map((group) => (
          <div key={group.group} className="mb-6">
            <p className="text-xs font-sans font-semibold uppercase tracking-wider text-white/30 px-2 mb-2">
              {group.group}
            </p>
            <ul className="flex flex-col gap-0.5">
              {group.items.map(({ label, href, icon: Icon }) => {
                const isActive =
                  href === "/admin"
                    ? pathname === "/admin"
                    : pathname.startsWith(href);
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      className={`flex items-center gap-2.5 px-3 py-2 rounded-sm text-sm font-sans transition-colors ${
                        isActive
                          ? "bg-white/15 text-white font-semibold"
                          : "text-white/60 hover:text-white hover:bg-white/10"
                      }`}
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Footer actions */}
      <div className="px-3 py-4 border-t border-white/10 flex flex-col gap-1">
        <Link
          href="/en"
          target="_blank"
          className="flex items-center gap-2.5 px-3 py-2 rounded-sm text-sm font-sans text-white/50 hover:text-white hover:bg-white/10 transition-colors"
        >
          <Globe className="w-4 h-4 shrink-0" />
          View site
        </Link>
        <button className="flex items-center gap-2.5 px-3 py-2 rounded-sm text-sm font-sans text-white/50 hover:text-white hover:bg-white/10 transition-colors w-full text-left">
          <LogOut className="w-4 h-4 shrink-0" />
          Sign out
        </button>
      </div>
    </aside>
  );
}
