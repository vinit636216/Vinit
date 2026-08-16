"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  name: z.string().trim().min(1),
  role: z.string().trim().min(1),
  avatarUrl: z.string().trim().optional().transform((v) => v || undefined),
  quote: z.string().trim().min(1),
  rating: z.coerce.number().int().min(1).max(5).default(5),
  order: z.coerce.number().int().default(0),
});

async function requireAdmin() {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
}

function revalidateAll() {
  revalidatePath("/admin/testimonials");
  revalidatePath("/");
  revalidatePath("/about");
}

export async function createTestimonial(formData: FormData) {
  await requireAdmin();
  const data = schema.parse(Object.fromEntries(formData));
  await prisma.testimonial.create({ data });
  revalidateAll();
  redirect("/admin/testimonials");
}

export async function updateTestimonial(id: string, formData: FormData) {
  await requireAdmin();
  const data = schema.parse(Object.fromEntries(formData));
  await prisma.testimonial.update({ where: { id }, data });
  revalidateAll();
  redirect("/admin/testimonials");
}

export async function deleteTestimonial(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id"));
  await prisma.testimonial.delete({ where: { id } });
  revalidateAll();
}
