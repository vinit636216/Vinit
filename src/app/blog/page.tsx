import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { BLOG_PAGE_SIZE } from "@/lib/constants";
import SiteNavbar from "@/components/nav/SiteNavbar";
import Footer from "@/components/sections/Footer";
import BlogList from "@/components/sections/BlogList";
import Pill from "@/components/ui/Pill";

export const metadata: Metadata = {
  title: "Blog",
};

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const [profile, posts] = await Promise.all([
    prisma.profile.findUniqueOrThrow({ where: { id: "singleton" } }),
    prisma.blogPost.findMany({
      where: { published: true },
      orderBy: { publishedAt: "desc" },
      take: BLOG_PAGE_SIZE,
    }),
  ]);

  return (
    <>
      <SiteNavbar />
      <main className="bg-background pb-16 pt-28 md:pb-24 md:pt-36">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <Pill className="mb-5">Insights</Pill>
          <h1 className="mb-12 font-display text-4xl font-extrabold uppercase leading-none text-foreground md:text-6xl">
            From the Blog
          </h1>
          <BlogList initialPosts={posts} />
        </div>
      </main>
      <Footer profile={profile} />
    </>
  );
}
