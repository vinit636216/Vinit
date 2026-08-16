"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const optionalUrl = z.string().trim().optional().transform((v) => v || undefined);

const schema = z.object({
  name: z.string().trim().min(1),
  displayName: z.string().trim().min(1),
  role: z.string().trim().min(1),
  tagline: z.string().trim().min(1),
  bioShort: z.string().trim().min(1),
  bioLong: z.string().trim().min(1),
  heroPhotoUrl: optionalUrl,
  behindScenesPhotoUrl: optionalUrl,
  behindScenesVideoUrl: optionalUrl,
  resumeUrl: optionalUrl,
  email: z.string().trim().email(),
  phone: z.string().trim().optional().transform((v) => v || undefined),
  location: z.string().trim().optional().transform((v) => v || undefined),
  dribbbleUrl: optionalUrl,
  behanceUrl: optionalUrl,
  linkedinUrl: optionalUrl,
  instagramUrl: optionalUrl,
  githubUrl: optionalUrl,
  copyrightYear: z.coerce.number().int(),
  aboutPhoto1: optionalUrl,
  aboutPhoto2: optionalUrl,
  aboutPhoto3: optionalUrl,
  aboutPhoto4: optionalUrl,
});

export async function updateProfile(formData: FormData) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  const parsed = schema.parse(Object.fromEntries(formData));
  const { aboutPhoto1, aboutPhoto2, aboutPhoto3, aboutPhoto4, ...rest } = parsed;
  const aboutPhotoUrls = [aboutPhoto1, aboutPhoto2, aboutPhoto3, aboutPhoto4].filter(
    (v): v is string => Boolean(v)
  );

  await prisma.profile.update({
    where: { id: "singleton" },
    data: { ...rest, aboutPhotoUrls },
  });

  revalidatePath("/", "layout");
  redirect("/admin/profile?saved=1");
}
