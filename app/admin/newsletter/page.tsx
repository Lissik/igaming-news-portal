import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { Mail, TrendingUp, Users, MousePointerClick } from "lucide-react";

const MOCK_SUBSCRIBERS = [
  { email: "james.whitfield@agency.com", date: "2026-01-08", source: "Homepage" },
  { email: "sofia.e@affiliatepro.net", date: "2026-01-14", source: "Article page" },
  { email: "marcus@compliancehub.eu", date: "2026-01-19", source: "Newsletter page" },
  { email: "priya.s@fintechgroup.io", date: "2026-01-25", source: "Homepage" },
  { email: "anton.v@b2banalytics.co", date: "2026-02-02", source: "Article page" },
  { email: "helena.b@affiliate.se", date: "2026-02-10", source: "Article page" },
  { email: "ravi.g@paytechinsights.com", date: "2026-02-17", source: "Newsletter page" },
  { email: "contact@igaming-media.eu", date: "2026-02-24", source: "Homepage" },
  { email: "anna.k@slotsstudio.gg", date: "2026-03-03", source: "Article page" },
  { email: "thomas.m@regwatch.co.uk", date: "2026-03-10", source: "Homepage" },
];

const ISSUES = [
  { date: "20 Mar 2026", subject: "Flutter $6.2B; EU Licensing; ICE Recap", openRate: "49.1%", clickRate: "6.4%", sent: 5024 },
  { date: "13 Mar 2026", subject: "UK Affordability Deadline; Betsson LatAm; Crypto Surge", openRate: "47.8%", clickRate: "5.9%", sent: 4962 },
  { date: "6 Mar 2026", subject: "Evolution Q4 Record; GiGE Preview; AI in Compliance", openRate: "51.3%", clickRate: "7.1%", sent: 4905 },
  { date: "27 Feb 2026", subject: "White Paper Enforcement; PENN M&A; SEA Licensing", openRate: "46.2%", clickRate: "5.5%", sent: 4833 },
  { date: "20 Feb 2026", subject: "Crypto Payments Report; ICE London Preview; UKGC Update", openRate: "48.5%", clickRate: "6.0%", sent: 4771 },
];

export default function AdminNewsletterPage() {
  return (
    <div className="flex min-h-screen bg-surface">
      <AdminSidebar />

      <div className="flex-1 overflow-auto">
        {/* Top bar */}
        <div className="bg-white border-b border-border px-8 py-4 sticky top-0 z-30">
          <h1 className="font-serif text-xl font-bold text-navy">Newsletter</h1>
          <p className="text-xs text-muted-foreground font-sans">Subscriber management and campaign history</p>
        </div>

        <div className="px-8 py-8 flex flex-col gap-8">
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Total Subscribers", value: "5,024", icon: Users, delta: "+127 this week" },
              { label: "Avg Open Rate", value: "48.6%", icon: Mail, delta: "+2.1% vs last month" },
              { label: "Avg Click Rate", value: "6.2%", icon: MousePointerClick, delta: "+0.4% vs last month" },
              { label: "Issues Sent", value: "12", icon: TrendingUp, delta: "Since Jan 2026" },
            ].map(({ label, value, icon: Icon, delta }) => (
              <div key={label} className="bg-white border border-border rounded-sm p-5">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-sans text-muted-foreground">{label}</p>
                  <Icon className="w-4 h-4 text-amber" />
                </div>
                <p className="font-serif text-2xl font-bold text-navy">{value}</p>
                <p className="text-xs text-muted-foreground font-sans mt-1">{delta}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {/* Recent subscribers */}
            <div className="bg-white border border-border rounded-sm">
              <div className="px-6 py-4 border-b border-border flex items-center justify-between">
                <h2 className="font-serif font-bold text-navy">Recent Subscribers</h2>
                <span className="text-xs font-sans text-muted-foreground">Latest 10</span>
              </div>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-surface">
                    <th className="text-left px-5 py-3 text-xs font-sans font-semibold text-muted-foreground uppercase tracking-wider">Email</th>
                    <th className="text-left px-4 py-3 text-xs font-sans font-semibold text-muted-foreground uppercase tracking-wider hidden md:table-cell">Source</th>
                    <th className="text-right px-5 py-3 text-xs font-sans font-semibold text-muted-foreground uppercase tracking-wider">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {MOCK_SUBSCRIBERS.map((s) => (
                    <tr key={s.email} className="hover:bg-surface transition-colors">
                      <td className="px-5 py-3 text-sm font-sans text-foreground/80 truncate max-w-48">{s.email}</td>
                      <td className="px-4 py-3 text-xs font-sans text-muted-foreground hidden md:table-cell">{s.source}</td>
                      <td className="px-5 py-3 text-xs font-sans text-muted-foreground text-right">
                        {new Date(s.date).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Past issues */}
            <div className="bg-white border border-border rounded-sm">
              <div className="px-6 py-4 border-b border-border">
                <h2 className="font-serif font-bold text-navy">Past Issues</h2>
              </div>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-surface">
                    <th className="text-left px-5 py-3 text-xs font-sans font-semibold text-muted-foreground uppercase tracking-wider">Issue</th>
                    <th className="text-right px-4 py-3 text-xs font-sans font-semibold text-muted-foreground uppercase tracking-wider">Open</th>
                    <th className="text-right px-5 py-3 text-xs font-sans font-semibold text-muted-foreground uppercase tracking-wider">Click</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {ISSUES.map((issue) => (
                    <tr key={issue.date} className="hover:bg-surface transition-colors">
                      <td className="px-5 py-3">
                        <p className="text-xs font-sans font-semibold text-amber mb-0.5">{issue.date}</p>
                        <p className="text-sm font-sans text-foreground/80 line-clamp-1">{issue.subject}</p>
                      </td>
                      <td className="px-4 py-3 text-sm font-sans font-semibold text-navy text-right">{issue.openRate}</td>
                      <td className="px-5 py-3 text-sm font-sans font-semibold text-navy text-right">{issue.clickRate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
