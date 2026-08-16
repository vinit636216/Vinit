"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import slugify from "slugify";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { BLOG_PAGE_SIZE } from "@/lib/constants";

export async function getMorePosts(skip: number) {
  return prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { publishedAt: "desc" },
    skip,
    take: BLOG_PAGE_SIZE,
  });
}

const schema = z.object({
  title: z.string().trim().min(1),
  category: z.string().trim().min(1),
  excerpt: z.string().trim().optional().transform((v) => v || undefined),
  content: z.string().trim().min(1),
  coverImageUrl: z.string().trim().optional().transform((v) => v || undefined),
  author: z.string().trim().min(1).default("Vinit V Balgum"),
  published: z.string().optional().transform((v) => v === "on"),
});

async function requireAdmin() {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
}

function revalidateAll(slug?: string) {
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  revalidatePath("/");
  if (slug) revalidatePath(`/blog/${slug}`);
}

export async function createBlogPost(formData: FormData) {
  await requireAdmin();
  const data = schema.parse(Object.fromEntries(formData));
  const slug = slugify(data.title, { lower: true, strict: true });
  await prisma.blogPost.create({
    data: { ...data, slug, publishedAt: data.published ? new Date() : null },
  });
  revalidateAll(slug);
  redirect("/admin/blog");
}

export async function updateBlogPost(id: string, formData: FormData) {
  await requireAdmin();
  const data = schema.parse(Object.fromEntries(formData));
  const existing = await prisma.blogPost.findUniqueOrThrow({ where: { id } });
  await prisma.blogPost.update({
    where: { id },
    data: {
      ...data,
      publishedAt: data.published ? existing.publishedAt ?? new Date() : existing.publishedAt,
    },
  });
  revalidateAll(existing.slug);
  redirect("/admin/blog");
}

export async function deleteBlogPost(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id"));
  const existing = await prisma.blogPost.delete({ where: { id } });
  revalidateAll(existing.slug);
}
