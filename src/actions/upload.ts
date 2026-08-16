"use server";

import { auth } from "@/lib/auth";
import { saveUploadedImage } from "@/lib/upload";

export async function uploadImage(entity: string, formData: FormData) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return { error: "No file provided" };
  }

  try {
    const url = await saveUploadedImage(file, entity);
    return { url };
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Upload failed" };
  }
}
