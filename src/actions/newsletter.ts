"use server";

import { prisma } from "@/lib/prisma";
import { newsletterSchema } from "@/lib/validations/contact";

export type NewsletterFormState = {
  status: "idle" | "success" | "error";
  message?: string;
};

export async function subscribeNewsletter(
  _prevState: NewsletterFormState,
  formData: FormData
): Promise<NewsletterFormState> {
  const parsed = newsletterSchema.safeParse({ email: formData.get("email") });

  if (!parsed.success) {
    return { status: "error", message: parsed.error.issues[0]?.message ?? "Invalid email" };
  }

  try {
    await prisma.newsletterSubscriber.create({ data: parsed.data });
  } catch {
    // Unique constraint (already subscribed) — treat as success to avoid email enumeration.
  }

  return { status: "success", message: "Subscribed!" };
}
