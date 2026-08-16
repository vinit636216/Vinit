import { prisma } from "@/lib/prisma";
import SiteNavbar from "@/components/nav/SiteNavbar";
import Hero from "@/components/sections/Hero";
import TrustedBy from "@/components/sections/TrustedBy";
import ImpactStats from "@/components/sections/ImpactStats";
import WhyChooseMe from "@/components/sections/WhyChooseMe";
import Services from "@/components/sections/Services";
import ProjectsGrid from "@/components/sections/ProjectsGrid";
import Testimonials from "@/components/sections/Testimonials";
import Insights from "@/components/sections/Insights";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [profile, stats, services, projects, testimonials, partnerLogos, posts] =
    await Promise.all([
      prisma.profile.findUniqueOrThrow({ where: { id: "singleton" } }),
      prisma.stat.findMany({ orderBy: { order: "asc" } }),
      prisma.service.findMany({ orderBy: { order: "asc" } }),
      prisma.project.findMany({ orderBy: { order: "asc" } }),
      prisma.testimonial.findMany({ orderBy: { order: "asc" } }),
      prisma.partnerLogo.findMany({ where: { section: "trusted" }, orderBy: { order: "asc" } }),
      prisma.blogPost.findMany({
        where: { published: true },
        orderBy: { publishedAt: "desc" },
        take: 3,
      }),
    ]);

  const featuredProject = projects.find((p) => p.featured) ?? projects[0] ?? null;

  return (
    <>
      <SiteNavbar overlay />
      <main>
        <Hero profile={profile} featuredProject={featuredProject} />
        <TrustedBy logos={partnerLogos} />
        <ImpactStats profile={profile} stats={stats} />
        <WhyChooseMe testimonials={testimonials} />
        <Services services={services} />
        <ProjectsGrid projects={projects} />
        <Testimonials testimonials={testimonials} />
        <Insights posts={posts} />
        <Contact />
      </main>
      <Footer profile={profile} />
    </>
  );
}
