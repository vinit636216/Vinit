import { prisma } from "@/lib/prisma";
import Navbar from "./Navbar";

export default async function SiteNavbar({ overlay = false }: { overlay?: boolean }) {
  const [profile, projectsCount, servicesCount] = await Promise.all([
    prisma.profile.findUniqueOrThrow({ where: { id: "singleton" } }),
    prisma.project.count(),
    prisma.service.count(),
  ]);

  return (
    <Navbar
      name={profile.name}
      overlay={overlay}
      projectsCount={projectsCount}
      servicesCount={servicesCount}
    />
  );
}
