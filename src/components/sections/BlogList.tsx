"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getMorePosts } from "@/actions/blog";
import { BLOG_PAGE_SIZE } from "@/lib/constants";
import type { BlogPost } from "@/generated/prisma/client";

export default function BlogList({ initialPosts }: { initialPosts: BlogPost[] }) {
  const [posts, setPosts] = useState(initialPosts);
  const [hasMore, setHasMore] = useState(initialPosts.length === BLOG_PAGE_SIZE);
  const [isPending, startTransition] = useTransition();

  const loadMore = () => {
    startTransition(async () => {
      const next = await getMorePosts(posts.length);
      setPosts((prev) => [...prev, ...next]);
      setHasMore(next.length === BLOG_PAGE_SIZE);
    });
  };

  if (posts.length === 0) {
    return <p className="text-sm text-muted">No posts published yet — check back soon.</p>;
  }

  return (
    <div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
                Written by <span className="text-foreground/70">{post.author}</span>
                {post.publishedAt && (
                  <>
                    {" · "}
                    {new Date(post.publishedAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </>
                )}
              </p>
              <h3 className="font-display text-lg font-bold leading-snug text-foreground transition-colors group-hover:text-primary">
                {post.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>

      {hasMore && (
        <div className="mt-10 flex justify-center">
          <Button variant="secondary" onClick={loadMore} disabled={isPending}>
            {isPending ? "Loading..." : "Load More ↗"}
          </Button>
        </div>
      )}
    </div>
  );
}
