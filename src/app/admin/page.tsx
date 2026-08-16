import { prisma } from "@/lib/prisma";

export default async function AdminDashboardPage() {
  const [projects, testimonials, blogPosts, unreadMessages, subscribers] = await Promise.all([
    prisma.project.count(),
    prisma.testimonial.count(),
    prisma.blogPost.count(),
    prisma.contactSubmission.count({ where: { read: false } }),
    prisma.newsletterSubscriber.count(),
  ]);

  const tiles = [
    { label: "Projects", value: projects },
    { label: "Testimonials", value: testimonials },
    { label: "Blog Posts", value: blogPosts },
    { label: "Unread Messages", value: unreadMessages },
    { label: "Newsletter Subscribers", value: subscribers },
  ];

  return (
    <div>
      <h1 className="mb-1 font-display text-2xl font-extrabold text-foreground">Dashboard</h1>
      <p className="mb-8 text-sm text-muted">
        Manage every section of your public portfolio from here.
      </p>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {tiles.map((tile) => (
          <div key={tile.label} className="rounded-lg border border-white/10 bg-surface p-5">
            <p className="text-3xl font-extrabold text-foreground">{tile.value}</p>
            <p className="mt-1 text-xs font-medium uppercase tracking-wide text-muted">
              {tile.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
