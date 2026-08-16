"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  title: z.string().trim().min(1),
  issuer: z.string().trim().optional().transform((v) => v || undefined),
  year: z.preprocess((v) => (v === "" ? undefined : v), z.coerce.number().int().optional()),
  description: z.string().trim().optional().transform((v) => v || undefined),
  order: z.coerce.number().int().default(0),
});

async function requireAdmin() {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
}

function revalidateAll() {
  revalidatePath("/admin/achievements");
  revalidatePath("/about");
}

export async function createAchievement(formData: FormData) {
  await requireAdmin();
  const data = schema.parse(Object.fromEntries(formData));
  await prisma.achievement.create({ data });
  revalidateAll();
  redirect("/admin/achievements");
}

export async function updateAchievement(id: string, formData: FormData) {
  await requireAdmin();
  const data = schema.parse(Object.fromEntries(formData));
  await prisma.achievement.update({ where: { id }, data });
  revalidateAll();
  redirect("/admin/achievements");
}

export async function deleteAchievement(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id"));
  await prisma.achievement.delete({ where: { id } });
  revalidateAll();
}
