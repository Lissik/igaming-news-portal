"use server";

export async function submitNewsletter(email: string) {
  const res = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      access_key: process.env.WEB3FORMS_ACCESS_KEY,
      subject: "New Newsletter Subscription — iGaming Pulse",
      from_name: "iGaming Pulse Newsletter",
      replyto: email,
      email: "illia@virtuwise.io",
      message: `New newsletter subscription request.\n\nEmail: ${email}`,
    }),
  });
  const data = await res.json();
  return { success: data.success === true };
}

export async function submitContact(fields: {
  name: string;
  company: string;
  email: string;
  enquiryType: string;
  message: string;
}) {
  const res = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      access_key: process.env.WEB3FORMS_ACCESS_KEY,
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
  return { success: data.success === true };
}
