import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { prisma } from "@/lib/prisma";
import SiteNavbar from "@/components/nav/SiteNavbar";
import Footer from "@/components/sections/Footer";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({ where: { slug } });
  if (!post) return {};
  return { title: post.title, description: post.excerpt ?? undefined };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const [profile, post] = await Promise.all([
    prisma.profile.findUniqueOrThrow({ where: { id: "singleton" } }),
    prisma.blogPost.findUnique({ where: { slug } }),
  ]);

  if (!post || !post.published) notFound();

  return (
    <>
      <SiteNavbar />
      <main className="bg-background pb-16 pt-28 md:pb-24 md:pt-36">
        <article className="mx-auto max-w-3xl px-6 md:px-10">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-primary">
            {post.category}
          </p>
          <h1 className="mb-4 font-display text-3xl font-extrabold leading-tight text-foreground md:text-5xl">
            {post.title}
          </h1>
          <p className="mb-8 text-sm text-muted">
            By {post.author}
            {post.publishedAt && (
              <>
                {" · "}
                {new Date(post.publishedAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </>
            )}
          </p>

          {post.coverImageUrl && (
            <div className="relative mb-10 aspect-[16/9] overflow-hidden rounded-lg border border-white/10">
              <Image src={post.coverImageUrl} alt={post.title} fill sizes="768px" className="object-cover" />
            </div>
          )}

          <div className="prose prose-invert max-w-none prose-headings:font-display prose-a:text-primary">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
          </div>
        </article>
      </main>
      <Footer profile={profile} />
    </>
  );
}
