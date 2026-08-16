import Image from "next/image";
import type { Profile } from "@/generated/prisma/client";

export default function BehindTheScenes({ profile }: { profile: Profile }) {
  return (
    <section className="border-t border-white/10 bg-cream pt-20 md:pt-28">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="relative aspect-[16/8] overflow-hidden rounded-lg">
          {profile.behindScenesVideoUrl ? (
            <iframe
              src={profile.behindScenesVideoUrl}
              title="Behind the scenes"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="h-full w-full"
            />
          ) : (
            <Image
              src={profile.behindScenesPhotoUrl || "/placeholders/photo-2.svg"}
              alt="Behind the scenes"
              fill
              sizes="100vw"
              className="object-cover"
            />
          )}
        </div>
      </div>
    </section>
  );
}
