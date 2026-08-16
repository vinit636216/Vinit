"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  question: z.string().trim().min(1),
  answer: z.string().trim().min(1),
  order: z.coerce.number().int().default(0),
});

async function requireAdmin() {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
}

function revalidateAll() {
  revalidatePath("/admin/faq");
  revalidatePath("/about");
}

export async function createFaqItem(formData: FormData) {
  await requireAdmin();
  const data = schema.parse(Object.fromEntries(formData));
  await prisma.faqItem.create({ data });
  revalidateAll();
  redirect("/admin/faq");
}

export async function updateFaqItem(id: string, formData: FormData) {
  await requireAdmin();
  const data = schema.parse(Object.fromEntries(formData));
  await prisma.faqItem.update({ where: { id }, data });
  revalidateAll();
  redirect("/admin/faq");
}

export async function deleteFaqItem(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id"));
  await prisma.faqItem.delete({ where: { id } });
  revalidateAll();
}
