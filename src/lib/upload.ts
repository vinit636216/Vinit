import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";
import sharp from "sharp";

const ALLOWED_TYPES = new Set(["image/png", "image/jpeg", "image/webp", "image/gif", "image/svg+xml"]);
const MAX_BYTES = 5 * 1024 * 1024;

export async function saveUploadedImage(file: File, entity: string): Promise<string> {
  if (!ALLOWED_TYPES.has(file.type)) {
    throw new Error("Unsupported file type. Use PNG, JPEG, WEBP, GIF, or SVG.");
  }
  if (file.size > MAX_BYTES) {
    throw new Error("File is too large (max 5MB).");
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const dir = path.join(process.cwd(), "public", "uploads", entity);
  await mkdir(dir, { recursive: true });

  const id = nanoid(10);

  if (file.type === "image/svg+xml") {
    const filename = `${id}.svg`;
    await writeFile(path.join(dir, filename), buffer);
    return `/uploads/${entity}/${filename}`;
  }

  if (file.type === "image/gif") {
    const filename = `${id}.gif`;
    await writeFile(path.join(dir, filename), buffer);
    return `/uploads/${entity}/${filename}`;
  }

  const filename = `${id}.webp`;
  const optimized = await sharp(buffer)
    .resize({ width: 2000, height: 2000, fit: "inside", withoutEnlargement: true })
    .webp({ quality: 85 })
    .toBuffer();
  await writeFile(path.join(dir, filename), optimized);
  return `/uploads/${entity}/${filename}`;
}
