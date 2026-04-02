"use server";

const ACCESS_KEY = "a69e661a-d15b-4f55-b7dc-2ae06acc4368";

export async function submitNewsletter(email: string) {
  const res = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      access_key: ACCESS_KEY,
      subject: "New Newsletter Subscription — iGaming Pulse",
      from_name: "iGaming Pulse Newsletter",
      replyto: email,
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
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      access_key: ACCESS_KEY,
      subject: `Contact Form: ${fields.enquiryType} — iGaming Pulse`,
      from_name: fields.name,
      replyto: fields.email,
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
