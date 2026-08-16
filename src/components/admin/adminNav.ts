export const ADMIN_NAV_GROUPS: { label: string; links: { href: string; label: string }[] }[] = [
  {
    label: "Overview",
    links: [{ href: "/admin", label: "Dashboard" }],
  },
  {
    label: "Content",
    links: [
      { href: "/admin/profile", label: "Profile" },
      { href: "/admin/stats", label: "Stats" },
      { href: "/admin/services", label: "Services" },
      { href: "/admin/projects", label: "Projects" },
      { href: "/admin/testimonials", label: "Testimonials" },
      { href: "/admin/experience", label: "Experience" },
      { href: "/admin/partner-logos", label: "Partner Logos" },
      { href: "/admin/achievements", label: "Achievements" },
      { href: "/admin/faq", label: "FAQ" },
      { href: "/admin/blog", label: "Blog" },
    ],
  },
  {
    label: "Inbox",
    links: [
      { href: "/admin/messages", label: "Messages" },
      { href: "/admin/newsletter", label: "Newsletter" },
    ],
  },
  {
    label: "Account",
    links: [{ href: "/admin/settings/password", label: "Change Password" }],
  },
];
