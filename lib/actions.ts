"use server";

export async function submitNewsletter(email: string) {
  try {
    const key = process.env.WEB3FORMS_ACCESS_KEY;
    console.log("[v0] submitNewsletter key present:", !!key);
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: key,
        subject: "New Newsletter Subscription — iGaming Pulse",
        from_name: "iGaming Pulse Newsletter",
        replyto: email,
        email: "illia@virtuwise.io",
        message: `New newsletter subscription request.\n\nEmail: ${email}`,
      }),
    });
    const data = await res.json();
    console.log("[v0] submitNewsletter response:", JSON.stringify(data));
    return { success: data.success === true };
  } catch (err) {
    console.log("[v0] submitNewsletter error:", err);
    return { success: false };
  }
}

export async function submitContact(fields: {
  name: string;
  company: string;
  email: string;
  enquiryType: string;
  message: string;
}) {
  try {
    const key = process.env.WEB3FORMS_ACCESS_KEY;
    console.log("[v0] submitContact key present:", !!key);
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: key,
        subject: `Contact Form: ${fields.enquiryType} — iGaming Pulse`,
        from_name: fields.name,
        replyto: fields.email,
        email: "illia@virtuwise.io",
        message: `Name: ${fields.name}
Company: ${fields.company || "—"}
Email: ${fields.email}
Enquiry type: ${fields.enquiryType}

Message:
${fields.message}`,
      }),
    });
    const data = await res.json();
    console.log("[v0] submitContact response:", JSON.stringify(data));
    return { success: data.success === true };
  } catch (err) {
    console.log("[v0] submitContact error:", err);
    return { success: false };
  }
}
