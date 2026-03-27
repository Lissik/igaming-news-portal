"use client";

import { useState } from "react";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { CheckCircle, Save } from "lucide-react";

export default function AdminSettingsPage() {
  const [saved, setSaved] = useState(false);
  const [siteName, setSiteName] = useState("iGaming Pulse");
  const [tagline, setTagline] = useState("Independent iGaming Industry News");
  const [contactEmail, setContactEmail] = useState("editorial@igamingpulse.com");
  const [articlesPerPage, setArticlesPerPage] = useState("12");
  const [enableComments, setEnableComments] = useState(true);
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  return (
    <div className="flex min-h-screen bg-surface">
      <AdminSidebar />

      <div className="flex-1 overflow-auto">
        <div className="bg-white border-b border-border px-8 py-4 flex items-center justify-between sticky top-0 z-30">
          <div>
            <h1 className="font-serif text-xl font-bold text-navy">Site Settings</h1>
            <p className="text-xs text-muted-foreground font-sans">Global configuration for iGaming Pulse</p>
          </div>
          {saved && (
            <span className="flex items-center gap-1.5 text-sm text-green-600 font-sans">
              <CheckCircle className="w-4 h-4" />
              Settings saved
            </span>
          )}
        </div>

        <form onSubmit={handleSave} className="px-8 py-8 max-w-2xl flex flex-col gap-8">
          {/* General */}
          <div className="bg-white border border-border rounded-sm p-6 flex flex-col gap-5">
            <h2 className="font-sans font-semibold text-sm text-foreground border-b border-border pb-3">
              General
            </h2>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-sans font-semibold text-foreground uppercase tracking-wider">
                Site Name
              </label>
              <input
                type="text"
                value={siteName}
                onChange={(e) => setSiteName(e.target.value)}
                className="border border-border rounded-sm px-4 py-2.5 text-sm font-sans bg-white focus:outline-none focus:border-navy transition-colors"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-sans font-semibold text-foreground uppercase tracking-wider">
                Tagline
              </label>
              <input
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                className="border border-border rounded-sm px-4 py-2.5 text-sm font-sans bg-white focus:outline-none focus:border-navy transition-colors"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-sans font-semibold text-foreground uppercase tracking-wider">
                Contact Email
              </label>
              <input
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                className="border border-border rounded-sm px-4 py-2.5 text-sm font-sans bg-white focus:outline-none focus:border-navy transition-colors"
              />
            </div>
          </div>

          {/* Content */}
          <div className="bg-white border border-border rounded-sm p-6 flex flex-col gap-5">
            <h2 className="font-sans font-semibold text-sm text-foreground border-b border-border pb-3">
              Content
            </h2>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-sans font-semibold text-foreground uppercase tracking-wider">
                Articles per page
              </label>
              <select
                value={articlesPerPage}
                onChange={(e) => setArticlesPerPage(e.target.value)}
                className="border border-border rounded-sm px-4 py-2.5 text-sm font-sans bg-white focus:outline-none focus:border-navy transition-colors w-32"
              >
                {["9", "12", "15", "18", "24"].map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </div>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={enableComments}
                onChange={(e) => setEnableComments(e.target.checked)}
                className="w-4 h-4 accent-navy"
              />
              <div>
                <span className="text-sm font-sans text-foreground font-medium">Enable comments</span>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Allow readers to post comments on articles
                </p>
              </div>
            </label>
          </div>

          {/* Danger zone */}
          <div className="bg-white border border-red-200 rounded-sm p-6 flex flex-col gap-4">
            <h2 className="font-sans font-semibold text-sm text-red-600 border-b border-red-100 pb-3">
              Danger Zone
            </h2>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={maintenanceMode}
                onChange={(e) => setMaintenanceMode(e.target.checked)}
                className="w-4 h-4 accent-red-500"
              />
              <div>
                <span className="text-sm font-sans text-foreground font-medium">Maintenance mode</span>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Displays a maintenance page to all visitors. Admin access remains active.
                </p>
              </div>
            </label>
          </div>

          <button
            type="submit"
            className="self-start flex items-center gap-2 bg-navy text-white font-sans font-semibold text-sm px-6 py-3 rounded-sm hover:bg-navy-light transition-colors"
          >
            <Save className="w-4 h-4" />
            Save Settings
          </button>
        </form>
      </div>
    </div>
  );
}
