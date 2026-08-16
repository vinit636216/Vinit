"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import slugify from "slugify";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const optionalUrl = z.string().trim().optional().transform((v) => v || undefined);

const schema = z.object({
  title: z.string().trim().min(1),
  category: z.string().trim().min(1),
  type: z.string().trim().optional().transform((v) => v || undefined),
  description: z.string().trim().optional().transform((v) => v || undefined),
  coverImageUrl: z.string().trim().min(1, "Cover image is required"),
  tags: z.string().transform((v) => v.split(",").map((t) => t.trim()).filter(Boolean)),
  externalUrl: z.string().trim().optional().transform((v) => v || undefined),
  featured: z.string().optional().transform((v) => v === "on"),
  order: z.coerce.number().int().default(0),
  gallery1: optionalUrl,
  gallery2: optionalUrl,
  gallery3: optionalUrl,
  gallery4: optionalUrl,
  gallery5: optionalUrl,
  gallery6: optionalUrl,
});

function extractGallery(data: z.infer<typeof schema>) {
  const { gallery1, gallery2, gallery3, gallery4, gallery5, gallery6, ...rest } = data;
  const galleryUrls = [gallery1, gallery2, gallery3, gallery4, gallery5, gallery6].filter(
    (v): v is string => Boolean(v)
  );
  return { ...rest, galleryUrls };
}

async function requireAdmin() {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
}

function revalidateAll(slug?: string) {
  revalidatePath("/admin/projects");
  revalidatePath("/");
  if (slug) revalidatePath(`/projects/${slug}`);
}

export async function createProject(formData: FormData) {
  await requireAdmin();
  const data = extractGallery(schema.parse(Object.fromEntries(formData)));
  const slug = slugify(data.title, { lower: true, strict: true });
  await prisma.project.create({ data: { ...data, slug } });
  revalidateAll(slug);
  redirect("/admin/projects");
}

export async function updateProject(id: string, formData: FormData) {
  await requireAdmin();
  const data = extractGallery(schema.parse(Object.fromEntries(formData)));
  const existing = await prisma.project.update({ where: { id }, data });
  revalidateAll(existing.slug);
  redirect("/admin/projects");
}

export async function deleteProject(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id"));
  const existing = await prisma.project.delete({ where: { id } });
  revalidateAll(existing.slug);
}
