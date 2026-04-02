"use server";

const ACCESS_KEY = "a69e661a-d15b-4f55-b7dc-2ae06acc4368";

export async function submitNewsletter(email: string) {
  const formData = new FormData();
  formData.append("access_key", ACCESS_KEY);
  formData.append("subject", "New Newsletter Subscription — iGaming Pulse");
  formData.append("from_name", "iGaming Pulse Newsletter");
  formData.append("email", email);
  formData.append("message", `New newsletter subscription request.\n\nEmail: ${email}`);

  const res = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    body: formData,
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
  const formData = new FormData();
  formData.append("access_key", ACCESS_KEY);
  formData.append("subject", `Contact Form: ${fields.enquiryType} — iGaming Pulse`);
  formData.append("from_name", fields.name);
  formData.append("replyto", fields.email);
  formData.append("email", fields.email);
  formData.append(
    "message",
    `Name: ${fields.name}
Company: ${fields.company || "—"}
Email: ${fields.email}
Enquiry type: ${fields.enquiryType}

Message:
${fields.message}`
  );

  const res = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    body: formData,
  });
  const data = await res.json();
  return { success: data.success === true };
}
