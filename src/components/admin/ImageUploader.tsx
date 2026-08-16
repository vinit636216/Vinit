"use client";

import { useRef, useState, useTransition } from "react";
import Image from "next/image";
import { uploadImage } from "@/actions/upload";

export default function ImageUploader({
  name,
  entity,
  defaultValue,
  label,
}: {
  name: string;
  entity: string;
  defaultValue?: string | null;
  label?: string;
}) {
  const [url, setUrl] = useState(defaultValue ?? "");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File | undefined) => {
    if (!file) return;
    setError(null);
    const formData = new FormData();
    formData.append("file", file);
    startTransition(async () => {
      const result = await uploadImage(entity, formData);
      if (result.error) {
        setError(result.error);
      } else if (result.url) {
        setUrl(result.url);
      }
    });
  };

  return (
    <div>
      {label && <p className="mb-1 block text-xs font-medium text-foreground/80">{label}</p>}
      <input type="hidden" name={name} value={url} />
      <div className="flex items-center gap-4">
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border border-white/10 bg-background">
          {url && <Image src={url} alt="" fill sizes="80px" className="object-cover" />}
        </div>
        <div>
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={isPending}
            className="rounded-lg border border-white/15 bg-surface px-3 py-1.5 text-xs font-medium text-foreground/80 transition hover:border-white/30 disabled:opacity-60"
          >
            {isPending ? "Uploading..." : url ? "Replace image" : "Upload image"}
          </button>
          {error && <p className="mt-1 text-xs text-primary">{error}</p>}
        </div>
        <input
          ref={inputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml"
          className="hidden"
          onChange={(e) => handleFile(e.target.files?.[0])}
        />
      </div>
    </div>
  );
}
