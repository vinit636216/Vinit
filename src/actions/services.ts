"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  number: z.coerce.number().int(),
  title: z.string().trim().min(1),
  description: z.string().trim().min(1),
  tags: z.string().transform((v) => v.split(",").map((t) => t.trim()).filter(Boolean)),
  imageUrl: z.string().trim().optional().transform((v) => v || undefined),
  projectUrl: z.string().trim().optional().transform((v) => v || undefined),
  order: z.coerce.number().int().default(0),
});

async function requireAdmin() {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
}

function revalidateAll() {
  revalidatePath("/admin/services");
  revalidatePath("/");
}

export async function createService(formData: FormData) {
  await requireAdmin();
  const data = schema.parse(Object.fromEntries(formData));
  await prisma.service.create({ data });
  revalidateAll();
  redirect("/admin/services");
}

export async function updateService(id: string, formData: FormData) {
  await requireAdmin();
  const data = schema.parse(Object.fromEntries(formData));
  await prisma.service.update({ where: { id }, data });
  revalidateAll();
  redirect("/admin/services");
}

export async function deleteService(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id"));
  await prisma.service.delete({ where: { id } });
  revalidateAll();
}
