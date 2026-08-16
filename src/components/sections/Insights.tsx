import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/generated/prisma/client";

export default function Insights({ posts }: { posts: BlogPost[] }) {
  if (posts.length === 0) return null;

  return (
    <section className="border-t border-white/10 bg-cream py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display text-4xl font-extrabold uppercase text-foreground md:text-5xl">
            Insights
          </h2>
          <p className="max-w-sm text-sm text-foreground/65">
            Explore insights, design trends, and ideas focused on product and web development.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              data-cursor-hover
              className="group block overflow-hidden rounded-lg border border-white/10 bg-surface"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={post.coverImageUrl || "/placeholders/photo-1.svg"}
                  alt={post.title}
                  fill
                  sizes="(min-width: 640px) 33vw, 100vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                <span className="absolute left-3 top-3 rounded-full bg-background/90 px-3 py-1 text-[11px] font-semibold uppercase text-foreground">
                  {post.category}
                </span>
              </div>
              <div className="p-5">
                <p className="mb-2 text-xs text-muted">
                  {post.publishedAt?.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
                <h3 className="font-display text-lg font-bold leading-snug text-foreground transition-colors group-hover:text-primary">
                  {post.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
