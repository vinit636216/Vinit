"use server";

import { prisma } from "@/lib/prisma";
import { contactSchema } from "@/lib/validations/contact";

export type ContactFormState = {
  status: "idle" | "success" | "error";
  message?: string;
};

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  // Honeypot field — real users never fill this in (it's visually hidden).
  const honeypot = String(formData.get("company") ?? "");
  if (honeypot.trim() !== "") {
    return { status: "success" };
  }

  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    return { status: "error", message: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  await prisma.contactSubmission.create({ data: parsed.data });

  return { status: "success", message: "Thanks — I'll get back to you soon." };
}
