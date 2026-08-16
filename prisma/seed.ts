import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL ?? "admin@example.com";
  const adminPassword = process.env.ADMIN_PASSWORD ?? "ChangeMe123!";

  const existingAdmin = await prisma.adminUser.findUnique({ where: { email: adminEmail } });
  if (!existingAdmin) {
    const passwordHash = await bcrypt.hash(adminPassword, 12);
    await prisma.adminUser.create({
      data: { email: adminEmail, passwordHash, name: "Vinit V Balgum" },
    });
    console.log(`Seeded admin user: ${adminEmail}`);
  } else {
    console.log(`Admin user already exists: ${adminEmail} (skipped)`);
  }

  await prisma.profile.upsert({
    where: { id: "singleton" },
    update: {},
    create: {
      id: "singleton",
      name: "Vinit V Balgum",
      displayName: "VINIT",
      role: "UI UX Designer",
      tagline:
        "I BUILD USER-CENTERED DIGITAL PRODUCTS THAT ARE SIMPLE, SCALABLE AND IMPACTFUL",
      bioShort:
        "Hi, I'm Vinit, a UI/UX Designer with a proven track record of crafting intuitive and impactful digital experiences.",
      bioLong:
        "I'm a UI/UX Designer who transforms complex problems into elegant, user-centric solutions that drive business growth and enhance user satisfaction. I specialize in comprehensive user research, strategic wireframing, interactive prototyping, and pixel-perfect visual design — with an iterative process that keeps every product both beautiful and highly functional.",
      heroPhotoUrl: null,
      aboutPhotoUrls: [],
      behindScenesPhotoUrl: null,
      behindScenesVideoUrl: null,
      resumeUrl: null,
      email: "vvinit848@gmail.com",
      phone: "+1 (202) 555-0149",
      location: "Remote",
      dribbbleUrl: null,
      behanceUrl: "https://behance.net",
      linkedinUrl: "https://linkedin.com",
      instagramUrl: "https://instagram.com",
      githubUrl: null,
      copyrightYear: 2026,
    },
  });

  const statCount = await prisma.stat.count();
  if (statCount === 0) {
    await prisma.stat.createMany({
      data: [
        { label: "Projects Completed", value: 24, suffix: "+", order: 0 },
        { label: "Happy Clients", value: 15, suffix: "+", order: 1 },
        { label: "Years Experience", value: 5, suffix: "+", order: 2 },
      ],
    });
  }

  const serviceCount = await prisma.service.count();
  if (serviceCount === 0) {
    await prisma.service.createMany({
      data: [
        {
          number: 1,
          title: "UI/UX Design",
          description:
            "End-to-end product design — research, wireframes, and pixel-perfect interfaces that feel effortless to use.",
          tags: ["User Research", "Wireframing", "Design Systems"],
          order: 0,
        },
        {
          number: 2,
          title: "Web Design",
          description:
            "Responsive, conversion-focused website design built around clear visual hierarchy and brand identity.",
          tags: ["Figma", "Responsive Design", "Prototyping"],
          order: 1,
        },
        {
          number: 3,
          title: "App Design",
          description:
            "Mobile and product app interfaces designed for clarity, accessibility, and delightful interaction.",
          tags: ["Mobile UX", "Interaction Design", "Usability Testing"],
          order: 2,
        },
        {
          number: 4,
          title: "Graphic Design",
          description:
            "Visual identity and brand assets — logos, typography, and color systems that tie a product together.",
          tags: ["Branding", "Typography", "Visual Design"],
          order: 3,
        },
      ],
    });
  }

  const projectCount = await prisma.project.count();
  if (projectCount === 0) {
    await prisma.project.createMany({
      data: [
        {
          title: "Lumio",
          slug: "lumio",
          category: "Design",
          type: "UI/UX",
          description: "A clean, modern dashboard experience for a productivity SaaS.",
          coverImageUrl: "/placeholders/photo-1.svg",
          galleryUrls: [],
          tags: ["SaaS", "Dashboard"],
          featured: true,
          order: 0,
        },
        {
          title: "Zentix",
          slug: "zentix",
          category: "Design",
          type: "Branding",
          description: "Brand identity and landing experience for a wellness startup.",
          coverImageUrl: "/placeholders/photo-2.svg",
          galleryUrls: [],
          tags: ["Branding", "Landing Page"],
          featured: true,
          order: 1,
        },
        {
          title: "Northwind Commerce",
          slug: "northwind-commerce",
          category: "Development",
          type: "E-commerce",
          description: "Full stack e-commerce platform with a custom checkout flow.",
          coverImageUrl: "/placeholders/photo-3.svg",
          galleryUrls: [],
          tags: ["Next.js", "Stripe"],
          featured: true,
          order: 2,
        },
      ],
    });
  }

  const testimonialCount = await prisma.testimonial.count();
  if (testimonialCount === 0) {
    await prisma.testimonial.createMany({
      data: [
        {
          name: "Daniel Smith",
          role: "Product Designer",
          quote:
            "Vinit created a clean and intuitive build that perfectly matched our brand identity. The entire process was smooth and professional.",
          rating: 5,
          order: 0,
        },
        {
          name: "Olivia Harris",
          role: "Manager",
          quote:
            "Working with Vinit was an amazing experience. He transformed our ideas into a polished, functional product.",
          rating: 5,
          order: 1,
        },
        {
          name: "Sofia Andersen",
          role: "Founder",
          quote:
            "Excellent communication, fast delivery, and outstanding attention to detail. Highly recommended for any web project.",
          rating: 5,
          order: 2,
        },
      ],
    });
  }

  const experienceCount = await prisma.experienceEntry.count();
  if (experienceCount === 0) {
    await prisma.experienceEntry.createMany({
      data: [
        {
          company: "REDDEVS",
          role: "UI UX Designer",
          startDate: new Date("2021-01-01"),
          endDate: null,
          description: "Leading end-to-end product design for client digital platforms.",
          order: 0,
        },
        {
          company: "FRAMERDEVS",
          role: "UI Designer",
          startDate: new Date("2019-01-01"),
          endDate: new Date("2021-01-01"),
          description: "Designed high-conversion marketing sites and interactive prototypes.",
          order: 1,
        },
      ],
    });
  }

  const achievementCount = await prisma.achievement.count();
  if (achievementCount === 0) {
    await prisma.achievement.createMany({
      data: [
        { title: "Top Rated Developer", issuer: "Upwork", year: 2025, order: 0 },
        { title: "Best Portfolio Site", issuer: "Awwwards", year: 2024, order: 1 },
        { title: "Hackathon Winner", issuer: "TechCrunch Disrupt", year: 2023, order: 2 },
      ],
    });
  }

  const faqCount = await prisma.faqItem.count();
  if (faqCount === 0) {
    await prisma.faqItem.createMany({
      data: [
        {
          question: "What services do you offer?",
          answer:
            "I specialize in UI/UX design, web design, app design, and graphic design. My work includes SaaS dashboards, landing pages, mobile app interfaces, and complete brand-focused systems.",
          order: 0,
        },
        {
          question: "What is involved in your design process?",
          answer:
            "Discovery and research, wireframing and structure, high-fidelity design, and iterative refinement based on feedback and testing.",
          order: 1,
        },
        {
          question: "What files will I receive when the project is complete?",
          answer: "You'll receive production-ready source code, design files, and documentation.",
          order: 2,
        },
        {
          question: "Do you offer revisions after the designs are delivered?",
          answer:
            "Yes, every project includes a defined number of revision rounds. Additional revisions can always be accommodated.",
          order: 3,
        },
        {
          question: "Can you work with an existing brand?",
          answer: "Absolutely — I can design and build within an existing brand system.",
          order: 4,
        },
      ],
    });
  }

  const blogCount = await prisma.blogPost.count();
  if (blogCount === 0) {
    await prisma.blogPost.createMany({
      data: [
        {
          title: "The First Impression Effect in UI Design",
          slug: "the-first-impression-effect-in-ui-design",
          category: "Design",
          excerpt: "Why the first screen a user sees can make or break the entire product experience.",
          content:
            "# The First Impression Effect\n\nWhy the first screen a user sees can make or break the entire product experience...",
          published: true,
          publishedAt: new Date(),
        },
        {
          title: "How Color Shapes Brand Perception Instantly",
          slug: "how-color-shapes-brand-perception-instantly",
          category: "Branding",
          excerpt: "A look at how color choices drive first impressions of a brand.",
          content: "# How Color Shapes Brand Perception\n\nColor is one of the fastest signals a brand sends...",
          published: true,
          publishedAt: new Date(),
        },
        {
          title: "Why Micro-Animations Matter More Than You Think",
          slug: "why-micro-animations-matter-more-than-you-think",
          category: "Motion",
          excerpt: "Small motion details that make interfaces feel alive.",
          content: "# Why Micro-Animations Matter\n\nMicro-animations guide attention and add polish...",
          published: true,
          publishedAt: new Date(),
        },
      ],
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
