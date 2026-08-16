import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import SiteNavbar from "@/components/nav/SiteNavbar";
import Footer from "@/components/sections/Footer";
import Pill from "@/components/ui/Pill";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await prisma.project.findUnique({ where: { slug } });
  if (!project) return {};
  return { title: project.title, description: project.description ?? undefined };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const [profile, project] = await Promise.all([
    prisma.profile.findUniqueOrThrow({ where: { id: "singleton" } }),
    prisma.project.findUnique({ where: { slug } }),
  ]);

  if (!project) notFound();

  const images = [project.coverImageUrl, ...project.galleryUrls];

  return (
    <>
      <SiteNavbar />
      <main className="bg-background pb-16 pt-28 md:pb-24 md:pt-36">
        <div className="mx-auto max-w-5xl px-6 md:px-10">
          <Link
            href="/#work"
            data-cursor-hover
            className="mb-8 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-widest text-muted transition-colors hover:text-foreground"
          >
            ← Back to Projects
          </Link>

          <Pill className="mb-5">{project.category}</Pill>
          <h1 className="mb-4 font-display text-4xl font-extrabold uppercase leading-none text-foreground md:text-6xl">
            {project.title}
          </h1>

          <div className="mb-8 flex flex-wrap items-center gap-4">
            {project.type && (
              <span className="text-sm text-muted">/{project.type}</span>
            )}
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/10 bg-surface px-3 py-1 text-xs font-medium text-foreground/70"
              >
                {tag}
              </span>
            ))}
          </div>

          {project.description && (
            <p className="mb-10 max-w-2xl text-base leading-relaxed text-foreground/70">
              {project.description}
            </p>
          )}

          {project.externalUrl && (
            <Button asChild className="mb-12" data-cursor-hover>
              <a href={project.externalUrl} target="_blank" rel="noreferrer">
                Visit Live Project ↗
              </a>
            </Button>
          )}

          <div className="grid grid-cols-1 gap-6">
            {images.map((src, i) => (
              <div
                key={src + i}
                className="relative aspect-[16/10] overflow-hidden rounded-lg border border-white/10"
              >
                <Image
                  src={src}
                  alt={`${project.title} mockup ${i + 1}`}
                  fill
                  sizes="(min-width: 1024px) 900px, 100vw"
                  className="object-cover"
                  priority={i === 0}
                />
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer profile={profile} />
    </>
  );
}
