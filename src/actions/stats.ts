"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  label: z.string().trim().min(1),
  value: z.coerce.number().int(),
  suffix: z.string().trim().optional(),
  order: z.coerce.number().int().default(0),
});

async function requireAdmin() {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
}

export async function createStat(formData: FormData) {
  await requireAdmin();
  const data = schema.parse(Object.fromEntries(formData));
  await prisma.stat.create({ data });
  revalidatePath("/admin/stats");
  revalidatePath("/");
  revalidatePath("/about");
  redirect("/admin/stats");
}

export async function updateStat(id: string, formData: FormData) {
  await requireAdmin();
  const data = schema.parse(Object.fromEntries(formData));
  await prisma.stat.update({ where: { id }, data });
  revalidatePath("/admin/stats");
  revalidatePath("/");
  revalidatePath("/about");
  redirect("/admin/stats");
}

export async function deleteStat(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id"));
  await prisma.stat.delete({ where: { id } });
  revalidatePath("/admin/stats");
  revalidatePath("/");
  revalidatePath("/about");
}
