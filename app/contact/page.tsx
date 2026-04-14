"use client";

import { useState, Suspense } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Mail, Send, CheckCircle, Newspaper, BarChart2, CalendarDays } from "lucide-react";
const WEB3FORMS_KEY = "a69e661a-d15b-4f55-b7dc-2ae06acc4368";

const ENQUIRY_TYPES = [
  { value: "press-release", label: "Press release submission" },
  { value: "advertising", label: "Advertising & sponsorship" },
  { value: "editorial", label: "Editorial enquiry" },
  { value: "media-partnership", label: "Event / media partnership" },
  { value: "other", label: "Other" },
];

const ADVERTISING_OPTIONS = [
  {
    icon: <BarChart2 className="w-5 h-5 text-amber" />,
    title: "Display Advertising",
    description:
      "Leaderboard (970×90), half-page (300×600), and rectangle (300×250) placements across all content pages. CPM or monthly flat-rate packages available.",
  },
  {
    icon: <Newspaper className="w-5 h-5 text-amber" />,
    title: "Sponsored Content",
    description:
      "Long-form articles, product spotlights, company profiles, and thought leadership pieces. Clearly labelled as sponsored. Minimum 800 words.",
  },
  {
    icon: <CalendarDays className="w-5 h-5 text-amber" />,
    title: "Event Partnerships",
    description:
      "Official media partner packages for iGaming conferences and events. Includes dedicated coverage, banner placements, and newsletter mentions.",
  },
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    enquiryType: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState("");

  function validate() {
    const newErrors: Record<string, string> = {};
    if (!form.name.trim()) newErrors.name = "Name is required.";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = "Valid email is required.";
    if (!form.enquiryType) newErrors.enquiryType = "Please select an enquiry type.";
    if (!form.message.trim() || form.message.trim().length < 20)
      newErrors.message = "Message must be at least 20 characters.";
    return newErrors;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const v = validate();
    if (Object.keys(v).length > 0) {
      setErrors(v);
      return;
    }
    setErrors({});
    setServerError("");
    setLoading(true);
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `Contact Form: ${form.enquiryType} — iGaming Pulse`,
          from_name: form.name,
          replyto: form.email,
          message: `Name: ${form.name}\nCompany: ${form.company || "—"}\nEmail: ${form.email}\nEnquiry type: ${form.enquiryType}\n\nMessage:\n${form.message}`,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        setServerError(data.message || "Something went wrong. Please try again.");
      }
    } catch {
      setServerError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Suspense fallback={null}><Header /></Suspense>
      <main>
        {/* Page header */}
        <div className="bg-navy text-white py-12">
          <div className="max-w-4xl mx-auto px-4">
            <h1 className="font-serif text-3xl md:text-4xl font-bold mb-3">Contact iGaming Pulse</h1>
            <p className="text-white/65 leading-relaxed max-w-xl">
              For press releases, advertising enquiries, event partnerships, or editorial matters — get in touch with our team.
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left: form */}
            <div className="lg:col-span-2">
              {submitted ? (
                <div className="bg-surface border border-border rounded-sm p-10 text-center">
                  <CheckCircle className="w-12 h-12 text-amber mx-auto mb-4" />
                  <h2 className="font-serif text-2xl font-bold text-navy mb-3">Message received</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Thank you for reaching out. A member of our team will respond within 1–2 business days.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="name" className="text-sm font-sans font-medium text-foreground">
                        Full name <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="name"
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="James Whitfield"
                        className={`border rounded-sm px-3 py-2.5 text-sm font-sans bg-white focus:outline-none focus:border-navy transition-colors ${
                          errors.name ? "border-red-400" : "border-border"
                        }`}
                      />
                      {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="company" className="text-sm font-sans font-medium text-foreground">
                        Company
                      </label>
                      <input
                        id="company"
                        type="text"
                        value={form.company}
                        onChange={(e) => setForm({ ...form, company: e.target.value })}
                        placeholder="Acme iGaming Ltd"
                        className="border border-border rounded-sm px-3 py-2.5 text-sm font-sans bg-white focus:outline-none focus:border-navy transition-colors"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="email" className="text-sm font-sans font-medium text-foreground">
                      Email address <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="you@company.com"
                      className={`border rounded-sm px-3 py-2.5 text-sm font-sans bg-white focus:outline-none focus:border-navy transition-colors ${
                        errors.email ? "border-red-400" : "border-border"
                      }`}
                    />
                    {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="enquiryType" className="text-sm font-sans font-medium text-foreground">
                      Enquiry type <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="enquiryType"
                      value={form.enquiryType}
                      onChange={(e) => setForm({ ...form, enquiryType: e.target.value })}
                      className={`border rounded-sm px-3 py-2.5 text-sm font-sans bg-white focus:outline-none focus:border-navy transition-colors ${
                        errors.enquiryType ? "border-red-400" : "border-border"
                      }`}
                    >
                      <option value="">Select enquiry type...</option>
                      {ENQUIRY_TYPES.map((t) => (
                        <option key={t.value} value={t.value}>
                          {t.label}
                        </option>
                      ))}
                    </select>
                    {errors.enquiryType && (
                      <p className="text-xs text-red-500">{errors.enquiryType}</p>
                    )}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="message" className="text-sm font-sans font-medium text-foreground">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      rows={6}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Please describe your enquiry in detail..."
                      className={`border rounded-sm px-3 py-2.5 text-sm font-sans bg-white focus:outline-none focus:border-navy transition-colors resize-y ${
                        errors.message ? "border-red-400" : "border-border"
                      }`}
                    />
                    {errors.message && <p className="text-xs text-red-500">{errors.message}</p>}
                  </div>

                  {serverError && (
                    <p className="text-red-500 text-sm">{serverError}</p>
                  )}
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-navy text-white font-sans font-semibold text-sm px-8 py-3 rounded-sm hover:bg-navy-light transition-colors flex items-center gap-2 self-start disabled:opacity-60"
                  >
                    {loading ? "Sending…" : <><span>Send message</span> <Send className="w-4 h-4" /></>}
                  </button>
                </form>
              )}
            </div>

            {/* Right: info */}
            <aside className="flex flex-col gap-6">
              <div className="bg-surface border border-border rounded-sm p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Mail className="w-4 h-4 text-amber" />
                  <h3 className="font-sans font-semibold text-sm text-foreground">Direct contact</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-1">Partnerships &amp; General enquiries</p>
                <a href="mailto:partnerships@igamingpulse.com" className="text-sm font-medium text-navy hover:underline mb-3 block">partnerships@igamingpulse.com</a>
                <p className="text-sm text-muted-foreground mb-1">Press releases &amp; accreditation</p>
                <a href="mailto:press@igamingpulse.com" className="text-sm font-medium text-navy hover:underline block">press@igamingpulse.com</a>
              </div>

              <div>
                <h3 className="font-sans font-semibold text-sm text-foreground mb-3 pb-2 border-b border-border">
                  Response times
                </h3>
                <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
                  <li className="flex justify-between">
                    <span>General enquiries</span>
                    <span className="text-foreground font-medium">1–2 days</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Advertising</span>
                    <span className="text-foreground font-medium">Same day</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Press releases</span>
                    <span className="text-foreground font-medium">1 business day</span>
                  </li>
                </ul>
              </div>
            </aside>
          </div>

          {/* Advertising options */}
          <div className="mt-14">
            <h2 className="font-serif text-2xl font-bold text-navy mb-6 pb-3 border-b-2 border-navy">
              Advertising with iGaming Pulse
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {ADVERTISING_OPTIONS.map((opt) => (
                <div key={opt.title} className="bg-white border border-border rounded-sm p-6">
                  <div className="mb-3">{opt.icon}</div>
                  <h3 className="font-serif font-bold text-navy mb-2">{opt.title}</h3>
                  <p className="text-sm text-foreground/75 leading-relaxed">{opt.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
