"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  company: z.string().trim().min(1),
  role: z.string().trim().min(1),
  startDate: z.coerce.date(),
  endDate: z
    .string()
    .optional()
    .transform((v) => (v ? new Date(v) : null)),
  description: z.string().trim().optional().transform((v) => v || undefined),
  photoUrl: z.string().trim().optional().transform((v) => v || undefined),
  order: z.coerce.number().int().default(0),
});

async function requireAdmin() {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
}

function revalidateAll() {
  revalidatePath("/admin/experience");
  revalidatePath("/about");
}

export async function createExperience(formData: FormData) {
  await requireAdmin();
  const data = schema.parse(Object.fromEntries(formData));
  await prisma.experienceEntry.create({ data });
  revalidateAll();
  redirect("/admin/experience");
}

export async function updateExperience(id: string, formData: FormData) {
  await requireAdmin();
  const data = schema.parse(Object.fromEntries(formData));
  await prisma.experienceEntry.update({ where: { id }, data });
  revalidateAll();
  redirect("/admin/experience");
}

export async function deleteExperience(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id"));
  await prisma.experienceEntry.delete({ where: { id } });
  revalidateAll();
}
