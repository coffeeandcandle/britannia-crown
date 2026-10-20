// The email a customer receives after paying. Kept free of imports so the wording is easy to test.
// Plain text on purpose: it reads well everywhere and never lands in promotions or spam folders.
export function orderConfirmationEmail(o: {
  name: string;
  productName: string;
  amountLabel: string;
  siteUrl: string;
  contactEmail: string;
}) {
  const first = o.name.trim().split(/\s+/)[0] ?? "";
  const lines = [
    first ? `Hello ${first},` : "Hello,",
    "",
    `Thank you for your order. We've received your payment for ${o.productName}${o.amountLabel ? ` (${o.amountLabel})` : ""}.`,
    "",
    "What happens next",
    "- An education consultant will contact you within one working day to confirm your child's details and goals.",
    "- Your consultant then sets out the plan and the first steps, and matches a tutor where needed.",
    "",
    "Your client portal",
    "Your purchase is saved in your Britannia Crown client portal, where you will also find lessons, tutor notes and receipts.",
    `Sign in at ${o.siteUrl}/portal/sign-in using this email address. The first time, choose "Sign up" and use the same address you gave when you paid.`,
    "",
    `Stripe will email your payment receipt separately. If anything looks wrong, or you would like to speak sooner, just reply to this email or write to ${o.contactEmail}.`,
    "",
    "Kind regards,",
    "The Britannia Crown team",
  ];
  return { subject: "Your Britannia Crown order is confirmed", text: lines.join("\n") };
}
