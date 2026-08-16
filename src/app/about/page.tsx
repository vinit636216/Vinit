import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import SiteNavbar from "@/components/nav/SiteNavbar";
import AboutHero from "@/components/sections/AboutHero";
import AboutStats from "@/components/sections/AboutStats";
import Achievements from "@/components/sections/Achievements";
import ExperienceTimeline from "@/components/sections/ExperienceTimeline";
import BehindTheScenes from "@/components/sections/BehindTheScenes";
import FAQAccordion from "@/components/sections/FAQAccordion";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "About",
};

export const dynamic = "force-dynamic";

export default async function AboutPage() {
  const [profile, stats, testimonials, achievements, experience, faqItems, logos] =
    await Promise.all([
      prisma.profile.findUniqueOrThrow({ where: { id: "singleton" } }),
      prisma.stat.findMany({ orderBy: { order: "asc" } }),
      prisma.testimonial.findMany({ orderBy: { order: "asc" } }),
      prisma.achievement.findMany({ orderBy: { order: "asc" } }),
      prisma.experienceEntry.findMany({ orderBy: { order: "asc" } }),
      prisma.faqItem.findMany({ orderBy: { order: "asc" } }),
      prisma.partnerLogo.findMany({
        where: { section: "experience_checkerboard" },
        orderBy: { order: "asc" },
      }),
    ]);

  return (
    <>
      <SiteNavbar />
      <main>
        <AboutHero profile={profile} />
        <AboutStats stats={stats} testimonials={testimonials} />
        <Achievements achievements={achievements} />
        <ExperienceTimeline entries={experience} logos={logos} />
        <BehindTheScenes profile={profile} />
        <FAQAccordion items={faqItems} />
        <Contact />
      </main>
      <Footer profile={profile} />
    </>
  );
}
