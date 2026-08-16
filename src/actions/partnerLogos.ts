"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  name: z.string().trim().min(1),
  logoUrl: z.string().trim().min(1, "Logo image is required"),
  linkUrl: z.string().trim().optional().transform((v) => v || undefined),
  section: z.enum(["trusted", "experience_checkerboard"]).default("trusted"),
  order: z.coerce.number().int().default(0),
});

async function requireAdmin() {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
}

function revalidateAll() {
  revalidatePath("/admin/partner-logos");
  revalidatePath("/");
  revalidatePath("/about");
}

export async function createPartnerLogo(formData: FormData) {
  await requireAdmin();
  const data = schema.parse(Object.fromEntries(formData));
  await prisma.partnerLogo.create({ data });
  revalidateAll();
  redirect("/admin/partner-logos");
}

export async function updatePartnerLogo(id: string, formData: FormData) {
  await requireAdmin();
  const data = schema.parse(Object.fromEntries(formData));
  await prisma.partnerLogo.update({ where: { id }, data });
  revalidateAll();
  redirect("/admin/partner-logos");
}

export async function deletePartnerLogo(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id"));
  await prisma.partnerLogo.delete({ where: { id } });
  revalidateAll();
}
