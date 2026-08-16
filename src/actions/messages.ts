"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

async function requireAdmin() {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
}

export async function markMessageRead(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id"));
  await prisma.contactSubmission.update({ where: { id }, data: { read: true } });
  revalidatePath("/admin/messages");
  revalidatePath("/admin");
}

export async function deleteMessage(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id"));
  await prisma.contactSubmission.delete({ where: { id } });
  revalidatePath("/admin/messages");
  revalidatePath("/admin");
}

export async function deleteSubscriber(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id"));
  await prisma.newsletterSubscriber.delete({ where: { id } });
  revalidatePath("/admin/newsletter");
  revalidatePath("/admin");
}
